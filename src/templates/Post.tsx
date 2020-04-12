import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import {
  makeStyles,
  createStyles,
  Typography,
  Box,
  Divider,
  Link,
} from '@material-ui/core'
import Layout from '../components/Layout'
import Share from '../components/Share'
import PostBio from '../components/PostBio'
import { getUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      margin: theme.spacing(0, 0, 3, 0),
    },
    content: {
      '& h2': theme.typography.h4,
      '& h3': theme.typography.h5,
      '& h4': theme.typography.h6,
      '& h5': theme.typography.h6,
      '& h6': theme.typography.h6,
      '& p': {
        ...theme.typography.body1,
        margin: theme.spacing(0, 0, 2, 0),
      },
      '& img': {
        maxWidth: '100%',
      },
      '& ul': {
        listStyle: 'circle',
        padding: theme.spacing(0, 0, 0, 3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(0, 0, 0, 4),
        },
      },
      '& li': {
        margin: theme.spacing(0, 0, 1, 0),
      },
      '& a:not(.anchor)': {
        color: theme.palette.primary.main,
      },
      '& blockquote': {
        borderLeft: `5px solid ${theme.palette.secondary.main}`,
        fontStyle: 'italic',
        margin: theme.spacing(2.5, 0, 2.5, 5),
        padding: theme.spacing(1.5),
        '& p': {
          margin: 0,
        },
      },
      '& .gatsby-highlight': {
        // code blocks
        margin: theme.spacing(0, 0, 3, 2),
      },
      '& .gatsby-resp-iframe-wrapper': {
        // iframes (video embeds)
        margin: theme.spacing(0, 0, 3, 2),
      },
      '& .twitter-tweet': {
        margin: `0 auto ${theme.spacing(2)}px auto`,
      },
    },
    footer: {
      marginTop: theme.spacing(3),
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      width: '60%',
    },
  }),
)

const Post = ({ data }) => {
  const classes = useStyles()
  const { post, bio } = data
  const { html, fields, frontmatter, excerpt, timeToRead } = post
  const { title, subTitle, date, tags, hero, heroAlt } = frontmatter
  const { slug } = fields
  const url = getUrl(`/blog${slug}`)

  return (
    <Layout>
      <Box component="header" className={classes.header}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="h5" component="h2" gutterBottom>
            {subTitle}
          </Typography>
        )}
        <Typography variant="subtitle2" component="p" gutterBottom>
          {date} · {timeToRead} min read
        </Typography>
      </Box>
      {hero && (
        <Img
          fluid={hero.childImageSharp.fluid}
          alt={heroAlt}
          className={classes.image}
        />
      )}
      <Typography
        variant="body1"
        component="article"
        dangerouslySetInnerHTML={{ __html: html }}
        className={classes.content}
      />
      <Box component="footer" className={classes.footer}>
        <Share url={url} title={title} summary={excerpt} tags={tags} />
        <Divider className={classes.divider} />
        <PostBio html={bio.html} />
        <Divider className={classes.divider} />
        <Typography align="center" variant="h6" component="p">
          <Link
            href={`https://twiter.com/search?q=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuss on Twitter
          </Link>{' '}
          //{' '}
          <Link
            href={`https://github.com/benmvp/benmvp.com/edit/master/content/posts${slug}index.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Edit post on Github
          </Link>
        </Typography>
      </Box>
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
            fluid(maxWidth: 912, traceSVG: { color: "#3f51b5" }, quality: 75) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
        heroAlt
      }
    }
    bio: markdownRemark(fields: { slug: { eq: "/bio/" } }) {
      html
    }
  }
`
