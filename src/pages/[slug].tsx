import { resolve } from 'path'
import { readdir, readFile, statSync } from 'fs-extra'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Stack } from '@mui/material'
import { parseMdx } from '../utils/data'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import { getUrl } from '../utils/url'

const PAGES_DIRECTORY = resolve(process.cwd(), 'src/content/pages')

interface Params {
  [key: string]: string
  slug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const files = await readdir(PAGES_DIRECTORY)

  const paths = files
    .filter((file) => !statSync(resolve(PAGES_DIRECTORY, file)).isDirectory())
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

interface Props {
  /**
   * The compiled source, generated from `next-mdx-remote/serialize`
   */
  compiledSource: string

  /**
   * An excerpt from the `content`
   */
  excerpt: string

  /**
   * Markdown content w/o the front matter
   */
  mainContent: string

  /**
   * The page slug
   */
  slug: string

  /**
   * The page title
   */
  title: string
}

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context,
) => {
  const slug = context!.params?.slug

  if (!slug) {
    return { notFound: true }
  }

  const rawContents = await readFile(
    resolve(PAGES_DIRECTORY, `${slug}.mdx`),
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

const Page = ({ compiledSource, excerpt, slug, title }: Props) => {
  return (
    <Layout>
      <Seo title={title} url={getUrl(slug, true)} description={excerpt} />

      <Stack spacing={5} direction="column">
        <PageHeader title={title} />
        <Content compiledSource={compiledSource} slug={slug} type="page" />
      </Stack>
    </Layout>
  )
}

export default Page
