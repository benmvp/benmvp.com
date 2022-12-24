import React from 'react'
import { makeStyles, createStyles, Box, IconButton } from '@material-ui/core'
import { GitHub, LinkedIn, Twitter } from '@material-ui/icons'
import { github, linkedIn, twitter } from '../../config/site'

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

  return (
    <Box component="ul" className={classes.root} p={0} my={0}>
      <li className={classes.item}>
        <a
          href={twitter}
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
          href={github}
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
          href={linkedIn}
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
