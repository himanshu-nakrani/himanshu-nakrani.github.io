import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * SectionNav — Sticky side navigation showing current section
 * Displays numbered section indicators that track scroll position
 * Hidden on mobile, shown on desktop as a left-edge rail
 */

export default function SectionNav({ sections = [] }) {
  const [activeSection, setActiveSection] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  // Track which section is in view
  useEffect(() => {
    if (!sections.length) return

    const observers = []
    const sectionElements = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean)

    if (!sectionElements.length) return

    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.2, 0.5, 1],
    })

    sectionElements.forEach(el => observer.observe(el))

    // Show nav after scrolling past hero
    const scrollHandler = () => {
      setIsVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', scrollHandler, { passive: true })
    scrollHandler()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [sections])

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (!sections.length) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="section-nav"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          aria-label="Page sections"
        >
          <ul className="section-nav-list">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id
              const number = String(index + 1).padStart(2, '0')
              
              return (
                <li key={section.id} className="section-nav-item">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`section-nav-link ${isActive ? 'section-nav-link--active' : ''}`}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    <span className="section-nav-number">{number}</span>
                    <span className="section-nav-label">{section.label}</span>
                    <motion.span 
                      className="section-nav-indicator"
                      initial={false}
                      animate={{ 
                        scaleX: isActive ? 1 : 0,
                        opacity: isActive ? 1 : 0 
                      }}
                      transition={{ duration: 0.2 }}
                    />
                  </button>
                </li>
              )
            })}
          </ul>

          <style>{`
            .section-nav {
              position: fixed;
              left: clamp(1rem, 3vw, 2.5rem);
              top: 50%;
              transform: translateY(-50%);
              z-index: 50;
              display: none;
            }

            @media (min-width: 1200px) {
              .section-nav {
                display: block;
              }
            }

            .section-nav-list {
              list-style: none;
              display: flex;
              flex-direction: column;
              gap: 0.25rem;
              padding: 0;
              margin: 0;
            }

            .section-nav-item {
              position: relative;
            }

            .section-nav-link {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.5rem 0.75rem;
              background: transparent;
              border: none;
              cursor: pointer;
              text-decoration: none;
              position: relative;
              transition: all var(--motion-duration-fast) var(--motion-ease);
            }

            .section-nav-number {
              font-family: var(--font-mono);
              font-size: 0.7rem;
              color: var(--color-text-subtle);
              transition: color var(--motion-duration-fast) var(--motion-ease);
              min-width: 1.25rem;
            }

            .section-nav-label {
              font-size: 0.75rem;
              font-weight: var(--font-weight-medium);
              color: var(--color-text-muted);
              text-transform: uppercase;
              letter-spacing: var(--letter-spacing-wide);
              opacity: 0;
              transform: translateX(-8px);
              transition: all var(--motion-duration-fast) var(--motion-ease);
              white-space: nowrap;
            }

            .section-nav-indicator {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 2px;
              height: 16px;
              background: var(--color-accent);
              border-radius: 1px;
              transform-origin: left center;
            }

            .section-nav-link:hover .section-nav-label,
            .section-nav-link--active .section-nav-label {
              opacity: 1;
              transform: translateX(0);
            }

            .section-nav-link:hover .section-nav-number {
              color: var(--color-text-muted);
            }

            .section-nav-link--active .section-nav-number {
              color: var(--color-accent);
            }

            .section-nav-link--active .section-nav-label {
              color: var(--color-text);
            }
          `}</style>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
