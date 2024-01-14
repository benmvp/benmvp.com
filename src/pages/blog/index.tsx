import { type GetStaticProps } from 'next'
import { Grid } from '@mui/material'
import SITE_CONFIG from '../../config/site'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import PostCard from '../../components/PostCard'
import { Post, getPosts } from '../../utils/post'
import { getPostUrl } from '../../utils/url'

interface Props {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts()

  return {
    props: { posts },
  }
}

const BlogListPage = ({ posts }: Props) => (
  <Layout maxWidth="lg">
    <Seo
      url={getPostUrl('', true)}
      title="Blog"
      description="Browse through Ben Ilegbodu's blog posts to learn more about React and other frontend topics"
      schemaOrg={{
        '@type': 'Blog',
        author: {
          '@type': 'Person',
          name: SITE_CONFIG.author,
        },
      }}
    />

    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid key={post.slug} item xs={12} sm={6} lg={4}>
          <PostCard post={post} />
        </Grid>
      ))}
    </Grid>
  </Layout>
)

export default BlogListPage
