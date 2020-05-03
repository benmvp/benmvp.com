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
import SpeakCard from '../components/SpeakCard'
import PostCard from '../components/PostCard'
import VideoCard, { VideoInfo } from '../components/VideoCard'
import { getUrl } from '../utils'
import VIDEOS from '../../content/pages/videos.json'

const MOST_RECENT_VIDEO = VIDEOS[0] as VideoInfo

const SpeakCardList = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} lg={4}>
      <SpeakCard
        conference="Developer Week New York 2020"
        conferenceUrl="https://www.developerweek.com/NYC/"
        location="New York City, New York"
        venue="Brooklyn Expo Center"
        talks={[
          {
            date: 'Wed, 09 December 2020',
            title: 'Future JavaScript: What’s left?',
            url: '/talks/#future-javascript-whats-left',
          },
        ]}
      />
    </Grid>
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/speak/" variant="h6">
          View all speaking engagements
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const PostCardList = ({ posts }) => (
  <Grid container spacing={2}>
    {posts.edges.map(({ node }) => (
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
          View all posts
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const useStyles = makeStyles((theme) =>
  createStyles({
    section: {
      '&:not(:first-child)': {
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.secondary,
      },
    },
    videoCard: {
      margin: '0 auto',
    },
  }),
)

export default ({ data }) => {
  const { recentPosts } = data
  const classes = useStyles()

  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl()} />

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Attend one of Ben's future tech talks"
        >
          Attend...
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
          Read...
        </Typography>
        <PostCardList posts={recentPosts} />
      </Box>

      <Box component="section" className={classes.section}>
        <Typography
          variant="h3"
          component="h2"
          gutterBottom
          aria-label="Watch Ben's most recent tech talk video"
        >
          Watch...
        </Typography>
        <VideoCard {...MOST_RECENT_VIDEO} className={classes.videoCard} />
        <Box
          display="flex"
          justifyContent={{ xs: 'center', sm: 'flex-end' }}
          mt={1}
        >
          <Link href="/videos/" variant="h6">
            View all videos
          </Link>
        </Box>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  query HomePageInfo {
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
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
