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
  /**
   * The event, in whatever words suit it — 'BHF Conference CTICC',
   * '14th Birthday Party'. Optional, and purely what is printed on the card.
   */
  location?: string
  /**
   * Show this review on the Corporate Events page.
   *
   * A flag of its own, because `location` used to do this job as well and
   * the two uses pulled apart the moment the locations were made specific.
   * The filter matched the exact string 'Corporate Event'; once the entries
   * said 'BHF Conference CTICC' and 'Rola Motors Somerset West Heritage Day'
   * — better words on the card, in every way an improvement — nothing
   * matched, and the Corporate page quietly lost every review it had. No
   * error, no blank space, just photographs where the proof used to be.
   *
   * So: `location` is what the card says, `corporate` is where it appears.
   * Rename an event freely now; nothing disappears.
   */
  corporate?: boolean
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
    /* Written as five separate lines, which is how it was left on Google.
       Kept that way rather than run together into a paragraph: joining them
       needs punctuation she did not write, and this file's one rule is that
       the words are hers. The card renders the line breaks. */
    quote:
      'Responds quickly\n' +
      'Generated quote same day\n' +
      'Easily available via WhatsApp\n' +
      'Setup done way before set time\n' +
      'Great personality, this helps a lot with the golfers',
    author: 'Jamie-Lee J.',
    role: 'Wichman and Co Event Planning',
    location: 'GrandWest Casino',
    corporate: true,
  },
  {
    /* The spaces before the commas and full stops are his own and are left
       alone, same as the typos elsewhere in this file. */
    quote:
      'Dylan was exceptional , he came out the week before to view the set up ' +
      'arrangements and stayed for the duration of our function to ensure ' +
      'everything ran smoothly . Highly recommend his company .',
    author: 'Mark S.',
    role: 'Life Church',
    location: "Warrior Men's Conference",
    corporate: true,
  },
  {
    quote:
      "What an amazing team! I can definitely vouch for them - if you want to add a truely fun adventure at your event, @Sim2U is the answer! @Medipost Pharmacy will secure your services again⛳️",
    author: 'Rentia M.',
    role: 'Medipost',
    location: 'BHF Conference CTICC',
    corporate: true,
  },
  {
    quote:
      'Fabulous team ensuring our event ran seamlessly and smoothly! Definite recommendation!!',
    author: 'Donovan M.',
    role: 'Medipost',
    location: 'BHF Conference CTICC',
    corporate: true,
  },
  {
    quote:
      'Amazing service and experience from Dylan and his team.',
    author: 'Mohammed D.',
    role: 'Qurtuba Online Academy',
    location: 'EduExpo Newlands',
    corporate: true,
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
      'Amazing experience. Great fun',
    author: 'Eugene T.',
    role: 'Mercedes-Benz',
    location: 'Rola Motors Somerset West Heritage Day',
    corporate: true,
  },
  {
    quote:
      'Amazing service and very friendly team! Really enjoyed what they did for us. 100% recommend.',
    author: 'Shain N.',
    role: 'Event Guest',
  },
]

/**
 * The reviews that came from corporate bookings.
 *
 * Set `corporate: true` on a review to include it. Marked on every review
 * whose `role` is an organisation rather than 'Private Host' or 'Event
 * Guest' — the people who booked us on behalf of a company.
 */
export const CORPORATE_TESTIMONIALS = TESTIMONIALS.filter((t) => t.corporate)
