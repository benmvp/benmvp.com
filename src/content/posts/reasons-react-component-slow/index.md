---
date: 2022-12-17
title: X reasons why your React component is slow
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: React
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- React is _fast_ because of reconciliation
  - so usually optimizing isn't necessary
  - but only so much it can do
  - so if our apps are slow, it's likely cause we're making it work more than needed
- huge components
- passing object/array literals as props
- anonymous function props
- missing useEffect deps
- object useEffect deps
- array useEffect deps
- storing state in DOM
- rendering too much DOM
- expensive `useState` initialize (see other post)

Keep learning my friends. 🤓
