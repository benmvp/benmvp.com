import React, { type ReactNode, useState } from 'react'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardProps,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Markdown from 'react-markdown'
import Link from './Link'
import { type Video } from '../utils/video'

interface Props {
  mode: 'min' | 'full'
  sx?: CardProps['sx']
  video: Video
}

const VideoCard = ({ mode = 'full', sx, video }: Props) => {
  const { id, title, url, engagement, date, description, srcEmbed } = video
  const [expanded, setExpanded] = useState(false)

  const ContentWrapper = ({
    children: wrapperChildren,
  }: {
    children: ReactNode
  }) => {
    if (url) {
      return (
        <CardActionArea>
          <Link href={url} underline="none">
            {wrapperChildren}
          </Link>
        </CardActionArea>
      )
    }

    return <>{wrapperChildren}</>
  }

  return (
    <Card id={id} variant="outlined" sx={{ maxWidth: '800px', ...sx }}>
      <CardMedia
        component="iframe"
        sx={{ minHeight: 300, height: 'min(450px, min(800px, 100vw / 1.5))' }}
        src={srcEmbed}
        title={title}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <ContentWrapper>
            <Typography
              gutterBottom
              variant="h5"
              color="textPrimary"
              component="h3"
              noWrap
            >
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textPrimary"
              component="h4"
            >
              {engagement}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {date}
            </Typography>
          </ContentWrapper>

          {mode === 'full' && description && (
            <Box>
              <IconButton
                sx={{
                  transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                  marginLeft: 'auto',
                  transition: (theme) =>
                    theme.transitions.create('transform', {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
                onClick={() => setExpanded((curExpanded) => !curExpanded)}
                aria-expanded={expanded}
                aria-label="show video description"
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          )}
        </Box>

        {description && (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2">
              <Markdown>{description}</Markdown>
            </Typography>
          </Collapse>
        )}
      </CardContent>
    </Card>
  )
}

export default VideoCard
