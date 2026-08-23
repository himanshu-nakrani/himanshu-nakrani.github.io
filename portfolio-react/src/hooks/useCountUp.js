import { useEffect } from 'react'
import { useSpring, useTransform, useMotionValue } from 'framer-motion'

/**
 * useCountUp — animates a number once active. Resets when target changes so
 * refreshed stats animate to their new value instead of freezing at the old one.
 *
 * ⚡ Bolt Optimization: Migrated from custom requestAnimationFrame and React state
 * to Framer Motion's useSpring and useMotionValue. This allows DOM-level updates
 * (via <motion.span>) that completely bypass React re-renders, eliminating garbage
 * collection churn and reducing layout thrashing on the main thread during animations.
 */
export function useCountUp(target, duration = 450, active = true) {
  const node = useMotionValue(0)
  const spring = useSpring(node, {
    duration,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => Math.round(current))

  useEffect(() => {
    if (active) {
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.set(target)
        spring.set(target) // snap to target
      } else {
        node.set(target)
      }
    }
  }, [active, target, node, spring])

  // Instead of a primitive number, return the MotionValue so the caller can render it
  // without triggering a React render phase. Return 0 directly if inactive to match prior logic.
  return active ? display : 0
}
