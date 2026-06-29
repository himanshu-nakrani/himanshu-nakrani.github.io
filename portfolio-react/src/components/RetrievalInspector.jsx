import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getNextTabIndex } from '../lib/tablist'

/* ───────── shared inline-style fragments ───────── */

const tabRowStyle = {
  display: 'flex',
  gap: '0.35rem',
  overflowX: 'auto',
  padding: '1rem 1.25rem',
  borderBottom: '1px solid var(--color-border)',
  WebkitOverflowScrolling: 'touch',
}

const tabBtnBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  padding: '0.4rem 0.85rem',
  fontSize: '0.78rem',
  fontWeight: 500,
  fontFamily: 'var(--font-mono)',
  letterSpacing: '0.02em',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'background 0.15s, border-color 0.15s, color 0.15s',
}

const panelStyle = {
  padding: '1.25rem',
  minHeight: 120,
}

const quoteStyle = {
  margin: 0,
  padding: '0.85rem 1rem',
  borderLeft: '3px solid var(--color-accent)',
  background: 'var(--color-accent-soft)',
  borderRadius: '0 var(--radius-md) var(--radius-md) 0',
  fontSize: '0.88rem',
  color: 'var(--color-text)',
  lineHeight: 1.6,
  fontStyle: 'italic',
}

const labelStyle = {
  fontSize: '0.68rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  fontFamily: 'var(--font-mono)',
  color: 'var(--color-text-subtle)',
  marginBottom: '0.4rem',
}

const scoreBadge = (isAccent = false) => ({
  display: 'inline-block',
  padding: '0.15rem 0.5rem',
  fontSize: '0.72rem',
  fontWeight: 600,
  fontFamily: 'var(--font-mono)',
  borderRadius: 'var(--radius-pill)',
  border: `1px solid ${isAccent ? 'var(--color-accent)' : 'var(--color-border-strong)'}`,
  color: isAccent ? 'var(--color-accent)' : 'var(--color-text-muted)',
  background: isAccent ? 'var(--color-accent-soft)' : 'transparent',
  fontFeatureSettings: '"tnum" 1',
})

const chunkCardStyle = (selected) => ({
  padding: '0.85rem 1rem',
  border: `1px solid ${selected ? 'var(--color-accent)' : 'var(--color-border)'}`,
  borderRadius: 'var(--radius-lg)',
  background: selected ? 'var(--color-accent-soft)' : 'var(--color-surface)',
  cursor: 'pointer',
  transition: 'border-color 0.15s, background 0.15s',
})

/* ───────── citation highlighter ───────── */

function renderCited(text) {
  const parts = text.split(/(\[\d+\])/)
  return parts.map((part, i) => {
    if (/^\[\d+\]$/.test(part)) {
      return (
        <span
          key={i}
          style={{
            display: 'inline-block',
            padding: '0.05rem 0.35rem',
            margin: '0 0.1rem',
            fontSize: '0.72rem',
            fontWeight: 600,
            fontFamily: 'var(--font-mono)',
            background: 'var(--color-accent)',
            color: 'var(--color-accent-fg)',
            borderRadius: 'var(--radius-sm)',
            lineHeight: 1.4,
            verticalAlign: 'middle',
          }}
        >
          {part}
        </span>
      )
    }
    /* render **bold** markdown fragments */
    const boldParts = part.split(/(\*\*[^*]+\*\*)/)
    return boldParts.map((bp, j) => {
      if (/^\*\*.+\*\*$/.test(bp)) {
        return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>
      }
      return <span key={`${i}-${j}`}>{bp}</span>
    })
  })
}

/* ───────── step panels ───────── */

function QueryPanel({ module }) {
  return (
    <div>
      <div style={labelStyle}>Sample Query</div>
      <blockquote style={quoteStyle}>{module.sampleQuery}</blockquote>
    </div>
  )
}

function RewritePanel({ module }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={labelStyle}>Original</div>
        <blockquote style={quoteStyle}>{module.sampleQuery}</blockquote>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-text-subtle)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
        }}
      >
        <span style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
        <span>rewritten</span>
        <span style={{ flex: 1, height: 1, background: 'var(--color-border)' }} />
      </div>
      <div>
        <div style={labelStyle}>Rewritten Query</div>
        <blockquote style={{ ...quoteStyle, fontStyle: 'normal' }}>
          {module.rewrittenQuery}
        </blockquote>
      </div>
    </div>
  )
}

