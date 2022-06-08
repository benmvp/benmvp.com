---
date: 2022-05-01
title: Mock all functions in a JavaScript module except one using Jest
shortDescription: A shorthand way with jest.mock() to auto-mock all functions in a JavaScript module yet use the real implementation of one function
category: JavaScript
tags: [testing, jest, javascript]
hero: ./lone-tree-karim-manjra-ulquHF89xuY-unsplash.jpeg
heroAlt: A lone tree in the desert
heroCredit: 'Photo by [Karim MANJRA](https://unsplash.com/@karim_manjra)'
---

There are times in a Jest test when we have a module where the majority of the functions need to be mocked, but we have one (or two) that need to be left alone. Likely in this case most of the functions have side effects. But there are some that are normal input/output (aka "pure") functions that need to work when they are called during a test run. We can use a combination of [`jest.requireActual()`](https://jestjs.io/docs/jest-object#jestrequireactualmodulename) and [`jest.createMockFromModules()`](https://jestjs.io/docs/jest-object#jestcreatemockfrommodulemodulename).

```js
// app.test.js

// create a mock of the `../utils/players` module that is called
// from `app.js` (the code being tested)
jest.mock('../utils/players', () => {
  // use auto-mocking system to get an object that mocks all
  // of the module's functions, just like what `jest.mock()`
  // (w/ no parameters) would do
  const allAutoMocked = jest.createMockFromModule('../utils/players')

  // grab all the *real* implementations of the module's functions
  // in an object
  const actual = jest.requireActual('../utils/players')

  // return a new module implementation
  return {
    __esModules: true,

    // first start with all of the module's functions auto-mocked
    ...allAutoMocked,

    // then optionally include any override module mocks
    getPlayers: jest.fn(() => []),
    getTeams: jest.fn(() => []),

    // lastly override w/ any of the module's functions that
    // we want to use the *real* implementations for
    formatPlayerName: actual.formatPlayerName,
  }
})
```

If you are like how I was looking for how in Jest to mock a JavaScript module to keep the real implementation of one function, but mock the rest, here's your answer! 🎉 Feel free to return to your test code so you can continue writing high-quality tests. 😉 But... if you're interested in learning how all of this works, by all means, read on!

---

[Jest](https://jestjs.io/) has pretty sophisticated mocking utilities, including mocking modules. The [`jest.mock()`](https://jestjs.io/docs/jest-object#jestmockmodulename-factory-options) method allows us to mock a JavaScript module with an auto-mocked version when it is used in a test run.

Let's say we have a `players.js` file with several functions in it.

```js
// players.js

export const getPlayers = (season) => {
  // makes some sort of API call to get all of the players
  // in a given NBA `season`
}

export const writePlayersData = (players, filePath) => {
  // writes `players` data to a JSON file at the
  // specified `filePath`
}

export const getTeams = (playerId) => {
  // makes some sort of API call to get all the teams
  // the specified player has played for
}

export const formatPlayerName = (playerData) => {
  // given the `playerData`, returns a formatted version of
  // their name, including team & jersey number
}
```

And let's say we have an `app.test.js` file, containing tests for `app.js` which uses functions in `players.js`.

```js
// app.test.js

// mock the `../utils/players` module
jest.mock('../utils/players')

// calls to any of the 4 functions in `app.js` will return
// `undefined` because they've been auto-mocked
```

Auto-mocking means that Jest will replace any function within the mocked module (`../utils/players` in this case) with a new function that just returns `undefined`. **So if `app.js` calls `writePlayersData()` during a test run, it'll do nothing instead of writing to the filesystem** (which we probably don't want to do in a unit test).

We can even assert that `writePlayersData` is called in a test by importing it.

```js
// app.test.js

import { run } from './app'
import { writePlayersData } from '../utils/players'

// create a mock of the `../utils/players` module
jest.mock('../utils/players')

// calls to any of the 4 functions in `app.js` will return
// `undefined` because they've been auto-mocked

it('calls `writePlayersData` when the `write` option is true', () => {
  run({ write: true })

  // verify only writing once
  expect(writePlayersData).toHaveBeenCalledTimes(1)

  // verify called with the expected params
  expect(writePlayersData).toHaveBeenCalledWith(/* ... */)
})
```

The `jest.mock()` method also supports parameters that allow us to specify a new implementation for a module instead of the default auto-mocking.

```js
// app.test.js

// create a mock of the `../utils/players` module
// but instead of auto-mocking, provide mock
// implementations
jest.mock('../utils/players', () => {
  // return a new module implementation
  return {
    __esModule: true,

    getPlayers: jest.fn(() => []),
    getTeams: jest.fn(() => []),
    writePlayersData: jest.fn(),
    formatPlayerName: jest.fn(() => ''),
  }
})

// calls to any of the 4 functions in `app.js` during a
// test run will return the mocked values above
```

Now the 4 functions are replaced with the specified mock functions (via [`jest.fn()`](https://jestjs.io/docs/jest-object#jestfnimplementation)) that return mock data. If any of them are called from `app.js` in a test case, the mock functions are used. **These explicit mocks are especially useful for `getPlayers()` and `getTeams()` because they are expected to return data not `undefined` when called.**

There are two problems with this approach. First, even though we're fine with `writePlayersData` being auto-mocked, we still have to include it with the default `jest.fn()`. **Otherwise, `writePlayersData` wouldn't exist at all during a test run.** Second, we have to provide a mock implementation for `formatPlayerName` even though we can (and probably should) use its real implementation.

We can use the [`jest.requireActual()`](https://jestjs.io/docs/jest-object#jestrequireactualmodulename) method to grab the actual implementation of a module instead of a mock.

```js
// app.test.js

// create a mock of the `../utils/players` module
jest.mock('../utils/players', () => {
  // return a new module implementation
  return {
    __esModule: true,

    // spread in the *real* implementations of all the
    // module's functions (especially `formatPlayerName`)
    ...jest.requireActual('../utils/players'),

    // override the following module functions with
    // mock implementations
    getPlayers: jest.fn(() => []),
    getTeams: jest.fn(() => []),
    writePlayersData: jest.fn(),
  }
})

// during a test run, calls to `formatPlayerName()` will be
// normal, but the other 3 will be mocked 👍🏾
```

Using `jest.requireActual()` solves our problem with having to specify a mocked version of `formatPlayerName`. However, our first problem still exists. We still have to specify a default mock for `writePlayersData`. And if the module had more than one function that could be auto-mocked, having to specify them all would be a pain. **It would also be error-prone for when we add or remove functions from the module.**

If we combine `jest.requireActual()` with the [`jest.createMockFromModule()`](https://jestjs.io/docs/jest-object#jestcreatemockfrommodulemodulename) method, we can get the best of both worlds.

```js
// app.test.js

// create a mock of the `../utils/players` module that is called
// from `app.js` (the code being tested)
jest.mock('../utils/players', () => {
  // use auto-mocking system to get an object that mocks all
  // of the module's functions, just like what `jest.mock()`
  // (w/ no parameters) would do
  const allAutoMocked = jest.createMockFromModule('../utils/players')

  // grab all the *real* implementations of the module's functions
  // in an object
  const actual = jest.requireActual('../utils/players')

  // return a new module implementation
  return {
    __esModules: true,

    // first start with all of the module's functions auto-mocked
    ...allAutoMocked,

    // then optionally include any override module mocks
    getPlayers: jest.fn(() => []),
    getTeams: jest.fn(() => []),

    // lastly override w/ any of the module's functions that
    // we want to use the *real* implementations for
    formatPlayerName: actual.formatPlayerName,
  }
})
```

The `jest.createMockFromModule()` method uses the auto-mocking system to generate a mocked version of the module as an object. We use that as our base for the new module implementation (`allAutoMocked`). In our example, this would be for `writePlayersData`, but in a bigger module, this could be for many more functions.

Now since `allAutoMocked` contains all of the auto-mocked functions, we need to override with the ones we care about. We could next provide explicit mocks for `getPlayers` and `getTeams`. More than likely each test case will probably want different implementations for these functions, so in reality we could leave these auto-mocked as well. We would provide implementations in `describe()` blocks below.

Then last, and most importantly, we provide the real implementations of the one (or more) functions we want "un-mocked". **The result is that most of the functions in the module are mocked, and only one or two are using their real implementations.**

---

Like most of my posts, this is a real problem I came across. I had a module where most of the functions had side effects so they needed to be auto-mocked in my tests. But I had one "pure" function that I absolutely could not mock because it was necessary for the code to run.

I found [one answer on StackOverflow](https://stackoverflow.com/a/58607108) written back in October 2019 that created `allAutoMocked` using `jest.requireActual` but replacing the values with `jest.fn()`. That _was_ my implementation until PR feedback pointed me to `jest.createMockFromModule()`. It was introduced somewhat recently in [Jest 26](https://jestjs.io/blog/2020/05/05/jest-26) (May 5, 2020) so I didn't even know about it. Obviously, it didn't exist when the StackOverflow answer was written either.

My hope is that this post saves somebody from multiple hours of searching for a reasonable answer. 😃 But if you've got any questions about this problem or other JavaScript testing questions, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
