export const SITE_URL = 'https://www.himanshunakrani.me'
export const SITE_TITLE = 'Himanshu Nakrani - AI Software Developer'
export const SITE_DESCRIPTION = 'AI Software Developer at State Street Corporation. Building production LLM systems: Text-to-SQL, RAG, and AI agents.'
export const SITE_IMAGE = `${SITE_URL}/og-image.png`

export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
