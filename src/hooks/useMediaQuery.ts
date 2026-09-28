import { useEffect, useState } from 'react'

/**
 * Tracks a CSS media query from JavaScript.
 *
 * ---------------------------------------------------------------------------
 *  WHY THIS EXISTS RATHER THAN A CSS BREAKPOINT
 * ---------------------------------------------------------------------------
 * For showing and hiding boxes, CSS is always the right answer. This hook is
 * for the cases where the DECISION has to happen before the browser fetches
 * something — a <video> hidden with `md:hidden` still downloads in full. The
 * hero serves a different cut to phones and desktops, so the choice has to be
 * made in JS or a phone pays for a 2.5MB desktop video it never displays.
 *
 * ---------------------------------------------------------------------------
 *  IT RETURNS FALSE ON THE FIRST RENDER, ON PURPOSE
 * ---------------------------------------------------------------------------
 * These pages are pre-rendered to HTML at build time, where `window` does not
 * exist. Reading matchMedia during render would crash the build; seeding state
 * from it would make the server and browser disagree and React would throw a
 * hydration mismatch.
 *
 * So the first paint is always the `false` branch, and the real answer arrives
 * on the next tick. Write callers so the false branch is the SAFE, CHEAP one —
 * the poster image, not the video. That ordering is also what you want for
 * Core Web Vitals: the pre-rendered HTML carries the light thing, and the
 * heavy thing is an upgrade for browsers that can use it.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(query)
    const sync = () => setMatches(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [query])

  return matches
}

/** Tailwind's `md` breakpoint, so JS and CSS agree on where "desktop" starts. */
export const DESKTOP_QUERY = '(min-width: 768px)'

/**
 * Someone who has asked their operating system to reduce motion.
 *
 * Respecting this is not decoration — for people with vestibular disorders,
 * large background motion can cause actual nausea. Anything that moves on its
 * own without being asked checks this first.
 */
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
