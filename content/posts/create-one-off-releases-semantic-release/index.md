---
date: 2022-03-13
title: Create one-off releases with semantic-release
shortDescription: How to configure semantic-release to release one-off test branches in an app in order to test dev code prior to merging a Pull Request
category: DivOps
tags: [divops, semantic, release, one, off]
hero: ./flying-balloons-ankush-minda-TLBplYQvqn0-unsplash.jpeg
heroAlt: Multi-colored balloons floating in the air
heroCredit: 'Photo by [Ankush Minda](https://unsplash.com/@an_ku_sh)'
---

I use [`semantic-release`](https://github.com/semantic-release/semantic-release) for both personal and work projects to automate version management and publishing of packages. It's nice because it takes care of the entire release flow, like figuring out the [next version](https://docs.npmjs.com/cli/v8/commands/npm-version) (using [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)), auto-generating GitHub release notes, and finally [publishing the package](https://docs.npmjs.com/cli/v8/commands/npm-publish) to the npm registry.

I like `semantic-release` for the handful of personal projects I work on because package publishing is a part of DivOps that I don't want to deal with. Developing the library is enough. 😃 At work `semantic-release` **provides a centralized point in CI that handles releasing a package** so that individual developers aren't trying to figure it out on their machines.

The default `semantic-release` configuration does all that I described, so initially I could release without an explicit config. Then I use [npx](https://www.npmjs.com/package/npx) to run it in CI. For example, a `release.yml` [Github workflow](https://github.com/features/actions):

```yml
name: Release

on: push

jobs:
  main:
    name: NPM Release
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Use Node v16
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test
        env:
          CI: true

      - name: Run integration tests
        run: npm run integrate
        env:
          CI: true

      - name: Release new version to NPM
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        # highlight-next-line
        run: npx semantic-release
```

> I don't even install `semantic-release` as a dependency in the project. I always use the latest version.

However, sadly the default configuration [still uses `master` as the default branch](https://github.com/semantic-release/semantic-release/issues/1581). Since all of my repos use `main` as the default branch, I now need a `release.config.js` to configure the [supported branches](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#branches).

```js
module.exports = {
  branches: [
    // highlight-next-line
    'main',
    'next',
    'next-major',
    // version number branches will release that version
    '+([0-9])?(.{+([0-9]),x}).x',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
}
```

And because all of my libs are written in TypeScript, I also have a build step before releasing the pacakge. The build step allows the project to transpile TypeScript into vanilla JavaScript and auto-generate TypeScript declaration files (`*.d.ts`). As a result, **I need to specifically configure the [`@semantic-release/npm` plugin](https://github.com/semantic-release/npm) to specify the build directory (typically `lib/` for me)**. But to configure the plugin, I also must include all of the [plugins](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#plugins) used by default.

```js
module.exports = {
  branches: [
    'main',
    'next',
    'next-major',
    '+([0-9])?(.{+([0-9]),x}).x',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],

  plugins: [
    // analyzes commits w/ conventional-changelog
    '@semantic-release/commit-analyzer',

    // generates a changelog w/ conventional-changelog
    '@semantic-release/release-notes-generator',

    // publishes the npm package from the specified folder
    // highlight-start
    ['@semantic-release/npm', {
      pkgRoot: './lib'
    }]
    // highlight-end

    // Publishes changelog as a GitHub release and
    // comments on released Pull Requests & Issues
    '@semantic-release/github',
  ],
}
```

> FYI: at work I also use [`semantic-release-slack-bot`](https://github.com/juliuscc/semantic-release-slack-bot) to get release notifications in Slack from a Slack bot, but I'm leaving it out to simplify the discussion.

With the addition of the build step, the `release.yml` Github workflow now looks like:

```yml
name: Release

on: push

jobs:
  main:
    name: NPM Release
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Use Node v16
        uses: actions/setup-node@v2
        with:
          node-version: '16'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm test
        env:
          CI: true

      - name: Run integration tests
        run: npm run integrate
        env:
          CI: true

      # highlight-start
      - name: Build package
        run: npm run build
      # highlight-end

      - name: Release new version to NPM
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        run: npx semantic-release
```

Because `semantic-release` relies on a strict commit format (by default [Angular Commit Message Conventions](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format)) in order to auto-determine the next version, **I also set up all of my GitHub projects to only support [squash merge commits](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges#squash-and-merge-your-pull-request-commits) in Pull Requests**. I've found that it's the least painful way to ensure developers use the proper commit format because I also add another GitHub workflow to validate the Pull Request title using the [`amannn/action-semantic-pull-request`](https://github.com/amannn/action-semantic-pull-request) GitHub action. An example `validate-pr.yml` workflow file looks like:

```yml
name: Pull Request

on:
  pull_request_target:
    types:
      - opened
      - edited
      - synchronize

jobs:
  main:
    name: Validate PR title
    runs-on: ubuntu-latest
    steps:
      ## highlight-next-line
      - uses: amannn/action-semantic-pull-request@v4
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## Supporting one-off releases

**When working on a library project, at times I need to test how it'll work in a host application before merging a Pull Request.** There are some features that automated tests just cannot cover. They are best verified by using the library in a host app. We need to add a "dev" version of the package as a dependency in the app, just like we would for a real released version. But how exactly do we do that?

Back in the day I would use [`npm link`](https://docs.npmjs.com/cli/v8/commands/npm-link) to symlink the dependency in the app's `node_modules` to the library project folder. But that stopped working once I started transpiling code and the project folder looked different than the package folder. This difference is also why using a GitHub project reference also doesn't work.

So on a library that I develop solely by myself, I would run [`npm pack`](https://docs.npmjs.com/cli/v8/commands/npm-pack) locally to create a tarball (`.tgz`) of the package. An app's `package.json` can [install](https://docs.npmjs.com/cli/v8/commands/npm-install) a tarball from a local path instead of a version in the registry. So I would `npm pack` the package, put it somewhere on the filesystem, and reference it in my test app's `package.json`. But that's not an easily repeatable pattern for multiple devs on a team, especially when some are infrequently contributing to the lib.

So when on a team, **I initially ab-used the `alpha` pre-release branch.** When someone on the team needed to test a release, they merged their (properly-titled) commits into the project's `alpha` branch. And when they pushed it to `origin`, the `release.yml` workflow would run. And since `alpha` is listed in the `branches` of the `release.config.js` as a pre-release, the new code would release at a new alpha version.

This approach worked okay. The `alpha` branch ended up having a lot of trial and error code. But as long as we merged `main` into it regularly, it cleaned up pretty well. **However, when we had multiple developers who wanted to test their dev branches with `alpha` releases simultaneously, we ran into trouble.** We had to get the "all clear" to release alphas in serial. And since we could have multiple dev branches merging into alpha sequentially, the branch itself could get into a pretty gnarly state.

We need to isolate the dev branches into their releases. We need something akin to running `npm pack` locally, but with the consistency that running `semantic-release` in CI provides. **So what we can do is add another pre-release branch, but use a pattern for multiple branch support.**

```js
module.exports = {
  branches: [
    'main',
    'next',
    'next-major',
    '+([0-9])?(.{+([0-9]),x}).x',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },

    // highlight-start
    // Any branch starting with `test-` will be auto-released
    // as a pre-release (e.g. `1.3.0-test-add-cool-new-feature.1`)
    { name: 'test-*' prerelease: true},
    // highlight-end
  ],

  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', {
      pkgRoot: './lib'
    }]
    '@semantic-release/github',
  ],
}
```

Let me break down how I can release a new "dev" version for my PR branch.

1. I do my dev work on a branch named `add-cool-new-feature`
1. I merge the (properly-titled) commits into a `test-add-cool-new-feature` branch (creating it if this is the first time)
1. I push `test-add-cool-new-feature` to `origin`
1. CI runs and releases the one-off version (e.g. `1.3.0-test-add-cool-new-feature.1`)

Instead of including "alpha" or "beta" in the version, it includes the entire name of the branch. If I continue to push new commits to the branch the `.1` part will be `.2`, `.3`, etc. **And now I can create my test release branches while other developers can do the same in parallel.** And once we're done, we delete our branches from `origin`. The `alpha` and `beta` [pre-release branches](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/pre-releases.md#publishing-pre-releases) remain as they should be.

---

Well, hopefully, this example helps you out! The configuration for `semantic-release` itself is surprisingly uncomplicated. It's just an additional entry in the `branches` config. But I think what's most interesting is the concept itself. Even though `semantic-release` has a pretty strict commit syntax which enables it to publish a real versioned release on every commit, we can still configure it to act like our old strategies from before.

I would love it if you could let me know if you found this post helpful. Feel free to reach out to me on Twitter with comments or questions at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
