import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, makeStyles, Box, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostList from '../components/PostList'
import VideoCard from '../components/VideoCard'
import { getUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    section: {
      '&:not(:first-child)': {
        marginTop: theme.spacing(3),
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
        <Typography variant="h3" component="h2" gutterBottom>
          Read...
        </Typography>
        <PostList posts={recentPosts} mode="min" />
      </Box>
      <Box component="section" className={classes.section}>
        <Typography variant="h3" component="h2" gutterBottom>
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
