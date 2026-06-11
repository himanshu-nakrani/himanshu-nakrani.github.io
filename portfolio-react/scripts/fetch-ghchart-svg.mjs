/**
 * Fetches ghchart SVG (GitHub-style green ramp) and rewrites for dark UI.
 * Uses the committed public SVG as an offline fallback so dev/build never hard-fail
 * solely because the external chart service is unavailable.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'gh-contributions.svg')
/** Base green — ghchart derives lighter/darker greens from this (GitHub-like). */
const ACCENT = '39d353'
const USER = 'himanshu-nakrani'
const URL = `https://ghchart.rshah.org/${ACCENT}/${USER}`

export function rewriteGhchartForDarkUi(svg) {
  return svg.replace(/#EEEEEE/gi, '#161b22').replace(/fill:#767676/gi, 'fill:#8b949e')
}

async function main() {
  const res = await fetch(URL, { signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`ghchart fetch failed: ${res.status}`)
  const svg = rewriteGhchartForDarkUi(await res.text())

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, svg, 'utf8')
  console.log('Wrote', OUT)
}

main().catch((e) => {
  if (existsSync(OUT)) {
    const existing = readFileSync(OUT, 'utf8')
    const rewritten = rewriteGhchartForDarkUi(existing)
    if (rewritten !== existing) writeFileSync(OUT, rewritten, 'utf8')
    console.warn('ghchart fetch failed, using committed SVG')
    console.warn(e.message || e)
    process.exit(0)
  }
  console.error(e)
  process.exit(1)
})
