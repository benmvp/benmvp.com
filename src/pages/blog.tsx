import React from 'react'
import { graphql } from 'gatsby'
import { Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PostCard from '../components/PostCard'
import { getBlogUrl } from '../utils'

const Blog = ({ data }) => {
  const { posts, site } = data

  return (
    <Layout maxWidth="lg">
      <Seo
        url={getBlogUrl()}
        title="Blog"
        description="Browse through Ben Ilegbodu's blog posts to learn more about React and other frontend topics"
        schemaOrg={{
          '@type': 'Blog',
          author: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
          },
        }}
      />
      <Grid container spacing={2}>
        {posts.edges.map(({ node }) => (
          <Grid key={node.id} item xs={12} sm={6} lg={4}>
            <PostCard
              slug={node.fields.slug}
              title={node.frontmatter.title}
              tags={node.frontmatter.tags}
              date={node.frontmatter.date}
              summary={node.frontmatter.shortDescription || node.excerpt}
              hero={node.frontmatter.hero}
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
        fileAbsolutePath: { regex: "//content/posts//" }
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
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
