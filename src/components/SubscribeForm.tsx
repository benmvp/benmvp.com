import React, { FormEvent, useState } from 'react'
import {
  makeStyles,
  createStyles,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Paper,
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import SendIcon from '@material-ui/icons/Send'

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      textAlign: 'center',
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(1),
    },
  })
})

const SubscribeForm = () => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    window.gtag?.('event', 'generate_lead', {
      currency: 'USD',
      value: 1,
    })

    console.log({ email, firstName })
  }

  return (
    <Paper component="section" elevation={3} className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        Subscribe to the Newsletter
      </Typography>
      <Typography variant="body1" gutterBottom>
        Get notified about new blog posts, minishops &amp; other events
      </Typography>
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          className={classes.button}
        >
          Subscribe
        </Button>
      </Box>
    </Paper>
  )
}

export default SubscribeForm
