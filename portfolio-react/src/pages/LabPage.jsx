import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Bot, Search, Brain, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import PageHeader from '../components/PageHeader'
import TraceReplay from '../components/TraceReplay'
import AgentRunViewer from '../components/AgentRunViewer'
import RetrievalInspector from '../components/RetrievalInspector'
import TrainingRunPanel from '../components/TrainingRunPanel'
import ProductionTraceExplorer from '../components/ProductionTraceExplorer'
import Tag from '../components/Tag'
import { demoLabModules } from '../data'

/* ─── Module icon mapping ────────────────────────────────── */
const moduleIcons = {
  trace: Activity,
  agent: Bot,
  retrieval: Search,
  model: Brain,
}

/* ─── Short labels for mobile tab buttons ────────────────── */
const moduleShortLabels = {
  'alpha-trace-replay': 'Trace',
  'agent-run-viewer': 'Agent',
  'rag-retrieval-inspector': 'RAG',
  'model-training-panel': 'Model',
}

/* ─── Related page link helpers ──────────────────────────── */
function relatedPath(mod) {
  if (!mod.relatedSlug) return null
  if (mod.relatedType === 'project') return `/projects/${mod.relatedSlug}`
  if (mod.relatedType === 'research') return `/research/${mod.relatedSlug}`
  return null
}

function relatedLabel(mod) {
  if (mod.relatedType === 'project') return 'View Case Study'
  if (mod.relatedType === 'research') return 'View Research'
  return 'View Details'
}

