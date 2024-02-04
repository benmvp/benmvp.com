import { resolve } from 'path'
import { readdir, readFile, statSync } from 'fs-extra'
import type { GetStaticPaths, GetStaticProps } from 'next'
import { parseMdx } from './data'
import { Props } from '../components/MdxPage'

export interface Params {
  [key: string]: string
  slug: string
}

type DefaultGetStaticPaths = GetStaticPaths<Params>
type ModifiedGetStaticPathsReturnType = ReturnType<DefaultGetStaticPaths>
type ModifiedGetStaticPaths = (
  markdownDir: string,
) => ModifiedGetStaticPathsReturnType

export const getGetStaticPaths: ModifiedGetStaticPaths = async (
  markdownDir,
) => {
  const files = await readdir(markdownDir)

  const paths = files
    .filter((file) => !statSync(resolve(markdownDir, file)).isDirectory())
    .map((filePath) => ({
      params: {
        slug: filePath.replace(/\.mdx$/, ''),
      },
    }))

  return {
    paths,
    fallback: false,
  }
}

interface FrontMatter {
  title: string
}

type ModifiedGetStaticProps = (
  markdownDir: string,
  slug?: string,
) => ReturnType<GetStaticProps<Props, Params>>

export const getGetStaticProps: ModifiedGetStaticProps = async (
  markdownDir,
  slug,
) => {
  if (!slug) {
    return { notFound: true }
  }

  const rawContents = await readFile(
    resolve(markdownDir, `${slug}.mdx`),
    'utf8',
  )
  const { compiledSource, frontMatter, excerpt, mainContent } =
    await parseMdx<FrontMatter>(rawContents)

  return {
    props: {
      compiledSource,

      // excerpt should always be there because we're using `matter` with `excerpt: true`
      excerpt: excerpt as string,

      mainContent,
      slug,
      title: frontMatter.title,
    },
  }
}
