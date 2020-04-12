import { createMuiTheme, colors } from '@material-ui/core'

export const getTheme = (prefersDarkMode: boolean) =>
  createMuiTheme({
    palette: {
      primary: colors.indigo,
      secondary: colors.teal,
      type: prefersDarkMode ? 'dark' : 'light',
    },
  })
