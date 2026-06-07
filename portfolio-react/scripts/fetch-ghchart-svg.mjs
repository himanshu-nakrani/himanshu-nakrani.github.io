/**
 * Prebuild data fetch for the GitHub activity widgets.
 *
 *  1. Fetches the ghchart SVG (legacy fallback, kept for any consumer still
 *     reading the static image).
 *  2. Fetches daily contributions JSON (date, count, level) from
 *     github-contributions-api.jogruber.de so the interactive heatmap can
 *     render real per-day data offline at runtime.
 *
 * Both files are written into /public so they ship with the Vite build.
 * Failures are non-fatal — we log and continue so a flaky upstream cannot
 * break dev/build.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')
const SVG_OUT = join(PUBLIC_DIR, 'gh-contributions.svg')
const JSON_OUT = join(PUBLIC_DIR, 'gh-contributions.json')

const USER = 'himanshu-nakrani'
const ACCENT = '39d353'
const SVG_URL = `https://ghchart.rshah.org/${ACCENT}/${USER}`
const JSON_URL = `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`

async function fetchSvg() {
  const res = await fetch(SVG_URL)
  if (!res.ok) throw new Error(`ghchart SVG fetch failed: ${res.status}`)
  let svg = await res.text()
  svg = svg.replace(/#EEEEEE/gi, '#161b22').replace(/fill:#767676/gi, 'fill:#8b949e')
  writeFileSync(SVG_OUT, svg, 'utf8')
  console.log('Wrote', SVG_OUT)
}

async function fetchJson() {
  const res = await fetch(JSON_URL)
  if (!res.ok) throw new Error(`contributions JSON fetch failed: ${res.status}`)
  const data = await res.json()
  if (!data || !Array.isArray(data.contributions)) {
    throw new Error('contributions JSON payload missing `contributions` array')
  }
  const payload = {
    user: USER,
    fetchedAt: new Date().toISOString(),
    total: data.total?.lastYear ?? data.contributions.reduce((s, d) => s + (d.count || 0), 0),
    contributions: data.contributions.map((d) => ({
      date: d.date,
      count: d.count,
      level: d.level,
    })),
  }
  writeFileSync(JSON_OUT, JSON.stringify(payload), 'utf8')
  console.log('Wrote', JSON_OUT, `(${payload.contributions.length} days, ${payload.total} total)`)
}

async function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true })
  const results = await Promise.allSettled([fetchSvg(), fetchJson()])
  for (const r of results) {
    if (r.status === 'rejected') console.warn('[gh-contributions]', r.reason?.message || r.reason)
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
