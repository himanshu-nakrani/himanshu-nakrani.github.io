import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Play, Pause, RotateCcw } from 'lucide-react'

export default function TraceReplay({ steps, defaultStep = 0 }) {
  const reduceMotion = useReducedMotion()
  const [currentStep, setCurrentStep] = useState(defaultStep)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef(null)
  const stepsRowRef = useRef(null)

  const totalSteps = steps.length
  const active = steps[currentStep]

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(() => {
      let reachedEnd = false
      setCurrentStep(prev => {
        reachedEnd = prev >= totalSteps - 2
        return Math.min(prev + 1, totalSteps - 1)
      })
      if (reachedEnd) setIsPlaying(false)
    }, 2000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, totalSteps])


  const handlePlay = useCallback(() => {
    if (reduceMotion) return
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      // If at end, restart from beginning
      if (currentStep >= totalSteps - 1) {
        setCurrentStep(0)
      }
      setIsPlaying(true)
    }
  }, [isPlaying, currentStep, totalSteps, reduceMotion])

  const handleReset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(defaultStep)
  }, [defaultStep])

  const handleStepClick = useCallback((index) => {
    setIsPlaying(false)
    setCurrentStep(index)
  }, [])

  // Progress percentage
  const progressPct = totalSteps > 1
    ? (currentStep / (totalSteps - 1)) * 100
    : 0

  return (
    <div
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-xl, 12px)',
        overflow: 'hidden',
      }}
    >
      {/* Controls row */}
      <div
        style={{
          padding: '1rem 1.25rem',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={handlePlay}
          disabled={reduceMotion}
          aria-label={isPlaying ? 'Pause trace replay' : 'Play trace replay'}
          title={reduceMotion ? 'Autoplay disabled (reduced motion)' : undefined}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '6px 14px',
            background: isPlaying ? 'var(--color-accent-soft)' : 'var(--color-accent)',
            border: '1px solid var(--color-accent)',
            borderRadius: 8,
            color: isPlaying ? 'var(--color-accent)' : 'var(--color-accent-fg)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: reduceMotion ? 'not-allowed' : 'pointer',
            opacity: reduceMotion ? 0.5 : 1,
            transition: 'all 0.15s ease',
          }}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          <span>{isPlaying ? 'Pause' : 'Play'}</span>
        </button>

        <button
          onClick={handleReset}
          aria-label="Reset trace replay"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '6px 14px',
            background: 'transparent',
            border: '1px solid var(--color-border)',
            borderRadius: 8,
            color: 'var(--color-text-muted)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>

        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-text-subtle)',
            letterSpacing: '0.02em',
          }}
        >
          Step {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          height: 3,
          background: 'var(--color-surface-raised)',
          position: 'relative',
        }}
      >
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: 'var(--color-accent)',
            borderRadius: '0 2px 2px 0',
          }}
        />
      </div>

      {/* Step indicator buttons */}
      <div
        ref={stepsRowRef}
        className="trace-replay-steps"
        style={{
          padding: '0.75rem 1.25rem',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {steps.map((step, i) => {
          const isActive = i === currentStep
          const isCompleted = i < currentStep
          return (
            <button
              key={step.id}
              onClick={() => handleStepClick(i)}
              aria-label={`Go to step ${i + 1}: ${step.label}`}
              aria-current={isActive ? 'step' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '5px 10px',
                border: isActive
                  ? '1px solid var(--color-accent)'
                  : '1px solid var(--color-border)',
                borderRadius: 8,
                background: isActive
                  ? 'var(--color-accent-soft)'
                  : isCompleted
                    ? 'var(--color-surface-raised)'
                    : 'transparent',
                cursor: 'pointer',
                flexShrink: 0,
                outline: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  background: isActive
                    ? 'var(--color-accent)'
                    : isCompleted
                      ? 'var(--color-accent-soft)'
                      : 'var(--color-surface-raised)',
                  color: isActive
                    ? 'var(--color-accent-fg)'
                    : isCompleted
                      ? 'var(--color-accent)'
                      : 'var(--color-text-subtle)',
                }}
              >
                {i + 1}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-muted)',
                  whiteSpace: 'nowrap',
                }}
              >
                {step.label}
              </span>
            </button>
          )
        })}
      </div>

      {/* Active step detail */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.id}
            initial={reduceMotion ? {} : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              padding: '1.25rem',
            }}
          >
            {/* Label + latency */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem',
                flexWrap: 'wrap',
              }}
            >
              <h4
                style={{
                  margin: 0,
                  fontSize: 'var(--text-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}
              >
                {active.label}
              </h4>
              {active.latency && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '2px 8px',
                    background: 'var(--color-accent-soft)',
                    border: '1px solid var(--color-accent)',
                    borderRadius: 'var(--radius-pill)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    color: 'var(--color-accent)',
                  }}
                >
                  {active.latency}
                </span>
              )}
            </div>

            {/* Purpose */}
            {active.purpose && (
              <p
                style={{
                  margin: '0 0 0.75rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-relaxed)',
                }}
              >
                {active.purpose}
              </p>
            )}

            {/* Optimization note */}
            {active.optimization && (
              <div
                style={{
                  padding: '0.625rem 0.875rem',
                  background: 'var(--color-surface-raised)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 'var(--line-height-normal)',
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    marginRight: '0.35rem',
                  }}
                >
                  Optimization:
                </span>
                {active.optimization}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
