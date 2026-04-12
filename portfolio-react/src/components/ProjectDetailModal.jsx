import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, TrendingUp, Users, Zap } from 'lucide-react'
import Tag from './Tag'

const metricIcons = {
  performance: TrendingUp,
  users: Users,
  efficiency: Zap,
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export default function ProjectDetailModal({ project, onClose, triggerRef }) {
  const modalRef = useRef(null)

  // Move focus into modal when it opens
  useEffect(() => {
    if (!project) return
    requestAnimationFrame(() => modalRef.current?.focus())
  }, [project])

  if (!project) return null

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose()
      return
    }
    if (e.key === 'Tab') {
      const focusable = Array.from(modalRef.current.querySelectorAll(FOCUSABLE))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
  }

  function handleClose() {
    onClose()
    triggerRef?.current?.focus()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          overflowY: 'auto',
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          tabIndex={-1}
          ref={modalRef}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          className="glass-card"
          style={{
            borderRadius: 24,
            maxWidth: 900,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            outline: 'none',
          }}
        >
          <div style={{ position: 'sticky', top: 0, background: 'color-mix(in srgb, var(--surface) 85%, transparent)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', zIndex: 10, borderBottom: '1px solid var(--glass-border)', padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '2rem' }} aria-hidden="true">{project.icon}</span>
              <div>
                <h2 id="modal-title" style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{project.title}</h2>
                {project.badge && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontFamily: "'Fira Code', monospace" }}>
                    ● {project.badge}
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Close dialog"
              onClick={handleClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text2)',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <X size={24} />
            </motion.button>
          </div>

          <div style={{ padding: '2rem' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '2rem' }}>
              {project.fullDesc || project.desc}
            </p>

            {project.metrics && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Impact Metrics</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  {project.metrics.map((metric, i) => {
                    const Icon = metricIcons[metric.type] || TrendingUp
                    return (
                      <motion.div
                        key={i}
                        whileHover={{ y: -4 }}
                        className="glass-card"
                        style={{
                          borderRadius: 12,
                          padding: '1rem',
                        }}
                      >
                        <Icon size={20} style={{ color: 'var(--accent)', marginBottom: '0.5rem' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.25rem' }}>
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{metric.label}</div>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            )}

            {project.features && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Key Features</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {project.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}
                    >
                      <span style={{ color: 'var(--accent)', fontSize: '1.2rem', lineHeight: 1 }} aria-hidden="true">✓</span>
                      <span style={{ color: 'var(--text2)', fontSize: '0.9rem', lineHeight: 1.6 }}>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            {project.techStack && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Tech Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {project.techStack.map((tech) => <Tag key={tech}>{tech}</Tag>)}
                </div>
              </div>
            )}

            {project.challenges && (
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>Challenges & Solutions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {project.challenges.map((item, i) => (
                    <div key={i} className="glass-card" style={{ borderRadius: 12, padding: '1rem' }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.5rem' }}>
                        {item.challenge}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text2)', lineHeight: 1.6 }}>
                        {item.solution}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {project.link && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn-primary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 12,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Github size={18} />
                    View on GitHub
                    <ExternalLink size={16} />
                  </span>
                </motion.a>
              )}
              {project.liveLink && (
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text)',
                    padding: '0.75rem 1.5rem',
                    borderRadius: 12,
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Live Demo
                    <ExternalLink size={16} />
                  </span>
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
