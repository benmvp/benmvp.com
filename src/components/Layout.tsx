import { type MouseEvent, ReactNode } from 'react'
import {
  Box,
  Container,
  Fab,
  Link,
  Toolbar,
  Zoom,
  useScrollTrigger,
} from '@mui/material'
import Script from 'next/script'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import Footer from './Footer'
import Masthead from './Masthead'
import Header, { HEADER_HEIGHT } from './Header'

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
    <>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <Script id="ga-init">{configuration}</Script>
    </>
  )
}

interface ScrollToTopProps {
  children: ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor')

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        position="fixed"
        sx={(theme) => ({ bottom: theme.spacing(2), right: theme.spacing(2) })}
      >
        {children}
      </Box>
    </Zoom>
  )
}

interface Props {
  children: ReactNode
  includeSubscribe?: boolean
  masthead?: boolean
  maxWidth?: 'md' | 'lg'
  showAds?: boolean
}

const Layout = (props: Props) => {
  const {
    children,
    includeSubscribe = true,
    masthead = false,
    maxWidth = 'md',
    showAds = false,
  } = props

  return (
    <>
      <GoogleAds showAds={showAds} />

      <Box component="section">
        <Link
          href="#skip-heading"
          position="absolute"
          left="-10000px"
          top="auto"
          width="1px"
          height="1px"
          overflow="hidden"
        >
          Skip Main Navigation
        </Link>
        <Header />
        <Toolbar id="back-to-top-anchor" sx={{ height: HEADER_HEIGHT }} />
        {masthead && <Masthead />}

        <Container
          id="skip-heading"
          maxWidth={maxWidth}
          sx={
            masthead
              ? undefined
              : {
                  minHeight: '100vh',
                  marginTop: 2,
                }
          }
        >
          <Box component="main">{children}</Box>
        </Container>
        <Footer includeSubscribe={includeSubscribe} maxWidth={maxWidth} />
      </Box>

      <ScrollToTop>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollToTop>
    </>
  )
}

export default Layout
