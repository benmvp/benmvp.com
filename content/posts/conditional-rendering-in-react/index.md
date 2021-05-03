---
date: 2021-12-17
title: Conditional rendering in React
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- `&&` for only the `true` case
  - be careful of `0` (with `.length` mainly)
- ternary for both `true` & `false`
  - used to dislike this but felt better w/ Prettier formatting
- `if` statement above rendering
  - used to be the way I went before inlining
  - can be used for `true` only (initialize to `undefined`)
  - ideal for multiple cases
- helper component w/ `return null`
- no `if` construct in JSX
  - piggybacks on JavaScript
  - `createElement()` under the hood

Keep learning my friends. 🤓
