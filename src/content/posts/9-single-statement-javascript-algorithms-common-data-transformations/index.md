---
date: 2021-04-04
title: 9 single-statement JS algorithms for common data transformations
shortDescription: Reducing our reliance on Lodash by leveraging ESNext APIs to transform objects and arrays
category: JavaScript
tags: [lodash, algorithms, objects, arrays]
hero: ./heart-1s-0s-alexander-sinn-KgLtFCgfC28-unsplash.jpg
heroAlt: 1s and 0s with a red heart
heroCredit: 'Photo by [Alexander Sinn](https://unsplash.com/@swimstaralex)'
---

Last month I wrote a post on a [shorthand for converting a JavaScript array into an object lookup](/blog/create-object-lookup-array-javascript-objects/). I was able to write the code in a single statement:

```js
const teamLookup = Object.fromEntries(teams.map((team) => [team.id, team]))
```

This exercise motivated me to investigate more single-statement data transformations we can use to limit our reliance on [Lodash](https://lodash.com/) (and [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)). And now I'm posting about it. 😄

So here are the "rules":

1. No using Lodash (kinda the whole point)
1. No `.reduce()`. Pretty much any array or object can be transformed to another array or object within a `.reduce()` so that's no fun 😅
1. Skipping the "obvious" new ES.next functionality (like [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_object_literals), etc)
1. No data mutations; the transformation has to generate a new object (this is necessary for [React](https://reactjs.org/) and [reducers](https://reactjs.org/docs/hooks-reference.html#usereducer))

Now that we've gotten that out of the way let's look at our transformations.

---

## 1. Delete an item from an array

JavaScript provides [`.splice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) for removing elements from an array, but it happens in place. It mutates the array, which breaks one of our rules. But we can use [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) instead!

```js
const newPlayers = players.filter((player) => player.id !== ID_TO_DELETE)
```

By using `.filter()` to select all the players that **do not** have the `ID_TO_DELETE`, we delete the player with that `id` while simultaneously constructing a new array. This is probably one of my most favorite JavaScript "algorithms." I use it all the time.

---

## 2. Replace an item at an array index

To replace an item at an index in an array, we would normally assign the value.

```js
players[indexToReplace] = newPlayer
```

But that, of course, mutates the array. And so does `.splice()`. Instead we can use [array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#spread_in_array_literals) with [`.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice).

```js
const newPlayers = [
  ...players.slice(0, INDEX_TO_REPLACE),
  newPlayer,
  ...players.slice(INDEX_TO_REPLACE + 1),
]
```

We take slices of the array before and after the target `INDEX_TO_REPLACE`. Using array spread we concatenate these slices around the `newPlayer` we want to add. This results in a new array with just our target index replaced. This does create 2 intermediary array slices. So if your array is sufficiently large this _could_ be a performance hit.

---

## 3. Create an empty array of X items

The [`_.times()`](https://lodash.com/docs/4.17.15#times) Lodash utility function is super helpful for quickly initializing an array of a specific length with values.

```js
_.times(5)
// => [0, 1, 2, 3, 4]

_.times(5, () => '')
// => ['', '', '', '', '']

_.times(5, (index) => index * 2)
// => [0, 2, 4, 6, 8]
```

Since using Lodash of course breaks one of our rules, we can use [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) to accomplish the same thing.

```js
Array.from({ length: 5 }, (_, index) => index)
// => [0, 1, 2, 3, 4]

Array.from({ length: 5 }, () => '')
// => ['', '', '', '', '']

Array.from({ length: 5 }, (_, index) => index * 2)
// => [0, 2, 4, 6, 8]

Array.from({ length: 5 })
// => [undefined, undefined, undefined, undefined, undefined]
```

This looks like we're breaking another one of our rules because we're just using `Array.from` (added in ES2015). But I'm allowing it because of the `{ length: 5}` trick. `Array.from` accepts any _array-like_ object, which is an object with a `length` property and indexed elements. Our `{length: 5}` object satisfies both requirements.

The second argument to `Array.from` is a `mapFn`. Since this `{length: 5}` trick creates an array with `undefined` values, the first argument in `mapFn` (the value) is useless. We only want the second argument (the `index`). We use the underscore (`_`) as a placeholder name for the function argument we do not need.

---

## 4. Map values of an object

## 5. Map keys of an object

The [`_.mapValues`](https://lodash.com/docs/4.17.15#mapValues) helper is another useful function from Lodash. It creates a new object with the same keys as the original, but with new mapped values. By combining [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries), [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), and [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), we can build this ourselves.

```js
const TEAMS = {
  ATL: {
    name: 'Atlanta Hawks',
    // more team data...
  },
  BOS: {
    name: 'Boston Celtics',
    // more team data...
  },
  // remaining 28 teams...
}

// add the ID to each team info
const transformedTeams = Object.fromEntries(
  Object.entries(TEAMS).map(([teamId, teamInfo]) => [
    teamId,
    { ...teamInfo, id: teamId },
  ]),
)
// {
//   ATL: { id: 'ATL', name: 'Atlanta Hawks ' },
//   BOS: { id: 'BOS', name: 'Boston Celtics' },
//   ...
// }
```

Let's break it down real quickly. First, `Object.entries` converts the object to an array of `[teamId, teamInfo]` pairs (called entries). Then we map over the array of pairs to return a new array of pairs. By the way, we also use [array destructuring](/blog/learning-es6-destructuring/) to create the `teamId` and `teamInfo` function arguments. The `teamId` remains the first item in the pair, but now the second item is the `teamInfo` with the `teamId` merged in. Lastly, `Object.fromEntries` transforms our array of `[key, value]` pairs into our resultant object.

This same algorithm can be used to replicate [`_.mapKeys`](https://lodash.com/docs/4.17.15#mapKeys) as well. Instead of changing the 2nd item in the `[key, value]` pair, we change the first (the `key`). In fact, there's nothing stopping us from changing _both_ items in the `[key, value]` pair!

Again, there are a number of intermediary arrays that get created in this transformation. But if your object isn't huge, it should be fine.

---

## 6. Create an array of unique values

## 7. Create a union of arrays

We can create a duplication-free version of an array using the combination of the [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) object and array spread. No more need for [`_.uniq`](https://lodash.com/docs/4.17.15#uniq)!

```js
const AGES = [24, 64, 24, 42, 23, 55, 12, 42, 37, 35]

const uniqueAges = [...new Set(AGES)]
// => [24, 64, 42, 23, 55, 12, 37, 35]
```

Converting the `AGES` array into a `Set` object strips out all duplicates because a `Set` can only store unique values. We then convert the `Set` back into an array by spreading it (using `...`) into an array literal because it is a [built-in iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols).

A similar algorithm can be used to recreate [`_.union`](https://lodash.com/docs/4.17.15#union) which creates an array of unique values from multiple arrays.

```js
const GROUP_A = [24, 64, 24, 42, 23, 55, 12, 42, 37, 35]
const GROUP_B = [24, 55, 62, 23, 57, 472, 5, 48]

const allUniqueAges = [...new Set([...GROUP_A, ...GROUP_B])]
// => [24, 64, 42, 23, 55, 12, 37, 35, 62, 57, 472, 5, 48]
```

The difference is that we spread `GROUP_A` & `GROUP_B` together to create a single, concatenated array before constructing a `Set` object from it.

---

## 8. Pick from an object

## 9. Omit from an object

The [`_.pick`](https://lodash.com/docs/4.17.15#pick) and [`_.omit`](https://lodash.com/docs/4.17.15#omit) Lodash helpers frequently come in handy. They are opposites of each other. The `_.pick` function creates an object with just the specified keys **picked** from the original. While the `_.omit` function creates an object **omitting** the specified keys. We basically use the same algorithm as [mapping values of an object](#4-map-values-of-an-object), except we use `.filter()` (plus [`.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)) instead of `.map()`.

```js
const TEAMS = {
  ATL: 'Atlanta Hawks',
  BOS: 'Boston Celtics',
  BKN: 'Brooklyn Nets',
  CHI: 'Chicago Bulls',
  CLE: 'Cleveland Cavaliers',
  CHA: 'Charlotte Hornets',
  // ...other 24 teams
}
const IDS = ['ATL', 'CHI', 'CHA']

const PICKED_TEAMS = Object.fromEntries(
  Object.entries(TEAMS).filter(([teamId]) => IDS.includes(teamId)),
)
// {
// ATL: 'Atlanta Hawks',
// CHI: 'Chicago Bulls',
// CHA: 'Charlotte Hornets',
// }

const REMAINING_TEAMS = Object.fromEntries(
  Object.entries(TEAMS).filter(([teamId]) => !IDS.includes(teamId)),
)
// {
// BOS: 'Boston Celtics',
// BKN: 'Brooklyn Nets',
// CLE: 'Cleveland Cavaliers',
// ...other 24 teams
// }
```

The difference between `pick` vs `omit` is the negation (`!`) of `IDS.includes(teamId)` within `.filter()`. By filtering down the entries to only the teams listed (or not listed) in `IDS`, the object created by `Object.fromEntries` has (or excludes) the selected teams.

---

What do you think of these? I'm sure there are many more single-statement data transformers, but these are the ones I use frequently and find the most helpful. I would love to see what other ones you use, so feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
