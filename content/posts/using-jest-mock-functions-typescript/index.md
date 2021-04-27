---
date: 2021-04-25
title: Using Jest mock functions in TypeScript
shortDescription: How to represent an imported function in TypeScript that has been replaced by a Jest mock
category: typescript
tags: [typescript, jest, mock]
hero: ./mock-paper-kelly-sikkema-oYlvf3pdBw0-unsplash.jpg
heroAlt: White printer paper against a green leafed plant
heroCredit: 'Photo by [Kelly Sikkema](https://unsplash.com/@kellysikkema)'
---

I write my unit tests in TypeScript because I want to ensure that my tests are also type checked. This not only prevents me from cutting corners in my tests by only passing the data I "know" I need, but also ensures that when I refactor my code my tests still are correct. However, we do a lot of funky things in our tests (like mocking functions) which makes using TypeScript more challenging and/or frustrating.

In order to aid TypeScript in understanding Jest mocks, we can use the `jest.MockedFunction` type that's available in the [`@types/jest`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jest/index.d.ts) DefinitelyTyped package (from version `24.9.0`).

```ts
// src/api/players.test.ts

import { getPlayerLadder } from './players'
import {
  MOCK_VALID_LADDER_ID,
  MOCK_VALID_LADDER,
  MOCK_PLAYER_IDS,
  MOCK_PLAYERS,
} from './mocks'
import { getLadder, getPlayers } from '../db/firestore'

// mock the firestore module with an auto-mocked version.
// `getLadder` & `getPlayers` will be jest mocks
jest.mock('../db/firestore')

// take the functions we're mocking and add the jest mock properties
// to them so that everything will type-check properly
// highlight-start
const mockGetLadder = getLadder as jest.MockedFunction<typeof getLadder>
const mockGetPlayers = getPlayers as jest.MockedFunction<typeof getPlayers>
// highlight-end

describe('getPlayerLadder', () => {
  it('returns a player ladder from a valid id', async () => {
    // use the variables that are typed with the additional
    // mock information instead of the originals
    // highlight-start
    mockGetLadder.mockResolvedValue(MOCK_VALID_LADDER)
    mockGetPlayers.mockResolvedValue(MOCK_PLAYERS)
    // highlight-end

    const playerLadder = await getPlayerLadder(MOCK_VALID_LADDER_ID)

    expect(getLadder).toHaveBeenCalledTimes(1)
    expect(getLadder).toHaveBeenCalledWith(MOCK_VALID_LADDER_ID)

    expect(getPlayers).toHaveBeenCalledTimes(1)
    expect(getPlayers).toHaveBeenCalledWith(MOCK_PLAYER_IDS)

    expect(playerLadder).toMatchSnapshot()
  })
})
```

