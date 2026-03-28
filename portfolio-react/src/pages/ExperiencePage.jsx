import { useState } from 'react'
import { motion } from 'framer-motion'
import ExperienceCard from '../components/ExperienceCard'
import ExperienceDetailModal from '../components/ExperienceDetailModal'
import PageHeader from '../components/PageHeader'
import { experience } from '../data'

export default function ExperiencePage() {
  const [selectedExperience, setSelectedExperience] = useState(null)

  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Experience log"
        title="Career timeline"
        description="Enterprise AI software — RAG, LLM backends, and production systems at scale."
      />

      <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: 12,
            bottom: 12,
            width: 2,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, var(--nav-dot), var(--accent) 35%, var(--border))',
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {experience.map((item, i) => (
            <div key={`${item.company}-${item.role}-${item.period}`} style={{ position: 'relative' }}>
              <motion.div
                initial={false}
                whileHover={{ scale: 1.06 }}
                style={{
                  position: 'absolute',
                  left: -34,
                  top: 22,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                  border: '3px solid var(--bg)',
                  boxShadow: '0 0 0 2px var(--bg)',
                  zIndex: 2,
                }}
              />
              <ExperienceCard
                item={item}
                index={i}
                animateEntry
                onCardClick={() => setSelectedExperience(item)}
              />
            </div>
          ))}
        </div>

        <ExperienceDetailModal
          item={selectedExperience}
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
        />
      </div>
    </section>
  )
}
