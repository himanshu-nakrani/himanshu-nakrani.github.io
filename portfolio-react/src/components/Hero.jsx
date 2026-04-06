function HeroPhoto({ src, alt, size = 280, style: extraStyle }) {
  return (
    <div
      className="hero-photo"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
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
        height={size}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
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
      {/* Subtle background accent */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '-10%',
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(107, 155, 209, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)',
        }}
      />
      
      <div className="hero-copy" style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>
        <div>
          <span
            style={{
              display: 'inline-block',
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.875rem',
              letterSpacing: '0.02em',
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
            fontSize: 'clamp(2.5rem, 7vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            color: 'var(--text)',
          }}
        >
          Himanshu Nakrani
        </h1>

        <p
          style={{
            fontSize: '1.125rem',
            color: 'var(--text2)',
            maxWidth: '36rem',
            marginBottom: '3rem',
            lineHeight: 1.8,
            fontWeight: 400,
          }}
        >
          Production AI engineer focused on LLMs, RAG, and Text-to-SQL—from research ideas to systems used by real users.
        </p>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 2rem)',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '4rem',
          }}
        >
          <a
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text)',
              textDecoration: 'none',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
              fontWeight: 400,
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s ease',
              padding: '0.5rem 0',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-nakrani/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text)',
              textDecoration: 'none',
              fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
              fontWeight: 400,
              borderBottom: '1px solid transparent',
              transition: 'border-color 0.2s ease',
              padding: '0.5rem 0',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text)'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            LinkedIn
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            flexWrap: 'wrap',
            paddingTop: 'clamp(2rem, 4vw, 3rem)',
            borderTop: '1px solid var(--border)',
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
                  fontWeight: 600,
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
                  letterSpacing: '0.02em',
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

      <HeroPhoto src="/himanshu.jpg" alt="Himanshu Nakrani" size={280} style={{ alignSelf: 'flex-start', marginTop: '3rem' }} />

      <style>{`
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
          .hero-photo { width: 180px !important; height: 180px !important; align-self: center; order: -1; }
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
