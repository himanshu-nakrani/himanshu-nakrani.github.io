import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Activity, Bot, Search, Brain, ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
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
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } }

  return (
    <main className="mvp2-page editorial-page">
      <SEO
        title="Demo Lab — Interactive AI System Walkthroughs | Himanshu Nakrani"
        description="Interactive, deterministic walkthroughs of production AI systems and model research."
      />

      <header className="editorial-page-header">
        <p className="editorial-kicker">[ 01 ] · Lab</p>
        <h1 className="editorial-page-title">
          Demo lab for <span className="gradient-text">AI systems</span>.
        </h1>
        <p className="editorial-page-lede">
          Interactive, deterministic walkthroughs of production AI systems and model research.
        </p>
      </header>

      {/* ── Production architecture (Alpha Copilot pipeline) ── */}
      <motion.section
        {...fadeUp}
        transition={{ duration: 0.35 }}
        aria-labelledby="lab-architecture-heading"
        className="editorial-section section-hairline"
      >
        <span className="section-ghost-num" aria-hidden="true">02</span>
        <header style={{ marginBottom: '0.9rem' }}>
          <p className="editorial-kicker">[ 02 ] · Architecture</p>
          <h2
            id="lab-architecture-heading"
            className="editorial-section-title"
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
      <section className="editorial-section section-hairline">
        <span className="section-ghost-num" aria-hidden="true">03</span>
        <p className="editorial-kicker">[ 03 ] · Modules</p>
        <h2 className="editorial-section-title">Interactive walkthroughs</h2>

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
                aria-controls={`lab-panel-${mod.id}`}
                tabIndex={isActive ? 0 : -1}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                onClick={() => setActiveModuleId(mod.id)}
                className={isActive ? 'btn btn--primary' : 'btn btn--ghost'}
                style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap', flexShrink: 0 }}
              >
                <Icon size={14} />
                <span className="lab-tab-full">{mod.title}</span>
                <span className="lab-tab-short">{moduleShortLabels[mod.id] || mod.title}</span>
              </button>
            )
          })}
        </motion.div>

        {demoLabModules.map((mod) => (
          mod.id !== activeModule.id ? (
            <div
              key={`placeholder-${mod.id}`}
              id={`lab-panel-${mod.id}`}
              role="tabpanel"
              hidden
              aria-labelledby={`lab-tab-${mod.id}`}
            />
          ) : null
        ))}

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
      </section>

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
    </main>
  )
}
