import React, { Fragment } from 'react'
import {
  makeStyles,
  createStyles,
  Typography,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
} from '@material-ui/core'
import { formatDate } from '../utils'
import ALL_TESTIMONIALS from '../../content/minishops/testimonials/data.json'

interface Testimonial {
  date: string
  message: string
  name?: string
  url?: string
  image?: string
}

interface Props {
  slug: string
  title: string
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    title: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
  })
})

const MinishopTestimonials = ({ slug, title }: Props) => {
  const classes = useStyles()
  const { [slug]: testimonials = [] } = ALL_TESTIMONIALS as Record<
    string,
    Testimonial[]
  >

  return (
    <Paper component="section" elevation={1}>
      <Typography variant="h5" component="h1" className={classes.title}>
        Past learners ❤️ <strong>{title}</strong>!
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
