import React from 'react'
import { graphql } from 'gatsby'
import { Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostCard from '../components/PostCard'
import { getBlogUrl } from '../utils'

const Blog = ({ data }) => {
  const { posts } = data

  return (
    <Layout maxWidth="lg">
      <Seo
        url={getBlogUrl()}
        title="Blog"
        description="Browse through Ben Ilegbodu's blog posts to learn more about React and other frontend topics"
      />
      <Grid container spacing={2}>
        {posts.edges.map(({ node }) => (
          <Grid key={node.id} item xs={12} sm={6} lg={4}>
            <PostCard
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
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogPosts {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { published: { ne: false } }
      }
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
