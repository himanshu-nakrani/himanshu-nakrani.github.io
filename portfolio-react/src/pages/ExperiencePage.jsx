import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, Zap, Users, TestTube, TrendingUp, Cpu, Box, FlaskConical, BadgeCheck, Handshake, Wrench } from 'lucide-react'
import Tag from '../components/Tag'
import PageHeader from '../components/PageHeader'
import HighlightedText from '../components/HighlightedText'
import { experience } from '../data'

/* ─── Career snapshot ──────────────────────────────────── */
const careerStats = [
  { icon: TrendingUp, value: '2+',   label: 'Years in AI/ML', accent: true },
  { icon: Users,      value: '100+', label: 'Users Served',   accent: false },
  { icon: Zap,        value: '75%',  label: 'Latency Reduced',accent: false },
  { icon: TestTube,   value: '95%+', label: 'Test Coverage',  accent: false },
]

/* ─── Company styling ──────────────────────────────────── */
const companyMeta = {
  'State Street Corporation':    { bg: '#1a4f8a', text: '#fff', initial: 'SS' },
  'Technocolabs Software Inc.':  { bg: '#6c3fba', text: '#fff', initial: 'TC' },
}

/* ─── Abbreviated progression labels ──────────────────── */
const stepAbbrev = {
  'Software Development Intern': 'Intern',
  'Associate 2':                 'Assoc. 2',
  'Senior Associate':            'Sr. Assoc.',
  'Emerging Lead':               'Lead',
}

/* ─── Achievement categories (State Street) ───────────── */
const ssCategories = [
  {
    icon: Box,
    label: 'Products Built',
    color: '#d4a24c',
    bg: 'rgba(212,162,76,0.08)',
    indices: [0, 2, 3, 6, 8],
  },
  {
    icon: Zap,
    label: 'Performance',
    color: '#4ade80',
    bg: 'rgba(74,222,128,0.07)',
    indices: [1, 10],
  },
  {
    icon: FlaskConical,
    label: 'ML / Research',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.07)',
    indices: [4, 5],
  },
  {
    icon: BadgeCheck,
    label: 'Quality',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.07)',
    indices: [7, 11],
  },
  {
    icon: Handshake,
    label: 'Collaboration',
    color: '#94a3b8',
    bg: 'rgba(148,163,184,0.06)',
    indices: [9],
  },
]

/* ─── Impact metrics ───────────────────────────────────── */
const entryMetrics = {
  'State Street Corporation': [
    { value: '75%',  label: 'Latency cut' },
    { value: '100+', label: 'Users served' },
    { value: '95%+', label: 'Test coverage' },
    { value: '25%',  label: 'SQL accuracy ↑' },
  ],
  'Technocolabs Software Inc.': [
    { value: '87%', label: 'Model accuracy' },
  ],
}

