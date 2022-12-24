import { resolve } from 'path'
import { readFile, readdir } from 'fs-extra'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import readingTime from 'reading-time/lib/reading-time'

const POSTS_DIR = resolve(process.cwd(), 'content/posts')

export const getAllPostIds = async () => {
  const entities = await readdir(POSTS_DIR, { withFileTypes: true })

  return entities
    .filter((entity) => entity.isDirectory)
    .map((directory) => directory.name)
}

interface FrontMatter {
  category: string
  date: string
  hero: string | null
  heroAlt: string | null
  heroCredit: string | null
  shortDescription?: string
  tags: string[] | null
  title: string
}

export interface PostData extends FrontMatter {
  html: string
  excerpt?: string
  slug: string
  timeToRead: number
  wordCount: number
}

const getFrontMatter = (data: { [key: string]: any }): FrontMatter => {
  // `undefined` cannot be serialized in `getStaticProps` so we need to use `null` instead

  const {
    category,
    hero = null,
    heroAlt = null,
    heroCredit = null,
    shortDescription,
    tags = null,
    title,
  } = data

  return {
    category,

    hero: hero,
    heroAlt: heroAlt,
    heroCredit: heroCredit,
    shortDescription,
    tags: tags,
    title,
  } as FrontMatter
}

export const getPostData = async (
  slug: string,
): Promise<PostData | undefined> => {
  const postPath = resolve(POSTS_DIR, slug, 'index.md')
  const postContents = await readFile(postPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const { content, data, excerpt } = matter(postContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  // grab reading time & word info from the markdown content
  const { minutes, words } = await readingTime(content)

  // Combine the data with the id and html
  return {
    html: contentHtml,
    excerpt,
    slug,
    timeToRead: minutes,
    wordCount: words,
    ...getFrontMatter(data),
  }
}
