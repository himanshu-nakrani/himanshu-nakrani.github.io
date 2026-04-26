import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
        borderColor: open ? 'var(--border2)' : 'var(--border)',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: 'linear-gradient(90deg, var(--nav-dot) 0%, var(--accent) 50%, transparent 100%)',
        opacity: open ? 1 : 0.5,
        transition: 'opacity 0.3s',
      }} />

      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
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
              fontSize: '0.72rem', color: 'var(--accent)', fontFamily: "'Fira Code', monospace",
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
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 5,
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.66rem',
                        color: isCurrent ? 'var(--accent2)' : 'var(--text2)',
                        border: `1px solid ${isCurrent ? 'color-mix(in srgb, var(--accent2) 68%, transparent)' : 'var(--border)'}`,
                        background: isCurrent ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'color-mix(in srgb, var(--surface2) 72%, transparent)',
                        borderRadius: 9999,
                        padding: '4px 8px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: isCurrent ? 600 : 500,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step}
                    </span>
                    {idx < progressionSteps.length - 1 && <span style={{ color: 'var(--text2)', opacity: 0.5, fontSize: '0.72rem' }}>→</span>}
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
            fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', color: 'var(--nav-dot)',
            background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.28)',
            padding: '5px 12px', borderRadius: 9999, whiteSpace: 'nowrap',
          }}>
            {item.period}
          </span>
          <span style={{
            fontSize: '0.75rem', color: 'var(--text2)', opacity: 0.6,
            fontFamily: "'Fira Code', monospace",
          }}>
            {open ? '▲ collapse' : '▼ expand'}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 1.6rem 1.6rem' }}>
              <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--border), transparent)', marginBottom: '1.4rem' }} />

              {/* Description */}
              {item.description && (
                <p style={{
                  fontSize: '0.92rem', color: 'var(--text2)', lineHeight: 1.7,
                  marginBottom: '1.5rem',
                  padding: '1rem 1.2rem',
                  background: 'color-mix(in srgb, var(--accent) 5%, var(--surface))',
                  borderLeft: '3px solid var(--accent)',
                  borderRadius: '0 8px 8px 0',
                }}>
                  {item.description}
                </p>
              )}

              {/* Bullets */}
              {item.bullets && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'var(--text2)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    marginBottom: '0.9rem', opacity: 0.6,
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
                          background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                        }} />
                        <HighlightedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {item.tags && (
                <div>
                  <p style={{
                    fontSize: '0.72rem', fontWeight: 700, color: 'var(--text2)',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    marginBottom: '0.75rem', opacity: 0.6,
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
          background: 'linear-gradient(to bottom, var(--nav-dot), var(--accent) 35%, var(--border))',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {experience.map((item, i) => (
            <div key={`${item.company}-${i}`} style={{ position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -34, top: 22,
                width: 14, height: 14, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                border: '3px solid var(--bg)',
                boxShadow: '0 0 0 2px var(--bg)',
                zIndex: 2,
              }} />
              <ExperienceEntry item={item} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
