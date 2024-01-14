import { resolve } from 'path'
import { readFile, readdir } from 'fs-extra'
import { paginate, parseMdx, sortByDate } from './data'

const POSTS_DIRECTORY = resolve(process.cwd(), 'src/content/posts')

interface PostFrontMatter {
  category: string
  date: Date
  /**
   * URL to the hero image
   */
  hero: string
  heroAlt: string
  heroCredit: string
  published: boolean
  shortDescription: string
  tags: string[]
  title: string
}

export interface Post extends Omit<PostFrontMatter, 'date'> {
  /**
   * The compiled source, generated from `next-mdx-remote/serialize`
   */
  compiledSource: string

  /**
   * The post's date
   */
  date: string

  /**
   * An excerpt from the `content`
   */
  excerpt: string

  /**
   * Markdown content w/o the front matter
   */
  mainContent: string

  /**
   * The post's slug (unique identifier)
   */
  slug: string

  /**
   * The approximate time it takes to read the post
   */
  timeToRead: number

  /**
   * The post's word count
   */
  wordCount: number
}

export const getAllPostSlugs = async () => {
  return await readdir(POSTS_DIRECTORY)
}

export const getPost = async (slug: string): Promise<Post> => {
  const slugPath = resolve(POSTS_DIRECTORY, slug)
  const postPath = resolve(slugPath, 'index.mdx')
  const rawContents = await readFile(postPath, { encoding: 'utf-8' })

  const {
    compiledSource,
    frontMatter,
    excerpt,
    mainContent,
    timeToRead,
    wordCount,
  } = await parseMdx<PostFrontMatter>(rawContents)

  return {
    slug,
    mainContent,
    compiledSource,
    excerpt: excerpt as string,

    category: frontMatter.category ?? '',
    date: frontMatter.date.toISOString(),
    hero: frontMatter.hero ? `/images/posts/${slug}/${frontMatter.hero}` : '',
    heroAlt: frontMatter.heroAlt ?? '',
    heroCredit: frontMatter.heroCredit ?? '',
    published: frontMatter.published !== false,
    shortDescription: frontMatter.shortDescription ?? '',
    tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : [],
    timeToRead,
    title: frontMatter.title,
    wordCount,
  }
}

interface GetPostsOptions {
  /**
   * How to filter the posts
   */
  filter?: {
    /**
     * Whether to return only published posts, only unpublished posts, or all posts
     * @default true
     */
    published?: boolean | 'all'
  }

  /**
   * The number of posts to return
   */
  size?: number

  /**
   * The page of posts to return
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

/**
 * Get all the posts, optionally filtered and sorted
 */
export const getPosts = async ({
  filter = {},
  page = 1,
  size = -1,
  sortBy = 'date',
  sortOrder = 'desc',
}: GetPostsOptions = {}): Promise<Post[]> => {
  const slugs = await getAllPostSlugs()
  const allPosts = await Promise.all(slugs.map(getPost))

  const posts = paginate(
    sortByDate(
      allPosts.filter((post) => {
        const { published = true } = filter

        return published === 'all' || published === post.published
      }),
      sortBy,
      sortOrder,
    ),
    page,
    size,
  )

  return posts
}
