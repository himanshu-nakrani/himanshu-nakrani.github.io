import { ArrowUpRight } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { publications } from '../../data'
import { methodologySteps, researchFocus, researchInterests } from '../content'

export default function Research() {
  return (
    <Section
      id="research"
      index="04"
      kicker="Research"
      title="Publications"
      subtitle="Graph-of-Thoughts reasoning, Text-to-SQL augmentation, and LLM fine-tuning for structured data."
    >
      <div className="pub-list">
        {publications.map((pub, i) => (
          <Reveal key={pub.title} delay={i * 0.06} y={14}>
            <article className="pub-row">
              <div>
                <div className="pub-row__chips">
                  <span className="pub-row__venue">{pub.venue}</span>
                  <span className={pub.link ? 'badge badge--production' : 'badge badge--opensource'}>
                    {pub.link ? 'IEEE Published' : 'Accepted'}
                  </span>
                </div>
                <h3 className="pub-row__title">{pub.title}</h3>
                <p className="pub-row__desc">{pub.desc}</p>
                <div className="tags">
                  {pub.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
              {pub.link && (
                <div className="proj-links pub-row__side">
                  <a
                    className="text-link"
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    IEEE Xplore
                    <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                </div>
              )}
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal y={14}>
        <h3 className="subhead">Core methodology — Graph-of-Thoughts pipeline</h3>
        <ol className="method-grid">
          {methodologySteps.map((step) => (
            <li key={step.label} className="method-cell">
              <h4>{step.label}</h4>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      <Reveal y={12}>
        <h3 className="subhead">Research interests</h3>
        <p className="interests-line">
          {researchInterests.map((interest) => (
            <span key={interest}>{interest}</span>
          ))}
        </p>
      </Reveal>

      <Reveal y={12}>
        <aside className="pull-quote" style={{ marginTop: '2.5rem' }}>
          <p>{researchFocus}</p>
        </aside>
      </Reveal>
    </Section>
  )
}
