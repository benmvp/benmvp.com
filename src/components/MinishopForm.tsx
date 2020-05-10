import React from 'react'
import {
  makeStyles,
  createStyles,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from '@material-ui/core'
import EmailIcon from '@material-ui/icons/Email'
import PersonIcon from '@material-ui/icons/Person'
import SchoolIcon from '@material-ui/icons/School'
import SendIcon from '@material-ui/icons/Send'

interface Props {
  slug: string
  title: string
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    button: {
      marginTop: theme.spacing(3),
    },
  })
})

const MinishopForm = ({ slug, title }: Props) => {
  const classes = useStyles()

  return (
    <Box
      component="section"
      border={3}
      borderColor="secondary.main"
      borderRadius="borderRadius"
      textAlign="center"
      maxWidth="500px"
      mx="auto"
      my={5}
      p={4}
    >
      <Typography variant="h5" component="h1" gutterBottom>
        <strong>{title}</strong> is not currently scheduled
      </Typography>
      <Typography variant="body1" gutterBottom>
        Provide your email to be notified when the next minishop is scheduled so
        you can ensure you get a spot and get the best price.
      </Typography>
      <Box
        component="form"
        method="post"
        mt={3}
        name="minishop"
        data-netlify="true"
      >
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
          id="minishop-form-learn"
          name="learn"
          label="Share 1 or 2 things you'd like to learn"
          variant="outlined"
          fullWidth
          margin="normal"
          multiline
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SchoolIcon />
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
    </Box>
  )
}

export default MinishopForm
