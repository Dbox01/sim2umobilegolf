import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, ExternalLink, Image as ImageIcon, Plus, Trophy, X } from 'lucide-react'
import { ADD_ONS, type AddOn } from '../data/packages'
import { photoByName } from '../data/gallery'
import { LOGO_URL, SITE_NAME } from '../data/site'

/**
 * The optional extras on the Packages page: three cards, each opening a popup.
 *
 * ---------------------------------------------------------------------------
 *  WHY A POPUP AT ALL
 * ---------------------------------------------------------------------------
 * Each card used to carry its whole paragraph. Three paragraphs side by side
 * is a wall of text: the cards stopped selling and started explaining, and the
 * prices — the thing people are actually scanning for — were buried in the
 * middle of it.
 *
 * So the card gets one line whose only job is to make someone curious, and the
 * popup does the explaining for whoever asked. The long copy lives in
 * `detail` in src/data/packages.ts; the one-liner is `blurb`.
 *
 * ---------------------------------------------------------------------------
 *  THE DIALOG IS HAND-BUILT, SO THE ACCESSIBILITY IS TOO
 * ---------------------------------------------------------------------------
 * A div that merely looks like a dialog is a trap for anyone not using a
 * mouse. This one does the five things that make it behave like one:
 * Escape closes it, the backdrop closes it, focus moves inside on open and
 * returns to the card that opened it on close, Tab cycles within it rather
 * than wandering off into the page behind, and the page behind cannot scroll
 * while it is up. Removing any of those breaks it for somebody — keep them.
 */

const ADDON_ICONS: Record<AddOn['icon'], React.ReactNode> = {
  print: <ImageIcon size={26} />,
  leaderboard: <Trophy size={26} />,
  camera: <Camera size={26} />,
}

/* -------------------------------------------------------------------------- */
/*                                   Dialog                                   */
/* -------------------------------------------------------------------------- */

