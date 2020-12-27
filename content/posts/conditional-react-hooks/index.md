---
date: 2020-12-27
title: Conditional React Hooks
shortDescription: How to conditionally call a React Hook while still calling Hooks at the top level
category: react
tags: [react, hooks]
hero: ./wrapping-paper-hello-sunday-nIV5aY7JOBk-unsplash.jpg
heroAlt: An assorted collection of wrapping paper
heroCredit: 'Photo by [Hello Sunday](https://unsplash.com/@hello_sunday)'
---

Hooks launched in React with [v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html) nearly 2 years ago, enabling us to use state and other React features without writing a class. After getting a handle of Hooks, I've found Hooks-based components to be more approachable than their class-based counterparts. This has been the same in my minishops as well. Those taking the [Zero to React with Hooks Minishop](/minishops/zero-to-react-with-hooks/) seem to pick up Hooks faster than those in the [Migrating to React Hooks Minishop](/minishops/migrating-to-react-hooks/).

But no matter how good an abstraction is, there are always [abstraction leaks](https://en.wikipedia.org/wiki/Leaky_abstraction) and it's no different with React Hooks. I alluded to one in my post on dealing with [helper functions in the `useEffect` Hook](/blog/helper-functions-react-useeffect-hook/). Another one of those leaks is that **we can only call Hooks at the top level of our React function components**.

We can't call Hooks inside of conditionals, loops, or nested functions in order to ensure that Hooks are called in the same order each time a component renders. The order is important for how React [associates Hook calls](https://reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) with components. So if we conditionally render a hook, for instance, **the order of the Hooks could change between renders of a component**, completely messing up the Hooks system.

Sometimes, though, despite the rules, we do want to conditionally call a React Hook. Let's learn how to be rule breakers. 😎

---

Let's say we're using the awesome [`react-use`](https://github.com/streamich/react-use) collection of React Hooks in our app. And we want to use the [`useClickAway`](https://github.com/streamich/react-use/blob/master/docs/useClickAway.md) Hook in order to hide an overlay when the user clicks outside of its container.

```js
const Overlay = ({ show, children, onClose }) => {
  if (!show) {
    return null
  }

  const rootRef = useRef(null)

  useClickAway(rootRef, () => {
    console.log('clicked outside')
    onClose()
  })

  return (
    <div ref={rootRef}>
      {children}
      <CloseButton onClick={onClose} />
    </div>
  )
}
```

This code is actually incorrect. Can you spot the problem? It seems perfectly fine because the `useRef` and `useClickAway` are called at the top level, but it still breaks that rule of Hooks. With the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) set up in our [ESLint](https://eslint.org/) configuration, we're warned of the error by the `react-hooks/rules-of-hooks` ESLint rule:

```
React Hook "useClickAway" is called conditionally. React Hooks must be called
in the exact same order in every component render. Did you accidentally
call a React Hook after an early return?
```

Thanks ESLint! Although the Hooks are called at the top level, they are still conditionally called because they won't be called if the `show` prop is `false`.

So how do we solve this problem? How can we avoid breaking Hooks yet make our `Overlay` component as it should?

## Call but ignore

One way to work around the rule is to use what I call the "call but ignore" approach. With this workaround, we always call the Hook, but we do nothing with it.

```js
const Overlay = ({ show, children, onClose }) => {
  const rootRef = useRef(null)

  // `useClickAway` is always called, but we ignore
  // the callback function
  useClickAway(rootRef, () => {
    if (show) {
      console.log('clicked outside')
      onClose()
    }
  })

  // early return moves to after Hook calls
  if (!show) {
    return null
  }

  return (
    <div ref={rootRef}>
      {children}
      <CloseButton onClick={onClose} />
    </div>
  )
}
```

This looks pretty similar to the original code, except we always call the Hooks now. The "early return" is not so early. 😂 The `rootRef` will always get created, but will never be attached to any DOM. And then within `useClickAway`, instead of always calling `onClose`, we only call `onClose` when the `show` prop is `true` just to make doubly sure.

This works, and is usually the simplest approach, but it can be wasteful. Creating a bunch of refs with `useRef` is likely not that big of a deal, but calling `useClickAway` unnecessarily is more so. The [implementation](https://github.com/streamich/react-use/blob/master/src/useClickAway.ts) of `useClickAway` adds `mousedown` and `touchstart` events to the `document`, which now are **getting added whether or not the `Overlay` is being shown**.

The "call but ignore" approach doesn't always work either. Let's say we're using the [`useTitle`](https://github.com/streamich/react-use/blob/master/docs/useTitle.md) Hook from `react-use`. It's a side-effect hook that sets the title of the page (aka `document.title`). But we **do not** want it to set the page title when the value is `null` or `undefined`:

```js
const Example = ({ team }) => {
  if (team.name !== null && team.name !== undefined) {
    useTitle(team.name)
  }

  return (
    <section>
      <h1>{team.name}</h1>
      { ... }
    </section>
  )
}
```

This is a more obvious conditional call of a Hook, but there's no clear way to use the "call but ignore" approach, because there's nothing to ignore. We'd have to implement our own [`useTitle`](https://github.com/streamich/react-use/blob/master/src/useTitle.ts) Hook in order to get it to ignore `null` and `undefined` values.

## Renderless component wrapper

When the "call but ignore" workaround doesn't work, we can use the "renderless" component wrapper workaround. **We wrap our Hook with a component interface and then conditionally render _the component_**. This requires more work, but on the flip side it always should work.

So for our `useClickAway` Hook, we can create a `ClickAway` component that renders nothing, and we then conditionally render it:

```js
const ClickAway = ({ ref, onClickAway }) => {
  useClickAway(ref, onClickAway)

  // highlight-next-line
  return null
}

const Overlay = ({ show, children, onClose }) => {
  const rootRef = useRef(null)

  if (!show) {
    return null
  }

  return (
    <div ref={rootRef}>
      <ClickAway
        ref={rootRef}
        onClickAway={() => {
          console.log('clicked outside')
          onClose()
        }}
      />
      {children}
      <CloseButton onClick={onClose} />
    </div>
  )
}
```

Now, instead of trying to conditionally call the `useClickAway` Hook, we're conditionally rendering the `<ClickAway>` component, and there is no rule against that. The `ClickAway` component itself _always_ calls `useClickAway`, but since it is being conditionally rendered within `Overlay`, **`useClickAway` is indirectly conditionally called!** 🎉 In this case, the `ClickAway` component's props match the arguments that the `useClickAway` Hook accepts.

To conditionally call the `useTitle` Hook, we can take a similar approach:

```js
const PageTitle = ({ title }) => {
  useTitle(title)

  // highlight-next-line
  return null
}

const Example = ({ team }) => {
  return (
    <section>
      {team.name ?? <PageTitle title={team.name} />}
      <h1>{team.name}</h1>
      { ... }
    </section>
  )
}
```

So again, the `PageTitle` component is a "renderless" component by returning `null`. And it only calls the `useTitle` Hook with the `title` prop. And now that `Example` has a component to work with, it can conditionally render `<PageTitle>` based on `team.name` not being `null` or `undefined` (making use of [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) by the way).

How about one more example before we wrap up? Both the `useClickAway` and `useTitle` Hooks don't return any data so their "renderless" component wrappers have rather simple interfaces. However, **if you have a Hook that returns data AND you still want to conditionally render it**, your component wrapper will still be "renderless," but in a slightly different way.

Let's say we're using the [`useWindowScroll`](https://github.com/streamich/react-use/blob/master/docs/useWindowScroll.md) Hook to display a "back to top" button if the user has scrolled down the page enough. And like the others, this functionality is conditional based on a prop. We'll have to turn our "renderless" component wrapper into a component with [render prop](https://ui.dev/react-render-props/):

```js
const WindowScroll = ({ children }) => {
  const { x, y } = useWindowScroll()

  // highlight-next-line
  return <>{children({ x, y })}</>
}

const Page = ({ showBackToTop }) => {
  return (
    <div>
      {showBackToTop && (
        <WindowScroll>
          {(pos) => {
            const shouldShow = pos.y > 250

            return (
              <button className={shouldShow ? 'sticky' : 'hidden'}>
                Back to top
              </button>
            )
          }}
        </WindowScroll>
      )}

      <main>
        {...}
      </main>
    </div>
  )
}
```

The `WindowScroll` component provides a `children` render prop that will contain the `x` & `y` coordinates of the `window` that it gets from `useWindowScroll`. Instead of returning `null` to be "renderless", it renders the UI returned by the `children` render prop. In this example, that UI is the "back to top" button. But the entire `<WindowScroll>` component is conditionally rendered based on the `showBackToTop` prop. So we are once again successfully able to conditionally call the `useWindowScroll` Hook through the `WindowScroll` component.

---

Honestly, I don't often need to call Hooks conditionally, especially Hooks that return data. However, when that need does arise, having these two workarounds in my tool belt helps me push past my temporary frustration with the Hooks abstraction. Then I return to enjoying Hooks again. 🤗

These are the two approaches that I've found to solve the conditional Hooks problem. But I'm curious if there are other ways to work around the issue. If you have your own, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp) and let me know!

Keep learning my friends. 🤓
