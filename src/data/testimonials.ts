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

/**
 * The "Trusted By" strip on the home page.
 *
 * Only add a name here once you have actually worked with them — naming a
 * client you haven't is a real legal risk, not just an SEO one.
 *
 * Brand names are spelled the way the brand spells them, because that is what
 * people search for and what the brand will expect to see: "BMW", "MINI" and
 * "Mercedes-Benz" are all trademarks with a fixed form.
 */
export const CLIENT_LOGOS = [
  'Medipost Pharmacy',
  'BMW & MINI Tygervalley',
  'Rola Motors Mercedes-Benz',
  'Qurtuba Online Academy',
  'Private Functions',
]
