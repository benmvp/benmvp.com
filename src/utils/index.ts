import slugify from 'slugify'
import { parse } from 'date-fns'
import SITE_CONFIG from '../../config/site'

export const getUrl = (path = '/') => `${SITE_CONFIG.siteUrl}${path}`

export const getBlogUrl = (slug = '/') => getUrl(`/blog${slug}`)

const genSlug = (title: string): string =>
  slugify(title, { strict: true, lower: true })

export const genSpeakSlug = (title: string) => genSlug(`speak-${title}`)
export const genPostSlug = (title: string) => genSlug(`post-${title}`)
export const genVideoSlug = (title: string) => genSlug(`video-${title}`)

const NOW = Date.now()
export const parseDate = (date: string): Date =>
  parse(date, 'dd MMMM yyyy', NOW)
