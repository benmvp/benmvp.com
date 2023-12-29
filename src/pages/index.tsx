import { type GetStaticProps } from 'next'
import { Box, Grid, Typography } from '@mui/material'
import Seo from '../components/Seo'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { type SpeakingEngagement, getEngagements } from '../utils/engagement'
import { getUrl } from '../utils/url'
import { Video, getVideos } from '../utils/video'
import { Post, getPosts } from '../utils/post'
import Link from '../components/Link'
import VideoCard from '../components/VideoCard'
import SpeakCard from '../components/SpeakCard'

const SpeakCardList = ({
  engagements,
}: {
  engagements: SpeakingEngagement[]
}) => (
  <Grid container spacing={2}>
    {engagements.map((engagement) => (
      <Grid key={engagement.id} item xs={12} md={6}>
        <SpeakCard engagement={engagement} mode="min" />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/speak/" variant="h6">
          View all speaking engagements &gt;
        </Link>
      </Box>
    </Grid>
  </Grid>
)

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

const VideoCardList = ({ videos }: { videos: Video[] }) => {
  return (
    <Grid container spacing={2}>
      {videos.map((video) => (
        <Grid key={video.id} item xs={12} lg={6}>
          <VideoCard video={video} mode="min" sx={{ mx: 'auto' }} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          width="100%"
        >
          <Link href="/videos/" variant="h6">
            View all videos &gt;
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

interface Props {
  futureEngagements: SpeakingEngagement[]
  recentPosts: Post[]
  recentVideos: Video[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const recentPosts = await getPosts({
    size: 6,
  })
  const recentVideos = getVideos({ size: 2 })
  const futureEngagements = getEngagements({
    size: 2,
    filter: { when: 'future' },
    sortOrder: 'asc',
  })

  return {
    props: { futureEngagements, recentPosts, recentVideos },
  }
}

const HomePage = ({ futureEngagements, recentPosts, recentVideos }: Props) => {
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
        <PostCardList posts={recentPosts} />
      </Box>

      <Box component="section" mt={3}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Watch Ben's most recent tech talk video"
        >
          Watch
        </Typography>
        <VideoCardList videos={recentVideos} />
      </Box>

      {futureEngagements.length > 0 && (
        <Box component="section" mt={3}>
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            aria-label="Attend one of Ben's future tech talks"
          >
            Attend
          </Typography>
          <SpeakCardList engagements={futureEngagements} />
        </Box>
      )}
    </Layout>
  )
}

export default HomePage
