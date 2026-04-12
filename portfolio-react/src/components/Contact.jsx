import Section from './Section'

const links = [
  { label: 'Email', href: 'mailto:himanshunakrani0@gmail.com' },
  { label: 'GitHub', href: 'https://github.com/himanshu-nakrani' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/himanshu-nakrani/' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/himanshunakrani0/' },
  { label: 'Kaggle', href: 'https://www.kaggle.com/himanshunakrani' },
]

export default function Contact() {
  return (
    <Section id="contact" title="Get in Touch" alt>
      <div style={{ textAlign: 'center', position: 'relative' }}>
          <div
          className="glass-card"
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: 24,
            padding: 'clamp(1.4rem, 4vw, 2.2rem)',
            maxWidth: 860,
            margin: '0 auto',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--accent2)',
              marginBottom: '0.85rem',
            }}
          >
            Available for impactful AI work
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
              lineHeight: 1.14,
              letterSpacing: '-0.02em',
              color: 'var(--text)',
              marginBottom: '1rem',
            }}
          >
            Open to product-focused roles and collaborations in LLM systems.
          </h3>
          <p
            style={{
              color: 'var(--text2)',
              fontSize: 'clamp(0.97rem, 2.8vw, 1.08rem)',
              maxWidth: 620,
              margin: '0 auto 2rem',
              lineHeight: 1.75,
              fontWeight: 500,
              padding: '0 1rem',
            }}
          >
            If you are building AI products that need strong engineering depth, reliable systems, and measurable outcomes, I would love to connect.
          </p>

          <div style={{
            display: 'flex',
            gap: '0.7rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            position: 'relative',
            zIndex: 1,
            padding: '0 1rem',
          }}>
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener"
                className="contact-pill-link"
                style={{
                  opacity: 0,
                  animation: `fadeIn 0.55s ease forwards ${i * 0.08}s`,
                }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .contact-pill-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0.52rem 0.95rem;
          border-radius: 999px;
          border: 1px solid var(--glass-border);
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--surface2) 60%, transparent) 0%,
              color-mix(in srgb, var(--surface) 48%, transparent) 100%
            );
          backdrop-filter: blur(16px) saturate(var(--glass-saturation));
          -webkit-backdrop-filter: blur(16px) saturate(var(--glass-saturation));
          box-shadow:
            0 2px 12px color-mix(in srgb, var(--glass-shadow) 40%, transparent),
            inset 0 1px 0 var(--glass-specular);
          color: var(--text);
          text-decoration: none;
          font-size: 0.84rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          position: relative;
          overflow: hidden;
          transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      box-shadow 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                      border-color 0.22s ease;
        }
        .contact-pill-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(174deg, var(--glass-highlight) 0%, transparent 50%);
          pointer-events: none;
          opacity: 0.5;
          transition: opacity 0.22s ease;
        }
        .contact-pill-link:hover {
          border-color: color-mix(in srgb, var(--accent) 35%, var(--glass-border));
          color: var(--accent2);
          transform: translateY(-2px);
          box-shadow:
            0 6px 20px color-mix(in srgb, var(--glass-shadow) 60%, transparent),
            inset 0 1px 0 var(--glass-specular);
        }
        .contact-pill-link:hover::before {
          opacity: 1;
        }
      `}</style>
    </Section>
  )
}
