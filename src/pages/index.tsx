import { Box, Typography } from '@mui/material'
import Seo from '../components/Seo'
import { getEngagements } from '../config/speaking-engagements'
import { getUrl } from '../utils/url'
import { getVideos } from '../utils/video'
import Layout from '../components/Layout'

const UPCOMING_ENGAGEMENTS = getEngagements()
  .future.filter(({ isCancelled }) => !isCancelled)
  .slice(0, 2)

const RECENT_VIDEOS = getVideos().slice(0, 2)

const HomePage = () => {
  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl()} />

      <Box component="section">
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Read some of Ben's recent blog posts"
        >
          Read
        </Typography>
      </Box>
    </Layout>
  )
}

export default HomePage
