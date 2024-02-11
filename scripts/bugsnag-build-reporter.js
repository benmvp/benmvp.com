// load environment-specific .env file to read
// those values into `process.env`
import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

const reportBuild = require('bugsnag-build-reporter')

const reportBugsnagBuild = async () => {
  const appVersion = process.env.VERCEL_GIT_COMMIT_SHA

  try {
    await reportBuild({
      apiKey: process.env.BUGSNAG_API_KEY,
      appVersion,
      releaseStage: process.env.VERCEL_ENV || process.env.NODE_ENV,
      sourceControl: {
        provider: 'github',
        repository: `https://github.com/${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`,
        revision: appVersion,
      },
    })
    console.log('successfully reported build', appVersion)
  } catch (err) {
    console.error(err)
  }
}

reportBugsnagBuild()
