import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, TrendingUp, Award, Code, GitCommit, Star } from 'lucide-react'

function SkeletonCard({ rows = 3 }) {
  return (
    <div className="glass-card" style={{
      padding: '1.5rem',
      overflow: 'hidden',
    }}>
      {/* Header shimmer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
        <div className="skeleton-shimmer" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
        <div className="skeleton-shimmer" style={{ width: 120, height: 18 }} />
      </div>
      {/* Stat row shimmers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="skeleton-shimmer" style={{ width: '55%', height: 14 }} />
            <div className="skeleton-shimmer" style={{ width: '25%', height: 20 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LiveMetricsDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    github: { repos: 0, stars: 0, commits: 0 },
    kaggle: { rank: 0, medals: 0, votes: 0 },
    leetcode: { solved: 0, ranking: 0 },
  })

  useEffect(() => {
    // Simulate loading metrics with animation
    const timer = setTimeout(() => {
      setMetrics({
        github: { repos: 26, stars: 156, commits: 1240 },
        kaggle: { rank: 'Expert', medals: 5, votes: 881 },
        leetcode: { solved: 180, ranking: '~150k' },
      })
      setIsLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const cards = [
    {
      title: 'GitHub Activity',
      icon: Github,
      color: '#6e5494',
      stats: [
        { label: 'Public Repos', value: metrics.github.repos, icon: Code },
        { label: 'Total Stars', value: metrics.github.stars, icon: Star },
        { label: 'Commits (2024)', value: metrics.github.commits, icon: GitCommit },
      ],
    },
    {
      title: 'Kaggle Profile',
      icon: TrendingUp,
      color: '#20beff',
      stats: [
        { label: 'Rank', value: metrics.kaggle.rank, icon: Award },
        { label: 'Medals', value: metrics.kaggle.medals, icon: Award },
        { label: 'Total Votes', value: metrics.kaggle.votes, icon: TrendingUp },
      ],
    },
    {
      title: 'LeetCode Stats',
      icon: Code,
      color: '#ffa116',
      stats: [
        { label: 'Problems Solved', value: metrics.leetcode.solved, icon: Code },
        { label: 'Global Ranking', value: metrics.leetcode.ranking, icon: TrendingUp },
      ],
    },
  ]

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          [0, 1, 2].map(i => (
            <motion.div key={`skeleton-${i}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SkeletonCard rows={3} />
            </motion.div>
          ))
        ) : (
          cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="glass-card"
                style={{
                  padding: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ position: 'absolute', top: -20, right: -20, opacity: 0.1 }}>
                  <Icon size={120} style={{ color: card.color }} />
                </div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.5rem', background: `${card.color}20`, borderRadius: 8 }}>
                      <Icon size={20} style={{ color: card.color }} />
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{card.title}</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {card.stats.map((stat) => {
                      const StatIcon = stat.icon
                      return (
                        <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <StatIcon size={14} style={{ color: 'var(--text2)' }} />
                            <span style={{ fontSize: '0.85rem', color: 'var(--text2)' }}>{stat.label}</span>
                          </div>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                            style={{ fontSize: '1.1rem', fontWeight: 700, color: card.color }}
                          >
                            {stat.value}
                          </motion.span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )
          })
        )}
      </AnimatePresence>
    </div>
  )
}
