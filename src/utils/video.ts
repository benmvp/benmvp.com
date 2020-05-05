import { getEngagements } from './speaking-engagement'
import { genTalkSlug } from '.'

type Provider = 'youtube' | 'vimeo'

export interface Video {
  engagement: string
  date: string
  id: string
  provider: Provider
  title: string
  url?: string
}

const PROVIDER_REGEXES = [
  { provider: 'youtube', regex: /^https:\/\/www.youtube.com\/watch\?v=(.*?)$/ },
  { provider: 'vimeo', regex: /^https:\/\/vimeo.com\/(.*?)$/ },
] as { provider: Provider; regex: RegExp }[]

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

export const getVideos = () =>
  getEngagements()
    .map((engagement): Video | undefined => {
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
            return {
              engagement: engagement.name,
              date: talkWithVideo.date,
              title: talkWithVideo.title,
              url: `/speak/#${engagement.id}`,
              ...providerData,
            }
          }
        }
      }
    })
    .filter((video): video is Video => video !== undefined)
