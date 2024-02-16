import { resolve } from 'path'
import { readFile, readdir, statSync } from 'fs-extra'
import { isFuture } from 'date-fns'

import { paginate, parseMdx } from './data'

const MINISHOPS_DIRECTORY = resolve(process.cwd(), 'src/content/minishops')

interface MinishopFrontMatter {
  category: string
  event: {
    /**
     * The minishop's end date/time
     */
    end: Date
    /**
     * The minishop's ID on Eventbrite
     */
    id: string
    /**
     * The minishop's start date/time
     */
    start: Date
  } | null
  /**
   * URL to the hero image
   */
  hero: string
  heroAlt: string
  heroCredit: string
  level: 'beginner' | 'intermediate' | 'advanced'
  shortDescription: string
  tags: string[]
  title: string
}

export interface Minishop extends Omit<MinishopFrontMatter, 'event'> {
  /**
   * The compiled source, generated from `next-mdx-remote/serialize`
   */
  compiledSource: string

  /**
   * The minishop's end date/time
   */
  eventEnd: string | null

  /**
   * The minishop's ID on Eventbrite
   */
  eventId: string | null

  /**
   * The minishop's start date/time
   */
  eventStart: string | null

  /**
   * An excerpt from the `content`
   */
  excerpt: string

  /**
   * Whether the minishop is upcoming
   */
  isUpcoming: boolean

  /**
   * Markdown content w/o the front matter
   */
  mainContent: string

  /**
   * The minishop's slug (unique identifier)
   */
  slug: string
}

export const getAllMinishopSlugs = async () => {
  const files = await readdir(MINISHOPS_DIRECTORY)

  return files.filter(
    (file) =>
      statSync(resolve(MINISHOPS_DIRECTORY, file)).isDirectory() &&
      file !== 'conduct',
  )
}

export const getMinishop = async (slug: string): Promise<Minishop> => {
  const slugPath = resolve(MINISHOPS_DIRECTORY, slug)
  const postPath = resolve(slugPath, 'index.mdx')
  const rawContents = await readFile(postPath, { encoding: 'utf-8' })

  const { compiledSource, frontMatter, excerpt, mainContent } =
    await parseMdx<MinishopFrontMatter>(rawContents)
  const eventStart = frontMatter.event?.start.toISOString() ?? null
  const eventEnd = frontMatter.event?.end.toISOString() ?? null

  return {
    slug,
    mainContent,
    compiledSource,

    // excerpt should always be there because we're using `matter` with `excerpt: true`
    excerpt: excerpt as string,

    category: frontMatter.category ?? '',
    eventEnd,
    eventId: frontMatter.event?.id ?? null,
    eventStart,
    hero: frontMatter.hero
      ? `/images/minishops/${slug}/${frontMatter.hero}`
      : '',
    heroAlt: frontMatter.heroAlt ?? '',
    heroCredit: frontMatter.heroCredit ?? '',
    isUpcoming: !!eventStart && isFuture(Date.parse(eventStart)),
    level: frontMatter.level,
    shortDescription: frontMatter.shortDescription ?? '',
    tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
    title: frontMatter.title,
  }
}

interface GetMinishopsOptions {
  /**
   * How to filter the posts
   */
  filter?: {
    /**
     * Whether to exclude the given slug
     */
    excluded?: string

    /**
     * Whether to return only upcoming minishops, only remaining minishops, or all minishops
     * @default 'all'
     */
    when?: 'upcoming' | 'remaining' | 'all'
  }

  /**
   * The number of minishops to return
   */
  size?: number

  /**
   * The page of minishops to return
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

export const getMinishops = async ({
  filter = {},
  page = 1,
  size = -1,
  sortBy = 'date',
  sortOrder = 'asc',
}: GetMinishopsOptions = {}): Promise<Minishop[]> => {
  const slugs = await getAllMinishopSlugs()
  const allMinishops = await Promise.all(slugs.map(getMinishop))

  const minishops = allMinishops
    .filter((minishop) => {
      const { excluded, when = 'all' } = filter

      if (excluded === minishop.slug) {
        return false
      }

      return (
        when === 'all' ||
        (when === 'upcoming' && minishop.isUpcoming) ||
        when === 'remaining'
      )
    })
    .sort((minishopA, minishopB) => {
      const direction = sortOrder === 'asc' ? 1 : -1

      if (sortBy === 'date') {
        if (!minishopA.eventStart || !minishopB.eventStart) {
          return 0
        }

        return (
          direction *
          (Date.parse(minishopA.eventStart) > Date.parse(minishopB.eventStart)
            ? 1
            : -1)
        )
      }

      if (sortBy === 'title') {
        return direction * (minishopA.title > minishopB.title ? 1 : -1)
      }

      return 0
    })

  return paginate(minishops, page, size)
}