function RetrievePanel({ module }) {
  const [selectedId, setSelectedId] = useState(null)
  const sorted = [...module.chunks].sort((a, b) => b.score - a.score)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      <div style={labelStyle}>
        Retrieved Chunks ({sorted.length})
      </div>
      {sorted.map((chunk) => {
        const sel = selectedId === chunk.id
        return (
          <div
            key={chunk.id}
            onClick={() => setSelectedId(sel ? null : chunk.id)}
            style={chunkCardStyle(sel)}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: sel ? '0.6rem' : 0,
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  flex: 1,
                  minWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {chunk.source}
              </span>
              <span style={scoreBadge(true)}>{chunk.score.toFixed(2)}</span>
            </div>
            {!sel && (
              <p
                style={{
                  margin: '0.4rem 0 0',
                  fontSize: '0.82rem',
                  color: 'var(--color-text-subtle)',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {chunk.text}
              </p>
            )}
            {sel && (
              <p
                style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: 'var(--color-text)',
                  lineHeight: 1.6,
                }}
              >
                {chunk.text}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function RerankPanel({ module }) {
  const sorted = [...module.chunks].sort((a, b) => a.reranked - b.reranked)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
      <div style={labelStyle}>Re-ranked Order</div>
      {sorted.map((chunk) => (
        <div key={chunk.id} style={chunkCardStyle(false)}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 24,
                borderRadius: 'var(--radius-pill)',
                background: 'var(--color-accent)',
                color: 'var(--color-accent-fg)',
                fontSize: '0.7rem',
                fontWeight: 700,
                fontFamily: 'var(--font-mono)',
                flexShrink: 0,
              }}
            >
              {chunk.reranked}
            </span>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--color-text-muted)',
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {chunk.source}
            </span>
            <span style={scoreBadge(false)}>{chunk.score.toFixed(2)}</span>
          </div>
          <p
            style={{
              margin: '0.4rem 0 0',
              paddingLeft: 34,
              fontSize: '0.82rem',
              color: 'var(--color-text-subtle)',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {chunk.text}
          </p>
        </div>
      ))}
    </div>
  )
}

function ComposePanel({ module }) {
  return (
    <div>
      <div style={labelStyle}>Generated Answer</div>
      <div
        style={{
          padding: '1rem 1.15rem',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          fontSize: '0.88rem',
          color: 'var(--color-text)',
          lineHeight: 1.7,
        }}
      >
        {renderCited(module.generatedAnswer)}
      </div>
    </div>
  )
}

function CitePanel({ module }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <div style={labelStyle}>Answer with Citations</div>
        <div
          style={{
            padding: '1rem 1.15rem',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.88rem',
            color: 'var(--color-text)',
            lineHeight: 1.7,
          }}
        >
          {renderCited(module.generatedAnswer)}
        </div>
      </div>

      <div>
        <div style={labelStyle}>Sources</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {module.chunks
            .sort((a, b) => a.reranked - b.reranked)
            .map((chunk) => (
              <div
                key={chunk.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.45rem 0.75rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minWidth: 20,
                    height: 20,
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--color-accent)',
                    color: 'var(--color-accent-fg)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    flexShrink: 0,
                  }}
                >
                  {chunk.reranked}
                </span>
                <span style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {chunk.source}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

/* ───────── step-to-panel mapping ───────── */

const panelMap = {
  query: QueryPanel,
  rewrite: RewritePanel,
  retrieve: RetrievePanel,
  rerank: RerankPanel,
  compose: ComposePanel,
  cite: CitePanel,
}

/* ───────── main component ───────── */

export default function RetrievalInspector({ module }) {
  const [activeStep, setActiveStep] = useState('query')
  const reduceMotion = useReducedMotion()
  const steps = module.steps || []

  const ActivePanel = panelMap[activeStep]

  const handleTabKeyDown = (event, index) => {
    const nextIndex = getNextTabIndex(event, index, steps.length)
    if (nextIndex === null) return
    const nextStep = steps[nextIndex]
    setActiveStep(nextStep.id)
    document.getElementById(`ri-tab-${nextStep.id}`)?.focus()
  }

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
      }}
    >
      {/* Tab row */}
      <div style={tabRowStyle} role="tablist" aria-label="RAG pipeline steps">
        {steps.map((step, i) => {
          const isActive = step.id === activeStep
          return (
            <button
              key={step.id}
              role="tab"
              id={`ri-tab-${step.id}`}
              aria-selected={isActive}
              aria-controls={`ri-panel-${step.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveStep(step.id)}
              onKeyDown={(event) => handleTabKeyDown(event, i)}
              style={{
                ...tabBtnBase,
                background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
              }}
            >
              <span
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  opacity: 0.55,
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {step.label}
            </button>
          )
        })}
      </div>

      {/* Step detail description */}
      {steps.find((s) => s.id === activeStep)?.detail && (
        <div
          style={{
            padding: '0.65rem 1.25rem',
            borderBottom: '1px solid var(--color-border)',
            fontSize: '0.8rem',
            color: 'var(--color-text-subtle)',
            lineHeight: 1.5,
          }}
        >
          {steps.find((s) => s.id === activeStep).detail}
        </div>
      )}

      {/* Content panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          id={`ri-panel-${activeStep}`}
          role="tabpanel"
          aria-labelledby={`ri-tab-${activeStep}`}
          style={panelStyle}
          initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          {ActivePanel && <ActivePanel module={module} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
