import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart2, Code2, ExternalLink, Filter, FolderGit2, Lock, Rocket, Search, X } from 'lucide-react'
import DataIcon from '../components/DataIcon'
import SEO from '../components/SEO'
import Tag from '../components/Tag'
import { projects, technicalCaseStudies } from '../data/projects'

const FEATURED_TAGS = ['Text-to-SQL', 'RAG', 'LLM', 'FastAPI', 'AI Agents']
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

function MetricStrip({ metrics, compact = false, limit }) {
  const visibleMetrics = limit ? metrics?.slice(0, limit) : metrics
  if (!visibleMetrics?.length) return null
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
      {visibleMetrics.map((metric) => (
        <div key={metric.label} className="ledger-stat" style={compact ? { padding: '0.85rem' } : undefined}>
          <span className="ledger-stat-num" style={numStyle}>{metric.value}</span>
          <span className="ledger-stat-label">{metric.label}</span>
        </div>
      ))}
    </div>
  )
}

function ProjectCard({ item, index, onDetails, featured = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const slug = getDeepDiveSlug(item.title)

  return (
    <motion.article
      ref={ref}
      className={`project-card editorial-card${featured ? ' project-card--featured' : ''}`}
      {...motionProps(reduceMotion, inView, (index % 3) * 0.05)}
    >
      <div className="project-card__header">
        <div className="project-card__title-row">
          <span className="project-card__icon" aria-hidden="true">
            <DataIcon name={item.icon} size={24} />
          </span>
          <div className="project-card__heading">
            <p className="project-card__eyebrow ledger-title">{item.badge || 'Project'}</p>
            <h2 className="project-card__title">
              {item.title}
            </h2>
          </div>
        </div>
        <span
          className={`project-card__availability ${item.link ? 'project-card__availability--public' : 'project-card__availability--private'}`}
          title={item.link ? 'Open source' : 'Private or internal project'}
        >
          {item.link ? <ExternalLink size={16} aria-hidden="true" /> : <Lock size={16} aria-hidden="true" />}
        </span>
      </div>

      <p className="project-card__desc">{item.desc}</p>
      <div className="project-card__metrics">
        <MetricStrip metrics={item.metrics} compact limit={featured ? 3 : 2} />
      </div>

      <div className="project-card__tags editorial-chip-list">
        {item.tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
        {item.tags.length > 3 && <span className="editorial-chip">+{item.tags.length - 3}</span>}
      </div>

      <div className="project-card__actions">
        <button type="button" className="btn btn--ghost project-card__action" onClick={onDetails} aria-label={`View details for ${item.title}`}>
          Details
        </button>
        {slug && (
          <Link to={`/projects/${slug}`} className="btn btn--primary project-card__action" aria-label={`Deep dive into ${item.title}`}>
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
    document.body.dataset.modalOpen = 'true'
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
      delete document.body.dataset.modalOpen
      previousFocusRef.current?.focus?.()
    }
  }, [project, onClose])

  const panelMotion = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 1 } }
    : { initial: { opacity: 0, scale: 0.96, y: 18 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.96, y: 18 }, transition: { duration: 0.25 } }
  const status = project?.badge || 'Project'
  const primaryTags = project?.tags?.slice(0, 3) || []
  const keyFeatures = project?.features?.slice(0, 4) || []
  const keyChallenges = project?.challenges?.slice(0, 2) || []
  const keyTechStack = project?.techStack?.slice(0, 8) || []

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
            className="project-modal__backdrop"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} project details`}
            {...panelMotion}
            className="project-modal__viewport"
          >
            <div ref={dialogRef} className="project-modal editorial-card" onClick={(event) => event.stopPropagation()}>
              <div className="project-modal__topbar">
                <div className="project-modal__status">
                  <DataIcon name={project.icon} size={18} />
                  <span>{status}</span>
                </div>
                <button ref={closeRef} type="button" onClick={onClose} aria-label="Close dialog" title="Close dialog" className="project-modal__close glass-btn">
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              <div className="project-modal__hero">
                <div className="project-modal__hero-main">
                  <p className="project-modal__coord">Project specimen</p>
                  <h2 className="project-modal__title">{project.title}</h2>
                  <p className="project-modal__summary">{project.fullDesc || project.desc}</p>
                </div>
                <aside className="project-modal__meta" aria-label="Project metadata">
                  <div>
                    <span className="project-modal__meta-label">Visibility</span>
                    <span className="project-modal__meta-value">{project.link || project.liveLink ? 'Public artifact' : 'Internal / private'}</span>
                  </div>
                  <div>
                    <span className="project-modal__meta-label">Signals</span>
                    <span className="project-modal__meta-value">{project.metrics?.length ? `${project.metrics.length} measured outputs` : 'Narrative evidence'}</span>
                  </div>
                  <div>
                    <span className="project-modal__meta-label">Primary tags</span>
                    <span className="project-modal__meta-value">{primaryTags.join(' · ')}</span>
                  </div>
                </aside>
              </div>

              <div className="project-modal__metrics">
                <MetricStrip metrics={project.metrics} />
              </div>

              {keyFeatures.length > 0 && (
                <section className="project-modal__section">
                  <p className="ledger-subhead">Key Features</p>
                  <ul className="project-modal__list">
                    {keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                </section>
              )}

              {keyChallenges.length > 0 && (
                <section className="project-modal__section">
                  <p className="ledger-subhead">Challenges</p>
                  <div className="project-modal__challenge-grid">
                    {keyChallenges.map((challenge) => (
                      <article key={challenge.challenge} className="project-modal__challenge editorial-card">
                        <p className="project-modal__challenge-title">{challenge.challenge}</p>
                        <p className="project-modal__challenge-body">{challenge.solution}</p>
                      </article>
                    ))}
                  </div>
                </section>
              )}

              {keyTechStack.length > 0 && (
                <section className="project-modal__section">
                  <p className="ledger-subhead">Tech Stack</p>
                  <div className="project-modal__chips editorial-chip-list">
                    {keyTechStack.map((tag) => <Tag key={tag}>{tag}</Tag>)}
                    {project.techStack.length > keyTechStack.length && (
                      <span className="editorial-chip">+{project.techStack.length - keyTechStack.length}</span>
                    )}
                  </div>
                </section>
              )}

              <div className="project-modal__footer">
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
  const searchInputRef = useRef(null)

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
  const showFeaturedLayout = !query && activeFilter === 'All' && activeTag === 'All'

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
            Production AI systems, selected for signal.
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
                  ref={searchInputRef}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search projects..."
                  maxLength={100}
                  style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', color: 'var(--color-text)', fontSize: 'var(--text-sm)' }}
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    title="Clear search"
                    className="btn btn--ghost"
                    onClick={() => {
                      setQuery('')
                      searchInputRef.current?.focus()
                    }}
                    style={{
                      padding: '0.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                    }}
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </label>
              <span className="editorial-chip" role="status" aria-live="polite">{filteredProjects.length} results</span>
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

          <div className="projects-grid">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                item={project}
                index={index}
                featured={showFeaturedLayout && index === 0}
                onDetails={() => setSelected(project)}
              />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--color-text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <p style={{ margin: 0, color: 'var(--color-text)', fontWeight: 'var(--font-weight-semibold)' }}>No projects match</p>
              <p style={{ margin: 0, fontSize: 'var(--text-sm)' }}>Try adjusting your filters or search term.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setActiveFilter('All')
                  setActiveTag('All')
                  setTimeout(() => searchInputRef.current?.focus(), 50)
                }}
                className="btn btn--ghost"
                style={{ marginTop: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  )
}
