import { motion, useReducedMotion } from 'framer-motion'

export default function AuroraBackground({ className = '', style = {}, intensity = 0.55 }) {
  const reduce = useReducedMotion()

  const base = {
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 0,
    ...style,
  }

  if (reduce) {
    return (
      <div aria-hidden="true" className={className} style={base}>
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            background:
              'radial-gradient(60% 50% at 30% 30%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 60%),' +
              'radial-gradient(50% 40% at 70% 70%, color-mix(in srgb, var(--color-accent-secondary, var(--color-accent)) 12%, transparent), transparent 65%)',
            opacity: intensity,
          }}
        />
      </div>
    )
  }

  return (
    <div aria-hidden="true" className={className} style={base}>
      <motion.div
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
        style={{
          position: 'absolute',
          inset: '-30%',
          background:
            'conic-gradient(from 0deg at 50% 50%, color-mix(in srgb, var(--color-accent) 24%, transparent), transparent 25%, color-mix(in srgb, var(--color-accent-secondary, var(--color-accent)) 18%, transparent) 45%, transparent 65%, color-mix(in srgb, var(--color-accent) 22%, transparent) 85%, transparent)',
          filter: 'blur(70px)',
          opacity: intensity,
          willChange: 'transform',
        }}
      />
      <motion.div
        initial={{ x: '-10%', y: '-5%' }}
        animate={{ x: ['-10%', '8%', '-10%'], y: ['-5%', '6%', '-5%'] }}
        transition={{ duration: 14, ease: 'easeInOut', repeat: Infinity }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '20%',
          width: '50%',
          height: '50%',
          background:
            'radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 28%, transparent), transparent 70%)',
          filter: 'blur(60px)',
          mixBlendMode: 'screen',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, transparent 0%, var(--color-bg) 95%)',
        }}
      />
    </div>
  )
}
