import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, makeStyles, Typography, Grid } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import { getMinishopUrl } from '../utils'

const PAGE_TITLE = 'Minishops'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
  }),
)

const SpeakingEngagements = ({ data }) => {
  const classes = useStyles()
  const { hero } = data

  return (
    <Layout maxWidth="lg">
      <Seo
        url={getMinishopUrl()}
        title={PAGE_TITLE}
        description="Minishops by Ben Ilegbodu are fully-remote workshops that last only 3 hours long. They're highly-focused, covering only the concepts you want to learn so that you can get on with the rest of your day."
        image={hero.childImageSharp.fluid.src}
      />
      <PageHeader
        className={classes.header}
        title={PAGE_TITLE}
        subTitle="Let's learn together without having to leave your house!"
      />
      <HeroImage
        fluid={hero.childImageSharp.fluid}
        alt="Picture of a remote working environment with a monitor with code and a mug that says 'Life begins at the end of your comfort zone'"
        credit="'Photo by [Tudor Baciu](https://unsplash.com/@baciutudor)'"
        className={classes.image}
      />
    </Layout>
  )
}

export default SpeakingEngagements

export const query = graphql`
  query MinishopsInfo {
    hero: file(
      relativePath: {
        eq: "remote-work-setup-tudor-baciu-vc3iVL_znJ8-unsplash.jpg"
      }
    ) {
      ...HeroFluid960
    }
  }
`
