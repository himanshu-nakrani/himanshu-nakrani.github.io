import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates from 80% of target to target once the element enters
 * the viewport. Starts near the final value to avoid misleading interim states.
 * Honours prefers-reduced-motion.
 *
 * Supports target as a string with a suffix (e.g. "75%", "100+", "2+").
 */
export function useCountUp(target, { duration = 450, decimals = 0 } = {}) {
  const ref = useRef(null)
  const parsed = parseTarget(target)
  const startValue = parsed.num !== null ? Math.round(parsed.num * 0.8) : 0
  const [value, setValue] = useState(startValue)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!ref.current) return
    if (typeof window === 'undefined') return
    if (parsed.num === null) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const node = ref.current
    let raf = 0
    const from = Math.round(parsed.num * 0.8)
    const range = parsed.num - from

    const animate = (startTime) => {
      const step = (t) => {
        const elapsed = t - startTime
        const progress = Math.min(1, elapsed / duration)
        const eased = 1 - Math.pow(1 - progress, 3)
        const next = from + range * eased
        setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next))
        if (progress < 1) {
          raf = requestAnimationFrame(step)
        }
      }
      raf = requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            observer.unobserve(node)
            if (reduce) {
              setValue(parsed.num)
            } else {
              requestAnimationFrame((t) => animate(t))
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [parsed.num, duration, decimals])

  if (parsed.num === null) {
    return { ref, value: target, suffix: '' }
  }
  return { ref, value, suffix: parsed.suffix }
}

function parseTarget(target) {
  if (typeof target === 'number') return { num: target, suffix: '' }
  if (typeof target !== 'string') return { num: null, suffix: '' }
  const match = target.match(/^(\d+(?:\.\d+)?)(.*)$/)
  if (!match) return { num: null, suffix: '' }
  return { num: parseFloat(match[1]), suffix: match[2] }
}
