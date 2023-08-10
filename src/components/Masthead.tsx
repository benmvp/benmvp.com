import { ReactNode } from 'react'
import Image from 'next/image'
import { Box, styled, Typography } from '@mui/material'
import mastheadImage from './images/ben-ilegbodu-masthead.jpg'
import { HEADER_HEIGHT } from './Header'

const Root = styled(Box)(({ theme }) => ({
  position: 'relative',
  maxHeight: '300px',
  maxWidth: '3000px',
  height: '100vh',

  [theme.breakpoints.up('sm')]: {
    maxHeight: '450px',
  },
  [theme.breakpoints.up('md')]: {
    maxHeight: 'inherit',
    height: `calc(100vh - ${HEADER_HEIGHT})`,
  },
}))
const TextShell = styled(Box)({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '50%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
})
const Heading = styled((props: { children: ReactNode }) => (
  <Typography {...props} component="h1" variant="inherit" />
))(({ theme }) => ({
  color: theme.palette.primary.contrastText,

  marginLeft: theme.spacing(1),
  ...theme.typography.h6,

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    ...theme.typography.h4,
  },

  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    ...theme.typography.h3,
  },

  [theme.breakpoints.up('lg')]: {
    marginLeft: theme.spacing(4),
    ...theme.typography.h2,
  },
}))

const Masthead = () => {
  return (
    <Root>
      <Image
        src={mastheadImage}
        alt="A cropped image of Ben Ilegbodu speaking at a conference"
        placeholder="blur"
        fill
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      <TextShell>
        <Heading>
          Hi, I&apos;m <strong>Ben Ilegbodu</strong>. I want to help you level
          up your frontend skills.
        </Heading>
      </TextShell>
    </Root>
  )
}

export default Masthead
