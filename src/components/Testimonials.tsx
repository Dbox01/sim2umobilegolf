import React, { useState } from 'react'
import { TESTIMONIALS, type Testimonial } from '../data/testimonials'

/**
 * The reviews, scrolling continuously.
 *
 * Everything shown here comes from src/data/testimonials.ts. To add, change
 * or remove a review, edit that file — there is nothing to change in here.
 *
 * ---------------------------------------------------------------------------
 *  THIS ONE PAUSES. THE EVENTS STRIP DOES NOT.
 * ---------------------------------------------------------------------------
 * That difference is on purpose and it is not an inconsistency.
 *
 * The events strip carries photographs, which you take in at a glance; if one
 * slides past there is another along shortly. A review is forty words of
 * someone else's sentence. If it drifts off mid-thought the reader has lost
 * the thread, and nobody chases a moving paragraph — they just stop reading,
 * which defeats the point of having reviews on the page at all.
 *
 * So this strip stops on hover and on keyboard focus. The container is
 * focusable for that second reason: it means somebody tabbing through the
 * page can hold it still without a mouse, which is what makes this an actual
 * pause mechanism rather than a convenience for mouse users. Moving content
 * that runs for more than five seconds is supposed to have one.
 *
 * The CSS lives in index.css as .animate-marquee-reviews — a separate
 * animation from the events strip's .animate-marquee, so that changing one
 * cannot silently change the other.
 *
 * ---------------------------------------------------------------------------
 *  WHY THE ARROWS WENT
 * ---------------------------------------------------------------------------
 * There were previous/next buttons here when this was a paged scroller. A
 * continuously moving track has no pages to step between, so the buttons had
 * nothing coherent to do. Holding the strip still is what a reader actually
 * wants, and that is what hovering now does.
 */

/**
 * Seconds of travel per card width. This is a reading speed, not a sweep.
 *
 * Set from the phone, which is the harder case: a narrow screen holds about
 * one card, so a card is on screen for roughly this long. The longest review
 * here is about forty words, which is twelve seconds of reading at an
 * ordinary pace, so anything under that guarantees the strip outruns the
 * reader. On a desktop three or four cards are visible at once, so the same
 * number gives a card the better part of a minute.
 *
 * Lower this and you break the phone first, where it is hardest to notice.
 */
const SECONDS_PER_CARD = 13

const ReviewCard: React.FC<{ item: Testimonial }> = ({ item }) => (
  <blockquote className="w-[300px] sm:w-[360px] md:w-[400px] shrink-0 flex">
    <div className="relative w-full flex flex-col p-8 md:p-9 bg-white rounded-[32px] border border-mountainGreen/[0.04] shadow-[0_15px_30px_-10px_rgba(33,54,49,0.06)]">
      <span
        className="absolute top-3 left-6 text-8xl font-serif text-gold/15 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <div className="relative z-10 flex-1">
        <div className="flex gap-1 mb-5" aria-label="5 out of 5 stars">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-gold text-lg" aria-hidden="true">
              ★
            </span>
          ))}
        </div>

        {/* No photo here, deliberately — see the note in testimonials.ts.
            Cards in this row all stretch to the tallest, so a picture on one
            of them pads that height into every other card as white space. */}
        <p className="text-gray-600 italic text-[15px] leading-relaxed font-medium">
          {item.quote}
        </p>
      </div>

      <footer className="pt-6 border-t border-mountainGreen/5 mt-auto">
        <cite className="not-italic">
          <span className="text-mountainGreen font-black uppercase tracking-wider text-sm block">
            {item.author}
          </span>
          <span className="text-xs text-gray-400 font-semibold mt-1 block">
            {item.role}
            {item.location ? ` — ${item.location}` : ''}
          </span>
        </cite>
      </footer>
    </div>
  </blockquote>
)

