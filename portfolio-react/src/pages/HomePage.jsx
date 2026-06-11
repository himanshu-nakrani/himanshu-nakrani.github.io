import HeroEnhanced from '../components/HeroEnhanced'
import MarqueeStrip from '../components/MarqueeStrip'
import FeaturedHighlightsRail from '../components/FeaturedHighlightsRail'
import CaseStudyWorkbench from '../components/CaseStudyWorkbench'
import Contact from '../components/Contact'
import Section from '../components/Section'
import SectionNav from '../components/SectionNav'
import ModelOpsSnapshot from '../components/ModelOpsSnapshot'
import TechnicalDeepDiveRail from '../components/TechnicalDeepDiveRail'
import { featuredHighlights } from '../data/projects'
import SEO from '../components/SEO'

const sections = [
  { id: 'about',      label: 'About' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'deepdives',  label: 'Deep Dives' },
  { id: 'projects',   label: 'Case Studies' },
  { id: 'modelops',   label: 'ModelOps' },
  { id: 'contact',    label: 'Contact' },
]

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home | Himanshu Nakrani"
        description="Production LLM systems, RAG pipelines, Text-to-SQL work, research deep dives, and contact details for Himanshu Nakrani."
      />
      {/* Desktop section navigation */}
      <SectionNav sections={sections} />

      {/* 1 — Hero */}
      <HeroEnhanced />

      {/* Capability ticker */}
      <MarqueeStrip />

      {/* 2 — Proof highlights */}
      <Section
        id="highlights"
        title="Highlights"
        subtitle="High-signal proof points from production work and research"
        number="02"
      >
        <FeaturedHighlightsRail highlights={featuredHighlights} />
      </Section>

      {/* 3 — Technical deep dives */}
      <Section
        id="deepdives"
        title="Technical Deep Dives"
        subtitle="In-depth case studies and research — architecture, tradeoffs, and implementation"
        number="03"
        alt
      >
        <TechnicalDeepDiveRail />
      </Section>

      {/* 4 — Case studies */}
      <Section
        id="projects"
        title="Case Studies"
        subtitle="Production LLM systems built at State Street"
        number="04"
      >
        <CaseStudyWorkbench />
      </Section>

      {/* 5 — Model training / research ops */}
      <Section
        id="modelops"
        title="Model Research"
        subtitle="Fine-tuning and pretraining work — from QLoRA to TPU-scale training"
        number="05"
      >
        <ModelOpsSnapshot />
      </Section>

      <Contact />
    </>
  )
}
