---
date: 2021-01-10
title: When to use TypeScript unknown vs any
shortDescription: How the unknown type in TypeScript helps avoid using the any type for variables we don't know the type of
category: typescript
tags: [types, unknown, any, typeSafety, typeChecking]
hero: ./fork-in-the-road-jens-lelie-u0vgcIOQG08-unsplash.jpg
heroAlt: Fork in the road in the forest
heroCredit: 'Photo by [Jens Lelie](https://unsplash.com/@leliejens)'
---

I try to be as strict as possible when I use TypeScript. I always turn on the [`strict` option](https://www.typescriptlang.org/tsconfig#strict) in my `tsconfig.json` file to receive stronger guarantees of program correctness. When I'm migrating an app over to TypeScript, I will enable the [`allowJS` option](https://www.typescriptlang.org/tsconfig#allowJs), but within a given file I'm all-TS or nothing.

In my opinion, **there's no point of opting in to the extra work of type-checking if I'm not going to be strict about it**. Others feel differently about it, which is perfectly fine, but this is how I roll. 😎 I also enable a bunch of ESLint rules for TypeScript using the [`@typescript-eslint/eslint-plugin`](https://github.com/typescript-eslint/typescript-eslint), particularly the [`typescript-eslint/no-explicit-any`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md) rule that warns when the [`any`](https://www.typescriptlang.org/docs/handbook/basic-types.html#any) type is explicitly used.

But **there are legitimate situations where we don't know the type of a value being passed into a function**. Usually it's some pass-through interface that takes arbitrary data, but there are other use cases as well. In these situations, we can use the TypeScript [`unknown`](https://www.typescriptlang.org/docs/handbook/basic-types.html#unknown) type.

```typescript
const postJSON = (
  url: string,
  // highlight-next-line
  data: unknown,
  options: PostOptions = {},
): Promise<Response> => {
  return window.fetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // highlight-next-line
    body: JSON.stringify(data),
  })
}
```

Before I knew about `unknown`, I would reluctantly use the catch-all `any` type (and disable `no-explicit-any` for that line 😔). But with the `unknown` type, we can pretty much avoid all cases where we use to reach for `any`. Both `unknown` and `any` are used when we don't know the type of a value, but they have technical and semantic differences.

**With an `unknown` type we cannot reassign it to a different type, manipulate it, or pass it to another function that has a specified type:**

```typescript
const numberData: number = unknownData
// ❌ Type 'unknown' is not assignable
// to type 'number'.

const stringData = unknownData.toString()
// ❌ Object is of type 'unknown'.

const dataKeys = Object.keys(unknownData)
// ❌ Argument of type 'unknown' is not
// assignable to parameter of type 'object'.

const dataBool = unknownData as boolean
// ⚠️ Type assertions workaround typing
// but could result in runtime issues
```

> The reason why we were able to pass `data` to [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) is because the type of the value it accepts is actually `any`. An `unknown` value can be passed to an `any` type.

However, if we use type narrowing, like doing `typeof`/`instanceof` checks, comparison checks, or [user-defined type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards), then we can assign an `unknown` type to a specific type.

```typescript
// typeof check
if (unknownData && typeof unknownData === 'object') {
  // ✅ TS knows `data` is an `object`
  // type now
  const dataKeys = Object.keys(unknownData)
}

// comparison check
if (unknownData === 'Rockets') {
  // ✅ TS knows `data` is a `string`
  // type now
  const firstChar = unknownData.charAt(0)
}

// user-defined type guard
const isProduct = (item: unknown): item is Product => {
  // ✅ Although we use type assertion, we are
  // doing validation first
  return !!(item as Product)?.id
}
```

> User-defined type guards are a topic in and of themselves, which I don't want to dive into right now. But if you're interested in how they can be applied, check out my post [Filtering undefined elements from an array in TypeScript](/blog/filtering-undefined-elements-from-array-typescript/).

The `any` type on the other hand allows us to do anything with a value including access arbitrary properties, even ones that don't exist. We're basically reverting back to plain ol' JavaScript at this point.

```typescript
const numberData: number = anyData
// 😨 No error

const stringData = anyData.toString()
// 😨 No error calling `.toString()`

const dataKeys = Object.keys(anyData)
// 😨 No error, let's hope `anyData`
// is an `object`
```

The `any` type is definitely the easier type to deal with because we get back to the flexibility of "we know what we're doing" JavaScript. But like I said in the beginning, I try to avoid being in that world when writing TypeScript because what's the point?

Outside of the technical differences between `unknown` and `any`, to me there are also some semantic differences as well. Let's revisit the `postJSON` example from the beginning:

```typescript
const postJSON = (
  url: string,
  // highlight-next-line
  data: unknown,
  options: PostOptions = {},
): Promise<Response> => {
  return window.fetch(url, {
    ...options,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    // highlight-next-line
    body: JSON.stringify(data),
  })
}
```

If we swapped out `unknown` for `any` as the type for `data`, it won't make any technical difference from a type safety standpoint. All we're doing is calling `JSON.stringify()` on the value, and `JSON.stringify()` accepts an `any` value.

But when I'm reading code that uses `unknown`, it says to me "I don't know the type of this value and it doesn't even matter because it's just a middleman." It's a very intentional type, just like picking `string`, `number` or a custom interface.

Whereas to me, seeing the `any` type signals either an inability to figure out the type or figuring out the type would require an unnecessary amount of effort. Using `any` is sometimes unavoidable though. I try not to be dogmatic. But more times that not I've found that **when my code is hard to type, it's because it's unnecessarily complex**. Simplifying it so that TypeScript can understand has the added benefit of simplifying it so that my coworkers (including future me) can understand it as well.

---

TypeScript [generics](https://www.typescriptlang.org/docs/handbook/generics.html) are also a better alternative to `any` when we don't exactly know the type of a function argument, but for slightly different use cases. I also don't have time to dive into generics. But all this talk of `unknown` and user-defied type guards has made me wonder if I can combine them for a more type-safe version of my `fetchJSON` generic function described in [Quickie fetch JSON helper for TypeScript](/blog/quickie-fetch-json-helper-for-typescript/). Maybe that can be a future post. 😉

Keep learning my friends. 🤓
