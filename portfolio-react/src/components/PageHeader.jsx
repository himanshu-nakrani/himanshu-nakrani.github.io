/**
 * PageHeader — bracketed mono kicker + display H1 + lede.
 */
export default function PageHeader({ kicker, title, description, marginBottom = '2.5rem' }) {
  return (
    <header style={{ marginBottom, position: 'relative' }}>
      {kicker && (
        <p className="mvp2-kicker">
          <span style={{ opacity: 0.55 }}>[</span>
          <span>{kicker}</span>
          <span style={{ opacity: 0.55 }}>]</span>
        </p>
      )}
      <h1 className="mvp2-page-title">{title}</h1>
      {description && (
        <p
          className="mvp2-page-lede"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-lg)',
            lineHeight: 'var(--line-height-relaxed)',
            fontWeight: 400,
            maxWidth: '40rem',
            marginTop: '0.5rem',
            paddingLeft: 0,
            borderLeft: 'none',
          }}
        >
          {description}
        </p>
      )}
    </header>
  )
}
