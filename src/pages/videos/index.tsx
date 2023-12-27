import { type GetStaticProps } from 'next'
import { Box, Typography } from '@mui/material'
import { getVideos, type Video } from '../../utils/video'
import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import PageHeader from '../../components/PageHeader'
import Link from '../../components/Link'
import VideoCard from '../../components/VideoCard'
import { getUrl } from '../../utils/url'

const PAGE_TITLE = 'Tech Videos'

interface Props {
  videos: Video[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const videos = getVideos()

  return {
    props: { videos },
  }
}

const VideoListPage = ({ videos }: Props) => {
  return (
    <Layout maxWidth="lg">
      <Seo
        url={getUrl('videos')}
        title={PAGE_TITLE}
        description="Watch videos of some of Ben Ilegbodu's past tech talks to keep up to date with the latest in React and frontend web development best practices."
      />

      <Box mb={5}>
        <PageHeader title={PAGE_TITLE} />
      </Box>
      <Typography variant="body1">
        I have been blessed with the opportunity to travel throughout the United
        States and all over the world to share my knowledge to help other
        developers grow in their skills. Check out some of the videos from my
        past <Link href="/speak/">speaking engagements</Link> that can help you
        level up your frontend skills.
      </Typography>

      {videos.map((video) => (
        <Box mt={3} mx="auto" key={video.id}>
          <VideoCard video={video} mode="full" />
        </Box>
      ))}
    </Layout>
  )
}

export default VideoListPage
