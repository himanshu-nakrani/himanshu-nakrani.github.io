import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart2, Code2, ExternalLink, Filter, FolderGit2, Lock, Rocket, Search, X } from 'lucide-react'
import DataIcon from '../components/DataIcon'
import SEO from '../components/SEO'
import Tag from '../components/Tag'
import { projects, technicalCaseStudies } from '../data/projects'

const FEATURED_TAGS = ['Text-to-SQL', 'RAG', 'LLM', 'FastAPI', 'Deep Learning', 'Python', 'AI Agents', 'LSTM']
const deepDiveSlugs = new Set(technicalCaseStudies.map((study) => study.slug))

const pageStats = [
  { value: projects.length, label: 'Total', icon: FolderGit2 },
  { value: projects.filter((p) => p.badge === 'Production').length, label: 'Production', icon: Rocket },
  { value: projects.filter((p) => p.link).length, label: 'Open Source', icon: Code2 },
  { value: projects.filter((p) => p.metrics).length, label: 'With Metrics', icon: BarChart2 },
]

// ⚡ Bolt Optimization: Pre-compute static lowercased strings outside of render cycle
// to prevent O(n) object allocations and redundant transformations inside the filter loop.
const PROJECTS_WITH_SEARCH = projects.map(p => ({
  ...p,
  _searchKey: `${p.title} ${p.desc}`.toLowerCase(),
  // ⚡ Bolt Optimization: Pre-compute Set for tags to allow O(1) lookup in filter loop
  // instead of using Array.includes() which would cause O(N x M) time complexity
  _tagsSet: new Set(p.tags || []),
}))

function getDeepDiveSlug(title) {
  const slug = title.toLowerCase().replace(/\s+/g, '-')
  if (deepDiveSlugs.has(slug)) return slug
  const match = technicalCaseStudies.find((study) => study.title === title)
  return match ? match.slug : null
}

function motionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) return { initial: false, animate: { opacity: 1, y: 0 } }
  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function PageStat({ stat, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const Icon = stat.icon

  return (
    <motion.div ref={ref} className="editorial-stat" {...motionProps(reduceMotion, inView, index * 0.06)}>
      <Icon size={18} color="var(--color-accent)" aria-hidden="true" />
      <span className="editorial-stat-num">{stat.value}</span>
      <span className="editorial-stat-label">{stat.label}</span>
    </motion.div>
  )
}

function MetricStrip({ metrics, compact = false }) {
  if (!metrics?.length) return null
  const numStyle = compact
    ? { fontSize: 'clamp(1.05rem, 2.2vw, 1.4rem)' }
    : { fontSize: 'clamp(1.35rem, 2.4vw, 1.85rem)' }
  return (
    <div
      className="ledger-stat-band"
      style={compact
        ? { gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }
        : { gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="ledger-stat" style={compact ? { padding: '0.85rem' } : undefined}>
          <span className="ledger-stat-num" style={numStyle}>{metric.value}</span>
          <span className="ledger-stat-label">{metric.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ item, index, onDetails }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const slug = getDeepDiveSlug(item.title)

  return (
    <motion.article
      ref={ref}
      className="editorial-card"
      {...motionProps(reduceMotion, inView, (index % 3) * 0.05)}
      style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <span style={{ color: 'var(--color-accent)', lineHeight: 1 }}>
            <DataIcon name={item.icon} size={24} />
          </span>
          <div>
            <p className="ledger-title" style={{ margin: '0 0 0.35rem' }}>{item.badge || 'Project'}</p>
            <h2 style={{ margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-tight)' }}>
              {item.title}
            </h2>
          </div>
        </div>
        {item.link ? <ExternalLink size={16} color="var(--color-accent)" aria-hidden="true" /> : <Lock size={16} color="var(--color-text-muted)" aria-hidden="true" />}
      </div>

      <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)', lineHeight: 'var(--line-height-relaxed)' }}>{item.desc}</p>
      <MetricStrip metrics={item.metrics} compact />

      <div className="editorial-chip-list" style={{ marginTop: 'auto' }}>
        {item.tags.slice(0, 4).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        {item.tags.length > 4 && <span className="editorial-chip">+{item.tags.length - 4}</span>}
      </div>

      <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button type="button" className="btn btn--ghost" onClick={onDetails} aria-label={`View details for ${item.title}`} style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
          Details
        </button>
        {slug && (
          <Link to={`/projects/${slug}`} className="btn btn--primary" aria-label={`Deep dive into ${item.title}`} style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem' }}>
            Deep dive <ArrowRight size={13} aria-hidden="true" />
          </Link>
        )}
      </div>
    </motion.article>
  )
}

function ProjectModal({ project, onClose }) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined
    previousFocusRef.current = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeRef.current?.focus())

    const getFocusable = () => Array.from(dialogRef.current?.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])') || [])
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = getFocusable()
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus?.()
    }
  }, [project, onClose])

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.96, y: 18 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.96, y: 18 }, transition: { duration: 0.25 } }

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 999 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            {...panelMotion}
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: 'clamp(5rem, 9vh, 6.5rem) 1rem 1.5rem', pointerEvents: 'none', overflowY: 'auto' }}
          >
            <div ref={dialogRef} className="editorial-card" onClick={(event) => event.stopPropagation()} style={{ pointerEvents: 'auto', width: 'min(760px, 100%)', maxHeight: 'calc(100dvh - clamp(6.5rem, 11vh, 8rem))', overflowY: 'auto', background: 'var(--color-surface)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <p className="editorial-kicker" style={{ marginBottom: '0.75rem' }}>{project.badge || 'Project'}</p>
                  <h2 style={{ margin: 0, color: 'var(--color-text)', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', lineHeight: 'var(--line-height-tight)', letterSpacing: 'var(--letter-spacing-display)' }}>
                    {project.title}
                  </h2>
                </div>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog" className="glass-btn" style={{ width: 36, height: 36, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-base)', lineHeight: 'var(--line-height-relaxed)', marginBottom: '1.25rem' }}>
                {project.fullDesc || project.desc}
              </p>

              <MetricStrip metrics={project.metrics} />

              {project.features && (
                <section className="article-block section-hairline">
                  <p className="ledger-subhead">Features</p>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>
                    {project.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </section>
              )}

              {project.challenges && (
                <section className="article-block section-hairline">
                  <p className="ledger-subhead">Challenges & Solutions</p>
                  <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {project.challenges.map((challenge) => (
                      <article key={challenge.challenge} className="editorial-card" style={{ padding: '0.9rem 1rem' }}>
                        <p style={{ margin: '0 0 0.4rem', color: 'var(--color-text)', fontWeight: 'var(--font-weight-semibold)' }}>{challenge.challenge}</p>
                        <p style={{ margin: 0, color: 'var(--color-text-muted)', lineHeight: 'var(--line-height-relaxed)' }}>{challenge.solution}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {project.techStack && (
                <section className="article-block section-hairline">
                  <p className="ledger-subhead">Tech Stack</p>
                  <div className="editorial-chip-list">{project.techStack.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
                </section>
              )}

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1rem' }}>
                {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary">GitHub <ExternalLink size={13} aria-hidden="true" /></a>}
                {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">Live Demo <ExternalLink size={13} aria-hidden="true" /></a>}
                {!project.link && !project.liveLink && <span className="ledger-note"><Lock size={13} aria-hidden="true" /> Internal / private project</span>}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTag, setActiveTag] = useState('All')
  const [selected, setSelected] = useState(null)

  const filteredProjects = useMemo(() => {
    // ⚡ Bolt: Hoist toLowerCase() outside the filter loop to avoid O(n) redundant string allocations
    const q = query.toLowerCase()
    return PROJECTS_WITH_SEARCH.filter((project) => {
      const matchesQuery = !query || project._searchKey.includes(q)
      const matchesFilter = activeFilter === 'All'
        || (activeFilter === 'Production' && project.badge === 'Production')
        || (activeFilter === 'In Progress' && project.badge === 'In Progress')
        || (activeFilter === 'Open Source' && project.link)
        || (activeFilter === 'Vibe' && project.badge === 'Vibe')
      const matchesTag = activeTag === 'All' || project._tagsSet.has(activeTag)
      return matchesQuery && matchesFilter && matchesTag
    })
  }, [query, activeFilter, activeTag])

  return (
    <>
      <SEO
        title="Projects | Himanshu Nakrani"
        description="Explore production AI projects including Text-to-SQL, RAG systems, no-code agents, and ML forecasting work."
      />
      <main className="mvp2-page editorial-page">
        <header className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · Portfolio</p>
          <h1 className="editorial-page-title">
            Selected work across <span className="gradient-text">AI systems</span>.
          </h1>
          <p className="editorial-page-lede">
            LLM backends, RAG pipelines, Text-to-SQL systems, and applied ML projects.
          </p>
        </header>

        <section className="editorial-section section-hairline" aria-label="Project statistics">
          <div className="editorial-stat-grid">
            {pageStats.map((stat, index) => <PageStat key={stat.label} stat={stat} index={index} />)}
          </div>
        </section>

        <section className="editorial-section section-hairline">
          <span className="section-ghost-num" aria-hidden="true">02</span>
          <p className="editorial-kicker">[ 02 ] · Index</p>
          <h2 className="editorial-section-title">Project ledger</h2>

          <div className="editorial-card" style={{ padding: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <label style={{ flex: '1 1 260px', display: 'flex', alignItems: 'center', gap: '0.6rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '0.6rem 0.8rem', background: 'var(--color-bg)' }}>
                <Search size={16} color="var(--color-text-muted)" aria-hidden="true" />
                <span className="sr-only">Search projects</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects..."
                  style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }}
                />
              </label>
              <span className="editorial-chip">{filteredProjects.length} results</span>
            </div>

            <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
              <div role="group" aria-label="Project status filters" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="ledger-subhead" style={{ margin: 0, display: 'inline-flex', gap: 4, alignItems: 'center' }}><Filter size={12} /> Status</span>
                {['All', 'Production', 'In Progress', 'Open Source', 'Vibe'].map((filter) => (
                  <button key={filter} type="button" aria-pressed={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={activeFilter === filter ? 'btn btn--primary' : 'btn btn--ghost'} style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}>
                    {filter}
                  </button>
                ))}
              </div>
              <div role="group" aria-label="Project technology filters" style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <span className="ledger-subhead" style={{ margin: 0 }}>Tech</span>
                {['All', ...FEATURED_TAGS].map((tag) => (
                  <button key={tag} type="button" aria-pressed={activeTag === tag} onClick={() => setActiveTag(tag)} className={activeTag === tag ? 'btn btn--primary' : 'btn btn--ghost'} style={{ fontSize: '0.75rem', padding: '0.4rem 0.75rem' }}>
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="projects-grid" style={{ display: 'grid', gap: '1rem' }}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} item={project} index={index} onDetails={() => setSelected(project)} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
              <p style={{ margin: 0, fontWeight: 'var(--font-weight-semibold)' }}>No projects match</p>
              <p style={{ margin: '0.25rem 0 0', fontSize: 'var(--text-sm)' }}>Try adjusting your filters or search term.</p>
            </div>
          )}
        </section>
      </main>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
