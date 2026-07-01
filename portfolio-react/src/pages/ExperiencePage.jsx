import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SEO from '../components/SEO'
import { experience } from '../data/experience'

function getMotionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

// ⚡ Bolt Optimization: Move static regex patterns outside to avoid O(n) instantiations during render.
const METRIC_PATTERNS = [
  { regex: /200\+[^.]*users/i, value: '200+', label: 'Total users' },
  { regex: /100\+[^.]*users/i, value: '100+', label: 'Internal users' },
  { regex: /75%[^.]*reduction|75% latency/i, value: '75%', label: 'Latency reduction' },
  { regex: /95%\+[^.]*coverage/i, value: '95%+', label: 'Test coverage' },
  { regex: /25%[^.]*accuracy/i, value: '25%', label: 'SQL accuracy lift' },
  { regex: /40%[^.]*performance/i, value: '40%', label: 'Performance lift' },
  { regex: /87%[^.]*accuracy/i, value: '87%', label: 'Model accuracy' },
]

function extractMetrics(item) {
  const source = [item.description, ...(item.bullets || [])].join(' ')
  return METRIC_PATTERNS.filter((metric) => metric.regex.test(source)).map(({ value, label }) => ({ value, label }))
}

// ⚡ Bolt Optimization: Pre-compute static metrics outside of render cycle
// to prevent expensive string allocations and regex evaluations during scroll interactions.
const EXPERIENCE_WITH_METRICS = experience.map((item) => ({
  ...item,
  _metrics: extractMetrics(item),
}))

function RoleRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const metrics = item._metrics || []
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      ref={ref}
      className="ledger-row section-hairline"
      {...getMotionProps(reduceMotion, inView)}
    >
      <span className="section-ghost-num" aria-hidden="true">{number}</span>

      <div className="ledger-header">
        <span className="ledger-title">{item.company}</span>
        <span className="ledger-meta">{item.period}</span>
      </div>

      <div>
        <h2 className="ledger-headline-link" style={{ margin: '0 0 0.5rem' }}>{item.role}</h2>
        <p className="ledger-note">{item.location}</p>
      </div>

      {item.progression && (
        <p className="ledger-note" style={{ color: 'var(--color-accent)' }}>
          {item.progression}
        </p>
      )}

      {metrics.length > 0 && (
        <div className="ledger-stat-band" aria-label={`${item.role} impact metrics`}>
          {metrics.map((metric) => (
            <div key={metric.label} className="ledger-stat">
              <span className="ledger-stat-num">{metric.value}</span>
              <span className="ledger-stat-label">{metric.label}</span>
            </div>
          ))}
        </div>
      )}

      <p className="ledger-note" style={{ maxWidth: '58rem' }}>{item.description}</p>

      {item.bullets && item.bullets.length > 0 && (
        <ul style={{ display: 'grid', gap: '0.65rem', margin: 0, padding: 0, listStyle: 'none' }}>
          {item.bullets.map((bullet) => (
            <li key={bullet} style={{ display: 'flex', gap: '0.65rem', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)', flexShrink: 0, marginTop: '0.75em' }} />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {item.tags && item.tags.length > 0 && (
        <div className="editorial-chip-list">
          {item.tags.map((tag) => (
            <span key={tag} className="editorial-chip">{tag}</span>
          ))}
        </div>
      )}
    </motion.article>
  )
}

export default function ExperiencePage() {
  return (
    <>
      <SEO
        title="Experience | Himanshu Nakrani"
        description="Career timeline covering LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial workflows."
      />
      <main className="mvp2-page editorial-page">
        <header className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · Experience</p>
          <h1 className="editorial-page-title">
            Career timeline built around <span className="gradient-text">production AI</span>.
          </h1>
          <p className="editorial-page-lede">
            LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial-data workflows.
          </p>
        </header>

        <section aria-label="Experience ledger">
          {EXPERIENCE_WITH_METRICS.map((item, index) => (
            <RoleRow key={`${item.company}-${item.period}`} item={item} index={index} />
          ))}
        </section>
      </main>
    </>
  )
}
