import { TIERS } from './packages'

/**
 * Booking Terms & Conditions — the single source of truth for the /terms page.
 *
 * This is Dylan's signed service agreement, transcribed. Two rules:
 *
 * 1. Nothing on the rest of the site may contradict what is in here. The
 *    Packages page reads DEPOSIT / WEATHER_POLICY / CANCELLATION_POLICY out of
 *    packages.ts, and those objects are written to match these clauses word for
 *    word in substance. If a clause changes here, change them there too.
 *
 * 2. The site clearances in clause 2 are DERIVED from TIERS, not typed out.
 *    The original agreement carried one blanket minimum of 4m x 5.5m x 3m,
 *    which was larger than the Backyard and Corporate Indoor setups on every
 *    axis — so a Backyard client was agreeing to a standard their own garden
 *    failed, with an Unsuitable Site Fee attached to it. Deriving the figures
 *    means the published footprint and the contractual minimum can never drift
 *    apart again.
 */

export const TERMS_LAST_UPDATED = 'September 2026'

/** Per-enclosure clear space, taken straight from the published tier specs. */
export const SITE_CLEARANCES = TIERS.map((tier) => ({
  name: tier.name,
  width: tier.specs.w,
  depth: tier.specs.d,
  height: tier.specs.h,
}))

export interface TermsItem {
  /** Optional lead-in, rendered in bold before the body. */
  label?: string
  body: string
}

export interface TermsSubsection {
  number: string
  title: string
  intro?: string
  items?: TermsItem[]
  body?: string
}

export interface TermsClause {
  /** Anchor id — also what the in-page contents list links to. */
  id: string
  number: string
  title: string
  intro?: string
  items?: TermsItem[]
  body?: string
  subsections?: TermsSubsection[]
  /** Renders the per-enclosure clearance table inside this clause. */
  showClearances?: boolean
}

export const TERMS_CLAUSES: TermsClause[] = [
  {
    id: 'payment',
    number: '1',
    title: 'Bookings & Payment Terms',
    items: [
      {
        label: 'Deposit',
        body: 'A 50% non-refundable deposit is required upon acceptance of the quote to confirm and secure the event date.',
      },
      {
        label: 'Balance payment',
        body: 'The remaining 50% balance is due strictly 48 hours prior to the scheduled setup time.',
      },
      {
        label: 'Failure to pay',
        body: 'Sim2U reserves the right to withhold installation if the full balance is not settled before equipment dispatch.',
      },
    ],
  },
  {
    id: 'site',
    number: '2',
    title: 'Site Requirements & Spatial Clearances',
    intro:
      'The Client is responsible for ensuring that the designated activation space meets the following minimum physical and technical criteria.',
    showClearances: true,
    items: [
      {
        label: 'Dimensions',
        body: 'A flat, level surface with clear space of at least the width, depth and height shown above for the setup booked, together with a clear path for our team to carry equipment to that spot. The clearance that applies to your booking is the one for the enclosure named in your quote.',
      },
      {
        label: 'Power supply',
        body: 'Direct access to a standard, dedicated 220V power outlet within 30 metres of the simulator location.',
      },
      {
        label: 'Unsuitable site fee',
        body: 'If Sim2U arrives on site and the designated area does not meet these minimum requirements, or is deemed unsafe or unusable, the full booking fee remains payable and no refunds will be issued.',
      },
      {
        label: 'Internet & connectivity',
        body: 'Sim2U provides an independent cellular hotspot to power the simulation software. The Client must ensure the designated setup location has strong, reliable cellular reception. If the activation is in a known dead zone — a basement, parking garage or heavily shielded exhibition hall — the Client must provide access to a stable venue Wi-Fi network. Sim2U accepts no liability for software downtime or loss of live features caused by poor cellular signal or network dropouts beyond our control.',
      },
    ],
  },
  {
    id: 'exhibitions',
    number: '3',
    title: 'Exhibition & Booth Build Sequencing',
    items: [
      {
        label: 'Assembly priority',
        body: 'For trade show and exhibition environments, the assembly of the simulator enclosure and frame must be sequenced carefully with overall booth construction.',
      },
      {
        label: 'Access clearance',
        body: 'The Client must ensure the simulator structure is erected before surrounding booth walls, counters or display items are installed that would block the delivery path or impede equipment positioning.',
      },
      {
        label: 'Delays',
        body: 'Sim2U is not responsible for setup delays resulting from blocked access or unscheduled construction by third-party booth builders.',
      },
    ],
  },
  {
    id: 'access',
    number: '4',
    title: 'Move-In, Access & Strike Operations',
    items: [
      {
        label: 'Venue access',
        body: 'The Client must arrange all necessary venue permits, security passes and loading dock access codes prior to Sim2U’s arrival.',
      },
      {
        label: 'Breakdown & strike',
        body: 'Equipment dismantling will occur immediately following the agreed event conclusion time. If venue restrictions force a delayed strike outside the agreed timetable, additional labour or waiting fees may apply.',
      },
    ],
  },
  {
    id: 'cancellations',
    number: '5',
    title: 'Cancellations & Rescheduling',
    subsections: [
      {
        number: '5.1',
        title: 'Client-initiated cancellations',
        items: [
          {
            label: 'More than 7 days’ notice',
            body: 'The deposit is retained but can be applied to a future booking within 6 months, rather than refunded.',
          },
          {
            label: 'Less than 7 days’ notice',
            body: '100% of the total booking fee is forfeited and is non-refundable.',
          },
        ],
      },
      {
        number: '5.2',
        title: 'Weather & outdoor safety policy',
        intro:
          'Applicable to outdoor and semi-outdoor installations. Due to the sensitivity of high-precision electronic equipment — launch monitors, projectors, tracking cameras and high-impact screens — the following rules apply.',
        items: [
          {
            label: 'Wind',
            body: 'Operations will be suspended if wind gusts compromise the structural stability of the enclosure.',
          },
          {
            label: 'Rain & moisture',
            body: 'Operations will cease immediately upon precipitation or extreme atmospheric moisture. Equipment will be powered down and covered.',
          },
          {
            label: 'Provider discretion',
            body: 'Sim2U retains sole discretion to suspend or terminate operations to protect participant safety and hardware integrity.',
          },
          {
            label: 'Weather cancellations',
            body: 'If an outdoor event is cancelled due to severe weather prior to dispatch or setup, the Client will receive a 70% refund of the total fee, with 30% retained for logistics and preparation. Once setup on site has commenced, the full booking fee remains payable regardless of weather-induced shutdowns.',
          },
        ],
      },
    ],
  },
  {
    id: 'liability',
    number: '6',
    title: 'Liability, Conduct & Damage',
    subsections: [
      {
        number: '6.1',
        title: 'Injury & personal property',
        body: 'Sim2U accepts no liability for personal injury, illness or property damage sustained by event participants or spectators while using or standing near the simulator, except where directly caused by Sim2U’s proven gross negligence. Participants use the equipment entirely at their own risk.',
      },
      {
        number: '6.2',
        title: 'Equipment damage & misuse',
        items: [
          {
            body: 'The Client assumes full financial responsibility for any loss or physical damage caused to Sim2U hardware, impact screens, enclosure framing, launch monitors or golf clubs by client guests or attendees through negligence, intentional misuse, or failure to follow staff safety instructions — for example striking equipment with a club, throwing objects, or bringing open liquid containers into the enclosure.',
          },
          { body: 'Damaged items will be billed to the Client at full replacement cost.' },
          {
            body: 'Sim2U staff reserve the right to refuse service to any heavily intoxicated individual, or to shut down the activation entirely if guests are abusive, without offering a refund.',
          },
        ],
      },
    ],
  },
  {
    id: 'assets',
    number: '7',
    title: 'Digital Assets & Visual Display',
    subsections: [
      {
        number: '7.1',
        title: 'Branding & content submission',
        items: [
          {
            body: 'For activations requiring custom software branding — logos, hole signage, dynamic leaderboards — all high-resolution visual assets must be submitted to Sim2U at least 10 business days prior to the event.',
          },
          {
            body: 'Sim2U is not liable for missing or improperly formatted graphics if assets are delivered after this deadline.',
          },
        ],
      },
      {
        number: '7.2',
        title: 'Visual quality & venue limitations',
        body: 'Sim2U uses high-lumen projectors and high-definition displays to provide the best possible visual experience. However, image clarity, contrast and overall graphic fidelity on the impact screen are heavily dependent on the venue’s ambient lighting. Sim2U is not liable for reduced visual quality, glare or washed-out graphics caused by intense overhead exhibition lighting, natural sunlight, or other environmental factors beyond our control. Sim2U also accepts no responsibility for pixelation or poor display quality resulting from low-resolution branding assets or media provided by the Client.',
      },
    ],
  },
]

