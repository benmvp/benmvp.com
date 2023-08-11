import { Grid, styled } from '@mui/material'
import Image from 'next/image'
import SITE_CONFIG from '../config/site'

const Logo = styled(Image)(({ theme }) => ({
  borderRadius: '50%',
  margin: theme.spacing(0, 'auto'),
  width: 80,
  height: 80,
}))

const PostBio = () => {
  return (
    <Grid component="section" container spacing={2} alignItems="center">
      <Grid item xs={12} sm={2} component="aside" textAlign="center">
        <a
          href="https://twitter.com/benmvp"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Logo
            src="/logo.png"
            alt={SITE_CONFIG.author}
            width={80}
            height={80}
          />
        </a>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        component="article"
        dangerouslySetInnerHTML={{ __html: SITE_CONFIG.authorBio }}
      />
    </Grid>
  )
}

export default PostBio
