import React from 'react'
import { EVENTS_WORKED } from '../data/testimonials'

/**
 * The events we've worked, scrolling continuously across the page.
 *
 * ---------------------------------------------------------------------------
 *  THE FRAMING IS LOAD-BEARING
 * ---------------------------------------------------------------------------
 * This replaced a "Trusted By" strip, and the reason was legal. "Trusted By"
 * over a list of company names claims those companies endorse us, which none
 * of them has agreed to. Stating that we worked at a named event is a plain
 * fact instead of a borrowed endorsement.
 *
 * So the heading must stay factual. See the note above EVENTS_WORKED in
 * data/testimonials.ts before rewording anything here, and do not reintroduce
 * logos — a logo is a trademark and needs permission a factual mention does
 * not.
 *
 * ---------------------------------------------------------------------------
 *  HOW THE LOOP WORKS
 * ---------------------------------------------------------------------------
 * The list is rendered twice in one row. The row slides left by exactly half
 * its own width and restarts — and since the back half is identical to the
 * front half, the restart frame is pixel-identical and the seam is invisible.
 * With five events that is a short list, so it is repeated enough times to
 * comfortably overfill a wide screen before being doubled; a track narrower
 * than the viewport leaves a visible gap sweeping across.
 *
 * The duplicate is decorative repetition, so only the first pass is exposed to
 * screen readers — otherwise every event is announced twice.
 *
 * The outer wrapper MUST keep `overflow-hidden`. The track is deliberately
 * wider than the screen, and without it the whole page scrolls sideways on
 * mobile.
 */

/** Enough copies that the row overfills a wide monitor before it is doubled. */
const MIN_ITEMS_PER_PASS = 12

const pass = Array.from(
  { length: Math.ceil(MIN_ITEMS_PER_PASS / EVENTS_WORKED.length) },
  () => EVENTS_WORKED,
).flat()

const EventMarquee: React.FC = () => (
  <div className="relative marquee-track overflow-hidden py-2">
    {/* Fade the ends so items enter and leave rather than being chopped off
        at the edge of the screen. Pointer-events-none so they never swallow
        a hover or a tap. */}
    {/* Narrow on phones on purpose. These are a proportion of the screen, not
        a fixed nicety: two 96px fades on a 390px phone leave barely half the
        width readable and the whole row looks washed out. 48px a side still
        softens the edge without eating the content. */}
    <div
      className="absolute inset-y-0 left-0 w-12 md:w-56 z-10 bg-gradient-to-r from-cream via-cream/90 to-transparent pointer-events-none"
      aria-hidden="true"
    />
    <div
      className="absolute inset-y-0 right-0 w-12 md:w-56 z-10 bg-gradient-to-l from-cream via-cream/90 to-transparent pointer-events-none"
      aria-hidden="true"
    />

    <div className="flex animate-marquee">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          className="flex items-center shrink-0 m-0 p-0 list-none"
          /* The second pass is the same content again, purely so the loop has
             something to slide into. Reading it aloud twice helps nobody. */
          aria-hidden={copy === 1 ? true : undefined}
        >
          {pass.map((event, i) => (
            <li key={`${copy}-${i}`} className="flex items-center shrink-0">
              <span className="px-7 md:px-10 text-center">
                <span className="block font-serif text-xl md:text-2xl text-mountainGreen/70 italic tracking-tight whitespace-nowrap">
                  {event.name}
                </span>
                {/* The sub-line is rendered even when empty, holding its own
                    height. Without it, items with a client name are two lines
                    tall and items without are one, the row centres on the
                    tallest, and the event names drift up and down as they
                    pass. Reserving the space keeps every name on one baseline. */}
                <span
                  className="block text-[10px] font-black uppercase tracking-[0.25em] text-mountainGreen/35 mt-1.5 whitespace-nowrap"
                  aria-hidden={event.detail ? undefined : true}
                >
                  {event.detail ?? ' '}
                </span>
              </span>
              <span
                className="h-1.5 w-1.5 rounded-full bg-gold/40 shrink-0"
                aria-hidden="true"
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  </div>
)

export default EventMarquee
