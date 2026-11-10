import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Brain, ExternalLink, FileText, GitBranch, Network } from 'lucide-react'
import SEO from '../components/SEO'
import TrainingTelemetry from '../components/TrainingTelemetry'
import Tag from '../components/Tag'
import CountValue from '../components/CountValue'
import { publications, researchDeepDives } from '../data/research'

function motionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function PublicationRow({ pub, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const year = pub.venue.match(/\b\d{4}\b/)?.[0] || '2025'

  return (
    <motion.article ref={ref} id={`paper-${index + 1}`} className="record-card" {...motionProps(reduceMotion, inView, index * 0.04)}>
      <div className="ledger-header">
        <span className="ledger-title">{pub.venue}</span>
        <span className="ledger-meta">{year}</span>
      </div>
      {pub.link ? (
        <a className="ledger-headline-link" href={pub.link} target="_blank" rel="noopener noreferrer">
          {pub.title} <ExternalLink size={18} aria-hidden="true" />
        </a>
      ) : (
        <h2 className="ledger-headline-link" style={{ margin: 0 }}>{pub.title}</h2>
      )}
      <p className="ledger-note">{pub.desc}</p>
      <div className="editorial-chip-list">
        {pub.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}
        <span className="editorial-chip">{pub.link ? 'IEEE Published' : 'Accepted'}</span>
      </div>
    </motion.article>
  )
}

const methodologySteps = [
  {
    label: 'NL Query',
    icon: FileText,
    description: 'Natural language question input from the user.',
  },
  {
    label: 'GoT Reasoning',
    icon: Network,
    description: 'Graph-of-Thoughts explores several reasoning paths.',
  },
  {
    label: 'SQL Augmentation',
    icon: GitBranch,
    description: 'Synthetic SQL examples improve edge-case coverage.',
  },
  {
    label: 'Fine-tuned LLM',
    icon: Brain,
    description: 'A domain-adapted model generates structured queries.',
  },
]

// ⚡ Bolt Optimization: Pre-calculate derived metrics from static data at the module level
// outside the component to avoid O(N) filtering operations on every render.
const published = publications.filter((p) => p.link).length
const accepted = publications.filter((p) => !p.link).length

export default function ResearchPage() {
  const reduceMotion = useReducedMotion()
  const [activeMethodNode, setActiveMethodNode] = useState(0)
  const activeStep = methodologySteps[activeMethodNode]

  return (
    <>
      <SEO
        title="Research | Himanshu Nakrani"
        description="Research publications and model training work across Text-to-SQL, Graph-of-Thoughts, fine-tuning, and pretraining."
      />
      <main className="mvp2-page editorial-page">
        <header className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · Research</p>
          <h1 className="editorial-page-title">
            Publications on <span className="gradient-text">structured reasoning</span>.
          </h1>
          <p className="editorial-page-lede">
            Structured reasoning, Text-to-SQL, and model training.
          </p>
        </header>

        <nav className="signal-index" aria-label="Research index">
          <a className="signal-index__card" href="#papers">
            <span className="signal-index__name">Papers</span>
            <CountValue className="signal-index__value" value={publications.length} />
            <span className="signal-index__meta">Selected<span>{published} published · {accepted} accepted</span></span>
          </a>
          <a className="signal-index__card" href="#method">
            <span className="signal-index__name">Method</span>
            <span className="signal-index__value">GoT</span>
            <span className="signal-index__meta">Pipeline<span>{methodologySteps.length} stages</span></span>
          </a>
          <a className="signal-index__card" href="#models">
            <span className="signal-index__name">Deep dives</span>
            <CountValue className="signal-index__value" value={researchDeepDives.length} />
            <span className="signal-index__meta">Models<span>Training write-ups</span></span>
          </a>
        </nav>

        <section id="papers" className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 02 ] · Papers</p>
          <h2 className="editorial-section-title">Selected papers</h2>
          <div className="record-grid">
            {publications.map((pub, index) => <PublicationRow key={pub.title} pub={pub} index={index} />)}
          </div>
        </section>

        <section id="method" className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 03 ] · Method</p>
          <h2 className="editorial-section-title">Graph-of-Thoughts pipeline</h2>
          <div role="group" aria-label="Graph-of-Thoughts methodology steps" className="signal-index">
            {methodologySteps.map((step, index) => {
              const active = activeMethodNode === index
              return (
                <button
                  key={step.label}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveMethodNode(index)}
                  className="signal-index__card"
                >
                  <span className="signal-index__name">Stage {String(index + 1).padStart(2, '0')}</span>
                  <span className="signal-index__value">{step.label}</span>
                  <span className="signal-index__meta">{active ? 'Selected' : 'Inspect'}<span>Graph-of-Thoughts</span></span>
                </button>
              )
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.label}
              className="record-card"
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <p className="ledger-subhead">Active stage</p>
              <h3 style={{ margin: '0 0 0.35rem', color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>{activeStep.label}</h3>
              <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>{activeStep.description}</p>
            </motion.div>
          </AnimatePresence>
        </section>

        <TrainingTelemetry />

        <section id="models" className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 04 ] · Models</p>
          <h2 className="editorial-section-title">Research deep dives</h2>
          <div className="record-grid">
            {researchDeepDives.map((item) => (
              <Link key={item.slug} to={`/research/${item.slug}`} className="record-card" style={{ textDecoration: 'none' }}>
                <div className="ledger-header">
                  <span className="ledger-title">Research</span>
                  <span className="ledger-meta">View <ArrowRight size={14} aria-hidden="true" /></span>
                </div>
                <h3 style={{ margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--line-height-tight)' }}>{item.shortTitle}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>{item.summary}</p>
                <div className="editorial-chip-list">
                  {item.metrics.slice(0, 2).map((metric) => <span key={metric.label} className="editorial-chip">{metric.value} {metric.label}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 05 ] · Focus</p>
          <h2 className="editorial-section-title">Research interests</h2>
          <div className="editorial-chip-list">
            {['Graph-of-Thoughts', 'Text-to-SQL', 'LLM Fine-tuning', 'Data Augmentation', 'Structured Reasoning', 'NL Interfaces'].map((tag) => <span key={tag} className="editorial-chip">{tag}</span>)}
          </div>
          <p className="editorial-section-lede" style={{ marginTop: '1.5rem' }}>
            Focused on practical structured-data systems.
          </p>
        </section>
      </main>
    </>
  )
}
