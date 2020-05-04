import VIDEOS from '../../content/pages/videos.json'

type Provider = 'youtube' | 'vimeo'

export interface Video {
  conference: string
  date: string
  id: string
  provider: Provider
  title: string
  url?: string
}

export const getVideos = (): Video[] => VIDEOS as Video[]