const AddOnDialog: React.FC<{ addon: AddOn; onClose: () => void }> = ({
  addon,
  onClose,
}) => {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  /* Only photos that actually resolved. A caption promising the branded
     panels over a picture of something else is worse than no picture. */
  const photos = (addon.images ?? [])
    .map((name) => ({ name, src: photoByName(name) }))
    .filter((p): p is { name: string; src: string } => p.src !== null)

  useEffect(() => {
    closeRef.current?.focus()

    /* Lock the page behind. Restoring the previous value rather than setting
       '' matters — another component may have set it for its own reasons. */
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      // Keep Tab inside the dialog.
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusable || focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  const headingId = `addon-${addon.name.replace(/\W+/g, '-').toLowerCase()}`

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="presentation"
    >
      {/* Backdrop. aria-hidden because the close button below is the real
          control — this is a convenience for mouse users. */}
      <div
        className="absolute inset-0 bg-mountainGreen/70 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-[32px] shadow-[0_40px_90px_-30px_rgba(33,54,49,0.7)] animate-slideUp"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/90 backdrop-blur text-mountainGreen flex items-center justify-center shadow-lg hover:bg-mountainGreen hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
        >
          <X size={20} aria-hidden="true" />
        </button>

        {photos.length > 0 && (
          <div
            className={`grid gap-1 ${photos.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
          >
            {photos.map((photo, i) => (
              <img
                key={photo.name}
                src={photo.src}
                alt={`${addon.name} — example ${i + 1}`}
                /* One photo keeps its own proportions; several are squared
                   off so the grid stays even. A single fixed ratio would crop
                   the top off a tall leaderboard or the sides off a wide
                   enclosure shot. */
                className={
                  photos.length > 1 ? 'w-full aspect-square object-cover' : 'w-full h-auto'
                }
                loading="lazy"
              />
            ))}
          </div>
        )}

        <div className="p-8 md:p-10">
          {addon.partner && (
            <p
              className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-black uppercase tracking-[0.22em] mb-4"
              style={{ color: addon.partner.theme.band }}
            >
              <span>In partnership with {addon.partner.name}</span>
              {addon.partner.url && (
                /* The one link on this site that sends someone away, so it
                   opens in a new tab and carries rel="noopener noreferrer" —
                   without noopener the new tab can reach back and redirect
                   this one. */
                <a
                  href={addon.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-2 underline-offset-4 decoration-current/40 hover:decoration-current transition-colors focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-sm"
                >
                  {/* Shown as the bare domain: a person can see where the link
                      goes before they follow it. */}
                  {addon.partner.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
                  <ExternalLink size={11} aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </p>
          )}

          <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 mb-5">
            <h2
              id={headingId}
              className="text-3xl md:text-4xl font-serif text-mountainGreen"
            >
              {addon.name}
            </h2>
            <span
              className="font-black text-xs uppercase tracking-[0.2em]"
              style={
                addon.partner ? { color: addon.partner.theme.accent } : undefined
              }
            >
              <span className={addon.partner ? '' : 'text-gold'}>{addon.price}</span>
            </span>
          </div>

          <p className="text-gray-600 leading-relaxed md:text-lg">{addon.detail}</p>

          <p className="mt-8 pt-6 border-t border-mountainGreen/10 text-sm text-gray-500">
            Quoted alongside your package — mention it when you ask for a price.
          </p>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                                Heading band                                */
/* -------------------------------------------------------------------------- */

/**
 * The band across the top of every card, naming who actually delivers it.
 *
 * All three cards carry one so the row reads as a set rather than one
 * decorated card beside two plain ones — but they are not the same band, and
 * the difference is the point. Two of these we do ourselves; one is bought in
 * from a partner. Someone booking deserves to see which is which at a glance
 * rather than discovering it at the quote.
 *
 * Ours is Sim2U's mountain green. Theirs is their own colour, and only theirs
 * carries their wave motif — a brand device belongs to the brand that owns it.
 * A card repainted end to end in a partner's palette would read as an advert
 * pasted into the page, so the partner's colour stops at the band and the
 * gradient beneath it.
 */
const CardBand: React.FC<{ addon: AddOn }> = ({ addon }) => {
  const partner = addon.partner

  const background = partner ? partner.theme.band : '#213631' // mountainGreen
  const ink = partner ? partner.theme.bandInk : '#FFFFFF'
  const logo = partner ? partner.logo : LOGO_URL
  // Our own logo is a dark badge with its own background, so it needs no chip;
  // RuNic's pale monogram would vanish behind one. Both go on bare.
  const logoOnBare = partner ? partner.logoInk === 'light' : true
  const eyebrow = partner ? 'In partnership with' : 'Delivered by'
  const who = partner ? partner.name : SITE_NAME

  return (
    <div
      className="relative px-9 py-5 flex items-center gap-4 overflow-hidden"
      style={{ background }}
    >
      {/* RuNic's wave motif, theirs alone. */}
      {partner && (
        <svg
          className="absolute inset-x-0 bottom-0 w-full h-14 pointer-events-none"
          viewBox="0 0 400 56"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 7, 14, 21, 28].map((offset, i) => (
            <path
              key={offset}
              d={`M-20 ${30 + offset} C 60 ${14 + offset}, 120 ${46 + offset}, 200 ${30 + offset} S 340 ${14 + offset}, 420 ${30 + offset}`}
              fill="none"
              stroke={ink}
              strokeWidth="1"
              opacity={0.3 - i * 0.04}
            />
          ))}
        </svg>
      )}

      {logo ? (
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className={`relative w-12 h-12 object-contain shrink-0 ${
            logoOnBare ? 'rounded-xl' : 'rounded-xl bg-white/80 p-1.5'
          }`}
        />
      ) : (
        <span
          className="relative w-12 h-12 rounded-xl border-2 border-dashed text-[8px] font-bold uppercase tracking-wider flex items-center justify-center shrink-0"
          style={{ borderColor: `${ink}66`, color: `${ink}aa` }}
        >
          logo
        </span>
      )}

      <span className="relative leading-tight">
        <span
          className="block text-[9px] font-black uppercase tracking-[0.22em] opacity-60"
          style={{ color: ink }}
        >
          {eyebrow}
        </span>
        <span className="block font-bold text-[15px] mt-0.5" style={{ color: ink }}>
          {who}
        </span>
      </span>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    Card                                    */
/* -------------------------------------------------------------------------- */

const AddOnCard: React.FC<{ addon: AddOn; onOpen: () => void }> = ({
  addon,
  onOpen,
}) => (
  /* A button, not a div with a click handler — so it is reachable by keyboard,
     announced as a control, and works with Enter and Space for free. */
  <button
    type="button"
    onClick={onOpen}
    aria-label={`${addon.name} — read more`}
    className="group text-left bg-white rounded-[36px] border border-gold/25 shadow-[0_30px_70px_-40px_rgba(33,54,49,0.5)] flex flex-col overflow-hidden transition-all hover:-translate-y-1 hover:shadow-[0_40px_80px_-40px_rgba(33,54,49,0.6)] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-4 focus:ring-offset-cream"
  >
    <CardBand addon={addon} />

    <div
      className="p-8 md:p-9 flex flex-col gap-5 flex-1"
      style={
        addon.partner
          ? {
              background: `linear-gradient(140deg, ${addon.partner.theme.from} 0%, ${addon.partner.theme.via} 52%, ${addon.partner.theme.to} 100%)`,
            }
          : undefined
      }
    >
      <span
        className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
          addon.partner ? 'bg-white/70' : 'bg-gold/15 text-gold'
        }`}
        style={addon.partner ? { color: addon.partner.theme.band } : undefined}
      >
        {ADDON_ICONS[addon.icon]}
      </span>

      <span className="block">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-3">
          <span className="text-2xl md:text-[26px] font-serif text-mountainGreen">
            {addon.name}
          </span>
          <span
            className="font-black text-xs uppercase tracking-[0.2em]"
            style={addon.partner ? { color: addon.partner.theme.accent } : undefined}
          >
            <span className={addon.partner ? '' : 'text-gold'}>{addon.price}</span>
          </span>
        </span>

        <span
          className={`block leading-relaxed ${addon.partner ? '' : 'text-gray-500'}`}
          style={addon.partner ? { color: addon.partner.theme.body } : undefined}
        >
          {addon.blurb}
        </span>
      </span>

      {/* The affordance. Without something saying so, nobody discovers that a
          card opens — it just looks like a card. */}
      <span
        className="mt-auto pt-2 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-mountainGreen/50 group-hover:text-mountainGreen transition-colors"
        style={addon.partner ? { color: addon.partner.theme.accent } : undefined}
      >
        <Plus
          size={14}
          className="group-hover:rotate-90 transition-transform"
          aria-hidden="true"
        />
        Read more
      </span>
    </div>
  </button>
)

/* -------------------------------------------------------------------------- */

const AddOnCards: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  /* Where focus goes when the dialog closes. Dumping someone back at the top
     of the document after they close a dialog loses their place entirely. */
  const triggers = useRef<(HTMLDivElement | null)[]>([])

  const close = useCallback(() => {
    const returning = openIndex
    setOpenIndex(null)
    if (returning !== null) {
      triggers.current[returning]?.querySelector('button')?.focus()
    }
  }, [openIndex])

  return (
    <>
      <div
        className={`grid gap-6 mx-auto ${
          ADD_ONS.length >= 3 ? 'md:grid-cols-3 max-w-6xl' : 'md:grid-cols-2 max-w-5xl'
        }`}
      >
        {ADD_ONS.map((addon, i) => (
          <div
            key={addon.name}
            ref={(el) => {
              triggers.current[i] = el
            }}
            className="flex"
          >
            <div className="flex w-full [&>button]:w-full">
              <AddOnCard addon={addon} onOpen={() => setOpenIndex(i)} />
            </div>
          </div>
        ))}
      </div>

      {openIndex !== null && (
        <AddOnDialog addon={ADD_ONS[openIndex]} onClose={close} />
      )}
    </>
  )
}

export default AddOnCards
