import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Tag from '../components/Tag'
import PageHeader from '../components/PageHeader'
import HighlightedText from '../components/HighlightedText'
import { experience } from '../data'

function ExperienceEntry({ item, index }) {
  const [open, setOpen] = useState(index === 0)

  const progressionSteps = item.progressionSteps || []

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      style={{
        position: 'relative',
        borderRadius: 16,
        border: '1px solid',
        borderColor: open ? 'color-mix(in srgb, var(--color-accent) 35%, var(--color-border))' : 'var(--border)',
        background: open
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 4%, var(--surface)) 0%, var(--surface2) 100%)'
          : 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden',
        transition: 'border-color 0.25s, background 0.25s',
        boxShadow: open ? 'var(--shadow-sm)' : 'none',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 40%, transparent) 100%)',
        opacity: open ? 1 : 0.3,
        transition: 'opacity 0.3s',
      }} />

      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-controls={"experience-content-" + index}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.4rem 1.6rem', textAlign: 'left',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
            {item.role}
          </h3>
          {item.progression && progressionSteps.length === 0 && (
            <p style={{
              fontSize: '0.72rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)',
              marginBottom: 6, lineHeight: 1.5,
            }}>
              {item.progression}
            </p>
          )}
          {progressionSteps.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {progressionSteps.map((step, idx) => {
                const isCurrent = step === item.currentRoleStep || (!item.currentRoleStep && idx === progressionSteps.length - 1)
                return (
                  <span
                    key={step}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
                  >
                    <span
                      style={{
                        fontSize: '0.66rem',
                        color: isCurrent ? 'var(--color-accent)' : 'var(--text2)',
                        border: `1px solid ${isCurrent ? 'color-mix(in srgb, var(--color-accent) 50%, transparent)' : 'var(--border)'}`,
                        background: isCurrent ? 'color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'color-mix(in srgb, var(--surface2) 72%, transparent)',
                        borderRadius: 9999,
                        padding: '4px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: isCurrent ? 600 : 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step}
                    </span>
                    {idx < progressionSteps.length - 1 && (
                      <span style={{ color: 'var(--text2)', opacity: 0.5, fontSize: '0.72rem' }}>→</span>
                    )}
                  </span>
                )
              })}
            </div>
          )}
          <p style={{ fontSize: '0.86rem', color: 'var(--text2)', fontWeight: 500 }}>
            {item.company}
            <span style={{ opacity: 0.4, margin: '0 0.4rem' }}>·</span>
            {item.location}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--color-accent)',
            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 28%, transparent)',
            padding: '5px 12px', borderRadius: 9999, whiteSpace: 'nowrap',
          }}>
            {item.period}
          </span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: '0.73rem', color: 'var(--text2)', opacity: 0.6,
          }}>
            {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {open ? 'collapse' : 'expand'}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={"experience-content-" + index}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.6rem 1.6rem' }}>
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 25%, var(--border)), transparent)', marginBottom: '1.4rem' }} />

              {item.description && (
                <p style={{
                  fontSize: '0.92rem', color: 'var(--text2)', lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  padding: '1rem 1.2rem',
                  background: 'color-mix(in srgb, var(--color-accent) 5%, var(--surface))',
                  borderLeft: '3px solid var(--color-accent)',
                  borderRadius: '0 8px 8px 0',
                }}>
                  {item.description}
                </p>
              )}

              {item.bullets && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    marginBottom: '0.9rem',
                  }}>
                    Key Achievements
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {item.bullets.map((bullet, i) => (
                      <li key={i} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                        fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.65,
                      }}>
                        <span style={{
                          flexShrink: 0, marginTop: '0.55em',
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'var(--color-accent)',
                        }} />
                        <HighlightedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {item.tags && (
                <div>
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    marginBottom: '0.75rem',
                  }}>
                    Tech Stack
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                    {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ExperiencePage() {
  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Experience log"
        title="Career timeline"
        description="Enterprise AI software — RAG, LLM backends, and production systems at scale."
      />

      <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute', left: 6, top: 12, bottom: 12, width: 2,
          borderRadius: 2,
          background: 'linear-gradient(to bottom, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--border)) 60%, var(--border))',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {experience.map((item, i) => (
            <div key={`${item.company}-${i}`} style={{ position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -34, top: 24,
                width: 14, height: 14, borderRadius: '50%',
                background: i === 0 ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 50%, var(--color-border))',
                border: '3px solid var(--bg)',
                boxShadow: i === 0
                  ? `0 0 0 3px color-mix(in srgb, var(--color-accent) 25%, transparent)`
                  : '0 0 0 2px var(--bg)',
                zIndex: 2,
              }} />
              {/* Pulse on first/most recent */}
              {i === 0 && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: -40, top: 18,
                    width: 26, height: 26, borderRadius: '50%',
                    border: '2px solid color-mix(in srgb, var(--color-accent) 35%, transparent)',
                    animation: 'timeline-pulse 2.5s ease-out infinite',
                    zIndex: 1,
                  }}
                />
              )}
              <ExperienceEntry item={item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes timeline-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          70% { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes timeline-pulse { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </section>
  )
}
