import { motion } from 'framer-motion'

export default function Tag({ children }) {
  return (
    <motion.span
      whileHover={{
        borderColor: 'rgba(79, 195, 247, 0.6)',
        color: 'var(--accent3)',
        boxShadow: '0 0 20px rgba(79,195,247,0.4), 0 0 40px rgba(124,111,255,0.2)',
        backgroundColor: 'rgba(124,111,255,0.12)',
        scale: 1.05,
      }}
      style={{
        fontSize: '0.72rem', fontFamily: "'Fira Code', monospace",
        background: 'rgba(124,111,255,0.08)', color: 'var(--text2)',
        border: '1px solid rgba(124,111,255,0.35)',
        padding: '4px 11px', borderRadius: 20,
        display: 'inline-block',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'default',
        position: 'relative',
        boxShadow: '0 0 10px rgba(124,111,255,0.1)',
      }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </motion.span>
  )
}
