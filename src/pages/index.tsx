import { useEffect } from 'react'
import { type GetStaticProps } from 'next'
import { Box, Grid, Stack, Typography } from '@mui/material'
import Seo from '../components/Seo'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'
import { type SpeakingEngagement, getEngagements } from '../utils/engagement'
import { getMinishopUrl, getPostUrl, getUrl } from '../utils/url'
import { Video, getVideos } from '../utils/video'
import { Post, getPosts } from '../utils/post'
import Link from '../components/Link'
import VideoCard from '../components/VideoCard'
import SpeakCard from '../components/SpeakCard'
import { Minishop, getMinishops } from '../utils/minishop'
import MinishopCard from '../components/MinishopCard'

const MinishopCardList = ({ minishops }: { minishops: Minishop[] }) => {
  useEffect(() => {
    if (minishops.length) {
      window.gtag?.('event', 'view_item_list', {
        items: minishops
          .filter((minishop) => minishop.isUpcoming)
          .map((minishop, index) => ({
            id: minishop.slug,
            name: minishop.title,
            list_name: 'Home',
            list_position: index + 1,
            price: 100,
          })),
      })
    }
  }, [minishops])

  return (
    <Grid container spacing={2}>
      {minishops.map((minishop) => (
        <Grid key={minishop.slug} item xs={12} lg={6}>
          <MinishopCard mode="min" minishop={minishop} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          width="100%"
        >
          <Link href={getMinishopUrl()} variant="h6" underline="hover">
            View all minishops &gt;
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

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
        <Link href={getUrl('speak')} variant="h6" underline="hover">
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
          <Link href={getPostUrl('blog')} variant="h6" underline="hover">
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
          <Link href={getUrl('videos')} variant="h6" underline="hover">
            View all videos &gt;
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

interface Props {
  minishops: Minishop[]
  recentPosts: Post[]
  recentVideos: Video[]
  upcomingEngagements: SpeakingEngagement[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const recentPosts = await getPosts({
    size: 6,
  })
  const recentVideos = getVideos({ size: 2 })
  const upcomingEngagements = getEngagements({
    size: 2,
    filter: { when: 'upcoming' },
    sortOrder: 'asc',
  })
  let minishops = await getMinishops({
    size: 4,
    filter: { when: 'upcoming' },
  })

  if (minishops.length === 0) {
    minishops = await getMinishops({
      size: 4,
      filter: { when: 'remaining' },
      sortBy: 'title',
    })
  }

  return {
    props: { minishops, upcomingEngagements, recentPosts, recentVideos },
  }
}

const HomePage = ({
  minishops,
  recentPosts,
  recentVideos,
  upcomingEngagements,
}: Props) => {
  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl('', true)} />

      <Stack spacing={3} direction="column" mt={3}>
        <Box component="section">
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

        <Box component="section">
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

        {upcomingEngagements.length > 0 && (
          <Box component="section">
            <Typography
              variant="h3"
              component="h2"
              gutterBottom
              aria-label="Attend one of Ben's upcoming tech talks"
            >
              Attend
            </Typography>
            <SpeakCardList engagements={upcomingEngagements} />
          </Box>
        )}

        <Box component="section">
          <Typography
            variant="h3"
            component="h2"
            gutterBottom
            aria-label="Join one of Ben's upcoming minishops"
          >
            Develop
          </Typography>
          <MinishopCardList minishops={minishops} />
        </Box>
      </Stack>
    </Layout>
  )
}

export default HomePage
