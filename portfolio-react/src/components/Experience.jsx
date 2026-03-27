import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import ExperienceCard from './ExperienceCard'
import { experience } from '../data'

function TimelineRow({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ position: 'relative', marginBottom: '2.25rem' }}
    >
      <motion.div
        initial={false}
        whileHover={{ scale: 1.15 }}
        style={{
          position: 'absolute',
          left: -34,
          top: 22,
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
          border: '3px solid var(--bg)',
          boxShadow: '0 0 0 4px rgba(167, 139, 250, 0.15), 0 0 18px rgba(74, 158, 255, 0.35)',
          zIndex: 2,
        }}
      />
      <ExperienceCard item={item} index={index} animateEntry={false} />
    </motion.div>
  )
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience">
      <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: 12,
            bottom: 0,
            width: 2,
            borderRadius: 2,
            background: 'linear-gradient(to bottom, var(--nav-dot), var(--accent) 35%, rgba(74, 158, 255, 0.12))',
            boxShadow: '0 0 20px rgba(167, 139, 250, 0.12)',
          }}
        />
        {experience.map((item, i) => (
          <TimelineRow key={`${item.company}-${item.period}`} item={item} index={i} />
        ))}
      </div>
    </Section>
  )
}
