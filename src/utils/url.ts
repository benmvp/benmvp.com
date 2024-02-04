import slugify from 'slugify'
import SITE_CONFIG from '../config/site'

export const getUrl = (path = '', isFull = false) =>
  isFull ? `${SITE_CONFIG.url}/${path}` : path
export const getMinishopUrl = (slug = '', isFull = false) =>
  getUrl(`/minishops/${slug}/`, isFull)
export const getPostUrl = (slug = '', isFull = false) =>
  getUrl(`/blog/${slug}/`, isFull)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })
export const genMinishopSlug = (title: string) => genSlug(`shop-${title}`)
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (id: string) => genSlug(`video-${id}`)
