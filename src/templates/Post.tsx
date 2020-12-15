import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Box,
  Divider,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
import MinishopCard from '../components/MinishopCard'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'
import generateSocialImage from '../utils/generate-social-image'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(3),
    },
    footer: {
      marginTop: theme.spacing(3),
    },
  }),
)

const Post = ({ data }) => {
  const classes = useStyles()
  const { post, site } = data
  const { html, fields, frontmatter, excerpt, timeToRead, wordCount } = post
  const { title, date, dateIso, shortDescription, tags, category } = frontmatter
  const { slug } = fields
  const summary = shortDescription || excerpt
  const url = getBlogUrl(slug)
  const seoImageUrl = generateSocialImage({
    title,
    tagline: shortDescription,
  })

  return (
    <Layout showAds>
      <Seo
        title={title}
        description={summary}
        url={url}
        image={seoImageUrl}
        imageAlt={title}
        type="article"
        meta={[
          { property: 'og:article:published_time', content: dateIso },
          {
            property: 'og:article:author',
            content: site.siteMetadata.author.name,
          },
          { property: 'og:article:section', content: 'Technology' },
          ...(tags || []).map((tag) => ({
            property: 'og:article:tag',
            content: tag,
          })),
        ]}
        schemaOrg={{
          '@type': 'BlogPosting',
          headline: shortDescription,
          articleBody: html,
          author: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
          },
          datePublished: dateIso,
          publisher: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
          },
          teaches: category,
          timeRequired: `PT${timeToRead}M`,
          wordCount: wordCount.words,
        }}
      />
      <PostHeader
        className={classes.header}
        title={title}
        subTitle={shortDescription}
        timeToRead={timeToRead}
        date={date}
      />
      <Content>{html}</Content>
      <PostFooter
        className={classes.footer}
        url={url}
        slug={slug}
        title={title}
        summary={summary}
        tags={tags}
      />
    </Layout>
  )
}

export default Post

export const query = graphql`
  query PostInfo($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      wordCount {
        words
      }
      fields {
        slug
      }
      frontmatter {
        title
        shortDescription
        tags
        category
        date(formatString: "MMMM DD, YYYY")
        dateIso: date(formatString: "YYYY-MM-DD")
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
