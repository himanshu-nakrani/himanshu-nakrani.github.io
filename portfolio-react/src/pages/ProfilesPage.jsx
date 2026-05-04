import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ExternalLink, GitFork, Star, Users, Trophy, Code2, Flame } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import ActivityConstellation from '../components/ActivityConstellation'
import { kagglePinned } from '../data'

/* ─── Platform header cards ───────────────────────────── */
const platforms = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@himanshu-nakrani',
    href: 'https://github.com/himanshu-nakrani',
    color: '#6e5494',
    bg: 'rgba(110,84,148,0.1)',
    border: 'rgba(110,84,148,0.28)',
    emoji: '🐙',
    stats: [
      { icon: GitFork, label: 'Public Repos', value: '31' },
      { icon: Star, label: 'Stars',           value: '156' },
      { icon: Users, label: 'Followers',      value: '7' },
    ],
    badge: 'Python Primary',
  },
  {
    id: 'kaggle',
    name: 'Kaggle',
    handle: '@himanshunakrani',
    href: 'https://www.kaggle.com/himanshunakrani',
    color: '#20beff',
    bg: 'rgba(32,190,255,0.08)',
    border: 'rgba(32,190,255,0.25)',
    emoji: '📊',
    stats: [
      { icon: Trophy, label: 'Tier',     value: 'Expert' },
      { icon: Star,   label: 'Votes',    value: '884' },
      { icon: Users,  label: 'Followers',value: '53' },
    ],
    badge: 'Datasets + Notebooks',
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    color: '#ffa116',
    bg: 'rgba(255,161,22,0.08)',
    border: 'rgba(255,161,22,0.25)',
    emoji: '💻',
    stats: [
      { icon: Code2, label: 'Solved',  value: '180' },
      { icon: Flame, label: 'Ranking', value: '~150k' },
    ],
    badge: 'Consistent problem solver',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'himanshu-nakrani',
    href: 'https://www.linkedin.com/in/himanshu-nakrani/',
    color: '#0a66c2',
    bg: 'rgba(10,102,194,0.08)',
    border: 'rgba(10,102,194,0.25)',
    emoji: '💼',
    stats: [
      { icon: Users, label: 'Open to',  value: 'AI Roles' },
    ],
    badge: 'Connect on LinkedIn',
  },
]

/* ─── Kaggle expert tiers ──────────────────────────────── */
const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,211', total: '9,360', highest: '241', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,815', total: '61,511', highest: '479', silver: 1, bronze: 16 },
]
const kaggleCounters = [
  ['74', 'Notebooks'], ['13', 'Datasets'], ['4', 'Competitions'], ['53', 'Followers'],
]

/* ─── GitHub stats ─────────────────────────────────────── */
const ghStats = [
  { num: '31',     label: 'Public Repos' },
  { num: '1,240',  label: 'Commits (2024)' },
  { num: 'Python', label: 'Primary Lang' },
  { num: '2021',   label: 'Member Since' },
]

/* ─── Sub-components ───────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <p style={{
      display: 'flex', alignItems: 'center', gap: 6,
      fontSize: '0.68rem', fontWeight: 700, color: 'var(--color-accent)',
      textTransform: 'uppercase', letterSpacing: '0.13em', marginBottom: '0.9rem',
    }}>
      <span style={{ display: 'inline-block', width: 18, height: 1.5, background: 'var(--color-accent)', borderRadius: 2 }} />
      {children}
    </p>
  )
}

function PlatformCard({ p, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      ref={ref}
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: '1rem',
        padding: '1.25rem', borderRadius: 16,
        border: `1px solid ${hovered ? p.border.replace('0.28', '0.5') : p.border}`,
        background: hovered ? p.bg : 'var(--surface)',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? `0 8px 24px ${p.color}22` : 'var(--shadow-xs)',
        transition: 'all 0.22s ease',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, fontSize: '1.2rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: p.bg, border: `1px solid ${p.border}`,
          }}>
            {p.emoji}
          </div>
          <div>
            <p style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>{p.name}</p>
            <p style={{ fontSize: '0.72rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)' }}>{p.handle}</p>
          </div>
        </div>
        <ExternalLink size={14} color={hovered ? p.color : 'var(--text2)'} style={{ opacity: hovered ? 1 : 0.4, transition: 'all 0.2s', marginTop: 2 }} />
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {p.stats.map(({ icon: Icon, label, value }) => (
          <div key={label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            padding: '0.5rem 0.75rem', borderRadius: 8, flex: 1, minWidth: 56,
            background: hovered ? `${p.color}12` : 'var(--surface2)',
            border: `1px solid ${hovered ? p.border : 'var(--border)'}`,
            transition: 'all 0.22s',
          }}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: p.color, fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{value}</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--text2)', marginTop: 2, textAlign: 'center' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Badge */}
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        fontSize: '0.67rem', padding: '3px 10px', borderRadius: 20,
        background: `${p.color}12`, border: `1px solid ${p.border}`, color: p.color,
        fontWeight: 600, alignSelf: 'flex-start',
      }}>
        ● {p.badge}
      </span>
    </motion.a>
  )
}

