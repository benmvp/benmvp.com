import slugify from 'slugify'
import { format } from 'date-fns'
import SITE_CONFIG from '../../config/site'

export const getUrl = (path = '/') => `${SITE_CONFIG.siteUrl}${path}`

export const getBlogUrl = (slug = '/') => getUrl(`/blog${slug}`)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (id: string) => genSlug(`video-${id}`)

export const formatDate = (date: Date | number): string =>
  format(date, 'dd MMMM yyyy')
