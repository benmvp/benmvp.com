---
date: 2021-02-21
title: React custom Hooks vs. Mixins
shortDescription: How Mixins are surprisingly similar to custom Hooks for sharing stateful, non-visual logic
category: React
tags: [react, hooks, mixins, HOCs, RenderProps]
hero: ./old-phone-cellphone-martin-widenka-KxZyYXULMDw-unsplash.jpg
heroAlt: Old white home telephone next to a new Android smartphone
heroCredit: 'Photo by [Martin Widenka](https://unsplash.com/@widenka)'
---

The last couple of weeks, I've been working on my latest project, [NBA Player Tiers](https://nbaplayertiers.com/) (very much still in-progress). I wrote this custom Hook to retrieve NBA player information from a [Firestore](https://firebase.google.com/products/firestore) DB. It's composed of other custom Hooks and it just makes me giddy.

```js
import { useEffect, useState } from 'react'
import { usePromise as useSafeAsync } from 'react-use'

const getAllPlayers = async () => {
  // makes a Firebase request to Firestore
  // and returns a Promise with an array
  // of Player objects
}

const usePlayers = () => {
  const safeAsync = useSafeAsync()
  const [allPlayers, setAllPlayers] = useState([])

  useEffect(() => {
    // highlight-next-line
    safeAsync(getAllPlayers()).then(setAllPlayers)
  }, [safeAsync])

  return allPlayers
}

const PlayerPicker = () => {
  // highlight-next-line
  const players = usePlayers()

  // render players UI using `players`
}
```

