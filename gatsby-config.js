require('ts-node').register({ files: true })

module.exports = {
  siteMetadata: {
    title: 'Ben Ilegbodu',
  },
  plugins: [
    'gatsby-theme-material-ui',
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
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              buttonText: '',
              tooltipText: 'Copy',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 912,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-codegen',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
  ],
}
