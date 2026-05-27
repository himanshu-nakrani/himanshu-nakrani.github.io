import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const variantLabels = {
  pipeline: 'Pipeline Architecture',
  agent: 'Agent Architecture',
  retrieval: 'Retrieval Architecture',
  training: 'Training Architecture',
}

export default function TechnicalArchitectureMap({
  stages,
  activeStage,
  onStageChange,
  variant = 'pipeline',
}) {
  const reduceMotion = useReducedMotion()
  const [hoveredId, setHoveredId] = useState(null)
  const active = stages.find(s => s.id === activeStage)

  const handleKeyDown = useCallback(
    (e) => {
      const currentIdx = stages.findIndex(s => s.id === activeStage)
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault()
        const next = stages[(currentIdx + 1) % stages.length]
        onStageChange(next.id)
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        const prev = stages[(currentIdx - 1 + stages.length) % stages.length]
        onStageChange(prev.id)
      } else if (e.key === 'Home') {
        e.preventDefault()
        onStageChange(stages[0].id)
      } else if (e.key === 'End') {
        e.preventDefault()
        onStageChange(stages[stages.length - 1].id)
      }
    },
    [stages, activeStage, onStageChange]
  )

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl, 12px)',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
          }}
        >
          {variantLabels[variant] || variantLabels.pipeline}
        </span>
      </div>

      {/* Desktop: horizontal row | Mobile: vertical stepper */}
      <div
        role="tablist"
        aria-label={`${variantLabels[variant] || 'Pipeline'} stages`}
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        style={{
          padding: '1.25rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Desktop layout */}
        <div className="tam-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
        }}>
          {stages.map((stage, i) => {
            const isActive = stage.id === activeStage
            const isHovered = stage.id === hoveredId
            return (
              <div key={stage.id} style={{ display: 'contents' }}>
                <motion.button
                  role="tab"
                  id={`tam-tab-${stage.id}`}
                  aria-selected={isActive}
                  aria-controls={`tam-panel-${stage.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onStageChange(stage.id)}
                  onMouseEnter={() => setHoveredId(stage.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    borderColor: isActive
                      ? 'var(--color-accent)'
                      : isHovered
                        ? 'var(--color-border-strong)'
                        : 'var(--color-border)',
                  }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '10px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    background: isActive
                      ? 'var(--color-accent-soft)'
                      : 'transparent',
                    cursor: 'pointer',
                    minWidth: 100,
                    flex: '0 0 auto',
                    position: 'relative',
                    outline: 'none',
                  }}
                >
                  {/* Step number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-text-subtle)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Label */}
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      textAlign: 'center',
                      lineHeight: 1.3,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stage.label}
                  </span>
                </motion.button>

                {/* Connector arrow between nodes */}
                {i < stages.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: 32,
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="28" height="16" viewBox="0 0 28 16">
                      <line
                        x1="0" y1="8" x2="20" y2="8"
                        stroke="var(--color-border-strong)"
                        strokeWidth="1"
                      />
                      <polygon
                        points="18,4 26,8 18,12"
                        fill="var(--color-border-strong)"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Mobile layout */}
        <div className="tam-mobile" style={{ display: 'none' }}>
          {stages.map((stage, i) => {
            const isActive = stage.id === activeStage
            return (
              <div key={stage.id}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                  }}
                >
                  {/* Vertical stepper indicator */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0,
                      width: 24,
                      paddingTop: 2,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: isActive ? 'var(--color-accent)' : 'var(--color-border-strong)',
                        border: isActive ? '2px solid var(--color-accent)' : '2px solid var(--color-border-strong)',
                        flexShrink: 0,
                      }}
                    />
                    {i < stages.length - 1 && (
                      <div
                        style={{
                          width: 1,
                          flex: 1,
                          minHeight: 16,
                          background: 'var(--color-border)',
                          marginTop: 4,
                        }}
                      />
                    )}
                  </div>

                  <button
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => onStageChange(stage.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '8px 14px',
                      border: isActive ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
                      borderRadius: 10,
                      background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                      cursor: 'pointer',
                      width: '100%',
                      textAlign: 'left',
                      marginBottom: i < stages.length - 1 ? 4 : 0,
                      outline: 'none',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: isActive ? 'var(--color-accent)' : 'var(--color-text-subtle)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                      }}
                    >
                      {stage.label}
                    </span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            id={`tam-panel-${active.id}`}
            role="tabpanel"
            aria-labelledby={`tam-tab-${active.id}`}
            initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              margin: '0 1.25rem 1.25rem',
              padding: '1rem 1.25rem',
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--color-accent)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                Stage {stages.findIndex(s => s.id === active.id) + 1}
              </span>
              <span
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}
              >
                {active.label}
              </span>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)',
              }}
            >
              {active.detail}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive styles */}
      <style>{`
        .tam-desktop { display: flex !important; }
        .tam-mobile { display: none !important; }
        @media (max-width: 640px) {
          .tam-desktop { display: none !important; }
          .tam-mobile { display: flex !important; flex-direction: column; }
        }
      `}</style>
    </div>
  )
}
