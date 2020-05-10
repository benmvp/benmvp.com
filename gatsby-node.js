require('ts-node').register({ files: true })

const { join, resolve } = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const slug = createFilePath({ node, getNode })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    fragment MarkdownPageInfo on MarkdownRemark {
      fields {
        slug
      }
    }
    query {
      minishops: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/minishops//" } }
      ) {
        edges {
          node {
            ...MarkdownPageInfo
          }
        }
      }
      posts: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/posts//" } }
      ) {
        edges {
          node {
            ...MarkdownPageInfo
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//content/pages//" } }
      ) {
        edges {
          node {
            ...MarkdownPageInfo
          }
        }
      }
    }
  `)

  if (errors) {
    return Promise.reject(errors)
  }

  const { minishops, posts, pages } = data

  const createPages = ({ allMarkdownRemark, component, getPath }) => {
    allMarkdownRemark.edges.forEach(({ node }) => {
      const slug = node.fields.slug

      createPage({
        path: getPath(slug),
        component,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug,
        },
      })
    })
  }

  // create minishop pages
  createPages({
    allMarkdownRemark: minishops,
    component: resolve('./src/templates/Minishop.tsx'),
    getPath: (slug) => join('/minishops', slug),
  })

  // create blog post pages
  createPages({
    allMarkdownRemark: posts,
    component: resolve('./src/templates/Post.tsx'),
    getPath: (slug) => join('/blog', slug),
  })

  // create generic pages
  createPages({
    allMarkdownRemark: pages,
    component: resolve('./src/templates/Page.tsx'),
    getPath: (slug) => slug,
  })
}
