import { useReducedMotion } from 'framer-motion'

/**
 * Simplified ambient atmosphere: backdrop + grain only
 * Drifting orbs removed for performance on mobile
 * Vignette removed to not interfere with hero CTAs
 */
export default function AmbientAtmosphere({
  enableAnimation = true,
  ariaHidden = true,
}) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimation && !reduceMotion

  return (
    <div
      className="ambient-atmosphere"
      data-animate={shouldAnimate ? 'on' : 'off'}
      aria-hidden={ariaHidden}
    >
      <div className="ambient-layer ambient-backdrop" />
      <div className="ambient-layer ambient-grain" />
    </div>
  )
}
