/**
 * ============================================================
 *  THE ROUTES. ALL IMPORTED UP FRONT, ON PURPOSE.
 * ============================================================
 *
 * These were `React.lazy(() => import('./pages/X'))`, which splits every page
 * into its own JavaScript file, fetched on demand. That is the right default
 * for a large app. It was the wrong default for this one, and it cost us the
 * two pages that make the money.
 *
 * ------------------------------------------------------------
 *  WHAT WENT WRONG
 * ------------------------------------------------------------
 * Google Search Console reported /packages and /corporate-events as
 * "Soft 404" — Google's term for a page that returns 200 but looks like an
 * error. Running Google's live test and opening its rendered screenshot
 * showed our own site printing:
 *
 *     Unexpected Application Error!
 *     Failed to fetch dynamically imported module:
 *     https://sim2umobilegolf.co.za/assets/Packages-....js
 *
 * The render report said 3 of 28 page resources could not be loaded. Those
 * three files existed and served 200 on request — Googlebot's renderer has a
 * budget and simply dropped them.
 *
 * The chain: /packages needed fifteen separate JavaScript files, five of them
 * a single icon each. One was dropped. The dynamic import rejected. React
 * Router caught the rejection and swapped the whole page for its default
 * error element. Google rendered an error message where the prices should be
 * and filed it as a soft 404.
 *
 * The cruel part is that the content was already in the HTML. vite-react-ssg
 * pre-renders every page, so Google had downloaded the prices before a line
 * of JavaScript ran. Hydration then threw them away.
 *
 * ------------------------------------------------------------
 *  WHY STATIC IMPORTS ARE THE FIX AND NOT JUST A WORKAROUND
 * ------------------------------------------------------------
 * A dynamic import is a promise, and a promise can reject. Static imports are
 * part of the bundle: if the bundle loads at all, every page component is
 * already in memory, and there is no second request left to fail. The failure
 * mode is removed rather than handled.
 *
 * The cost is one larger first download instead of several small ones. This
 * is eleven marketing pages sharing one layout, one set of components and one
 * icon library — the pages are mostly text, and splitting them was buying
 * almost nothing while adding a dozen chances to fail.
 *
 * It matters for people, not only for Google. A visitor opening our prices on
 * a weak signal at a golf course was getting "Unexpected Application Error!"
 * instead of a price list, and we would never have heard about it.
 *
 * ------------------------------------------------------------
 *  IF YOU ADD A PAGE
 * ------------------------------------------------------------
 * Import it at the top like the rest. Do not reach for React.lazy here. If
 * this site ever grows something genuinely heavy — a booking engine, a video
 * editor — split that one component, not the page around it, so a failure
 * takes out the widget and leaves the content standing.
 */
import type { RouteRecord } from 'vite-react-ssg'
import Layout from './components/Layout'
import Home from './pages/Home'
import CorporateEvents from './pages/CorporateEvents'
import SocialEvents from './pages/SocialEvents'
import Packages from './pages/Packages'
import HowItWorks from './pages/HowItWorks'
import EquipmentHire from './pages/EquipmentHire'
import Gallery from './pages/Gallery'
import JoburgTour from './pages/JoburgTour'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import NotFound from './pages/NotFound'

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/Layout.tsx',
    children: [
      { index: true, Component: Home },
      { path: 'corporate-events', Component: CorporateEvents },
      { path: 'social-events', Component: SocialEvents },
      { path: 'packages', Component: Packages },
      { path: 'how-it-works', Component: HowItWorks },
      { path: 'equipment-hire', Component: EquipmentHire },
      { path: 'gallery', Component: Gallery },
      { path: 'joburg-tour', Component: JoburgTour },
      { path: 'contact', Component: Contact },
      { path: 'terms', Component: Terms },
      { path: 'privacy', Component: Privacy },
      // Pre-rendered to dist/404.html, which is what GitHub Pages serves
      // for any unknown path.
      { path: '404', Component: NotFound },
      // Client-side catch-all for in-app navigation.
      { path: '*', Component: NotFound },
    ],
  },
]
