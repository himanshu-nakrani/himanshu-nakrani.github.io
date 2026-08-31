import { ArrowUpRight } from 'lucide-react'
import Section from './Section'
import Reveal from './Reveal'
import { kagglePinned } from '../../data'
import { ghStats, kaggleCounters, kaggleTiers, medalByLabel, platforms } from '../content'

export default function Profiles() {
  return (
    <Section
      id="profiles"
      index="06"
      kicker="Proof of Work"
      title="Profiles & activity"
      subtitle="GitHub, Kaggle, LeetCode, and LinkedIn — a running record of shipping, competing, and sharing."
    >
      <Reveal y={14}>
        <div className="plat-row">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              className="plat-cell"
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>
                <span className="plat-cell__name">
                  {platform.name}
                  <ArrowUpRight size={13} aria-hidden="true" style={{ color: 'var(--color-text-subtle)' }} />
                </span>
                <span className="plat-cell__handle">{platform.handle}</span>
              </span>

              <span className="plat-cell__stats">
                {platform.stats.map((stat) => (
                  <span key={stat.label} className="plat-cell__stat">
                    <span className="plat-cell__label">{stat.label}</span>
                    <span className="plat-cell__value">{stat.value}</span>
                  </span>
                ))}
              </span>

              <span className="plat-cell__badge">● {platform.badge}</span>
            </a>
          ))}
        </div>
      </Reveal>

      <div className="profiles-lower">
        <Reveal y={16}>
          <section aria-label="GitHub activity">
            <h3 className="panel__caption">GitHub activity</h3>
            <div className="gh-stat-row">
              {ghStats.map((stat) => (
                <div key={stat.label} className="gh-stat">
                  <div className="gh-stat__num">{stat.num}</div>
                  <div className="gh-stat__label">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="heatmap">
              <p className="panel__caption">Contribution heatmap</p>
              <img
                src={`${import.meta.env.BASE_URL}gh-contributions.svg`}
                alt="GitHub contribution heatmap for himanshu-nakrani"
                loading="lazy"
                style={{ width: '100%', minWidth: 420, height: 'auto', display: 'block' }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </div>
          </section>
        </Reveal>

        <Reveal delay={0.06} y={16}>
          <section aria-label="Kaggle profile">
            <h3 className="panel__caption">Kaggle profile</h3>
            <div className="kg-tiers">
              {kaggleTiers.map((tier) => (
                <div key={tier.title} className="kg-tier">
                  <div>
                    <p className="kg-tier__title">{tier.title}</p>
                    <p className="kg-tier__rank">
                      Rank <strong>{tier.rank}</strong> of {tier.total}{tier.highest ? ` · Best: ${tier.highest}` : ''}
                    </p>
                    <div className="kg-tier__medals">
                      <span className="medal-chip">🥈 {tier.silver} Silver</span>
                      <span className="medal-chip">🥉 {tier.bronze} Bronze</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="kg-counters">
              {kaggleCounters.map(([num, label]) => (
                <div key={label} className="gh-stat">
                  <div className="gh-stat__num">{num}</div>
                  <div className="gh-stat__label">{label}</div>
                </div>
              ))}
            </div>

            <h4 className="panel__caption" style={{ marginTop: '1.6rem' }}>
              Pinned work
            </h4>
            <ul className="work-list">
              {kagglePinned.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="work-list__type">
                      {item.medal && `${medalByLabel[item.medal] ?? ''} `}
                      {item.type === 'notebook' ? 'Notebook' : 'Dataset'}
                    </span>
                    <span className="work-list__title">{item.title}</span>
                    <span className="work-list__votes">▲ {item.votes}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              className="text-link panel__more"
              href="https://www.kaggle.com/himanshunakrani"
              target="_blank"
              rel="noopener noreferrer"
            >
              View full Kaggle profile ↗
            </a>
          </section>
        </Reveal>
      </div>
    </Section>
  )
}
