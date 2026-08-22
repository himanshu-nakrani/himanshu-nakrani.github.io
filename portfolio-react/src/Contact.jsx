import { Reveal } from './Reveal'
import { socials } from '../content'
import { availabilityStatus } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-label="Contact">
      <div className="container">
        <Reveal>
          <div className="contact__inner">
            <span className="status-line">
              <span className="status-line__dot" aria-hidden="true" />
              {availabilityStatus.statusLabel}
            </span>

            <h2 className="contact__title">Let's build production AI that matters.</h2>
            <p className="contact__desc">{availabilityStatus.description}</p>

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
