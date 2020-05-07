import slugify from 'slugify'
import { format, getYear } from 'date-fns'
import SITE_CONFIG from '../../config/site'

export const getUrl = (path = '/') => `${SITE_CONFIG.siteUrl}${path}`

export const getBlogUrl = (slug = '/') => getUrl(`/blog${slug}`)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (id: string) => genSlug(`video-${id}`)

export const formatDate = (date: string) => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, 'dd MMMM yyyy') : date
}

export const getDateYear = (date: string) => {
  const parsedDate = Date.parse(date)

  return parsedDate ? getYear(Date.parse(date)) : Number.NaN
}
