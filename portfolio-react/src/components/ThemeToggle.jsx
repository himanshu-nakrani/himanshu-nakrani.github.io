import { motion } from 'framer-motion'

export default function ThemeToggle({ isDark, setIsDark }) {
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
        width: 44,
        height: 44,
        borderRadius: 10,
        border: '1.5px solid rgba(0,217,255,0.3)',
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        cursor: 'pointer',
        transition: 'all 0.3s',
        color: 'var(--text)',
        padding: 0,
        boxShadow: '0 0 10px rgba(0,217,255,0.1)',
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
          <span style={{ fontSize: '1.2rem' }}>☀️</span>
        ) : (
          <span style={{ fontSize: '1.2rem' }}>🌙</span>
        )}
      </motion.div>
    </motion.button>
  )
}
