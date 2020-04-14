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

interface Props {
  bioHtml: string
  className?: string
  excerpt: string
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
      width: '60%',
    },
  })
})

const PostFooter = ({
  bioHtml,
  className,
  excerpt,
  slug,
  tags,
  title,
  url,
}: Props) => {
  const classes = useStyles()

  return (
    <Box component="footer" className={className}>
      <Share url={url} title={title} summary={excerpt} tags={tags} />
      <Divider className={classes.divider} />
      <PostBio html={bioHtml} />
      <Divider className={classes.divider} />
      <Typography align="center" variant="h6" component="p">
        <Link
          href={`https://twitter.com/search?q=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Discuss on Twitter
        </Link>{' '}
        //{' '}
        <Link
          href={`https://github.com/benmvp/benmvp.com/edit/master/content/posts${slug}index.md`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Edit on Github
        </Link>
      </Typography>
    </Box>
  )
}

export default PostFooter
