import CONFIG from '../../content/meta/config'

export const getUrl = (path: string) =>
  `${CONFIG.siteUrl}${CONFIG.pathPrefix}${path}`
