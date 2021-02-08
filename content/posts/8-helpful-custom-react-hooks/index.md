---
date: 2021-02-07
title: 8 helpful custom React Hooks
shortDescription: Implementations & explanations for custom React Hooks like usePrevious, useMedia, useDeepCompareEffect & more
category: template
tags: [react, hooks]
hero: ./chain-lock-link-markus-spiske-k-Ff5sB4iCY-unsplash.jpg
heroAlt: Silver-colored chain lock link
heroCredit: 'Photo by [Markus Spiske](https://unsplash.com/@markusspiske)'
---

Custom React Hooks allow us to extract component logic into reusable functions. Custom Hooks look very much like normal helper functions, except they can maintain component state and perform effects. There are many common actions that we do in our React applications that can be wrapped up in a custom Hook.

So let's take a look at the implementations of 8 different custom Hooks. Each implementation will include code comments as well as a potential use case. And since I'm a TypeScript fan, I'll also provide a second implementation in TypeScript when there is any TypeScript uniqueness. 😄

You'll find flavors of many of these custom Hooks in the [`react-use`](https://github.com/streamich/react-use) package. So if you find yourself using a lot of these Hooks, you might as well import the package.

Let's jump in!

---

## `useInitialMount`

Sometimes we only want to run an effect the very first time the component mounts. In my experience, the majority of these times have been firing off a tracking event. Usually I'll maintain a `hasSent` local variable that I flip from `false` to `true` after I've sent it the first time. But instead, we can use a `useInitialMount` custom Hook.

```js
import { useRef, useEffect } from 'react'

const useInitialMount = () => {
  // refs exist across component re-renders, so
  // we can use it to store a value for the
  // subsequent renders. We're tracking if it's
  // the first render, which is initially `true`
  const isFirst = useRef(true)

  // the very first render, the ref will be
  // `true`. but we immediately set it to `false`
  // so that every render after will be `false`
  if (isFirst.current) {
    isFirst.current = false

    // return true the very first render
    return true
  }

  // return false every following render
  return false
}

const Page = ({ pageName, items }) => {
  // highlight-next-line
  const isInitialMount = useInitialMount()

  useEffect(() => {
    // only call `trackEvent` for initial mount.
    // don't call it ever again, even if
    // `pageName` or `items.length` change
    if (isInitialMount) {
      trackEvent(pageName, items.length)
    }
  }, [pageName, items.length, isInitialMount])

  // render UI
}
```

---

## `usePrevious`

Sometimes we need to know the previous value of props or state to compare it to a current value. The `usePrevious` Hook is so common that it shows up in the [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state).

```js
const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
```

However, the FAQ code above has a potential gotcha in that if the component re-renders for another reason (for instance, a change in another state value), then our previous value gets overwritten even though it technically hasn't changed.

We likely want a `usePrevious` that only updates the previous value if it differs from the new value.

```js
import { useRef, useState, useEffect } from 'react'

const usePrevious = (value) => {
  // use refs to keep track of both the previous &
  // current values
  const prevRef = useRef()
  const curRef = useRef(value)
  // highlight-next-line
  const isInitialMount = useInitialMount()

  // after the initial render, if the value passed in
  // differs from the `curRef`, then we know that the
  // value we're tracking actually changed. we can
  // update the refs. otherwise if the `curRef` &
  // value are the same, something else caused the
  // re-render and we should *not* update `prevRef`.
  if (!isInitialMount && curRef.current !== value) {
    prevRef.current = curRef.current
    curRef.current = value
  }

  return prevRef.current
}

const Example = () => {
  const [time, setTime] = useState(() => new Date())
  const [count, setCount] = useState(0)

  // use `usePrevious` to keep track of the `count`
  // from the last time it changed
  // highlight-next-line
  const prevCount = usePrevious(count)

  // update `date` every 1 sec to have another state updating
  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(intervalId)
  })

  return (
    <div>
      <button onClick={() => setCount((curCount) => curCount + 1)}>+</button>
      <button onClick={() => setCount((curCount) => curCount - 1)}>-</button>
      <p>
        Count: {count}, Old Count: {prevCount}
      </p>
      <p>The time is {time.toLocaleTimeString()}.</p>
    </div>
  )
}
```

