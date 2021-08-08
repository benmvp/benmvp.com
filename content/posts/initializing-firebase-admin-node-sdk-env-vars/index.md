---
date: 2021-08-08
title: Initializing the Firebase Admin Node SDK with env vars
shortDescription: How to use environment variables to initialize the Firebase Admin Node SDK instead of the JSON file
category: divops
tags: [divops, firebase, sdk, node]
hero: ./fire-cullan-smith-BdTtvBRhOng-unsplash.jpeg
heroAlt: Fire
heroCredit: 'Photo by [Cullan Smith](https://unsplash.com/@cullansmith)'
---

The [Firebase Admin Node SDK](https://firebase.google.com/docs/admin/setup) is intended to run in a privileged environment. In my ([Next.js](https://nextjs.org/) React) web apps deployed on [Vercel](https://vercel.com/), I use the Admin SDK for scripts that import/export data as well as REST APIs that make read/write Firebase calls to accomplish a task.

In order to initialize the Admin SDK, we first need to generate a private key file from our [Google service account](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk). We'll get a JSON file containing the private key. It'll look something like this (redacted for obvious reasons):

```json
{
  "type": "service_account",
  "project_id": "[PROJECT_ID]",
  "private_key_id": "xxxx",
  // highlight-next-line
  "private_key": "-----BEGIN PRIVATE KEY-----\n[KEY_IS_HERE]\n-----END PRIVATE KEY-----\n",
  "client_email": "[CLIENT_EMAIL]",
  "client_id": "[CLIENT_ID]",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "[CLIENT_CERT_URL]"
}
```

The directions on the page where we get the JSON file containing the private key says we should initialize the Admin SDK by requiring the JSON file:

```js
const admin = require('firebase-admin')
const serviceAccount = require('path/to/serviceAccountKey.json')

admin.initializeApp({
  // doesn't work because it's a security risk to put secrets
  // in source control
  credential: admin.credential.cert(serviceAccount),
})
```

This may be fine for local development, but won't fly for Production. This assumes that the JSON file is somewhere in our source code. **But if it's in our source code, it means it's in our source control (aka git), which is a no-no for secrets like this.** The usual approach for secrets is to use [environment variables](https://vercel.com/docs/environment-variables) that are read in the code, but set separately on the server by those who have security access.

The main docs for the Admin SDK explain that we can use the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to point to where the JSON file lives on the filesystem. This changes our code to:

```js
const admin = require('firebase-admin')

admin.initializeApp({
  // doesn't work because it requires the JSON file to be
  // on the Production server
  credential: admin.credential.applicationDefault(),
})
```

The fixes the security issue because our secret isn't in code, but still leaves another issue. When using Vercel or any other hosted solution (like [Netlify](https://www.netlify.com/)), we don't have access to the Production servers. **We can't place a fixed JSON file on the hard drive.** The only way to get files onto the server is through source control, which we've already decided is a non-starter.

We really want something as straightforward and similar to how we can initialize the [Firebase JavaScript Web SDK](https://firebase.google.com/docs/web/setup).

```js
// Web SDK
import firebase from 'firebase/app'

// uses environment variables to initialize the app 👍🏾
firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
})
```

The secrets are kept in individual environment variables and bundled into the source code at build time.

It turns out that the solution for the Admin SDK is a hybrid of the original solution using `admin.credential.cert()` and what we have here for the Web SDK. **Instead of importing a JSON file from the file system to get a JavaScript object to pass to `admin.credential.cert()`, we build one ourselves from environment variables.**

```js
// Admin SDK
const admin = require('firebase-admin')

// use environment variables to initialize the app! 🎉
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // highlight-start
    // replace `\` and `n` character pairs w/ single `\n` character
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    // highlight-end
  }),
})
```

To create the environment variables, I copied the JSON field values exactly as they were. The `private_key` field has `\n` (newline) characters in it, which I copied as well. But as an environment variable string, those are read as separate `\` and `n` characters. **So we need to convert each of those 2 character pairs into a single `\n` character for the private key to be correct.**

When developing locally, we also need those environment variables defined. The most common approach is to create an `.env.local` file that has all of the environment variables listed:

```env
FIREBASE_PROJECT_ID="[PROJECT_ID]"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n[KEY_IS_HERE]\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="[CLIENT_EMAIL]"
```

Many web application frameworks already have support for `.env.*` files. But if not, we can use the [`dotenv`](https://www.npmjs.com/package/dotenv) package to read the `.env.local` file and add it to the rest of the loaded environment variables in Node. We can use the Node [`--require` (`-r`)](https://nodejs.org/api/cli.html#cli_r_require_module) command line option to [preload](https://www.npmjs.com/package/dotenv#user-content-preload) `dotenv`.

```sh
node -r dotenv/config path/to/script.js dotenv_config_path=./.env.local
```

An FYI for those using the Admin SDK specifically within Next.js for server code. When developing locally, Next reloads the new code without actually restarting the server. The code to initialize the Admin SDK is re-run and Firebase throws an error thinking we're trying to initialize another app.

```
Error: The default Firebase app already exists. This means you called initializeApp()
more than once without providing an app name as the second argument. In most cases
you only need to call initializeApp() once. But if you do want to initialize multiple
apps, pass a second argument to initializeApp() to give each app a unique name.
```

The best solution I've found is to store that default Firebase app on the `global` object and reusing it if it exists.

```js
const admin = require('firebase-admin')

const firebaseApp =
  // highlight-next-line
  global.firebaseApp ??
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  })

// highlight-start
// store on global object so we can reuse it if we attempt
// to initialize the app again
global.firebaseApp = firebaseApp
// highlight-end
```

> The `??` is the [nullish coalescing operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator) which will only call `admin.initializeApp(...)` if `global.firebaseApp` is `null` or `undefined`.

And there you have it! Now that I look at it, it seems so simple, but it took me hours to figure out sadly. 😅 The Firebase docs just didn't explain this use case and lots of googling turned up very little. I guess most uses of the Admin SDK aren't on platforms like Vercel?

If you've got any questions, comments or suggestions, shoot them my way. You can reach me over on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
