import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function GravityCursor() {
  const cursorDotRef = useRef(null)
  const cursorCircleRef = useRef(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const dotX = useRef(0)
  const dotY = useRef(0)
  const circleX = useRef(0)
  const circleY = useRef(0)

  const speed = 0.15
  const circleSpeed = 0.05

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Dot follows mouse with gravity
      dotX.current += (mouseX.current - dotX.current) * speed
      dotY.current += (mouseY.current - dotY.current) * speed

      // Circle lags behind dot with slower gravity
      circleX.current += (dotX.current - circleX.current) * circleSpeed
      circleY.current += (dotY.current - circleY.current) * circleSpeed

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${dotX.current}px, ${dotY.current}px)`
      }

      if (cursorCircleRef.current) {
        cursorCircleRef.current.style.transform = `translate(${circleX.current}px, ${circleY.current}px)`
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Outer circle with purple glow */}
      <div
        ref={cursorCircleRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 30,
          height: 30,
          borderRadius: '50%',
          border: '2px solid rgba(167, 139, 250, 0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(0px, 0px)',
          boxShadow: '0 0 12px rgba(167, 139, 250, 0.4)',
          willChange: 'transform',
        }}
      />

      {/* Inner purple dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(167, 139, 250, 0.8)',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-4px, -4px) translate(0px, 0px)',
          boxShadow: '0 0 6px rgba(167, 139, 250, 0.8)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
