---
date: 2021-12-17
title: Initialize Firebase Admin JS SDK from environment variables
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: template
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Answer: https://stackoverflow.com/questions/39492587/escaping-issue-with-firebase-privatekey-as-a-heroku-config-variable/41044630#41044630
- Docs: https://firebase.google.com/docs/admin/setup#initialize_the_sdk
- Guide: https://css-tricks.com/firebase-crash-course/
- To use Admin SDK need to set up a Google service account to communicate w/ firebase
  - This in itself was confusing to me the first time
- Want similar initialization setup as web SDK
- Default is to read a JSON file from file path in ENV var
  - Can do that locally but not in deployment platform (Vercel)
- Can use `credential.cert()` and pass in properties from JSON file
  - Locally use `.env.local` file
    - `dotenv` for scripts / nextJS loads those env vars automatically
  - in Vercel, add the variables individually
  - One important note is to replace the escaped newlines w/ real ones
- Next also reloads w/o restarting the server
  - Firebase complains about initializing another app
  - Storing it on global seems to fix this

Keep learning my friends. 🤓
