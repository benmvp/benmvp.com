import { useStaticQuery, graphql } from 'gatsby'
import type { MinishopCardInfo } from './fragments'

interface Node extends MinishopCardInfo {
  id: string
}
type Minishops = {
  edges: {
    node: Node
  }[]
}

const useMinishops = (idToFilter: string) => {
  const { minishops } = useStaticQuery<{ minishops: Minishops }>(
    graphql`
      query Minishops {
        minishops: allMarkdownRemark(
          sort: { fields: [frontmatter___title], order: ASC }
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
    { upcoming: [] as Node[], remaining: [] as Node[] },
  )
}

export default useMinishops
