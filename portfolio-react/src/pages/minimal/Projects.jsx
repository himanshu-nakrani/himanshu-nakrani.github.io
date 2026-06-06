import { useState } from 'react'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'

const PROJECTS = [
  {
    title: 'Alpha Copilot',
    desc: 'Internal Text-to-SQL assistant for approved financial datasets, used across 10+ business units with 200+ total users.',
    tags: ['Text-to-SQL', 'FastAPI', 'Azure OpenAI', 'SQLAlchemy'],
    badge: 'Production',
    link: null,
    metrics: [{ value: '75%', label: 'Avg latency reduction' }, { value: '200+', label: 'Total users' }],
    bullets: [
      'Natural language to SQL translation with 90% accuracy on an internal golden dataset',
      'Caching reducing average response time from 25–30s to 6–8s',
      'Auto-generated interactive charts and visualizations',
      'Multi-turn conversation with context awareness',
    ],
  },
  {
    title: 'Agent Forge',
    desc: 'No-code AI agent builder for designing, registering, and monitoring custom agents with trace views and evaluation dashboards.',
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
    desc: 'Portfolio narrative generation system that turns optimizer outputs into readable investment commentary.',
    tags: ['LLM', 'FastAPI', 'Real-time', 'Finance'],
    badge: 'Production',
    link: null,
    metrics: [{ value: '<2s', label: 'Generation time' }],
  },
  {
    title: 'Fund Prospectus RAG',
    desc: 'RAG system for source-aware answers over fund prospectus documents using OpenAI embeddings, pgvector, and citation tracking.',
    tags: ['RAG', 'OpenAI', 'pgvector', 'Embeddings'],
    badge: 'Production',
    link: null,
    bullets: [
      'Intelligent document chunking with overlap strategy',
      'Hybrid search combining semantic and keyword matching',
      'Sub-second retrieval across indexed prospectus content',
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
    title: 'TinyMathReason-1B',
    desc: 'From-scratch 1.07B-parameter math reasoning LLM trained on TPU v4-64 with 57B tokens of curated math, web, and code data.',
    tags: ['Pretraining', 'JAX', 'MaxText', 'TPU', 'LLM'],
    badge: 'Research',
    link: null,
    metrics: [{ value: '57B', label: 'Tokens trained' }, { value: '1.07B', label: 'Parameters' }],
    bullets: [
      'Custom 32k math tokenizer and packed FineWeb-Edu, MathPile, OpenWebMath, and Stack-Edu shards',
      'Completed 54,363 MaxText pretraining steps with ~1M tokens per step',
      'Resolved TPU spot preemptions and JAX 0.6.2 compatibility issues across Pallas, AbstractMesh, and reshard APIs',
      'Next stages: Orbax → Hugging Face conversion, SFT, DPO/GRPO, benchmarks, and model release',
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
  {
    title: 'RAGrade',
    desc: 'RAG evaluation dashboard for managing documents, question sets, experiments, and parameter sweeps with blind evaluation, daily challenges, and arena battles.',
    tags: ['RAG', 'Evaluation', 'TypeScript', 'React', 'PostgreSQL'],
    link: 'https://github.com/himanshu-nakrani/RAGrade',
    bullets: [
      'Configurable experiments — chunk size, embedding model, retriever type, top-K',
      'Blind evaluation mode and RAG Arena for head-to-head comparison',
      'Daily challenge with deterministic presets and personal best scoring',
      'Leaderboard ranking by faithfulness, recall, and latency metrics',
    ],
  },
  {
    title: 'Generative AI Academy',
    desc: 'Hands-on generative AI learning platform with 40 topic modules, 200+ MCQ quizzes, XP/levels, 24 achievement badges, and streak tracking.',
    tags: ['Generative AI', 'Education', 'TypeScript', 'React', 'PostgreSQL'],
    link: 'https://github.com/himanshu-nakrani/Generative-AI-Academy',
    liveLink: 'https://himanshu-nakrani.github.io/Generative-AI-Academy/',
    bullets: [
      '40 topic modules with prerequisite-aware progression and learning paths',
      '200+ MCQ questions with daily challenge and timed quiz modes',
      'XP/levels, 24 achievement badges, streak tracking, and activity heatmap',
      'Optional Clerk auth with OAuth for cross-device profile and progress sync',
    ],
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
