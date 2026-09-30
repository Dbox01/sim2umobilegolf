# The Image Handbook

Every photo, video and logo on sim2umobilegolf.co.za — where it comes from, and
exactly what to do when you want to change one.

---

## The one thing to understand

There are only two kinds of image on the site. Every question starts with
working out which kind you are looking at.

| | **Cloudinary** | **File in `public/`** |
|---|---|---|
| Which ones | Most of them: the Gallery, the Corporate mosaic, the video reel, and the big banner at the top of every page | Six of them: the three enclosure cards, the logo, the link-preview image and the favicons |
| How you change them | Add and remove them in Cloudinary, by **tag**. Usually no code at all | Replace the file in the `public` folder |

The reason for the split: anything that should change as you shoot more work
lives in Cloudinary. Anything that has to be one *specific* picture — the
Backyard card must show the backyard — is a file, so it cannot be reshuffled by
accident.

---

## Your toolkit

### The contact sheet

```
npm run photos
```

Fetches the latest photos from Cloudinary and writes `photo-index.html` into the
folder. Double-click it. Every photo and video on one page, and under each one:

1. Its **Cloudinary name** — like `IMG_7758_vlrusn`. This is the handle for
   everything. Copy it from here.
2. Its **tags** — which grids it is currently appearing in.
   The sheet is laid out in the order the site renders them, featured first,
   so the top row is what a visitor actually sees first.
3. Any **hero slot** using it — so you can see which photo is the banner on
   which page.

The name never changes. Adding or deleting other photos in Cloudinary will never
shuffle these around, so a name you paste into the code stays correct forever.

### The five tags

| Tag in Cloudinary | Where it appears |
|---|---|
| `sim2u-gallery` | The Gallery page |
| `sim2u-corporate` | The photo mosaic on Corporate Events |
| `sim2u-video` | The reel on the Home page and the Gallery |
| `sim2u-site` | **Nowhere on its own.** See below |
| `sim2u-featured` | **First** in whichever grid it is already in. See below |

### The library, and why `sim2u-site` exists

Two different questions, and they used to have the same answer:

- **May the site use this photo at all?** → is it in the **library**
- **Which grid does it turn up in?** → which **tag** it carries

Anything carrying *any* `sim2u-` tag is in the library, and anything in the
library can be pointed at by name from anywhere on the site — a page banner, a
card on the home page events strip, a picture inside an add-on popup.

`sim2u-site` is the library *without* a grid: **"the site may use this photo,
but do not publish it anywhere on its own."** That is the tag for a photo you
want on the home page events strip but not in your public Gallery.

> Before this existed, `sim2u-gallery` did both jobs, so the only way to use a
> photo anywhere was to publish it to the Gallery. That is what `sim2u-site`
> fixes.

A photo already tagged `sim2u-gallery` **does not need a second tag** to be
used as a banner — it is in the library already. One tag per photo is the
normal case; add a second only when it genuinely belongs in two grids.

---

## Working in Cloudinary

None of this touches the code.

**Add photos to the Gallery** — upload them, tag them `sim2u-gallery`. Done.

**Use a photo on the site but keep it OUT of the Gallery** — tag it
`sim2u-site` and nothing else. It will not appear in any grid, but you can now
paste its name into `src/data/events.ts` or `src/data/images.ts` and it works.
This is the right tag for event photos, alternative banners, and anything you
want available without publishing it.

**Put your best photos first** — tag them `sim2u-featured`. They move to the
front of whichever grid they are already in; everything else follows behind,
newest first.

`sim2u-featured` is a **modifier, not a set**. On its own it puts a photo
nowhere, because it means "first among these" and on its own there is no
"these". Pair it:

| Tags on the photo | Result |
|---|---|
| `sim2u-featured` + `sim2u-gallery` | Leads the Gallery page |
| `sim2u-featured` + `sim2u-corporate` | Leads the corporate mosaic |
| `sim2u-featured` + both | Leads both |
| `sim2u-featured` alone | Nothing. It is in no grid to be first in |

