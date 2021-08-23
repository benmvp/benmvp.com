---
date: 2021-08-22
title: Understanding TypeScript generics through lodash functions
shortDescription: Learning how to use TypeScript generics by re-implementing common functions from lodash
category: typescript
tags: [typescript, generics, lodash, arrays]
hero: ./generic-cleaning-bottle-crystal-de-passille-chabot-9gzU1mtTzWM-unsplash.jpeg
heroAlt: A generic window cleaning bottle with paper towel roll
heroCredit: 'Photo by [Crystal de Passillé-Chabot](https://unsplash.com/@cchabot)'
---

JavaScript is a highly dynamic language, so generics are instrumental in helping us to add types to make our code type safe with TypeScript. [TypeScript Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) are super powerful, but also can be pretty complicated. As a result, we find lots of blog posts, YouTube videos, workshops, and courses on how to use generics in TypeScript.

This post is a little different. I learn best by seeing real-world examples. Seeing something new in the context of something familiar helps my brain make the connections. So this post walks through how we can develop with TypeScript generics (something new) by re-implementing common lodash functions (something familiar). My hope is that these examples will help build and solidify your understanding of how to leverage generics in your TypeScript code.

Let's get started!

---

## `identity()`

First, let's learn how generics work by looking at a JavaScript function that simply returns the value you give it:

```javascript
const identity = (value) => value
```

This is called an identity utility function (`_.identity` in lodash). It's used as the default callback function in many of the lodash functions. It takes _any_ type of value and returns back that value. So if we pass in a `string` value, we get back that same `string` value. Or if we pass in some object type, we get back that same object of the same type.

