import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function HeroPhoto({ src, alt, size = 280, style: extraStyle }) {
  return (
    <div
      className="hero-photo"
      style={{
        width: size,
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        flexShrink: 0,
        border: '2px solid var(--border2)',
        position: 'relative',
        zIndex: 1,
        ...extraStyle,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        width={size}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
    </div>
  )
}

const stats = [
  { num: '2+', label: 'Years exp.' },
  { num: '100+', label: 'Users served' },
  { num: '75%', label: 'Latency cut' },
  { num: '2', label: 'Publications' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Hero() {
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
        <motion.div variants={fadeUp}>
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text2)',
              marginBottom: '2rem',
              fontWeight: 500,
              position: 'relative',
              paddingLeft: '1.5rem',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '1rem',
                height: '1px',
                background: 'var(--accent)',
              }}
            />
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
          }}
        >
          Production AI engineer focused on LLMs, RAG, and Text-to-SQL—from research ideas to systems used by real users.
        </motion.p>

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
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              style={{ minWidth: 'min-content' }}
            >
              <div
                style={{
                  fontSize: 'clamp(1.25rem, 4vw, 2rem)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 'var(--display-weight)',
                  lineHeight: 1,
                  color: 'var(--text)',
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
        <HeroPhoto src="/himanshu.jpg" alt="Himanshu Nakrani" size={336} style={{ alignSelf: 'flex-start', marginTop: '3rem' }} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
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
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500 }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={18} style={{ opacity: 0.6 }} />
        </motion.div>
      </motion.div>

      <style>{`
        .hero-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0.7rem 1.2rem;
          border-radius: 999px;
          font-size: 0.88rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
        }
        .hero-cta-primary { color: #f8fbff; }
        .hero-cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(174deg, rgba(255,255,255,0.22) 0%, transparent 50%);
          pointer-events: none;
        }
        .hero-cta-primary:hover { transform: translateY(-1px); }
        .hero-cta-secondary { color: var(--text); }
        .hero-cta-secondary:hover { transform: translateY(-1px); }
        @media (max-width: 768px) {
          #about {
            flex-direction: column !important;
            padding-top: max(88px, env(safe-area-inset-top)) !important;
            align-items: stretch !important;
            min-height: min(100dvh, 920px) !important;
          }
          .hero-copy { width: 100%; }
          .hero-photo { width: 216px !important; height: auto !important; align-self: center; order: -1; }
          .hero-cta { width: 100%; }
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
