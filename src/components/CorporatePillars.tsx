import React, { useCallback, useRef, useState } from 'react'
import { BarChart3, CalendarCheck, Palette, PencilRuler, Plus } from 'lucide-react'
import Modal, { modalHeadingId } from './Modal'
import { photoByName } from '../data/gallery'

/**
 * The four pillars on the Corporate Events page.
 *
 * ---------------------------------------------------------------------------
 *  WHY THESE ARE CLICKABLE NOW
 * ---------------------------------------------------------------------------
 * They were four paragraphs sitting side by side, and each one was answering
 * a question nobody had asked yet. Somebody scanning this page wants to know
 * what is on offer; somebody who has already decided they are interested
 * wants the lead time, the file format and who fits what. Those are two
 * different readers, and one block of copy serves neither.
 *
 * So the card carries a line, and the popup carries the answer. Same pattern
 * as the add-ons on the Packages page, and deliberately the same popup
 * component — see Modal.tsx.
 *
 * ---------------------------------------------------------------------------
 *  THE OUTDOOR-ONLY TAG IS NOT DECORATION
 * ---------------------------------------------------------------------------
 * Branded prints fit the outdoor enclosure and nothing else. Reading that
 * only after booking an indoor corporate package is a bad afternoon for
 * everyone, so it is stated twice: on the card, where it cannot be missed,
 * and again in the popup with what to do instead. `tag` exists for that.
 */

interface Pillar {
  icon: React.ReactNode
  title: string
  /** The card line. Short enough to read without deciding to read it. */
  blurb: string
  /** Small pill on the card — a limit somebody needs before they book. */
  tag?: string
  /** The popup. Cloudinary public id, or a path under public/. */
  image?: string
  detail: string[]
}

