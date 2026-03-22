import { motion } from 'framer-motion'

export default function Tag({ children }) {
  return (
    <motion.span
      whileHover={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
      style={{
        fontSize: '0.72rem', fontFamily: "'Fira Code', monospace",
        background: 'var(--surface2)', color: 'var(--text2)',
        border: '1px solid var(--border)',
        padding: '3px 10px', borderRadius: 20,
        display: 'inline-block', transition: 'color 0.2s, border-color 0.2s',
        cursor: 'default',
      }}
    >
      {children}
    </motion.span>
  )
}
