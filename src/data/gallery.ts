import manifest from './cloudinary.json'

export const CLOUD_NAME = 'bo8j9vxt'

export interface CloudinaryAsset {
  publicId: string
  version: number
  format: string
  width?: number
  height?: number
  createdAt?: string
}

/**
 * Photos and videos come from Cloudinary tags, not from a list in this file.
 *
 *   sim2u-gallery    → the Gallery page
 *   sim2u-corporate  → the mosaic on the Corporate page
 *   sim2u-video      → video reels
 *   sim2u-site       → no grid; usable by name anywhere
 *
 * Tag an asset in Cloudinary to add it, untag it to remove it. The list in
 * src/data/cloudinary.json is refreshed automatically before every build by
 * scripts/fetch-cloudinary.mjs — don't edit that file by hand.
 *
 * THE LIBRARY AND THE GRIDS ARE TWO DIFFERENT THINGS. See PHOTO_LIBRARY
 * below; it is the whole point of the sim2u-site tag.
 */

/** Full-size delivery URL. f_auto/q_auto lets Cloudinary pick format and quality. */
export function imageUrl(asset: CloudinaryAsset, transform = 'f_auto,q_auto'): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transform}/v${asset.version}/${asset.publicId}.${asset.format}`
}

/** Sized variant — use for grid tiles so we aren't shipping full-size photos. */
export function imageThumb(asset: CloudinaryAsset, width = 800): string {
  return imageUrl(asset, `f_auto,q_auto,c_fill,g_auto,w_${width}`)
}

export function videoUrl(asset: CloudinaryAsset): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/v${asset.version}/${asset.publicId}.${asset.format}`
}

