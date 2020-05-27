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
          ...(event
            ? [
                { property: 'event:start_time', content: event.start },
                { property: 'event:end_time', content: event.end },
              ]
            : []),
        ]}
        schemaOrg={{
          '@type': 'EducationEvent',
          eventAttendanceMode: 'OnlineEventAttendanceMode',
          educationLevel: level,
          location: {
            '@type': 'VirtualLocation',
          },
          teaches: category,
          ...(event
            ? {
                startDate: event.start,
                endDate: event.end,
              }
            : {}),
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
      {event && <MinishopRegister event={event} isTop />}
      <Content>{html}</Content>
      {event && <MinishopRegister event={event} />}
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
