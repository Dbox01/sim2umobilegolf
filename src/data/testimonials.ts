export interface Testimonial {
  quote: string
  author: string
  role: string
  location?: string
  photo?: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "What an amazing team! I can definitely vouch for them - if you want to add a truely fun adventure at your event, @Sim2U is the answer! @Medipost Pharmacy will secure your services again⛳️",
    author: 'Rentia M.',
    role: 'Medipost',
    location: 'Corporate Event',
    photo:
      'https://res.cloudinary.com/bo8j9vxt/image/upload/f_auto,q_auto/v1785231127/Medipost_Stand_Ladies._1_fwwzwr.jpg',
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

/** The reviews that came from corporate bookings. */
export const CORPORATE_TESTIMONIALS = TESTIMONIALS.filter(
  (t) => t.location === 'Corporate Event',
)

export interface EventWorked {
  /** The event or venue. This is the line people read. */
  name: string
  /** Who it was for, when that is a different thing from the event. */
  detail?: string
}

/**
 * Events we have set up at, scrolled across the home page.
 *
 * ---------------------------------------------------------------------------
 *  READ THIS BEFORE CHANGING THE WORDING AROUND IT
 * ---------------------------------------------------------------------------
 * This replaced a "Trusted By" strip, and the change was legal, not visual.
 *
 * "Trusted By" over a list of companies asserts a RELATIONSHIP — it reads as
 * those brands vouching for us, which is an endorsement none of them has
 * given. A factual statement that we worked at a named event is a different
 * kind of claim and a far more defensible one: it is either true or it isn't,
 * and ours are true.
 *
 * So the framing has to stay factual wherever this list is rendered. Safe:
 * "Events We've Worked", "Where We've Set Up". NOT safe: "Trusted By", "Our
 * Clients", "Partners", "As Used By" — all of those re-assert the endorsement
 * this section exists to avoid. Logos are out entirely for the same reason:
 * a logo is a trademark, and reproducing one needs permission that a factual
 * mention does not.
 *
 * Two further rules:
 *   · Only add an event that actually happened. The whole defence rests on
 *     every line being true.
 *   · Spell brand names the way the brand spells them — "BMW", "MINI",
 *     "Mercedes-Benz" all have a fixed form, and getting it wrong looks
 *     careless to exactly the client you are trying to impress.
 *
 * If any of these clients later gives written permission to use their logo,
 * that is a different and stronger section — worth asking for.
 */
export const EVENTS_WORKED: EventWorked[] = [
  { name: 'BHF Conference', detail: 'Medipost Pharmacy' },
  { name: 'EduExpo', detail: 'Qurtuba Online Academy' },
  { name: 'BMW & MINI Tygervalley' },
  { name: 'Rola Motors Mercedes-Benz' },
  { name: 'E-Piphany' },
]