/** Cloudinary generates the poster frame from the video itself. */
export function videoPoster(asset: CloudinaryAsset, width = 1280): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/so_0,f_auto,q_auto,c_fill,w_${width}/v${asset.version}/${asset.publicId}.jpg`
}

/* ------------------------------------------------------------------------ *
 *  WHERE THE PHOTOS ON THE SITE COME FROM
 *
 *  Every grid photo is pulled from Cloudinary by TAG, not chosen in code:
 *
 *    sim2u-gallery    -> the Gallery page
 *    sim2u-corporate  -> the mosaic on the Corporate Events page
 *    sim2u-video      -> the reel on the Home and Gallery pages
 *    sim2u-site       -> no grid at all; see PHOTO_LIBRARY below
 *
 *  `npm run photos` refetches those tags, writes src/data/cloudinary.json and
 *  builds photo-index.html — a contact sheet showing every photo with its
 *  Cloudinary name printed underneath. That name is what the two lists below
 *  take.
 *
 *  SO: to drop a photo from a grid, the FIRST thing to try is removing the tag
 *  in Cloudinary. That is the whole point of the tags, it needs no code change,
 *  and the nightly build picks it up on its own. The lists below are for when
 *  you want it gone right now, or when a photo genuinely belongs in one place
 *  and not another.
 * ------------------------------------------------------------------------ */

/** Hidden from every grid on the site. */
export const HIDDEN_PHOTOS: string[] = [
  // 'IMG_1234_abcdef',
]

/**
 * Fine in the Gallery, but not proof of corporate work.
 *
 * A backyard net in a suburban garden is a perfectly good photo — it just
 * cannot sit under a heading about conferences and brand activations next to
 * a BMW showroom. It is tagged sim2u-corporate in Cloudinary; removing that
 * tag is the tidier fix, and then this line can go.
 */
export const EXCLUDE_FROM_CORPORATE: string[] = ['20260725_134627_kce6ve']

const without = (assets: CloudinaryAsset[], names: string[]) =>
  assets.filter((a) => !names.includes(a.publicId))

export const GALLERY_ASSETS = without(manifest.gallery as CloudinaryAsset[], HIDDEN_PHOTOS)
export const VIDEO_ASSETS = without(manifest.videos as CloudinaryAsset[], HIDDEN_PHOTOS)
export const CORPORATE_ASSETS = without(manifest.corporate as CloudinaryAsset[], [
  ...HIDDEN_PHOTOS,
  ...EXCLUDE_FROM_CORPORATE,
])

/** Tagged sim2u-site: usable by name, shown in no grid of its own. */
export const SITE_ASSETS = without(
  (manifest as { site?: CloudinaryAsset[] }).site ?? [],
  HIDDEN_PHOTOS,
)

/* ------------------------------------------------------------------------ *
 *  THE LIBRARY
 *
 *  Every photo the site is allowed to point at by name, whichever tag put it
 *  there. This exists because a tag used to mean two things at once:
 *  sim2u-gallery meant "show this in the Gallery grid" AND "make this photo
 *  findable by name", since the by-name lookup searched the gallery list. So
 *  a photo wanted on the home page events strip, or as a page banner, had to
 *  be published in the Gallery whether it belonged there or not.
 *
 *  Now:  which tag it carries  ->  which GRID it appears in
 *        any sim2u- tag at all ->  it is in the LIBRARY
 *
 *  Tag a photo sim2u-site and it is reachable by name from anywhere while
 *  appearing in no grid. A photo already tagged sim2u-gallery needs no second
 *  tag to be used as a hero — it is in the library already.
 *
 *  Order matters only for the fallback in `byName`, so gallery leads.
 *  Duplicates are expected (a photo can carry several tags) and the first
 *  occurrence wins — they resolve to the same URL either way.
 * ------------------------------------------------------------------------ */
function dedupeById(assets: CloudinaryAsset[]): CloudinaryAsset[] {
  const seen = new Set<string>()
  const out: CloudinaryAsset[] = []
  for (const asset of assets) {
    if (seen.has(asset.publicId)) continue
    seen.add(asset.publicId)
    out.push(asset)
  }
  return out
}

/*
 * Built from the raw tag lists, minus HIDDEN_PHOTOS only.
 *
 * EXCLUDE_FROM_CORPORATE deliberately does NOT apply here: it means "not
 * proof of corporate work", which is a statement about one grid, not about
 * whether the photo exists. HIDDEN_PHOTOS means gone from the site entirely,
 * so that one does apply.
 */
export const PHOTO_LIBRARY = dedupeById(
  without(
    [
      ...(manifest.gallery as CloudinaryAsset[]),
      ...(manifest.corporate as CloudinaryAsset[]),
      ...((manifest as { site?: CloudinaryAsset[] }).site ?? []),
    ],
    HIDDEN_PHOTOS,
  ),
)

export const GALLERY_IMAGES = GALLERY_ASSETS.map((a) => imageUrl(a))
export const CORPORATE_IMAGES = CORPORATE_ASSETS.map((a) => imageThumb(a, 900))

/**
 * Look a photo up by its Cloudinary name, for the slots that need one
 * specific picture (the page heroes). Names are stable, so adding or removing
 * other photos never shuffles these.
 *
 * Falls back to the first gallery photo if the name isn't found — a hero with
 * the wrong photo is survivable, a blank hero is not.
 */
export function byName(publicId: string, transform?: string): string {
  const hit = PHOTO_LIBRARY.find((a) => a.publicId === publicId)
  if (!hit) {
    if (import.meta.env.DEV) {
      console.warn(
        `[images] No Cloudinary photo named "${publicId}" in the library. Give it ` +
          `any sim2u- tag (sim2u-site if it should not appear in a grid), run ` +
          `"npm run photos", and check the name against the contact sheet.`,
      )
    }
    return PHOTO_LIBRARY.length ? imageUrl(PHOTO_LIBRARY[0], transform) : ''
  }
  return imageUrl(hit, transform)
}

/**
 * Look a photo up by name, but return null when it is not there.
 *
 * The difference from `byName` above is the failure case, and it matters.
 * `byName` substitutes the first photo in the library, which is right for a
 * decorative hero — a wrong photo is survivable, a blank one is not.
 *
 * Here the picture IS the point: a photo captioned as branded enclosure
 * panels, or as the leaderboard we built for a named client, has to be that
 * thing. Quietly showing an unrelated photo under that caption is worse than
 * showing none, so a bad name returns null and the caller leaves it out.
 *
 * A value starting with "/" is a file in public/ and is used as-is.
 *
 * This is the single by-name lookup for every "one specific picture" slot on
 * the site — event cards, add-on popups, corporate pillars. events.ts used to
 * keep its own copy; it now calls this one.
 */
export function photoByName(
  publicId: string,
  transform = 'f_auto,q_auto,c_fill,g_auto,w_1200',
): string | null {
  if (publicId.startsWith('/')) return publicId
  const hit = PHOTO_LIBRARY.find((a) => a.publicId === publicId)
  if (!hit) {
    if (import.meta.env.DEV) {
      console.warn(
        `[images] No Cloudinary photo named "${publicId}" in the library. Give it ` +
          `any sim2u- tag (sim2u-site if it should not appear in a grid), run ` +
          `"npm run photos", and check the name against photo-index.html.`,
      )
    }
    return null
  }
  return imageUrl(hit, transform)
}

/**
 * The one stock photo left on the site (homepage hero background).
 * Replace it in src/data/images.ts as soon as you have a wide shot of a
 * real setup — your own photography always outperforms stock here.
 */
export const STOCK_GOLF_COURSE =
  'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=2000'
