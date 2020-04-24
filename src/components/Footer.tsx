import React from 'react'
import {
  createStyles,
  makeStyles,
  Box,
  Typography,
  Link,
} from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'
import SocialIcons from './SocialIcons'

const LINKS = [
  { to: '/learning-es6-series/', title: 'Learning ES6 series' },
  { to: '/talks/', title: 'Tech Talks' },
  { to: '/ama/', title: 'AMA' },
  { to: '/blog/rss.xml', title: 'RSS' },
]

const useStyles = makeStyles((theme) =>
  createStyles({
    name: {
      textAlign: 'center',

      [theme.breakpoints.up('md')]: {
        textAlign: 'right',
      },
    },
    links: {
      margin: theme.spacing(3, 0),
    },
    buildInfo: {
      marginTop: theme.spacing(2),
    },
  }),
)

const Footer = () => {
  const classes = useStyles()

  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      p={5}
      mt={5}
    >
      <Typography variant="h4" className={classes.name}>
        Ben Ilegbodu
      </Typography>
      <SocialIcons />
      <Typography variant="body1" align="center" className={classes.links}>
        {LINKS.map(({ to, title }, index) => (
          <>
            <GatsbyLink key={to} to={to} color="inherit" underline="hover">
              {title}
            </GatsbyLink>
            {index < LINKS.length - 1 ? ' | ' : ''}
          </>
        ))}
      </Typography>
      <Typography variant="body2" align="center">
        © 2015 — {new Date().getFullYear()}, Ben Ilegbodu. All rights reserved.{' '}
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
  )
}

export default Footer
