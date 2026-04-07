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
              background: 'var(--modal-backdrop)',
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
            className="exp-modal-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.role} details`}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: 'max(1rem, env(safe-area-inset-top)) max(1rem, env(safe-area-inset-right)) max(1rem, env(safe-area-inset-bottom)) max(1rem, env(safe-area-inset-left))',
              pointerEvents: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="exp-modal-shell"
              style={{
                width: '100%',
                maxWidth: 1000,
                maxHeight: 'min(90vh, 100dvh - 2rem)',
                display: 'flex',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)',
                borderRadius: 24,
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Left side - Large visual area with details */}
              <div
                className="exp-modal-main"
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 'clamp(1.25rem, 4vw, 2.5rem)',
                  background:
                    'linear-gradient(135deg, color-mix(in srgb, var(--nav-dot) 9%, var(--surface)), color-mix(in srgb, var(--accent) 5%, var(--surface2)))',
                  borderRight: '1px solid var(--border)',
                  overflowY: 'auto',
                  minWidth: 0,
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
                  {item.progression && !(item.progressionSteps && item.progressionSteps.length > 0) && (
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
                  {item.progressionSteps && item.progressionSteps.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: '0.75rem' }}>
                      {item.progressionSteps.map((step, idx) => {
                        const isCurrent = step === item.currentRoleStep || (!item.currentRoleStep && idx === item.progressionSteps.length - 1)
                        return (
                          <span
                            key={step}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 5,
                            }}
                          >
                            <span
                              style={{
                                fontSize: '0.67rem',
                                color: isCurrent ? 'var(--accent2)' : 'var(--text2)',
                                border: `1px solid ${isCurrent ? 'color-mix(in srgb, var(--accent2) 68%, transparent)' : 'var(--border)'}`,
                                background: isCurrent ? 'color-mix(in srgb, var(--accent) 18%, transparent)' : 'color-mix(in srgb, var(--surface2) 72%, transparent)',
                                borderRadius: 9999,
                                padding: '4px 8px',
                                fontFamily: 'var(--font-mono)',
                                fontWeight: isCurrent ? 600 : 500,
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {step}
                            </span>
                            {idx < item.progressionSteps.length - 1 && <span style={{ color: 'var(--text2)', opacity: 0.5, fontSize: '0.72rem' }}>→</span>}
                          </span>
                        )
                      })}
                    </div>
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
                className="exp-modal-sidebar"
                style={{
                  width: 300,
                  flexShrink: 0,
                  padding: 'clamp(1.25rem, 3vw, 2.5rem) clamp(1rem, 3vw, 2rem)',
                  background: 'var(--surface2)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2rem',
                  overflowY: 'auto',
                  borderLeft: '1px solid var(--border)',
                  minWidth: 0,
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
                        background: 'color-mix(in srgb, var(--nav-dot) 12%, var(--surface))',
                        border: '1px solid var(--border)',
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
                        background: 'color-mix(in srgb, var(--accent) 11%, var(--surface))',
                        border: '1px solid var(--border)',
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
