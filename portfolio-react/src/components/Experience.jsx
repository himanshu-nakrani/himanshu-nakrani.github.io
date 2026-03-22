import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { experience } from '../data'

function TimelineCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ position: 'relative', marginBottom: '2rem' }}
    >
      {/* Dot */}
      <motion.div
        animate={{ boxShadow: hovered ? '0 0 16px var(--accent)' : '0 0 6px rgba(124,111,255,0.4)' }}
        style={{
          position: 'absolute', left: -32, top: 10,
          width: 14, height: 14, borderRadius: '50%',
          background: 'var(--accent)', border: '2px solid var(--bg)',
        }}
      />
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{ borderColor: hovered ? 'rgba(124,111,255,0.5)' : 'var(--border)' }}
        style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          border: '1px solid var(--border)',
          borderRadius: 16, padding: '1.6rem',
          transition: 'border-color 0.2s',
          boxShadow: hovered ? '0 8px 40px rgba(124,111,255,0.1)' : 'none',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 3 }}>{item.role}</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 500 }}>{item.company} · {item.location}</p>
          </div>
          <span style={{
            fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
            color: 'var(--accent)', background: 'rgba(124,111,255,0.1)',
            border: '1px solid rgba(124,111,255,0.3)',
            padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap',
          }}>
            {item.period}
          </span>
        </div>
        <ul style={{ listStyle: 'none', marginBottom: '1.2rem' }}>
          {item.bullets.map((b, i) => (
            <li key={i} style={{ color: 'var(--text2)', fontSize: '0.88rem', padding: '4px 0 4px 1.2rem', position: 'relative', lineHeight: 1.6 }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▸</span>
              <span dangerouslySetInnerHTML={{ __html: b.replace(/(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%)/g, '<strong style="color:var(--text)">$1</strong>') }} />
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        {experience.map((item, i) => <TimelineCard key={i} item={item} index={i} />)}
      </div>
    </Section>
  )
}