/* ─── Sub-components ───────────────────────────────────── */
function ProgressionTrack({ steps, currentStep }) {
  const currentIdx = steps.indexOf(currentStep)
  const CELL_W = 68

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', margin: '0.65rem 0 0.5rem', overflowX: 'auto' }}>
      {steps.map((step, idx) => {
        const isActive = step === currentStep
        const isPast = idx < currentIdx
        const isLast = idx === steps.length - 1
        const label = stepAbbrev[step] || step

        return (
          <div key={step} style={{ display: 'flex', alignItems: 'flex-start', flexShrink: 0 }}>
            {/* dot + label column */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: CELL_W }}>
              <div style={{
                width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
                background: isActive
                  ? 'var(--color-accent)'
                  : isPast
                    ? 'color-mix(in srgb, var(--color-accent) 50%, transparent)'
                    : 'var(--border)',
                border: isActive ? '2px solid color-mix(in srgb, var(--color-accent) 35%, transparent)' : '2px solid transparent',
                boxShadow: isActive ? '0 0 0 3px color-mix(in srgb, var(--color-accent) 16%, transparent)' : 'none',
              }} />
              <span style={{
                fontSize: '0.6rem',
                fontFamily: 'var(--font-mono)',
                color: isActive ? 'var(--color-accent)' : 'var(--text2)',
                fontWeight: isActive ? 700 : 500,
                opacity: isPast ? 0.6 : isActive ? 1 : 0.4,
                textAlign: 'center',
                marginTop: 4,
                lineHeight: 1.25,
                whiteSpace: 'normal',
                maxWidth: CELL_W - 4,
              }}>
                {label}
              </span>
            </div>

            {/* connector line — centered on the dot row */}
            {!isLast && (
              <div style={{
                width: 24, height: 2, marginTop: 4, flexShrink: 0,
                background: isPast || isActive
                  ? 'linear-gradient(90deg, color-mix(in srgb, var(--color-accent) 55%, transparent), color-mix(in srgb, var(--color-accent) 25%, transparent))'
                  : 'var(--border)',
              }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function ImpactRow({ metrics }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
      {metrics.map(({ value, label }) => (
        <div key={label} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          padding: '0.6rem 1rem',
          background: 'color-mix(in srgb, var(--color-accent) 7%, var(--surface))',
          border: '1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)',
          borderRadius: 10, minWidth: 68,
        }}>
          <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
            {value}
          </span>
          <span style={{ fontSize: '0.62rem', color: 'var(--text2)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500, textAlign: 'center' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

function CategorisedBullets({ bullets }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
      {ssCategories.map(({ icon: Icon, label, color, bg, indices }) => (
        <div key={label} style={{
          borderRadius: 10,
          border: `1px solid ${color}28`,
          background: bg,
          overflow: 'hidden',
        }}>
          {/* category header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '0.55rem 0.9rem',
            borderBottom: `1px solid ${color}20`,
            background: `${color}10`,
          }}>
            <Icon size={12} color={color} strokeWidth={2.2} />
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
              {label}
            </span>
          </div>
          {/* items */}
          <div style={{ padding: '0.5rem 0.6rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {indices.map(i => (
              <div key={i} style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                padding: '0.45rem 0.55rem',
                borderRadius: 7,
                fontSize: '0.86rem', color: 'var(--text2)', lineHeight: 1.65,
              }}>
                <span style={{ flexShrink: 0, marginTop: '0.55em', width: 5, height: 5, borderRadius: '50%', background: color, opacity: 0.75 }} />
                <HighlightedText text={bullets[i]} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PlainBullets({ bullets }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <p style={{
        fontSize: '0.67rem', fontWeight: 700, color: 'var(--color-accent)',
        textTransform: 'uppercase', letterSpacing: '0.13em',
        marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Cpu size={11} /> Key Achievements
      </p>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {bullets.map((bullet, i) => (
          <li key={i} style={{
            display: 'flex', gap: 10, alignItems: 'flex-start',
            fontSize: '0.875rem', color: 'var(--text2)', lineHeight: 1.68,
          }}>
            <span style={{ flexShrink: 0, marginTop: '0.55em', width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', opacity: 0.7 }} />
            <HighlightedText text={bullet} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExperienceEntry({ item, index }) {
  const [open, setOpen] = useState(index === 0)
  const progressionSteps = item.progressionSteps || []
  const meta = companyMeta[item.company] || { bg: 'var(--color-accent)', text: '#fff', initial: item.company[0] }
  const metrics = entryMetrics[item.company]
  const useCategorised = item.company === 'State Street Corporation' && item.bullets

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      style={{
        borderRadius: 18,
        border: '1px solid',
        borderColor: open ? 'color-mix(in srgb, var(--color-accent) 38%, var(--border))' : 'var(--border)',
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
      {/* accent bar */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, ${meta.bg} 0%, color-mix(in srgb, var(--color-accent) 40%, transparent) 100%)`,
        opacity: open ? 1 : 0.35,
        transition: 'opacity 0.3s',
      }} />

      {/* header */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '1.2rem 1.4rem', textAlign: 'left',
          display: 'flex', alignItems: 'flex-start', gap: '1rem',
        }}
      >
        {/* monogram */}
        <div style={{
          width: 42, height: 42, borderRadius: 11,
          background: meta.bg, color: meta.text,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.7rem', fontWeight: 800, fontFamily: 'var(--font-mono)',
          letterSpacing: '0.04em', flexShrink: 0, marginTop: 2,
          boxShadow: `0 4px 12px ${meta.bg}44`,
        }}>
          {meta.initial}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text)', marginBottom: 2, lineHeight: 1.25 }}>
                {item.role}
              </h3>
              <p style={{ fontSize: '0.83rem', color: 'var(--text2)', fontWeight: 500 }}>
                {item.company}
                <span style={{ opacity: 0.3, margin: '0 0.4rem' }}>·</span>
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
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.5 }}>
                {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                {open ? 'collapse' : 'details'}
              </span>
            </div>
          </div>

          {progressionSteps.length > 0 && (
            <ProgressionTrack steps={progressionSteps} currentStep={item.currentRoleStep} />
          )}
        </div>
      </button>

      {/* expanded */}
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
            <div style={{ padding: '0 1.4rem 1.6rem' }}>
              <div style={{
                height: 1,
                background: 'linear-gradient(90deg, transparent, color-mix(in srgb, var(--color-accent) 22%, var(--border)), transparent)',
                marginBottom: '1.3rem',
              }} />

              {item.description && (
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.75,
                  marginBottom: '1.3rem',
                  paddingLeft: '1rem',
                  borderLeft: '3px solid var(--color-accent)',
                }}>
                  {item.description}
                </p>
              )}

              {metrics && <ImpactRow metrics={metrics} />}

              {useCategorised
                ? <CategorisedBullets bullets={item.bullets} />
                : item.bullets && <PlainBullets bullets={item.bullets} />
              }

              {item.tags && (
                <div>
                  <p style={{
                    fontSize: '0.67rem', fontWeight: 700, color: 'var(--color-accent)',
                    textTransform: 'uppercase', letterSpacing: '0.13em',
                    marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    <Zap size={11} /> Tech Stack
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

/* ─── Page ──────────────────────────────────────────────── */
export default function ExperiencePage() {
  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Experience log"
        title="Career timeline"
        description="Enterprise AI software — RAG, LLM backends, and production systems at scale."
      />

      {/* Career snapshot */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem', marginBottom: '2.5rem',
      }}>
        {careerStats.map(({ icon: Icon, value, label, accent }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{
              padding: '1rem 1.1rem', borderRadius: 14,
              border: '1px solid',
              borderColor: accent ? 'color-mix(in srgb, var(--color-accent) 35%, transparent)' : 'var(--border)',
              background: accent ? 'color-mix(in srgb, var(--color-accent) 8%, var(--surface))' : 'var(--surface)',
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
            }}
          >
            <Icon size={15} color={accent ? 'var(--color-accent)' : 'var(--text2)'} strokeWidth={2} />
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: accent ? 'var(--color-accent)' : 'var(--text)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>
              {value}
            </span>
            <span style={{ fontSize: '0.71rem', color: 'var(--text2)', fontWeight: 500, lineHeight: 1.3 }}>
              {label}
            </span>
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
              <div style={{
                position: 'absolute', left: -30, top: 22,
                width: 14, height: 14, borderRadius: '50%',
                background: i === 0 ? 'var(--color-accent)' : 'color-mix(in srgb, var(--color-accent) 45%, var(--border))',
                border: '3px solid var(--bg)', zIndex: 2,
                boxShadow: i === 0 ? '0 0 0 3px color-mix(in srgb, var(--color-accent) 22%, transparent)' : 'none',
              }} />
              {i === 0 && (
                <div aria-hidden="true" style={{
                  position: 'absolute', left: -36, top: 16,
                  width: 26, height: 26, borderRadius: '50%',
                  border: '2px solid color-mix(in srgb, var(--color-accent) 30%, transparent)',
                  animation: 'timeline-pulse 2.5s ease-out infinite', zIndex: 1,
                }} />
              )}
              <ExperienceEntry item={item} index={i} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes timeline-pulse {
          0%   { transform: scale(1);    opacity: 0.7; }
          70%  { transform: scale(1.65); opacity: 0; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @media (max-width: 600px) {
          .exp-snap { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes timeline-pulse { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </section>
  )
}
