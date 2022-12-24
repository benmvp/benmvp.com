import React from 'react'
import Image, { ImageProps } from 'next/image'
import { makeStyles, createStyles, Box, Typography } from '@material-ui/core'
import Markdown from 'react-markdown'
import { getFullWidthImageStyles } from '../styles'

interface Props {
  alt: string
  className: string
  credit?: string
  src: ImageProps['src']
}

const useStyles = makeStyles((theme) =>
  createStyles({
    image: {
      ...getFullWidthImageStyles(theme),
    },
    credit: {
      textAlign: 'right',
      fontStyle: 'italic',
    },
  }),
)

const HeroImage = ({ alt, credit, className, src }: Props) => {
  const classes = useStyles()

  return (
    <Box className={className} component="section">
      <Image src={src} width={960} alt={alt} className={classes.image} />
      {credit && (
        <Typography
          variant="caption"
          className={classes.credit}
          component="footer"
        >
          <Markdown source={credit} linkTarget="_blank" />
        </Typography>
      )}
    </Box>
  )
}

export default HeroImage
