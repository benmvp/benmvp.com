import React, { useMemo } from 'react'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getTheme } from '../config/theme'
import SITE_CONFIG from '../config/site'

import 'prism-themes/themes/prism-material-dark.css'
import '../css/line-numbers.css'

Bugsnag.start({
  apiKey: process.env.NEXT_PUBLIC_BUGSNAG_BROWSER_API_KEY || '',
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.NODE_ENV,
  appVersion: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
})

const ErrorBoundary = Bugsnag.getPlugin('react')!.createErrorBoundary(React)

const App = ({ Component, pageProps }: AppProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode])

  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <GoogleAnalytics gaId={SITE_CONFIG.gaTrackingId} />
        <Analytics />
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
