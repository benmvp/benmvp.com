---
date: 2020-06-05
title: Integrating Bugsnag into GatsbyJS and Netlify
description: Code snippets on how to hook up Bugsnag into a Gatsby app and enrich the integration through Netlify
category: divops
tags: [react, gatsby, netlify]
hero: ./dung-beetle-paulo-ziemer-oV3zTK7vuP0-unsplash.jpg
heroAlt: Photo of a dung beetle
heroCredit: 'Photo by [Paulo Ziemer](https://unsplash.com/@ziemer)'
---

About a month ago I [upgraded my site to Gatsby v2](/blog/new-gatsby-site/) and I’ve been learning a lot about how to do various things in Gatsby. I recently [introduced minishops](/blog/introducing-minishops/) to the site, which are focused 3-hour workshops online.

I’m using [Eventbrite](https://www.eventbrite.com/organizer/overview/) to collect and pay for registrations and it uses a cool javascript overlay so that attendees don’t have to navigate away from my site. However, **with more complex UX & JS comes a greater potential for errors**. As a result, I wanted to add [Bugsnag](https://www.bugsnag.com/) JavaScript error monitoring to my site.

## Bugsnag

I’ve been using Bugsnag for several years and the latest way it integrates with React is **pretty clever**. In the beginning, there was just a single JavaScript integration that I'm pretty sure hooked into [`window.onError`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror). Now they’ve been adding specific library/framework integrations through plugins in order to have richer (and easier) error reporting.

Now the [React plugin](https://www.npmjs.com/package/@bugsnag/plugin-react) exports an [`ErrorBoundary`](https://reactjs.org/docs/error-boundaries.html) that wraps your entire app like you would do for [global context](https://reactjs.org/docs/context.html) or a [Redux provider](https://react-redux.js.org/api/provider).

From the [Bugsnag React docs](https://docs.bugsnag.com/platforms/javascript/react/), the integration looks something like:

```js
// initialize bugsnag ASAP, before other imports
import Bugsnag from '@bugsnag/js'
Bugsnag.start('API_KEY')

import ReactDOM from 'react-dom'
import React from 'react'
import bugsnagReact from '@bugsnag/plugin-react'
Bugsnag.use(bugsnagReact, React)

// wrap your entire app tree in the ErrorBoundary provided
const ErrorBoundary = Bugsnag.getPlugin('react')
ReactDOM.render(
  <ErrorBoundary>
    <YourApp />
  </ErrorBoundary>,
  document.getElementById('app'),
)
```

## GatsbyJS

This would work great for your typical app (created by [Create React App](https://create-react-app.dev/) let’s say) but doesn’t work with [GatsbyJS](https://www.gatsbyjs.org/). Because Gatsby is taking care of pre-rendering and a whole host of other optimizations, it **handles how and when the app is actually rendered to the DOM**. There is no place in Gatsby where we’re explicitly calling [`ReactDOM.render()`](https://reactjs.org/docs/react-dom.html#render).

Gatsby _does_ however, have a [`wrapRootElement()`](https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement) hook that allows us to add Bugsnag’s `ErrorBoundary` before Gatsby takes over to continue doing its thing. We call it in [`gatsby-browser.js`](https://www.gatsbyjs.org/docs/api-files-gatsby-browser/).

```js
const React = require('react')
const Bugsnag = require('@bugsnag/js').default
const BugsnagPluginReact = require('@bugsnag/plugin-react').default

Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
})

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

exports.wrapRootElement = ({ element }) => (
  <ErrorBoundary>{element}</ErrorBoundary>
)
```

This setup is the minimum needed to get the Bugsnag error handling working in the Gatsby environment.

## Netlify

However, there are other nice additions we can add to make our Bugsnag error reporting even more helpful. And that’s where [Netlify](https://www.netlify.com/), the static site hosting service that I use, comes into play.

While developing locally I generate lots of errors. Also when I push up PRs, I get [Deploy Previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) which serve as a sort of staging environment. For now, I would still like to report errors that happen in those environments, but I would like to **separate dev/staging errors from Production errors**. In addition, when users on Production encounter errors, I would like to know which “version” of my app caused the error.

We can differentiate in which environment errors occurred by using the Bugsnag [`releaseStage`](https://docs.bugsnag.com/platforms/javascript/react/configuration-options/#releasestage) configuration and the app version by using the [`appVersion`](https://docs.bugsnag.com/platforms/javascript/react/configuration-options/#appversion) config. We can add the configurations to `Bugsnag.start()`:

```js
Bugsnag.start({
  apiKey: process.env.BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
  releaseStage: process.env.CONTEXT || process.env.NODE_ENV,
  appVersion: process.env.DEPLOY_ID,
})
```

All environment variables are available to the Gatsby build. From the Netlify docs, the [ `CONTEXT` environment variable](https://docs.netlify.com/configure-builds/environment-variables/) is the “name of the build's [deploy context](https://docs.netlify.com/site-deploys/overview/#deploy-contexts). It can be `production`, `deploy-preview`, or `branch-deploy`.” In development, it’ll fall back to `NODE_ENV` which Gatsby sets as `development`. Now I’m able to see in which environment an error occurred.

Since I don’t version my apps, I use the `DEPLOY_ID` environment variable that also comes from Netlify. It’s the unique ID that Netlify uses for the deploy. The value really doesn’t mean much to me, but at least provides it is a unique ID so that I can associate which deploy introduced the error.

Bugsnag, however, provides a JS API (and CLI) to report deploys to them. And I can associate git information with the reported deploy so, in the end, **I can associate an error with the merged PR that caused it**!

I notify Bugsnag of the recent deploy after I finish successfully building the app in Netlify. My Netlify build command runs `npm run build` and I added a [`"postbuild"` script](https://medium.com/yld-blog/using-npm-pre-and-post-hooks-d89dcf2d86cf) to do the reporting:

```json
{
  “scripts”: {
    “build”: “gatsby build”,
    “postbuild”: “NODE_ENV=production node scripts/bugsnag-build-reporter.js”,
  }
}
```

Technically there are more steps that happen in the Netlify deploy process after this step. So even if the build is successful, the deploy may still fail. But I couldn’t find a post-deploy hook in the Netlify CI where I could run a command.

Lastly `bugsnag-build-reporter.js` that uses the [`bugsnag-build-reporter`](https://www.npmjs.com/package/bugsnag-build-reporter) package looks like:

```js
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
      releaseStage: process.env.CONTEXT || process.env.NODE_ENV,
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
```

The `BUGSNAG_API_KEY` environment variable is stored in `.env.development` and `.env.propduction` files. I use [`dotenv`](https://www.npmjs.com/package/dotenv) to load those into `process.env`.

I started off using the reporter CLI, but the command with all of its arguments got super long and I also needed to be able to retrieve the `BUGSNAG_API_KEY` variable from the `.env.*` files. So I went with using the JavaScript API instead.

## Wrapping it up

So that’s it! It’s really just the setup of Bugsnag in `gatsby-browser.js` and then using the Bugsnag build reporter after a successful build of the Gatsby app. It seems simple now, but I had to do a whole bunch of research and digging into Github issues to get it all sorted out. So hopefully, these code snippets will help significantly save you time.

Interestingly enough, these snippets are primed to be wrapped in a [Gatsby plugin](https://www.gatsbyjs.org/docs/creating-plugins/), [Netlify build plugin](https://docs.netlify.com/configure-builds/build-plugins/) or probably both. But I don’t know how to create either one of those, and I can’t spend time going off on a tangent. Instead, you got this blog post for now!

Keep learning my friends. 🤓
