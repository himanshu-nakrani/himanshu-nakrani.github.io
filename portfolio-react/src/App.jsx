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
      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text2)', fontSize: '0.82rem', borderTop: '1px solid var(--border)' }}>
        © 2025 Himanshu Nakrani ·{' '}
        <a href="https://github.com/himanshu-nakrani" target="_blank" rel="noopener" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
          himanshu-nakrani
        </a>
      </footer>
    </>
  )
}
