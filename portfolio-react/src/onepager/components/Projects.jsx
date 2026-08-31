import { useState } from 'react'
import Section from './Section'
import Reveal from './Reveal'
import { projects } from '../../data'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'production', label: 'Production', match: (p) => p.badge === 'Production' },
  { id: 'research', label: 'Research', match: (p) => p.badge === 'Research' },
  { id: 'vibe', label: 'Vibe', match: (p) => p.badge === 'Vibe' },
  { id: 'opensource', label: 'Open Source', match: (p) => !p.badge && p.link },
]

function badgeClass(badge) {
  if (badge === 'Production') return 'badge badge--production'
  if (badge === 'Research') return 'badge badge--research'
  if (badge === 'Vibe') return 'badge badge--vibe'
  return 'badge badge--opensource'
}

function ProjectRow({ project, index }) {
  return (
    <article className="proj-row">
      <span className="proj-row__no" aria-hidden="true">{`0${index + 1}`}</span>

      <div className="proj-row__main">
        <div className="proj-row__titleline">
          <h3 className="proj-row__title">{project.title}</h3>
          {project.badge && (
            <span className={badgeClass(project.badge)}>{project.badge}</span>
          )}
        </div>
        <p className="proj-row__desc">{project.desc}</p>

        {project.metrics && (
          <p className="proj-row__metrics">
            {project.metrics.map((metric) => (
              <span key={metric.label}>
                <strong>{metric.value}</strong>
                {metric.label}
              </span>
            ))}
          </p>
        )}

        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>

      {(project.link || project.liveLink) && (
        <div className="proj-links proj-row__side">
          {project.liveLink && (
            <a
              className="text-link"
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live ↗
            </a>
          )}
          {project.link && (
            <a
              className="text-link"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.link.includes('huggingface.co') ? 'Model ↗' : 'Source ↗'}
            </a>
          )}
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all'
    ? projects
    : projects.filter(FILTERS.find((f) => f.id === filter).match)

  return (
    <Section
      id="projects"
      index="03"
      kicker="Selected Work"
      title="Projects with production impact"
      subtitle="Enterprise LLM systems, applied research, and open-source ML — from Text-to-SQL serving real users to fine-tuned reasoning models."
    >
      <Reveal y={12}>
        <div className="filters" role="group" aria-label="Filter projects">
          {FILTERS.map(({ id, label, match }) => {
            const count = id === 'all' ? projects.length : projects.filter(match).length
            return (
              <button
                key={id}
                type="button"
                className={filter === id ? 'filter-chip is-active' : 'filter-chip'}
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
              >
                {label} ({String(count).padStart(2, '0')})
              </button>
            )
          })}
        </div>

        <div className="proj-list">
          {visible.map((project, i) => (
            <ProjectRow key={project.title} project={project} index={i} />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
