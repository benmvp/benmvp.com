import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles } from '@material-ui/core'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
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
  const { html, fields, frontmatter, excerpt, timeToRead } = post
  const {
    title,
    subTitle,
    date,
    dateIso,
    description,
    tags,
    hero,
    heroAlt,
    heroCredit,
  } = frontmatter
  const { slug } = fields
  const summary = description || excerpt
  const url = getBlogUrl(slug)

  return (
    <Layout>
      <Seo
        title={title}
        description={summary}
        url={url}
        image={hero?.childImageSharp?.fluid?.src}
        type="article"
        meta={[
          { property: 'og:article:published_time', content: dateIso },
          {
            property: 'og:article:author',
            content: site.siteMetadata.author.name,
          },
          { property: 'og:author:section', content: 'Technology' },
          ...(tags || []).map((tag) => ({
            property: 'og:article:tag',
            content: tag,
          })),
        ]}
      />
      <PostHeader
        className={classes.header}
        title={title}
        subTitle={subTitle}
        timeToRead={timeToRead}
        date={date}
      />
      {hero && (
        <HeroImage
          fluid={hero.childImageSharp.fluid}
          alt={heroAlt}
          credit={heroCredit}
          className={classes.image}
        />
      )}
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
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        description
        tags
        date(formatString: "DD MMMM YYYY")
        dateIso: date(formatString: "YYYY-MM-DD")
        hero {
          ...HeroFluid960
        }
        heroAlt
        heroCredit
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
