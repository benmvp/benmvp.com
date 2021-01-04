---
date: 2021-01-03
title: Object & array dependencies in the React useEffect Hook
shortDescription: Four options for optimizing the useEffect Hook with object or array dependencies
category: react
tags: [react, hooks, customHooks, javascript]
hero: ./three-doors-sebastian-herrmann-AY3cdYQJ4xU-unsplash.jpg
heroAlt: Three numbered black doors
heroCredit: 'Photo by [Sebastian Herrmann](https://unsplash.com/@herrherrmann)'
---

Happy 2021! 🎉

Back in October, I gave four options for dealing with [helper functions](/blog/helper-functions-react-useeffect-hook/) listed as dependencies in the React [`useEffect` Hook](https://reactjs.org/docs/hooks-reference.html#useeffect). I promised to share other gotchas around `useEffect` dependencies in follow-up posts. So now I want to give four more options, but this time dealing with objects or arrays in dependencies.

Let's quickly recap the `useEffect` Hook in React. By default it runs on every re-render:

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

However, we rarely want this functionality because it's likely that the effect will run more times than it really needs to. The `useEffect` hook takes a second parameter, a "dependencies" array, **that will only re-run the effect when the values within the array change across re-renders**. This allows us to optimize how many times the effect is run.

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

This works perfectly fine when we're using primitive values like booleans, numbers, and strings. But complex values like objects, arrays, and functions pose a challenge because React uses "referential equality" for these complex values within the dependencies array.

React checks to see if the object in the current render points to the same object in the previous render. **The objects have to be the exact same object in order for `useEffect` to skip running the effect.** So even if the contents are the exact same, if a new object is created for the subsequent render, `useEffect` will re-run the effect.

I've already discussed dealing with [helper functions](/blog/helper-functions-react-useeffect-hook/) in the previous post, so in this post I want to focus on options we have when dealing with objects or arrays as `useEffect` dependencies.

---

## Option 1 - Depend on the pieces

In this first problem, let's say we have an object being passed in as a prop that we're also using in the dependencies list of `useEffect`.

```js
import React, { useState, useEffect } from 'react'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ team }) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // highlight-start
    if (team.active) {
      getPlayers(team.id).then(setPlayers)
      // highlight-end
    }
    // highlight-next-line
  }, [team])

  return <Players team={team} players={players} />
}
```

Ideally if the contents of the `team` prop are the same, the object reference would be the same, but unfortunately there aren't any guarantees.

However, in this flavor of the problem, we're only using a couple of properties on the `team` object. And they are properties that are primitives. So instead of having `useEffect` depend on the whole `team` object, it should only depend on the properties used within the effect.

```js
import React, { useState, useEffect } from 'react'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ team }) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (team.active) {
      getPlayers(team.id).then(setPlayers)
    }
    // highlight-next-line
  }, [team.id, team.active])

  return <Players team={team} players={players} />
}
```

Assuming that the `id` and `active` properties of the `team` object are primitives, the effect will only be run when the `id` value or the `active` state changes. The nice part is that **other data within the `team` object could change, but the effect will not be re-run** unless the `id` value or the `active` state change.

This also would work if the `team` object was created within the component:

```js
import React, { useState, useEffect } from 'react'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ id, name, active }) => {
  // construct the object from props and/or state
  // highlight-next-line
  const team = { id, name, active }
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (team.active) {
      getPlayers(team.id).then(setPlayers)
    }
  }, [team.id, team.active])

  return <Players team={team} players={players} />
}
```

Even though the `team` object is being recreated with every render of the `Team` component (which we'll see in Option 2 _can_ be a problem), it's not a problem here because again, `useEffect` is only depending on the `id` value and `active` state.

> This option of depending on the pieces likely won't be useful with arrays, as we're likely not going to use specific indices of an array with `useEffect`.

## Option 2 - Recreate the object within

So what happens if we take the last example, but instead of the effect using a couple of properties of the object, it needs the whole object (or array)?

```js
import React, { useState, useEffect } from 'react'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ id, name, active }) => {
  // construct the object from props/state
  // highlight-next-line
  const team = { id, name, active }
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (team.active) {
      // highlight-next-line
      getPlayers(team).then(setPlayers)
    }
  }, [team])

  return <Players team={team} players={players} />
}
```

Now, `getPlayers` takes the whole `team` object instead of just `team.id`. And the `team` object is being recreated for every render of the `Team` component. So even if the `id`, `name`, and `active` props are the same values, **because the actual object is new with each render, `useEffect` will run the effect every time.**

Luckily for us, the `react-hooks/exhaustive-deps` ESLint rule (part of [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks)) complains saying:

```
The 'team' object makes the dependencies of useEffect Hook
change on every render. To fix this, wrap the initialization
of 'team' in its own useMemo() Hook.
```

> By the way, if you don't have `eslint-plugin-react-hooks` as part of your ESLint setup, it's a must for developing with Hooks. It will flag so many gotchas for you.

Before we look at ESLint's suggestion of using the `useMemo` Hook (that's Option 3), I want to try something potentially simpler. We can create the `team` object twice; one to pass to `<Players />` in the UI and one to use within `useEffect`:

```js
import React, { useState, useEffect } from 'react'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ id, name, active }) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // recreate the `team` object within `useEffect`
    // from props/state
    // highlight-next-line
    const team = { id, name, active }

    if (team.active) {
      getPlayers(team).then(setPlayers)
    }
    // highlight-next-line
  }, [id, name, active])

  // highlight-next-line
  const team = { id, name, active }

  return <Players team={team} players={players} />
}
```

Now that the `team` object is created within `useEffect`, it'll only be created when the effect is run. And now that `id`, `name`, and `active` are specified as dependencies (which are primitive values), the effect will only run when their values change.

**Creating object literals is cheap, so it should be okay to duplicate the `team` object within `useEffect`.** The performance improvements we're gaining from optimizing `useEffect` far outweigh creating the two objects.

## Option 3 - Memoize the object

However, if creating the object or array is expensive, then having to create it twice may actually be worse than running the effect too many times. In this case, we need to "cache" the object or array we've created so that it'll persist across renders when its data doesn't change. This process is called "memoization" and we can use the [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo) Hook to accomplish this.

```js
import React, { useState, useEffect, useMemo } from 'react'
import { createTeam } from '../utils'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ id, name, active }) => {
  // memoize calling `createTeam` because it's
  // an expensive operation
  // highlight-start
  const team = useMemo(() => createTeam({ id, name, active }), [
    id,
    name,
    active,
  ])
  // highlight-end
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (team.active) {
      getPlayers(team).then(setPlayers)
    }
    // highlight-next-line
  }, [team])

  return <Players team={team} players={players} />
}
```

Assuming that the `createTeam()` helper is expensive, we want to call it as few times as possible. The `useMemo` Hook will only recreate the `team` object if either `id`, `name` or `active` change across renders. But if none of them change when `Team` is re-rendered, **the `team` object is the exact same object**. And because it's the same object we can safely use it within `useEffect` without running the effect too many times.

## Option 4 - Do it yourself

What happens when we're in the worst of both worlds? This is the situation where the object or array is passed in as a prop so we cannot trust its referential equality, and the effect needs to use the entire object.

```js
import React, { useState, useEffect } from 'react'
import { createTeam } from '../utils'
import { getPlayers } from '../api'
import Players from '../components/Players'

// highlight-next-line
const Team = ({ team }) => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (team.active) {
      // highlight-next-line
      getPlayers(team).then(setPlayers)
    }
    // highlight-next-line
  }, [team])

  return <Players team={team} players={players} />
}
```

The unfortunate part of this situation is that we get no warning from the `react-hooks/exhaustive-deps` ESLint rule. It doesn't know for sure that using `team` in the dependencies list is going to be bad because it doesn't know about its referential equality.

We cannot use `useMemo` from Option 3 because we don't know for certain what are the dependencies to create the `team` object. It's passed in. **But we still want to accomplish the same goal of "caching" the object's value across renders.**

Instead of using the `useMemo` Hook, we can (ab)use the `useRef` Hook.

```js
import React, { useState, useEffect, useRef } from 'react'
// highlight-next-line
import isDeepEqual from 'fast-deep-equal/react'
import { createTeam } from '../utils'
import { getPlayers } from '../api'
import Players from '../components/Players'

const Team = ({ team }) => {
  const [players, setPlayers] = useState([])
  // highlight-next-line
  const teamRef = useRef(team)

  // highlight-start
  if (!isDeepEqual(teamRef.current, team)) {
    teamRef.current = team
  }
  // highlight-end

  useEffect(() => {
    if (team.active) {
      getPlayers(team).then(setPlayers)
    }
    // highlight-next-line
  }, [teamRef.current])

  return <Players team={team} players={players} />
}
```

The mutable `teamRef` maintains its state across renders of the `Team` component. Then using [`fast-deep-equal`](https://www.npmjs.com/package/fast-deep-equal), we check to see if the new `team` prop deep equals the one maintained in the `teamRef`. **Deep equality differs from referential equality in that it will go down the tree of the object (or array) and compare each value.** So even if the `team` prop is a new object for every render of `Team`, if the contents are the same, `isDeepEqual()` will be `true`.

So when they do deep equal, `teamRef.current` will continue to point to the original `team` prop reference. And since the dependency references are the same, `useEffect` will not re-run the effect. 🤯

When `isDeepEqual` returns `false`, the new `team` prop is set as the current value of the `teamRef`. This will trigger `useEffect` to re-run the effect since the dependency reference has now changed.

The problem with this approach is that it totally confuses the `react-hooks/exhaustive-deps` ESLint rule because we are pretty much abusing it:

```
React Hook useEffect has a missing dependency: 'team'.
Either include it or remove the dependency array.
Mutable values like 'teamRef.current' aren't valid
dependencies because mutating them doesn't re-render
the component.
```

We obviously don't want to use `team` as the dependency because that's the error we're trying to avoid. If we swap in `teamRef.current` instead of `team` within the effect code:

```
React Hook useEffect has an unnecessary dependency:
'teamRef.current'. Either exclude it or remove the
dependency array. Mutable values like 'teamRef.current'
aren't valid dependencies because mutating them
doesn't re-render the component.
```

The lint rule stops complaining if the deps list is empty with the code using `teamRef.current`, but then it'll never re-run! That's now too optimized! **I try to avoid disabling the `react-hooks/exhaustive-deps` lint rule because it's really trying to save us.** But it doesn't expect refs to be used quite like how we're using it. 😄

Honestly, if you find yourself in this situation, I would suggest reaching for the [`useDeepCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useDeepCompareEffect.md) custom hook from the [`react-use`](https://www.npmjs.com/package/react-use) package of essential hooks. It's [underlying implementation](https://github.com/streamich/react-use/blob/master/src/useCustomCompareEffect.ts) also uses refs, but since it's a custom Hook, the `react-hooks/exhaustive-deps` lint rule isn't triggered. 😉

---

The majority of the time, I can solve the problem with Option 1. In fact, once I ran into this problem the first couple of times, I just implement Option 1 from the start. But when depending on the pieces doesn't work, then I'll just use a helper Hook from `react-use`.

As with everything React-related, there are always many ways to solve a problem. These are the four that I know of, but I'm curious if you've found other ways to solve this. I'm also curious if this has even been a problem for you. 😅 Either way, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp) to let me know!

Keep learning my friends. 🤓
