import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function TextGenerateEffect({
  words,
  as = 'span',
  className = '',
  style = {},
  delay = 0,
  duration = 0.55,
  stagger = 0.06,
}) {
  const Tag = as
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  const tokens = String(words).split(/(\s+)/)

  if (reduce) {
    return <Tag ref={ref} className={className} style={style}>{words}</Tag>
  }

  return (
    <Tag ref={ref} className={className} style={{ ...style, display: 'inline-block' }}>
      {tokens.map((tok, i) =>
        /^\s+$/.test(tok) ? (
          <span key={i}>{tok}</span>
        ) : (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.22, 0.61, 0.36, 1],
            }}
            style={{ display: 'inline-block', willChange: 'transform, opacity, filter' }}
          >
            {tok}
          </motion.span>
        )
      )}
    </Tag>
  )
}
