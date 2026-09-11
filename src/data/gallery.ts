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
 *
 * Tag an asset in Cloudinary to add it, untag it to remove it. The list in
 * src/data/cloudinary.json is refreshed automatically before every build by
 * scripts/fetch-cloudinary.mjs — don't edit that file by hand.
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
  const hit = GALLERY_ASSETS.find((a) => a.publicId === publicId)
  if (!hit) {
    if (import.meta.env.DEV) {
      console.warn(
        `[images] No Cloudinary photo named "${publicId}". Run "npm run photos" ` +
          `and check the name against the contact sheet.`,
      )
    }
    return GALLERY_ASSETS.length ? imageUrl(GALLERY_ASSETS[0], transform) : ''
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
