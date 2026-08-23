import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Quote } from 'lucide-react'

/**
 * Testimonials — displays colleague quotes as social proof on the home page.
 */
export default function Testimonials({ testimonials }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  if (!testimonials || testimonials.length === 0) return null

  return (
    <div ref={ref}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          gap: '1.25rem',
        }}
      >
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(1.2rem, 3vw, 1.6rem)',
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              position: 'relative',
            }}
          >
            <Quote
              size={18}
              style={{
                color: 'var(--color-accent)',
                opacity: 0.35,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            <p
              style={{
                fontSize: '0.92rem',
                color: 'var(--color-text)',
                lineHeight: 1.7,
                fontStyle: 'italic',
                margin: 0,
                flex: 1,
              }}
            >
              &ldquo;{t.text}&rdquo;
            </p>

            <footer
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'var(--color-surface-raised)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  flexShrink: 0,
                  border: '1px solid var(--color-border)',
                }}
                aria-hidden="true"
              >
                {t.avatar}
              </span>
              <div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    lineHeight: 1.3,
                  }}
                >
                  {t.name}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.3,
                  }}
                >
                  {t.role}
                </div>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  )
}
