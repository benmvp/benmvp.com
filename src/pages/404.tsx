import React, { useEffect } from 'react'
import {
  makeStyles,
  createStyles,
  Typography,
  Box,
  Grid,
  Divider,
  Link,
} from '@material-ui/core'
import NextLink from 'next/link'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import MinishopCard from '../components/MinishopCard'
import PostCard from '../components/PostCard'
import Seo from '../components/Seo'
import { getFullUrl } from '../utils'
import useMinishops, { Minishop } from '../utils/useMinishops'
import notFound from '../../public/images/desert-keith-hardy-PP8Escz15d8-unsplash.jpg'

const PAGE_TITLE = 'Page Not Found'

const MinishopList = ({ minishops }: { minishops: Minishop[] }) => (
  <Grid container spacing={2}>
    {minishops.map((minishop) => (
      <Grid key={minishop.id} item xs={12} lg={6}>
        <MinishopCard
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
        <NextLink href="/minishops/" passHref legacyBehavior>
          <Link variant="h6">View all minishops &gt;</Link>
        </NextLink>
      </Box>
    </Grid>
  </Grid>
)
const PostCardList = ({ posts }) => (
  <Grid container spacing={2}>
    {posts.edges.map(({ node }) => (
      <Grid key={node.id} item xs={12} sm={6} lg={4}>
        <PostCard
          slug={node.fields.slug}
          title={node.frontmatter.title}
          tags={node.frontmatter.tags}
          date={node.frontmatter.date}
          summary={node.frontmatter.shortDescription || node.excerpt}
          hero={node.frontmatter.hero}
        />
      </Grid>
    ))}
    <Grid item xs={12}>
      <Box
        display="flex"
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        width="100%"
      >
        <Link href="/blog/" variant="h6">
          View all posts &gt;
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

const NotFound = () => {
  const classes = useStyles()
  const {
    upcoming: upcomingMinishops,
    remaining: remainingMinishops,
  } = useMinishops()
  const minishops = upcomingMinishops.length
    ? upcomingMinishops
    : remainingMinishops

  useEffect(() => {
    if (upcomingMinishops.length) {
      window.gtag?.('event', 'view_item_list', {
        items: upcomingMinishops.map((node, index) => ({
          id: node.frontmatter.event?.id,
          name: node.frontmatter.title,
          list_name: '404',
          list_position: index + 1,
          price: 100,
        })),
      })
    }
  }, [upcomingMinishops])

  return (
    <Layout maxWidth="lg">
      <Seo title={PAGE_TITLE} url={getFullUrl('/404/')} image={notFound} />
      <PageHeader title={PAGE_TITLE} />

      <HeroImage src={notFound} alt={PAGE_TITLE} className={classes.image} />

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

      <Divider variant="middle" className={classes.divider} />

      <Box component="section" className={classes.section}>
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          aria-label="Join one of Ben's upcoming minishops"
        >
          Upcoming minishops
        </Typography>
        <MinishopList minishops={minishops} />
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
