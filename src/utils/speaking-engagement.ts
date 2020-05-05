import slugify from 'slugify'
import { isFuture, differenceInMilliseconds } from 'date-fns'
import { formatDate } from '.'
import { getTalk, Talk } from './talk'

import SPEAKING_ENGAGEMENTS from '../../content/pages/speaking-engagements.json'

interface SpeakTalk extends Talk {
  date: string
  id?: string
  links?: { label: string; url: string }[]
  room?: string
  time?: string
}

export interface SpeakingEngagement {
  id: string
  name: string
  url: string
  isCancelled?: boolean
  location: string
  talks: SpeakTalk[]
  venue?: string
}

export const getSpeakingEngagements = () =>
  SPEAKING_ENGAGEMENTS.map(
    (speakInfo): SpeakingEngagement => ({
      ...speakInfo,
      id: slugify(speakInfo.name),
      talks: speakInfo.talks.map(
        (talk): SpeakTalk => {
          const parsedDate = Date.parse(talk.date)

          return {
            ...getTalk(talk.id),
            id: talk.id,
            ...talk,
            date: parsedDate ? formatDate(parsedDate) : talk.date,
          }
        },
      ),
    }),
  )

export const getUpcomingSpeakingEngagements = () =>
  getSpeakingEngagements()
    .filter(({ talks }) =>
      talks?.some(({ date }) => isFuture(Date.parse(date))),
    )
    .filter(({ isCancelled }) => !isCancelled)
    .sort((speakA, speakB) =>
      differenceInMilliseconds(
        Date.parse(speakA?.talks?.[0].date),
        Date.parse(speakB?.talks?.[0].date),
      ),
    )
