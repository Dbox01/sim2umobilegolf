/**
 * Post-build step. Writes sitemap.xml and robots.txt into dist/ using the
 * route list in src/data/site.ts as the single source of truth.
 *
 * Indexing is opt-in: unless the build ran with VITE_SITE_ENV=production,
 * robots.txt disallows everything. That way a Cloudflare preview or a local
 * build can never end up competing with the live site in search results.
 *
 * ---------------------------------------------------------------------------
 *  WHY lastmod COMES FROM GIT AND NOT FROM new Date()
 * ---------------------------------------------------------------------------
 * It used to be today's date on every URL. The site rebuilds nightly, so the
 * sitemap told Google that all eleven pages had changed yesterday — every
 * single day, whether or not a word had moved.
 *
 * That is not a harmless inaccuracy. lastmod is a hint Google decides whether
 * to trust, and a sitemap that claims everything is always new teaches it to
 * ignore the field, and to spend its crawl budget elsewhere. By October 2026
 * only six of eleven pages were indexed, with /corporate-events, /packages
 * and /contact crawled and then dropped.
 *
 * So each URL now reports the date of the last commit that actually touched
 * what the page is made of: its own component, the components it imports, and
 * the data files behind those. A page nobody has edited since July says July,
 * which is the truth and is worth more than a fresh date.
 *
 * Site chrome is excluded from that walk — see IGNORED_DEPS. Those files are
 * imported by every page, so counting them would bump all eleven dates every
 * time the nav or the metadata changed.
 *
 * ---------------------------------------------------------------------------
 *  IF THE DATE CANNOT BE ESTABLISHED, THE FIELD IS OMITTED
 * ---------------------------------------------------------------------------
 * No git, or a shallow clone with no usable history, and the URL ships with
 * no lastmod at all rather than a made-up one. "Unknown" is a fair thing to
 * tell a search engine. "Changed today" when it did not is how we got here.
 *
 * This matters in CI: actions/checkout clones with depth 1 unless told
 * otherwise, which leaves exactly one commit and therefore one date for every
 * file. The workflow sets fetch-depth: 0 for this reason. If the sitemap ever
 * starts shipping without lastmod, that setting is the first thing to check.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const SITE_URL = 'https://sim2umobilegolf.co.za'
const isProduction = process.env.VITE_SITE_ENV === 'production'

/**
 * Excluded from the dependency walk on purpose.
 *
 * cloudinary.json is rewritten by the prebuild on every single build — the
 * gallery order is reshuffled each time — so its commit date tracks when
 * somebody last happened to commit a build artefact, not when the photographs
 * changed. Including it would reintroduce the exact noise this file exists to
 * remove.
 */
const IGNORED_DEPS = new Set([
  'src/data/cloudinary.json',

  /* --- Site chrome -------------------------------------------------------
   *
   * Every page imports these, so any edit to one of them used to bump the
   * lastmod on all eleven URLs at once — which is the "everything changed
   * today" signal this file was written to remove, just arriving weekly
   * instead of nightly. It happened immediately: a schema refactor touched
   * Seo.tsx and the next sitemap claimed the terms page had new content.
   *
   * These files decide how a page is rendered, not what it says. A nav label,
   * a button style or a JSON-LD block is not a reason to tell Google that the
   * How It Works page changed. The page's own component and its data are, and
   * those are still walked.
   *
   * The trade: a genuine site-wide content change — a new phone number in the
   * footer, say — will not move any lastmod. That is the right way round. An
   * under-reported change costs a slower recrawl; an over-reported one costs
   * the credibility of the whole file.
   */
  'src/components/Seo.tsx',
  'src/components/Layout.tsx',
  'src/components/Nav.tsx',
  'src/components/Footer.tsx',
  'src/components/Primitives.tsx',
  'src/components/SocialLinks.tsx',
  'src/data/site.ts',
  'src/data/schema.ts',
])

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

