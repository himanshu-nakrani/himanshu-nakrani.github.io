import { motion, useReducedMotion } from 'framer-motion'

/* ========================================
   EDITORIAL ABOUT PAGE
   Two-column layout: Portrait left, content right
   ======================================== */

export default function AboutPage() {
  const reduceMotion = useReducedMotion()
  
  return (
    <div className="mvp2-page" style={{ position: 'relative' }}>
      {/* Two-column editorial layout */}
      <section 
        style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(3rem, 6vw, 5rem)',
          alignItems: 'start',
          minHeight: 'calc(100vh - var(--navbar-height) - 6rem)',
        }}
        className="about-grid"
      >
        {/* Left column — Portrait */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ 
            position: 'sticky',
            top: 'calc(var(--navbar-height) + 2rem)',
          }}
        >
          {/* Portrait container */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3/4',
                borderRadius: 4,
                overflow: 'hidden',
                background: 'var(--color-surface)',
              }}
            >
              {/* Placeholder for B&W portrait — using a gradient placeholder */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(180deg, var(--color-surface-raised) 0%, var(--color-surface) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(4rem, 10vw, 8rem)',
                  fontWeight: 400,
                  color: 'var(--color-text-subtle)',
                  fontStyle: 'italic',
                }}
              >
                H
              </div>
            </div>
            
            {/* Gold underline accent */}
            <div
              style={{
                marginTop: '1rem',
                height: 1,
                background: 'linear-gradient(90deg, var(--color-accent), transparent 70%)',
              }}
            />
            
            {/* Caption */}
            <div
              style={{
                marginTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: 'var(--color-text-subtle)',
              }}
            >
              <span>Boston</span>
              <span style={{ color: 'var(--color-text-subtle)' }}>·</span>
              <span>2026</span>
            </div>
          </div>
        </motion.div>

        {/* Right column — Content */}
        <motion.div
          initial={reduceMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {/* Section label */}
          <div
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--color-accent)',
              marginBottom: '1.5rem',
            }}
          >
            ABOUT
          </div>

          {/* Main intro with drop cap */}
          <div
            className="drop-cap"
            style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--color-text)',
              marginBottom: '1.5rem',
            }}
          >
            {"I'm an AI engineer at State Street in Boston, where I build the LLM systems behind Alpha Copilot — a Text-to-SQL chatbot 100+ analysts use to query enterprise data in plain English."}
          </div>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--color-text-muted)',
              marginBottom: '2.5rem',
            }}
          >
            {"I'm interested in the unglamorous parts of production AI: latency budgets, retrieval evaluation, prompt caching, the difference between a demo and something analysts actually trust on a Monday morning."}
          </p>

          {/* Gold divider */}
          <div
            style={{
              height: 1,
              background: 'linear-gradient(90deg, var(--color-accent), transparent 50%)',
              marginBottom: '2rem',
            }}
          />

          {/* Pull quote section */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent)',
                marginBottom: '1rem',
              }}
            >
              PULL-QUOTE
            </div>
            
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                lineHeight: 1.4,
                color: 'var(--color-text)',
                margin: 0,
                padding: 0,
              }}
            >
              {"The interesting work in AI right now isn't the model — it's everything between the model and the user."}
            </blockquote>
          </div>

          {/* Currently building section */}
          <div>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent)',
                marginBottom: '0.75rem',
              }}
            >
              CURRENTLY BUILDING
            </div>
            
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: 'var(--color-text)',
                margin: 0,
              }}
            >
              Agent Forge v2 — composable multi-agent orchestration.
            </p>
          </div>

          {/* Additional sections for longer scroll */}
          <div style={{ marginTop: '4rem' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent)',
                marginBottom: '1rem',
              }}
            >
              BACKGROUND
            </div>
            
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
                marginBottom: '1rem',
              }}
            >
              Before State Street, I completed my Masters in Computer Science at Northeastern University, where I focused on NLP and information retrieval. Selected for Amazon ML Summer School. Published two papers at IEEE conferences.
            </p>
            
            <p
              style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
              }}
            >
              I spend my free time experimenting with new model architectures, contributing to open source, and occasionally writing about what I learn.
            </p>
          </div>

          {/* Values / approach section */}
          <div style={{ marginTop: '3rem' }}>
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--color-accent)',
                marginBottom: '1.5rem',
              }}
            >
              APPROACH
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { title: 'Ship what works', desc: 'Production-first mindset. I optimize for real impact over theoretical elegance.' },
                { title: 'Measure everything', desc: 'Latency, accuracy, user satisfaction — if we can not measure it, we can not improve it.' },
                { title: 'Document the journey', desc: 'I publish findings and share learnings. Knowledge grows when shared.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={reduceMotion ? {} : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <h4
                    style={{
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.9rem',
                      lineHeight: 1.6,
                      color: 'var(--color-text-muted)',
                      margin: 0,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact prompt */}
          <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                marginBottom: '1rem',
              }}
            >
              Want to chat about AI systems, research, or collaboration?
            </p>
            <a
              href="mailto:himanshu.nakrani@example.com"
              style={{
                fontSize: '1rem',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--color-accent)',
                paddingBottom: 2,
              }}
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-grid > div:first-child {
            position: relative !important;
            top: 0 !important;
            max-width: 400px;
            margin: 0 auto;
          }
        }
      `}</style>
    </div>
  )
}
