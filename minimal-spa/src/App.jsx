import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ExternalLink, FileText } from 'lucide-react'
import Hero from './sections/Hero'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Research from './sections/Research'
import Kaggle from './sections/Kaggle'
import Contact from './sections/Contact'

const NAV_ITEMS = [
  { id: 'about',      label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects' },
  { id: 'skills',     label: 'Skills' },
  { id: 'research',   label: 'Research' },
  { id: 'kaggle',     label: 'Kaggle' },
  { id: 'contact',    label: 'Contact' },
]

const SOCIALS = [
  { href: 'https://github.com/himanshu-nakrani',          icon: Github,    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/himanshu-nakrani/', icon: Linkedin,  label: 'LinkedIn' },
  { href: 'mailto:himanshunakrani0@gmail.com',            icon: Mail,      label: 'Email' },
  { href: '/resume.pdf',                                   icon: FileText,  label: 'Resume' },
]

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [ids])

  return active
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
  const ids = NAV_ITEMS.map((n) => n.id)
  const active = useActiveSection(ids)

  return (
    <>
      {/* Mobile top nav */}
      <nav className="spa-mobile-nav" aria-label="Mobile navigation">
        <span className="spa-mobile-nav__name">Himanshu</span>
        <div className="spa-mobile-nav__links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`spa-mobile-link${active === item.id ? ' active' : ''}`}
              onClick={() => scrollTo(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="spa-shell">
        {/* Fixed left nav */}
        <nav className="spa-nav" aria-label="Primary navigation">
          <div className="spa-nav__name">Himanshu Nakrani</div>
          <div className="spa-nav__title">AI Engineer</div>

          <div className="spa-nav__links">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`spa-nav__link${active === item.id ? ' active' : ''}`}
                onClick={() => scrollTo(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                <span className="spa-nav__link-dot" aria-hidden="true" />
                {item.label}
              </button>
            ))}
          </div>

          <div className="spa-nav__socials">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="spa-nav__social-link"
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </nav>

        {/* Scrollable content */}
        <main className="spa-content" id="main-content">
          <Hero />
          <div className="divider" aria-hidden="true" />
          <Experience />
          <div className="divider" aria-hidden="true" />
          <Projects />
          <div className="divider" aria-hidden="true" />
          <Skills />
          <div className="divider" aria-hidden="true" />
          <Research />
          <div className="divider" aria-hidden="true" />
          <Kaggle />
          <div className="divider" aria-hidden="true" />
          <Contact />
        </main>
      </div>
    </>
  )
}
