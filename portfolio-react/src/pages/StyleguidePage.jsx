import React from 'react'
import {
  Button,
  Card,
  Tag,
  Kicker,
  Heading,
  Lead,
  StatusDot,
  Stack,
  Cluster,
  Grid,
  HighlightCard,
  ListItem,
  Badge,
} from '../components/ui'

export default function StyleguidePage() {
  return (
    <div style={{ padding: 'var(--page-pad-x)', maxWidth: 'var(--container)', margin: '0 auto', paddingTop: 'var(--page-pad-top)' }}>
      <Heading level={1}>Design Tokens & Component Library</Heading>
      <Lead>Complete reference for all available design tokens and UI primitives.</Lead>

      {/* Color Palette Section */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Color Tokens</Heading>
        
        <Grid min="150px" gap="var(--space-4)" style={{ marginTop: 'var(--space-6)' }}>
          {[
            { name: 'Background', token: '--color-bg' },
            { name: 'Surface', token: '--color-surface' },
            { name: 'Surface Raised', token: '--color-surface-raised' },
            { name: 'Border', token: '--color-border' },
            { name: 'Text', token: '--color-text' },
            { name: 'Text Muted', token: '--color-text-muted' },
            { name: 'Text Subtle', token: '--color-text-subtle' },
            { name: 'Accent', token: '--color-accent' },
            { name: 'Success', token: '--color-success' },
            { name: 'Warning', token: '--color-warning' },
            { name: 'Danger', token: '--color-danger' },
          ].map(({ name, token }) => (
            <div key={token} style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{
                width: '100%',
                height: '60px',
                borderRadius: 'var(--radius-sm)',
                background: `var(${token})`,
                marginBottom: 'var(--space-3)',
              }} />
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)' }}>{name}</div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>{token}</div>
            </div>
          ))}
        </Grid>
      </section>

      {/* Typography Section */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Typography</Heading>
        
        <Stack gap="var(--space-6)" style={{ marginTop: 'var(--space-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>H1 / Display</div>
            <Heading level={1}>The Quick Brown Fox</Heading>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>H2 / Display 3xl</div>
            <Heading level={2}>The Quick Brown Fox</Heading>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>H3 / Display 2xl</div>
            <Heading level={3}>The Quick Brown Fox</Heading>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Lead</div>
            <Lead>This is a lead paragraph that provides context and establishes the tone for the section.</Lead>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Body</div>
            <p>This is regular body text. It uses the Inter font family with a comfortable line height for readability.</p>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)' }}>Kicker</div>
            <Kicker>Section Label</Kicker>
          </div>
        </Stack>
      </section>

      {/* Button Variants */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Buttons</Heading>
        
        <Cluster gap="var(--space-4)" style={{ marginTop: 'var(--space-6)' }}>
          <Button variant="primary">Primary CTA</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="link">Link Button</Button>
        </Cluster>
      </section>

      {/* Card Variants */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Cards</Heading>
        
        <Grid min="280px" gap="var(--space-4)" style={{ marginTop: 'var(--space-6)' }}>
          <Card>
            <h3 style={{ marginBottom: 'var(--space-2)' }}>Standard Card</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>A basic card container with border and padding.</p>
          </Card>
          
          <HighlightCard
            label="Metric"
            value="42.5K"
          >
            Users this month
          </HighlightCard>
          
          <ListItem
            title="Project Example"
            subtitle="January 2024"
            description="Built an AI-powered feature that improved performance."
            tags={['React', 'AI', 'Python']}
          />
        </Grid>
      </section>

      {/* Tags & Badges */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Tags & Badges</Heading>
        
        <Stack gap="var(--space-4)" style={{ marginTop: 'var(--space-6)' }}>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>Tags</div>
            <Cluster gap="var(--space-2)">
              <Tag variant="neutral">Neutral</Tag>
              <Tag variant="accent">Accent</Tag>
              <Tag variant="success">Success</Tag>
            </Cluster>
          </div>
          
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-medium)', marginBottom: 'var(--space-2)' }}>Badges</div>
            <Cluster gap="var(--space-2)">
              <Badge variant="neutral">Neutral</Badge>
              <Badge variant="accent">Accent</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </Cluster>
          </div>
        </Stack>
      </section>

      {/* Status Indicators */}
      <section style={{ marginTop: 'var(--section-pad-y)' }}>
        <Heading level={2}>Status Indicators</Heading>
        
        <Stack gap="var(--space-4)" style={{ marginTop: 'var(--space-6)' }}>
          <StatusDot color="success" label="Available" pulse />
          <StatusDot color="warning" label="In Progress" />
          <StatusDot color="danger" label="Offline" />
        </Stack>
      </section>

      {/* Layout Grid */}
      <section style={{ marginTop: 'var(--section-pad-y)', marginBottom: 'var(--section-pad-y)' }}>
        <Heading level={2}>Layout Components</Heading>
        
        <div style={{ marginTop: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Grid (auto-fit, min 280px)</h3>
          <Grid min="280px">
            {[1, 2, 3, 4].map(i => (
              <Card key={i} style={{ background: 'color-mix(in srgb, var(--color-accent) 12%, transparent)' }}>
                <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Column {i}
                </div>
              </Card>
            ))}
          </Grid>
        </div>
      </section>
    </div>
  )
}
