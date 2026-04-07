import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import { COLOR_THEMES, getColorTheme, COLOR_THEME_ATTR } from '../lib/colorTheme'

/** Public mirror (no PAT). The default vercel.app instance is often 503; "eight" may require PAT_1. */
const README_STATS = 'https://github-readme-stats-phi.vercel.app'

const ghStats = [
  { num: '19', label: 'Public Repos' },
  { num: '5', label: 'Followers' },
  { num: '2021', label: 'Member Since' },
  { num: 'Python', label: 'Primary Language' },
]

function getThemeColors(colorThemeId, isDark) {
  const theme = COLOR_THEMES.find((t) => t.id === colorThemeId) || COLOR_THEMES[2]
  return isDark ? theme.stats.dark : theme.stats.light
}

function buildStatsUrl(username, colorThemeId, isDark) {
  const c = getThemeColors(colorThemeId, isDark)
  return (
    `${README_STATS}/api?username=${username}&show_icons=true&hide_border=true` +
    `&bg_color=${c.bg}&title_color=${c.title}&icon_color=${c.icon}&text_color=${c.text}&ring_color=${c.ring}`
  )
}

function buildLangsUrl(username, colorThemeId, isDark) {
  const c = getThemeColors(colorThemeId, isDark)
  return (
    `${README_STATS}/api/top-langs/?username=${username}&layout=compact&hide_border=true` +
    `&bg_color=${c.bg}&title_color=${c.title}&text_color=${c.text}`
  )
}

function buildStreakUrl(username, colorThemeId, isDark) {
  const c = getThemeColors(colorThemeId, isDark)
  const s = c.streak
  return (
    `https://github-readme-streak-stats.herokuapp.com/?user=${username}&hide_border=true` +
    `&background=${s.background}&ring=${s.ring}&fire=${s.fire}` +
    `&currStreakLabel=${s.currStreakLabel}&sideLabels=${s.sideLabels}&dates=${s.dates}`
  )
}

export default function GitHub() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const [colorTheme, setColorTheme] = useState(getColorTheme)
  const [isDark, setIsDark] = useState(
    () => document.documentElement.getAttribute('data-theme') !== 'light'
  )

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
      const attr = document.documentElement.getAttribute(COLOR_THEME_ATTR)
      if (attr) setColorTheme(attr)
    })
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', COLOR_THEME_ATTR],
    })
    return () => observer.disconnect()
  }, [])

  const statsUrl = buildStatsUrl('himanshu-nakrani', colorTheme, isDark)
  const langsUrl = buildLangsUrl('himanshu-nakrani', colorTheme, isDark)
  const streakUrl = buildStreakUrl('himanshu-nakrani', colorTheme, isDark)

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
              whileHover={{ borderColor: 'var(--border2)', y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              style={{
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
                border: '1px solid var(--border)',
                borderRadius: 14, padding: '1.2rem', textAlign: 'center',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                boxShadow: 'var(--shadow-sm)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--accent), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', position: 'relative', zIndex: 1 }}>{s.num}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: 4, position: 'relative', zIndex: 1 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Contribution heatmap (last ~1 year) — SVG from ghchart */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.28 }}
          style={{ marginBottom: '2rem' }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              color: 'var(--text2)',
              fontFamily: "'Fira Code', monospace",
              letterSpacing: '0.12em',
              marginBottom: 10,
              textTransform: 'uppercase',
            }}
          >
            Contribution heatmap
          </p>
          <div
            className="gh-heatmap-wrap"
            style={{
              borderRadius: 14,
              border: '1px solid var(--border)',
              overflow: 'auto',
              background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}gh-contributions.svg`}
              alt="GitHub contributions in the last year (activity heat map)"
              style={{ display: 'block', width: '100%', minWidth: 640, height: 'auto' }}
              loading="lazy"
            />
          </div>
          <p style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 8, opacity: 0.85 }}>
            Daily commit activity (public contributions). GitHub-style green ramp on dark cells.
          </p>
        </motion.div>

        {/* Charts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}
        >
          <img
            src={statsUrl}
            alt="GitHub Stats"
            style={{ borderRadius: 12, flex: 1, minWidth: 240, maxWidth: '100%' }}
            loading="lazy"
          />
          <img
            src={langsUrl}
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
            src={streakUrl}
            alt="GitHub Streak"
            style={{ borderRadius: 12, width: '100%', maxWidth: 600 }}
            loading="lazy"
          />
        </motion.div>

        <motion.a
          href="https://github.com/himanshu-nakrani"
          target="_blank"
          rel="noopener"
          whileHover={{ scale: 1.02, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderColor: 'var(--border2)' }}
          style={{
            display: 'inline-block', border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)', padding: '11px 24px', borderRadius: 10,
            textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
View all repos on GitHub →
        </motion.a>
      </div>
      <style>{`
        @media (max-width: 600px) { .gh-stats-grid { grid-template-columns: repeat(2,1fr) !important; } }
        .gh-heatmap-wrap { -webkit-overflow-scrolling: touch; }
      `}</style>
    </Section>
  )
}
