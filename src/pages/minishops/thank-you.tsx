import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { parseQuery } from 'url-lib'
import { makeStyles, createStyles, Typography } from '@material-ui/core'
import Markdown from 'react-markdown'
import Layout from '../../components/Layout'
import PageHeader from '../../components/PageHeader'
import HeroImage from '../../components/HeroImage'
import Seo from '../../components/Seo'
import { getUrl } from '../../utils'
import useMinishops from '../../utils/useMinishops'

const MARKDOWN_CONTENT = `
Check your email inbox. You should've received an email from **Eventbrite** containing your registration for the minishop. If you don't receive it within the next hour (and you've checked your Spam folder), reach out to [team@benmvp.com](mailto:team@benmvp.com).

The minishop will take place as a [Zoom](https://zoom.us/) meeting, so if you don't yet have the app, please download it ahead of time. You will receive an email a few days before the minishop takes place with the Zoom link, as well as further instructions for setting up prior to the minishop.

Looking forward to learning together! 🤓
`

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

const ThankYou = ({ data }) => {
  const classes = useStyles()
  const [query, setQuery] = useState<ReturnType<typeof parseQuery>>({})

  const { hero } = data
  const title = 'Thank You!'
  const heroAlt = 'Confetti'
  const heroCredit = 'Photo by [Jason Leung](https://unsplash.com/@ninjason)'
  const url = getUrl('minishops/thank-you')

  const { upcoming: upcomingMinishops } = useMinishops()
  const { id: minishopId } = query
  const minishop = upcomingMinishops.find(({ id }) => minishopId === id)
  const minishopTitle = minishop?.frontmatter.title

  useEffect(() => {
    setQuery(parseQuery(window.location.search))
  }, [])

  useEffect(() => {
    if (minishopTitle) {
      window.gtag('event', 'purchase', {
        transaction_id: Date.now(),
        affiliation: 'Ben Ilegbodu Minishops',
        value: 100,
        currency: 'USD',
        items: [{ id: minishopId, name: minishopTitle }],
      })
    }
  }, [minishopTitle, minishopId])

  return (
    <Layout>
      <Seo
        title={title}
        url={url}
        image={hero?.childImageSharp?.fluid?.src}
        imageAlt={heroAlt}
        meta={[
          { name: 'robots', content: 'noindex' },
          { name: 'googlebot', content: 'noindex' },
        ]}
      />
      <PageHeader className={classes.header} title={title} />
      <HeroImage
        fluid={hero.childImageSharp.fluid}
        alt={heroAlt}
        credit={heroCredit}
        className={classes.image}
      />
      <Typography variant="h5" component="h2">
        Hooray! You're all set{minishopTitle ? ` for ${minishopTitle}` : ''}! 🎉
      </Typography>
      <Typography variant="body1" component="article">
        <Markdown>{MARKDOWN_CONTENT}</Markdown>
      </Typography>
    </Layout>
  )
}

export default ThankYou

export const query = graphql`
  query ThankYouPageInfo {
    hero: file(
      relativePath: { eq: "confetti-jason-leung-Xaanw0s0pMk-unsplash.jpg" }
    ) {
      ...HeroFluid960
    }
  }
`
