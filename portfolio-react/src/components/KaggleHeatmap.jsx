import { useMemo } from 'react'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** GitHub dark-mode style greens (empty + 4 levels). */
const LEVEL_FILL = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

function pad2(n) {
  return String(n).padStart(2, '0')
}

function toKey(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`
}

/**
 * @param {Record<string, number>} contributionMap — YYYY-MM-DD → activity count (e.g. kernels/datasets that day)
 */
export default function KaggleHeatmap({ contributionMap = {} }) {
  const { rects, monthLabels, dayLabels } = useMemo(() => {
    const end = new Date()
    end.setHours(0, 0, 0, 0)
    const lastSunday = new Date(end)
    lastSunday.setDate(end.getDate() - end.getDay())
    const firstSunday = new Date(lastSunday)
    firstSunday.setDate(lastSunday.getDate() - 52 * 7)

    const cell = new Date(firstSunday)
    const flatCounts = []
    for (let w = 0; w < 53; w++) {
      for (let d = 0; d < 7; d++) {
        const raw = contributionMap[toKey(cell)]
        const future = cell > end
        const c = future ? 0 : typeof raw === 'number' && raw > 0 ? raw : 0
        flatCounts.push({ c, future })
        cell.setDate(cell.getDate() + 1)
      }
    }

    const maxC = Math.max(1, ...flatCounts.map(({ c, future }) => (future ? 0 : c)))
    const levelFor = (c, future) => {
      if (future || c <= 0) return 0
      return Math.min(4, Math.ceil((4 * c) / maxC))
    }

    const rects = []
    let idx = 0
    cell.setTime(firstSunday.getTime())
    for (let w = 0; w < 53; w++) {
      for (let d = 0; d < 7; d++) {
        const { c, future } = flatCounts[idx]
        const lvl = levelFor(c, future)
        rects.push({
          key: `${w}-${d}`,
          x: 27 + w * 12,
          y: 20 + d * 12,
          fill: LEVEL_FILL[future ? 0 : lvl],
          date: toKey(cell),
          score: future ? -1 : c,
        })
        idx++
        cell.setDate(cell.getDate() + 1)
      }
    }

    const monthLabels = []
    let prevM = -1
    cell.setTime(firstSunday.getTime())
    for (let w = 0; w < 53; w++) {
      const m = cell.getMonth()
      if (m !== prevM) {
        prevM = m
        monthLabels.push({ x: 27 + w * 12, label: MONTHS[m] })
      }
      cell.setDate(cell.getDate() + 7)
    }

    // Rows: d=0 Sun … d=6 Sat (matches ghchart). Mon/Wed/Fri row indices 1,3,5.
    const dayLabels = [
      { y: 20 + 1 * 12 + 8, label: 'Mon' },
      { y: 20 + 3 * 12 + 8, label: 'Wed' },
      { y: 20 + 5 * 12 + 8, label: 'Fri' },
    ]

    return { rects, monthLabels, dayLabels }
  }, [contributionMap])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 663 104"
      width="100%"
      height="auto"
      style={{ display: 'block', minWidth: 640 }}
      role="img"
      aria-label="Kaggle activity heatmap (last year)"
    >
      {monthLabels.map((m, i) => (
        <text key={i} x={m.x} y={12} fill="#8b949e" fontSize="9" fontFamily="system-ui, sans-serif">
          {m.label}
        </text>
      ))}
      {dayLabels.map((d) => (
        <text key={d.label} x={4} y={d.y} fill="#8b949e" fontSize="9" fontFamily="system-ui, sans-serif">
          {d.label}
        </text>
      ))}
      {rects.map((r) => (
        <rect
          key={r.key}
          width={10}
          height={10}
          x={r.x}
          y={r.y}
          fill={r.fill}
          data-date={r.date}
          data-score={r.score}
          style={{ shapeRendering: 'crispEdges' }}
        />
      ))}
    </svg>
  )
}
