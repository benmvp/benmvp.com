---
date: 2021-03-07
title: Auto-generate React PropTypes from TypeScript components
shortDescription: A helper to convert TypeScript types for a React component library into PropTypes for legacy JavaScript apps
category: DivOps
tags: [react, typescript, designSystem]
hero: ./volvo-interior-markus-spiske-9vA4T6GBZAk-unsplash.jpg
heroAlt: Interior of an old school Volvo
heroCredit: 'Photo by [Markus Spiske](https://unsplash.com/@markusspiske)'
---

One of the reasons I enjoy writing React in TypeScript is using static types for component props. In addition to defining the [basic types](/blog/react-prop-types-with-typescript/), we can also define more complex situations like [conditional props](/blog/conditional-react-props-typescript/), [polymorphic components](/blog/polymorphic-react-components-typescript/), and [generic components](/blog/generic-react-components-typescript/). If an app uses a component incorrectly, the app will fail to type check until the code is fixed. The best part is that we can find these issues statically (potentially within our editor), without having to use the app.

React [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html), on the other hand, are run-time checks which require us to run the app either in the browser or in unit tests. In a TypeScript app, PropTypes aren't really necessary. However, **a shareable component library written in TypeScript may need PropTypes if some of its consuming apps are still written in vanilla JavaScript**.

So here is a helper function that:

- Given a generated TypeScript definition file (`*.d.ts`) for a component
- And given the component's generated/transpiled JavaScript file
- Adds React PropTypes to the JavaScript file based on those TypeScript definitions

```typescript
import { readFile, writeFile } from 'fs-extra'
import {
  loadConfig,
  createProgram,
  parseFromProgram,
  inject,
} from 'typescript-to-proptypes'

const TS_CONFIG = loadConfig(/* path to tsconfig.json */)

type Result = 'success' | 'failed' | 'not-component'

interface Options {
  tsDefFilePath: string
  jsFilePath: string
  tsProgram: ReturnType<typeof createProgram> // 👈🏾 TS utility type
}

const generatePropTypes = async ({
  tsDefFilePath,
  jsFilePath,
  tsProgram,
}: Options): Promise<Result> => {
  // `parseFromProgram` retrieves the TS defs for the props,
  // and returns an AST representation of the React Prop Types
  const propTypesAST = parseFromProgram(tsDefFilePath, tsProgram, {
    checkDeclarations: true,
  })

  // if the AST is empty, there are no prop types,
  // which must mean it's not a component
  if (!propTypes.body.length) {
    return 'not-component'
  }

  const jsFileContent = await readFile(jsFilePath, 'utf8')

  // `inject` parses the JS file into an AST & inserts
  // the PropTypes AST based on specified options
  const jsFileContentWithPropTypes = inject(propTypesAST, jsFileContent, {
    removeExistingPropTypes: true,
    babelOptions: {
      filename: jsFilePath,
    },
    comment: `
=============== WARNING ================
| These PropTypes are auto-generated   |
| from the TypeScript type definitions |
========================================
    `,
    reconcilePropTypes: (prop, previous, generated) => {
      if (previous !== undefined) {
        const usedCustomValidator = !previous.startsWith('PropTypes')
        const ignoreGenerated = previous.startsWith(
          'PropTypes /* @typescript-to-proptypes-ignore */',
        )

        if (usedCustomValidator || ignoreGenerated) {
          return previous
        }
      }

      return generated
    },

    // include prop type if it's the children prop or if it has a
    // jsDoc description. this helps avoid pulling in prop types
    // for components inheriting base elements like `<a>` or `<input>`
    shouldInclude: ({ prop }) => prop.name === 'children' || !!prop.jsDoc,
  })

  if (!jsFileContentWithPropTypes) {
    return 'failed'
  }

  // OPTIONAL: Use prettier on `jsFileContentWithPropTypes`

  await writeFile(jsFilePath, jsFileContentWithPropTypes)

  return 'success'
}

// `createProgram` comes from the TS Compile API
// create a program passing an array of all the `.d.ts` files for components
// const program = createProgram(tsDefFilePaths, TS_CONFIG)

// The function also assumes that the JS files for the components have
// already been generated/transpiled. Depending on your setup, you would
// use the `babel` or `tsc` CLIs.
```

