import slugify from 'slugify'
import SITE_CONFIG from '../config/site'

export const getUrl = (path = '/') => `${SITE_CONFIG.url}${path}`
export const getMinishopUrl = (slug = '/') => getUrl(`/minishops${slug}`)
export const getBlogUrl = (slug = '/') => getUrl(`/blog${slug}`)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })
export const genMinishopSlug = (title: string) => genSlug(`shop-${title}`)
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (id: string) => genSlug(`video-${id}`)
