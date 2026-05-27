import { cloneElement, isValidElement } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

export default function MagneticButton({ children, radius = 80, strength = 6 }) {
  const ref = useMagnetic({ radius, strength })

  if (!isValidElement(children)) return children

  const prevStyle = children.props.style || {}
  return cloneElement(children, {
    ref,
    style: {
      ...prevStyle,
      transform: 'translate(var(--mag-x, 0px), var(--mag-y, 0px))',
      transition: prevStyle.transition || 'transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1)',
      willChange: 'transform',
    },
  })
}
