import { useState, useEffect, useCallback } from 'react'
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, ArrowDown, Mail, Sparkles } from 'lucide-react'
import { useCountUp } from '../hooks/useCountUp'
import { useMagnetic } from '../hooks/useMagnetic'
import { currentFocusItems } from '../data'

const stats = [
  { num: '2+',   label: 'Years exp.', link: '/experience' },
  { num: '100+', label: 'Users served', link: '#featured-projects' },
  { num: '75%',  label: 'Latency cut', link: '#pipeline' },
  { num: '2',    label: 'Publications', link: '/research' },
]

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

function StatCard({ num, label, link, index }) {
  const { ref, value, suffix } = useCountUp(num, { duration: 1100 })
  const reduceMotion = useReducedMotion()
  
  return (
    <motion.a
      ref={ref}
      href={link}
      initial={reduceMotion ? {} : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.8 + index * 0.08, duration: 0.5 }}
      whileHover={reduceMotion ? {} : { y: -4, scale: 1.02 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.4rem 1rem',
        borderRadius: 12,
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        cursor: 'pointer',
        transition: 'all 0.2s',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div style={{
        fontSize: '1.65rem',
        fontWeight: 800,
        fontFamily: 'var(--font-display)',
        color: 'var(--color-accent)',
        lineHeight: 1,
        marginBottom: 6,
      }}>
        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{value}</span>
        <span style={{ fontSize: '0.75em', marginLeft: 2 }}>{suffix}</span>
      </div>
      <div style={{
        fontSize: '0.7rem',
        fontWeight: 600,
        color: 'var(--color-text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}>
        {label}
      </div>
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
    <section id="about" style={{ paddingTop: 'var(--page-pad-top)' }}>
      <div style={{ 
        maxWidth: 'var(--container)',
        margin: '0 auto',
        padding: '0 var(--page-pad-x)',
      }}>
        {/* Kicker */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: '2rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-accent)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <Sparkles size={14} />
          <span>Generative AI Engineer</span>
        </motion.div>

        {/* Hero header: Avatar + Name + Tagline */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
          className="hero-header"
        >
          {/* Avatar */}
          <div style={{
            width: 100,
            height: 100,
            borderRadius: 12,
            border: '2px solid var(--color-border)',
            overflow: 'hidden',
            flexShrink: 0,
          }}>
            <img 
              src="/himanshu.jpg" 
              alt="Himanshu Nakrani"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Name + tagline */}
          <div>
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: '0.35rem',
              color: 'var(--color-text)',
            }}>
              Himanshu Nakrani
            </h1>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-muted)',
              fontWeight: 500,
              margin: 0,
            }}>
              Building AI systems that work at scale
            </p>
          </div>
        </motion.div>

        {/* Intro text */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          style={{
            fontSize: '0.95rem',
            lineHeight: 1.7,
            color: 'var(--color-text-muted)',
            maxWidth: 600,
            marginBottom: '2.5rem',
          }}
        >
          <p style={{ marginBottom: '0.75rem' }}>
            Production AI engineer at <strong style={{ color: 'var(--color-accent)' }}>State Street</strong>, building enterprise LLM systems that scale.
          </p>
          <p style={{ margin: 0 }}>
            Specializing in <strong>RAG architectures</strong>, <strong>Text-to-SQL</strong> pipelines, and deploying models that work reliably at production scale.
          </p>
        </motion.div>

        {/* Now building */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            padding: '1.25rem',
            borderRadius: 12,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            maxWidth: 480,
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Now building:</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', fontFamily: 'var(--font-display)' }}>
            {typingText}
            <span style={{ animation: 'pulse 1s infinite', marginLeft: 4 }}>|</span>
          </div>
        </motion.div>

        {/* Stats row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0.85rem',
          marginBottom: '2.5rem',
        }} className="hero-stats-grid">
          {stats.map((s, i) => <StatCard key={s.label} num={s.num} label={s.label} link={s.link} index={i} />)}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          <a
            ref={magneticRef}
            href="https://github.com/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.85rem 1.2rem',
              borderRadius: 10,
              background: 'var(--color-accent)',
              color: '#0a192f',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.target.style.transform = 'translateY(0)'}
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/himanshu-nakrani"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '0.85rem 1.2rem',
              borderRadius: 10,
              border: '1px solid var(--color-border)',
              background: 'transparent',
              color: 'var(--color-text)',
              fontWeight: 600,
              fontSize: '0.9rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.target.style.background = 'var(--color-surface-raised)'
              e.target.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={e => {
              e.target.style.background = 'transparent'
              e.target.style.borderColor = 'var(--color-border)'
            }}
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </motion.div>

        {/* Scroll prompt */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          onClick={() => scrollToSection('highlights')}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            cursor: 'pointer',
            marginTop: '3rem',
          }}
        >
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Scroll to explore</div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={18} color="var(--color-accent)" />
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .hero-header {
          @media (max-width: 600px) {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }

        .hero-stats-grid {
          @media (max-width: 768px) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
