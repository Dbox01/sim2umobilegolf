import type { AddOn } from './packages'

/**
 * ============================================================
 *  ADD-ONS THAT ARE NOT AGREED YET.
 * ============================================================
 *
 * NOTHING IMPORTS THIS FILE, AND THAT IS THE POINT. Vite only bundles what
 * is reachable from a page, so an unagreed price parked here never reaches
 * the browser. It is still type-checked and still reviewable in the repo.
 *
 * Do not "temporarily" import it to preview something. A draft that is
 * imported is no longer a draft — it is a published price with a comment
 * above it. To see one on the page, add the import and the spread, look,
 * then put the file back before you build for production.
 *
 * ------------------------------------------------------------
 *  TO PUT ONE LIVE
 * ------------------------------------------------------------
 *  1. Replace every PLACEHOLDER with the agreed wording and figure.
 *  2. Move the whole object into ADD_ONS in packages.ts.
 *  3. Delete it from here.
 *  4. Rebuild and grep dist/ for the partner's name and colours, to confirm
 *     what you expected to ship is the only thing that shipped.
 *
 * Empty right now: Event Photography went live on 23 Sep 2026 and lives in
 * packages.ts. This array is the holding pen for the next one.
 */

export const DRAFT_ADD_ONS: AddOn[] = []
