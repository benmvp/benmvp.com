---
date: 2020-12-17
title: Tooling over docs
shortDescription: Why you should prioritize building tooling to shape best practices instead of writing docs
category: DivOps
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

Keep learning my friends. 🤓

- I ❤️ docs
  - MDN docs
  - `semantic-release` docs
  - React docs
  - Storybook migration docs
- Written thousands of lines of docs outlining best practices over the years at companies
  - Newcomers or casual devs want best practices docs to help them do the right thing **before** PRs
  - They also don't wanna spend countless hours trying to figure out how to do the right thing
- But unfortunately
  - People don't read docs (myself included)
  - Best practice docs get stale quickly
    - because they are separated from actual code
    - because there's no one who's responsibility is just the docs
  - With how quickly tech changes, stale docs could be showing anti-patterns
- People think tooling is just for making their lives easier
  - Doing heavy lifting for devs
  - CRA, Netlify, Jest, etc.
- Types of tooling?
  - Generators (plop or yeoman) replace step by step set ups
- That's the main use for tooling, but it can also be a teaching tool
- Linting
  - Many lint rules aren't errors, but best practices to avoid gotchas
  - But each rule has a page explaining the rationale and the correct way
  - Imagine having to rewrite each one of those explanations in a best practices doc
  - _List out all the eslint plugins_
  - _Example or two lint rules_
- TypeScript?
- Lighthouse CI
  - Each failure directs you to more docs
- When you find yourself needing to teach or train people on best practices
  - Do live sessions
  - But consider using tooling for long-lasting info over writing docs
  - The tooling basically points back to a **shared** location of docs
