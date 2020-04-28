import React from 'react'
import { Typography, Box } from '@material-ui/core'

interface Props {
  className?: string
  subTitle?: string
  title: string
}

const PageHeader = ({ className, subTitle, title }: Props) => {
  return (
    <Box component="header" className={className}>
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
