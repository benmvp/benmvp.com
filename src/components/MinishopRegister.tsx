import React, { useEffect } from 'react'
import formatDate from 'date-fns-tz/format'
import {
  makeStyles,
  createStyles,
  Box,
  Button,
  Paper,
  Typography,
} from '@material-ui/core'
import Helmet from 'react-helmet'

interface Props {
  event: {
    id: string
    start: string
  }
  isTop?: boolean
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(5, 0),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  }),
)

const MinishopRegister = ({ event, isTop: isTop = false }: Props) => {
  const classes = useStyles()
  const startDate = Date.parse(event.start)
  const formattedDate = formatDate(startDate, 'EEEE, MMMM d, yyyy')
  const formattedTime = formatDate(startDate, 'h:mm b z')
  const buttonId = `eventbrite-checkout-${event.id}-${isTop ? 'top' : 'bottom'}`

  useEffect(() => {
    window.EBWidgets?.createWidget({
      widgetType: 'checkout',
      eventId: event.id,
      modal: true,
      modalTriggerElementId: buttonId,
    })
  }, [event, buttonId])

  return (
    <>
      <Paper component="section" elevation={3} className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Box
            mr={{ xs: 0, sm: 2 }}
            mb={{ xs: 2, sm: 0 }}
            flex={1}
            textAlign={{ xs: 'center', sm: 'left' }}
          >
            <Typography variant="h6" component="h3">
              Next Minishop
            </Typography>
            <Typography variant="h5" component="span">
              {formattedDate} @ {formattedTime}
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="secondary" id={buttonId}>
              Register now
            </Button>
          </Box>
        </Box>
      </Paper>

      <Helmet>
        {isTop && (
          <script
            src="https://www.eventbrite.com/static/widgets/eb_widgets.js"
            type="text/javascript"
          />
        )}
      </Helmet>
    </>
  )
}

export default MinishopRegister
