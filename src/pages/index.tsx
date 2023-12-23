import { type GetStaticProps } from 'next'
import { Box, Grid, Typography } from '@mui/material'
import Seo from '../components/Seo'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { getEngagements } from '../config/speaking-engagements'
import { getUrl } from '../utils/url'
import { getVideos } from '../utils/video'
import { Post, getPosts } from '../utils/post'
import Link from '../components/Link'

const UPCOMING_ENGAGEMENTS = getEngagements()
  .future.filter(({ isCancelled }) => !isCancelled)
  .slice(0, 2)

const RECENT_VIDEOS = getVideos().slice(0, 2)

const PostCardList = ({ posts }: { posts: Post[] }) => {
  return (
    <Grid container spacing={2}>
      {posts.map((post) => (
        <Grid key={post.slug} item xs={12} sm={6} lg={4}>
          <PostCard mode="min" post={post} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          width="100%"
        >
          <Link href={getUrl('/blog/')} variant="h6">
            View all posts &gt;
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

interface Props {
  posts: Post[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPosts({
    size: 6,
  })

  return {
    props: { posts },
  }
}

const HomePage = ({ posts }: Props) => {
  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl('/', true)} />

      <Box component="section" mt={3}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Read some of Ben's recent blog posts"
        >
          Read
        </Typography>
        <PostCardList posts={posts} />
      </Box>
    </Layout>
  )
}

export default HomePage
