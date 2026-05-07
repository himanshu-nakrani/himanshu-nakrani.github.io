import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Alpha Copilot',
    desc: 'Enterprise LLM-powered Text-to-SQL chatbot enabling natural language queries over structured financial data. Serves 100+ internal users at State Street.',
    tags: ['Text-to-SQL', 'FastAPI', 'Azure OpenAI', 'SQLAlchemy'],
    badge: 'Production',
    link: null,
    metrics: [{ value: '75%', label: 'Latency reduction' }, { value: '100+', label: 'Active users' }],
    bullets: [
      'Natural language to SQL translation with 90%+ accuracy',
      'Intelligent caching reducing response time from 25–30s to 6–8s',
      'Auto-generated interactive charts and visualizations',
      'Multi-turn conversation with context awareness',
    ],
  },
  {
    title: 'Agent Forge',
    desc: 'No-code AI agent builder platform for designing, registering, and deploying custom agents with real-time trace monitoring and evaluation dashboards.',
    tags: ['AI Agents', 'Google ADK', 'LangChain', 'Observability'],
    badge: 'Production',
    link: null,
    bullets: [
      'Visual workflow builder with drag-and-drop interface',
      'Real-time agent execution tracing and debugging',
      'Built-in evaluation framework with custom metrics',
    ],
  },
  {
    title: 'WealthAI',
    desc: 'Real-time portfolio narrative generation system that processes optimizer outputs and delivers personalized investment insights at scale.',
    tags: ['LLM', 'FastAPI', 'Real-time', 'Finance'],
    badge: 'Production',
    link: null,
    metrics: [{ value: '<2s', label: 'Generation time' }],
  },
  {
    title: 'Fund Prospectus RAG',
    desc: 'Production RAG system for extracting actionable insights from fund prospectuses using OpenAI models, vector embeddings, and intelligent chunking.',
    tags: ['RAG', 'OpenAI', 'pgvector', 'Embeddings'],
    badge: 'Production',
    link: null,
    bullets: [
      'Intelligent document chunking with overlap strategy',
      'Hybrid search combining semantic and keyword matching',
      'Sub-second retrieval from 10,000+ documents',
    ],
  },
  {
    title: 'LLaMA 3.2-3B Mathematical Reasoning Fine-tuning',
    desc: 'End-to-end fine-tuning pipeline: generated 200 synthetic reasoning samples on AMD MI300X GPU using Qwen 3.6, then fine-tuned LLaMA 3.2-3B with QLoRA.',
    tags: ['Fine-tuning', 'QLoRA', 'LoRA/PEFT', 'LLM'],
    badge: 'Research',
    link: 'https://huggingface.co/himanshunakrani9/llama-3.2-3b-reasoning-sft',
    metrics: [{ value: '77%', label: 'Loss reduction' }],
    bullets: [
      'Synthetic data generation using Qwen 3.6-35B',
      'QLoRA with 4-bit NormalFloat quantization',
      'Structured reasoning: Understand → Plan → Execute → Verify',
    ],
  },
  {
    title: 'Document QA',
    desc: 'Document question-answering system using LLMs and retrieval techniques.',
    tags: ['Python', 'LLM', 'RAG'],
    link: 'https://github.com/himanshu-nakrani/document-qa',
    liveLink: 'https://document-qa-two.vercel.app/',
  },
  {
    title: 'Intrusion Detection System',
    desc: 'ML-based network intrusion detection on KDD Cup 1999 dataset (4.9M records), achieving 94% accuracy.',
    tags: ['Random Forest', 'XGBoost', 'Python'],
    link: 'https://github.com/himanshu-nakrani/Intrusion-Detection-System',
    metrics: [{ value: '94%', label: 'Accuracy' }],
  },
  {
    title: 'Cryptocurrency Price Prediction',
    desc: 'Automated daily-updated crypto forecasting using LSTM networks with technical indicators.',
    tags: ['LSTM', 'Time Series', 'Deep Learning'],
    link: 'https://github.com/himanshu-nakrani/Cryptocurrency-Price-Prediction',
    metrics: [{ value: '18%', label: 'RMSE reduction' }],
  },
  {
    title: 'Gold Price Prediction',
    desc: 'ML-based gold price forecasting using historical market data.',
    tags: ['Python', 'Regression', 'Jupyter'],
    link: 'https://github.com/himanshu-nakrani/Gold-price-prediction',
  },
]

function ProjectRow({ project }) {
  const [expanded, setExpanded] = useState(false)
  const hasBullets = project.bullets && project.bullets.length > 0

  return (
    <div className="spa-project-row" style={{ flexDirection: 'column', gap: 0 }}>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', width: '100%' }}>
        <div className="spa-project-row__meta">
          <div className="spa-project-row__header">
            <span className="spa-project-row__title">{project.title}</span>
            {project.badge && (
              <span className={`spa-project-row__badge spa-badge--${project.badge.toLowerCase()}`}>{project.badge}</span>
            )}
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-text-subtle)', display: 'flex', alignItems: 'center', marginLeft: 'auto' }} aria-label={`Open ${project.title}`}>
                <ExternalLink size={13} />
              </a>
            )}
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-accent)', fontSize: '0.7rem', fontFamily: 'var(--font-mono, monospace)', display: 'flex', alignItems: 'center', gap: 3 }}>
                <ExternalLink size={11} />
                Live
              </a>
            )}
          </div>
          <p className="spa-project-row__desc">{project.desc}</p>
          <div className="spa-project-row__tags">
            {project.tags.map((t) => <span key={t} className="spa-tag">{t}</span>)}
          </div>
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="spa-project-row__metrics">
            {project.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <div className="spa-project-row__metric-val">{m.value}</div>
                <div className="spa-project-row__metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {hasBullets && (
        <>
          {expanded && (
            <ul style={{ listStyle: 'none', marginTop: '0.75rem', paddingLeft: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem', width: '100%' }}>
              {project.bullets.map((b) => (
                <li key={b} className="spa-timeline__bullet">{b}</li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setExpanded((e) => !e)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.73rem', color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', padding: '0.5rem 0 0', alignSelf: 'flex-start' }}
            aria-expanded={expanded}
          >
            {expanded ? <><ChevronUp size={12} /> Hide</> : <><ChevronDown size={12} /> Details</>}
          </button>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="spa-section" aria-labelledby="proj-title">
      <div className="spa-section__label">Projects</div>
      <h2 id="proj-title" className="spa-section__title">Work</h2>

      <div className="spa-projects-list">
        {PROJECTS.map((p) => (
          <ProjectRow key={p.title} project={p} />
        ))}
      </div>
    </section>
  )
}
