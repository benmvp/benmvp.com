---
date: 2021-12-17
title: Quickie fetch timeout
shortDescription: Use Promise.race to add timeout support to the Fetch API
category: javascript
tags: [fetch, timeout, promises]
hero: ./locks-marcos-mayer-8_NI1WTqCGY-unsplash.jpg
heroAlt: Locks on a bridge
heroCredit: 'Photo by [marcos mayer](https://unsplash.com/@mmayyer)'
---

Libraries like [`axios`](https://github.com/axios/axios) provide lots of utilities for making HTTP requests, including timing out long-running requests. I've always used the native [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) because it usually gives me everything I need without having to include another dependency. However, the default timeout for `fetch()` is browser-dependent. In Firefox, a network request times out at 90 seconds, while Chrome is a whopping 300 seconds!

We can create our own `fetchWithTimeout()` helper that returns a rejected promise when the fetch request takes too long. Take a look:

```js
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 2500, ...fetchOptions } = options

  return Promise.race([
    fetch(url, fetchOptions),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Request for ${url} timed out after ${timeout} milliseconds`,
          ),
        )
      }, timeout)
    }),
  ])
}

const loadPlayers = async () => {
  try {
    const res = await fetchWithTimeout('/api/players', {
      timeout: 1000,
    })
    const players = await res.json()

    return players
  } catch (err) {
    console.error(err)
  }
}
```

Short and sweet. I like it. Let's break down the code to understand how it all works.

```js
// highlight-start
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 2500, ...fetchOptions } = options
  // highlight-end

  return Promise.race([
    fetch(url, fetchOptions),
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Request for ${url} timed out after ${timeout} milliseconds`,
          ),
        )
      }, timeout)
    }),
  ])
}
```

Our `fetchWithTimeout` helper has an identical function signature as the native `fetch()` except it accepts an additional `timeout` option. Here it defaults to `2500` milliseconds, but it can be any value. Thanks to [object destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring), any remaining options are in `fetchOptions`.

> NOTE: Technically, `fetch()` can also accepts a single argument which is a [request object](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#supplying_your_own_request_object), but our `fetchWithTimeout` isn't dealing with that alternative function signature. I'm not sure I've ever used it.

```js
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 2500, ...fetchOptions } = options

  // highlight-start
  return Promise.race([
    fetch(url, fetchOptions),
    // highlight-end
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Request for ${url} timed out after ${timeout} milliseconds`,
          ),
        )
      }, timeout)
    }),
    // highlight-next-line
  ])
}
```

The function returns the result from [`Promise.race()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) which is a promise that resolves or rejects as soon as one of the promises in the array resolves or rejects. Whichever promise finishes first "wins." I haven't found `Promise.race()` to be very useful, but this is like the one place where it comes in handy.

We pass to `Promise.race()` our normal `fetch()` call, which returns the promise we're used to, and then another promise that rejects after the `timeout` time has elapsed. This rejected promise is the last part of the code.

```js
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 2500, ...fetchOptions } = options

  return Promise.race([
    fetch(url, fetchOptions),
    // highlight-start
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(
          new Error(
            `Request for ${url} timed out after ${timeout} milliseconds`,
          ),
        )
      }, timeout)
    }),
    // highlight-end
  ])
}
```

We construct a `Promise` object that rejects after the specified `timeout` using `setTimeout()`. We've created a Promise wrapper around `setTimeout()`! So if our timeout Promise rejects _before_ the `fetch()` call returns, `Promise.race()` returns our rejected promise. Our `fetchWithTimeout()` call has timed out. Mission accomplished! However, if the `fetch()` call finishes before the `setTimeout()` wrapper rejects, `Promise.race()` returns the promise returned by `fetch()` like normal.

> NOTE: In this implementation, when `fetchWithTimeout()` returns the rejected promise after "timing out," the `fetch()` request is not canceled. **`Promise.race()` does not abort any other promises that have yet to finish.** If you need to cancel the `fetch()` you can use the [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) to send a signal to `fetch()` to cancel the request.

```js
const loadPlayers = async () => {
  try {
    const res = await fetchWithTimeout('/api/players', {
      timeout: 1000,
    })
    const players = await res.json()

    return players
  } catch (err) {
    console.error(err)
  }
}
```

In our code, we call `fetchWithTimeout()` identically to how we use `fetch()`, except we can pass in a `timeout` override if we want. In the `catch` we handle our timeout error along with any other errors.

And that's it! There's probably a lot more we can add to `fetchWithTimeout()`, but this implementation is the nuts and bolts of it.

## Promise-based wait

I mentioned earlier that we created a Promise wrapper around `setTimeout()`. Well, we can take our code and turn it into a Promise-based interface for `setTimeout()`.

```js
const wait = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds))
```

This `wait()` helper returns a promise that resolves after the specified `milliseconds`. With the help of [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) we can write code that waits in synchronous-looking code.

```js
const highlightElement = async (el) => {
  el.style.backgroundColor = 'yellow'

  await wait(1000)

  el.style.backgroundColor = 'transparent'
}
```

Our implementation of `fetchWithTimeout()` only works if we have a rejected promise after the timeout. But we can still make use of `wait()`.

```js
const fetchWithTimeout = (url, options = {}) => {
  const { timeout = 2500, ...fetchOptions } = options

  return Promise.race([
    fetch(url, fetchOptions),
    // highlight-start
    wait(timeout).then(() => {
      throw new Error(
        `Request for ${url} timed out after ${timeout} milliseconds`,
      )
    }),
    // highlight-end
  ])
}
```

Within the `.then()` of the promise from `wait()`, we throw the `Error` object. That still results in a rejected promise, and our `fetchWithTimeout()` ultimately works the same.

Timing out async calls is the only use case I've found for `Promise.race()`. If you've used `Promise.race()` to solve other problems, I'd love to hear it! Reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
