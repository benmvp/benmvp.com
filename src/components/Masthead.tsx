import React from 'react'
import Img from 'gatsby-image'
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'

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
  const { masthead } = useStaticQuery(graphql`
    query MastheadInfo {
      masthead: file(relativePath: { eq: "ben-ilegbodu-masthead.jpg" }) {
        childImageSharp {
          fluid(
            maxWidth: 3000
            quality: 100
            traceSVG: { color: "#3f51b5" }
            srcSetBreakpoints: [600, 960, 1280, 1920]
          ) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)

  return (
    <Box className={classes.root}>
      <Img
        fluid={masthead.childImageSharp.fluid}
        className={classes.masthead}
        alt="A cropped image of Ben Ilegbodu speaking at a conference"
      />
      <Box className={classes.textShell}>
        <Typography component="h1" variant="inherit" className={classes.text}>
          Hi, I'm <strong>Ben Ilegbodu</strong>. I help you level up your
          frontend skills.
        </Typography>
      </Box>
    </Box>
  )
}

export default Masthead
