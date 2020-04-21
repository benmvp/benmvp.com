require('ts-node').register({ files: true })

const SITE_CONFIG = require('./config/site')
const { getUrl } = require('./src/utils')

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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/content/images/`,
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
        icon: `static${SITE_CONFIG.siteImage}`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
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
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        feeds: [
          {
            serialize: ({ query: { allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map((edge) => {
                const url = getUrl(edge.node.fields.slug)

                return {
                  ...edge.node.frontmatter,
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url,
                  guid: url,
                  custom_elements: [{ 'content:encoded': edge.node.html }],
                }
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                  filter: { fileAbsolutePath: { regex: "//posts//" } }
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
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
  ],
}
