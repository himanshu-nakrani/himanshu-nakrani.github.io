import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { publications } from '../data'

export default function Research({ embedded = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const grid = (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.2rem' }}>
      {publications.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.12 }}
          whileHover={{ borderColor: 'var(--border2)', y: -2, boxShadow: 'var(--shadow-md)' }}
          className="mvp2-card"
          style={{
            padding: '1.6rem',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.span
            animate={{ y: 0 }}
            style={{
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.72rem',
              color: 'var(--accent)',
              background: 'rgba(74, 158, 255, 0.1)',
              border: '1px solid var(--border2)',
              padding: '4px 11px',
              borderRadius: 20,
              display: 'inline-block',
              marginBottom: '0.9rem',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {p.venue}
          </motion.span>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
            {p.title}
          </h3>
          <p style={{ fontSize: '0.83rem', color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.6, position: 'relative', zIndex: 1 }}>
            {p.desc}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: p.link ? '1rem' : 0, position: 'relative', zIndex: 1 }}>
            {p.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
          {p.link && (
            <motion.a
              whileHover={{ x: 4 }}
              href={p.link}
              target="_blank"
              rel="noopener"
              style={{
                fontSize: '0.78rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                fontFamily: "'Fira Code', monospace",
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                position: 'relative',
                zIndex: 1,
                transition: 'color 0.2s',
              }}
            >
              View on IEEE Xplore →
            </motion.a>
          )}
        </motion.div>
      ))}
    </div>
  )

  if (embedded) {
    return (
      <section style={{ background: 'var(--bg)', paddingBottom: 'var(--section-pad-y)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--page-pad-x)' }}>{grid}</div>
      </section>
    )
  }

  return (
    <Section id="research" title="Research & Publications" alt>
      {grid}
    </Section>
  )
}
