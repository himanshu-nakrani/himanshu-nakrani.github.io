import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { publications } from '../data'

const statusStyle = {
  published: { color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)' },
  pending:   { color: 'var(--accent)', bg: 'rgba(74,158,255,0.08)', border: 'rgba(74,158,255,0.25)' },
}

function PaperCard({ pub, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const isPublished = !!pub.link
  const s = isPublished ? statusStyle.published : statusStyle.pending

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      style={{
        borderRadius: 16,
        border: '1px solid var(--border)',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ borderColor: 'var(--border2)', y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--nav-dot), var(--accent) 60%, transparent)' }} />

      <div style={{ padding: '1.5rem' }}>
        {/* Venue + status row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Fira Code', monospace", fontSize: '0.72rem',
            color: 'var(--accent)', background: 'rgba(74,158,255,0.1)',
            border: '1px solid rgba(74,158,255,0.25)', padding: '3px 10px', borderRadius: 20,
          }}>
            {pub.venue}
          </span>
          <span style={{
            fontFamily: "'Fira Code', monospace", fontSize: '0.7rem',
            color: s.color, background: s.bg, border: `1px solid ${s.border}`,
            padding: '3px 10px', borderRadius: 20,
          }}>
            {isPublished ? '● Published' : '○ Accepted'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: '1rem', fontWeight: 700, lineHeight: 1.45, marginBottom: '0.75rem', color: 'var(--text)' }}>
          {pub.title}
        </h3>

        {/* Description */}
        <p style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1rem' }}>
          {pub.desc}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: pub.link ? '1rem' : 0 }}>
          {pub.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        {/* Link */}
        {pub.link && (
          <motion.a
            whileHover={{ x: 4 }}
            href={pub.link}
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: '0.78rem', color: 'var(--accent)', textDecoration: 'none',
              fontFamily: "'Fira Code', monospace", transition: 'color 0.2s',
            }}
          >
            View on IEEE Xplore →
          </motion.a>
        )}
      </div>
    </motion.div>
  )
}

export default function ResearchPage() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true })

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Research"
        title="Publications"
        description="Graph-of-Thoughts reasoning, Text-to-SQL augmentation, and LLM fine-tuning for structured data."
      />

      {/* Stats row */}
      <div ref={statsRef} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        {[
          { value: '2', label: 'Publications' },
          { value: 'IEEE', label: 'FLLM 2025' },
          { value: 'CSCI', label: '2025' },
          { value: 'GoT', label: 'Core Method' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{
              flex: 1, minWidth: 100,
              padding: '1rem 1.2rem', borderRadius: 12,
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              border: '1px solid var(--border)', textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 3 }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text2)', fontFamily: "'Fira Code', monospace" }}>{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Papers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
        {publications.map((p, i) => <PaperCard key={i} pub={p} index={i} />)}
      </div>

      {/* Research focus */}
      <div style={{
        padding: '1.4rem 1.6rem',
        borderRadius: 14,
        background: 'color-mix(in srgb, var(--accent) 5%, var(--surface))',
        border: '1px solid var(--border)',
        borderLeft: '3px solid var(--accent)',
      }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent)', marginBottom: '0.5rem', opacity: 0.8 }}>
          Research Focus
        </p>
        <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.7, margin: 0 }}>
          My research sits at the intersection of structured reasoning and LLM capabilities — specifically how Graph-of-Thoughts frameworks can improve data augmentation and fine-tuning pipelines for Text-to-SQL tasks. The goal is bridging the gap between academic NLP advances and production-grade enterprise systems.
        </p>
      </div>
    </section>
  )
}
