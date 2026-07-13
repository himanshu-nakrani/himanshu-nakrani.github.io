import { NavLink } from 'react-router-dom'

import { prefetchRoute } from '../../lib/routePrefetch'

export default function Pill3DNav({ items, isActive, onItemClick }) {
  return (
    <ul
      className="nav-pill-links"
      style={{
        listStyle: 'none',
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        margin: 0,
        padding: '0 4px',
        minWidth: 0,
        overflowX: 'auto',
        position: 'relative',
      }}
    >
      {items.map((item) => {
        const active = isActive(item.label)
        const isSecondary = item.isSecondary
        return (
          <li key={item.label} style={{ flexShrink: 0, position: 'relative' }}>
            <NavLink
              to={item.to}
              onClick={(event) => onItemClick(item, event)}
              onPointerEnter={() => prefetchRoute(item.to)}
              onFocus={() => prefetchRoute(item.to)}
              aria-current={active ? 'page' : undefined}
              className={`nav-pill-link${active ? ' nav-link-active' : ''}${isSecondary ? ' nav-pill-link--secondary' : ''}`}
            >
              {active && <span className="nav-pill-link__lens" aria-hidden="true" />}
              <span className="nav-pill-link__label">{item.label}</span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
