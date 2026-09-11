/**
 * Writes photo-index.html — a contact sheet of every photo and video the site
 * is currently using, each labelled with its Cloudinary name.
 *
 * Run:  npm run photos
 * Then double-click photo-index.html.
 *
 * Use it to find the name of a photo you want as a page hero, then paste that
 * name into src/data/images.ts. Not part of the built site.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CLOUD = 'bo8j9vxt'

const manifest = JSON.parse(await readFile(resolve(root, 'src/data/cloudinary.json'), 'utf8'))
const imagesTs = await readFile(resolve(root, 'src/data/images.ts'), 'utf8')

const thumb = (a) =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,c_fill,g_auto,w_600/v${a.version}/${a.publicId}.${a.format}`
const vposter = (a) =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,f_auto,q_auto,c_fill,w_600/v${a.version}/${a.publicId}.jpg`

// Which hero slot uses which Cloudinary name
const heroFor = {}
for (const [, slot, name] of imagesTs.matchAll(/^\s{2}(\w+):\s*byName\('([^']+)'\)/gm)) {
  ;(heroFor[name] ||= []).push(slot)
}
const stockSlots = [...imagesTs.matchAll(/^\s{2}(\w+):\s*STOCK_GOLF_COURSE/gm)].map((m) => m[1])

const corporateNames = new Set(manifest.corporate.map((a) => a.publicId))

const card = (a, { isVideo = false } = {}) => `
  <figure>
    <img src="${isVideo ? vposter(a) : thumb(a)}" alt="${a.publicId}" loading="lazy">
    ${isVideo ? '<div class="badge">VIDEO</div>' : ''}
    <figcaption>
      <code>${a.publicId}</code>
      <div class="tags">
        ${isVideo ? '<span class="tag t-vid">sim2u-video</span>' : '<span class="tag t-gal">sim2u-gallery</span>'}
        ${!isVideo && corporateNames.has(a.publicId) ? '<span class="tag t-corp">sim2u-corporate</span>' : ''}
        ${(heroFor[a.publicId] || []).map((s) => `<span class="tag t-hero">${s}</span>`).join('')}
      </div>
    </figcaption>
  </figure>`

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>Sim2U — photo &amp; video index</title>
<style>
  :root{--green:#213631;--gold:#C5A059;--cream:#F9F6F0}
  *{box-sizing:border-box}
  body{margin:0;padding:40px 32px 80px;background:var(--cream);color:var(--green);
       font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
  h1{font-size:30px;margin:0 0 6px}
  h2{font-size:19px;margin:48px 0 16px;padding-top:22px;border-top:1px solid #e4dfd4}
  p.lede{margin:0 0 10px;color:#5f6b66;max-width:70ch}
  code{background:#fff;border:1px solid #e5e7eb;border-radius:5px;padding:1px 6px;
       font-size:12px;word-break:break-all}
  .how{background:#fff;border:1px solid #e9e5dc;border-left:4px solid var(--gold);
       border-radius:10px;padding:18px 22px;margin:26px 0 8px;max-width:80ch}
  .how ol{margin:10px 0 0;padding-left:20px} .how li{margin:5px 0}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}
  figure{margin:0;background:#fff;border:1px solid #e9e5dc;border-radius:14px;
         overflow:hidden;position:relative}
  figure img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#eee}
  .badge{position:absolute;top:10px;left:10px;background:var(--green);color:#fff;
         font-size:10px;font-weight:800;padding:4px 9px;border-radius:6px;letter-spacing:.1em}
  figcaption{padding:11px}
  .tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:8px;min-height:20px}
  .tag{font-size:9.5px;font-weight:800;padding:3px 7px;border-radius:99px;letter-spacing:.04em}
  .t-gal{background:#eef0ee;color:#4a5a55}
  .t-corp{background:var(--gold);color:var(--green)}
  .t-vid{background:#4D232F;color:#fff}
  .t-hero{background:var(--green);color:#fff}
  .empty{background:#fff;border:1px dashed #cfc8b8;border-radius:12px;padding:26px;
         color:#8a8578;max-width:80ch}
  .meta{margin-top:40px;color:#9a958a;font-size:12px}
</style></head><body>

<h1>Sim2U photo &amp; video index</h1>
<p class="lede">Everything the website is currently using, straight from your Cloudinary tags.</p>

<div class="how">
  <strong>To add or remove a photo or video</strong>
  <ol>
    <li>Upload it to Cloudinary.</li>
    <li>Tag it <code>sim2u-gallery</code> (gallery page), <code>sim2u-corporate</code>
        (corporate mosaic) or <code>sim2u-video</code> (video reel). A photo can have both image tags.</li>
    <li>Remove the tag to take it off the site. The file stays in your Cloudinary account.</li>
  </ol>
  <strong>To change a page banner</strong>
  <ol>
    <li>Find the photo below and copy the name under it.</li>
    <li>Paste it into <code>src/data/images.ts</code>, e.g. <code>corporateHero: byName('THE_NAME')</code>.</li>
  </ol>
</div>

<h2>Gallery photos &nbsp;<span style="font-weight:400;color:#9a958a">${manifest.gallery.length} tagged <code>sim2u-gallery</code></span></h2>
<div class="grid">${manifest.gallery.map((a) => card(a)).join('')}</div>

<h2>Videos &nbsp;<span style="font-weight:400;color:#9a958a">${manifest.videos.length} tagged <code>sim2u-video</code></span></h2>
${
  manifest.videos.length
    ? `<div class="grid">${manifest.videos.map((a) => card(a, { isVideo: true })).join('')}</div>`
    : `<div class="empty">No videos tagged yet. Tag one <code>sim2u-video</code> in Cloudinary and it will
        appear on the Home and Gallery pages — Cloudinary makes the poster frame for you.</div>`
}

<p class="meta">Manifest generated ${manifest.generatedAt} · source: <strong>${manifest.source}</strong>${
  manifest.note ? ` · ${manifest.note}` : ''
}${stockSlots.length ? ` · still using a stock photo: ${stockSlots.join(', ')}` : ''}</p>
</body></html>
`

await writeFile(resolve(root, 'photo-index.html'), html)
console.log(
  `[photos] photo-index.html written — ${manifest.gallery.length} photos, ${manifest.videos.length} video(s). Open it in your browser.`,
)
