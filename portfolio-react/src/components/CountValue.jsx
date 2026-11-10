import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

function splitMetric(value) {
  const raw = String(value ?? '')
  if (/^\d+\.\d/.test(raw)) return null
  const match = raw.match(/^([\d,]+)(.*)$/)
  if (!match) return null
  const target = Number.parseInt(match[1].replace(/,/g, ''), 10)
  if (Number.isNaN(target)) return null
  return {
    target,
    suffix: match[2],
    grouped: match[1].includes(','),
  }
}

function formatCount(display, grouped) {
  if (!grouped || display < 1000) return String(display)
  return display.toLocaleString('en-US')
}

export default function CountValue({ value, className, style }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotion()
  const parsed = splitMetric(value)
  const [display, setDisplay] = useState(() => (parsed && !reduceMotion ? 0 : parsed?.target))

  useEffect(() => {
    const parts = splitMetric(value)
    if (!parts || !inView) return undefined
    if (reduceMotion) {
      setDisplay(parts.target)
      return undefined
    }
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(parts.target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, value])

  if (!parsed || display == null) {
    return <span ref={ref} className={className} style={style}>{value}</span>
  }

  return (
    <span ref={ref} className={className} style={style} aria-label={String(value)}>
      {formatCount(display, parsed.grouped)}{parsed.suffix}
    </span>
  )
}
