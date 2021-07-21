---
date: 2021-07-18
title: Learn the Array reduce method by re-implementing lodash functions
shortDescription: Re-implement zip, keyBy, sum and other lodash functions in order to learn how Array reduce works
category: javascript
tags: [javascript, arrays, reduce]
hero: ./solar-panel-array-antonio-garcia-ndz_u1_tFZo-unsplash.jpeg
heroAlt: An array of blue solar panels in Chile
heroCredit: 'Photo by [Antonio Garcia](https://unsplash.com/@angarav)'
---

The built-in [JavaScript `Array` object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) has lots of helpful methods that allow us to manipulate arrays. I use [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) and [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) all the time when I'm transforming data. Arguably the most powerful, yet also least understood method is [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). It allows us to basically transform an array into nearly anything else: another array, an object, a boolean, a number, etc.

So let's learn how `.reduce()` works by re-implementing [`lodash`](https://lodash.com/) functions.

---

## `sum()`

The [`_.sum()`](https://lodash.com/docs/4.17.15#sum) function computes the sum of the values in an array.

```js
const sum = (array) => {
  return array.reduce((count, value) => {
    return count + value
  }, 0)
}

sum([1, 7, 3, -4, 5]) // 12
```

The `sum()` function is probably the most common example used when explaining `.reduce()`. It transforms an array of numbers into a single number. Let's quickly look at how `.reduce()`.

The `.reduce()` method takes a function (called a "reducer") and an initial value. The initial value is technically optional, but we won't worry about that here. **The reducer function is called on each element of the array.** It takes two parameters, the value we're building up (called the "accumulator") and the current array element in the iteration. It also takes the index as the 3rd parameter and the entire array as the 4th, but we won't worry about that here either.

So in the example, our initial value is `0`. That becomes `count` in the first iteration. We add `0` (i.e. `count`) to `1` (i.e. `value`) and return that value. In the next iteration, `count` is now `1` and `value` is `7`. We add those together and return the value. So on the third iteration, `count` is now `8`. The iterations continue until the final result returned by `.reduce()` is `12`, which is then returned by our `sum()` function.

You may be asking, why not use a for loop or [`.forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for something so simple? One advantage of `.reduce()` is that it's chainable with other array methods.

```js
const games = [
  { us: 109, them: 89 },
  { us: 78, them: 100 },
  { us: 94, them: 84 },
]
const ourPoints = games
  .map((game) => game.us)
  .reduce((totalPoints, points) => totalPoints + points, 0)
// 281
```

**Splitting up `.map()` and `.reduce()` allows each to have a single purpose.** The `.map()` converts the array of game objects into an array of numeric scores. Then the `.reduce()` focuses on summing up those scores. For more complicated transformations, making this split usually makes the logic more maintainable.

And now that we know how `.reduce()` works, lets look at other implementations to drive home our understanding.

---

## `countBy`

The [`_.countBy()`](https://lodash.com/docs/4.17.15#countBy) function creates an object with keys that are the unique elements in the array, and values that are the number of times the key was in the array.

```js
const countBy = (array) => {
  return array.reduce((obj, item) => {
    if (item in obj) {
      // `item` is already a key so increment
      obj[item] += 1
    } else {
      // first time seeing `item` so initialize it
      // w/ count of 1
      obj[item] = 1
    }

    // always return the `obj`
    return obj
  }, {})
}

countBy([
  'basketball',
  'football',
  'tennis',
  'basketball',
  'bowling',
  'tennis',
  'swimming',
  'basketball',
])
/*
{
  basketball: 3,
  football: 1,
  tennis: 2,
  bowling: 1,
  swimming: 1
}
*/
```

Here is an example of turning an array into an object. We start with an empty object. Then in the reducer function we check if the `item` is already in the `obj`. If it is, then we increment its count. If not, we add it to the `obj` with an initial count of `1`. **We must return `obj` from the reducer function so that it's available as `obj` in the next iteration.**

---

## `flatten`

The [`_.flatten`](https://lodash.com/docs/4.17.15#flatten) function (also available as [`.flat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) on arrays since ES2019) flattens the array a single level deep.

```js
const flatten = (array) => {
  return array.reduce((flattened, value) => {
    // `.concat()` flattens the value if it's an array
    // when concatenating to return a new array
    return flattened.concat(value)
  }, [])
}

flatten([1, 2, [3, 4], 5, [6, 7]])
// [1, 2, 3, 4, 5, 6, 7]
```

