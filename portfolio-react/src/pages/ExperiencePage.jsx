import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import SEO from '../components/SEO'
import { experience } from '../data/experience'

const [currentRole, ...earlierRoles] = experience

function roleAnchor(item) {
  return `role-${item.company.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
}

function splitMetric(value) {
  const match = String(value).match(/^(\d+)(.*)$/)
  if (!match) return null
  return { target: Number(match[1]), suffix: match[2] }
}

function CountUp({ value, run, reduceMotion }) {
  const parsed = splitMetric(value)
  const [display, setDisplay] = useState(() => (parsed && !reduceMotion ? 0 : parsed?.target))

  useEffect(() => {
    const parts = splitMetric(value)
    if (!parts || !run) return undefined
    if (reduceMotion) {
      setDisplay(parts.target)
      return undefined
    }
    const start = performance.now()
    const duration = 900
    let frame = 0
    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - progress) ** 3
      setDisplay(Math.round(parts.target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [reduceMotion, run, value])

  if (!parsed || display == null) return value
  return `${display}${parsed.suffix}`
}

function Metrics({ items, label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  if (!items?.length) return null
  return (
    <div ref={ref} className="xp-metrics" aria-label={label}>
      {items.map((metric) => (
        <div key={metric.label}>
          <span aria-label={metric.value}>
            <CountUp value={metric.value} run={inView} reduceMotion={reduceMotion} />
          </span>
          <small>{metric.label}</small>
        </div>
      ))}
    </div>
  )
}

function FocusGrid({ items, bullets }) {
  const [hoverId, setHoverId] = useState(null)
  const [pinnedId, setPinnedId] = useState(null)
  const openId = pinnedId || hoverId

  useEffect(() => {
    if (!pinnedId) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setPinnedId(null)
        setHoverId(null)
      }
    }
    const onPointer = (event) => {
      if (!event.target.closest?.('.xp-focus')) {
        setPinnedId(null)
        setHoverId(null)
      }
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [pinnedId])

  if (!items?.length) return null

  return (
    <ul className="xp-focus">
      {items.map((item) => {
        const open = openId === item.title
        const details = (item.detailIndexes || []).map((index) => bullets?.[index]).filter(Boolean)
        const panelId = `xp-detail-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        return (
          <li
            key={item.title}
            className={open ? 'is-open' : ''}
            onMouseEnter={() => setHoverId(item.title)}
            onMouseLeave={() => setHoverId(null)}
          >
            <button
              type="button"
              className="xp-focus__trigger"
              aria-expanded={open}
              aria-controls={panelId}
              onFocus={() => setHoverId(item.title)}
              onBlur={() => setHoverId(null)}
              onClick={() => {
                setPinnedId((current) => {
                  if (current === item.title) {
                    setHoverId(null)
                    return null
                  }
                  return item.title
                })
              }}
            >
              <strong>{item.title}</strong>
              <span>{item.line}</span>
            </button>
            {details.length > 0 && (
              <div id={panelId} className="xp-focus__panel" role="region" aria-label={`${item.title} details`} aria-hidden={!open}>
                {details.map((text) => <p key={text}>{text}</p>)}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

function EarlierRole({ item }) {
  return (
    <article className="xp-earlier-card" id={roleAnchor(item)}>
      <p className="editorial-kicker">Earlier</p>
      <h2>{item.role}</h2>
      <p className="xp-dossier__org">{item.company}</p>
      <p className="xp-dossier__meta">{item.period} · {item.location}</p>
      <Metrics items={item.highlights} label={`${item.role} impact`} />
      {item.tags?.length > 0 && (
        <div className="editorial-chip-list">
          {item.tags.map((tag) => <span key={tag} className="editorial-chip">{tag}</span>)}
        </div>
      )}
    </article>
  )
}

export default function ExperiencePage() {
  const reduceMotion = useReducedMotion()
  const reveal = reduceMotion
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }

  return (
    <>
      <SEO
        title="Experience | Himanshu Nakrani"
        description="Career timeline covering LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial workflows."
      />
      <main className="mvp2-page editorial-page xp-page">
        <header className="editorial-page-header">
          <p className="editorial-kicker">[ 01 ] · Experience</p>
          <h1 className="editorial-page-title">
            Career timeline built around <span className="gradient-text">production AI</span>.
          </h1>
          <p className="editorial-page-lede">
            Emerging lead at State Street, building LLM backends, RAG, and Text-to-SQL for financial workflows.
          </p>
        </header>

        <div className="xp-layout">
          <motion.article className="xp-dossier" id={roleAnchor(currentRole)} {...reveal}>
            <header className="xp-dossier__head">
              <div>
                <p className="editorial-kicker">Current role</p>
                <h2>{currentRole.role}</h2>
                <p className="xp-dossier__org">{currentRole.company}</p>
                <p className="xp-dossier__meta">{currentRole.location}</p>
              </div>
              <p className="xp-dossier__period">{currentRole.period}</p>
            </header>

            {currentRole.progressionSteps?.length > 0 && (
              <ol className="xp-track" aria-label="Role progression">
                {currentRole.progressionSteps.map((step) => (
                  <li key={step} className={step === currentRole.currentRoleStep ? 'is-current' : ''}>
                    <span aria-hidden="true" />
                    {step}
                  </li>
                ))}
              </ol>
            )}

            <Metrics items={currentRole.highlights} label={`${currentRole.role} impact`} />
            <FocusGrid items={currentRole.focus} bullets={currentRole.bullets} />

            {currentRole.tags?.length > 0 && (
              <div className="editorial-chip-list">
                {currentRole.tags.map((tag) => <span key={tag} className="editorial-chip">{tag}</span>)}
              </div>
            )}
          </motion.article>

          <aside className="xp-earlier" aria-label="Earlier roles">
            {earlierRoles.map((item) => <EarlierRole key={`${item.company}-${item.period}`} item={item} />)}
          </aside>
        </div>
      </main>
    </>
  )
}
