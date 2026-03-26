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
            whileHover={{ borderColor: 'rgba(124,111,255,0.6)', y: -6 }}
            style={{
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              border: '1px solid var(--border)', borderRadius: 16, padding: '1.6rem',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              boxShadow: 'none',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(circle at top left, rgba(124,111,255,0.05), transparent 60%)',
              pointerEvents: 'none',
            }} />
            <motion.span
              animate={{ y: 0 }}
              style={{
                fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
                color: 'var(--accent)', background: 'rgba(124,111,255,0.12)',
                border: '1px solid rgba(124,111,255,0.4)',
                padding: '4px 11px', borderRadius: 20, display: 'inline-block', marginBottom: '0.9rem',
                position: 'relative', zIndex: 1,
                transition: 'all 0.3s',
              }}>
              {p.venue}
            </motion.span>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>{p.title}</h3>
            <p style={{ fontSize: '0.83rem', color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: p.link ? '1rem' : 0, position: 'relative', zIndex: 1 }}>
              {p.tags.map(t => <Tag key={t}>{t}</Tag>)}
            </div>
            {p.link && (
              <motion.a
                whileHover={{ x: 4 }}
                href={p.link}
                target="_blank"
                rel="noopener"
                style={{
                  fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none',
                  fontFamily: "'Fira Code', monospace", display: 'inline-flex', alignItems: 'center',
                  gap: 4, position: 'relative', zIndex: 1, transition: 'color 0.2s',
                }}
              >
                📄 View on IEEE Xplore →
              </motion.a>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
