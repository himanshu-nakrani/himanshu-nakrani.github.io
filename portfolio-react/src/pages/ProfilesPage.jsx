import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import GitHubContributionHeatmap from '../components/GitHubContributionHeatmap'
import { kagglePinned } from '../data/profiles'
import SEO from '../components/SEO'

const platformRows = [
  {
    id: 'github',
    number: '01',
    name: 'GitHub',
    handle: '@himanshu-nakrani',
    href: 'https://github.com/himanshu-nakrani',
    platformColor: '#6e5494',
    stats: [
      { value: '46', label: 'Repos' },
      { value: '680', label: 'Commits' },
      { value: 'TypeScript', label: 'Primary' },
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
    stats: [
      { value: '884', label: 'Votes' },
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
    stats: [
      { value: '12', label: 'Models' },
      { value: '2.6K', label: 'Downloads' },
      { value: '1', label: 'Dataset' },
    ],
  },
  {
    id: 'leetcode',
    number: '04',
    name: 'LeetCode',
    handle: '@himanshunakrani0',
    href: 'https://leetcode.com/u/himanshunakrani0/',
    platformColor: '#ffa116',
    stats: [
      { value: '180', label: 'Solved' },
      { value: '~150k', label: 'Global rank' },
    ],
  },
]

const kaggleTiers = [
  { title: 'Datasets Expert', rank: '1,056', total: '9,785', silver: 3, bronze: 4 },
  { title: 'Notebooks Expert', rank: '2,883', total: '62,296', silver: 1, bronze: 16 },
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
      className="profile-ledger-header"
      href={row.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${row.name} profile for ${row.handle}`}
    >
      <span className="profile-ledger-platform">{label}</span>
      <span className="profile-ledger-handle">
        {row.handle}
        <ExternalLink size={15} strokeWidth={1.8} aria-hidden="true" />
      </span>
    </a>
  )
}

function StatBand({ stats, inView, reduceMotion }) {
  return (
    <div className="profile-ledger-stat-band" aria-label="Profile statistics">
      {stats.map((stat, index) => (
        <motion.div
          key={`${stat.label}-${stat.value}`}
          className="profile-ledger-stat"
          {...getMotionProps(reduceMotion, inView, 0.08 + index * 0.06)}
        >
          <span className="profile-ledger-stat-num">{stat.value}</span>
          <span className="profile-ledger-stat-label">{stat.label}</span>
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

  return (
    <motion.section
      ref={ref}
      className={`profile-ledger-row section-hairline profile-ledger-row--${row.id}`}
      style={{ '--profile-platform-color': row.platformColor }}
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
        <p className="profile-ledger-note">Fine-tuning · LoRA · GRPO</p>
      )}

      {row.id === 'leetcode' && (
        <p className="profile-ledger-note profile-ledger-note--prose">
          Consistent problem solver — sharpening DSA skills alongside AI/ML work.
        </p>
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
          description="GitHub, Kaggle, LeetCode, and research — all in one place."
        />

        <div className="profiles-ledger" aria-label="External profile activity ledger">
          {platformRows.map((row) => (
            <LedgerRow key={row.id} row={row} />
          ))}
        </div>
      </section>
    </>
  )
}
