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
        border: '1px solid var(--color-border)',
        background: 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))',
        cursor: 'pointer',
        color: 'var(--color-text)',
        padding: 0,
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color var(--motion-duration-base) var(--motion-ease), background var(--motion-duration-base) var(--motion-ease), transform var(--motion-duration-base) var(--motion-ease)',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-accent)'
        e.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 24%, var(--color-surface))'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.background = 'color-mix(in srgb, var(--color-accent) 12%, var(--color-surface))'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <span style={{ fontSize: compact ? '0.875rem' : '1rem' }}>
        {isDark ? '☀️' : '🌙'}
      </span>
    </button>
  )
}
