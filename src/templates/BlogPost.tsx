import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles, Typography, Box } from '@material-ui/core'
import Layout from '../components/Layout'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    content: {
      '& h2': theme.typography.h4,
      '& h3': theme.typography.h5,
      '& h4': theme.typography.h6,
      '& h5': theme.typography.h6,
      '& h6': theme.typography.h6,
      '& p': {
        ...theme.typography.body1,
        margin: `0 0 ${theme.spacing(2)}px 0`,
      },
      '& ul': {
        listStyle: 'circle',
        padding: `0 0 0 ${theme.spacing(3)}px`,
        [theme.breakpoints.up('md')]: {
          padding: `0 0 0 ${theme.spacing(4)}px`,
        },
      },
      '& li': {
        margin: `0 0 ${theme.spacing(1)}px 0`,
      },
      '& a:not(.anchor)': {
        color: theme.palette.primary.main,
      },
      '& blockquote': {
        borderLeft: `5px solid ${theme.palette.secondary.main}`,
        fontStyle: 'italic',
        margin: `${theme.spacing(2.5)}px 0 ${theme.spacing(
          2.5,
        )}px ${theme.spacing(5)}px`,
        padding: theme.spacing(1.5),
        '& p': {
          margin: 0,
        },
      },
      '& .gatsby-highlight': {
        // code blocks
        margin: `0 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`,
      },
      '& .gatsby-resp-iframe-wrapper': {
        // iframes (video embeds)
        margin: `0 0 ${theme.spacing(3)}px ${theme.spacing(2)}px`,
      },
    },
  }),
)

export default ({ data }) => {
  const classes = useStyles()
  const { html, frontmatter } = data.markdownRemark
  const { title, subTitle, date } = frontmatter

  return (
    <Layout>
      <Box component="header" className={classes.header}>
        <Typography variant="h3" component="h1" gutterBottom>
          {title}
        </Typography>
        {subTitle && (
          <Typography variant="h5" component="h2" gutterBottom>
            {subTitle}
          </Typography>
        )}
        <Typography variant="subtitle2" component="p" gutterBottom>
          {date}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        component="article"
        dangerouslySetInnerHTML={{ __html: html }}
        className={classes.content}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        subTitle
        date(formatString: "DD MMMM YYYY")
      }
    }
  }
`
