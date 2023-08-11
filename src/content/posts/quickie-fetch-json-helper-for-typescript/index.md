---
date: 2020-12-06
title: Quickie fetch JSON helper for TypeScript
shortDescription: How to avoid receiving the TypeScript any type from the Fetch API when retrieving JSON data
category: TypeScript
tags: [fetch, type-assertion, fetch-api, json]
hero: ./dog-fetch-k-mitch-hodge-kqPlrOrir5g-unsplash.jpg
heroAlt: Dog fetching a huge stick
heroCredit: 'Photo by [K. Mitch Hodge](https://unsplash.com/@kmitchhodge)'
---

At work and for my personal projects I use the native browser [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) for making HTTP requests. It's pretty rudimentary, but I haven't yet felt the need to reach for a fetching library like [`axios`](https://github.com/axios/axios) or others. However from what I've seen, `axios` with TypeScript provides a type definition that I really like. It's the ability to assert the type of the response data instead of just getting back `any`.

So with `window.fetch` this would look something like:

```typescript
interface ResponseData {
  data: {
    id: number
    abbreviation: string
    city: string
    conference: string
    division: string
    full_name: string
    name: string
  }[]
  meta: {
    total_pages: number
    current_page: number
    next_page: number | null
    per_page: number
    total_count: number
  }
}

window
  // highlight-next-line
  .fetch<ResponseData>('https://www.balldontlie.io/api/v1/teams')
  .then((resp) => resp.json())
  .then((respData) => {
    // here `respData` is of type `ResponseData`

    const bestTeam = respData.data.find((team) => team.name === 'Rockets')

    // ...
  })
```

For whatever reason, **the type of `window.fetch` isn't generic so this isn't possible.** 😢 However, we can create a lightweight wrapper around `window.fetch` to serve our needs:

```typescript
type FetchParams = Parameters<typeof window.fetch>

const fetchJson = <T>(...params: FetchParams): Promise<T> => {
  return window.fetch(...params).then((resp) => resp.json() as Promise<T>)
}

fetchJson<ResponseData>('https://www.balldontlie.io/api/v1/teams').then(
  (respData) => {
    // here `respData` is of type `ResponseData`

    const bestTeam = respData.data.find((team) => team.name === 'Rockets')

    // ...
  },
)
```

Pretty sweet huh? 🎉 Let's break this down line by line.

```typescript
// highlight-next-line
type FetchParams = Parameters<typeof window.fetch>

// type FetchParams = [
//   input: RequestInfo,
//   init?: RequestInit | undefined
// ]
```

Using the [`Parameters<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) generic utility type, we grab the two parameters of `window.fetch` as a 2-element array/tuple type. Notice that the second element, `init`, is optional.

```typescript
// highlight-next-line
const fetchJson = <T>(...params: FetchParams): Promise<T> => {
  return window.fetch(...params).then((resp) => resp.json() as Promise<T>)
}
```

We then define `fetchJson` as a generic function that will accept the exact same parameters as `window.fetch` (`FetchParams`). **So it will look exactly like `window.fetch` except it will return a `Promise` of the expected return data type instead of `any`.** This works because using the rest operator makes `...params` an array [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters). And because `FetchParams` is an array type, the types match.

```typescript
const fetchJson = <T>(...params: FetchParams): Promise<T> => {
  // highlight-next-line
  return window.fetch(...params).then((resp) => resp.json() as Promise<T>)
}
```

Using the [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (which looks identical to the rest parameter 😅), we're able to pass all of the parameters as arguments to the actual `window.fetch` call. Our `fetchJson` wrapper is basically a pass through.

The helper also does the work of transforming the response to JSON. **This is where we assert that the return value of `resp.json()` is a `Promise<T>`** (the response data type we're expecting). In TypeScript, when using `window.fetch` directly we always have to make this sort of type assertion to our expected data type.

The `fetchJson` call does exactly what the name implies; it fetches JSON data. That's why it can do the `resp.json()` transformation on our behalf. We could have a wrapper that just returned `resp`, yet when we called `resp.json()` ourselves the type was `T`. But that would require more type sophistication that I don't want to get into. Maybe later. 😄

```typescript
// highlight-next-line
fetchJson<ResponseData>('https://www.balldontlie.io/api/v1/teams').then(
  (respData) => {
    // here `respData` is of type `ResponseData`

    const bestTeam = respData.data.find((team) => team.name === 'Rockets')

    // ...
  },
)
```

Finally, this all works based on how `fetchJson` is called. We specify the expected return data type (`ResponseData`) in the call to `fetchJson`. It becomes the generic `T` type that we use in the type assertion.

Without the `fetchJson` wrapper the code would probably look like:

```typescript
window
  .fetch('https://www.balldontlie.io/api/v1/teams')
  .then((resp) => resp.json() as Promise<ResponseData>)
  .then((respData) => {
    // here `respData` is of type `ResponseData`

    const bestTeam = respData.data.find((team) => team.name === 'Rockets')

    // ...
  })
```

So on the surface this doesn't buy us all that much. Having to write `as Promise<ResponseData>` isn't the end of the world. But having the `fetchJson` helper doesn't have to be all about TypeScript. It can also abstract other code for us, like error code handling or passing common configuration.

Then, of course, the code becomes more involved:

```typescript
type FetchParams = Parameters<typeof window.fetch>
type FetchInput = FetchParams[0]
type FetchInit = FetchParams[1]

const fetchJson = <T>(input: FetchInput, init: FetchInit = {}): Promise<T> => {
  return window
    .fetch(input, {
      ...init,
      // ensure cookies are always passed
      credentials: 'same-origin',

      headers: {
        ...init.headers,

        // always include this header
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => {
      // Throw error for error status codes (400+)
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp
    })
    .then((resp) => resp.json() as Promise<T>)
}
```

Is this something that you're already doing in your apps? Is it something that you want to add? Or are you using something like `axios`? I would love to know! Let's continue the conversation on Twitter. Shoot me a tweet at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
