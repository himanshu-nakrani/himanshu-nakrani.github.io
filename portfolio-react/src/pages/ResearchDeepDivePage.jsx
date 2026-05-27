import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import SEO from '../components/SEO'
import TechnicalArchitectureMap from '../components/TechnicalArchitectureMap'
import { researchDeepDives } from '../data'

/* ─── Shared style fragments ────────────────────────────── */
const sectionLabel = {
  fontSize: '0.68rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: 'var(--color-accent)',
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
          Research Item Not Found
        </p>
        <h1 style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '1rem',
        }}>
          This research page doesn't exist
        </h1>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          maxWidth: 420,
          margin: '0 auto 1.5rem',
        }}>
          The research deep-dive you're looking for may have been moved or doesn't have a dedicated page yet.
        </p>
        <Link
          to="/research"
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
          <ArrowLeft size={15} /> Back to Research
        </Link>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ResearchDeepDivePage() {
  const { slug } = useParams()
  const item = researchDeepDives.find(r => r.slug === slug)

  if (!item) return <NotFound />

  return <ResearchDeepDiveContent item={item} />
}

function ResearchDeepDiveContent({ item }) {
  const reduceMotion = useReducedMotion()
  const [activeStage, setActiveStage] = useState(item.pipeline?.[0]?.id || null)

  // Single page-level reveal — no per-block stagger
  const pageReveal = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } }

  return (
    <motion.section className="mvp2-page" {...pageReveal}>
      <SEO
        title={`${item.title} | Himanshu Nakrani`}
        description={item.summary}
      />

      {/* ── Back link ────────────────────────────────────── */}
      <div style={{ marginBottom: '2rem' }}>
        <Link to="/research" style={backLinkStyle}>
          <ArrowLeft size={15} /> Back to Research
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────── */}
      <header style={{ marginBottom: '2.5rem' }}>
        {item.badge && (
          <div style={{ marginBottom: '0.85rem' }}>
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
              {item.badge}
            </span>
          </div>
        )}

        <h1 style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 800,
          color: 'var(--color-text)',
          lineHeight: 'var(--line-height-tight)',
          letterSpacing: 'var(--letter-spacing-tight)',
          marginBottom: '0.75rem',
        }}>
          {item.title}
        </h1>

        <p style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--color-text-muted)',
          lineHeight: 'var(--line-height-relaxed)',
          maxWidth: '44rem',
        }}>
          {item.summary}
        </p>
      </header>

      {/* ── Metrics strip ────────────────────────────────── */}
      {item.metrics && item.metrics.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.65rem',
            marginBottom: '2.5rem',
          }}
          className="rddp-metrics-grid"
        >
          {item.metrics.map(m => (
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

      {/* ── Pipeline ─────────────────────────────────────── */}
      {item.pipeline && item.pipeline.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={{ ...sectionLabel, marginBottom: '0.85rem' }}>Pipeline</p>
          <TechnicalArchitectureMap
            stages={item.pipeline}
            activeStage={activeStage}
            onStageChange={setActiveStage}
            variant="training"
          />
        </div>
      )}

      {/* ── Setup & Infrastructure ───────────────────────── */}
      {item.stack && item.stack.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={sectionLabel}>Setup & Infrastructure</p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginTop: '0.85rem',
          }}>
            {item.stack.map(t => (
              <span key={t} style={{
                fontSize: '0.76rem',
                padding: '6px 14px',
                borderRadius: 10,
                border: '1px solid color-mix(in srgb, var(--color-accent) 30%, var(--color-border))',
                background: 'color-mix(in srgb, var(--color-accent) 8%, var(--color-surface))',
                color: 'var(--color-accent)',
                fontWeight: 600,
                fontFamily: 'var(--font-mono)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes / Details ──────────────────────────────── */}
      {item.notes && item.notes.length > 0 && (
        <div style={{ marginBottom: '2.5rem' }}>
          <p style={sectionLabel}>Notes</p>
          <ul style={{
            listStyle: 'none',
            margin: 0,
            marginTop: '0.85rem',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}>
            {item.notes.map((note, i) => (
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
        </div>
      )}

      {/* ── External link ────────────────────────────────── */}
      {item.link && (
        <div style={{ marginBottom: '2rem' }}>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.84rem',
            }}
          >
            <ExternalLink size={14} />
            {item.link.includes('huggingface') ? 'View on Hugging Face' : 'View Project'}
          </a>
        </div>
      )}

      {/* ── Lab CTA ──────────────────────────────────────── */}
      {item.demoModuleId && (
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
                <path d="M8.5 2h7" />
                <path d="M7 16.5h10" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-text)', margin: 0, lineHeight: 1.3 }}>
                View training metrics in the Lab
              </p>
              <p style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', margin: 0, marginTop: 2 }}>
                Deterministic walkthrough of model training and evaluation
              </p>
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', fontWeight: 500, flexShrink: 0 }}>
              Open Lab
            </span>
          </Link>
        </div>
      )}

      {/* ── Back link (bottom) ───────────────────────────── */}
      <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
        <Link to="/research" style={backLinkStyle}>
          <ArrowLeft size={15} /> Back to Research
        </Link>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .rddp-metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </motion.section>
  )
}
