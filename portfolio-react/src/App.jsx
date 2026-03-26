import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import GitHub from './components/GitHub'
import Kaggle from './components/Kaggle'
import LeetCode from './components/LeetCode'
import Research from './components/Research'
import Skills from './components/Skills'
import Contact from './components/Contact'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <GitHub />
      <Kaggle />
      <LeetCode />
      <Research />
      <Skills />
      <Contact />
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: 'center', padding: '3rem 2rem',
          color: 'var(--text2)', fontSize: '0.82rem',
          borderTop: '1px solid var(--border)',
          background: 'linear-gradient(to bottom, transparent, rgba(124,111,255,0.03))',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ marginBottom: '1rem' }}>
            © 2025 Himanshu Nakrani ·{' '}
            <motion.a
              href="https://github.com/himanshu-nakrani"
              target="_blank"
              rel="noopener"
              whileHover={{ color: 'var(--accent)' }}
              style={{
                color: 'var(--accent)',
                textDecoration: 'none',
                transition: 'color 0.3s',
              }}
            >
              himanshu-nakrani
            </motion.a>
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text2)', opacity: 0.6 }}>
            Crafted with passion for AI, LLMs, and scalable systems.
          </p>
        </div>
      </motion.footer>
    </>
  )
}
