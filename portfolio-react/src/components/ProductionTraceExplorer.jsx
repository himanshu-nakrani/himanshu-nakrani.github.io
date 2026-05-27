import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { productionTraceStages } from '../data/lab'
import { useUplift } from '../lib/uplift'
import AnimatedBeam from './ui/AnimatedBeam'

export default function ProductionTraceExplorer() {
  const [active, setActive] = useState(productionTraceStages[0].id)
  const reduceMotion = useReducedMotion()
  const uplift = useUplift()
  const activeStage = productionTraceStages.find(s => s.id === active)

  const stagesContainerRef = useRef(null)
  const stageRefs = useMemo(
    () => productionTraceStages.map(() => ({ current: null })),
    [],
  )

  return (
    <div className="trace-explorer">

      {/* Summary: legacy vs optimized */}
      <div className="trace-summary">
        <div className="trace-summary__comparison">
          <span className="trace-summary__lbl">Legacy</span>
          <span className="trace-summary__legacy-val">25–30 s</span>
          <ChevronRight size={13} className="trace-summary__chevron" aria-hidden="true" />
          <span className="trace-summary__lbl">Optimized</span>
          <span className="trace-summary__opt-val">6–8 s</span>
        </div>
        <span className="trace-summary__badge">75% avg latency cut</span>
      </div>

      {/* Stage pipeline — horizontal scrollable */}
      <div
        ref={stagesContainerRef}
        className="trace-stages"
        role="tablist"
        aria-label="Alpha Copilot pipeline stages"
        style={uplift ? { position: 'relative' } : undefined}
      >
        {productionTraceStages.map((stage, i) => (
          <div key={stage.id} style={{ display: 'contents' }}>
            <button
              ref={(el) => { stageRefs[i].current = el }}
              role="tab"
              id={`trace-tab-${stage.id}`}
              aria-selected={active === stage.id}
              aria-controls={`trace-panel-${stage.id}`}
              className={`trace-stage${active === stage.id ? ' is-active' : ''}`}
              onClick={() => setActive(stage.id)}
              style={uplift ? { position: 'relative', zIndex: 1 } : undefined}
            >
              <span className="trace-stage__idx">{String(i + 1).padStart(2, '0')}</span>
              <span className="trace-stage__label">{stage.label}</span>
              <span className="trace-stage__time">{stage.optimizedMs}</span>
            </button>
            {i < productionTraceStages.length - 1 && (
              <div
                className="trace-connector"
                aria-hidden="true"
                style={uplift ? { visibility: 'hidden' } : undefined}
              />
            )}
          </div>
        ))}
        {uplift && productionTraceStages.map((stage, i) => {
          if (i === productionTraceStages.length - 1) return null
          return (
            <AnimatedBeam
              key={`beam-${stage.id}`}
              containerRef={stagesContainerRef}
              fromRef={stageRefs[i]}
              toRef={stageRefs[i + 1]}
              fromAnchor="right"
              toAnchor="left"
              duration={2.6}
              delay={i * 0.35}
            />
          )
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          id={`trace-panel-${active}`}
          role="tabpanel"
          aria-labelledby={`trace-tab-${active}`}
          className="trace-detail"
          initial={reduceMotion ? {} : { opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? {} : { opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="trace-detail__header">
            <span className="trace-detail__name">{activeStage.label}</span>
            <span className="trace-detail__latencies">
              <span className="trace-detail__legacy-t">{activeStage.legacyMs}</span>
              <ChevronRight size={11} aria-hidden="true" />
              <span className="trace-detail__opt-t">{activeStage.optimizedMs}</span>
            </span>
          </div>
          <p className="trace-detail__purpose">{activeStage.purpose}</p>
          <p className="trace-detail__opt-note">
            <strong>Key optimization:</strong> {activeStage.optimization}
          </p>
          <pre className="trace-detail__code"><code>{activeStage.snippet}</code></pre>
        </motion.div>
      </AnimatePresence>

    </div>
  )
}
