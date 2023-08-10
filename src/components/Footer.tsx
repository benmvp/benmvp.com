import React, { Fragment } from 'react'
import {
  Box,
  Typography,
  Link as ExternalLink,
  Container,
  styled,
} from '@mui/material'
import Link from './Link'

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

const Root = styled(Container)(({ theme }) => ({
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
}))

const Footer = ({ includeSubscribe, maxWidth }: Props) => {
  return (
    <Box
      component="footer"
      bgcolor="primary.main"
      color="primary.contrastText"
      py={5}
      mt={5}
    >
      <Root maxWidth={maxWidth}>
        {includeSubscribe && (
          <Box gridArea="subscribe" maxWidth="350px">
            <SubscribeForm />
          </Box>
        )}
        <Typography
          variant="body1"
          align="center"
          gridArea="links"
          alignSelf="flex-end"
        >
          {LINKS.map(({ href, title }, index) => (
            <Fragment key={href}>
              <Link href={href} color="inherit" underline="hover">
                {title}
              </Link>
              {index < LINKS.length - 1 ? ' | ' : ''}
            </Fragment>
          ))}
        </Typography>
        <Box gridArea="info">
          <Typography variant="h4">Ben Ilegbodu</Typography>
          <SocialIcons />
        </Box>
        <Box gridArea="finePrint">
          <Typography variant="body2" align="center" gutterBottom>
            © 2015 — {new Date().getFullYear()}, Ben Ilegbodu. All rights
            reserved.{' '}
            <ExternalLink
              href="https://www.biblegateway.com/passage/?search=2%20cor%205%3A17&version=NLT;NTV"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
            >
              2 Cor 5:17
            </ExternalLink>
          </Typography>
          <Typography variant="caption" component="p" align="center">
            Built using{' '}
            <ExternalLink
              href="https://nextjs.org/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Next.js
            </ExternalLink>{' '}
            and deployed to{' '}
            <ExternalLink
              href="https://vercel.com/"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Vercel
            </ExternalLink>
            . The source code is hosted on{' '}
            <ExternalLink
              href="https://github.com/benmvp/benmvp.com"
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="always"
            >
              Github
            </ExternalLink>
            .
          </Typography>
        </Box>
      </Root>
    </Box>
  )
}

export default Footer
