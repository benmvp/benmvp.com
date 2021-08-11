---
date: 2021-12-17
title: Using require.resolve to fix PostCSS error in Next.js
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: divops
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- https://nextjs.org/docs/messages/postcss-shape
- Specifically when there's a base config in a separate package
  - Want to ensure that you're using the plugin versions that the package expects
  - Using `require()` ensures this
  - Just using the name leaves it ambiguous
- PostCSS has an seemingly undocumented feature where we can pass the full path to the plugin
  - Solves the Next.js issue (not even sure why it's a problem)
  - Solves are plugin version problem.
- Caveat
  - This works in both array & object format for Next.js
  - But for Storybook it seemed to only work in object format
