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
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(1.4rem, 4vw, 2.2rem)',
            maxWidth: 860,
            margin: '0 auto',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
            }}
          >
            <span style={{ display: 'inline-block', width: '0.625rem', height: '1px', background: 'var(--color-accent)', opacity: 0.6 }} />
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
                rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
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
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contact-pill-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
            minHeight: 44px;
            padding: 0.52rem 1.1rem;
            border-radius: 999px;
            border: 1px solid var(--color-border-strong);
            background: transparent;
            color: var(--color-text);
            text-decoration: none;
            font-size: 0.84rem;
            font-weight: 600;
            letter-spacing: 0.01em;
            position: relative;
            overflow: hidden;
            transition: transform 0.22s cubic-bezier(0.22, 1, 0.36, 1),
                        border-color 0.22s ease,
                        background 0.22s ease,
                        color 0.22s ease;
        }
        .contact-pill-link::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(174deg, rgba(255,255,255,0.08) 0%, transparent 50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .contact-pill-link:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateY(-2px);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
        }
        .contact-pill-link:hover::before {
          opacity: 1;
        }
      `}</style>
    </Section>
  )
}
