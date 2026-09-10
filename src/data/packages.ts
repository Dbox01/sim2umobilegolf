export interface Tier {
  id: string
  name: string
  tagline: string
  image: string
  specs: { h: string; w: string; d: string }
  isCustomQuote: boolean
  basePrice: number
  hourlyRate: number
  minHours: number
  durations: number[]
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
    image: '/backyard-setup.webp',
    specs: { h: '2.5m', w: '3.1m', d: '5.0m' },
    isCustomQuote: false,
    basePrice: 4200,
    hourlyRate: 800,
    minHours: 3,
    durations: [3, 4, 5, 6, 7, 8],
    bestFor: ['Home parties', 'Birthdays', 'Braai days', 'Small groups'],
  },
  {
    id: 'outdoor',
    name: 'Outdoor Enclosure',
    tagline: 'The premium footprint for wine estates, weddings and large events.',
    image: '/social-preview.webp',
    specs: { h: '3.3m', w: '4.6m', d: '5.3m' },
    isCustomQuote: false,
    basePrice: 6000,
    hourlyRate: 1500,
    minHours: 4,
    durations: [4, 5, 6, 7, 8],
    bestFor: ['Weddings', 'Estate events', 'Golf days', 'Large guest lists'],
    popular: true,
  },
  {
    id: 'corporate',
    name: 'Corporate Indoor',
    tagline: 'Sleek, professional footprint for conferences and brand activations.',
    image: '/indoor-setup.webp',
    specs: { h: '2.6m', w: '3.5m', d: '5.0m' },
    isCustomQuote: true,
    basePrice: 0,
    hourlyRate: 0,
    minHours: 4,
    durations: [4, 8],
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

export function priceFor(tier: Tier, hours: number): string {
  if (tier.isCustomQuote) return 'Custom Quote'
  if (tier.id === 'backyard' && hours === 3) return formatRand(3500)
  return formatRand(tier.basePrice + (hours - 4) * tier.hourlyRate)
}

export const INCLUDED_IN_EVERY_PACKAGE = [
  'Full mobile simulator setup and calibration',
  'Driving range mode, games and full course play',
  'Shot tracking stats and skills challenges',
  'Closest-to-the-pin and longest drive competitions',
  'Professional on-site technician running the session',
  'Complete setup and pack-down either side of your event',
]

/**
 * The only add-on Sim2U currently offers. If you add more later, follow the
 * same shape — and keep manufacturer and software brand names off the site.
 */
export const ADD_ONS = [
  {
    name: 'Branded Enclosure Prints',
    price: 'On quote',
    detail:
      'Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop everyone photographs. Artwork needs to reach us two weeks before your date.',
  },
]

export const TRAVEL_POLICY = {
  origin: 'Somerset West Country Club',
  freeRadius: '20km',
  rate: 'R5 / km',
  note: 'Calculated round trip on anything beyond the first 20km.',
}

export const WEATHER_POLICY = {
  maxWind: '30 km/h',
  windNote: 'Sustained or gusting',
  rain: 'No-go',
  rainNote: 'Free reschedule to an agreed alternative date',
}
