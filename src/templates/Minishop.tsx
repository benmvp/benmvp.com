import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles, Box } from '@material-ui/core'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Seo from '../components/Seo'
import MinishopForm from '../components/MinishopForm'
import Share from '../components/Share'
import { getMinishopUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    footer: {
      marginTop: theme.spacing(5),
    },
  }),
)

const Minishop = ({ data }) => {
  const classes = useStyles()
  const { minishop } = data
  const { html, excerpt, frontmatter, fields } = minishop
  const { title, subTitle, description, tags } = frontmatter
  const { slug } = fields
  const url = getMinishopUrl(slug)
  const fullTitle = `${title} Minishop`
  const summary = description || excerpt

  return (
    <Layout>
      <Seo title={`${fullTitle}/Workshop`} url={url} description={summary} />
      <PageHeader
        className={classes.header}
        title={fullTitle}
        subTitle={subTitle}
      />
      <Content>{html}</Content>
      <Box component="footer" className={classes.footer}>
        <Share
          url={url}
          title={`${fullTitle} by Ben Ilegbodu`}
          summary={summary}
          tags={tags}
        />
        <MinishopForm slug={slug} title={title} />
      </Box>
    </Layout>
  )
}

export default Minishop

export const query = graphql`
  query MinishopInfo($slug: String!) {
    minishop: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        description
        tags
      }
    }
  }
`
