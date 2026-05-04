import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Github, Linkedin } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { useMagnetic } from '../hooks/useMagnetic'

const stats = [
  { num: '2+',   label: 'Years exp.' },
  { num: '100+', label: 'Users served' },
  { num: '75%',  label: 'Latency cut' },
  { num: '2',    label: 'Publications' },
]

/* ─── Animated stat (count-up + uppercase mono label) ──────── */
function ClusterStat({ num, label }) {
  const { ref, value, suffix } = useCountUp(num, { duration: 1100 })
  return (
    <div ref={ref} className="hero-stat">
      <div
        className="cluster-stat"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 4vw, 2.1rem)',
          fontWeight: 600,
          lineHeight: 1,
          color: 'var(--color-text)',
          letterSpacing: '-0.02em',
          marginBottom: '0.45rem',
        }}
      >
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 500,
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </div>
    </div>
  )
}

/* ─── Desktop layout ───────────────────────────────────────── */
function DesktopHero({ reduceMotion }) {
  const magneticRef = useMagnetic({ radius: 90, strength: 5 })

  const stagger = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } } }
  const fadeUp = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }
  const fadeScale = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, scale: 0.96 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <>
      <motion.div
        className="hero-desktop-copy"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={fadeUp}>
          <span className="hero-kicker">
            <span className="hero-kicker-bracket">[</span>
            <span className="hero-kicker-num">01</span>
            <span className="hero-kicker-bracket">]</span>
            <span className="hero-kicker-divider">·</span>
            Generative AI Engineer
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 7vw, 4.4rem)',
            fontWeight: 600,
            lineHeight: 1.02,
            letterSpacing: 'var(--display-tracking)',
            color: 'var(--color-text)',
            textWrap: 'balance',
            marginBottom: '1.5rem',
          }}
        >
          Himanshu Nakrani
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '1.125rem',
            color: 'var(--color-text-muted)',
            maxWidth: '36rem',
            marginBottom: '2.4rem',
            lineHeight: 1.7,
            fontWeight: 400,
          }}
        >
          Production AI engineer focused on LLMs, RAG, and Text-to-SQL — from research ideas to systems used by real users.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3.25rem' }}
        >
          <a
            ref={magneticRef}
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-primary glass-btn-primary magnetic"
            style={{ textDecoration: 'none' }}
          >
            <Github size={15} strokeWidth={1.8} />
            <span>Explore Projects</span>
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-nakrani/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary glass-btn"
            style={{ textDecoration: 'none' }}
          >
            <Linkedin size={15} strokeWidth={1.8} />
            <span>Connect on LinkedIn</span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            flexWrap: 'wrap',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp}>
              <ClusterStat num={s.num} label={s.label} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeScale} initial="hidden" animate="show" style={{ flexShrink: 0 }}>
        <div className="hero-photo-wrapper">
          <div className="portrait-frame" style={{ width: 320 }}>
            <img
              src="/himanshu.jpg"
              alt="Himanshu Nakrani"
              loading="eager"
              fetchPriority="high"
              width={320}
              height={400}
              style={{ width: '100%', height: 'auto', display: 'block', position: 'relative', zIndex: 0 }}
            />
          </div>
          {/* Bracket corner glyph — quiet HUD detail */}
          <span aria-hidden="true" className="portrait-corner portrait-corner--tl" />
          <span aria-hidden="true" className="portrait-corner portrait-corner--br" />
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion ? {} : { delay: 1.4, duration: 0.8 }}
        className="hero-scroll-indicator"
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.6, fontFamily: 'var(--font-mono)' }}>
          Scroll
        </span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 4, 0] }}
          transition={reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} strokeWidth={1.6} style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>
    </>
  )
}

