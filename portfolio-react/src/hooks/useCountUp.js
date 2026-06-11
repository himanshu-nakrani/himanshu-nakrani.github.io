import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a number once active. Resets when target changes so
 * refreshed stats animate to their new value instead of freezing at the old one.
 */
export function useCountUp(target, duration = 450, active = true) {
  const [count, setCount] = useState(0)
  const startedRef = useRef(false)
  const previousTargetRef = useRef(target)

  useEffect(() => {
    if (previousTargetRef.current !== target) {
      previousTargetRef.current = target
      startedRef.current = false
    }

    if (!active || startedRef.current) return undefined
    startedRef.current = true

    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const timer = setTimeout(() => setCount(target), 0)
      return () => clearTimeout(timer)
    }

    let rafId = 0
    const startTime = performance.now()
    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [active, target, duration])

  return active ? count : 0
}
