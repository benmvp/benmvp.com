import TALKS from '../../content/pages/talks.json'

export interface Talk {
  categories: string[]
  description: string
  title: string
  retired?: boolean
}

const TALKS_LOOKUP = TALKS as Record<string, Talk>

export const getTalks = () => TALKS_LOOKUP
export const getTalk = (id: string) => getTalks()[id]
