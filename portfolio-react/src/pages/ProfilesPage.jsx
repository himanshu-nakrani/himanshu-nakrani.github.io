import GitHub from '../components/GitHub'
import Kaggle from '../components/Kaggle'
import LeetCode from '../components/LeetCode'
import Research from '../components/Research'

export default function ProfilesPage() {
  return (
    <>
      <section style={{ padding: '110px 2rem 40px', maxWidth: 1100, margin: '0 auto' }}>
        <p style={{ color: 'var(--nav-dot)', fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: 10 }}>
          PRESENCE
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 2.85rem)', lineHeight: 1.1, marginBottom: '0.75rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
          Profiles & activity
        </h1>
        <p style={{ color: 'var(--text2)', maxWidth: 640, fontSize: '1rem', lineHeight: 1.65 }}>
          GitHub, Kaggle, LeetCode, and research — in one scroll.
        </p>
      </section>
      <GitHub />
      <Kaggle />
      <LeetCode />
      <Research />
    </>
  )
}

