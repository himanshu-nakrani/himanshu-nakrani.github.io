import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ExternalLink, Lock, FlaskConical, ChevronDown } from 'lucide-react'
import SEO from '../components/SEO'
import TechnicalArchitectureMap from '../components/TechnicalArchitectureMap'
import Tag from '../components/Tag'
import { technicalCaseStudies } from '../data'

/* ─── Shared style fragments ────────────────────────────── */
const sectionLabel = {
  fontSize: '0.68rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--color-accent)',
  marginBottom: '0.85rem',
  margin: 0,
}

const cardBorder = {
  border: '1px solid var(--color-border)',
  borderRadius: 12,
  background: 'var(--color-surface)',
}

const backLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '0.82rem',
  fontWeight: 500,
  color: 'var(--color-text-muted)',
  textDecoration: 'none',
  transition: 'color 0.15s',
}

/* ─── Badge palette ─────────────────────────────────────── */
const badgeColors = {
  Production: {
    bg: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
    color: 'var(--color-accent)',
    border: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
  },
  Research: {
    bg: 'color-mix(in srgb, var(--color-accent) 9%, transparent)',
    color: 'var(--color-accent)',
    border: 'color-mix(in srgb, var(--color-accent) 24%, transparent)',
  },
}

/* ─── Collapsible section ──────────────────────────────── */
function CollapsibleSection({ label, defaultOpen = false, children }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ marginBottom: '2rem' }}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          ...sectionLabel,
          marginBottom: open ? '0.85rem' : 0,
        }}
      >
        {label}
        <ChevronDown
          size={14}
          style={{
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.18s ease',
            color: 'var(--color-accent)',
          }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Not Found ─────────────────────────────────────────── */
function NotFound() {
  return (
    <section className="mvp2-page">
      <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
        <p style={{
          fontSize: '0.72rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-subtle)',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '0.75rem',
        }}>
          Case Study Not Found
        </p>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '1rem',
        }}>
          This project doesn't exist
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: 420,
          margin: '0 auto 1.5rem',
        }}>
          The case study you're looking for may have been moved or doesn't have a deep-dive page yet.
        </p>
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--color-accent)',
            textDecoration: 'none',
          }}
        >
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ProjectDeepDivePage() {
  const { slug } = useParams()
  const study = technicalCaseStudies.find(s => s.slug === slug)

  if (!study) return <NotFound />

  return <ProjectDeepDiveContent study={study} />
}

