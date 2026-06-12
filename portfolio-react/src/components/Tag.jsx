export default function Tag({ children }) {
  return (
    <span
      className="tag-pill"
      style={{
        fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
        background: 'var(--color-surface)', color: 'var(--color-text-muted)',
        border: '1px solid var(--color-border)',
        padding: '4px 11px', borderRadius: 20,
        display: 'inline-block',
        transition: 'border-color 0.3s, color 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  )
}
