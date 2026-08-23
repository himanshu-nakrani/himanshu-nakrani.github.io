import { useEffect, useRef, useState } from 'react'

export function parseStatValue(value) {
  const match = value.match(/^(\d+)(.*)$/)
  if (!match) return { numeric: 0, suffix: value }
  return { numeric: Number.parseInt(match[1], 10), suffix: match[2] }
}

export function useCountUp(target, duration, active) {
  const [count, setCount] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!active || started.current) return

    started.current = true
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
  }, [active, duration, target])

  return active ? count : 0
}
