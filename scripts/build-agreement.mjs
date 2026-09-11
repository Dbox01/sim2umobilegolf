/**
 * Builds the two client-facing Service Agreement PDFs.
 *
 *   Sim2U-Service-Agreement.pdf         terms only — attach to a normal quote
 *   Sim2U-Service-Agreement-Signed.pdf  booking schedule + terms + signature
 *                                       block — for high-value and multi-day
 *                                       bookings, where the signed document is
 *                                       the contract rather than an attachment
 *
 * The whole point of this script is that both PDFs and the /terms page on the
 * website are generated from ONE source — src/data/terms.ts. The old agreement
 * drifted out of step with the site (it carried a single 4m x 5.5m x 3m site
 * minimum that was bigger than two of the three enclosures we sell), and the
 * only reliable fix is to stop maintaining separate copies. Edit the terms in
 * src/data/terms.ts, run this, and all three stay identical.
 *
 *   npm run agreement
 */
import { build } from 'esbuild'
import { chromium } from 'playwright'
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tmp = path.join(root, '.agreement-data.mjs')

// ---------------------------------------------------------------- load data
// terms.ts is TypeScript and imports packages.ts, so bundle it to plain ESM
// first rather than trying to parse it.
await build({
  entryPoints: [path.join(root, 'src/data/terms.ts')],
  outfile: tmp,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'silent',
})
const { TERMS_CLAUSES, TERMS_HIGHLIGHTS, TERMS_LAST_UPDATED, SITE_CLEARANCES } =
  await import(path.toNamespacedPath(tmp) + `?t=${Date.now()}`)
rmSync(tmp, { force: true })

// ------------------------------------------------------------------- assets
const logoPath = path.join(root, 'scripts/agreement-logo.b64')
const logo = existsSync(logoPath) ? readFileSync(logoPath, 'utf8').trim() : ''

// Dylan's signature, traced to vector from the original signed PDF so it stays
// crisp at any size instead of pixellating like the 106x76 bitmap it came from.
const sigPath = path.join(root, 'scripts/agreement-signature.svg')
const signature = existsSync(sigPath) ? readFileSync(sigPath, 'utf8').trim() : ''


/**
 * Playwright ships the library and the browser binary separately, so a fresh
 * `npm install` gives you the former but not the latter. Say so plainly rather
 * than letting the raw launch error scroll past.
 */
