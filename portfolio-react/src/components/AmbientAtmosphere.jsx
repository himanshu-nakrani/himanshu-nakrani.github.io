import { useReducedMotion } from 'framer-motion'

export default function AmbientAtmosphere({
  enableAnimation = true,
  intensity = 'subtle',
  ariaHidden = true,
}) {
  const reduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimation && !reduceMotion

  return (
    <div
      className="ambient-atmosphere"
      data-animate={shouldAnimate ? 'on' : 'off'}
      data-intensity={intensity}
      aria-hidden={ariaHidden}
    >
      <div className="ambient-layer ambient-backdrop" />
      <div className="ambient-layer ambient-glow ambient-glow-a" />
      <div className="ambient-layer ambient-glow ambient-glow-b" />
      <div className="ambient-layer ambient-grain" />
      <div className="ambient-layer ambient-vignette" />
    </div>
  )
}
