import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import {
  Award,
  BookOpen,
  Briefcase,
  GitBranch,
  Github,
  Linkedin,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react'
import SEO from '../components/SEO'
import { useCountUp } from '../hooks/useCountUp'

function motionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function StatCell({ value, label, icon: Icon, inView, reduceMotion, index }) {
  const numericMatch = value.match(/^(\d+)(.*)$/)
  const numeric = numericMatch ? parseInt(numericMatch[1], 10) : 0
  const suffix = numericMatch ? numericMatch[2] : value
  const count = useCountUp(numeric, 1200, inView)

  return (
    <motion.div
      className="editorial-stat"
      {...motionProps(reduceMotion, inView, index * 0.06)}
    >
      <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
      <span className="editorial-stat-num">{numericMatch ? <motion.span>{count}</motion.span> : value}{numericMatch ? suffix : ''}</span>
      <span className="editorial-stat-label">{label}</span>
    </motion.div>
  )
}

function TimelineList({ items, reduceMotion }) {
  return (
    <div>
      {items.map((item, index) => (
        <motion.article
          key={`${item.year}-${item.title}`}
          className="ledger-row section-hairline"
          {...motionProps(reduceMotion, true, index * 0.04)}
        >
          <span className="section-ghost-num" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="ledger-header">
            <span className="ledger-title">{item.subtitle}</span>
            <span className="ledger-meta">{item.year}</span>
          </div>
          <h3 className="ledger-headline-link" style={{ margin: 0 }}>{item.title}</h3>
          <p className="ledger-note">{item.description}</p>
        </motion.article>
      ))}
    </div>
  )
}

const stats = [
  { value: '3+', label: 'Years Experience', icon: Briefcase },
  { value: '10+', label: 'Business Units', icon: Users },
  { value: '200+', label: 'Total Users', icon: Users },
  { value: '75%', label: 'Avg Latency Cut', icon: Zap },
  { value: '2', label: 'Publications', icon: BookOpen },
]

const techStack = [
  { name: 'Python', category: 'Language' },
  { name: 'LangChain', category: 'Framework' },
  { name: 'PyTorch', category: 'ML' },
  { name: 'FastAPI', category: 'Backend' },
  { name: 'React', category: 'Frontend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'LlamaIndex', category: 'Framework' },
  { name: 'Transformers', category: 'ML' },
]

const journey = [
  {
    year: '2023 - Present',
    title: 'AI Software Developer',
    subtitle: 'State Street Corporation',
    description: 'Building LLM systems for financial-data workflows: Text-to-SQL, RAG, agent tooling, and evaluation.',
  },
  {
    year: '2025',
    title: 'Published Researcher',
    subtitle: 'IEEE FLLM & CSCI',
    description: 'Graph-of-Thoughts reasoning for Text-to-SQL augmentation.',
  },
  {
    year: '2022',
    title: 'ML Summer School',
    subtitle: 'Amazon',
    description: 'Selected for Amazon ML Summer School program.',
  },
]

const values = [
  { icon: Target, title: 'Ship What Works', description: 'Production-first mindset. AI that solves real problems.' },
  { icon: TrendingUp, title: 'Continuous Growth', description: 'Always exploring new research and pushing boundaries.' },
  { icon: GitBranch, title: 'Open Source', description: 'Contributing to community and sharing knowledge.' },
]

const certifications = [
  { name: 'OCI Generative AI Professional', issuer: 'Oracle' },
  { name: 'AWS ML Foundations', issuer: 'Udacity' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks' },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const inView = useInView(heroRef, { once: true })
  const reduceMotion = useReducedMotion()

  return (
    <>
      <SEO
        title="About | Himanshu Nakrani"
        description="Learn about Himanshu Nakrani's AI engineering background, production LLM work, skills, and career focus."
      />
      <main className="mvp2-page editorial-page">
        <header ref={heroRef} className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · About</p>
          <h1 className="editorial-page-title">
            I build <span className="gradient-text">LLM systems</span> for financial-data workflows.
          </h1>
          <p className="editorial-page-lede">
            At State Street Corporation, my work spans Text-to-SQL, RAG, agent tooling,
            backend APIs, retrieval systems, model adaptation, and observability.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            <a href="https://github.com/himanshu-nakrani" target="_blank" rel="noopener noreferrer" className="btn btn--primary">
              <Github size={16} aria-hidden="true" />
              View GitHub
            </a>
            <a href="https://www.linkedin.com/in/himanshu-nakrani/" target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              <Linkedin size={16} aria-hidden="true" />
              LinkedIn
            </a>
          </div>
        </header>

        <section className="editorial-section section-hairline" aria-label="Career statistics">
          <div className="editorial-stat-grid">
            {stats.map((stat, index) => (
              <StatCell
                key={stat.label}
                {...stat}
                index={index}
                inView={inView}
                reduceMotion={reduceMotion}
              />
            ))}
          </div>
        </section>

        <blockquote className="editorial-pullquote">
          Production-first mindset. AI that solves real problems.
        </blockquote>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">02</span>
          <p className="editorial-kicker">[ 02 ] · Stack</p>
          <h2 className="editorial-section-title">Tools I reach for.</h2>
          <div className="editorial-chip-list">
            {techStack.map((tech) => (
              <span key={tech.name} className="editorial-chip">
                {tech.name} · {tech.category}
              </span>
            ))}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">03</span>
          <p className="editorial-kicker">[ 03 ] · Timeline</p>
          <h2 className="editorial-section-title">Journey</h2>
          <TimelineList items={journey} reduceMotion={reduceMotion} />
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">04</span>
          <p className="editorial-kicker">[ 04 ] · Philosophy</p>
          <h2 className="editorial-section-title">How I work.</h2>
          <div className="editorial-grid-2">
            <div style={{ display: 'grid', gap: '0.85rem' }}>
              {values.map((value) => (
                <article key={value.title} className="editorial-card" style={{ padding: '1.1rem 1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <value.icon size={18} color="var(--color-accent)" aria-hidden="true" />
                    <div>
                      <h3 style={{ margin: '0 0 0.25rem', color: 'var(--color-text)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>
                        {value.title}
                      </h3>
                      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-relaxed)' }}>
                        {value.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div>
              <p className="ledger-subhead">Certifications</p>
              <div style={{ display: 'grid', gap: '0.65rem' }}>
                {certifications.map((cert) => (
                  <article key={cert.name} className="editorial-card" style={{ padding: '0.9rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <Award size={16} color="var(--color-accent)" aria-hidden="true" />
                      <div>
                        <p style={{ margin: 0, color: 'var(--color-text)', fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>{cert.name}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>{cert.issuer}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
