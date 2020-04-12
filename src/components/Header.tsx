import React, { ReactElement } from 'react'
import { Link as GatsbyLink, graphql, useStaticQuery } from 'gatsby'
import {
  makeStyles,
  createStyles,
  useScrollTrigger,
  AppBar,
  Avatar,
  Slide,
  Toolbar,
  Box,
} from '@material-ui/core'
import { Link, Button } from 'gatsby-theme-material-ui'
import logo from './logo.jpg'

interface ChildrenProps {
  children: ReactElement
}

const HideOnScroll = ({ children }: ChildrenProps) => {
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    toolbar: {
      [theme.breakpoints.up('sm')]: {
        justifyContent: 'center',
      },
    },
    logo: {
      marginRight: theme.spacing(),
      width: 60,
      height: 60,
      flex: 0,
      [theme.breakpoints.up('sm')]: {
        marginRight: 0,
      },
    },
    name: {
      flex: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'inherit',
      },
    },
    navLinks: {
      flex: 1,

      display: 'flex',
      justifyContent: 'flex-end',
    },
    activeLink: {
      border: '1px solid currentcolor',
      padding: theme.spacing(1, 3),
    },
  }),
)

export default () => {
  const classes = useStyles()
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <HideOnScroll>
      <AppBar>
        <Box component="section" mx={{ xs: 1, sm: 2 }} my={1}>
          <Toolbar disableGutters className={classes.toolbar}>
            <Link
              variant="h5"
              color="inherit"
              to="/"
              underline="none"
              className={classes.name}
              aria-label="Go to homepage"
            >
              {site.siteMetadata.title}
            </Link>
            <Link color="inherit" to="/" aria-label="Go to homepage">
              <Avatar
                src={logo}
                alt={site.siteMetadata.title}
                className={classes.logo}
              />
            </Link>
            <Box component="nav" className={classes.navLinks}>
              <Button
                component={GatsbyLink}
                color="inherit"
                to="/blog/"
                activeClassName={classes.activeLink}
                partiallyActive
                aria-label="View Ben's blog posts"
              >
                Blog
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </HideOnScroll>
  )
}