If you're using TypeScript with Babel via [`@babel/preset-typescript`](https://babeljs.io/docs/en/babel-preset-typescript), you can use the [`babel` CLI](https://babeljs.io/docs/en/babel-cli) to generate/transpile JavaScript files:

```bash
NODE_ENV=production babel src --extensions '.ts,.tsx,.js,.jsx' --out-dir lib
```

And you can generate declaration files for your components using the [`tsc` CLI](https://www.typescriptlang.org/docs/handbook/compiler-options.html):

```bash
tsc --declaration --declarationDir lib/types --emitDeclarationOnly --project tsconfig.json
```

Hopefully, that gets you your answer. I searched and searched, trying to find something like this. Ultimately I had to adapt code from a script deep in the bowels of the [Material-UI](https://material-ui.com/) codebase. If you're interested in some more details, feel free to read on. Otherwise, thanks for reading! 😄

---

About a year ago I was looking for a way to auto-generate React PropTypes from TypeScript types. Most React component libraries that I had seen **hand-wrote React PropTypes in addition to the TypeScript types**. They had to duplicate their efforts and ensure the PropTypes were kept up-to-date.

I searched google and came across [`babel-plugin-typescript-to-proptypes`](https://github.com/milesj/babel-plugin-typescript-to-proptypes). It's a Babel plugin that will generate React PropTypes from TypeScript types. It sounded like exactly what I wanted. But in reality, it was too limited. The problem was that it only really worked for simple types defined within the same file. It failed to generate PropTypes from external or complex types.

So I sought help from the Twitterverse:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Can someone point me to a react component library written in Typescript?<br><br>I&#39;m trying to figure out how folks are handling using prop types for consuming apps that aren&#39;t written in Typescript.<br><br>Auto-generated? Duplicated? Not included?</p>&mdash; Ben Ilegbodu 🏀👨🏾‍💻 (@benmvp) <a href="https://twitter.com/benmvp/status/1250582826874880000?ref_src=twsrc%5Etfw">April 16, 2020</a></blockquote>

Unfortunately, a lot of the suggestions were either TypeScript-only libraries or they were hand-writing PropTypes as well. But one tweet mentioned [Material-UI](https://material-ui.com/), the React component library based on Google's Material Design system. I had been using it for a while, but thought it was still written in JavaScript with hand-written TypeScript types added. But at some point the maintainers switched to TypeScript with PropTypes auto-generated.

I went code spelunking in the [`material-ui` Github repo](https://github.com/mui-org/material-ui) and found their [script that auto-generates PropTypes](https://github.com/mui-org/material-ui/blob/9c30277169ddec998b41ba1a5c3f9c76621f1bb1/scripts/generateProptypes.ts). It uses this [`typescript-to-proptypes`](https://github.com/merceyz/typescript-to-proptypes) package that exposes an API for converting TypeScript definitions to PropTypes using the TypeScript compiler API.

It was exactly what I wanted, but there was yet another problem. **The package was written pretty much exclusively for Material-UI which meant there was zero documentation.** So I used the script in `material-ui` to get an idea of how `typescript-to-proptypes` worked. I can't say that I understood all of the configurations but it was clear that most of it was tailored to how `material-ui` worked. So I didn't need all of it.

But after looking through the [`typescript-to-proptypes` source code](https://github.com/merceyz/typescript-to-proptypes/blob/master/src/injector.ts) and submitting a [pull request](https://github.com/merceyz/typescript-to-proptypes/pull/29) to fix an issue, I was able to get the working helper function I've just shared. You will likely need to change or add to the configurations for it to work with your component library. You may need to go code spelunking as well. 😅

Keep learning my friends. 🤓
