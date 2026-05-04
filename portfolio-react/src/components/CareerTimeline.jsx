import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { 
  Briefcase, Calendar, MapPin, TrendingUp, Users, Zap, TestTube,
  ChevronRight, Box, FlaskConical, BadgeCheck, Handshake
} from 'lucide-react'
import { DisclosureGroup, DisclosureItem } from './ui/DisclosureGroup'
import Tag from './Tag'
import HighlightedText from './HighlightedText'
import { experience } from '../data'

// Career stats
const careerStats = [
  { icon: TrendingUp, value: '2+',   label: 'Years', color: 'var(--color-accent)' },
  { icon: Users,      value: '100+', label: 'Users', color: 'var(--color-cat-2)' },
  { icon: Zap,        value: '75%',  label: 'Faster', color: 'var(--color-cat-4)' },
  { icon: TestTube,   value: '95%',  label: 'Coverage', color: 'var(--color-cat-6)' },
]

// Category metadata for State Street achievements
const categories = [
  { key: 'products', icon: Box, label: 'Products', color: 'var(--color-cat-5)', indices: [0, 2, 3, 6, 8] },
  { key: 'perf', icon: Zap, label: 'Performance', color: 'var(--color-cat-6)', indices: [1, 10] },
  { key: 'research', icon: FlaskConical, label: 'Research', color: 'var(--color-cat-4)', indices: [4, 5] },
  { key: 'quality', icon: BadgeCheck, label: 'Quality', color: 'var(--color-cat-2)', indices: [7, 11] },
  { key: 'collab', icon: Handshake, label: 'Collaboration', color: 'var(--color-text-subtle)', indices: [9] },
]

// Progression step abbreviations
const stepAbbrev = {
  'Software Development Intern': 'Intern',
  'Associate 2': 'Assoc 2',
  'Senior Associate': 'Sr Assoc',
  'Emerging Lead': 'Lead',
}

function StatCard({ icon: Icon, value, label, color, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="career-stat-card"
      style={{ '--stat-color': color }}
    >
      <div className="career-stat-icon">
        <Icon size={16} />
      </div>
      <div className="career-stat-value">{value}</div>
      <div className="career-stat-label">{label}</div>
    </motion.div>
  )
}

