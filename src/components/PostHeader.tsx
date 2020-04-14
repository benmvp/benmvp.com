import React from 'react'
import { Typography, Box } from '@material-ui/core'

interface Props {
  className: string
  date: string
  subTitle?: string
  timeToRead: number
  title: string
}

const PostHeader = ({
  className,
  date,
  subTitle,
  timeToRead,
  title,
}: Props) => {
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
      <Typography variant="subtitle2" component="p" gutterBottom>
        {date} · {timeToRead} min read
      </Typography>
    </Box>
  )
}

export default PostHeader
