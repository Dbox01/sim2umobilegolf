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
3. Any **hero slot** using it — so you can see which photo is the banner on
   which page.

The name never changes. Adding or deleting other photos in Cloudinary will never
shuffle these around, so a name you paste into the code stays correct forever.

### The three tags

| Tag in Cloudinary | Where it appears |
|---|---|
| `sim2u-gallery` | The Gallery page |
| `sim2u-corporate` | The photo mosaic on Corporate Events |
| `sim2u-video` | The reel on the Home page and the Gallery |

---

## Working in Cloudinary

None of this touches the code.

**Add photos to the Gallery** — upload them, tag them `sim2u-gallery`. Done.

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

**"Resource lists are restricted" or a 403** — read the rest of the message
first. If it says the request never reached Cloudinary, it is your network or a
firewall, not your Cloudinary account, and nothing in your settings will fix it.

**The right photo in the wrong place** — a tag problem, not a code problem. Check
what it is tagged with in the contact sheet.
