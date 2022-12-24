import React from 'react'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Link,
} from '@material-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SubscribeForm from '../components/SubscribeForm'
import Share from '../components/Share'
import { getFullUrl } from '../utils'
import generateSocialImage from '../utils/generate-social-image'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    promise: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
      textAlign: 'center',
    },
  }),
)

const PAGE_TITLE = 'Subscribe to the BenMVP Newsletter'
const PAGE_DESCRIPTION =
  'Get notified about new web frontend development blog posts, upcoming minishops & other goodies by Ben Ilegbodu'
const PAGE_URL = getFullUrl('subscribe')
const SEO_IMAGE_URL = generateSocialImage({
  title: PAGE_TITLE,
  tagline: PAGE_DESCRIPTION,
})

const Subscribe = () => {
  const classes = useStyles()

  return (
    <Layout includeSubscribe={false}>
      <Seo
        url={PAGE_URL}
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        image={SEO_IMAGE_URL}
        imageAlt={PAGE_TITLE}
      />
      <PageHeader className={classes.header} title={PAGE_TITLE} />
      <Typography variant="body1">
        The <strong>BenMVP Newsletter</strong> is a weekly<em>-ish</em> frontend
        web development newsletter by{' '}
        <NextLink href="/about/" passHref legacyBehavior>
          <Link>Ben Ilegbodu</Link>
        </NextLink>
        . 😄
      </Typography>

      <Box component="ul" my={4} pl={4}>
        <Typography component="li">
          I blog a lot about JavaScript, React, TypeScript,{' '}
          <NextLink href="/blog/what-divops-engineer/" passHref legacyBehavior>
            <Link>&quot;DivOps&quot;</Link>
          </NextLink>{' '}
          and other related web frontend technologies based on what I'm learning
          or questions that I'm asked.{' '}
          <strong>Get notified of my new blog posts</strong> when they are
          published.
        </Typography>
        <Typography component="li">
          I host short 3.5-hour workshops (called{' '}
          <NextLink href="/minishops/" passHref legacyBehavior>
            <Link>minishops</Link>
          </NextLink>
          ) on React and TypeScript.{' '}
          <strong>Find out about upcoming minishops</strong> when they are
          released to ensure you get the best price possible.
        </Typography>
        <Typography component="li">
          I{' '}
          <NextLink href="/speak/" passHref legacyBehavior>
            <Link>speak</Link>
          </NextLink>{' '}
          at conferences &amp; meetups, join in on podcasts, and will do the
          occasional livestream.{' '}
          <strong>Stay up to date with future events and videos</strong>.
        </Typography>
      </Box>

      <Box maxWidth="500px" mx="auto" mt={4}>
        <SubscribeForm />
        <Typography variant="body2" className={classes.promise}>
          I will <strong>not</strong> sell your email address to spammers (or
          anyone), I promise.
        </Typography>

        <Share url={PAGE_URL} title={PAGE_TITLE} summary={PAGE_DESCRIPTION} />
      </Box>
    </Layout>
  )
}

export default Subscribe
