import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/* ───────── status config ───────── */

const statusConfig = {
  complete: {
    color: 'var(--color-success)',
    label: 'Complete',
  },
  planned: {
    color: 'var(--color-text-subtle)',
    label: 'Planned',
  },
  'in-progress': {
    color: 'var(--color-accent)',
    label: 'In Progress',
  },
}

/* ───────── sub-components ───────── */

function StatusDot({ status }) {
  const cfg = statusConfig[status] || statusConfig.planned
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: cfg.color,
        flexShrink: 0,
      }}
    />
  )
}

function MetricCard({ metric }) {
  return (
    <div
      style={{
        padding: '0.75rem 0.85rem',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
      }}
    >
      <span
        style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-mono)',
          fontFeatureSettings: '"tnum" 1',
          lineHeight: 1.2,
        }}
      >
        {metric.value}
      </span>
      <span
        style={{
          fontSize: '0.7rem',
          fontWeight: 500,
          color: 'var(--color-text-subtle)',
          letterSpacing: '0.03em',
          lineHeight: 1.3,
        }}
      >
        {metric.label}
      </span>
    </div>
  )
}

function ArtifactRow({ artifact }) {
  const cfg = statusConfig[artifact.status] || statusConfig.planned
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        padding: '0.4rem 0',
      }}
    >
      <StatusDot status={artifact.status} />
      <span
        style={{
          flex: 1,
          fontSize: '0.82rem',
          color: 'var(--color-text)',
          fontWeight: 500,
        }}
      >
        {artifact.label}
      </span>
      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: 500,
          color: cfg.color,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.02em',
        }}
      >
        {cfg.label}
      </span>
    </div>
  )
}

function ModelPanel({ model }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          flexWrap: 'wrap',
        }}
      >
        <h4
          style={{
            margin: 0,
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--color-text)',
            fontFamily: 'var(--font-display)',
          }}
        >
          {model.name}
        </h4>
        <span
          style={{
            display: 'inline-block',
            padding: '0.18rem 0.6rem',
            fontSize: '0.68rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.03em',
            border: '1px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-pill)',
            color: 'var(--color-text-muted)',
            background: 'transparent',
          }}
        >
          {model.type}
        </span>
      </div>

      {/* Metrics strip */}
      <div>
        <div
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-text-subtle)',
            marginBottom: '0.5rem',
          }}
        >
          Metrics
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '0.5rem',
          }}
        >
          {model.metrics.map((m) => (
            <MetricCard key={m.label} metric={m} />
          ))}
        </div>
      </div>

      {/* Artifact status */}
      {model.artifacts && model.artifacts.length > 0 && (
        <div>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-subtle)',
              marginBottom: '0.35rem',
            }}
          >
            Artifacts
          </div>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.35rem 0.85rem',
              background: 'var(--color-surface)',
            }}
          >
            {model.artifacts.map((a, i) => (
              <div key={a.label}>
                <ArtifactRow artifact={a} />
                {i < model.artifacts.length - 1 && (
                  <div
                    style={{
                      height: 1,
                      background: 'var(--color-border)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ───────── main component ───────── */

export default function TrainingRunPanel({ models }) {
  const [activeId, setActiveId] = useState(models[0]?.id)
  const reduceMotion = useReducedMotion()
  const showTabs = models.length > 1
  const activeModel = models.find((m) => m.id === activeId) || models[0]

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Tabs (only when multiple models) */}
      {showTabs && (
        <div
          style={{
            display: 'flex',
            gap: '0.35rem',
            overflowX: 'auto',
            padding: '1rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
            WebkitOverflowScrolling: 'touch',
          }}
          role="tablist"
          aria-label="Training models"
        >
          {models.map((model) => {
            const isActive = model.id === activeId
            return (
              <button
                key={model.id}
                role="tab"
                id={`trp-tab-${model.id}`}
                aria-selected={isActive}
                aria-controls={`trp-panel-${model.id}`}
                onClick={() => setActiveId(model.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.4rem 0.85rem',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.02em',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                }}
              >
                {model.name}
              </button>
            )
          })}
        </div>
      )}

      {/* Model panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`trp-panel-${activeId}`}
          role={showTabs ? 'tabpanel' : undefined}
          aria-labelledby={showTabs ? `trp-tab-${activeId}` : undefined}
          style={{ padding: '1.25rem' }}
          initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          <ModelPanel model={activeModel} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
