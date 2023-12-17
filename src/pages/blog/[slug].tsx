import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { type Post, getAllPostSlugs, getPost } from '../../utils/post'
import Layout from '../../components/Layout'
import { Box, Stack } from '@mui/material'
import PostHeader from '../../components/PostHeader'
import Seo from '../../components/Seo'
import { getBlogUrl } from '../../utils/url'
import generateSocialImage from '../../utils/generate-social-image'
import SITE_CONFIG from '../../config/site'
import PostFooter from '../../components/PostFooter'
import Content from '../../components/Content'

interface Props {
  post: Post
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getAllPostSlugs()
  const paths = slugs.map((slug) => ({
    params: { slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : undefined
  const post = slug ? await getPost(slug) : undefined

  if (!post) {
    return { notFound: true }
  }

  return {
    props: { post },
  }
}

const BlogPage: NextPage<Props> = ({ post }) => {
  const {
    category,
    compiledSource,
    date,
    excerpt,
    shortDescription,
    slug,
    tags,
    timeToRead,
    title,
    wordCount,
  } = post
  const summary = shortDescription || excerpt
  const url = getBlogUrl(slug)
  const seoImageUrl = generateSocialImage({
    title,
    tagline: shortDescription,
    date,
  })

  return (
    <Layout showAds includeSubscribe={false}>
      <Seo
        title={title}
        description={summary}
        url={url}
        image={seoImageUrl}
        imageAlt={title}
        type="article"
        meta={[
          { property: 'og:article:published_time', content: date },
          {
            property: 'og:article:author',
            content: SITE_CONFIG.author,
          },
          { property: 'og:article:section', content: 'Technology' },
          ...(tags || []).map((tag) => ({
            property: 'og:article:tag',
            content: tag,
          })),
        ]}
        schemaOrg={{
          '@type': 'BlogPosting',
          headline: shortDescription,
          articleBody: compiledSource,
          author: {
            '@type': 'Person',
            name: SITE_CONFIG.author,
          },
          datePublished: date,
          publisher: {
            '@type': 'Person',
            name: SITE_CONFIG.author,
          },
          teaches: category,
          timeRequired: `PT${timeToRead}M`,
          wordCount: wordCount,
        }}
      />
      <Stack direction="column" spacing={3}>
        <PostHeader
          title={title}
          subTitle={shortDescription}
          timeToRead={timeToRead}
          date={date}
        />

        <Content compiledSource={compiledSource} slug={slug} />
        <PostFooter
          url={url}
          slug={slug}
          title={title}
          summary={summary}
          tags={tags}
        />
      </Stack>
    </Layout>
  )
}

export default BlogPage
