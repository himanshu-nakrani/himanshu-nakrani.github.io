import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { identity, heroStats, socials } from '../content'
import { currentFocusItems } from '../data'
import { useCountUp } from '../hooks/useCountUp'

function useTypingEffect(texts, { typingSpeed = 55, deleteSpeed = 26, pause = 2600 } = {}) {
  const reduceMotion = useReducedMotion()
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (reduceMotion) return undefined

    const currentText = texts[textIndex]
    let timeout

    if (!isDeleting && displayText.length < currentText.length) {
      timeout = setTimeout(
        () => setDisplayText(currentText.slice(0, displayText.length + 1)),
        typingSpeed
      )
    } else if (!isDeleting) {
      timeout = setTimeout(() => setIsDeleting(true), pause)
    } else if (displayText.length > 0) {
      timeout = setTimeout(
        () => setDisplayText(currentText.slice(0, displayText.length - 1)),
        deleteSpeed
      )
    } else {
      // Finished deleting — brief hold, then advance to the next line.
      timeout = setTimeout(() => {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }, 400)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deleteSpeed, pause, reduceMotion])

  // Reduced motion: show a static line instead of animating.
  return reduceMotion ? texts[0] : displayText
}

function Stat({ value, label }) {
  const [active, setActive] = useState(false)
  const { value: count, suffix } = useCountUp(value, { active })

  return (
    <motion.div
      className="stat"
      initial={reduceMotionSafe() ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setActive(true)}
      transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <span className="stat__value">
        {count}
        <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
      </span>
      <span className="stat__label">{label}</span>
    </motion.div>
  )
}

function reduceMotionSafe() {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const focusDescriptions = currentFocusItems.map((item) => item.description)
  const typed = useTypingEffect(focusDescriptions)

  const ease = [0.22, 0.61, 0.36, 1]

  return (
    <section id="top" className="hero" aria-label="Introduction">
      <div className="container hero__inner">
        <motion.div
          className="hero__meta"
          initial={reduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="status-line">
            <span className="status-line__dot" aria-hidden="true" />
            Open to opportunities
          </span>
          <span className="hero__meta-right mono">
            <span>AI Software Developer</span>
            <span>State Street Corporation</span>
          </span>
        </motion.div>

        <motion.h1
          className="hero__name"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          Himanshu <em>Nakrani</em>
        </motion.h1>

        <motion.p
          className="hero__role"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
        >
          LLM systems <span className="sep">·</span> RAG pipelines{' '}
          <span className="sep">·</span> Text-to-SQL <span className="sep">·</span> AI agents
        </motion.p>

        <div className="hero__grid">
          <motion.div
            className="hero__copy"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            <p className="hero__bio">{identity.bio}</p>

            <p className="hero__typing" aria-label="Current focus">
              <span className="hero__typing-label">Now building</span>
              <span>
                {typed}
                <span className="typing-caret" aria-hidden="true" />
              </span>
            </p>

            <div className="hero__cta">
              <a href="#projects" className="btn btn--primary">
                View selected work
                <ArrowDown size={13} aria-hidden="true" />
              </a>
              <a href="#contact" className="btn">Get in touch</a>
            </div>

            <div className="hero__links">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="text-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label} ↗
                </a>
              ))}
              <a className="text-link" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                Résumé ↗
              </a>
            </div>
          </motion.div>

          <motion.figure
            className="hero__figure"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            style={{ margin: 0 }}
          >
            <div className="hero__portrait">
              <img
                src="/himanshu.jpg"
                alt={`Portrait of ${identity.name}`}
                width={720}
                height={846}
                fetchpriority="high"
              />
            </div>
            <span className="corner-mark corner-mark--tl" aria-hidden="true" />
            <span className="corner-mark corner-mark--tr" aria-hidden="true" />
            <span className="corner-mark corner-mark--bl" aria-hidden="true" />
            <span className="corner-mark corner-mark--br" aria-hidden="true" />
            <figcaption className="hero__caption">
              <span>Fig. 01</span>
              <span>Enterprise AI, in production</span>
            </figcaption>
          </motion.figure>
        </div>

        <div className="hero__stats">
          {heroStats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>

        <div className="scroll-cue" aria-hidden="true">
          <span className="scroll-cue__line" />
          Scroll
        </div>
      </div>
    </section>
  )
}
