import type { AppProps } from 'next/app'
import { useMemo } from 'react'
import { useMedia } from 'react-use'
import { getTheme } from '../config/theme'
import { CssBaseline, ThemeProvider } from '@mui/material'

const App = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