So how do we use TypeScript to type it? Well since it takes in any value, our first thought may be to use the [`any`](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#any) type.

```typescript
// ❌ This is not what we want!
const identity = (value: any): any => value

const origName = 'Ben'
const newName = identity(origName)
// `newName` has a type of `any` not `string`

// TypeScript won't complain that we're trying
// to call `.push()` on a `string` because the
// type is `any`. It lets us do whatever we want!
newName.push('MVP')
```

We've added types to appease TypeScript, **but this is no more type safe than regular JavaScript**. The value we get back is also `any`. So if we pass in a `string` value, we'll still get an `any` type back. That's not what we want because we've lost type safety. But we cannot make `identity()` take a `string` and return a `string` because then it wouldn't work for `number` or `Array` or any other types.

Because we don't know the type of `value`, we may think to use the newer [`unknown`](https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown) type.

```typescript
// ❌ This is not what we want!
const identity = (value: unknown): unknown => value

const origName = 'Ben'
const newName = identity(origName)
// `newName` has a type of `unknown` not `string`

// This *should* work because we know `newName` is a
// string, but TypeScript fails type checking w/ error:
// "Object is of type 'unknown'."
console.log(newName.length)
```

Using `unknown` as the type of `value` makes sense because it truly is unknown. But it doesn't make sense as the return value. So now instead of going from `string` -> `any`, we've gone from `string` -> `unknown`. **The `unknown` type is safer than `any` because TypeScript doesn't allow us to do anything with an `unknown` value.** But now we'll have to use a [`typeof` type guard](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards) in order to check to see if `newName` is a `string`. That feels like extra unnecessary work.

So `any` and `unknown` don't work, and neither does picking a specific type. Well, what about using [function overloads](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads) to specify multiple type signatures?

```typescript
// ❌ Doesn't work completely!
function identity(value: string): string
function identity(value: number): number
function identity(value: boolean): boolean
function identity(value: any): any {
  return value
}

const origName = 'Ben'
const newName = identity(origName)
// `newName` has a type of `string` 🎉

const origNames = ['Ben', 'James', 'Leslie']
const newNames = identity(origNames)
// TypeScript fails type checking w/ error:
// "No overload matches this call."
```

> NOTE: I believe function overloads only work with function declarations (`function funcName() { }`), and not with function expressions (`const funcName = () => { }`).

So we _almost_ get there with function overloading. We can define an overload for `string`, `number`, and `boolean`. But what about arrays or other more complex objects? **We have to create an overload for potentially every single possible type used in our application** in order to get the correct return value. That's neither feasible nor maintainable.

This is where generics come in.

```typescript
const identity = <ValueType>(value: ValueType): ValueType => value

const origName = 'Ben'
const newName = identity(origName)
// `newName` has a type of `string` 🎉

const origNames = ['Ben', 'James', 'Leslie']
const newNames = identity(origNames)
// `newNames` has a type of `string[]` 🎉
```

The `<ValueType>` syntax is the generic. **It makes the function type flexible.** It says that `value` is a generic type. We're calling it `ValueType` here but it can be named anything. Unfortunately, it's very common to use single letter generic names like `T`. So now when we pass in `origName` (a `string`) to `identity()`, `ValueType` becomes a `string`. And because `identity()` also returns `ValueType`, it will return a `string` when it's passed a string. The same thing happens for `origNames` which is a `string[]`. We get back a `string[]` type as well. The same would apply for `number`, `boolean`, a complex object, even a function, or anything else. 🙌🏾

So now that we've learned the "why" of generics by looking at a rather simple function, let's see how generics apply to other lodash functions.

---

## `first()`

The `first()` function ([`_.head`](https://lodash.com/docs/4.17.15#head) in lodash) gets the first element of an array, if one exists.

```typescript
const first = <ItemType>(array: ItemType[]): ItemType | undefined => {
  // the return value is `undefined` if `array` is empty
  return array[0]
}

const firstName = first(['Ben', 'James', 'Leslie'])
// `firstName` is of type `string | undefined`

const firstScore = first([100, 47, 75, 98])
// `firstScore` is of type `number | undefined`

const firstPlayer = first([
  { name: 'LeBron James', team: 'Los Angeles Lakers' },
  { name: 'Kevin Durant', team: 'Brooklyn Nets' },
  { name: 'Giannis Antetokounmpo', team: 'Milwaukee Bucks' },
])
// `firstPlayer` is of type `{name: string, team: string} | undefined`

const mixedArray = [true, 'Ben', 87]
// `mixedArray` type is `(string | number | boolean)[]`
const firstItem = first(mixedArray)
// `firstItem` is of type `string | number | boolean | undefined`

const firstAnswer = first('yes')
// Error: Argument of type 'string' is not assignable to
// parameter of type 'unknown[]'.
```

> FYI: I'm intentionally simplifying the code by not allowing the `array` to be `null` or `undefined`.

`ItemType` is the generic type in `first()`. So the `array` parameter is an array of generic `ItemType` types. It must be an array, but it can be an array of anything. And `first()` returns a single `ItemType` (or `undefined`).

So `firstName` is a `string` (or `undefined`) because we called `first()` with an array of `string` types. Similarly, `firstScore` is a `number` (or `undefined`) because we called `first()` with an array of numbers. And just to prove that generics work with complex objects, `firstPlayer` is an object with `name` and `team` properties that are both strings because we called `first()` with an array of those types of objects.

But guess what? All of the array items don't have to be the same type. Because we called `first()` with an array of strings, booleans, and numbers, `firstItem` is either a `string`, `boolean` or `number` (or `undefined`).

Lastly, if we don't pass an array at all, TypeScript fails to type check the code. The `array` parameter is not _any_ generic type (like with `identity()`), it's specifically a generic array.

There's one thing to note. **Because we've defined `array` to be an array of generic types, we can make use of all of the array methods and properties** (indexing, `.length`, `.map()`, etc) within the implementation of `first()`. However, because `ItemType` is a generic, we cannot access any methods or properties of an individual item without using some sort of [type narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).

---

## `forEach()`

The `forEach()` function ([`_.forEach`](https://lodash.com/docs/4.17.15#forEach) in loadash) iterates over an array, calling the function for each array item.

```typescript
const forEach = <ItemType>(
  array: ItemType[],
  callback: (item: ItemType, index: number, array: ItemType[]) => void,
): void => {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array)
  }
}

forEach(['Ben', 'James', 'Leslie'], (name, index) => {
  // because we passed a `string[]`, TS knows that `name`
  // is a `string` because of the `ItemType` generic w/o
  // having to define its type
  console.log(name.toLocaleUpperCase(), index + 1)
})
// "BEN", 1
// "JAMES", 2
// "LESLIE", 3
```

Here `forEach()` works a bit differently. It still takes a similar `array` of generic `ItemType` values, but it doesn't return the type. It uses the `ItemType` in the definition of the `callback` function. That function will be called with 3 arguments: the first is a single `ItemType` (the array item), the second a `number` (the array item index), and the third a `ItemType[]` (the entire array).

Because of the association between the `array` and the `callback` function using the generic `ItemType`, **we don't even need to specify the type of `name` (or `index`) in our call of `forEach()`**. TypeScript can figure it all out through [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) (specifically [contextual typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing)).

---

## `map()`

The `map()` function ([`_.map`](https://lodash.com/docs/4.17.15#map) in lodash) creates a new array populated with the results of calling the function on every item in the array.

```typescript
const map = <ItemType, MappedItemType>(
  array: ItemType[],
  callback: (
    item: ItemType,
    index: number,
    array: ItemType[],
  ) => MappedItemType,
): MappedItemType[] => {
  const newArray: MappedItemType[] = []

  for (let i = 0; i < array.length; i++) {
    newArray.push(callback(array[i], i, array))
  }

  return newArray
}

const mappedNames = map(
  ['Ben', 'James', 'Leslie'],
  (name, index) => name.length,
)
// [3, 5, 6] (type `number[]`)
// TS sees that the return type from the `callback` is a `number`
// so it knows the return value from `map()` is a `number[]`
```

The `map()` function takes things one step further by introducing a second generic type. The type of the `array` is once again `ItemType[]` and the `callback` function takes the same 3 arguments as before. The difference here is that the `callback` function returns a value of a different type that we're calling the generic `MappedItemType`. And we then use `MappedItemType` as the return type of `map()` because we're return a `MappedItemType[]` (an array of `MappedItemType` items).

This is the real power of generics. **The `map()` function doesn't have to know the type of the `array` it receives, nor the type of the array it will return, yet it's fully type-safe.** Moreover, when we call `map()` we don't have to specify any types. Because we pass it a `string[]` it knows that now `ItemType` is a `string`. And because the `callback` function returns a `number`, TypeScript knows that `mappedNames` can only be a `number[]`.

---

## `reduce()`

The `reduce()` function ([`_.reduce`](https://lodash.com/docs/4.17.15#reduce) in lodash) runs a function (called a "reducer") on each element of the array, resulting in a single output value that can be a new array, an object, a number, etc.

```typescript
const reduce = <ItemType, ReducedType>(
  array: ItemType[],
  reducer: (
    accumulator: ReducedType,
    item: ItemType,
    index: number,
    array: ItemType[],
  ) => ReducedType,
  initialValue: ReducedType,
): ReducedType => {
  let reducedValue = initialValue

  for (let i = 0; i < array.length; i++) {
    reducedValue = reducer(reducedValue, array[i], i, array)
  }

  return reducedValue
}

const maxValue = reduce(
  [4, 582, 38, -472, 1, 20],
  (maxInProgress, value) => Math.max(maxInProgress, value),
  -Infinity,
)
// 582 (type `number`)
// The type returned from the `reducer` function has to match
// the type of the `initialValue`, which ultimately becomes
// the type of the return value from `reduce()`
```

> If you're still a bit shaky with how `reduce()` functions work in general, read [Learn the Array reduce method by re-implementing lodash functions](/blog/learn-array-reduce-method-reimplementing-lodash-functions/).

Things are getting pretty complex with `reduce()` now. We're using the `ItemType` and `ReducedType` generics all over the place. The `ItemType` generic is found in the usual spots: `ItemType[]` for the main `array` and the `array` within the `reducer` function as well as `ItemType` for the `item` within the `reducer` function.

The `ReducedType` is the type of the single value we ultimately receive from `reduce()`. It's also the type of the `initialValue` passed in. It's the type of the `reducer`'s first parameter (typically called the `accumulator`) as well as the `reducer`'s return value. **When we call `reduce()` the types in all 3 places have to match in order for our code to properly type check.**

Once again, TypeScript is able to figure everything when we call `reduce()` without us having to specify any types. The `reduce()` function is arguably the most power array utility function there is. We can go from an array of anything to a single value of a completely different type. The implementation is really tiny. And because of generics, the type definition is compact as well.

---

Hopefully that helped! It took me a long while to grasp generics. So even if you still don't feel 100% confident, that's okay. If you understand them just a little bit more I call it a win, and you should too. 😄 If you've got any questions (or comments) feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
