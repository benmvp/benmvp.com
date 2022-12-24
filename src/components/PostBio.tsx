import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'
import Image from 'next/image'
import { author, authorBio } from '../../config/site'
import benmvpLogo from '../../public/icons/benmvp-logo.png'

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
          <Image
            src={benmvpLogo}
            width={80}
            height={80}
            alt={author}
            className={classes.avatar}
          />
        </a>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        component="article"
        dangerouslySetInnerHTML={{ __html: authorBio }}
      />
    </Grid>
  )
}

export default PostBio
