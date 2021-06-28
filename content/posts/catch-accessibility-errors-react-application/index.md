---
date: 2021-12-17
title: Catch accessibility errors in a React application
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: divops
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- React has got a bad wrap about creating inaccessible apps
  - I've seen people ask if React itself is inaccessible
  - Not sure, but I don't think inaccessible apps is unique to React
- I think all JS frameworks have this problem
  - They make it easier to build interactivity
  - And unless you know the rules, you can build interactivity inaccessibly
  - We should always be creating semantic UIs
- There is tooling to help catch accessibility issues in React apps automatically
  - At all layers of validation
- `jest-axe` (unit tests)
- `@storybook/addon-a11y` (storybook)
- `eslint-plugin-react-a11y` (eslint)
- lighthouse-cli (e2e)
- nothing replaces learning and testing the UI yourself
  - keyboard navigation
  - focus states
