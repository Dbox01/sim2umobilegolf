/**
 * Pulls the current photo and video lists out of Cloudinary and writes them to
 * src/data/cloudinary.json, which the site reads at build time.
 *
 * Runs automatically before every build (npm run build) and on demand
 * (npm run photos). You never need to call it directly.
 *
 * ------------------------------------------------------------------
 *  HOW YOU ADD OR REMOVE A PHOTO OR VIDEO
 * ------------------------------------------------------------------
 *  1. Upload it to Cloudinary as normal.
 *  2. Give it ONE of these tags — whichever grid you want it in:
 *
 *       sim2u-gallery    → appears on the Gallery page
 *       sim2u-corporate  → appears in the mosaic on the Corporate page
 *       sim2u-video      → appears as a video reel
 *       sim2u-site       → appears in NO grid
 *
 *     A photo can carry more than one if it belongs in more than one grid.
 *  3. To remove it from the site, remove the tag. The photo stays in
 *     your Cloudinary account either way.
 *
 *  The live site picks the change up on its next rebuild — automatic once a
 *  day, or immediately if you trigger the deploy workflow in GitHub.
 *
 * ------------------------------------------------------------------
 *  WHAT sim2u-site IS FOR, AND WHY IT EXISTS
 * ------------------------------------------------------------------
 *  A tag used to mean two things at once, and that was the problem.
 *  sim2u-gallery meant "put this in the Gallery grid" AND "make this photo
 *  findable by name" — because the by-name lookup searched the gallery list.
 *  So a photo you wanted on the home page events strip, or as a page banner,
 *  had to go in the public Gallery whether it belonged there or not.
 *
 *  Those are now two separate ideas:
 *
 *    THE LIBRARY   every photo carrying ANY sim2u- tag. Anything in the
 *                  library can be pointed at by name from anywhere on the
 *                  site — heroes, event cards, add-on popups.
 *
 *    THE GRIDS     which tag it carries decides which grid it turns up in.
 *
 *  sim2u-site is the library without a grid: "the site may use this photo,
 *  but do not put it in any grid on its own." That is the tag for an events
 *  strip photo, a banner, or anything you reference by name and nowhere else.
 *
 *  A photo already in the Gallery needs NO second tag to be used as a hero —
 *  sim2u-gallery already puts it in the library.
 *
 * ------------------------------------------------------------------
 *  ADDING A NEW SET LATER
 * ------------------------------------------------------------------
 *  Add a line to TAGS below. `grid: true` means a page renders that set as a
 *  grid (and a page has to be told to read it); `grid: false` means library
 *  only. Everything downstream — the manifest, the library, the contact
 *  sheet — picks it up from that one line.
 *
 * ------------------------------------------------------------------
 *  ONE-TIME CLOUDINARY SETTING
 * ------------------------------------------------------------------
 *  Cloudinary blocks public tag listing by default. In Cloudinary go to
 *  Settings → Security → "Restricted media types" and UNCHECK "Resource
 *  lists", then save. Until that is done this script keeps the previous
 *  list and the site carries on working unchanged.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const CLOUD_NAME = 'bo8j9vxt'

/**
 * Every tag the site knows about. One line per set — see the header.
 *
 *   tag   the Cloudinary tag you type in the Media Library
 *   kind  'image' or 'video' (Cloudinary lists them from different endpoints)
 *   grid  true  → a page renders this set as a grid
 *         false → library only; usable by name, shown in no grid
 */
