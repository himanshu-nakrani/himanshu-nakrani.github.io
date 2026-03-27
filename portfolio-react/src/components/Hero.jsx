import { motion } from 'framer-motion'

const stats = [
  { num: '75%', label: 'Response time reduction' },
  { num: '100+', label: 'Internal users served' },
  { num: '2', label: 'Research publications' },
  { num: '95%+', label: 'Unit test coverage' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section id="about" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '100px 2rem 60px', maxWidth: 1100, margin: '0 auto', gap: '4rem', position: 'relative' }}>
      {/* Background glow blobs - neural network theme */}
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, 30, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '10%', left: '5%', width: 550, height: 550, background: 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)' }} />
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, -30, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', top: '40%', right: '5%', width: 480, height: 480, background: 'radial-gradient(circle, rgba(79,122,255,0.12) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)' }} />
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        style={{ position: 'fixed', bottom: '-10%', left: '40%', width: 450, height: 450, background: 'radial-gradient(circle, rgba(124,111,255,0.08) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, filter: 'blur(40px)' }} />

      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <motion.div {...fadeUp(0.1)}>
          <motion.span
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,217,255,0.6), 0 0 15px rgba(0,217,255,0.3)' }}
            animate={{ boxShadow: ['0 0 10px rgba(0,217,255,0.3), 0 0 5px rgba(0,217,255,0.2)', '0 0 20px rgba(0,217,255,0.5), 0 0 10px rgba(0,217,255,0.3)', '0 0 10px rgba(0,217,255,0.3), 0 0 5px rgba(0,217,255,0.2)'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: '0.82rem',
              color: 'var(--accent)', background: 'rgba(0,217,255,0.1)',
              border: '1px solid rgba(0,217,255,0.6)', padding: '6px 14px',
              borderRadius: 20, display: 'inline-block', marginBottom: '1.4rem',
              cursor: 'pointer', transition: 'all 0.3s',
            }}>
            ✦ Generative AI Engineer · State Street Corp
          </motion.span>
        </motion.div>

        <motion.h1 {...fadeUp(0.2)} style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>
          Himanshu<br />
          <motion.span 
            animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ 
              background: 'linear-gradient(135deg, var(--accent), var(--accent2), var(--accent3), var(--accent))', 
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            Nakrani
          </motion.span>
        </motion.h1>

        <motion.p {...fadeUp(0.3)} style={{ fontSize: '1.1rem', color: 'var(--text2)', maxWidth: 480, marginBottom: '2rem', lineHeight: 1.7 }}>
          2+ years building production LLM applications, RAG systems, and scalable AI solutions.
          Specialized in Text-to-SQL, fine-tuning, and AI agent architectures.
        </motion.p>

        <motion.div {...fadeUp(0.4)} style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <motion.a
            href="#experience"
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,217,255,0.6), 0 0 20px rgba(0,217,255,0.3)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent3))',
              color: '#0a0e27', padding: '13px 30px', borderRadius: 10,
              textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
              display: 'inline-block', boxShadow: '0 0 20px rgba(0,217,255,0.3)',
            }}
          >
            View Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04, borderColor: 'var(--accent)', boxShadow: '0 0 20px rgba(0,217,255,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              border: '1.5px solid var(--accent)', color: 'var(--accent)',
              padding: '13px 30px', borderRadius: 10,
              textDecoration: 'none', fontWeight: 500, fontSize: '0.95rem',
              display: 'inline-block', transition: 'all 0.3s',
            }}
          >
            Get in Touch
          </motion.a>
        </motion.div>

        <motion.div {...fadeUp(0.5)} style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          {stats.map(s => (
            <motion.div key={s.label} whileHover={{ y: -4 }} style={{ cursor: 'default' }}>
              <motion.div 
                animate={{ color: ['var(--accent)', 'var(--accent2)', 'var(--accent)', 'var(--accent3)', 'var(--accent)'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1 }}>
                {s.num}
              </motion.div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text2)', marginTop: 4 }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Avatar card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}
        className="hero-avatar-wrap"
      >
        <div style={{
          background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%)',
          border: '1.5px solid var(--accent)',
          borderRadius: 20, overflow: 'hidden', width: '100%', maxWidth: 360,
          boxShadow: '0 0 60px rgba(0,217,255,0.3), 0 0 30px rgba(0,217,255,0.15), 0 0 0 1px rgba(0,217,255,0.2)',
        }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://avatars.githubusercontent.com/u/82092249?v=4"
              alt="Himanshu Nakrani"
              style={{ width: '100%', height: 240, objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)' }} />
          </div>
          <div style={{ padding: '1.2rem 1.4rem 1.4rem' }}>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 2 }}>Himanshu Nakrani</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--accent)', marginBottom: 2 }}>Senior Associate · AI Software Developer</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--text2)', marginBottom: '0.9rem' }}>State Street Corporation · Hyderabad, India</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
              {['🤖 LLMs', '🔍 RAG', '🗄️ Text-to-SQL', '🧠 Fine-tuning'].map(b => (
                <span key={b} style={{ fontSize: '0.7rem', background: 'var(--surface2)', border: '1px solid var(--border)', color: 'var(--text2)', padding: '3px 9px', borderRadius: 20 }}>{b}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[
                { href: 'https://github.com/himanshu-nakrani', label: 'GH', color: 'var(--accent)' },
                { href: 'https://www.linkedin.com/in/himanshu-nakrani/', label: 'LI', color: '#0a66c2' },
                { href: 'https://leetcode.com/u/himanshunakrani0/', label: 'LC', color: 'var(--yellow)' },
                { href: 'https://www.kaggle.com/himanshunakrani', label: 'KG', color: 'var(--accent3)' },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  whileHover={{ scale: 1.15, color: s.color }}
                  style={{ color: 'var(--text2)', textDecoration: 'none', fontSize: '0.72rem', fontFamily: "'Fira Code', monospace", fontWeight: 600, transition: 'color 0.2s' }}
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #about { flex-direction: column !important; padding-top: 90px !important; }
          .hero-avatar-wrap { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
