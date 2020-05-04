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
import { genSpeakSlug } from '../utils'
import { SpeakingEngagement } from '../utils/speaking-engagement'

interface Props extends SpeakingEngagement {}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      opacity: (props: Props) => (props.isCancelled ? 0.5 : undefined),
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    talksDivider: {
      margin: theme.spacing(1, 0, 1, 'auto'),
      width: '50%',
    },
    link: {
      '&:not(:first-child)': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
)

const SpeakCard = (props: Props) => {
  const classes = useStyles(props)
  const {
    conference,
    conferenceUrl,
    isCancelled,
    location,
    talks,
    venue,
  } = props
  const fullLocation = `${location}${venue ? ` (${venue})` : ''}`

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          gutterBottom
          variant="subtitle2"
          color="textSecondary"
          component="h4"
          title={fullLocation}
          noWrap
        >
          {fullLocation}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          color="textPrimary"
          component={isCancelled ? 's' : 'h3'}
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
          {isCancelled ? ' (Cancelled)' : ''}
        </Typography>

        <Divider className={classes.divider} />

        {talks.map(({ date, links, room, time, title, url }, index) => (
          <Fragment key={title}>
            <Typography
              id={genSpeakSlug(title)}
              variant="body1"
              title={title}
              noWrap
            >
              <GatsbyLink to={url} color="inherit">
                {title}
              </GatsbyLink>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {date}
              {time && ` @ ${time}`}
              {room && ` (${room})`}
            </Typography>
            <Box display="flex" justifyContent="flex-end" flexWrap="wrap">
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
