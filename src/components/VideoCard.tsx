import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'
import {
  makeStyles,
  createStyles,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Typography,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import NextLink from 'next/link'
import Markdown from 'react-markdown'
import { genVideoSlug } from '../utils'
import { Video } from '../utils/video'

const getEmbedSrc = (id: string, provider: Video['provider']) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`
  }
  if (provider === 'vimeo') {
    return `https://player.vimeo.com/video/${id}`
  }
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      maxWidth: 800,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    media: {
      minHeight: 300,
      height: 'min(450px, min(800px, 100vw / 1.5))',
    },
  }),
)

interface Props extends Video {
  className?: string
  mode: 'min' | 'full'
}

const VideoCard = ({
  className,
  engagement,
  date,
  id,
  mode,
  provider = 'youtube',
  title,
  url,
  description,
}: Props) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const ContentWrapper = ({
    children: wrapperChildren,
  }: {
    children: ReactNode
  }) => {
    if (url) {
      return (
        <CardActionArea component={NextLink} href={url}>
          {wrapperChildren}
        </CardActionArea>
      )
    }

    return <>{wrapperChildren}</>
  }

  return (
    <Card
      id={genVideoSlug(id)}
      variant="outlined"
      className={`${classes.root} ${className}`}
    >
      <CardMedia
        component="iframe"
        src={getEmbedSrc(id, provider)}
        title={title}
        className={classes.media}
        frameBorder="0"
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
                className={classNames(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={() => setExpanded((curExpanded) => !curExpanded)}
                aria-expanded={expanded}
                aria-label="show video description"
              >
                <ExpandMore />
              </IconButton>
            </Box>
          )}
        </Box>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2">
            <Markdown>{description}</Markdown>
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default VideoCard
