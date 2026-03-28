import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
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

const Sparkle = ({ delay = 0, repeatDelay = 0.9, x = 0, y = 0, size = 2.5 }) => (
  <motion.div
    animate={{
      opacity: [0.2, 1, 0.2],
      scale: [0.4, 1.2, 0.4],
    }}
    transition={{
      duration: 1.35,
      delay,
      repeat: Infinity,
      repeatDelay,
      ease: 'easeInOut',
    }}
    style={{
      position: 'absolute',
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      zIndex: 0,
      background: 'radial-gradient(circle closest-side, var(--nav-dot), transparent)',
      pointerEvents: 'none',
      boxShadow: '0 0 10px var(--nav-dot), 0 0 22px var(--nav-dot)',
      filter: 'brightness(1.2)',
    }}
  />
)

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const sparkles = useMemo(
    () =>
      Array.from({ length: 200 }, (_, i) => ({
        id: i,
        delay: (i * 0.018) % 2.5,
        repeatDelay: 0.6 + ((i * 17) % 12) / 10,
        x: (i * 47 + (i % 7) * 13) % 100,
        y: (i * 23 + (i % 5) * 19) % 100,
        size: 2 + (i % 5) * 0.45,
      })),
    [],
  )

  return (
    <section
      id="about"
      style={{
        minHeight: 'min(100dvh, 900px)',
        display: 'flex',
        alignItems: 'center',
        padding: '96px var(--page-pad-x) max(2rem, env(safe-area-inset-bottom))',
        maxWidth: 'var(--page-max)',
        margin: '0 auto',
        gap: 'clamp(1.5rem, 5vw, 4rem)',
        position: 'relative',
      }}
    >
      {!reduceMotion &&
        sparkles.map((s) => (
          <Sparkle key={s.id} delay={s.delay} repeatDelay={s.repeatDelay} x={s.x} y={s.y} size={s.size} />
        ))}
      <div className="hero-copy" style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
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
        <div style={{ position: 'relative', width: '100%', maxWidth: 340 }}>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(167, 139, 250, 0.15)',
                '0 0 40px rgba(167, 139, 250, 0.25)',
                '0 0 20px rgba(167, 139, 250, 0.15)',
              ],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: 20,
              background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2), rgba(74, 158, 255, 0.1))',
              zIndex: -1,
            }}
          />

          <div
            style={{
              background: 'linear-gradient(145deg, var(--surface) 0%, var(--surface2) 100%)',
              border: '1px solid rgba(167, 139, 250, 0.3)',
              borderRadius: 20,
              overflow: 'hidden',
              width: '100%',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <motion.img
                src="/himanshu.jpg"
                alt="Himanshu Nakrani"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{
                  width: '100%',
                  height: 'max(220px, min(340px, 72vw))',
                  objectFit: 'cover',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'var(--hero-img-scrim)',
                  pointerEvents: 'none',
                }}
              />
            </div>
            <div style={{ padding: 'clamp(1rem, 4vw, 1.5rem)' }}>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: 'clamp(1rem, 3.5vw, 1.1rem)',
                  marginBottom: 6,
                  letterSpacing: '-0.02em',
                  color: 'var(--text)',
                }}
              >
                Himanshu Nakrani
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--accent)', marginBottom: 6, fontWeight: 600 }}>
                Senior Associate · AI Software Developer
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.5 }}>
                State Street Corporation · Hyderabad, India
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1rem' }}>
                {['LLMs', 'RAG', 'Text-to-SQL', 'Fine-tuning'].map((b) => (
                  <motion.span
                    key={b}
                    whileHover={{ y: -2 }}
                    style={{
                      fontSize: '0.65rem',
                      background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.1), rgba(74, 158, 255, 0.05))',
                      border: '1px solid rgba(167, 139, 250, 0.25)',
                      color: 'var(--text2)',
                      padding: '4px 10px',
                      borderRadius: 9999,
                      letterSpacing: '0.03em',
                      fontWeight: 500,
                      cursor: 'default',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {b}
                  </motion.span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { href: 'https://github.com/himanshu-nakrani', label: 'GitHub' },
                  { href: 'https://www.linkedin.com/in/himanshu-nakrani/', label: 'LinkedIn' },
                  { href: 'https://leetcode.com/u/himanshunakrani0/', label: 'LeetCode' },
                  { href: 'https://www.kaggle.com/himanshunakrani', label: 'Kaggle' },
                ].map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 2, color: 'var(--accent)' }}
                    style={{
                      color: 'var(--text2)',
                      textDecoration: 'none',
                      fontSize: '0.7rem',
                      fontFamily: "'Fira Code', monospace",
                      fontWeight: 600,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about {
            flex-direction: column !important;
            padding-top: max(88px, env(safe-area-inset-top)) !important;
            align-items: stretch !important;
            min-height: min(100dvh, 920px) !important;
          }
          .hero-copy { width: 100%; }
          .hero-avatar-wrap { width: 100% !important; max-width: min(400px, 100%) !important; margin: 0 auto; }
        }
        @media (max-width: 480px) {
          #about { padding-left: max(var(--page-pad-x), env(safe-area-inset-left)) !important; padding-right: max(var(--page-pad-x), env(safe-area-inset-right)) !important; }
        }
      `}</style>
    </section>
  )
}
