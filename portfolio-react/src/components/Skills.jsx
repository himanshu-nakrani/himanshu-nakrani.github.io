import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { skills, certifications } from '../data'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="skills" title="Skills & Certifications">
      <div ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ borderColor: 'rgba(124,111,255,0.4)' }}
              style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)', borderRadius: 14, padding: '1.2rem',
                transition: 'border-color 0.2s',
              }}
            >
              <p style={{ fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", color: 'var(--accent)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {s.items.map(item => <Tag key={item}>{item}</Tag>)}
              </div>
            </motion.div>
          ))}
        </div>

        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.2rem', color: 'var(--text2)' }}>Certifications</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.8rem' }}>
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
              whileHover={{ borderColor: 'rgba(124,111,255,0.4)', y: -2 }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1rem', textAlign: 'center',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{c.icon}</div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.4 }}>{c.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
