const reportBuild = require('bugsnag-build-reporter')

// load environment-specific .env file to read
// those values into `process.env`
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const reportBugsnagBuild = async () => {
  try {
    await reportBuild({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion: process.env.DEPLOY_ID,
      releaseStage: process.env.NODE_ENV,
      sourceControl: {
        provider: 'github',
        repository: process.env.REPOSITORY_URL,
        revision: process.env.COMMIT_REF,
      },
    })
    console.log('successfully reported build', process.env.DEPLOY_ID)
  } catch (err) {
    console.error(err)
  }
}

reportBugsnagBuild()
