import { Microscope } from 'lucide-react'

const LABELS = {
  classic: 'Classic design',
  instrument: 'Living Research Instrument',
}

export default function DesignModeToggle({ designMode, setDesignMode, compact = false }) {
  const isInstrument = designMode === 'instrument'
  const size = compact ? 36 : 44
  const nextMode = isInstrument ? 'classic' : 'instrument'
  const label = isInstrument ? 'Switch to classic design' : 'Switch to Living Research Instrument'

  return (
    <button
      type="button"
      onClick={() => setDesignMode(nextMode)}
      aria-label={label}
      aria-pressed={isInstrument}
      title={`${label} (${LABELS[designMode] || LABELS.classic})`}
      className="design-mode-toggle"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: compact ? 0 : 7,
        minWidth: compact ? size : 'auto',
        width: compact ? size : 'auto',
        height: size,
        padding: compact ? 0 : '0 0.75rem',
        borderRadius: 9999,
        border: '1px solid var(--color-border-strong)',
        background: isInstrument
          ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))'
          : 'transparent',
        cursor: 'pointer',
        color: isInstrument ? 'var(--color-accent)' : 'var(--color-text-muted)',
        flexShrink: 0,
        transition:
          'border-color var(--motion-duration-base) var(--motion-ease), background var(--motion-duration-base) var(--motion-ease), color var(--motion-duration-base) var(--motion-ease), transform var(--motion-duration-base) var(--motion-ease-out)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 65%, var(--color-border))'
        e.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 10%, var(--color-surface))'
        e.currentTarget.style.color = 'var(--color-accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.background = isInstrument
          ? 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))'
          : 'transparent'
        e.currentTarget.style.color = isInstrument ? 'var(--color-accent)' : 'var(--color-text-muted)'
      }}
    >
      <Microscope size={compact ? 15 : 16} strokeWidth={1.8} aria-hidden="true" />
      {!compact && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            fontWeight: 650,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {isInstrument ? 'V2' : 'V1'}
        </span>
      )}
    </button>
  )
}
