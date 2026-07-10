import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, BriefcaseBusiness, Mail, Microscope } from 'lucide-react'
import { Link } from 'react-router-dom'
import DataIcon from './DataIcon'
import { projects } from '../data/projects'
import { modelOpsSnapshots } from '../data/lab'

const featured = projects.find(project => project.title === 'Agent Forge')
const selectedProjects = [
  projects.find(project => project.title === 'Alpha Copilot'),
  projects.find(project => project.title === 'Sourceful'),
].filter(Boolean)
const research = modelOpsSnapshots.find(model => model.id === 'tinymathReason')

const outcomes = [
  { value: '200+', label: 'Users served' },
  { value: '75%', label: 'Lower latency' },
  { value: '10+', label: 'Business units' },
  { value: '95%+', label: 'Test coverage' },
]

function Reveal({ children, className, delay = 0 }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: reduceMotion ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function CardLink({ to, children, label }) {
  return (
    <Link className="home-bento__link" to={to} aria-label={label}>
      {children}
      <ArrowUpRight size={16} aria-hidden="true" />
    </Link>
  )
}

export default function HomeBentoDashboard() {
  return (
    <section id="highlights" className="home-bento-section" aria-labelledby="home-bento-title">
      <div className="home-bento-shell">
        <header className="home-bento-heading">
          <div>
            <span className="home-bento-kicker">02 / Selected systems</span>
            <h2 id="home-bento-title">Production work, research, and impact.</h2>
          </div>
          <p>A concise view of the systems I build—from enterprise AI products to model training at infrastructure scale.</p>
        </header>

        <div className="home-bento-grid">
          <Reveal className="home-bento-card home-bento-card--feature">
            <div className="home-bento-card__eyebrow">
              <span><span className="status-dot status-dot--pulse" /> Flagship system</span>
              <span>{featured?.badge}</span>
            </div>
            <div className="home-bento-feature__body">
              <div className="home-bento-icon"><DataIcon name={featured?.icon} size={22} /></div>
              <h3>{featured?.title}</h3>
              <p>{featured?.desc}</p>
              <div className="home-bento-tags">
                {featured?.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
            <div className="home-bento-pipeline" aria-label="Agent Forge workflow lifecycle">
              {['Design', 'Register', 'Execute', 'Trace', 'Evaluate'].map((stage, index) => (
                <div key={stage} className="home-bento-pipeline__stage">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{stage}</strong>
                </div>
              ))}
            </div>
            <CardLink to="/projects/agent-forge" label="Read the Agent Forge case study">Read case study</CardLink>
          </Reveal>

          <Reveal className="home-bento-card home-bento-card--outcomes" delay={0.05}>
            <div className="home-bento-card__eyebrow"><span>Verified outcomes</span><span>2023—Now</span></div>
            <div className="home-bento-outcomes">
              {outcomes.map(outcome => (
                <div key={outcome.label}>
                  <strong>{outcome.value}</strong>
                  <span>{outcome.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {selectedProjects.map((project, index) => (
            <Reveal key={project.title} className="home-bento-card home-bento-card--project" delay={0.08 + index * 0.05}>
              <div className="home-bento-card__eyebrow">
                <span>{index === 0 ? 'Enterprise AI' : 'Open source'}</span>
                <DataIcon name={project.icon} size={16} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
              <div className="home-bento-tags">
                {project.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <CardLink to="/projects" label={`View ${project.title} in projects`}>View project</CardLink>
            </Reveal>
          ))}

          <Reveal className="home-bento-card home-bento-card--research" delay={0.16}>
            <div className="home-bento-card__eyebrow"><span>Model research</span><Microscope size={16} /></div>
            <h3>{research?.title}</h3>
            <p>{research?.subtitle}. A from-scratch compact reasoning model with a custom tokenizer and distributed training pipeline.</p>
            <div className="home-bento-research-metrics">
              {research?.metrics.slice(0, 3).map(metric => (
                <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span></div>
              ))}
            </div>
            <CardLink to="/research/tinymathreason-1b" label="Read the TinyMathReason research deep dive">Research deep dive</CardLink>
          </Reveal>

          <Reveal className="home-bento-card home-bento-card--career" delay={0.2}>
            <div className="home-bento-card__eyebrow"><span>Career snapshot</span><BriefcaseBusiness size={16} /></div>
            <div className="home-bento-career__role">AI Software Developer</div>
            <h3>State Street Corporation</h3>
            <p>Progressed from intern to emerging lead while building enterprise LLM systems, responsible AI tooling, and agent platforms.</p>
            <div className="home-bento-career__track">
              {['Intern', 'Associate 2', 'Sr. Associate', 'Emerging Lead'].map((step, index) => (
                <div key={step} className={index === 3 ? 'is-current' : ''}><span />{step}</div>
              ))}
            </div>
            <CardLink to="/experience" label="View full work experience">Full experience</CardLink>
          </Reveal>

          <Reveal className="home-bento-card home-bento-card--contact" delay={0.24}>
            <div className="home-bento-card__eyebrow"><span>Available for conversation</span><span className="status-dot status-dot--pulse" /></div>
            <Mail size={22} aria-hidden="true" />
            <h3>Building an ambitious AI product?</h3>
            <p>Let&apos;s discuss production LLM systems, agent infrastructure, or applied model research.</p>
            <a className="home-bento__link" href="mailto:himanshunakrani0@gmail.com">
              Start a conversation <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