async function launchChromium(chromium) {
  try {
    return await chromium.launch(
      process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
    )
  } catch (err) {
    if (/Executable doesn't exist|browserType.launch/i.test(String(err))) {
      console.error(
        '\nThe Chromium browser this script drives is not installed yet.\n' +
          'Run this once, then try again:\n\n    npx playwright install chromium\n',
      )
      process.exit(1)
    }
    throw err
  }
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const itemsHtml = (items = []) =>
  !items.length
    ? ''
    : `<ul>${items
        .map(
          (i) =>
            `<li>${i.label ? `<strong>${esc(i.label)}:</strong> ` : ''}${esc(i.body)}</li>`,
        )
        .join('')}</ul>`

const clearanceTable = () => `
  <table class="clearance">
    <thead>
      <tr><th>Setup</th><th>Width</th><th>Depth</th><th>Height</th></tr>
    </thead>
    <tbody>
      ${SITE_CLEARANCES.map(
        (r) =>
          `<tr><td class="name">${esc(r.name)}</td><td>${esc(r.width)}</td><td>${esc(
            r.depth,
          )}</td><td>${esc(r.height)}</td></tr>`,
      ).join('')}
    </tbody>
  </table>`

const clauseHtml = (c) => `
  <section class="clause">
    <h2><span class="num">${esc(c.number)}.</span> ${esc(c.title)}</h2>
    ${c.intro ? `<p>${esc(c.intro)}</p>` : ''}
    ${c.showClearances ? clearanceTable() : ''}
    ${c.body ? `<p>${esc(c.body)}</p>` : ''}
    ${itemsHtml(c.items)}
    ${(c.subsections || [])
      .map(
        (s) => `
      <div class="sub">
        <h3>${esc(s.number)} ${esc(s.title)}</h3>
        ${s.intro ? `<p>${esc(s.intro)}</p>` : ''}
        ${s.body ? `<p>${esc(s.body)}</p>` : ''}
        ${itemsHtml(s.items)}
      </div>`,
      )
      .join('')}
  </section>`


// --------------------------------------------------- signed-version blocks
/** A fill-in row. `value` pre-fills the fields the terms already fix. */
const field = (label, value = '', span = 1) =>
  `<div class="field${span === 2 ? ' wide' : ''}">
     <span class="lbl">${esc(label)}</span>
     <span class="val${value ? ' filled' : ''}">${value ? esc(value) : '&nbsp;'}</span>
   </div>`

const scheduleHtml = () => `
  <section class="schedule">
    <h2>Booking Schedule</h2>
    <p class="note">Completed by Sim2U and confirmed by the Client. The terms that follow
       apply to the booking described here.</p>
    <div class="fields">
      ${field('Client / Company', '', 2)}
      ${field('Contact person')}
      ${field('Contact number')}
      ${field('Event date(s)')}
      ${field('Setup access from')}
      ${field('Event start')}
      ${field('Event end')}
      ${field('Venue name & address', '', 2)}
      ${field('Enclosure & package')}
      ${field('Add-ons')}
      ${field('Total booking fee')}
      ${field('Deposit (50%)', 'Due on acceptance')}
      ${field('Balance (50%)', 'Due 48 hours before setup')}
      ${field('Travel beyond 20 km')}
    </div>
  </section>`

const executionHtml = () => `
  <section class="execution">
    <h2>Agreement Acceptance &amp; Execution</h2>
    <p>By signing below, the undersigned confirms that they have read, understood and agree
       to all terms and conditions set out in this Service Agreement, and to the Booking
       Schedule on page 1. The undersigned warrants that they are an authorised
       representative with full authority to execute contracts on behalf of the Client.</p>
    <div class="signgrid">
      <div class="col">
        <div class="colhead">For the Client</div>
        <div class="sigline"><span>Signature</span><div class="rule"></div></div>
        <div class="sigline"><span>Name</span><div class="rule"></div></div>
        <div class="sigline"><span>Date</span><div class="rule"></div></div>
      </div>
      <div class="col">
        <div class="colhead">For Sim2U Mobile Golf</div>
        <div class="sigline">
          <span>Signature</span>
          <div class="rule">${signature ? `<div class="ink">${signature}</div>` : ''}</div>
        </div>
        <div class="sigline"><span>Name</span><div class="rule"><i>Dylan Campbell Bowker</i></div></div>
        <div class="sigline"><span>Date</span><div class="rule"></div></div>
      </div>
    </div>
  </section>`

const page = ({ signed }) => `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<title>Sim2U Mobile Golf — Booking Terms &amp; Conditions</title>
<style>
  :root{ --green:#213631; --maroon:#4D232F; --gold:#C5A059; --cream:#F9F6F0;
         --ink:#2b332f; --muted:#69736e; }
  @page{ size:A4; margin:18mm 17mm 20mm; }
  *{ box-sizing:border-box; margin:0; padding:0; }
  body{ font-family:"Carlito","DejaVu Sans",sans-serif; color:var(--ink);
        font-size:10pt; line-height:1.5; -webkit-print-color-adjust:exact;
        print-color-adjust:exact; }

  /* ------------------------------------------------------------- masthead */
  .masthead{ display:flex; align-items:center; gap:6mm; padding-bottom:5mm;
             border-bottom:1.1mm solid var(--green); margin-bottom:7mm; }
  .masthead img{ width:16mm; height:16mm; border-radius:2.5mm; }
  .brandname{ font-family:"Bitstream Charter","Caladea",serif; font-size:21pt;
              font-style:italic; font-weight:700; color:var(--green); line-height:1; }
  .brandsub{ color:var(--gold); font-size:7pt; font-weight:700; letter-spacing:3pt;
             text-transform:uppercase; margin-top:1.6mm; }
  .masthead .meta{ margin-left:auto; text-align:right; font-size:8.4pt; color:var(--muted); }
  .masthead .meta b{ display:block; color:var(--green); font-size:9.6pt; }

  h1{ font-family:"Bitstream Charter","Caladea",serif; font-size:20pt; color:var(--green);
      font-weight:700; line-height:1.15; margin-bottom:3mm; }
  .lede{ color:var(--muted); font-size:9.6pt; max-width:150mm; margin-bottom:7mm; }

  /* ------------------------------------------------------------ key terms */
  .keyterms{ display:grid; grid-template-columns:1fr 1fr 1fr; gap:4mm;
             margin-bottom:8mm; break-inside:avoid; }
  .kt{ background:var(--cream); border-left:1.2mm solid var(--gold);
       border-radius:0 2.5mm 2.5mm 0; padding:3.4mm 4mm; }
  .kt h4{ color:var(--green); font-size:7pt; letter-spacing:1.5pt; text-transform:uppercase;
          margin-bottom:1.6mm; }
  .kt p{ font-size:8.6pt; color:var(--muted); line-height:1.4; }

  /* -------------------------------------------------------------- clauses */
  /* Let a long clause flow across a page rather than leaving half a page
     blank to keep it whole. Headings stay glued to what follows them and
     individual bullets never split, which is what actually reads badly. */
  .clause{ margin-bottom:7mm; }
  .clause h2, .sub h3{ break-after:avoid; break-inside:avoid; }
  .clause li{ break-inside:avoid; }
  .clause p{ orphans:2; widows:2; }
  .sub{ break-inside:auto; }
  .clause h2{ font-family:"Bitstream Charter","Caladea",serif; font-size:13pt;
              color:var(--green); font-weight:700; margin-bottom:3mm; }
  .clause h2 .num{ color:var(--gold); }
  .clause p{ margin-bottom:3mm; color:var(--ink); }
  .clause ul{ list-style:none; }
  .clause li{ position:relative; padding-left:5.5mm; margin-bottom:2.6mm; }
  .clause li::before{ content:""; position:absolute; left:1.4mm; top:2.1mm;
                      width:1.5mm; height:1.5mm; border-radius:50%; background:var(--gold); }
  .clause strong{ color:var(--green); }
  .sub{ margin-top:4.5mm; }
  .sub h3{ color:var(--green); font-size:8pt; letter-spacing:1.4pt; text-transform:uppercase;
           margin-bottom:2.6mm; }

  /* ------------------------------------------------------ clearance table */
  .clearance{ width:100%; border-collapse:collapse; margin:0 0 4mm; break-inside:avoid;
              border:.3mm solid rgba(197,160,89,.6); border-radius:2mm; overflow:hidden; }
  .clearance th{ background:var(--green); color:#fff; font-size:7pt; font-weight:700;
                 letter-spacing:1.3pt; text-transform:uppercase; text-align:left;
                 padding:2.6mm 4mm; }
  .clearance td{ padding:2.8mm 4mm; border-top:.3mm solid rgba(197,160,89,.3);
                 font-size:9.4pt; color:var(--muted); }
  .clearance td.name{ color:var(--green); font-weight:700; }
  .clearance tbody tr:nth-child(even){ background:var(--cream); }


  /* -------------------------------------------------- schedule (signed only) */
  .schedule{ border:.4mm solid var(--green); border-radius:3mm; padding:5mm 5.5mm;
             margin-bottom:7mm; break-inside:avoid; }
  .schedule h2{ font-family:"Bitstream Charter","Caladea",serif; font-size:13pt;
                color:var(--green); font-weight:700; margin-bottom:1.5mm; }
  .schedule .note{ color:var(--muted); font-size:8.4pt; margin-bottom:4mm; }
  .fields{ display:grid; grid-template-columns:1fr 1fr; gap:3.4mm 6mm; }
  .field{ display:flex; flex-direction:column; gap:.8mm; }
  .field.wide{ grid-column:1 / -1; }
  .field .lbl{ color:var(--green); font-size:6.8pt; font-weight:700; letter-spacing:1.3pt;
               text-transform:uppercase; }
  /* A printed rule the client can write on; pre-filled values sit on the same
     line so the two kinds of field line up. */
  .field .val{ border-bottom:.3mm solid rgba(33,54,49,.35); min-height:5.2mm;
               font-size:9.2pt; padding-bottom:.6mm; }
  .field .val.filled{ color:var(--muted); font-style:italic;
                      border-bottom-style:dotted; }

  /* ------------------------------------------------- execution (signed only) */
  .execution{ margin-top:6mm; break-inside:avoid; }
  .execution h2{ font-family:"Bitstream Charter","Caladea",serif; font-size:13pt;
                 color:var(--green); font-weight:700; margin-bottom:3mm; }
  .execution p{ color:var(--ink); margin-bottom:5mm; }
  .signgrid{ display:grid; grid-template-columns:1fr 1fr; gap:8mm; }
  .col{ border:.3mm solid rgba(33,54,49,.25); border-radius:2.5mm; padding:0 0 4mm; }
  .colhead{ background:var(--cream); border-bottom:.3mm solid rgba(33,54,49,.15);
            color:var(--green); font-size:7.4pt; font-weight:700; letter-spacing:1.5pt;
            text-transform:uppercase; padding:2.6mm 4mm; margin-bottom:3mm;
            border-radius:2.2mm 2.2mm 0 0; }
  .sigline{ padding:0 4mm; margin-top:4mm; }
  .sigline span{ display:block; color:var(--muted); font-size:6.8pt; font-weight:700;
                 letter-spacing:1.2pt; text-transform:uppercase; margin-bottom:.8mm; }
  .sigline .rule{ position:relative; height:9mm; border-bottom:.3mm solid rgba(33,54,49,.45); }
  .sigline .rule i{ position:absolute; bottom:1.2mm; left:0; font-style:normal;
                    font-size:9.6pt; color:var(--ink); }
  /* The signature overhangs the rule slightly, the way a real one does. */
  .sigline .ink{ position:absolute; bottom:-1.5mm; left:2mm; width:30mm; height:10mm; }
  .sigline .ink svg{ display:block; width:100%; height:100%; }

  /* ------------------------------------------------------------ sign-off */
  .signoff{ margin-top:4mm; background:var(--green); color:#fff; border-radius:3mm;
            padding:5mm 6mm; break-inside:avoid; }
  .signoff h3{ font-family:"Bitstream Charter","Caladea",serif; font-size:12pt;
               margin-bottom:2.5mm; }
  .signoff p{ color:rgba(255,255,255,.75); font-size:9pt; }
  .signoff .contact{ margin-top:3.5mm; padding-top:3.5mm;
                     border-top:.3mm solid rgba(255,255,255,.2); font-size:9pt; }
  .signoff .contact b{ color:var(--gold); }
</style></head>
<body>
  <div class="masthead">
    ${logo ? `<img src="data:image/png;base64,${logo}" alt="">` : ''}
    <div>
      <div class="brandname">Sim2U</div>
      <div class="brandsub">Mobile Golf</div>
    </div>
    <div class="meta"><b>${signed ? 'Service Agreement' : 'Booking Terms &amp; Conditions'}</b>Last updated ${esc(
      TERMS_LAST_UPDATED,
    )}</div>
  </div>

  <h1>${signed ? 'Service Agreement' : 'Booking Terms &amp; Conditions'}</h1>
  <p class="lede">${
    signed
      ? 'This agreement is made between Sim2U Mobile Golf and the Client named below. It ' +
        'covers the booking set out in the Schedule and the terms and conditions that ' +
        'follow, and takes effect once both parties have signed.'
      : 'These terms form part of every Sim2U Mobile Golf quote and apply to the booking ' +
        'once the quote is accepted. They set out what we bring, what your venue needs to ' +
        'provide, and what happens if a date or the weather changes.'
  }</p>

  ${signed ? scheduleHtml() : ''}

  <div class="keyterms">
    ${TERMS_HIGHLIGHTS.map(
      (h) => `<div class="kt"><h4>${esc(h.title)}</h4><p>${esc(h.body)}</p></div>`,
    ).join('')}
  </div>

  ${TERMS_CLAUSES.map(clauseHtml).join('')}

  ${signed ? executionHtml() : ''}

  <div class="signoff">
    <h3>${signed ? 'Questions before you sign?' : 'Questions before you accept?'}</h3>
    <p>If something here does not fit your venue or your date, tell us before you
       ${signed ? 'sign' : 'accept the quote'} rather than after — most of it can be
       planned around.</p>
    <div class="contact"><b>083 318 2565</b> &nbsp;·&nbsp; info@sim2umobilegolf.co.za
       &nbsp;·&nbsp; sim2umobilegolf.co.za/terms</div>
  </div>
</body></html>`

// ------------------------------------------------------------------ render
const DOCS = [
  { signed: false, file: 'Sim2U-Service-Agreement.pdf', label: 'Booking Terms & Conditions' },
  { signed: true, file: 'Sim2U-Service-Agreement-Signed.pdf', label: 'Service Agreement' },
]

const browser = await launchChromium(chromium)

for (const doc of DOCS) {
  const src = path.join(root, `.agreement-${doc.signed ? 'signed' : 'short'}.html`)
  writeFileSync(src, page({ signed: doc.signed }))

  const tab = await browser.newPage()
  await tab.goto('file://' + src, { waitUntil: 'load' })
  await tab.waitForTimeout(400)
  await tab.pdf({
    path: path.join(root, doc.file),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width:100%;font-family:Carlito,sans-serif;font-size:7.5pt;color:#69736e;
                  padding:0 17mm;display:flex;justify-content:space-between;">
        <span>Sim2U Mobile Golf &middot; ${doc.label} &middot; ${TERMS_LAST_UPDATED}</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>`,
    margin: { top: '18mm', right: '0', bottom: '20mm', left: '0' },
  })
  await tab.close()
  rmSync(src, { force: true })
  console.log(`[agreement] ${doc.file}`)
}

await browser.close()
console.log(
  `[agreement] ${TERMS_CLAUSES.length} clauses · updated ${TERMS_LAST_UPDATED}` +
    `${signature ? ' · signature embedded' : ' · NO SIGNATURE FILE FOUND'}`,
)