function ProjectDeepDiveContent({ study }) {
  const reduceMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(study.architecture?.[0]?.id || null)

  // Single page-level reveal — no per-block stagger
  const pageReveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } }

  const bc = badgeColors[study.status] || badgeColors.Production

  return (
    <motion.section className="mvp2-page" {...pageReveal}>
      <SEO
        title={`${study.title} — Case Study | Himanshu Nakrani`}
        description={study.summary}
      />

      {/* ── Back link ────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/projects" style={backLinkStyle}>
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>

      {/* ── Hero summary ─────────────────────────────────── */}
      <header style={{ marginBottom: '2.5rem' }}>
        {/* Badges */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: 'var(--color-accent)',
            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 28%, transparent)',
            padding: '3px 10px',
            borderRadius: 6,
          }}>
            {study.type}
          </span>
          <span style={{
            fontSize: '0.68rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 600,
            color: bc.color,
            background: bc.bg,
            border: `1px solid ${bc.border}`,
            padding: '3px 10px',
            borderRadius: 6,
          }}>
            {study.status}
          </span>
        </div>

        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 800,
          color: 'var(--color-text)',
          lineHeight: 'var(--line-height-tight)',
          letterSpacing: 'var(--letter-spacing-tight)',
          marginBottom: '0.75rem',
        }}>
          {study.title}
        </h1>

        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-muted)',
          lineHeight: 'var(--line-height-relaxed)',
          maxWidth: '44rem',
          marginBottom: '1.25rem',
        }}>
          {study.summary}
        </p>

        {/* Metadata row */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          fontSize: '0.82rem',
          color: 'var(--color-text-subtle)',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.02em',
        }}>
          {study.organization && (
            <span><strong style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Org</strong> {study.organization}</span>
          )}
          {study.role && (
            <span><strong style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Role</strong> {study.role}</span>
          )}
          {study.timeline && (
            <span><strong style={{ color: 'var(--color-text-muted)', fontWeight: 600 }}>Timeline</strong> {study.timeline}</span>
          )}
        </div>
      </header>

      {/* ── Metrics strip ────────────────────────────────── */}
      {study.metrics && study.metrics.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.65rem',
            marginBottom: '2.5rem',
          }}
          className="pddp-metrics-grid"
        >
          {study.metrics.map((m) => (
            <div
              key={m.label}
              style={{
                ...cardBorder,
                borderRadius: 10,
                padding: '1rem 1.1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.2rem',
              }}
            >
              <span style={{
                fontSize: '1.2rem',
                fontWeight: 700,
                color: 'var(--color-accent)',
                fontFamily: 'var(--font-mono)',
                fontFeatureSettings: '"tnum" 1',
                lineHeight: 1.2,
              }}>
                {m.value}
              </span>
              <span style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                color: 'var(--color-text-subtle)',
                letterSpacing: '0.03em',
                lineHeight: 1.3,
              }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── System Brief (Problem + Constraints — 2 col) ── */}
      {(study.problem || (study.constraints && study.constraints.length > 0)) && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: study.constraints?.length ? '1fr 1fr' : '1fr',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
          className="pddp-brief-grid"
        >
          {study.problem && (
            <div>
              <p style={sectionLabel}>Problem</p>
              <p style={{
                fontSize: '0.88rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.75,
                marginTop: '0.85rem',
                padding: '1rem 1.25rem',
                background: 'color-mix(in srgb, var(--color-accent) 5%, var(--color-bg))',
                borderLeft: '3px solid var(--color-accent)',
                borderRadius: '0 10px 10px 0',
              }}>
                {study.problem}
              </p>
            </div>
          )}

          {study.constraints && study.constraints.length > 0 && (
            <div>
              <p style={sectionLabel}>Constraints</p>
              <ul style={{
                listStyle: 'none',
                margin: 0,
                marginTop: '0.85rem',
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
              }}>
                {study.constraints.map((c, i) => (
                  <li key={i} style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    fontSize: '0.84rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.55,
                    padding: '0.3rem 0.5rem',
                    borderRadius: 6,
                    background: i % 2 === 0
                      ? 'color-mix(in srgb, var(--color-surface-raised) 70%, transparent)'
                      : 'transparent',
                  }}>
                    <span style={{
                      flexShrink: 0,
                      marginTop: '0.5em',
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                    }} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ── Architecture map ─────────────────────────────── */}
      {study.architecture && study.architecture.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ ...sectionLabel, marginBottom: '0.85rem' }}>Architecture</p>
          <TechnicalArchitectureMap
            stages={study.architecture}
            activeStage={activeStage}
            onStageChange={setActiveStage}
            variant="pipeline"
          />
        </div>
      )}

      {/* ── Implementation Notes (collapsible) ───────────── */}
      {study.implementationNotes && study.implementationNotes.length > 0 && (
        <CollapsibleSection label="Implementation Notes" defaultOpen={false}>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
            {study.implementationNotes.map((note, i) => (
              <li key={i} style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                fontSize: '0.84rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.55,
                padding: '0.3rem 0.5rem',
                borderRadius: 6,
                background: i % 2 === 0
                  ? 'color-mix(in srgb, var(--color-surface-raised) 70%, transparent)'
                  : 'transparent',
              }}>
                <span style={{
                  flexShrink: 0,
                  marginTop: '0.5em',
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                }} />
                {note}
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      )}

      {/* ── Tradeoffs (collapsible) ──────────────────────── */}
      {study.tradeoffs && study.tradeoffs.length > 0 && (
        <CollapsibleSection label="Tradeoffs" defaultOpen={false}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.65rem',
          }}>
            {study.tradeoffs.map((t, i) => (
              <div key={i} style={{
                ...cardBorder,
                borderRadius: 10,
                padding: '0.85rem 1.1rem',
              }}>
                <p style={{
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '0.5rem',
                }}>
                  {t.decision}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    <span style={{ fontWeight: 600, color: '#16a34a', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginRight: 6 }}>Upside:</span>
                    {t.pro}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    <span style={{ fontWeight: 600, color: '#d97706', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em', marginRight: 6 }}>Trade-off:</span>
                    {t.con}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleSection>
      )}

      {/* ── Impact ───────────────────────────────────────── */}
      {study.impact && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={sectionLabel}>Impact</p>
          <div style={{
            marginTop: '0.85rem',
            padding: '1.15rem 1.35rem',
            background: 'color-mix(in srgb, var(--color-accent) 5%, var(--color-surface))',
            borderLeft: '4px solid var(--color-accent)',
            borderRadius: '0 12px 12px 0',
            border: '1px solid var(--color-border)',
            borderLeftWidth: 4,
            borderLeftColor: 'var(--color-accent)',
          }}>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--color-text)',
              lineHeight: 1.75,
              margin: 0,
              fontWeight: 500,
            }}>
              {study.impact}
            </p>
          </div>
        </div>
      )}

      {/* ── Ownership + Stack (compact row) ──────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: study.ownership ? '1fr 1fr' : '1fr',
        gap: '1.25rem',
        marginBottom: '2rem',
      }} className="pddp-brief-grid">
        {study.ownership && (
          <div>
            <p style={sectionLabel}>Ownership</p>
            <p style={{
              fontSize: '0.86rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginTop: '0.85rem',
            }}>
              {study.ownership}
            </p>
          </div>
        )}
        {study.stack && study.stack.length > 0 && (
          <div>
            <p style={sectionLabel}>Tech Stack</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.85rem' }}>
              {study.stack.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </div>
        )}
      </div>

      {/* ── Lab CTA ──────────────────────────────────────── */}
      {study.demoModuleId && (
        <div style={{ marginBottom: '2.5rem' }}>
          <Link
            to="/lab"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1.1rem 1.35rem',
              ...cardBorder,
              borderRadius: 14,
              textDecoration: 'none',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 40%, var(--color-border))'
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--color-border)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
              border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <FlaskConical size={16} color="var(--color-accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, lineHeight: 1.3 }}>
                See interactive demo in the Lab
              </p>
              <p style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', margin: 0, marginTop: 2 }}>
                Deterministic walkthrough of this system's execution path
              </p>
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', fontWeight: 500, flexShrink: 0 }}>
              Open Lab
            </span>
          </Link>
        </div>
      )}

      {/* ── External links ───────────────────────────────── */}
      {study.links && Object.keys(study.links).length > 0 ? (
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          {Object.entries(study.links).map(([label, href]) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: '0.82rem', fontWeight: 500, color: 'var(--color-accent)', textDecoration: 'none',
              }}
            >
              <ExternalLink size={13} /> {label}
            </a>
          ))}
        </div>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: '0.78rem', color: 'var(--color-text-subtle)',
          fontFamily: 'var(--font-mono)', marginBottom: '2.5rem', opacity: 0.6,
        }}>
          <Lock size={12} /> Internal / proprietary system
        </div>
      )}

      {/* ── Back link (bottom) ───────────────────────────── */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <Link to="/projects" style={backLinkStyle}>
          <ArrowLeft size={15} /> Back to Projects
        </Link>
      </div>

      {/* ── Responsive ───────────────────────────────────── */}
      <style>{`
        @media (max-width: 640px) {
          .pddp-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .pddp-brief-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.section>
  )
}
