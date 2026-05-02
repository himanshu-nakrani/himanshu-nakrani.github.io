import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Github, Linkedin } from 'lucide-react'

const stats = [
  { num: '2+', label: 'Years exp.', icon: '🏗️' },
  { num: '100+', label: 'Users served', icon: '👥' },
  { num: '75%', label: 'Latency cut', icon: '⚡' },
  { num: '2', label: 'Publications', icon: '📄' },
]

/* ─── Desktop layout (≥ 769px) ───────────────────────────────── */
function DesktopHero({ reduceMotion }) {
  const stagger = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } } }
  const fadeUp = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } } }
  const fadeScale = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } } }

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
            <span className="hero-kicker-line" aria-hidden="true" />
            Generative AI Engineer
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          style={{
            fontSize: 'clamp(2.75rem, 7vw, 4.4rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 'var(--display-weight)',
            lineHeight: 1.02,
            marginBottom: '1.6rem',
            letterSpacing: 'var(--display-tracking)',
            color: 'var(--text)',
            textWrap: 'balance',
          }}
        >
          Himanshu Nakrani
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{
            fontSize: '1.125rem',
            color: 'var(--text2)',
            maxWidth: '36rem',
            marginBottom: '2.2rem',
            lineHeight: 1.75,
            fontWeight: 400,
            borderLeft: '2px solid color-mix(in srgb, var(--color-accent) 45%, transparent)',
            paddingLeft: '1rem',
          }}
        >
          Production AI engineer focused on LLMs, RAG, and Text-to-SQL—from research ideas to systems used by real users.
        </motion.p>

        <motion.div
          variants={fadeUp}
          style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '3.25rem' }}
        >
          <a href="https://github.com/himanshu-nakrani" target="_blank" rel="noopener noreferrer"
            className="hero-cta hero-cta-primary glass-btn-primary" style={{ textDecoration: 'none' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Explore Projects</span>
          </a>
          <a href="https://www.linkedin.com/in/himanshu-nakrani/" target="_blank" rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary glass-btn" style={{ textDecoration: 'none' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Connect on LinkedIn</span>
          </a>
        </motion.div>

        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex', gap: 'clamp(1.5rem, 4vw, 3rem)', flexWrap: 'wrap',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid color-mix(in srgb, var(--border2) 80%, transparent)',
          }}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={fadeUp} className="hero-stat">
              <div style={{ fontSize: 'clamp(1.25rem, 4vw, 2rem)', fontFamily: 'var(--font-display)', fontWeight: 'var(--display-weight)', lineHeight: 1, color: 'var(--color-accent)', fontVariantNumeric: 'tabular-nums', marginBottom: '0.4rem' }}>
                {s.num}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text2)', letterSpacing: '0.06em', textTransform: 'uppercase', fontWeight: 400, whiteSpace: 'nowrap' }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeScale} initial="hidden" animate="show" style={{ flexShrink: 0 }}>
        <div className="hero-photo-wrapper" style={{ position: 'relative', marginTop: '3rem' }}>
          <div aria-hidden="true" style={{ position: 'absolute', inset: '-20px', borderRadius: 'var(--radius-lg)', background: 'radial-gradient(ellipse at 50% 60%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 70%)', filter: 'blur(24px)', zIndex: 0, pointerEvents: 'none' }} />
          <div style={{ width: 336, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '2px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border-strong))', position: 'relative', zIndex: 1, boxShadow: '0 24px 64px rgba(0,0,0,0.35)' }}>
            <img src="/himanshu.jpg" alt="Himanshu Nakrani" loading="eager" fetchPriority="high" width={336} height={336} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion ? {} : { delay: 1.8, duration: 0.8 }}
        className="hero-scroll-indicator"
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.6 }}>Scroll</span>
        <motion.div animate={reduceMotion ? {} : { y: [0, 6, 0] }} transition={reduceMotion ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ChevronDown size={18} style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>
    </>
  )
}

