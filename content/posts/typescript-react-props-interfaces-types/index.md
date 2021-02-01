---
date: 2021-12-17
title: 'TypeScript React props: interfaces vs types'
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- More or less the same
  - 95% of the time they are interchangeable for the simple cases
  - TS says to use `interface` by default so that's what I do
- Both can define an object
- Both can extend
- Both can use generics
- Complex prop relationships will use types
  - discriminated unions
  - See other posts
- There is one little difference for each
  - interfaces cannot extend union types
  - type intersection name collisions cause problems
    - Use interface
    - Use `Omit<>`

Keep learning my friends. 🤓
