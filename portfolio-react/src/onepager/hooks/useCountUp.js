import { useEffect, useRef } from 'react'
import { useSpring, useTransform, useMotionValue } from 'framer-motion'

/**
 * Count-up for stat values like '100+', '75%', '1,240'.
 * Returns { value, suffix } where value counts up once `active` is true.
 *
 * ⚡ Bolt Optimization: Migrated from custom requestAnimationFrame and React state
 * to Framer Motion's useSpring and useMotionValue. This allows DOM-level updates
 * (via <motion.span>) that completely bypass React re-renders, eliminating garbage
 * collection churn and reducing layout thrashing on the main thread during animations.
 */
export function useCountUp(raw, { duration = 1200, active = true } = {}) {
  const match = String(raw).match(/^([\d,]+)(.*)$/)
  const target = match ? Number.parseInt(match[1].replace(/,/g, ''), 10) : 0
  const suffix = match ? match[2] : String(raw)

  // Initialize to target so that if it renders outside the viewport
  // and active=false initially, it returns target (original behavior).
  const node = useMotionValue(target)

  // Convert duration from ms to seconds for Framer Motion's useSpring
  const spring = useSpring(node, {
    duration: duration / 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current)
    return target >= 1000 ? rounded.toLocaleString('en-US') : String(rounded)
  })

  const started = useRef(false)

  useEffect(() => {
    if (!active) return

    if (!started.current) {
      started.current = true
      if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        node.set(target)
      } else {
        // Animate from 0 to target
        node.set(0)
        spring.set(0)
        requestAnimationFrame(() => {
          node.set(target)
        })
      }
    }
  }, [active, target, node, spring])

  return {
    value: display,
    suffix,
  }
}
