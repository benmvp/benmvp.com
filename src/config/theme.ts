import { indigo, teal } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

export const getTheme = (prefersDarkMode: boolean) =>
  createTheme({
    palette: {
      primary: indigo,
      secondary: teal,
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  })
