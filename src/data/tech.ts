export interface TechItem {
  name: string
  role: string
  detail: string
}

/**
 * IMPORTANT: no manufacturer or software brand names anywhere on this site.
 * Several of the systems we run carry licence terms that restrict commercial
 * use of their name, so everything here describes capability rather than
 * product. Keep it that way when you edit — describe what the technology
 * measures or does, never what it is called.
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
    name: 'Multiple Tracking Systems',
    role: 'Matched to your venue',
    detail:
      'We run several different tracking technologies — optical, radar and photometric — because each performs best in different conditions. We bring the one that will be accurate in the space you are putting us in.',
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
      'Real-time leaderboard on screen',
      'Closest-to-the-pin and longest drive',
      'Scoring across teams or individuals',
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
  'A single standard 220V wall outlet. We arrive with a 30m industrial extension lead, so the bay can sit well away from the plug point.'
