import React, { ChangeEventHandler, FormEvent, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import Bugsnag from '@bugsnag/js'
import EmailIcon from '@mui/icons-material/Email'
import PersonIcon from '@mui/icons-material/Person'
import SendIcon from '@mui/icons-material/Send'

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params: unknown) => void
  }
}

class SubscribeError extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'SubscribeError'
  }
}

const addSubscriber = async (
  email: string,
  firstName: string,
  referrer: string,
) => {
  const body = JSON.stringify({
    email,
    firstName,
    referrer,
  })
  const res = await fetch('/api/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': `${body.length}`,
    },
    body,
  })
  const data = await res.json()

  if (!res.ok) {
    if (res.status === 422) {
      throw new SubscribeError(data.message)
    } else {
      throw new Error(data.message)
    }
  }

  return data
}

type Status =
  | { state: 'inactive' }
  | { state: 'loading' }
  | { state: 'success'; message: string }
  | { state: 'error'; message: string }

const useSubscribeForm = () => {
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [status, setStatus] = useState<Status>({ state: 'inactive' })

  const onEmailChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => setEmail(e.target.value)
  const onFirstNameChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => setFirstName(e.target.value)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (status.state === 'loading') {
      return
    }

    setStatus({ state: 'loading' })

    try {
      await addSubscriber(email, firstName, window.location.href)

      setStatus({
        state: 'success',
        message:
          'You have successfully subscribed! Check your email to confirm your subscription',
      })
      setEmail('')
      setFirstName('')

      window.gtag?.('event', 'generate_lead', {
        currency: 'USD',
        value: 1,
      })
    } catch (err) {
      if (err instanceof SubscribeError) {
        setStatus({ state: 'error', message: err.message })
      } else {
        setStatus({
          state: 'error',
          message: 'Unknown error. Please try again.',
        })
        Bugsnag.notify(err as Error)
      }
    }
  }

  return {
    email,
    onEmailChange,
    firstName,
    onFirstNameChange,
    status,
    resetStatus: () => setStatus({ state: 'inactive' }),
    handleSubmit,
  }
}

const SubscribeForm = () => {
  const {
    email,
    onEmailChange,
    firstName,
    onFirstNameChange,
    status,
    resetStatus,
    handleSubmit,
  } = useSubscribeForm()

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{ textAlign: 'center', padding: 2 }}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        Subscribe to the Newsletter
      </Typography>
      <Typography variant="body1" gutterBottom>
        Get notified about new blog posts, minishops &amp; other goodies
      </Typography>

      <Collapse in={status.state === 'success' || status.state === 'error'}>
        <Box mt={1}>
          <Alert
            severity={status.state === 'success' ? 'success' : 'error'}
            onClose={resetStatus}
          >
            {status.state === 'success' || status.state === 'error'
              ? status.message
              : ''}
          </Alert>
        </Box>
      </Collapse>

      <Box
        component="form"
        method="post"
        mt={1}
        name="subscribe"
        onSubmit={handleSubmit}
      >
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          label="First Name"
          variant="outlined"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          value={firstName}
          onChange={onFirstNameChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={
            status.state === 'loading' ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <SendIcon />
            )
          }
          sx={{ marginTop: 1 }}
        >
          Subscribe
        </Button>
      </Box>
    </Paper>
  )
}

export default SubscribeForm
