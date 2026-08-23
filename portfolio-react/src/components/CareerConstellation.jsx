import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const stages = [
  { year:'2022', title:'Software Intern', detail:'Backend foundations and production delivery.', x:70, y:180 },
  { year:'2023', title:'Associate 2', detail:'LLM applications and financial-data workflows.', x:260, y:110 },
  { year:'2024', title:'Senior Associate', detail:'RAG, fine-tuning, and system ownership.', x:470, y:185 },
  { year:'2025', title:'Emerging Lead', detail:'Agent platforms, governance, and technical leadership.', x:690, y:85 },
]
export default function CareerConstellation(){
 const [active,setActive]=useState(stages[3]); const reduce=useReducedMotion()
 return <section className="signature-visual constellation" aria-labelledby="career-map-title"><header className="signature-visual__header"><div><span>Career map</span><h2 id="career-map-title">From backend foundations to agent platforms.</h2></div><p>Each stage expands scope, ownership, and systems impact.</p></header><svg viewBox="0 0 760 260" role="group" aria-label="Career progression constellation"><motion.path className="constellation__path" d="M70 180 C150 180 180 110 260 110 S390 185 470 185 S610 85 690 85" initial={reduce?false:{pathLength:0}} whileInView={{pathLength:1}} viewport={{once:true}} transition={{duration:1.4,ease:[.16,1,.3,1]}}/>{stages.map((stage,index)=><g key={stage.title} className={`constellation__node${active.title===stage.title?' is-active':''}`} role="button" aria-pressed={active.title===stage.title} tabIndex="0" onClick={()=>setActive(stage)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setActive(stage)}}}><circle cx={stage.x} cy={stage.y} r={index===3?16:11}/><text x={stage.x} y={stage.y+34} textAnchor="middle">{stage.year}</text></g>)}</svg><div className="constellation__detail" aria-live="polite"><span>{active.year}</span><div><strong>{active.title}</strong><p>{active.detail}</p></div></div></section>
}
