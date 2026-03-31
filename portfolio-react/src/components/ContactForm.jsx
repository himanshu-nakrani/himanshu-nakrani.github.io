import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, User, MessageSquare, Briefcase } from 'lucide-react'

const interests = [
  { id: 'research', label: 'Research Collaboration', icon: '🔬' },
  { id: 'opensource', label: 'Open Source', icon: '💻' },
  { id: 'consulting', label: 'Consulting', icon: '💼' },
  { id: 'speaking', label: 'Speaking/Workshop', icon: '🎤' },
  { id: 'other', label: 'Other', icon: '💬' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    
    // Simulate form submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', interest: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1500)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      style={{
        background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
        border: '1px solid var(--border)',
        borderRadius: 20,
        padding: '2rem',
        maxWidth: 600,
        margin: '0 auto',
      }}
    >
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', textAlign: 'center' }}>
        Let's Connect
      </h3>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text2)' }}>
          <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Your Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text2)' }}>
          <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--text2)' }}>
          <Briefcase size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          I'm interested in...
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          {interests.map((int) => (
            <motion.label
              key={int.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                background: formData.interest === int.id ? 'var(--accent)' : 'var(--surface)',
                color: formData.interest === int.id ? 'white' : 'var(--text)',
                border: `1px solid ${formData.interest === int.id ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s',
              }}
            >
              <input
                type="radio"
                name="interest"
                value={int.id}
                checked={formData.interest === int.id}
                onChange={handleChange}
                style={{ display: 'none' }}
              />
              <span>{int.icon}</span>
              <span style={{ fontSize: '0.8rem' }}>{int.label}</span>
            </motion.label>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text2)' }}>
          <MessageSquare size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Message
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            fontSize: '0.9rem',
            color: 'var(--text)',
            outline: 'none',
            resize: 'vertical',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s',
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={status === 'sending'}
        style={{
          width: '100%',
          padding: '1rem',
          background: status === 'success' ? '#10b981' : 'var(--accent)',
          color: 'white',
          border: 'none',
          borderRadius: 12,
          fontSize: '1rem',
          fontWeight: 600,
          cursor: status === 'sending' ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          transition: 'all 0.3s',
        }}
      >
        {status === 'sending' && '⏳ Sending...'}
        {status === 'success' && '✓ Message Sent!'}
        {!status && (
          <>
            <Send size={18} />
            Send Message
          </>
        )}
      </motion.button>

      {status === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginTop: '1rem', color: '#10b981', fontSize: '0.9rem' }}
        >
          Thanks! I'll get back to you soon.
        </motion.p>
      )}
    </motion.form>
  )
}
