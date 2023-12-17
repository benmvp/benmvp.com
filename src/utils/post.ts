import { resolve } from 'path'
import { readFile, readdir } from 'fs-extra'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus/all'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

import { readingTime } from 'reading-time-estimator'

const POSTS_DIRECTORY = resolve(process.cwd(), 'src/content/posts')

interface PostFrontMatter {
  [key: string]: any

  category: string | null
  hero: string | null
  heroAlt: string | null
  heroCredit: string | null
  shortDescription: string | null
  tags: string[] | null
  title: string
}

export interface Post extends PostFrontMatter {
  /**
   * Markdown content w/o the front matter
   */
  content: string

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

export const getAllPosts = async () => {
  const slugs = await getAllPostSlugs()

  return slugs.map(getPost)
}

export const getPost = async (slug: string): Promise<Post> => {
  const slugPath = resolve(POSTS_DIRECTORY, slug)
  const postPath = resolve(slugPath, 'index.mdx')
  const rawContents = await readFile(postPath, { encoding: 'utf-8' })

  const { data, content, excerpt } = matter(rawContents, { excerpt: true })
  const frontMatter = data as PostFrontMatter
  const { compiledSource } = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        // support for GitHub Flavored Markdown (GFM)
        remarkGfm,
      ],
      rehypePlugins: [
        // highlight code blocks in HTML with Prism
        [rehypePrism, { showLineNumbers: true }],

        // add IDs to headings for linking
        rehypeSlug,

        // add links to headings
        rehypeAutolinkHeadings,
      ],
    },
  })

  const { words: wordCount, minutes: timeToRead } = readingTime(content)

  return {
    slug,
    content,
    compiledSource,
    excerpt: excerpt as string,

    // properties have to be `null` if they don't exist in order for them to be serialized to JSON with `getStaticProps`
    category: frontMatter.category ?? null,
    date: (frontMatter.date as Date).toISOString(),
    hero: frontMatter.hero ?? null,
    heroAlt: frontMatter.heroAlt ?? null,
    heroCredit: frontMatter.heroCredit ?? null,
    shortDescription: frontMatter.shortDescription ?? null,
    tags: Array.isArray(frontMatter.tags) ? frontMatter.tags : null,
    timeToRead,
    title: frontMatter.title,
    wordCount,
  }
}
