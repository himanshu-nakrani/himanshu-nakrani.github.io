import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import Contact from '../components/Contact'
import Tag from '../components/Tag'
import ExperienceCard from '../components/ExperienceCard'
import { experience, projects } from '../data'

const featuredProjects = projects.slice(0, 3)
const featuredExperience = experience.slice(0, 2)

export default function HomePage() {
  return (
    <>
      <Hero />
      <section
        style={{
          padding: '40px 2rem 20px',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div
          style={{
            border: '1px solid var(--border)',
            borderRadius: 16,
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
            padding: '1.3rem',
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          }}
        >
          {[
            ['2+ Years', 'Production AI engineering'],
            ['100+', 'Users impacted internally'],
            ['75%', 'Latency reduction delivered'],
            ['2', 'Research publications'],
          ].map(([value, label]) => (
            <div key={label}>
              <p style={{ color: 'var(--accent)', fontSize: '1.35rem', fontWeight: 800 }}>{value}</p>
              <p style={{ color: 'var(--text2)', fontSize: '0.82rem' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '70px 2rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--nav-dot)', fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: 8 }}>WORK</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>Selected Works</h2>
            <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginTop: 8, maxWidth: 480 }}>Highlights from production AI and research builds.</p>
          </div>
          <Link to="/projects" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, borderBottom: '1px solid var(--border2)', paddingBottom: 2 }}>
            View all →
          </Link>
        </div>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {featuredProjects.map((item) => (
            <motion.article
              key={item.title}
              whileHover={{ y: -4 }}
              style={{
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '1.2rem',
                background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
              }}
            >
              <p style={{ fontSize: '1.5rem', marginBottom: 6 }}>{item.icon}</p>
              <h3 style={{ fontSize: '1rem', marginBottom: 6 }}>{item.title}</h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text2)', marginBottom: '0.8rem' }}>{item.desc}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {item.tags.slice(0, 3).map((tag) => <Tag key={tag}>{tag}</Tag>)}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 2rem 70px', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: 'var(--nav-dot)', fontFamily: "'Fira Code', monospace", fontSize: '0.72rem', letterSpacing: '0.14em', marginBottom: 8 }}>TIMELINE</p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.1rem)', fontWeight: 700, letterSpacing: '-0.03em' }}>Experience Log</h2>
            <p style={{ color: 'var(--text2)', fontSize: '0.92rem', marginTop: 8, maxWidth: 480 }}>Roles shipping LLM and backend systems in enterprise.</p>
          </div>
          <Link to="/experience" style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, borderBottom: '1px solid var(--border2)', paddingBottom: 2 }}>
            Full log →
          </Link>
        </div>
        <div style={{ display: 'grid', gap: '1.15rem' }}>
          {featuredExperience.map((item, i) => (
            <ExperienceCard
              key={`${item.company}-${item.period}`}
              item={{ ...item, bullets: item.bullets.slice(0, 3) }}
              index={i}
              animateEntry={false}
            />
          ))}
        </div>
      </section>

      <Contact />
    </>
  )
}

