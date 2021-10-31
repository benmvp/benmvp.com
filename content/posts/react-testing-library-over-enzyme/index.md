---
date: 2020-04-21
title: React Testing Library over Enzyme
shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: React
tags: [react, testing, react testing library, enzyme, RTL]
hero: ./brown-goat-peter-neumann-mUtYXnpW1ts-unsplash.jpeg
heroAlt: Brown goat looking forward
heroCredit: 'Photo by [Peter Neumann](https://unsplash.com/@peterneumann)'
---

As I continue to use [React Testing Library](https://testing-library.com/react) more and more, I'm convinced it's the way to go for testing React apps and components. When [Kent](https://twitter.com/kentcdodds) first released React Testing Library and was sharing it out, I thought it was nice. But I was feeling pretty successful in my Enzyme tests so why switch? I thought React Testing Library was more or less the same as [Enzyme](https://enzymejs.github.io/enzyme/), just with a narrower API to keep you shooting yourself in the foot. I was kinda right.

When it comes to testing React components there are 3 main phases:

1. **Finding** an element in the DOM
2. **Interacting** with the element (optional)
3. **Asserting** that the UI is in the correct state

## Finding

React Testing Library tries to find elements based upon how users see your UI and not how you've built it. Let's take the example from the docs where we have a `HiddenMessage` component that toggles whether to display the `children` passed to it:

```js
const HiddenMessage = ({ children }) => {
  const [showMessage, setShowMessage] = React.useState(false)
  return (
    <div>
      <label htmlFor="toggle">Show Message</label>
      <input
        id="toggle"
        type="checkbox"
        onChange={(e) => setShowMessage(e.target.checked)}
        checked={showMessage}
      />
      {showMessage ? children : null}
    </div>
  )
}
```

In order to write a test to see if the component shows the `children` when the checkbox is clicked we need to first _find_ the checkbox. With Enzyme I would typically add a `data-testid="toggle-message"` attribute to the checkbox and search for it like:

```js
import { mount } from 'enzyme'
import HiddenMessage from './HiddenMessage'

test('shows the children when the checkbox is checked', () => {
  const component = mount(<HiddenMessage>Test Message</HiddenMessage>)

  // highlight-next-line
  const checkbox = component.find('[data-testid="toggle-message"]')
})
```

> NOTE: Searching by element name (`'input'`) or class name makes your test brittle and not [resilient to change](https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-change).

Instead with React Testing Library, we search for the checkbox based on its label, "Show Message". This is what the user sees and what they click on. So our tests acts more like what our users are doing. The search for the checkbox looks like:

```js
import { render, fireEvent } from '@testing-library/react'
import HiddenMessage from './HiddenMessage'

test('shows the children when the checkbox is checked', () => {
  const { getByLabelText } = render(<HiddenMessage>Test Message</HiddenMessage>)

  // highlight-next-line
  const checkbox = getByLabelText('Show Message')
})
```

There's really no easy way to replicate this in Enzyme without recreating the functionality yourself to search for all `<label>` tags and then compare against their contents. I really like how `getByLabelText` pushes us to use a `<label>` tag, which is great for both UX and Accessibility. The testing library is not only making our code better, but the app itself too!

> NOTE: React Testing Library provides [`*ByLabelText`](https://testing-library.com/docs/dom-testing-library/api-queries#bylabeltext), [`*ByPlaceholderText`](https://testing-library.com/docs/dom-testing-library/api-queries#byplaceholdertext), [`*ByText`](https://testing-library.com/docs/dom-testing-library/api-queries#bytext), [`*ByAltText`](https://testing-library.com/docs/dom-testing-library/api-queries#byalttext), [`*ByTitle*`](https://testing-library.com/docs/dom-testing-library/api-queries#bytitle), [`*ByDisplayValue`](https://testing-library.com/docs/dom-testing-library/api-queries#bydisplayvalue), [`*ByRole`](https://testing-library.com/docs/dom-testing-library/api-queries#byrole), and finally the fallback [`*ByTestId`](https://testing-library.com/docs/dom-testing-library/api-queries#bytestid). Most of these are accessibility-friendly searches! 🙌🏾

## Interacting

In the example of our `<HiddenMessage />` component, we need to click the checkbox in order to get to the new state. In Enzyme this would look like:

```js
import { mount } from 'enzyme'
import HiddenMessage from './HiddenMessage'

test('shows the children when the checkbox is checked', () => {
  const component = mount(<HiddenMessage>Test Message</HiddenMessage>)

  const checkbox = component.find('[data-testid="toggle-message"]')

  // highlight-next-line
  checkbox.simulate('click')
})
```

and in React Testing Library:

```js
import { render, fireEvent } from '@testing-library/react'
import HiddenMessage from './HiddenMessage'

test('shows the children when the checkbox is checked', () => {
  const { getByLabelText } = render(<HiddenMessage>Test Message</HiddenMessage>)

  const checkbox = getByLabelText('Show Message')

  // highlight-next-line
  fireEvent.click(checkbox)
})
```

More or less the same right?

> NOTE: If your component is display-only, and only configurable by props, there is nothing to interact with in order to get it into a new state. In these cases, there is no Interacting phase.

## Asserting

The final phase is to verify that your UI is in the correct state; that certain elements are rendered, that other elements have the correct content, etc. Asserting is usually accomplished with matchers in Jest. You can use the [basic matchers](https://jestjs.io/docs/en/using-matchers) that come with Jest, but I really prefer using the extended matchers that come with React Testing Library ([`@testing-library/jest-dom`](https://www.npmjs.com/package/@testing-library/jest-dom)) or Enzyme ([`jest-enzyme`](https://www.npmjs.com/package/jest-enzyme)). When tests fail, these provide much better error messages than `true !== false`.

Just like with Interacting, the Asserting phase for both React Testing Library and Enzyme are more or less the same as long as you avoid certain matchers. For instance, you shouldn't use [`.toHaveState()`](https://www.npmjs.com/package/jest-enzyme#tohavestate) from `jest-enzyme` because that is testing implementation details. Instead, you should test the _result_ of that state update which is reflected in updated UI.

## Wait, that's it?

Enzyme feels more lower level, as if React Testing Library would be built on top of it (it isn't by the way). So even though 2 of the 3 phases are more or less the same between the Enzyme and React Testing Library, I'm finding React Testing Library helps me approach testing differently. I test higher in the component tree to avoid testing implementation details. And it's _that_ difference that makes all the difference. 😄

By the way, there are certainly more nuances around React Testing Library that help prevent you from testing implementation details. This is certainly by no means exhaustive. But all that is for another blog post. Actually, one has already been written. Read Kent's blog post on [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details). 🙃

Keep learning my friends. 🤓
