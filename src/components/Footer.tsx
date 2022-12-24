import React from 'react'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Link,
  Container,
} from '@material-ui/core'
import NextLink from 'next/link'

import SocialIcons from './SocialIcons'
import SubscribeForm from './SubscribeForm'

interface Props {
  includeSubscribe: boolean
  maxWidth: 'md' | 'lg'
}

const LINKS = [
  { href: '/learning-es6-series/', title: 'Learning ES6' },
  { href: '/ama/', title: 'AMA' },
  { href: '/blog/rss.xml', title: 'RSS' },
]

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'grid',
      gridRowGap: theme.spacing(3),
      gridColumnGap: theme.spacing(2),
      justifyItems: 'center',
      gridTemplateColumns: 'auto',
      gridTemplateRows: 'auto',
      gridTemplateAreas: `
        "links"
        "info"
        "subscribe"
        "finePrint"
      `,

      [theme.breakpoints.up('sm')]: {
        gridTemplateColumns: 'auto 1fr',
        gridTemplateRows: '1fr auto 1fr',
        gridTemplateAreas: `
          "subscribe links"
          "subscribe info"
          "subscribe finePrint"
        `,
      },
    },
    links: {
      gridArea: 'links',
      alignSelf: 'flex-end',
    },
    info: {
      gridArea: 'info',
    },
    subscribe: {
      gridArea: 'subscribe',
      maxWidth: '350px',
    },
    finePrint: {
      gridArea: 'finePrint',
    },
  }),
)

const Footer = ({ includeSubscribe, maxWidth }: Props) => {
  const classes = useStyles()

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      py={5}
      mt={5}
    >
      <Container maxWidth={maxWidth} className={classes.root}>
        {includeSubscribe && (
          <Box className={classes.subscribe}>
            <SubscribeForm />
          </Box>
        )}
        <Typography variant="body1" align="center" className={classes.links}>
          {LINKS.map(({ href, title }, index) => (
            <NextLink key={href} href={href} legacyBehavior passHref>
              <Link color="inherit" underline="hover">
                {title}
              </Link>
            </NextLink>
          )).join(' | ')}
        </Typography>
        <Box className={classes.info}>
          <Typography variant="h4">Ben Ilegbodu</Typography>
          <SocialIcons />
        </Box>
        <Box className={classes.finePrint}>
          <Typography variant="body2" align="center" gutterBottom>
            © 2015 — {new Date().getFullYear()}, Ben Ilegbodu. All rights
            reserved.{' '}
            <Link
              href="https://www.biblegateway.com/passage/?search=2%20cor%205%3A17&version=NLT;NTV"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              2 Cor 5:17
            </Link>
          </Typography>
          <Typography variant="caption" component="p" align="center">
            Built using{' '}
            <Link
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Next.js
            </Link>{' '}
            and deployed to{' '}
            <Link
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Vercel
            </Link>
            . The source code is hosted on{' '}
            <Link
              href="https://github.com/benmvp/benmvp.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Github
            </Link>
            .
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default Footer
