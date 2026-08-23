import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const routeMeta = (pathname) => {
  if (pathname.startsWith('/projects/')) return 'architecture'
  if (pathname.startsWith('/research/')) return 'telemetry'
  if (pathname === '/experience') return 'trajectory'
  if (pathname === '/profiles') return 'signal'
  if (pathname === '/about') return 'capability'
  if (pathname === '/research') return 'experiment'
  if (pathname === '/projects') return 'systems'
  if (pathname === '/skills') return 'stack'
  if (pathname === '/lab') return 'prototype'
  return 'signal-field'
}

export default function ContextualRouteTransition({ children }) {
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const mode = routeMeta(location.pathname)

  return (
    <motion.div
      key={location.pathname}
      className={`context-route context-route--${mode}`}
      initial={reduceMotion ? false : { opacity: 0, y: 5, filter: 'blur(2px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.19, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="context-route__accent"
        aria-hidden="true"
        initial={reduceMotion ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: [0, 1, 0], opacity: [0, 0.7, 0] }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </motion.div>
  )
}
