/**
 * ============================================================
 *  THE REVIEWS.
 * ============================================================
 *
 * Every review shown anywhere on the site is in this one file. Nothing is
 * fetched from Google at build time, so what is written here is exactly what
 * visitors see.
 *
 * ------------------------------------------------------------
 *  THE ONE RULE
 * ------------------------------------------------------------
 * `quote` must be the customer's own words, copied across as they wrote them.
 *
 * Not tidied up, not shortened into something punchier, and never written on
 * their behalf — a review is a statement by a named person about their own
 * experience, and putting words in their mouth under five gold stars is a
 * fabricated testimonial no matter how well it reflects the day.
 *
 * This has already gone wrong once here. The events strip used to carry a
 * "review" per card, and what had gone into those fields was Sim2U's own
 * description of the event, rendered in quote marks with stars and "via
 * Google" beneath it. They were removed. If you want to describe an event in
 * your own voice, that is a caption, and it goes on the events strip in
 * src/data/events.ts without quote marks or stars.
 *
 * Typos and odd punctuation in the quotes below are the customers' own and
 * are deliberately left alone. They read as real, because they are.
 *
 * ------------------------------------------------------------
 *  HOW TO ADD A REVIEW
 * ------------------------------------------------------------
 *  1. Copy this block, paste it into the list below, and fill it in:
 *
 *       {
 *         quote: 'exactly what they wrote, word for word',
 *         author: 'Firstname L.',
 *         role: 'Event Guest',
 *         location: 'Corporate Event',
 *       },
 *
 *  2. Save and push. The strip adapts to however many there are.
 *
 *  Order matters a little: the home page and most other pages show the first
 *  six, so put your strongest reviews near the top. The Gallery page shows
 *  all of them.
 *
 * ------------------------------------------------------------
 *  ABOUT THE NAMES
 * ------------------------------------------------------------
 *  Surnames are shortened to an initial — "Rentia M.", not the full name.
 *  Keep doing that. A public Google review is public, but a person's full
 *  name reproduced on a business's marketing site is a different thing under
 *  POPIA, and the initial costs the review nothing.
 *
 *  Never add a client's logo or full company name to a review without asking
 *  them. `role` naming an employer is fine where they already said so
 *  themselves in the review.
 *
 * ------------------------------------------------------------
 *  TO REMOVE A REVIEW
 * ------------------------------------------------------------
 *  Delete its block. If a customer ever asks for their review to come off the
 *  site, do it straight away — their review belongs to them.
 */

export interface Testimonial {
  /** The customer's own words. Never edited, never written for them. */
  quote: string
  /** First name plus surname initial, e.g. 'Rentia M.' */
  author: string
  /** Who they are: 'Event Guest', 'Private Host', or the company they named. */
  role: string
  /** The kind of event. Optional — drives the corporate filter at the bottom. */
  location?: string
}

/*
 * THERE IS NO `photo` FIELD, AND THAT IS ON PURPOSE.
 *
 * There used to be one, set on the Medipost review. When the reviews became a
 * rolling strip it had to go: the cards in that row all stretch to match the
 * tallest, so a picture on one card padded its full height into every other
 * card as empty white space — the short reviews were more than half blank
 * because of a photo they did not have.
 *
 * Event photographs have two better homes: the strip under the hero on the
 * home page (src/data/events.ts) and the Gallery. The Medipost stand photo
 * that was here is tagged sim2u-gallery and still appears in both.
 *
 * If you want photographs back alongside the reviews, the fix is a layout
 * that expects them on every card, not a field that one card in ten sets.
 */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "What an amazing team! I can definitely vouch for them - if you want to add a truely fun adventure at your event, @Sim2U is the answer! @Medipost Pharmacy will secure your services again⛳️",
    author: 'Rentia M.',
    role: 'Medipost',
    location: 'Corporate Event',
  },
  {
    quote:
      'Fabulous team ensuring our event ran seamlessly and smoothly! Definite recommendation!!',
    author: 'Donovan M.',
    role: 'Medipost',
    location: 'Corporate Event',
  },
  {
    quote:
      'I got it for my son 14th birthday, it was the best ever the boys loved it, I will highly recommend it.',
    author: 'Marelise De B.',
    role: 'Private Host',
    location: '14th Birthday Party',
  },
  {
    quote:
      'Babyshower well spent! Father to be and gents had a great time! Dylan and his team were very professional and seemed almost part of the group!',
    author: 'Jaco L.',
    role: 'Private Host',
    location: 'Baby Shower',
  },
  {
    quote:
      'I can recommend Dylan anytime, it was a awesome experience and he did everything so professionally. Do yourself a favor and book.',
    author: 'Vincent De B.',
    role: 'Private Host',
    location: '14th Birthday Party',
  },
  {
    quote:
      'Amazing service and very friendly team! Really enjoyed what they did for us. 100% recommend.',
    author: 'Shain N.',
    role: 'Event Guest',
  },
  {
    quote:
      'Great service , they kept it professional and fun. Setup was neat and precise had no problem with any technology would definitely recommend.',
    author: 'Arno L.',
    role: 'Event Guest',
  },
  {
    quote:
      'Service was fantastic, had a blast. These guys were very professional and had a great impact on the vibe of the event. I would recommend them for any function.',
    author: 'Andre van N.',
    role: 'Event Guest',
  },
  {
    quote:
      'Great product with amazing service would recommend 10/10 any day great for parties and services!',
    author: 'Riaan E.',
    role: 'Event Guest',
  },
  {
    quote: 'Great experience. Definitely will recommend for all types of events.',
    author: 'Keano H.',
    role: 'Event Guest',
  },
]

/**
 * The reviews that came from corporate bookings.
 *
 * Driven by `location`, so a new corporate review joins this automatically as
 * long as its location is exactly 'Corporate Event'.
 */
export const CORPORATE_TESTIMONIALS = TESTIMONIALS.filter(
  (t) => t.location === 'Corporate Event',
)
