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
  Chip,
} from '@material-ui/core'
import {
  SpeakingEngagement,
  EngagementTalk,
} from '../utils/speaking-engagement'

const useTalkStyles = makeStyles((theme) =>
  createStyles({
    category: {
      marginBottom: theme.spacing(0.5),
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
    link: {
      marginBottom: theme.spacing(0.5),
      '&:not(:last-child)': {
        marginRight: theme.spacing(1),
      },
    },
  }),
)

interface TalkProps extends EngagementTalk {}

const Talk = ({ title, date, time, room, links, categories }: TalkProps) => {
  const classes = useTalkStyles()

  return (
    <>
      <Typography variant="body1" title={title} noWrap>
        {title}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {date}
        {time && ` @ ${time}`}
        {room && ` (${room})`}
      </Typography>
      <Box mt={1}>
        {categories?.map((category) => (
          <Chip label={category} size="small" className={classes.category} />
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" mt={1}>
        <Box>
          {links?.map(({ label, url }) => (
            <Button
              variant="contained"
              size="small"
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
      </Box>
    </>
  )
}

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
            <Talk {...talkInfo} />

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
