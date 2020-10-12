---
date: 2020-12-17
title: Object dependencies in React useEffect hook
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Also have objects being created on every render
  - if those are used in `useEffect`, it'll cause unnecessary effect calls
  - the object has changed on successive renders (just like the function)
  - several fixes:
    - serialize the object in dependencies list
    - create variables outside of `useEffect` of the object properties you need & use those in dependencies list
    - use [`useDeepCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useDeepCompareEffect.md), [`useShallowCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useShallowCompareEffect.md) or [`useCustomCompareEffect`](https://github.com/streamich/react-use/blob/master/docs/useCustomCompareEffect.md) custom hooks from `react-use`
- There are a list of hooks in `react-use` to simulate lifecycle methods if you really miss them

Keep learning my friends. 🤓
