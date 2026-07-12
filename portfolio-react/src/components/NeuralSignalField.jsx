import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const MOBILE_BREAKPOINT = 720
const LINE_COUNT = 13

function getStrokeColor() {
  const styles = getComputedStyle(document.documentElement)
  return styles.getPropertyValue('--color-accent').trim() || '#75b6c9'
}

export default function NeuralSignalField() {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return undefined

    const context = canvas.getContext('2d', { alpha: true })
    if (!context) return undefined

    let width = 0
    let height = 0
    let dpr = 1
    let visible = true
    let pageVisible = !document.hidden
    let strokeColor = getStrokeColor()
    const isMobile = () => width < MOBILE_BREAKPOINT

    const resize = () => {
      const rect = host.getBoundingClientRect()
      width = Math.max(1, Math.round(rect.width))
      height = Math.max(1, Math.round(rect.height))
      dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      pointerRef.current.x = width * 0.72
      pointerRef.current.y = height * 0.42
      pointerRef.current.targetX = pointerRef.current.x
      pointerRef.current.targetY = pointerRef.current.y
      draw(0)
    }

    const draw = (time) => {
      context.clearRect(0, 0, width, height)

      const pointer = pointerRef.current
      pointer.x += (pointer.targetX - pointer.x) * 0.055
      pointer.y += (pointer.targetY - pointer.y) * 0.055

      const staticMode = reduceMotion
      const elapsed = staticMode ? 0 : time * 0.00055
      const spacing = height / (LINE_COUNT + 3)
      const step = Math.max(10, Math.round(width / 100))
      const signalX = staticMode ? width * 0.68 : ((elapsed * 92) % (width + 360)) - 180
      const signalY = height * (0.46 + Math.sin(elapsed * 0.7) * 0.12)

      context.lineWidth = 0.85
      context.strokeStyle = strokeColor
      context.globalAlpha = document.documentElement.dataset.theme === 'light' ? 0.17 : 0.24

      for (let line = 0; line < LINE_COUNT; line += 1) {
        context.beginPath()
        const baseY = spacing * (line + 2)

        for (let x = -step; x <= width + step; x += step) {
          const wave = Math.sin(x * 0.008 + line * 0.58 + elapsed * 1.45) * 9
          const secondary = Math.sin(x * 0.0036 - line * 0.34 - elapsed * 0.9) * 12
          const signalDistance = Math.hypot(x - signalX, baseY - signalY)
          const signalInfluence = staticMode ? 0 : Math.max(0, 1 - signalDistance / Math.min(width * 0.28, 320))
          let displacement = wave + secondary
          displacement += Math.sin(signalDistance * 0.035 - elapsed * 7) * signalInfluence * 22

          if (!staticMode && pointer.active) {
            const dx = x - pointer.x
            const dy = baseY - pointer.y
            const distance = Math.hypot(dx, dy)
            const influence = Math.max(0, 1 - distance / Math.min(width * 0.34, 390))
            displacement += Math.sin(distance * 0.03 - elapsed * 5 + line * 0.2) * influence * 28
            displacement += (dy / Math.max(distance, 1)) * influence * 15
          }

          const y = baseY + displacement
          if (x === -step) context.moveTo(x, y)
          else context.lineTo(x, y)
        }

        context.stroke()
      }

      context.globalAlpha = 1
    }

    const tick = (time) => {
      if (visible && pageVisible) draw(time)
      frameRef.current = requestAnimationFrame(tick)
    }

    const onPointerMove = (event) => {
      if (reduceMotion || isMobile()) return
      const rect = host.getBoundingClientRect()
      pointerRef.current.targetX = event.clientX - rect.left
      pointerRef.current.targetY = event.clientY - rect.top
      pointerRef.current.active = true
    }

    const onPointerLeave = () => {
      pointerRef.current.active = false
      pointerRef.current.targetX = width * 0.72
      pointerRef.current.targetY = height * 0.42
    }

    const onVisibilityChange = () => {
      pageVisible = !document.hidden
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) draw(performance.now())
    }, { rootMargin: '100px' })
    const themeObserver = new MutationObserver(() => {
      strokeColor = getStrokeColor()
      draw(performance.now())
    })

    resizeObserver.observe(host)
    intersectionObserver.observe(host)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    host.addEventListener('pointermove', onPointerMove, { passive: true })
    host.addEventListener('pointerleave', onPointerLeave, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    resize()
    frameRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frameRef.current)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      themeObserver.disconnect()
      host.removeEventListener('pointermove', onPointerMove)
      host.removeEventListener('pointerleave', onPointerLeave)
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className="neural-signal-field" aria-hidden="true" />
}
