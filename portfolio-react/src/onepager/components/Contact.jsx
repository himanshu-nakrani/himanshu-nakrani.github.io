import Reveal from './Reveal'
import { socials } from '../content'

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="container">
        <Reveal>
          <div className="contact__inner">
            <span className="status-line">
              <span className="status-line__dot" aria-hidden="true" />
              Open to opportunities
            </span>

            <h2 className="contact__title">Let's build production AI that matters.</h2>
            <p className="contact__desc">
              Looking for senior AI/ML engineering roles where I can build production LLM
              systems that matter. Open to full-time and select consulting.
            </p>

            <a className="contact__email" href="mailto:himanshunakrani0@gmail.com">
              himanshunakrani0@gmail.com
            </a>

            <div className="contact__links">
              {socials.map((social) => (
                <a
                  key={social.label}
                  className="text-link"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label} ↗
                </a>
              ))}
              <a
                className="text-link"
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Résumé ↗
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
