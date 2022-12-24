import { useMemo } from 'react'
import { isFuture } from 'date-fns'
import type { MinishopCardInfo } from './fragments'

interface MinishopCardInfo {
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

export interface Minishop extends MinishopCardInfo {
  id: string
}

type GraphqlMinishops = {
  edges: {
    node: Minishop
  }[]
}

const useMinishops = (
  idToFilter?: string,
): { remaining: Minishop[]; upcoming: Minishop[] } => {
  return {
    remaining: [],
    upcoming: [],
  }
  // const { minishops } = useStaticQuery<{ minishops: GraphqlMinishops }>(
  //   graphql`
  //     query Minishops {
  //       minishops: allMarkdownRemark(
  //         sort: {
  //           fields: [frontmatter___event___start, frontmatter___title]
  //           order: [ASC, ASC]
  //         }
  //         filter: {
  //           fileAbsolutePath: { regex: "//content/minishops//" }
  //           frontmatter: { published: { ne: false } }
  //         }
  //       ) {
  //         edges {
  //           node {
  //             id
  //             ...MinishopCardInfo
  //           }
  //         }
  //       }
  //     }
  //   `,
  // )

  // return useMemo(() => {
  //   return minishops.edges.reduce(
  //     ({ upcoming, remaining }, { node }) => {
  //       const eventStartDate = node.frontmatter.event?.start
  //       const isFutureEvent = eventStartDate
  //         ? isFuture(Date.parse(eventStartDate))
  //         : false
  //       const list = isFutureEvent ? upcoming : remaining

  //       if (node.id !== idToFilter) {
  //         list.push(node)
  //       }

  //       return { upcoming, remaining }
  //     },
  //     { upcoming: [] as Minishop[], remaining: [] as Minishop[] },
  //   )
  // }, [minishops, idToFilter])
}

export default useMinishops
