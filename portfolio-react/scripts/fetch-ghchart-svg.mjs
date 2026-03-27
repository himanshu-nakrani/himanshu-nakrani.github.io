/**
 * Fetches ghchart SVG (GitHub-style green ramp) and rewrites for dark UI:
 * empty cells #161b22, readable month labels. Run via prebuild/predev.
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'gh-contributions.svg')
/** Base green — ghchart derives lighter/darker greens from this (GitHub-like). */
const ACCENT = '39d353'
const USER = 'himanshu-nakrani'
const URL = `https://ghchart.rshah.org/${ACCENT}/${USER}`

async function main() {
  const res = await fetch(URL)
  if (!res.ok) throw new Error(`ghchart fetch failed: ${res.status}`)
  let svg = await res.text()

  svg = svg.replace(/#EEEEEE/gi, '#161b22').replace(/fill:#767676/gi, 'fill:#8b949e')

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, svg, 'utf8')
  console.log('Wrote', OUT)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
