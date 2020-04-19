import React from 'react'
import { makeStyles, createStyles, Box } from '@material-ui/core'
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons'
import { IconButton } from 'gatsby-theme-material-ui'
import { graphql, useStaticQuery } from 'gatsby'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',

      [theme.breakpoints.up('md')]: {
        justifyContent: 'flex-end',
      },
    },
    item: {
      listStyle: 'none',
    },
  }),
)

const SocialIcons = () => {
  const classes = useStyles()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          social {
            twitter
            github
            linkedIn
          }
        }
      }
    }
  `)

  return (
    <Box component="ul" className={classes.root} p={0} my={0}>
      <li className={classes.item}>
        <a
          href={site.siteMetadata.social.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Ben on Twitter"
        >
          <IconButton color="secondary" aria-label="Ben's Twitter profile">
            <Twitter fontSize="large" />
          </IconButton>
        </a>
      </li>
      <li className={classes.item}>
        <a
          href={site.siteMetadata.social.github}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Ben's Github profile"
        >
          <IconButton color="secondary" aria-label="Ben's Github profile">
            <GitHub fontSize="large" />
          </IconButton>
        </a>
      </li>
      <li className={classes.item}>
        <a
          href={site.siteMetadata.social.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Ben's LinkedIn resume"
        >
          <IconButton color="secondary" aria-label="Ben's LinkedIn profile">
            <LinkedIn fontSize="large" />
          </IconButton>
        </a>
      </li>
    </Box>
  )
}

export default SocialIcons
