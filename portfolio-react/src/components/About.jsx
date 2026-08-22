import { Check, Compass } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { certifications, currentFocusItems } from '../data'
import { identity, journey, values } from '../content'

export default function About() {
  return (
    <Section
      id="about"
      index="01"
      kicker="About"
      title="Turning LLM research into systems people rely on"
    >
      <div className="about__grid">
        <div>
          <Reveal>
            <div className="prose">
              <p>
                I'm an <strong>AI Software Developer at State Street Corporation</strong>,
                building enterprise-grade LLM systems and AI agents for financial data —
                including <strong>Alpha Copilot</strong>, a Text-to-SQL assistant serving 100+
                internal users, and <strong>Agent Forge</strong>, a no-code AI agent builder.
              </p>
            </div>
            <ul className="fact-list">
              {identity.bioFacts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
          </Reveal>

          <h3 className="subhead">
            <span className="subhead-no">A.</span>
            How I work
          </h3>
          <ol className="value-list">
            {values.map((value, i) => (
              <li key={value.title}>
                <span className="value-no">{`0${i + 1}`}</span>
                <div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="subhead">
            <Check size={13} aria-hidden="true" style={{ color: 'var(--color-accent)' }} />
            Certifications
          </h3>
          <ul className="cert-list">
            {certifications.map((cert) => (
              <li key={cert.title}>{cert.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <Reveal delay={0.08}>
            <h3 className="subhead">Journey</h3>
            <div className="journey">
              {journey.map((item) => (
                <div key={item.year} className="journey__item">
                  <span className="journey__year">{item.year}</span>
                  <h4 className="journey__title">{item.title}</h4>
                  <p className="journey__subtitle">{item.subtitle}</p>
                  <p className="journey__desc">{item.description}</p>
                </div>
              ))}
            </div>

            <h3 className="subhead">
              <Compass size={13} aria-hidden="true" style={{ color: 'var(--color-accent)' }} />
              Current focus
            </h3>
            <ul className="focus-list">
              {currentFocusItems.map((item) => (
                <li key={item.area}>
                  <span className="focus-area">{item.area}</span>
                  <p className="focus-desc">{item.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
