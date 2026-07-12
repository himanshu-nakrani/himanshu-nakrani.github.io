import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
const capabilities=[
 {name:'AI Systems',value:94,evidence:'Alpha Copilot, Agent Forge, and WealthAI production systems.'},
 {name:'Backend',value:91,evidence:'FastAPI, SQLAlchemy, PostgreSQL, caching, and secure APIs.'},
 {name:'LLMOps',value:88,evidence:'Fine-tuning, evaluation, tracing, guardrails, and observability.'},
 {name:'Research',value:82,evidence:'Text-to-SQL research, compact reasoning models, and IEEE work.'},
 {name:'Tooling',value:86,evidence:'No-code agent workflows, developer platforms, and CI/CD.'},
 {name:'Leadership',value:79,evidence:'Emerging Lead scope across cross-functional AI initiatives.'},
]
const center=160,radius=112
const point=(index,value=100)=>{const angle=-Math.PI/2+(index/capabilities.length)*Math.PI*2;const r=radius*value/100;return `${center+Math.cos(angle)*r},${center+Math.sin(angle)*r}`}
export default function CapabilityRadar(){const [active,setActive]=useState(capabilities[0]);const reduce=useReducedMotion();const polygon=capabilities.map((item,index)=>point(index,item.value)).join(' ');return <section className="signature-visual capability-radar" aria-labelledby="capability-radar-title"><header className="signature-visual__header"><div><span>Evidence map</span><h2 id="capability-radar-title">Capability radar</h2></div><p>Select a capability to see the work behind it—not an arbitrary proficiency score.</p></header><div className="capability-radar__layout"><svg viewBox="0 0 320 320" role="img" aria-label="Capability coverage radar">{[25,50,75,100].map(level=><polygon key={level} className="capability-radar__ring" points={capabilities.map((_,index)=>point(index,level)).join(' ')}/>) }{capabilities.map((item,index)=><line key={item.name} className="capability-radar__axis" x1={center} y1={center} x2={point(index).split(',')[0]} y2={point(index).split(',')[1]}/>)}<motion.polygon className="capability-radar__shape" points={polygon} initial={reduce?false:{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}}/><circle className="capability-radar__core" cx={center} cy={center} r="4"/></svg><div className="capability-radar__controls">{capabilities.map(item=><button key={item.name} type="button" className={active.name===item.name?'is-active':''} onClick={()=>setActive(item)}><span>{item.name}</span><strong>{item.value}</strong></button>)}</div></div><div className="capability-radar__evidence" aria-live="polite"><span>{active.name}</span><p>{active.evidence}</p></div></section>}
