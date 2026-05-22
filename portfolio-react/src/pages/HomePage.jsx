import HeroEnhanced from '../components/HeroEnhanced'
import FeaturedHighlightsRail from '../components/FeaturedHighlightsRail'
import CaseStudyWorkbench from '../components/CaseStudyWorkbench'
import Contact from '../components/Contact'
import Section from '../components/Section'
import SectionNav from '../components/SectionNav'
import ProductionTraceExplorer from '../components/ProductionTraceExplorer'
import ModelOpsSnapshot from '../components/ModelOpsSnapshot'
import { featuredHighlights } from '../data'

const sections = [
  { id: 'about',      label: 'About' },
  { id: 'highlights', label: 'Highlights' },
  { id: 'pipeline',   label: 'Architecture' },
  { id: 'projects',   label: 'Case Studies' },
  { id: 'modelops',   label: 'ModelOps' },
  { id: 'contact',    label: 'Contact' },
]

export default function HomePage() {
  return (
    <>
      {/* Desktop section navigation */}
      <SectionNav sections={sections} />

      {/* 1 — Hero */}
      <HeroEnhanced />

      {/* 2 — Proof highlights */}
      <Section
        id="highlights"
        title="Highlights"
        subtitle="High-signal proof points from production work and research"
        number="02"
      >
        <FeaturedHighlightsRail highlights={featuredHighlights} />
      </Section>

      {/* 3 — Production pipeline explorer */}
      <Section
        id="pipeline"
        title="Architecture"
        subtitle="Alpha Copilot production pipeline — select a stage to inspect latency and design"
        number="03"
      >
        <ProductionTraceExplorer />
      </Section>

      {/* 4 — Case studies */}
      <Section
        id="projects"
        title="Case Studies"
        subtitle="Production LLM systems built at State Street"
        number="04"
        alt
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
