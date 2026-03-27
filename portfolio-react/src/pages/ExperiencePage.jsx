import { motion } from 'framer-motion'
import ExperienceCard from '../components/ExperienceCard'
import { experience } from '../data'

export default function ExperiencePage() {
  return (
    <section style={{ padding: '110px 2rem 80px', maxWidth: 1100, margin: '0 auto' }}>
      <div style={{ marginBottom: '2.25rem' }}>
        <p style={{ color: 'var(--nav-dot)', fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: 10 }}>
          EXPERIENCE LOG
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.85rem)', lineHeight: 1.1, marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Career timeline
        </h1>
        <p style={{ color: 'var(--text2)', maxWidth: 640, fontSize: '1rem', lineHeight: 1.65 }}>
          Enterprise AI software — RAG, LLM backends, and production systems at scale.
        </p>
      </div>

      <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: 12,
            bottom: 12,
            width: 2,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, var(--nav-dot), var(--accent) 35%, rgba(74, 158, 255, 0.12))',
            boxShadow: '0 0 20px rgba(167, 139, 250, 0.12)',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {experience.map((item, i) => (
            <div key={`${item.company}-${item.role}-${item.period}`} style={{ position: 'relative' }}>
              <motion.div
                initial={false}
                whileHover={{ scale: 1.12 }}
                style={{
                  position: 'absolute',
                  left: -34,
                  top: 22,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                  border: '3px solid var(--bg)',
                  boxShadow: '0 0 0 4px rgba(167, 139, 250, 0.15), 0 0 18px rgba(74, 158, 255, 0.35)',
                  zIndex: 2,
                }}
              />
              <ExperienceCard item={item} index={i} animateEntry />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