/* ─── Mobile layout ────────────────────────────────────────── */
function MobileHero({ reduceMotion }) {
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } }
  const up = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } }
  const photoAnim = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, scale: 0.94 }, show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <motion.div
      className="mobile-hero-shell"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={photoAnim} className="mobile-hero-photo-wrap">
        <div className="mobile-hero-photo-frame portrait-frame">
          <img
            src="/himanshu.jpg"
            alt="Himanshu Nakrani"
            loading="eager"
            fetchPriority="high"
            className="mobile-hero-img"
          />
        </div>
        <div className="mobile-hero-badge">
          <span className="status-dot status-dot--pulse" />
          Open to AI Roles
        </div>
      </motion.div>

      <motion.div variants={up} className="mobile-hero-identity">
        <h1 className="mobile-hero-name">Himanshu Nakrani</h1>
        <div className="mobile-hero-role">
          <span className="hero-kicker-bracket">[</span>
          <span>Generative AI Engineer</span>
          <span className="hero-kicker-bracket">]</span>
        </div>
      </motion.div>

      <motion.p variants={up} className="mobile-hero-tagline">
        LLMs · RAG · Text-to-SQL — from research to production systems used by real users.
      </motion.p>

      <motion.div variants={up} className="mobile-hero-ctas">
        <a
          href="https://github.com/himanshu-nakrani"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-primary glass-btn-primary"
        >
          <Github size={15} strokeWidth={1.8} />
          Explore Projects
        </a>
        <a
          href="https://www.linkedin.com/in/himanshu-nakrani/"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-secondary glass-btn"
        >
          <Linkedin size={15} strokeWidth={1.8} />
          Connect
        </a>
      </motion.div>

      <motion.div variants={up} className="mobile-hero-stats">
        {stats.map((s) => (
          <MobileStat key={s.label} num={s.num} label={s.label} />
        ))}
      </motion.div>

      <motion.div variants={up} className="mobile-scroll-nudge">
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 4, 0] }}
          transition={reduceMotion ? {} : { duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} strokeWidth={1.6} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function MobileStat({ num, label }) {
  const { ref, value, suffix } = useCountUp(num, { duration: 1000 })
  return (
    <div ref={ref} className="mobile-stat-card">
      <span className="mobile-stat-num cluster-stat">
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
      </span>
      <span className="mobile-stat-label">{label}</span>
    </div>
  )
}

/* ─── Root ─────────────────────────────────────────────────── */
export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about">
      <div className="hero-desktop-layout">
        <DesktopHero reduceMotion={reduceMotion} />
      </div>

      <div className="hero-mobile-layout">
        <MobileHero reduceMotion={reduceMotion} />
      </div>

      <style>{`
        /* ── Desktop ── */
        .hero-desktop-layout {
          display: flex;
          align-items: center;
          min-height: min(100dvh, 900px);
          padding: 96px var(--page-pad-x) max(3rem, env(safe-area-inset-bottom));
          max-width: var(--page-max);
          margin: 0 auto;
          gap: clamp(2rem, 6vw, 5rem);
          position: relative;
        }
        .hero-mobile-layout { display: none; }

        .hero-desktop-copy {
          flex: 1;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        /* Bracketed kicker shared by desktop + mobile */
        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          font-family: var(--font-mono);
          font-size: 0.74rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 1.75rem;
          font-weight: 500;
          font-feature-settings: "tnum" 1;
        }
        .hero-kicker-bracket { opacity: 0.55; }
        .hero-kicker-num     { font-variant-numeric: tabular-nums; }
        .hero-kicker-divider { opacity: 0.4; margin: 0 0.15rem; }

        .hero-stat { position: relative; padding-right: clamp(1.5rem, 4vw, 3rem); }
        .hero-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 18%;
          height: 64%;
          width: 1px;
          background: var(--color-border);
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 44px;
          padding: 0.7rem 1.4rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.005em;
          position: relative;
          overflow: hidden;
        }
        .hero-cta-secondary { color: var(--color-text); }

        /* Photo */
        .hero-photo-wrapper {
          position: relative;
          margin-top: 2rem;
        }
        .portrait-corner {
          position: absolute;
          width: 14px;
          height: 14px;
          border: 1px solid var(--color-accent);
          opacity: 0.6;
          pointer-events: none;
        }
        .portrait-corner--tl {
          top: -7px; left: -7px;
          border-right: none;
          border-bottom: none;
        }
        .portrait-corner--br {
          bottom: -7px; right: -7px;
          border-left: none;
          border-top: none;
        }

        .hero-scroll-indicator {
          position: absolute;
          bottom: clamp(1.5rem, 4vw, 2.5rem);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          color: var(--color-text-muted);
          z-index: 2;
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-desktop-layout { display: none !important; }
          .hero-mobile-layout  { display: block; }
        }

        .mobile-hero-shell {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100dvh;
          padding: max(80px, env(safe-area-inset-top, 80px)) 1.25rem
                   max(2rem, env(safe-area-inset-bottom, 2rem));
          text-align: center;
          gap: 0;
          position: relative;
        }

        .mobile-hero-photo-wrap {
          position: relative;
          width: 188px;
          height: 188px;
          flex-shrink: 0;
          margin-bottom: 1.75rem;
          margin-top: 0.5rem;
        }
        .mobile-hero-photo-frame {
          position: relative;
          z-index: 1;
          width: 188px;
          height: 188px;
          border-radius: 50% !important;
          overflow: hidden;
          border: 1px solid var(--color-border-strong);
          box-shadow: var(--shadow-md);
        }
        .mobile-hero-photo-frame::before,
        .mobile-hero-photo-frame::after { border-radius: 50%; }
        .mobile-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .mobile-hero-badge {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border-strong);
          border-radius: 9999px;
          padding: 5px 12px;
          font-size: 0.7rem;
          font-weight: 500;
          color: var(--color-text-muted);
          letter-spacing: 0.04em;
          white-space: nowrap;
          font-family: var(--font-mono);
          text-transform: uppercase;
        }

        .mobile-hero-identity { margin-bottom: 1rem; }
        .mobile-hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 10vw, 3rem);
          font-weight: 600;
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: var(--color-text);
          margin-bottom: 0.85rem;
          text-wrap: balance;
        }
        .mobile-hero-role {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--color-accent);
          font-weight: 500;
        }

        .mobile-hero-tagline {
          font-size: 0.97rem;
          color: var(--color-text-muted);
          line-height: 1.7;
          max-width: 30rem;
          margin: 0 auto 1.75rem;
          font-weight: 400;
          padding: 0 0.25rem;
        }

        .mobile-hero-ctas {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          width: 100%;
          max-width: 420px;
          margin-bottom: 1.75rem;
        }
        .mobile-cta-primary,
        .mobile-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          min-height: 48px;
          padding: 0.75rem 1rem;
          border-radius: 9999px;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          letter-spacing: 0.005em;
        }
        .mobile-cta-primary:active,
        .mobile-cta-secondary:active { transform: scale(0.97); }

        .mobile-hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          width: 100%;
          max-width: 420px;
          margin-bottom: 1.5rem;
        }
        .mobile-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 0.95rem 0.5rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          transition: border-color 0.2s;
        }
        .mobile-stat-card:active { transform: scale(0.98); }
        .mobile-stat-num {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 600;
          line-height: 1;
          color: var(--color-text);
          letter-spacing: -0.02em;
        }
        .mobile-stat-label {
          font-family: var(--font-mono);
          font-size: 0.66rem;
          color: var(--color-text-muted);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 500;
        }

        .mobile-scroll-nudge {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--color-text-muted);
          opacity: 0.4;
          margin-top: auto;
          padding-top: 0.5rem;
        }
      `}</style>
    </section>
  )
}