const Testimonials: React.FC<{ limit?: number; heading?: string }> = ({
  limit,
  heading = 'What our clients say',
}) => {
  /**
   * Touch pause.
   *
   * The CSS handles hover and keyboard focus, but :hover is not something a
   * phone reliably has — a tap may fire it, may fire it and never clear it,
   * or may do nothing, depending on the browser. Since most people reading
   * this page are on a phone, leaving it to :hover would mean the pause works
   * everywhere except where it matters most. Holding a finger on the strip
   * stops it; lifting off starts it again.
   */
  const [held, setHeld] = useState(false)

  /**
   * Keyboard focus pause — and note it is KEYBOARD focus, not any focus.
   *
   * The container is focusable so it can be paused without a mouse. But a tap
   * or a click also focuses it, so a plain :focus-within rule in CSS meant
   * tapping the strip on a phone froze it permanently, with nothing to
   * explain why. :focus-visible is the browser's own judgement of "this focus
   * came from the keyboard", which is exactly the distinction wanted, and it
   * cannot be expressed in CSS on an ancestor.
   */
  const [keyboardFocused, setKeyboardFocused] = useState(false)

  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS

  /* Repeat until the row overfills a wide screen before it is doubled for the
     loop. A track narrower than the viewport leaves a visible gap sweeping
     across. ~420px a card, so 7 gets past a 2560px monitor. */
  const repeats = Math.max(1, Math.ceil(7 / Math.max(items.length, 1)))
  const pass = Array.from({ length: repeats }, () => items).flat()

  /* Longer track, longer duration — otherwise the same seconds spread over
     more pixels means it sweeps past faster. Scales with the content. */
  const duration = `${Math.round(pass.length * SECONDS_PER_CARD)}s`

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-serif text-mountainGreen mb-8 px-2">
        {heading}
      </h2>

      <div
        className="relative marquee-track marquee-pausable overflow-hidden py-4 rounded-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4"
        /* Focusable so the strip can be held still from the keyboard. The
           label says what focusing it does, because a region that stops
           moving when you reach it is not self-evident. */
        tabIndex={0}
        role="region"
        aria-label="Customer reviews. Hold, hover or focus to pause the scrolling."
        onPointerDown={() => setHeld(true)}
        onPointerUp={() => setHeld(false)}
        onPointerCancel={() => setHeld(false)}
        onPointerLeave={() => setHeld(false)}
        onFocus={(e) => {
          /* Guarded: matches() throws on older engines that do not know
             :focus-visible, and a thrown error here would take the page with
             it. Falling back to "not a keyboard focus" leaves hover and hold
             working, which is the safe direction. */
          try {
            setKeyboardFocused(e.target.matches(':focus-visible'))
          } catch {
            setKeyboardFocused(false)
          }
        }}
        onBlur={() => setKeyboardFocused(false)}
      >
        {/* Edge fades, so cards enter and leave rather than being chopped off
            at the boundary. They fade to cream because all five sections that
            render this component are bg-cream — if you drop it onto a white
            or dark section, these two need that page's colour or they show as
            a pale smear. */}
        <div
          className="absolute inset-y-0 left-0 w-8 md:w-32 z-10 bg-gradient-to-r from-cream to-transparent pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-8 md:w-32 z-10 bg-gradient-to-l from-cream to-transparent pointer-events-none"
          aria-hidden="true"
        />

        <div
          className="flex animate-marquee-reviews"
          /* Only set while held, so the CSS hover and focus rules still apply
             the rest of the time — an inline value would beat them. */
          style={{
            animationDuration: duration,
            ...(held || keyboardFocused
              ? { animationPlayState: 'paused' as const }
              : {}),
          }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="flex items-stretch gap-6 pr-6 shrink-0"
              /* The second pass exists only so the loop has somewhere to slide
                 into. Reading every review twice helps nobody. */
              aria-hidden={copy === 1 ? true : undefined}
            >
              {pass.map((item, i) => (
                <ReviewCard key={`${copy}-${i}-${item.author}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
