---
date: 2021-05-02
title: End-to-end testing with Firebase Emulator and Github Actions
shortDescription: Setting up Cypress end-to-end testing in Github Actions for Next.js apps using Firebase Local Emulator Suite
category: DivOps
tags: [firebase, firestore, emulator, github, actions, nextjs, cypress]
hero: ./road-to-mountains-jakub-gorajek-8w6971ZzUcg-unsplash.jpeg
heroAlt: Gray asphalt road heading into the mountains
heroCredit: 'Photo by [Jakub Gorajek](https://unsplash.com/@cinegeek)'
---

When running end-to-end (E2E) tests for an application that changes data, we need to have a separate environment in which we can run the tests. This way when the app creates new data or updates existing data, that test data isn't in our production app.

I recently added end-to-end tests to [NBA Player Tiers](https://nbaplayertiers.com) (a [Next.js](https://nextjs.org/) React app) using [Cypress](https://www.cypress.io/), a JavaScript end-to-end testing framework. NBA Player Tiers uses [Cloud Firestore](https://firebase.google.com/docs/firestore) (from [Firebase](https://firebase.google.com/)) as its DB and [Github actions](https://github.com/features/actions) for its continuous integration (CI) environment. The challenge was to get all 4 of these tools to work together in order to **run a production build of my Next.js app against a separate Firestore environment so that I could run the Cypress E2E tests in a Github workflow.** 😅

Let's get our [DivOps](https://www.jonathancreamer.com/announcing-div-ops/) on.

## Next.js

Cypress is web application agnostic. You could use it to test a [Ruby on Rails](https://rubyonrails.org/) web application. But because we write Cypress tests in JavaScript, folks typically use it with JavaScript web applications like React, Vue, etc. NBA Player Tiers is a [Next.js](https://nextjs.org/) React app, so naturally I'm focusing on Next.js in this post.

One of the major features of a Next.js app is that it can pre-render pages using static-site generation when building the app. If you're interested, you can check out the post I wrote on the [various ways Next.js renders](/blog/50-shades-react-rendering-nextjs/). If a page retrieves data during the build step, it's going to retrieve it from the production DB. But for the purposes of E2E testing, we need it to retrieve the data from a test DB we spin up.

**Needing both app building as well as regular app running to work against a test DB is something unique to Next.js and other static-site generators.** We'll see the solution to the problem in the following sections.

## Cloud Firestore

[Firebase](https://firebase.google.com/) provides the production DB via [Cloud Firestore](https://firebase.google.com/docs/firestore) along with [client-side](https://firebase.google.com/docs/web/setup) and [server-side](https://firebase.google.com/docs/admin/setup) JavaScript SDKs. Now there is _a lot_ that goes into setting up Firebase & Cloud Firestore and using them within our app. But that's not the focus of this post. So I'm assuming that you already have that done or will follow the linked docs to do so.

Instead, I want to focus on setting up a testing environment using the [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite). Actually, the emulator is also a great for local development so that we're not developing new features against the production DB. The Firebase emulator CLI allows for importing data as it starts up. **So the first step is to get an export of the data from the production DB to use both for local development and testing environments.**

Unfortunately, exporting data from Cloud Firestore is anything but straightforward. Instead of having an export button that saves files that the emulator can import, we have to follow a series of convoluted steps to get those files on our machine. The Firebase team is apparently working on providing a streamlined process, but until then we need to follow this guide: [How to import production data from Cloud Firestore to the Local Emulator](https://medium.com/firebase-developers/how-to-import-production-data-from-cloud-firestore-to-the-local-emulator-e82ae1c6ed8).

By default with Next, we have `"dev"` (run a local dev server), `"build"` (build the app for production use), and `"start"` (run a production-like app) scripts in our `package.json`.

```json
{
  "name": "player-tiers",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3020",
    "build": "next build",
    "start": "next start -p 3021"
  }
}
```

> I run the local development environment on port `3020` because the default port is `3000` and lots of other apps like to use `3000` as well. So instead of it sometimes using `3000`, sometimes using `3001` or even `3002`, I just set it to `3020`. I run the production server on port `3021` in case I want to also run the production environment locally on my machine to test in a production-like environment.

But now we want to run these against the Firebase Local Emulator with imported data. First follow the instructions to [install & configure the emulator](https://firebase.google.com/docs/emulator-suite/install_and_configure). Then add additional scripts to run the emulator and import the data before running our scripts.

```json
{
  "name": "player-tiers",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3020",
    // highlight-next-line
    "dev:emulator": "firebase emulators:exec 'npm run dev' --import=scripts/firebase/firestore-export/ --ui",
    "build -p 3021": "next build",
    // highlight-next-line
    "build:emulator": "firebase emulators:exec 'npm run build' --import=scripts/firebase/firestore-export/",
    "start": "next start",
    // highlight-next-line
    "start:emulator": "firebase emulators:exec 'npm start' --import=scripts/firebase/firestore-export/"
  }
}
```

> Most guides will say to use [`emulators:start`](https://firebase.google.com/docs/functions/local-emulator#run_the_emulator_suite) in a separate tab when running a web server like we do with `"dev"` & `"start"`, but I found it more convenient to tie them together with `emulators:exec`. When I stop the web server I also want the data environment to stop as well. I always run the `"dev:emulator"` script as I develop locally. And we'll see `"build:emulator"` and `"start:emulator"` used in the CI phase.

## Cypress

Now to the end-to-end testing tool, Cypress. [Setting up Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress#npm-install) is fairly straightforward and it has a very friendly developer experience for both writing and running E2E tests. But again, writing the tests is not my focus. There are [many guides](https://docs.cypress.io/guides/getting-started/writing-your-first-test#Add-a-test-file) that explain how to write quality end-to-end Cypress tests. My focus is on configuring Cypress so that it can run properly in the test environment.

One of the Cypress best practices is to [set a global `baseUrl`](https://docs.cypress.io/guides/references/best-practices#Setting-a-global-baseUrl) in the `cypress.json` [configuration file](https://docs.cypress.io/guides/references/configuration). This way commands like `cy.visit()` can omit the base URL and can run against different environments.

```json
{
  "baseUrl": "http://localhost:3020"
}
```

With the `baseUrl` set to `"http://localhost:3020"`, we can run our tests against the dev environment (via "`dev:emulator`"), but not against the production-like environment (`start:emulator`). When running against the production-like environment we'll use for the end-to-end tests, we need the `baseUrl` to be `http://localhost:3021`.

Well it turns out that Cypress also supports the `CYPRESS_BASE_URL` [environment variable](https://docs.cypress.io/guides/guides/environment-variables) that will override the default `baseUrl` set in `cypress.json`.

```json
{
  "name": "player-tiers",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3020",
    "dev:emulator": "firebase emulators:exec 'npm run dev' --import=scripts/firebase/firestore-export/ --ui",
    "build -p 3021": "next build",
    "build:emulator": "firebase emulators:exec 'npm run build' --import=scripts/firebase/firestore-export/",
    "start": "next start",
    "start:emulator": "firebase emulators:exec 'npm start' --import=scripts/firebase/firestore-export/",
    // highlight-next-line
    "cy:open": "cypress open",
    // highlight-next-line
    "cy:run": "CYPRESS_BASE_URL=http://localhost:3021 cypress run"
  }
}
```

So we use the `"cy:open"` script to run Cypress against our development environment. It allows for running individual test suites and re-running them when we change the code. The `"cy:run"` script runs against our production-like environment (ran with `"start:emulator"`). The `CYPRESS_BASE_URL` environment variable will come in handy in our Github workflow too.

## Github Actions

I switched to using [Github Actions](https://github.com/features/actions) about 2 years ago and haven't looked back. I mainly use it for Continuous Integration: unit testing, linting, type-checking, etc. But it also supports running workflows on a schedule (i.e. cron jobs), updating pull requests & issues, and so much more. There's also a huge ecosystem of open-source actions to do pretty much anything we need.

Cypress maintains the [official Cypress Github action](https://github.com/marketplace/actions/cypress-io) for running end-to-end tests in a Github workflow. **The action can handle running a build step before running the tests as well as running a local server in the background _during_ tests.** We'll definitely need both features.

```yml
name: CI

on: [push]
  # linting, type-checking, unit testing jobs

  e2e:
    name: End-to-end
    runs-on: ubuntu-latest
    container: cypress/included:7.0.1

    steps:
      - name: Checkout repo
        uses: actions/checkout@v2

      - name: Install npm dependencies
        run: npm ci

      # Setup Java for firebase CLI
      - name: Install Java
        uses: actions/setup-java@v2
        with:
          distribution: 'adopt'
          java-version: '11'

      # Run all Cypress tests in Chrome using firebase emulator
      - name: Cypress run
        uses: cypress-io/github-action@v2.9.7
        with:
          browser: chrome
          # highlight-next-line
          build: npm run build:emulator
          # highlight-next-line
          start: npm run start:emulator
        env:
          # Authorization for running the firebase CLI (emulator)
          FIREBASE_TOKEN: ${{ secrets.FIREBASE_TOKEN }}

          # Cypress variables
          # highlight-next-line
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          # highlight-next-line
          CYPRESS_BASE_URL: http://localhost:3021

          # Authorization for firebase-admin (server-side)
          FIREBASE_PROJECT_ID: player-tiers
          FIREBASE_PRIVATE_KEY:  ${{ secrets.FIREBASE_PRIVATE_KEY }}
          FIREBASE_CLIENT_EMAIL:  ${{ secrets.FIREBASE_CLIENT_EMAIL }}
          # highlight-next-line
          FIRESTORE_EMULATOR_HOST: localhost:8080

          # Authorization for firebase web API
          NEXT_PUBLIC_FIREBASE_PROJECT_ID: player-tiers
          NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.NEXT_PUBLIC_FIREBASE_API_KEY }}
          NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.NEXT_PUBLIC_FIREBASE_APP_ID }}
```

Everything comes together in the Github workflow setup. It runs every time we push a branch to `origin`. The Cypress Github action does most of the work, but we have to pass it many environment variables in order for Cypress, the Firebase client-side SDK, the Firebase server-side SDK, and the Firebase emulator to all work in this CI environment.

It seems fairly straightforward now, but when I was trying to piece it all together, it was anything but. It was the `"build:emulator"` and `"start:emulator"` scripts in the `package.json` which were the key. Before those, I was trying to run the emulator by itself in the background in order to run `"build"` and `"start"` in the foreground. It was a headache and a nightmare. 😭

---

Hopefully all of that helps someone. 😄 If I had this information when I had started, I probably could've done it in 1/10th of the time. That's why I wrote this post. For future folks like myself.

And for the most part, everything was documented, but I had to read through docs of 4 different tools. And then I had to figure out how the uniqueness of each tool fit together to create a system. Such is the life of DivOps.

If anything in this post provided info that you were looking for, I would love to hear about it! Reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
