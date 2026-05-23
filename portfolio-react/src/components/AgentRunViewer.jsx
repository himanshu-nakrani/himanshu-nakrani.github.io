import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const statusConfig = {
  done:    { color: 'var(--color-success, #16a34a)', label: 'Done' },
  pass:    { color: 'var(--color-success, #16a34a)', label: 'Pass' },
  running: { color: 'var(--color-accent)', label: 'Running' },
  queued:  { color: 'var(--color-text-subtle)', label: 'Queued' },
}

function StatusDot({ status }) {
  const config = statusConfig[status] || statusConfig.queued
  const isRunning = status === 'running'

  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: config.color,
        flexShrink: 0,
        boxShadow: isRunning ? `0 0 6px ${config.color}` : 'none',
      }}
    />
  )
}

function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.queued

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '1px 7px',
        borderRadius: 'var(--radius-pill)',
        border: `1px solid ${config.color}`,
        background: status === 'running'
          ? 'var(--color-accent-soft)'
          : 'transparent',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.6rem',
        fontWeight: 500,
        color: config.color,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        lineHeight: '1.6',
      }}
    >
      {config.label}
    </span>
  )
}

function EventListItem({ step, index, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-current={isSelected ? 'true' : undefined}
      aria-label={`Event ${index + 1}: ${step.label}, status: ${step.status}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        width: '100%',
        padding: '8px 12px',
        border: 'none',
        borderLeft: isSelected
          ? '2px solid var(--color-accent)'
          : '2px solid transparent',
        background: isSelected ? 'var(--color-accent-soft)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        outline: 'none',
        transition: 'all 0.12s ease',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <StatusDot status={step.status} />
      <span
        style={{
          flex: 1,
          fontSize: 'var(--text-sm)',
          fontWeight: isSelected ? 600 : 400,
          color: isSelected ? 'var(--color-text)' : 'var(--color-text-muted)',
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {step.label}
      </span>
      <StatusBadge status={step.status} />
    </button>
  )
}

function DetailPanel({ step }) {
  if (!step) return null

  return (
    <div style={{ padding: '1.25rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          marginBottom: '0.75rem',
        }}
      >
        <StatusDot status={step.status} />
        <h4
          style={{
            margin: 0,
            fontSize: 'var(--text-base)',
            fontWeight: 600,
            color: 'var(--color-text)',
          }}
        >
          {step.label}
        </h4>
        <StatusBadge status={step.status} />
      </div>

      {/* Detail text */}
      {step.detail && (
        <p
          style={{
            margin: '0 0 1rem',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 'var(--line-height-relaxed)',
          }}
        >
          {step.detail}
        </p>
      )}

      {/* Output block */}
      {step.output && (
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              color: 'var(--color-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.35rem',
            }}
          >
            Output
          </div>
          <pre
            style={{
              margin: 0,
              padding: '0.875rem 1rem',
              background: 'var(--color-surface-raised)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            <code>{step.output}</code>
          </pre>
        </div>
      )}
    </div>
  )
}

export default function AgentRunViewer({ steps }) {
  const reduceMotion = useReducedMotion()
  const [selectedId, setSelectedId] = useState(steps[0]?.id ?? null)
  const [expandedId, setExpandedId] = useState(null)

  const selectedStep = steps.find(s => s.id === selectedId) || steps[0]

  const handleSelect = useCallback((id) => {
    setSelectedId(id)
  }, [])

  const handleToggleExpand = useCallback((id) => {
    setExpandedId(prev => prev === id ? null : id)
  }, [])

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl, 12px)',
        overflow: 'hidden',
      }}
    >
      {/* Desktop: split layout */}
      <div className="arv-desktop" style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        minHeight: 300,
      }}>
        {/* Left: event list */}
        <div
          role="listbox"
          aria-label="Agent run events"
          style={{
            borderRight: '1px solid var(--color-border)',
            overflowY: 'auto',
            maxHeight: 440,
          }}
        >
          {steps.map((step, i) => (
            <EventListItem
              key={step.id}
              step={step}
              index={i}
              isSelected={step.id === selectedId}
              onClick={() => handleSelect(step.id)}
            />
          ))}
        </div>

        {/* Right: detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep?.id}
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.12 }}
            style={{ overflowY: 'auto', maxHeight: 440 }}
          >
            <DetailPanel step={selectedStep} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile: stacked with expandable details */}
      <div className="arv-mobile" style={{ display: 'none' }}>
        {steps.map((step) => {
          const isExpanded = expandedId === step.id
          return (
            <div key={step.id}>
              <button
                onClick={() => handleToggleExpand(step.id)}
                aria-expanded={isExpanded}
                aria-label={`${step.label}, status: ${step.status}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  borderBottom: '1px solid var(--color-border)',
                  background: isExpanded ? 'var(--color-accent-soft)' : 'transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  outline: 'none',
                }}
              >
                <StatusDot status={step.status} />
                <span
                  style={{
                    flex: 1,
                    fontSize: 'var(--text-sm)',
                    fontWeight: isExpanded ? 600 : 400,
                    color: isExpanded ? 'var(--color-text)' : 'var(--color-text-muted)',
                  }}
                >
                  {step.label}
                </span>
                <StatusBadge status={step.status} />
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--color-text-subtle)',
                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.15s ease',
                  }}
                >
                  ›
                </span>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={reduceMotion ? {} : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '1rem 14px',
                        borderBottom: '1px solid var(--color-border)',
                        background: 'var(--color-surface-raised)',
                      }}
                    >
                      {step.detail && (
                        <p
                          style={{
                            margin: '0 0 0.75rem',
                            fontSize: 'var(--text-sm)',
                            color: 'var(--color-text-muted)',
                            lineHeight: 'var(--line-height-relaxed)',
                          }}
                        >
                          {step.detail}
                        </p>
                      )}

                      {step.output && (
                        <pre
                          style={{
                            margin: 0,
                            padding: '0.75rem',
                            background: 'var(--color-surface)',
                            border: '1px solid var(--color-border)',
                            borderRadius: 6,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--color-text-muted)',
                            lineHeight: 1.6,
                            overflow: 'auto',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                          }}
                        >
                          <code>{step.output}</code>
                        </pre>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Responsive styles */}
      <style>{`
        .arv-desktop { display: grid !important; }
        .arv-mobile { display: none !important; }
        @media (max-width: 640px) {
          .arv-desktop { display: none !important; }
          .arv-mobile { display: block !important; }
        }
      `}</style>
    </div>
  )
}
