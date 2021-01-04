---
date: 2021-12-17
title: unknown vs any in TypeScript
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- I'm very strict when using TS
  - TS allows for mixing of JS & TS, but w/in a file I'm all or nothing
  - IMO what's the point of opting in, if you're not gonna be strict
  - I enable [`typescript-eslint/no-explicity-any`](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-explicit-any.md) eslint rule
- But there are situations where we don't know the type of the thing being passed in
- That's what generics are for
- But sometimes we have an interface that just takes an arbitrary object
  - `fetch`
  - log data
  - A generic that extends `object` is pointless
- Used to reach for `any`
- Now I use `unknown`
  - `unknown` means that the type is unknown
  - if I try to use it, it's a TS error
  - can really only pass it along or check existence
- `any` on the other hand would allow me to do anything to it, which is not what we want usually
- IMO `unknown` has better semantics
  - Says "I don't care what this is cuz I'm just a middleman"
- Whereas to me `any` says
  - I couldn't figure out how to type this
  - I was too lazy to type this

Keep learning my friends. 🤓
