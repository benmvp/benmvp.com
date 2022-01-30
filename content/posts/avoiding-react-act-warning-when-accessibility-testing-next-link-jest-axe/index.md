---
date: 2022-01-30
title: Avoiding React act warning when accessibility testing next/link with jest-axe
shortDescription: A journey explaining how digging into 3rd-party code helped provide clarity & find a workaround to a tricky problem
category: DivOps
tags: [divops, react, testing, accessibility, a11y, nextjs]
hero: ./caution-tape-marvin-esteve-4y8A6Ve-3GE-unsplash.jpeg
heroAlt: Yellow caution tape on a dark background
heroCredit: 'Photo by [Marvin Esteve](https://unsplash.com/@tme18)'
---

Recently when adding accessibility tests with [`jest-axe`](https://github.com/nickcolley/jest-axe) to a React component, I ran into the dreaded [`act()` warning](https://reactjs.org/link/wrap-tests-with-act):

```text
 FAIL  src/components/Link.test.tsx
  ✕ is accessible (70 ms)

  ● is accessible

    Expected test not to call console.error().

    If the warning is expected, test for it explicitly by mocking it
    out using jest.spyOn(console, 'error') and test that the warning occurs.

    // highlight-start
    Warning: An update to Link inside a test was not wrapped in act(...).

    When testing, code that causes React state updates should be wrapped
    into act(...):
    // highlight-end

    act(() => {
      /* fire events that update state */
    });
    /* assert on the output */

    This ensures that you're testing the behavior the user would see in the
    browser. Learn more at https://reactjs.org/link/wrap-tests-with-act
      at Link (.../node_modules/next/client/link.tsx:131:19)
      at Link (.../src/components/Link.tsx:15:5)
```

This specific test was testing a React component that wrapped [`next/link`](https://nextjs.org/docs/api-reference/next/link).

```js
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Link from './Link'

it('is accessible', async () => {
  const { container } = render(
    <Link href="https://www.benmvp.com">contents</Link>,
  )

  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://www.benmvp.com',
  )
  // highlight-next-line
  expect(await axe(container)).toHaveNoViolations()
})
```

**But it turns out that any component that rendered a `next/link` had this exact same problem.** I googled around for some combination of "jest-axe", "next/link", and "act()" and surprisingly found very little. But there was nothing that was helpful or provided a solution.

If I were to use [`act()`](https://testing-library.com/docs/react-testing-library/api#act) the way the warning message suggested, it would look something like:

```js
import { act, render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Link from './Link'

it('is accessible', async () => {
  const { container } = render(<Link href="/">contents</Link>)

  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://www.benmvp.com',
  )

  // highlight-next-line
  await act(async () => {
    expect(await axe(container)).toHaveNoViolations()
    // highlight-next-line
  })
})
```

But I didn't want to have to write this `act()` code every time I decided to use `jest-axe` with a component that rendered a `next/link` (either directly or indirectly). Plus it would be highly likely that my teammates would get tripped up by it even if I did document the problem.

**[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) wraps all of its [user events](https://testing-library.com/docs/ecosystem-user-event) with `act()` so that we don't have to.** But even still, the `act()` warning usually happens when we perform some non-UI action in a test that causes the component to re-render. All I did was render and add an accessibility assertion. The component shouldn't have been re-rendering.

Well, after lots of debugging and sleuthing (more details below if you're interested), I finally came up with a workaround that avoided using `act()` everywhere. It requires installing [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer) and using its test utils in the Jest configuration.

```js
// jest.config.js
module.exports = {
  // highlight-next-line
  setupFiles: ['<rootDir>/jest.setupFiles.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-axe/extend-expect',
    // highlight-next-line
    'react-intersection-observer/test-utils',
    '<rootDir>/jest.setupFilesAfterEnv.ts',
  ],
}

// jest.setupFiles.js
import { defaultFallbackInView } from 'react-intersection-observer'

// highlight-next-line
global.IntersectionObserver = jest.fn()
// highlight-next-line
defaultFallbackInView(false)
```

These few lines solve the problem! **It seems so simple, but it took me hours of struggling and wondering if I'd even find a workaround.** The solution is definitely not straightforward. So if you're having this problem right now and just need an answer so you can move on, there you have it! 😃

But if you'd like to know why it works and why it was even failing in the first place, feel free to read on! I want to take you through (a condensed version of) my debugging process so you can learn how to debug 3rd-party code, learn some things about JavaScript, and hopefully add some tools to your DivOps setup.

---

## FYI on helpful tools

Actually, before we get into the problem, I want to highlight some testing tools that you totally should be using (if you're not already).

First, the `act()` warning typically doesn't cause Jest tests to fail. It's just a warning. But it, along with other warnings (such as prop type failures), can fill up the test logs unless developers notice and care enough to fix the warnings. **In my opinion, test logs filled with warnings are a sign of an unhealthy codebase.** So one of the tools I always add to my Jest setup is [`jest-fail-on-console`](https://github.com/ricardo-ch/jest-fail-on-console). It makes Jest tests fail when `console.error()` or `console.warn()` are used. For more on it and other tools like it, read [5 tips for a healthier DivOps setup](/blog/5-tips-healthier-divops-setup/).

Second, [`jest-axe`](https://github.com/nickcolley/jest-axe) is a Jest wrapper around [`axe`](https://github.com/dequelabs/axe-core) for accessibility testing in React and other UI libraries. It's similar to code linters like [ESLint](https://eslint.org/), but it runs on the _generated_ HTML code instead of the source JavaScript code. So it can catch lots of errors around the structure of the React component's HTML. Read [Tools to catch accessibility errors in JavaScript applications](/blog/tools-catch-accessibility-errors-javascript-applications/) for more tools like it.

Lastly, the custom `Link` component that wrapped [`next/link`](https://nextjs.org/docs/api-reference/next/link) was to connect `next/link` with [MUI `Link`](https://mui.com/components/links/). That way I could get the functionality of `next/link` with the look-and-feel of MUI `Link`. Check out [Wrapping next/link to use with a custom UI Link component](/blog/wrapping-next-link-custom-ui-link-component/) for how to set that up.

Now let's go on a journey...

---

## Problem 1: Find the source of the `act()` warning

Let's take a quick look at the test code again:

```js
import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import Link from './Link'

it('is accessible', async () => {
  const { container } = render(
    <Link href="https://www.benmvp.com">contents</Link>,
  )

  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://www.benmvp.com',
  )
  // highlight-next-line
  expect(await axe(container)).toHaveNoViolations()
})
```

When I removed the `jest-axe` assertion, the test passed. When I added it back, the test failed because of the `act()` warning. **So my first goal was to figure out why the `next/link` component was re-rendering when seemingly no interaction was happening.** This re-render is what was triggering the `act()` warning.

The stack trace of the warning pointed to a line in `next/link` code as the culprit (`next/client/link.tsx`). But when I checked that specific line in the [`next/client/link.tsx`](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/link.tsx), it didn't really point to anything. So I started throwing `console.log` statements everywhere in the generated file within `node_modules` and re-running the tests. The source code was light on comments so I needed to figure out how it worked.

I used to be afraid of digging into 3rd-party `node_modules` code. But now after doing it so many times, I've found that it's really no different than looking at unfamiliar code from my teammates. Sometimes I find bugs in 3rd-party code and I'll file an issue on GitHub. **But usually what happens is that I better understand how the code works to know what I need to change in my code to work around whatever problem I'm dealing with.**

After _a lot_ of debugging (and I mean a lot), I narrowed down the cause of the re-render to [lines of code](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/link.tsx#L248-L250) using of a `useIntersection` Hook:

```typescript
const [setIntersectionRef, isVisible] = useIntersection({
  rootMargin: '200px',
})
```

Without the `jest-axe` assertion, `isVisible` would always remain `false`. But once the `jest-axe` was added, `isVisible` would start off as `false`. But then the `useIntersection` Hook would cause the component to re-render with a `true` value. The `isVisible` value is used to [pre-fetch routes](https://nextjs.org/docs/routing/introduction#linking-between-pages) (which is a pretty cool feature).

`next/link` calls [`React.cloneElement`](https://reactjs.org/docs/react-api.html#cloneelement) to [render the contents](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/link.tsx#L325).

```typescript
return React.cloneElement(child, childProps)
```

**A re-render makes it look like the UI has changed because the `child` is re-cloned, thus triggering the `act()` warning.**

The first problem was answered, but it created a new one. How can I stop `useIntersection` from causing a re-render?

---

## Problem 2: Prevent re-render

The `useIntersection` Hook was defined in [`next/client/use-intersection.tsx`](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx). I was going even deeper into unfamiliar code. But I quickly noticed in the `useIntersection` Hook that it [maintained a `visible` state](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx#L32).

```typescript
const [visible, setVisible] = useState(false)
```

And it [returned that state from the Hook](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx#L66).

```typescript
return [setRef, visible]
```

**So the next goal was to figure out where `setVisible` was being set to `true`.** There were 2 such places. The first, through several layers of abstraction, set up an [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) between the link and the browser viewport. It [called `setVisible`](https://nextjs.org/docs/routing/introduction#linking-between-pages) if there was an intersection.

```typescript
unobserve.current = observe(
  el,
  // highlight-next-line
  (isVisible) => isVisible && setVisible(isVisible),
  { root, rootMargin },
)
```

But I knew that `IntersectionObserver` didn't exist in the Jest environment, even with [`jest-environment-jsdom-global`](https://github.com/simon360/jest-environment-jsdom-global). With additional `console.log` statements, I verified that this code was never calling `setVisible`.

So onto the second place, which was [setting `setVisible` to `true`](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx#L54-L61) on [`requestIdleCallback()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback), but only when `IntersectionObserver` didn't exist (and `visible` wasn't already `true`).

```typescript
useEffect(() => {
  // highlight-next-line
  if (!hasIntersectionObserver) {
    if (!visible) {
      // highlight-next-line
      const idleCallback = requestIdleCallback(() => setVisible(true))
      return () => cancelIdleCallback(idleCallback)
    }
  }
}, [visible])
```

Thanks to more `console.log` statements (I use them liberally), I verified that this code _was_ being executed. I wish I could tell you that I immediately realized _why_ it was being called when the `jest-axe` assertion was added, but I didn't. I didn't figure out that wrinkle until I had solved the whole thing. But in order to make this journey somewhat coherent, let's pretend that revelation came next.

---

## Problem 3: Prevent `requestIdleCallback()`

So `requestIdleCallback()` was what was updating the `visible` state to `true`, causing a re-render, and ultimately causing the `act()` warning. **So my thought was to prevent the `requestIdleCallback()` from happening.** The `requestIdleCallback()` callback function seemed to only get called when adding the `jest-axe` assertion.

```js
it('is accessible', async () => {
  const { container } = render(
    <Link href="https://www.benmvp.com">contents</Link>,
  )

  expect(screen.getByRole('link')).toHaveAttribute(
    'href',
    'https://www.benmvp.com',
  )
  // highlight-next-line
  expect(await axe(container)).toHaveNoViolations()
})
```

It turns out that it had nothing _specifically_ to do with `jest-axe`, but because the operation is [`async`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). **The `await` gives time for `requestIdleCallback()` to happen.** It could've been any async call after rendering `<Link>` that would've caused `requestIdleCallback()` to fire. None of my other tests were async so it just seemed like it was caused by `jest-axe`.

I had a quick thought about maybe mocking `requestIdleCallback()` in the Jest configuration to never call its callback. But I was afraid of those implications. I knew React internals make use of `requestIdleCallback()`, and who knows what other code in my codebase requires it for code to work properly.

So after breaks to clear my head (and question the meaning of life), I remembered that the `requestIdleCallback()` code only happened in `useIntersection` when `IntersectionObserver` didn't exist. If it did, then `requestIdleCallback()` wouldn't get registered.

---

## Problem 4: Polyfill `IntersectionObserver`

Because our app supports iOS Safari 12.1, but `IntersectionObserver` wasn't natively supported until iOS Safari 12.2, the app polyfills `IntersectionObserver` using [`intersection-observer`](https://github.com/w3c/IntersectionObserver/tree/main/polyfill). So I added a polyfill for Jest as well.

```js
// jest.config.js
module.exports = {
  setupFiles: [
    // highlight-next-line
    'intersection-observer',
    '<rootDir>/jest.setupFiles.js',
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-axe/extend-expect',
    '<rootDir>/jest.setupFilesAfterEnv.ts',
  ],
}
```

My thinking was that the `useIntersection` code would set up a handler with `IntersectionObserver`, but because there's no browser, the link would have 0 dimensions. As a result, an intersection would never happen and `visible` would never be set to `true`.

```typescript
unobserve.current = observe(
  el,
  // highlight-next-line
  (isVisible) => isVisible && setVisible(isVisible),
  { root, rootMargin },
)
```

Frustratingly this didn't work. The `act()` warning still happened because I was only half right. The link did have 0 dimensions, but the `rootMargin` was set to `'200px'` in the call to `useIntersection` from `next/link`.

```typescript
const [setIntersectionRef, isVisible] = useIntersection({
  // highlight-next-line
  rootMargin: '200px',
})
```

Even though both the browser viewport and the link had 0 dimensions, the [`rootMargin`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) caused an intersection. The `rootMargin` causes the intersection "zone" to go outside its bounds 200 pixels in every direction. 😭

It was at this point, that I thought I'd have to give in and just use `act()` everywhere. If `IntersectionObserver` exists, there's _still_ an intersection and a re-render happens. If `IntersectionObserver` doesn't exist, `requestIdleCallback()` gets called because of the async operation. I lose either way!

Oh! But what if instead of polyfilling `IntersectionObserver`... I mocked it?

---

## Problem 5: Mock `IntersectionObserver`

I really felt that my best chance at a workaround was by manipulating `IntersectionObserver` somehow. **I needed it to exist, but never intersect.** And then I remembered [`react-intersection-observer`](https://github.com/thebuilder/react-intersection-observer). Its main use provides a [`useInView`](https://github.com/thebuilder/react-intersection-observer#useinview-hook) Hook that is a wrapper around `IntersectionObserver`'s API. But what I was most interested in was its [testing utilities](https://github.com/thebuilder/react-intersection-observer#testing).

`react-intersection-observer/test-utils` [adds a `beforeEach`](https://github.com/thebuilder/react-intersection-observer/blob/master/src/test-utils.ts) that creates a custom `IntersectionObserver` mock that intercepts all `observer` and `unobserve` calls allowing me to control intersections.

```js
// jest.config.js
module.exports = {
  setupFiles: ['<rootDir>/jest.setupFiles.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-axe/extend-expect',
    // highlight-next-line
    'react-intersection-observer/test-utils',
    '<rootDir>/jest.setupFilesAfterEnv.ts',
  ],
}
```

Here was my thinking. Now `useIntersection` would be using the mock of `IntersectionObserver`. So `IntersectionObserver` would be defined, but no intersections would happen. Therefore `visible` would never be set to `true`.

```typescript
unobserve.current = observe(
  el,
  // highlight-next-line
  (isVisible) => isVisible && setVisible(isVisible),
  { root, rootMargin },
)
```

But again frustratingly, this didn't work! And moreover it was the `requestIdleCallback()` that was triggering the `visible` change, not the `IntersectionObserver` code. Somehow `IntersectionObserver` still wasn't defined. Let's look at the `requestIdleCallback()` code again.

```typescript
useEffect(() => {
  // highlight-next-line
  if (!hasIntersectionObserver) {
    if (!visible) {
      const idleCallback = requestIdleCallback(() => setVisible(true))
      return () => cancelIdleCallback(idleCallback)
    }
  }
}, [visible])
```

There's a check against `hasIntersectionObserver`. The problem was that `hasIntersectionObserver` is [defined in module scope](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx#L22) outside of the definition of `useIntersection()`.

```typescript
// highlight-next-line
const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined'

export function useIntersection<T extends Element>({
```

**So even though the `react-intersection-observer/test-utils` created a mock `IntersectionObserver`, it was getting created in the `beforeEach()`**. And that was too late. When [`next/client/use-intersection.tsx`](https://github.com/vercel/next.js/blob/v12.0.9/packages/next/client/use-intersection.tsx) is executed is when it needed to know if `IntersectionObserver` existed. If I moved the definition of `hasIntersectionObserver` down two lines _into_ `useIntersection`, everything worked fine.

I contemplated filing an issue in the `next` repo to make that 2-line switch, but if I were the maintainers I wouldn't accept it. For the main browser use case, it doesn't make sense to recalculate that value all the time. Getting it to work in my edge case for running tests wouldn't seem worth it. Plus, even they did accept it, it could be weeks before it'd be released in a new version.

So this is where things got hacky (if they hadn't already). All `hasIntersectionObserver` needs to know in module scope is that `IntersectionObserver` exists. It's not actually trying to _use_ it then. So in the Jest [`setupFiles`](https://jestjs.io/docs/configuration#setupfiles-array), I set `global.IntersectionObserver` to a dummy value.

```js
import { defaultFallbackInView } from 'react-intersection-observer'

// highlight-next-line
global.IntersectionObserver = jest.fn()
defaultFallbackInView(false)
```

This way when `hasIntersectionObserver` is evaluated `IntersectionObserver` will be defined and `hasIntersectionObserver` will be `true`. Then the mock `IntersectionObserver` from `react-intersection-observer/test-utils` in the `beforeEach` kicks in when the tests actually run. And it worked! 😅 The `act()` warning went away because the component didn't re-render. The `isVisible` is no longer updated to be `true`.

Although the tests work without it, I also added `defaultFallbackInView(false)` for clarity. This just says that by default the `IntersectionObserver` will always return `false` value for an intersection.

---

## Final workaround solution

So after that long circuitous route filled with `console.log` statements and self-doubt, the final solution is only a few lines of Jest configuration.

```js
// jest.config.js
module.exports = {
  // highlight-next-line
  setupFiles: ['<rootDir>/jest.setupFiles.js'],
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    'jest-axe/extend-expect',

    // highlight-start
    // In order to run `jest-axe` assertions for components containing
    // `next/link`, we need `IntersectionObserver` to always exist,
    // but to be mocked so that we can set it to *never* intersect
    // in `jest.setupFiles.js`
    'react-intersection-observer/test-utils',
    // highlight-end

    '<rootDir>/jest.setupFilesAfterEnv.ts',
  ],
}

// jest.setupFiles.js
// highlight-start
import { defaultFallbackInView } from 'react-intersection-observer'

// `react-intersection-observer/test-utils` added in
// `setupFilesAfterEnv` will add a mock `IntersectionObserver`
// automatically in every `beforeEach()`. But `next/link`
// checks to see if `IntersectionObserver` exists at module
// scope. So we add the bare minimum to get that check to pass.
global.IntersectionObserver = jest.fn()

// Then when the tests actually run, we default intersection to
// `false` so that `jest-axe` assertions will pass without needing
// `act()`.
defaultFallbackInView(false)
// highlight-end
```

---

I wrote this post primarily to provide an answer that I spent countless hours looking for. But I also hope that it encourages you when you're struggling to persevere to find an answer. It may look like those that write blog posts are super smart and found the answer immediately, but that's rarely the case. And lastly, I hope it motivates you to dig into `node_modules` when you need help debugging issues with a 3rd-party library. I learn so much from code spelunking.

Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp) with any comments or questions you have!

Keep learning my friends. 🤓
