import React from 'react'
import { Camera } from 'lucide-react'
import { EVENTS, eventPhoto, type EventEntry } from '../data/events'

/**
 * The events strip: a photo per event, scrolling continuously under the hero.
 *
 * Everything shown here comes from src/data/events.ts. To change a photo or
 * add an event, edit that file — there is nothing to change in here.
 *
 * ---------------------------------------------------------------------------
 *  PHOTOS ONLY — NO REVIEWS
 * ---------------------------------------------------------------------------
 * These cards used to carry a Google review each. That came out because what
 * was going into it was mostly our own description of the event, rendered in
 * quote marks under five stars and "via Google" — our copy dressed as a
 * customer's. Reviews live in the testimonials section further down, where
 * every quote is genuinely something a customer wrote. See events.ts.
 *
 * ---------------------------------------------------------------------------
 *  NOTHING STOPS THIS STRIP
 * ---------------------------------------------------------------------------
 * No pause on hover, focus or touch. There were pointer handlers here and a
 * hover rule in index.css; both were removed deliberately. Do not add them
 * back. The prefers-reduced-motion stop in index.css is a different thing —
 * an operating-system accessibility setting, not an interaction — and stays.
 *
 * Because it never stops, a card has to be legible in passing: they are
 * narrower on phones so a whole one fits on screen, and the scroll is slow
 * enough that a card is in view for roughly 20 seconds on a phone and 50 on a
 * desktop. Shorten the duration and that stops being true.
 */

/**
 * Placeholders are for whoever is filling events.ts in, not for customers.
 *
 * "Photo to add" is useful while you are working — it shows at a glance what
 * is still outstanding. Live it reads as an unfinished page, so it appears
 * while running `npm run dev` and never in a built site. That is what lets
 * the code ship before the content does.
 */
const SHOW_TODO_MARKERS = import.meta.env.DEV

const EventCard: React.FC<{ item: EventEntry }> = ({ item }) => {
  const photo = eventPhoto(item.photo)

  return (
    <article className="relative w-[260px] sm:w-[300px] md:w-[340px] shrink-0 aspect-[16/10] rounded-[28px] overflow-hidden bg-mountainGreen shadow-[0_24px_60px_-38px_rgba(33,54,49,0.55)]">
      {photo ? (
        <img
          src={photo}
          alt={`Sim2U at ${item.name}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          width={800}
          height={500}
        />
      ) : (
        SHOW_TODO_MARKERS && (
          /* Either `photo` is blank or the name does not match anything in
             Cloudinary. Say which, rather than quietly showing some other
             event's photograph. Live, the card is just the brand panel. */
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
            <Camera size={26} aria-hidden="true" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]">
              Photo to add
            </span>
          </span>
        )
      )}

      {/* Scrim, so the name holds up over a bright or busy photo. */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-mountainGreen via-mountainGreen/25 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="font-serif text-white text-lg md:text-xl leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
          {item.name}
        </h3>
        {item.client && (
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold mt-1.5">
            {item.client}
          </p>
        )}
      </div>
    </article>
  )
}

const EventShowcase: React.FC = () => {
  /* Repeat until the row comfortably overfills a wide screen before it is
     doubled for the loop. A track narrower than the viewport leaves a visible
     gap sweeping across. ~360px a card, so 8 gets past a 2560px monitor. */
  const repeats = Math.max(1, Math.ceil(8 / Math.max(EVENTS.length, 1)))
  const pass = Array.from({ length: repeats }, () => EVENTS).flat()

  /* Longer track, longer duration — otherwise the same seconds spread over
     more pixels means it sweeps past faster. Scales with the content. */
  const duration = `${Math.round(pass.length * 11)}s`

  return (
    <div className="relative marquee-track overflow-hidden py-4">
      <div
        className="absolute inset-y-0 left-0 w-8 md:w-32 z-10 bg-gradient-to-r from-cream to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute inset-y-0 right-0 w-8 md:w-32 z-10 bg-gradient-to-l from-cream to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex animate-marquee" style={{ animationDuration: duration }}>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex items-start gap-5 md:gap-6 pr-5 md:pr-6 shrink-0"
            /* The second pass exists only so the loop has somewhere to slide
               into. Reading every event twice helps nobody. */
            aria-hidden={copy === 1 ? true : undefined}
          >
            {pass.map((item, i) => (
              <EventCard key={`${copy}-${i}-${item.name}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventShowcase
