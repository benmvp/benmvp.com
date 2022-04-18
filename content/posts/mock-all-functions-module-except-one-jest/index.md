---
date: 2022-12-17
title: Mock all functions in a module except one in Jest
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: JavaScript
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- typically we want to mock only one (or two) functions and leave the rest as normal
- but what if we want the inverse?

```js
jest.mock('../path/to/module', () => {
  const actual = jest.requireActual('../path/to/module')

  const allMocked = jest.createMockFromModule('../path/to/module')

  return {
    __esModules: true,
    ...allMocked,
    unMockedFunc: actual.unMockedFunc,
  }
})
```