Did you catch how we're using the `useInitialMount` Hook here in `usePrevious`? I love when I can reuse Hooks within other Hooks.

And in TypeScript, the code is more or less the same, except we use [generics](https://www.typescriptlang.org/docs/handbook/generics.html) so that the type of `curValue` can be arbitrary, but enforce that the return value has to be the same type.

```typescript
import { useRef } from 'react'

// highlight-start
const usePrevious = <T>(value: T): T | undefined => {
  const prevRef = useRef<T>()
  // highlight-end
  const curRef = useRef(value)
  const isInitialMount = useInitialMount()

  if (!isInitialMount && curRef.current !== value) {
    prevRef.current = curRef.current
    curRef.current = value
  }

  return prevRef.current
}
```

The `react-use` package has a similar Hook that's called [`usePreviousDistinct`](https://github.com/streamich/react-use/blob/master/docs/usePreviousDistinct.md) to distinguish itself from the basic `usePrevious` outlined in the React Hooks FAQ. It also provides a compare function which can be passed as the optional second parameter to control when the new value is different from the previous value. The default compare function is strict equality like we used above. But if the value being stored is an array or object, you'll likely want a deep-equals comparison instead.

---

## `useUniqueId`

Sometimes in React we need to create a unique ID to use an `id` for DOM elements. The ID itself doesn't really matter, but is needed for associating two elements together for accessibility purposes using [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) within a complex component.

The trick is that we don't want to generate a new ID for every render. Once we've generated an ID for the component, we want it to remain the same. Our good ol' friend [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) will come to the rescue again, and we can wrap up the logic into something easily reusable.

```js
import { useRef } from 'react'

let GLOBAL_ID = 0

const useUniqueId = () => {
  const idRef = useRef('')
  // highlight-next-line
  const isInitialMount = useInitialMount()

  // generate the ID for the first render
  // and store in the ref to remain for
  // subsequent renders
  if (isInitialMount) {
    GLOBAL_ID += 1
    idRef.current = `id${GLOBAL_ID}`
  }

  return idRef.current
}

const NavMenu = ({ items }) => {
  // highlight-next-line
  const id = useUniqueId()
  const buttonId = `${id}-button`
  const menuId = `${id}-menu`

  return (
    <>
      <button id={buttonId} aria-controls={menuId}>
        +
      </button>
      <ul id={menuId} aria-labelledby={buttonId} role="menu">
        {items.map((item) => (
          <li key={item.id}>
            <a role="menuitem" href={item.url}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </>
  )
}
```

Once again we get to use a previously created custom Hook (`useInitialMount`) to help build a new Hook.

React actually had a proposal for a built-in Hook to solve this exact problem and ensure the ID generated client-side matched the one generated server-side. It was called `useOpaqueIdentifier`. Not sure what exactly happened to it and why it hasn't been released, but I wrote about it last year in post entitled [New React useOpaqueIdentifier hook coming soon](https://www.benmvp.com/blog/new-react-use-opaque-identifier-hook-coming-soon/). Lesson learned. 😂

---

## `useIsMounted`

In my previous post on [Handling async React component effects after unmount](/blog/handling-async-react-component-effects-after-unmount/), I outline 4 ways to solve the problem where we try to update the state of a component after it has already unmounted. We prevent updating the state with the result of a `fetch` call when the response returned after the component had already been unmounted.

All the solutions resolve around keeping track of if the component is still mounted. So we created a custom Hook for it called `useIsMounted`.

```js
import { useEffect, useRef, useCallback } from 'react'

// returns a function that when called will
// return `true` if the component is mounted
const useIsMounted = () => {
  // the ref to keep track of mounted state across renders
  const mountedRef = useRef(false)

  // helper function that will return the mounted state.
  // using `useCallback` because the function will likely
  // be used in the deps array of a `useEffect` call
  const isMounted = useCallback(() => mountedRef.current, [])

  // effect sets mounted ref to `true` when run
  // and the sets to `false` during effect cleanup (i.e. unmount)
  useEffect(() => {
    mountedRef.current = true

    return () => {
      mountedRef.current = false
    }
  }, [])

  return isMounted
}

const Results = () => {
  const [items, setItems] = useState([])
  // highlight-next-line
  const isMounted = useIsMounted()

  useEffect(() => {
    fetchItems().then((newItems) => {
      // only set state if the component
      // is still mounted after receiving
      // the async data
      // highlight-next-line
      if (isMounted()) {
        setItems(newItems)
      }
    })
  }, [isMounted])

  // render UI
}
```

---

## `useMedia`

[Media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) allow us to change our UI based upon a host of media features (most commonly the size of the window). Media queries are normally used in CSS, but the [`matchMedia()` API ](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) allows us to execute media queries in JavaScript when necessary. Maybe we need to change props or render entirely different components depending on the results of a media query.

```js
import { useState, useEffect } from 'react'

const useMedia = (query) => {
  // initialize state to current match value
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches)
  // highlight-next-line
  const isMounted = useIsMounted()

  useEffect(() => {
    // highlight-next-line
    if (!isMounted()) {
      return
    }

    const mediaQueryList = window.matchMedia(query)
    const listener = () => {
      // update `matches` state whenever query match changes.
      // `isMounted()` check is for extra protection in case
      // listener somehow fires in between unmount and
      // listener removal
      // highlight-next-line
      if (isMounted()) {
        setMatches(mediaQueryList.matches)
      }
    }

    mediaQueryList.addListener(listener)

    // sync initial matches again
    setMatches(mediaQueryList.matches)

    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [query, isMounted])

  return matches
}

const Example = () => {
  // highlight-next-line
  const isSmall = useMedia('(max-width: 480px)')

  return <p>Screen is {isSmall ? 'small' : 'large'}</p>
}
```

---

## `useRafState`

There are some DOM events, like [window `resize`](https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event) or [document `scroll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event), the fire a lot. They fire much faster than the DOM can update, so if we try to update the DOM for each event, our app feels sluggish.

We can try to work around this problem by manually [debouncing](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_debounce) or [throttling](https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle) the events, but there's an interesting alternative. We can make use of [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to debounce in a different way by only setting the state on the next animation frame.

I found this `useRafState` Hook on [`react-use`](https://github.com/streamich/react-use/) and had to share it because it'll making this debouncing much easier. Its interface is identical to [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate). It wraps `useState`, only setting the state using `requestAnimationFrame`.

```js
import { useState, useCallback, useRef, useEffect } from 'react'

const useRafState = (initialState) => {
  // this is the actual state
  const [state, setState] = useState(initialState)

  // keep track of the `requestAnimationFrame` request ID
  // across renders and successive calls to `useRafState`
  const requestId = useRef(0)

  // the actual state setter we'll return.
  // using `useCallback` so that it's memoized
  // just like `setState`
  const setRafState = useCallback((value) => {
    // cancel active request before making next one.
    // this is debouncing.
    cancelAnimationFrame(requestId.current)

    // create new request to set state on animation frame
    requestId.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  // cancel any active request when component unmounts
  useEffect(() => {
    return () => cancelAnimationFrame(requestId.current)
  })

  return [state, setRafState]
}

const Example = () => {
  // highlight-next-line
  const [width, setWidth] = useRafState(0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // set initial value
    setWidth(window.innerWidth)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [setWidth])

  return <p>Window width: {width}</p>
}
```

The TypeScript for `useRafState` is a bit involved because we need to mimic all that `useState` can do. Since the state can be anything, we leverage generics once again.

```typescript
// just like with `useState`, `initialState` is either a value
// or a function that returns a value
// the type of `initialState` is generic and depends on the value
// being passed in
// highlight-next-line
const useRafState = <S>(initialState: S | (() => S)) => {
  const [state, setState] = useState(initialState)

  const requestId = useRef(0)

  // just like with `useState`, `setRafState` is a memoized function
  // that either takes a value or a function that accepts
  // the previous value and returns the next value
  // highlight-next-line
  const setRafState = useCallback((value: S | ((prevState: S) => S)) => {
    cancelAnimationFrame(requestId.current)

    requestId.current = requestAnimationFrame(() => {
      setState(value)
    })
  }, [])

  useEffect(() => {
    return () => cancelAnimationFrame(requestId.current)
  })

  // using const assertion simplifies return value type definition
  // highlight-next-line
  return [state, setRafState] as const
}
```

For more on `as const`, read [Use cases for TypeScript const assertions](/blog/use-cases-typescript-const-assertions/).

---

## `useWindowScroll`

We may need to track the scroll position of the window in order to know when to pin or unpin some sticky content on the page. And since the document `scroll` event fires often, we'll likely want to debounce updating the state. We can build `useWindowScroll` using the `useRafState` custom Hook we just implemented.

```js
import { useEffect } from 'react'

const getPos = () => ({
  x: window.scrollX,
  y: window.scrollY,
})

const useWindowScroll = () => {
  // highlight-next-line
  const [pos, setPos] = useRafState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      // `useRafState` will debounce on animation frame
      setPos(getPos())
    }

    window.addEventListener('scroll', handleScroll)

    // set initial value
    setPos(getPos())

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return pos
}

const Example = () => {
  const { x, y } = useWindowScroll()

  return (
    <p>
      Position: ({x}, {y})
    </p>
  )
}
```

---

## `useDeepCompareEffect`

Last month I wrote a post entitled [Object & array dependencies in the React useEffect Hook](/blog/object-array-dependencies-react-useEffect-hook/), which provided four strategies for optimizing `useEffect` with object or array dependencies. The basic problem is that `useEffect` uses [strict equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality) when checking if individual dependencies have changed. So objects or arrays in `useEffect` dependencies can cause unnecessary effect runs even when the objects have the same contents.

If we had a `useEffect` that instead performed a deep comparison of the objects or arrays, we wouldn't have to worry about having having them in our dependencies. So let's build one!

```js
import { useRef, useEffect } from 'react'
import isDeepEqual from 'fast-deep-equal/react'

const useDeepCompareEffect = (effect, deps) => {
  // use a ref to keep track of deps across renders
  const depsRef = useRef()

  // if the new deps don't deep equal the prev ones
  // stored in the ref, update the ref. If they *do*
  // deep equal, the ref will remain unchanged and
  // the array passed to `useEffect` will be the exact
  // same array as before so the basic strict equality
  // will work
  if (!depsRef || !isDeepEqual(depsRef.current, deps)) {
    depsRef.current = deps
  }

  useEffect(effect, depsRef.current)
}

const Team = ({ team }) => {
  const [players, setPlayers] = useState([])

  // highlight-next-line
  useDeepCompareEffect(() => {
    if (team.active) {
      getPlayers(team).then(setPlayers)
    }
  }, [team])

  return <Players team={team} players={players} />
}
```

Because the `useDeepCompareEffect` Hook is a wrapper around the basic `useEffect` Hook, it acts like a drop-in replacement for `useEffect`. Our code looks almost identical. However, we probably wouldn't want to use `useDeepCompareEffect` all the time because it's definitely slower than normal `useEffect` because of the deep comparison checks. But in spot cases, it'll definitely come in handy.

Also, if you use [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) for linting your React Hooks code (which I hope you do), you'll have to update the [`react-hooks/exhaustive-deps`](https://www.npmjs.com/package/eslint-plugin-react-hooks#advanced-configuration) rule to include `useDeepCompareEffect` in the `additionalHooks` configuration. This way you'll still be warned if you forget to list a dependency.

The implementation in TypeScript mirrors the type API of `useEffect`:

```typescript
import { useRef, useEffect, DependencyList, EffectCallback } from 'react'
import isDeepEqual from 'fast-deep-equal/react'

// highlight-start
const useDeepCompareEffect = <TDeps extends DependencyList>(
  effect: EffectCallback,
  deps: TDeps,
) => {
  const depsRef = useRef<TDeps | undefined>()
  // highlight-end

  if (!depsRef || !isDeepEqual(depsRef.current, deps)) {
    depsRef.current = deps
  }

  useEffect(effect, depsRef.current)
}
```

The `react-use` package has a similar [`useDeepCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useDeepCompareEffect.md) Hook. But its actually built on top of a [`useCustomCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useCustomCompareEffect.md) Hook that accepts any compare function that is then used for comparing the dependencies. As a result, it enables supporting [`useShallowCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useShallowCompareEffect.md) as well.

---

So that's it! 😅 There are literally an infinite number of custom Hooks that we can create. But these are 8 custom Hooks that I found especially helpful or particularly interesting.

What custom Hooks do you find yourself using all the time? I'd love to know! Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp) to let me know!

Keep learning my friends. 🤓
