import { Sun, Moon } from 'lucide-react'

/**
 * ThemeToggle — calm icon button with a smooth Sun/Moon morph.
 * Uses lucide icons (no emojis). Hairline border + accent on hover.
 */
export default function ThemeToggle({ isDark, setIsDark, compact = false }) {
  const size = compact ? 36 : 44
  const iconSize = compact ? 15 : 17

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const iconWrap = {
    position: 'absolute',
    inset: 0,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'opacity 0.22s cubic-bezier(0.22, 1, 0.36, 1), transform 0.22s cubic-bezier(0.22, 1, 0.36, 1)',
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="theme-toggle"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 9999,
        border: '1px solid var(--color-border-strong)',
        background: 'transparent',
        cursor: 'pointer',
        color: 'var(--color-text-muted)',
        padding: 0,
        flexShrink: 0,
        transition:
          'border-color var(--motion-duration-base) var(--motion-ease), background var(--motion-duration-base) var(--motion-ease), color var(--motion-duration-base) var(--motion-ease)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--color-accent) 60%, var(--color-border))'
        e.currentTarget.style.background = 'var(--color-surface)'
        e.currentTarget.style.color = 'var(--color-accent)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-strong)'
        e.currentTarget.style.background = 'transparent'
        e.currentTarget.style.color = 'var(--color-text-muted)'
      }}
    >
      <span style={{ display: 'inline-flex', position: 'relative', width: iconSize, height: iconSize }}>
        <span
          aria-hidden={!isDark}
          style={{
            ...iconWrap,
            opacity: isDark ? 1 : 0,
            transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(45deg) scale(0.6)',
          }}
        >
          <Sun size={iconSize} strokeWidth={1.8} />
        </span>
        <span
          aria-hidden={isDark}
          style={{
            ...iconWrap,
            opacity: isDark ? 0 : 1,
            transform: isDark ? 'rotate(-45deg) scale(0.6)' : 'rotate(0deg) scale(1)',
          }}
        >
          <Moon size={iconSize} strokeWidth={1.8} />
        </span>
      </span>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .theme-toggle span span { transition: none !important; transform: none !important; }
        }
      `}</style>
    </button>
  )
}
