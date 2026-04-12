import { PillBase } from '@/components/ui/3d-adaptive-navigation-bar'

/**
 * Demo — default export for isolated preview (e.g. /demo/3d-nav).
 */
export default function Demo() {
  return (
    <div
      style={{
        background: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PillBase />
    </div>
  )
}
