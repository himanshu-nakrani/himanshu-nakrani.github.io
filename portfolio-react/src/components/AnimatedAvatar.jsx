import { motion } from 'framer-motion'

/**
 * AnimatedAvatar - Tech-inspired animated SVG avatar replacing static photo
 * Features: rotating gradient rings, animated nodes, pulsing core
 */
export default function AnimatedAvatar() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  }

  const ringVariants = {
    animate: {
      rotate: 360,
      transition: { duration: 20, repeat: Infinity, ease: 'linear' },
    },
  }

  const reverseRingVariants = {
    animate: {
      rotate: -360,
      transition: { duration: 25, repeat: Infinity, ease: 'linear' },
    },
  }

  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  }

  const nodeVariants = {
    animate: (i) => ({
      opacity: [0.4, 1, 0.4],
      transition: { duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' },
    }),
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 300 300"
        aria-hidden="true"
        style={{ maxWidth: '320px', maxHeight: '320px' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="coreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4db8ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00d9ff" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(77, 184, 255, 0.05)" />
            <stop offset="100%" stopColor="rgba(77, 184, 255, 0)" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx="150" cy="150" r="140" fill="url(#bgGrad)" />

        {/* Outer rotating ring */}
        <motion.g variants={ringVariants} animate="animate" style={{ transformOrigin: '150px 150px' }}>
          <circle
            cx="150"
            cy="150"
            r="130"
            fill="none"
            stroke="url(#coreGrad)"
            strokeWidth="1"
            opacity="0.3"
          />
          <circle
            cx="150"
            cy="20"
            r="4"
            fill="#4db8ff"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Inner reverse-rotating ring */}
        <motion.g variants={reverseRingVariants} animate="animate" style={{ transformOrigin: '150px 150px' }}>
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="none"
            stroke="url(#coreGrad)"
            strokeWidth="1.5"
            opacity="0.4"
            strokeDasharray="4,6"
          />
          <circle
            cx="270"
            cy="150"
            r="3.5"
            fill="#00d9ff"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Tech nodes around the circle */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 150 + 90 * Math.cos(rad)
          const y = 150 + 90 * Math.sin(rad)
          return (
            <motion.g key={`node-${i}`} custom={i} variants={nodeVariants} animate="animate">
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="#4db8ff"
                opacity="0.6"
                filter="url(#glow)"
              />
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="none"
                stroke="#4db8ff"
                strokeWidth="1"
                opacity="0.3"
              />
            </motion.g>
          )
        })}

        {/* Core avatar shape - geometric hexagon-inspired */}
        <g>
          {/* Hexagon outline */}
          <motion.polygon
            points="150,85 200,115 200,175 150,205 100,175 100,115"
            fill="none"
            stroke="#4db8ff"
            strokeWidth="2"
            opacity="0.5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Core circle with pulsing effect */}
          <motion.circle
            cx="150"
            cy="145"
            r="25"
            fill="url(#coreGrad)"
            variants={pulseVariants}
            animate="animate"
            filter="url(#glow)"
          />

          {/* Inner detail */}
          <circle
            cx="150"
            cy="145"
            r="20"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.4"
          />

          {/* Center dot */}
          <circle
            cx="150"
            cy="145"
            r="3"
            fill="#ffffff"
            opacity="0.8"
          />
        </g>

        {/* Connecting lines from core to nodes */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const rad = (angle * Math.PI) / 180
          const x = 150 + 90 * Math.cos(rad)
          const y = 150 + 90 * Math.sin(rad)
          return (
            <line
              key={`line-${i}`}
              x1="150"
              y1="145"
              x2={x}
              y2={y}
              stroke="#4db8ff"
              strokeWidth="1"
              opacity="0.1"
            />
          )
        })}

        {/* Decorative corner elements */}
        <rect x="30" y="30" width="10" height="10" fill="none" stroke="#4db8ff" strokeWidth="1" opacity="0.3" />
        <rect x="260" y="30" width="10" height="10" fill="none" stroke="#4db8ff" strokeWidth="1" opacity="0.3" />
        <rect x="30" y="260" width="10" height="10" fill="none" stroke="#4db8ff" strokeWidth="1" opacity="0.3" />
        <rect x="260" y="260" width="10" height="10" fill="none" stroke="#4db8ff" strokeWidth="1" opacity="0.3" />
      </svg>
    </motion.div>
  )
}
