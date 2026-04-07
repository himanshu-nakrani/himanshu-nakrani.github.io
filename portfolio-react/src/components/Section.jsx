export default function Section({ id, title, subtitle, alt, children }) {
  return (
    <section id={id} style={{
      padding: 'var(--section-pad-y) var(--page-pad-x)', 
      background: alt ? 'var(--bg2)' : 'var(--bg)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <div>
          <h2 style={{
            fontSize: 'clamp(2.05rem, 5vw, 2.95rem)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            marginBottom: subtitle ? '1rem' : '3rem',
            letterSpacing: '-0.03em',
            color: 'var(--text)',
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{
              color: 'var(--text2)',
              fontSize: '1.05rem',
              maxWidth: 600,
              marginBottom: '3rem',
              lineHeight: 1.7,
              fontWeight: 500,
            }}>
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
