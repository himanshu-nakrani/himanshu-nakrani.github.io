import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, ArrowDown, Mail } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { useMagnetic } from '../hooks/useMagnetic'
import { currentFocusItems } from '../data'

const stats = [
  { num: '2+',   label: 'Years exp.', link: '/experience' },
  { num: '100+', label: 'Users served', link: '#featured-projects' },
  { num: '75%',  label: 'Latency cut', link: '#pipeline' },
  { num: '2',    label: 'Publications', link: '/research' },
]

// Typing effect hook for the "Now building" line
function useTypingEffect(texts, typingSpeed = 80, deleteSpeed = 40, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      setDisplayText(texts[0])
      return
    }

    const currentText = texts[textIndex]
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setTextIndex((prev) => (prev + 1) % texts.length)
        }
      }
    }, isDeleting ? deleteSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deleteSpeed, pauseDuration, reduceMotion])

  return displayText
}

function AnimatedStat({ num, label, link, index }) {
  const { ref, value, suffix } = useCountUp(num, { duration: 1100 })
  const reduceMotion = useReducedMotion()
  
  return (
    <motion.a
      ref={ref}
      href={link}
      className="hero-stat"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
    >
      <div className="hero-stat-value">
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span className="hero-stat-suffix">{suffix}</span>
      </div>
      <div className="hero-stat-label">{label}</div>
    </motion.a>
  )
}