/* ─── Page ──────────────────────────────────────────────── */
export default function LabPage() {
  const reduceMotion = useReducedMotion()
  const [activeModuleId, setActiveModuleId] = useState(demoLabModules[0]?.id || null)

  const activeModule = useMemo(
    () => demoLabModules.find(m => m.id === activeModuleId) || demoLabModules[0],
    [activeModuleId],
  )

  const ActiveIcon = moduleIcons[activeModule?.type] || Activity
  const handleTabKeyDown = (event, index) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    const last = demoLabModules.length - 1
    const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? last : event.key === 'ArrowRight' ? (index + 1) % demoLabModules.length : (index - 1 + demoLabModules.length) % demoLabModules.length
    setActiveModuleId(demoLabModules[nextIndex].id)
    document.getElementById(`lab-tab-${demoLabModules[nextIndex].id}`)?.focus()
  }

  const fadeUp = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

  return (
    <section className="mvp2-page">
      <SEO
        title="Demo Lab — Interactive AI System Walkthroughs | Himanshu Nakrani"
        description="Interactive, deterministic walkthroughs of production AI systems and model research."
      />

      <PageHeader
        kicker="Lab"
        title="Demo Lab"
        description="Interactive, deterministic walkthroughs of production AI systems and model research."
      />

      {/* ── Production architecture (Alpha Copilot pipeline) ── */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.35 }}
        aria-labelledby="lab-architecture-heading"
        style={{ marginBottom: '2.25rem' }}
      >
        <header style={{ marginBottom: '0.9rem' }}>
          <p style={{
            fontSize: '0.68rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--color-accent)',
            margin: '0 0 0.35rem',
          }}>
            Architecture
          </p>
          <h2
            id="lab-architecture-heading"
            style={{
              fontSize: 'clamp(1.15rem, 2.4vw, 1.45rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: 'var(--color-text)',
              margin: '0 0 0.35rem',
              lineHeight: 1.25,
            }}
          >
            Alpha Copilot production pipeline
          </h2>
          <p style={{
            fontSize: '0.88rem',
            color: 'var(--color-text-muted)',
            margin: 0,
            lineHeight: 1.55,
            maxWidth: 640,
          }}>
            Select a stage to inspect latency and design.
          </p>
        </header>
        <ProductionTraceExplorer />
      </motion.section>

      {/* ── Module selector (tab row) ────────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.35 }}
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          marginBottom: '1.5rem',
          paddingBottom: 2,
        }}
        role="tablist"
        aria-label="Demo modules"
        className="lab-tab-row"
      >
        {demoLabModules.map((mod, index) => {
          const isActive = mod.id === activeModuleId
          const Icon = moduleIcons[mod.type] || Activity
          return (
            <button
              key={mod.id}
              role="tab"
              id={`lab-tab-${mod.id}`}
              aria-selected={isActive}
              aria-controls={isActive ? `lab-panel-${mod.id}` : undefined}
              tabIndex={isActive ? 0 : -1}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              onClick={() => setActiveModuleId(mod.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 0.95rem',
                fontSize: '0.78rem',
                fontWeight: isActive ? 600 : 500,
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.02em',
                border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                borderRadius: 10,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                background: isActive ? 'var(--color-accent-soft)' : 'transparent',
                color: isActive ? 'var(--color-accent)' : 'var(--color-text-muted)',
                transition: 'background 0.15s, border-color 0.15s, color 0.15s',
                flexShrink: 0,
                outline: 'none',
                boxShadow: isActive
                  ? '0 2px 8px color-mix(in srgb, var(--color-accent) 18%, transparent)'
                  : 'none',
              }}
            >
              <Icon size={14} />
              <span className="lab-tab-full">{mod.title}</span>
              <span className="lab-tab-short">{moduleShortLabels[mod.id] || mod.title}</span>
            </button>
          )
        })}
      </motion.div>

      {/* ── Main content: module + aside ──────────────────── */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="lab-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        {/* Active module surface */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModule.id}
            id={`lab-panel-${activeModule.id}`}
            role="tabpanel"
            aria-labelledby={`lab-tab-${activeModule.id}`}
            initial={reduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {activeModule.type === 'trace' && (
              <TraceReplay steps={activeModule.steps} />
            )}
            {activeModule.type === 'agent' && (
              <AgentRunViewer steps={activeModule.steps} />
            )}
            {activeModule.type === 'retrieval' && (
              <RetrievalInspector module={activeModule} />
            )}
            {activeModule.type === 'model' && (
              <TrainingRunPanel models={activeModule.models} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Supporting aside */}
        <aside
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: 14,
            background: 'var(--color-surface)',
            overflow: 'hidden',
          }}
        >
          {/* Module title + type */}
          <div style={{
            padding: '1rem 1.15rem',
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <ActiveIcon size={15} color="var(--color-accent)" />
            <span style={{
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.3,
            }}>
              {activeModule.title}
            </span>
          </div>

          <div style={{ padding: '1rem 1.15rem' }}>
            {/* What this demonstrates */}
            <div style={{ marginBottom: '1.25rem' }}>
              <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: 'var(--color-accent)',
                marginBottom: '0.5rem',
              }}>
                What this demonstrates
              </p>
              <p style={{
                fontSize: '0.84rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                margin: 0,
              }}>
                {activeModule.description}
              </p>
            </div>

            {/* Related link */}
            {relatedPath(activeModule) && (
              <div style={{ marginBottom: '1.25rem' }}>
                <p style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.5rem',
                }}>
                  Related
                </p>
                <Link
                  to={relatedPath(activeModule)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0.85rem',
                    border: '1px solid var(--color-border)',
                    borderRadius: 10,
                    background: 'var(--color-surface-raised)',
                    textDecoration: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border))'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--color-border)'
                  }}
                >
                  <span style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: 'var(--color-text)',
                  }}>
                    {relatedLabel(activeModule)}
                  </span>
                  <ArrowRight size={14} color="var(--color-accent)" />
                </Link>
              </div>
            )}

            {/* Stack tags */}
            {activeModule.stack && activeModule.stack.length > 0 && (
              <div>
                <p style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.5rem',
                }}>
                  Stack
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 5,
                }}>
                  {activeModule.stack.map(t => <Tag key={t}>{t}</Tag>)}
                </div>
              </div>
            )}
          </div>
        </aside>
      </motion.div>

      {/* ── Responsive ───────────────────────────────────── */}
      <style>{`
        .lab-tab-row::-webkit-scrollbar { display: none; }
        .lab-tab-row { scrollbar-width: none; }
        .lab-tab-short { display: none; }

        @media (max-width: 900px) {
          .lab-layout {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .lab-tab-full { display: none; }
          .lab-tab-short { display: inline; }
          .lab-tab-row {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            overflow-x: visible;
          }
          .lab-tab-row > button {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
