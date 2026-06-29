/**
 * Prebuild data fetch for GitHub activity widgets.
 *
 * 1. Fetches the ghchart SVG legacy fallback and rewrites it for the dark UI.
 * 2. Fetches daily contributions JSON for the interactive heatmap.
 *
 * Both outputs are committed under /public and treated as fallbacks. Upstream
 * outages must never break dev/build as long as a committed fallback exists.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
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
const TIMEOUT_MS = 10000

export function rewriteGhchartForDarkUi(svg) {
  return svg.replace(/#EEEEEE/gi, '#161b22').replace(/fill:#767676/gi, 'fill:#8b949e')
}

function normalizeCommittedSvg() {
  if (!existsSync(SVG_OUT)) return false
  const existing = readFileSync(SVG_OUT, 'utf8')
  const rewritten = rewriteGhchartForDarkUi(existing)
  if (rewritten !== existing) writeFileSync(SVG_OUT, rewritten, 'utf8')
  return true
}

async function fetchSvg() {
  const res = await fetch(SVG_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`ghchart SVG fetch failed: ${res.status}`)
  const svg = rewriteGhchartForDarkUi(await res.text())
  writeFileSync(SVG_OUT, svg, 'utf8')
  console.log('Wrote', SVG_OUT)
}

function mapContributions(data) {
  if (!data || !Array.isArray(data.contributions)) {
    throw new Error('contributions JSON payload missing `contributions` array')
  }
  const contributions = data.contributions.map((day) => ({
    date: day.date,
    count: day.count,
    level: day.level,
  }))
  const totalFromApi = data.total?.lastYear
    ?? data.total?.[Object.keys(data.total || {})[0]]
    ?? contributions.reduce((sum, day) => sum + (day.count || 0), 0)
  return { contributions, total: totalFromApi }
}

async function fetchYearJson(yearKey) {
  const query = yearKey === 'last' ? 'last' : String(yearKey)
  const url = `https://github-contributions-api.jogruber.de/v4/${USER}?y=${query}`
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) })
  if (!res.ok) throw new Error(`contributions JSON fetch failed for ${yearKey}: ${res.status}`)
  const data = await res.json()
  const mapped = mapContributions(data)
  return {
    label: yearKey === 'last' ? 'Last 12 months' : String(yearKey),
    total: mapped.total,
    contributions: mapped.contributions,
  }
}

async function fetchJson() {
  const currentYear = new Date().getUTCFullYear()
  const calendarYears = []
  for (let year = 2021; year <= currentYear; year++) calendarYears.push(year)

  const yearKeys = ['last', ...calendarYears]
  const years = {}
  const availableYears = []

  await Promise.all(yearKeys.map(async (yearKey) => {
    try {
      years[yearKey] = await fetchYearJson(yearKey)
      availableYears.push(yearKey)
    } catch (error) {
      console.warn(`Skipping GitHub year ${yearKey}:`, error.message || error)
    }
  }))

  if (!years.last && !existsSync(JSON_OUT)) {
    throw new Error('GitHub contributions fetch failed for all year views')
  }
  if (!years.last) {
    const existing = JSON.parse(readFileSync(JSON_OUT, 'utf8'))
    if (existing?.years?.last) years.last = existing.years.last
    if (!availableYears.includes('last') && years.last) availableYears.unshift('last')
  }

  const sortedYears = (availableYears.length ? availableYears : yearKeys).sort((a, b) => {
    if (a === 'last') return -1
    if (b === 'last') return 1
    return Number(b) - Number(a)
  })

  const payload = {
    user: USER,
    fetchedAt: new Date().toISOString(),
    defaultYear: 'last',
    availableYears: sortedYears,
    years,
  }
  writeFileSync(JSON_OUT, JSON.stringify(payload), 'utf8')
  const last = years.last
  console.log(
    'Wrote',
    JSON_OUT,
    `(${payload.availableYears.length} year views, last=${last?.contributions.length ?? 0} days / ${last?.total ?? 0} total)`,
  )
}

async function runWithFallback(label, task, fallbackPath) {
  try {
    await task()
  } catch (error) {
    if (label === 'ghchart SVG') normalizeCommittedSvg()
    if (existsSync(fallbackPath)) {
      console.warn(`${label} fetch failed, using committed fallback`)
      console.warn(error.message || error)
      return
    }
    throw error
  }
}

async function main() {
  mkdirSync(PUBLIC_DIR, { recursive: true })
  await Promise.all([
    runWithFallback('ghchart SVG', fetchSvg, SVG_OUT),
    runWithFallback('contributions JSON', fetchJson, JSON_OUT),
  ])
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
