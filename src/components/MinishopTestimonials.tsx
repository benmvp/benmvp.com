import React, { Fragment } from 'react'
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import ALL_TESTIMONIALS from '../content/minishops/testimonials'
import { formatDate } from '../utils/date'
import { Minishop } from '../utils/minishop'

interface Testimonial {
  date: string
  message: string
  name?: string
  url?: string
  image?: string
}

interface Props {
  minishop: Minishop
}

const MinishopTestimonials = ({ minishop }: Props) => {
  const { slug, title } = minishop
  const { [slug]: testimonials = [] } = ALL_TESTIMONIALS as Record<
    string,
    Testimonial[]
  >

  if (!testimonials.length) {
    return null
  }

  return (
    <Paper component="section" elevation={1}>
      <Typography variant="h5" component="h1" align="center" p={2}>
        Past learners{' '}
        <span role="img" aria-label="love">
          ❤️
        </span>{' '}
        <strong>{title}</strong>!
      </Typography>
      <List>
        {testimonials.map((testimonial, index) => {
          const displayName = testimonial.name || 'Anonymous'

          return (
            <Fragment key={testimonial.message}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={displayName} src={testimonial.image}>
                    {testimonial?.name?.[0]}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={displayName}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                      >
                        {formatDate(testimonial.date)}
                      </Typography>
                      {' - '} {testimonial.message}
                    </>
                  }
                />
              </ListItem>
              {index + 1 < testimonials.length && (
                <Divider variant="inset" component="li" />
              )}
            </Fragment>
          )
        })}
      </List>
    </Paper>
  )
}

export default MinishopTestimonials
