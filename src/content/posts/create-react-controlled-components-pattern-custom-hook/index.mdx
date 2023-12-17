---
date: 2021-06-13
title: Creating a React controlled components pattern custom Hook
shortDescription: How to create a custom React Hook that allows components to be both controlled and uncontrolled just like form elements
category: React
tags: [react, hooks, controlled, components, pattern]
hero: ./cockpit-controls-mael-balland-V5hAryReZzo-unsplash.jpeg
heroAlt: Gray and black airplane control panel
heroCredit: 'Photo by [Mael BALLAND](https://unsplash.com/@mael_balland)'
---

Two weeks ago I wrote about [picking the right React component pattern](/blog/picking-right-react-component-pattern/) for shared components that we build. One of the patterns I discussed was the controlled components pattern that makes our custom component act much like [controlled HTML form elements](https://fb.me/react-controlled-components).

I showed this snippet of code for a `Pagination` component that either wants to be an uncontrolled or controlled component depending on what props the parent passes.

```js
import { useState } from 'react'

const Pagination = ({
  // `initialPage` is when it's uncontrolled
  initialPage = 1,

  // `page` & `onPageChange` are when it's controlled by parent
  // highlight-start
  page: controlledPage,
  onPageChange,
  // highlight-end
}) => {
  // highlight-start
  const isControlled = controlledPage !== undefined
  const [pageState, setPage] = useState(initialPage)

  // when `page` prop is specified, the component is controlled by parent
  // otherwise it's uncontrolled so use internal `pageState`
  const page = isControlled ? controlledPage : pageState

  const setNewPage = (nextPage) => {
    // only set internal state if `Pagination` is uncontrolled
    if (!isControlled) {
      setPage(nextPage)
    }

    // call `onPageChange` if it exists using optional chaining
    onPageChange?.(nextPage)
  }
  // highlight-end

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setNewPage(page - 1)}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setNewPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
```

The `Pagination` component now maintains the internal state when it is uncontrolled, but doesn't use it when it is controlled (i.e. the `page` prop is specified). **But the code to support the controlled components pattern muddies up the `Pagination`.** This is a perfect time to extract the logic into a [custom Hook](https://reactjs.org/docs/hooks-custom.html) to not only clean up the `Pagination` component, but also reuse the logic elsewhere.

I stumbled across a `useControlled` custom Hook while code spelunking in the [`material-ui` codebase](https://github.com/mui-org/material-ui). Here is an adaptation of the implementation:

```js
// hooks.js

import { useState, useEffect, useRef, useCallback } from 'react'

const useControlled = ({ controlledValue, initialValue, name }) => {
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  const value = origIsControlled ? controlledValue : internalValue

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (origIsControlled !== isControlled) {
        console.warn(
          `"${name}" is changed from ${
            origIsControlled
              ? 'uncontrolled to controlled'
              : 'controlled to uncontrolled'
          }.`,
        )
      }
    }
  }, [origIsControlled, isControlled, name])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!origIsControlled && origInitialValue !== initialValue) {
        console.warn(
          `"${name}" is changing its defaultValue after being initialized. Make "${name}" a controlled component instead.`,
        )
      }
    }
  }, [origInitialValue, initialValue, name, origIsControlled])

  const setValueIfUncontrolled = useCallback(
    (newValue) => {
      if (!origIsControlled) {
        setInternalValue(newValue)
      }
    },
    [origIsControlled],
  )

  return [value, setValueIfUncontrolled]
}
```

Don't worry too much about the length of the code. Over half of it is helpful warning messages. So what I want to do is break down this custom Hook to explain how it composes 6 built-in Hooks to provide the controlled component pattern.

Before we begin the walk-through, this is how we'd use the `useControlled` custom Hook in our `Pagination` component:

```js
import { useControlled } from './hooks'

const Pagination = ({
  initialPage = 1,
  page: controlledPage,
  onPageChange,
}) => {
  // highlight-start
  const [page, setPage] = useControlled({
    controlledValue: controlledPage,
    initialValue: initialPage,
    name: 'Pagination.page',
  })
  // highlight-end

  const setNewPage = (nextPage) => {
    // highlight-next-line
    setPage(nextPage)
    onPageChange?.(nextPage)
  }

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setNewPage(page - 1)}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setNewPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
```

It's a lot simpler, right? `Pagination` can return to focusing on the UX, not all of the state management. The `useControlled` Hook now handles all of that. `Pagination` receives the `page` state and update function (`setPage`) much like what we would get from [`useState`](https://reactjs.org/docs/hooks-reference.html#usestate).

Let's dive in.

---

```js
const useControlled = ({ controlledValue, initialValue, name }) => {
  // implementation...
}
```

First is the API. It takes an object with 3 properties. The `controlledValue` is the value that's passed as the component's `value` prop, making it a controlled component. The `initialValue` is the default value that's passed as the component's `initialValue` prop, making it an uncontrolled component. Lastly the `name` is a unique name that's just used in displaying warnings.

```js
const useControlled = ({ controlledValue, initialValue, name }) => {
  // highlight-start
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  const value = origIsControlled ? controlledValue : internalValue
  // highlight-end

  // remaining implementation...
}
```

First we calculate whether or not the component is controlled by checking to see if the `controlledValue` has been defined (`isControlled`). We store this in a ref so that we can keep track of the original controlled state (`origIsControlled`) in order to warn if it changes over time with new re-renders. **The value of the `origIsControlled` ref is only set on the initial render.** In subsequent re-renders, the [`useRef`](https://reactjs.org/docs/hooks-reference.html#useref) value doesn't update.

The internal value (`internalValue`) is the same `useState` call from before initialized by the `initialValue`. We store this in a ref as well (`origInitialValue`) so we can warn if it changes over time too. **The actual `value` is based upon whether or not the component is controlled.** If it's controlled (`originIsControlled` is `true`), then we'll use the `controlledValue`. Otherwise, we use the internally maintained value (`internalValue`).

```js
const useControlled = ({ controlledValue, initialValue, name }) => {
  // highlight-start
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  // highlight-end
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  const value = origIsControlled ? controlledValue : internalValue

  // highlight-start
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (origIsControlled !== isControlled) {
        console.warn(
          `"${name}" is changed from ${
            origIsControlled
              ? 'uncontrolled to controlled'
              : 'controlled to uncontrolled'
          }.`,
        )
      }
    }
  }, [origIsControlled, isControlled, name])
  // highlight-end

  // remaining implementation...
}
```

If the `controlledValue` initially was `undefined` (i.e. uncontrolled) and now has a value (aka controlled), that's a problem and likely a developer mistake. It's the same in reverse as well. So we compare the controlled state for this render (`isControlled`) with the original one stored in the ref (`origIsControlled`) to see if it's changed. If it has, we need to warn the developer of the issue **as long as this isn't a production build**.

```js
const useControlled = ({ controlledValue, initialValue, name }) => {
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  // highlight-start
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  // highlight-end
  const value = origIsControlled ? controlledValue : internalValue

  // controlled <-> uncontrolled warning

  // highlight-start
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!origIsControlled && origInitialValue !== initialValue) {
        console.warn(
          `"${name}" is changing its defaultValue after being initialized. Make "${name}" a controlled component instead.`,
        )
      }
    }
  }, [origInitialValue, initialValue, name, origIsControlled])
  // highlight-end

  // remaining implementation...
}
```

The second warning guards against the `initialValue` changing across re-renders when the component is uncontrolled. This also likely is a developer error. It's less of a problem than switching from controlled to uncontrolled (or vice versa). The `initialValue` changing will have no effect. But if the developer was trying to change the `initialValue`, they likely intended for the component to be controlled.

```js
const useControlled = ({ controlledValue, initialValue, name }) => {
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  // highlight-next-line
  const value = origIsControlled ? controlledValue : internalValue

  // controlled <-> uncontrolled warning
  // `initialValue` change warning

  // highlight-start
  const setValueIfUncontrolled = useCallback(
    (newValue) => {
      if (!origIsControlled) {
        setInternalValue(newValue)
      }
    },
    [origIsControlled],
  )

  return [value, setValueIfUncontrolled]
  // highlight-end
}
```

As we saw in the use of `useControlled` in `Pagination`, it needs to return the controlled or uncontrolled `value` and an update function as an array tuple. **However, the function doesn't always update the internal state.** We only want to update `internalValue` when the component was originally set up to be uncontrolled (`origIsControlled` is `false`). Remember, when the component is controlled, the parent is passing the value so the component shouldn't maintain the state.

> By using the [`useCallback` Hook](https://reactjs.org/docs/hooks-reference.html#usecallback), we ensure that we're passing back a stable function. The parent component can include it in the dependencies of a [`useEffect` Hook](https://reactjs.org/docs/hooks-reference.html#useeffect) without causing unnecessary re-renders. To understand more about this problem, read my previous post on [Helper functions in the React `useEffect` hook](/blog/helper-functions-react-useeffect-hook/).

---

Here's the slimmed down implementation without any of the warnings:

```js
// hooks.js
import { useState, useCallback } from 'react'

const useControlled = ({ controlledValue, initialValue, name }) => {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(initialValue)
  const value = origIsControlled ? controlledValue : internalValue

  const setValueIfUncontrolled = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
    },
    [isControlled],
  )

  return [value, setValueIfUncontrolled]
}
```

It's actually quite short. But those warnings are very helpful. And if you're like me and do all of your development in TypeScript, I've got you covered too.

```typescript
// hooks.ts
import { useState, useEffect, useRef, useCallback } from 'react'

type UseControlledConfig<Value> = {
  controlledValue?: Value
  initialValue?: Value
  name: string
}

const useControlled = <Value>({
  controlledValue,
  initialValue,
  name,
}: UseControlledConfig<Value>) => {
  const isControlled = controlledValue !== undefined
  const { current: origIsControlled } = useRef(isControlled)
  const [internalValue, setInternalValue] = useState(initialValue)
  const { current: origInitialValue } = useRef(initialValue)
  const value = origIsControlled ? controlledValue : internalValue

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (origIsControlled !== isControlled) {
        console.warn(
          `"${name}" is changed from ${
            origIsControlled
              ? 'uncontrolled to controlled'
              : 'controlled to uncontrolled'
          }.`,
        )
      }
    }
  }, [origIsControlled, isControlled, name])

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (!origIsControlled && origInitialValue !== initialValue) {
        console.warn(
          `"${name}" is changing its defaultValue after being initialized. Make "${name}" a controlled component instead.`,
        )
      }
    }
  }, [origInitialValue, initialValue, name, origIsControlled])

  const setValueIfUncontrolled = useCallback(
    (newValue: Value) => {
      if (!origIsControlled) {
        setInternalValue(newValue)
      }
    },
    [origIsControlled],
  )

  return [value, setValueIfUncontrolled] as const
}
```

As you can see, the TypeScript version isn't _that_ much different from the vanilla JavaScript one. We need the types for the function's API. Other than that, [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) takes over. In TypeScript, `useControlled` is a [generic function](https://www.typescriptlang.org/docs/handbook/2/functions.html#generic-functions) so that the types of `controlledValue` and `initialValue` can be flexible.

> Curious about the `as const` part of the `return` statement? It's a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions). Read my previous post [Use cases for TypeScript const assertions](/blog/use-cases-typescript-const-assertions/) to learn more.

---

And that's all folks! I really like taking apart React custom Hooks because it helps me understand the built-in Hooks better, especially the advanced ones (like `useRef` or `useCallback`). Custom Hooks give me ideas for more scenarios in which I can leverage the built-in ones.

Typically I need a shared component to be **only controlled** or **only uncontrolled**, not both. But when I do need it to be both, I use the controlled components pattern and this custom Hook. Have you had a case for using the controlled components pattern? Have you had to build components using it? I'd love to hear about it! Feel free to hit me up on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
