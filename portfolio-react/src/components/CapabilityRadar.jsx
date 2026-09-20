import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ExternalLink } from 'lucide-react'

// Evidence map — capability → the work behind it. No proficiency scores;
// every capability points to real, linkable projects or research.
const capabilities = [
  {
    name: 'AI Systems',
    summary: 'Production LLM systems owned end to end.',
    evidence: [
      { label: 'Alpha Copilot', to: '/projects/alpha-copilot' },
      { label: 'Agent Forge', to: '/projects/agent-forge' },
      { label: 'WealthAI', to: '/projects' },
    ],
  },
  {
    name: 'Backend',
    summary: 'FastAPI services, retrieval infra, and secure data APIs.',
    evidence: [
      { label: 'Alpha Copilot', to: '/projects/alpha-copilot' },
      { label: 'Fund Prospectus RAG', to: '/projects/fund-prospectus-rag' },
      { label: 'Sourceful', to: '/projects' },
    ],
  },
  {
    name: 'LLMOps',
    summary: 'Fine-tuning, evaluation, tracing, and observability.',
    evidence: [
      { label: 'Agent Forge', to: '/projects/agent-forge' },
      { label: 'LLaMA 3B Reasoning', to: '/research/llama-3b-reasoning' },
      { label: 'TinyMathReason-1B', to: '/research/tinymathreason-1b' },
    ],
  },
  {
    name: 'Research',
    summary: 'Text-to-SQL reasoning and compact model pretraining.',
    evidence: [
      { label: 'GoT4SQL-DA (IEEE FLLM 2025)', href: 'https://ieeexplore.ieee.org/abstract/document/11391068' },
      { label: 'TinyMathReason-1B', to: '/research/tinymathreason-1b' },
      { label: 'LLaMA 3B Reasoning', to: '/research/llama-3b-reasoning' },
    ],
  },
  {
    name: 'Tooling',
    summary: 'No-code agent platforms and developer-facing UX.',
    evidence: [
      { label: 'Agent Forge', to: '/projects/agent-forge' },
      { label: 'TensorDojo', to: '/projects' },
      { label: 'Sourceful', to: '/projects' },
    ],
  },
  {
    name: 'Leadership',
    summary: 'Emerging Lead scope across cross-functional AI work.',
    evidence: [
      { label: 'Experience — Intern to Emerging Lead', to: '/experience' },
    ],
  },
]

function EvidenceLink({ item }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className="capability-map__evidence-link">
        {item.label} <ExternalLink size={13} aria-hidden="true" />
      </a>
    )
  }
  return (
    <Link to={item.to} className="capability-map__evidence-link">
      {item.label} <ArrowUpRight size={13} aria-hidden="true" />
    </Link>
  )
}

export default function CapabilityRadar() {
  const [active, setActive] = useState(capabilities[0])

  return (
    <section className="signature-visual capability-radar" aria-labelledby="capability-radar-title">
      <header className="signature-visual__header">
        <div>
          <span>Evidence map</span>
          <h2 id="capability-radar-title">What I build, and the work behind it</h2>
        </div>
        <p>Select a capability to see the projects and research that back it — not a proficiency score.</p>
      </header>

      <div className="capability-map__layout">
        <div className="capability-radar__controls" role="group" aria-label="Select capability">
          {capabilities.map((item) => (
            <button
              key={item.name}
              type="button"
              aria-pressed={active.name === item.name}
              className={active.name === item.name ? 'is-active' : ''}
              onClick={() => setActive(item)}
            >
              <span>{item.name}</span>
              <ArrowUpRight size={14} aria-hidden="true" style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
            </button>
          ))}
        </div>

        <div className="capability-radar__evidence" aria-live="polite">
          <span>{active.name}</span>
          <p>{active.summary}</p>
          <div className="capability-map__evidence-list">
            {active.evidence.map((item) => (
              <EvidenceLink key={item.label} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
