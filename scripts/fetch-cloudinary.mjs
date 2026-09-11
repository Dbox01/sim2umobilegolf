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
 *  2. Give it one of these tags:
 *
 *       sim2u-gallery    → appears on the Gallery page
 *       sim2u-corporate  → appears in the mosaic on the Corporate page
 *       sim2u-video      → appears as a video reel
 *
 *     A photo can carry both sim2u-gallery and sim2u-corporate.
 *  3. To remove it from the site, remove the tag. The photo stays in
 *     your Cloudinary account either way.
 *
 *  The live site picks the change up on its next rebuild — automatic once a
 *  day, or immediately if you trigger the deploy workflow in GitHub.
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
const TAGS = {
  gallery: { tag: 'sim2u-gallery', kind: 'image' },
  corporate: { tag: 'sim2u-corporate', kind: 'image' },
  videos: { tag: 'sim2u-video', kind: 'video' },
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

const result = {
  generatedAt: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  source: 'cloudinary',
  gallery: [],
  corporate: [],
  videos: [],
}

const problems = []
for (const [key, { tag, kind }] of Object.entries(TAGS)) {
  try {
    result[key] = await fetchTag(tag, kind)
    console.log(`[cloudinary] ${tag}: ${result[key].length} ${kind}(s)`)
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
} else if (result.gallery.length === 0) {
  // Every tag read cleanly but nothing is tagged yet — keep the seeded list
  // rather than publishing a site with no photographs on it.
  console.warn(
    '\n[cloudinary] No assets carry the sim2u-gallery tag yet — keeping the existing list.\n' +
      '            Tag your photos in Cloudinary and they will appear on the next build.\n',
  )
  result.gallery = previous.gallery ?? []
  result.corporate = previous.corporate?.length ? previous.corporate : result.gallery.slice(0, 7)
  result.source = 'previous'
  result.note = 'No assets tagged yet; using the seeded list.'
}

if (!result.corporate.length) result.corporate = result.gallery.slice(0, 7)

await writeFile(target, JSON.stringify(result, null, 2) + '\n')
console.log(
  `[cloudinary] src/data/cloudinary.json written — ${result.gallery.length} photos, ` +
    `${result.videos.length} video(s), source: ${result.source}`,
)
