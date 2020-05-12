require('ts-node').register({ files: true })

// load environment-specific .env file to read
// those values into `process.env`
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const SITE_CONFIG = require('./config/site')
const { getBlogUrl } = require('./src/utils')

module.exports = {
  siteMetadata: {
    siteUrl: SITE_CONFIG.siteUrl,
    title: SITE_CONFIG.siteTitle,
    description: SITE_CONFIG.siteDescription,
    image: SITE_CONFIG.siteImage,
    keywords: SITE_CONFIG.keywords,
    lang: SITE_CONFIG.siteLanguage,
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
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/minishops/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images/`,
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: SITE_CONFIG.siteTitle,
        short_name: SITE_CONFIG.manifestShortName,
        description: SITE_CONFIG.siteDescription,
        start_url: SITE_CONFIG.manifestStartUrl,
        lang: SITE_CONFIG.lang,
        background_color: SITE_CONFIG.manifestBackgroundColor,
        theme_color: SITE_CONFIG.manifestThemeColor,
        display: SITE_CONFIG.manifestDisplay,
        icon: SITE_CONFIG.manifestIcon,
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-codegen',
    'gatsby-theme-material-ui',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-robots-txt',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: SITE_CONFIG.gaTrackingId,
      },
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: SITE_CONFIG.manifestThemeColor,
        showSpinner: false,
      },
    },
    'gatsby-plugin-netlify-cache',
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const url = getBlogUrl(edge.node.fields.slug)

                return {
                  ...edge.node.frontmatter,
                  description:
                    edge.node.frontmatter.description || edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url,
                  guid: edge.node.id,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                }
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: {
                    fileAbsolutePath: { regex: "//content/posts//" }
                    frontmatter: { published: { ne: false } }
                  }
                ) {
                  edges {
                    node {
                      id
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        description
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: '/blog/rss.xml',
            title: 'Ben Ilegbodu Blog RSS Feed',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              showLineNumbers: true,
            },
          },
          {
            resolve: 'gatsby-remark-code-buttons',
            options: {
              buttonText: '',
              tooltipText: 'Copy',
            },
          },
          'gatsby-remark-responsive-iframe',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
          'gatsby-remark-external-links',
        ],
      },
    },
  ],
}
