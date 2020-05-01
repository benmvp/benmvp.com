import React from 'react'
import { createStyles, makeStyles, Box } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import VideoCard, { VideoInfo } from '../components/VideoCard'
import { getUrl } from '../utils'
import VIDEOS from '../../content/pages/videos.json'

const VIDEOS_INFO = VIDEOS as VideoInfo[]
const PAGE_TITLE = 'Tech Videos'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    videoCard: {
      margin: theme.spacing(0, 'auto', 3),
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
      {VIDEOS_INFO.map((videoInfo) => (
        <Box key={videoInfo.id}>
          <VideoCard {...videoInfo} className={classes.videoCard} />
        </Box>
      ))}
    </Layout>
  )
}

export default Videos
