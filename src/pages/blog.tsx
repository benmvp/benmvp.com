import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import { getBlogUrl } from '../utils'
import PostList from '../components/PostList'

const Blog = ({ data }) => {
  const { posts } = data

  return (
    <Layout maxWidth="lg">
      <Seo
        url={getBlogUrl()}
        title="Blog"
        description="Browse through Ben Ilegbodu's blog posts to keep learn more about React and other frontend topics"
      />
      <PostList posts={posts} />
    </Layout>
  )
}

export default Blog

export const query = graphql`
  query BlogPosts {
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        fileAbsolutePath: { regex: "//posts//" }
        frontmatter: { published: { ne: false } }
      }
    ) {
      edges {
        node {
          id
          ...PostCardInfo
        }
      }
    }
  }
`
