import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { isFuture } from 'date-fns'
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

  return useMemo(() => {
    return minishops.edges.reduce(
      ({ upcoming, remaining }, { node }) => {
        const eventStartDate = node.frontmatter.event?.start
        const isFutureEvent = eventStartDate
          ? isFuture(Date.parse(eventStartDate))
          : false
        const list = isFutureEvent ? upcoming : remaining

        if (node.id !== idToFilter) {
          list.push(node)
        }

        return { upcoming, remaining }
      },
      { upcoming: [] as Minishop[], remaining: [] as Minishop[] },
    )
  }, [minishops, idToFilter])
}

export default useMinishops
