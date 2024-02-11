import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { isFuture } from 'date-fns'
import { Minishop } from '../utils/minishop'
import { getMinishopUrl } from '../utils/url'
import useCopyUrl from '../utils/useCopyUrl'
import { formatDate, formatTime } from '../utils/date'
import Link from './Link'
import Share from './Share'

interface Props {
  minishop: Minishop
  mode?: 'min' | 'full'
}

const MinishopCard = ({ minishop, mode = 'full' }: Props) => {
  const { slug, excerpt, shortDescription, tags, title, eventStart } = minishop
  const summary = shortDescription || excerpt
  const url = getMinishopUrl(slug)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(url)
  const showShare = mode !== 'min'
  let fullDate

  if (eventStart && isFuture(Date.parse(eventStart))) {
    const formattedDate = formatDate(eventStart)
    const formattedTime = formatTime(eventStart)

    fullDate = `${formattedDate} @ ${formattedTime}`
  }

  return (
    <Card id={slug}>
      <CardActionArea>
        <Link href={url} underline="none">
          <CardContent>
            {fullDate && (
              <Typography
                gutterBottom
                variant="subtitle2"
                color="textSecondary"
                component="h4"
                title={fullDate}
                noWrap
              >
                {fullDate}
              </Typography>
            )}
            <Typography
              gutterBottom
              variant="h5"
              color="textPrimary"
              component="h3"
              title={title}
              noWrap
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
            tags={tags}
            title={`${title} Minishop`}
            url={url}
            options={['twitter', 'facebook', 'linkedin']}
            type="minishop"
          />
        </CardActions>
      )}
    </Card>
  )
}

export default MinishopCard