export default function HeroEnhanced() {
  const reduceMotion = useReducedMotion()
  const magneticRef = useMagnetic({ radius: 80, strength: 4 })
  
  const nowBuildingTexts = currentFocusItems.map(item => item.description)
  const typingText = useTypingEffect(nowBuildingTexts, 60, 30, 3000)

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
    }
  }, [reduceMotion])

  return (
    <section id="about" className="hero-section">
      <div className="hero-container">
        {/* Left column - main content */}
        <div className="hero-content">
          {/* Numbered section indicator */}
          <motion.div 
            className="hero-number"
            initial={reduceMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="hero-number-text">01</span>
            <span className="hero-number-line" />
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="hero-name"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Himanshu Nakrani
          </motion.h1>

          {/* Role with bracket styling */}
          <motion.div 
            className="hero-role"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="hero-role-bracket">[</span>
            <span>Generative AI Engineer</span>
            <span className="hero-role-bracket">]</span>
          </motion.div>

          {/* Tagline */}
          <motion.p 
            className="hero-tagline"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Production AI engineer building <strong>LLMs</strong>, <strong>RAG</strong>, and <strong>Text-to-SQL</strong> systems — 
            from research to products used by real users.
          </motion.p>

          {/* Now building line with typing effect */}
          <motion.div 
            className="hero-now"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <span className="hero-now-label">Now:</span>
            <span className="hero-now-text">
              {typingText}
              <span className="hero-now-cursor">|</span>
            </span>
          </motion.div>

          {/* CTAs */}
          <motion.div 
            className="hero-ctas"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              ref={magneticRef}
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta hero-cta--primary"
            >
              <Github size={16} strokeWidth={1.8} />
              <span>View Projects</span>
            </a>
            <a
              href="mailto:himanshunakrani0@gmail.com"
              className="hero-cta hero-cta--secondary"
            >
              <Mail size={16} strokeWidth={1.8} />
              <span>Get in Touch</span>
            </a>
          </motion.div>

          {/* Stats */}
          <div className="hero-stats">
            {stats.map((stat, index) => (
              <AnimatedStat key={stat.label} {...stat} index={index} />
            ))}
          </div>
        </div>

        {/* Right column - photo + decorations */}
        <motion.div 
          className="hero-visual"
          initial={reduceMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="hero-photo-frame">
            <img
              src="/himanshu.jpg"
              alt="Himanshu Nakrani"
              className="hero-photo"
              loading="eager"
              fetchPriority="high"
            />
            {/* Corner brackets */}
            <span className="hero-photo-corner hero-photo-corner--tl" />
            <span className="hero-photo-corner hero-photo-corner--br" />
          </div>
          
          {/* Status badge */}
          <div className="hero-status">
            <span className="hero-status-dot" />
            <span>Open to AI roles</span>
          </div>

          {/* Social links */}
          <div className="hero-socials">
            <a href="https://github.com/himanshu-nakrani" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com/in/himanshu-nakrani" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="mailto:himanshunakrani0@gmail.com" aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        className="hero-scroll"
        onClick={() => scrollToSection('highlights')}
        initial={reduceMotion ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        aria-label="Scroll to content"
      >
        <span>Scroll</span>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: var(--page-pad-top) var(--page-pad-x) 3rem;
          position: relative;
        }

        .hero-container {
          flex: 1;
          display: flex;
          align-items: center;
          gap: clamp(3rem, 8vw, 6rem);
          max-width: var(--container-wide);
          margin: 0 auto;
          width: 100%;
        }

        .hero-content {
          flex: 1;
          min-width: 0;
        }

        /* Numbered section indicator */
        .hero-number {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .hero-number-text {
          font-family: var(--font-mono);
          font-size: var(--text-sm);
          color: var(--color-accent);
          font-weight: var(--font-weight-medium);
        }

        .hero-number-line {
          flex: 1;
          max-width: 200px;
          height: 1px;
          background: var(--color-border);
        }

        /* Name */
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: var(--font-weight-bold);
          line-height: var(--line-height-tight);
          letter-spacing: var(--letter-spacing-tight);
          color: var(--color-text);
          margin: 0 0 0.75rem;
        }

        /* Role */
        .hero-role {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: var(--text-base);
          color: var(--color-accent);
          margin-bottom: 1.5rem;
          letter-spacing: var(--letter-spacing-mono);
        }

        .hero-role-bracket {
          opacity: 0.5;
        }

        /* Tagline */
        .hero-tagline {
          font-size: var(--text-lg);
          line-height: var(--line-height-relaxed);
          color: var(--color-text-muted);
          max-width: 540px;
          margin: 0 0 1.5rem;
        }

        .hero-tagline strong {
          color: var(--color-text);
          font-weight: var(--font-weight-medium);
        }

        /* Now building */
        .hero-now {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-left: 2px solid var(--color-accent);
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
          max-width: 540px;
        }

        .hero-now-label {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-accent);
          font-weight: var(--font-weight-medium);
          flex-shrink: 0;
          padding-top: 2px;
        }

        .hero-now-text {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.5;
        }

        .hero-now-cursor {
          color: var(--color-accent);
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          text-decoration: none;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .hero-cta--primary {
          background: var(--color-accent);
          color: var(--color-accent-fg);
          border: 1px solid var(--color-accent);
        }

        .hero-cta--primary:hover {
          background: var(--color-accent-strong);
          border-color: var(--color-accent-strong);
          transform: translateY(-2px);
        }

        .hero-cta--secondary {
          background: transparent;
          color: var(--color-text);
          border: 1px solid var(--color-border-strong);
        }

        .hero-cta--secondary:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateY(-2px);
        }

        /* Stats */
        .hero-stats {
          display: flex;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }

        .hero-stat {
          text-decoration: none;
          transition: transform var(--motion-duration-fast) var(--motion-ease);
        }

        .hero-stat:hover {
          transform: translateY(-2px);
        }

        .hero-stat-value {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: var(--font-weight-semibold);
          color: var(--color-text);
          line-height: 1;
          margin-bottom: 0.35rem;
        }

        .hero-stat-suffix {
          color: var(--color-accent);
        }

        .hero-stat-label {
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-muted);
        }

        /* Visual column */
        .hero-visual {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .hero-photo-frame {
          position: relative;
          width: clamp(240px, 25vw, 320px);
        }

        .hero-photo {
          width: 100%;
          height: auto;
          display: block;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
        }

        .hero-photo-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          border: 1px solid var(--color-accent);
          opacity: 0.6;
        }

        .hero-photo-corner--tl {
          top: -8px;
          left: -8px;
          border-right: none;
          border-bottom: none;
        }

        .hero-photo-corner--br {
          bottom: -8px;
          right: -8px;
          border-left: none;
          border-top: none;
        }

        .hero-status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-muted);
        }

        .hero-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--color-accent);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-socials {
          display: flex;
          gap: 0.75rem;
        }

        .hero-socials a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-md);
          color: var(--color-text-muted);
          text-decoration: none;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }

        .hero-socials a:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          transform: translateY(-2px);
        }

        /* Scroll indicator */
        .hero-scroll {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--color-text-subtle);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
        }

        .hero-scroll:hover {
          color: var(--color-text-muted);
        }

        /* Mobile */
        @media (max-width: 900px) {
          .hero-container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 2rem;
          }

          .hero-content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .hero-number {
            justify-content: center;
          }

          .hero-number-line {
            display: none;
          }

          .hero-now {
            text-align: left;
          }

          .hero-ctas {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
            flex-wrap: wrap;
          }

          .hero-visual {
            padding-top: 1rem;
          }

          .hero-photo-frame {
            width: 180px;
          }
        }
      `}</style>
    </section>
  )
}
