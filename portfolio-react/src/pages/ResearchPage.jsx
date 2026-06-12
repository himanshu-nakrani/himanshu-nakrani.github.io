import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Award, Brain, ExternalLink, FileText, GitBranch, Network, TrendingUp } from 'lucide-react'
import SEO from '../components/SEO'
import Tag from '../components/Tag'
import { publications, researchDeepDives } from '../data/research'

function motionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function ResearchStat({ value, label, icon: Icon, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div ref={ref} className="editorial-stat" {...motionProps(reduceMotion, inView, index * 0.06)}>
      <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
      <span className="editorial-stat-num">{value}</span>
      <span className="editorial-stat-label">{label}</span>
    </motion.div>
  )
}

function PublicationRow({ pub, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const number = String(index + 1).padStart(2, '0')
  const year = pub.venue.match(/\b\d{4}\b/)?.[0] || '2025'

  return (
    <motion.article ref={ref} className="ledger-row section-hairline" {...motionProps(reduceMotion, inView, index * 0.04)}>
      <span className="section-ghost-num" aria-hidden="true">{number}</span>
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
    description: 'Natural language question input from user - e.g., "What were the top performing funds last quarter?"',
  },
  {
    label: 'GoT Reasoning',
    icon: Network,
    description: 'Graph-of-Thoughts decomposes complex queries into sub-problems, exploring multiple reasoning paths simultaneously.',
  },
  {
    label: 'SQL Augmentation',
    icon: GitBranch,
    description: 'High-quality synthetic SQL examples generated for training data, improving model accuracy on edge cases.',
  },
  {
    label: 'Fine-tuned LLM',
    icon: Brain,
    description: 'Domain-adapted language model trained on augmented data, optimized for structured query generation.',
  },
]

export default function ResearchPage() {
  const reduceMotion = useReducedMotion()
  const [activeMethodNode, setActiveMethodNode] = useState(0)
  const published = publications.filter((p) => p.link).length
  const accepted = publications.filter((p) => !p.link).length
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
            Graph-of-Thoughts reasoning, Text-to-SQL augmentation, and LLM fine-tuning for structured data.
          </p>
        </header>

        <section className="editorial-section section-hairline" aria-label="Research statistics">
          <div className="editorial-stat-grid">
            {[
              { value: publications.length, label: 'Papers', icon: FileText },
              { value: published, label: 'Published', icon: Award },
              { value: accepted, label: 'Accepted', icon: TrendingUp },
              { value: 'GoT', label: 'Core Method', icon: Network },
            ].map((stat, index) => <ResearchStat key={stat.label} {...stat} index={index} />)}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">02</span>
          <p className="editorial-kicker">[ 02 ] · Papers</p>
          <h2 className="editorial-section-title">Selected papers</h2>
          <div>{publications.map((pub, index) => <PublicationRow key={pub.title} pub={pub} index={index} />)}</div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">03</span>
          <p className="editorial-kicker">[ 03 ] · Method</p>
          <h2 className="editorial-section-title">Graph-of-Thoughts pipeline</h2>
          <div className="editorial-grid-2">
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {methodologySteps.map((step, index) => {
                const Icon = step.icon
                const active = activeMethodNode === index
                return (
                  <button
                    key={step.label}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveMethodNode(index)}
                    className={`editorial-card${active ? ' is-active' : ''}`}
                    style={{ padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem', textAlign: 'left', cursor: 'pointer' }}
                  >
                    <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
                    <span style={{ color: active ? 'var(--color-accent)' : 'var(--color-text)', fontWeight: 'var(--font-weight-semibold)' }}>{step.label}</span>
                  </button>
                )
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.label}
                className="editorial-card"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                style={{ padding: '1.25rem' }}
              >
                <p className="ledger-subhead">Active node</p>
                <h3 style={{ margin: '0 0 0.75rem', color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>{activeStep.label}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>{activeStep.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">04</span>
          <p className="editorial-kicker">[ 04 ] · Models</p>
          <h2 className="editorial-section-title">Research deep dives</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {researchDeepDives.map((item) => (
              <Link key={item.slug} to={`/research/${item.slug}`} className="editorial-card" style={{ padding: '1.2rem', textDecoration: 'none', display: 'grid', gap: '0.75rem' }}>
                <div className="ledger-header">
                  <span className="ledger-title">Research</span>
                  <span className="ledger-meta">View <ArrowRight size={14} aria-hidden="true" /></span>
                </div>
                <h3 style={{ margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--line-height-tight)' }}>{item.shortTitle}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>{item.summary}</p>
                <div className="editorial-chip-list">
                  {item.metrics.slice(0, 3).map((metric) => <span key={metric.label} className="editorial-chip">{metric.value} {metric.label}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">05</span>
          <p className="editorial-kicker">[ 05 ] · Focus</p>
          <h2 className="editorial-section-title">Research interests</h2>
          <div className="editorial-chip-list">
            {['Graph-of-Thoughts', 'Text-to-SQL', 'LLM Fine-tuning', 'Data Augmentation', 'Structured Reasoning', 'NL Interfaces'].map((tag) => <span key={tag} className="editorial-chip">{tag}</span>)}
          </div>
          <p className="editorial-section-lede" style={{ marginTop: '1.5rem' }}>
            My research explores how Graph-of-Thoughts frameworks can improve data augmentation and fine-tuning pipelines for Text-to-SQL tasks, with an eye toward practical structured-data systems.
          </p>
        </section>
      </main>
    </>
  )
}
