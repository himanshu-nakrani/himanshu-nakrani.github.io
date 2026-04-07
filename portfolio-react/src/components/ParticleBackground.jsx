import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

function ParticleCanvas({ count, speed }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return // degrade gracefully if context unavailable

    let rafId
    let particles = []

    function initParticles(w, h) {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * speed,
        vy: (Math.random() - 0.5) * 0.3 * speed,
        radius: Math.random() * 1.5 + 1,
        opacity: Math.random() * 0.3 + 0.1,
      }))
    }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles(canvas.width, canvas.height)
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(107, 155, 209, ${p.opacity})`
        ctx.fill()
      })
      rafId = requestAnimationFrame(draw)
    }

    // Set up ResizeObserver for viewport changes
    const observer = new ResizeObserver(() => {
      resize()
    })
    observer.observe(document.documentElement)

    resize()
    draw()

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [count, speed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      role="presentation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

export default function ParticleBackground({ count = 40, speed = 1 }) {
  const reducedMotion = useReducedMotion()
  const isMobile = useIsMobile()

  if (reducedMotion) return null

  const particleCount = isMobile ? 25 : count

  return <ParticleCanvas count={particleCount} speed={speed} />
}
