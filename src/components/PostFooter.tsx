import { Typography, Box, Divider, Link, Stack } from '@mui/material'
import Share from './Share'
import PostBio from './PostBio'
import SubscribeForm from './SubscribeForm'

interface Props {
  summary: string
  slug: string
  tags?: string[]
  title: string
  url: string
}

const PostFooter = ({ summary, slug, tags, title, url }: Props) => {
  return (
    <Stack
      component="footer"
      direction="column"
      spacing={2}
      alignItems="center"
    >
      <Box mx="auto" mt={2} mb={4} maxWidth="500px">
        <SubscribeForm />
      </Box>

      <Divider variant="middle" />

      <PostBio />

      <Divider variant="middle" />

      <Typography align="center" variant="h6" component="p">
        <Link
          href={`https://twitter.com/search?q=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on Twitter
        </Link>
        {' // '}
        <Link
          href={`https://github.com/benmvp/benmvp.com/edit/main/content/posts${slug}index.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit on GitHub
        </Link>
      </Typography>
    </Stack>
  )
}

export default PostFooter
