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
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript',
    'gatsby-plugin-codegen',
    'gatsby-plugin-material-ui',
  ],
}
