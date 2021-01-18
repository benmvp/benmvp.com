---
date: 2021-12-17
title: Prettier + ESLint = ❤️
shortDescription: How to integrate Prettier into ESLint so that you'll never have to think of code formatting again!
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- 2020 wasn't the greatest, but one positive was figuring out Prettier setup
  - [`prettier-eslint`](https://github.com/prettier/prettier-eslint) just wasn't doing it for me
- prettier config
- Add to eslint (use airbnb config if you don't already have one)
  - this is the crux
  - it is an eslint rule
  - also turns off competing eslint rules
  - `--fix` formats w/ prettier!
- Editor extensions
  - VS Code prettier auto-format
    - just vomit out code and hit save and don't even think about it
    - fails to format when there's a syntax error so it's immediate feedback
  - VS Code eslint
- Git hooks
  - Husky + lint-staged

Keep learning my friends. 🤓
