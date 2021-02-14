---
date: 2021-02-14
title: 5 tips for a healthier DivOps setup
shortDescription: Suggestions for configurations to ESLint, Jest & TypeScript to prevent codebases from being riddled with warnings, errors or false positives
category: divops
tags: [divops, testing, eslint, jest, typescript]
hero: ./vegetables-dan-gold-4_jhDO54BYg-unsplash.jpg
heroAlt: A table full of a variety of vegetables
heroCredit: 'Photo by [Dan Gold](https://unsplash.com/@danielcgold)'
---

[DivOps](https://www.divops.dev/), probably more commonly known as Frontend Infrastructure, is all of the tooling needed to set up, maintain, and deploy a modern frontend application. So we're talking [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/), [PostCSS](https://postcss.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/), [ESLint](https://eslint.org/), [Jest](https://jestjs.io/), [Cypress](https://www.cypress.io/), and many many more. They, in addition to the actual code, are what make up our frontend apps.

The latter tools in that list (TypeScript, ESLint, Jest, etc.) help us catch bugs in our code. **They are code validators.** But since they are code as well, we can make mistakes in them too. And as our codebase grows, team members with less JavaScript experience are more likely to make contributions and, unfortunately, also make mistakes.

In my opinion, a codebase with false-positive tests or tests that generate warnings is unhealthy. And this can quickly snowball. I mean, once there are a couple of test warnings or ESLint warnings or React warnings, what's one more, right? **What we need to keep our codebase healthy are code validators of the code validators.** 🤯 And let's make robots handle this. Relying on best practice documentation or human review likely won't get it done.

The rest of this post walks through 5 DivOps configurations I use to help prevent my team (including me) from shipping poor code validation code.

---

## Use additional ESLint plugins

If we're using [ESLint](https://eslint.org/), then we're linting our JavaScript code with its lint rules. And, hopefully, in addition to JavaScript, we're also using plugins to lint our application framework, like [`eslint-plugin-react`](https://github.com/yannickcr/eslint-plugin-react), [`eslint-plugin-jsx-a11y`](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y), and [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) for React code. But we can also add more ESLint plugins to validate our code validators.

For instance, [`eslint-plugin-jest`](https://github.com/jest-community/eslint-plugin-jest) has a recommended rule to ensure that each test makes at least one `expect()` assertion ([`jest/expect-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/expect-expect.md)). Another rule prevents us from accidentally committing skipped tests ([`jest/no-disabled-tests`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/expect-expect.md)).

The [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) has the [`@typescript-eslint/no-explicit-any`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md) rule to prevent the explicit use of `any`, which causes the TypeScript compiler to ignore type checks for that value. This rule is a companion to the [`noImplicitAny`](https://www.typescriptlang.org/tsconfig#noImplicitAny) configuration that prevents the `any` type from being _implied_ by the compiler.

And you wouldn't believe it, but there is an ESLint plugin to lint ESLint! The [`eslint-plugin-eslint-comments`](https://mysticatea.github.io/eslint-plugin-eslint-comments/) provides rules for ESLint directive comments (like `// eslint-disable-next-line`). For instance, the [`eslint-comments/disable-enable-pair`](https://mysticatea.github.io/eslint-plugin-eslint-comments/rules/disable-enable-pair.html) rule ensures that we don't accidentally overlook ESLint warnings when using `eslint-disable` by requiring a paired `eslint-enable`.

Let's go ahead and add all of the recommended rules for each to our `.eslintrc.json`:

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:jest/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": ["jest", "@typescript-eslint", "eslint-comments"]
}
```

## Disallow ESLint warnings

When [configuring ESLint rules](https://eslint.org/docs/user-guide/configuring/rules#configuring-rules), we can set them to `"off"`, `"warn"` or `"error"`. I don't use the `"warn"` setting because then I'm filling up my local console or my CI logs with more and more warnings over time. That's not what I want. That's not what we want. But some recommended ESLint configurations that I use do use the `"warn"` setting. For instance the [`no-console`](https://eslint.org/docs/rules/no-console) rule is set to `"warn"` in [`eslint-config-react-app`](https://www.npmjs.com/package/eslint-config-react-app).

To ensure that we don't ship code with ESLint warnings, we can use the [`--max-warnings`](https://eslint.org/docs/user-guide/command-line-interface#-max-warnings) CLI option. Setting it to `0` will force ESLint to exit with an error status if there is even a single warning-level rule violation.

```json
{
  "name": "healthiest-app-ever",
  "scripts": {
    // highlight-next-line
    "lint:js": "eslint . --ext .ts,.tsx,.js --cache --max-warnings 0"
  }
}
```

## Disallow warnings/errors in Jest tests

Many JavaScript libraries, when run in a non-Production environment, will write warnings or errors to the console. **The hope is that we'll see the issues in our browser console or test logs and fix them.**

I primarily develop in React, and I see all sorts of errors and warnings, the most common ones being incorrect types of props passed to components or not having a unique `key` prop. I recently wrote a post about how to solve another warning that shows up when we [update state after a component has unmounted](/blog/handling-async-react-component-effects-after-unmount/).

The good thing is that these warnings and errors are written to the console during Jest tests as well, provided the test encounters the issue. The bad thing is that these warnings and errors clutter the test run. Debugging with the console is pretty much out the window, and **it honestly lowers confidence in the tests themselves.**

Just like we set up ESLint to fail if there are any warning-level violations, we can do the same with Jest. It's just a lot less straightforward. The Jest configuration file supports the [`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array) config, which is a list of paths to modules that run code to set up the testing framework before each test file in the suite executes. We can write a little bit of additional code to cause a test to fail if any code writes to `console.warn` or `console.error`:

```js
// jest.setup.js

const CONSOLE_FAIL_TYPES = ['error', 'warn']

// Throw errors when a `console.error` or
// `console.warn` happens
CONSOLE_FAIL_TYPES.forEach((type) => {
  console[type] = (message) => {
    // throwing an Error will immediately fail a test
    // highlight-start
    throw new Error(
      `Failing due to console.${type} while running test!\n\n${message}`,
    )
    // highlight-end
  }
})
```

By the way, the [`jest-prop-type-error`](https://github.com/esphen/jest-prop-type-error), will fail a Jest test only if prop type errors are detected. For those using React, this is a good option if you cannot fail on all warnings and errors.

## Ensure Jest tests have assertions

I mentioned earlier that the [`jest/expect-expect`](https://github.com/jest-community/eslint-plugin-jest/blob/master/docs/rules/expect-expect.md) ESLint rule ensures that every test has an `expect()` in it. Usually, this is sufficient, but when testing asynchronous code, **we can have `expect()` assertions that we _think_ are being called but are not**. And by default, if a Jest test runs and there are no failed assertions, the test passes even if didn't execute any assertions.

This means that our asynchronous tests have a much higher likelihood of false positives. We think that the passing test verified our async, but it passed because it ended early. I talk about a solution for this in an earlier post entitled: [A quick trick for Jest asynchronous tests](/blog/quick-trick-jest-asynchronous-tests/). Calling [`expect.hasAssertions()`](https://jestjs.io/docs/en/expect#expecthasassertions) ensures that at least one assertion is _executed_. The ESLint rule only validates that one _existed_ in the test.

Instead of having to add `expect.hasAssertions()` at the beginning of every test or even every test suite, we can add it to our setup file:

```js
// jest.setup.js

// Throw errors when a `console.error` or
// `console.warn` happens
// ...

// ensure *every* test has at
// least one expect() called
// highlight-start
beforeEach(() => {
  expect.hasAssertions()
})
// highlight-end
```

## Use the strict flag in TypeScript

I saved this one for last because I know some folks strongly oppose this idea. And if you are one of them, I at least wanted you to read the first 4 suggestions before you bailed. 😂 The [`strict` flag](https://www.typescriptlang.org/tsconfig#strict) enables [strict checks](https://www.typescriptlang.org/tsconfig#Strict_Type_Checking_Options_6173) in TypeScript which results in stronger guarantees of app correctness. Being looser with TypeScript certainly makes it easier to use, but **the lack of TS errors could be another false positive**.

TypeScript no doubt has a learning curve, especially if you haven't worked in a strongly typed language before. But in my opinion, **there's little reason to go through the hassle of adopting TypeScript without buying into the strict checks**. TypeScript will force us to write our JavaScript code differently to be type-safe. And more often than not, code that's easier to type-check is also code that's easier for us to understand.

Thanks to [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript), I use TypeScript _with Babel_. I use Babel to do what it does best: transpile modern JavaScript to less modern JavaScript. And I use TypeScript to do what it does best: type-check my JavaScript code. Here's what the [`tsconfig.json`](https://www.typescriptlang.org/tsconfig) on my latest project looks like:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    // highlight-next-line
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "downlevelIteration": true,
    "esModuleInterop": true,
    "module": "CommonJS",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve"
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

---

If you are starting a new greenfield project, **I cannot stress enough how beneficial it will be for you and your team to have these 5 DivOps configurations set up**. It'll be much harder for your codebase to become a mess (no promises on the code itself, though 😉). It's much more challenging to make these changes after your codebase has existed for a while or become quite large.

But even if you're working on a "brownfield" project, putting in the effort to do some code custodial work will prove beneficial in the long run. With these configurations activated, you will also be able to offload policing to the "robot." It can be the bad cop telling folks they're doing something wrong instead of you!

Keep learning my friends. 🤓
