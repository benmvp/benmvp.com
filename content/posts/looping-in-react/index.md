---
date: 2021-05-16
title: Looping in React
shortDescription: How to use vanilla JavaScript to loop within JSX of a React component
category: react
tags: [react, loop, logic, javascript]
hero: ./roller-coasters-priscilla-du-preez-FOsina4f7qM-unsplash.jpg
heroAlt: Roller coaster under white clouds and blue sky
heroCredit: 'Photo by [Priscilla Du Preez](https://unsplash.com/@priscilladupreez)'
---

Last week I talked about 6 different ways to [conditional render JSX markup within a React component](/blog/conditional-rendering-react/). Looping in JSX within a React component is another aspect that trips up newcomers to React. Based on other templating languages, we might expect to be able to loop in JSX like so:

```js
// THIS DOESN'T WORK!!! 👎🏾👎🏾👎🏾
const Teams = ({ teams }) => {
  return (
    <ul>
      <% for (const team of teams) { %>
        <li>{team.name} ({team.abbreviation})</li>
      <% } >
    </ul>
  )
}
```

All we want to do is render out an `<li>` for every `team` in the `teams` prop. But JSX doesn't provide it's own loop construct. It offloads looping to JavaScript. This feels totally unexpected at first, but once we get used to it actually opens up way more possibilities.

---

Ultimately, **the way we display a list of data is by rendering an array of JSX elements**. So we need to transform our `teams` array into an array of JSX elements.

```js
const Teams = ({ teams }) => {
  const teamsUi = teams.map((team) => (
    <li key={team.name}>
      {team.name} ({team.abbreviation})
    </li>
  ))

  return <ul>{teamsUi}</li>
}
```

The most common way to transform an array of data to a JSX array is using [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). The job of the `.map` method is to **create a new array** populated with the return value of the function called on every element in the array. So by returning JSX in the function, we go from an array of `teams` data to the array of JSX elements (`teamsUi`). Then we render it like any JSX variable. React takes care of the rest.

