import { motion } from 'framer-motion'
import { Github, Linkedin } from 'lucide-react'

const stats = [
  { num: '2+', label: 'Years exp.' },
  { num: '100+', label: 'Users served' },
  { num: '75%', label: 'Latency cut' },
  { num: '2', label: 'Publications' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] },
})

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  color: 'var(--text2)',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  padding: '6px 0',
  borderBottom: '1px solid transparent',
  transition: 'color 0.2s ease, border-color 0.2s ease',
}

export default function Hero() {
  return (
    <section
      id="about"
      style={{
        minHeight: 'min(100vh, 900px)',
        display: 'flex',
        alignItems: 'center',
        padding: '96px 2rem 64px',
        maxWidth: 1100,
        margin: '0 auto',
        gap: 'clamp(2rem, 5vw, 4rem)',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.06)}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.7rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              marginBottom: '1.1rem',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--nav-dot)',
              }}
            />
            Generative AI Engineer · State Street
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.12)}
          style={{
            fontSize: 'clamp(2.35rem, 6vw, 3.5rem)',
            fontWeight: 700,
            lineHeight: 1.06,
            marginBottom: '1.1rem',
            letterSpacing: '-0.04em',
            color: 'var(--text)',
          }}
        >
          Architecting
          <br />
          <span style={{ color: 'var(--text2)' }}>intelligence.</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.18)}
          style={{
            fontSize: '1.02rem',
            color: 'var(--text2)',
            maxWidth: '32rem',
            marginBottom: '1.5rem',
            lineHeight: 1.72,
          }}
        >
          Production AI engineer focused on <strong style={{ color: 'var(--text)', fontWeight: 600 }}>LLMs</strong>,{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>RAG</strong>, and{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Text-to-SQL</strong>—from research ideas to systems
          used by real users.
        </motion.p>

        <motion.div
          {...fadeUp(0.24)}
          style={{
            display: 'flex',
            gap: '1.25rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '2.25rem',
          }}
        >
          <motion.a
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: 'var(--text)' }}
            style={linkStyle}
          >
            <Github size={17} strokeWidth={1.75} aria-hidden />
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/himanshu-nakrani/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ color: 'var(--text)' }}
            style={linkStyle}
          >
            <Linkedin size={17} strokeWidth={1.75} aria-hidden />
            LinkedIn
          </motion.a>
        </motion.div>

        <motion.div
          {...fadeUp(0.3)}
          style={{
            display: 'flex',
            gap: 'clamp(1.25rem, 4vw, 2.5rem)',
            flexWrap: 'wrap',
            paddingTop: '1.75rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontSize: 'clamp(1.35rem, 3.5vw, 1.75rem)',
                  fontWeight: 700,
                  lineHeight: 1,
                  color: 'var(--text)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--text2)',
                  marginTop: 6,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1, minWidth: 0 }}
        className="hero-avatar-wrap"
      >
        <div
          style={{
            background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface2) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            width: '100%',
            maxWidth: 340,
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          }}
        >
          <div style={{ position: 'relative' }}>
            <img
              src="https://avatars.githubusercontent.com/u/82092249?v=4"
              alt="Himanshu Nakrani"
              style={{ width: '100%', height: 228, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)',
              }}
            />
          </div>
          <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, letterSpacing: '-0.02em' }}>
              Himanshu Nakrani
            </p>
            <p style={{ fontSize: '0.78rem', color: 'var(--nav-dot)', marginBottom: 4 }}>
              Senior Associate · AI Software Developer
            </p>
            <p style={{ fontSize: '0.74rem', color: 'var(--text2)', marginBottom: '0.75rem', lineHeight: 1.45 }}>
              State Street Corporation · Hyderabad, India
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '0.75rem' }}>
              {['LLMs', 'RAG', 'Text-to-SQL', 'Fine-tuning'].map((b) => (
                <span
                  key={b}
                  style={{
                    fontSize: '0.62rem',
                    background: 'rgba(var(--bg-rgb), 0.5)',
                    border: '1px solid var(--border)',
                    color: 'var(--text2)',
                    padding: '3px 9px',
                    borderRadius: 9999,
                    letterSpacing: '0.03em',
                  }}
                >
                  {b}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {[
                { href: 'https://github.com/himanshu-nakrani', label: 'GH' },
                { href: 'https://www.linkedin.com/in/himanshu-nakrani/', label: 'LI' },
                { href: 'https://leetcode.com/u/himanshunakrani0/', label: 'LC' },
                { href: 'https://www.kaggle.com/himanshunakrani', label: 'KG' },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ color: 'var(--nav-dot)' }}
                  style={{
                    color: 'var(--text2)',
                    textDecoration: 'none',
                    fontSize: '0.68rem',
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about { flex-direction: column !important; padding-top: 88px !important; align-items: stretch !important; }
          .hero-avatar-wrap { width: 100% !important; max-width: 400px; margin: 0 auto; }
        }
      `}</style>
    </section>
  )
}
