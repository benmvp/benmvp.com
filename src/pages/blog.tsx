import React from 'react'
import { graphql } from 'gatsby'
import { Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import PostCard from '../components/PostCard'

const Blog = ({ data }) => {
  const { posts } = data

  return (
    <Layout>
      <Grid container spacing={2}>
        {posts.edges.map(({ node }) => (
          <Grid key={node.fields.slug} item xs={12} sm={6}>
            <PostCard
              slug={node.fields.slug}
              title={node.frontmatter.title}
              tags={node.frontmatter.tags}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
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
      filter: { fileAbsolutePath: { regex: "//posts//" } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            tags
            date(formatString: "DD MMMM YYYY")
            hero {
              childImageSharp {
                fluid(
                  maxWidth: 550
                  traceSVG: { color: "#3f51b5" }
                  quality: 50
                ) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
            heroAlt
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
