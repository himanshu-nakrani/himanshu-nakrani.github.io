import { useReducedMotion } from 'framer-motion'

/**
 * Simplified atmospheric backdrop for editorial design.
 * Just a subtle gradient — no grid, no grain.
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
    </div>
  )
}
