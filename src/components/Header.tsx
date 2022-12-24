import React, { ReactElement, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  createStyles,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Slide,
  Toolbar,
  useScrollTrigger,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import NextLink from 'next/link'
import Image from 'next/image'
import { title as siteTitle } from '../../config/site'
import benmvpLogo from '../../public/icons/benmvp-logo.png'

const NAV_LINKS = [
  { href: '/blog/', title: 'Blog', label: "Read Ben's blog posts" },
  {
    href: '/videos/',
    title: 'Videos',
    label: "Watch Ben's past tech talks",
  },
  {
    href: '/speak/',
    title: 'Speak',
    label: "Attend one of Ben's speaking engagements",
  },
  {
    href: '/minishops/',
    title: 'Minishops',
    label: "Develop from one of Ben's remote minishop",
  },
  {
    href: '/projects/',
    title: 'Projects',
    label: "Check out some of Ben's dev projects",
  },
  { href: '/about/', title: 'About', label: 'Learn more about Ben' },
]
const MENU_BP = 768

interface MenuProps {
  open: boolean
  onClose: () => void
}
const Menu = ({ open, onClose }: MenuProps) => (
  <Drawer anchor="right" open={open} onClose={onClose}>
    <Box width="250px">
      <List component="nav" aria-label="main site navigation links">
        {NAV_LINKS.map(({ href, title, label }) => (
          <ListItem key={title} aria-label={label}>
            <NextLink href={href} passHref legacyBehavior>
              <Link style={{ width: '100%' }}>
                <ListItemText
                  primaryTypographyProps={{
                    color: 'textPrimary',
                    variant: 'h4',
                  }}
                >
                  {title}
                </ListItemText>
              </Link>
            </NextLink>
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
)

interface HideOnScrollProps {
  children: ReactElement
}

const HideOnScroll = ({ children }: HideOnScrollProps) => {
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
      borderRadius: '50%',
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
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  // TODO: Handle active state <Button> `partiallyActive` & `classes.activeLink`

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Box component="section" mx={{ xs: 1, sm: 2 }} my={1}>
            <Toolbar disableGutters className={classes.toolbar}>
              <NextLink href="/" passHref legacyBehavior>
                <Link color="inherit" aria-label="Go to homepage">
                  <Image
                    src={benmvpLogo}
                    width={60}
                    height={60}
                    alt={siteTitle}
                    className={classes.logo}
                  />
                </Link>
              </NextLink>
              <NextLink href="/" passHref legacyBehavior>
                <Link
                  variant="h5"
                  color="inherit"
                  underline="none"
                  className={classes.name}
                  aria-label="Go to homepage"
                >
                  {siteTitle}
                </Link>
              </NextLink>
              <Box
                component="nav"
                className={classes.navLinks}
                aria-label="main site navigation links"
              >
                {NAV_LINKS.map(({ href, title, label }) => (
                  <NextLink key={title} href={href} passHref legacyBehavior>
                    <Button
                      color="inherit"
                      className={classes.navButton}
                      aria-label={label}
                    >
                      {title}
                    </Button>
                  </NextLink>
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
