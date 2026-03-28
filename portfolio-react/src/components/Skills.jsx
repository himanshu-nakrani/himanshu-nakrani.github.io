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
    <Section id="skills" title="Technical Stack" subtitle="Tools of the trade." alt>
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
              className="mvp2-card"
              style={{
                border: hoveredSkill === i ? '1px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '1.2rem',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                transform: hoveredSkill === i ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredSkill === i ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <p style={{
                fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", color: 'var(--text2)',
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
            Certifications
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -3, borderColor: 'var(--accent)' }}
              className="mvp2-card"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.2rem',
                textAlign: 'center',
                transition: 'border-color 0.2s ease, transform 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'transparent',
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
