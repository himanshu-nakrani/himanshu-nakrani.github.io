import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { absoluteUrl, SITE_DESCRIPTION, SITE_IMAGE, SITE_TITLE } from '../lib/site'

function upsertMeta(key, value, attribute) {
  let meta = document.querySelector(`meta[${attribute}="${key}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attribute, key)
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', value)
}

function upsertCanonical(url) {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

export default function SEO({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = SITE_IMAGE,
  type = 'website',
}) {
  const location = useLocation()
  const url = absoluteUrl(location.pathname)
  const absoluteImage = absoluteUrl(image)

  useEffect(() => {
    document.title = title

    upsertMeta('description', description, 'name')
    upsertMeta('og:title', title, 'property')
    upsertMeta('og:description', description, 'property')
    upsertMeta('og:image', absoluteImage, 'property')
    upsertMeta('og:url', url, 'property')
    upsertMeta('og:type', type, 'property')
    upsertMeta('twitter:card', 'summary_large_image', 'name')
    upsertMeta('twitter:title', title, 'name')
    upsertMeta('twitter:description', description, 'name')
    upsertMeta('twitter:image', absoluteImage, 'name')
    upsertCanonical(url)
  }, [title, description, absoluteImage, url, type])

  return null
}
