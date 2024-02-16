import React, { useEffect } from 'react'
import formatDateTimezone from 'date-fns-tz/format'
import { Box, Button, Paper, Typography } from '@mui/material'

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: string
        eventId: string
        modal: boolean
        modalTriggerElementId: string
        onOrderComplete: () => void
      }) => void
    }
  }
}

interface Props {
  eventId: string
  eventStart: string
  isTop?: boolean
  title: string
}

const useCheckoutWidget = (
  eventId: string,
  buttonId: string,
  title: string,
) => {
  useEffect(() => {
    const createWidget = () => {
      window.EBWidgets?.createWidget({
        widgetType: 'checkout',
        eventId: eventId,
        modal: true,
        modalTriggerElementId: buttonId,
        onOrderComplete: () => {
          window.gtag?.('event', 'purchase', {
            value: 100,
            currency: 'USD',
            items: [{ id: eventId, name: title, price: 100 }],
          })
        },
      })
    }

    let widgetsScript: HTMLElement | null =
      document.getElementById('eb_widgets')
    let added = false

    // create the widgets script if it doesn't already exists
    if (!widgetsScript) {
      const newWidgetsScript = document.createElement('script')

      newWidgetsScript.id = 'eb_widgets'
      newWidgetsScript.async = true
      newWidgetsScript.src =
        'https://www.eventbrite.com/static/widgets/eb_widgets.js'
      newWidgetsScript.type = 'text/javascript'

      document.body.appendChild(newWidgetsScript)

      widgetsScript = newWidgetsScript
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
  }, [eventId, buttonId, title])
}

const MinishopRegister = ({
  eventId,
  eventStart,
  isTop = false,
  title,
}: Props) => {
  const startDate = Date.parse(eventStart)
  const formattedDate = formatDateTimezone(startDate, 'EEEE, MMMM d, yyyy')
  const formattedTime = formatDateTimezone(startDate, 'h:mm b z')
  const buttonId = `eventbrite-checkout-${eventId}-${isTop ? 'top' : 'bottom'}`

  useCheckoutWidget(eventId, buttonId, title)

  return (
    <>
      <Paper
        component="section"
        elevation={3}
        sx={{
          mt: 5,
          mb: 0,
          padding: 2,
          backgroundColor: 'palette.secondary.main',
          color: 'palette.secondary.contrastText',
        }}
      >
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
            <Typography variant="h5" component="p" suppressHydrationWarning>
              {formattedDate} @ {formattedTime}
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              id={buttonId}
              onClick={() => {
                window.gtag?.('event', 'add_to_cart', {
                  value: 100,
                  currency: 'USD',
                  items: [
                    {
                      id: eventId,
                      name: title,
                      list_position: isTop ? 1 : 2,
                      price: 100,
                    },
                  ],
                })
              }}
            >
              Register now
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box textAlign={{ xs: 'center', sm: 'left' }} mb={5}>
        <Typography variant="caption" component="p">
          * You will receive a link to the Zoom meeting a few days before
        </Typography>
      </Box>
    </>
  )
}

export default MinishopRegister
