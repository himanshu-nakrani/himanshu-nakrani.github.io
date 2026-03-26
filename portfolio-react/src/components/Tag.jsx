import { motion } from 'framer-motion'

export default function Tag({ children }) {
  return (
    <motion.span
      whileHover={{
        borderColor: 'var(--accent)',
        color: 'var(--accent)',
        boxShadow: '0 0 16px rgba(124,111,255,0.3)',
        backgroundColor: 'rgba(124,111,255,0.08)',
      }}
      style={{
        fontSize: '0.72rem', fontFamily: "'Fira Code', monospace",
        background: 'rgba(124,111,255,0.04)', color: 'var(--text2)',
        border: '1px solid rgba(124,111,255,0.25)',
        padding: '4px 11px', borderRadius: 20,
        display: 'inline-block',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        position: 'relative',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.span>
  )
}
