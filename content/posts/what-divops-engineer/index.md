---
date: 2021-10-31
title: What is a DivOps Engineer and what do they do?
shortDescription: A deep dive into the various tools that an engineer sets up & configures while maintaining the web frontend infrastructure
category: DivOps
tags: [divops, engineer, frontend, tooling, platform]
hero: ./code-joshua-sortino-LqKhnDzSF-8-unsplash.jpeg
heroAlt: Digital code visualization
heroCredit: 'Photo by [Joshua Sortino](https://unsplash.com/@sortino)'
---

I've written a number of _DivOps_-focused posts ([5 tips for a healthier DivOps setup](/blog/5-tips-healthier-divops-setup/), [50 shades of React rendering with Next.js](/blog/50-shades-react-rendering-nextjs/), and [Auto-generate React PropTypes from TypeScript components](/blog/auto-generate-react-prop-types-typescript-components/) just to name a few). But I've never actually explained what _DivOps_ is. It's a play on words for [DevOps](https://www.atlassian.com/devops) which is a well-defined role bridging the gap between software development and IT operations.

DivOps to me is the bridge between frontend web development and traditional DevOps. **So a DivOps engineer writes code for web frontend applications and libraries, but rarely is any of it shipped to Production or what users interact with.** Instead they write all of the tooling and configuration code _outside_ of the `src` folder that's needed for an app or lib to run.

Although I write a lot about DivOps, I can't take full credit for the term. [Enrique](https://twitter.com/chochosmx) coined the term with this tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Frontend engineers who also manage infra should be called &lt;div&gt;ops</p>&mdash; Enrique staying ~ (@chochosmx) <a href="https://twitter.com/chochosmx/status/1183045782095699968?ref_src=twsrc%5Etfw">October 12, 2019</a></blockquote>

