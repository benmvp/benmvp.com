import React from 'react'
import { graphql } from 'gatsby'
import {
  createStyles,
  makeStyles,
  Typography,
  Grid,
  Divider,
} from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import MinishopCard from '../components/MinishopCard'
import { getMinishopUrl } from '../utils'
import useMinishops from '../utils/useMinishops'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    description: {
      marginBottom: theme.spacing(3),
    },
    grid: {
      marginTop: theme.spacing(3),
    },
    divider: {
      margin: theme.spacing(5, 'auto'),
      width: '50%',
    },
  }),
)

const Minishops = ({ data }) => {
  const classes = useStyles()
  const { upcoming, remaining } = useMinishops()
  const { hero } = data

  return (
    <Layout>
      <Seo
        url={getMinishopUrl()}
        title="Remote Minishops"
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
      <Typography variant="body1" className={classes.description}>
        Minishops by Ben Ilegbodu are fully-remote workshops that last about 3
        hours. They’re highly-focused, covering only the concepts you want to
        learn so that you can level up your skills and get on with the rest of
        your day.
      </Typography>
      {upcoming.length && (
        <>
          <Typography component="h3" variant="h4">
            Upcoming Minishops
          </Typography>
          <Grid container spacing={2} className={classes.grid}>
            {upcoming.map((node) => (
              <Grid key={node.id} item xs={12}>
                <MinishopCard
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  tags={node.frontmatter.tags}
                  summary={node.frontmatter.subTitle || node.excerpt}
                  event={node.frontmatter.event}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {upcoming.length && remaining && <Divider className={classes.divider} />}
      {remaining.length && (
        <>
          <Typography component="h3" variant="h4">
            {upcoming.length ? 'Remaining' : 'All'} Minishops
          </Typography>
          <Grid container spacing={2} className={classes.grid}>
            {remaining.map((node) => (
              <Grid key={node.id} item xs={12} sm={6}>
                <MinishopCard
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  tags={node.frontmatter.tags}
                  summary={node.frontmatter.subTitle || node.excerpt}
                  event={node.frontmatter.event}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Layout>
  )
}

export default Minishops

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
