import React from 'react'
import { graphql } from 'gatsby'
import { createStyles, makeStyles, Typography, Grid } from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import SpeakCard from '../components/SpeakCard'
import { getUrl } from '../utils'
import { getSpeakingEngagements } from '../utils/speaking-engagement'

const PAGE_TITLE = 'Speaking Engagements'

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
    <Layout>
      <Seo
        url={getUrl('speak')}
        title={PAGE_TITLE}
        description="Check out Ben Ilegbodu's upcoming and past speaking engagements for React and frontend web development. The links to videos and slides should help you keep up to date with the latest best practices."
        image={hero.childImageSharp.fluid.src}
      />
      <PageHeader
        className={classes.header}
        title={PAGE_TITLE}
        subTitle="Ben's upcoming and past speaking engagements"
      />
      <HeroImage
        fluid={hero.childImageSharp.fluid}
        alt="Ben Ilegbodu speaking at Reactathon 2018"
        className={classes.image}
      />
      <Typography variant="body1" gutterBottom>
        Every opportunity I get to share my knowledge and experience with others
        is a blessing! My hope is that every time I give a talk the attendees
        learn something new that will make them a better developer. If you're
        interested in having me speak to or hold a workshop with your group,{' '}
        <a href="mailto:ben@benmvp.com">shoot me an email</a>.
      </Typography>
      <Grid container spacing={2}>
        {getSpeakingEngagements().map((speak) => (
          <Grid key={speak.conference} item xs={12}>
            <SpeakCard {...speak} />
          </Grid>
        ))}
      </Grid>
    </Layout>
  )
}

export default SpeakingEngagements

export const query = graphql`
  query SpeakingInfo {
    hero: file(relativePath: { eq: "reactathon.png" }) {
      ...HeroFluid960
    }
  }
`
