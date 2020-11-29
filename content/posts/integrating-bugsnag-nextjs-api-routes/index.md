---
date: 2020-12-17
title: Integrating Bugsnag in Next.js API routes
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Bugsnag's JS package supports all sorts of JS envs
  - But that poses a challenge cuz each env is its own snowflake for setting up
- Wrote about Gatsby + Netlify before
  - This time Next.js + Vercel
- Got the client-side code done
  - Example
- Next is also server-side, specifically the serverless API routes
  - Need to catch errors there (even though using TS)
- Next uses context (similar to express)
  - Abstracts a lot away and just exposes a handler function w/ `req` & `res`
  - No great place for middleware
  - `@bugsnag/plugin-express` can be used but expects typical middleware setup
- Using the next docs example for using middleware, here's what the code would look like
  - Pretty messy and would be terrible to have to dupe for each API route
- Created an abstraction in a separate file
- Integrated it w/ client-side code
  - Not sure if it's okay to setup Bugsnag w/ both plugins
- I use TS so here's the final code in TS

Keep learning my friends. 🤓
