import React from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Divider,
  Typography,
  Grid,
} from '@material-ui/core'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
import PostCard from '../components/PostCard'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'
import generateSocialImage from '../utils/generate-social-image'

const PostCardList = ({ posts, category }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h3">
        More from Ben Ilegbodu on <strong>{category}</strong>...
      </Typography>
    </Grid>
    {posts.map(({ node }) => (
      <Grid key={node.id} item xs={12} sm={6}>
        <PostCard
          mode="min"
          slug={node.fields.slug}
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          date={node.frontmatter.date}
          summary={node.frontmatter.shortDescription || node.excerpt}
          hero={node.frontmatter.hero}
        />
      </Grid>
    ))}
  </Grid>
)

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(3),
    },
    footer: {
      marginTop: theme.spacing(3),
    },
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  }),
)

const Post = ({ data }) => {
  const classes = useStyles()
  const { post, categoryPosts, site } = data
  const { html, fields, frontmatter, excerpt, timeToRead, wordCount } = post
  const { title, date, dateIso, shortDescription, tags, category } = frontmatter
  const { slug } = fields
  const summary = shortDescription || excerpt
  const url = getBlogUrl(slug)
  const seoImageUrl = generateSocialImage({
    title,
    tagline: shortDescription,
    date,
  })
  const relatedPosts = [...categoryPosts.edges]
  const totalRelatedPosts = relatedPosts.length
  const numRelatedPosts = 4

  if (relatedPosts.length > numRelatedPosts) {
    // We need to randomly remove (N - X) items from the array so that we'll
    // have X remaining.
    for (let i = 0; i < totalRelatedPosts - numRelatedPosts; i++) {
      const randomIndex = Math.floor(Math.random() * relatedPosts.length)

      relatedPosts.splice(randomIndex, 1)
    }
  }

  return (
    <Layout showAds includeSubscribe={false}>
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
      {relatedPosts.length > 0 && (
        <>
          <Divider className={classes.divider} variant="middle" />

          <PostCardList posts={relatedPosts} category={category} />
        </>
      )}
    </Layout>
  )
}

export default Post

export const query = graphql`
  query PostInfo($slug: String!, $category: String!) {
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
    categoryPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        fields: { slug: { ne: $slug } }
        frontmatter: { published: { ne: false }, category: { eq: $category } }
      }
    ) {
      edges {
        node {
          id
          ...PostCardInfo
        }
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
