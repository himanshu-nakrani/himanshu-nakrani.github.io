import { techMarquee } from '../content'

/**
 * Static ruled strip of core technologies.
 */
export default function StackStrip() {
  return (
    <aside className="stack-strip" aria-label="Core technologies">
      <div className="container stack-strip__inner">
        <span className="stack-strip__label">Stack</span>
        {techMarquee.map((item) => (
          <span key={item} className="stack-strip__item">{item}</span>
        ))}
      </div>
    </aside>
  )
}
