import { motion } from 'framer-motion'

export default function Tag({ children }) {
  return (
    <motion.span
      whileHover={{
        borderColor: 'var(--accent)',
        color: 'var(--accent)',
      }}
      style={{
        fontSize: '0.72rem', fontFamily: "'Fira Code', monospace",
        background: 'var(--surface)', color: 'var(--text2)',
        border: '1px solid var(--border)',
        padding: '4px 11px', borderRadius: 20,
        display: 'inline-block',
        transition: 'all 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.span>
  )
}
