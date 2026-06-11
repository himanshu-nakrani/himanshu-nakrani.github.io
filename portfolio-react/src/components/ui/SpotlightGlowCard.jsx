import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

let stylesInjected = false
const SPOTLIGHT_CSS = `
  [data-spotlight] {
    position: relative;
  }
  [data-spotlight]::before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background:
      radial-gradient(
        var(--spotlight-size, 320px) circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
        color-mix(in srgb, var(--spotlight-color, var(--color-accent)) 70%, transparent),
        color-mix(in srgb, var(--color-accent-secondary) 25%, transparent) 55%,
        transparent 75%
      );
    opacity: var(--spotlight-opacity, 0);
    transition: opacity 240ms ease;
    pointer-events: none;
    z-index: 0;
    mask:
      linear-gradient(white, white) content-box,
      linear-gradient(white, white);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 1px;
  }
  [data-spotlight]::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background:
      radial-gradient(
        var(--spotlight-size, 320px) circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%),
        color-mix(in srgb, var(--spotlight-color, var(--color-accent)) 20%, transparent),
        transparent 60%
      );
    opacity: var(--spotlight-opacity, 0);
    transition: opacity 240ms ease;
    pointer-events: none;
    z-index: 0;
  }
  [data-spotlight] > * { position: relative; z-index: 1; }
`

export default function SpotlightGlowCard({
  children,
  className = '',
  style = {},
  size = 320,
  as = 'div',
}) {
  const Tag = as
  const reduce = useReducedMotion()
  const ref = useRef(null)

  useEffect(() => {
    if (stylesInjected || typeof document === 'undefined') return
    const styleEl = document.createElement('style')
    styleEl.setAttribute('data-spotlight-glow', '')
    styleEl.textContent = SPOTLIGHT_CSS
    document.head.appendChild(styleEl)
    stylesInjected = true
  }, [])

  useEffect(() => {
    if (reduce) return
    const el = ref.current
    if (!el) return

    let rafId = 0
    let nextX = 0
    let nextY = 0
    let pending = false

    const apply = () => {
      rafId = 0
      pending = false
      el.style.setProperty('--spotlight-x', `${nextX}px`)
      el.style.setProperty('--spotlight-y', `${nextY}px`)
    }

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      nextX = e.clientX - rect.left
      nextY = e.clientY - rect.top
      if (!pending) {
        pending = true
        rafId = requestAnimationFrame(apply)
      }
    }
    const onEnter = () => el.style.setProperty('--spotlight-opacity', '1')
    const onLeave = () => el.style.setProperty('--spotlight-opacity', '0')

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [reduce])

  return (
    <Tag
      ref={ref}
      data-spotlight=""
      className={className}
      style={{ '--spotlight-size': `${size}px`, ...style }}
    >
      {children}
    </Tag>
  )
}
