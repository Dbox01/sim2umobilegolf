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

/** The add-ons Sim2U offers, quoted alongside the package. */
export const ADD_ONS = [
  {
    name: 'Branded Enclosure Prints',
    price: 'From R1,300',
    detail:
      'Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop everyone photographs. Artwork needs to reach us at least 10 business days before your date.',
  },
  {
    name: 'Live Leaderboard',
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
