import React, { useEffect } from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Box,
  Divider,
} from '@material-ui/core'
import { Link } from 'gatsby-theme-material-ui'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
import MinishopCard from '../components/MinishopCard'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'
import generateSocialImage from '../utils/generate-social-image'
import useMinishops, { Minishop } from '../utils/useMinishops'

const MinishopList = ({ minishops }: { minishops: Minishop[] }) => (
  <Grid container spacing={2}>
    {minishops.map((minishop) => (
      <Grid key={minishop.id} item xs={12}>
        <MinishopCard
          mode="min"
          slug={minishop.fields.slug}
          title={minishop.frontmatter.title}
          tags={minishop.frontmatter.tags}
          summary={minishop.frontmatter.shortDescription || minishop.excerpt}
          event={minishop.frontmatter.event}
        />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/minishops/" variant="h6">
          View all minishops &gt;
        </Link>
      </Box>
    </Grid>
  </Grid>
)

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    footer: {
      marginTop: theme.spacing(3),
    },
    minishops: {
      marginTop: theme.spacing(2),
    },
    minishopsDivider: {
      margin: theme.spacing(0, 'auto', 3),
      width: '50%',
    },
    minishopsDescription: {
      marginBottom: theme.spacing(2),
    },
  }),
)

const Post = ({ data }) => {
  const classes = useStyles()
  const {
    upcoming: upcomingMinishops,
    remaining: remainingMinishops,
  } = useMinishops()
  const otherMinishops = upcomingMinishops.length
    ? upcomingMinishops
    : remainingMinishops
  const { post, site } = data
  const { html, fields, frontmatter, excerpt, timeToRead, wordCount } = post
  const { title, date, dateIso, shortDescription, tags, category } = frontmatter
  const { slug } = fields
  const summary = shortDescription || excerpt
  const url = getBlogUrl(slug)
  const seoImageUrl = generateSocialImage({
    title,
    tagline: shortDescription,
  })

  useEffect(() => {
    if (upcomingMinishops.length) {
      window.gtag?.('event', 'view_item_list', {
        items: upcomingMinishops.map((node, index) => ({
          id: node.frontmatter.event?.id,
          name: node.frontmatter.title,
          list_name: 'Post',
          list_position: index + 1,
          price: 100,
        })),
      })
    }
  }, [upcomingMinishops])

  return (
    <Layout showAds>
      <Seo
        title={title}
        description={summary}
        url={url}
        image={seoImageUrl}
        imageAlt={title}
        type="article"
        meta={[
          { property: 'og:article:published_time', content: dateIso },
          {
            property: 'og:article:author',
            content: site.siteMetadata.author.name,
          },
          { property: 'og:article:section', content: 'Technology' },
          ...(tags || []).map((tag) => ({
            property: 'og:article:tag',
            content: tag,
          })),
        ]}
        schemaOrg={{
          '@type': 'BlogPosting',
          headline: shortDescription,
          articleBody: html,
          author: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
          },
          datePublished: dateIso,
          publisher: {
            '@type': 'Person',
            name: site.siteMetadata.author.name,
          },
          teaches: category,
          timeRequired: `PT${timeToRead}M`,
          wordCount: wordCount.words,
        }}
      />
      <PostHeader
        className={classes.header}
        title={title}
        subTitle={shortDescription}
        timeToRead={timeToRead}
        date={date}
      />
      <Content>{html}</Content>
      <PostFooter
        className={classes.footer}
        url={url}
        slug={slug}
        title={title}
        summary={summary}
        tags={tags}
      />
      {!!otherMinishops.length && (
        <Box component="section" className={classes.minishops}>
          <Divider className={classes.minishopsDivider} />
          <Typography component="h3" variant="h5" gutterBottom>
            Attend upcoming minishops
          </Typography>
          <Typography variant="body1" className={classes.minishopsDescription}>
            <Link to="/minishops/">Minishops by Ben Ilegbodu</Link> are
            fully-remote workshops that last about 3 hours. They’re
            highly-focused, covering only the concepts you want to learn so that
            you can level up your skills and get on with the rest of your day.
          </Typography>
          <MinishopList minishops={otherMinishops} />
        </Box>
      )}
    </Layout>
  )
}

export default Post

export const query = graphql`
  query PostInfo($slug: String!) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      timeToRead
      wordCount {
        words
      }
      fields {
        slug
      }
      frontmatter {
        title
        shortDescription
        tags
        category
        date(formatString: "MMMM DD, YYYY")
        dateIso: date(formatString: "YYYY-MM-DD")
      }
    }
    site {
      siteMetadata {
        author {
          name
        }
      }
    }
  }
`
