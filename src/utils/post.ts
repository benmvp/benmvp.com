import { resolve } from 'path'
import { readFile, readdir } from 'fs-extra'
import matter from 'gray-matter'
import { markdownToHtml } from './markdown'
import { readingTime } from 'reading-time-estimator'

const POSTS_DIRECTORY = resolve(process.cwd(), 'src/content/posts')

export interface Post {
  date: string
  category?: string
  content: string
  excerpt: string
  hero: string
  heroAlt?: string
  heroCredit?: string
  html: string
  slug: string
  shortDescription?: string
  tags?: string[]
  timeToRead: number
  title: string
  wordCount: number
}

export const getAllPostSlugs = async () => {
  return await readdir(POSTS_DIRECTORY)
}

export const getAllPosts = async () => {
  const slugs = await getAllPostSlugs()

  return slugs.map(getPost)
}

export const getPost = async (slug: string): Promise<Post> => {
  const path = resolve(POSTS_DIRECTORY, slug, 'index.md')
  const rawContents = await readFile(path, { encoding: 'utf-8' })
  const {
    data: frontMatter,
    content,
    excerpt,
  } = matter(rawContents, { excerpt: true })
  const html = await markdownToHtml(content)
  const { words: wordCount, minutes: timeToRead } = readingTime(content)

  return {
    slug,
    content,
    excerpt: excerpt as string,
    html,

    category: frontMatter.category as string | undefined,
    date: frontMatter.date.toString() as string,
    hero: frontMatter.hero as string,
    heroAlt: frontMatter.heroAlt as string | undefined,
    heroCredit: frontMatter.heroCredit as string | undefined,
    shortDescription: frontMatter.shortDescription as string | undefined,
    tags: Array.isArray(frontMatter.tags)
      ? (frontMatter.tags as string[])
      : undefined,
    timeToRead,
    title: frontMatter.title as string,
    wordCount,
  }
}
