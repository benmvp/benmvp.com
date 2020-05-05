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
  const { id, name, url, isCancelled, location, talks, venue } = props
  const fullLocation = `${location}${venue ? ` (${venue})` : ''}`

  // TODO:
  // - Add `mode` (mini or full))
  // - Add categories & description

  return (
    <Card id={id} className={classes.card}>
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
          title={name}
          noWrap
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
          >
            {name}
          </Link>
          {isCancelled ? ' (Cancelled)' : ''}
        </Typography>

        <Divider className={classes.divider} />

        {talks.map((talkInfo, index) => (
          <Fragment key={talkInfo.id || talkInfo.title}>
            <Typography variant="body1" title={talkInfo.title} noWrap>
              {talkInfo.title}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {talkInfo.date}
              {talkInfo.time && ` @ ${talkInfo.time}`}
              {talkInfo.room && ` (${talkInfo.room})`}
            </Typography>
            <Box display="flex" justifyContent="flex-end" flexWrap="wrap">
              {talkInfo.links?.map(({ label, url }) => (
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
