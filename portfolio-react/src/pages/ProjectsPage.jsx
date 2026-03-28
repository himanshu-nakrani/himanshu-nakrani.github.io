import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../components/PageHeader'
import Tag from '../components/Tag'
import { projects } from '../data'

export default function ProjectsPage() {
  const [query, setQuery] = useState('')
  const allTags = useMemo(
    () => ['All', ...Array.from(new Set(projects.flatMap((project) => project.tags)))],
    [],
  )
  const [activeTag, setActiveTag] = useState('All')

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesQuery =
          project.title.toLowerCase().includes(query.toLowerCase()) ||
          project.desc.toLowerCase().includes(query.toLowerCase())
        const matchesTag = activeTag === 'All' || project.tags.includes(activeTag)
        return matchesQuery && matchesTag
      }),
    [query, activeTag],
  )

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Portfolio"
        title="Selected Works"
        description="Engineering high-dimensional solutions for complex real-world problems — production LLMs, RAG, and ML systems."
      />

      <div style={{ display: 'grid', gap: '0.9rem', marginBottom: '1.2rem' }}>
        <input
          placeholder="Search by title or description..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          style={{
            width: '100%',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 14px',
            outline: 'none',
            fontSize: '0.9rem',
          }}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              style={{
                border: '1px solid',
                borderColor: activeTag === tag ? 'var(--accent)' : 'var(--border)',
                background: activeTag === tag ? 'rgba(74,158,255,0.12)' : 'var(--surface)',
                color: activeTag === tag ? 'var(--accent)' : 'var(--text2)',
                borderRadius: 20,
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '0.78rem',
                fontFamily: "'Fira Code', monospace",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div style={{ color: 'var(--text2)', fontSize: '0.8rem', marginBottom: '1rem' }}>
        Showing {filteredProjects.length} of {projects.length} projects
      </div>

      <div style={{ display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
        {filteredProjects.map((item) => (
          <motion.article
            key={item.title}
            whileHover={{ y: -2 }}
            className="mvp2-card"
            style={{
              padding: '1.2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.7rem',
              transition: 'box-shadow 0.2s ease, transform 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 10 }}>
              <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: 'var(--accent)',
                    border: '1px solid var(--border2)',
                    borderRadius: 20,
                    padding: '4px 10px',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-0.02em' }}>{item.title}</h3>
            <p style={{ color: 'var(--text2)', fontSize: '0.84rem', lineHeight: 1.6, flex: 1 }}>{item.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener"
                style={{
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontSize: '0.8rem',
                  fontFamily: "'Fira Code', monospace",
                }}
              >
                View repository →
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
