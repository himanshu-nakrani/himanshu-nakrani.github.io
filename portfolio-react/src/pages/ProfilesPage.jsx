import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink, Network, RadioTower } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import GitHubContributionHeatmap from '../components/GitHubContributionHeatmap'
import LeetCodeContributionHeatmap from '../components/LeetCodeContributionHeatmap'
import { kagglePinned } from '../data/profiles'
import { GITHUB_REPO_COUNT, LEETCODE_STATS } from '../data/stats'
import SEO from '../components/SEO'

const kaggleVoteTotal = kagglePinned.reduce((total, item) => total + item.votes, 0)

const platformRows = [
  {
    id: 'github',
    number: '01',
    name: 'GitHub',
    handle: '@himanshu-nakrani',
    href: 'https://github.com/himanshu-nakrani',
    platformColor: '#6e5494',
    summary: 'Public engineering history across AI systems and backend work.',
    focus: ['AI systems', 'Backend APIs'],
    stats: [
      { value: String(GITHUB_REPO_COUNT), label: 'Repos' },
      { value: '680', label: 'Commits' },
      { value: 'Python', label: 'Primary' },
      { value: '2021', label: 'Since' },
    ],
  },
  {
    id: 'kaggle',
    number: '02',
    name: 'Kaggle',
    badge: 'Expert',
    handle: '@himanshunakrani',
    href: 'https://www.kaggle.com/himanshunakrani',
    platformColor: '#20beff',
    summary: 'Applied ML notebooks and datasets with durable community usage.',
    focus: ['Forecasting', 'Datasets'],
    stats: [
      { value: String(kaggleVoteTotal), label: 'Votes' },
      { value: '2×', label: 'Expert' },
      { value: '74', label: 'Notebooks' },
      { value: '14', label: 'Datasets' },
    ],
  },
  {
    id: 'huggingface',
    number: '03',
    name: 'Hugging Face',
    handle: '@himanshunakrani9',
    href: 'https://huggingface.co/himanshunakrani9',
    platformColor: '#ff9d00',
    summary: 'Model and dataset artifacts for compact reasoning experiments.',
    focus: ['LoRA', 'Open models'],
    stats: [
      { value: '11', label: 'Models' },
      { value: '2.8K', label: 'Downloads' },
      { value: '11', label: 'Datasets' },
    ],
  },
  {
    id: 'leetcode',
    number: '04',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    platformColor: 'var(--color-accent)',
    summary: 'Problem-solving practice alongside applied AI engineering.',
    focus: ['DSA', 'Python'],
    stats: [
      { value: String(LEETCODE_STATS.solved), label: 'Solved' },
      { value: String(LEETCODE_STATS.easy), label: 'Easy' },
      { value: String(LEETCODE_STATS.medium), label: 'Medium' },
      { value: LEETCODE_STATS.ranking, label: 'Global rank' },
    ],
  },
  {
    id: 'linkedin',
    number: '05',
    name: 'LinkedIn',
    handle: '/in/himanshu-nakrani',
    href: 'https://www.linkedin.com/in/himanshu-nakrani/',
    platformColor: '#0a66c2',
    summary: 'Professional context, credentials, and contact.',
    focus: ['Credentials', 'Contact'],
    stats: [
      { value: 'AI', label: 'Focus' },
      { value: '3+', label: 'Years' },
      { value: 'AWS', label: 'Certified' },
      { value: 'Open', label: 'Contact' },
    ],
  },
]

const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,056', total: '9,785', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,883', total: '62,296', silver: 1, bronze: 16 },
]

const overviewStats = [
  { value: platformRows.length, label: 'Public surfaces' },
  { value: GITHUB_REPO_COUNT, label: 'GitHub repos' },
  { value: kaggleVoteTotal, label: 'Kaggle votes' },
  { value: LEETCODE_STATS.solved, label: 'LeetCode solved' },
]

