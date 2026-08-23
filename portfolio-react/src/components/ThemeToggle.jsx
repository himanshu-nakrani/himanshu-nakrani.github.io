import { Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/**
 * ThemeToggle — calm icon button with a smooth Sun/Moon morph.
 * Uses lucide icons (no emojis). Hairline border + accent on hover.
 */
export default function ThemeToggle({ isDark, setIsDark, compact = false }) {
  const reduceMotion = useReducedMotion()
  const size = compact ? 36 : 44
  const iconSize = compact ? 15 : 17

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  const variants = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, rotate: -45, scale: 0.6 },
        animate: { opacity: 1, rotate: 0, scale: 1 },
        exit:    { opacity: 0, rotate: 45, scale: 0.6 },
      }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="sun"
              {...variants}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Sun size={iconSize} strokeWidth={1.8} />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              {...variants}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'absolute', inset: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Moon size={iconSize} strokeWidth={1.8} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  )
}
