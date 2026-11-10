import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import GitHubContributionHeatmap from '../components/GitHubContributionHeatmap'
import { kagglePinned } from '../data/profiles'
import { GITHUB_REPO_COUNT, LEETCODE_STATS } from '../data/stats'
import SEO from '../components/SEO'
import CountValue from '../components/CountValue'
import LiveContributionStream from '../components/LiveContributionStream'

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
    id: 'huggingface',
    number: '02',
    name: 'Hugging Face',
    handle: '@himanshunakrani9',
    href: 'https://huggingface.co/himanshunakrani9',
    platformColor: '#ff9d00',
    summary: 'Fine-tuning artifacts, datasets, and compact reasoning models.',
    lead: 1,
    focus: ['LoRA', 'Open models'],
    stats: [
      { value: '11', label: 'Models' },
      { value: '2.8K', label: 'Downloads' },
      { value: '11', label: 'Datasets' },
    ],
  },
  {
    id: 'kaggle',
    number: '03',
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
    id: 'linkedin',
    number: '04',
    name: 'LinkedIn',
    handle: '/in/himanshu-nakrani',
    href: 'https://www.linkedin.com/in/himanshu-nakrani/',
    platformColor: '#0a66c2',
    summary: 'Career context, verified certifications, and direct outreach.',
    lead: 1,
    focus: ['Credentials', 'Contact'],
    stats: [
      { value: 'AI', label: 'Focus' },
      { value: '3+', label: 'Years' },
      { value: 'AWS', label: 'Certified' },
      { value: 'Open', label: 'Contact' },
    ],
  },
  {
    id: 'leetcode',
    number: '05',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    platformColor: 'var(--color-accent)',
    summary: 'DSA practice that keeps fundamentals sharp alongside applied AI work.',
    focus: ['DSA', 'Python'],
    stats: [
      { value: String(LEETCODE_STATS.solved), label: 'Solved' },
      { value: String(LEETCODE_STATS.medium), label: 'Medium' },
      { value: 'Python', label: 'Language' },
    ],
  },
]

const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,056', total: '9,785', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,883', total: '62,296', silver: 1, bronze: 16 },
]

const featuredIds = new Set(['github', 'kaggle'])

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

function ProfileIndex() {
  return (
    <nav className="signal-index" aria-label="Profile index">
      {platformRows.map((row) => {
        const stat = row.stats[row.lead || 0]
        return (
          <a
            key={row.id}
            href={`#profile-${row.id}`}
            className="signal-index__card"
            style={{ '--profile-platform-color': row.platformColor }}
          >
            <span className="signal-index__name">{row.name}</span>
            <CountValue className="signal-index__value" value={stat.value} />
            <span className="signal-index__meta">
              {stat.label}
              <span>{row.handle}</span>
            </span>
          </a>
        )
      })}
    </nav>
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
          <CountValue
            className={`profile-ledger-stat-num ledger-stat-num${String(stat.value).length > 6 ? ' is-compact' : ''}`}
            value={stat.value}
          />
          <span className="profile-ledger-stat-label ledger-stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
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

  const featured = featuredIds.has(row.id)

  return (
    <motion.section
      ref={ref}
      id={`profile-${row.id}`}
      className={`profile-ledger-row ledger-row profile-ledger-row--${row.id}${featured ? ' profile-ledger-row--featured' : ' profile-ledger-row--compact'}`}
      style={{ '--profile-platform-color': row.platformColor, '--ledger-accent': row.platformColor }}
      aria-labelledby={`profile-${row.id}-title`}
      {...getMotionProps(reduceMotion, inView)}
    >
      <header className="profile-card__head">
        <div>
          <p className="profile-card__index">{row.number}{row.badge ? ` · ${row.badge}` : ''}</p>
          <h2 id={`profile-${row.id}-title`} className="profile-card__name">{row.name}</h2>
          <p className="profile-ledger-summary">{row.summary}</p>
        </div>
        <a
          className="profile-card__open"
          href={row.href}
          target="_blank"
          aria-label={`Open ${row.name} profile`}
        >
          {row.handle}
          <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
        </a>
      </header>
      <div className="profile-focus-list" aria-label={`${row.name} focus areas`}>
        {row.focus.map((item) => (
          <span key={item} className="profile-focus-chip">{item}</span>
        ))}
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

        <ProfileIndex />

        <LiveContributionStream />

        <div className="profiles-ledger" aria-label="External profile activity">
          {platformRows
            .filter((row) => featuredIds.has(row.id))
            .map((row) => (
              <LedgerRow key={row.id} row={row} />
            ))}
          {platformRows
            .filter((row) => !featuredIds.has(row.id))
            .map((row) => (
              <LedgerRow key={row.id} row={row} />
            ))}
        </div>
      </section>
    </>
  )
}
