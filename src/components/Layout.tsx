import React, { useMemo, ReactNode } from 'react'
import {
  colors,
  makeStyles,
  createStyles,
  createMuiTheme,
  ThemeProvider,
  useMediaQuery,
  CssBaseline,
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Container,
  Avatar,
  Box,
  Typography,
  Fab,
  Zoom,
} from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Link from '../components/Link'
import logo from './logo.jpg'

interface ChildrenProps {
  children: ReactNode
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
    logo: {
      marginRight: theme.spacing(),
    },
    toTop: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
)

const ScrollTop = ({ children }: ChildrenProps) => {
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

export default ({ children }: ChildrenProps) => {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: colors.indigo,
          secondary: colors.teal,
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  )

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <HideOnScroll>
          <AppBar>
            <Container maxWidth="md">
              <Box component="header">
                <Toolbar disableGutters>
                  <Link color="inherit" href="/" aria-label="Go to homepage">
                    <Avatar
                      src={logo}
                      alt="Ben Ilegbodu"
                      className={classes.logo}
                    />
                  </Link>
                  <Typography variant="h6">
                    <Link color="inherit" href="/">
                      Ben Ilegbodu
                    </Link>
                  </Typography>
                </Toolbar>
              </Box>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Container maxWidth="md">
          <Toolbar id="back-to-top-anchor" />
          <Box component="main" my={2}>
            {children}
          </Box>
        </Container>
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </ThemeProvider>
    </>
  )
}
