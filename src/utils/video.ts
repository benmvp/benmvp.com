import { getEngagements } from '../config/speaking-engagements'
import { paginate, sortByDate } from './data'

type Provider = 'youtube' | 'vimeo'

export interface Video {
  description: string
  engagement: string
  date: string
  id: string
  provider: Provider
  title: string
  srcEmbed: string
  url?: string
}

const PROVIDER_REGEXES = [
  { provider: 'youtube', regex: /^https:\/\/www.youtube.com\/watch\?v=(.*?)$/ },
  { provider: 'vimeo', regex: /^https:\/\/vimeo.com\/(.*?)$/ },
] as { provider: Provider; regex: RegExp }[]

const getEmbedSrc = (id: string, provider: Provider) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`
  }
  if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${id}`
  }
}

const getProviderData = (
  url: string,
): { provider: Provider; id: string } | undefined => {
  for (const providerRegex of PROVIDER_REGEXES) {
    const match = url.match(providerRegex.regex)

    if (match) {
      return { provider: providerRegex.provider, id: match[1] }
    }
  }

  return undefined
}

interface GetVideoOptions {
  /**
   * The number of videos to return
   */
  size?: number

  /**
   * The page of videos to return
   * @default 1
   */
  page?: number

  /**
   * The property to sort by
   * @default 'date'
   */
  sortBy?: 'date' | 'title'

  /**
   * The order to sort by
   * @default 'desc'
   */
  sortOrder?: 'asc' | 'desc'
}

export const getVideos = ({
  size = -1,
  page = 1,
  sortBy = 'date',
  sortOrder = 'desc',
}: GetVideoOptions = {}): Video[] => {
  const videos = getEngagements()
    .all.map((engagement): Video | undefined => {
      const talkWithVideo = engagement.talks.find(({ links }) =>
        links?.some(({ label }) => label === 'Video'),
      )

      if (talkWithVideo) {
        const linkWithVideo = talkWithVideo.links?.find(
          ({ label }) => label === 'Video',
        )

        if (linkWithVideo) {
          const providerData = getProviderData(linkWithVideo.url)

          if (providerData) {
            const srcEmbed = getEmbedSrc(providerData.id, providerData.provider)

            if (srcEmbed) {
              return {
                description: talkWithVideo.description ?? '',
                engagement: engagement.name,
                date: talkWithVideo.date,
                srcEmbed,
                title: talkWithVideo.title,
                url: `/speak/#${engagement.id}`,
                ...providerData,
              }
            }
          }
        }
      }

      return undefined
    })
    .filter((video): video is Video => video !== undefined)

  return paginate(sortByDate(videos, sortBy, sortOrder), page, size)
}