function ProgressionTrack({ steps, currentStep }) {
  const currentIdx = steps.indexOf(currentStep)

  return (
    <div className="career-progression">
      {steps.map((step, idx) => {
        const isActive = step === currentStep
        const isPast = idx < currentIdx
        const label = stepAbbrev[step] || step

        return (
          <div key={step} className="career-progression-step">
            <div 
              className={`career-progression-dot ${isActive ? 'career-progression-dot--active' : ''} ${isPast ? 'career-progression-dot--past' : ''}`}
            />
            <span 
              className={`career-progression-label ${isActive ? 'career-progression-label--active' : ''}`}
            >
              {label}
            </span>
            {idx < steps.length - 1 && (
              <div className={`career-progression-line ${isPast || isActive ? 'career-progression-line--active' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function CategorySection({ icon: Icon, label, color, bullets, indices }) {
  const filteredBullets = indices.map(i => bullets[i]).filter(Boolean)
  if (!filteredBullets.length) return null

  return (
    <div className="career-category" style={{ '--cat-color': color }}>
      <div className="career-category-header">
        <Icon size={12} />
        <span>{label}</span>
      </div>
      <ul className="career-category-list">
        {filteredBullets.map((bullet, i) => (
          <li key={i}>
            <span className="career-bullet-dot" />
            <HighlightedText text={bullet} />
          </li>
        ))}
      </ul>
    </div>
  )
}

function ExperienceCard({ item, index }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const hasProgression = item.progressionSteps?.length > 0
  const isStateStreet = item.company === 'State Street Corporation'

  return (
    <div className="career-entry">
      {/* Timeline dot */}
      <div className={`career-entry-dot ${index === 0 ? 'career-entry-dot--active' : ''}`}>
        {index === 0 && <span className="career-entry-pulse" />}
      </div>

      <div className="career-entry-content">
        <DisclosureGroup defaultOpen={index === 0 ? 'main' : null}>
          <DisclosureItem
            id="main"
            title={item.role}
            subtitle={`${item.company} · ${item.location}`}
            icon={Briefcase}
            badge={item.period}
          >
            {/* Description */}
            {item.description && (
              <p className="career-entry-desc">{item.description}</p>
            )}

            {/* Progression track */}
            {hasProgression && (
              <div className="career-entry-section">
                <div className="career-entry-section-label">
                  <TrendingUp size={12} />
                  <span>Career Progression</span>
                </div>
                <ProgressionTrack steps={item.progressionSteps} currentStep={item.currentRoleStep} />
              </div>
            )}

            {/* Achievements */}
            {item.bullets && (
              <div className="career-entry-section">
                <div className="career-entry-section-label">
                  <Zap size={12} />
                  <span>Key Achievements</span>
                </div>
                
                {isStateStreet ? (
                  <>
                    {/* Category filter */}
                    <div className="career-category-tabs">
                      <button 
                        className={`career-category-tab ${activeCategory === 'all' ? 'career-category-tab--active' : ''}`}
                        onClick={() => setActiveCategory('all')}
                      >
                        All
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat.key}
                          className={`career-category-tab ${activeCategory === cat.key ? 'career-category-tab--active' : ''}`}
                          onClick={() => setActiveCategory(cat.key)}
                          style={{ '--tab-color': cat.color }}
                        >
                          <cat.icon size={11} />
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Filtered content */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeCategory === 'all' ? (
                          <div className="career-categories">
                            {categories.map(cat => (
                              <CategorySection 
                                key={cat.key}
                                {...cat}
                                bullets={item.bullets}
                              />
                            ))}
                          </div>
                        ) : (
                          <CategorySection 
                            {...categories.find(c => c.key === activeCategory)}
                            bullets={item.bullets}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </>
                ) : (
                  <ul className="career-bullets">
                    {item.bullets.map((bullet, i) => (
                      <li key={i}>
                        <span className="career-bullet-dot" />
                        <HighlightedText text={bullet} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Tech stack */}
            {item.tags && (
              <div className="career-entry-section">
                <div className="career-entry-section-label">
                  <Box size={12} />
                  <span>Tech Stack</span>
                </div>
                <div className="career-tags">
                  {item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                </div>
              </div>
            )}
          </DisclosureItem>
        </DisclosureGroup>
      </div>

      <style>{`
        .career-stat-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
          padding: 1rem;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }
        .career-stat-card:hover {
          border-color: var(--stat-color);
          transform: translateY(-2px);
        }
        .career-stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          background: color-mix(in srgb, var(--stat-color) 15%, transparent);
          border-radius: var(--radius-md);
          color: var(--stat-color);
        }
        .career-stat-value {
          font-family: var(--font-display);
          font-size: var(--text-2xl);
          font-weight: var(--font-weight-bold);
          color: var(--color-text);
          line-height: 1;
        }
        .career-stat-label {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-text-muted);
        }

        .career-entry {
          position: relative;
          padding-left: 2.5rem;
        }
        .career-entry-dot {
          position: absolute;
          left: 0;
          top: 1.25rem;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--color-border-solid);
          border: 3px solid var(--color-bg);
          z-index: 2;
        }
        .career-entry-dot--active {
          background: var(--color-accent);
          box-shadow: 0 0 0 4px var(--color-accent-soft);
        }
        .career-entry-pulse {
          position: absolute;
          inset: -6px;
          border: 2px solid var(--color-accent);
          border-radius: 50%;
          animation: pulse-ring 2.5s ease-out infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        .career-entry-content {
          padding-bottom: 1.5rem;
        }
        .career-entry-desc {
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: var(--line-height-relaxed);
          padding: 0.75rem 1rem;
          background: var(--color-accent-soft);
          border-left: 2px solid var(--color-accent);
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin-bottom: 1.25rem;
        }
        .career-entry-section {
          margin-bottom: 1.25rem;
        }
        .career-entry-section-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--color-accent);
          margin-bottom: 0.75rem;
        }

        .career-progression {
          display: flex;
          align-items: flex-start;
          gap: 0;
          overflow-x: auto;
          padding-bottom: 0.5rem;
        }
        .career-progression-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-width: 70px;
        }
        .career-progression-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--color-border-solid);
          border: 2px solid transparent;
          flex-shrink: 0;
        }
        .career-progression-dot--active {
          background: var(--color-accent);
          border-color: var(--color-accent-soft);
          box-shadow: 0 0 0 3px var(--color-accent-soft);
        }
        .career-progression-dot--past {
          background: color-mix(in srgb, var(--color-accent) 50%, var(--color-border-solid));
        }
        .career-progression-label {
          font-family: var(--font-mono);
          font-size: 0.6rem;
          color: var(--color-text-subtle);
          margin-top: 0.35rem;
          text-align: center;
        }
        .career-progression-label--active {
          color: var(--color-accent);
          font-weight: var(--font-weight-semibold);
        }
        .career-progression-line {
          position: absolute;
          top: 4px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: var(--color-border);
        }
        .career-progression-line--active {
          background: linear-gradient(90deg, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--color-border)));
        }

        .career-category-tabs {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          margin-bottom: 1rem;
        }
        .career-category-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.65rem;
          background: transparent;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-size: 0.7rem;
          font-weight: var(--font-weight-medium);
          color: var(--color-text-muted);
          cursor: pointer;
          transition: all var(--motion-duration-fast) var(--motion-ease);
        }
        .career-category-tab:hover {
          border-color: var(--tab-color, var(--color-border-strong));
          color: var(--tab-color, var(--color-text));
        }
        .career-category-tab--active {
          background: color-mix(in srgb, var(--tab-color, var(--color-accent)) 12%, transparent);
          border-color: var(--tab-color, var(--color-accent));
          color: var(--tab-color, var(--color-accent));
        }

        .career-categories {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .career-category {
          background: color-mix(in srgb, var(--cat-color) 5%, var(--color-surface));
          border: 1px solid color-mix(in srgb, var(--cat-color) 20%, var(--color-border));
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .career-category-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 0.75rem;
          background: color-mix(in srgb, var(--cat-color) 10%, transparent);
          border-bottom: 1px solid color-mix(in srgb, var(--cat-color) 15%, var(--color-border));
          font-size: 0.65rem;
          font-weight: var(--font-weight-semibold);
          text-transform: uppercase;
          letter-spacing: var(--letter-spacing-wide);
          color: var(--cat-color);
        }
        .career-category-list,
        .career-bullets {
          list-style: none;
          padding: 0.5rem 0.75rem;
          margin: 0;
        }
        .career-category-list li,
        .career-bullets li {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
          padding: 0.35rem 0;
          font-size: var(--text-sm);
          color: var(--color-text-muted);
          line-height: 1.6;
        }
        .career-bullet-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--cat-color, var(--color-accent));
          flex-shrink: 0;
          margin-top: 0.55em;
          opacity: 0.7;
        }

        .career-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }

        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse-ring { 0%, 100% { opacity: 0; } }
        }
      `}</style>
    </div>
  )
}

export default function CareerTimeline() {
  return (
    <div className="career-timeline">
      {/* Stats grid */}
      <div className="career-stats-grid">
        {careerStats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      {/* Timeline */}
      <div className="career-timeline-track">
        <div className="career-timeline-line" />
        {experience.map((item, i) => (
          <ExperienceCard key={`${item.company}-${i}`} item={item} index={i} />
        ))}
      </div>

      <style>{`
        .career-timeline {
          max-width: var(--container);
          margin: 0 auto;
        }
        .career-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 640px) {
          .career-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .career-timeline-track {
          position: relative;
          padding-left: 1rem;
        }
        .career-timeline-line {
          position: absolute;
          left: 5px;
          top: 1.25rem;
          bottom: 1.25rem;
          width: 2px;
          background: linear-gradient(to bottom, var(--color-accent), color-mix(in srgb, var(--color-accent) 30%, var(--color-border)) 60%, var(--color-border));
          border-radius: 1px;
        }
      `}</style>
    </div>
  )
}
