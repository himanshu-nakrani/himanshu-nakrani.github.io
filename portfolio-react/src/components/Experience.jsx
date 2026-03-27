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
          boxShadow: hovered ? '0 0 30px var(--accent), 0 0 60px rgba(124,111,255,0.4), 0 0 10px rgba(79,195,247,0.3)' : '0 0 12px rgba(124,111,255,0.6), 0 0 24px rgba(124,111,255,0.3)',
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'absolute', left: -32, top: 12,
          width: 14, height: 14, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent2))', 
          border: '2px solid var(--bg)',
          transition: 'transform 0.3s',
          boxShadow: '0 0 12px rgba(124,111,255,0.6)',
        }}
      />
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        animate={{
          borderColor: hovered ? 'rgba(124,111,255,0.6)' : 'var(--border)',
          y: hovered ? -6 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          background: hovered ? 'linear-gradient(135deg, rgba(124,111,255,0.12) 0%, rgba(79,195,247,0.08) 100%), rgba(14, 14, 26, 0.85)' : 'linear-gradient(135deg, rgba(14, 14, 26, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%)',
          backdropFilter: 'blur(12px)',
          border: hovered ? '1px solid rgba(79, 195, 247, 0.4)' : '1px solid rgba(124,111,255,0.2)',
          borderRadius: 16, padding: '1.6rem',
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          boxShadow: hovered ? '0 0 40px rgba(124,111,255,0.3), 0 0 80px rgba(79,195,247,0.15), 0 16px 48px rgba(0,0,0,0.3)' : '0 0 20px rgba(124,111,255,0.08), 0 4px 16px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'radial-gradient(circle at top left, rgba(124,111,255,0.08), transparent 60%)' : 'transparent',
          pointerEvents: 'none',
          transition: 'background 0.3s',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.2rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 3, background: hovered ? 'linear-gradient(135deg, var(--text), var(--accent))' : 'transparent', WebkitBackgroundClip: hovered ? 'text' : 'unset', WebkitTextFillColor: hovered ? 'transparent' : 'unset', transition: 'all 0.3s' }}>{item.role}</h3>
            <p style={{ fontSize: '0.85rem', color: hovered ? 'var(--accent2)' : 'var(--accent)', fontWeight: 500, transition: 'color 0.3s' }}>{item.company} · {item.location}</p>
          </div>
          <motion.span
            animate={{ y: hovered ? -2 : 0, boxShadow: hovered ? '0 0 20px rgba(124,111,255,0.3)' : 'none' }}
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
              color: 'var(--accent)', background: 'rgba(124,111,255,0.12)',
              border: '1px solid rgba(124,111,255,0.4)',
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
        <div style={{ position: 'absolute', left: 0, top: 8, bottom: 0, width: 2, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
        {experience.map((item, i) => <TimelineCard key={i} item={item} index={i} />)}
      </div>
    </Section>
  )
}