function StatBox({ num, label, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      style={{
        padding: '1rem', borderRadius: 12, textAlign: 'center',
        background: 'var(--surface)', border: '1px solid var(--border)',
      }}
    >
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', lineHeight: 1 }}>{num}</div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text2)', marginTop: 4 }}>{label}</div>
    </motion.div>
  )
}

function KaggleWorkCard({ item, index, inView }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 3) * 0.08 + 0.15 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        padding: '1.1rem 1.2rem', borderRadius: 12,
        border: `1px solid ${hovered ? 'color-mix(in srgb, #20beff 40%, var(--border))' : 'var(--border)'}`,
        background: hovered ? 'color-mix(in srgb, #20beff 5%, var(--surface))' : 'var(--surface)',
        textDecoration: 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered ? '0 6px 20px rgba(32,190,255,0.12)' : 'var(--shadow-xs)',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '0.66rem', padding: '2px 8px', borderRadius: 20, border: '1px solid',
          ...(item.type === 'notebook'
            ? { color: '#4fc3f7', borderColor: 'rgba(79,195,247,0.3)', background: 'rgba(79,195,247,0.08)' }
            : { color: '#4ade80', borderColor: 'rgba(74,222,128,0.3)', background: 'rgba(74,222,128,0.08)' }),
        }}>
          {item.type === 'notebook' ? 'Notebook' : 'Dataset'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {item.medal && <span style={{ fontSize: '0.9rem' }}>{item.medal}</span>}
        </div>
      </div>
      <p style={{ fontSize: '0.87rem', fontWeight: 600, color: 'var(--text)', lineHeight: 1.35, margin: 0 }}>{item.title}</p>
      <p style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5, margin: 0, flex: 1 }}>{item.desc}</p>
      <span style={{ fontSize: '0.69rem', color: '#20beff', fontFamily: 'var(--font-mono)' }}>▲ {item.votes} votes</span>
    </motion.a>
  )
}

