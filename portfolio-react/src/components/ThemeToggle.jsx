export default function ThemeToggle({ isDark, setIsDark, compact = false }) {
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Dark mode"
      aria-pressed={isDark}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: compact ? 36 : 44,
        height: compact ? 36 : 44,
        borderRadius: 999,
        border: '1px solid var(--ghost-border)',
        background: 'var(--ghost-bg)',
        cursor: 'pointer',
        color: 'var(--text)',
        padding: 0,
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease, background 0.2s ease, transform 0.2s ease',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ghost-hover-border)'
        e.currentTarget.style.background = 'var(--ghost-hover-bg)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ghost-border)'
        e.currentTarget.style.background = 'var(--ghost-bg)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span style={{ fontSize: compact ? '0.875rem' : '1rem' }}>
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  )
}
