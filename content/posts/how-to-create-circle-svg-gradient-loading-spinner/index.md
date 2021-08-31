---
date: 2021-12-17
title: How to create an SVG gradient loading spinner
shortDescription: How to add a gradient along an SVG circular arc path to create a loading spinner
category: svg
tags: [svg, animations]
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

```html
<svg
  width="80"
  height="80"
  viewBox="0 0 80 80"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <g stroke="#25282D" stroke-width="4">
    <path d=" M 78 40 A 38 38 0 0 1 76 52" opacity="1" stroke-linecap="round" />
    <path d=" M 76 52 A 38 38 0 0 1 71 62" opacity="0.95" />
    <path d=" M 71 62 A 38 38 0 0 1 62 71" opacity="0.90" />
    <path d=" M 62 71 A 38 38 0 0 1 52 76" opacity="0.85" />
    <path d=" M 52 76 A 38 38 0 0 1 40 78" opacity="0.80" />
    <path d=" M 40 78 A 38 38 0 0 1 28 76" opacity="0.75" />
    <path d=" M 28 76 A 38 38 0 0 1 18 71" opacity="0.70" />
    <path d=" M 18 71 A 38 38 0 0 1 9 62" opacity="0.65" />
    <path d=" M 9 62 A 38 38 0 0 1 4 52" opacity="0.60" />
    <path d=" M 4 52 A 38 38 0 0 1 2 40" opacity="0.55" />
    <path d=" M 2 40 A 38 38 0 0 1 4 28" opacity="0.50" />
    <path d=" M 4 28 A 38 38 0 0 1 9 18" opacity="0.45" />
    <path d=" M 9 18 A 38 38 0 0 1 18 9" opacity="0.40" />
    <path d=" M 18 9 A 38 38 0 0 1 28 4" opacity="0.35" />
    <path d=" M 28 4 A 38 38 0 0 1 40 2" opacity="0.30" />
    <path d=" M 40 2 A 38 38 0 0 1 52 4" opacity="0.25" />
    <path d=" M 52 4 A 38 38 0 0 1 62 9" opacity="0.20" />
    <path d=" M 62 9 A 38 38 0 0 1 71 18" opacity="0.15" />
    <path d=" M 71 18 A 38 38 0 0 1 76 28" opacity="0.10" />
    <path d=" M 76 28 A 38 38 0 0 1 78 40" opacity="0.05" />
  </g>

  <animateTransform
    from="0 0 0"
    to="360 0 0"
    attributeName="transform"
    type="rotate"
    repeatCount="indefinite"
    dur="0"
  ></animateTransform>
</svg>
```

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
