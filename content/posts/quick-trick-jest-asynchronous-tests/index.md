---
date: 2020-07-29
title: A quick trick for Jest asynchronous tests
shortDescription: A small configuration you can add to Jest to reduce false positives for async tests
category: testing
tags: [async, await, promises]
hero: ./joker-card-toni-reed-VupdxmowTDg-unsplash.jpg
heroAlt: Joker cards sitting on a bed of cards
heroCredit: 'Photo by [Toni Reed](https://unsplash.com/@trfotos)'
---

Two weeks ago I wrote a post on [Asynchronous testing with Enzyme & React in Jest](/blog/asynchronous-testing-with-enzyme-react-jest/). It covered the challenge of testing an async React component when we need to wait until all of the promises have resolved before we can assert on the updated UI. I want to talk about async testing in Jest again, but this time not specifically dealing with UI testing.

Recently I was writing unit tests for an API wrapper and I wanted to test an error case:

```js
it('returns a rejected promise when the count is 1', async () => {
  try {
    await getItems(1)
  } catch (err) {
    expect(error).toEqual({
      message: 'Invalid request',
    })
  }
})
```

There are [several ways to test asynchronous code in Jest](https://jestjs.io/docs/en/asynchronous) and the above follows the example given for using `async`/`await`. I'm trying to assert that when `getItems(1)` is called that the rejected promise returns an object with a `message` of `'Invalid request'`. It turned out that my `getItems` code had a bug. It wasn't returning a rejected promise, but a resolved promise in this case. But even though the test never executed the assertion within the `catch` handler, **the test still passed**.

Similarly here's another test that passed when it shouldn't have:

```js
it('returns items when the count is greater than 1', () => {
  // bad test! the promise should be returned in the test
  getItems(5).then((data) => {
    expect(data).toMatchSnapshot()
  })
})
```

In this case, based on the Jest's async testing guide, I wrote the test incorrectly. I needed to **return the promise from `getItems(5)`** so that Jest could know this was an async test and wait until the promise had finished resolving. How it's written now, however, the test calls `getItems(5)` and ends before the async handling of the `.then()`. It calls `getItems()` and quits before receiving the response.

But still, in this case, the test passed. Another false positive.

The reason the tests passed even though the code or test were written incorrectly is because in both cases no assertions were run. The `expect()` assertion in the `catch` didn't run in the first example and the assertion within the `.then()` didn't run in the second. It turns out by default that **Jest will pass a test if no assertions run**. 🤦🏾‍♂️

A way to avoid these false positives is by calling [`expect.hasAssertions()`](https://jestjs.io/docs/en/expect#expecthasassertions) at the beginning of a test:

```js
it('returns a rejected promise when the count is 1', async () => {
  expect.hasAssertions()

  try {
    await getItems(1)
  } catch (err) {
    expect(error).toEqual({
      message: 'Invalid request',
    })
  }

  // Test will fail if `getItems()` didn't return a rejected promise
})
it('returns items when the count is greater than 1', () => {
  expect.hasAssertions()

  getItems(5).then((data) => {
    expect(data).toMatchSnapshot()
  })

  // test will fail because we didn't properly return the promise
  // from `getItems()`
})
```

Now in both cases, the tests will fail because the expected assertions never ran. Even if we fix the code/tests, we'll still want to keep the `expect.hasAssertions()` check because it's a great safeguard for asynchronous testing.

However, it'll be annoying to have to add `expect.hasAssertions()` to every single test in every single test file. So what we can do is update the [Jest config file](https://jestjs.io/docs/en/configuration) and specify the [`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array) option. The file(s) we list for `setupFilesAfterEnv` can configure or set up the testing framework before each test file in the suite is executed. So we can add a file that ensures there's at least one assertion run for every test case:

```js
// jest.setup.js

beforeEach(() => {
  // ensure there's at least one assertion run for every test case
  expect.hasAssertions()
})

// other setup stuff
```

In my opinion, this is how Jest should run by default, but I'm sure there's some legacy reason why it works the way that it does.

FYI - If you decide to add this to an existing codebase with tests, be prepared to have a lot of tests to fix! 😄 Every time that I've added this to an existing test suite, it's uncovered more than a handful of asynchronous tests that _were_ passing but were never truly running. And once the were being run after the fix, the tests were actually broken (or maybe even the code was 😨).

Keep learning my friends. 🤓
