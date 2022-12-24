import slugify from 'slugify'
import { format, getYear } from 'date-fns'
import SITE_CONFIG from '../../config/site'

export const getFullUrl = (path = '/') => `${SITE_CONFIG.siteUrl}${path}`
export const getMinishopUrl = (slug = '/') => getFullUrl(`/minishops${slug}`)
export const getBlogUrl = (slug = '/') => getFullUrl(`/blog${slug}`)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })
export const genMinishopSlug = (title: string) => genSlug(`shop-${title}`)
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (id: string) => genSlug(`video-${id}`)

const formatDateAs = (date: string, dateFormat: string): string => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, dateFormat) : date
}

export const formatDate = (date: string) =>
  formatDateAs(date, 'EEEE, MMMM dd, yyyy')

export const formatDateIso = (date: string) => formatDateAs(date, 'yyyy-MM-dd')

export const formatTime = (date: string): string => {
  const parsedDate = Date.parse(date)

  return parsedDate ? format(parsedDate, 'h:mm b z') : date
}

export const getDateYear = (date: string) => {
  const parsedDate = Date.parse(date)

  return parsedDate ? getYear(Date.parse(date)) : Number.NaN
}
