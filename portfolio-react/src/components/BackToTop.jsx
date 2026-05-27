import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Keep node mounted briefly after `visible` flips false so the exit
  // animation can play, then unmount.
  useEffect(() => {
    if (visible) {
      setMounted(true)
      return
    }
    if (!mounted) return
    const t = setTimeout(() => setMounted(false), 250)
    return () => clearTimeout(t)
  }, [visible, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="glass-btn back-to-top"
      data-visible={visible ? 'true' : 'false'}
      style={{
        position: 'fixed',
        bottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        right: 'max(1.5rem, env(safe-area-inset-right))',
        zIndex: 90,
        width: 48,
        height: 48,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      <ArrowUp size={20} style={{ position: 'relative', zIndex: 1 }} />
      <style>{`
        .back-to-top {
          opacity: 0;
          transform: scale(0.8) translateY(10px);
          transition: opacity 0.25s cubic-bezier(0.25, 0.1, 0.25, 1),
                      transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .back-to-top[data-visible="true"] {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          .back-to-top { transition: none; }
        }
      `}</style>
    </button>
  )
}
