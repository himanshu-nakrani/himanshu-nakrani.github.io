import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

export function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { numeric: 0, suffix: value }
  return { numeric: parseInt(match[1], 10), suffix: match[2] }
}

export function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return
    started.current = true
    let rafId
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return active ? count : 0
}

function AnimatedStat({ value, label, delay, inView }) {
  const { numeric, suffix } = parseStatValue(value)
  const count = useCountUp(numeric, 800, inView)
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1, marginBottom: 4 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--text2)', letterSpacing: '0.01em' }}>
        {label}
      </div>
    </motion.div>
  )
}

function HighlightCard({ title, description, index, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: 0.25 + index * 0.1 }}
      whileHover={{ y: -3 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        padding: '1.3rem',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div
        style={{
          height: '2px',
          width: hovered ? '100%' : '2rem',
          background: 'var(--accent)',
          marginBottom: '0.75rem',
          transition: 'width 0.3s ease',
        }}
      />
      <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.65, margin: 0 }}>
        {description}
      </p>
    </motion.div>
  )
}

const stats = [
  { value: '2+', label: 'Years at State Street' },
  { value: '100+', label: 'Users served' },
  { value: '75%', label: 'Latency reduction' },
  { value: '2', label: 'IEEE publications' },
]

const highlights = [
  {
    title: 'Production AI Systems',
    description: 'Building LLM-powered applications at enterprise scale — Text-to-SQL, RAG pipelines, and AI agent platforms serving real users in financial services.',
  },
  {
    title: 'Published Researcher',
    description: 'Published at IEEE FLLM 2025 and CSCI 2025 on Graph-of-Thoughts reasoning for Text-to-SQL data augmentation and fine-tuning.',
  },
  {
    title: 'Performance Engineering',
    description: 'Obsessed with latency and reliability — achieved 75% response time reduction through caching, query optimization, and architectural improvements.',
  },
]

export default function AboutBrief() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{
          borderLeft: '2px solid var(--accent)',
          paddingLeft: '1.25rem',
          maxWidth: '640px',
          marginBottom: '2.5rem',
        }}
      >
        <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.8, margin: 0 }}>
          I'm an AI Software Developer at State Street Corporation, building enterprise LLM systems that turn complex financial data into accessible insights. I work across the full stack — from fine-tuning models to shipping production APIs — with a focus on systems that actually work at scale.
        </p>
      </motion.div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border)' }}>
        {stats.map((s, i) => (
          <AnimatedStat
            key={s.label}
            value={s.value}
            label={s.label}
            delay={0.1 + i * 0.08}
            inView={inView}
          />
        ))}
      </div>

      {/* Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '1.5rem' }}>
        {highlights.map((item, i) => (
          <HighlightCard
            key={item.title}
            title={item.title}
            description={item.description}
            index={i}
            inView={inView}
          />
        ))}
      </div>
    </div>
  )
}
