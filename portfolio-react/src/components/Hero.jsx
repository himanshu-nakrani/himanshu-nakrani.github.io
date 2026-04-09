import { Link } from 'react-router-dom'

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
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
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
      <div className="hero-copy" style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div>
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
        </div>

        <h1
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
          <span className="hero-name-gradient">Himanshu Nakrani</span>
        </h1>

        <p
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
        </p>

        <div
          style={{
            display: 'flex',
            gap: '0.85rem',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '3.25rem',
          }}
        >
          <Link
            to="/projects"
            className="hero-cta hero-cta-primary"
            style={{
              textDecoration: 'none',
            }}
          >
            Explore Projects
          </Link>
          <a
            href="https://www.linkedin.com/in/himanshu-nakrani/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta hero-cta-secondary"
            style={{
              textDecoration: 'none',
            }}
          >
            Connect on LinkedIn
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            flexWrap: 'wrap',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid color-mix(in srgb, var(--border2) 80%, transparent)',
          }}
        >
          {stats.map((s, i) => (
            <div 
              key={s.label}
              style={{
                opacity: 0,
                animation: `fadeInUp 0.6s ease forwards ${i * 0.1}s`,
                minWidth: 'min-content',
              }}
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
            </div>
          ))}
        </div>
      </div>

      <HeroPhoto src="/himanshu.jpg" alt="Himanshu Nakrani" size={336} style={{ alignSelf: 'flex-start', marginTop: '3rem' }} />

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
          border: 1px solid transparent;
          box-shadow: var(--shadow-sm);
        }
        .hero-cta-primary {
          background: var(--gradient-accent);
          color: #f8fbff;
          border-color: color-mix(in srgb, var(--accent2) 70%, transparent);
        }
        .hero-cta-primary:hover {
          transform: translateY(-1px);
          filter: saturate(1.06) brightness(1.04);
        }
        .hero-cta-secondary {
          color: var(--text);
          border-color: var(--ghost-border);
          background: color-mix(in srgb, var(--surface2) 58%, transparent);
        }
        .hero-cta-secondary:hover {
          border-color: var(--ghost-hover-border);
          background: var(--ghost-hover-bg);
          transform: translateY(-1px);
        }
        .hero-name-gradient {
          background: var(--gradient-accent);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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