/** Pull the route list out of site.ts without needing a TS loader. */
async function readRoutes() {
  const source = await readFile(resolve(root, 'src/data/site.ts'), 'utf8')
  const block = source.match(/SITEMAP_ROUTES[^=]*=\s*\[([\s\S]*?)\n\]/)
  if (!block) throw new Error('Could not find SITEMAP_ROUTES in src/data/site.ts')

  const routes = [...block[1].matchAll(/path:\s*'([^']+)'.*?priority:\s*'([^']+)'/g)]
  if (!routes.length) throw new Error('SITEMAP_ROUTES parsed but empty')

  return routes.map(([, path, priority]) => ({ path, priority }))
}

/** '/corporate-events' -> 'src/pages/CorporateEvents.tsx' */
function pageFileFor(route) {
  const name =
    route === '/'
      ? 'Home'
      : route
          .slice(1)
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join('')
  const file = `src/pages/${name}.tsx`
  return existsSync(resolve(root, file)) ? file : null
}

/* -------------------------------------------------------------------------- */
/*                            Dependency resolution                           */
/* -------------------------------------------------------------------------- */

const posix = (p) => p.split(sep).join('/')

/** Resolve a relative import to a real file, trying the usual extensions. */
function resolveImport(spec, fromFile) {
  const base = resolve(root, dirname(fromFile), spec)
  for (const ext of ['', '.tsx', '.ts', '.json', '/index.tsx', '/index.ts']) {
    if (existsSync(base + ext)) return posix(relative(root, base + ext))
  }
  return null
}

/**
 * Every local file a page is built from, walked transitively.
 *
 * Only relative imports are followed — a react-router upgrade is not a change
 * to the content of the Packages page, and telling Google it is would be the
 * same lie in a different costume.
 */
function dependenciesOf(file, seen = new Set()) {
  if (seen.has(file) || IGNORED_DEPS.has(file)) return seen
  seen.add(file)

  let source
  try {
    source = execFileSync('cat', [resolve(root, file)], { encoding: 'utf8' })
  } catch {
    return seen
  }

  for (const [, spec] of source.matchAll(/from\s+'(\.[^']+)'/g)) {
    const resolved = resolveImport(spec, file)
    if (resolved) dependenciesOf(resolved, seen)
  }
  return seen
}

/* -------------------------------------------------------------------------- */
/*                                  Git dates                                 */
/* -------------------------------------------------------------------------- */

function git(args) {
  return execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()
}

/** True when there is real history to read dates out of. */
function historyIsUsable() {
  try {
    if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
      console.warn(
        '[sitemap] Shallow clone — no usable history, so lastmod is omitted.\n' +
          '          In CI this means fetch-depth: 0 is missing from the checkout step.',
      )
      return false
    }
    return true
  } catch {
    console.warn('[sitemap] git unavailable — lastmod omitted.')
    return false
  }
}

/** Date of the most recent commit touching any of these files, or null. */
function lastModified(files) {
  if (!files.length) return null
  try {
    const iso = git(['log', '-1', '--format=%cI', '--', ...files])
    return iso ? iso.split('T')[0] : null
  } catch {
    return null
  }
}

/* -------------------------------------------------------------------------- */

const routes = await readRoutes()
const useGit = historyIsUsable()

const entries = routes.map(({ path, priority }) => {
  const page = pageFileFor(path)
  if (!page) {
    console.warn(`[sitemap] No component found for ${path} — lastmod omitted.`)
    return { path, priority, lastmod: null, deps: 0 }
  }
  const deps = [...dependenciesOf(page)]
  return {
    path,
    priority,
    lastmod: useGit ? lastModified(deps) : null,
    deps: deps.length,
  }
})

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ path, priority, lastmod }) => `  <url>
    <loc>${SITE_URL}${path}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = isProduction
  ? `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`
  : `# Non-production build — indexing disabled on purpose.
User-agent: *
Disallow: /
`

await mkdir(dist, { recursive: true })
await writeFile(resolve(dist, 'sitemap.xml'), sitemap)
await writeFile(resolve(dist, 'robots.txt'), robots)

const dated = entries.filter((e) => e.lastmod).length
console.log(
  `[sitemap] ${routes.length} routes written · ${dated} with a real lastmod · ` +
    `robots.txt = ${isProduction ? 'INDEXABLE (production)' : 'DISALLOW ALL (preview)'}`,
)
for (const e of entries) {
  console.log(`           ${(e.lastmod ?? 'no date').padEnd(12)} ${e.path}  (${e.deps} files)`)
}
