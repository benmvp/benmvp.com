require('ts-node').register({ files: true })

module.exports = {
  siteMetadata: {
    title: 'Ben Ilegbodu',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-code-buttons',
        ],
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-codegen',
    'gatsby-plugin-material-ui',
    'gatsby-plugin-catch-links',
  ],
}
