import React from 'react'
import Img from 'gatsby-image'
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core'
import Markdown from 'react-markdown'
import { getFullWidthImageStyles } from '../styles'

interface Props {
  alt: string
  className: string
  credit: string
  fluid: any
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      ...getFullWidthImageStyles(theme),
      position: 'relative',
    },
    credit: {
      backgroundColor: 'rgba(255, 255, 255, 0.75)',
      bottom: 0,
      padding: theme.spacing(0, 2),
      position: 'absolute',
      textAlign: 'right',
      width: '100%',
    },
  }),
)

const HeroImage = ({ alt, credit, className, fluid }: Props) => {
  const classes = useStyles()

  return (
    <Box className={`${classes.root} ${className}`} component="section">
      <Img fluid={fluid} alt={alt} />
      {credit && (
        <Typography variant="h6" className={classes.credit} component="footer">
          <Markdown source={credit} />
        </Typography>
      )}
    </Box>
  )
}

export default HeroImage
