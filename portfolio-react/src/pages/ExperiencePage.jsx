import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Zap, Users, TestTube, TrendingUp, Building2, Cpu } from 'lucide-react'
import Tag from '../components/Tag'
import PageHeader from '../components/PageHeader'
import HighlightedText from '../components/HighlightedText'
import { experience } from '../data'

const careerStats = [
  { icon: TrendingUp, value: '2+', label: 'Years in AI/ML', accent: true },
  { icon: Users, value: '100+', label: 'Users Served', accent: false },
  { icon: Zap, value: '75%', label: 'Latency Reduced', accent: false },
  { icon: TestTube, value: '95%+', label: 'Test Coverage', accent: false },
]

const entryImpactMetrics = {
  'State Street Corporation': [
    { value: '75%', label: 'Latency cut' },
    { value: '100+', label: 'Users served' },
    { value: '95%+', label: 'Test coverage' },
    { value: '25%', label: 'SQL accuracy gain' },
  ],
  'Technocolabs Software Inc.': [
    { value: '87%', label: 'Model accuracy' },
    { value: '1', label: 'End-to-end pipeline' },
  ],
}

const companyColors = {
  'State Street Corporation': { bg: '#1a4f8a', text: '#fff', initial: 'SS' },
  'Technocolabs Software Inc.': { bg: '#6c3fba', text: '#fff', initial: 'TC' },
}

