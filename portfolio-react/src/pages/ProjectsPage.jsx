import { useMemo, useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { X, Search, Layers, Zap, Users, BarChart2, ExternalLink, Lock, Filter, Grid3X3, LayoutList, Sparkles, FolderGit2, Rocket, Code2 } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { projects } from '../data'

/* ─── Badge styles ─────────────────────────────────────── */
const badgeStyle = {
  Production:   { bg: 'color-mix(in srgb, var(--color-accent) 12%, transparent)', color: 'var(--color-accent)',  border: 'color-mix(in srgb, var(--color-accent) 30%, transparent)' },
  'In Progress':{ bg: 'color-mix(in srgb, #6b7fff 10%, transparent)',              color: '#8b9fff',              border: 'rgba(107,124,255,0.3)' },
}
const metricIcon = { performance: Zap, users: Users, efficiency: BarChart2 }

/* ─── Top-8 most-relevant tags ─────────────────────────── */
const FEATURED_TAGS = ['Text-to-SQL', 'RAG', 'LLM', 'FastAPI', 'Deep Learning', 'Python', 'AI Agents', 'LSTM']

/* ─── Page-level stats ─────────────────────────────────── */
const pageStats = [
  { value: projects.length,                                    label: 'Total', icon: FolderGit2 },
  { value: projects.filter(p => p.badge === 'Production').length,  label: 'Production', icon: Rocket },
  { value: projects.filter(p => p.link).length,               label: 'Open Source', icon: Code2 },
  { value: projects.filter(p => p.metrics).length,            label: 'With Metrics', icon: BarChart2 },
]

/* ─── Modal ────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', zIndex: 999 }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', pointerEvents: 'none' }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                pointerEvents: 'auto', width: '100%', maxWidth: 680,
                maxHeight: '90dvh', overflowY: 'auto',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 25%, var(--border))',
                borderRadius: 20,
                boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px color-mix(in srgb, var(--color-accent) 8%, transparent) inset',
              }}
            >
              <div style={{ height: 3, borderRadius: '20px 20px 0 0', background: 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 25%, transparent))' }} />
              <div style={{ padding: '1.6rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '2rem' }}>{project.icon}</span>
                    <div>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{project.title}</h2>
                      {project.badge && (
                        <span style={{
                          fontSize: '0.67rem', fontFamily: 'var(--font-mono)',
                          background: badgeStyle[project.badge]?.bg, color: badgeStyle[project.badge]?.color,
                          border: `1px solid ${badgeStyle[project.badge]?.border}`, padding: '2px 9px', borderRadius: 20,
                        }}>● {project.badge}</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    style={{
                      background: 'color-mix(in srgb, var(--border) 40%, transparent)', border: '1px solid var(--border)',
                      cursor: 'pointer', color: 'var(--text2)', width: 32, height: 32, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--text2)', lineHeight: 1.7, padding: '0.9rem 1rem', marginBottom: '1.2rem', background: 'color-mix(in srgb, var(--color-accent) 5%, var(--surface))', borderLeft: '3px solid var(--color-accent)', borderRadius: '0 8px 8px 0' }}>
                  {project.fullDesc || project.desc}
                </p>

                {project.metrics && (
                  <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
                    {project.metrics.map(m => {
                      const Icon = metricIcon[m.type] || BarChart2
                      return (
                        <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '8px 14px', background: 'color-mix(in srgb, var(--color-accent) 8%, var(--surface))', border: '1px solid color-mix(in srgb, var(--color-accent) 20%, transparent)', borderRadius: 9 }}>
                          <Icon size={13} color="var(--color-accent)" />
                          <strong style={{ color: 'var(--color-accent)', fontSize: '0.88rem' }}>{m.value}</strong>
                          <span style={{ color: 'var(--text2)', fontSize: '0.78rem' }}>{m.label}</span>
                        </div>
                      )
                    })}
                  </div>
                )}

                {project.features && (
                  <div style={{ marginBottom: '1.2rem' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.7rem' }}>Features</p>
                    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {project.features.map((f, i) => (
                        <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.55, padding: '0.4rem 0.6rem', borderRadius: 7, background: i % 2 === 0 ? 'color-mix(in srgb, var(--surface2) 70%, transparent)' : 'transparent' }}>
                          <span style={{ flexShrink: 0, marginTop: '0.52em', width: 5, height: 5, borderRadius: '50%', background: 'var(--color-accent)' }} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.techStack && (
                  <div style={{ marginBottom: '1.2rem' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.6rem' }}>Tech Stack</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {project.techStack.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                )}

                {project.challenges && (
                  <div style={{ marginBottom: '1.4rem' }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.6rem' }}>Challenges & Solutions</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {project.challenges.map((c, i) => (
                        <div key={i} style={{ padding: '0.8rem 1rem', borderRadius: 10, background: 'var(--surface2)', border: '1px solid var(--border)', fontSize: '0.82rem' }}>
                          <p style={{ color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>⚠ {c.challenge}</p>
                          <p style={{ color: 'var(--text2)', lineHeight: 1.55, margin: 0 }}>✓ {c.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '1.4rem' }}>
                  <p style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '0.6rem' }}>Tags</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {project.tags.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn--primary" style={{ fontSize: '0.84rem' }}>GitHub ↗</a>}
                  {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn btn--ghost" style={{ fontSize: '0.84rem' }}>Live Demo ↗</a>}
                  {!project.link && !project.liveLink && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.79rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)', opacity: 0.55 }}>
                      <Lock size={12} /> Internal / private project
                    </span>
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

/* ─── Featured (large) card ────────────────────────────── */
function FeaturedCard({ item, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      tabIndex={0} role="button" aria-label={`View details for ${item.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      style={{
        borderRadius: 18,
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--color-accent) 45%, var(--border))' : 'color-mix(in srgb, var(--color-accent) 22%, var(--border))'}`,
        background: hovered
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 6%, var(--surface)) 0%, var(--surface2) 100%)'
          : 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 3%, var(--surface)) 0%, var(--surface2) 100%)',
        overflow: 'hidden', cursor: 'pointer',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px color-mix(in srgb, var(--color-accent) 14%, transparent)' : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'all 0.24s ease',
        outline: 'none',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ height: 3, background: 'linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 25%, transparent))' }} />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem', flex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <motion.span animate={{ scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.2 }} style={{ fontSize: '1.8rem' }}>
              {item.icon}
            </motion.span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', lineHeight: 1.2 }}>{item.title}</h3>
              {item.badge && (
                <span style={{
                  fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
                  background: badgeStyle[item.badge]?.bg, color: badgeStyle[item.badge]?.color,
                  border: `1px solid ${badgeStyle[item.badge]?.border}`, padding: '2px 8px', borderRadius: 20,
                }}>● {item.badge}</span>
              )}
            </div>
          </div>
          <ExternalLink size={15} color={hovered ? 'var(--color-accent)' : 'var(--text2)'} style={{ opacity: hovered ? 1 : 0.35, transition: 'all 0.2s', marginTop: 4 }} />
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--text2)', lineHeight: 1.65 }}>{item.desc}</p>

        {/* Metrics strip */}
        {item.metrics && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {item.metrics.map(m => {
              const Icon = metricIcon[m.type] || BarChart2
              return (
                <div key={m.label} style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px',
                  background: 'color-mix(in srgb, var(--color-accent) 9%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-accent) 22%, transparent)',
                  borderRadius: 8,
                }}>
                  <Icon size={11} color="var(--color-accent)" />
                  <strong style={{ color: 'var(--color-accent)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>{m.value}</strong>
                  <span style={{ color: 'var(--text2)', fontSize: '0.72rem' }}>{m.label}</span>
                </div>
              )
            })}
          </div>
        )}

        {/* Tech stack mini */}
        {item.techStack && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Layers size={11} color="var(--text2)" style={{ opacity: 0.5, flexShrink: 0 }} />
            {item.techStack.slice(0, 5).map(t => (
              <span key={t} style={{ fontSize: '0.67rem', fontFamily: 'var(--font-mono)', color: 'var(--text2)', opacity: 0.7 }}>{t}</span>
            ))}
            {item.techStack.length > 5 && <span style={{ fontSize: '0.67rem', color: 'var(--text2)', opacity: 0.4 }}>+{item.techStack.length - 5}</span>}
          </div>
        )}

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 'auto' }}>
          {item.tags.map(t => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </motion.article>
  )
}

