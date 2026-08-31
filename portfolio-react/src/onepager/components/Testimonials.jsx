import Section from './Section'
import Reveal from './Reveal'
import { testimonials } from '../../data'

export default function Testimonials() {
  return (
    <Section
      id="testimonials"
      index="07"
      kicker="Testimonials"
      title="What people say"
      subtitle="Feedback from colleagues and stakeholders across production AI initiatives."
    >
      <div className="quotes">
        {testimonials.map((quote, i) => (
          <Reveal key={quote.name} delay={i * 0.07}>
            <figure className="quote" style={{ margin: 0 }}>
              <span className="quote__mark" aria-hidden="true">“</span>
              <blockquote className="quote__text" style={{ margin: 0 }}>
                {quote.text}
              </blockquote>
              <figcaption className="quote__author">
                <span className="quote__name">{quote.name}</span>
                <span className="quote__role">{quote.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
