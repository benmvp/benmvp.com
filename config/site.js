const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = process.env.ROOT_URL || 'https://www.benmvp.com', // Domain of your site. No trailing slash!
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const isNetlifyProduction = NETLIFY_ENV === 'production'
const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

const { getTheme } = require('./theme')

const THEME = getTheme(false)

module.exports = {
  siteTitle: 'Ben Ilegbodu',
  siteUrl,
  siteImage: '/ben-ilegbodu.png',
  siteDescription:
    'Ben Ilegbodu uses his many years of frontend development experience to provide quality content to help you become a better frontend engineer.',
  siteLanguage: 'en', // Language Tag on <html> element
  keywords: [
    'Frontend Software Engineer',
    'React Training',
    'JavaScript Training',
    'TypeScript Training',
    'Minishops',
  ],

  // author info
  author: 'Ben Ilegbodu',
  authorBio:
    "Hi, I'm <strong>Ben Ilegbodu</strong>. 👋🏾<br /><br />I'm a Christian, husband, and father of 3, with 15+ years of professional experience developing user interfaces for the Web. I'm a Principal Frontend Engineer at Stitch Fix, frontend development teacher, Google Developer Expert, and Microsoft MVP. I love helping developers level up their frontend skills.",

  // manifest.json
  manifestShortName: 'benmvp', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: THEME.palette.background.default,
  manifestThemeColor: THEME.palette.primary.main,
  manifestDisplay: 'standalone',
  manifestIcon: 'static/icons/icon-512x512.png',

  // social
  twitterHandle: 'benmvp',
  twitter: 'https://twitter.com/benmvp',
  github: 'https://github.com/benmvp',
  linkedIn: 'https://linkedin.com/in/benmvp',

  // analytics
  gaTrackingId: 'UA-65375615-1',
}
