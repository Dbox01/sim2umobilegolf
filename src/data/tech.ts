export interface TechItem {
  name: string
  role: string
  detail: string
}

/**
 * IMPORTANT: no manufacturer or software brand names anywhere on this site.
 * The equipment we run carries licence terms that restrict commercial use of
 * its name, so everything here describes capability rather than product. Keep
 * it that way when you edit — describe what the technology measures or does,
 * never what it is called.
 *
 * ALSO: Sim2U runs ONE launch monitor. Nothing here may imply a fleet, a
 * choice of units, or that different systems are brought to different venues.
 */

/** What the tracking technology actually measures. */
export const TRACKING_TECH: TechItem[] = [
  {
    name: 'Precision Ball Tracking',
    role: 'Every shot measured',
    detail:
      'Ball speed, launch angle and spin rate captured on every strike, then translated into carry distance, total distance and left-right dispersion. The numbers on screen are measurements, not estimates.',
  },
  {
    name: 'Club Delivery Data',
    role: 'How you got there',
    detail:
      'Club head speed, smash factor and strike quality alongside the ball data — enough detail that a low-handicap player can work on something specific, rather than just watching a ball fly.',
  },
  {
    name: 'Indoors Or Outdoors',
    role: 'One setup, either way',
    detail:
      'The same tracking unit works in a marquee, a conference foyer or on a lawn. Nothing changes about the accuracy of the numbers when we move the bay inside because the Cape wind turned.',
  },
  {
    name: 'Calibrated On Site',
    role: 'Before guests arrive',
    detail:
      'Every setup is calibrated to the specific bay, lighting and surface on the day, then test-hit before your first guest picks up a club. Accuracy is a setup discipline, not a spec sheet claim.',
  },
]

/** What players actually do once they are standing in the bay. */
export const PLAY_MODES: TechItem[] = [
  {
    name: 'Famous Championship Courses',
    role: 'Full course play',
    detail:
      'Play complete rounds on faithful recreations of some of the best-known championship courses in the world, with true elevation changes, wind and green speeds. Stroke play, scramble and skins formats all work.',
  },
  {
    name: 'Games & Skills Challenges',
    role: 'Multiplayer',
    detail:
      'Closest-to-the-pin, longest drive, target challenges and team formats — short rounds designed to keep a group rotating through the bay instead of one person playing eighteen holes while everyone watches.',
  },
]

export const CAPABILITIES = [
  {
    title: 'Launch Precision',
    items: [
      'Ball speed, launch angle and spin rate',
      'Carry, total distance and dispersion',
      'Club head speed and smash factor',
      'Calibrated to your venue on arrival',
    ],
  },
  {
    title: 'Course Play',
    items: [
      'Faithful recreations of championship courses',
      'True elevation, wind and green speeds',
      'High-gain impact screen',
      'Stroke play, scramble and skins formats',
    ],
  },
  {
    title: 'Live Competition',
    items: [
      'Live scoring on the bay screen',
      'Closest-to-the-pin and longest drive',
      'Team, department or individual formats',
      'Results announced at the end of the session',
    ],
  },
  {
    title: 'Guest Experience',
    items: [
      'Multiplayer games for all skill levels',
      'Driving range and practice modes',
      'On-site technician running every session',
      'Instant shot replay between turns',
    ],
  },
]

/** Setup envelope per enclosure. Real figures from the live site. */
export const SETUP_REQUIREMENTS = [
  {
    name: 'Backyard Budget',
    height: '2.5m',
    width: '3.1m',
    depth: '5.0m',
    note: 'Fits most residential lawns, patios and double garages.',
  },
  {
    name: 'Outdoor Enclosure',
    height: '3.3m',
    width: '4.6m',
    depth: '5.3m',
    note: 'Our premium footprint for wine estates, weddings and large activations.',
  },
  {
    name: 'Corporate Indoor',
    height: '2.6m',
    width: '3.5m',
    depth: '5.0m',
    note: 'Designed for conference venues, foyers and exhibition stands.',
  },
]

export const POWER_REQUIREMENT =
  'A single standard 220V wall outlet within 30 metres of where the bay will stand — that is the length of the industrial extension lead we bring. It does not need to be close, but it does need to be within reach. If your only outlet is further away, tell us when you enquire.'

/**
 * The counterweight to a page full of hard numbers.
 *
 * Two rules this copy has to hold at once, which is why it is worded the way
 * it is and why it lives in one place rather than being retyped per page:
 *
 *  1. It must invite the conversation BEFORE the booking, never suggest the
 *     measurements soften once we are on site. The booking terms charge the
 *     full fee for an unusable site (clause 2), so a note that reads like a
 *     promise to squeeze in would hand a client an argument that the clause
 *     was waived.
 *  2. It must not contradict the ceiling rule. Width, depth and awkward
 *     corners genuinely do flex. Ceiling height does not — below the stated
 *     height the ball cannot be struck safely — and the Site Requirements
 *     section says so plainly. Blurring that to sound accommodating would
 *     produce exactly the wasted trip the note is meant to prevent.
 */
export const SMALLER_SPACES_NOTE = {
  title: 'Tighter than that? Ask us anyway.',
  body:
    'Width and depth are where we have surprised people — we have set up in smaller gardens and more awkward corners than you would expect. Ceiling height is the one measurement that cannot bend: below the height listed, the ball cannot be struck safely. Send us your measurements before you book and we will tell you honestly whether it works. What we confirm in writing is what applies on the day.',
}
