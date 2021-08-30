---
date: 2021-12-17
title: How to create an SVG gradient loading spinner
shortDescription: How to add a gradient along an SVG circular arc path to create a loading spinner
category: svg
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- Wanted to create a loading spinner component in React that looked like...
- Here is the solution if you want to get an answer and go 😉
  - Explanation & journey is below
- Linear gradient + circle doesn't work because top & bottom have the same color
- Radial gradient + circle doesn't work because edges (where circle is) are the same color
- Searched around, but all StackOverflows said it wasn't possible
  - SVG doesn't support "angular (conical) gradients")
- Suggestion was to dice up the circle into many segments
  - I made each segment a smaller opacity
  - I tried dividing into 20 segments but the seams were obvious
  - Any more segments and the SVG size would explode. A lot of markup for something so tiny
  - http://xahlee.info/js/svg_circle_arc.html
- Stumbled upon a CodePen that had a loading indicator that was kind of what I wanted
  - https://codepen.io/ionic/pen/GgwVON
  - Only the tail was a gradient
  - When I inspected the code, I noticed they **did** use a linear gradient but just on the tail portion of the arc
  - Show example of semicircle with gradient
- So what if I applied the same logic...
  - Split the circle into two semicircles and add linear gradients to both!
- You may notice that the intended design has a round line-cap
  - https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap
  - However, it applies to both ends, so when I add it to the first half we can see it on both ends because of the opacity compositing
  - Googled how to add a stroke-linecap at one end only
  - It's not possible an SO answer suggested putting two lines on top of each other
  - https://stackoverflow.com/questions/46593502/svg-stroke-linecap-at-one-end-only
  - So my solution is to add a 3rd path that's only 1 degree of arc, but has the line cap
  - It's short enough that the other end's line-cap isn't visible
