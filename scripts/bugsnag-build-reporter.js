// load environment-specific .env file to read
// those values into `process.env`
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const reportBuild = require('bugsnag-build-reporter')

const reportBugsnagBuild = async () => {
  const appVersion = process.env.VERCEL_GIT_COMMIT_SHA || process.env.DEPLOY_ID
  const repository = process.env.VERCEL_GIT_REPO_SLUG
    ? `https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
    : process.env.REPOSITORY_URL

  try {
    await reportBuild({
      apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
      appVersion,
      releaseStage:
        process.env.VERCEL_ENV || process.env.CONTEXT || process.env.NODE_ENV,
      sourceControl: {
        provider: 'github',
        repository,
        revision: process.env.VERCEL_GIT_COMMIT_SHA || process.env.COMMIT_REF,
      },
    })
    console.log('successfully reported build', appVersion)
  } catch (err) {
    console.error(err)
  }
}

reportBugsnagBuild()
