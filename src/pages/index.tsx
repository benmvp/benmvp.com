import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, makeStyles, Box, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostList from '../components/PostList'
import { getUrl } from '../utils'

export default ({ data }) => {
  const { recentPosts } = data

  return (
    <Layout masthead maxWidth="lg">
      <Seo url={getUrl()} />
      <Box component="section">
        <Typography variant="h3" component="h2" gutterBottom>
          Read...
        </Typography>
        <PostList posts={recentPosts} />
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
