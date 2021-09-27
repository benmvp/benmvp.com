---
date: 2021-09-26
title: Successfully using async functions in React useEffect
shortDescription: How to avoid the exhaustive deps ESLint error by properly using async functions within the React useEffect Hook
category: react
tags: [react, hooks, async, functions, linting]
hero: ./pinky-promise-andrew-petrov-hopnkQoC0dg-unsplash.jpeg
heroAlt: Two hand molds touching pinkies
heroCredit: 'Photo by [Andrew Petrov](https://unsplash.com/@andrewwwpetrov)'
---

JavaScript [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) making dealing with [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) a bit simpler because it flattens out nested promises into sequential statements. But using async functions within React's [`useEffect()`](https://reactjs.org/docs/hooks-effect.html) comes with a gotcha that I'd like to walk through and explain.

Let's say we have a `useTopPlayers()` custom Hook that retrieves the NBA best players in a specific statistical category. The NBA's "API" only returns the IDs of the players, so after getting the IDs we have to make **another** API request to get the raw player info for each. Finally we need to normalize the raw info into a useful format that our app can consume.

```js
import { useEffect, useState } from 'react'
import Bugsnag from '@bugsnag/js'
import {
  getTopPlayers as getTopPlayersApi,
  getPlayersById as getPlayersByIdApi,
} from './api'
import { normalizeApiPlayers } from './utils'

const useTopPlayers = (category, season) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getTopPlayersApi(category, season)
      .then((playerIds) => {
        // avoid nesting by returning the promise returned by
        // `getPlayersById`
        return getPlayersById(playerIds)
      })
      .then((rawPlayers) => {
        setPlayers(normalizeApiPlayers(rawPlayers))
      })
      .catch((err) => {
        // notify our error monitoring (using Bugsnag)
        Bugsnag.notify(err)

        // `null` players means an error happened
        setPlayers(null)
      })
  }, [category, season])

  return players
}
```

This is pretty standard code. It's simplified a bit because I have abstracted the logic around making the two API requests and normalizing the data into helper functions. But there are two main drawbacks of using promises here:

1. Any code depending on the result of the call to `getTopPlayersApi()` has to be nested within the `.then()` promise chain.
2. Another async call within a `.then()` could result in nested promise chains which is basically the same as [callback hell](http://callbackhell.com/). We can at least flatten the chain by returning the promise returned by the nested async function in the outer `.then()`.

Async functions to the rescue! The naive approach would be to add [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) to `useEffect()`'s callback function.

```js
const useTopPlayers = (category, season) => {
  const [players, setPlayers] = useState([])

  // 🛑 DON'T DO THIS! 🛑
  // highlight-next-line
  useEffect(async () => {
    try {
      // highlight-start
      const playerIds = await getTopPlayersApi(category, season)
      const rawPlayers = await getPlayersById(playerIds)
      // highlight-end

      setPlayers(normalizeApiPlayers(rawPlayers))
    } catch (err) {
      Bugsnag.notify(err)
      setPlayers(null)
    }
  }, [category, season])

  return players
}
```

The code seems to flow more nicely using [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await), right? But we're unintentionally breaking one of the rules of the `useEffect()` Hook by making `useEffect()` asynchronous.

Despite breaking the rules, the majority of the time our code would still work fine. However, if we have multiple `useEffect()` calls that were order-dependent, we could run into a race-condition, creating a bug that would be super hard to track down. But if we're using the [React Hooks ESLint Plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) (which we absolutely should be), it clues us in to our lurking issue.

```
Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetchingeslintreact-hooks/exhaustive-deps
```

Similarly, if we're using TypeScript it also warns us of the problem (although admittedly far less clearly).

```
Argument of type '() => Promise<void>' is not assignable to parameter of type 'EffectCallback'.
  Type 'Promise<void>' is not assignable to type 'void | Destructor'.
    Type 'Promise<void>' is not assignable to type 'Destructor'.
      Type 'Promise<void>' provides no match for the signature '(): void | { [UNDEFINED_VOID_ONLY]: never; }'.
```

What are these errors telling us? Well, `useEffect()` is supposed to either return nothing or a [cleanup function](https://reactjs.org/docs/hooks-effect.html#example-using-hooks-1). But by making the `useEffect()` function an async function, it [automatically returns a `Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#return_value) (even if that promise contains no data).

We can follow the lint error's suggestion by defining an inner function within the `useEffect()` function and immediately calling it.

```js
const useTopPlayers = (category, season) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // highlight-next-line
    const fetchTopPlyers = async () => {
      try {
        // highlight-start
        const playerIds = await getTopPlayersApi(category, season)
        const rawPlayers = await getPlayersById(playerIds)
        // highlight-end

        setPlayers(normalizeApiPlayers(rawPlayers))
      } catch (err) {
        // notify our error monitoring (using Bugsnag)
        Bugsnag.notify(err)

        // `null` players means an error happened
        setPlayers(null)
      }
    }

    // highlight-next-line
    fetchTopPlayers()
  }, [category, season])

  return players
}
```

Now the main `useEffect()` function is back to returning nothing. Instead, we've defined the `fetchTopPlayers()` inner function that we immediately call. We make `fetchTopPlayers()` an async function so that we can use `await` within it.

I gotta admit, having to define the inner function is a bit clunky. But, in my opinion, it's a small price to pay to drastically improve the developer experience of async `useEffect` calls. You know, what's actually the most annoying is having to come up with a non-duplicative name for the inner function. We _could_ instead use an [IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (immediately-invoked function expression).

```js
const useTopPlayers = (category, season) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // highlight-next-line
    ;(async () => {
      try {
        const playerIds = await getTopPlayersApi(category, season)
        const rawPlayers = await getPlayersById(playerIds)

        setPlayers(normalizeApiPlayers(rawPlayers))
      } catch (err) {
        Bugsnag.notify(err)
        setPlayers(null)
      }
      // highlight-next-line
    })()
  }, [category, season])

  return players
}
```

But to me, this is taking a clunky solution and making it worse. 🤪

---

So if you've added the `async` inner function before not fully understanding why, now you know. 😄 And if you've made the `useEffect()` function itself `async`, you have a sneaky bug waiting to bite you when you least expect it. 😂 You probably should go back and fix the code.

If you've got any questions or comments feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
