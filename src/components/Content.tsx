import React from 'react'
import { makeStyles, createStyles, Typography } from '@material-ui/core'
import { getFullWidthImageStyles } from '../styles'

interface Props {
  children: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& h2': theme.typography.h4,
      '& h3': theme.typography.h5,
      '& h4': theme.typography.h6,
      '& h5': theme.typography.h6,
      '& h6': theme.typography.h6,
      '& p': {
        ...theme.typography.body1,
        margin: theme.spacing(0, 0, 2, 0),
      },
      '& img': {
        // maxWidth: '100%',
        ...getFullWidthImageStyles(theme),
      },
      '& ul': {
        listStyle: 'circle',
        padding: theme.spacing(0, 0, 0, 3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(0, 0, 0, 4),
        },
      },
      '& li': {
        margin: theme.spacing(0, 0, 1, 0),
      },
      '& a:not(.anchor)': {
        color: theme.palette.primary.main,
      },
      '& blockquote': {
        borderLeft: `5px solid ${theme.palette.secondary.main}`,
        fontStyle: 'italic',
        margin: theme.spacing(2.5, 0, 2.5, 5),
        padding: theme.spacing(1.5),
        '& p': {
          margin: 0,
        },
      },
      '& .gatsby-highlight': {
        // code blocks
        margin: theme.spacing(0, 0, 3, 2),
      },
      '& .gatsby-resp-iframe-wrapper': {
        // iframes (video embeds)
        margin: theme.spacing(0, 0, 3, 2),
      },
      '& .twitter-tweet': {
        margin: `0 auto ${theme.spacing(2)}px auto`,
      },
    },
  }),
)

const Content = ({ children }: Props) => {
  const classes = useStyles()

  return (
    <Typography
      variant="body1"
      component="article"
      dangerouslySetInnerHTML={{ __html: children }}
      className={classes.root}
    />
  )
}

export default Content
