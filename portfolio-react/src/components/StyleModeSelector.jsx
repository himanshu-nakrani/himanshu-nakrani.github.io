const modes = [
  { id: 'luxe', label: 'Luxe' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'noir', label: 'Noir' },
]

export default function StyleModeSelector({ styleMode, setStyleMode, compact = false }) {
  return (
    <div
      role="group"
      aria-label="Visual style mode"
      className={compact ? 'style-mode style-mode-compact' : 'style-mode'}
    >
      {modes.map((mode) => {
        const active = mode.id === styleMode
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => setStyleMode(mode.id)}
            aria-pressed={active}
            className={active ? 'style-mode-btn active' : 'style-mode-btn'}
            title={`Switch to ${mode.label} mode`}
          >
            {mode.label}
          </button>
        )
      })}
    </div>
  )
}
