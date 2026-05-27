import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, ArrowDown, Mail, FileText } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { currentFocusItems, recruiterSummary } from '../data/hero'

const stats = [
  { num: '2+',   label: 'Years exp.',    detail: 'Intern → Emerging Lead', link: '/experience' },
  { num: '10+',  label: 'Biz units',     detail: '200+ total users',        link: '#projects' },
  { num: '75%',  label: 'Latency cut',   detail: 'average response time',   link: '#pipeline' },
  { num: '2',    label: 'Publications',  detail: 'IEEE peer-reviewed',       link: '/research' },
]

const proofItems = [
  'Enterprise AI',
  'Text-to-SQL',
  'RAG systems',
  'AI agents',
]

function StatCard({ num, label, detail, link }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.a
      href={link}
      whileHover={reduceMotion ? {} : { y: -2, scale: 1.02 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.9rem 0.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
        color: 'inherit',
        minWidth: 0,
      }}
    >
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: 3,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {num}
      </div>
      <div style={{
        fontSize: '0.62rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        textAlign: 'center',
        lineHeight: 1.3,
      }}>
        {label}
      </div>
      {detail && (
        <div style={{
          fontSize: '0.58rem',
          color: 'var(--color-text-subtle)',
          textAlign: 'center',
          marginTop: 2,
          lineHeight: 1.2,
        }}>
          {detail}
        </div>
      )}
    </motion.a>
  )
}

function CurrentFocus({ items }) {
  return (
    <div>
      <div style={{
        fontSize: '0.6rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        color: 'var(--color-text-subtle)',
        marginBottom: '0.5rem',
      }}>
        Current Focus
      </div>
      <div style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        background: 'var(--color-surface)',
      }}>
        {items.map(item => (
          <div key={item.area} style={{
            display: 'flex',
            gap: '0.65rem',
            alignItems: 'flex-start',
            padding: '0.55rem 0.85rem',
            borderBottom: '1px solid var(--color-border)',
          }}>
            <span style={{
              fontSize: '0.6rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              flexShrink: 0,
              minWidth: '4.8rem',
              lineHeight: 1.5,
              paddingTop: 1,
            }}>
              {item.area}
            </span>
            <span style={{
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.5,
            }}>
              {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HeroEnhanced() {
  const reduceMotion = useReducedMotion()
  const magneticRef = useMagnetic({ radius: 80, strength: 4 })

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [reduceMotion])

  return (
    <section id="about" style={{ paddingTop: 'clamp(5.5rem, 12vh, 7rem)' }}>
      <div style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--page-pad-x)',
      }}>

        {/* Desktop two-column, mobile single-column */}
        <div className="hero-grid">

          {/* ── Left column: Identity ── */}
          <div className="hero-col-left" style={{ minWidth: 0 }}>
            {/* Hero header: Avatar + Name + Tagline */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                marginBottom: '1rem',
              }}
              className="hero-header"
            >
              {/* Avatar */}
              <div className="portrait-frame" style={{
                width: 96,
                flexShrink: 0,
              }}>
                <img
                  src="/himanshu.jpg"
                  alt="Himanshu Nakrani"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Name + role */}
              <div style={{ minWidth: 0 }}>
                <div style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.25rem',
                }}>
                  Generative AI Engineer · State Street
                </div>
                <h1 style={{
                  fontSize: 'clamp(1.7rem, 4.5vw, 2.5rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: '0.25rem',
                  color: 'var(--color-text)',
                }}>
                  Himanshu Nakrani
                </h1>
                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--color-text-muted)',
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: 1.45,
                }}>
                  LLM backends for financial-data workflows
                </p>
              </div>
            </div>

            {/* Intro text */}
            <p style={{
              fontSize: '0.85rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              maxWidth: 540,
              marginBottom: '1.25rem',
            }}>
              Production AI engineer at{' '}
              <strong style={{ color: 'var(--color-text)' }}>State Street Corporation</strong>
              {' '}— building Text-to-SQL, RAG, agent tooling, and evaluation infrastructure
              for financial-data workflows. Currently an Emerging Lead, progressed from intern
              to senior associate in two years.
            </p>

            {/* CTA Buttons — Resume primary, Contact secondary, social links quieter */}
            <div className="hero-ctas">
              <a
                ref={magneticRef}
                href="/resume.pdf"
                className="hero-cta hero-cta--primary"
              >
                <FileText size={14} />
                Resume
              </a>
              <a
                href="mailto:himanshunakrani0@gmail.com"
                className="hero-cta hero-cta--secondary"
              >
                <Mail size={14} />
                Contact
              </a>
              <a
                href="https://github.com/himanshu-nakrani"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta hero-cta--quiet"
              >
                <Github size={13} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/himanshu-nakrani"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta hero-cta--quiet"
              >
                <Linkedin size={13} />
                LinkedIn
              </a>
            </div>

            {/* Stats row */}
            <div className="hero-stats-grid">
              {stats.map((s) => (
                <StatCard key={s.label} num={s.num} label={s.label} detail={s.detail} link={s.link} />
              ))}
            </div>
          </div>

          {/* ── Right column: Capability tags + Focus ── */}
          <div className="hero-col-right" style={{ minWidth: 0 }}>
            {/* Compact capability strip */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
              marginBottom: '0.9rem',
            }}>
              {proofItems.map((item, i) => (
                <span key={item} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '0.3rem 0.65rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.7rem',
                  fontWeight: i === 0 ? 600 : 500,
                  color: i === 0 ? 'var(--color-text-muted)' : 'var(--color-text-subtle)',
                  fontFamily: 'var(--font-body)',
                  background: i === 0 ? 'color-mix(in srgb, var(--color-accent) 6%, transparent)' : 'transparent',
                  whiteSpace: 'nowrap',
                }}>
                  {i === 0 && (
                    <span style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }} />
                  )}
                  {item}
                </span>
              ))}
            </div>

            {/* Current Focus */}
            <div style={{ marginBottom: '1.25rem' }}>
              <CurrentFocus items={currentFocusItems} />
            </div>

            <div style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-surface)',
              padding: '0.85rem 1rem',
              marginBottom: '1.1rem',
            }}>
              <div style={{
                fontSize: '0.6rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-text-subtle)',
                marginBottom: '0.55rem',
              }}>
                Best at
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {recruiterSummary.map(item => (
                  <span key={item} style={{
                    fontSize: '0.72rem',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '0.25rem 0.55rem',
                    background: 'color-mix(in srgb, var(--color-bg) 60%, transparent)',
                  }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Scroll prompt */}
            <motion.button
              type="button"
              onClick={() => scrollToSection('highlights')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
              aria-label="Scroll to highlights"
            >
              <span style={{ fontSize: '0.62rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-text-subtle)' }}>
                Explore
              </span>
              <motion.div
                animate={reduceMotion ? {} : { y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={13} color="var(--color-text-subtle)" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
