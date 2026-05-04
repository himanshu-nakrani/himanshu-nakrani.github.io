import { useState, useEffect } from 'react'

/**
 * DensityToggle — switch between comfortable and compact view modes
 * Adjusts padding, spacing, and grid density across the site
 */
export function DensityToggle() {
  const [density, setDensity] = useState(() => {
    try {
      return localStorage.getItem('density') || 'comfortable'
    } catch {
      return 'comfortable'
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-density', density)
    try {
      localStorage.setItem('density', density)
    } catch (err) {
      console.warn('Failed to save density preference', err)
    }
  }, [density])

  const densityOptions = [
    { value: 'comfortable', label: 'Comfortable', spacing: 1 },
    { value: 'compact', label: 'Compact', spacing: 0.8 },
  ]

  return (
    <div
      className="density-toggle"
      role="group"
      aria-label="View density"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: 4,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 8,
      }}
    >
      {densityOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setDensity(option.value)}
          aria-label={`Set density to ${option.label}`}
          aria-pressed={density === option.value}
          style={{
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontWeight: density === option.value ? 600 : 500,
            color: density === option.value ? 'var(--color-accent)' : 'var(--color-text-muted)',
            background: density === option.value ? 'var(--color-surface-raised)' : 'transparent',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {option.label}
        </button>
      ))}

      <style>{`
        [data-density="comfortable"] {
          --space-section: 5rem;
          --space-card: 1.25rem;
        }
        [data-density="compact"] {
          --space-section: 3rem;
          --space-card: 0.875rem;
        }
      `}</style>
    </div>
  )
}

export default DensityToggle
