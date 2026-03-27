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
      style={{ position: 'relative', marginBottom: '2.5rem' }}
    >
      {/* Dot */}
      <motion.div
        animate={{
          scale: hovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', left: -32, top: 12,
          width: 12, height: 12, borderRadius: '50%',
          background: 'var(--accent)', border: '2px solid var(--bg)',
          transition: 'transform 0.3s',
        }}
      />
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          borderColor: hovered ? 'var(--accent)' : 'var(--border)',
          y: hovered ? -4 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          border: '1px solid var(--border)',
          borderRadius: 16, padding: '1.6rem',
          transition: 'all 0.3s',
          boxShadow: hovered ? '0 8px 24px rgba(74,158,255,0.1)' : '0 2px 8px rgba(0,0,0,0.08)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'radial-gradient(circle at top left, rgba(74,158,255,0.04), transparent 60%)' : 'transparent',
          pointerEvents: 'none',
          transition: 'background 0.3s',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 3, background: hovered ? 'linear-gradient(135deg, var(--accent), var(--accent3))' : 'transparent', WebkitBackgroundClip: hovered ? 'text' : 'unset', WebkitTextFillColor: hovered ? 'transparent' : 'unset', transition: 'all 0.3s' }}>{item.role}</h3>
            <p style={{ fontSize: '0.85rem', color: hovered ? 'var(--accent)' : 'var(--accent3)', fontWeight: 500, transition: 'color 0.3s' }}>{item.company} · {item.location}</p>
          </div>
          <motion.span
            animate={{ y: hovered ? -2 : 0 }}
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
              color: 'var(--accent)', background: 'rgba(0,217,255,0.12)',
              border: '1px solid rgba(0,217,255,0.5)',
              padding: '4px 12px', borderRadius: 20, whiteSpace: 'nowrap',
              transition: 'all 0.3s',
            }}>
            {item.period}
          </motion.span>
        </div>

        <ul style={{ listStyle: 'none', marginBottom: '1.2rem', position: 'relative', zIndex: 1 }}>
          {item.bullets.map((b, i) => (
            <motion.li
              key={i}
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ delay: i * 0.02 }}
              style={{
                color: 'var(--text2)', fontSize: '0.88rem', padding: '5px 0 5px 1.2rem',
                position: 'relative', lineHeight: 1.6, transition: 'color 0.3s',
              }}>
              <span style={{ position: 'absolute', left: 0, color: 'var(--accent)' }}>▸</span>
              <span dangerouslySetInnerHTML={{ __html: b.replace(/(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%)/g, '<strong style="color:var(--accent2)">$1</strong>') }} />
            </motion.li>
          ))}
        </ul>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, position: 'relative', zIndex: 1 }}>
          {item.tags.map((t, idx) => (
            <motion.div
              key={t}
              animate={hovered ? { y: -2, opacity: 1 } : { y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.02 }}
            >
              <Tag>{t}</Tag>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--accent), rgba(0,217,255,0.2))', boxShadow: '0 0 15px var(--accent)' }} />
        {experience.map((item, i) => <TimelineCard key={i} item={item} index={i} />)}
      </div>
    </Section>
  )
}
