/**
 * Unified motion system for the portfolio
 * Provides consistent animation variants and utilities
 */

// Timing presets (match tokens.css)
export const duration = {
  instant: 0,
  fast: 0.15,
  base: 0.25,
  slow: 0.4,
  slower: 0.6,
}

// Easing presets (match tokens.css)
export const ease = {
  default: [0.645, 0.045, 0.355, 1],    // ease-in-out
  out: [0.215, 0.61, 0.355, 1],          // ease-out (decelerate)
  in: [0.55, 0.055, 0.675, 0.19],        // ease-in (accelerate)
  spring: [0.175, 0.885, 0.32, 1.275],   // overshoot
}

// Common animation variants
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: duration.base, ease: ease.out }
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: duration.slow, ease: ease.out }
  },
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: duration.slow, ease: ease.out }
  },
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: duration.slow, ease: ease.out }
  },
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: duration.slow, ease: ease.out }
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: duration.base, ease: ease.out }
  },
}

// Stagger container variant
export const staggerContainer = (staggerDelay = 0.08, delayChildren = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: delayChildren,
    },
  },
})

// Stagger item variant
export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.out },
  },
}

// Page transition variants
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: duration.slow, 
      ease: ease.out,
    }
  },
  exit: { 
    opacity: 0, 
    y: -8,
    transition: { 
      duration: duration.fast, 
      ease: ease.in 
    }
  },
}

// Modal/dialog variants
export const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: duration.fast }
  },
  exit: { 
    opacity: 0,
    transition: { duration: duration.fast }
  },
}

export const modalContent = {
  hidden: { opacity: 0, scale: 0.96, y: -10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: duration.base, ease: ease.spring }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96, 
    y: -10,
    transition: { duration: duration.fast, ease: ease.in }
  },
}

// Hover lift effect (for cards)
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { 
    y: -4, 
    scale: 1.01,
    transition: { duration: duration.fast, ease: ease.out }
  },
  tap: { 
    y: 0, 
    scale: 0.98,
    transition: { duration: duration.instant }
  },
}

// Section reveal (scroll-triggered)
export const sectionReveal = {
  hidden: { 
    opacity: 0, 
    y: 40,
    clipPath: 'inset(0 0 100% 0)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    clipPath: 'inset(0 0 0% 0)',
    transition: { 
      duration: duration.slower, 
      ease: ease.out,
      clipPath: { duration: duration.slow }
    }
  },
}

// Line draw animation (for decorative elements)
export const lineDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1,
    transition: { 
      pathLength: { duration: duration.slower, ease: ease.out },
      opacity: { duration: duration.fast }
    }
  },
}

// Counter animation config
export const counterConfig = {
  duration: 0.8,
  ease: ease.out,
}

// Magnetic effect config
export const magneticConfig = {
  strength: 0.15,
  radius: 100,
  duration: duration.fast,
  ease: ease.out,
}

// Utility: creates delayed variants
export const withDelay = (variant, delay) => ({
  ...variant,
  visible: {
    ...variant.visible,
    transition: {
      ...variant.visible.transition,
      delay,
    },
  },
})

// Utility: creates viewport config for scroll animations
export const viewportConfig = {
  once: true,
  amount: 0.15,
  margin: "-50px",
}

// Numbered section animation (01., 02., etc.)
export const numberedSection = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: duration.slow,
      ease: ease.out,
    },
  }),
}

// Export all as default object too
export default {
  duration,
  ease,
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  staggerContainer,
  staggerItem,
  pageTransition,
  modalBackdrop,
  modalContent,
  hoverLift,
  sectionReveal,
  lineDraw,
  counterConfig,
  magneticConfig,
  withDelay,
  viewportConfig,
  numberedSection,
}
