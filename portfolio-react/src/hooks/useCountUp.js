import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — animates a numeric value from 0 to `target` once when the
 * referenced element enters the viewport. Honours prefers-reduced-motion.
 *
 * Returns: { ref, value }
 *   - ref: attach to the element you want to observe
 *   - value: current displayed number (starts at 0, ends at target)
 *
 * Supports `target` as a string with a suffix (e.g. "75%", "100+", "2+")
 * by parsing the leading integer; non-numeric returns target verbatim.
 */
export function useCountUp(target, { duration = 900, decimals = 0 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)
  const startedRef = useRef(false)

  // Parse "75%" → { num: 75, suffix: "%" }, "100+" → { num: 100, suffix: "+" }
  const parsed = parseTarget(target)

  useEffect(() => {
    if (!ref.current) return
    if (typeof window === 'undefined') return
    if (parsed.num === null) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(parsed.num)
      return
    }

    const node = ref.current
    let raf = 0
    let startTime = 0

    const step = (t) => {
      if (!startTime) startTime = t
      const elapsed = t - startTime
      const progress = Math.min(1, elapsed / duration)
      // ease-out-cubic for a calm, decelerating curve
      const eased = 1 - Math.pow(1 - progress, 3)
      const next = parsed.num * eased
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.round(next))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            raf = requestAnimationFrame(step)
            observer.unobserve(node)
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
