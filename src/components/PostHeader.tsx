import React from 'react'
import { Typography, Box, styled } from '@mui/material'
import { formatDate } from '../utils/date'
import Share from './Share'

interface Props {
  date: string
  subTitle?: string
  summary: string
  tags?: string[]
  timeToRead: number
  title: string
  url: string
}

const PostHeader = ({
  date,
  subTitle,
  summary,
  tags,
  timeToRead,
  title,
  url,
}: Props) => {
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
      <Typography
        variant="subtitle2"
        component="p"
        gutterBottom
        suppressHydrationWarning
      >
        {formatDate(date, 'long')} · {timeToRead} min read
      </Typography>

      <Box mt={2}>
        <Share
          url={url}
          title={title}
          summary={summary}
          tags={tags}
          type="post"
        />
      </Box>
    </Box>
  )
}

export default PostHeader