const TAGS = {
  gallery: { tag: 'sim2u-gallery', kind: 'image', grid: true },
  corporate: { tag: 'sim2u-corporate', kind: 'image', grid: true },
  videos: { tag: 'sim2u-video', kind: 'video', grid: true },
  site: { tag: 'sim2u-site', kind: 'image', grid: false },
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const target = resolve(root, 'src/data/cloudinary.json')

const previous = JSON.parse(await readFile(target, 'utf8'))

async function fetchTag(tag, kind) {
  const url = `https://res.cloudinary.com/${CLOUD_NAME}/${kind}/list/${tag}.json`
  const res = await fetch(url, { signal: AbortSignal.timeout(20000) })

  if (res.status === 401 || res.status === 403) {
    // A 403 has two completely different causes and they need different fixes,
    // so read the body before blaming anyone. Cloudinary answers with JSON and
    // identifies itself in the Server header; a corporate proxy, firewall or
    // sandboxed CI egress answers with plain text and neither. Reporting a
    // network block as a Cloudinary setting sends you to the wrong screen.
    const body = (await res.text().catch(() => '')).slice(0, 200)
    const fromCloudinary =
      /cloudinary/i.test(res.headers.get('server') || '') || body.trimStart().startsWith('{')

    throw new Error(
      fromCloudinary
        ? `${tag}: Cloudinary refused the request (${res.status}). Resource lists are ` +
          `restricted — Settings → Security → uncheck "Resource lists".`
        : `${tag}: the request never reached Cloudinary — something on this network ` +
          `returned ${res.status}. This is a firewall/proxy/egress issue, not a ` +
          `Cloudinary setting. Response was: ${body || '(empty)'}`,
    )
  }
  if (res.status === 404) {
    // A tag with no assets 404s. That is a legitimate empty list, not an error.
    return []
  }
  if (!res.ok) throw new Error(`${tag}: HTTP ${res.status}`)

  const body = await res.json()
  return (body.resources ?? [])
    .map((r) => ({
      publicId: r.public_id,
      version: r.version,
      format: r.format,
      ...(r.width ? { width: r.width } : {}),
      ...(r.height ? { height: r.height } : {}),
      ...(r.created_at ? { createdAt: r.created_at } : {}),
    }))
    // Newest first, so a photo you upload today lands at the top of the gallery.
    .sort((a, b) => String(b.createdAt ?? '').localeCompare(String(a.createdAt ?? '')))
}

/* Keys come from TAGS, so adding a set up there is genuinely the only edit. */
const result = {
  generatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  source: 'cloudinary',
  ...Object.fromEntries(Object.keys(TAGS).map((key) => [key, []])),
}

const problems = []
for (const [key, { tag, kind, grid }] of Object.entries(TAGS)) {
  try {
    result[key] = await fetchTag(tag, kind)
    console.log(
      `[cloudinary] ${tag}: ${result[key].length} ${kind}(s)${grid ? '' : ' (library only)'}`,
    )
  } catch (err) {
    problems.push(err.message)
    result[key] = previous[key] ?? []
  }
}

if (problems.length) {
  // Never fail the build over this. A Cloudinary outage, an unset tag or a
  // missing network must not take the website down — we publish what we had.
  result.source = problems.length === Object.keys(TAGS).length ? 'previous' : 'partial'
  result.note =
    'Some tags could not be read; the previous list was kept for those. ' +
    problems.join(' | ')
  console.warn('\n[cloudinary] Kept the previous list for some tags:')
  for (const p of problems) console.warn(`  - ${p}`)
  console.warn('')
} else if (Object.keys(TAGS).every((key) => result[key].length === 0)) {
  // Every tag read cleanly but nothing anywhere is tagged — keep the seeded
  // list rather than publishing a site with no photographs on it.
  console.warn(
    '\n[cloudinary] Nothing carries a sim2u- tag yet — keeping the existing lists.\n' +
      '            Tag your photos in Cloudinary and they will appear on the next build.\n',
  )
  for (const key of Object.keys(TAGS)) result[key] = previous[key] ?? []
  result.source = 'previous'
  result.note = 'No assets tagged yet; using the seeded list.'
} else if (result.gallery.length === 0) {
  /* The gallery tag alone is empty while other sets are not. That is almost
     certainly a mistake — a tag typo, or photos moved to sim2u-site by
     accident — but it is also a thing you are allowed to do on purpose, so
     say so loudly and publish what was asked for rather than quietly putting
     yesterday's photos back. A build that overrules you is worse than an
     empty grid you can see and fix. */
  console.warn(
    '\n[cloudinary] Nothing carries sim2u-gallery, but other tags have assets.\n' +
      '            The Gallery page will be EMPTY on this build. If that is not what\n' +
      '            you meant, check the tag spelling in Cloudinary.\n',
  )
  result.note = 'sim2u-gallery is empty; the Gallery page has no photos.'
}

/* The corporate mosaic borrows from the gallery when it has nothing of its
   own, so that page is never blank before those photos get tagged. */
if (!result.corporate.length) result.corporate = result.gallery.slice(0, 7)

await writeFile(target, JSON.stringify(result, null, 2) + '\n')

/* The library is what you can point at by name, so it is the number worth
   printing — "19 in the gallery" says nothing about whether the photo you
   want on the home page is reachable. */
const library = new Set(
  Object.entries(TAGS)
    .filter(([, t]) => t.kind === 'image')
    .flatMap(([key]) => result[key].map((a) => a.publicId)),
)
console.log(
  `[cloudinary] src/data/cloudinary.json written — ${library.size} photos in the library ` +
    `(${result.gallery.length} in the gallery), ${result.videos.length} video(s), ` +
    `source: ${result.source}`,
)
