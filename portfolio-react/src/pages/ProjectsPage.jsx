import { useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { projects } from '../data'

const badgeStyle = {
  Production: { bg: 'rgba(74,158,255,0.08)', color: 'var(--accent)', border: 'rgba(74,158,255,0.3)' },
  'In Progress': { bg: 'rgba(107,124,255,0.08)', color: 'var(--accent2)', border: 'rgba(107,124,255,0.3)' },
}

const metricIcon = { performance: '⚡', users: '👥', efficiency: '📊' }

function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 999 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', pointerEvents: 'none' }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto', width: '100%', maxWidth: 660,
                maxHeight: '90dvh', overflowY: 'auto',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border2)', borderRadius: 20, boxShadow: 'var(--shadow-md)',
              }}
            >
              <div style={{ height: 3, borderRadius: '20px 20px 0 0', background: 'linear-gradient(90deg, var(--nav-dot), var(--accent) 60%, transparent)' }} />
              <div style={{ padding: '1.6rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{project.icon}</span>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{project.title}</h2>
                      {project.badge && (
                        <span style={{
                          fontSize: '0.67rem', fontFamily: "'Fira Code', monospace",
                          background: badgeStyle[project.badge]?.bg, color: badgeStyle[project.badge]?.color,
                          border: `1px solid ${badgeStyle[project.badge]?.border}`, padding: '2px 9px', borderRadius: 20,
                        }}>● {project.badge}</span>
                      )}
                    </div>
                  </div>
                  <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', fontSize: '1.1rem', padding: '0.25rem 0.5rem', borderRadius: 6 }}>✕</button>
                </div>

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7,
                  padding: '0.9rem 1rem', marginBottom: '1.2rem',
                  background: 'color-mix(in srgb, var(--accent) 5%, var(--surface))',
                  borderLeft: '3px solid var(--accent)', borderRadius: '0 8px 8px 0',
                }}>
                  {project.fullDesc || project.desc}
                </p>

                {/* Metrics */}
                {project.metrics && (
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                    {project.metrics.map(m => (
                      <div key={m.label} style={{
                        display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '6px 12px',
                        background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))',
                        border: '1px solid var(--border)', borderRadius: 8, fontSize: '0.78rem',
                      }}>
                        <span>{metricIcon[m.type] || '📌'}</span>
                        <strong style={{ color: 'var(--accent)' }}>{m.value}</strong>
                        <span style={{ color: 'var(--text2)' }}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features */}
                {project.features && (
                  <div style={{ marginBottom: '1.2rem' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text2)', opacity: 0.6, marginBottom: '0.6rem' }}>Features</p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {project.features.map((f, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.55 }}>
                          <span style={{ flexShrink: 0, marginTop: '0.5em', width: 5, height: 5, borderRadius: '50%', background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech stack */}
                {project.techStack && (
                  <div style={{ marginBottom: '1.2rem' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text2)', opacity: 0.6, marginBottom: '0.6rem' }}>Tech Stack</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {project.techStack.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                )}

                {/* Challenges */}
                {project.challenges && (
                  <div style={{ marginBottom: '1.4rem' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text2)', opacity: 0.6, marginBottom: '0.6rem' }}>Challenges & Solutions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {project.challenges.map((c, i) => (
                        <div key={i} style={{ padding: '0.8rem 1rem', borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: '0.82rem' }}>
                          <p style={{ color: 'var(--accent2)', fontWeight: 600, marginBottom: 4 }}>⚠ {c.challenge}</p>
                          <p style={{ color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>✓ {c.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div style={{ marginBottom: '1.4rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text2)', opacity: 0.6, marginBottom: '0.6rem' }}>Tags</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>

                {/* Action links */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.3rem', borderRadius: 10, background: 'var(--accent)', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                      GitHub ↗
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.6rem 1.3rem', borderRadius: 10, background: 'var(--accent2)', color: 'white', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>
                      Live Demo ↗
                    </a>
                  )}
                  {!project.link && !project.liveLink && (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text2)', fontFamily: "'Fira Code', monospace", opacity: 0.5 }}>Internal / private project</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function ProjectCard({ item, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      style={{
        borderRadius: 16,
        border: `1px solid ${hovered ? 'var(--border2)' : 'var(--border)'}`,
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden', cursor: 'pointer',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--nav-dot) 0%, var(--accent) 60%, transparent 100%)', opacity: hovered ? 1 : 0.35, transition: 'opacity 0.3s' }} />

      <div style={{ padding: '1.3rem 1.4rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <motion.span animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '1.5rem' }}>
              {item.icon}
            </motion.span>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.3 }}>{item.title}</h3>
          </div>
          {item.badge && (
            <span style={{
              flexShrink: 0, fontSize: '0.67rem', fontFamily: "'Fira Code', monospace",
              background: badgeStyle[item.badge].bg, color: badgeStyle[item.badge].color,
              border: `1px solid ${badgeStyle[item.badge].border}`, padding: '3px 9px', borderRadius: 20,
            }}>● {item.badge}</span>
          )}
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>

        {item.metrics && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {item.metrics.map(m => (
              <span key={m.label} style={{ fontSize: '0.72rem', padding: '3px 8px', background: 'color-mix(in srgb, var(--accent) 8%, var(--surface))', border: '1px solid var(--border)', borderRadius: 6, color: 'var(--accent)', fontFamily: "'Fira Code', monospace" }}>
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {item.link && <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontFamily: "'Fira Code', monospace" }}>GitHub</span>}
            {item.liveLink && <span style={{ fontSize: '0.72rem', color: 'var(--accent2)', fontFamily: "'Fira Code', monospace" }}>Live Demo</span>}
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text2)', fontFamily: "'Fira Code', monospace", opacity: hovered ? 0.9 : 0.35, transition: 'opacity 0.2s' }}>
            view details →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function FilterBar({ query, onQueryChange, activeFilter, onFilterChange, activeTag, onTagChange, allTags, resultCount, totalCount }) {
  return (
    <div style={{
      border: '1px solid var(--border)',
      borderRadius: 12,
      background: 'var(--surface)',
      padding: '0.875rem 1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    }}>
      {/* Search row with result count */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input
          placeholder="Search projects..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          style={{
            flex: 1,
            border: '1px solid var(--border)',
            background: 'var(--surface2)',
            color: 'var(--text)',
            borderRadius: 8,
            padding: '8px 12px',
            outline: 'none',
            fontSize: '0.88rem',
            boxSizing: 'border-box',
          }}
        />
        <span style={{ fontSize: '0.78rem', color: 'var(--text2)', opacity: 0.6, whiteSpace: 'nowrap', flexShrink: 0 }}>
          {resultCount} of {totalCount}
        </span>
      </div>

      {/* Filter pills row */}
      <div className="filter-pills-row" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="filter-status-pills" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['All', 'Production', 'In Progress', 'Open Source'].map(f => (
            <button key={f} onClick={() => onFilterChange(f)} style={{
              background: activeFilter === f ? 'var(--accent)' : 'var(--surface2)',
              color: activeFilter === f ? 'white' : 'var(--text2)',
              border: '1px solid var(--border)',
              borderRadius: 20, padding: '5px 13px',
              fontSize: '0.75rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s',
            }}>{f}</button>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: 'var(--border)', flexShrink: 0 }} className="filter-divider" />

        <div className="filter-tag-pills" style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {allTags.map(tag => (
            <button key={tag} onClick={() => onTagChange(tag)} style={{
              border: '1px solid',
              borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
              background: activeTag === tag ? 'rgba(74,158,255,0.1)' : 'var(--surface2)',
              color: activeTag === tag ? 'var(--accent)' : 'var(--text2)',
              borderRadius: 20, padding: '4px 11px',
              cursor: 'pointer', fontSize: '0.73rem',
              fontFamily: "'Fira Code', monospace",
              transition: 'all 0.15s',
            }}>{tag}</button>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filter-pills-row { flex-direction: column !important; align-items: flex-start !important; }
          .filter-divider { display: none !important; }
        }
      `}</style>
    </div>
  )
}

export default function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [activeFilter, setActiveFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))],
    [],
  )

  const filteredProjects = useMemo(() =>
    projects.filter(p => {
      const matchesQuery = !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Production' && p.badge === 'Production') ||
        (activeFilter === 'In Progress' && p.badge === 'In Progress') ||
        (activeFilter === 'Open Source' && p.link)
      return matchesQuery && matchesTag && matchesFilter
    }),
    [query, activeTag, activeFilter],
  )

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Portfolio"
        title="Selected Works"
        description="Production LLMs, RAG pipelines, and ML systems built for real-world scale."
      />

      <FilterBar
        query={query}
        onQueryChange={setQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        allTags={allTags}
        resultCount={filteredProjects.length}
        totalCount={projects.length}
      />

      <div style={{ display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
        {filteredProjects.map((item, i) => (
          <ProjectCard key={item.title} item={item} index={i} onClick={() => setSelected(item)} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text2)', fontSize: '0.9rem' }}>
          No projects match your filters.
        </div>
      )}

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  )
}
