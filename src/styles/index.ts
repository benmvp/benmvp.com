import { Theme } from '@material-ui/core'

export const getFullWidthImageStyles = (theme: Theme) => ({
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
  },
})
