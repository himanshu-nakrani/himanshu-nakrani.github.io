import { motion, useReducedMotion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const routeMeta=pathname=>{
 if(pathname.startsWith('/projects/')) return ['Case study','architecture']
 if(pathname.startsWith('/research/')) return ['Research note','telemetry']
 if(pathname==='/experience') return ['Experience','trajectory']
 if(pathname==='/profiles') return ['Profiles','signal']
 if(pathname==='/about') return ['About','capability']
 if(pathname==='/research') return ['Research','experiment']
 if(pathname==='/projects') return ['Projects','systems']
 if(pathname==='/skills') return ['Skills','stack']
 if(pathname==='/lab') return ['Lab','prototype']
 return ['Portfolio','signal field']
}
export default function ContextualRouteTransition({children}){const location=useLocation();const reduce=useReducedMotion();const [label,mode]=routeMeta(location.pathname);return <motion.div key={location.pathname} className={`context-route context-route--${mode}`} initial={reduce?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={reduce?undefined:{opacity:0,y:-6}} transition={{duration:.38,ease:[.16,1,.3,1]}}><motion.div className="context-route__intro" aria-hidden="true" initial={reduce?false:{scaleX:1}} animate={{scaleX:0}} transition={{duration:.5,ease:[.76,0,.24,1]}}><span>{label}</span><i/></motion.div>{children}</motion.div>}
