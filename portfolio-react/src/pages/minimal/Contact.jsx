import { Mail, Github, Linkedin, ExternalLink, FileText } from 'lucide-react'
import { RESUME_URL } from '../../lib/site'
import { GITHUB_REPO_COUNT } from '../../data/stats'

const LINKS = [
  { label: 'Email', sublabel: 'himanshunakrani0@gmail.com', href: 'mailto:himanshunakrani0@gmail.com', icon: Mail, external: false },
  { label: 'LinkedIn', sublabel: 'linkedin.com/in/himanshu-nakrani', href: 'https://www.linkedin.com/in/himanshu-nakrani/', icon: Linkedin, external: true },
  { label: 'GitHub', sublabel: `github.com/himanshu-nakrani · ${GITHUB_REPO_COUNT} repos`, href: 'https://github.com/himanshu-nakrani', icon: Github, external: true },
  { label: 'Resume', sublabel: 'View on GitHub', href: RESUME_URL, icon: FileText, external: true },
  { label: 'Kaggle', sublabel: 'kaggle.com/himanshunakrani · Expert', href: 'https://www.kaggle.com/himanshunakrani', icon: ExternalLink, external: true },
  { label: 'LeetCode', sublabel: '180+ problems solved', href: 'https://leetcode.com/u/himanshunakrani0/', icon: ExternalLink, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="spa-section" aria-labelledby="contact-title">
      <div className="spa-section__label">Contact</div>
      <h2 id="contact-title" className="spa-section__title">Get in touch</h2>

      <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: 520 }}>
        Looking for AI/ML engineering roles focused on LLM backends, retrieval systems, agent tooling,
        and evaluation. Open to full-time positions and select consulting. Reach out any time.
      </p>

      <a
        href="mailto:himanshunakrani0@gmail.com"
        className="spa-btn spa-btn--primary"
        style={{ marginBottom: '1.75rem', display: 'inline-flex' }}
      >
        <Mail size={14} />
        Send an email
      </a>

      <div className="spa-contact-links">
        {LINKS.map(({ label, sublabel, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="spa-contact-row"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon size={15} color="var(--color-text-subtle)" />
              <span className="spa-contact-row__label">{label}</span>
            </div>
            <span className="spa-contact-row__sub">{sublabel}</span>
          </a>
        ))}
      </div>

      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-mono, monospace)' }}>
          Himanshu Nakrani · Hyderabad, India
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-subtle)', fontFamily: 'var(--font-mono, monospace)' }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}
