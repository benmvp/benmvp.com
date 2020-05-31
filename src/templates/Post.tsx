import React from 'react'
import { graphql } from 'gatsby'
import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Box,
  Divider,
} from '@material-ui/core'
import Layout from '../components/Layout'
import PostHeader from '../components/PostHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import PostFooter from '../components/PostFooter'
import MinishopCard from '../components/MinishopCard'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'
import useMinishops from '../utils/useMinishops'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
    footer: {
      marginTop: theme.spacing(3),
    },
    minishops: {
      marginTop: theme.spacing(2),
    },
    minishopsDivider: {
      margin: theme.spacing(0, 'auto', 5),
      width: '50%',
    },
    minishopsGrid: {
      marginTop: theme.spacing(2),
    },
  }),
)

const Post = ({ data }) => {
  const classes = useStyles()
  const { upcoming: upcomingMinishops } = useMinishops()
  const { post, site } = data
  const { html, fields, frontmatter, excerpt, timeToRead, wordCount } = post
  const {
    title,
    subTitle,
    date,
    dateIso,
    description,
    tags,
    category,
    hero,
    heroAlt,
    heroCredit,
  } = frontmatter
  const { slug } = fields
  const summary = description || excerpt
  const url = getBlogUrl(slug)

  return (
    <Layout>
      <Seo
        title={title}
        description={summary}
        url={url}
        image={hero?.childImageSharp?.fluid?.src}
        imageAlt={heroAlt}
        type="article"
        meta={[
          { property: 'og:article:published_time', content: dateIso },
          {
            property: 'og:article:author',
            content: site.siteMetadata.author.name,
          },
          { property: 'og:author:section', content: 'Technology' },
          ...(tags || []).map((tag) => ({
            property: 'og:article:tag',
            content: tag,
          })),
        ]}
        schemaOrg={{
          '@type': 'BlogPosting',
          headline: subTitle,
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
        subTitle={subTitle}
        timeToRead={timeToRead}
        date={date}
      />
      {hero && (
        <HeroImage
          fluid={hero.childImageSharp.fluid}
          alt={heroAlt}
          credit={heroCredit}
          className={classes.image}
        />
      )}
      <Content>{html}</Content>
      <PostFooter
        className={classes.footer}
        url={url}
        slug={slug}
        title={title}
        summary={summary}
        tags={tags}
      />
      {upcomingMinishops.length && (
        <Box component="section" className={classes.minishops}>
          <Divider className={classes.minishopsDivider} />
          <Typography component="h3" variant="h5">
            Attend upcoming minishops
          </Typography>
          <Grid container spacing={2} className={classes.minishopsGrid}>
            {upcomingMinishops.map((node) => (
              <Grid key={node.id} item xs={12}>
                <MinishopCard
                  mode="min"
                  slug={node.fields.slug}
                  title={node.frontmatter.title}
                  tags={node.frontmatter.tags}
                  summary={node.frontmatter.subTitle || node.excerpt}
                  event={node.frontmatter.event}
                />
              </Grid>
            ))}
          </Grid>
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
        subTitle
        description
        tags
        category
        date(formatString: "DD MMMM YYYY")
        dateIso: date(formatString: "YYYY-MM-DD")
        hero {
          ...HeroFluid960
        }
        heroAlt
        heroCredit
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
