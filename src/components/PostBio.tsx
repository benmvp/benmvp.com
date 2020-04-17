import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { makeStyles, Grid, Avatar } from '@material-ui/core'
import logo from './logo.jpg'

const useStyles = makeStyles({
  avatar: {
    width: 64,
    height: 64,
    margin: '0 auto',
  },
})

const PostBio = () => {
  const classes = useStyles()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author {
            name
            bio
          }
        }
      }
    }
  `)

  return (
    <Grid component="section" container spacing={2} alignItems="center">
      <Grid item xs={12} sm={2} component="aside">
        <Avatar
          src={logo}
          alt={site.siteMetadata.author.name}
          className={classes.avatar}
        />
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
