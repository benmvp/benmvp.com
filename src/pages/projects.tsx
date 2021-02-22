import React, { ReactNode } from 'react'
import {
  Box,
  createStyles,
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Link,
} from '@material-ui/core'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'
import { getUrl } from '../utils'
import generateSocialImage from '../utils/generate-social-image'
import SITE_CONFIG from '../../config/site'

const PROJECTS = [
  {
    title: SITE_CONFIG.siteTitle,
    url: SITE_CONFIG.siteUrl,
    imageUrl: SITE_CONFIG.siteImage,
    description: (
      <>
        My personal website where I include blog posts focusing on frontend
        technologies, my past and upcoming speaking engagements, videos of past
        talks and 3-hour training workshops called "minishops". It's built with{' '}
        Gatsby &amp; Material-UI, running on Netlify.
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
        other types of products. It's built with NextJS &amp; Material-UI,
        running on Vercel.
      </>
    ),
  },
  {
    title: 'NBA Player Tiers',
    url: 'https://player-tiers.vercel.app/',
    imageUrl: '/projects/nba-logo.jpg',
    preLaunch: true,
    description: (
      <>
        A fun app for NBA fans to rank who they believe are the top 25 players
        in the NBA. It's built with NextJS, Material-UI &amp; Firebase, running
        on Vercel.
      </>
    ),
  },
  {
    title: '@benmvp/cli',
    url: 'https://github.com/benmvp/benmvp-cli/',
    imageUrl: '/projects/npm-logo-red.png',
    description: (
      <>
        A highly-opinionated, zero-config CLI for consistent{' '}
        <Link
          href="https://www.jonathancreamer.com/announcing-div-ops/"
          target="_blank"
          rel="noopener noreferrer"
        >
          "divops"
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
    imageUrl: '/projects/bart-logo.png',
    description: (
      <>
        A mobile web app to help BART riders increase their chances of finding a
        seat on the train by providing information on "backwards routes" so that
        they can get on the train at an earlier stop. Most useful in Downtown
        San Francisco.
      </>
    ),
  },
]

const useStyles = makeStyles(({ breakpoints }) =>
  createStyles({
    layout: {
      display: 'flex',
      flexDirection: 'column',

      [breakpoints.up('sm')]: {
        flexDirection: 'row',
      },
    },
    imageLink: {
      [breakpoints.up('sm')]: {
        maxWidth: 250,
      },
    },
    image: {
      objectFit: 'contain',

      [breakpoints.up('sm')]: {
        height: '100%',
      },
    },
  }),
)

interface ProjectCardProps {
  description: ReactNode
  imageUrl: string
  preLaunch?: boolean
  title: string
  url: string
}

const ProjectCard = ({
  description,
  imageUrl,
  preLaunch = false,
  title,
  url,
}: ProjectCardProps) => {
  const classes = useStyles()

  return (
    <Card component="section" className={classes.layout}>
      <CardActionArea component="a" href={url} className={classes.imageLink}>
        <CardMedia
          className={classes.image}
          component="img"
          image={imageUrl}
          title={title}
        />
      </CardActionArea>
      <Box flex="1">
        <CardContent>
          <Typography component="h1" variant="h4">
            <Link href={url}>{title}</Link>
            {preLaunch && (
              <Typography component="span" variant="h6">
                {' '}
                (pre launch)
              </Typography>
            )}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  )
}

const SEO_PAGE_TITLE = 'Dev Projects by Ben'
const SEO_PAGE_DESCRIPTION =
  "Check out Ben Ilegbodu's active and past web frontend development projects"
const SEO_IMAGE_URL = generateSocialImage({
  title: SEO_PAGE_TITLE,
  tagline: SEO_PAGE_DESCRIPTION,
})

const Projects = () => {
  return (
    <Layout>
      <Seo
        url={getUrl('projects')}
        title="Dev Projects"
        description={SEO_PAGE_DESCRIPTION}
        image={SEO_IMAGE_URL}
        imageAlt={SEO_PAGE_TITLE}
      />
      <PageHeader
        title="Dev Projects"
        subTitle="Ben's active and past development projects"
      />

      {PROJECTS.map((project) => (
        <>
          <Box my={4}>
            <ProjectCard key={project.title} {...project} />
          </Box>
        </>
      ))}
    </Layout>
  )
}

export default Projects
