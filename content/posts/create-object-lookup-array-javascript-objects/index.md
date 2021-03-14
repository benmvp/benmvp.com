---
date: 2021-03-14
title: Create an object lookup from an array of JavaScript objects
shortDescription: Surprisingly shorthand JavaScript code for converting an array into an object lookup
category: javascript
tags: [javascript, esnext]
hero: ./butterfly-sandy-millar-pNGJpcrbfM4-unsplash.jpg
heroAlt: Beautiful butterfly
heroCredit: 'Photo by [Sandy Millar](https://unsplash.com/@sandym10)'
---

Many [lodash](https://lodash.com/) utility functions come in handy when performing data transformations. But thanks to [ESNext](https://www.javascripttutorial.net/es-next/), I usually only need one or two helpers from lodash, and I would rather avoid adding it as a dependency. [Per-method packages](https://lodash.com/per-method-packages) do exist, but these are discouraged. So, I usually write the code myself.

Sometimes the code is short, one-liners which is perfect. Other times it's longer and I feel less great about having to maintain it myself. Take for instance converting an array of objects into an object lookup. For a long time, I created an empty object and built it up using a for loop. Then when I got a handle of [`.reduce()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), I was able to shorten the code quite a bit:

```js
const teams = [
  { id: 'atl', name: 'Atlanta Hawks', wins: 18, losses: 20 },
  { id: 'bos', name: 'Boston Celtics', wins: 19, losses: 18 },
  { id: 'bkn', name: 'Brooklyn Nets', wins: 26, losses: 13 },
  { id: 'cha', name: 'Charlotte Hornets', wins: 19, losses: 18 },
  { id: 'chi', name: 'Chicago Bulls', wins: 16, losses: 20 },
  // ...remaining 25 teams
]

const teamLookup = teams.reduce(
  (runningLookup, team) => ({
    ...runningLookup,
    [team.id]: team,
  }),
  {},
)
```

The value of `teamLookup` would be:

```json
{
  "atl": { "id": "atl", "name": "Atlanta Hawks", "wins": 18, "losses": 20 },
  "bos": { "id": "bos", "name": "Boston Celtics", "wins": 19, "losses": 18 },
  "bkn": { "id": "bkn", "name": "Brooklyn Nets", "wins": 26, "losses": 13 },
  "cha": { "id": "cha", "name": "Charlotte Hornets", "wins": 19, "losses": 18 },
  "chi": { "id": "chi", "name": "Chicago Bulls", "wins": 16, "losses": 20 }
}
```

This solution worked pretty well. The `.reduce()` method is so powerful that we can transform an array into basically anything we want. But I feel that `.reduce()` in general can be tricky to write and understand. It's such a funky API. And a problem with this solution is that it creates a new object with each loop iteration. As a result, we are throwing away lots of in-progress objects.

A more "optimal" approach could be:

```js
const teamLookup = teams.reduce((runningLookup, team) => {
  runningLookup[team.id] = team

  return runningLookup
}, {})
```

This approach is more or less the equivalent of my original for loop solution. But I'm not a fan of it as much. Even though we are only creating a single object, the assignment within the `.reduce()` doesn't feel very "functional." I always try to avoid mutating objects. Plus, this code would likely raise alarms from the [`no-param-reassign`](https://eslint.org/docs/rules/no-param-reassign) eslint rule.

Recently while reading a PR, I was reminded about [`Object.fromEntries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries), which was officially added to ES2019. With it, we can create the same lookup with one statement, but in a more readable way (in my opinion, of course):

```js
const teamLookup = Object.fromEntries(teams.map((team) => [team.id, team]))
```

`Object.fromEntries()` is the reverse of [`Object.entries()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) (ES2017). I use `Object.entries()` all the time to convert an object into an array of `[key, value]` pairs when I need both the key and the value for [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), etc. So instead of transforming an object to an array of pairs, `Object.fromEntries()` transforms an array of pairs to an object.

Therefore, to create our `teamLookup`, we first use `.map()` to quickly convert the `teams` array to an array of `[id, team]` pairs. Then, because `Object.fromEntries()` transforms pairs into an object, we get our team lookup! 🎉 Not too bad, right?

I'm now motivated to investigate more single-statement data transformations we can make. I think I'll do a post on it. Stay tuned. 😉

Keep learning my friends. 🤓
