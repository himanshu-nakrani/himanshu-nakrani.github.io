import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { skills, certifications } from '../data'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <Section id="skills" title="Skills & Certifications">
      <div ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onHoverStart={() => setHoveredSkill(i)}
              onHoverEnd={() => setHoveredSkill(null)}
              style={{
                background: hoveredSkill === i ? 'linear-gradient(135deg, rgba(0,217,255,0.1) 0%, rgba(79,122,255,0.05) 100%), linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)' : 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: hoveredSkill === i ? '1.5px solid rgba(0,217,255,0.6)' : '1.5px solid rgba(0,217,255,0.25)',
                borderRadius: 14, padding: '1.2rem',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredSkill === i ? 'translateY(-4px)' : 'translateY(0)',
                boxShadow: hoveredSkill === i ? '0 8px 32px rgba(0,217,255,0.2), 0 0 20px rgba(0,217,255,0.1)' : '0 0 15px rgba(0,217,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: hoveredSkill === i ? 'radial-gradient(circle at bottom right, rgba(0,217,255,0.15), transparent 60%)' : 'transparent',
                pointerEvents: 'none',
                transition: 'background 0.3s',
              }} />
              <p style={{
                fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", color: hoveredSkill === i ? 'var(--accent)' : 'var(--accent3)',
                marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                position: 'relative', zIndex: 1, transition: 'color 0.3s',
              }}>
                {s.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, position: 'relative', zIndex: 1 }}>
                {s.items.map((item, idx) => (
                  <motion.div
                    key={item}
                    animate={hoveredSkill === i ? { y: -2, opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <Tag>{item}</Tag>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.4rem', color: 'var(--text)' }}>
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Certifications
            </span>
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -6, borderColor: 'rgba(0,217,255,0.6)', boxShadow: '0 12px 36px rgba(0,217,255,0.15)' }}
              style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1.5px solid rgba(0,217,255,0.25)',
                borderRadius: 12, padding: '1.2rem', textAlign: 'center',
                transition: 'all 0.3s, transform 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, rgba(0,217,255,0.1), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <motion.div
                whileHover={{ scale: 1.15 }}
                style={{ fontSize: '1.8rem', marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
                {c.icon}
              </motion.div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                {c.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