/* ─── Mobile layout (≤ 768px) ────────────────────────────────── */
function MobileHero({ reduceMotion }) {
  const container = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } }
  const up = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } } }
  const photoAnim = reduceMotion
    ? { hidden: {}, show: {} }
    : { hidden: { opacity: 0, scale: 0.88 }, show: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.25, 0.1, 0.25, 1] } } }

  return (
    <motion.div
      className="mobile-hero-shell"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {/* ── Photo card ── */}
      <motion.div variants={photoAnim} className="mobile-hero-photo-wrap">
        {/* Outer glow */}
        <div className="mobile-hero-glow" aria-hidden="true" />
        {/* Decorative ring */}
        <div className="mobile-hero-ring" aria-hidden="true" />
        {/* Photo */}
        <div className="mobile-hero-photo-frame">
          <img
            src="/himanshu.jpg"
            alt="Himanshu Nakrani"
            loading="eager"
            fetchPriority="high"
            className="mobile-hero-img"
          />
        </div>
        {/* Availability badge overlaid on photo */}
        <div className="mobile-hero-badge">
          <span className="mobile-hero-badge-dot" />
          Open to AI Roles
        </div>
      </motion.div>

      {/* ── Name + role ── */}
      <motion.div variants={up} className="mobile-hero-identity">
        <h1 className="mobile-hero-name">Himanshu Nakrani</h1>
        <div className="mobile-hero-role">
          <span className="mobile-hero-role-line" aria-hidden="true" />
          Generative AI Engineer
          <span className="mobile-hero-role-line" aria-hidden="true" />
        </div>
      </motion.div>

      {/* ── Tagline ── */}
      <motion.p variants={up} className="mobile-hero-tagline">
        LLMs · RAG · Text-to-SQL — from research to production systems used by real users.
      </motion.p>

      {/* ── CTA buttons ── */}
      <motion.div variants={up} className="mobile-hero-ctas">
        <a
          href="https://github.com/himanshu-nakrani"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-primary glass-btn-primary"
        >
          <Github size={16} />
          Explore Projects
        </a>
        <a
          href="https://www.linkedin.com/in/himanshu-nakrani/"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-cta-secondary glass-btn"
        >
          <Linkedin size={16} />
          Connect
        </a>
      </motion.div>

      {/* ── Stats grid ── */}
      <motion.div variants={up} className="mobile-hero-stats">
        {stats.map((s) => (
          <div key={s.label} className="mobile-stat-card">
            <span className="mobile-stat-icon" aria-hidden="true">{s.icon}</span>
            <span className="mobile-stat-num">{s.num}</span>
            <span className="mobile-stat-label">{s.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ── Scroll nudge ── */}
      <motion.div
        variants={up}
        className="mobile-scroll-nudge"
      >
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 5, 0] }}
          transition={reduceMotion ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Root export ────────────────────────────────────────────── */
export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="about">
      {/* Desktop */}
      <div className="hero-desktop-layout">
        <DesktopHero reduceMotion={reduceMotion} />
      </div>

      {/* Mobile */}
      <div className="hero-mobile-layout">
        <MobileHero reduceMotion={reduceMotion} />
      </div>

      <style>{`
        /* ── Shared desktop styles ── */
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
        .hero-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-mono);
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-accent);
          margin-bottom: 2rem;
          font-weight: 600;
        }
        .hero-kicker-line {
          display: inline-block;
          width: 1.5rem;
          height: 1.5px;
          background: linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 40%, transparent));
          border-radius: 2px;
          flex-shrink: 0;
        }
        .hero-stat {
          position: relative;
          padding-right: clamp(1.5rem, 4vw, 3rem);
        }
        .hero-stat:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0; top: 50%;
          transform: translateY(-50%);
          width: 1px; height: 60%;
          background: color-mix(in srgb, var(--color-border-strong) 60%, transparent);
        }
        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0.7rem 1.4rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .hero-cta-primary { color: #fff; }
        .hero-cta-secondary {
          color: var(--text);
          background: color-mix(in srgb, var(--surface2) 58%, transparent);
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
          color: var(--text2);
          z-index: 2;
        }

        /* ── Mobile layout ── */
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

        /* Photo */
        .mobile-hero-photo-wrap {
          position: relative;
          width: 192px;
          height: 192px;
          flex-shrink: 0;
          margin-bottom: 1.75rem;
          margin-top: 0.5rem;
        }
        .mobile-hero-glow {
          position: absolute;
          inset: -28px;
          border-radius: 50%;
          background: radial-gradient(
            ellipse at 50% 50%,
            color-mix(in srgb, var(--color-accent) 28%, transparent) 0%,
            transparent 68%
          );
          filter: blur(20px);
          pointer-events: none;
          z-index: 0;
          animation: mobile-glow-pulse 4s ease-in-out infinite alternate;
        }
        @keyframes mobile-glow-pulse {
          from { opacity: 0.7; transform: scale(0.95); }
          to   { opacity: 1;   transform: scale(1.05); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes mobile-glow-pulse { from, to { opacity: 0.85; transform: none; } }
        }
        .mobile-hero-ring {
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1.5px solid color-mix(in srgb, var(--color-accent) 28%, transparent);
          z-index: 0;
          animation: mobile-ring-rotate 12s linear infinite;
        }
        .mobile-hero-ring::before {
          content: '';
          position: absolute;
          top: -3px; left: 50%;
          transform: translateX(-50%);
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-accent);
          box-shadow: 0 0 8px var(--color-accent);
        }
        @keyframes mobile-ring-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .mobile-hero-ring { animation: none; }
        }
        .mobile-hero-photo-frame {
          position: relative;
          z-index: 1;
          width: 192px;
          height: 192px;
          border-radius: 50%;
          overflow: hidden;
          border: 2.5px solid color-mix(in srgb, var(--color-accent) 45%, var(--color-border-strong));
          box-shadow:
            0 0 0 4px color-mix(in srgb, var(--color-accent) 10%, transparent),
            0 20px 48px rgba(0,0,0,0.30);
        }
        .mobile-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .mobile-hero-badge {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background: var(--surface);
          border: 1px solid color-mix(in srgb, var(--color-success) 40%, var(--color-border));
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 0.71rem;
          font-weight: 600;
          color: var(--color-success);
          letter-spacing: 0.03em;
          white-space: nowrap;
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .mobile-hero-badge-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--color-success);
          animation: pulse 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* Identity */
        .mobile-hero-identity {
          margin-bottom: 1rem;
        }
        .mobile-hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 10vw, 3rem);
          font-weight: var(--display-weight);
          line-height: 1.04;
          letter-spacing: -0.025em;
          color: var(--text);
          margin-bottom: 0.75rem;
          text-wrap: balance;
        }
        .mobile-hero-role {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-accent);
          font-weight: 600;
        }
        .mobile-hero-role-line {
          flex: 1;
          max-width: 2.5rem;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--color-accent)
          );
          flex-shrink: 0;
        }
        .mobile-hero-role-line:last-child {
          background: linear-gradient(
            90deg,
            var(--color-accent),
            transparent
          );
        }

        /* Tagline */
        .mobile-hero-tagline {
          font-size: 0.97rem;
          color: var(--text2);
          line-height: 1.7;
          max-width: 30rem;
          margin: 0 auto 1.75rem;
          font-weight: 400;
          padding: 0 0.25rem;
        }

        /* CTAs */
        .mobile-hero-ctas {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
          width: 100%;
          max-width: 420px;
          margin-bottom: 1.75rem;
        }
        .mobile-cta-primary,
        .mobile-cta-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          min-height: 48px;
          padding: 0.75rem 1rem;
          border-radius: 999px;
          font-size: 0.86rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .mobile-cta-primary  { color: #fff; }
        .mobile-cta-primary:active  { transform: scale(0.97); }
        .mobile-cta-secondary { color: var(--text); }
        .mobile-cta-secondary:active { transform: scale(0.97); }

        /* Stats */
        .mobile-hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.6rem;
          width: 100%;
          max-width: 420px;
          margin-bottom: 1.5rem;
        }
        .mobile-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.2rem;
          padding: 0.9rem 0.5rem;
          background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
          border: 1px solid var(--border);
          border-radius: 14px;
          position: relative;
          overflow: hidden;
          transition: border-color 0.2s, transform 0.2s;
        }
        .mobile-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, transparent));
          opacity: 0.5;
        }
        .mobile-stat-card:active { transform: scale(0.98); }
        .mobile-stat-icon {
          font-size: 1.15rem;
          line-height: 1;
          margin-bottom: 0.15rem;
        }
        .mobile-stat-num {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: var(--display-weight);
          line-height: 1;
          color: var(--color-accent);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
        }
        .mobile-stat-label {
          font-size: 0.68rem;
          color: var(--text2);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          font-weight: 500;
        }

        /* Scroll nudge */
        .mobile-scroll-nudge {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: var(--text2);
          opacity: 0.4;
          margin-top: auto;
          padding-top: 0.5rem;
        }

        /* Light mode adjustments */
        :root[data-theme="light"] .mobile-stat-card {
          background: rgba(255,255,255,0.75);
          box-shadow: 0 2px 8px rgba(26,21,19,0.06);
        }
        :root[data-theme="light"] .mobile-hero-badge {
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 16px rgba(26,21,19,0.12);
        }
        :root[data-theme="light"] .mobile-hero-photo-frame {
          box-shadow:
            0 0 0 4px color-mix(in srgb, var(--color-accent) 12%, transparent),
            0 16px 40px rgba(26,21,19,0.18);
        }
      `}</style>
    </section>
  )
}
