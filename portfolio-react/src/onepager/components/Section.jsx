import Reveal from './Reveal'

/**
 * Editorial section wrapper — ruled header with index, title and
 * right-aligned description.
 */
export default function Section({ id, index, kicker, title, subtitle, alt = false, children }) {
  return (
    <section id={id} className={alt ? 'section section--alt' : 'section'} aria-label={title}>
      <div className="container">
        <Reveal y={16}>
          <header className="section__head">
            <div>
              {kicker && (
                <p className="section__kicker">
                  {index && <span className="section__no">{index}</span>}
                  {kicker}
                </p>
              )}
              <h2 className="section__title">{title}</h2>
            </div>
            {subtitle && <p className="section__sub">{subtitle}</p>}
          </header>
        </Reveal>
        {children}
      </div>
    </section>
  )
}
