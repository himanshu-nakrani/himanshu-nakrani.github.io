import { motion } from 'framer-motion'

export default function ThemeToggle({ isDark, setIsDark, compact = false }) {
  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: compact ? 36 : 44,
        height: compact ? 36 : 44,
        borderRadius: compact ? 999 : 10,
        border: compact ? '1px solid var(--border2)' : '1.5px solid rgba(0,217,255,0.3)',
        background: compact ? 'rgba(var(--bg-rgb), 0.4)' : 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        color: 'var(--text)',
        padding: 0,
        boxShadow: 'none',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        key={isDark ? 'dark' : 'light'}
        initial={{ opacity: 0, rotate: -180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {isDark ? (
          <span style={{ fontSize: compact ? '1rem' : '1.2rem' }}>☀️</span>
        ) : (
          <span style={{ fontSize: compact ? '1rem' : '1.2rem' }}>🌙</span>
        )}
      </motion.div>
    </motion.button>
  )
}
