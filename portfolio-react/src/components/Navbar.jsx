import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = ['About', 'Experience', 'Projects', 'GitHub', 'Kaggle', 'Research', 'Skills', 'Contact']

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(var(--bg-rgb), 0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          style={{
            fontFamily: "'Fira Code', monospace", fontWeight: 700, fontSize: '1rem',
            color: 'var(--accent)', background: 'transparent',
            border: '1px solid var(--border)', padding: '6px 13px', borderRadius: 8,
            textDecoration: 'none', letterSpacing: '0.05em',
            transition: 'all 0.3s',
          }}
        >
          HN
        </motion.a>

        {/* Desktop */}
        <ul style={{ listStyle: 'none', display: 'flex', gap: '0.8rem', alignItems: 'center' }} className="nav-desktop">
          {links.map(l => (
            <li key={l}>
              {l === 'Contact' ? (
                <motion.a
                  href={`#${l.toLowerCase()}`}
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--bg)',
                    padding: '8px 20px', borderRadius: 8,
                    textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
                    transition: 'all 0.3s',
                  }}
                >
                  Contact
                </motion.a>
              ) : (
                <motion.a
                  href={`#${l.toLowerCase()}`}
                  whileHover={{ color: 'var(--accent)' }}
                  style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.3s', display: 'block', padding: '4px 8px' }}
                >
                  {l}
                </motion.a>
              )}
            </li>
          ))}
          <li style={{ marginLeft: '0.8rem', paddingLeft: '0.8rem', borderLeft: '1px solid var(--border)' }}>
            <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          </li>
        </ul>

        {/* Mobile toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
          <button
            onClick={() => setOpen(!open)}
            className="nav-mobile-btn"
            style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', display: 'none' }}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', overflow: 'hidden' }}
          >
            <ul style={{ listStyle: 'none', padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {links.map(l => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.95rem' }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  )
}
