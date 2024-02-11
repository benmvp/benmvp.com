const url = process.env.VERCEL_URL || 'https://www.benmvp.com'

const SITE_CONFIG = {
  title: 'Ben Ilegbodu',
  url,
  image: '/logo.png',
  description:
    'Ben Ilegbodu uses his many years of frontend development experience to provide quality content to help you become a better frontend engineer.',
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
    "Hi, I'm <strong>Ben Ilegbodu</strong>. 👋🏾<br /><br />I'm a Christian, husband, and father of 3, with 15+ years of professional experience developing user interfaces for the Web. I'm a Google Developer Expert Frontend Architect at Stitch Fix, and frontend development teacher. I love helping developers level up their frontend skills.",

  // social
  twitterHandle: 'benmvp',
  twitter: 'https://twitter.com/benmvp',
  github: 'https://github.com/benmvp',
  linkedIn: 'https://linkedin.com/in/benmvp',

  // analytics
  gaTrackingId: 'UA-65375615-1',
} as const

export default SITE_CONFIG
