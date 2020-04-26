import React, { useState, useEffect, useCallback } from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Share from './Share'
import { getBlogUrl } from '../utils'

const useCopyUrl = (
  url: string,
): [{ copyText: string; copyButtonColor: string }, () => void] => {
  const [copyStatus, setCopyStatus] = useState<
    'inactive' | 'copied' | 'failed'
  >('inactive')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (copyStatus !== 'inactive') {
      timeoutId = setTimeout(() => {
        setCopyStatus('inactive')
      }, 2500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [copyStatus])

  const copy = useCallback(() => {
    navigator.clipboard.writeText(url).then(
      () => {
        setCopyStatus('copied')
      },
      () => {
        setCopyStatus('failed')
      },
    )
  }, [url])

  let copyText = 'Copy URL'
  let copyButtonColor = 'primary'

  if (copyStatus === 'copied') {
    copyText = 'Copied'
    copyButtonColor = 'secondary'
  } else if (copyStatus === 'failed') {
    copyText = 'Failed!'
    copyButtonColor = 'default'
  }

  return [{ copyText, copyButtonColor }, copy]
}

interface Props {
  date: string
  hero: any
  heroAlt: string
  mode?: 'min' | 'full'
  slug: string
  summary: string
  tags?: string[]
  title: string
}

const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      height: 266.66667,
    },
    buttons: {
      flex: 1,
      marginRight: theme.spacing(2),
    },
  }),
)

const PostCard = ({
  date,
  hero,
  heroAlt,
  mode = 'full',
  slug,
  summary,
  tags,
  title,
}: Props) => {
  const classes = useStyles()
  const url = getBlogUrl(slug)
  const [{ copyText, copyButtonColor }, copy] = useCopyUrl(url)
  const showHero = mode !== 'min'
  const showDate = mode !== 'min'
  const showShare = mode !== 'min'

  return (
    <Card>
      <CardActionArea component={Link} to={`/blog${slug}`} underline="none">
        {hero && showHero && (
          <CardMedia
            component="img"
            image={hero.childImageSharp.fluid.src}
            title={heroAlt}
            className={classes.media}
          />
        )}
        <CardContent>
          {showDate && (
            <Typography
              gutterBottom
              variant="subtitle2"
              color="textSecondary"
              component="h4"
            >
              {date}
            </Typography>
          )}
          <Typography
            gutterBottom
            variant="h5"
            color="textPrimary"
            component="h3"
            noWrap
          >
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {summary}
          </Typography>
        </CardContent>
      </CardActionArea>
      {showShare && (
        <CardActions>
          <Box className={classes.buttons}>
            <Button size="small" color={copyButtonColor} onClick={copy}>
              {copyText}
            </Button>
          </Box>
          <Share
            iconSize={32}
            summary={summary}
            tags={tags}
            title={title}
            url={url}
            options={new Set(['twitter', 'facebook', 'pocket'])}
          />
        </CardActions>
      )}
    </Card>
  )
}

export default PostCard

export const dataFragment = graphql`
  fragment PostCardInfo on MarkdownRemark {
    frontmatter {
      title
      description
      tags
      date(formatString: "DD MMMM YYYY")
      hero {
        childImageSharp {
          fluid(maxWidth: 550, traceSVG: { color: "#3f51b5" }, quality: 50) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      heroAlt
    }
    fields {
      slug
    }
    excerpt
  }
`
