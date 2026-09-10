/**
 * Post-build step. Writes sitemap.xml and robots.txt into dist/ using the
 * route list in src/data/site.ts as the single source of truth.
 *
 * Indexing is opt-in: unless the build ran with VITE_SITE_ENV=production,
 * robots.txt disallows everything. That way a Cloudflare preview or a local
 * build can never end up competing with the live site in search results.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')

const SITE_URL = 'https://sim2umobilegolf.co.za'
const isProduction = process.env.VITE_SITE_ENV === 'production'

/** Pull the route list out of site.ts without needing a TS loader. */
async function readRoutes() {
  const source = await readFile(resolve(root, 'src/data/site.ts'), 'utf8')
  const block = source.match(/SITEMAP_ROUTES[^=]*=\s*\[([\s\S]*?)\n\]/)
  if (!block) throw new Error('Could not find SITEMAP_ROUTES in src/data/site.ts')

  const routes = [...block[1].matchAll(/path:\s*'([^']+)'.*?priority:\s*'([^']+)'/g)]
  if (!routes.length) throw new Error('SITEMAP_ROUTES parsed but empty')

  return routes.map(([, path, priority]) => ({ path, priority }))
}

const routes = await readRoutes()
const today = new Date().toISOString().split('T')[0]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    ({ path, priority }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
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

console.log(
  `[sitemap] ${routes.length} routes written · robots.txt = ${
    isProduction ? 'INDEXABLE (production)' : 'DISALLOW ALL (preview)'
  }`,
)