And my friend [Jonathan Creamer](https://twitter.com/jcreamer898) made it "official" by [creating the #DivOps community](https://www.jonathancreamer.com/announcing-div-ops/). Check out the [r/divops](https://www.reddit.com/r/divops/) subreddit and [DivOps Discord server](https://discord.gg/Vvk67JDX6t) to join the community.

I have yet to see an explicit role for a "DivOps Engineer," but I think we're getting close. **Typically those fulfilling the role are Frontend Engineers working on the frontend platform (possibly even on a Frontend Platform team), but are not working on the design system or component library.** These developers are likely focused on DivOps.

I would like to see companies create explicit roles for this work because it's highly valuable and critical. In my opinion, formalizing the role legitimizes the work and provides a 3rd path in frontend engineering. In addition to UI development (visual + interaction) or app development (state + API management), there's now DivOps.

So I want to list out the high-level areas of work to which a DivOps engineer contributes, as well as some of the tooling within each area.

---

## Development environment

**The foundation of any modern development environment is a JavaScript compiler/transpiler and module bundler.** The most popular JavaScript compiler is [Babel](https://babeljs.io/), which has a huge plugin ecosystem, but [TypeScript](https://www.typescriptlang.org/) and [Closure](https://developers.google.com/closure/compiler) are other alternatives. [Webpack](https://webpack.js.org/) is the most popular module bundle with its equally huge plugin ecosystem. And of course there are other options like [Parcel](https://parceljs.org/), [Snowpack](https://www.snowpack.dev/), and [Rome](https://rome.tools/).

Because Babel and Webpack are so powerful and have such large ecosystems, configuring a `babel.config.js` or `webpack.config.js` file takes a deep understanding of how the tools work in order to set things up correctly and provide the most optimized builds to the browser. **Because of the complexity and expertise needed to properly configure these low-level tools, there are many other tools that wrap Babel and Webpack to configure them to work with particular web frontend frameworks.** I develop in React, and just within React there is [Create React App](https://create-react-app.dev/), [Next.js](https://nextjs.org/), [Gatsby](https://www.gatsbyjs.com/), [Remix](https://remix.run/), and many others. These tools do many other things besides configure Babel and Webpack, but one of their goals is to abstract that work away.

But there's even more once we get passed compilers and bundlers. DivOps engineers may have to setup API integrations like [Firebase](https://firebase.google.com/) or [Apollo GraphQL](https://www.apollographql.com/). There are also alternative development platforms like [Storybook](https://storybook.js.org/), which requires configuration thanks to its own addon ecosystem. For library/package development, we may need to set up [npm](https://docs.npmjs.com/cli/v7/using-npm/workspaces) or [yarn](https://yarnpkg.com/features/workspaces) workspaces to create [monorepos](https://yarnpkg.com/advanced/lexicon#monorepository) (or alternatively configure yet another tool like [Lerna](https://lerna.js.org/) to help manage multiple packages).

Lastly, DivOps engineers find themselves writing lots of command-line scripts called from [npm scripts](https://docs.npmjs.com/cli/v7/using-npm/scripts). Some of the scripts can be [codemods](https://github.com/codemod-js/codemod) that rewrite/upgrade/refactor source code when migrating a codebase. Other scripts orchestrate more tools like [`serve`](https://github.com/vercel/serve) or [`nodemon`](https://nodemon.io/) for running the web app locally.

---

## Static-analysis environment

I'm really a fan of the emphasis on static-analysis within the frontend development ecosystem. **Not only can we keep our code consistent by enforcing a coding style, but, more importantly, we can catch issues in our code without ever running it.** [ESLint](https://eslint.org/) (JavaScript) and [Stylelint](https://stylelint.io/) (CSS) are the main players in this space. And because of the size of the ESLint plugin ecosystem, there is lots for a DivOps engineer to configure in the `.eslintrc.js` file.

While the [Prettier](https://prettier.io/) configuration itself is quite small, getting it to work alongside ESLint takes some knowhow. My post [Prettier + ESLint = ❤️](/blog/prettier-eslint/) goes into the details if you're interested. We can also even automatically run linting before we commit our code by configuring [`lint-staged`](https://github.com/okonet/lint-staged) with [`husky`](https://github.com/typicode/husky).

One huge static-analysis tool that I now cannot live without is type-checking with [TypeScript](https://www.typescriptlang.org/). **I use TypeScript solely as a type checker, leaving Babel to handle the compiling of TypeScript to vanilla JavaScript.** There are also tools like [GraphQL Code Generator](https://www.graphql-code-generator.com/) that can generate TypeScript types from a GraphQL schema.

---

## Testing environment

Next, DivOps engineers need to set up and maintain the various testing environments. **In my opinion, the earlier they can configure the testing platforms, the healthier the code base remains.** The primary frontend unit testing platform is [Jest](https://jestjs.io/) with its massive `jest.config.js` configuration file. There is also [Mocha](https://mochajs.org/) (+ [Chai](https://www.chaijs.com/)), [AVA](https://github.com/avajs/ava), [tape](https://github.com/substack/tape), and many other options.

For UI apps, [Storybook](https://storybook.js.org/) serves both as a development environment as well as a testing environment for components. There are addons to connect it with [Jest](https://storybook.js.org/addons/@storybook/addon-jest), or even [Percy](https://docs.percy.io/docs/storybook) in order to get visual regression tests for components. Storybook + Percy is huge for validating component libraries because they are just as much about the visual look and feel as the UI interactions.

End-to-end testing is also important for web applications and, of course, requires configuration and maintenance. So whether they use [Cypress](https://www.cypress.io/), [Puppeteer](https://github.com/puppeteer/puppeteer), [WebdriverIO](https://webdriver.io/), or [Selenium](https://www.selenium.dev/selenium/docs/api/javascript/index.html), a DivOps engineer will handle the setup and most likely even write shared helpers for common actions (like a user logging in).

---

## CI/CD environment

While the DevOps engineers are experts at maintaining the Production environment, they are typically trained in backend engineering so they _usually_ are less familiar with maintaining frontend tool chains. **As a result, the onus falls on DivOps engineers to do what's necessary to get the web application to Production (or the JavaScript package to npm).**

Up until now, everything the DivOps Engineer has set up, configured, and maintained has been local to the repo running on a developer's machine. But once we get into continuous integration and delivery we're running on [Github Actions](https://github.com/features/actions), [CircleCI](https://circleci.com/), [Vercel](https://vercel.com/), or [AWS](https://aws.amazon.com/). This is where we start overlapping with the DevOps engineers.

There are so many things that can happen in this area. DivOps engineers can write `Dockerfile`s to deploy a Node application to Production with [Docker](https://docs.docker.com/). They may have to configure [ngnix](https://www.nginx.com/) files to help serve a statically-generated site. And they write all sorts of bash scripts to help orchestrate all the build tools (like Babel, Webpack, Next, etc.).

And for libraries that get published on npm, DivOps engineers configure tools like [`semantic-release`](https://github.com/semantic-release/semantic-release) or [Lerna](https://lerna.js.org/) for handling versioning and publishing. They'll likely also need to configure [Babel](https://babeljs.io/), [Rollup](https://rollupjs.org/), or [Gulp](https://gulpjs.com/) to transpile source code into [ESM and CJS](https://dev.to/iggredible/what-the-heck-are-cjs-amd-umd-and-esm-ikm) build targets for the published package.

---

## Repo environment

Tools like [Create React App](https://create-react-app.dev/) and [Next.js](https://nextjs.org/) have CLI commands that will scaffold a new app for us with starter code. **A company that is creating many apps or libraries may need to create similar starter templates in order to provide consistency and also ease the burden for creating a greenfield app or lib.** Tools like [`plop`](https://plopjs.com/) or [Yeoman](https://yeoman.io/authoring/index.html) help a DivOps engineer with this.

---

Phew! 😅 So how about that? I'm sure I left off tons of packages and tools that are part of maintaining a frontend platform or infrastructure, but these should at least be the high-level areas.

I'm really curious. Does your company have an explicit role for something like a DivOps engineer? There is certainly enough work here for one or more folks to focus on this type of work. I would love to see a job description if you have one. Reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

If after reading all this you realize that you are in fact a DivOps engineer, welcome to the [#DivOps](https://twitter.com/hashtag/divops) community! Join us on the [r/divops](https://www.reddit.com/r/divops/) subreddit and [DivOps Discord server](https://discord.gg/Vvk67JDX6t).

Keep learning my friends. 🤓
