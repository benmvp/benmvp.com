import { Box, Typography, styled } from '@mui/material'
import Image, { ImageProps } from 'next/image'
import { MDXRemote } from 'next-mdx-remote'

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
  // video players
  '& iframe': {
    display: 'block',
    margin: theme.spacing(4, 'auto'),
  },
  '& .twitter-tweet': {
    margin: theme.spacing(0, 'auto', 2),
  },
}))

interface Props {
  /**
   * The HTML content as a string
   */
  compiledSource: string

  slug: string

  type: 'minishop' | 'page' | 'post'
}

interface ContentImageProps extends ImageProps {
  credit?: {
    name: string
    url: string
  }
}

const Content = ({ compiledSource, slug, type }: Props) => {
  const components = {
    Image: ({ credit, ...props }: ContentImageProps) => (
      <Box mb={2}>
        <Box
          pb="56.25%"
          position="relative"
          overflow="hidden"
          mx={{
            xs: -2,
            sm: -3,
          }}
        >
          <Image
            {...props}
            alt={props.alt}
            src={`/images/${type}/${slug}/${props.src}`}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </Box>

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
    <Body sx={{ typography: 'body1' }}>
      <MDXRemote
        compiledSource={compiledSource}
        scope={undefined}
        frontmatter={undefined}
        components={components}
      />
      <script async src="https://platform.twitter.com/widgets.js"></script>
    </Body>
  )
}

export default Content
