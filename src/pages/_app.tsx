import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { getTheme } from '../config/theme'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'

const App = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
