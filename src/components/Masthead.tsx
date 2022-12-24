import React from 'react'
import Image from 'next/image'
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core'
import masthead from '../../public/ben-ilegbodu.png'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    masthead: {
      maxHeight: 300,

      [theme.breakpoints.up('sm')]: {
        maxHeight: 450,
      },
      [theme.breakpoints.up('md')]: {
        maxHeight: 'inherit',
        height: 'calc(100vh - 82px)',
      },
    },
    textShell: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
    text: {
      color: theme.palette.primary.contrastText,

      marginLeft: theme.spacing(1),
      ...theme.typography.h6,

      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(2),
        ...theme.typography.h4,
      },

      [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(3),
        ...theme.typography.h3,
      },

      [theme.breakpoints.up('lg')]: {
        marginLeft: theme.spacing(4),
        ...theme.typography.h2,
      },
    },
  }),
)

const Masthead = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Image
        src={masthead}
        objectFit="cover"
        sizes="(max-width: 600px) 600px, (max-width: 960px) 960px, (max-width: 1280px) 1280px, (max-width: 1920px) 1920, 3000"
        quality={100}
        className={classes.masthead}
        alt="A cropped image of Ben Ilegbodu speaking at a conference"
      />
      <Box className={classes.textShell}>
        <Typography component="h1" variant="inherit" className={classes.text}>
          Hi, I'm <strong>Ben Ilegbodu</strong>. I want to help you level up
          your frontend skills.
        </Typography>
      </Box>
    </Box>
  )
}

export default Masthead