> The [`usePromise`](https://github.com/streamich/react-use/blob/master/docs/usePromise.md) custom Hook from [`react-use`](https://github.com/streamich/react-use) (which I've renamed to `useSafeAsync`) returns a helper function. That function takes a `Promise` and will only resolve it when the component is mounted. If the component is unmounted, the `Promise` will not resolve. It's a safer way to do async within React components. If you're interested in the rationale behind this, read my earlier post called [Handling async React component effects after unmount](/blog/handling-async-react-component-effects-after-unmount/).

This `usePlayers` custom Hook is an extraction of the Firestore side effect request and state management. I use `usePlayers()` as if it's a regular helper method but the `PlayerPicker` component will re-render when the async data returns because `usePlayers` updates the component's state.

React has always been great at sharing UIs through its component model. And we can easily reuse traditional helper functions by importing them. **But abstracting and sharing stateful, non-visual logic had always been in a challenge in React prior to custom Hooks.**

Then the other day I saw this tweet from [Mark Dalgleish](https://twitter.com/markdalgleish) that brought back nostalgia:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Whoa, remember React mixins? I forgot about that.</p>&mdash; Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/1362609665880727562?ref_src=twsrc%5Etfw">February 19, 2021</a></blockquote>

We used to share stateful, non-visual logic with Mixins. But Mixins were dropped 4 years ago with the [release of React 15.5](https://reactjs.org/blog/2017/04/07/react-v15.5.0.html) and had fallen out of favor nearly [2 years prior](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750). **It's likely that there are many React developers who don't know much about Mixins at this point.**

So I want to take a quick look walk down memory lane at Mixins to see how surprisingly similar they are to custom Hooks. Mixins just had more gnarly gotchas.

---

## Mixins

Before Hooks, React components were created using [native JavaScript classes](/blog/learning-es6-classes/). And before classes became a part of JavaScript with [ES6/ES2015](/learning-es6-series/), React had its own class system. It still exists with the [`create-react-class` package](https://reactjs.org/docs/react-without-es6.html). Mixins were plain objects that implemented React lifecycle methods and were "mixed into" a component using `React.createClass`.

Five years ago, the equivalent of the `useSafeAsync` and `usePlayers` Hooks as Mixins could've looked something like:

```js
var SafeAsyncMixin = {
  // Use `_isMounted` property to keep track
  // of mounted state
  _isMounted: false,

  componentDidMount: function () {
    this._isMounted = true
  },

  componentWillUnmount: function () {
    this._isMounted = false
  },

  // A helper method for the component to "safely"
  // update the state based on the mounted state
  // highlight-start
  safeAsync: function (promise) {
    return new Promise(function (resolve) {
      return promise.then(function (value) {
        if (this._isMounted) {
          resolve(value)
        }
      })
    })
  },
  // highlight-end
}

function getAllPlayers() {
  // makes a Firebase request to Firestore
  // and returns a Promise with an array
  // of Player objects
}

var PlayersMixin = {
  // highlight-next-line
  mixins: [SafeAsyncMixin],

  getInitialState: function () {
    return {
      // highlight-next-line
      allPlayers: [],
    }
  },

  componentDidMount: function () {
    // Use `safeAsync` method provided by `SafeAsyncMixin`
    // highlight-start
    this.safeAsync(getAllPlayers()).then(function (allPlayers) {
      return this.setState({ allPlayers: allPlayers })
    })
    // highlight-end
  },
}

var PlayerPicker = React.createClass({
  // highlight-next-line
  mixins: [PlayersMixin],

  render: function () {
    // `this.state.allPlayers` comes from
    // `PlayersMixin`
    const players = this.state.allPlayers

    // render players UI using `players`
  },
})
```

> It was a struggle forgetting all my modern JavaScript knowledge and writing this in ES5. I highly doubt I would've written the code this well 5 years ago. 😂

So Mixins worked _okay_. They specifically existed to be able to extract component logic, but they were ultimately [considered harmful](https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html). **Mixins relied heavily on indirection and implicit agreements to work, as we see above.**

The `PlayerPicker` component has an agreement with the `PlayersMixin` that it will provide the `allPlayers` state. Similarly, `PlayersMixin` expects to have the `safeAsync` helper method from `SafeAsyncMixin`. We used to define many Mixins that expected the host component to define a property or method that they would use. Without enforcement of these agreements, when a component used many Mixins, the whole system was very fragile to change.

All Mixins of a component were also playing in the same playground. **Any of the properties or methods a mixin created ultimately were properties and methods of the component.** The `PlayerPicker` component above would have the `_isMounted` property as well as the `safeAsync` helper method. So if two Mixins happened to use the same names, collisions would occur without any warning or protection. The only way to avoid collisions was to namespace everything with the mixin name to ensure that the names were unique.

But Mixins ultimately were nixed because ES6 classes didn't support them. With React 15, the React team wanted to move to using ES6 classes instead of maintaining a class system. They could piggyback on all the improvements coming to the language.

## Custom Hooks

A lot happened in the three years between React 15 with ES6 classes and React 16.8 with Hooks. We tried to repurpose [Higher-Order Components](https://ui.dev/react-higher-order-components/) (HOCs) and [Render Props](https://ui.dev/react-render-props/) to solve the problem of sharing stateful, non-visual logic. But they weren't designed to solve the problem like Mixins had been. **And Mixins and Hooks are surprisingly similar.** Let's look at the Hooks implementation again.

```js
import { useEffect, useState } from 'react'
import { usePromise as useSafeAsync } from 'react-use'

const getAllPlayers = async () => {
  // makes a Firebase request to Firestore
  // and returns a Promise with an array
  // of Player objects
}

const usePlayers = () => {
  // highlight-next-line
  const safeAsync = useSafeAsync()
  const [allPlayers, setAllPlayers] = useState([])

  useEffect(() => {
    // highlight-next-line
    safeAsync(getAllPlayers()).then(setAllPlayers)
  }, [safeAsync])

  return allPlayers
}

const PlayerPicker = () => {
  // highlight-next-line
  const players = usePlayers()

  // render players UI using `players`
}
```

The `usePlayers` Hook and the `PlayersMixins` _are_ pretty similar. In a way, **custom Hooks are Mixins done well.**

The main difference between the two is that dependencies are explicit with Hooks versus implicit with Mixins. The `allPlayers` data available in `PlayerPicker` comes from calling `usePlayers`, instead of magically being in `state` because it mixed in `PlayersMixin`. Similarly, `usePlayers` explicitly gets the `safeAsync` function from `useSafeAsync` as opposed to `PlayersMixin` implicitly receiving the `safeAsync` method from `SafeAsyncMixin`.

**Custom Hooks also are not leaky.** The `allPlayers` name that `usePlayers` uses for its state doesn't impact the `PlayerPicker` component. Hooks use the input/output interface of regular functions so that there are no name collisions.

These two key differences allow a library like [`react-use`](https://github.com/streamich/react-use) to exist because a component can confidently use many custom Hooks without worrying about how they may interact with each other. Mixins are the complete opposite. Many Mixins helped reduce code duplication but made the component increasingly more fragile.

Keep learning my friends. 🤓
