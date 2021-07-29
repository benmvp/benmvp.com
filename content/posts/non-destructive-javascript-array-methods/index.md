---
date: 2021-07-25
title: The non-destructive JavaScript array methods
shortDescription: A look at common, non-destructive operations using the JavaScript Array API
category: javascript
tags: [javascript, arrays, map, filter]
hero: ./volcano-eruption-jens-johnsson-n-6dDxFI7xc-unsplash.jpeg
heroAlt: Volcano eruption in Tongariro National Park, New Zealand
heroCredit: 'Photo by [Jens Johnsson](https://unsplash.com/@jens_johnsson)'
---

In my previous post, we took a deep dive into the [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method on the JavaScript Array API. This time I want to zoom out and take a look at all of the JavaScript array methods. Well, not all. I only want to focus on those methods that are non-destructive; those methods that don't change the array, but return something new.

With React as well as some state management solutions, [immutability](https://css-tricks.com/understanding-immutability-in-javascript/) is key. So mutating arrays, for instance, is a no-no. So now I've just gotten used to avoiding those methods that mutate the array when possible.

So let's take a look at the methods on the JavaScript Array API that are non-destructive. Hopefully, we can learn something new!

---

## `.map()`

The [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) method creates a new array populated with the results of calling the provided function on every element of the array.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const uppercaseNames = names.map((name) => name.toLocaleUpperCase())

console.log(uppercaseNames)
// ['AIDAN', 'BEN', 'DAVID', 'FARAZ', 'KYLE', 'JONATHAN', 'TYLER']
```

The `.map()` method can of course be used in far more sophisticated cases like mapping over strings to creates promises that are run in parallel.

```js
const urlsToFetch = [
  'https://swapi.dev/api/people/',
  'https://stats.nba.com/stats/playerindex',
  'https://api.github.com/users/benmvp/repos',
]
const fetchPromises = urlsToFetch.map((url) => fetchJson(url))

Promise.all(fetchPromises).then(
  ([starWarsPeople, nbaPlayers, myRepositories]) => {
    // Use fetched data
  },
)
```

Check out my past post on [Exploring the JavaScript Promise API methods](/blog/exploring-javascript-promise-api-methods/) to learn more about how `Promise.all` and other methods work.

---

## `.filter()`

The [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) method creates a new array with all of the elements that pass the test implemented by the provided function.

```js
const LETTER_G_CHAR_CODE = 71
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const aToGNames = names.filter(
  (name) => name.charCodeAt(0) <= LETTER_G_CHAR_CODE,
)

console.log(aToGNames)
// ['Aidan', 'Ben', 'David', 'Faraz']
```

Many times I combine `.map()` and `.filter()` together in my data transformations:

```js
const nbaTeams = [
  { name: 'PHX', titles: 0 },
  { name: 'HOU', titles: 2 },
  { name: 'UTA', titles: 0 },
  { name: 'DEN', titles: 0 },
  { name: 'LAL', titles: 17 },
]
const loserTeamDisplay = nbaTeams
  .filter((teamInfo) => teamInfo.titles === 0)
  .map((teamInfo) => teamInfo.name)
  .join(', ')

console.log(loserTeamDisplay)
// 'PHX, UTA, DEN'
```

The [`.join()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method is also non-destructive since it generates the string, but I won't be covering it in this post.

---

## `.reduce()`

The [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) method runs a function (called a "reducer") on each element of the array, resulting in a single output value that can be a new array, an object, a number, etc.

```js
const numbers = [1, 7, 3, -4, 5]
const sum = numbers.reduce((count, value) => count + value, 0)

console.log(sum)
// 12
```

Read the [Learn the Array reduce method by re-implementing lodash functions](/blog/learn-array-reduce-method-reimplementing-lodash-functions/) post to learn more about the power of `.reduce()`.

---

## `.some()` / `.every()`

The `.some()` and `.every()` methods are companions of each other.

The [`.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) method returns `true` or `false` based on whether or not **at least one element** in the array passes the test implemented by the provided function.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const someShortNames = names.some((name) => name.length <= 5)

console.log(someShortNames)
// true
```

The [`.every()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) method also returns `true` or `false`, but based on whether or not **all elements** in the array pass the test implemented by the provided function.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const allShortNames = names.every((name) => name.length <= 5)

console.log(allShortNames)
// false
```

---

## `.find()` / `.findIndex()`

The `.find()` and `.findIndex()` are also companions of each other.

The [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method returns the value of the first element in the array that passes the test implemented by the provided function.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const longName = names.find((name) => name.length > 5)

console.log(longName)
// Jonathan
```

The related [`.findIndex()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) method instead returns the **index** of the value of the first element in the array that passes the test implemented by the provided function. It returns `-1` if an element is not present.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const longNameIndex = names.findIndex((name) => name.length > 5)

console.log(longNameIndex)
// 5
```

I typically use the `.find()` method. I only tend to use `.findIndex()` when I need the index in order to index into another array or store its position.

---

## `.includes()` / `.indexOf()` / `.lastIndexOf()`

The `.includes()`, `.indexOf()`, and `.lastIndexOf()` are all companion methods, and also are closely related to `.find()` and `.findIndex()`. The find methods take a test function, whereas `.includes()`, `.indexOf()`, and `.lastIndexOf()` take a value.

The [`.includes()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) method (added in ES2016) returns `true` or `false` based on whether the array includes the provided value among its entries.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const includesJack = names.includes('Jack')

console.log(includesJack)
// false
```

Prior to the addition of the `.includes()` method into ECMAScript spec, the way to test for inclusion was with `.indexOf`. The [`.indexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) method returns the **index** of the first element in the array that is found, returning `-1` if it is not present.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const kyleIndex = names.indexOf('Kyle')

console.log(kyleIndex)
// 4
```

I only really include `.lastIndexOf()` for completeness. I'm not sure when last I even used it. But the [`.lastIndexOf()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) works just like `.indexOf()` except it works backwards from the end of the array. I imagine it's only useful if the array has duplicates and you need the last one, for some reason.

---

## `.concat()`

The [`.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method merges two or more arrays together, returning a new array.

```js
const someNames = ['Aidan', 'Ben', 'David']
const otherNames = ['Faraz', 'Kyle']
const moreNames = ['Jonathan', 'Tyler']

const names = someNames.concat(otherNames, moreNames)

console.log(names)
// ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
```

From my perspective, it's all but obsolete. And not because it's not a useful operation. I've just replaced it with the [spread operator](/blog/learning-es6-parameter-handling/#spread-operator-and-arrays).

```js
const someNames = ['Aidan', 'Ben', 'David']
const otherNames = ['Faraz', 'Kyle']
const moreNames = ['Jonathan', 'Tyler']

const names = [...someNames, ...otherNames, ...moreNames]

console.log(names)
// ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
```

Oh and both `.concat()` and the spread operator can be used to make a shallow copy of an array.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const namesCopyConcat = names.concat()
const namesCopySpread = [...names]

console.log(names !== namesCopyConcat)
// true

console.log(names === namesCopySpread)
// false

console.log(namesCopyConcat !== namesCopySpread)
// true
```

---

## `.flat()` / `.flatMap()`

The `.flat()` and `.flatMap()` methods (ES2019) are another pair of companion methods.

The [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) method creates a new array from flattening the array the specified number of levels deep (defaulting to a single level).

```js
const playerIdsByTeam = {
  HOU: ['184894', '4828', ...],
  LAL: ['242', '13139', ...],
  PHX: ['38128', '3822', ...],
  UTA: ['58282', '128484', ...],
  DEN: ['4584', '284842', ...]
}
const groupedPlayers = Object.values(playerIdsByTeam)
  // converts an array of player ID arrays
  // into an array of player name arrays
  .map((playerIds) => {
    return getPlayerNamesById(playerIds)
  })
/*
Nested array of players
[
  ['Kevin Porter Jr', 'Christian Wood', ...],
  ['LeBron James', 'Anthony Davis', ...],
  ['Devin Booker', 'Chris Paul', ...],
  ['Donovan Mitchell', 'Rudy Gobert', ...],
  ['Nicola Jokic', 'Jamal Murray', ...],
]
*/

const allPlayerNames = groupedPlayers.flat()

console.log(allPlayerNames)
/*
['Kevin Porter Jr', 'Christian Wood', ..., 'LeBron James', ...]
*/
```

The [`.flatMap()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) method creates a new array by calling the provided function on every element of the array, and then flattening the result a single level.

```js
const playerIdsByTeam = {
  HOU: ['184894', '4828', ...],
  LAL: ['242', '13139', ...],
  PHX: ['38128', '3822', ...],
  UTA: ['58282', '128484', ...],
  DEN: ['4584', '284842', ...]
}
const allPlayerNames = Object.values(playerIdsByTeam)
  .flatMap((playerIds) => {
    return getPlayerNamesById(playerIds)
  })

console.log(allPlayerNames)
/*
['Kevin Porter Jr', 'Christian Wood', ..., 'LeBron James', ...]
*/
```

So `.flatMap()` is essentially a slightly more efficient version of calling `.map()` followed by `.flat()`.

---

## `.slice()`

Lastly, the [`.slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method creates a new array that is a shallow copy of a portion of the array from the specified `start` index up to (but not including) the optional `end` index.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const someNames = names.slice(3, 6)

console.log(someNames)
// ['Faraz', 'Kyle', 'Jonathan']
```

I often use `.slice()` when building logic for a paginated search results UI.

```js
const getSearchResults = ({
  allResults,
  query = '',
  page = 1,
  pageSize = 25,
}) => {
  return allResults
    .filter((result) => result.includes(query))
    .slice((page - 1) * pageSize, page * pageSize)
}

getSearchResults({
  allResults: allPlayerNames,
  query: 'John',
  page: 2,
  pageSize: 20,
})
```

The `.slice()` method can also be used to make a shallow copy of an array.

```js
const names = ['Aidan', 'Ben', 'David', 'Faraz', 'Kyle', 'Jonathan', 'Tyler']
const namesCopySlice = names.slice()
const namesCopySpread = [...names]

console.log(names !== namesCopySlice)
// true

console.log(names === namesCopySpread)
// false

console.log(namesCopySlice !== namesCopySpread)
// true
```

---

Phew, that's it! 😅 Whether we're doing API or UI work in JavaScript, these non-destructive array methods should definitely come in handy. When I'm doing heavy data manipulation, I find myself using all of them. Which ones do you use? Feel free to let me know on Twitter at [@benmvp](https://twitter.com/benmvp)!

Keep learning my friends. 🤓
