import { useEffect } from 'react'
import { useSpring, useTransform } from 'framer-motion'

/**
 * Count-up for stat values like '100+', '75%', '1,240'.
 * Returns { value, suffix } where value counts up once `active` is true.
 * `value` is a motion value so a motion element can paint frames without React renders.
 */
export function useCountUp(raw, { duration = 1200, active = true } = {}) {
  const match = String(raw).match(/^([\d,]+)(.*)$/)
  const target = match ? Number.parseInt(match[1].replace(/,/g, ''), 10) : 0
  const suffix = match ? match[2] : String(raw)
  const seconds = duration > 0 ? duration / 1000 : 0

  // Start on the final number so an inactive stat matches the previous hook.
  const spring = useSpring(target, { duration: seconds, bounce: 0 })
  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current)
    return target >= 1000 ? rounded.toLocaleString('en-US') : String(rounded)
  })

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!active || reduce || seconds === 0) {
      spring.jump(target)
      return () => spring.stop()
    }
    // jump snaps. set() on a spring that already sits on `target` does not move.
    spring.jump(0)
    spring.set(target)
    return () => spring.stop()
  }, [active, target, seconds, spring])

  return {
    value: display,
    suffix,
  }
}
