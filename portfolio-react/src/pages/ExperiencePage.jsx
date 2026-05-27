import PageHeader from '../components/PageHeader'
import CareerTimeline from '../components/CareerTimeline'

export default function ExperiencePage() {
  return (
    <section className="mvp2-page">
      <PageHeader
        kicker="Experience"
        title="Career Timeline"
        description="LLM backends, RAG pipelines, Text-to-SQL systems, and agent tooling for financial-data workflows."
      />
      <CareerTimeline />
    </section>
  )
}
