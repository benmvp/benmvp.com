import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles, Grid } from '@material-ui/core'
import Img from 'gatsby-image'

const useStyles = makeStyles({
  avatarShell: {
    textAlign: 'center',
  },
  avatar: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    margin: '0 auto',
  },
})

const PostBio = () => {
  const classes = useStyles()
  const { site, logo } = useStaticQuery(graphql`
    query PostSiteInfo {
      site {
        siteMetadata {
          author {
            name
            bio
          }
        }
      }
      logo: file(relativePath: { eq: "benmvp-logo.png" }) {
        childImageSharp {
          fixed(width: 80, height: 80) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Grid component="section" container spacing={2} alignItems="center">
      <Grid
        item
        xs={12}
        sm={2}
        component="aside"
        className={classes.avatarShell}
      >
        <a
          href="https://twitter.com/benmvp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Img
            fixed={logo.childImageSharp.fixed}
            alt={site.siteMetadata.author.name}
            className={classes.avatar}
          />
        </a>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        component="article"
        dangerouslySetInnerHTML={{ __html: site.siteMetadata.author.bio }}
      />
    </Grid>
  )
}

export default PostBio
