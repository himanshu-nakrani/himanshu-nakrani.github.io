import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { skills, certifications } from '../data'

function SkillGroup({ group, index, activeGroup, setActiveGroup }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isActive = activeGroup === group.label
  const isDimmed = activeGroup && !isActive

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: isDimmed ? 0.35 : 1, y: 0 } : {}}
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
          ? `0 0 0 1px color-mix(in srgb, ${group.color} 20%, transparent), var(--shadow-md)`
          : 'var(--shadow-xs)',
        outline: 'none',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
        <span style={{ fontSize: '1.3rem' }}>{group.icon}</span>
        <span style={{
          fontSize: '0.78rem', fontWeight: 700, fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          color: isActive ? group.color : 'var(--text2)',
          transition: 'color 0.25s',
        }}>
          {group.label}
        </span>
        <span style={{
          marginLeft: 'auto', fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
          color: 'var(--text2)', opacity: 0.5,
        }}>
          {group.items.length} skills
        </span>
      </div>

      {/* Top accent line */}
      <div style={{
        height: 2, borderRadius: 2, marginBottom: '1rem',
        background: `linear-gradient(90deg, ${group.color}, transparent)`,
        opacity: isActive ? 1 : 0.25,
        transition: 'opacity 0.25s',
        boxShadow: isActive ? `0 0 8px ${group.color}` : 'none',
      }} />

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {group.items.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsPage() {
  const [activeGroup, setActiveGroup] = useState(null)
  const certRef = useRef(null)
  const certInView = useInView(certRef, { once: true, margin: '-40px' })

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Tech stack"
        title="Skills & Tools"
        description="Technologies I work with daily — from LLM backends to cloud infrastructure."
      />

      {/* Filter pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
        <button
          onClick={() => setActiveGroup(null)}
          aria-pressed={!activeGroup}
          style={{
            background: !activeGroup ? 'var(--color-accent)' : 'var(--surface2)',
            color: !activeGroup ? 'white' : 'var(--text2)',
            border: `1px solid ${!activeGroup ? 'var(--color-accent)' : 'var(--border)'}`,
            borderRadius: 20, padding: '5px 14px',
            fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: !activeGroup ? '0 2px 8px color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'none',
          }}
        >
          All
        </button>
        {skills.map((s) => (
          <button
            key={s.label}
            aria-pressed={activeGroup === s.label}
            onClick={() => setActiveGroup(activeGroup === s.label ? null : s.label)}
            style={{
              background: activeGroup === s.label ? s.color : 'var(--surface2)',
              color: activeGroup === s.label ? 'white' : 'var(--text2)',
              border: `1px solid ${activeGroup === s.label ? s.color : 'var(--border)'}`,
              borderRadius: 20, padding: '5px 14px',
              fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: activeGroup === s.label ? `0 2px 8px color-mix(in srgb, ${s.color} 35%, transparent)` : 'none',
            }}
          >
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {/* Skills grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.1rem',
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
        <p style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent)',
          textTransform: 'uppercase', letterSpacing: '0.12em',
          marginBottom: '1rem',
        }}>
          <span style={{ display: 'inline-block', width: '1.25rem', height: '1.5px', background: 'var(--color-accent)', borderRadius: 2 }} />
          Certifications
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '0.9rem',
        }}>
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={certInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -3 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.2rem',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
              onHoverStart={e => {
                e.target.style && (e.target.style.borderColor = 'color-mix(in srgb, var(--color-accent) 35%, var(--border))')
              }}
            >
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{c.icon}</span>
              <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.45 }}>{c.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