/** The three points people actually want before they read the full document. */
export const TERMS_HIGHLIGHTS = [
  {
    title: 'Securing your date',
    body: '50% non-refundable deposit on acceptance of the quote. The balance is due 48 hours before setup.',
  },
  {
    title: 'Changing your date',
    body: 'More than 7 days out, your deposit moves to another date within 6 months. Inside 7 days, the booking fee is forfeited.',
  },
  {
    title: 'Weather',
    body: 'Cancelled before we dispatch, 70% is refunded. Once the build has started, the fee stands.',
  },
]

/* -------------------------------------------------------------------------- */
/*                               Privacy policy                               */
/* -------------------------------------------------------------------------- */

export const PRIVACY_LAST_UPDATED = 'August 2026'

/**
 * Kept deliberately short and true. Everything here describes what the site
 * actually does: the contact and lead forms post to Formspree, and nothing
 * else collects anything. Do not add a clause about a service we do not run —
 * an inaccurate privacy policy is worse than a brief one.
 */
export const PRIVACY_CLAUSES: TermsClause[] = [
  {
    id: 'collect',
    number: '1',
    title: 'What We Collect',
    intro:
      'We collect only what you type into a form on this site — typically your name, email address, phone number and the details of the event you are planning. We do not ask for, and have no use for, anything else.',
  },
  {
    id: 'use',
    number: '2',
    title: 'How We Use It',
    intro: 'Your details are used to run your enquiry and your booking:',
    items: [
      { body: 'To answer your enquiry and put a quote together.' },
      { body: 'To arrange delivery, setup and the running of your event.' },
      { body: 'To send invoices, booking confirmations and the details you need on the day.' },
      {
        body: 'If you signed up for the Joburg Tour list, to email you the dates when they are set. Every one of those emails carries an unsubscribe link.',
      },
    ],
  },
  {
    id: 'sharing',
    number: '3',
    title: 'Who Else Sees It',
    intro:
      'We do not sell your personal information, and we do not share it for anyone else’s marketing. Form submissions are delivered to us through Formspree, our form provider, which processes them on our behalf and does not use them for its own purposes.',
  },
  {
    id: 'retention',
    number: '4',
    title: 'How Long We Keep It',
    intro:
      'Enquiries and booking records are kept while they are useful for running and accounting for the work. Ask us to delete your details and we will, except where we are required to keep a record of a completed transaction.',
  },
  {
    id: 'rights',
    number: '5',
    title: 'Your Rights',
    intro:
      'Under the Protection of Personal Information Act, you may ask what we hold about you, ask us to correct it, or ask us to delete it. Email us and we will deal with it.',
  },
]
