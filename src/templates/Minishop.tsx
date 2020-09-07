import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import { isFuture } from 'date-fns'
import {
  makeStyles,
  createStyles,
  Box,
  Grid,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import Seo from '../components/Seo'
import MinishopRegister from '../components/MinishopRegister'
import MinishopForm from '../components/MinishopForm'
import Share from '../components/Share'
import MinishopCard from '../components/MinishopCard'
import MinishopTestimonials from '../components/MinishopTestimonials'
import { getUrl, getMinishopUrl } from '../utils'
import useMinishops from '../utils/useMinishops'

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
    minishops: {
      marginTop: theme.spacing(5),
    },
    minishopsGrid: {
      marginTop: theme.spacing(2),
    },
  }),
)

const Minishop = ({ data }) => {
  const classes = useStyles()
  const { minishop, site } = data
  const { id, html, excerpt, frontmatter, fields } = minishop
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
  const {
    upcoming: upcomingMinishops,
    remaining: remainingMinishops,
  } = useMinishops(id)
  const otherMinishops = upcomingMinishops.length
    ? upcomingMinishops
    : remainingMinishops
  const url = getMinishopUrl(slug)
  const fullTitle = `${title} Minishop`
  const summary = subTitle || excerpt
  const isUpcomingEvent = event?.start
    ? isFuture(Date.parse(event.start))
    : false

  useEffect(() => {
    if (isUpcomingEvent) {
      window.gtag?.('event', 'view_item', {
        items: [{ id: event.id, name: title, price: 100 }],
      })
    }
  }, [event.id, isUpcomingEvent, title])

  useEffect(() => {
    if (upcomingMinishops.length) {
      window.gtag?.('event', 'view_item_list', {
        items: upcomingMinishops.map((node, index) => ({
          id: node.frontmatter.event?.id,
          name: node.frontmatter.title,
          list_name: 'Other Minishops',
          list_position: index + 1,
          price: 100,
        })),
      })
    }
  }, [upcomingMinishops])

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
          name: fullTitle,
          eventAttendanceMode: 'OnlineEventAttendanceMode',
          educationLevel: level,
          location: {
            '@type': 'VirtualLocation',
            url,
          },
          organizer: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
            url: getUrl(),
          },
          teaches: category,
          ...(event
            ? {
                startDate: event.start,
                endDate: event.end,
                eventStatus: 'EventScheduled',
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
      {isUpcomingEvent && (
        <MinishopRegister event={event} id={id} title={title} isTop />
      )}
      <Content>{html}</Content>
      <MinishopTestimonials slug={slug} title={title} />
      {isUpcomingEvent && (
        <MinishopRegister event={event} id={id} title={title} />
      )}
      <Box component="footer" className={classes.footer}>
        <Share
          url={url}
          title={`${fullTitle} by Ben Ilegbodu`}
          summary={summary}
          tags={tags}
          type="minishop"
        />
        {!isUpcomingEvent && <MinishopForm slug={slug} title={title} />}
        {!!otherMinishops.length && (
          <Box component="section" className={classes.minishops}>
            <Typography component="h3" variant="h5">
              Other upcoming minishops
            </Typography>
            <Grid container spacing={2} className={classes.minishopsGrid}>
              {otherMinishops.map((node) => (
                <Grid key={node.id} item xs={12}>
                  <MinishopCard
                    mode="min"
                    slug={node.fields.slug}
                    title={node.frontmatter.title}
                    tags={node.frontmatter.tags}
                    summary={node.frontmatter.subTitle || node.excerpt}
                    event={node.frontmatter.event}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent={{ xs: 'center', sm: 'flex-end' }}
                  width="100%"
                >
                  <Link href="/minishops/" variant="h6">
                    View all minishops &gt;
                  </Link>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default Minishop

export const query = graphql`
  query MinishopInfo($slug: String!) {
    minishop: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
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
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
