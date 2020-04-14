import React from 'react'
import Img from 'gatsby-image'
import { makeStyles, createStyles } from '@material-ui/core'
import { getFullWidthImageStyles } from '../styles'

interface Props {
  alt: string
  className: string
  fluid: any
}

const useStyles = makeStyles((theme) =>
  createStyles({
    image: getFullWidthImageStyles(theme),
  }),
)

const HeroImage = ({ alt, className, fluid }: Props) => {
  const classes = useStyles()

  return (
    <Img fluid={fluid} alt={alt} className={`${classes.image} ${className}`} />
  )
}

export default HeroImage