/* ─── Page ──────────────────────────────────────────────── */
export default function ProfilesPage() {
  const ghRef = useRef(null)
  const ghInView = useInView(ghRef, { once: true, margin: '-40px' })
  const kgRef = useRef(null)
  const kgInView = useInView(kgRef, { once: true, margin: '-40px' })
  const lcRef = useRef(null)
  const lcInView = useInView(lcRef, { once: true, margin: '-40px' })

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Presence"
        title="Profiles & activity"
        description="GitHub, Kaggle, LeetCode, and research — all in one place."
      />

      {/* ── Platform cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '0.9rem',
        marginBottom: '3rem',
      }}>
        {platforms.map((p, i) => <PlatformCard key={p.id} p={p} index={i} />)}
      </div>

      {/* ── GitHub ── */}
      <div ref={ghRef} style={{ marginBottom: '3.5rem' }}>
        <SectionLabel>GitHub Activity</SectionLabel>

        <ActivityConstellation profiles={platforms.filter(p => p.id === 'github')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem', marginTop: '1.5rem' }} className="profile-4col">
          {ghStats.map((s, i) => <StatBox key={s.label} num={s.num} label={s.label} index={i} inView={ghInView} />)}
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ghInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            borderRadius: 14, border: '1px solid var(--border)',
            overflow: 'auto', background: 'var(--surface)',
            padding: '1rem 1.25rem', marginBottom: '1.25rem',
          }}
        >
          <p style={{ fontSize: '0.66rem', color: 'var(--text2)', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
            Contribution heatmap
          </p>
          <img
            src={`${import.meta.env.BASE_URL}gh-contributions.svg`}
            alt="GitHub contribution heatmap"
            style={{ display: 'block', width: '100%', minWidth: 560, height: 'auto' }}
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>

        {/* Readme stats cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ghInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <img
            src="https://github-readme-stats-phi.vercel.app/api?username=himanshu-nakrani&show_icons=true&theme=gruvbox_light&hide_border=true&bg_color=0e0e1a&title_color=d4a24c&icon_color=d4a24c&text_color=eeeef8&ring_color=d4a24c"
            alt="GitHub Stats"
            style={{ borderRadius: 12, flex: 1, minWidth: 240, maxWidth: '100%' }}
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
          <img
            src="https://github-readme-stats-phi.vercel.app/api/top-langs/?username=himanshu-nakrani&layout=compact&theme=gruvbox_light&hide_border=true&bg_color=0e0e1a&title_color=d4a24c&text_color=eeeef8"
            alt="Top Languages"
            style={{ borderRadius: 12, flex: 1, minWidth: 240, maxWidth: '100%' }}
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </motion.div>
      </div>

      {/* ── Kaggle ── */}
      <div ref={kgRef} style={{ marginBottom: '3.5rem' }}>
        <SectionLabel>Kaggle Profile</SectionLabel>

        {/* Expert tier cards */}
        <div style={{ display: 'flex', gap: '0.9rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {kaggleTiers.map((tier, i) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 16 }}
              animate={kgInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{
                display: 'flex', gap: '0.9rem', alignItems: 'flex-start',
                padding: '1.2rem 1.3rem', borderRadius: 14, flex: 1, minWidth: 'min(100%, 230px)',
                border: '1px solid rgba(32,190,255,0.25)',
                background: 'color-mix(in srgb, #20beff 5%, var(--surface))',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                background: 'rgba(32,190,255,0.12)', border: '1px solid rgba(32,190,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem',
              }}>
                🏆
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 3, color: 'var(--text)' }}>{tier.title}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--text2)', marginBottom: 7 }}>
                  Rank <strong style={{ color: '#20beff' }}>{tier.rank}</strong> of {tier.total} · Best: {tier.highest}
                </p>
                <div style={{ display: 'flex', gap: 5 }}>
                  <span style={{ fontSize: '0.66rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(192,192,192,0.1)', border: '1px solid rgba(192,192,192,0.25)', color: '#c0c0c0' }}>🥈 {tier.silver} Silver</span>
                  <span style={{ fontSize: '0.66rem', padding: '2px 8px', borderRadius: 20, background: 'rgba(205,127,50,0.1)', border: '1px solid rgba(205,127,50,0.3)', color: '#cd7f32' }}>🥉 {tier.bronze} Bronze</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Counter grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.7rem', marginBottom: '1.75rem' }} className="profile-4col">
          {kaggleCounters.map(([num, label], i) => <StatBox key={label} num={num} label={label} index={i} inView={kgInView} />)}
        </div>

        {/* Pinned work */}
        <p style={{ fontSize: '0.68rem', fontWeight: 700, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.85rem', fontFamily: 'var(--font-mono)' }}>
          Pinned Work
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          {kagglePinned.map((item, i) => <KaggleWorkCard key={i} item={item} index={i} inView={kgInView} />)}
        </div>

        <a
          href="https://www.kaggle.com/himanshunakrani"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--ghost"
          style={{ fontSize: '0.82rem' }}
        >
          View full Kaggle profile ↗
        </a>
      </div>

      {/* ── LeetCode ── */}
      <div ref={lcRef} style={{ marginBottom: '3rem' }}>
        <SectionLabel>LeetCode</SectionLabel>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={lcInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            style={{ flex: 1, minWidth: 200 }}
          >
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#ffa116', marginBottom: 6 }}>@himanshunakrani0</p>
            <p style={{ color: 'var(--text2)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.7 }}>
              Consistent problem solver — sharpening DSA skills alongside AI/ML work.
              <strong style={{ color: 'var(--text)', display: 'block', marginTop: 4 }}>180 problems solved · ~150k global ranking</strong>
            </p>
            <a
              href="https://leetcode.com/u/himanshunakrani0/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
              style={{ fontSize: '0.82rem' }}
            >
              View LeetCode Profile ↗
            </a>
          </motion.div>
          <motion.img
            initial={{ opacity: 0, x: 16 }}
            animate={lcInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.1 }}
            src="https://leetcard.jacoblin.cool/himanshunakrani0?theme=dark&font=Fira%20Code&ext=heatmap&border=0&radius=12"
            alt="LeetCode Stats Card"
            style={{ borderRadius: 14, maxWidth: 480, width: '100%', flex: 2, border: '1px solid var(--border)' }}
            loading="lazy"
            onError={e => { e.currentTarget.style.display = 'none' }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .profile-4col { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
