import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles } from '@material-ui/core'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
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
  const { post } = data
  const { html, fields, frontmatter, excerpt, timeToRead } = post
  const { title, subTitle, date, tags, hero, heroAlt } = frontmatter
  const { slug } = fields
  const url = getBlogUrl(slug)

  return (
    <Layout>
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
          className={classes.image}
        />
      )}
      <Content>{html}</Content>
      <PostFooter
        className={classes.footer}
        url={url}
        slug={slug}
        title={title}
        excerpt={excerpt}
        tags={tags}
      />
    </Layout>
  )
}

export default Post

export const query = graphql`
  query($slug: String!) {
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
        tags
        date(formatString: "DD MMMM YYYY")
        hero {
          childImageSharp {
            fluid(maxWidth: 960, traceSVG: { color: "#3f51b5" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        heroAlt
      }
    }
  }
`
