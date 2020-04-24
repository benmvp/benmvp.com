import { Theme } from '@material-ui/core'

export const getFullWidthImageStyles = (theme: Theme) => ({
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  maxWidth: `calc(100% + ${theme.spacing(2 * 2)}px)`,

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    maxWidth: `calc(100% + ${theme.spacing(3 * 2)}px)`,
  },
})
