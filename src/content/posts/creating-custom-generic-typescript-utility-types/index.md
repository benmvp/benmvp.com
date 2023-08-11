---
date: 2021-12-21
title: Creating custom generic TypeScript utility types
shortDescription: How to create complex conditional generic type expressions in TypeScript that can even be recursive
category: TypeScript
tags: [typescript, generics, conditional, recursion, expressions]
hero: ./tool-bench-tom-conway-0dtQVPebr0Q-unsplash.jpeg
heroAlt: Work bench with bicycle tools and other parts
heroCredit: 'Photo by [Tom Conway](https://unsplash.com/@tecreate)'
---

I was recently working on my latest project, which uses [Firestore](https://firebase.google.com/) as its NoSQL database. The way the data is stored in Firestore is _almost_ how I represent the data in app. The only difference is that Firestore has its own object for modeling dates that is different than the JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object. So in order to avoid having to write almost identical types for both the internal and Firestore representations of an object (and keep them in sync over time), I created a generic TypeScript utility type that would recursively replace all `Date` types to Firebase [`Timestamp`](https://github.com/firebase/firebase-js-sdk/blob/2e7586dd7320d48d4b58aa13b525ec4a599f87e2/packages/firestore/src/lite-api/timestamp.ts) types in any type whether it's an interface, array or something else.

```typescript
// A generic type that returns a new type by returning a
// `Timestamp` if the generic parameter is a `Date`.
// Or, if given an array type, it returns the same
// array type except replacing the item `Date` types w/
// `Timestamp` types. Does the same for object value
// types as well. Otherwise, just returns the type back.
type ToFirestore<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : MaybeDate extends Array<infer Item>
  ? Array<ToFirestore<Item>>
  : MaybeDate extends Record<string, any>
  ? { [Key in keyof MaybeDate]: ToFirestore<MaybeDate[Key]> }
  : MaybeDate
```

> See the code in action on the [TS Playground](https://www.typescriptlang.org/play?#code/PTAEFkHsGMGtQE4FMAOyDOSB2AXAhjgJaRaiQBmoeoAYoRjpMqAAYAqhAtkuvpyi1A4AniiQAoQriQJyeaElAduvPP1ABvcaB2IkeACYkANsNCZoJA+gBcoLAFdOAIxkAabbuSGTZrHixICytbeydXBHEAX3FxEFAAQVAAc2wZQmghUUUcAAsCPRwHBCx0KnskAHcssVBnM2Qikqlkqjiwdi4ePgFQQko8xVSsdMyUPAQ1JBwZPrLqFgARAiQWADp20AB5BDc+ymTCADdsKlIJybMRMT3CHELi0qFcxXQpzYu8K+zQJAAPBQoe7IFDGeQtZ6KO5ITisZYzQTXHigSrATadFQ9RHZdBrUCLSDIwbmKagchMMjOABWSGg9yOeGMDgk8SR8zKlSQxmMeK2gwQlUImD2VIcvAeJTKxKRdXksA2MrYkDoDCYSAAPOAvq54UgAHygAC8EG1SF1vz+Myw1nxK08AH4lF1VPxPHYtcIdSsLVabQkEJd1VJyLMAJIzTh6h2JANfdVKlXdNXq8MwvVRnTu03m-6+soAJVpTAM6t4CBaewCwgzoEdGlAAG0ANJIMxSUCwVsUE2es0rAC6dgT9CTyE12ZWzdb-YNMUzPa9M1iUhmsnkigACmDSFodJZuXhnEwCExQmWWg3+55oN4ZgY7LrPAYudMkAZ7Q+7TpCPfzDhy1gySeNwjKhLuuigAYKyfkuEHIOQdjnoBng6EidgAOTON4sByLw6GgAAPqAmEIA4WDQLk+FEehTLkZRhHEQYUgjAgVHEeg-hwOhnhRJeniqEUoToWx6FoFwEzCCJEwUccb7cTonCQEx5CEG+MESDo-jcIh-4tJ4kCVCxOkAUBOhHEKhDOIQxh3MIGFiQyMwiTZWCwAAtL4IkoA4zg2dA3ExJsAASkAnAgZBhawia8GqW4BIikDmEgUI4GUz4qVgdzEKQgp5OiyjdGovRsn0pCguuZCUEsKzYmI6DiDK0WMMgcWkMaw6qmOrVRg1PxIkk7XKiOMVjkhyRRjKSIAEJGkoQ2dRqjguDIl4TX12QAMKzR1o4avWWlIMZFZUKkdhLREoBRFGQA).

This post is the third post in a series on TypeScript generics. The first post introduced generics by [re-implementing lodash functions](/blog/understanding-typescript-generics-lodash-functions/). In the second post, we [learned TypeScript generics by rebuilding existing utility types](/blog/learn-typescript-generics-rebuilding-existing-utility-types/). Now in this final post we're creating our own custom generic utility types using everything we've learned.

---

**`ToFirestore<>` is a recursive conditional generic type expression.** 😅 To make things even more complex, it has 3 levels of conditional nesting so that it can all be a single expression. Its goal is to take a type and convert any `Date` types to `Timestamp` types. So if the generic parameter is a `Date` type itself, return a `Timestamp` type instead. If it's an array type, turn any `Date` array element types to `Timestamp` array element types. If it's an object type, convert any `Date` property value types to `Timestamp` property value types. And if it's none of the above, just return the type back because there's nothing to convert.

Let's break it down line by line.

```typescript
// When `MaybeDate` is a `Date` type, it returns a
// `Timestamp` instead
// highlight-range{1-2}
type ToFirestore<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : MaybeDate extends Array<infer Item>
  ? Array<ToFirestore<Item>>
  : MaybeDate extends Record<string, any>
  ? { [Key in keyof MaybeDate]: ToFirestore<MaybeDate[Key]> }
  : MaybeDate

type TypeA = ToFirestore<Date>
// ⮑ Timestamp

type TypeB = ToFirestore<Date | boolean>
// ⮑ Timestamp | boolean
```

`ToFirestore<>` takes a single type parameter, `MaybeDate`. **If `MaybeDate` is a `Date` type, then the "true" branch of the conditional returns a Firebase `Timestamp` type instead.** This is the base case of the recursive type and serves as the crux of the mapping of an object with `Date` types to an object of Firebase `Timestamp` types.

```typescript
// When the generic `MaybeDate` is an array, we convert all of
// the `Date` types in the array type to `Timestamp` types
// by recursively calling `ToFirestore<>` on the item types
// (the `infer` keyword creates a new generic type called
// `Item` which represents the type of the array items)
// highlight-range{3-4}
type ToFirestore<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : MaybeDate extends Array<infer Item>
  ? Array<ToFirestore<Item>>
  : MaybeDate extends Record<string, any>
  ? { [Key in keyof MaybeDate]: ToFirestore<MaybeDate[Key]> }
  : MaybeDate

type TypeA = ToFirestore<Date[]>
// ⮑ Timestamp[]

type TypeB = ToFirestore<(Date | string)[]>
// ⮑ (Timestamp | string)[]

type typeC = ToFirestore<number[]>
// ⮑ number[]
```

Now, we're in the "false" branch of the outermost conditional, which in fact starts a new, nested generic conditional type. It looks like our typical conditional, except for the [`infer`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) keyword. **Not only are we testing to see if `MaybeDate` is an `Array<>` type, but if it is, we also get a new generic type (called `Item` here) that we can use in the nested "true" branch.** `Item` is the type of the array items.

The "true" branch of the nested conditional converts the array item types to `Timestamp` types if the array item types are `Date` types (or include `Date` types in a union). **We make use of the auto-created `Item` generic from the `infer` keyword to recursively pass the array item type to a recursive call `ToFirestore<>`.** So `ToFirstore<Date[]>`, returns `Timestamp[]`. But also, if we pass an array of types that union with a `Date` (such as a `ToFirestore<(Date | string)[]>`), we'll get back an array with a union of types as well, except the `Date` has been replaced by `Timestamp`.

> `ToFirestore<>` is recursive because it calls itself. It allows us to take a type with an arbitrarily deep structure, and convert all the `Date` types to `Timestamp` types.

But let's continue on to the nested "false" branch that now starts yet another nested conditional (we're on our third one now 😅).

```typescript
// If the generic `MaybeDate` is not a `Date` nor array type,
// check if it's an object type by seeing if it extends
// `Record<string, any>`. And if so, create a new object type
// with the same keys, converting any `Date` value types to
// `Timestamp` value types by recursively calling `ToFirestore<>`
// on the value types
// highlight-range{5-6}
type ToFirestore<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : MaybeDate extends Array<infer Item>
  ? Array<ToFirestore<Item>>
  : MaybeDate extends Record<string, any>
  ? { [Key in keyof MaybeDate]: ToFirestore<MaybeDate[Key]> }
  : MaybeDate

type TypeA = ToFirestore<{ name: string; birthDate: Date }>
// ⮑ { name: string, birthDate: Timestamp }

type TypeB = ToFirestore<{ id: number; created: Date; dates: Date[] }>
// ⮑ { id: number, created: Timestamp, dates: Timestamp[] }

type TypeC = ToFirestore<{ from: Date; to: Date }[]>
// ⮑ { from: Timestamp, to: Timestamp }[]

type TypeD = ToFirestore<{
  name: string
  players: { fullName: string; birthDate: Date }[]
}>
// ⮑ {
//  name: string,
//  players: { fullName: string, birthDate: Timestamp }[]
// }

type typeE = ToFirestore<{ name: string; age: number }>
// ⮑ { name: string, age: number }
```

If the `MaybeDate` is not a `Date` nor an array, we next want to see if it's an object type instead. We do that using another conditional to see if the `MaybeDate` extends `Record<string, any>`, a base object literal type. **The "true" branch of the doubly nested conditional takes an object type and using [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) converts it to a new object type with the same key types.** Using `ToFirestore<>`, any `Date` type values are mapped to `Timestamp` types while other types are left the same.

> Again, `ToFirestore<>` is a recursive conditional generic type because it calls itself on every object value type of `MaybeDate`.

```typescript
// If we have neither a `Date`, nor array nor object, just
// return back the same type because there's no transformation
// to be done
// highlight-range{7}
type ToFirestore<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : MaybeDate extends Array<infer Item>
  ? Array<ToFirestore<Item>>
  : MaybeDate extends Record<string, any>
  ? { [Key in keyof MaybeDate]: ToFirestore<MaybeDate[Key]> }
  : MaybeDate

type typeA = ToFirestore<string>
// ⮑ string
```

Finally, if we don't have a `Date` nor an array nor an object, we simply return the type back. **This is the termination condition of our recursive type.** This is how if we do `ToFirestore<string[]>` we get back `string[]`. It falls into the case where it does `Array<ToFirestore<string>>`. But since `ToFirestore<string>` becomes `string`, the result is `Array<string>` (or `string[]`).

---

The final solution was pretty fun to put together. And it took lots of refactoring to get it down to the single type expression (and not generate an endless recursive type). I like it because it has so many TypeScript type features all rolled in one. Not only is it a type expression, but it's a _generic_ type expression because it defines its own parameter, `MaybeDate`. It's also a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) and makes use of [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) & [`infer`](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types). And to top it all off it's a recursive type. 🤯

If you've got any follow-up questions about how all of this generic type stuff works in TypeScript or got other feedback you would like to share, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
