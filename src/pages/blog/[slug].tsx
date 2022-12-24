import React from 'react'
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import {
  makeStyles,
  createStyles,
  Divider,
  Typography,
  Grid,
} from '@material-ui/core'
import Layout from '../../components/Layout'
import PostHeader from '../../components/PostHeader'
import Content from '../../components/Content'
import PostFooter from '../../components/PostFooter'
import PostCard from '../../components/PostCard'
import Seo from '../../components/Seo'
import { formatDate, formatDateIso, getBlogUrl } from '../../utils'
import generateSocialImage from '../../utils/generate-social-image'
import { getAllPostIds, getPostData, PostData } from '../../utils/posts'
import { author } from '../../../config/site'

interface QueryParams extends ParsedUrlQuery {
  slug?: string
}

export const getStaticPaths: GetStaticPaths<QueryParams> = async () => {
  const postIds = await getAllPostIds()

  return {
    paths: postIds.map((slug) => ({
      params: {
        slug,
      },
    })),

    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PostData, QueryParams> = async ({
  params,
}) => {
  const slug = params?.slug
  const postData = slug ? await getPostData(slug) : undefined

  if (!postData) {
    return { notFound: true }
  }

  return {
    props: {
      ...postData,
    },
  }
}

interface PostCardListProps {
  category: string
  posts: PostData[]
}

const PostCardList = ({ category, posts }: PostCardListProps) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h5" component="h3">
        More from Ben Ilegbodu on <strong>{category}</strong>...
      </Typography>
    </Grid>
    {posts.map(
      ({ date, excerpt, hero, shortDescription, slug, tags, title }) => (
        <Grid key={slug} item xs={12} sm={6}>
          <PostCard
            mode="min"
            slug={slug}
            title={title}
            tags={tags}
            date={formatDate(date)}
            summary={shortDescription || excerpt}
            hero={hero}
          />
        </Grid>
      ),
    )}
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

const Post: NextPage<PostData> = ({
  excerpt,
  date,
  html,
  slug,
  category,
  hero,
  // heroAlt,
  // heroCredit,
  shortDescription,
  tags,
  timeToRead,
  title,
  wordCount,
}) => {
  const classes = useStyles()
  // const { post, categoryPosts, site } = data
  // const { fields, frontmatter, excerpt, timeToRead, wordCount } = post
  const formattedDate = formatDate(date)
  const formattedDateIso = formatDateIso(date)
  const summary = shortDescription || excerpt
  const url = getBlogUrl(slug)
  const seoImageUrl = generateSocialImage({
    title,
    tagline: shortDescription,
    date,
  })
  // const relatedPosts = categoryPosts?.edges ? [...categoryPosts?.edges] : []
  const relatedPosts: PostData[] = []
  const totalRelatedPosts = relatedPosts.length
  const maxRelatedPosts = 4

  if (relatedPosts.length > maxRelatedPosts) {
    // We need to randomly remove (N - X) items from the array so that we'll
    // have X remaining.
    for (let i = 0; i < totalRelatedPosts - maxRelatedPosts; i++) {
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
          { property: 'og:article:published_time', content: formattedDateIso },
          {
            property: 'og:article:author',
            content: author,
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
            name: author,
          },
          datePublished: formattedDateIso,
          publisher: {
            '@type': 'Person',
            name: author,
          },
          teaches: category,
          timeRequired: `PT${timeToRead}M`,
          wordCount: wordCount,
        }}
      />
      <PostHeader
        className={classes.header}
        title={title}
        subTitle={shortDescription}
        timeToRead={timeToRead}
        date={formattedDate}
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

          <PostCardList category={category} posts={relatedPosts} />
        </>
      )}
    </Layout>
  )
}

export default Post

/*export const query = graphql`
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
`*/
