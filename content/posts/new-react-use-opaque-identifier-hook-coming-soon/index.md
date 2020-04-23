---
date: 2020-04-17
title: New React useOpaqueIdentifier hook coming soon
category: react
tags: [react, hooks]
hero: blue-anchor-on-wall.jpg
heroAlt: Blue anchor stenciled on the wall
heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
---

As announced by [Josh Comeau](https://twitter.com/JoshWComeau) on twitter today, React in a future version (v16.4.0 maybe?) will have a new utility hook called `useOpaqueIdentifier`:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">🌠 React is getting a new hook, `useOpaqueIdentifier`, which can be used to generate unique IDs (to be used for form labels, aria-labelledby, etc), in an SSR-safe way.<br><br>Exciting!<a href="https://t.co/UyJtle6IhY">https://t.co/UyJtle6IhY</a></p>&mdash; 💫 Josh (@JoshWComeau) <a href="https://twitter.com/JoshWComeau/status/1250843977194094592?ref_src=twsrc%5Etfw">April 16, 2020</a></blockquote>

I've always needed a safe function like this in React to auto-generate the `id` of a input field so that I can associate it with a `<label>`'s `for` attribute for accessibility and usability purposes. We _could_ use a global running counter or worse, just a random number, but with server-side rendering there was never a guarantee that the ID generated server-side would be the same when the app hydrated client-side. If there is an ID mismatch, then the UI would have to re-render.

So in theory, when the feature is stable, we would use `useOpaqueIdentifier` like so:

```js
import React, { useOpaqueIdentifier } from 'react'

const TextField = ({ value, onChange, label }) => {
  const id = useOpaqueIdentifier()

  return (
    <div className="text-field__root">
      <label htmlFor={id}>{label}</label>
      <input type="text" id={id} value={value} onChange={onChange} />
    </div>
  )
}

export default TextField
```

Until the feature is stable, it'll be accessible via `unstable_useOpaqueIdentifier` on the experimental releases of [`react`](https://www.npmjs.com/package/react):

```js
import React, { unstable_useOpaqueIdentifier } from 'react'
```

The same hook could be used to generate an ID to associate a non-`<label />` with an input using [`aria-labeledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute).

I was wondering what the "opaque" part in the name is supposed to signify. The hook was [originally named `useUniqueId`](https://github.com/facebook/react/pull/17322), which is basically how it's mainly going to be used. So I asked about it:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I don&#39;t under the &quot;opaque&quot; in the name. Read through the PR comments and it looks like <a href="https://twitter.com/sebmarkbage?ref_src=twsrc%5Etfw">@sebmarkbage</a> suggested it?</p>&mdash; Ben Ilegbodu 🏀 (@benmvp) <a href="https://twitter.com/benmvp/status/1251166898244317185?ref_src=twsrc%5Etfw">April 17, 2020</a></blockquote>

And of course Twitter came to the rescue:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">I guess the naming is a nod to opaque types in OCaml or Flow. In those languages, values of an opaque type can only be created within the module that declares the type. Outside of that module, these values can be passed around but you can only make limited assumptions about them.</p>&mdash; Marius Schulz (@mariusschulz) <a href="https://twitter.com/mariusschulz/status/1251199837506277385?ref_src=twsrc%5Etfw">April 17, 2020</a></blockquote>

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">My intuition is that `opaque` is meant to imply that you shouldn&#39;t have any assumptions about the value. Don&#39;t assume it&#39;s a specific type of value like string or number, consider it a black box.</p>&mdash; Brandon Dail (@aweary) <a href="https://twitter.com/aweary/status/1251202762836021249?ref_src=twsrc%5Etfw">April 17, 2020</a></blockquote>

I still feel that `useOpaqueIdentifier` has crossed the line into being too "technically correct" where it doesn't convey the actual use case. However, I'm still glad the feature exists! 🎉

Keep learning my friends. 🤓
