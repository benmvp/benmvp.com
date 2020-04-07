import React from 'react'
import { Link, graphql } from 'gatsby'
import { Typography, Box } from '@material-ui/core'
import Layout from '../components/Layout'

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <Typography variant="h3" component="h1">
          All posts
        </Typography>
        <Typography variant="subtitle1" component="h4">
          {data.allMarkdownRemark.totalCount} Posts
        </Typography>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Box component="section" key={node.id}>
            <Link to={`/blog/${node.fields.slug}`}>
              <Typography variant="h4" component="h2">
                {node.frontmatter.title}{' '}
                <Typography style={{ color: '#555' }}>
                  — {node.frontmatter.date}
                </Typography>
              </Typography>
              <Typography variant="body1">{node.excerpt}</Typography>
            </Link>
          </Box>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM YYYY")
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
