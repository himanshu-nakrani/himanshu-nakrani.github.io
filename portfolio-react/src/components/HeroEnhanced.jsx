import { motion, useReducedMotion } from 'framer-motion'
import { Github, Linkedin, Mail, FileText } from 'lucide-react'
import { useMagnetic } from '../hooks/useMagnetic'
import AuroraBackground from './ui/AuroraBackground'
import MagneticButton from './ui/MagneticButton'
import HeroPipelineSchematic from './HeroPipelineSchematic'
import { recruiterSummary } from '../data/hero'

const stats = [
  { num: '3+',  label: 'Years exp.',   detail: 'Intern → Emerging Lead',  link: '/experience' },
  { num: '10+', label: 'Biz units',    detail: '200+ total users',        link: '#projects' },
  { num: '75%', label: 'Latency cut',  detail: 'average response time',   link: '/lab' },
  { num: '2',   label: 'Publications', detail: 'IEEE peer-reviewed',      link: '/research' },
]

function RisingLine({ children, delay = 0, reduceMotion }) {
  if (reduceMotion) return <span className="hero-name-line">{children}</span>
  return (
    <span className="hero-name-line" style={{ overflow: 'hidden', display: 'block' }}>
      <motion.span
        style={{ display: 'block' }}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function HeroEnhanced() {
  const reduceMotion = useReducedMotion()
  const magneticRef = useMagnetic({ radius: 80, strength: 4 })

  return (
    <section
      id="about"
      style={{ paddingTop: 'clamp(5rem, 11vh, 6.5rem)', position: 'relative', overflow: 'hidden' }}
    >
      <AuroraBackground intensity={0.6} />
      <div
        style={{
          maxWidth: 'var(--container)',
          margin: '0 auto',
          padding: '0 var(--page-pad-x)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div className="hero-stack">
          {/* Kicker row: small portrait + role */}
          <div className="hero-kicker-row">
            <div className="portrait-frame" style={{ width: 44, flexShrink: 0 }}>
              <picture>
                <source type="image/webp" srcSet="/himanshu.webp" />
                <img
                  src="/himanshu.jpg"
                  alt="Himanshu Nakrani"
                  width="360"
                  height="540"
                  fetchPriority="high"
                  decoding="async"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </picture>
            </div>
            <span className="hero-kicker">Generative AI Engineer · State Street</span>
          </div>

          {/* Oversized name */}
          <h1 className="hero-name">
            <RisingLine delay={0.05} reduceMotion={reduceMotion}>Himanshu</RisingLine>
            <RisingLine delay={0.13} reduceMotion={reduceMotion}>Nakrani</RisingLine>
          </h1>

          {/* Statement */}
          <p className="hero-statement">
            <RisingLine delay={0.24} reduceMotion={reduceMotion}>
              I build <span className="gradient-text">LLM systems</span>
              <span style={{ color: 'var(--color-accent)' }}>.</span>
            </RisingLine>
          </p>

          {/* Capability pill row */}
          <div className="hero-pill-row">
            {recruiterSummary.map((item) => (
              <span key={item} className="hero-pill">{item}</span>
            ))}
          </div>

          {/* Split: intro + CTAs | schematic */}
          <div className="hero-split">
            <div className="hero-split-left">
              <p className="hero-intro">
                Production AI engineer at{' '}
                <strong style={{ color: 'var(--color-text)' }}>State Street Corporation</strong>
                {' '}— building Text-to-SQL, RAG, agent tooling, and evaluation
                infrastructure for financial-data workflows. Progressed from intern
                to Emerging Lead in two years.
              </p>
              <div className="hero-ctas">
                <a ref={magneticRef} href="/resume.pdf" className="hero-cta hero-cta--primary">
                  <FileText size={14} />
                  Resume
                </a>
                <MagneticButton radius={70} strength={5}>
                  <a href="mailto:himanshunakrani0@gmail.com" className="hero-cta hero-cta--secondary">
                    <Mail size={14} />
                    Contact
                  </a>
                </MagneticButton>
                <MagneticButton radius={60} strength={4}>
                  <a
                    href="https://github.com/himanshu-nakrani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta hero-cta--quiet"
                  >
                    <Github size={13} />
                    GitHub
                  </a>
                </MagneticButton>
                <MagneticButton radius={60} strength={4}>
                  <a
                    href="https://linkedin.com/in/himanshu-nakrani"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-cta hero-cta--quiet"
                  >
                    <Linkedin size={13} />
                    LinkedIn
                  </a>
                </MagneticButton>
              </div>
            </div>
            <div className="hero-split-right">
              <HeroPipelineSchematic />
            </div>
          </div>
        </div>
      </div>

      {/* Stat band — full width, hairline-bordered */}
      <div className="hero-stat-band" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-stat-band-inner">
          {stats.map((s) => (
            <a key={s.label} href={s.link} className="hero-stat">
              <span className="hero-stat-num">{s.num}</span>
              <span className="hero-stat-label">{s.label}</span>
              <span className="hero-stat-detail">{s.detail}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