/* ─── Regular (compact) card ───────────────────────────── */
function ProjectCard({ item, index, onClick }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      tabIndex={0} role="button" aria-label={`View details for ${item.title}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() } }}
      style={{
        borderRadius: 14,
        border: `1px solid ${hovered ? 'color-mix(in srgb, var(--color-accent) 32%, var(--border))' : 'var(--border)'}`,
        background: hovered
          ? 'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 4%, var(--surface)) 0%, var(--surface2) 100%)'
          : 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        overflow: 'hidden', cursor: 'pointer',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
        display: 'flex', flexDirection: 'column',
        outline: 'none',
      }}
    >
      <div style={{ height: 2, background: 'linear-gradient(90deg, var(--color-accent), transparent)', opacity: hovered ? 0.9 : 0.2, transition: 'opacity 0.25s' }} />

      <div style={{ padding: '1.1rem 1.2rem', display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <motion.span animate={{ scale: hovered ? 1.1 : 1 }} transition={{ duration: 0.18 }} style={{ fontSize: '1.35rem' }}>
              {item.icon}
            </motion.span>
            <h3 style={{ fontSize: '0.93rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.25 }}>{item.title}</h3>
          </div>
          {item.badge && (
            <span style={{
              flexShrink: 0, fontSize: '0.63rem', fontFamily: 'var(--font-mono)',
              background: badgeStyle[item.badge]?.bg, color: badgeStyle[item.badge]?.color,
              border: `1px solid ${badgeStyle[item.badge]?.border}`, padding: '2px 8px', borderRadius: 20,
            }}>● {item.badge}</span>
          )}
        </div>

        <p style={{ fontSize: '0.82rem', color: 'var(--text2)', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>

        {item.metrics && (
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {item.metrics.map(m => (
              <span key={m.label} style={{
                fontSize: '0.69rem', padding: '2px 8px',
                background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 24%, transparent)',
                borderRadius: 20, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontWeight: 600,
              }}>
                {m.value} {m.label}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          {item.tags.slice(0, 3).map(t => <Tag key={t}>{t}</Tag>)}
          {item.tags.length > 3 && <span style={{ fontSize: '0.68rem', color: 'var(--text2)', opacity: 0.45, alignSelf: 'center' }}>+{item.tags.length - 3}</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 4 }}>
          {item.link
            ? <span style={{ fontSize: '0.67rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 3 }}><ExternalLink size={10} /> GitHub</span>
            : <span style={{ fontSize: '0.67rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 3, opacity: 0.45 }}><Lock size={10} /> Private</span>
          }
          <span style={{ fontSize: '0.68rem', color: hovered ? 'var(--color-accent)' : 'var(--text2)', fontFamily: 'var(--font-mono)', opacity: hovered ? 1 : 0.35, transition: 'all 0.2s' }}>
            details →
          </span>
        </div>
      </div>
    </motion.article>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTag, setActiveTag] = useState('All')
  const [selected, setSelected] = useState(null)

  const filteredProjects = useMemo(() =>
    projects.filter(p => {
      const q = query.toLowerCase()
      const matchesQuery = !query || p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)
      const matchesFilter =
        activeFilter === 'All' ||
        (activeFilter === 'Production' && p.badge === 'Production') ||
        (activeFilter === 'In Progress' && p.badge === 'In Progress') ||
        (activeFilter === 'Open Source' && p.link)
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag)
      return matchesQuery && matchesFilter && matchesTag
    }),
    [query, activeFilter, activeTag],
  )

  const isFiltered = query || activeFilter !== 'All' || activeTag !== 'All'
  const featured = !isFiltered ? filteredProjects.filter(p => p.badge === 'Production').slice(0, 2) : []
  const rest = !isFiltered ? filteredProjects.filter(p => !featured.includes(p)) : filteredProjects

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Portfolio"
        title="Selected Works"
        description="Production LLMs, RAG pipelines, and ML systems built for real-world scale."
      />

      {/* Stats strip - modern bento style */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '0.75rem', 
        marginBottom: '2rem',
      }} className="projects-stats-grid">
        {pageStats.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.1rem', borderRadius: 14,
                border: '1px solid var(--color-border)', 
                background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)',
                border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={16} color="var(--color-accent)" />
              </div>
              <div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Modern filter bar with glass effect */}
      <div style={{ 
        border: '1px solid var(--color-border)', 
        borderRadius: 18, 
        background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-raised) 100%)',
        padding: '1rem 1.25rem', 
        marginBottom: '2rem',
        boxShadow: 'var(--shadow-sm)',
      }}>
        {/* Search row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: '0.5rem 0.85rem',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}>
            <Search size={16} color="var(--color-text-muted)" style={{ flexShrink: 0, opacity: 0.6 }} />
            <input
              type="search"
              placeholder="Search projects..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                flex: 1, 
                border: 'none', 
                background: 'transparent',
                color: 'var(--color-text)', 
                outline: 'none', 
                fontSize: '0.88rem',
              }}
            />
          </div>
          <div style={{ 
            padding: '0.5rem 0.85rem',
            background: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--color-accent) 25%, transparent)',
            borderRadius: 10,
            fontSize: '0.75rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--color-accent)',
            fontWeight: 600,
          }}>
            {filteredProjects.length} results
          </div>
        </div>

        {/* Filter pills - two rows for better organization */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {/* Status filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: 'var(--color-text-muted)', 
              marginRight: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <Filter size={11} />
              Status
            </span>
            {['All', 'Production', 'In Progress', 'Open Source'].map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                style={{
                  background: activeFilter === f ? 'var(--color-accent)' : 'var(--color-surface-raised)',
                  color: activeFilter === f ? 'white' : 'var(--color-text-muted)',
                  border: `1px solid ${activeFilter === f ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 8, 
                  padding: '5px 12px',
                  fontSize: '0.74rem', 
                  fontWeight: 600, 
                  cursor: 'pointer', 
                  transition: 'all 0.18s',
                  boxShadow: activeFilter === f ? '0 2px 8px color-mix(in srgb, var(--color-accent) 30%, transparent)' : 'none',
                }}
              >{f}</button>
            ))}
          </div>

          {/* Tech/tag filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
            <span style={{ 
              fontSize: '0.65rem', 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              color: 'var(--color-text-muted)', 
              marginRight: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              <Sparkles size={11} />
              Tech
            </span>
            {['All', ...FEATURED_TAGS].map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                style={{
                  border: '1px solid',
                  borderColor: activeTag === tag ? 'var(--color-accent)' : 'var(--color-border)',
                  background: activeTag === tag ? 'color-mix(in srgb, var(--color-accent) 12%, transparent)' : 'transparent',
                  color: activeTag === tag ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  borderRadius: 6, 
                  padding: '4px 10px',
                  cursor: 'pointer', 
                  fontSize: '0.7rem', 
                  fontFamily: 'var(--font-mono)',
                  transition: 'all 0.15s',
                }}
              >{tag}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured production row */}
      <AnimatePresence>
        {featured.length > 0 && (
          <motion.div key="featured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.67rem', fontWeight: 700, color: 'var(--color-accent)',
              textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '0.85rem',
            }}>
              <span style={{ display: 'inline-block', width: 16, height: 1.5, background: 'var(--color-accent)', borderRadius: 2 }} />
              Featured Production
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}>
              {featured.map(item => <FeaturedCard key={item.title} item={item} onClick={() => setSelected(item)} />)}
            </div>
          </motion.div>
        )}

        {/* All other projects */}
        <motion.div key={`grid-${activeFilter}-${activeTag}-${query}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          {rest.length > 0 && !isFiltered && (
            <p style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.67rem', fontWeight: 700, color: 'var(--text2)',
              textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '0.85rem', opacity: 0.6,
            }}>
              <span style={{ display: 'inline-block', width: 16, height: 1.5, background: 'var(--text2)', borderRadius: 2, opacity: 0.5 }} />
              More Projects
            </p>
          )}
          <div style={{ display: 'grid', gap: '0.9rem', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))' }}>
            {rest.map((item, i) => <ProjectCard key={item.title} item={item} index={i} onClick={() => setSelected(item)} />)}
          </div>

          {filteredProjects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3.5rem', color: 'var(--text2)' }}>
              <p style={{ fontSize: '1.5rem', marginBottom: 8 }}>🔍</p>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>No projects match</p>
              <p style={{ fontSize: '0.82rem', opacity: 0.6 }}>Try adjusting your filters or search term.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />

      <style>{`
        @media (max-width: 768px) {
          .projects-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .projects-stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
