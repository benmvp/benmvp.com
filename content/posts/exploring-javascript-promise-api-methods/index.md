---
date: 2021-07-11
title: Exploring the JavaScript Promise API methods
shortDescription: Learn the JavaScript Promise static methods like Promise.allSettled, Promise.any, and others through real-world use cases
category: javascript
tags: [javascript, promise, async, await]
hero: ./wedding-bands-tetiana-shyshkina-HC-FGU-chN0-unsplash.jpeg
heroAlt: Two wedding bands on a table
heroCredit: 'Photo by [Tetiana SHYSHKINA](https://unsplash.com/@shyshkina)'
---

[ECMAScript 2021](https://ui.dev/es2021/) introduced a new static method to the `Promise` object called [`Promise.any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any). In total there are now 6 static methods on the `Promise` object:

- [`Promise.all`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
- [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)
- [`Promise.any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)
- [`Promise.race`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)
- [`Promise.resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
- [`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

We use promises everywhere in JavaScript code for handling asynchronous code. But when would we use one method over another? Well let's walk through use cases for each to find out!

---

## `Promise.all`

`Promise.all` (included in the original ES2015 spec) takes an array (technically an ["iterable"](/blog/learning-es6-iterators-iterables/#iterables)) of promises and returns a single `Promise` object that resolves with an array of the results from the list of promises.

```js
const run = async () => {
  const promise = Promise.all([
    fetchJson('https://swapi.dev/api/people/'),
    fetchJson('https://stats.nba.com/stats/playerindex'),
    fetchJson('https://api.github.com/users/benmvp/repos'),
  ])

  const [starWarsPeople, nbaPlayers, myRepositories] = await promise
}
```

> See [Quickie fetch JSON helper for TypeScript](/blog/quickie-fetch-json-helper-for-typescript/) for an explanation and sample implementation of `fetchJson()`

**The cool thing about `Promise.all` is that it runs the promises in the list in parallel.** So in the example, we fetch results from all 3 REST APIs simultaneously. Then when they've all returned, the `promise` variable holds the result. Using the [`await`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) operator, we get the array value out of the promise. And then using [array destructuring](/blog/learning-es6-destructuring/#array-destructuring) we immediately assign the array elements into individual data variables.

One gotcha (or benefit depending on how you look at it) with `Promise.all` is that it fails fast. **If one of the promises in the array fails, instead of getting back the array of promises, we immediately get a rejected promise for the first failed promise.**

```js
const run = async () => {
  const promise = Promise.all([
    fetchJson('https://swapi.dev/api/people/'),
    fetchJson('https://stats.nba.com/stats/playerindex'),
    // ❌ let's pretend this one fails 👇🏾
    fetchJson('https://api.github.com/users/benmvp/repos'),
  ])

  try {
    const [starWarsPeople, nbaPlayers, myRepositories] = await promise
  } catch (err) {
    // we'll get the failure message for the first promise that failed
    console.error('One of the APIs failed!')
    console.error(err.message)
  }
}
```

**Failing fast is useful if our application shouldn't continue if one of the asynchronous tasks fails.** Maybe our UI doesn't make sense unless we have data from _all_ of the async sources. So we use `Promise.all` so that we can fail as quickly as possible.

---

## `Promise.allSettled`

Funny enough, `Promise.all` doesn't actually help us if we want to get data back from _all_ the promises regardless of fulfillment/rejection. It doesn't even wait for the remaining promises to resolve once one fails. Instead, what we need is [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled) (introduced in ES2020).

**`Promise.allSettled` returns a `Promise` object that resolves after _all_ of the promises in the array have either fulfilled or rejected.** The resulting promise resolves with an array of objects that each describe the outcome of their original promise.

```js
const run = async () => {
  const promise = Promise.allSettled([
    fetchJson('https://swapi.dev/api/people/'),
    // ❌ let's pretend this one fails 👇🏾
    fetchJson('https://stats.nba.com/stats/playerindex'),
    fetchJson('https://api.github.com/users/benmvp/repos'),
  ])

  const [
    starWarsPeopleOutcome,
    nbaPlayersOutcome,
    myRepositoriesOutcome,
  ] = await promise

  // starWarsPeopleOutcome: { status: 'fulfilled', value: { ... } }
  // nbaPlayersOutcome: { status: 'rejected', reason: Error(...) }
  // myRepositoriesOutcome: { status: 'fulfilled', value: { ... } }
}
```

**With `Promise.allSettled` we always get a resolved promise with an array of outcomes.** This means that it waits until all promises have fulfilled or rejected. It doesn't fail fast. We have to inspect the `status` property of the outcomes to see whether or not the promise fulfilled with a `value` or rejected with a `reason` (usually an `Error` object).

**Therefore, if the asynchronous tasks are truly independent of each other, we should use `Promise.allSettled`. That way we can always get their results. However, if one of the asynchronous tasks failing means that we shouldn't continue, we should use `Promise.all`.**

---

## `Promise.any`

As I mentioned, ES2021 introduced [`Promise.any`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any). Like `Promise.all` and `Promise.allSettled`, it too takes an array of `Promise` objects and processes them in parallel. **The difference is that as soon as _one_ of the promises fulfills, `Promise.any` returns a promise that resolves with the value from that first fulfilled promise.**

```js
const run = async () => {
  const promise = Promise.any([
    // ❌ fails, not in memory 👇🏾
    fetchFromCache('headshot.jpg'),
    fetchFromDisk('headshot.jpg'),
    fetchFromCloud('headshot.jpg'),
  ])

  // 👇🏾 first fetch to return w/ the image
  const headshot = await promise
}
```

All 3 fetches to the potential data sources for the headshot image happen in parallel. It's likely that fetching from the in-memory cache is the fastest. However, since it's not in memory, `fetchFromCache` will fail and return a rejected `Promise`. **But `Promise.any` keeps waiting to see if the other asynchronous tasks will fulfill.** Whichever one fulfills first (fetch from the hard disk or fetch from the cloud), that's that value included in the `promise` variable. And when we resolve `promise` with the `await` operator, we get the image.

It is possible, though, that all the asynchronous tasks fail.

```js
const run = async () => {
  const promise = Promise.any([
    // ❌ fails, not in memory
    fetchFromCache('headshot.jpg'),
    // ❌ fails, not on hard disk
    fetchFromDisk('headshot.jpg'),
    // ❌ fails, hasn't been saved to the cloud
    fetchFromCloud('headshot.jpg'),
  ])

  try {
    const headshot = await promise
  } catch (err) {
    console.error('No image was found')
    // 👇🏾 an array of rejection values,
    // 👇🏾 1 for each rejected promise
    console.error(err.errors)
  }
}
```

In the case that _all_ the promises fail, `Promise.any` returns a promise that rejects with an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) object. It has a special `errors` property containing the rejection values (typically `Error` objects) for each original rejected promise.

---

## `Promise.race`

Most of the time, `Promise.any` is what we want when we just need one of the asynchronous tasks to succeed. However, the original ES2015 spec also included [`Promise.race`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race) which is similar to the `Promise.any`, but slightly different. **`Promise.race` returns a promise that fulfills or rejects as soon as one of the promises in the array of promises fulfills or rejects.**

```js
const run = async () => {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Async action took longer than 3 seconds`))
    }, 3000)
  })

  const promise = Promise.race([
    fetchJson('https://api.github.com/users/benmvp/repos'),
    timeoutPromise,
  ])

  try {
    const repos = await promise
  } catch (err) {
    console.error('Fetch timed out')
    console.error(err.message)
  }
}
```

In this example, we pass 2 promises to `Promise.race`. The first promise is a fetch request for a list of Github repositories. The second is a promise that will reject after 3 seconds. They are run in parallel.

**If the fetch request fulfills _before_ 3 seconds, it resolves first so `Promise.race` returns a promise with the data.** We resolve it using the `await` operator and we've got the data. However, if the request takes longer than 3 seconds, the `timeoutPromise` will reject first. So `Promise.race` will return a promise that rejects with the reason (typically an `Error` object).

This code is essentially an "async with timeout" operation. In over 6 years it's still the only real-world use case I've found for `Promise.race`. And it doesn't even cancel the long-running async task. It keeps running. Our code just stops waiting for it.

I dive deeper and how we can create an abstraction around it in my [Quickie fetch timeout](https://www.benmvp.com/blog/quickie-fetch-timeout/) post. **So when we want to get back the result of the first promise that settles no matter if it's a fulfillment or rejection, we use `Promise.race`. But if we want we really want is the first promise that fulfills, we use the new `Promise.any`.**

---

## `Promise.resolve` / `Promise.reject`

[`Promise.resolve`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) and [`Promise.reject`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) (both included in the original ES2015 spec) are different than the previous 4 methods that took an array / iterable of promises. **`Promise.resolve` creates a resolved promise with a specified value. While `Promise.reject` creates a rejected promise with the specified reason (ideally an `Error` object).**

```js
const run = async () => {
  const promise = Promise.allSettled([
    Promise.resolve('Star wars people!'),
    Promise.reject(new Error('No NBA players')),
    Promise.resolve('All the Github repos'),
  ])

  const [
    starWarsPeopleOutcome,
    nbaPlayersOutcome,
    myRepositoriesOutcome,
  ] = await promise

  // starWarsPeopleOutcome: {
  //   status: 'fulfilled',
  //   value: 'Star wars people!'
  // }
  // nbaPlayersOutcome: {
  //   status: 'rejected',
  //   reason: Error('No NBA players'),
  // }
  // myRepositoriesOutcome: {
  //   status: 'fulfilled',
  //   value: 'All the Github repos',
  // }
}
```

These days I don't use `Promise.resolve` or `Promise.reject` in source code. When I do use them it's for quickly creating resolved/rejected promises for testing or debugging code (like figuring out how `Promise.allSettled` works).

```js
const fetchRepos = (userName) => {
  if (!userName) {
    // in order for the function to always return a Promise
    // we return a resolved promise with an empty array
    return Promise.resolve([])
  }

  return fetchJson(`https://api.github.com/users/${userName}/repos`)
}
```

However, before [async functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), I would sometimes use `Promise.resolve` or `Promise.reject` in a function like this example. Normally it returns the promise from the call to a function that returns a promise (`fetchJson` in this case). But since I want the function to always return a promise, I still need to return a `Promise` object for the edge cases that aren't actually asynchronous.

**This is no longer necessary with `async`/`await` because async functions always return a `Promise` object no matter what's actually returned by the function itself.**

---

Hopefully that clears up the use of these 6 static methods of the `Promise` API, particularly the first 4. I'm hoping that you'll now have more use areas where you can simplify your code by using these methods. In my opinion, `Promise.allSettled` and `Promise.any`, the two newest ones, are likely the most useful.

I'm curious if you have different real-world use cases for `Promise.race` or `Promise.resolve`/`Promise.reject`. I'd love to hear about them! It'll likely make teaching them easier for me. Please reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
