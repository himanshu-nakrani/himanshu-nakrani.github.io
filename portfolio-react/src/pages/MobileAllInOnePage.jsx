import { useEffect } from 'react'
import Hero from '../components/Hero'
import ProofBar from '../components/ProofBar'
import FeaturedHighlightsRail from '../components/FeaturedHighlightsRail'
import ArchitectureSnapshotCard from '../components/ArchitectureSnapshotCard'
import CurrentFocus from '../components/CurrentFocus'
import AvailabilityCtaPanel from '../components/AvailabilityCtaPanel'
import AboutBrief from '../components/AboutBrief'
import TechStack from '../components/TechStack'
import Section from '../components/Section'
import Contact from '../components/Contact'
import ExperienceCard from '../components/ExperienceCard'
import GitHub from '../components/GitHub'
import Kaggle from '../components/Kaggle'
import LeetCode from '../components/LeetCode'
import Research from '../components/Research'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import {
  experience,
  featuredHighlights,
  proofLinks,
  architecturePipeline,
  currentFocusItems,
  availabilityStatus,
} from '../data'

export default function MobileAllInOnePage({ scrollToSection }) {
  useEffect(() => {
    if (!scrollToSection) return
    requestAnimationFrame(() => {
      const el = document.getElementById(scrollToSection)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [scrollToSection])

  return (
    <>
      <Hero />

      <section style={{ padding: '1rem 0' }}>
        <ProofBar links={proofLinks} />
      </section>

      <Section id="highlights" title="Highlights" subtitle="High-signal proof points from production work and research">
        <FeaturedHighlightsRail highlights={featuredHighlights} />
      </Section>

      <Section id="architecture" title="Architecture" subtitle="A representative production AI pipeline">
        <ArchitectureSnapshotCard pipeline={architecturePipeline} />
      </Section>

      <Section id="focus" title="Current Focus" subtitle="What I'm researching, building, and optimizing right now">
        <CurrentFocus items={currentFocusItems} />
      </Section>

      <Section id="about" title="What I Do" subtitle="Focused on building production-ready AI systems that solve real problems">
        <AboutBrief />
      </Section>

      <Section id="tech" title="Tech Stack" subtitle="Tools and technologies I work with" alt>
        <TechStack />
      </Section>

      <Section id="experience" title="Experience" subtitle="Enterprise AI software — RAG, LLM backends, and production systems at scale">
        <div style={{ position: 'relative', paddingLeft: '2.25rem' }}>
          <div
            style={{
              position: 'absolute',
              left: 6,
              top: 12,
              bottom: 0,
              width: 2,
              borderRadius: 2,
              background: 'linear-gradient(to bottom, var(--nav-dot), var(--accent) 35%, var(--border))',
            }}
          />
          {experience.map((item, i) => (
            <div key={`${item.company}-${item.period}`} style={{ position: 'relative', marginBottom: '2.25rem' }}>
              <div
                style={{
                  position: 'absolute',
                  left: -34,
                  top: 22,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--nav-dot), var(--accent))',
                  border: '3px solid var(--bg)',
                  boxShadow: '0 0 0 2px var(--bg)',
                  zIndex: 2,
                }}
              />
              <ExperienceCard item={item} index={i} animateEntry={false} />
            </div>
          ))}
        </div>
      </Section>

      <Projects />

      <Skills />

      <Section id="profiles" title="Profiles" subtitle="GitHub, Kaggle, LeetCode, and research activity" alt>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text)' }}>GitHub</h3>
            <GitHub embedded />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text)' }}>Kaggle</h3>
            <Kaggle embedded />
          </div>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem', color: 'var(--text)' }}>LeetCode</h3>
            <LeetCode embedded />
          </div>
        </div>
      </Section>

      <Research />

      <section style={{ padding: '4rem 0' }}>
        <AvailabilityCtaPanel status={availabilityStatus} />
      </section>

      <Contact />
    </>
  )
}
