import Hero from '../components/Hero'
import ProofBar from '../components/ProofBar'
import FeaturedHighlightsRail from '../components/FeaturedHighlightsRail'
import FeaturedProjects from '../components/FeaturedProjects'
import Testimonials from '../components/Testimonials'
import ArchitectureSnapshotCard from '../components/ArchitectureSnapshotCard'
import CurrentFocus from '../components/CurrentFocus'
import TechStack from '../components/TechStack'
import Contact from '../components/Contact'
import Section from '../components/Section'
import {
  projects,
  testimonials,
  featuredHighlights,
  proofLinks,
  architecturePipeline,
  currentFocusItems,
} from '../data'

export default function HomePage() {
  return (
    <>
      <Hero />

      <section style={{ padding: '1rem 0' }}>
        <ProofBar links={proofLinks} />
      </section>

      <Section id="highlights" title="Highlights" subtitle="High-signal proof points from production work and research">
        <FeaturedHighlightsRail highlights={featuredHighlights} />
      </Section>

      <Section id="featured-projects" title="Featured Projects" subtitle="Production systems and open-source work" alt>
        <FeaturedProjects projects={projects} />
      </Section>

      <Section id="architecture" title="Architecture" subtitle="A representative production AI pipeline">
        <ArchitectureSnapshotCard pipeline={architecturePipeline} />
      </Section>

      <Section id="testimonials" title="What People Say" subtitle="Feedback from colleagues and stakeholders" alt>
        <Testimonials testimonials={testimonials} />
      </Section>

      <Section id="focus" title="Current Focus" subtitle="What I'm researching, building, and optimizing right now">
        <CurrentFocus items={currentFocusItems} />
      </Section>

      <Section id="tech" title="Tech Stack" subtitle="Tools and technologies I work with" alt>
        <TechStack />
      </Section>

      <Contact />
    </>
  )
}
