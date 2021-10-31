---
date: 2020-12-13
title: 10 modern JavaScript features to be awesome at React
shortDescription: The 10 most important modern JavaScript features that will take your React skills to the next level
category: JavaScript
tags: [react, ecmascript, proposals, javascript]
hero: ./stairs-yusuf-evli-yaSLNLtKRIU-unsplash.jpg
heroAlt: Gray outdoor wooden staircase
heroCredit: 'Photo by [Yusuf Evli](https://unsplash.com/@yusufevli)'
---

One of my favorite sayings about React is that it's "Just JavaScript™." For better or worse, React hitched its ride with JavaScript. It's "for better" because as JavaScript improves, React also gets better (and maybe easier too?). However, it's "for worse" because it means that we really need to be good at JavaScript in order to be good at React. And that can be a barrier to entry.

I used to tell folks that before they even started learning React, they should be really solid in JavaScript. **My thinking was that the more comfortable they were with JavaScript, the easier React would be for them.** I had the best of intentions, but it was still gate-keeping. My bad. 😔

Now I just tell people to learn however they learn best. It's totally fine to start learning React with basic JavaScript skills. Lots of people get the energy and desire to keep learning by building things. However, **I still feel that in order to take our React skills to the next level, we will need a solid grasp of modern JavaScript.**

I want to highlight 10 features of "modern JavaScript" that I believe go hand-in-hand with React. So whether you're considering learning React, and you want to get a handle of modern JavaScript first, or you've already been developing in React and want to fully understand all the JavaScript features you see surrounding React, these are for you. For the features you don't know well yet, feel free to follow the links to learn more.

## 1. ECMAScript Modules (i.e. `import`/`export`)

I see a lot of confusion around imports and when to use named imports versus default imports. Well, the import style depends on how it was exported. There are two kinds of exports: named exports (one or more per file) and default exports (only one per file).

```js
// Example.js

export function calculateRatio(x, y) {
  // used in `Example`
}

export function Helper(props) {
  // used in `Example`
}

export default function Example(props) {
  // Renders `<Helper />`
  // Uses `calculateRatio`
}
```

Generally, you'll either have a file with 1 or more named exports (typically helper functions) or a file with a single default export (typically a React component). But it's certainly possible to combine them.

Similarly, there are also two types of imports: named imports and default imports.

```js
import Example, { Helper, calculateRatio } from './Example'
```

**In short, named imports go within the curly braces and the single default import is outside of them.** How your React codebase is organized will determine how you will need to import within files.

