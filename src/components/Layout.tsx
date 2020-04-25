import React, { useMemo, ReactNode } from 'react'
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

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
    },
    container: {
      minHeight: '100vh',
      marginTop: ({ masthead }) => (masthead ? undefined : theme.spacing(2)),
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

interface ScrollToTopProps {
  children: ReactNode
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const classes = useStyles()
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
}

const Layout = ({ children, masthead = false, maxWidth = 'md' }: Props) => {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Box component="section" className={classes.root}>
          <Header />
          <Toolbar className={classes.backToTopAnchor} />

          {masthead && <Masthead />}
          <Container
            maxWidth={maxWidth}
            className={classes.container}
            id="back-to-top-anchor"
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
