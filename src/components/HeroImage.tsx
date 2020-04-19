import React from 'react'
import Img from 'gatsby-image'
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core'
import Markdown from 'react-markdown'
import { getFullWidthImageStyles } from '../styles'

interface Props {
  alt: string
  className: string
  credit?: string
  fluid: any
}

const useStyles = makeStyles((theme) =>
  createStyles({
    image: {
      ...getFullWidthImageStyles(theme),
    },
    credit: {
      textAlign: 'right',
    },
  }),
)

const HeroImage = ({ alt, credit, className, fluid }: Props) => {
  const classes = useStyles()

  return (
    <Box className={className} component="section">
      <Img fluid={fluid} alt={alt} className={classes.image} />
      {credit && (
        <Typography
          variant="caption"
          className={classes.credit}
          component="footer"
        >
          <Markdown source={credit} />
        </Typography>
      )}
    </Box>
  )
}

export default HeroImage
