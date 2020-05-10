import React from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Typography,
  Box,
  Grid,
  Divider,
} from '@material-ui/core'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import PostCard from '../components/PostCard'
import Seo from '../components/Seo'
import { getUrl } from '../utils'

const PAGE_TITLE = 'Page Not Found'

const PostCardList = ({ posts }) => (
  <Grid container spacing={2}>
    {posts.edges.map(({ node }) => (
      <Grid key={node.id} item xs={12} sm={6} lg={4}>
        <PostCard
          slug={node.fields.slug}
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          date={node.frontmatter.date}
          summary={node.frontmatter.description || node.excerpt}
          hero={node.frontmatter.hero}
          heroAlt={node.frontmatter.heroAlt}
        />
      </Grid>
    ))}
  </Grid>
)

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    divider: {
      marginTop: theme.spacing(3),
    },
    section: {
      marginTop: theme.spacing(3),
    },
  }),
)

const NotFound = ({ data }) => {
  const classes = useStyles()
  const { recentPosts, hero } = data

  return (
    <Layout maxWidth="lg">
      <Seo title={PAGE_TITLE} url={getUrl('/404/')} />
      <PageHeader title={PAGE_TITLE} />

      <HeroImage
        fluid={hero.childImageSharp.fluid}
        alt={PAGE_TITLE}
        className={classes.image}
      />

      <Typography variant="h5" component="p" align="center">
        Sorry, but the page you were trying to view does not exist!
      </Typography>

      <Divider variant="middle" className={classes.divider} />

      <Box component="section" className={classes.section}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          aria-label="Read one of Ben's recent blog posts"
        >
          Recent posts
        </Typography>
        <PostCardList posts={recentPosts} />
      </Box>
    </Layout>
  )
}

export default NotFound

export const query = graphql`
  query NotFoundPageInfo {
    recentPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//content/posts//" }
        frontmatter: { published: { ne: false } }
      }
      limit: 6
    ) {
      edges {
        node {
          id
          ...PostCardInfo
        }
      }
    }
    hero: file(
      relativePath: { eq: "desert-keith-hardy-PP8Escz15d8-unsplash.jpg" }
    ) {
      ...HeroFluid960
    }
  }
`
