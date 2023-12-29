import React from 'react'
import { Box, Typography } from '@mui/material'
import Markdown from 'react-markdown'
import Image, { type StaticImageData } from 'next/image'

interface Props {
  alt: string
  credit?: string
  image: StaticImageData
}

const HeroImage = ({ alt, credit, image }: Props) => {
  return (
    <Box
      component="section"
      sx={{ position: 'relative', height: '100vh', maxHeight: 350 }}
    >
      <Image
        src={image}
        alt={alt}
        placeholder="blur"
        fill
        quality={100}
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {credit && (
        <Typography
          variant="caption"
          component="footer"
          sx={{ textAlign: 'right', fontStyle: 'italic' }}
        >
          <Markdown linkTarget="_blank">{credit}</Markdown>
        </Typography>
      )}
    </Box>
  )
}

export default HeroImage
