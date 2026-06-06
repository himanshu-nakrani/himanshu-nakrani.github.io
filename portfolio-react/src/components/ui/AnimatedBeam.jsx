import { useEffect, useId, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  fromAnchor = 'center',
  toAnchor = 'center',
  curvature = 0,
  duration = 3,
  delay = 0,
  pathColor = 'color-mix(in srgb, var(--color-border) 60%, transparent)',
  pathWidth = 1.5,
  gradientStart = 'var(--color-accent)',
  gradientEnd = 'color-mix(in srgb, var(--color-accent) 0%, transparent)',
  reverse = false,
}) {
  const id = useId()
  const reduce = useReducedMotion()
  const [path, setPath] = useState(null)
  const [box, setBox] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      const container = containerRef?.current
      const from = fromRef?.current
      const to = toRef?.current
      if (!container || !from || !to) return

      const cRect = container.getBoundingClientRect()
      const fRect = from.getBoundingClientRect()
      const tRect = to.getBoundingClientRect()

      const w = cRect.width
      const h = cRect.height
      setBox({ w, h })

      const anchor = (rect, kind) => {
        switch (kind) {
          case 'left':   return { x: rect.left, y: rect.top + rect.height / 2 }
          case 'right':  return { x: rect.right, y: rect.top + rect.height / 2 }
          case 'top':    return { x: rect.left + rect.width / 2, y: rect.top }
          case 'bottom': return { x: rect.left + rect.width / 2, y: rect.bottom }
          default:       return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        }
      }

      const fp = anchor(fRect, fromAnchor)
      const tp = anchor(tRect, toAnchor)

      const x1 = fp.x - cRect.left
      const y1 = fp.y - cRect.top
      const x2 = tp.x - cRect.left
      const y2 = tp.y - cRect.top

      const cx = (x1 + x2) / 2
      const cy = (y1 + y2) / 2 - curvature

      setPath(`M ${x1},${y1} Q ${cx},${cy} ${x2},${y2}`)
    }

    update()
    const ro = new ResizeObserver(update)
    if (containerRef?.current) ro.observe(containerRef.current)
    window.addEventListener('resize', update)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [containerRef, fromRef, toRef, curvature, fromAnchor, toAnchor])

  if (!path || !box.w) return null

  return (
    <svg
      aria-hidden="true"
      fill="none"
      width={box.w}
      height={box.h}
      viewBox={`0 0 ${box.w} ${box.h}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <path d={path} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={0.7} strokeLinecap="round" />
      {!reduce && (
        <motion.path
          d={path}
          strokeLinecap="round"
          strokeWidth={pathWidth + 0.5}
          stroke={`url(#${id})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 1, 0] }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.4, 1],
          }}
        />
      )}
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={reverse ? '100%' : '0%'} x2={reverse ? '0%' : '100%'} y1="0%" y2="0%">
          <stop offset="0%"   stopColor={gradientEnd} stopOpacity="0" />
          <stop offset="50%"  stopColor={gradientStart} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientEnd} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
