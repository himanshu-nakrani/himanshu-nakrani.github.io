import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { experience } from '../data'

const VISIBLE_BULLETS = 6

function ExperienceItem({ job }) {
  const [expanded, setExpanded] = useState(false)
  const hiddenCount = job.bullets.length - VISIBLE_BULLETS
  const bullets = expanded ? job.bullets : job.bullets.slice(0, VISIBLE_BULLETS)

  return (
    <article className="xp__item">
      <div className="xp__marker" aria-hidden="true">◆</div>
      <div>
        <div className="xp__head">
          <h3 className="xp__role">{job.role}</h3>
          <span className="xp__org">{job.company}</span>
        </div>
        <div className="xp__meta">
          <span>{job.period}</span>
          <span>{job.location}</span>
        </div>

        {job.progressionSteps && (
          <div
            className="xp__progression"
            role="img"
            aria-label={`Career progression: ${job.progression}. Currently ${job.currentRoleStep}.`}
          >
            {job.progressionSteps.map((step, i) => (
              <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}>
                {i > 0 && (
                  <span className="xp__step-arrow" aria-hidden="true">→</span>
                )}
                <span className={step === job.currentRoleStep ? 'xp__step is-current' : 'xp__step'}>
                  {step}
                </span>
              </span>
            ))}
          </div>
        )}

        <p className="xp__desc">{job.description}</p>

        <ul className="xp__bullets">
          {bullets.map((bullet) => (
            <li key={bullet} className="xp__bullet">{bullet}</li>
          ))}
        </ul>

        {hiddenCount > 0 && (
          <button
            type="button"
            className="xp__toggle"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
          >
            {expanded ? 'Show less' : `Show ${hiddenCount} more highlights`}
            <motion.span animate={{ rotate: expanded ? 180 : 0 }} style={{ display: 'inline-flex' }}>
              <ChevronDown size={13} />
            </motion.span>
          </button>
        )}

        <div className="tags">
          {job.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  )
}

export default function Experience() {
  return (
    <Section
      id="experience"
      index="02"
      kicker="Experience"
      title="Where I've built"
      subtitle="Enterprise AI software — RAG, LLM backends, and production systems at scale."
    >
      <Reveal>
        <div className="xp">
          {experience.map((job) => (
            <ExperienceItem key={job.company} job={job} />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