const PILLARS: Pillar[] = [
  {
    icon: <BarChart3 size={40} />,
    title: 'Live Leaderboards',
    blurb: 'Standings on the bay screen — and on every guest’s phone.',
    image: '/addon-leaderboard.webp',
    detail: [
      'Scoring runs live on the bay screen for the whole session. The format that lands best is closest-to-the-pin on a world-famous par 3: one shot each, an instant ranking, bragging rights settled before anyone sits down.',
      'Add the live leaderboard and those standings follow your guests onto their own phones, or onto a second screen anywhere at the venue. The competition then carries on across the room instead of only at the bay — which is the difference between an activity people queue for once and one they come back to.',
    ],
  },
  {
    icon: <Palette size={40} />,
    title: 'Branded Enclosure Prints',
    blurb: 'Your artwork printed across the enclosure panels.',
    tag: 'Outdoor enclosure only',
    image: '/addon-branded-prints.webp',
    detail: [
      'Custom printed panels fitted to the outdoor enclosure — your logo, event branding or campaign artwork, sized and mounted by us. It turns the bay into the backdrop guests photograph, which is usually where the event ends up on social media.',
      'This one is outdoor-enclosure only. The indoor setup has no printable panels, so if your event is indoors the branding goes on the screen and the leaderboard instead, and we will show you what that looks like before you decide.',
      'Artwork needs to reach us at least 10 business days before the event. We handle the print and the fitting.',
    ],
  },
  {
    icon: <PencilRuler size={40} />,
    title: 'Built Into Your Stand',
    blurb: 'We work directly with your stand designer or organiser.',
    detail: [
      'A good deal of our corporate work arrives through stand designers and event organisers, and the bay is easier to design around than people expect. Send us the stand drawings or the floor plan and we will work back from them: footprint, ceiling height, which way the screen faces, how the queue flows past it, and which side the power and the technician need to sit on.',
      'If the bay has to sit inside a built stand, match a colour scheme, or share a wall with your display, we will tell you what is possible before anything gets built rather than on the morning. We are happy to speak to your designer directly instead of everything passing through you.',
      'Fully customised setups are normal here, not an exception. If you have an idea for the space, bring it — the answer is usually yes, and where it is not we will say so early.',
    ],
  },
  {
    icon: <CalendarCheck size={40} />,
    title: 'Seamless Logistics',
    blurb: 'We build it, run it and pack it down. Your team does nothing.',
    detail: [
      'We arrive ahead of your start time, build the bay, calibrate it and test every mode before your first guest walks in. Our technician then runs the session end to end — resetting between players, keeping the queue moving and the leaderboard current.',
      'Pack-down happens once your guests have gone, not while they are still standing there. Your team never touches a cable, and nobody on your side has to become the person who knows how the simulator works.',
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

const PillarCard: React.FC<{ pillar: Pillar; onOpen: () => void }> = ({
  pillar,
  onOpen,
}) => (
  /* A button, not a div with a click handler — reachable by keyboard,
     announced as a control, and Enter and Space work for free. */
  <button
    type="button"
    onClick={onOpen}
    aria-label={`${pillar.title} — read more`}
    className="group w-full h-full text-left p-9 rounded-[32px] border border-white/10 bg-white/5 flex flex-col gap-5 relative overflow-hidden transition-all duration-500 hover:border-gold hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-4 focus:ring-offset-mountainGreen"
  >
    <span className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-gold/10 transition-colors" />

    <span className="text-gold relative group-hover:scale-110 group-hover:-rotate-6 transition-transform">
      {pillar.icon}
    </span>

    <span className="block relative">
      <span className="block text-2xl font-serif text-white mb-3">{pillar.title}</span>
      <span className="block text-sm leading-relaxed text-white/60">{pillar.blurb}</span>
    </span>

    {pillar.tag && (
      <span className="relative inline-flex self-start items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-gold">
        {pillar.tag}
      </span>
    )}

    {/* The affordance. Without it, a card that opens just looks like a card. */}
    <span className="relative mt-auto pt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-gold transition-colors">
      <Plus size={14} className="group-hover:rotate-90 transition-transform" aria-hidden="true" />
      Read more
    </span>
  </button>
)

/* -------------------------------------------------------------------------- */

const CorporatePillars: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  /* Where focus goes when the popup closes. Closing a dialog should not dump
     someone back at the top of the document. */
  const triggers = useRef<(HTMLDivElement | null)[]>([])

  const close = useCallback(() => {
    const returning = openIndex
    setOpenIndex(null)
    if (returning !== null) {
      triggers.current[returning]?.querySelector('button')?.focus()
    }
  }, [openIndex])

  const open = openIndex !== null ? PILLARS[openIndex] : null
  /* Null on a miss rather than a substitute photo — a heading about branded
     panels over a picture of something else is worse than no picture. */
  const openImage = open?.image ? photoByName(open.image) : null

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.title}
            ref={(el) => {
              triggers.current[i] = el
            }}
            className="flex"
          >
            <PillarCard pillar={pillar} onOpen={() => setOpenIndex(i)} />
          </div>
        ))}
      </div>

      {open && (
        <Modal labelledBy={modalHeadingId(open.title)} onClose={close}>
          {openImage && (
            <img
              src={openImage}
              alt={`${open.title} at a Sim2U corporate event`}
              className="w-full h-auto"
              loading="lazy"
            />
          )}

          <div className="p-8 md:p-10">
            {open.tag && (
              <p className="mb-4 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-gold">
                {open.tag}
              </p>
            )}

            <h2
              id={modalHeadingId(open.title)}
              className="text-3xl md:text-4xl font-serif text-mountainGreen mb-5"
            >
              {open.title}
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed md:text-lg">
              {open.detail.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-8 pt-6 border-t border-mountainGreen/10 text-sm text-gray-500">
              Tell us about your event and we&rsquo;ll come back with a format and a
              fixed quote.
            </p>
          </div>
        </Modal>
      )}
    </>
  )
}

export default CorporatePillars
