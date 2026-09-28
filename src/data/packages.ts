export interface Tier {
  id: string
  name: string
  tagline: string
  image: string
  specs: { h: string; w: string; d: string }
  isCustomQuote: boolean
  /** Price at minHours. Every hour beyond that adds hourlyRate. */
  basePrice: number
  hourlyRate: number
  minHours: number
  durations: number[]
  /** Build time on site before your start. Happens outside your booked hours. */
  setupTime: string
  bestFor: string[]
  popular?: boolean
}

/**
 * Live pricing carried over from the current site.
 * Backyard has a special 3-hour rate of R3,500; every other hour is
 * basePrice + (hours - 4) * hourlyRate.
 */
export const TIERS: Tier[] = [
  {
    id: 'backyard',
    name: 'Backyard Budget',
    tagline: 'Braais, birthdays and intimate gatherings at home.',
    image: '/enclosure-backyard.webp',
    specs: { h: '2.5m', w: '3.1m', d: '5.0m' },
    isCustomQuote: false,
    basePrice: 3500,
    hourlyRate: 800,
    minHours: 3,
    durations: [3, 4, 5, 6, 7, 8],
    setupTime: '1 hour',
    bestFor: ['Home parties', 'Birthdays', 'Braai days', 'Small groups'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Enclosure',
    tagline: 'The premium footprint for wine estates, weddings and large events.',
    image: '/enclosure-outdoor.webp',
    specs: { h: '3.3m', w: '4.6m', d: '5.3m' },
    isCustomQuote: false,
    basePrice: 6000,
    hourlyRate: 1500,
    minHours: 4,
    durations: [4, 5, 6, 7, 8],
    setupTime: '2 hours',
    bestFor: ['Weddings', 'Estate events', 'Golf days', 'Large guest lists'],
    popular: true,
  },
  {
    id: 'corporate',
    name: 'Corporate Indoor',
    tagline: 'Sleek, professional footprint for conferences and brand activations.',
    image: '/enclosure-indoor.webp',
    specs: { h: '2.6m', w: '3.5m', d: '5.0m' },
    isCustomQuote: true,
    basePrice: 0,
    hourlyRate: 0,
    minHours: 4,
    durations: [4, 8],
    setupTime: '3 hours',
    bestFor: ['Conferences', 'Trade shows', 'Team building', 'Brand activations'],
  },
]

/**
 * Deterministic thousands separator.
 *
 * Do NOT swap this for toLocaleString(). Node and the browser resolve
 * locale data differently, so the server-rendered price and the hydrated
 * price disagree and React throws a hydration mismatch on every page that
 * displays one.
 */
export function formatRand(amount: number): string {
  return `R ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

/**
 * basePrice covers the minimum booking; every hour beyond it adds hourlyRate.
 * One rule for all tiers — no per-tier special cases.
 */
export function priceFor(tier: Tier, hours: number): string {
  if (tier.isCustomQuote) return 'Custom Quote'
  return formatRand(tier.basePrice + (hours - tier.minHours) * tier.hourlyRate)
}

export const INCLUDED_IN_EVERY_PACKAGE = [
  'Full mobile simulator setup and calibration',
  'Driving range mode, games and full course play',
  'Shot tracking stats and skills challenges',
  'Closest-to-the-pin and longest drive competitions',
  'Professional on-site technician running the session',
  'Complete setup and pack-down either side of your event',
]

export interface AddOn {
  name: string
  price: string
  detail: string
  /** Which icon the Packages page draws. See ADDON_ICONS there. */
  icon: 'print' | 'leaderboard' | 'camera'
  /**
   * Set when the add-on is delivered by a partner rather than by us.
   *
   * The card is drawn in the partner's colours: a solid banner across the
   * top, then their gradient behind the body.
   *
   * `accent` and `body` exist because tinting the body breaks the card's
   * normal palette. Our gold price manages only 2:1 against these pale
   * stops — effectively invisible — and the usual grey body text sits under
   * 4.5:1. Both are overridden here rather than left to fail quietly.
   * Measured worst cases: heading 10.3:1, price 7.0:1, body 6.1:1.
   */
  partner?: {
    name: string
    logo?: string
    /**
     * Which way round the supplied logo file is drawn.
     *
     * 'light' — a pale mark meant for dark backgrounds. It goes straight onto
     * the banner with no chip behind it; a white chip would erase it.
     * 'dark'  — a dark mark, which needs a light chip to sit on.
     *
     * This is not cosmetic. RuNic's file is a near-white monogram, and the
     * original white chip made it vanish entirely — a partner card with an
     * empty square where the logo should be. Set it to match the file.
     */
    logoInk?: 'light' | 'dark'
    theme: {
      /** Solid banner across the top, and the text that sits on it. */
      band: string
      bandInk: string
      /** Gradient behind the heading, price and description. */
      from: string
      via: string
      to: string
      /** Price colour, replacing gold. */
      accent: string
      /** Description colour, replacing grey. */
      body: string
    }
  }
}

/**
 * The add-ons, quoted alongside the package.
 *
 * ------------------------------------------------------------
 *  ADD-ONS THAT ARE NOT AGREED YET GO IN addons.draft.ts
 * ------------------------------------------------------------
 * Not in this file behind a flag. A first attempt staged the photography
 * add-on here with `draft: true` and filtered it out before rendering — which
 * looked safe and wasn't: Vite still bundles anything this module references,
 * so an unagreed price sat in the public JavaScript where anyone could read
 * it. Nothing imports addons.draft.ts, so nothing ships it.
 */
export const ADD_ONS: AddOn[] = [
  /**
   * EVENT PHOTOGRAPHY — delivered by RuNic Studios, not by us.
   *
   * Listed first deliberately. It is the only card carrying a partner's
   * colours, so it anchors the row and makes the point that we have a real
   * partner rather than a loose referral. If you would rather lead with our
   * own two services, move this object to the end of the array — nothing
   * else has to change.
   *
   * Agreed with Dylan 23 Sep: R900 per hour, covering every photo taken and
   * all the editing, with no per-image charge. Hours are settled per event,
   * which is why the copy sends that to the quote rather than naming a
   * number the card cannot keep.
   *
   * NOT agreed, and therefore NOT claimed anywhere in this card:
   *   · Usage rights. The copy says the images are delivered, never that
   *     they are the client's to use commercially, and never that Sim2U may
   *     publish them. Get both in writing before adding either line — the
   *     gallery is exactly where a corporate client's photos would end up.
   *   · Turnaround. No date is promised here for the same reason.
   */
  {
    name: 'Event Photography',
    icon: 'camera',
    /* Hand-written to match the other two ("From R1,300", "R2,000") rather
       than formatRand, which puts a space after the R.

       Not "From R900" — the rate itself is fixed at R900, and "From" would
       suggest the hourly figure can climb. What varies is the hours. */
    price: 'R900 / hour',
    /* Shorter than the other two on purpose: this card carries a logo band
       above it and needs the room. "Nothing extra per photo" is the line
       worth keeping — an hourly rate invites the reader to assume image
       packages and print fees are coming, and this one genuinely has none. */
    detail:
      'A professional photographer on site while the simulator runs. Every image edited and delivered afterwards, with nothing extra per photo. We agree the hours when we quote your event.',
    partner: {
      name: 'RuNic Studios',
      /* Their own colours, read off runicstudios.co.za: the blush-to-
         periwinkle gradient from their hero, with their indigo and a
         deepened rose for the text. Used as a band across the top of the
         card, not as the card's background — a card repainted end to end in
         a partner's palette reads as an advert pasted into the page rather
         than a service we stand behind.

         Both ink colours were checked against all three gradient stops:
         indigo clears 6.8:1 at worst, the rose 6.1:1. If you change a stop,
         re-check them — pale gradients hide unreadable text very well. */
      theme: {
        /* Their indigo, solid across the banner — the loud bit. */
        band: '#374375',
        bandInk: '#FFFFFF',
        /* Their hero gradient, lightened so dark text clears 4.5:1 on it. */
        from: '#F7E6DF',
        via: '#FFFCF5',
        to: '#E3E6F5',
        /* Gold would sit at 2:1 on that gradient, grey body text at 3.9:1.
           These replace them: 7.0:1 and 6.1:1 respectively. */
        accent: '#6E3F46',
        body: '#4A5568',
      },
      /* Their file, self-hosted in public/partners/ — never hotlinked from
         their site. Supplied as a 1000px transparent PNG; cropped to the
         monogram and resampled to 400px square.

         It is their pale variant (#FFFCF5), the one meant for dark grounds,
         which is why logoInk says 'light'. On the white chip this card gives
         a dark logo it disappears completely; on the indigo band it measures
         9.2:1, well clear of the 3:1 a graphic needs. If they ever send a
         dark-on-light file, switch this to 'dark' and the chip comes back. */
      logo: '/partners/runic-studios.png',
      logoInk: 'light',
    },
  },
  {
    name: 'Branded Enclosure Prints',
    icon: 'print',
    price: 'From R1,300',
    detail:
      'Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop everyone photographs. Artwork needs to reach us at least 10 business days before your date.',
  },
  {
    name: 'Live Leaderboard',
    icon: 'leaderboard',
    price: 'R2,000',
    detail:
      'A live standings page your guests can follow on their own phones, or put up on a second screen anywhere at the venue. Scores update as each shot lands, so the competition stays visible to people who are nowhere near the bay.',
  },
]

/**
 * Booking terms shown on the packages page and in the FAQ.
 *
 * These must not drift from src/data/terms.ts — that file carries the signed
 * agreement, and anything here that contradicts it is a promise the contract
 * does not back. Clause references are noted so the pairing is obvious.
 */

/** Clause 1. */
export const DEPOSIT = {
  percent: '50%',
  summary:
    'A 50% deposit, non-refundable, confirms your date the moment you accept the quote. The balance is due 48 hours before we set up.',
}

export const TRAVEL_POLICY = {
  origin: 'Somerset West Country Club',
  freeRadius: '20km',
  rate: 'R5 / km',
  note: 'Calculated round trip on anything beyond the first 20km.',
}

/**
 * Clause 5.2.
 *
 * There is deliberately no wind speed here. The agreement makes this a
 * judgement call on the day — "if wind gusts compromise the structural
 * stability of the enclosure" — so publishing a number (the old site said
 * 30 km/h) invents a threshold the contract does not contain, and cuts both
 * ways: it lets a client argue we should have set up at 29 km/h.
 */
export const WEATHER_POLICY = {
  maxWind: 'Our call',
  windNote: 'We suspend if gusts threaten the structure',
  rain: 'No-go',
  rainNote: 'Equipment is powered down and covered',
  refund: '70% refund',
  refundNote: 'If we cancel before dispatch. Once the build has started, the fee stands.',
}

/** Clause 5.1. */
export const CANCELLATION_POLICY = {
  notice: '7 days',
  early: 'Cancel more than 7 days out and your deposit is held against another date within six months.',
  late: 'Inside 7 days, the full booking fee is forfeited.',
}
