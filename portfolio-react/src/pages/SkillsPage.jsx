import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import { skills, certifications } from '../data'

/* ─── Primary tools shown as a spotlight strip ─────────── */
const PRIMARY_STACK = [
  { name: 'Python',      icon: '🐍', note: 'primary lang' },
  { name: 'FastAPI',     icon: '⚡', note: 'backend APIs' },
  { name: 'LangChain',   icon: '🔗', note: 'LLM chaining' },
  { name: 'Azure OpenAI',icon: '☁️', note: 'LLM infra' },
  { name: 'PostgreSQL',  icon: '🐘', note: 'primary DB' },
  { name: 'pgvector',    icon: '🔢', note: 'vector search' },
  { name: 'RAG',         icon: '📚', note: 'retrieval AI' },
  { name: 'Docker',      icon: '🐳', note: 'containers' },
]

/* ─── Cert issuer colours ──────────────────────────────── */
const CERT_ACCENT = [
  'rgba(255,80,0,0.15)',   // Oracle - orange
  'rgba(255,153,0,0.15)',  // AWS - amber
  'rgba(255,153,0,0.12)',  // AWS Udacity
  'rgba(74,158,255,0.12)', // Goldman - blue
  'rgba(255,60,60,0.12)',  // Databricks - red
]
const CERT_BORDER = [
  'rgba(255,80,0,0.3)',
  'rgba(255,153,0,0.3)',
  'rgba(255,153,0,0.25)',
  'rgba(74,158,255,0.25)',
  'rgba(255,60,60,0.25)',
]

