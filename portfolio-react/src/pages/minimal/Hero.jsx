import { Github, Linkedin, Mail, FileText, MapPin, Zap } from 'lucide-react'

const STATS = [
  { value: '2+',   label: 'Years at State Street' },
  { value: '10+',  label: 'Business units' },
  { value: '200+', label: 'Total users' },
  { value: '75%',  label: 'Avg latency reduction' },
  { value: '2',    label: 'IEEE publications' },
]

const CURRENTLY = [
  { area: 'Researching', text: 'Agent evaluation — measuring multi-step reasoning quality and tool-use reliability', tags: ['LLM Evals', 'Agents'] },
  { area: 'Building',    text: 'Agent Forge v2 — composable multi-agent orchestration with structured tool use',        tags: ['Multi-Agent', 'Tool Use'] },
  { area: 'Optimizing',  text: 'Hybrid RAG retrieval — latency, re-ranking, and source-grounded answers',               tags: ['RAG', 'Latency'] },
]

export default function Hero() {
  return (
    <section id="about" className="spa-section" aria-labelledby="hero-name">
      <div style={{ display: 'flex', gap: '1.75rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <picture style={{ flexShrink: 0 }}>
          <source type="image/webp" srcSet="/himanshu.webp" />
          <img
            src="/himanshu.jpg"
            alt="Himanshu Nakrani"
            width="360"
            height="540"
            decoding="async"
            style={{
              width: 80,
              height: 80,
              borderRadius: 10,
              objectFit: 'contain',
              objectPosition: 'center top',
              border: '1px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          />
        </picture>
        <div>
          <h1 id="hero-name" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '0.25rem', fontFamily: 'var(--font-display)' }}>
            Himanshu Nakrani
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono, monospace)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Generative AI Engineer
            </span>
            <span style={{ color: 'var(--color-border-strong)', fontSize: '0.75rem' }}>·</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>
              <MapPin size={12} />
              Hyderabad, India
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--color-success)', flexShrink: 0 }} aria-hidden="true" />
            <span style={{ fontSize: '0.78rem', color: 'var(--color-success)', fontWeight: 500 }}>Open to opportunities</span>
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--color-text-muted)', marginBottom: '1.75rem', maxWidth: 620 }}>
        I build <strong style={{ color: 'var(--color-text)' }}>LLM systems for financial-data workflows</strong> at State Street Corporation — Text-to-SQL, RAG pipelines,
        AI agent tooling, and evaluation infrastructure. Currently an Emerging Lead having progressed from intern to senior associate in two years.
        I also publish research on structured query generation with LLMs.
      </p>

      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <a href="https://github.com/himanshu-nakrani" target="_blank" rel="noopener noreferrer" className="spa-btn spa-btn--primary">
          <Github size={14} />
          GitHub
        </a>
        <a href="https://www.linkedin.com/in/himanshu-nakrani/" target="_blank" rel="noopener noreferrer" className="spa-btn spa-btn--ghost">
          <Linkedin size={14} />
          LinkedIn
        </a>
        <a href="mailto:himanshunakrani0@gmail.com" className="spa-btn spa-btn--ghost">
          <Mail size={14} />
          Email
        </a>
        <a href="/resume.pdf" className="spa-btn spa-btn--ghost">
          <FileText size={14} />
          Resume
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '2.5rem' }} className="spa-stats-grid">
        {STATS.map((s) => (
          <div key={s.label} style={{ padding: '1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--color-accent)', lineHeight: 1, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.85rem' }}>
          <Zap size={14} color="var(--color-accent)" />
          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono, monospace)', textTransform: 'uppercase', letterSpacing: '0.09em', color: 'var(--color-text-subtle)', fontWeight: 600 }}>
            Currently
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {CURRENTLY.map((item) => (
            <div key={item.area} style={{ display: 'flex', gap: '0.85rem', padding: '0.85rem 1rem', background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
              <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono, monospace)', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0, paddingTop: 2, minWidth: 72 }}>
                {item.area}
              </span>
              <span style={{ fontSize: '0.83rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{item.text}</span>
              <div style={{ display: 'flex', gap: '0.35rem', marginLeft: 'auto', flexShrink: 0, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                {item.tags.map((t) => (
                  <span key={t} className="spa-tag">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .spa-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
