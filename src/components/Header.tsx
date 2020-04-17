import React, { ReactElement, useState } from 'react'
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
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { Link, Button, IconButton } from 'gatsby-theme-material-ui'
import logo from './logo.jpg'

const NAV_LINKS = [
  {
    to: '/speak/',
    title: 'Speak',
    label: "Check out Ben's speaking engagements",
  },
  { to: '/videos/', title: 'Videos', label: "Watch Ben's past tech talks" },
  { to: '/talks/', title: 'Talks', label: "Browse all of Ben's tech talks" },
  { to: '/blog/', title: 'Blog', label: "View Ben's blog posts" },
  { to: '/about/', title: 'About', label: 'Learn more about Ben' },
]
const MENU_BP = 'md'

interface MenuProps {
  open: boolean
  onClose: () => void
}
const Menu = ({ open, onClose }: MenuProps) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box width="250px">
      <List component="nav" aria-label="main site navigation links">
        {NAV_LINKS.map(({ to, title, label }) => (
          <ListItem
            key={title}
            component={Link}
            to={to}
            aria-label={label}
            underline="none"
          >
            <ListItemText
              primaryTypographyProps={{
                color: 'textPrimary',
                variant: 'h4',
              }}
            >
              {title}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
)

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
      justifyContent: 'space-between',

      [theme.breakpoints.up(MENU_BP)]: {
        justifyContent: 'flex-start',
      },
    },
    logo: {
      marginRight: theme.spacing(),
      width: 60,
      height: 60,
    },
    name: {
      flex: 1,
      [theme.breakpoints.up(MENU_BP)]: {
        flex: 'unset',
      },
    },
    navLinks: {
      flex: 1,
      display: 'none',

      [theme.breakpoints.up(MENU_BP)]: {
        display: 'flex',
        justifyContent: 'flex-end',
      },
    },
    navButton: {
      marginLeft: theme.spacing(1),
    },
    activeLink: {
      border: '1px solid currentcolor',
      padding: theme.spacing(1),
    },
    menuButton: {
      [theme.breakpoints.up(MENU_BP)]: {
        display: 'none',
      },
    },
  }),
)

const Header = () => {
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
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Box component="section" mx={{ xs: 1, sm: 2 }} my={1}>
            <Toolbar disableGutters className={classes.toolbar}>
              <Link color="inherit" to="/" aria-label="Go to homepage">
                <Avatar
                  src={logo}
                  alt={site.siteMetadata.title}
                  className={classes.logo}
                />
              </Link>
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
              <Box
                component="nav"
                className={classes.navLinks}
                aria-label="main site navigation links"
              >
                {NAV_LINKS.map(({ to, title, label }) => (
                  <Button
                    key={title}
                    component={GatsbyLink}
                    color="inherit"
                    to={to}
                    className={classes.navButton}
                    activeClassName={classes.activeLink}
                    partiallyActive
                    aria-label={label}
                  >
                    {title}
                  </Button>
                ))}
              </Box>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open navigation menu"
                onClick={() => {
                  setMenuIsOpen(true)
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Box>
        </AppBar>
      </HideOnScroll>
      <Menu
        open={menuIsOpen}
        onClose={() => {
          setMenuIsOpen(false)
        }}
      />
    </>
  )
}

export default Header
