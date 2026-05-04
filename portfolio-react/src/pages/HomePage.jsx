import { lazy, Suspense } from 'react'
import HeroEnhanced from '../components/HeroEnhanced'
import ProofBar from '../components/ProofBar'
import FeaturedHighlightsRail from '../components/FeaturedHighlightsRail'
import FeaturedProjects from '../components/FeaturedProjects'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Section from '../components/Section'
import SectionNav from '../components/SectionNav'
import {
  projects,
  testimonials,
  featuredHighlights,
  proofLinks,
} from '../data'

// Lazy load the heavy pipeline player
const AIPipelinePlayer = lazy(() => import('../components/AIPipelinePlayer'))

// Section definitions for the nav
const sections = [
  { id: 'about', label: 'About' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'projects', label: 'Projects' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact', label: 'Contact' },
]

function PipelineFallback() {
  return (
    <div style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-xl)',
      padding: '3rem',
      textAlign: 'center',
    }}>
      <div className="skeleton-shimmer" style={{ width: '60%', height: 24, margin: '0 auto 1rem', borderRadius: 6 }} />
      <div className="skeleton-shimmer" style={{ width: '80%', height: 200, margin: '0 auto', borderRadius: 8 }} />
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      {/* Desktop section navigation */}
      <SectionNav sections={sections} />

      {/* Act 1: Hero + Live Status */}
      <HeroEnhanced />

      {/* Proof bar */}
      <section style={{ padding: '1rem 0' }}>
        <ProofBar links={proofLinks} />
      </section>

      {/* Act 2: Proof in 60 seconds */}
      <Section 
        id="highlights" 
        title="Highlights" 
        subtitle="High-signal proof points from production work and research"
        number="02"
      >
        <FeaturedHighlightsRail highlights={featuredHighlights} />
      </Section>

      {/* Interactive AI Pipeline Player */}
      <Section 
        id="pipeline" 
        title="Architecture" 
        subtitle="Interactive visualization of the RAG/Text-to-SQL production pipeline"
        number="03"
      >
        <Suspense fallback={<PipelineFallback />}>
          <AIPipelinePlayer />
        </Suspense>
      </Section>

      {/* Act 3: Featured Work */}
      <Section 
        id="projects" 
        title="Featured Projects" 
        subtitle="Production systems and open-source work"
        number="04"
        alt
      >
        <FeaturedProjects projects={projects} />
      </Section>

      {/* Act 4: Social Proof + Contact */}
      <Section 
        id="testimonials" 
        title="What People Say" 
        subtitle="Feedback from colleagues and stakeholders"
        number="05"
      >
        <Testimonials testimonials={testimonials} />
      </Section>

      <Contact />
    </>
  )
}
