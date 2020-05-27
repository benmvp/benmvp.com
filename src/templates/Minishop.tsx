import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles, Box } from '@material-ui/core'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import Seo from '../components/Seo'
import MinishopRegister from '../components/MinishopRegister'
import MinishopForm from '../components/MinishopForm'
import Share from '../components/Share'
import { getMinishopUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    footer: {
      marginTop: theme.spacing(5),
    },
  }),
)

const Minishop = ({ data }) => {
  const classes = useStyles()
  const { minishop } = data
  const { html, excerpt, frontmatter, fields } = minishop
  const {
    title,
    subTitle,
    category,
    level,
    tags,
    hero,
    heroAlt,
    heroCredit,
    event,
  } = frontmatter
  const { slug } = fields
  const url = getMinishopUrl(slug)
  const fullTitle = `${title} Minishop`
  const summary = subTitle || excerpt

  return (
    <Layout>
      <Seo
        title={`${fullTitle}/Workshop`}
        url={url}
        description={summary}
        image={hero?.childImageSharp?.fluid?.src}
        imageAlt={heroAlt}
        type="events.event"
        meta={[
          { property: 'event:start_time', content: event.startDateTime },
          { property: 'event:end_time', content: event.endDateTime },
        ]}
        schemaOrg={{
          '@type': 'EducationEvent',
          eventAttendanceMode: 'OnlineEventAttendanceMode',
          educationLevel: level,
          location: {
            '@type': 'VirtualLocation',
          },
          startDate: event.startDateTime,
          endDate: event.endDateTime,
          teaches: category,
        }}
      />
      <PageHeader
        className={classes.header}
        title={fullTitle}
        subTitle={subTitle}
      />
      {hero && (
        <HeroImage
          fluid={hero.childImageSharp.fluid}
          alt={heroAlt}
          credit={heroCredit}
          className={classes.image}
        />
      )}
      <MinishopRegister event={event} isTop />
      <Content>{html}</Content>
      <MinishopRegister event={event} />
      <Box component="footer" className={classes.footer}>
        <Share
          url={url}
          title={`${fullTitle} by Ben Ilegbodu`}
          summary={summary}
          tags={tags}
        />
        {!event && <MinishopForm slug={slug} title={title} />}
      </Box>
    </Layout>
  )
}

export default Minishop

export const query = graphql`
  query MinishopInfo($slug: String!) {
    minishop: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        category
        level
        tags
        hero {
          ...HeroFluid960
        }
        heroAlt
        heroCredit
        event {
          id
          start
        }
      }
    }
  }
`
