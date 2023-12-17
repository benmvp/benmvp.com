import { Box, Typography, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import type { DOMAttributes } from 'react'

const Article = (props: {
  dangerouslySetInnerHTML: DOMAttributes<'article'>['dangerouslySetInnerHTML']
}) => (
  <Typography
    dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
    component="article"
    variant="body1"
  />
)

const Body = styled('article')(({ theme }) => ({
  '& h2': theme.typography.h5,
  '& h3': theme.typography.h6,
  '& h4': theme.typography.h6,
  '& h5': theme.typography.subtitle1,
  '& h6': theme.typography.subtitle2,
  '& p': {
    ...theme.typography.body1,
    margin: theme.spacing(0, 0, 2, 0),
  },
  '& ul': {
    listStyle: 'circle',
    padding: theme.spacing(0, 0, 0, 3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(0, 0, 0, 4),
    },
  },
  '& li': {
    margin: theme.spacing(0, 0, 1, 0),
  },
  '& a:not(.anchor)': {
    color: theme.palette.primary.main,
  },
  '& blockquote': {
    borderLeft: `5px solid ${theme.palette.secondary.main}`,
    fontStyle: 'italic',
    margin: theme.spacing(2.5, 0, 2.5, 5),
    padding: theme.spacing(1.5),
    '& p': {
      margin: 0,
    },
  },
  '& hr': {
    border: 'none',
    height: 1,
    width: '50%',
    backgroundColor: theme.palette.divider,
    margin: theme.spacing(4, 'auto'),
  },
  // '& .gatsby-highlight': {
  //   // code blocks
  //   marginBottom: theme.spacing(3),
  // },
  // '& .gatsby-resp-iframe-wrapper': {
  //   // iframes (video embeds)
  //   margin: theme.spacing(0, 0, 3, 2),
  // },
  // '& .twitter-tweet': {
  //   margin: `0 auto ${theme.spacing(2)}px auto`,
  // },
}))
const ImageWrapper = styled('div')({
  height: 300,
  position: 'relative',
  width: '100%',

  '& img': {
    maxWidth: 800,
    objectFit: 'contain',
  },
})

interface Props {
  /**
   * The HTML content as a string
   */
  compiledSource: string

  slug: string
}

interface ContentImageProps extends ImageProps {
  credit?: {
    name: string
    url: string
  }
}

const Content = ({ compiledSource, slug }: Props) => {
  const components = {
    Image: ({ credit, ...props }: ContentImageProps) => (
      <Box mb={2}>
        <ImageWrapper>
          <Image
            {...props}
            alt={props.alt}
            src={`/images/posts/${slug}/${props.src}`}
            fill
            sizes="100vw"
          />
        </ImageWrapper>

        {credit && (
          <Typography
            component="em"
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              maxWidth: 800,
              my: 1,
              mx: 2,
            }}
          >
            Photo by{' '}
            <a href={credit.url} target="_blank" rel="noopener noreferrer">
              {credit.name}
            </a>
          </Typography>
        )}
      </Box>
    ),
  }

  return (
    <Body
      sx={{ typography: 'body1' }}
      // dangerouslySetInnerHTML={{ __html: children }}
    >
      <MDXRemote
        compiledSource={compiledSource}
        scope={undefined}
        frontmatter={undefined}
        components={components}
      />
    </Body>
  )
}

export default Content
