import React from 'react'
import { graphql } from 'gatsby'
import { Box, Typography } from '@material-ui/core'

export default ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const { title, subTitle } = frontmatter

  return (
    <Box component="main">
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
    </Box>
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
