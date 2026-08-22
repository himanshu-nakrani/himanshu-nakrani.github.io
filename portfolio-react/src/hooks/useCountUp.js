import { useEffect, useRef, useState } from 'react'

/**
 * Count-up for stat values like '100+', '75%', '1,240'.
 * Returns { value, suffix } where value counts up once `active` is true.
 */
export function useCountUp(raw, { duration = 1200, active = true } = {}) {
  const match = String(raw).match(/^([\d,]+)(.*)$/)
  const target = match ? Number.parseInt(match[1].replace(/,/g, ''), 10) : 0
  const suffix = match ? match[2] : String(raw)

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current || prefersReducedMotion) return undefined
    started.current = true

    let rafId = 0
    const startTime = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
      else setCount(target)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, duration, target, prefersReducedMotion])

  const display = prefersReducedMotion || !active ? target : count

  return {
    value: target >= 1000 ? display.toLocaleString('en-US') : String(display),
    suffix,
  }
}
