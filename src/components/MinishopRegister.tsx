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
      margin: theme.spacing(5, 0, 1),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
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
    const createWidget = () => {
      window.EBWidgets?.createWidget({
        widgetType: 'checkout',
        eventId: event.id,
        modal: true,
        modalTriggerElementId: buttonId,
      })
    }

    let widgetsScript = document.getElementById('eb_widgets')
    let added = false

    // create the widgets script if it doesn't already exists
    if (!widgetsScript) {
      widgetsScript = document.createElement('script')

      widgetsScript.id = 'eb_widgets'
      widgetsScript.async = true
      widgetsScript.src =
        'https://www.eventbrite.com/static/widgets/eb_widgets.js'
      widgetsScript.type = 'text/javascript'

      document.body.appendChild(widgetsScript)
      added = true
    }

    // notify when it's finally loaded
    widgetsScript?.addEventListener('load', createWidget)

    return () => {
      widgetsScript?.removeEventListener('load', createWidget)

      if (widgetsScript && added) {
        document.body.removeChild(widgetsScript)
      }
    }
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
              Next Online Minishop*
            </Typography>
            <Typography variant="h5" component="p">
              {formattedDate} @ {formattedTime}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              id={buttonId}
            >
              Register now
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box textAlign={{ xs: 'center', sm: 'left' }} mb={5}>
        <Typography variant="caption" component="p">
          * You will receive a link to the Zoom meeting the night before
        </Typography>
      </Box>
    </>
  )
}

export default MinishopRegister
