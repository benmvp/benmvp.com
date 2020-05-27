import React from 'react'
import { graphql } from 'gatsby'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Grid,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import MinishopCard from '../components/MinishopCard'
import SpeakCard from '../components/SpeakCard'
import PostCard from '../components/PostCard'
import VideoCard from '../components/VideoCard'
import { getUrl } from '../utils'
import { getVideos } from '../utils/video'
import { getUpcomingEngagements } from '../utils/speaking-engagement'

const UPCOMING_ENGAGEMENTS = getUpcomingEngagements().slice(0, 2)
const RECENT_VIDEOS = getVideos().slice(0, 2)

const useStyles = makeStyles((theme) =>
  createStyles({
    section: {
      marginTop: theme.spacing(3),
    },
    video: {
      margin: '0 auto',
    },
  }),
)

const MinishopCardList = ({ minishops }) => (
  <Grid container spacing={2}>
    {minishops.map(({ node }) => (
      <Grid key={node.id} item xs={12} sm={6}>
        <MinishopCard
          mode="min"
          slug={node.fields.slug}
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          summary={node.frontmatter.subTitle || node.excerpt}
          event={node.frontmatter.event}
        />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/minishops/" variant="h6">
          View all minishops >
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const SpeakCardList = () => (
  <Grid container spacing={2}>
    {UPCOMING_ENGAGEMENTS.map((speak) => (
      <Grid key={speak.id} item xs={12} md={6}>
        <SpeakCard {...speak} mode="min" />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/speak/" variant="h6">
          View all speaking engagements >
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const PostCardList = ({ posts }) => (
  <Grid container spacing={2}>
    {posts.map(({ node }) => (
      <Grid key={node.id} item xs={12} sm={6} lg={4}>
        <PostCard
          mode="min"
          slug={node.fields.slug}
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          date={node.frontmatter.date}
          summary={node.frontmatter.description || node.excerpt}
          hero={node.frontmatter.hero}
          heroAlt={node.frontmatter.heroAlt}
        />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/blog/" variant="h6">
          View all posts >
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const VideoCardList = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      {RECENT_VIDEOS.map((video) => (
        <Grid key={video.id} item xs={12} lg={6}>
          <VideoCard {...video} className={classes.video} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          width="100%"
        >
          <Link href="/videos/" variant="h6">
            View all videos >
          </Link>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ({ data }) => {
  const { upcomingMinishops, recentPosts } = data
  const classes = useStyles()

  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl()} />

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Join one of Ben's upcoming minishops"
        >
          Develop
        </Typography>
        <MinishopCardList
          minishops={upcomingMinishops.edges.filter(
            ({ node }) => node.frontmatter.event?.start,
          )}
        />
      </Box>

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Attend one of Ben's future tech talks"
        >
          Attend
        </Typography>
        <SpeakCardList />
      </Box>

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Read one of Ben's recent blog posts"
        >
          Read
        </Typography>
        <PostCardList posts={recentPosts.edges} />
      </Box>

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Watch Ben's most recent tech talk video"
        >
          Watch
        </Typography>
        <VideoCardList />
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query HomePageInfo {
    upcomingMinishops: allMarkdownRemark(
      sort: { fields: [frontmatter___event___start], order: ASC }
      filter: {
        fileAbsolutePath: { regex: "//content/minishops//" }
        frontmatter: { published: { ne: false } }
      }
      limit: 6
    ) {
      edges {
        node {
          id
          ...MinishopCardInfo
        }
      }
    }
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false } }
      }
      limit: 6
    ) {
      edges {
        node {
          id
          ...PostCardInfo
        }
      }
    }
  }
`
