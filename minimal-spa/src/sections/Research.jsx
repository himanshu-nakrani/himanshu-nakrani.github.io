import { ExternalLink } from 'lucide-react'

const PUBLICATIONS = [
  {
    venue: 'IEEE · FLLM 2025',
    title: 'GoT4SQL-DA: A Graph-of-Thoughts Framework for Scalable Text-to-SQL Data Augmentation',
    desc: 'Novel framework leveraging Graph-of-Thoughts reasoning for scalable data augmentation in Text-to-SQL systems.',
    tags: ['Graph-of-Thoughts', 'Text-to-SQL', 'Data Augmentation'],
    link: 'https://ieeexplore.ieee.org/abstract/document/11391068',
    status: 'Published',
  },
  {
    venue: 'IEEE · CSCI 2025',
    title: 'GRAFT: Graph-of-Thoughts based Reasoning and Augmentation for Finetuning Text-to-SQL',
    desc: 'Research on applying Graph-of-Thoughts reasoning to improve fine-tuning pipelines for Text-to-SQL generation.',
    tags: ['Fine-tuning', 'LLM', 'Reasoning'],
    link: null,
    status: 'Under Review',
  },
]

const PIPELINE = {
  title: 'Production RAG / Text-to-SQL Pipeline',
  stages: [
    { label: 'Ingestion',           detail: 'Document parsing, chunking, embedding' },
    { label: 'Retrieval',           detail: 'Hybrid vector + keyword search' },
    { label: 'Prompt Orchestration',detail: 'Chain-of-thought, few-shot, routing' },
    { label: 'Evaluation',          detail: 'Faithfulness, relevance, latency checks' },
    { label: 'Delivery',            detail: 'API response, UI rendering, caching' },
  ],
}

export default function Research() {
  return (
    <section id="research" className="section" aria-labelledby="research-title">
      <div className="section__label">Research</div>
      <h2 id="research-title" className="section__title">Publications</h2>

      <div className="pub-list">
        {PUBLICATIONS.map((pub) => (
          <div key={pub.title} className="pub-item">
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.3rem' }}>
              <div className="pub-item__venue">{pub.venue}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 7px',
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  background: pub.status === 'Published' ? 'rgba(22,163,74,0.1)' : 'var(--accent-soft)',
                  color: pub.status === 'Published' ? '#16a34a' : 'var(--accent)',
                  border: `1px solid ${pub.status === 'Published' ? 'rgba(22,163,74,0.2)' : 'rgba(194,98,42,0.2)'}`,
                }}>
                  {pub.status}
                </span>
                {pub.link && (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-subtle)', display: 'flex', alignItems: 'center' }} aria-label="View publication">
                    <ExternalLink size={13} />
                  </a>
                )}
              </div>
            </div>
            <div className="pub-item__title">{pub.title}</div>
            <p className="pub-item__desc">{pub.desc}</p>
            <div className="pub-item__tags">
              {pub.tags.map((t) => <span key={t} className="tag">{t}</span>)}
            </div>
          </div>
        ))}
      </div>

      {/* Architecture pipeline */}
      <div style={{ marginTop: '2.5rem' }}>
        <div className="section__label" style={{ marginBottom: '0.85rem' }}>{PIPELINE.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {PIPELINE.stages.map((stage, i) => (
            <div key={stage.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: i === 0 ? '8px 8px 0 0' : i === PIPELINE.stages.length - 1 ? '0 0 8px 8px' : 0 }}>
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)', minWidth: 20, fontWeight: 700 }}>
                0{i + 1}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)', minWidth: 160 }}>{stage.label}</span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>{stage.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
