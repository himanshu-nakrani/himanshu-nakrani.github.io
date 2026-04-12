import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'

/**
 * FeaturedProjects — shows top 3 projects on the home page with
 * animated entrance, metric badges, and a "View all" link.
 */
export default function FeaturedProjects({ projects }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const featured = projects.filter(p => p.badge === 'Production').slice(0, 3)

  return (
    <div ref={ref}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: '1.25rem',
          marginBottom: '2rem',
        }}
      >
        {featured.map((project, i) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            className="interactive-card"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.2rem, 3vw, 1.6rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Accent top border */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'var(--gradient-accent)',
                opacity: 0.6,
              }}
            />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{project.icon}</span>
              <h3
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </h3>
            </div>

            <p
              style={{
                fontSize: '0.88rem',
                color: 'var(--text2)',
                lineHeight: 1.6,
                margin: 0,
                flex: 1,
              }}
            >
              {project.desc}
            </p>

            {/* Metrics row */}
            {project.metrics && project.metrics.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.metrics.map((m) => (
                  <span
                    key={m.label}
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent)',
                      background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                      border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: 9999,
                    }}
                  >
                    {m.value} {m.label}
                  </span>
                ))}
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.25rem' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text2)',
                    background: 'var(--surface2)',
                    border: '1px solid var(--border)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: 9999,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  marginTop: '0.25rem',
                }}
              >
                View on GitHub <ExternalLink size={13} />
              </a>
            )}
          </motion.article>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          to="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text)',
            textDecoration: 'none',
            padding: '0.6rem 1.2rem',
            border: '1px solid var(--ghost-border)',
            borderRadius: 9999,
            background: 'var(--ghost-bg)',
            transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--ghost-hover-border)'
            e.currentTarget.style.background = 'var(--ghost-hover-bg)'
            e.currentTarget.style.transform = 'translateY(-1px)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--ghost-border)'
            e.currentTarget.style.background = 'var(--ghost-bg)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          View all projects <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  )
}
