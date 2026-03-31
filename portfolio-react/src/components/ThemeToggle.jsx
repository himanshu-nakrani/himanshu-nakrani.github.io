export default function ThemeToggle({ isDark, setIsDark, compact = false }) {
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: compact ? 36 : 44,
        height: compact ? 36 : 44,
        borderRadius: 0,
        border: '1px solid var(--border)',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--text)',
        padding: 0,
        transition: 'border-color 0.2s ease',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--text)'}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <span style={{ fontSize: compact ? '0.875rem' : '1rem' }}>
        {isDark ? '☀' : '☾'}
      </span>
    </button>
  )
}
