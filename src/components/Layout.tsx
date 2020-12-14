import React, { useMemo, ReactNode } from 'react'
import Helmet from 'react-helmet'
import {
  makeStyles,
  createStyles,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  useScrollTrigger,
  Toolbar,
  Container,
  Box,
  Zoom,
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { Fab } from 'gatsby-theme-material-ui'
import Header from './Header'
import Footer from './Footer'
import Masthead from './Masthead'
import { getTheme } from '../../config/theme'

const GoogleAds = ({ showAds }: { showAds: boolean }) => {
  const configuration = `
  (adsbygoogle=window.adsbygoogle||[]).pauseAdRequests=${showAds ? 0 : 1};

  if (!adsbygoogle.loaded) {
    adsbygoogle.push({
      google_ad_client: "ca-pub-8593460861818909",
      enable_page_level_ads: true
    });
  }
  `
  return (
    <Helmet>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
      <script>{configuration}</script>
    </Helmet>
  )
}

interface ScrollToTopProps {
  children: ReactNode
}

const useScrollToTopStyles = makeStyles((theme) =>
  createStyles({
    toTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const classes = useScrollToTopStyles()
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.toTop}>
        {children}
      </div>
    </Zoom>
  )
}

interface Props {
  children: ReactNode
  masthead?: boolean
  maxWidth?: 'md' | 'lg'
  showAds?: boolean
}

const useMainStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    skipNav: {
      position: 'absolute',
      left: -10000,
      top: 'auto',
      width: 1,
      height: 1,
      overflow: 'hidden',
    },
    container: {
      minHeight: ({ masthead }: Props) => (masthead ? undefined : '100vh'),
      marginTop: ({ masthead }: Props) =>
        masthead ? undefined : theme.spacing(2),
    },
    toTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    backToTopAnchor: {
      height: 82,
    },
  }),
)

const Layout = (props: Props) => {
  const classes = useMainStyles(props)
  const { children, masthead = false, maxWidth = 'md', showAds = false } = props
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <>
      <GoogleAds showAds={showAds} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box component="section" className={classes.root}>
          <a href="#skip-heading" className={classes.skipNav}>
            Skip Main Navigation
          </a>
          <Header />
          <Toolbar
            id="back-to-top-anchor"
            className={classes.backToTopAnchor}
          />

          {masthead && <Masthead />}
          <Container
            id="skip-heading"
            maxWidth={maxWidth}
            className={classes.container}
          >
            <Box component="main">{children}</Box>
          </Container>
          <Footer />
          <ScrollToTop>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollToTop>
        </Box>
      </ThemeProvider>
    </>
  )
}

export default Layout
