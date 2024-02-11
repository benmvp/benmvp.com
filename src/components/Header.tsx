import { ReactElement, useState } from 'react'
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  styled,
  Toolbar,
  useScrollTrigger,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Image from 'next/image'
import NextLink from 'next/link'
import Link from './Link'
import SITE_CONFIG from '../config/site'
import { getMinishopUrl, getPostUrl, getUrl } from '../utils/url'

export const HEADER_HEIGHT = '82px'

const NAV_LINKS = [
  { href: getPostUrl(), title: 'Blog', label: "Read Ben's blog posts" },
  {
    href: getUrl('videos'),
    title: 'Videos',
    label: "Watch Ben's past tech talks",
  },
  {
    href: getUrl('speak'),
    title: 'Speak',
    label: "Attend one of Ben's speaking engagements",
  },
  {
    href: getMinishopUrl(),
    title: 'Minishops',
    label: "Develop from one of Ben's remote minishop",
  },
  {
    href: getUrl('projects'),
    title: 'Projects',
    label: "Check out some of Ben's dev projects",
  },
  { href: getUrl('about'), title: 'About', label: 'Learn more about Ben' },
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
            <Link href={href} sx={{ width: '100%' }}>
              <ListItemText
                primaryTypographyProps={{
                  color: 'textPrimary',
                  variant: 'h4',
                }}
              >
                {title}
              </ListItemText>
            </Link>
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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',

  [theme.breakpoints.up(MENU_BP)]: {
    justifyContent: 'flex-start',
  },
}))
const Logo = styled(Image)(({ theme }) => ({
  borderRadius: '50%',
  marginRight: theme.spacing(),
}))
const TitleLink = styled(Link)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.up(MENU_BP)]: {
    flex: 'unset',
  },
}))
const NavLinks = styled('nav')(({ theme }) => ({
  flex: 1,
  display: 'none',

  [theme.breakpoints.up(MENU_BP)]: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
const MenuButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up(MENU_BP)]: {
    display: 'none',
  },
}))

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  return (
    <>
      <HideOnScroll>
        <AppBar>
          <Box component="section" mx={{ xs: 1, sm: 2 }} my={1}>
            <StyledToolbar disableGutters>
              <Link color="inherit" href="/" aria-label="Go to homepage">
                <Logo
                  src="/logo.png"
                  alt={SITE_CONFIG.title}
                  width={60}
                  height={60}
                />
              </Link>
              <TitleLink
                variant="h5"
                color="inherit"
                href="/"
                underline="none"
                aria-label="Go to homepage"
              >
                {SITE_CONFIG.title}
              </TitleLink>
              <NavLinks aria-label="main site navigation links">
                {NAV_LINKS.map(({ href, title, label }) => (
                  <Button
                    key={title}
                    component={NextLink}
                    color="inherit"
                    href={href}
                    aria-label={label}
                  >
                    {title}
                  </Button>
                ))}
              </NavLinks>
              <MenuButton
                edge="start"
                color="inherit"
                aria-label="open navigation menu"
                onClick={() => setMenuIsOpen(true)}
              >
                <MenuIcon />
              </MenuButton>
            </StyledToolbar>
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
