import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import DataIcon from '../components/DataIcon'
import SEO from '../components/SEO'
import CountValue from '../components/CountValue'
import { certifications, skills } from '../data/skills'

const PRIMARY_STACK = [
  { name: 'Python', icon: 'Code2', note: 'Primary language', years: 4, featured: true },
  { name: 'FastAPI', icon: 'Zap', note: 'Backend APIs', years: 2 },
  { name: 'LangChain', icon: 'Link', note: 'LLM orchestration', years: 1.5 },
  { name: 'Azure OpenAI', icon: 'Cloud', note: 'LLM infrastructure', years: 1.5, featured: true },
  { name: 'AWS', icon: 'Cloud', note: 'Cloud & AI services' },
  { name: 'PostgreSQL', icon: 'Database', note: 'Primary database', years: 3 },
  { name: 'pgvector', icon: 'Hash', note: 'Vector search', years: 1 },
  { name: 'RAG', icon: 'BookOpen', note: 'Retrieval AI', years: 1.5 },
  { name: 'Docker', icon: 'Box', note: 'Containers', years: 2 },
]

function motionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function resolveSkillColor(color) {
  const legacyAccent = 'var(--' + 'accent)'
  const legacyAccent2 = 'var(--' + 'accent2)'
  const legacyAccent3 = 'var(--' + 'accent3)'
  const legacyNavDot = 'var(--' + 'nav-dot)'

  return color
    .replace(legacyAccent2, 'var(--color-accent-secondary)')
    .replace(legacyAccent3, 'var(--color-cat-4)')
    .replace(legacyAccent, 'var(--color-accent)')
    .replace(legacyNavDot, 'var(--color-accent)')
}

function domainAnchor(label) {
  return `skill-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
}

function StackCard({ tool, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      className={`editorial-card stack-card${tool.featured ? ' stack-card--featured' : ''}`}
      {...motionProps(reduceMotion, inView, index * 0.04)}
    >
      <span style={{ color: 'var(--color-accent)', lineHeight: 1 }}><DataIcon name={tool.icon} size={22} /></span>
      <div>
        <h3 style={{ margin: '0 0 0.25rem', color: 'var(--color-text)', fontSize: 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>{tool.name}</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{tool.note}</p>
      </div>
      {tool.years != null && <span className="editorial-chip" style={{ width: 'fit-content' }}>{tool.years}+ yrs</span>}
    </motion.article>
  )
}

function SkillDomainCard({ group, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      id={domainAnchor(group.label)}
      className="record-card"
      style={{ '--ledger-accent': resolveSkillColor(group.color) }}
      {...motionProps(reduceMotion, inView, index * 0.04)}
    >
      <div className="ledger-header">
        <span className="ledger-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
          <DataIcon name={group.icon} size={18} />
          {group.label}
        </span>
        <span className="ledger-meta">{group.items.length}</span>
      </div>
      <div className="editorial-chip-list">
        {group.items.map((item) => <span key={item} className="editorial-chip">{item}</span>)}
      </div>
    </motion.article>
  )
}


export default function SkillsPage() {
  return (
    <>
      <SEO
        title="Skills | Himanshu Nakrani"
        description="AI engineering, backend, cloud, data, and frontend skill matrix for production LLM systems."
      />
      <main className="mvp2-page editorial-page">
        <header className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · Tech Stack</p>
          <h1 className="editorial-page-title">
            Skills for <span className="gradient-text">production LLM</span> systems.
          </h1>
          <p className="editorial-page-lede">
            Core tools for backend AI systems.
          </p>
        </header>

        <nav className="signal-index" aria-label="Skill domains">
          {skills.map((group) => (
            <a key={group.label} className="signal-index__card" href={`#${domainAnchor(group.label)}`} style={{ '--profile-platform-color': resolveSkillColor(group.color) }}>
              <span className="signal-index__name">{group.label}</span>
              <CountValue className="signal-index__value" value={group.items.length} />
              <span className="signal-index__meta">Skills<span>{group.items[0]}</span></span>
            </a>
          ))}
        </nav>

        <section id="core-stack" className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 02 ] · Core</p>
          <h2 className="editorial-section-title">Core technologies</h2>
          <div className="skills-bento-grid">
            {PRIMARY_STACK.map((tool, index) => <StackCard key={tool.name} tool={tool} index={index} />)}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 03 ] · Domains</p>
          <h2 className="editorial-section-title">All skills by domain</h2>
          <div className="record-grid record-grid--3">
            {skills.map((group, index) => (
              <SkillDomainCard key={group.label} group={group} index={index} />
            ))}
          </div>
        </section>

        <section id="certifications" className="editorial-section section-hairline">
          <p className="editorial-kicker">[ 04 ] · Credentials</p>
          <h2 className="editorial-section-title">Certifications</h2>
          <div className="record-grid record-grid--3">
            {certifications.map((cert) => {
              const content = (
                <>
                  <DataIcon name={cert.icon} size={18} />
                  <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)', flex: 1 }}>{cert.title}</h3>
                  {cert.href && <ExternalLink size={14} color="var(--color-text-subtle)" aria-hidden="true" />}
                </>
              )
              const cardStyle = {
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: 'inherit',
                textDecoration: 'none',
              }

              return (
                <article key={cert.title} className="record-card">
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View credential for ${cert.title}`}
                      style={cardStyle}
                    >
                      {content}
                    </a>
                  ) : (
                    <div style={cardStyle}>{content}</div>
                  )}
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
