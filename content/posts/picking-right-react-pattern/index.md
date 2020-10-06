---
date: 2020-12-17
title: Picking the right React pattern
shortDescription: Advice on how to choose between hooks, render props, compound components and other React patterns
category: react
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Desires for shared components in order of least wanting to rewrite
  - UI logic
  - Visual design
  - Layout/spacing
- Available patterns for components
  - configuration props (easiest to use, easiest to develop, basic)
  - placeholder props
  - polymorphic components (`as` prop)
  - render prop (abstract UI logic & possibly layout, leave visual design & layout to user)
  - HOC (legacy, similar to render prop, can be done w/ a render prop)
  - compound components
  - hooks (mainly for non-UI logic like state management)
- Thoughts
  - use configuration props for total control
  - add placeholder props to still control layout + logic, ideally the placeholders are other components or test
  - polymorphic components (+ spread props) allows flexibility of rendered element
  - use render prop for base/abstract components for sharing UI logic but design/layout can be wildly different (button, FAB button, tab)
  - compound components for large components
    - still control UI & want to help w/ design, but layout can be very different
    - avoids having lots of pass-thru props on the main component
  - hooks can aid compound components to share logic

Keep learning my friends. 🤓
