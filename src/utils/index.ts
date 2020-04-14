import SITE_CONFIG from '../../config/site'

export const getUrl = (path: string) =>
  `${SITE_CONFIG.siteUrl}${SITE_CONFIG.pathPrefix}${path}`

export const getBlogUrl = (slug: string) => getUrl(`/blog${slug}`)
