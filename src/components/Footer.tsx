import React from 'react'
import { Box, Typography, Link } from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'
import SocialIcons from './SocialIcons'

const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      p={5}
      mt={5}
    >
      <Typography variant="h4">
        Ben Ilegbodu
      </Typography>
      <SocialIcons />
      <Typography variant="subtitle2" align="center" gutterBottom>
        <GatsbyLink to="/learning-es6-series/" color="inherit">
          Learning ES6 series
        </GatsbyLink>{' '}
        |{' '}
        <GatsbyLink to="/ama/" color="inherit">
          AMA
        </GatsbyLink>
      </Typography>
      <Typography variant="body1" align="center" gutterBottom>
        © 2015-{new Date().getFullYear()}, Ben Ilegbodu. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center" gutterBottom>
        Built using{' '}
        <Link
          href="https://www.gatsbyjs.org"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          Gatsby
        </Link>{' '}
        and hosted on{' '}
        <Link
          href="https://netlify.com/"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          Netlify
        </Link>
        . The source code is hosted on{' '}
        <Link
          href="https://github.com/benmvp/benmvp.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
        >
          Github
        </Link>
        .
      </Typography>
    </Box>
  )
}

export default Footer
