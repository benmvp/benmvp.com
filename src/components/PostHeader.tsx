import React from 'react'
import { Typography, Box, styled } from '@mui/material'
import { formatDate } from '../utils/date'

interface Props {
  date: string
  subTitle?: string
  timeToRead: number
  title: string
}

const PostHeader = ({ date, subTitle, timeToRead, title }: Props) => {
  return (
    <Box component="header">
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>
      {subTitle && (
        <Typography variant="h6" component="h2" gutterBottom>
          {subTitle}
        </Typography>
      )}
      <Typography variant="subtitle2" component="p" gutterBottom>
        {formatDate(date, 'long')} · {timeToRead} min read
      </Typography>
    </Box>
  )
}

export default PostHeader
