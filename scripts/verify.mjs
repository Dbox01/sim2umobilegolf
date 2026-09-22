/**
 * Loads every built page at desktop and mobile width and reports JS errors,
 * failed requests and horizontal overflow. Run against `npm run preview`.
 */
import { chromium } from 'playwright'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = process.env.BASE || 'http://localhost:4173'

/**
 * Every route, read out of the sitemap the build just wrote.
 *
 * This used to be a hand-written list, which meant adding a page and
 * forgetting to add it here — so the one page most likely to be broken was
 * the only one never checked. The sitemap is generated from SITEMAP_ROUTES,
 * so reading it keeps the sweep honest automatically.
 *
 * /404 is appended by hand because it is deliberately excluded from the
 * sitemap (it is noindex) but still needs to render without errors.
 */
function discoverRoutes() {
  const sitemap = resolve(dirname(fileURLToPath(import.meta.url)), '../dist/sitemap.xml')
  if (!existsSync(sitemap)) {
    console.error(
      '\nNo dist/sitemap.xml — run "npm run build" before "npm run verify".\n',
    )
    process.exit(1)
  }
  const xml = readFileSync(sitemap, 'utf8')
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => new URL(m[1]).pathname)
    .map((p) => (p !== '/' && p.endsWith('/') ? p.slice(0, -1) : p))
  return [...new Set([...paths, '/404'])]
}

const ROUTES = discoverRoutes()
const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]

// Cloudinary / Unsplash / Google Fonts are blocked in this sandbox, so a
// failure from one of those hosts is the network, not the site.
const EXTERNAL = /cloudinary|unsplash|googleusercontent|fonts\.g/


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

const browser = await launchChromium(chromium)
let problems = 0

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } })
  for (const route of ROUTES) {
    const page = await ctx.newPage()
    const errors = []   // real JS exceptions
    const failed = []   // requests that failed for reasons other than the sandbox
    let blocked = 0     // external hosts this sandbox cannot reach
    page.on('pageerror', (e) => errors.push(String(e).split('\n')[0]))
    // Console "Failed to load resource" lines carry no URL, so a blocked
    // Cloudinary image is indistinguishable from a real one here. The
    // requestfailed handler below has the URL, so that is what we judge on;
    // console errors only count when they are not resource-load noise.
    page.on('console', (m) => {
      if (m.type() !== 'error') return
      const t = m.text()
      if (/Failed to load resource/i.test(t)) return
      errors.push(t.slice(0, 160))
    })
    page.on('requestfailed', (r) => {
      if (EXTERNAL.test(r.url())) blocked++
      else failed.push(r.url())
    })

    await page.goto(BASE + route, { waitUntil: 'networkidle' }).catch(() => {})
    await page.waitForTimeout(350)

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    )
    const ok = !errors.length && !failed.length && overflow <= 0
    if (!ok) problems++
    console.log(
      `${ok ? 'ok  ' : 'FAIL'} ${vp.name.padEnd(7)} ${route.padEnd(18)}` +
        ` overflow=${overflow}px sandbox-blocked=${blocked}` +
        (errors.length ? ` errors=${JSON.stringify(errors.slice(0, 2))}` : '') +
        (failed.length ? ` failed=${JSON.stringify(failed.slice(0, 2))}` : ''),
    )
    await page.close()
  }
  await ctx.close()
}

await browser.close()
console.log(problems ? `\n${problems} page/viewport combinations need attention` : '\nAll pages clean')
process.exit(problems ? 1 : 0)
