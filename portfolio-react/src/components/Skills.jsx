import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import Section from './Section'
import Tag from './Tag'
import { skills, certifications } from '../data'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hoveredSkill, setHoveredSkill] = useState(null)

  return (
    <Section id="skills" title="Skills & Certifications">
      {/* Top Skills Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          marginBottom: '3rem',
          background: 'linear-gradient(135deg, rgba(14, 14, 26, 0.8) 0%, rgba(20, 20, 40, 0.8) 100%)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(79, 195, 247, 0.15)',
          borderRadius: 16,
          padding: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 0 30px rgba(124,111,255,0.1), 0 0 60px rgba(79,195,247,0.05)',
        }}
      >
        <p style={{
          fontSize: '0.75rem', 
          fontFamily: "'Fira Code', monospace",
          color: 'var(--accent3)',
          marginBottom: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          ✦ Top Skills
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          overflow: 'hidden',
          position: 'relative',
        }}>
          <style>{`
            @keyframes marquee-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .skills-marquee {
              display: flex;
              gap: 1rem;
              animation: marquee-scroll 30s linear infinite;
              will-change: transform;
            }
            .skills-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="skills-marquee">
            {['LLMs & Transformers', 'RAG Systems', 'Text-to-SQL', 'Fine-tuning', 'Vector DBs', 'Prompt Engineering', 'LangChain', 'API Design'].map((skill, i) => (
              <motion.div
                key={`${skill}-1`}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 111, 255, 0.15) 0%, rgba(79, 195, 247, 0.08) 100%)',
                  border: '1px solid rgba(79, 195, 247, 0.3)',
                  borderRadius: 12,
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent3)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 15px rgba(79, 195, 247, 0.1)',
                  cursor: 'pointer',
                }}
              >
                {skill}
              </motion.div>
            ))}
            {/* Duplicate for seamless loop */}
            {['LLMs & Transformers', 'RAG Systems', 'Text-to-SQL', 'Fine-tuning', 'Vector DBs', 'Prompt Engineering', 'LangChain', 'API Design'].map((skill, i) => (
              <motion.div
                key={`${skill}-2`}
                whileHover={{ scale: 1.05 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(124, 111, 255, 0.15) 0%, rgba(79, 195, 247, 0.08) 100%)',
                  border: '1px solid rgba(79, 195, 247, 0.3)',
                  borderRadius: 12,
                  padding: '8px 16px',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent3)',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 0 15px rgba(79, 195, 247, 0.1)',
                  cursor: 'pointer',
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div ref={ref}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {skills.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              onHoverStart={() => setHoveredSkill(i)}
              onHoverEnd={() => setHoveredSkill(null)}
              style={{
                background: hoveredSkill === i ? 'linear-gradient(135deg, rgba(124,111,255,0.12) 0%, rgba(79,195,247,0.08) 100%), rgba(14, 14, 26, 0.85)' : 'linear-gradient(135deg, rgba(14, 14, 26, 0.9) 0%, rgba(20, 20, 40, 0.9) 100%)',
                backdropFilter: 'blur(12px)',
                border: hoveredSkill === i ? '1px solid rgba(79, 195, 247, 0.4)' : '1px solid rgba(124,111,255,0.2)',
                borderRadius: 14, padding: '1.2rem',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredSkill === i ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredSkill === i ? '0 0 40px rgba(124,111,255,0.25), 0 0 80px rgba(79,195,247,0.15), inset 0 0 20px rgba(124,111,255,0.05)' : '0 0 20px rgba(124,111,255,0.08)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: hoveredSkill === i ? 'radial-gradient(circle at bottom right, rgba(79,195,247,0.1), transparent 60%)' : 'transparent',
                pointerEvents: 'none',
                transition: 'background 0.3s',
              }} />
              <p style={{
                fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", color: 'var(--accent)',
                marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em',
                position: 'relative', zIndex: 1,
              }}>
                {s.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, position: 'relative', zIndex: 1 }}>
                {s.items.map((item, idx) => (
                  <motion.div
                    key={item}
                    animate={hoveredSkill === i ? { y: -2, opacity: 1 } : { y: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.02 }}
                  >
                    <Tag>{item}</Tag>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.4rem', color: 'var(--text)' }}>
            <span style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent3))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Certifications
            </span>
          </h3>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {certifications.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -6, borderColor: 'rgba(79, 195, 247, 0.5)', boxShadow: '0 0 35px rgba(79,195,247,0.25), 0 0 70px rgba(124,111,255,0.15)' }}
              style={{
                background: 'linear-gradient(135deg, rgba(14, 14, 26, 0.85) 0%, rgba(20, 20, 40, 0.85) 100%)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(124,111,255,0.2)',
                borderRadius: 12, padding: '1.2rem', textAlign: 'center',
                transition: 'all 0.3s, transform 0.3s',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 15px rgba(124,111,255,0.05)',
              }}
            >
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(circle at center, rgba(124,111,255,0.05), transparent 70%)',
                pointerEvents: 'none',
              }} />
              <motion.div
                whileHover={{ scale: 1.15 }}
                style={{ fontSize: '1.8rem', marginBottom: '0.6rem', position: 'relative', zIndex: 1 }}>
                {c.icon}
              </motion.div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text2)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>
                {c.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
