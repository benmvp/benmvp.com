import React from 'react'
import { createStyles, makeStyles, Box, Typography } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import VideoCard from '../components/VideoCard'
import { getUrl } from '../utils'
import { getVideos } from '../utils/video'

const PAGE_TITLE = 'Tech Videos'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    videoCard: {
      margin: theme.spacing(3, 'auto', 0),
    },
  }),
)

const Videos = () => {
  const classes = useStyles()

  return (
    <Layout>
      <Seo
        url={getUrl('videos')}
        title={PAGE_TITLE}
        description="Watch videos of some of Ben Ilegbodu's past tech talks to keep up to date with the latest in React and frontend web development best practices."
      />
      <PageHeader className={classes.header} title={PAGE_TITLE} />
      <Typography variant="body1">
        I have been blessed with the opportunity to travel throughout the United
        States and all over the world to share my knowledge to help other
        developers grow in their skills. Check out some of the videos from my
        past{' '}
        <GatsbyLink href={getUrl('/speak/')}>speaking engagements</GatsbyLink>{' '}
        that can help you level up your frontend skills.
      </Typography>
      {getVideos().map((video) => (
        <Box key={video.id}>
          <VideoCard {...video} className={classes.videoCard} />
        </Box>
      ))}
    </Layout>
  )
}

export default Videos
