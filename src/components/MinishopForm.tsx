import React from 'react'
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
import ScheduleIcon from '@material-ui/icons/Schedule'
import SendIcon from '@material-ui/icons/Send'

interface Props {
  slug: string
  title: string
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    root: {
      textAlign: 'center',
      maxWidth: '500px',
      margin: theme.spacing(5, 'auto'),
      padding: theme.spacing(4),
    },
    button: {
      marginTop: theme.spacing(3),
    },
  })
})

const MinishopForm = ({ slug, title }: Props) => {
  const classes = useStyles()

  return (
    <Paper component="section" elevation={3} className={classes.root}>
      <Typography variant="h5" component="h1" gutterBottom>
        The next <strong>{title}</strong> is coming soon!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide your email to be notified when the next one is scheduled so you
        can ensure you get a spot and the best price.
      </Typography>
      <Box
        component="form"
        method="post"
        mt={3}
        name="minishop"
        data-netlify="true"
      >
        <TextField
          id="minishop-form-email"
          name="email"
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
        />
        <TextField
          id="minishop-form-name"
          name="name"
          label="Name"
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
        />
        <TextField
          id="minishop-form-learn"
          name="learn"
          label="What days & times work for you?"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ScheduleIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant="caption" component="p" gutterBottom>
          (your email is only used for minishop notification)
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          endIcon={<SendIcon />}
          className={classes.button}
        >
          Notify me
        </Button>
        <input type="hidden" name="slug" value={slug} />
        <input type="hidden" name="form-name" value="minishop" />
      </Box>
    </Paper>
  )
}

export default MinishopForm