function ProgressionTrack({ steps, currentStep }) {
  const currentIdx = steps.indexOf(currentStep)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, flexWrap: 'wrap', rowGap: 6, margin: '0.6rem 0 0.9rem' }}>
      {steps.map((step, idx) => {
        const isActive = step === currentStep
        const isPast = idx < currentIdx
        const isLast = idx === steps.length - 1
        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%',
                background: isActive
                  ? 'var(--color-accent)'
                  : isPast
                    ? 'color-mix(in srgb, var(--color-accent) 55%, transparent)'
                    : 'var(--border)',
                border: isActive ? '2px solid color-mix(in srgb, var(--color-accent) 40%, transparent)' : '2px solid transparent',
                boxShadow: isActive ? '0 0 0 3px color-mix(in srgb, var(--color-accent) 18%, transparent)' : 'none',
                transition: 'all 0.25s',
                flexShrink: 0,
              }} />
              <span style={{
                fontSize: '0.63rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--color-accent)' : isPast ? 'var(--text2)' : 'var(--text2)',
                fontWeight: isActive ? 700 : 500,
                opacity: isPast ? 0.65 : isActive ? 1 : 0.45,
                whiteSpace: 'nowrap',
                maxWidth: 80,
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div style={{
                width: 28, height: 2, marginBottom: 14, flexShrink: 0,
                background: isPast || isActive
                  ? 'linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 55%, transparent), color-mix(in srgb, var(--color-accent) 30%, transparent))'
                  : 'var(--border)',
                transition: 'background 0.25s',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ImpactMetrics({ metrics }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
      {metrics.map(({ value, label }) => (
        <div key={label} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0.65rem 1.1rem',
          background: 'color-mix(in srgb, var(--color-accent) 7%, var(--surface))',
          border: '1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)',
          borderRadius: 10,
          minWidth: 72,
        }}>
          <span style={{
            fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent)',
            fontFamily: 'var(--font-mono)', lineHeight: 1,
          }}>{value}</span>
          <span style={{
            fontSize: '0.64rem', color: 'var(--text2)', marginTop: 3,
            textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500,
            textAlign: 'center',
          }}>{label}</span>
        </div>
      ))}
    </div>
  )
}

function ExperienceEntry({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  const progressionSteps = item.progressionSteps || []
  const companyStyle = companyColors[item.company] || { bg: 'var(--color-accent)', text: '#fff', initial: item.company[0] }
  const impacts = entryImpactMetrics[item.company]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      style={{
        position: 'relative',
        borderRadius: 18,
        border: '1px solid',
        borderColor: open
          ? 'color-mix(in srgb, var(--color-accent) 38%, var(--border))'
          : 'var(--border)',
        background: open
          ? 'linear-gradient(145deg, color-mix(in srgb, var(--color-accent) 3%, var(--surface)) 0%, var(--surface2) 100%)'
          : 'var(--surface)',
        overflow: 'hidden',
        transition: 'border-color 0.25s, background 0.25s, box-shadow 0.25s',
        boxShadow: open
          ? '0 4px 24px color-mix(in srgb, var(--color-accent) 10%, transparent), var(--shadow-sm)'
          : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${companyStyle.bg} 0%, color-mix(in srgb, var(--color-accent) 40%, transparent) 100%)`,
        opacity: open ? 1 : 0.35,
        transition: 'opacity 0.3s',
      }} />

      {/* Header */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.25rem 1.5rem', textAlign: 'left',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
        }}
      >
        {/* Company monogram */}
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: companyStyle.bg,
          color: companyStyle.text,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em', flexShrink: 0, marginTop: 2,
          boxShadow: `0 4px 12px ${companyStyle.bg}44`,
        }}>
          {companyStyle.initial}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div>
              <h3 style={{
                fontSize: '1.08rem', fontWeight: 700, color: 'var(--text)',
                marginBottom: 2, lineHeight: 1.25,
              }}>
                {item.role}
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text2)', fontWeight: 500 }}>
                {item.company}
                <span style={{ opacity: 0.35, margin: '0 0.4rem' }}>·</span>
                {item.location}
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-accent)',
                background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 28%, transparent)',
                padding: '4px 11px', borderRadius: 9999, whiteSpace: 'nowrap',
              }}>
                {item.period}
              </span>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.55,
              }}>
                {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {open ? 'collapse' : 'details'}
              </span>
            </div>
          </div>

          {/* Progression track */}
          {progressionSteps.length > 0 && (
            <ProgressionTrack steps={progressionSteps} currentStep={item.currentRoleStep} />
          )}
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
            <div style={{ padding: '0 1.5rem 1.6rem 1.5rem' }}>
              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 22%, var(--border)), transparent)',
                marginBottom: '1.4rem',
              }} />

              {/* Description */}
              {item.description && (
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.75,
                  marginBottom: '1.4rem',
                  paddingLeft: '1rem',
                  borderLeft: '3px solid var(--color-accent)',
                }}>
                  {item.description}
                </p>
              )}

              {/* Impact metrics */}
              {impacts && <ImpactMetrics metrics={impacts} />}

              {/* Key Achievements */}
              {item.bullets && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <p style={{
                    fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-accent)',
                    textTransform: 'uppercase', letterSpacing: '0.13em',
                    marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <Cpu size={11} />
                    Key Achievements
                  </p>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 9 }}>
                    {item.bullets.map((bullet, i) => (
                      <li key={i} style={{
                        display: 'flex', gap: 10, alignItems: 'flex-start',
                        fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.68,
                        padding: '0.55rem 0.8rem',
                        borderRadius: 8,
                        background: i % 2 === 0
                          ? 'color-mix(in srgb, var(--surface2) 60%, transparent)'
                          : 'transparent',
                      }}>
                        <span style={{
                          flexShrink: 0, marginTop: '0.5em',
                          width: 5, height: 5, borderRadius: '50%',
                          background: 'var(--color-accent)',
                          opacity: 0.8,
                        }} />
                        <HighlightedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tech Stack */}
              {item.tags && (
                <div>
                  <p style={{
                    fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-accent)',
                    textTransform: 'uppercase', letterSpacing: '0.13em',
                    marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <Zap size={11} />
                    Tech Stack
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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

      {/* Career snapshot strip */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        marginBottom: '2.5rem',
      }}>
        {careerStats.map(({ icon: Icon, value, label, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{
              padding: '1rem 1.1rem',
              borderRadius: 14,
              border: '1px solid',
              borderColor: accent
                ? 'color-mix(in srgb, var(--color-accent) 35%, transparent)'
                : 'var(--border)',
              background: accent
                ? 'color-mix(in srgb, var(--color-accent) 8%, var(--surface))'
                : 'var(--surface)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
            }}
          >
            <Icon size={16} color={accent ? 'var(--color-accent)' : 'var(--text2)'} strokeWidth={2} />
            <span style={{
              fontSize: '1.55rem', fontWeight: 800,
              color: accent ? 'var(--color-accent)' : 'var(--text)',
              fontFamily: 'var(--font-mono)', lineHeight: 1,
            }}>{value}</span>
            <span style={{
              fontSize: '0.72rem', color: 'var(--text2)',
              fontWeight: 500, lineHeight: 1.3,
            }}>{label}</span>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{
          position: 'absolute', left: 6, top: 12, bottom: 12, width: 2,
          borderRadius: 2,
          background: 'linear-gradient(to bottom, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--border)) 60%, var(--border))',
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {experience.map((item, i) => (
            <div key={`${item.company}-${i}`} style={{ position: 'relative' }}>
              {/* Timeline dot */}
              <div style={{
                position: 'absolute', left: -30, top: 22,
                width: 14, height: 14, borderRadius: '50%',
                background: i === 0 ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 45%, var(--border))',
                border: '3px solid var(--bg)',
                boxShadow: i === 0 ? `0 0 0 3px color-mix(in srgb, var(--color-accent) 22%, transparent)` : 'none',
                zIndex: 2,
              }} />
              {i === 0 && (
                <div aria-hidden="true" style={{
                  position: 'absolute', left: -36, top: 16,
                  width: 26, height: 26, borderRadius: '50%',
                  border: '2px solid color-mix(in srgb, var(--color-accent) 30%, transparent)',
                  animation: 'timeline-pulse 2.5s ease-out infinite',
                  zIndex: 1,
                }} />
              )}
              <ExperienceEntry item={item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes timeline-pulse {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @media (max-width: 600px) {
          .exp-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes timeline-pulse { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </section>
  )
}
