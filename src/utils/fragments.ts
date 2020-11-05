import { graphql } from 'gatsby'

export interface MinishopCardInfo {
  frontmatter: {
    title: string
    shortDescription?: string
    category: string
    tags: string[]
    event?: {
      id: string
      start: string
    }
  }
  fields: {
    slug: string
  }
  excerpt: string
}

export const fragments = graphql`
  fragment MinishopCardInfo on MarkdownRemark {
    frontmatter {
      title
      shortDescription
      category
      tags
      event {
        id
        start
      }
    }
    fields {
      slug
    }
    excerpt
  }

  fragment PostCardInfo on MarkdownRemark {
    frontmatter {
      title
      shortDescription
      tags
      date(formatString: "MMMM D, YYYY")
      hero {
        childImageSharp {
          fluid(maxWidth: 550, traceSVG: { color: "#3f51b5" }, quality: 50) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      heroAlt
    }
    fields {
      slug
    }
    excerpt
  }

  fragment HeroFluid960 on File {
    childImageSharp {
      fluid(maxWidth: 960, traceSVG: { color: "#3f51b5" }, quality: 75) {
        ...GatsbyImageSharpFluid_withWebp_tracedSVG
      }
    }
  }
`
