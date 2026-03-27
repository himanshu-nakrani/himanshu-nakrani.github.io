import Research from '../components/Research'

export default function ResearchPage() {
  return (
    <>
      <section style={{ padding: '110px 2rem 40px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: 'var(--nav-dot)', fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: 10 }}>
          RESEARCH
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.85rem)', lineHeight: 1.1, marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Publications
        </h1>
        <p style={{ color: 'var(--text2)', maxWidth: 640, fontSize: '1rem', lineHeight: 1.65 }}>
          Text-to-SQL, Graph-of-Thoughts, and reasoning-driven augmentation.
        </p>
      </section>
      <Research />
    </>
  )
}

