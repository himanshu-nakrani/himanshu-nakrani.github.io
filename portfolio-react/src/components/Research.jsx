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
            whileHover={{ borderColor: 'var(--border2)', y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            style={{
              background: 'rgba(18, 21, 28, 0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(167, 139, 250, 0.15)', borderRadius: 16, padding: '1.6rem',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <motion.span
              animate={{ y: 0 }}
              style={{
                fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
                color: 'var(--accent)', background: 'rgba(0,217,255,0.12)',
                border: '1px solid rgba(0,217,255,0.5)',
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
