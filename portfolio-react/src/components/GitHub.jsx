import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'

const ghStats = [
  { num: '19', label: 'Public Repos' },
  { num: '5', label: 'Followers' },
  { num: '2021', label: 'Member Since' },
  { num: 'Python', label: 'Primary Language' },
]

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <Section id="github" title="GitHub Activity" alt>
      <div ref={ref}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }} className="gh-stats-grid">
          {ghStats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ borderColor: 'var(--accent)', y: -2 }}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 14, padding: '1.2rem', textAlign: 'center',
                transition: 'border-color 0.2s, transform 0.2s',
              }}
            >
              <div style={{ fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}
        >
          <img
            src="https://github-readme-stats.vercel.app/api?username=himanshu-nakrani&show_icons=true&theme=tokyonight&hide_border=true&bg_color=0e0e1a&title_color=7c6fff&icon_color=b39dff&text_color=eeeef8&ring_color=7c6fff"
            alt="GitHub Stats"
            style={{ borderRadius: 12, flex: 1, minWidth: 240, maxWidth: '100%' }}
            loading="lazy"
          />
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs/?username=himanshu-nakrani&layout=compact&theme=tokyonight&hide_border=true&bg_color=0e0e1a&title_color=7c6fff&text_color=eeeef8"
            alt="Top Languages"
            style={{ borderRadius: 12, flex: 1, minWidth: 240, maxWidth: '100%' }}
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{ marginBottom: '1.5rem' }}
        >
          <img
            src="https://github-readme-streak-stats.herokuapp.com/?user=himanshu-nakrani&theme=tokyonight&hide_border=true&background=0e0e1a&ring=7c6fff&fire=b39dff&currStreakLabel=7c6fff&sideLabels=eeeef8&dates=9999bb"
            alt="GitHub Streak"
            style={{ borderRadius: 12, width: '100%', maxWidth: 600 }}
            loading="lazy"
          />
        </motion.div>

        <motion.a
          href="https://github.com/himanshu-nakrani"
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.03, borderColor: 'var(--accent)' }}
          style={{
            display: 'inline-block', border: '1px solid var(--border2)',
            color: 'var(--text)', padding: '10px 22px', borderRadius: 10,
            textDecoration: 'none', fontSize: '0.88rem', fontWeight: 500,
            transition: 'border-color 0.2s',
          }}
        >
          View all repos on GitHub →
        </motion.a>
      </div>
      <style>{`
        @media (max-width: 600px) { .gh-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </Section>
  )
}
