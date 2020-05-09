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
  const result = await graphql(`
    query Pages {
      allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "//posts|pages//" } }
      ) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = node.fields.slug
    const isPage = /pages/.test(node.fileAbsolutePath)
    let component = resolve('./src/templates/Post.tsx')
    let path = join('/blog', slug)

    if (isPage) {
      component = resolve('./src/templates/Page.tsx')
      path = slug
    }

    createPage({
      path,
      component,
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug,
      },
    })
  })
}
