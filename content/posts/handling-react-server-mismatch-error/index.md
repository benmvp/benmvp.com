---
date: 2022-12-17
title: Handling React server mismatch error
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: Template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- Bug where client-side media query wasn't working properly w/ SSR
  - [Show code]
- Explain problem by walking through code (see PR)
  - Component that can be rendered either in CSR-only or SSR+
  - Testing `window` is a common way to tell if we're rendering in the browser or not
- Typical fix is to move all `window` stuff into `useEffect()`
  - Fixes SSR problem but results in double-rendering for CSR
  - Had a bunch of existing apps already making use of single-render
- Ideal fix: Determine in the component from React that it's hydrating
  - There actually isn't some internal React code...
  - Using internals is not good
- Workaround Fix: Using a global variable
  - Let the code know that the initial render is hydrating
  - Says the client app was SSR'd
  - Doesn't say that it's currently _being_ SSR'd
  - Using `window` cuz it's only happening in the browser
