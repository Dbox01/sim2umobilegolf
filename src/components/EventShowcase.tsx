import React from 'react'
import { Camera, Star } from 'lucide-react'
import { EVENTS, eventPhoto, type EventEntry } from '../data/events'

/**
 * The events strip: a card per event, scrolling continuously.
 *
 * Everything shown here comes from src/data/events.ts. To change a photo or a
 * review, edit that file — there is nothing to change in here.
 *
 * ---------------------------------------------------------------------------
 *  WHY THE MOBILE HANDLING IS NOT THE SAME AS THE DESKTOP
 * ---------------------------------------------------------------------------
 * A scrolling name is glanceable; a scrolling QUOTE has to be read, and that
 * takes several seconds of dwell. On desktop that is solved by pausing on
 * hover. Phones have no hover, and a first attempt at this put a 320px card on
 * a 390px screen so cards were clipped at both edges while the text slid past —
 * unreadable.
 *
 * Three things fix it, and all three matter:
 *   · Cards are narrower on phones so a whole card sits on screen at once.
 *   · The scroll is slow enough to read a short quote as it crosses.
 *   · Touching the strip pauses it, which is the phone's version of hover.
 *
 * The quote is clamped rather than allowed to set the card height, so every
 * card is the same height and the row does not jiggle as it moves.
 */

const Stars: React.FC<{ count: number }> = ({ count }) => (
  <span className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        className={i < count ? 'fill-gold text-gold' : 'text-mountainGreen/15'}
        aria-hidden="true"
      />
    ))}
  </span>
)

/**
 * Placeholders are for whoever is filling events.ts in, not for customers.
 *
 * "Photo to add" and "Review to come" are useful while you are working —
 * they show at a glance what is still outstanding. On the live site they read
 * as an unfinished page. So they appear while running `npm run dev` and never
 * in a built site, which means the code can ship before the content does.
 */
const SHOW_TODO_MARKERS = import.meta.env.DEV

const EventCard: React.FC<{ item: EventEntry }> = ({ item }) => {
  const photo = eventPhoto(item.photo)

  return (
    <article className="w-[260px] sm:w-[300px] md:w-[340px] shrink-0 bg-white rounded-[28px] overflow-hidden border border-mountainGreen/8 shadow-[0_24px_60px_-38px_rgba(33,54,49,0.55)] flex flex-col">
      <div className="relative aspect-[16/10] bg-mountainGreen">
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
            /* No photo: either the name in events.ts is blank or it does not
               match anything in Cloudinary. Say which, rather than quietly
               showing some other event's photograph. Live, the card simply
               falls back to the brand panel behind this. */
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/40">
              <Camera size={26} aria-hidden="true" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em]">
                Photo to add
              </span>
            </span>
          )
        )}

        {/* Scrim, so the event name holds up over a bright or busy photo. */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-mountainGreen via-mountainGreen/30 to-transparent"
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
      </div>

      {/* Built only when there is a quote. A card whose review has not come
          in yet simply ends after the photo — shorter than its neighbours,
          which the row's top alignment handles. Reserving the space instead
          left four cards carrying 170px of blank white, which reads as a
          broken page rather than an unfinished one. */}
      {(item.review || SHOW_TODO_MARKERS) && (
        <div className="p-6 flex flex-col justify-center min-h-[168px]">
          {item.review ? (
            <figure className="m-0">
              <Stars count={item.review.rating ?? 5} />
              <blockquote className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-gray-600 italic line-clamp-4">
                “{item.review.text}”
              </blockquote>
              <figcaption className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-mountainGreen/55">
                {item.review.author}
                <span className="text-mountainGreen/30 font-bold normal-case tracking-normal ml-2">
                  via Google
                </span>
              </figcaption>
            </figure>
          ) : (
            SHOW_TODO_MARKERS && (
              /* Never filled in with a review from a different event. */
              <p className="text-[13px] leading-relaxed text-mountainGreen/35 italic text-center">
                Review to come
              </p>
            )
          )}
        </div>
      )}
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
    /* NOTHING STOPS THIS STRIP. No pause on hover, on focus, or on touch —
       it runs continuously whatever the visitor does. There were pointer
       handlers here and a hover rule in index.css; both were removed on
       purpose. Do not add them back. */
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
               into. Reading every review twice helps nobody. */
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
