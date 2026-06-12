import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, ChevronRight, Layers, Sparkles, TrendingUp } from 'lucide-react'
import DataIcon from '../components/DataIcon'
import SEO from '../components/SEO'
import { certifications, skills } from '../data/skills'

const PRIMARY_STACK = [
  { name: 'Python', icon: 'Code2', note: 'Primary language', years: 4, featured: true },
  { name: 'FastAPI', icon: 'Zap', note: 'Backend APIs', years: 2 },
  { name: 'LangChain', icon: 'Link', note: 'LLM orchestration', years: 1.5 },
  { name: 'Azure OpenAI', icon: 'Cloud', note: 'LLM infrastructure', years: 1.5, featured: true },
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

function StackCard({ tool, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      ref={ref}
      className="editorial-card"
      {...motionProps(reduceMotion, inView, index * 0.04)}
      style={{ padding: tool.featured ? '1.35rem' : '1rem', gridColumn: tool.featured ? 'span 2' : 'span 1', display: 'grid', gap: '0.65rem' }}
    >
      <span style={{ color: 'var(--color-accent)', lineHeight: 1 }}><DataIcon name={tool.icon} size={tool.featured ? 28 : 22} /></span>
      <div>
        <h3 style={{ margin: '0 0 0.25rem', color: 'var(--color-text)', fontSize: tool.featured ? 'var(--text-lg)' : 'var(--text-base)', fontWeight: 'var(--font-weight-semibold)' }}>{tool.name}</h3>
        <p style={{ margin: 0, color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>{tool.note}</p>
      </div>
      <span className="editorial-chip" style={{ width: 'fit-content' }}>{tool.years}+ yrs</span>
    </motion.article>
  )
}

function SkillCategoryRow({ group, index, isExpanded, onToggle }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      ref={ref}
      className="ledger-row section-hairline"
      style={{ '--ledger-accent': resolveSkillColor(group.color) }}
      {...motionProps(reduceMotion, inView, index * 0.04)}
    >
      <span className="section-ghost-num" aria-hidden="true">{number}</span>
      <button
        type="button"
        className="ledger-header"
        aria-expanded={isExpanded}
        onClick={onToggle}
        style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer', textAlign: 'left' }}
      >
        <span className="ledger-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}>
          <DataIcon name={group.icon} size={18} />
          {group.label}
        </span>
        <span className="ledger-meta">
          {group.items.length} skills
          <motion.span animate={reduceMotion ? { rotate: 0 } : { rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={14} aria-hidden="true" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="editorial-chip-list" style={{ paddingTop: '0.25rem' }}>
              {group.items.map((item) => <span key={item} className="editorial-chip">{item}</span>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

export default function SkillsPage() {
  const [expandedCategory, setExpandedCategory] = useState(skills[0]?.label || null)
  const totalSkills = skills.reduce((acc, group) => acc + group.items.length, 0)

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
            Technologies I work with daily, from LLM backends to cloud infrastructure.
          </p>
        </header>

        <section className="editorial-section section-hairline" aria-label="Skills statistics">
          <div className="editorial-stat-grid">
            {[
              { icon: Layers, value: `${totalSkills}+`, label: 'Total Skills' },
              { icon: Sparkles, value: skills.length, label: 'Domains' },
              { icon: TrendingUp, value: '3', label: 'Cloud Platforms' },
              { icon: Award, value: certifications.length, label: 'Certifications' },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="editorial-stat">
                  <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
                  <span className="editorial-stat-num">{stat.value}</span>
                  <span className="editorial-stat-label">{stat.label}</span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">02</span>
          <p className="editorial-kicker">[ 02 ] · Core</p>
          <h2 className="editorial-section-title">Core technologies</h2>
          <div className="skills-bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
            {PRIMARY_STACK.map((tool, index) => <StackCard key={tool.name} tool={tool} index={index} />)}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">03</span>
          <p className="editorial-kicker">[ 03 ] · Domains</p>
          <h2 className="editorial-section-title">All skills by domain</h2>
          <div>
            {skills.map((group, index) => (
              <SkillCategoryRow
                key={group.label}
                group={group}
                index={index}
                isExpanded={expandedCategory === group.label}
                onToggle={() => setExpandedCategory(expandedCategory === group.label ? null : group.label)}
              />
            ))}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">04</span>
          <p className="editorial-kicker">[ 04 ] · Credentials</p>
          <h2 className="editorial-section-title">Certifications</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '0.75rem' }}>
            {certifications.map((cert) => (
              <article key={cert.title} className="editorial-card" style={{ padding: '1rem 1.1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <DataIcon name={cert.icon} size={18} />
                <h3 style={{ margin: 0, color: 'var(--color-text)', fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-snug)', fontWeight: 'var(--font-weight-semibold)' }}>{cert.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <style>{`
          @media (max-width: 900px) {
            .skills-bento-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 520px) {
            .skills-bento-grid { grid-template-columns: 1fr !important; }
            .skills-bento-grid > article { grid-column: span 1 !important; }
          }
        `}</style>
      </main>
    </>
  )
}
