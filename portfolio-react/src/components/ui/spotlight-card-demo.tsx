import { GlowCard } from '@/components/ui/spotlight-card'

export default function SpotlightCardDemo() {
  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        background: '#0a0a0a',
        padding: '2rem',
      }}
    >
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <GlowCard glowColor="purple">
          <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.7 }}>Purple glow</span>
        </GlowCard>
        <GlowCard glowColor="red">
          <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.7 }}>Red glow</span>
        </GlowCard>
        <GlowCard glowColor="orange">
          <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.7 }}>Orange glow</span>
        </GlowCard>
      </div>
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <GlowCard glowColor="blue">
          <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.7 }}>Blue glow</span>
        </GlowCard>
        <GlowCard glowColor="green">
          <span style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.7 }}>Green glow</span>
        </GlowCard>
      </div>
    </div>
  )
}
