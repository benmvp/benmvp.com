---
date: 2020-10-11
title: Helper functions in the React useEffect hook
shortDescription: Four options for dealing with helper functions listed as dependencies in the useEffect hook
category: react
tags: [react, hooks, useEffect, memoization]
hero: ./boxing-gloves-neonbrand-WwrQnL0Gi1c-unsplash.jpg
heroAlt: Red and black boxing gloves
heroCredit: 'Photo by [NeONBRAND](https://unsplash.com/@neonbrand)'
---

The [`useEffect` hook](https://reactjs.org/docs/hooks-reference.html#useeffect) in React by default runs on every re-render:

```js
const Example = () => {
  const [count, setCount] = useState(0)

  // highlight-start
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })
  // highlight-end

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

You pretty much never want this functionality because the “effect” will happen way more times than it needs to. So as an optimization, `useEffect` takes a second parameter, a “dependencies” array, that will only re-run the effect when the values within the array change across re-renders:

```js
const Example = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
    // highlight-next-line
  }, [count]) // Only re-run the effect if count changes

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

This generally works great, and I find it more straightforward than its predecessor [`componentDidUpdate`](https://reactjs.org/docs/react-component.html#componentdidupdate) for class-based React components.

However, sometimes you have helper functions that you need to call from within `useEffect`. And in order to have access to props, state or other derived values, these helper functions are defined as inner functions _within_ the component itself.

Take a look at this totally made up example component:

```js
const Example = () => {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  // highlight-start
  const hideMessage = () => {
    if (count < 10) {
      setShowMessage(false)
    }
  }
  // highlight-end

  useEffect(() => {
    window
      .fetch('https://api.benmvp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // highlight-next-line
          hideMessage()
        }
      })
    // highlight-next-line
  }, [])

  return (
    <div>
      {showMessage && <p>You clicked {count} times</p>}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Now if you are using the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) eslint plugin (which I really hope you are), the `react-hooks/exhaustive-deps` rule will tell you that you need to include the `hideMessage` helper function in your dependencies array.

```shell
React Hook useEffect has a missing dependency: 'hideMessage'.
Either include it or remove the dependency array.
eslint(react-hooks/exhaustive-deps)
```

It seems weird to add a function as a dependency, but because of the nature of [closures & lexical scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), it’s important in order to avoid stale variables. But then if you add `hideMessage` to the dependencies list, you’ll get different eslint error:

```shell
The 'hideMessage' function makes the dependencies of useEffect Hook
(at line 5) change on every render. Move it inside the useEffect callback.
Alternatively, wrap the 'hideMessage' definition into its own useCallback() Hook.
eslint(react-hooks/exhaustive-deps)
```

This time instead of the error being on the `useEffect` dependencies list, it’s about the `hideMessage` helper function itself. Because it’s being declared within the React component function, there’s going to be a new version of it every time the component re-renders. **So adding it to the dependencies list is basically pointless because it’ll cause the dependencies list to be different every re-render.** This is because the previous function will not be the same reference as the next one. You’re undoing the benefit you’re trying to achieve. Although this is super frustrating, it’s pretty cool that the eslint rule is able to help you out this much.

The error provides two suggested options, but I've found that many developers are not quite sure which option is best for their situation. So they'll do _anything_ to get the error to go away. I've even seen them go nuclear and turn off the `react-hooks/exhaustive-deps` rule altogether, which is probably the worst option. By disabling it, they now allow bugs to creep into their other uses of `useEffect` when they forget to add non-function dependencies.

So I wanted to provide a couple of options to solve this problem of helper functions within the `useEffect` hook **without having to disable the `react-hooks/exhaustive-deps` rule**. And also explain in which situation(s) the option would work best.

## Option 1 - Don’t use a helper function

Seems simple enough right? 😄 Helper functions are great abstractions because they provide a helpful name around lines of code. But if your helper is only a few lines of code, you can get rid of the function and move the code within the `useEffect` call.

By the way, if the code was making use of any variables, you will need to add those to the dependencies list.

```js
const Example = () => {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    window
      .fetch('https://api.benmvp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // highlight-start
          if (count < 10) {
            setShowMessage(false)
          }
          // highlight-end
        }
      })
    // highlight-next-line
  }, [count])

  return (
    <div>
      {showMessage && <p>You clicked {count} times</p>}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

This option really only works if the function was small. But it's a pretty simple fix!

## Option 2 - Move the helper function within `useEffect`

This is the first suggestion in that second error we got. It may seem a bit weird, but if you move the helper function within the `useEffect` hook, **it’s no longer being redeclared with every component re-render.** Instead, it’s only being redeclared every time the effect is re-run. And since the helper function is now _inside_ the `useEffect` hook, it no longer needs to be listed in the dependencies. However, any variables that the function used from outside of the `useEffect` will need to be added to the dependencies list.

```js
const Example = () => {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    // highlight-start
    const hideMessage = () => {
      if (count < 10) {
        setShowMessage(false)
      }
    }
    // highlight-end

    window
      .fetch('https://api.benmvp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // highlight-next-line
          hideMessage()
        }
      })
    // highlight-next-line
  }, [count])

  return (
    <div>
      {showMessage && <p>You clicked {count} times</p>}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

This option is only feasible if the helper function is only called from within the `useEffect` hook. If it’s called elsewhere in the component, or even in another `useEffect` hook, it will not be accessible in those places.

## Option 3 - Move the helper outside of the function component

The problem we’re having with this `hideMessage` helper function is that it’s being redeclared with every component re-render. By moving the helper function outside of the function component, either within the file or in a separate file, the helper will only have the one definition. **It will not change across component re-renders.**

As a result, you don’t even need to include the function in the dependencies list. This is why the eslint rule doesn’t complain about other imported functions that you call from within `useEffect`.

However, any props, state or other derived values that the function needs will now need to be passed in as function arguments and will also need to be dependencies of `useEffect`.

```js
// highlight-start
const hideMessage = (count, setShowMessage) => {
  if (count < 10) {
    setShowMessage(false)
  }
}
// highlight-end

const Example = () => {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  useEffect(() => {
    window
      .fetch('https://api.benmvp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // highlight-next-line
          hideMessage(count, setShowMessage)
        }
      })
    // highlight-next-line
  }, [count])

  return (
    <div>
      {showMessage && <p>You clicked {count} times</p>}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

This option works well if the helper isn’t relying on lots of variables because then all of them would have to be passed as function arguments. This option can feel a bit clunky if the function needs to call a state setter (aka `setShowMessage`) instead of returning a value.

## Option 4 - Use the `useCallback` hook

This is the other suggestion in the lint error we got. The [`useCallback` hook](https://reactjs.org/docs/hooks-reference.html#usecallback) returns a “memoized” callback. It basically returns a cached version of the function based on the value of the parameters. If the parameters stay the same, **you’ll get back the exact same function reference every time**.

`useCallback` helps us get around the problem of the helper function being redeclared with every re-render because now we’ll get back the same function reference. It will only change if and when its parameters change.

```js
const Example = () => {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(true)

  // highlight-start
  const hideMessage = useCallback(() => {
    if (count < 10) {
      setShowMessage(false)
    }
  }, [count])
  // highlight-end

  useEffect(() => {
    window
      .fetch('https://api.benmvp.com/')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // highlight-next-line
          hideMessage()
        }
      })
    // highlight-next-line
  }, [hideMessage])

  return (
    <div>
      {showMessage && <p>You clicked {count} times</p>}
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

Now when we add `hideMessage` in the dependencies list of `useEffect`, we no longer get an error because `hideMessage` is memoized. Our call to `useCallback` also has a dependencies list, which contains the variables being used in the function. It's similar to how `useEffect` works. And that same `react-hooks/exhaustive-deps` eslint rule will show an error if you forget dependencies in `useCallback` as well.

**This option will work in every situation and probably requires the least code change.** You wrap it in `useCallback` and call it a day. But it’s actually my least favorite option for 2 reasons.

The first is that `useCallback` is a lesser-known hook so when others see it, it causes an extra cognitive load for them to understand what’s going on. Memoization is not a well-known concept.

The second reason is that it requires React to do more work. **Although it looks easy, memoization isn’t free.** There’s a lot of code that React executes to make it all work. The previous 3 options, on the other hand, solve the problem with regular ol’ JavaScript. In theory, less work means better performance.

---

Which option you choose kinda depends on which scenario you’re in as well as the familiarity of your team with hooks in general. But at least now you have 4 options that are better than disabling the `react-hooks/exhaustive-deps` eslint rule. That rule is definitely you’re friend so you should stop fighting it. 😂

There are a couple of other gotchas around the `useEffect` hook rule that I hope to share in follow-up posts. In the meantime, if you’ve got any questions or suggestions feel free to reach out to me at [`@benmvp`](https://twitter.com/benmvp) on Twitter.

Keep learning my friends. 🤓