Within the featured photos the order is newest-first, so this controls *which*
photos lead, not their exact sequence. If you tag six photos featured you get
those six first — you cannot say which of the six is first.

### Everything behind the featured photos is shuffled

The rest of the Gallery and the rest of the mosaic come out in a **random
order**, reshuffled on every build. Nothing gets permanently stranded at the
bottom where nobody scrolls, and the site looks a little different each time
someone comes back.

Two things to know about it:

**It changes once per build, not once per visitor.** Every push reshuffles,
and so does the 05:00 rebuild each morning. Someone who reloads the page sees
the same order; someone returning tomorrow sees a new one. That is deliberate
— a grid that rearranges itself while you are scrolling it is disorienting
rather than fresh, and the site is built once and served as fixed files, so
shuffling per visitor would make the page visibly jump a moment after it
loads.

**A new photo no longer lands at the top.** It used to; now it lands
*somewhere*. If you upload something and want to check it is live, do not
scroll the Gallery looking for it at the top — run `npm run photos` and look
at the contact sheet, or tag it `sim2u-featured` to put it up front.

The video reel is **not** shuffled. It always plays your newest video,
because that is the one you would want playing.

> **Why not an exact first-second-third?** Cloudinary's public feed gives the
> site only `public_id`, `version`, `format`, `width`, `height`, `type`,
> `created_at` and `asset_folder`. There is no custom field to hang a sequence
> on, and renaming photos to sort them would break every page banner and event
> card that refers to a photo by name. An exact order is possible, but it has
> to be a list in the code, edited and pushed each time you reshuffle. Ask if
> you want that — it is a small change.

**Put a photo in the Corporate mosaic** — tag it `sim2u-corporate`. Tag it
`sim2u-gallery` too if you also want it on the Gallery page; the tags are
independent. Only corporate work belongs here: the mosaic sits under a heading
about conferences and brand activations, next to two client reviews.

**Add the video reel** — upload the video, tag it `sim2u-video`. The player picks
the newest one and Cloudinary makes the still frame from the first frame of the
video, so there is no poster image to supply. Until something carries this tag
the player shows a "Reel coming soon" panel rather than a broken box.

**Take a photo out of a grid** — remove the tag. Deleting the photo works too,
but a tag is reversible and deleting is not.

> If you need it gone this minute and cannot get to Cloudinary, there are two
> lists at the top of `src/data/gallery.ts`: `HIDDEN_PHOTOS` removes a photo from
> everywhere, `EXCLUDE_FROM_CORPORATE` removes it from the mosaic only. Paste the
> name in and push. Untagging in Cloudinary is still the tidier fix.

---

## Changing a fixed photo

Some slots need one specific picture rather than whatever is newest. These are
still Cloudinary photos; the code just names which one.

The photo needs **any** `sim2u-` tag to be nameable — use `sim2u-site` if it
should not also appear in a grid.

1. Run `npm run photos` and open `photo-index.html`.
2. Find the photo and copy the name underneath it.
3. Open `src/data/images.ts`.
4. Find the slot below and paste the new name between the quotes, leaving
   `byName(' ')` around it.
5. Save and push.

So `corporateHero: byName('IMG_7758_vlrusn')` becomes
`corporateHero: byName('your_new_name')`. Nothing else on the line changes.

### The page banners

| Slot | Banner at the top of | Using now |
|---|---|---|
| `homeHero` | Home | a stock photo — see below |
| `corporateHero` | Corporate Events | `IMG_7758_vlrusn` |
| `socialEventsHero` | Social Events | `04d620e0-…_bfm54u` |
| `packagesHero` | Packages | `20260516_134338_z0tkiu` |
| `howItWorksHero` | How It Works | `20260725_134627_kce6ve` |
| `galleryHero` | Gallery | `IMG_7735_nt2s0x` |
| `joburgHero` | Joburg Tour | `14bc34d1-…_thwydl` |
| `contactHero` | Contact | `20260516_134653_fgqave` |

