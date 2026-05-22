import { useCallback } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, ArrowDown, Mail, FileText } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { useMagnetic } from '../hooks/useMagnetic'
import { currentFocusItems } from '../data'

const stats = [
  { num: '2+',   label: 'Years exp.',    link: '/experience' },
  { num: '100+', label: 'Users served',  link: '#projects' },
  { num: '75%',  label: 'Latency cut',   link: '#pipeline' },
  { num: '2',    label: 'Publications',  link: '/research' },
]

function StatCard({ num, label, link, index }) {
  const { ref, value, suffix } = useCountUp(num, { duration: 400 })
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      ref={ref}
      href={link}
      initial={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.35 }}
      whileHover={reduceMotion ? {} : { y: -4, scale: 1.02 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem 1rem',
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{
        fontSize: '1.6rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: 6,
        fontVariantNumeric: 'tabular-nums',
      }}>
        <span>{value}</span>
        <span style={{ fontSize: '0.75em', marginLeft: 2 }}>{suffix}</span>
      </div>
      <div style={{
        fontSize: '0.68rem',
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
    <div className="hero-focus">
      {items.map(item => (
        <div key={item.area} className="hero-focus__row">
          <span className="hero-focus__area">{item.area}</span>
          <span className="hero-focus__text">{item.description}</span>
        </div>
      ))}
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

        {/* Hero header: Avatar + Name + Tagline */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '1.75rem',
          }}
          className="hero-header"
        >
          {/* Avatar */}
          <div className="portrait-frame" style={{
            width: 112,
            flexShrink: 0,
            marginTop: 6,
          }}>
            <img
              src="/himanshu.jpg"
              alt="Himanshu Nakrani"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Name + role */}
          <div>
            <div style={{
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-accent)',
              marginBottom: '0.4rem',
            }}>
              Generative AI Engineer · State Street
            </div>
            <h1 style={{
              fontSize: 'clamp(1.9rem, 5vw, 3rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '0.4rem',
              color: 'var(--color-text)',
            }}>
              Himanshu Nakrani
            </h1>
            <p style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
              lineHeight: 1.5,
            }}>
              Building production LLM systems — RAG, Text-to-SQL, AI agents
            </p>
          </div>
        </motion.div>

        {/* Intro text */}
        <motion.p
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.08, duration: 0.4 }}
          style={{
            fontSize: '0.93rem',
            lineHeight: 1.75,
            color: 'var(--color-text-muted)',
            maxWidth: 580,
            marginBottom: '2rem',
          }}
        >
          Production AI engineer at{' '}
          <strong style={{ color: 'var(--color-text)' }}>State Street Corporation</strong>
          {' '}— building enterprise Text-to-SQL, RAG pipelines, and AI agent infrastructure
          serving real users over financial data. Currently an Emerging Lead, progressed from
          intern to senior associate in two years.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.35 }}
          className="hero-ctas"
        >
          <a
            ref={magneticRef}
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta--primary"
          >
            <Github size={15} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta--ghost"
          >
            <Linkedin size={15} />
            LinkedIn
          </a>
          <a
            href="mailto:himanshunakrani0@gmail.com"
            className="hero-cta hero-cta--ghost"
          >
            <Mail size={15} />
            Email
          </a>
          <a
            href="/resume.pdf"
            className="hero-cta hero-cta--ghost"
          >
            <FileText size={15} />
            Resume
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
        >
          <div className="hero-stats-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
            marginBottom: '2rem',
          }}>
            {stats.map((s, i) => (
              <StatCard key={s.label} num={s.num} label={s.label} link={s.link} index={i} />
            ))}
          </div>
        </motion.div>

        {/* Current Focus */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <CurrentFocus items={currentFocusItems} />
        </motion.div>

        {/* Scroll prompt */}
        <motion.button
          type="button"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onClick={() => scrollToSection('highlights')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            marginTop: '1.5rem',
          }}
          aria-label="Scroll to highlights"
        >
          <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>
            Explore
          </span>
          <motion.div
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} color="var(--color-accent)" />
          </motion.div>
        </motion.button>

      </div>

      <style>{`
        .hero-header {
          @media (max-width: 560px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
        .hero-stats-grid {
          @media (max-width: 640px) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
