import React from 'react'
import { graphql } from 'gatsby'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Grid,
} from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import SpeakCard from '../components/SpeakCard'
import PostCard from '../components/PostCard'
import VideoCard from '../components/VideoCard'
import { getUrl } from '../utils'

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
        <VideoCard
          conference="JSConf Hawai’i 2020"
          date="05 February 2020"
          id="kQ4r9OATmB0"
          provider="youtube"
          title="The “perfect” library tooling"
          url="/speak/#jsconf-hawaii-2020"
          className={classes.videoCard}
        />
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