### The six occasion cards on Social Events

`occasionBirthdays`, `occasionFunctions`, `occasionWeddings`, `occasionBraai`,
`occasionMilestones`, `occasionJustBecause`.

> **One stock photo left.** `homeHero` — the background behind the headline on the
> home page — is still a stock golf course from Unsplash, the only borrowed image
> on the site. Replace it with a wide shot of a real setup the moment you have
> one: change `STOCK_GOLF_COURSE` to `byName('your_name')` on that line.

---

## The files in `public/`

To replace one: save your new picture with **exactly the same file name**, drop
it into `public/` overwriting the old one, and push. Keeping the name means
nothing in the code has to change.

| File | Where it shows | Format |
|---|---|---|
| `enclosure-backyard.webp` | Backyard card on Home + Backyard tier on Packages | WebP, ~1000px tall |
| `enclosure-outdoor.webp` | Outdoor card on Home + Outdoor tier on Packages | WebP, ~1000px tall |
| `enclosure-indoor.webp` | Corporate card on Home + Corporate tier on Packages | WebP, ~1000px tall |
| `logo.webp` | Top bar and footer, every page | WebP, 256×256 |
| `social-preview.png` | The picture shown when a link is shared on WhatsApp, Facebook or LinkedIn | PNG, 1200×630 |
| `favicon_512x512.png` | Browser tab icon (also 180 and 192 versions) | PNG, square |

> **Never hotlink.** The logo used to be linked straight from Google Drive, and in
> September it stopped loading — every page showed a broken-image icon at once.
> Google Drive, Dropbox and WhatsApp links are not built to serve a website. If an
> image is a file, the file belongs in `public/`.

---

## Getting it live

**You only changed things in Cloudinary** — nothing to push. Either wait for the
rebuild that runs every morning at 05:00 South African time, or publish now:
GitHub → **Actions** → **Deploy to GitHub Pages** → **Run workflow**. Live in
about two minutes.

**You changed a file or edited the code** — in PowerShell, in the `SIM2U` folder:

```powershell
git add -A
git commit -m "Update the gallery photos"
git push
```

That triggers the build on its own. Watch it under **Actions**; the site updates
when the tick goes green. To see it before you push, run `npm run dev`.

---

## What makes a good photo

The site resizes and compresses Cloudinary photos for you, so upload the
full-size original. A few things it cannot fix:

- **Banners want landscape, with a quiet left side.** The headline sits over the
  left of the image in white type.
- **Grid photos are cropped to a tall rectangle.** A subject near the centre
  survives that; a subject at the far edge does not.
- **No equipment brand names in shot.** The launch monitor carries the
  manufacturer's name on it — worth a glance before uploading, and worth a crop
  if it is readable.
- **Files in `public/` you size yourself.** Cloudinary is not in the loop for
  those six. WebP, around 1000px on the long edge, under about 200KB.

---

## When something breaks

**A broken-image icon** — the file or link is gone. If it is one of the six in
`public/`, check the file is there and spelled as the code expects. If it is a
Cloudinary photo, it was probably deleted or renamed there.

**A new photo is not showing up** — almost always the tag. Check it in
Cloudinary, then run `npm run photos`. If the photo is not in the contact sheet,
the site cannot see it either. If it is there, you just need a rebuild.

**You pasted a name into the code and got no photo** — it is not in the
library. An untagged photo in Cloudinary is invisible to the site even though
you can see it in the Media Library. Give it `sim2u-site` (or any other
`sim2u-` tag), run `npm run photos`, and check it now appears on the contact
sheet. Running `npm run dev` also prints the reason in the browser console.

**"Resource lists are restricted" or a 403** — read the rest of the message
first. If it says the request never reached Cloudinary, it is your network or a
firewall, not your Cloudinary account, and nothing in your settings will fix it.

**The right photo in the wrong place** — a tag problem, not a code problem. Check
what it is tagged with in the contact sheet.
