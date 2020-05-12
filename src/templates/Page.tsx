import React from 'react'
import { graphql } from 'gatsby'
import { makeStyles, createStyles } from '@material-ui/core'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import HeroImage from '../components/HeroImage'
import Content from '../components/Content'
import Seo from '../components/Seo'
import { getUrl } from '../utils'

const useStyles = makeStyles((theme) =>
  createStyles({
    header: {
      marginBottom: theme.spacing(5),
    },
    image: {
      marginBottom: theme.spacing(3),
    },
  }),
)

const Page = ({ data }) => {
  const classes = useStyles()
  const { page } = data
  const { html, excerpt, frontmatter, fields } = page
  const { title, hero, heroAlt, heroCredit } = frontmatter
  const { slug } = fields
  const url = getUrl(slug)

  return (
    <Layout>
      <Seo
        title={title}
        url={url}
        description={excerpt}
        image={hero?.childImageSharp?.fluid?.src}
        imageAlt={heroAlt}
      />
      <PageHeader className={classes.header} title={title} />
      {hero && (
        <HeroImage
          fluid={hero.childImageSharp.fluid}
          alt={heroAlt}
          credit={heroCredit}
          className={classes.image}
        />
      )}
      <Content>{html}</Content>
    </Layout>
  )
}

export default Page

export const query = graphql`
  query PageInfo($slug: String!) {
    page: markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        hero {
          ...HeroFluid960
        }
        heroAlt
        heroCredit
      }
    }
  }
`
