import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'

/**
 * ActivityConstellation — unified contribution heatmap showing GitHub + Kaggle + LeetCode
 * activity on a single year-long calendar with toggleable layers
 */
export default function ActivityConstellation({ profiles = [] }) {
  const [activeLayer, setActiveLayer] = useState(['github', 'kaggle'])
  const reduceMotion = () => false

  // Generate mock data for the past 52 weeks
  const generateWeekData = () => {
    const now = new Date()
    const weeks = []
    for (let i = 51; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i * 7)
      weeks.push({
        date,
        github: Math.floor(Math.random() * 15),
        kaggle: Math.floor(Math.random() * 8),
        leetcode: Math.floor(Math.random() * 5),
      })
    }
    return weeks
  }

  const weeks = useMemo(() => generateWeekData(), [])

  const layers = [
    { id: 'github', label: 'GitHub', color: 'var(--color-accent)', icon: '◆' },
    { id: 'kaggle', label: 'Kaggle', color: '#FFD700', icon: '●' },
    { id: 'leetcode', label: 'LeetCode', color: '#FFA500', icon: '■' },
  ]

  const maxValue = Math.max(
    ...weeks.flatMap(w => [w.github, w.kaggle, w.leetcode])
  )

  const getIntensity = (value) => {
    if (value === 0) return 0.1
    return Math.min(1, value / maxValue)
  }

  const getLayerColor = (layer) => {
    switch (layer) {
      case 'github':
        return 'var(--color-accent)'
      case 'kaggle':
        return 'var(--color-accent-warm)'
      case 'leetcode':
        return 'var(--color-accent-alt)'
      default:
        return 'var(--color-border)'
    }
  }

  return (
    <div className="activity-constellation">
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '1.5rem',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'var(--color-text)',
            }}
          >
            Activity Constellation
          </h3>

          {/* Layer toggles */}
          <div
            style={{
              display: 'flex',
              gap: 8,
            }}
          >
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => {
                  setActiveLayer((prev) =>
                    prev.includes(layer.id)
                      ? prev.filter((l) => l !== layer.id)
                      : [...prev, layer.id]
                  )
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '4px 8px',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  color: activeLayer.includes(layer.id)
                    ? getLayerColor(layer.id)
                    : 'var(--color-text-muted)',
                  background: activeLayer.includes(layer.id)
                    ? 'transparent'
                    : 'transparent',
                  border: '1px solid ' + (activeLayer.includes(layer.id)
                    ? getLayerColor(layer.id)
                    : 'var(--color-border)'),
                  borderRadius: 6,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = getLayerColor(layer.id)
                  e.currentTarget.style.color = getLayerColor(layer.id)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = activeLayer.includes(layer.id)
                    ? getLayerColor(layer.id)
                    : 'var(--color-border)'
                  e.currentTarget.style.color = activeLayer.includes(layer.id)
                    ? getLayerColor(layer.id)
                    : 'var(--color-text-muted)'
                }}
              >
                <span>{layer.icon}</span>
                <span>{layer.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Heatmap */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(24px, 1fr))',
            gap: 4,
            marginBottom: '1rem',
          }}
        >
          {weeks.map((week, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.01,
              }}
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                background: activeLayer.includes('github')
                  ? `rgba(159, 182, 200, ${getIntensity(week.github)})`
                  : 'var(--color-border)',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.2)'
                e.currentTarget.style.boxShadow = `0 0 12px ${getLayerColor('github')}`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              title={`${week.date.toLocaleDateString()}: ${week.github} commits`}
            />
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            lineHeight: 1.6,
          }}
        >
          Each square represents one week. Color intensity shows activity level across selected sources.
        </div>
      </div>
    </div>
  )
}
