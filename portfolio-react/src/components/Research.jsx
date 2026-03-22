import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { publications } from '../data'

export default function Research() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="research" title="Research & Publications" alt>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.2rem' }}>
        {publications.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ borderColor: 'rgba(124,111,255,0.5)', y: -3 }}
            style={{
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              border: '1px solid var(--border)', borderRadius: 16, padding: '1.6rem',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
          >
            <span style={{
              fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
              color: 'var(--accent)', background: 'rgba(124,111,255,0.1)',
              border: '1px solid rgba(124,111,255,0.3)',
              padding: '3px 10px', borderRadius: 20, display: 'inline-block', marginBottom: '0.9rem',
            }}>
              {p.venue}
            </span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.6rem' }}>{p.title}</h3>
            <p style={{ fontSize: '0.83rem', color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.6 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
