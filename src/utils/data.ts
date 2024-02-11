import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus/all'
import rehypeSlug from 'rehype-slug'
import { readingTime } from 'reading-time-estimator'

interface Item {
  date: string
  title: string
}

export const sortByDate = <I extends Item>(
  items: I[],
  sortBy = 'date',
  sortOrder = 'desc',
): I[] =>
  items.sort((itemA, itemB) => {
    const direction = sortOrder === 'asc' ? 1 : -1

    if (sortBy === 'date') {
      return (
        direction * (Date.parse(itemA.date) > Date.parse(itemB.date) ? 1 : -1)
      )
    }

    if (sortBy === 'title') {
      return direction * (itemA.title > itemB.title ? 1 : -1)
    }

    return 0
  })

export const paginate = <T>(items: T[], page = 1, size = -1): T[] => {
  const pageIndex = page - 1
  const displaySize = size === -1 ? items.length : size

  return items.slice(pageIndex * displaySize, (pageIndex + 1) * displaySize)
}

export const parseMdx = async <FrontMatter>(rawContents: string) => {
  const {
    data,
    content: mainContent,
    excerpt,
  } = matter(rawContents, { excerpt: true })
  const frontMatter = data as FrontMatter
  const { compiledSource } = await serialize(mainContent, {
    mdxOptions: {
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
  const { words: wordCount, minutes: timeToRead } = readingTime(mainContent)

  return {
    compiledSource,
    frontMatter,
    excerpt,
    mainContent,
    timeToRead,
    wordCount,
  }
}
