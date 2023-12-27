import React from 'react'
import { Typography, Box } from '@mui/material'

interface Props {
  subTitle?: string
  title: string
}

const PageHeader = ({ subTitle, title }: Props) => {
  return (
    <Box component="header">
      <Typography variant="h3" component="h1" gutterBottom>
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="h5" component="h2" gutterBottom>
          {subTitle}
        </Typography>
      )}
    </Box>
  )
}

export default PageHeader
