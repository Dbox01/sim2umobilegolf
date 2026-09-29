import { GALLERY_ASSETS, imageUrl } from './gallery'

/**
 * ============================================================
 *  THE EVENTS STRIP ON THE HOME PAGE.
 * ============================================================
 *
 * One card per event: a photo from the day, the client, and their Google
 * review. This is the only file you need to touch to change that strip.
 *
 * ------------------------------------------------------------
 *  HOW TO FILL IN A CARD
 * ------------------------------------------------------------
 *  1. Run:  npm run photos
 *  2. Open photo-index.html (double-click it). Every photo in your Cloudinary
 *     is shown with its name printed underneath.
 *  3. Find the photo from that event, copy its name into `photo` (it starts
 *     out empty).
 *  4. Copy the review off your Google listing into `review`.
 *  5. Save. That is the whole job — nothing else in the codebase changes.
 *
 *  Not in Cloudinary? Drop the image file into public/ and write its path
 *  instead, e.g. photo: '/bmw-tygervalley.jpg'. Both work.
 *
 *  To ADD an event, copy a whole block and change the values. To remove one,
 *  delete its block. The strip adapts to however many there are.
 *
 * ------------------------------------------------------------
 *  RULES THAT MATTER
 * ------------------------------------------------------------
 *  · QUOTE REVIEWS VERBATIM. Shortening is fine — trim to the sentence that
 *    carries and put … where you cut. Rewording someone's review, even to
 *    improve it, means publishing words they did not write under their name.
 *  · KEEP IT SHORT. Around 30 words. The card clamps longer text, so a long
 *    review gets cut off mid-sentence rather than shrinking to fit.
 *  · NAME THE REVIEWER AS GOOGLE SHOWS THEM. If Google says "Rentia M.",
 *    write "Rentia M." — not their full name from your own records.
 *  · RATING MUST BE THE REAL ONE. It defaults to 5. If a review was four
 *    stars, write 4. Showing five stars over a four-star review is the kind
 *    of small dishonesty that is very hard to explain afterwards.
 *  · PHOTOS: your own pictures of your own setup, from that event. Think
 *    about guests who are recognisable in shot — a wide shot of the bay is
 *    always safer than a close-up of someone's face, and under POPIA a
 *    recognisable person in a marketing photo is their call, not yours.
 *
 * ------------------------------------------------------------
 *  IF A REVIEW IS NOT IN YET
 * ------------------------------------------------------------
 *  Set `review: null`. The card still shows the photo and the event name and
 *  simply leaves the quote out — it does not look broken. Never fill the gap
 *  with a review from a different event.
 */

export interface EventEntry {
  /** The event. This is the line printed over the photo. */
  name: string
  /** The client, when that differs from the event name. Optional. */
  client?: string
  /** Cloudinary photo NAME (not a URL) — see step 3 above. */
  photo: string
  /** Their Google review, or null until it arrives. */
  review: {
    text: string
    author: string
    /** Real star count. Defaults to 5. */
    rating?: number
  } | null
}

/**
 * Resolves a Cloudinary name to a card-sized image URL.
 *
 * Returns null rather than a fallback when the name is wrong. `byName()` in
 * gallery.ts quietly substitutes the first photo in the library, which is the
 * right call for a decorative slot and the WRONG one here: a mistyped name
 * would put some other client's event photo under "BMW & MINI Tygervalley".
 * A missing photo is obvious and fixable; a plausible wrong one is neither.
 */
export function eventPhoto(publicId: string): string | null {
  // Anything starting with "/" is a file you dropped in public/, used as-is.
  // Cloudinary is the easier route for most photos, but if you already have
  // the picture as a file it is one less step: put it in public/ and write
  // "/my-photo.jpg" here.
  if (publicId.startsWith('/')) return publicId

  const hit = GALLERY_ASSETS.find((a) => a.publicId === publicId)
  if (!hit) {
    if (import.meta.env.DEV) {
      console.warn(
        `[events] No Cloudinary photo named "${publicId}". Run "npm run photos" ` +
          `and check the name against photo-index.html.`,
      )
    }
    return null
  }
  // Card-sized and smart-cropped. These are ~360px wide on screen, so 800px
  // covers retina without shipping the full-resolution original.
  return imageUrl(hit, 'f_auto,q_auto,c_fill,g_auto,w_800')
}

export const EVENTS: EventEntry[] = [
  {
    name: 'BHF Conference',
    client: 'Medipost Pharmacy',
    photo: '', // ← Cloudinary name goes here
    review: {
      // Already on file from your Google reviews — trimmed to fit the card.
      text: 'If you want to add a truly fun adventure at your event, Sim2U is the answer. Medipost Pharmacy will secure your services again.',
      author: 'Rentia M.',
    },
  },
  {
    name: 'EduExpo',
    client: 'Qurtuba Online Academy',
    photo: '', // ← Cloudinary name goes here
    review: null,
  },
  {
    name: 'BMW & MINI Tygervalley',
    photo: '', // ← Cloudinary name goes here
    review: null,
  },
  {
    name: 'Rola Motors Mercedes-Benz',
    photo: '', // ← Cloudinary name goes here
    review: null,
  },
  {
    name: 'E-Piphany',
    photo: '', // ← Cloudinary name goes here
    review: null,
  },
]
