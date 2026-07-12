import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const nodes = [
  { id: 'builder', label: 'Workflow Builder', x: 80, y: 145, detail: 'Visual agent and tool composition.' },
  { id: 'registry', label: 'Agent Registry', x: 260, y: 70, detail: 'Versioned definitions and policies.' },
  { id: 'engine', label: 'Execution Engine', x: 440, y: 145, detail: 'Retries, routing, and orchestration.' },
  { id: 'tools', label: 'Tool Runtime', x: 620, y: 70, detail: 'Validated, bounded tool invocation.' },
  { id: 'trace', label: 'Trace Monitor', x: 620, y: 225, detail: 'Real-time execution event stream.' },
  { id: 'eval', label: 'Evaluation', x: 800, y: 145, detail: 'Quality scoring and pass criteria.' },
]
const edges = [['builder','registry'],['registry','engine'],['engine','tools'],['engine','trace'],['tools','eval'],['trace','eval']]
const byId = Object.fromEntries(nodes.map(node => [node.id, node]))

export default function AgentForgeTopology() {
  const [active, setActive] = useState(nodes[2])
  const reduceMotion = useReducedMotion()
  return (
    <section className="signature-visual topology" aria-labelledby="topology-title">
      <header className="signature-visual__header"><div><span>Live topology</span><h2 id="topology-title">Agent Forge orchestration</h2></div><p>Inspect how a workflow moves from design to governed evaluation.</p></header>
      <div className="topology__canvas">
        <svg viewBox="0 0 880 300" role="img" aria-label="Agent Forge system topology">
          {edges.map(([from,to], index) => { const a=byId[from]; const b=byId[to]; return <g key={`${from}-${to}`}><line className="topology__edge" x1={a.x} y1={a.y} x2={b.x} y2={b.y}/>{!reduceMotion && <motion.circle className="topology__pulse" r="4" initial={{cx:a.x,cy:a.y}} animate={{cx:[a.x,b.x],cy:[a.y,b.y],opacity:[0,1,0]}} transition={{duration:2.4,delay:index*.32,repeat:Infinity,ease:'linear'}}/>}</g> })}
          {nodes.map(node => <g key={node.id} className={`topology__node${active.id===node.id?' is-active':''}`} role="button" tabIndex="0" aria-label={`${node.label}: ${node.detail}`} onClick={()=>setActive(node)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();setActive(node)}}}><circle cx={node.x} cy={node.y} r="29"/><text x={node.x} y={node.y+48} textAnchor="middle">{node.label}</text><text className="topology__node-index" x={node.x} y={node.y+4} textAnchor="middle">{String(nodes.indexOf(node)+1).padStart(2,'0')}</text></g>)}
        </svg>
      </div>
      <div className="topology__detail" aria-live="polite"><span>{active.label}</span><p>{active.detail}</p></div>
    </section>
  )
}
