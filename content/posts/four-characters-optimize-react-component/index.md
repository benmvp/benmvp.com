---
date: 2020-10-03
title: Four characters can optimize your React component
shortDescription: How making use of useState lazy initialization can speed up your React function component
category: react
tags: [react, hooks, useState, performance]
hero: ./light-speed-marc-sendra-martorell--Vqn2WrfxTQ-unsplash.jpg
heroAlt: Car lights moving quickly through a tunnel
heroCredit: 'Photo by [Marc Sendra Martorell](https://unsplash.com/@marcsm)'
---

So… yeah the title is kinda clickbait-y, but it’s kinda true. Take a look at these two code snippets.

First:

```js
// Example 1

const Counter = () => {
  const [count, setCount] = useState(
    Number.parseInt(window.localStorage.getItem(cacheKey)),
  )

  useEffect(() => {
    window.localStorage.setItem(cacheKey, count)
  }, [cacheKey, count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  )
}
```

Second:

```js
// Example 2

const Counter = () => {
  const [count, setCount] = useState(() =>
    Number.parseInt(window.localStorage.getItem(cacheKey)),
  )

  useEffect(() => {
    window.localStorage.setItem(cacheKey, count)
  }, [cacheKey, count])

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  )
}
```

Can you spot the difference? Yes? Good eye! 🔬 If not, I’ll give you a hint and zero in on the `useState` calls.

First:

```js
// Example 1

const [count, setCount] = useState(
  Number.parseInt(window.localStorage.getItem(cacheKey)),
)
```

Second:

```js
// Example 2

const [count, setCount] = useState(() =>
  Number.parseInt(window.localStorage.getItem(cacheKey)),
)
```

How about now? 😄 They look almost the same right? Ok, I won't keep you in suspense (pun intended). 😂

The difference is the code for the initialization of the state. The first example retrieves the value from `localStorage`, parses it into an integer, and then sets it as the initial value for the `count` state.

```js
// Example 1

const [count, setCount] = useState(
  Number.parseInt(window.localStorage.getItem(cacheKey)),
)
```

The second example is _almost_ similar, except it **passes a function** that retrieves the value from `localStorage`, parses it into an integer, and **returns** the value.

```js
// Example 2

// highlight-next-line
const [count, setCount] = useState(() =>
  Number.parseInt(window.localStorage.getItem(cacheKey)),
)
```

Because of the terseness of [arrow functions](/blog/learning-es6-arrow-functions/) with an implicit return value, the difference between the first and second examples is only 4 characters (plus some whitespace). And depending on what we’re doing to get the initial value (in our case reading from `localStorage` and parsing the value), adding those 4 characters can improve the performance of your React function component.

Passing a function to `useState` instead of a direct value is called [_lazy initialization_](https://reactjs.org/docs/hooks-reference.html#lazy-initial-state). According to the `useState` docs, you use lazy initialization with `useState` when the calculation of the initial state value is an expensive computation. This is because the lazy initialization function is **only executed the first time when the state is created**. On subsequent re-renders, the function is disregarded.

As a reminder, the way the `useState` hook works is that the first time `Counter` is rendered, it creates the `count` state with its initial value. Then when we call `setCount`, the entire `Counter` function gets called again and `count` has its updated value. And this re-rendering happens every time the `count` state is updated. All the while, that initial value is never used again.

So in the first example, if we’re reading the value from `localStorage` for every re-render, but we only needed its value for the first render, **we’re doing a bunch of unnecessary computation.** The second example using the lazy initialization function prevents that unnecessary computation.

Still a tiny bit confused? Let’s rewrite the first example to hopefully make things a bit clearer. Instead of passing the value from `localStorage` directly to `useState`, let's store it in a variable first and _then_ pass it to `useState` instead.

```js
// Example 1

const Counter = () => {
  const initialValue = Number.parseInt(window.localStorage.getItem(cacheKey))
  const [count, setCount] = useState(initialValue)

  // rest of the component
}
```

Now we can see that every time we re-render and call `Counter` again, we’re retrieving the value from `localStorage` every time, even though it's ultimately only needed the very first time. The second example _does_ always pass the function to `useState` every re-render, but `useState` only calls it the very first time. That’s why it’s called _lazy_ initialization.

And if I fully write out the lazy initialization function, it’s even clearer how different the two examples are:

```js
// Example 2

const Counter = () => {
  const [count, setCount] = useState(function() {
    return Number.parseInt(window.localStorage.getItem(cacheKey)),
  })

  // rest of the component
}
```

Since the lazy initialization function is only called once, should you use it all the time? Even for something like this:

```js
// returning a primitive value

const Counter = () => {
  const [count, setCount] = useState(() => 0)

  // rest of the component
}
```

Or this:

```js
// returning a prop or existing variable

const Counter = ({ initialCount }) => {
  const [count, setCount] = useState(() => initialCount)

  // rest of the component
}
```

In these cases, the initial value is a simple value or an already calculated variable. Even though the function is only being called once, there still is a cost to creating the function every time. And it’s likely that the cost of creating the function would be higher than just passing the value or variable along. This would be an over-optimization.

**So when should you use lazy initialization?** Like almost everything, it depends. 😄 The guideline from the docs is when you’re doing an “expensive computation.” Reading from `localStorage` would be an expensive computation. Using [`.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), etc. on arrays would be expensive computations. A good way to think of it is that if you have to call a function to get the value, it’s likely an expensive enough computation that it warrants using lazy initialization.

I’d likely use it to initialize state to be the current date/time:

```js
const Clock = () => {
  // highlight-next-line
  const [time, setTime] = useState(() => new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [tickAmount])

  return <p>The time is {time.toLocaleTimeString()}.</p>
}
```

---

That’s it! Who knew so many words could be spent over 4 lil' ol' characters. 😅 If you’ve got any questions or other thoughts, feel free to shoot me a tweet at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
