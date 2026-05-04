import { useReducedMotion } from 'framer-motion'

/**
 * Atmospheric backdrop — three quiet layers:
 *   1. Cool radial gradients (top-left + bottom-right)
 *   2. Faint vertical grid lines (CAD/instrument feel, masked to fade out)
 *   3. Static film grain to break up flat surfaces
 *
 * No motion. No warm tones. No heavy blur. Just air.
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
      <div className="ambient-layer ambient-grid" />
      <div className="ambient-layer ambient-grain" />
    </div>
  )
}
