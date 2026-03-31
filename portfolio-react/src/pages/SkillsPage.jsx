import Section from '../components/Section'
import TechStackVisualization from '../components/TechStackVisualization'
import { skills } from '../data'

export default function SkillsPage() {
  return (
    <Section 
      id="skills" 
      title="Tech Stack" 
      subtitle="Interactive visualization of technologies and their relationships"
    >
      <TechStackVisualization skills={skills} />
    </Section>
  )
}
