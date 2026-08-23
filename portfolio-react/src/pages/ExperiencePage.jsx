import PageHeader from '../components/PageHeader'
import CareerTimeline from '../components/CareerTimeline'

export default function ExperiencePage() {
  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Experience"
        title="Career Timeline"
        description="Enterprise AI software — RAG, LLM backends, and production systems at scale."
      />
      <CareerTimeline />
    </section>
  )
}
