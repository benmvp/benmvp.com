import slugify from 'slugify'
import { isFuture, differenceInMilliseconds } from 'date-fns'
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

export const getEngagements = () =>
  SPEAKING_ENGAGEMENTS.map(
    (speakInfo): SpeakingEngagement => ({
      ...speakInfo,
      id: slugify(speakInfo.name),
      talks: speakInfo.talks.map(
        (talk): EngagementTalk => {
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
  ).sort((engagementA, engagementB) =>
    differenceInMilliseconds(
      Date.parse(engagementB?.talks?.[0].date),
      Date.parse(engagementA?.talks?.[0].date),
    ),
  )

export const getUpcomingEngagements = () =>
  getEngagements()
    .filter(({ talks }) =>
      talks?.some(({ date }) => isFuture(Date.parse(date))),
    )
    .filter(({ isCancelled }) => !isCancelled)
    .reverse()
