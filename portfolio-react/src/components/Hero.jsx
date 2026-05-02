import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function HeroPhoto({ src, alt, size = 280, style: extraStyle }) {
  return (
    <div
      className="hero-photo-wrapper"
      style={{
        position: 'relative',
        flexShrink: 0,
        alignSelf: 'flex-start',
        marginTop: '3rem',
        ...extraStyle,
      }}
    >
      {/* Ambient glow behind photo */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: 'var(--radius-lg)',
          background: 'radial-gradient(ellipse at 50% 60%, color-mix(in srgb, var(--color-accent) 22%, transparent) 0%, transparent 70%)',
          filter: 'blur(24px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        className="hero-photo"
        style={{
          width: size,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '2px solid color-mix(in srgb, var(--color-accent) 35%, var(--color-border-strong))',
          position: 'relative',
          zIndex: 1,
          boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px color-mix(in srgb, var(--color-accent) 12%, transparent)',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="eager"
          fetchPriority="high"
          width={size}
          height={size}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </div>
  )
}

const stats = [
  { num: '2+', label: 'Years exp.' },
  { num: '100+', label: 'Users served' },
  { num: '75%', label: 'Latency cut' },
  { num: '2', label: 'Publications' },
]

export default function Hero() {
  const reduceMotion = useReducedMotion()

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
    <section
      id="about"
      style={{
        minHeight: 'min(100dvh, 900px)',
        display: 'flex',
        alignItems: 'center',
        padding: '96px var(--page-pad-x) max(3rem, env(safe-area-inset-bottom))',
        maxWidth: 'var(--page-max)',
        margin: '0 auto',
        gap: 'clamp(2rem, 6vw, 5rem)',
        position: 'relative',
      }}
    >
      <motion.div
        className="hero-copy"
        style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {/* Kicker */}
        <motion.div variants={fadeUp}>
          <span className="hero-kicker">
            <span className="hero-kicker-line" aria-hidden="true" />
            Generative AI Engineer
          </span>
        </motion.div>

        {/* Name */}
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

        {/* Tagline */}
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

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            gap: '0.85rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '3.25rem',
          }}
        >
          <a
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-primary glass-btn-primary"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Explore Projects</span>
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-nakrani/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary glass-btn"
            style={{ textDecoration: 'none' }}
          >
            <span style={{ position: 'relative', zIndex: 1 }}>Connect on LinkedIn</span>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            flexWrap: 'wrap',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid color-mix(in srgb, var(--border2) 80%, transparent)',
          }}
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="hero-stat"
              style={{ minWidth: 'min-content' }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--display-weight)',
                  lineHeight: 1,
                  color: 'var(--color-accent)',
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: 'clamp(0.375rem, 1.5vw, 0.5rem)',
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 'clamp(0.75rem, 2vw, 0.8125rem)',
                  color: 'var(--text2)',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  whiteSpace: 'nowrap',
                }}
              >
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div variants={fadeScale} initial="hidden" animate="show">
        <HeroPhoto src="/himanshu.jpg" alt="Himanshu Nakrani" size={336} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reduceMotion ? {} : { delay: 1.8, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--text2)',
          zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, opacity: 0.6 }}>
          Scroll
        </span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={reduceMotion ? {} : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ opacity: 0.5 }} />
        </motion.div>
      </motion.div>

      <style>{`
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
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 60%;
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
          border-color: var(--ghost-border);
          background: color-mix(in srgb, var(--surface2) 58%, transparent);
        }
        @media (max-width: 768px) {
          #about {
            flex-direction: column !important;
            padding-top: max(88px, env(safe-area-inset-top)) !important;
            align-items: stretch !important;
            min-height: min(100dvh, 920px) !important;
          }
          .hero-copy { width: 100%; }
          .hero-photo { width: 216px !important; height: auto !important; align-self: center; order: -1; }
          .hero-photo-wrapper { align-self: center !important; margin-top: 0 !important; order: -1; }
          .hero-cta { width: 100%; }
          .hero-stat:not(:last-child)::after { display: none; }
          .hero-stat { padding-right: 0; }
        }
        @media (max-width: 480px) {
          #about {
            padding-left: max(var(--page-pad-x), env(safe-area-inset-left)) !important;
            padding-right: max(var(--page-pad-x), env(safe-area-inset-right)) !important;
          }
        }
      `}</style>
    </section>
  )
}
