---
date: 2020-12-17
title: Stop fighting against the React useEffect missing dependencies rule
# description: Some reasons why I choose React Testing Library over Enzyme for testing React components
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
- But some times you have helper functions that are being called
  - defined as inner functions w/in the component
  - seems weird to add those, but it's important
  - several fixes:
    - move the function outside of the component and pass the needed params
    - move the function w/in the `useEffect` and set its scope props as dependencies
    - don't use a helper function and move all the code w/in
- Also have objects being created on every render
  - if those are used in `useEffect`, it'll cause unnecessary effect calls
  - the object has changed on successive renders (just like the function)
  - several fixes:
    - serialize the object in dependencies list
    - create variables outside of `useEffect` of the object properties you need & use those in dependencies list
- There are a list of hooks in `react-use` to simulate lifecycle methods if you really miss them

Keep learning my friends. 🤓
