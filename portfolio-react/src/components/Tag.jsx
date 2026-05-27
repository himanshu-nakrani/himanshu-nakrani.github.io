export default function Tag({ children }) {
  return (
    <span
      className="tag-pill"
      style={{
        fontSize: '0.72rem', fontFamily: "'Fira Code', monospace",
        background: 'var(--surface)', color: 'var(--text2)',
        border: '1px solid var(--border)',
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
