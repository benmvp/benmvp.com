require('ts-node').register({ files: true })

const SITE_CONFIG = require('./config/site')

module.exports = {
  siteMetadata: {
    title: SITE_CONFIG.siteTitle,
    author: {
      name: SITE_CONFIG.author,
      bio: SITE_CONFIG.authorBio,
    },
    social: {
      twitterHandle: SITE_CONFIG.twitterHandle,
      twitter: SITE_CONFIG.twitter,
      github: SITE_CONFIG.github,
      linkedIn: SITE_CONFIG.linkedIn,
    },
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/content/pages/`,
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
              maxWidth: 960,
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
