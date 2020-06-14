import { useStaticQuery, graphql } from 'gatsby'
import type { MinishopCardInfo } from './fragments'

export interface Minishop extends MinishopCardInfo {
  id: string
}
type Minishops = {
  edges: {
    node: Minishop
  }[]
}

const useMinishops = (idToFilter?: string) => {
  const { minishops } = useStaticQuery<{ minishops: Minishops }>(
    graphql`
      query Minishops {
        minishops: allMarkdownRemark(
          sort: {
            fields: [frontmatter___event___start, frontmatter___title]
            order: [ASC, ASC]
          }
          filter: {
            fileAbsolutePath: { regex: "//content/minishops//" }
            frontmatter: { published: { ne: false } }
          }
        ) {
          edges {
            node {
              id
              ...MinishopCardInfo
            }
          }
        }
      }
    `,
  )

  return minishops.edges.reduce(
    ({ upcoming, remaining }, { node }) => {
      const list = node.frontmatter.event?.start ? upcoming : remaining

      if (node.id !== idToFilter) {
        list.push(node)
      }

      return { upcoming, remaining }
    },
    { upcoming: [] as Minishop[], remaining: [] as Minishop[] },
  )
}

export default useMinishops
