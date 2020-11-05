import React from 'react'
import { isFuture } from 'date-fns'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  Box,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Share from './Share'
import {
  getMinishopUrl,
  genMinishopSlug,
  formatDate,
  formatTime,
} from '../utils'
import useCopyUrl from '../utils/useCopyUrl'

interface Props {
  event?: {
    id: string
    start: string
  }
  mode?: 'min' | 'full'
  slug: string
  summary: string
  tags?: string[]
  title: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    buttons: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
  }),
)

const MinishopCard = ({
  event,
  mode = 'full',
  slug,
  summary,
  tags,
  title,
}: Props) => {
  const classes = useStyles()
  const url = getMinishopUrl(slug)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(url)
  const showShare = mode !== 'min'
  let fullDate

  if (event?.start && isFuture(Date.parse(event?.start))) {
    const formattedDate = formatDate(event.start)
    const formattedTime = formatTime(event.start)

    fullDate = `${formattedDate} @ ${formattedTime}`
  }

  return (
    <Card id={genMinishopSlug(title)}>
      <CardActionArea
        component={Link}
        to={`/minishops${slug}`}
        underline="none"
      >
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
            title={`${title} Minishop`}
            url={url}
            options={new Set(['twitter', 'facebook', 'linkedin'])}
            type="minishop"
          />
        </CardActions>
      )}
    </Card>
  )
}

export default MinishopCard
