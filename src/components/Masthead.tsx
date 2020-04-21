import React from 'react'
import Img, { FluidObject } from 'gatsby-image'
import { makeStyles, createStyles } from '@material-ui/core'
import { graphql, useStaticQuery } from 'gatsby'

const useStyles = makeStyles((theme) =>
  createStyles({
    wrapper: {
      maxHeight: 300,

      [theme.breakpoints.up('sm')]: {
        maxHeight: 450,
      },
      [theme.breakpoints.up('md')]: {
        maxHeight: 'inherit',
        height: 'calc(100vh - 82px)',
      },
    },
  }),
)

const Masthead = () => {
  const classes = useStyles()
  const { masthead } = useStaticQuery(graphql`
    query MastheadInfo {
      masthead: file(relativePath: { eq: "masthead.jpg" }) {
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
    <Img fluid={masthead.childImageSharp.fluid} className={classes.wrapper} />
  )
}

export default Masthead
