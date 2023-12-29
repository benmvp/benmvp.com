import { isFuture, isPast, differenceInMilliseconds, addDays } from 'date-fns'
import slugify from 'slugify'
import { formatDate } from './date'
import TALKS, { type Talk, type TalkId } from '../config/talks'
import {
  TalkLink,
  SourceTalk,
  SourceEngagement,
  SPEAKING_ENGAGEMENTS,
} from '../config/speaking-engagements'
import { paginate } from './data'

export interface EngagementTalk extends Partial<Talk> {
  date: string
  id: TalkId | null
  links: TalkLink[] | null
  room: SourceTalk['room'] | null
  time: SourceTalk['time'] | null
  title: string
}

export interface SpeakingEngagement {
  id: string
  isCancelled: SourceEngagement['isCancelled']
  name: SourceEngagement['name']
  location: SourceEngagement['location']
  talks: EngagementTalk[]
  url: SourceEngagement['url']
  venue: SourceEngagement['venue'] | null
}

interface GetEngagementsOptions {
  /**
   * How to filter the engagements
   */
  filter?: {
    /**
     * Whether to return only cancelled engagements, only not cancelled engagements, or all engagements
     * @default false
     */
    cancelled?: boolean | 'all'

    /**
     * Whether to return only future engagements, only past engagements, or all engagements
     * @default 'all'
     */
    when?: 'future' | 'past' | 'all'
  }

  /**
   * The number of engagements to return
   */
  size?: number

  /**
   * The page of engagements to return
   * @default 1
   */
  page?: number

  /**
   * The property to sort by
   * @default 'date'
   */
  sortBy?: 'date' | 'name'

  /**
   * The order to sort by
   * @default 'desc'
   */
  sortOrder?: 'asc' | 'desc'
}

/**
 * Get all the speaking engagements, optionally filtered and sorted
 */
export const getEngagements = ({
  filter = {},
  page = 1,
  size = -1,
  sortBy = 'date',
  sortOrder = 'desc',
}: GetEngagementsOptions = {}) => {
  const engagements = SPEAKING_ENGAGEMENTS.map(
    (sourceEngagement): SpeakingEngagement => ({
      ...sourceEngagement,
      id: slugify(sourceEngagement.name),
      talks: sourceEngagement.talks.map((sourceTalk): EngagementTalk => {
        const title = sourceTalk.id
          ? TALKS[sourceTalk.id].title
          : sourceTalk.title

        return {
          ...(sourceTalk.id ? TALKS[sourceTalk.id] : {}),
          id: sourceTalk.id ?? null,
          date: formatDate(sourceTalk.date, 'normal'),
          title,
          room: sourceTalk.room ?? null,
          time: sourceTalk.time ?? null,
          links: sourceTalk.links ?? [],
        }
      }),
      isCancelled: sourceEngagement.isCancelled ?? false,
      venue: sourceEngagement.venue ?? null,
    }),
  )
    .filter(({ talks }) => {
      const { cancelled = false, when = 'all' } = filter
      const isWhen =
        when === 'all' ||
        talks?.some(({ date }) => {
          const whenFilter = when === 'future' ? isFuture : isPast

          return whenFilter(addDays(Date.parse(date), 1))
        })

      return isWhen && !cancelled
    })
    .sort((engagementA, engagementB) => {
      const direction = sortOrder === 'asc' ? 1 : -1

      if (sortBy === 'date') {
        return (
          direction *
          (Date.parse(engagementA?.talks?.[0].date) >
          Date.parse(engagementB?.talks?.[0].date)
            ? 1
            : -1)
        )
      }

      if (sortBy === 'name') {
        return direction * (engagementA.name > engagementB.name ? 1 : -1)
      }

      return 0
    })

  return paginate(engagements, page, size)
}
