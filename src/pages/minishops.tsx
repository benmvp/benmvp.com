import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, makeStyles, Typography, Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import MinishopCard from '../components/MinishopCard'
import { getMinishopUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    grid: {
      marginTop: theme.spacing(3),
    },
  }),
)

const SpeakingEngagements = ({ data }) => {
  const classes = useStyles()
  const { hero, minishops } = data
  console.log({ minishops })
  return (
    <Layout>
      <Seo
        url={getMinishopUrl()}
        title="Minishops"
        description="Minishops by Ben Ilegbodu are fully-remote workshops that last only 3 hours long. They're highly-focused, covering only the concepts you want to learn so that you can level up your skills and get on with the rest of your day."
        image={hero.childImageSharp.fluid.src}
      />
      <PageHeader
        className={classes.header}
        title="Minishops with Ben"
        subTitle="Let's learn together without having to leave your house! Use remote minishops by Ben Ilegbodu to level up your JavaScript, React and frontend skills."
      />
      <HeroImage
        fluid={hero.childImageSharp.fluid}
        alt="Picture of a remote working environment with a monitor with code and a mug that says 'Life begins at the end of your comfort zone'"
        credit="Photo by [Tudor Baciu](https://unsplash.com/@baciutudor)"
        className={classes.image}
      />
      <Typography component="h3" variant="h4">
        Available Minishops
      </Typography>
      <Grid container spacing={2} className={classes.grid}>
        {minishops.edges.map(({ node }) => (
          <Grid key={node.id} item xs={12} sm={6}>
            <MinishopCard
              slug={node.fields.slug}
              title={node.frontmatter.title}
              tags={node.frontmatter.tags}
              summary={node.frontmatter.subTitle || node.excerpt}
            />
          </Grid>
        ))}
      </Grid>
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
    minishops: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "//content/minishops//" }
        frontmatter: { published: { ne: false } }
      }
    ) {
      edges {
        node {
          id
          ...PostCardInfo
        }
      }
    }
  }
`
