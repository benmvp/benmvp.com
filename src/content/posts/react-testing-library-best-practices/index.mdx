---
date: 2021-11-21
title: React Testing Library best practices
shortDescription: 5 categories of best practices for testing components with React Testing Library based on the ESLint plugin
category: React
tags: [react, testing, eslint]
hero: ./goat-oytun-babur-ozen-rfV53ZkGcGA-unsplash.jpeg
heroAlt: White goat on green grass
heroCredit: 'Photo by [Oytun Babür Özen](https://unsplash.com/@oytunozen)'
---

In my opinion, [ESLint](https://eslint.org/) is one of the best ways to communicate best practices for JavaScript code because it doesn't require everyone to read and follow a document or blog post. Instead it notifies the individual developer that they have broken a rule. A rule which itself typically has docs explaining the rule and how to fix it. **So without intervention from a senior developer or "expert", ESLint is able to communicate best practices.** And if the best practices change, the ESLint rules is updated, a new version of the plugin is released, and the offending code starts failing.

I've been using [React Testing Library](https://testing-library.com/docs/react-testing-library/) for several years now. After using [Enzyme](https://enzymejs.github.io/enzyme/) for many years prior, I found RTL to be a much better approach to testing React applications. Read [React Testing Library over Enzyme](/blog/react-testing-library-over-enzyme/) for more of my thoughts on the differences if you're interested. Although I've been using React Testing Library for a while, I only started recently using [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library). It codifies a whole bunch of best practices. Some of which had changed from when I had first learned RTL.

So I want to walk through 5 groups of those best practices to help us write healthier and more resilient React tests.

---

## 1. Using user events

**The core premise of React Testing Library is testing React components how users interact with them instead of how the code is implemented.** The primary way that users interact with our components is through actions (clicking, typing, hovering, etc). Actions are handled in our React components by handling DOM events like `onClick`, `onChange`, `onMouseOver`, etc.

React Testing Library exports [`fireEvent`](https://testing-library.com/docs/dom-testing-library/api-events/) for triggering DOM events, and was the original suggested approach for simulating user actions. **But `fireEvent` was [considered too low-level](https://github.com/testing-library/dom-testing-library/issues/107) and the [`user-event`](https://testing-library.com/docs/ecosystem-user-event) library was introduced to simulate user interactions.**

For example before with `fireEvent`, we would simulate typing in a `<textarea>` by triggering the `onChange` DOM event that the component was handling.

```js
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

test('types into text box', () => {
  render(<textarea />)

  // ⚠️ `prefer-user-event` ESLint error
  // don't use `fireEvent`
  // highlight-start
  fireEvent.change(screen.getByRole('textbox'), {
    target: {
      value: 'Hello,\nWorld!',
    },
  })
  // highlight-end

  expect(screen.getByRole('textbox')).toHaveValue('Hello,\nWorld!')
})
```

The [`prefer-user-event`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-user-event.md) ESLint rule enforces the usage of `userEvent` over `fireEvent`, so this is now an error. We should've known we weren't doing it right when we had to specify `e.target.value`. Definitely to low-level. Instead, we should use the [`type`](https://testing-library.com/docs/ecosystem-user-event#typeelement-text-options) user event.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

test('types into text box', () => {
  render(<textarea />)

  // 👍🏾 `type` writes text inside of the `<textarea>`
  // character-by-character triggering multiple `onChange` events
  // highlight-next-line
  userEvent.type(screen.getByRole('textbox'), 'Hello,{enter}World!')

  expect(screen.getByRole('textbox')).toHaveValue('Hello,\nWorld!')
})
```

The `type` user event writes the specified text into the `<textarea>`, character by character. **This actually triggers `onChange` events for each character typed, just like what would happen when a real user types into a text box.** We even have to specify `{enter}` (hitting the ENTER key) instead of a line break (`\n`). The text box is also "clicked" before typing.

---

## 2. Avoiding the DOM

**React Testing Library provides methods for [semantically querying DOM elements](https://testing-library.com/docs/queries/about) so that we can test our page in the most accessible way.** Instead of searching by class name, we find elements by [role](https://testing-library.com/docs/queries/byrole), [label](https://testing-library.com/docs/queries/bylabeltext), [display text](https://testing-library.com/docs/queries/bydisplayvalue), etc. Folks coming from Enzyme or used to using other UI testing libraries that use heavy DOM traversal to select DOM nodes may bring that into RTL testing.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Example from './Example'

test('displays the content when button is clicked', () => {
  const { container } = render(<Example />)

  // ⚠️ `no-container` ESLint error
  // don't use `querySelector` or other DOM methods
  // highlight-next-line
  const button = container.querySelector('.btn-primary')

  userEvent.click(button)

  // ⚠️ `no-node-access` ESLint error
  // don't use `firstChild`
  // highlight-next-line
  const message = screen.getByTestId('foot').firstChild

  expect(message).toHaveTextContext('Loaded')
})
```

The [`no-container`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-container.md) and [`no-node-access`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-node-access.md) ESLint rules help guard against the non-RTL way of querying elements. This forces us to use the appropriate queries.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Example from './Example'

test('displays the content when button is clicked', () => {
  render(<Example />)

  // 👍🏾 use the button's implicit role instead
  // highlight-next-line
  const button = screen.getByRole('button')

  userEvent.click(button)

  // 👍🏾 can search by `data-testid` as well
  // highlight-next-line
  const message = screen.getByTestId('message')

  expect(message).toHaveTextContext('Loaded')
})
```

---

## 3. Proper use of queries

In the beginning, when there was just React Testing Library, the suggested approach to get these queries (like `getByRole`) was by destructuring the object returned from calling [`render`](https://testing-library.com/docs/react-testing-library/api#render).

```js
import React from 'react'
import { render } from '@testing-library/react'
import Greeting from './Greeting'

test('renders a message', () => {
  const { getByText } = render(<Greeting />)

  // ⚠️ `prefer-screen-queries` ESLint error
  // don't destructure, `render`, use `screen` instead
  // highlight-next-line
  expect(getByText('Hello, world!')).toBeInTheDocument()
})
```

[DOM Testing Library](https://testing-library.com/docs/dom-testing-library/), which React Testing Library is built on top of, now exposes a [`screen` object](https://testing-library.com/docs/queries/about/#using-queries) which has every query built-in. **The changed best practice is to always use `screen` object and no longer destructure the object returned by `render`.** And the [`prefer-screen-queries`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-screen-queries.md) ESLint rule ensures we follow this best practice.

```js
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

test('renders a message', () => {
  render(<Greeting />)

  // 👍🏾 use `screen` object queries instead
  // highlight-next-line
  expect(screen.getByText('Hello, world!')).toBeInTheDocument()
})
```

The benefit of using `screen` is that we no longer need to keep updating the destructure of the `render` call as we change the queries we need. I know that I would frequently end up with unused destructured variables. And with editors like [VSCode](https://code.visualstudio.com/), when we type `editor.` we'll get autocompletion for the queries. We could have also not never destructured the object from `render` and get the same benefits, but 🤷🏾‍♂️.

There are several [types of queries](https://testing-library.com/docs/queries/about#types-of-queries) (`get*`, `query*` & `find*`) and it's not always clear when to use one over the other.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

test('renders a message', () => {
  render(<Greeting />)

  // ⚠️ `prefer-presence-queries` ESLint error
  // use `getByText` when asserting presence
  // highlight-next-line
  expect(screen.queryByText('Hello, world!')).toBeInTheDocument()

  // ⚠️ `prefer-presence-queries` ESLint error
  // use `queryByRole` when asserting hidden
  // highlight-next-line
  expect(screen.getByRole('region')).not.toBeVisible()
})
```

The `get*` methods throw an error when the element is not found. So when we are asserting if an element is present (e.g. `.toBeInTheDocument()`) and it's not found, using the `get*` methods will offer a better error message over `query*` or `find*`. Similarly the `query*` methods return `null` instead of throwing, which is perfect when testing when an element is not present. That way the test will fail on the assertion (`.not.ToBeInTheDocument()`) instead of throwing an error with the `get*` methods.

This best practice is pretty tricky to understand, let alone get it right every single time. But thankfully the [`prefer-presence-queries`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-presence-queries.md) ESLint rule has our back and will alert us when we misstep.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

test('renders a message', () => {
  render(<Greeting />)

  // 👍🏾 use `get*` when asserting presence
  // highlight-next-line
  expect(screen.getByText('Hello, world!')).toBeInTheDocument()

  // 👍🏾 use `query*` when asserting hidden
  // highlight-next-line
  expect(screen.queryByRole('region')).not.toBeVisible()
})
```

**There are some other ESLint rules to check out to help ensure we are using the proper query methods.** The [`prefer-find-by`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-find-by.md) rule enforces using a `find*` query instead of [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) + `get*` when waiting for elements. The [`prefer-query-by-disappearance`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/prefer-query-by-disappearance.md) rule enforces using `query*` queries when waiting for disappearance with [`waitForElementToBeRemoved`](https://testing-library.com/docs/dom-testing-library/api-async/#waitforelementtoberemoved).

---

## 4. Proper use of waiting

The [`waitFor`](https://testing-library.com/docs/dom-testing-library/api-async/#waitfor) method is a powerful asynchronous utility to enable us to make an assertion after a non-deterministic amount of time. The way `waitFor` works is that polls until the callback we pass stops throwing an error. **So if we were to make side-effects within the callback, those side-effects could trigger a non-deterministic number of times.**

```js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayersCombobox from './PlayersCombobox'

test('has keyboard support', async () => {
  render(<PlayersCombobox />)

  await waitFor(() => {
    // ⚠️ `no-wait-for-side-effects` ESLint error
    // don't call side-effects w/in `waitFor` callback
    // it could get called N number of times
    // highlight-next-line
    userEvent.type(screen.getByRole('input'), '{arrowdown}')

    expect(screen.getByTestId('item3')).toBeChecked()
  })
})
```

**Instead the best practice is to move these sorts of side-effects outside of the `waitFor` callback, and only put assertions within it.** The [`no-wait-for-side-effects`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-side-effects.md) ESLint rule ensures we adhere to this.

```js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlayersCombobox from './PlayersCombobox'

test('has keyboard support', async () => {
  render(<PlayersCombobox />)

  // side effects go *outside* `waitFor`
  // highlight-next-line
  userEvent.type(screen.getByRole('input'), '{arrowdown}')

  await waitFor(() => {
    expect(screen.getByTestId('item3')).toBeChecked()
  })
})
```

There are a couple of other similar best practices codified by ESLint rules. The [`no-wait-for-empty-callback`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-empty-callback.md) prevents us from waiting for the next tick of the event loop before continuing processing by using `waitFor` and `waitForElementToBeRemoved` with an empty callback. This isn't consistent with the philosophy of React Testing Library and that functionality very well could break in the future. The [`no-wait-for-multiple-assertions`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-wait-for-multiple-assertions.md) is kind of the opposite. It ensures that only one assertion exists within `waitFor`.

---

## 5. Miscellaneous

Finally, the catch-all bucket. 😄

React Testing Library provides several super useful [debugging utilities](https://testing-library.com/docs/dom-testing-library/api-debugging/) to help understand what's going on in the DOM.

```js
import React from 'react'
import { render, screen } from '@testing-library/react'
import Greeting from './Greeting'

test('renders a message', () => {
  render(<Greeting />)

  // ⚠️ `no-debugging-utils` ESLint error
  // prevent checking in debug code
  // highlight-next-line
  screen.debug()

  expect(screen.getByText('Hello, world!')).toBeInTheDocument()
})
```

**Just like `console.log()` debug statements, the debugging utilities shouldn't be checked into source code** The [`no-debugging-utils`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-debugging-utils.md) ESLint rule ensures that we don't accidentally commit debug test code. More than likely they won't break our tests, but they'll certainly clutter up the logs.

There is also [`no-render-in-setup`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-render-in-setup.md) that disallows the use of `render` in the Jest setup functions (like `beforeEach()`), as well as [`no-unnecessary-act`](https://github.com/testing-library/eslint-plugin-testing-library/blob/main/docs/rules/no-unnecessary-act.md) which aims to help us avoid using `act()` as something we throw any and everywhere to avoid the `not wrapped in act(...)` warnings.

---

If you're writing tests with React Testing Library, please include [`eslint-plugin-testing-library`](https://github.com/testing-library/eslint-plugin-testing-library) in your ESLint configuration. It's like having Kent C. Dodds looking over your shoulder. 😂

I'm curious if folks have best practices with RTL that **aren't** yet codified in ESLint rules? I'm always trying to find ways to develop and test better. Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp) and let me know!

Keep learning my friends. 🤓
