const { getTheme } = require('./theme')

const THEME = getTheme(false)

module.exports = {
  homeTitle: 'Ben Ilegbodu',
  siteTitle: 'Ben Ilegbodu',
  shortSiteTitle: 'Ben Ilegbodu',
  siteDescription:
    'Christ follower, husband & father of 👌🏾. UI Architect & Speaker. ES6+, React & CSS3. Google Developer Expert & Microsoft MVP. Basketball, DIY & movies. Principal Frontend Engineer @ Eventbrite',
  siteUrl: 'http://www.benmvp.com',
  pathPrefix: '',
  siteImage: 'preview.jpg',
  siteLanguage: 'en',
  // info
  infoTitle: 'Ben Ilegbodu',
  infoTitleNote: 'UI Architect',
  // manifest.json
  manifestName: 'Ben Ilegbodu',
  manifestShortName: 'BenMVP', // max 12 characters
  manifestStartUrl: '/',
  manifestBackgroundColor: THEME.palette.background.default,
  manifestThemeColor: THEME.palette.background.default,
  manifestDisplay: 'standalone',
  // social
  twitterHandle: 'benmvp',
  authorSocialLinks: [
    {
      name: 'twitter',
      url: 'https://twitter.com/benmvp',
      title: 'Follow Ben Ilegbodu on Twitter',
    },
    {
      name: 'github',
      url: 'https://github.com/benmvp',
      title: "Ben Ilegbodu's projects",
    },
    {
      name: 'linkedin',
      url: 'https://linkedin.com/in/benmvp',
      title: "Ben Ilegbodu's resume",
    },
  ],
}
