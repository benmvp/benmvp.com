import React, { useState } from 'react'
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Chip,
  IconButton,
  Collapse,
  Stack,
} from '@mui/material'
import { ExpandMore } from '@mui/icons-material'
import Markdown from 'react-markdown'
import Link from '../components/Link'
import {
  type SpeakingEngagement,
  type EngagementTalk,
} from '../utils/engagement'

interface TalkProps {
  mode: 'min' | 'full'
  talk: EngagementTalk
}

const Talk = ({ mode, talk }: TalkProps) => {
  const { title, date, time, room, categories, description, links } = talk
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
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                marginLeft: 'auto',
                transition: (theme) =>
                  theme.transitions.create('transform', {
                    duration: theme.transitions.duration.shortest,
                  }),
              }}
              onClick={() => setExpanded((curExpanded) => !curExpanded)}
              aria-expanded={expanded}
              aria-label="show talk description"
            >
              <ExpandMore />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box mt={1} sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {categories?.map((category) => (
          <Chip key={category} label={category} size="small" sx={{ mb: 0.5 }} />
        ))}
      </Box>
      {mode === 'full' && (
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
          }}
        >
          {links?.map(({ label, url }) => (
            <Button
              key={label}
              variant="contained"
              size="small"
              href={url}
              color="primary"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ mb: 0.5 }}
            >
              {label}
            </Button>
          ))}
        </Box>
      )}

      {description && (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2">
            <Markdown>{description}</Markdown>
          </Typography>
        </Collapse>
      )}
    </>
  )
}

interface Props {
  engagement: SpeakingEngagement
  mode?: 'min' | 'full'
}

const SpeakCard = ({ engagement, mode = 'full' }: Props) => {
  const { id, name, url, isCancelled, location, talks, venue } = engagement
  const fullLocation = `${location}${venue ? ` (${venue})` : ''}`

  return (
    <Card
      id={id}
      sx={{
        opacity: isCancelled ? 0.5 : undefined,
      }}
    >
      <CardContent>
        <Stack direction="column" spacing={1}>
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
              underline="hover"
            >
              {name}
            </Link>
            {isCancelled ? ' (Cancelled)' : ''}
          </Typography>

          <Divider />

          <Stack
            direction="column"
            spacing={1}
            divider={<Divider variant="inset" />}
          >
            {talks.map((talkInfo) => (
              <Talk
                key={talkInfo.id || talkInfo.title}
                talk={talkInfo}
                mode={mode}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default SpeakCard
