import React, { Fragment } from 'react'
import {
  makeStyles,
  createStyles,
  Card,
  CardContent,
  Link,
  Typography,
  Box,
  Divider,
  Button,
} from '@material-ui/core'
import { Link as GatsbyLink } from 'gatsby-theme-material-ui'

interface Props {
  conference: string
  conferenceUrl: string
  location: string
  talks: {
    date: string
    isCancelled?: boolean
    links?: { label: string; url: string }[]
    room?: string
    time?: string
    title: string
    url: string
  }[]
  venue?: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    talksDivider: {
      margin: theme.spacing(1, 0),
    },
    link: {
      '&:not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
)

const SpeakCard = ({
  conference,
  conferenceUrl,
  location,
  talks,
  venue,
}: Props) => {
  const classes = useStyles()
  const locationName = `${location}${venue && ` (${venue})`}`

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          color="textSecondary"
          component="h4"
          title={locationName}
          noWrap
        >
          {locationName}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          color="textPrimary"
          component="h3"
          title={conference}
          noWrap
        >
          <Link
            href={conferenceUrl}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            {conference}
          </Link>
        </Typography>

        {talks.map(({ date, links, room, time, title, url }, index) => (
          <Fragment key={title}>
            <Typography variant="body1">
              <GatsbyLink to={url} color="inherit">
                {title}
              </GatsbyLink>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {date}
              {time && ` @ ${time}`}
              {room && ` (${room})`}
            </Typography>
            <Box display="flex" justifyContent="flex-end">
              {links?.map(({ label, url }) => (
                <Button
                  href={url}
                  color="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes.link}
                >
                  {label}
                </Button>
              ))}
            </Box>

            {index < talks.length - 1 && (
              <Divider variant="inset" className={classes.talksDivider} />
            )}
          </Fragment>
        ))}
      </CardContent>
    </Card>
  )
}

export default SpeakCard
