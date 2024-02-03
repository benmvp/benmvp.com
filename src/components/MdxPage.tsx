import { Stack } from '@mui/material'
import Layout from './Layout'
import Seo from './Seo'
import PageHeader from './PageHeader'
import Content from './Content'
import { getUrl } from '../utils/url'

export interface Props {
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
const MdxPage = ({ compiledSource, excerpt, slug, title }: Props) => {
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

export default MdxPage