Here we go from an array to a new (and flattened) array. The [`.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) method concatenates two (or more) arrays together, returning a new array. So if `value` is an array, concatenating it to the `flattened` array will result in each element of `value` being added to the end of `flattened` as a new array. And if `value` is not an array, the single value is added to the end of the newly created array.

---

## `filter`

The [`._filter`](https://lodash.com/docs/4.17.15#filter) function iterates over the array, returning a new array containing elements that pass the test implemented by the provided function (called a "predicate").

```js
const filter = (array, predicate) => {
  return array.reduce((filteredArray, value) => {
    // if `value` passes the `predicate` test
    // include it in the `filteredArray`
    if (predicate(value)) {
      filteredArray.push(value)
    }

    // always return the `filteredArray`
    return filteredArray
  }, [])
}

filter(
  [
    { team: 'PHX', titles: 0 },
    { team: 'HOU', titles: 2 },
    { team: 'UTA', titles: 0 },
    { team: 'DEN', titles: 0 },
    { team: 'LAL', titles: 17 },
  ],
  (teamInfo) => teamInfo.titles > 0,
)
/*
[
  { team: 'HOU', titles: 2 },
  { team: 'LAL', titles: 17 }
]
*/
```

Now, I would never use `.reduce()` to implement `filter()` since [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) already exists on the `Array` object, but this shows how flexible `.reduce()` is. **It can even implement one of the main `Array` utility methods!**

---

## `fromPairs`

The [`_.fromPairs`](https://lodash.com/docs/4.17.15#fromPairs) function returns an object composed from key-value pairs. This is equivalent to [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries) (ES2019).

```js
const fromPairs = (array) => {
  return array.reduce((obj, value) => {
    // `value[0]` becomes the `obj` key
    // `value[1]` becomes the `obj` value
    obj[value[0]] = value[1]

    // always return `obj`
    return obj
  }, {})
}

fromPairs([
  ['sun', 'Sunday'],
  ['mon', 'Monday'],
  ['tue', 'Tuesday'],
  // ...
])
/*
{
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  // ...
}
*/
```

---

## `keyBy`

The [`_.keyBy()`](https://lodash.com/docs/4.17.15#keyBy) function creates an object lookup using the specified property name as the lookup key.

```js
const keyBy = (array, propName) => {
  return array.reduce((lookup, value) => {
    lookup[value[propName]] = value

    return lookup
  }, {})
}

keyBy(
  [
    { team: 'PHX', titles: 0 },
    { team: 'HOU', titles: 2 },
    { team: 'UTA', titles: 0 },
    { team: 'DEN', titles: 0 },
    { team: 'LAL', titles: 17 },
  ],
  'team',
)
/*
{
  PHX: { team: 'PHX', titles: 0 },
  HOU: { team: 'HOU', titles: 2 },
  UTA: { team: 'UTA', titles: 0 },
  DEN: { team: 'DEN', titles: 0 },
  LAL: { team: 'LAL', titles: 17 },
}
*/
```

---

## `map`

The [`_.map()`](https://lodash.com/docs/4.17.15#map) function, which of course exists as [`.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) on arrays, creates a new array of values populated with the results of calling the provided function on every element of the array.

```js
const map = (array, mapFn) => {
  return array.reduce((mappedArray, value) => {
    mappedArray.push(mapFn(value))

    return mappedArray
  }, [])
}

map([2, 5, 9], (n) => n ** 2)
// [4, 25, 81]
```

By the way, the map function in the example above is using the [exponentiation (`**`) operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Exponentiation) which was introduced in ES2016. It's equivalent to [`Math.pow()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow).

---

## `max`

The [`_.max()`](https://lodash.com/docs/4.17.15#max) function computes the maximum value within the array.

```js
const max = (array) => {
  return array.reduce((maxInProgress, value) => {
    return Math.max(maxInProgress, value)
  }, -Infinity)
}

max([4, 582, 38, -472, 1, 20])
// 582
```

We're using [`Math.max()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) to get the maximum value between the `maxInProgress` and the next `value` in the array. But `Math.max()` accepts more than 2 arguments, so we can implement our `max()` function with `.reduce()`.

```js
const max = (array) => Math.max(...array)

max([4, 582, 38, -472, 1, 20])
// 582
```

Using the [spread operator](/blog/learning-es6-parameter-handling/#spread-operator) allows us to convert the array of numbers into multiple arguments to `Math.max()`.

---

## `some`

The [`_.some()`](https://lodash.com/docs/4.17.15#some) function tests whether at least one element in the array passes the test implemented in the function (called a "predicate"). This already exists as [`.some()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) on the `Array` object.

```js
const some = (array, predicate) => {
  return array.reduce((passes, value) => {
    // if we haven't found a passing value yet,
    // try this next `value`
    if (!passes) {
      return predicate(value)
    }

    // otherwise we're good and return `true`
    return true
  }, false)
}

some([2, 12, 4, 8, 11], (n) => n > 10)
// true
```

While this shows reducing an array down to a boolean value, it is actually a suboptimal solution. **The real implementation of `.some()` short-circuits.** Once it has found a value that passes the test, it stops iterating through the array and returns `true`. There's no need to keep looking. Because `.reduce()` walks through the entire array, even when we've found a passing value, it keeps going. This would perform poorly for large arrays, but it shows off the functionality nonetheless.

---

## `zip`

The [`_.zip()`](https://lodash.com/docs/4.17.15#zip) function creates an array of grouped elements, the first of which contains the first elements in the given arrays, the second which contains the second elements in the given arrays, etc.

```js
const zip = (...arrays) => {
  return arrays[0].reduce((zipped, value, index) => {
    zipped.push(
      // generate an array of the element at the `index`
      // in each of the `arrays`
      arrays.map((array) => array[index]),
    )

    return zipped
  }, [])
}

zip(
  ['Houston', 'Miami', 'Chicago', 'Los Angeles'],
  ['Texas', 'Florida', 'Illinois', 'California'],
  ['713', '305', '312', '213'],
)
/*
[
  ['Houston', 'Texas', '713'],
  ['Miami', 'Florida', '305'],
  ['Chicago', 'Illinois', '312'],
  ['Los Angeles', 'California', '213]
]
*/
```

Here we get to use the third parameter of the reduce function, the value's `index` within the array.

---

So that's it. My hope is that seeing different implementations of functions, especially the familiar ones, will help you understand `.reduce()` just a little bit better. In my opinion, if you're able to add `.reduce()` to your Javascript development skill set, it will improve your data transformation code.

If you've got any thoughts or questions, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
