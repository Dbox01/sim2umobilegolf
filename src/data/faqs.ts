export interface Faq {
  q: string
  a: string
}

/**
 * These feed both the visible accordion and the FAQPage JSON-LD on /contact,
 * which is what earns the expandable FAQ rows in Google results.
 *
 * NOTE FOR DYLAN: setup times and the deposit terms are placeholders.
 * Confirm both before launch — a wrong deposit figure published as schema
 * is a commitment you may have to honour.
 */
export const FAQS: Faq[] = [
  {
    q: 'How long does setup take?',
    a: 'We arrive roughly 90 minutes before your start time. A backyard setup is typically ready in 45 minutes; the full outdoor enclosure takes around 75 minutes. Pack-down is about 45 minutes. Setup and pack-down happen outside your booked hours, so you get the full session you paid for.',
  },
  {
    q: 'What deposit do you require to secure a date?',
    a: 'A 50% deposit confirms your booking, with the balance due on the day of the event. Dates are only held once the deposit reflects. Cancellations more than 14 days out are refunded in full.',
  },
  {
    q: 'What happens if the weather turns?',
    a: 'We monitor conditions in the days before your event. Our limit is sustained or gusting wind of 30 km/h, and rain is a no-go — the simulator runs high-end electronics that cannot be exposed. If conditions force a cancellation, we reschedule to an agreed alternative date at no extra charge.',
  },
  {
    q: 'How much space do I actually need?',
    a: 'It depends on the enclosure. Backyard Budget needs 2.5m height, 3.1m width and 5.0m depth. The Outdoor Enclosure needs 3.3m by 4.6m by 5.3m. Corporate Indoor needs 2.6m by 3.5m by 5.0m. Ceiling height is the constraint that catches people out most often — measure it before you book.',
  },
  {
    q: 'What power do you need on site?',
    a: 'A single standard 220V wall outlet is all we need. We bring a 30m industrial extension lead, so the bay can be positioned well away from the plug point, indoors or outdoors.',
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
    a: 'A single bay comfortably rotates 30 to 40 guests over four hours in a party format. For conference and trade show traffic, or guest lists over 60, we recommend a second bay to keep queues down.',
  },
  {
    q: 'Can you brand the setup for our company?',
    a: 'Yes. We offer custom printed panels fitted to the outdoor enclosure, carrying your logo, event branding or campaign artwork. We handle the print and the fitting, and it is quoted per event. Artwork needs to be with us two weeks before the event date.',
  },
  {
    q: 'Can you set up indoors?',
    a: 'Yes, and it is often the better option for corporate events. The Corporate Indoor enclosure is designed for conference venues, foyers and exhibition stands, with a footprint that fits standard ceiling heights.',
  },
]
