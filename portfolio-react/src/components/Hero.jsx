import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'

const MotionLink = motion(Link)

const stats = [
  { num: '2+', label: 'Years exp.' },
  { num: '100+', label: 'Users served' },
  { num: '75%', label: 'Latency cut' },
  { num: '2', label: 'Publications' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] },
})

export default function Hero() {
  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 2rem 60px', maxWidth: 1100, margin: '0 auto', gap: '4rem', position: 'relative' }}>
      <motion.div
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '12%', left: '8%', width: 420, height: 420, background: 'radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(48px)' }} />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, -12, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '38%', right: '6%', width: 380, height: 380, background: 'radial-gradient(circle, rgba(74,158,255,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(48px)' }} />

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.08)}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: 'var(--nav-dot)',
                boxShadow: '0 0 14px var(--nav-dot-glow)',
              }}
            />
            Generative AI Engineer · State Street
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.14)}
          style={{
            fontSize: 'clamp(2.5rem, 6.5vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.08,
            marginBottom: '1.25rem',
            letterSpacing: '-0.035em',
            color: 'var(--text)',
          }}
        >
          Architecting
          <br />
          <span style={{ color: 'var(--text2)' }}>intelligence.</span>
        </motion.h1>

        <motion.p {...fadeUp(0.22)} style={{ fontSize: '1.05rem', color: 'var(--text2)', maxWidth: 520, marginBottom: '1.75rem', lineHeight: 1.75 }}>
          Senior AI engineer bridging research and production systems. Specializing in{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Large Language Models</strong>,{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>RAG</strong>, and{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Text-to-SQL</strong> at scale.
        </motion.p>

        <motion.div {...fadeUp(0.28)} style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <MotionLink
            to="/projects"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#f4f6fb',
              color: '#0a0b0f',
              padding: '12px 22px',
              borderRadius: 9999,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
            }}
          >
            View case studies
            <span aria-hidden>→</span>
          </MotionLink>
          <motion.a
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ opacity: 0.85 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text2)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              padding: '10px 14px',
            }}
          >
            <Github size={18} strokeWidth={1.75} />
            GitHub
          </motion.a>
        </motion.div>

        <motion.div {...fadeUp(0.36)} style={{ display: 'flex', gap: 'clamp(1.5rem, 4vw, 2.75rem)', flexWrap: 'wrap' }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 700, lineHeight: 1, color: 'var(--text)' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text2)', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
        className="hero-avatar-wrap"
      >
        <div style={{
          background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface2) 100%)',
          border: '1px solid var(--border)',
          borderRadius: 20, overflow: 'hidden', width: '100%', maxWidth: 360,
          boxShadow: '0 24px 48px rgba(0,0,0,0.35)',
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://avatars.githubusercontent.com/u/82092249?v=4"
              alt="Himanshu Nakrani"
              style={{ width: '100%', height: 240, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, var(--surface) 100%)' }} />
          </div>
          <div style={{ padding: '1.2rem 1.4rem 1.4rem' }}>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>Himanshu Nakrani</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--nav-dot)', marginBottom: 4 }}>Senior Associate · AI Software Developer</p>
            <p style={{ fontSize: '0.76rem', color: 'var(--text2)', marginBottom: '0.85rem' }}>State Street Corporation · Hyderabad, India</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '0.85rem' }}>
              {['LLMs', 'RAG', 'Text-to-SQL', 'Fine-tuning'].map((b) => (
                <span key={b} style={{ fontSize: '0.65rem', background: 'rgba(var(--bg-rgb), 0.6)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '4px 10px', borderRadius: 9999, letterSpacing: '0.04em' }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
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
                  style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.7rem', fontFamily: "'Fira Code', monospace", fontWeight: 600 }}
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
          #about { flex-direction: column !important; padding-top: 90px !important; }
          .hero-avatar-wrap { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