There are more features with `import`/`export` like re-exporting, import renaming, importing as an object, side-effect module loading, and more. Read [ECMAScript 6 modules: the final syntax](https://2ality.com/2014/09/es6-modules-final.html) for more details.

## 2. Arrow functions

Arrow functions are a shorthand syntax for defining functions in JavaScript. Like with everything in JavaScript there are different opinions on how often arrow functions should be used because of their terseness. **Some folks (like myself) replace all functions with arrow functions, while others only use it in certain cases.**

```js
const VALUES = [1, 6, 3, 9, 12, 42, 33]

// OG function
const sums = VALUES.map(function (value) {
  return value + value
})

// arrow function w/ return
const sums = VALUES.map((value) => {
  return value + value
})

// arrow function w/ implicit return
const sums = VALUES.map((value) => value + value)
```

As you can see, the arrow function really wins with saving on characters, but for those unfamiliar with the syntax it really loses with clarity.

Arrow functions can exist everywhere within your React app:

```jsx
// as a component definition (w/ implicit return)
const Example = (props) => (
  <List items={VALUES}>
    {/* as a render prop (w/ implicit return) */}
    {(item) => (
      {/* as an event callback */}
      <button onClick={() => {
        logEvent(item)
      }}>
        {item}
      </button>
    )}
  </List>
)
```

If you want to know more interesting details about arrow functions, including how they don't support `this`, read through my [detailed post on arrow functions](/blog/learning-es6-arrow-functions/).

## 3. String interpolation

We no longer need to do string concatenation. Using string literals, we can now do string interpolation in JavaScript.

```js
const firstName = 'Ben'
const lastName = 'Ilegbodu'

// the values within `firstName` and `lastName`
// are substituted into where the tokens are
// output: Name: Ilegbodu, Ben
console.log(`Name: ${lastName}, ${firstName}`)

// before
console.log('Name: ' + lastName + ', ' + firstName)
```

**Pretty much anywhere where you used to use string concatenation, you can replace with string interpolation using string literals (the back-ticks).** And the `${}` syntax isn't _just_ variable interpolation; it's _expression_ interpolation. Anything expression can go inside.

To learn more, you can deep dive into [Template literals & tagged templates](/blog/learning-es6-template-literals-tagged-templates/). Oh, and template literals also support [nested string interpolation](/blog/nested-string-interpolation-in-javascript/) as well.

## 4. Enhanced object literals

JavaScript object literals support a shorthand when the name of the key matches the existing variable name:

```js
const getCar = (make, model, age, price) => {
  const value = price - age * 1000

  return {
    make,
    model,
    age,
    value,
  }

  // before
  // return {
  //   make: make,
  //   model: model,
  //   age: age,
  //   value: value,
  // }
}
```

Javascript object literals also support computed property keys:

```js
const value = 'hello'
const object = {
  name: 'Ben',
  location: 'Bay Area',
  [value]: 'bye',
}

console.log(object)
// expected output:
// {
//   name: "Ben",
//   location: "Bay Area",
//   hello: "bye"
// }
```

These come in handy pretty much anywhere you're constructing objects. **I try to name my variables or my function arguments such that I can leverage object literal shorthand.** Read more about [Enhanced object literals](/blog/learning-es6-enhanced-object-literals/).

## 5. Array destructuring

Array destructuring makes it possible to easily pluck out ordered values in arrays and create variables. It's used a lot with React hooks because of the [`useState` hook](https://reactjs.org/docs/hooks-state.html):

```js
const Example = () => {
  // `useState` returns a 2-element array
  // declare `count` and assign it first element
  // declare `setCount` and assign it second element
  const [count, setCount] = useState(0)

  // ...
}
```

**Array destructuring is positional, so the names of the variables can be anything I want them to be.**

Another fun use case for array destructuring is with [`Object.entries`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries):

```js
const person = {
  name: 'Ben Ilegbodu',
  title: 'Principal Frontend Engineer',
  location: 'Bay Area',
}

Object.entries(([key, value]) => {
  console.log(`${key}: ${value}`)
})

// expected output:
// "name: Ben Ilegbodu"
// "title: Principal Frontend Engineer
// "location: Bay Area"
```

I often chain `Object.entries` with [`.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) or [`.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) when performing data transformations in helper utilities.

For more details, check out [React Hooks: Array Destructuring Fundamentals](https://kentcdodds.com/blog/react-hooks-array-destructuring-fundamentals) or my [deep dive into destructuring](/blog/learning-es6-destructuring/).

## 6. Object destructuring

Object destructuring is like array destructuring but for objects. 😎

```js
const { lName, fName } = { fName: 'John', age: 15, lName: 'Doe' }

// output: Doe, John
console.log(`${lName}, ${fName}`)
```

Object destructuring comes in super handy with plucking properties from component props:

```js
const Input = (props) => {
  const { value, id, onChange } = props

  // `value` === `props.value`
  // `id` === `props.id`
  // `onChange` === `props.onChange`
}
```

And what's even better, we can use object destructuring in the function arguments:

```js
const Input = ({ value, id, onChange }) => {
  // `props` argument never exists
}
```

Many times we have components that take unknown props that we will ultimately pass along. We can use rest operator (`...`) for this:

```js
const Input = ({ value, id, onChange, ...otherProps }) => {
  // `otherProps` is an object with all the other props
  // besides `value`, `id` & `onChange`
}
```

With object destructuring, we can also change the name of the variable created and even use computed keys. For more on object destructuring, take a look at my [Destructuring](/blog/learning-es6-destructuring/) post. For more on destructured parameters, you can read my [Parameter handling](/blog/learning-es6-parameter-handling/) post.

## 7. Spread operator

The [spread operator (`...`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) usually goes hand-in-hand with the rest operator. It looks identical to the rest operator excepts its used in array and object literals.

```js
const addItem = (list, item) => {
  // add item to the beginning of the
  // list returning a new array instead
  // of modifying the existing one
  return [item, ...list]
}

const addName = (info, name) => {
  // create a copy of the object, add
  // the name key, and return the new object
  return {
    ...info,
    name,
  }
}
```

**The goal with the spread operator is to never mutate data**, but make a copy first and add to the copy. JSX also supports the [spread attributes](https://reactjs.org/docs/jsx-in-depth.html#spread-attributes):

```jsx
const Input = ({ value, id, onChange, ...otherProps }) => {
  // ...

  return (
    <input
      type="text"
      id={id}
      value={value}
      onChange={onChange}
      {...otherProps}
    />
  )
}
```

## 8. Optional chaining

The [optional chaining operator (`?.`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining) allows us to access properties deeply nested within an object without having to verify that each property level exists:

```js
const processUser = (user) => {
  const userStreet = user?.address?.street

  // if `user` or `address` undefined/null,
  // then `userStreet` will be undefined.
  // otherwise `userStreet` will have the value
}
```

**Bonus:** optional chaining can also be combined with the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) to safely default a missing value.

```js
const processUser = (user) => {
  const userStreet = user?.address?.street ?? 'Unknown'

  // if `user` or `address` undefined/null,
  // then `userStreet` will be "Unknown"
  // otherwise `userStreet` will have the value
}
```

## 9. Promises & Fetch API

The [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a utility for asynchronously making network requests. It returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/API/Promise) that will resolve with a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object:

```js
window.fetch('https://api.benmvp.com/')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

    // ...
  })
  .catch((err) => {
    console.error(err)
  }
```

Many asynchronous utilities, like `window.fetch`, now use promises instead of callbacks. Promises can be passed around like objects, auto-settled, composed, and a slew of other tings. Check out my [Promises](/blog/learning-es6-promises/) post for all of the details.

## 10. Async functions

An [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) is a function that is declared with the `async` keyword. It uses the `await` keyword to enable asynchronous, promise-based behavior to be written in a synchronous style, avoiding the promise chains.

```js
const request = async () => {
  try {
    const res = await window.fetch('https://api.benmvp.com/')
    const data = await res.json()

    // ...
  } catch (err) {
    console.error(err)
  }
}
```

If you no longer have to support Internet Explorer you should be able to use async functions native in the browser! 🎉

---

So those are the 10 features of "modern JavaScript" that I frequently use when developing React applications. Some I use directly in React components, while others are useful in helper functions. I can't imagine developing React applications (or any JavaScript projects for that matter), without these 10 features. **Each one of them are fairly small on their own, but when combined together they really will power up your React skills.**

Which features do you use most? Are there some that I missed? Feel free to reach out to me at [`@benmvp`](https://twitter.com/benmvp) on Twitter to continue the discussion!

Keep learning my friends. 🤓
