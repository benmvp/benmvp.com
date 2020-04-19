import SITE_CONFIG from '../../config/site'

export const getUrl = (path = '/') => `${SITE_CONFIG.siteUrl}${path}`

export const getBlogUrl = (slug: string) => getUrl(`/blog${slug}`)
