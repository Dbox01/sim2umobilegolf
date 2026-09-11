import { byName, STOCK_GOLF_COURSE } from './gallery'

/**
 * ============================================================
 *  THE HAND-PICKED PHOTOS.
 * ============================================================
 *
 * Only the slots that need one specific picture live here — the big banner at
 * the top of each page. Everything else (the Gallery page, the Corporate
 * mosaic, the video reels) comes straight from your Cloudinary tags and needs
 * no code changes at all. See scripts/fetch-cloudinary.mjs for the tag names.
 *
 * ------------------------------------------------------------
 *  TO CHANGE ONE OF THESE
 * ------------------------------------------------------------
 *  1. Run:  npm run photos
 *  2. Open photo-index.html (double-click it) — every photo is shown with its
 *     Cloudinary name underneath.
 *  3. Copy the name you want and paste it below. Save. Done.
 *
 *  Names are stable: adding or deleting other photos in Cloudinary will never
 *  shuffle these around.
 *
 *  A hero photo wants to be landscape and not too busy on the left, because
 *  the headline sits over that side in white.
 */

export const IMAGES = {
  /* ---------------------------------------------------------- page heroes */
  // ← the only stock photo left. Swap to byName('...') when you have a wide
  //   shot of a real setup.
  homeHero: STOCK_GOLF_COURSE,

  corporateHero: byName('IMG_7758_vlrusn'),
  socialEventsHero: byName('04d620e0-bfa9-4eda-b973-6be047204a2a_bfm54u'),
  packagesHero: byName('20260516_134338_z0tkiu'),
  howItWorksHero: byName('20260725_134627_kce6ve'),
  galleryHero: byName('IMG_7735_nt2s0x'),
  joburgHero: byName('14bc34d1-eb70-4c95-8f87-3ea98b35621c_thwydl'),
  contactHero: byName('20260516_134653_fgqave'),

  /* ----------------------------------- home page "three ways to book" cards
   *
   *  These three are LOCAL files in public/, not Cloudinary lookups, because
   *  each card has to show the enclosure it names — that is the whole job of
   *  the section — and a Cloudinary id resolved by filename is a guess. Dylan
   *  supplied these three photographs specifically for these three slots.
   *
   *  The same files back the pricing tiers in packages.ts, so a card and its
   *  price always show the same setup.
   */
  homeBackyardCard: '/enclosure-backyard.webp',
  homeOutdoorCard: '/enclosure-outdoor.webp',
  homeIndoorCard: '/enclosure-indoor.webp',

  /* ----------------------------------- social events: one per occasion card
   *
   *  RULE FOR THIS BLOCK: the photo has to match the heading above it. Four
   *  of these used to point at dealership floors and the Medipost exhibition
   *  stand — a BMW showroom under a heading that says "Birthday Parties"
   *  tells a visitor the photo is decoration, and that everything around it
   *  might be too.
   *
   *  "Just Because" is the deliberate exception: a showroom shot belongs
   *  under a heading that says no occasion is required, because the point of
   *  that card is the setup itself rather than the event around it.
   */
  // Outdoor inflatable on grass, bags down, kids about — a party at home.
  occasionBirthdays: byName('IMG-20260420-WA0006_rf4bnz'),
  // Outdoor enclosure, adults standing around it in daylight.
  occasionFunctions: byName('20260516_134338_z0tkiu'),
  // Two guests at the screen, relaxed, nothing branded in shot.
  occasionWeddings: byName('99c19f3d-cfe6-4642-8c51-c0d674d6c1a9_hnby1c'),
  // The backyard net in a garden under a blue sky. Exactly a braai setup.
  occasionBraai: byName('20260725_134627_kce6ve'),
  // Enclosure on a clipped lawn behind a hedge.
  occasionMilestones: byName('20260516_134653_fgqave'),
  // The indoor enclosure on a dealership floor with the cars around it —
  // the setup as the subject, which is what this card is about.
  occasionJustBecause: byName('IMG_7660_ghaaja'),

  /* ------------------------------------------------- video poster fallback */
  /** Used only when nothing carries the sim2u-video tag yet. */
  videoPosterFallback: byName('StandDuringEvent_4_drdmsy'),
}
