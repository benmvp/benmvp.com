import React from 'react'
import { Box, IconButton, styled } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TwitterIcon from '@mui/icons-material/Twitter'
import SITE_CONFIG from '../config/site'

const Item = styled('li')({ listStyle: 'none' })

const SocialIcons = () => {
  return (
    <Box component="ul" display="flex" justifyContent="center" p={0} my={0}>
      <Item>
        <a
          href={SITE_CONFIG.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Ben on Twitter"
        >
          <IconButton color="secondary" aria-label="Ben's Twitter profile">
            <TwitterIcon fontSize="large" />
          </IconButton>
        </a>
      </Item>
      <Item>
        <a
          href={SITE_CONFIG.github}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Ben's Github profile"
        >
          <IconButton color="secondary" aria-label="Ben's Github profile">
            <GitHubIcon fontSize="large" />
          </IconButton>
        </a>
      </Item>
      <Item>
        <a
          href={SITE_CONFIG.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          title="Visit Ben's LinkedIn resume"
        >
          <IconButton color="secondary" aria-label="Ben's LinkedIn profile">
            <LinkedInIcon fontSize="large" />
          </IconButton>
        </a>
      </Item>
    </Box>
  )
}

export default SocialIcons
