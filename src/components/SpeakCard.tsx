import React, { Fragment, useState } from 'react'
import classNames from 'classnames'
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
  IconButton,
  Collapse,
} from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import Markdown from 'react-markdown'
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
  }),
)

interface TalkProps extends EngagementTalk {
  mode: 'min' | 'full'
}

const Talk = ({
  title,
  date,
  time,
  room,
  links,
  categories,
  description,
  mode,
}: TalkProps) => {
  const classes = useTalkStyles()
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="body1" title={title}>
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {date}
            {time && ` @ ${time}`}
            {room && ` (${room})`}
          </Typography>
        </Box>

        {mode === 'full' && description && (
          <Box>
            <IconButton
              className={classNames(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={() => setExpanded((prevExpanded) => !prevExpanded)}
              aria-expanded={expanded}
              aria-label="show talk description"
            >
              <ExpandMore />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box mt={1}>
        {categories?.map((category) => (
          <Chip
            key={category}
            label={category}
            size="small"
            className={classes.category}
          />
        ))}
      </Box>
      {mode === 'full' && (
        <Box mt={1}>
          {links?.map(({ label, url }) => (
            <Button
              key={label}
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
      )}

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography variant="body2">
          <Markdown>{description}</Markdown>
        </Typography>
      </Collapse>
    </>
  )
}

interface Props extends SpeakingEngagement {
  mode?: 'min' | 'full'
}

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      opacity: (props: Props) => (props.isCancelled ? 0.5 : undefined),
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    talksDivider: {
      margin: theme.spacing(1, 'auto', 1, 0),
      width: '50%',
    },
  }),
)

const SpeakCard = (props: Props) => {
  const classes = useStyles(props)
  const {
    id,
    name,
    url,
    isCancelled,
    location,
    talks,
    venue,
    mode = 'full',
  } = props
  const fullLocation = `${location}${venue ? ` (${venue})` : ''}`

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
            <Talk {...talkInfo} mode={mode} />

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
