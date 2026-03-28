import { motion, AnimatePresence } from 'framer-motion'
import Tag from './Tag'

function highlightBullets(html) {
  return html.replace(
    /(Alpha Copilot|WealthAI|Agent Forge|75%|25%|95%\+|87%|40%)/g,
    '<strong style="color:var(--accent2)">$1</strong>',
  )
}

export default function ExperienceDetailModal({ item, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 999,
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '2rem',
              pointerEvents: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 1000,
                maxHeight: '90vh',
                display: 'flex',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              {/* Left side - Large visual area with details */}
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '2.5rem',
                  background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.08), rgba(74, 158, 255, 0.05))',
                  borderRight: '1px solid var(--border)',
                  overflowY: 'auto',
                }}
              >
                <button
                  onClick={onClose}
                  style={{
                    alignSelf: 'flex-start',
                    background: 'none',
                    border: 'none',
                    padding: '0.5rem',
                    marginBottom: '1.5rem',
                    color: 'var(--text2)',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'var(--accent)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = 'var(--text2)'
                  }}
                >
                  ← Back
                </button>

                <div style={{ marginBottom: '2rem' }}>
                  <h2
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: 'var(--text)',
                      lineHeight: 1.2,
                    }}
                  >
                    {item.role}
                  </h2>
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--accent)',
                      fontWeight: 500,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.company}
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text2)' }}>
                    {item.location}
                    <span style={{ opacity: 0.5, margin: '0 0.5rem' }}>·</span>
                    {item.period}
                  </p>
                  {item.progression && (
                    <p
                      style={{
                        fontSize: '0.8rem',
                        color: 'var(--text2)',
                        fontFamily: "'Fira Code', monospace",
                        marginTop: '0.75rem',
                    }}
                    >
                      {item.progression}
                    </p>
                  )}
                </div>

                {/* All bullets */}
                <div style={{ marginBottom: '2rem' }}>
                  <h3
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: '1rem',
                      opacity: 0.7,
                    }}
                  >
                    Key Achievements
                  </h3>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                    {item.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        style={{
                          position: 'relative',
                          paddingLeft: 20,
                          paddingBottom: 14,
                          color: 'var(--text2)',
                          fontSize: '0.95rem',
                          lineHeight: 1.7,
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '0.6em',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                          }}
                        />
                        <span dangerouslySetInnerHTML={{ __html: highlightBullets(bullet) }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right sidebar - Technologies */}
              <div
                style={{
                  width: 300,
                  padding: '2.5rem 2rem',
                  background: 'var(--surface2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  overflowY: 'auto',
                  borderLeft: '1px solid var(--border)',
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      marginBottom: '1.2rem',
                      opacity: 0.6,
                    }}
                  >
                    Technologies
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    {item.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div>
                  <h4
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text2)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      marginBottom: '1rem',
                      opacity: 0.6,
                    }}
                  >
                    Quick Facts
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(167, 139, 250, 0.1)',
                        border: '1px solid rgba(167, 139, 250, 0.2)',
                        borderRadius: 8,
                        fontSize: '0.85rem',
                      }}
                    >
                      <p style={{ color: 'var(--text2)', margin: 0, marginBottom: '0.25rem' }}>Total Achievements</p>
                      <p style={{ color: 'var(--accent)', fontWeight: 600, margin: 0, fontSize: '1.2rem' }}>
                        {item.bullets.length}
                      </p>
                    </div>
                    <div
                      style={{
                        padding: '0.75rem',
                        background: 'rgba(74, 158, 255, 0.1)',
                        border: '1px solid rgba(74, 158, 255, 0.2)',
                        borderRadius: 8,
                        fontSize: '0.85rem',
                      }}
                    >
                      <p style={{ color: 'var(--text2)', margin: 0, marginBottom: '0.25rem' }}>Tech Stack</p>
                      <p style={{ color: 'var(--accent3)', fontWeight: 600, margin: 0, fontSize: '1.2rem' }}>
                        {item.tags.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
