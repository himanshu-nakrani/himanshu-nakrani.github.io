import { Mail, Github, Linkedin, ExternalLink, FileText } from 'lucide-react'

const LINKS = [
  { label: 'Email', sublabel: 'himanshunakrani0@gmail.com', href: 'mailto:himanshunakrani0@gmail.com', icon: Mail, external: false },
  { label: 'LinkedIn', sublabel: 'linkedin.com/in/himanshu-nakrani', href: 'https://www.linkedin.com/in/himanshu-nakrani/', icon: Linkedin, external: true },
  { label: 'GitHub', sublabel: 'github.com/himanshu-nakrani · 31 repos', href: 'https://github.com/himanshu-nakrani', icon: Github, external: true },
  { label: 'Resume', sublabel: 'Download PDF', href: '/resume.pdf', icon: FileText, external: false },
  { label: 'Kaggle', sublabel: 'kaggle.com/himanshunakrani · Expert', href: 'https://www.kaggle.com/himanshunakrani', icon: ExternalLink, external: true },
  { label: 'LeetCode', sublabel: '180+ problems solved', href: 'https://leetcode.com/u/himanshunakrani0/', icon: ExternalLink, external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="section__label">Contact</div>
      <h2 id="contact-title" className="section__title">Get in touch</h2>

      <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '1.75rem', maxWidth: 520 }}>
        Looking for senior AI/ML engineering roles where I can build production LLM systems that matter.
        Open to full-time positions and select consulting. Reach out any time.
      </p>

      <a
        href="mailto:himanshunakrani0@gmail.com"
        className="btn btn--primary"
        style={{ marginBottom: '1.75rem', display: 'inline-flex' }}
      >
        <Mail size={14} />
        Send an email
      </a>

      <div className="contact-links">
        {LINKS.map(({ label, sublabel, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="contact-row"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Icon size={15} color="var(--text-subtle)" />
              <span className="contact-row__label">{label}</span>
            </div>
            <span className="contact-row__sub">{sublabel}</span>
          </a>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
          Himanshu Nakrani · Hyderabad, India
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', fontFamily: 'var(--font-mono)' }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </section>
  )
}
