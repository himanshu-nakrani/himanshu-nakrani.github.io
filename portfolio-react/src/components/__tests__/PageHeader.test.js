/**
 * Tests for PageHeader component
 * Covers requirements 6.1–6.5
 */
import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
import PageHeader from '../PageHeader.jsx'

function render(props) {
  return renderToStaticMarkup(createElement(PageHeader, props))
}

describe('PageHeader', () => {
  // Req 6.2: default marginBottom is 2.5rem
  it('uses 2.5rem marginBottom by default', () => {
    const html = render({ title: 'Test' })
    expect(html).toContain('margin-bottom:2.5rem')
  })

  // Req 6.3: custom marginBottom prop is respected
  it('uses provided marginBottom when supplied', () => {
    const html = render({ title: 'Test', marginBottom: '3rem' })
    expect(html).toContain('margin-bottom:3rem')
    expect(html).not.toContain('margin-bottom:2.5rem')
  })

  // Req 6.4: no lede <p> when description is omitted
  it('renders no lede paragraph when description is not provided', () => {
    const html = render({ title: 'Test' })
    expect(html).not.toContain('mvp2-page-lede')
  })

  // Req 6.4: lede <p> appears when description is provided
  it('renders lede paragraph when description is provided', () => {
    const html = render({ title: 'Test', description: 'A description' })
    expect(html).toContain('mvp2-page-lede')
    expect(html).toContain('A description')
  })

  // Req 6.5: no kicker <p> when kicker is omitted
  it('renders no kicker paragraph when kicker is not provided', () => {
    const html = render({ title: 'Test' })
    expect(html).not.toContain('mvp2-kicker')
  })

  // Req 6.5: kicker <p> appears when kicker is provided
  it('renders kicker paragraph when kicker is provided', () => {
    const html = render({ title: 'Test', kicker: 'About' })
    expect(html).toContain('mvp2-kicker')
    expect(html).toContain('About')
  })

  // Always renders the h1 title
  it('always renders the h1 title', () => {
    const html = render({ title: 'My Title' })
    expect(html).toContain('<h1')
    expect(html).toContain('My Title')
  })
})
