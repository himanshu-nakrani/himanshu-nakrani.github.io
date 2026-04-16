import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import { kaggleContributionMap, kagglePinned } from '../data'
import KaggleHeatmap from './KaggleHeatmap'

function KaggleCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      ref={ref}
      href={item.link}
      target="_blank"
      rel="noopener"
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        borderRadius: 14, padding: '1.2rem',
        textDecoration: 'none', color: 'var(--text)',
        display: 'flex', flexDirection: 'column', gap: '0.5rem',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.7rem', fontFamily: "'Fira Code', monospace",
          padding: '2px 9px', borderRadius: 20, border: '1px solid',
          ...(item.type === 'notebook'
            ? { color: 'var(--accent3)', borderColor: 'rgba(79,195,247,0.3)', background: 'rgba(79,195,247,0.08)' }
            : { color: 'var(--green)', borderColor: 'rgba(22,163,74,0.3)', background: 'rgba(22,163,74,0.08)' }),
        }}>
          {item.type === 'notebook' ? '📓 Notebook' : '🗂️ Dataset'}
        </span>
        {item.medal && <span style={{ fontSize: '1rem' }}>{item.medal}</span>}
      </div>
      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.35 }}>{item.title}</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--text2)', lineHeight: 1.5, flex: 1 }}>{item.desc}</p>
      <span style={{ fontSize: '0.72rem', color: 'var(--accent3)', fontFamily: "'Fira Code', monospace" }}>▲ {item.votes} upvotes</span>
    </motion.a>
  )
}

export default function Kaggle() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="kaggle" title="Kaggle">
      <div ref={ref}>
        {/* Tier cards */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', width: '100%' }}>
          {[
            { title: 'Datasets Expert', rank: '1,240', total: '8,780', highest: '241', silver: 3, bronze: 4 },
            { title: 'Notebooks Expert', rank: '3,034', total: '60,181', highest: '479', silver: 1, bronze: 16 },
          ].map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ borderColor: 'var(--border2)', y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)', borderRadius: 16,
                padding: '1.4rem', flex: 1, minWidth: 'min(100%, 240px)',
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <img src="https://www.kaggle.com/static/images/tiers/expert.svg" alt="Expert" style={{ width: 44, height: 44, flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 4 }}>{tier.title}</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--text2)', marginBottom: 8 }}>
                  Rank <strong style={{ color: 'var(--text)' }}>{tier.rank}</strong> of {tier.total} · Highest: {tier.highest}
                </p>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(192,192,192,0.08)', border: '1px solid rgba(192,192,192,0.25)', color: '#c0c0c0' }}>🥈 {tier.silver} Silver</span>
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(205,127,50,0.08)', border: '1px solid rgba(205,127,50,0.25)', color: '#cd7f32' }}>🥉 {tier.bronze} Bronze</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem', marginBottom: '2.5rem' }} className="kag-stats-grid">
          {[['59', 'Notebooks'], ['13', 'Datasets'], ['4', 'Competitions'], ['52', 'Followers']].map(([num, label], i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              whileHover={{ y: -3 }}
              style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', textAlign: 'center',
                transition: 'transform 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ fontSize: '1.7rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent3), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1 }}>{num}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 3, position: 'relative', zIndex: 1 }}>{label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.22 }}
          style={{ marginBottom: '2rem' }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              color: 'var(--text2)',
              fontFamily: "'Fira Code', monospace",
              letterSpacing: '0.12em',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            Activity heatmap
          </p>
          <div
            className="kaggle-heatmap-wrap"
            style={{
              borderRadius: 14,
              border: '1px solid var(--border)',
              overflow: 'auto',
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <KaggleHeatmap contributionMap={kaggleContributionMap} />
          </div>
        </motion.div>

        <p style={{ fontSize: '0.78rem', color: 'var(--text2)', fontFamily: "'Fira Code', monospace", textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.2rem' }}>Pinned Work</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {kagglePinned.map((item, i) => <KaggleCard key={i} item={item} index={i} />)}
        </div>

        <motion.a
          href="https://www.kaggle.com/himanshunakrani"
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderColor: 'var(--border2)' }}
          style={{
            display: 'inline-block', border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)', padding: '11px 24px', borderRadius: 10,
            textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
View full Kaggle profile →
        </motion.a>
      </div>
      <style>{`
        @media (max-width: 600px) { .kag-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        .kaggle-heatmap-wrap { -webkit-overflow-scrolling: touch; }
      `}</style>
    </Section>
  )
}
