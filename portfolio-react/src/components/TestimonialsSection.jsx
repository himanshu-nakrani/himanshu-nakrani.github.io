import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialsSection({ testimonials }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4 }}
          style={{
            background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '1.5rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Quote
            size={40}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              color: 'var(--accent)',
              opacity: 0.1,
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p style={{ fontSize: '0.95rem', color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
              "{testimonial.text}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
                  {testimonial.name}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text2)' }}>
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
