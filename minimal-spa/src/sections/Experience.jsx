import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const EXPERIENCE = [
  {
    role: 'AI Software Developer',
    company: 'State Street Corporation',
    location: 'Hyderabad, India',
    period: 'Jan 2023 – Present',
    progression: 'Intern → Associate 2 → Senior Associate → Emerging Lead',
    desc: 'Building enterprise-grade LLM systems and AI agents. Architected Alpha Copilot (Text-to-SQL chatbot serving 100+ users) and Agent Forge (no-code AI agent builder). Optimized systems achieving 75% latency reduction and 95%+ test coverage.',
    bullets: [
      'Architected Alpha Copilot — enterprise LLM-powered Text-to-SQL chatbot serving 100+ internal users over structured financial data',
      'Engineered FastAPI + SQLAlchemy backend with advanced caching, cutting response time by 75% (25–30s → 6–8s)',
      'Integrated LLM-based data visualization for auto-generating interactive charts from query results',
      'Led backend for WealthAI — real-time portfolio narrative generation from optimizer outputs',
      'Fine-tuned GPT-4o mini, GPT-4.1 mini (Azure OpenAI) and Llama 3.1-8B (Databricks) using PEFT/LoRA',
      'Researched schema-linking and few-shot prompting strategies, improving SQL accuracy by 25%',
      'Building Agent Forge — no-code AI agent builder with real-time trace monitoring and evaluation dashboards',
      'Achieved 95%+ unit test coverage across production systems',
      'Built production-ready RAG for fund prospectuses using OpenAI + vector embeddings; intelligent chunking and vector DB pipeline for sub-second retrieval',
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
    <div className="timeline__item">
      <div className="timeline__dot" aria-hidden="true" />
      <div className="timeline__content">
        <div className="timeline__period">{item.period}</div>
        <div className="timeline__role">{item.role}</div>
        <div className="timeline__company">
          {item.company} · {item.location}
          {item.progression && (
            <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
              {item.progression}
            </span>
          )}
        </div>
        <p className="timeline__desc">{item.desc}</p>

        {expanded && (
          <ul className="timeline__bullets" style={{ marginBottom: '0.85rem' }}>
            {item.bullets.map((b) => (
              <li key={b} className="timeline__bullet">{b}</li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div className="timeline__tags">
            {item.tags.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.75rem', color: 'var(--accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: '2px 0', flexShrink: 0 }}
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
    <section id="experience" className="section" aria-labelledby="exp-title">
      <div className="section__label">Experience</div>
      <h2 id="exp-title" className="section__title">Career</h2>

      <div className="timeline">
        <div className="timeline__line" aria-hidden="true" />
        {EXPERIENCE.map((item) => (
          <ExperienceItem key={item.company} item={item} />
        ))}
      </div>
    </section>
  )
}
