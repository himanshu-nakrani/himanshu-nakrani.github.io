import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import DataIcon from './DataIcon'
import { caseStudies } from '../data'

export default function CaseStudyWorkbench() {
  const [activeId, setActiveId] = useState(caseStudies[0].id)
  const reduceMotion = useReducedMotion()
  const study = caseStudies.find(s => s.id === activeId)

  return (
    <div className="csw">

      {/* Tab bar */}
      <div className="csw__tabs" role="tablist" aria-label="Case studies">
        {caseStudies.map(s => (
          <button
            key={s.id}
            role="tab"
            id={`csw-tab-${s.id}`}
            aria-selected={s.id === activeId}
            aria-controls={`csw-panel-${s.id}`}
            className={`csw__tab${s.id === activeId ? ' is-active' : ''}`}
            onClick={() => setActiveId(s.id)}
          >
            <span className="csw__tab-icon" aria-hidden="true"><DataIcon name={s.icon} size={15} /></span>
            {s.label}
            {s.badge && <span className="csw__tab-badge">{s.badge}</span>}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          id={`csw-panel-${activeId}`}
          role="tabpanel"
          aria-labelledby={`csw-tab-${activeId}`}
          className="csw__panel"
          initial={reduceMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.14 }}
        >
          {/* Summary */}
          <p className="csw__summary">{study.summary}</p>

          {/* Problem / System / Impact grid */}
          <div className="csw__grid">
            <div className="csw__field">
              <div className="csw__field-label">Problem</div>
              <div className="csw__field-value">{study.problem}</div>
            </div>
            <div className="csw__field">
              <div className="csw__field-label">System</div>
              <div className="csw__field-value">{study.system}</div>
            </div>
            <div className="csw__field csw__field--wide">
              <div className="csw__field-label">Impact</div>
              <div className="csw__field-value">{study.impact}</div>
            </div>
          </div>

          {/* Architecture map */}
          <div style={{ marginBottom: '1rem' }}>
            <div className="csw__field-label" style={{ marginBottom: '0.5rem' }}>
              Architecture
            </div>
            <div className="csw__arch-nodes">
              {study.arch.map((node, i) => (
                <div key={node} style={{ display: 'contents' }}>
                  <span className="csw__arch-node">{node}</span>
                  {i < study.arch.length - 1 && (
                    <span className="csw__arch-arrow" aria-hidden="true">›</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="csw__tags">
            {study.tags.map(t => (
              <span key={t} className="csw__tag">{t}</span>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer link */}
      <div className="csw__footer">
        <Link to={`/projects/${study.id}`} className="csw__footer-link" style={{ marginRight: '1.5rem' }}>
          Deep dive <ArrowRight size={13} aria-hidden="true" />
        </Link>
        <Link to="/projects" className="csw__footer-link">
          All projects <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>

    </div>
  )
}
