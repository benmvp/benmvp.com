import React, { Fragment } from 'react'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Link,
  Container,
} from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'

import SocialIcons from './SocialIcons'
import SubscribeForm from './SubscribeForm'

interface Props {
  includeSubscribe: boolean
  maxWidth: 'md' | 'lg'
}

const LINKS = [
  { to: '/learning-es6-series/', title: 'Learning ES6' },
  { to: '/ama/', title: 'AMA' },
  { to: '/blog/rss.xml', title: 'RSS' },
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
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas: `
          "subscribe links"
          "subscribe info"
          "subscribe finePrint"
        `,
      },
    },
    links: {
      gridArea: 'links',
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
        <Box className={classes.subscribe}>
          <SubscribeForm />
        </Box>
        <Typography variant="body1" align="center" className={classes.links}>
          {LINKS.map(({ to, title }, index) => (
            <Fragment key={to}>
              <GatsbyLink key={to} to={to} color="inherit" underline="hover">
                {title}
              </GatsbyLink>
              {index < LINKS.length - 1 ? ' | ' : ''}
            </Fragment>
          ))}
        </Typography>
        <Box className={classes.info}>
          <Typography variant="h4" className={classes.name}>
            Ben Ilegbodu
          </Typography>
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
          <Typography
            variant="caption"
            component="p"
            align="center"
            className={classes.buildInfo}
          >
            Built using{' '}
            <Link
              href="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Gatsby
            </Link>{' '}
            and hosted on{' '}
            <Link
              href="https://netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Netlify
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
