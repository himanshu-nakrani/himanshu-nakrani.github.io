import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const EXPERIENCE = [
  {
    role: 'AI Software Developer',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Jan 2023 – Present',
    progression: 'Intern → Associate 2 → Senior Associate → Emerging Lead',
    desc: 'Building LLM systems for financial-data workflows. Alpha Copilot serves 10+ business units with 200+ total users, with 75% average latency reduction and 95%+ backend unit-test coverage.',
    bullets: [
      'Architected Alpha Copilot — Text-to-SQL assistant serving 10+ business units with 200+ total users over structured financial data',
      'Engineered FastAPI + SQLAlchemy backend with caching and schema-linking, cutting average response latency by 75% (25–30s → 6–8s)',
      'Integrated LLM-based data visualization for auto-generating interactive charts from query results',
      'Led backend for WealthAI — real-time portfolio narrative generation from optimizer outputs',
      'Fine-tuned GPT-4o mini, GPT-4.1 mini (Azure OpenAI) and Llama 3.1-8B (Databricks) using PEFT/LoRA',
      'Researched schema-linking and few-shot prompting strategies; measured 90% SQL accuracy on an internal golden dataset',
      'Building Agent Forge — no-code AI agent builder with real-time trace monitoring and evaluation dashboards',
      'Reached 95%+ backend unit-test coverage for Alpha Copilot',
      'Built RAG for fund prospectuses using OpenAI embeddings, chunking, source attribution, and vector search',
      'Migrated legacy ideation platform from .NET Core to FastAPI + ReactJS, improving performance by 40%',
    ],
    tags: ['FastAPI', 'LangChain', 'Azure OpenAI', 'LoRA/PEFT', 'Text-to-SQL', 'Databricks', 'Google ADK', 'RAG', 'pgvector'],
  },
  {
    role: 'Machine Learning Developer Intern',
    company: 'Technocolabs Software Inc.',
    location: 'Remote',
    period: 'Jun 2022 – Jul 2022',
    desc: 'Developed CNN-based music skip prediction model achieving 87% accuracy. Executed end-to-end ML pipeline from data preprocessing through production API deployment.',
    bullets: [
      'Built CNN-based Spotify Skip Action Predictor achieving 87% accuracy in real-time prediction',
      'End-to-end ML pipeline: data preprocessing, feature engineering, model training, and API deployment',
    ],
    tags: ['CNN', 'Python', 'Deep Learning', 'API Deployment'],
  },
]

function ExperienceItem({ item }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="spa-timeline__item">
      <div className="spa-timeline__dot" aria-hidden="true" />
      <div className="spa-timeline__content">
        <div className="spa-timeline__period">{item.period}</div>
        <div className="spa-timeline__role">{item.role}</div>
        <div className="spa-timeline__company">
          {item.company} · {item.location}
          {item.progression && (
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-mono, monospace)', marginTop: 2 }}>
              {item.progression}
            </span>
          )}
        </div>
        <p className="spa-timeline__desc">{item.desc}</p>

        {expanded && (
          <ul className="spa-timeline__bullets" style={{ marginBottom: '0.85rem' }}>
            {item.bullets.map((b) => (
              <li key={b} className="spa-timeline__bullet">{b}</li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="spa-timeline__tags">
            {item.tags.map((t) => (
              <span key={t} className="spa-tag">{t}</span>
            ))}
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: '2px 0', flexShrink: 0 }}
            aria-expanded={expanded}
          >
            {expanded ? <><ChevronUp size={13} /> Less</> : <><ChevronDown size={13} /> All bullets</>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="spa-section" aria-labelledby="exp-title">
      <div className="spa-section__label">Experience</div>
      <h2 id="exp-title" className="spa-section__title">Career</h2>

      <div className="spa-timeline">
        <div className="spa-timeline__line" aria-hidden="true" />
        {EXPERIENCE.map((item) => (
          <ExperienceItem key={item.company} item={item} />
        ))}
      </div>
    </section>
  )
}
