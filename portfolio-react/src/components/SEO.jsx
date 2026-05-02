import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function SEO({ 
  title = 'Himanshu Nakrani - AI Software Developer',
  description = 'AI Software Developer at State Street Corporation. Building production LLM systems: Text-to-SQL, RAG, and AI agents.',
  image = '/og-image.png',
  type = 'website'
}) {
  const location = useLocation()
  const url = `https://himanshunakrani.dev${location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const metaTags = {
      'description': description,
      'og:title': title,
      'og:description': description,
      'og:image': image,
      'og:url': url,
      'og:type': type,
      'twitter:card': 'summary_large_image',
      'twitter:title': title,
      'twitter:description': description,
      'twitter:image': image,
    }

    // ⚡ Bolt: Pre-fetch meta tags into Map to avoid O(n) DOM queries in the loop
    const existingMetaTags = new Map()
    document.querySelectorAll('meta').forEach(meta => {
      const key = meta.getAttribute('property') || meta.getAttribute('name')
      if (key) existingMetaTags.set(key, meta)
    })

    Object.entries(metaTags).forEach(([name, content]) => {
      let meta = existingMetaTags.get(name)
      
      if (!meta) {
        meta = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      
      meta.setAttribute('content', content)
    })
  }, [title, description, image, url, type])

  return null
}
