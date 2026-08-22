import { motion, useReducedMotion } from 'framer-motion'

/**
 * Scroll-into-view reveal wrapper. Honors prefers-reduced-motion.
 */
export default function Reveal({ children, delay = 0, y = 24, className, ...rest }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
