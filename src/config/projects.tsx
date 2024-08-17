import { ReactNode } from 'react'
import { Link } from '@mui/material'
import SITE_CONFIG from './site'

export interface Project {
  description: ReactNode
  imageUrl: string
  preLaunch?: boolean
  title: string
  url: string
}

const PROJECTS: Project[] = [
  {
    title: SITE_CONFIG.title,
    url: SITE_CONFIG.url,
    imageUrl: SITE_CONFIG.image,
    description: (
      <>
        My personal website where I include blog posts focusing on frontend
        technologies, my past and upcoming speaking engagements, videos of past
        talks and 3-hour training workshops called &ldquo;minishops&rdquo;.
        It&apos;s built with Next.js &amp; Material-UI, running on Vercel.
      </>
    ),
  },
  {
    title: 'Discover AI',
    url: 'https://github.com/benmvp/discover-ai',
    imageUrl: '/images/projects/npm-logo-red.png',
    description: (
      <>
        A proof-of-concept, versatile chat-based app that I built to let users
        explore diverse content (tech products, floor plans, and more) using
        natural language. It provides an intuitive and conversational way to
        search for information, making it easy for users to find what they want.
        The idea is that a company could use this type of AI technology to
        provide their customers with a more engaging and personalized search
        experience.
      </>
    ),
  },
  {
    title: 'NBA Player Tiers',
    url: 'https://nbaplayertiers.com/',
    imageUrl: 'https://nbaplayertiers.com/logo/wordmark-bg.png',
    description: (
      <>
        A fun app for NBA fans to rank who they believe are the top 25 players
        in the NBA. Fans can publish their &ldquo;ladders&rdquo; and share them.
        It&apos;s built with NextJS, Material-UI &amp; Firebase, running on
        Vercel.
      </>
    ),
  },
  {
    title: 'Rep Yo City',
    url: 'https://repyo.city',
    imageUrl: 'https://repyo.city/logos/wordmark.png',
    description: (
      <>
        An e-commerce store built on the{' '}
        <Link
          href="https://www.zazzle.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zazzle
        </Link>{' '}
        shopping platform to provide designs representing cities, states &amp;
        countries from around the world on shirts, mugs, hats, bags and many
        other types of products. It&apos;s built with NextJS &amp; Material-UI,
        running on Vercel.
      </>
    ),
  },
  {
    title: '@benmvp/cli',
    url: 'https://github.com/benmvp/benmvp-cli/',
    imageUrl: '/images/projects/npm-logo-red.png',
    description: (
      <>
        A highly-opinionated, zero-config CLI for consistent{' '}
        <Link
          href="https://www.jonathancreamer.com/announcing-div-ops/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &ldquo;divops&rdquo;
        </Link>{' '}
        for my Typescript-based libraries. It provides commands for testing
        (TypeScript / ESLint linting / Jest unit testing), running in dev-mode
        (with Jest in watch-mode), building into several build targets (Babel /
        TypeScript), and running integration tests.
      </>
    ),
  },
  {
    title: 'Bart Salmon',
    url: 'https://bartsalmon.benmvp.com/',
    imageUrl: '/images/projects/bart-logo.png',
    description: (
      <>
        A mobile web app to help BART riders increase their chances of finding a
        seat on the train by providing information on &ldquo;backwards
        routes&rdquo; so that they can get on the train at an earlier stop. Most
        useful in Downtown San Francisco.
      </>
    ),
  },
]

export default PROJECTS
