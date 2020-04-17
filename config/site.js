const { getTheme } = require('./theme')

const THEME = getTheme(false)

module.exports = {
  siteTitle: 'Ben Ilegbodu',
  siteUrl: process.env.ROOT_URL || 'http://www.benmvp.com', // Domain of your site. No trailing slash!
  pathPrefix: '',
  // siteImage: 'preview.jpg',
  siteLanguage: 'en', // Language Tag on <html> element
  keywords: [
    'Frontend Software Engineer',
    'React Training',
    'JavaScript Training',
    'TypeScript Training',
  ],

  // author info
  author: 'Ben Ilegbodu',
  authorBio:
    'Hi, I\'m <strong>Ben Ilegbodu</strong>. 👋🏾<br /><br />I\'m a Christian, husband, and father of 3, with 15 years of professional experience developing user interfaces for the Web. I\'m a Principal Frontend Engineer at Stitch Fix, frontend software teacher, Google Developer Expert, and Microsoft MVP.',

  // manifest.json
  manifestName: 'Ben Ilegbodu',
  manifestShortName: 'BenMVP', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: THEME.palette.background.default,
  manifestThemeColor: THEME.palette.background.default,
  manifestDisplay: 'standalone',

  rss: 'https://benmvp.com/blog/rss.xml',

  // social
  twitterHandle: 'benmvp',
  twitter: 'https://twitter.com/benmvp',
  github: 'https://github.com/benmvp',
  linkedIn: 'https://linkedin.com/in/benmvp',
}
