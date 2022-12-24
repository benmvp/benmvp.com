import React from 'react'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core'
import NextLink from 'next/link'
import Share from './Share'
import { getBlogUrl, genPostSlug } from '../utils'
import useCopyUrl from '../utils/useCopyUrl'

interface Props {
  date: string
  hero?: string
  mode?: 'min' | 'full'
  slug: string
  summary?: string
  tags?: string[]
  title: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      height: 266.66667,
    },
    buttons: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
  }),
)

const PostCard = ({
  date,
  hero,
  mode = 'full',
  slug,
  summary,
  tags,
  title,
}: Props) => {
  const classes = useStyles()
  const url = getBlogUrl(slug)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(url)
  const showDate = mode !== 'min'
  const showShare = mode !== 'min'

  return (
    <Card id={genPostSlug(title)}>
      <CardActionArea component={NextLink} href={`/blog${slug}`}>
        {hero && (
          <CardMedia
            component="img"
            image={hero}
            title={title}
            className={classes.media}
          />
        )}
        <CardContent>
          {showDate && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              component="h4"
            >
              {date}
            </Typography>
          )}
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="h3"
            title={title}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      {showShare && (
        <CardActions>
          <Box className={classes.buttons}>
            <Button size="small" color={copyButtonColor} onClick={copy}>
              {copyText}
            </Button>
          </Box>
          <Share
            iconSize={32}
            summary={summary}
            tags={tags}
            title={title}
            url={url}
            options={new Set(['twitter', 'facebook', 'pocket'])}
            type="post"
          />
        </CardActions>
      )}
    </Card>
  )
}

export default PostCard