> Wondering what that `key` prop that is added to the `<li>` is for? Read [Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop) by [Kent C. Dodds](https://twitter.com/kentcdodds/). We must add it to every element we add to a list and it **must be unique**.

Many developers, instead of assigning the result of `.map` to a variable, prefer to use it inline.

```js
const Teams = ({ teams }) => {
  return (
    <ul>
      // highlight-start
      {teams.map((team) => (
        <li key={team.name}>
          {team.name} ({team.abbreviation})
        </li>
      ))}
      // highlight-end
    </li>
  )
}
```

It works the exact same (and still needs the `key` prop), but it's in the context of the other JSX which a lot of folks prefer. It's similar to how other templating languages work as well. The advantage of using `.map` is that it allows for inlining. Other methods of transforming a list of data to list of JSX elements require the use of a variable.

```js
const Teams = ({ teams }) => {
  const teamsUi = []

  // highlight-start
  for (const team of teams) {
    teamsUi.push(
      <li key={team.name}>
        {team.name} ({team.abbreviation})
      </li>,
    )
  }
  // highlight-end

  return <ul>{teamsUi}</li>
}
```

Because we need to define a variable that we can `.push` into, our code is no longer a single expression that can be rendered within the JSX. So it needs to be separate. I suppose we could wrap the code in an [immediately-invoked function expression](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (aka IIFE) to make it inline.

```js
const Teams = ({ teams }) => {
  return (
    <ul>
      // highlight-start
      {(() => {
        const teamsUi = []

        for (let team of teams) {
          teamsUi.push(
            <li key={team.name}>
              {team.name} ({team.abbreviation})
            </li>,
          )
        }

        return teamsUi
      })()}
      // highlight-end
    </ul>
  )
}
```

But in my opinion that's taking things a bit too far. 😂 Plus JavaScript developers, particularly React devs, seem to be in love with functional-style programming, so `.map` is definitely the way to go.

JSX only accepting an array of JSX elements for rendering lists enables us to do all sorts of JavaScripting to get to that final list of JSX elements.

```js
const Teams = ({ teamLookup }) => {
  // teamLookup is an object of `teamId` (key) to `team` (value)

  // first convert object into an array of [key, value] arrays
  // highlight-next-line
  const winningTeamsUi = Object.entries(teamLookup)
    // next filter out teams w/o championships
    // (Jazz, Suns, Nuggets, other sad franchises)
    // highlight-next-line
    .filter(([, team]) => team.championships > 0)
    // finally map to JSX elements
    // highlight-next-line
    .map(([teamId, team]) => (
      <li key={teamId}>
        {team.name} ({team.abbreviation})
      </li>
    ))

  return <ul>{winningTeamsUi}</ul>
}
```

In this example, instead of starting with a `teams` array we're starting with a `teamsLookup`, an object with the NBA `teamId` as the key and the NBA `team` as the value. To convert this into an array we use [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) to get an array of `[teamId, team]` tuple arrays. From there, we filter out any of the teams without a championship (like the Jazz, Suns, Nuggets, and other sad franchises). It uses [array destructuring](/blog/learning-es6-destructuring/#skipping-indices-in-array-destructuring) to assign the 2nd array index to the `team` variable. Finally, we convert that resultant array into an array of JSX `<li>` elements.

While it's definitely different, it's nice to be able to stay in JavaScript the whole way. **No matter how increasingly complicated the list creation gets, we're still using the same technique: array of data to array of JSX elements.** Because of all the logic happening, I prefer to store the array of elements in a variable rather than put it directly inline. But it certainly could all be down within the context of the main render.

---

So there is another alternative to using JavaScript for looping in JSX: using `<For>` from [`babel-plugin-jsx-control-statements`](https://github.com/AlexGilleran/jsx-control-statements).

```js
const Teams = ({ teams }) => {
  return (
    <ul>
      // highlight-next-line
      <For each="team" of={teams}>
        <li key={team.name}>
          {team.name} ({team.abbreviation})
        </li>
        // highlight-next-line
      </For>
    </li>
  )
}
```

It's a [Babel plugin](https://babeljs.io/docs/en/plugins/) much like the [React JSX babel plugin](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx) that transforms JSX to actual JavaScript code the browser can understand. So there is nothing to import. **It transforms the code into the same inline `.map()` from before.** The `key` prop is still required.

This plugin was popular early in the lifetime of React when developers were still getting the hang of React and JSX. The thought of a template language not having a looping construct was still foreign. Nowadays most folks, especially those just starting out, use `.map`.

---

Before we wrap, what happens if we don't have an array of data, but still want to loop? Like we have a count and want to render a list of items up to that count. We can use a `for` loop directly.

```js
const Items = ({ maxItems }) => {
  const itemsUi = []

  // highlight-start
  for (let i = 0; i < maxItems; i++) {
    items.push(<li key={i}>Item #{i + 1}</li>)
  }
  // highlight-end

  return <ul>{itemsUi}</ul>
}
```

Here we use the `for` loop to iterate up to `maxItems`, each time pushing a new `<li>` element to the array. But in the spirit of functional-style programming, I prefer to create an array of numbers up to `maxItems`.

```js
const Items = ({ maxItems }) => {
  // highlight-start
  // first create an array with `maxItems` elements
  // e.g: [1, 2, 3, ..., maxItems]
  const itemsUi = Array.from({ length: maxItems }, (_, index) => index + 1)
    // then map over the numbers to create array of JSX elements
    .map((num) => items.push(<li key={num}>Item #{num}</li>))
  // highlight-end

  return <ul>{itemsUi}</ul>
}
```

The first step is to create an array of numbers from 1 to `maxItems` making use of [`Array.from`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from). If you're curious how it works, I explain it in my post on [single statement JS algorithms for common data transformations](/blog/9-single-statement-javascript-algorithms-common-data-transformations/). It's the equivalent of [`_.times`](https://lodash.com/docs/4.17.15#times). Once we have the array of numbers, then we're back in familiar territory using `.map`.

---

If you've got any comments, questions or suggestions, I'd love to hear them (as long as they are nice 😄). Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
