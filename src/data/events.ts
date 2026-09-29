import { GALLERY_ASSETS, imageUrl } from './gallery'

/**
 * ============================================================
 *  THE EVENTS STRIP UNDER THE HERO.
 * ============================================================
 *
 * One card per event: a photo from the day with the event and client named
 * over it. This is the only file you need to touch to change that strip.
 *
 * ------------------------------------------------------------
 *  THERE ARE NO REVIEWS HERE, ON PURPOSE
 * ------------------------------------------------------------
 * The cards carried a Google review each for a while. That came out because
 * what was going into it was mostly OUR OWN description of the event —
 * "Gentlemans Evening at BMW & Mini Tygervalley", and so on — rendered in
 * quote marks under five gold stars and the words "via Google". Sim2U's copy
 * presented as a customer's review is a fabricated testimonial, however
 * harmless the intent, and a named dealership noticing it would be a real
 * problem.
 *
 * So: photos here, reviews in the testimonials section further down the page,
 * where every quote is genuinely something a customer wrote. Keep it that way.
 * If you want a line of description under a photo, ask for a `caption` field —
 * plain text, no stars, no quote marks, nothing implying it came from anyone
 * but us.
 *
 * ------------------------------------------------------------
 *  HOW TO FILL IN A CARD
 * ------------------------------------------------------------
 *  1. Tag the photo `sim2u-gallery` in Cloudinary.
 *  2. Run:  npm run photos
 *     (this re-reads Cloudinary — a photo you tagged after the last run will
 *     not be found until you do this)
 *  3. Open photo-index.html. Every photo is shown with its name underneath.
 *  4. Copy the name into `photo`. Names are exact — StandDuringEvent_4_drdmsy
 *     is not the same as StandDuringEvent_q0iw4y.
 *  5. Save, then `npm run build` to see it.
 *
 *  Not in Cloudinary? Drop the file in public/ and write its path instead,
 *  e.g. photo: '/bmw-tygervalley.jpg'. Both work.
 *
 *  To ADD an event, copy a block and change the values. To remove one, delete
 *  its block. The strip adapts to however many there are.
 *
 * ------------------------------------------------------------
 *  ABOUT THE PHOTOS
 * ------------------------------------------------------------
 *  · Your own pictures of your own setup, from that event.
 *  · Landscape works best — the card crops to 16:10.
 *  · Think about guests who are recognisable in shot. A wide shot of the bay
 *    is always safer than a close-up of a face, and under POPIA a
 *    recognisable person in a marketing photo is their call, not yours.
 */

export interface EventEntry {
  /** The event. This is the line printed over the photo. */
  name: string
  /** The client, when that differs from the event name. Optional. */
  client?: string
  /** Cloudinary photo NAME (not a URL), or a /path to a file in public/. */
  photo: string
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
    // Was StandDuringEvent_q0iw4y, which is not in Cloudinary. This is the
    // closest real name — swap it if you meant a different picture.
    photo: 'StandDuringEvent_4_drdmsy',
  },
  {
    name: 'EduExpo',
    client: 'Qurtuba Online Academy',
    photo: 'IMG_9724_yzooil',
  },
  {
    name: 'BMW & MINI Tygervalley',
    photo: 'IMG_7758_vlrusn',
  },
  {
    name: 'Rola Motors Mercedes-Benz',
    photo: '',
  },
  {
    name: 'E-Piphany',
    photo: 'IMG_8896_x7rkoj',
  },
]
