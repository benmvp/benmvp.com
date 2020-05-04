import SPEAKING_ENGAGEMENTS from '../../content/pages/speaking-engagements.json'

interface Talk {
  date: string
  links?: { label: string; url: string }[]
  room?: string
  time?: string
  title: string
  url: string
}

export interface SpeakingEngagement {
  conference: string
  conferenceUrl: string
  isCancelled?: boolean
  location: string
  talks: Talk[]
  venue?: string
}

export const getSpeakingEngagements = (): SpeakingEngagement[] =>
  SPEAKING_ENGAGEMENTS as SpeakingEngagement[]
