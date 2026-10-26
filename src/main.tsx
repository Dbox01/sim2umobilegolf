import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'

/**
 * One retry if a script fails to arrive.
 *
 * Every page component is now a static import (see src/routes.tsx for why),
 * so a page's content no longer depends on a second request succeeding. One
 * dynamic import is left, inside vite-react-ssg itself, which pulls
 * react-dom's client entry to start hydration.
 *
 * If that one fails the page does not break — React never mounts, so the
 * pre-rendered HTML simply stays on screen and the links still work. The page
 * is readable and indexable; it just is not interactive. That is a far better
 * failure than the one this replaced, where a dropped file swapped the whole
 * page for "Unexpected Application Error!".
 *
 * Still, a single reload usually fixes a dropped file, so we try it once. The
 * sessionStorage flag is what stops a genuinely missing script — a stale tab
 * open across a deploy, say — from turning into a reload loop. It is cleared
 * on the next successful load, so the retry is available again next time.
 */
if (typeof window !== 'undefined') {
  const RETRIED = 'sim2u:preload-retry'

  // sessionStorage throws rather than returning null in a locked-down
  // browser, and a thrown error here would stop the app booting at all —
  // which is the failure we are in this file to prevent.
  const flag = {
    get: () => {
      try {
        return sessionStorage.getItem(RETRIED) !== null
      } catch {
        return true // cannot remember a retry, so do not start one
      }
    },
    set: () => {
      try {
        sessionStorage.setItem(RETRIED, '1')
      } catch {
        /* nothing to do */
      }
    },
    clear: () => {
      try {
        sessionStorage.removeItem(RETRIED)
      } catch {
        /* nothing to do */
      }
    },
  }

  // 'vite:preloadError' is Vite's own event and is not in the DOM typings.
  window.addEventListener('vite:preloadError', ((event: Event) => {
    if (flag.get()) return
    event.preventDefault()
    flag.set()
    window.location.reload()
  }) as EventListener)

  window.addEventListener('load', flag.clear)
}

export const createRoot = ViteReactSSG({ routes })
