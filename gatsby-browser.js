const React = require('react')
const Bugsnag = require('@bugsnag/js').default
const BugsnagPluginReact = require('@bugsnag/plugin-react').default

require('prismjs/themes/prism-solarizedlight.css')
require('prismjs/plugins/line-numbers/prism-line-numbers.css')
require('./src/css/prism.css')

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.NODE_ENV,
  appVersion: process.env.DEPLOY_ID,
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

exports.wrapRootElement = ({ element }) => (
  <ErrorBoundary>{element}</ErrorBoundary>
)
