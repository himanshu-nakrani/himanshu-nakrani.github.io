import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  buildHeatmapView,
  normalizeHeatmapPayload,
  yearLabel,
  yearSummaryText,
} from '../lib/heatmapView'

const WEEKDAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const VISIBLE_WEEKDAY_ROWS = new Set([1, 3, 5])

const CELL = 11
const GAP = 3
const RADIUS = 2

function levelBackgrounds() {
  return [
    'color-mix(in srgb, var(--color-text-muted, #888) 12%, transparent)',
    'color-mix(in srgb, var(--heatmap-accent, var(--color-accent)) 22%, transparent)',
    'color-mix(in srgb, var(--heatmap-accent, var(--color-accent)) 45%, transparent)',
    'color-mix(in srgb, var(--heatmap-accent, var(--color-accent)) 72%, transparent)',
    'var(--heatmap-accent, var(--color-accent))',
  ]
}

export default function ContributionHeatmap({
  src,
  username,
  profileHref,
  title = 'Contribution heatmap',
  unitSingular = 'contribution',
  unitPlural = 'contributions',
  summaryLabel,
  ariaLabel = 'Daily contribution heatmap',
  className = '',
}) {
  const [rawData, setRawData] = useState(null)
  const [error, setError] = useState(false)
  const [hover, setHover] = useState(null)
  const [selectedYear, setSelectedYear] = useState(null)
  const reduceMotion = useReducedMotion()
  const LEVEL_BG = levelBackgrounds()

  useEffect(() => {
    let cancelled = false
    fetch(`${import.meta.env.BASE_URL}${src}`, { cache: 'force-cache' })
      .then((r) => {
        if (!r.ok) throw new Error('fetch failed')
        return r.json()
      })
      .then((j) => { if (!cancelled) setRawData(j) })
      .catch(() => { if (!cancelled) setError(true) })
    return () => { cancelled = true }
  }, [src])

  const payload = useMemo(() => normalizeHeatmapPayload(rawData), [rawData])

  const availableYears = payload?.availableYears ?? []
  const showYearSelector = availableYears.length > 1
  const activeYear = useMemo(() => {
    if (!payload) return null
    if (selectedYear && payload.years[selectedYear]) return selectedYear
    return payload.defaultYear
  }, [payload, selectedYear])
  const activeYearData = activeYear ? payload?.years?.[activeYear] : null

  const view = useMemo(() => {
    if (!activeYearData?.contributions?.length) return null
    return buildHeatmapView(activeYearData.contributions, activeYearData.total)
  }, [activeYearData])

  const resolvedSummaryLabel = summaryLabel
    || (activeYear ? yearSummaryText(activeYear, unitPlural) : `${unitPlural} in the last year`)

  const handleMouseOver = useCallback((e) => {
    const cellEl = e.target.closest('[data-col]')
    if (cellEl) {
      const col = parseInt(cellEl.getAttribute('data-col'), 10)
      const row = parseInt(cellEl.getAttribute('data-row'), 10)
      if (!isNaN(col) && !isNaN(row) && view?.cols[col]?.[row]) {
        setHover({ col, row, day: view.cols[col][row] })
      }
    }
  }, [view])

  const handleMouseOut = useCallback(() => setHover(null), [])

  const handleFocus = useCallback((e) => {
    const cellEl = e.target.closest('[data-col]')
    if (cellEl) {
      const col = parseInt(cellEl.getAttribute('data-col'), 10)
      const row = parseInt(cellEl.getAttribute('data-row'), 10)
      if (!isNaN(col) && !isNaN(row) && view?.cols[col]?.[row]) {
        setHover({ col, row, day: view.cols[col][row] })
      }
    }
  }, [view])

  const handleBlur = useCallback(() => setHover(null), [])

  if (error || (payload && !view)) return null

  const gridW = view ? view.cols.length * (CELL + GAP) - GAP : 0
  const href = profileHref || '#'
  const unit = (count) => (count === 1 ? unitSingular : unitPlural)

  return (
    <div
      className={`contribution-heatmap ${className}`.trim()}
      style={{ position: 'relative', background: 'var(--surface, var(--color-surface))' }}
    >
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
            {title}
          </p>
          {view && (
            <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text, var(--color-text))' }}>
              <strong style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--heatmap-accent, var(--color-accent))',
                fontSize: '0.95rem',
              }}>
                {view.total.toLocaleString()}
              </strong>
              <span style={{ color: 'var(--text2, var(--color-text-muted))' }}> {resolvedSummaryLabel}</span>
            </p>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {showYearSelector && (
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span className="sr-only">Select year</span>
              <select
                value={activeYear || ''}
                onChange={(event) => {
                  setSelectedYear(event.target.value)
                  setHover(null)
                }}
                aria-label="Select activity year"
                style={{
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text, var(--color-text))',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--border, var(--color-border))',
                  borderRadius: 999,
                  padding: '4px 10px',
                  cursor: 'pointer',
                }}
              >
                {availableYears.map((yearKey) => (
                  <option key={yearKey} value={yearKey}>
                    {yearLabel(yearKey, payload.years[yearKey])}
                  </option>
                ))}
              </select>
            </label>
          )}
          <a
            href={href}
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
      </div>

      {!view && (
        <div style={{
          height: 7 * (CELL + GAP) + 30,
          borderRadius: 8,
          background: 'linear-gradient(90deg, var(--surface2, rgba(255,255,255,0.03)), var(--surface, rgba(255,255,255,0.06)), var(--surface2, rgba(255,255,255,0.03)))',
          backgroundSize: '200% 100%',
          animation: 'heatmap-shimmer 1.4s linear infinite',
        }} />
      )}

      {view && (
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
          <div style={{
            display: 'inline-grid',
            gridTemplateColumns: `28px ${gridW}px`,
            gridTemplateRows: '14px auto',
            gap: '4px 8px',
            position: 'relative',
            width: 28 + 8 + gridW,
            minWidth: 28 + 8 + gridW,
            maxWidth: 'none',
          }}>
            <div />
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

            <div
              role="figure"
              aria-label={ariaLabel}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onFocus={handleFocus}
              onBlur={handleBlur}
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
                      aria-label={`${cell.count} ${unit(cell.count)} on ${cell.formattedDate}`}
                      data-col={ci}
                      data-row={ri}
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
                          ? '1px solid var(--heatmap-accent, var(--color-accent))'
                          : '1px solid transparent',
                        boxShadow: isHover
                          ? '0 0 0 2px color-mix(in srgb, var(--heatmap-accent, var(--color-accent)) 35%, transparent)'
                          : 'none',
                        cursor: 'pointer',
                        transition: 'border-color 0.12s ease, box-shadow 0.12s ease',
                      }}
                    />
                  )
                }),
              )}
            </div>

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
                <strong style={{ color: 'var(--heatmap-accent, var(--color-accent))', fontFamily: 'var(--font-mono)' }}>
                  {hover.day.count}
                </strong>{' '}
                {unit(hover.day.count)}
                <span style={{ color: 'var(--text2, var(--color-text-muted))' }}>
                  {' '}· {hover.day.formattedDate}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

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
        @keyframes heatmap-shimmer {
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
      <strong style={{ color: 'var(--heatmap-accent, var(--color-accent))', fontFamily: 'var(--font-mono)' }}>{value}</strong>
    </span>
  )
}