import React from 'react'
import { Box, Typography } from '@mui/material'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import SubscribeForm from '../components/SubscribeForm'
import Share from '../components/Share'
import { getUrl } from '../utils/url'
import generateSocialImage from '../utils/generate-social-image'

const PAGE_TITLE = 'Subscribe to the BenMVP Newsletter'
const PAGE_DESCRIPTION =
  'Get notified about new web frontend development blog posts, upcoming minishops & other goodies by Ben Ilegbodu'
const PAGE_URL = getUrl('subscribe')
const SEO_IMAGE_URL = generateSocialImage({
  title: PAGE_TITLE,
  tagline: PAGE_DESCRIPTION,
})

const Subscribe = () => {
  return (
    <Layout includeSubscribe={false}>
      <Seo
        url={PAGE_URL}
        title={PAGE_TITLE}
        description={PAGE_DESCRIPTION}
        image={SEO_IMAGE_URL}
        imageAlt={PAGE_TITLE}
      />
      <Box mb={5}>
        <PageHeader title={PAGE_TITLE} />
      </Box>
      <Typography variant="body1">
        The <strong>BenMVP Newsletter</strong> is a weekly<em>-ish</em> frontend
        web development newsletter by <Link href="/about/">Ben Ilegbodu</Link>.
        😄
      </Typography>

      <Box component="ul" my={4} pl={4}>
        <Typography component="li">
          I blog a lot about JavaScript, React, TypeScript,{' '}
          <Link href="/blog/what-divops-engineer/">&quot;DivOps&quot;</Link> and
          other related web frontend technologies based on what I&apos;m
          learning or questions that I&apos;m asked.{' '}
          <strong>Get notified of my new blog posts</strong> when they are
          published.
        </Typography>
        <Typography component="li">
          I host short 3.5-hour workshops (called{' '}
          <Link href="/minishops/">minishops</Link>) on React and TypeScript.{' '}
          <strong>Find out about upcoming minishops</strong> when they are
          released to ensure you get the best price possible.
        </Typography>
        <Typography component="li">
          I <Link href="/speak/">speak</Link> at conferences &amp; meetups, join
          in on podcasts, and will do the occasional livestream.{' '}
          <strong>Stay up to date with future events and videos</strong>.
        </Typography>
      </Box>

      <Box maxWidth="500px" mx="auto" mt={4}>
        <SubscribeForm />
        <Typography variant="body2" my={4} textAlign="center">
          I will <strong>not</strong> sell your email address to spammers (or
          anyone), I promise.
        </Typography>

        <Share url={PAGE_URL} title={PAGE_TITLE} summary={PAGE_DESCRIPTION} />
      </Box>
    </Layout>
  )
}

export default Subscribe
