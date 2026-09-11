export interface Faq {
  q: string
  a: string
}

/**
 * These feed both the visible accordion and the FAQPage JSON-LD on /contact,
 * which is what earns the expandable FAQ rows in Google results.
 *
 * Everything here is confirmed. Anything you change becomes a public
 * commitment the moment it is published as schema, so keep it accurate.
 */
export const FAQS: Faq[] = [
  {
    q: 'How long does setup take?',
    a: 'It depends on the enclosure. The backyard setup takes about an hour to build, the outdoor enclosure two hours, and a corporate indoor install three. We arrive early enough to be finished and calibrated before your start time — setup and pack-down happen outside your booked hours, so you get the full session you paid for.',
  },
  {
    q: 'What deposit do you require to secure a date?',
    a: 'A 50% deposit, which is non-refundable, secures your date the moment you accept the quote — the date is only held once it reflects. The remaining balance is due 48 hours before we set up, not on the day.',
  },
  {
    q: 'What happens if the weather turns?',
    a: 'We monitor conditions in the days before your event and talk to you early rather than on the morning. Rain is a no-go — the simulator runs high-end electronics that cannot be exposed — and we suspend play if gusts start to threaten the structure. If we call it off before we dispatch, you are refunded 70% of the fee, with 30% retained for logistics and preparation. Once the build has started on site, the full fee stands. Where a date can be moved instead of cancelled, we would always rather do that, and we will tell you what is possible as soon as we know.',
  },
  {
    q: 'How much space do I actually need?',
    a: 'It depends on the enclosure. Backyard Budget needs 2.5m height, 3.1m width and 5.0m depth. The Outdoor Enclosure needs 3.3m by 4.6m by 5.3m. Corporate Indoor needs 2.6m by 3.5m by 5.0m. Ceiling height is the constraint that catches people out most often — measure it before you book. These are the clear-space minimums set out in our booking terms, so it is worth checking rather than estimating.',
  },
  {
    q: 'What power do you need on site?',
    a: 'A single standard 220V wall outlet is all we need. We bring a 30m industrial extension lead, so the bay can be positioned well away from the plug point, indoors or outdoors.',
  },
  {
    q: 'Do you supply clubs, and what about left-handed players?',
    a: 'We bring the clubs, so nobody needs to arrive with equipment. The set is right-handed only. Left-handed guests are welcome to bring their own clubs — let us know when you book so we can plan the bay around it.',
  },
  {
    q: 'Do you travel outside Somerset West?',
    a: 'Yes. We cover the whole Western Cape — Cape Town, Stellenbosch, the Winelands, Paarl, Franschhoek and beyond. The first 20km from Somerset West Country Club is free, and anything past that is charged at R5 per kilometre, calculated round trip.',
  },
  {
    q: 'Do my guests need to know how to play golf?',
    a: 'Not at all, and most of them will not. We run multiplayer games and skills challenges designed for complete beginners, and our on-site technician coaches guests through their first swings. In practice the non-golfers usually end up having the best time.',
  },
  {
    q: 'How many people can play in a session?',
    a: 'Guests play in rotation rather than all at once, so a single bay works for anything from a small gathering to a full function — our technician keeps the queue moving and the games short. Tell us your guest count when you enquire and we will advise on the format that suits it best.',
  },
  {
    q: 'Can you brand the setup for our company?',
    a: 'Yes. We offer custom printed panels fitted to the outdoor enclosure, carrying your logo, event branding or campaign artwork. We handle the print and the fitting, and it is quoted per event. Artwork needs to be with us at least 10 business days before the event date.',
  },
  {
    q: 'Can you set up indoors?',
    a: 'Yes, and it is often the better option for corporate events. The Corporate Indoor enclosure is designed for conference venues, foyers and exhibition stands, with a footprint that fits standard ceiling heights.',
  },
]
