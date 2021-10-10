---
date: 2021-12-17
title: How to extract React component logic into a custom Hook
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: react
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- How & why to extract
  - If the logic is complex/large enough I'll extract to a single-use function
  - IMO makes it easier to reason about the logic and the component separately
- Examples
  - Getting API data
  - Accessing `localStorage`
  - Event handler on the `window` or `document`
