import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Interactive GitHub contribution heatmap.
 *
 * Reads daily contribution data from public/gh-contributions.json (fetched
 * at build time by scripts/fetch-ghchart-svg.mjs). Renders a 7×N daily grid
 * styled with the site's accent color, hover tooltip, totals, and streaks.
 *
 * Falls back to null if the JSON is missing — the prebuild script may have
 * been skipped or the upstream API may have been unreachable.
 */

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const VISIBLE_WEEKDAY_ROWS = new Set([1, 3, 5]) // Mon/Wed/Fri, GitHub convention

const CELL = 11
const GAP = 3
const RADIUS = 2

const LEVEL_BG = [
  'color-mix(in srgb, var(--color-text-muted, #888) 12%, transparent)',
  'color-mix(in srgb, var(--color-accent) 22%, transparent)',
  'color-mix(in srgb, var(--color-accent) 45%, transparent)',
  'color-mix(in srgb, var(--color-accent) 72%, transparent)',
  'var(--color-accent)',
]

export default function GitHubContributionHeatmap({
  src = 'gh-contributions.json',
  username = 'himanshu-nakrani',
}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(false)
  const [hover, setHover] = useState(null) // { row, col, day }
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}${src}`, { cache: 'force-cache' })
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((j) => { if (!cancelled) setData(j) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [src])

  const view = useMemo(() => {
    if (!data?.contributions?.length) return null
    const days = data.contributions
    const firstDate = new Date(days[0].date + 'T00:00:00')
    const lead = firstDate.getDay() // 0..6

    // ⚡ Bolt Optimization: Pre-calculate formatting using a single Intl formatter
    // and a single Date object inside the useMemo block. This avoids 371 Intl instantiations
    // per render when hover state changes.
    const formatter = new Intl.DateTimeFormat(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    const singleDate = new Date()

    // Build a column-major grid: each column is a week, each row a weekday (0=Sun..6=Sat).
    const cols = []
    let week = Array(7).fill(null)
    for (let i = 0; i < lead; i++) week[i] = null
    let row = lead
    for (const d of days) {
      singleDate.setTime(Date.parse(d.date + 'T00:00:00'))
      // Store the pre-calculated formatted string
      week[row] = { ...d, formattedDate: formatter.format(singleDate) }
      row++
      if (row === 7) {
        cols.push(week)
        week = Array(7).fill(null)
        row = 0
      }
    }
    if (week.some((c) => c !== null)) cols.push(week)

    // Month labels: place at the first column where a new month begins.
    const monthLabels = []
    let prev = -1
    cols.forEach((col, ci) => {
      const firstCell = col.find((c) => c)
      if (!firstCell) return
      // Extract month from "YYYY-MM-DD" directly to avoid new Date()
      const m = parseInt(firstCell.date.substring(5, 7), 10) - 1
      if (m !== prev) {
        // Only label if there's at least ~2 weeks of room (avoid cramped labels at edges).
        if (ci === 0 || ci > 1) monthLabels.push({ col: ci, label: MONTHS[m] })
        prev = m
      }
    })

    // Streaks
    let longest = 0, run = 0, current = 0
    for (const d of days) {
      if (d.count > 0) { run++; if (run > longest) longest = run } else { run = 0 }
    }
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) current++
      else break
    }

    // Bucket out a "best day" stat
    const best = days.reduce((acc, d) => (d.count > acc.count ? d : acc), { count: 0, date: '' })

    return {
      cols,
      monthLabels,
      total: data.total ?? days.reduce((s, d) => s + (d.count || 0), 0),
      longest,
      current,
      best,
      firstDate: days[0].date,
      lastDate: days[days.length - 1].date,
    }
  }, [data])

  if (error || (data && !view)) return null

  const gridW = view ? view.cols.length * (CELL + GAP) - GAP : 0
  const profileHref = `https://github.com/${username}`

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface, var(--color-surface))',
      }}
    >
      {/* Header: title + summary chip + link */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, marginBottom: 14, flexWrap: 'wrap',
      }}>
        <div>
          <p style={{
            fontSize: '0.66rem', color: 'var(--text2, var(--color-text-muted))',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
            textTransform: 'uppercase', margin: 0,
          }}>
            Contribution heatmap
          </p>
          {view && (
            <p style={{
              margin: '4px 0 0',
              fontSize: '0.82rem',
              color: 'var(--text, var(--color-text))',
            }}>
              <strong style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-accent)',
                fontSize: '0.95rem',
              }}>
                {view.total.toLocaleString()}
              </strong>
              <span style={{ color: 'var(--text2, var(--color-text-muted))' }}> contributions in the last year</span>
            </p>
          )}
        </div>
        <a
          href={profileHref}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.7rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text2, var(--color-text-muted))',
            textDecoration: 'none',
            border: '1px solid var(--border, var(--color-border))',
            borderRadius: 999,
            padding: '3px 10px',
          }}
        >
          @{username} ↗
        </a>
      </div>

      {/* Loading shimmer */}
      {!view && (
        <div style={{
          height: 7 * (CELL + GAP) + 30,
          borderRadius: 8,
          background: 'linear-gradient(90deg, var(--surface2, rgba(255,255,255,0.03)), var(--surface, rgba(255,255,255,0.06)), var(--surface2, rgba(255,255,255,0.03)))',
          backgroundSize: '200% 100%',
          animation: 'gh-shimmer 1.4s linear infinite',
        }} />
      )}

      {/* Grid */}
      {view && (
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{
            display: 'inline-grid',
            gridTemplateColumns: `28px ${gridW}px`,
            gridTemplateRows: '14px auto',
            gap: '4px 8px',
            position: 'relative',
          }}>
            {/* spacer top-left */}
            <div />
            {/* month label row */}
            <div style={{ position: 'relative', height: 14 }}>
              {view.monthLabels.map(({ col, label }) => (
                <span
                  key={`${col}-${label}`}
                  style={{
                    position: 'absolute',
                    left: col * (CELL + GAP),
                    fontSize: '0.65rem',
                    color: 'var(--text2, var(--color-text-muted))',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* weekday labels column */}
            <div style={{
              display: 'grid',
              gridTemplateRows: `repeat(7, ${CELL}px)`,
              rowGap: GAP,
              fontSize: '0.62rem',
              color: 'var(--text2, var(--color-text-muted))',
              fontFamily: 'var(--font-mono)',
            }}>
              {WEEKDAYS.map((w, i) => (
                <span key={w} style={{
                  lineHeight: `${CELL}px`,
                  textAlign: 'right',
                  visibility: VISIBLE_WEEKDAY_ROWS.has(i) ? 'visible' : 'hidden',
                }}>
                  {w}
                </span>
              ))}
            </div>

            {/* cells */}
            <div
              role="figure"
              aria-label="GitHub daily contribution heatmap"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${view.cols.length}, ${CELL}px)`,
                gridTemplateRows: `repeat(7, ${CELL}px)`,
                gridAutoFlow: 'column',
                gap: GAP,
              }}
            >
              {view.cols.flatMap((week, ci) =>
                week.map((cell, ri) => {
                  if (!cell) {
                    return <div key={`${ci}-${ri}`} style={{ width: CELL, height: CELL }} />
                  }
                  const level = cell.level ?? 0
                  const isHover = hover && hover.col === ci && hover.row === ri
                  return (
                    <motion.div
                      key={`${ci}-${ri}`}
                      tabIndex={0}
                      role="button"
                      aria-label={`${cell.count} contributions on ${cell.formattedDate}`}
                      onMouseEnter={() => setHover({ col: ci, row: ri, day: cell })}
                      onMouseLeave={() => setHover(null)}
                      onFocus={() => setHover({ col: ci, row: ri, day: cell })}
                      onBlur={() => setHover(null)}
                      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 0.25, delay: Math.min(0.6, ci * 0.005) }}
                      style={{
                        width: CELL,
                        height: CELL,
                        borderRadius: RADIUS,
                        background: LEVEL_BG[level],
                        outline: 'none',
                        border: isHover
                          ? '1px solid var(--color-accent)'
                          : '1px solid transparent',
                        boxShadow: isHover
                          ? '0 0 0 2px color-mix(in srgb, var(--color-accent) 35%, transparent)'
                          : 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.12s ease, box-shadow 0.12s ease',
                      }}
                    />
                  )
                })
              )}
            </div>

            {/* tooltip */}
            {hover && (
              <div
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                  left: 28 + 8 + hover.col * (CELL + GAP) + CELL / 2,
                  top: 14 + 4 + hover.row * (CELL + GAP) - 8,
                  transform: 'translate(-50%, -100%)',
                  background: 'var(--color-bg, #0e0e1a)',
                  border: '1px solid var(--border, var(--color-border))',
                  borderRadius: 6,
                  padding: '6px 9px',
                  fontSize: '0.72rem',
                  whiteSpace: 'nowrap',
                  color: 'var(--text, var(--color-text))',
                  zIndex: 5,
                  boxShadow: '0 4px 18px rgba(0,0,0,0.35)',
                }}
              >
                <strong style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                  {hover.day.count}
                </strong>{' '}
                {hover.day.count === 1 ? 'contribution' : 'contributions'}
                <span style={{ color: 'var(--text2, var(--color-text-muted))' }}>
                  {' '}· {hover.day.formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer: legend + streaks */}
      {view && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 14, flexWrap: 'wrap', gap: 10,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: '0.68rem', color: 'var(--text2, var(--color-text-muted))',
            fontFamily: 'var(--font-mono)',
          }}>
            <span>Less</span>
            {LEVEL_BG.map((bg, i) => (
              <span
                key={i}
                aria-hidden
                style={{
                  width: CELL, height: CELL, borderRadius: RADIUS,
                  background: bg,
                  border: '1px solid color-mix(in srgb, var(--text2, #888) 10%, transparent)',
                  display: 'inline-block',
                }}
              />
            ))}
            <span>More</span>
          </div>

          <div style={{
            display: 'flex', gap: 14,
            fontSize: '0.7rem',
            color: 'var(--text2, var(--color-text-muted))',
            fontFamily: 'var(--font-mono)',
            flexWrap: 'wrap',
          }}>
            <Stat label="Current streak" value={`${view.current}d`} />
            <Stat label="Longest streak" value={`${view.longest}d`} />
            <Stat label="Best day" value={`${view.best.count}`} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes gh-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 4 }}>
      <span>{label}</span>
      <strong style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>{value}</strong>
    </span>
  )
}
