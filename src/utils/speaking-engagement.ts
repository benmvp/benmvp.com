import slugify from 'slugify'
import { isFuture, isPast, differenceInMilliseconds } from 'date-fns'
import { formatDate } from '.'
import { getTalk, Talk } from './talk'

import SPEAKING_ENGAGEMENTS from '../../content/pages/speaking-engagements.json'

export interface EngagementTalk extends Partial<Talk> {
  date: string
  id?: string
  title: string
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
  talks: EngagementTalk[]
  venue?: string
}

export const getEngagements = () => {
  const all: SpeakingEngagement[] = SPEAKING_ENGAGEMENTS.map((speakInfo) => ({
    ...speakInfo,
    id: slugify(speakInfo.name),
    talks: speakInfo.talks.map((talk) => {
      return {
        ...getTalk(talk.id),
        id: talk.id,
        ...talk,
        date: formatDate(talk.date),
      }
    }),
  })).sort((engagementA, engagementB) =>
    differenceInMilliseconds(
      Date.parse(engagementB?.talks?.[0].date),
      Date.parse(engagementA?.talks?.[0].date),
    ),
  )
  const future = all
    .filter(({ talks }) =>
      talks?.some(({ date }) => isFuture(Date.parse(date))),
    )
    .reverse()
  const past = all.filter(({ talks }) =>
    talks?.some(({ date }) => isPast(Date.parse(date))),
  )

  return { all, future, past }
}
