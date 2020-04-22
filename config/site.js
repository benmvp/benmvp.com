const { getTheme } = require('./theme')

const THEME = getTheme(false)

module.exports = {
  siteTitle: 'Ben Ilegbodu',
  siteUrl: process.env.ROOT_URL || 'https://www.benmvp.com', // Domain of your site. No trailing slash!
  siteImage: '/icons/icon-512x512.png',
  siteDescription:
    'Ben Ilegbodu provides quality content to help you become a better frontend engineer.',
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
    "Hi, I'm <strong>Ben Ilegbodu</strong>. 👋🏾<br /><br />I'm a Christian, husband, and father of 3, with 15 years of professional experience developing user interfaces for the Web. I'm a Principal Frontend Engineer at Stitch Fix, frontend software teacher, Google Developer Expert, and Microsoft MVP.",

  // manifest.json
  manifestShortName: 'benmvp', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: THEME.palette.background.default,
  manifestThemeColor: THEME.palette.primary.main,
  manifestDisplay: 'standalone',

  // social
  twitterHandle: 'benmvp',
  twitter: 'https://twitter.com/benmvp',
  github: 'https://github.com/benmvp',
  linkedIn: 'https://linkedin.com/in/benmvp',

  // analytics
  gaTrackingId: 'UA-65375615-1',
}
