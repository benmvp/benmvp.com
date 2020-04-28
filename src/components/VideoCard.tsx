import React from 'react'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'

type Provider = 'youtube' | 'vimeo'

const getEmbedSrc = (id: string, provider: Provider) => {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}`
  }
}

const useStyles = makeStyles({
  root: {
    maxWidth: 800,
  },
  media: {
    minHeight: 300,
    height: 'min(450px, min(800px, 100vw / 1.5))',
  },
})

interface Props {
  className?: string
  conference: string
  date: string
  id: string
  provider?: Provider
  title: string
  url: string
}

const VideoCard = ({
  className,
  conference,
  date,
  id,
  provider = 'youtube',
  title,
  url,
}: Props) => {
  const classes = useStyles()

  return (
    <Card variant="outlined" className={`${classes.root} ${className}`}>
      <CardMedia
        component="iframe"
        src={getEmbedSrc(id, provider)}
        title={title}
        className={classes.media}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <CardActionArea component={Link} to={url} underline="none">
        <CardContent>
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
            {conference}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default VideoCard
