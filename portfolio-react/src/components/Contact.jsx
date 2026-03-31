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
        {/* Subtle background accent */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '60%',
            background: 'radial-gradient(circle, rgba(107, 155, 209, 0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(80px)',
          }}
        />
        
        <p
          style={{
            color: 'var(--text2)', 
            fontSize: 'clamp(1rem, 3vw, 1.125rem)', 
            marginBottom: '3rem',
            maxWidth: 520, 
            margin: '0 auto 3rem', 
            lineHeight: 1.8,
            fontWeight: 400,
            position: 'relative',
            zIndex: 1,
            padding: '0 1rem',
          }}
        >
          Open to interesting problems in AI, LLMs, and building things that matter.
        </p>

        <div style={{ 
          display: 'flex', 
          gap: 'clamp(1.25rem, 4vw, 2rem)', 
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
              style={{
                color: 'var(--text)',
                textDecoration: 'none',
                fontSize: 'clamp(0.875rem, 2.5vw, 0.9375rem)',
                fontWeight: 400,
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                opacity: 0,
                animation: `fadeIn 0.5s ease forwards ${i * 0.1}s`,
                padding: '0.5rem 0',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)'
                e.currentTarget.style.color = 'var(--accent)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.color = 'var(--text)'
              }}
            >
              {l.label}
            </a>
          ))}
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
      `}</style>
    </Section>
  )
}
