import React, { useMemo } from 'react'
import { Link as GatsbyLink } from 'gatsby'
import {
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
  Link,
} from '@material-ui/core'
import logo from './logo.jpg'

interface Props {
  children: React.ReactElement
}

const HideOnScroll = ({ children }: Props) => {
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
  }),
)

const LinkWrapper = ({ href, ...props }) => <GatsbyLink to={href} {...props} />

export default () => {
  const classes = useStyles()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
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
            <Container>
              <Box component="header">
                <Toolbar disableGutters>
                  <Link
                    color="inherit"
                    href="/"
                    aria-label="Go to homepage"
                    component={LinkWrapper}
                  >
                    <Avatar
                      src={logo}
                      alt="Ben Ilegbodu"
                      className={classes.logo}
                    />
                  </Link>
                  <Typography variant="h6">
                    <Link color="inherit" href="/" component={LinkWrapper}>
                      Ben Ilegbodu
                    </Link>
                  </Typography>
                </Toolbar>
              </Box>
            </Container>
          </AppBar>
        </HideOnScroll>
        <Container>
          <Box component="main" my={10}>
            <Typography variant="h1">Welcome!</Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
