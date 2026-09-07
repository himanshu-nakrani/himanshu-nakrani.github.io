import Section from './Section'
import Reveal from './Reveal'
import { certifications, skills } from '../../data'

// ⚡ Bolt Optimization: Pre-compute total skills outside of render cycle
// using a single-pass loop instead of an in-render .reduce() to prevent
// O(N) intermediate function closures and object allocations per render.
let totalSkills = 0
for (const group of skills) {
  totalSkills += group.items.length
}

export default function Skills() {
  return (
    <Section
      id="skills"
      index="05"
      kicker="Tech Stack"
      title="Skills & tools"
      subtitle={`${totalSkills}+ technologies across ${skills.length} domains — from LLM backends to cloud infrastructure.`}
    >
      <Reveal y={14}>
        <div className="skill-columns">
          {skills.map((group, i) => (
            <section key={group.label} className="skill-group" aria-label={group.label}>
              <header className="skill-group__head">
                <span className="skill-group__no">{`0${i + 1}`}</span>
                <span className="skill-group__label">{group.label.replace(/^[^\w]+\s*/, '')}</span>
                <span className="skill-group__count">{group.items.length}</span>
              </header>
              <p className="skill-group__items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </p>
            </section>
          ))}
        </div>

        <h3 className="subhead">Certifications</h3>
        <ul className="cert-list">
          {certifications.map((cert) => (
            <li key={cert.name}>{cert.name}</li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
