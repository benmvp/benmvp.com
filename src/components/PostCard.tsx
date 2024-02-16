import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { getPostUrl } from '../utils/url'
import useCopyUrl from '../utils/useCopyUrl'
import Share from './Share'
import Link from './Link'
import { type Post } from '../utils/post'
import { formatDate } from '../utils/date'

interface Props {
  mode?: 'min' | 'full'
  post: Post
}

const PostCard = ({ mode = 'full', post }: Props) => {
  const { date, hero, slug, shortDescription, title, tags } = post
  const summary = shortDescription
  const fullUrl = getPostUrl(slug, true)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(fullUrl)
  const showDate = mode !== 'min'
  const showShare = mode !== 'min'

  return (
    <Card id={slug}>
      <CardActionArea>
        <Link href={getPostUrl(slug)} underline="none">
          {hero && (
            <CardMedia
              component="img"
              src={hero}
              title={title}
              sx={{ height: 266.66667 }}
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
                {formatDate(date)}
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
        </Link>
      </CardActionArea>
      {showShare && (
        <CardActions>
          <Box sx={{ flex: 1, mr: 2 }}>
            <Button size="small" color={copyButtonColor} onClick={copy}>
              {copyText}
            </Button>
          </Box>
          <Share
            iconSize={32}
            summary={summary}
            tags={tags ?? undefined}
            title={title}
            url={fullUrl}
            options={
              [
                /*'twitter', 'facebook', 'reddit'*/
              ]
            }
            type="post"
          />
        </CardActions>
      )}
    </Card>
  )
}

export default PostCard