If you've been dealing with this problem and you're already familiar with how [Jest mock functions](https://jestjs.io/docs/mock-functions) work in JavaScript, this may be all you needed in order to solve your problem. If that's the case, I'm glad I was able to help! 😄 But if you want a better understanding of how this all works, let's keep the party going!

In my latest dev project [NBA Player Tiers](https://nbaplayertiers.com), I have this API function called `getPlayerLadder`.

```ts
// src/api/players.ts

import { getLadder, getPlayers } from '../db/firestore'
import { getPlayerIdsFromLadder, makePlayerLadder } from '../utils'
import type { LadderId } from '../types'

export const getPlayerLadder = async (id: LadderId) => {
  // make a request to firestore to grab raw ladder
  // that just has player IDs
  const rawLadder = await getLadder(id)

  const playerIds = getPlayerIdsFromLadder(rawLadder)

  // make another request to firestore to grab all of the
  // full player info for each player ID
  const players = await getPlayers(playerIds)

  // replace each ID w/ the corresponding player info to
  // create a player ladder
  const playerLadder = makePlayerLadder(rawLadder, players)

  return playerLadder
}
```

What `getPlayerLadder` does isn't terribly important, but I just wanted to provide something concrete as we work through a test.

```ts
// src/api/players.test.ts

import { getPlayerLadder } from './players'
import {
  MOCK_VALID_LADDER_ID,
  MOCK_VALID_LADDER,
  MOCK_PLAYER_IDS,
  MOCK_PLAYERS,
} from './mocks'
import { getLadder, getPlayers } from '../db/firestore'

// mock the firestore module with an auto-mocked version
// `getLadder` & `getPlayers` will be jest mocks
jest.mock('../db/firestore')

describe('getPlayerLadder', () => {
  it('returns a player ladder from a valid id', async () => {
    // have `getLadder` & `getPlayers` to return mocked data.
    // The test passes, but these two lines will be type errors in TypeScript 😢
    // highlight-start
    getLadder.mockResolvedValue(MOCK_VALID_LADDER)
    getPlayers.mockResolvedValue(MOCK_PLAYERS)
    // highlight-end

    const playerLadder = await getPlayerLadder(MOCK_VALID_LADDER_ID)

    expect(getLadder).toHaveBeenCalledTimes(1)
    expect(getLadder).toHaveBeenCalledWith(MOCK_VALID_LADDER_ID)

    expect(getPlayers).toHaveBeenCalledTimes(1)
    expect(getPlayers).toHaveBeenCalledWith(MOCK_PLAYER_IDS)

    expect(playerLadder).toMatchSnapshot()
  })
})
```

Because `getLadder` & `getPlayers` are making requests to the Firebase [Cloud Firestore](https://firebase.google.com/products/firestore) (a NoSQL database in the cloud), we need to mock those functions to return mocked data. We definitely don't want to be making real API requests in our tests. Mocking is fine in Jest, but calling [`.mockResolvedValue`](https://jestjs.io/docs/mock-function-api#mockfnmockresolvedvaluevalue) on the mocked `getLadder` & `getPlayers` functions cause type errors. **These type errors happen because TypeScript doesn't understand what `jest.mock(...)` is doing.** We get an error that looks like:

```
Property 'mockResolvedValue' does not exist on type '(id: LadderId) => RawLadder'.
```

I've always been adamant about type-checking my tests, but in the past I would use [`// @ts-ignore`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-6.html#suppress-errors-in-ts-files-using--ts-ignore-comments) comments. I didn't know how to fix the type error, but at least the rest of tests were still type-checked:

```ts
// @ts-ignore getLadder is a mock for testing purposes
getLadder.mockResolvedValue(MOCK_VALID_LADDER)
// @ts-ignore getPlayers is a mock for testing purposes
getPlayers.mockResolvedValue(MOCK_PLAYERS)
```

I use the [`ban-ts-comment`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md) ESLint rule from [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin) which required me to include a description for why I'm using `// @ts-ignore`. Recently, though, I got tired of using `// @ts-ignore` and searched for a more legit way to solve this problem. **I wanted to be able to let TypeScript know that `getLadder` & `getPlayers` were in fact [Jest mock functions](https://jestjs.io/docs/mock-functions) in addition to having their normal API.**

It turns out that the `@types/jest` DefinitelyTyped package includes a type to solve this: [`jest.MockedFunction`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1f64dcea8a712e7154be51e367c2e1ba84272188/types/jest/index.d.ts#L1107). It takes any function and extends it with the [`jest.MockInstance` interface](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/1f64dcea8a712e7154be51e367c2e1ba84272188/types/jest/index.d.ts#L1150-L1310). We can use it to type our mocked functions.

```ts
import { getPlayerLadder } from './players'
import {
  MOCK_VALID_LADDER_ID,
  MOCK_VALID_LADDER,
  MOCK_PLAYER_IDS,
  MOCK_PLAYERS,
} from './mocks'
import { getLadder, getPlayers } from '../db/firestore'

jest.mock('../db/firestore')

// highlight-start
const mockGetLadder = getLadder as jest.MockedFunction<typeof getLadder>
const mockGetPlayers = getPlayers as jest.MockedFunction<typeof getPlayers>
// highlight-end

// tests...
```

We take our mocked functions, `getLadder` & `getPlayers` and use [type assertions](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions) to create new variables with the extended types. The mocked functions are still the same, but they now have the full type information.

```ts
describe('getPlayerLadder', () => {
  it('returns a player ladder from a valid id', async () => {
    // use the variables that are typed with the mock information
    // instead of the originals so that they pass type-checking
    // highlight-start
    mockGetLadder.mockResolvedValue(MOCK_VALID_LADDER)
    mockGetPlayers.mockResolvedValue(MOCK_PLAYERS)
    // highlight-end

    const playerLadder = await getPlayerLadder(MOCK_VALID_LADDER_ID)

    expect(getLadder).toHaveBeenCalledTimes(1)
    expect(getLadder).toHaveBeenCalledWith(MOCK_VALID_LADDER_ID)

    expect(getPlayers).toHaveBeenCalledTimes(1)
    expect(getPlayers).toHaveBeenCalledWith(MOCK_PLAYER_IDS)

    expect(playerLadder).toMatchSnapshot()
  })
})
```

So now when we use `mockGetLadder` & `mockGetPlayers` in our tests, they finally type-check. 🎉

I went on this long roundabout journey to figure out `jest.MockedFunction`, reading the source code of both `@types/jest` and [`ts-jest`](https://kulshekhar.github.io/ts-jest/) (an alternative way to use TypeScript with Jest). `ts-jest` has this test helper called [`mocked()`](https://kulshekhar.github.io/ts-jest/docs/guides/test-helpers) which ultimately does what we did with `jest.MockedFunction`, but nicely abstracted away in a helper. It was looking at the [`mocked()` implementation](https://github.com/kulshekhar/ts-jest/blob/5b94e8fe19ce0e0fb73d1475ed520108ae7d5bd6/src/utils/testing.ts#L41-L44) and mapping it back to `@types/jest` that I figured out `jest.MockedFunction`.

It really only took a couple of hours of code spelunking to figure this out, but it turns out the answer had been right under my nose the whole time. **The official Jest docs added instructions on [using TypeScript with mock functions](https://jestjs.io/docs/mock-function-api#typescript)** at some point and the solution was exactly what I had "discovered." 😅

But it wasn't a total waste of time because I cribbed `mocked()` from `ts-jest` to create my own `asMock()` helper.

```ts
// test/helpers.ts

type MockableFunction = (...args: any[]) => any

// use generic constraints to restrict `mockedFunc` to be any type of function
export const asMock = <Func extends MockableFunction>(mockedFunc: Func) =>
  mockedFunc as jest.MockedFunction<typeof mockedFunc>
```

As you can see `asMock` doesn't do anything with `mockedFunc`. It simply returns it with the proper type information. I don't need to mock functions all that often. But I figure wrapping the type assertion in a helper means most folks won't have to try to understand all the `jest.MockedFunction<>` business in their test code.

```ts
// src/api/players.test.ts

import { getPlayerLadder } from './players'
import {
  MOCK_VALID_LADDER_ID,
  MOCK_VALID_LADDER,
  MOCK_PLAYER_IDS,
  MOCK_PLAYERS,
} from './mocks'
import { getLadder, getPlayers } from '../db/firestore'
import { asMock } from '../../test/helpers'

// mock the firestore module with an auto-mocked version
// `getLadder` & `getPlayers` will be jest mocks
jest.mock('../db/firestore')

// take the functions we're mocking and add the jest mock properties
// to them so that everything will type-check properly
// highlight-start
const mockGetLadder = asMock(getLadder)
const mockGetPlayers = asMock(getPlayers)
// highlight-end

// tests...
```

I chose the name `asMock` for the function to try to convey that the function only does a type assertion. It doesn't actually do any of the mocking. That's what `jest.mock()` does.

Anyway, I'm curious if there are other folks who have dealt with this problem? What sorts of workarounds were you using? Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp)!

Keep learning my friends. 🤓
