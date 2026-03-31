import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function KonamiCode() {
  const [activated, setActivated] = useState(false)
  const [keys, setKeys] = useState([])

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys((prevKeys) => {
        const newKeys = [...prevKeys, e.key].slice(-KONAMI_CODE.length)
        
        if (newKeys.join(',') === KONAMI_CODE.join(',')) {
          setActivated(true)
          
          // Trigger confetti
          const duration = 3000
          const animationEnd = Date.now() + duration
          const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 }

          function randomInRange(min, max) {
            return Math.random() * (max - min) + min
          }

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now()

            if (timeLeft <= 0) {
              return clearInterval(interval)
            }

            const particleCount = 50 * (timeLeft / duration)
            
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            })
            confetti({
              ...defaults,
              particleCount,
              origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            })
          }, 250)

          setTimeout(() => setActivated(false), 5000)
          return []
        }
        
        return newKeys
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10001,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '2rem 3rem',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            textAlign: 'center',
          }}
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            style={{ fontSize: '4rem', marginBottom: '1rem' }}
          >
            🎉
          </motion.div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Konami Code Activated!
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
            You found the secret! 🎮
          </p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: '1rem' }}>
            ↑ ↑ ↓ ↓ ← → ← → B A
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
