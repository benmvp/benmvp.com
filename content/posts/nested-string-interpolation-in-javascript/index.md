---
date: 2020-04-27
title: Nested string interpolation in JavaScript
description: A quick look at how nested string interpolation within template literals is possible with ES6
category: learning-es6
tags: [es6, strings, javascript, interpolation, template, literals]
hero: ./russian-nesting-dolls-blake-weyland-9hhOVsf1lpU-unsplash.jpg
heroAlt: Three assorted Russian nesting dolls
heroCredit: 'Photo by [Blake Weyland](https://unsplash.com/@blakeweyland)'
---

4.5 years ago I wrote a blog post on [template literals](/blog/learning-es6-template-literals-tagged-templates/) as part of my [Learning ES6 series](/learning-es6-series/). I went into lots of details about how template literals work, including string interpolation. Since then, I've thrown away string concatenation in favor of using string interpolation. In fact there's even a ESLint rule, [`prefer-template`](https://eslint.org/docs/rules/prefer-template), that enforces using template literals instead of string concatenation.

I've been working on updating my blog (super close to relaunch!), and I recently ran into a problem that I hadn't covered in the original blog post. It was around _nested_ template literals. Here's the example expression with string concatenation:

```js
const fullLocation = location + (venue ? ' (' + venue + ')' : '')
```

I want a string that looks like `Houston, Texas (Toyota Center)`. But if no venue is specified, then just `Houston, Texas`.

It turns out that if you want to do the same thing with template literals and string interpolation, it becomes nested interpolation:

```js
const fullLocation = `${location}${venue ? ` (${venue})` : ''}`
```

And it turns out that that Just Works™. I was afraid that the second backtick to start the nested interpolation would be parsed as the closing backtick from the beginning, but apparently once you're inside of a `${ }` expression another set of backticks can be used!

To be honest, it's a bit gnarly to read. I should probably break it up into two expressions like:

```js
const locationSuffix = venue ? ` (${venue})` : ''
const fullLocation = `${location}${locationSuffix}`
```

But it's still pretty cool to know that I've got nested string interpolation in my tool bag.

Keep learning my friends. 🤓
