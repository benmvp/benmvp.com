require('ts-node').register({ files: true })

module.exports = {
  siteMetadata: {
    title: 'Ben Ilegbodu',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-typescript',
    'gatsby-plugin-codegen',
    'gatsby-plugin-material-ui',
  ],
}
