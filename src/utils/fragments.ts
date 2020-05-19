import { graphql } from 'gatsby'

export const fragments = graphql`
  fragment MinishopCardInfo on MarkdownRemark {
    frontmatter {
      title
      subTitle
      category
      tags
    }
    fields {
      slug
    }
    excerpt
  }

  fragment PostCardInfo on MarkdownRemark {
    frontmatter {
      title
      description
      tags
      date(formatString: "DD MMMM YYYY")
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
