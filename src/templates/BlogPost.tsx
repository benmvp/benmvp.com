import React from 'react'
import { graphql } from 'gatsby'
import { Typography } from '@material-ui/core'
import Layout from '../components/Layout'

export default ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const { title, subTitle } = frontmatter

  return (
    <Layout>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="subtitle1" component="h2">
          {subTitle}
        </Typography>
      )}
      <Typography
        component="section"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subTitle
      }
    }
  }
`