/* ─── Sub-components ───────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-accent)',
      textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '1rem',
    }}>
      <span style={{ display: 'inline-block', width: 18, height: 1.5, background: 'var(--color-accent)', borderRadius: 2 }} />
      {children}
    </p>
  )
}

function PrimaryTool({ tool, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
        padding: '0.85rem 0.9rem', borderRadius: 12, minWidth: 78,
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--color-accent) 45%, var(--border))' : 'var(--border)'}`,
        background: hovered ? 'color-mix(in srgb, var(--color-accent) 7%, var(--surface))' : 'var(--surface)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 18px color-mix(in srgb, var(--color-accent) 14%, transparent)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease', cursor: 'default',
      }}
    >
      <span style={{ fontSize: '1.35rem', lineHeight: 1 }}>{tool.icon}</span>
      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text)', textAlign: 'center', lineHeight: 1.2 }}>{tool.name}</span>
      <span style={{ fontSize: '0.62rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)', opacity: 0.65, textAlign: 'center' }}>{tool.note}</span>
    </motion.div>
  )
}

function SkillGroup({ group, index, activeGroup, setActiveGroup }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isActive = activeGroup === group.label
  const isDimmed = activeGroup && !isActive

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: isDimmed ? 0.32 : 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onClick={() => setActiveGroup(isActive ? null : group.label)}
      tabIndex={0}
      role="button"
      aria-pressed={isActive}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActiveGroup(isActive ? null : group.label) } }}
      style={{
        borderRadius: 16,
        border: `1px solid ${isActive ? group.color : 'var(--border)'}`,
        background: isActive
          ? `color-mix(in srgb, ${group.color} 8%, var(--surface))`
          : 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        padding: '1.4rem',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: isActive
          ? `0 0 0 1px color-mix(in srgb, ${group.color} 18%, transparent), var(--shadow-md)`
          : 'var(--shadow-xs)',
        outline: 'none',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.25rem' }}>{group.icon}</span>
        <span style={{
          fontSize: '0.75rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: isActive ? group.color : 'var(--text2)',
          transition: 'color 0.25s', flex: 1,
        }}>
          {group.label}
        </span>
        <span style={{
          fontSize: '0.63rem', fontFamily: 'var(--font-mono)',
          color: isActive ? group.color : 'var(--text2)',
          opacity: isActive ? 0.8 : 0.45,
          background: isActive ? `color-mix(in srgb, ${group.color} 12%, transparent)` : 'var(--surface2)',
          border: `1px solid ${isActive ? `color-mix(in srgb, ${group.color} 30%, transparent)` : 'var(--border)'}`,
          padding: '2px 7px', borderRadius: 20, transition: 'all 0.25s',
        }}>
          {group.items.length}
        </span>
      </div>

      {/* Accent bar */}
      <div style={{
        height: 2, borderRadius: 2, marginBottom: '1rem',
        background: `linear-gradient(90deg, ${group.color}, transparent)`,
        opacity: isActive ? 1 : 0.22,
        boxShadow: isActive ? `0 0 8px ${group.color}` : 'none',
        transition: 'opacity 0.25s, box-shadow 0.25s',
      }} />

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
        {group.items.map(item => (
          <span
            key={item}
            style={{
              fontSize: '0.73rem', padding: '3px 9px', borderRadius: 9999,
              border: `1px solid ${isActive ? `color-mix(in srgb, ${group.color} 28%, var(--border))` : 'var(--border)'}`,
              background: isActive ? `color-mix(in srgb, ${group.color} 8%, var(--surface2))` : 'var(--surface2)',
              color: isActive ? 'var(--text)' : 'var(--text2)',
              fontFamily: 'var(--font-mono)', transition: 'all 0.2s',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

function CertCard({ cert, index, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.85rem',
        padding: '1rem 1.2rem',
        background: hovered ? CERT_ACCENT[index % CERT_ACCENT.length] : 'var(--surface)',
        border: `1px solid ${hovered ? CERT_BORDER[index % CERT_BORDER.length] : 'var(--border)'}`,
        borderRadius: 12,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 8, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '1.25rem',
        background: CERT_ACCENT[index % CERT_ACCENT.length],
        border: `1px solid ${CERT_BORDER[index % CERT_BORDER.length]}`,
      }}>
        {cert.icon}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500, lineHeight: 1.45 }}>{cert.title}</p>
      </div>
      <Award size={13} color="var(--color-accent)" style={{ flexShrink: 0, opacity: hovered ? 1 : 0.35, transition: 'opacity 0.2s' }} />
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function SkillsPage() {
  const [activeGroup, setActiveGroup] = useState(null)
  const certRef = useRef(null)
  const certInView = useInView(certRef, { once: true, margin: '-40px' })

  const totalSkills = skills.reduce((acc, g) => acc + g.items.length, 0)

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Tech stack"
        title="Skills & Tools"
        description="Technologies I work with daily — from LLM backends to cloud infrastructure."
      />

      {/* Summary strip */}
      <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2.25rem', flexWrap: 'wrap' }}>
        {[
          { value: totalSkills + '+', label: 'Total Skills' },
          { value: skills.length,     label: 'Domains' },
          { value: '3',               label: 'Cloud Platforms' },
          { value: '2+',              label: 'Years Production' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              padding: '0.65rem 1.1rem', borderRadius: 12,
              border: '1px solid var(--border)', background: 'var(--surface)', minWidth: 76,
            }}
          >
            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: '0.62rem', color: 'var(--text2)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 500 }}>{s.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Primary stack spotlight */}
      <div style={{ marginBottom: '2.5rem' }}>
        <SectionLabel>Daily Drivers</SectionLabel>
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          {PRIMARY_STACK.map((tool, i) => <PrimaryTool key={tool.name} tool={tool} index={i} />)}
        </div>
      </div>

      {/* Category filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.67rem', color: 'var(--text2)', opacity: 0.5, fontFamily: 'var(--font-mono)', marginRight: 4 }}>filter</span>
        <button
          onClick={() => setActiveGroup(null)}
          aria-pressed={!activeGroup}
          style={{
            background: !activeGroup ? 'var(--color-accent)' : 'var(--surface2)',
            color: !activeGroup ? 'var(--color-accent-fg)' : 'var(--text2)',
            border: `1px solid ${!activeGroup ? 'var(--color-accent)' : 'var(--border)'}`,
            borderRadius: 9999, padding: '4px 13px',
            fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
            boxShadow: !activeGroup ? '0 2px 8px color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'none',
          }}
        >
          All
        </button>
        {skills.map(s => (
          <button
            key={s.label}
            aria-pressed={activeGroup === s.label}
            onClick={() => setActiveGroup(activeGroup === s.label ? null : s.label)}
            style={{
              background: activeGroup === s.label ? s.color : 'var(--surface2)',
              color: activeGroup === s.label ? '#0b0d10' : 'var(--text2)',
              border: `1px solid ${activeGroup === s.label ? s.color : 'var(--border)'}`,
              borderRadius: 9999, padding: '4px 12px',
              fontSize: '0.73rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s',
              boxShadow: activeGroup === s.label ? `0 2px 8px color-mix(in srgb, ${s.color} 32%, transparent)` : 'none',
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
        gap: '1rem',
        marginBottom: '3rem',
      }}>
        {skills.map((group, i) => (
          <SkillGroup
            key={group.label}
            group={group}
            index={i}
            activeGroup={activeGroup}
            setActiveGroup={setActiveGroup}
          />
        ))}
      </div>

      {/* Certifications */}
      <div ref={certRef}>
        <SectionLabel>Certifications</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '0.8rem',
        }}>
          {certifications.map((c, i) => (
            <CertCard key={i} cert={c} index={i} inView={certInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
