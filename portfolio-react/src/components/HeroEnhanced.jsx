import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, ArrowDown, Mail, FileText } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import { currentFocusItems } from '../data'

const stats = [
  { num: '2+',   label: 'Years exp.',    link: '/experience' },
  { num: '100+', label: 'Users served',  link: '#projects' },
  { num: '75%',  label: 'Latency cut',   link: '#pipeline' },
  { num: '2',    label: 'Publications',  link: '/research' },
]

function StatCard({ num, label, link }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.a
      href={link}
      whileHover={reduceMotion ? {} : { y: -3, scale: 1.02 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.1rem 0.75rem',
        borderRadius: 10,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: 5,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {num}
      </div>
      <div style={{
        fontSize: '0.65rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        textAlign: 'center',
      }}>
        {label}
      </div>
    </motion.a>
  )
}

function CurrentFocus({ items }) {
  return (
    <div>
      <div style={{
        fontSize: '0.6rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: 'var(--color-text-subtle)',
        marginBottom: '0.45rem',
      }}>
        Current Focus
      </div>
      <div className="hero-focus">
        {items.map(item => (
          <div key={item.area} className="hero-focus__row">
            <span className="hero-focus__area">{item.area}</span>
            <span className="hero-focus__text">{item.description}</span>
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
    <section id="about" style={{ paddingTop: 'var(--page-pad-top)' }}>
      <div style={{
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--page-pad-x)',
      }}>

        {/* Hero header: Avatar + Name + Tagline — immediately visible, no fade-in */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '1.5rem',
          }}
          className="hero-header"
        >
          {/* Avatar */}
          <div className="portrait-frame" style={{
            width: 108,
            flexShrink: 0,
            marginTop: 4,
          }}>
            <img
              src="/himanshu.jpg"
              alt="Himanshu Nakrani"
              width="360"
              height="540"
              fetchPriority="high"
              decoding="async"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Name + role */}
          <div>
            <div style={{
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-accent)',
              marginBottom: '0.35rem',
            }}>
              Generative AI Engineer · State Street
            </div>
            <h1 style={{
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '0.35rem',
              color: 'var(--color-text)',
            }}>
              Himanshu Nakrani
            </h1>
            <p style={{
              fontSize: '0.93rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.5,
            }}>
              Building production LLM systems — RAG, Text-to-SQL, AI agents
            </p>
          </div>
        </div>

        {/* Intro text */}
        <p style={{
          fontSize: '0.9rem',
          lineHeight: 1.75,
          color: 'var(--color-text-muted)',
          maxWidth: 560,
          marginBottom: '1.75rem',
        }}>
          Production AI engineer at{' '}
          <strong style={{ color: 'var(--color-text)' }}>State Street Corporation</strong>
          {' '}— building enterprise Text-to-SQL, RAG pipelines, and AI agent infrastructure
          serving real users over financial data. Currently an Emerging Lead, progressed from
          intern to senior associate in two years.
        </p>

        {/* CTA Buttons */}
        <div className="hero-ctas">
          <a
            ref={magneticRef}
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta--primary"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta--ghost"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href="mailto:himanshunakrani0@gmail.com"
            className="hero-cta hero-cta--ghost"
          >
            <Mail size={14} />
            Email
          </a>
          <a
            href="/resume.pdf"
            className="hero-cta hero-cta--ghost"
          >
            <FileText size={14} />
            Resume
          </a>
        </div>

        {/* Stats row — stable final values, no count-up */}
        <div className="hero-stats-grid">
          {stats.map((s) => (
            <StatCard key={s.label} num={s.num} label={s.label} link={s.link} />
          ))}
        </div>

        {/* Current Focus */}
        <div style={{ marginBottom: '2rem' }}>
          <CurrentFocus items={currentFocusItems} />
        </div>

        {/* Scroll prompt */}
        <motion.button
          type="button"
          onClick={() => scrollToSection('highlights')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            marginTop: '1rem',
          }}
          aria-label="Scroll to highlights"
        >
          <span style={{ fontSize: '0.65rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-subtle)' }}>
            Explore
          </span>
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={15} color="var(--color-accent)" />
          </motion.div>
        </motion.button>

      </div>
    </section>
  )
}
