---
date: 2020-12-17
title: Convert a nested object into a flattened array with flatMap
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: javascript
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- `Object.entries().flatMap()`
  - Using array destructuring
  - Or `Object.keys()` / `Object.values()` depend on needs
- Like doing `Object.entries().map().flat()` but more efficient
- If you nest more than once, then you need to `.flat(X)` and cant' use `.flatMap()`

Keep learning my friends. 🤓
