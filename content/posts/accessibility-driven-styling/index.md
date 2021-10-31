---
date: 2020-12-17
title: Accessibility-driven styling
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: React
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Previous post about design systems talked about wanting to maintain consistency
  - One way is through a style system if UI tech isn't the same
  - At SFIX we've got Rails & React
- Style system is SASS mixins (clever!)
  - Downside of style systems (like Bootstrap & Foundation) is that the HTML (and JS is left to dev)
  - Additional downside w/ mixins is that they work best w/ single element
- Example: text field
  - the input, a label and a (error) message
  - we had to put the label after for the mixin to work
- How do you handle states?
  - Hover and focus states are easy because of pseudo classes
  - What about an error state?
  - Would be easy in React, just add a class when that state happens
  - But what about mixins?
  - Use ARIA attribute for the styling, which enforces devs to have proper accessibility to get visual effects

Keep learning my friends. 🤓
