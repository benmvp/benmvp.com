---
date: 2020-12-17
title: How 4 characters can optimize your Reat function component
# description: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- most of the time you pass a primitive or prop as default value to `useState()`
- but if you need to make a function call to generate default data
  - you may not want to make that function call every re-render because it's not gonna be used
  - usually it won't affect performance unless you're doing some intense calc or I/O
- can pass a function to return the default data
  - function only gets called once
  - basically adding `() =>` creates the optimization

Keep learning my friends. 🤓
