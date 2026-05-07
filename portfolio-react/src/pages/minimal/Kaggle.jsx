const PINNED = [
  { type: 'Notebook', medal: 'Silver', title: 'Bitcoin Price Prediction (Updated Daily)', desc: 'LSTM-based daily-updated crypto forecasting.', votes: 156, link: 'https://www.kaggle.com/code/himanshunakrani/bitcoin-price-prediction-updated-daily' },
  { type: 'Dataset',  medal: 'Silver', title: 'Iris Dataset', desc: 'Widely-used classification dataset.', votes: 395, link: 'https://www.kaggle.com/datasets/himanshunakrani/iris-dataset' },
  { type: 'Dataset',  medal: 'Silver', title: 'Student Study Hours Dataset', desc: 'Popular regression dataset.', votes: 262, link: 'https://www.kaggle.com/datasets/himanshunakrani/student-study-hours' },
  { type: 'Notebook', medal: 'Bronze', title: 'Gold Price Prediction Project', desc: 'End-to-end ML project predicting gold prices.', votes: 59, link: 'https://www.kaggle.com/code/himanshunakrani/gold-price-prediction-project' },
  { type: 'Notebook', medal: null,     title: 'RAG with LangChain', desc: 'Practical RAG implementation.', votes: 12, link: 'https://www.kaggle.com/code/himanshunakrani/rag-retrieval-augmented-generation-with-langchain' },
  { type: 'Notebook', medal: null,     title: 'CrewAI Multi-Agent Blog Generator', desc: 'Multi-agent system using CrewAI.', votes: 2, link: 'https://www.kaggle.com/code/himanshunakrani/crewai-multi-ai-agent-blog-generator' },
]

export default function Kaggle() {
  return (
    <section id="kaggle" className="spa-section" aria-labelledby="kaggle-title">
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.4rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div>
          <div className="spa-section__label">Kaggle</div>
          <h2 id="kaggle-title" className="spa-section__title">Notebooks & Datasets</h2>
        </div>
        <a
          href="https://www.kaggle.com/himanshunakrani"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.78rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono, monospace)', textDecoration: 'underline', textUnderlineOffset: 3 }}
        >
          Expert · kaggle.com/himanshunakrani
        </a>
      </div>

      <div className="spa-kaggle-grid">
        {PINNED.map((item) => (
          <a key={item.title} href={item.link} target="_blank" rel="noopener noreferrer" className="spa-kaggle-item">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <span className="spa-kaggle-item__type">{item.type}</span>
              {item.medal && (
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-text-subtle)' }}>
                  {item.medal === 'Silver' ? 'Silver' : 'Bronze'}
                </span>
              )}
            </div>
            <div className="spa-kaggle-item__title">{item.title}</div>
            <p style={{ fontSize: '0.76rem', color: 'var(--color-text-subtle)', lineHeight: 1.5, marginBottom: '0.4rem', margin: '0.25rem 0 0.4rem' }}>
              {item.desc}
            </p>
            <div className="spa-kaggle-item__votes">{item.votes} votes</div>
          </a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.25rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Rank', value: 'Expert' },
          { label: 'Total votes', value: '913+' },
          { label: 'Notebooks', value: '4' },
          { label: 'Datasets', value: '2' },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}>{s.value}</div>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono, monospace)', color: 'var(--color-text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
