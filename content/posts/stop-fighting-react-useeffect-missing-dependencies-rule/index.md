---
date: 2020-12-17
title: Stop fighting against the React useEffect missing dependencies rule
description: How to deal with helper functions listed as useEffect dependencies
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- `useEffect` by default runs on every re-render
  - almost never want that functionality
  - so can pass dependencies array to run on changes
  - no real concept of "on mount" w/ hooks cuz there are no lifecycle methods
- But sometimes you have helper functions that are being called
  - defined as inner functions w/in the component when they depends on props and/or state
  - seems weird to add those as, but it's important to avoid stale props/state
    - the `exhaustive-deps` eslint rule from `eslint-plugin-react-hooks` tells you that you need it
  - several fixes:
    - don't use a helper function and move all the code w/in (if only being used once)
    - move the function w/in the `useEffect` and set its scope props as dependencies (if only being used once)
    - move the function outside of the component and pass the needed params (if not using other hooks)
    - Use useCallback (least favorite option because it involves the most work)
- Also have objects being created on every render
  - if those are used in `useEffect`, it'll cause unnecessary effect calls
  - the object has changed on successive renders (just like the function)
  - several fixes:
    - serialize the object in dependencies list
    - create variables outside of `useEffect` of the object properties you need & use those in dependencies list
    - use [`useDeepCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useDeepCompareEffect.md), [`useShallowCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useShallowCompareEffect.md) or [`useCustomCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useCustomCompareEffect.md) custom hooks from `react-use`
- There are a list of hooks in `react-use` to simulate lifecycle methods if you really miss them

Keep learning my friends. 🤓
