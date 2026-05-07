const SKILLS = [
  {
    label: 'AI & LLMs',
    items: ['LLMs', 'RAG', 'Fine-tuning', 'LoRA/PEFT', 'Prompt Engineering', 'AI Agents', 'OpenAI API', 'Azure OpenAI', 'LangChain', 'Google ADK'],
  },
  {
    label: 'Machine Learning',
    items: ['CNNs', 'LSTM', 'XGBoost', 'Random Forest', 'Feature Engineering', 'Model Deployment', 'scikit-learn', 'TensorFlow', 'PyTorch', 'Transformers'],
  },
  {
    label: 'Backend & APIs',
    items: ['FastAPI', 'ASP.NET Core', 'REST APIs', 'SQLAlchemy', 'WebSocket', 'Microservices'],
  },
  {
    label: 'Languages',
    items: ['Python', 'SQL', 'TypeScript', 'Java', 'C#', 'C/C++', 'Shell/Perl'],
  },
  {
    label: 'Data & Databases',
    items: ['PostgreSQL', 'pgvector', 'SQLite', 'Vector DBs', 'Semantic Search', 'Redis', 'Pandas', 'NumPy'],
  },
  {
    label: 'Cloud & DevOps',
    items: ['Azure', 'AWS', 'OCI', 'Databricks', 'CI/CD', 'Docker', 'Azure OpenAI Studio'],
  },
]

const CERTIFICATIONS = [
  { name: 'Oracle Cloud Infrastructure Certified Generative AI Professional', issuer: 'Oracle' },
  { name: 'Amazon Machine Learning Summer School 2022', issuer: 'Amazon' },
  { name: 'AWS Machine Learning Foundations', issuer: 'Udacity' },
  { name: 'Goldman Sachs Engineering Virtual Program', issuer: 'Goldman Sachs' },
  { name: 'Generative AI Fundamentals', issuer: 'Databricks' },
]

export default function Skills() {
  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="section__label">Skills</div>
      <h2 id="skills-title" className="section__title">Toolkit</h2>

      <div className="skills-groups">
        {SKILLS.map((group) => (
          <div key={group.label}>
            <div className="skills-group__label">{group.label}</div>
            <div className="skills-group__items">
              {group.items.map((item) => (
                <span key={item} className="tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div style={{ marginTop: '3rem' }}>
        <div className="section__label" style={{ marginBottom: '0.85rem' }}>Certifications</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 7 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)' }}>{c.name}</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', flexShrink: 0, marginLeft: '1rem' }}>{c.issuer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