function getMotionProps(reduceMotion, inView, delay = 0) {
  if (reduceMotion) {
    return {
      initial: false,
      animate: { opacity: 1, y: 0 },
    }
  }

  return {
    initial: { opacity: 0, y: 18 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
  }
}

function PlatformHeader({ row }) {
  const label = row.badge ? `${row.name} · ${row.badge}` : row.name

  return (
    <a
      className="profile-ledger-header ledger-header"
      href={row.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${row.name} profile for ${row.handle}`}
    >
      <span className="profile-ledger-platform ledger-title">{label}</span>
      <span className="profile-ledger-handle ledger-meta">
        {row.handle}
        <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </a>
  )
}

function StatBand({ stats, inView, reduceMotion }) {
  return (
    <div className="profile-ledger-stat-band ledger-stat-band" aria-label="Profile statistics">
      {stats.map((stat, index) => (
        <motion.div
          key={`${stat.label}-${stat.value}`}
          className="profile-ledger-stat ledger-stat"
          {...getMotionProps(reduceMotion, inView, 0.08 + index * 0.06)}
        >
          <span className={`profile-ledger-stat-num ledger-stat-num${String(stat.value).length > 6 ? ' is-compact' : ''}`}>
            {stat.value}
          </span>
          <span className="profile-ledger-stat-label ledger-stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function ProfilesOverview() {
  return (
    <section className="profiles-overview editorial-card" aria-label="Profile overview">
      <div className="profiles-overview__copy">
        <p className="profiles-overview__label">
          <RadioTower size={15} aria-hidden="true" />
          Public signal map
        </p>
        <h2 className="profiles-overview__title">A compact map of public proof.</h2>
        <p className="profiles-overview__text">
          Code, notebooks, models, problem solving, and credentials grouped by signal.
        </p>
      </div>
      <div className="profiles-overview__stats" aria-label="Profile summary statistics">
        {overviewStats.map((stat) => (
          <div key={stat.label} className="profiles-overview__stat">
            <span className="profiles-overview__stat-value">{stat.value}</span>
            <span className="profiles-overview__stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function KaggleTierLine({ tier }) {
  return (
    <div className="kaggle-tier-line">
      <Award size={16} strokeWidth={1.8} aria-hidden="true" />
      <span className="kaggle-tier-title">{tier.title}</span>
      <span className="kaggle-tier-meta">
        rank {tier.rank} / {tier.total} · {tier.silver} silver · {tier.bronze} bronze
      </span>
    </div>
  )
}

function KaggleWorkCard({ item }) {
  const typeLabel = item.type === 'notebook' ? 'Notebook' : 'Dataset'

  return (
    <a
      className="kaggle-work-card"
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="kaggle-work-topline">
        <span className="kaggle-work-type">{typeLabel}</span>
        {item.medal && <span className="kaggle-work-medal">{item.medal}</span>}
      </span>
      <span className="kaggle-work-title">{item.title}</span>
      <span className="kaggle-work-votes">{item.votes} votes</span>
    </a>
  )
}

function LedgerRow({ row }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      ref={ref}
      className={`profile-ledger-row ledger-row section-hairline profile-ledger-row--${row.id}`}
      style={{ '--profile-platform-color': row.platformColor, '--ledger-accent': row.platformColor }}
      aria-labelledby={`profile-${row.id}-title`}
      {...getMotionProps(reduceMotion, inView)}
    >
      <span className="section-ghost-num" aria-hidden="true">
        {row.number}
      </span>
      <h2 id={`profile-${row.id}-title`} className="sr-only">
        {row.name}
      </h2>

      <PlatformHeader row={row} />
      <div className="profile-ledger-intel">
        <p className="profile-ledger-summary">{row.summary}</p>
        <div className="profile-focus-list" aria-label={`${row.name} focus areas`}>
          {row.focus.map((item) => (
            <span key={item} className="profile-focus-chip">
              <Network size={13} aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
      <StatBand stats={row.stats} inView={inView} reduceMotion={reduceMotion} />

      {row.id === 'github' && (
        <div className="profile-heatmap-shell">
          <GitHubContributionHeatmap username="himanshu-nakrani" />
        </div>
      )}

      {row.id === 'kaggle' && (
        <div className="profile-ledger-detail-stack">
          <div className="kaggle-tier-list" aria-label="Kaggle expert tiers">
            {kaggleTiers.map((tier) => (
              <KaggleTierLine key={tier.title} tier={tier} />
            ))}
          </div>

          <div>
            <p className="profile-ledger-subhead">Pinned Work</p>
            <div className="kaggle-work-grid">
              {kagglePinned.map((item) => (
                <KaggleWorkCard key={item.link} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}

      {row.id === 'huggingface' && (
        <div className="profile-link-panel">
          <p className="profile-ledger-note">Compact-model experimentation, fine-tuning artifacts, datasets, and reasoning-model work.</p>
          <a href={row.href} target="_blank" rel="noopener noreferrer" className="profile-link-panel__cta">
            Open model hub
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      )}

      {row.id === 'leetcode' && (
        <div className="profile-ledger-detail-stack">
          <p className="profile-ledger-note profile-ledger-note--prose">
            {LEETCODE_STATS.solved} problems solved ({LEETCODE_STATS.hard} hard) — sharpening DSA alongside AI/ML work.
          </p>
          <div className="profile-heatmap-shell profile-heatmap-shell--leetcode">
            <LeetCodeContributionHeatmap username={LEETCODE_STATS.username} />
          </div>
        </div>
      )}

      {row.id === 'linkedin' && (
        <div className="profile-link-panel">
          <p className="profile-ledger-note">Best surface for career context, verified certifications, and direct outreach.</p>
          <a href={row.href} target="_blank" rel="noopener noreferrer" className="profile-link-panel__cta">
            Open LinkedIn
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      )}
    </motion.section>
  )
}

export default function ProfilesPage() {
  return (
    <>
      <SEO
        title="Profiles | Himanshu Nakrani"
        description="GitHub, Kaggle, LeetCode, Hugging Face, and LinkedIn profile highlights for Himanshu Nakrani."
      />
      <section className="mvp2-page profiles-ledger-page">
        <PageHeader
          kicker="Presence"
          title="Profiles & activity"
          description="Code, notebooks, models, problem solving, and professional context."
        />

        <ProfilesOverview />

        <div className="profiles-ledger" aria-label="External profile activity ledger">
          {platformRows.map((row) => (
            <LedgerRow key={row.id} row={row} />
          ))}
        </div>
      </section>
    </>
  )
}
