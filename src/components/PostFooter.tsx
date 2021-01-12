import React from 'react'
import {
  makeStyles,
  createStyles,
  Typography,
  Box,
  Divider,
  Link,
} from '@material-ui/core'
import Share from './Share'
import PostBio from './PostBio'
import SubscribeForm from './SubscribeForm'

interface Props {
  className?: string
  summary: string
  slug: string
  tags?: string[]
  title: string
  url: string
}

const useStyles = makeStyles((theme) => {
  return createStyles({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  })
})

const PostFooter = ({ className, summary, slug, tags, title, url }: Props) => {
  const classes = useStyles()

  return (
    <Box component="footer" className={className}>
      <Share
        url={url}
        title={title}
        summary={summary}
        tags={tags}
        type="post"
      />

      <Box mx="auto" mt={2} mb={4} maxWidth="500px">
        <SubscribeForm />
      </Box>

      <Divider className={classes.divider} variant="middle" />

      <PostBio />

      <Divider className={classes.divider} variant="middle" />

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
    </Box>
  )
}

export default PostFooter
