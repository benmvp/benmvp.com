---
date: 2020-08-06
title: Mocking window.location methods in Jest & jsdom
shortDescription: A way to successfully mock the locked Location object from jsdom in Jest
category: testing
tags: [mock, react]
hero: ./compass-jordan-madrid-iDzKdNI7Qgc-unsplash.jpg
heroAlt: Compass on a window sill
heroCredit: 'Photo by [Jordan Madrid](https://unsplash.com/@jordanmadrid)'
---

Well it looks like I'm going to continue my streak about sharing helpful tips around JavaScript testing in [Jest](https://jestjs.io/en/). Previously I shared about avoiding gotchas while [testing async JavaScript code](/blog/quick-trick-jest-asynchronous-tests/) and specifically how to [write tests for async React components](/blog/asynchronous-testing-with-enzyme-react-jest/) in Jest.

This time I want to talk about how to **[mock](https://jestjs.io/docs/en/mock-functions#using-a-mock-function) methods on `window.location`**, such as [`window.location.assign`](https://developer.mozilla.org/en-US/docs/Web/API/Location/assign), in Jest. If you didn't already know, Jest uses [`jsdom`](https://github.com/jsdom/jsdom) as its [test environment](https://jestjs.io/docs/en/configuration#testenvironment-string) which provides a JavaScript implementation of many web standards for use within Node. It allows us to access objects like `window.location` which normally wouldn't exist in a Node environment.

Let's say, I have a React component that makes a `window.fetch` call and then redirects the user to a new page. Not only do I want to mock `window.fetch` and ensure that the right API request was made, but I also need to verify that the component calls `window.location.assign` with the correct URL.

In the past in Jest, I could mock out `window.location.assign` using [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
Object.defineProperty(window.location, 'assign', {
  configurable: true,
  value: jest.fn(),
})
```

and then run assertions on `window.location.assign`:

```js
expect(window.location.assign).toHaveBeenCalledTimes(1)
expect(window.location.assign).toHaveBeenCalledWith(
  'https://www.benmvp.com/minishops/',
)
```

However, when I was recently upgraded a repo from Jest 23 to Jest 26, this no longer worked. It turns out that **Jest 25+ uses a newer version of `jsdom`** that uses a newer implementation of the `Location` object that prevents you from modifying `window.location`. Usually `Object.defineProperty` works for everything, but the `Location` object is completely locked down from changes.

While scouring the internet, I found suggestions to delete `window.location` and create an object with just the methods I need to mock. Something like:

```js
delete window.location

window.location = {
  assign: jest.fn(),
}
```

In general, this works, and is what I began to use while fixing the tests during the upgrade. But I had a specific component where not only was it calling `window.location.assign`, but it was also reading [`window.location.search`](https://developer.mozilla.org/en-US/docs/Web/API/Location/search). The code was setting the mock URL with a query string using [`global.jsdom.reconfigure`](https://github.com/jsdom/jsdom#reconfiguring-the-jsdom-with-reconfiguresettings) (via [`jest-environment-jsdom-global`](https://github.com/simon360/jest-environment-jsdom-global)):

```js
global.jsdom.reconfigure({
  url: 'https://www.benmvp.com/minishops/?utm_source=twitter',
})
```

So my first thought was to move the query string from `reconfigure` to `search` of the faux-`Location` object:

```js
global.jsdom.reconfigure({
  url: 'https://www.benmvp.com/minishops/',
})
window.location = {
  assign: jest.fn(),

  // probably not the best idea
  search: '?utm_source=twitter',
}
```

But `window.location.search` always has a value (even if it's `''`), and this just felt like I was **digging too deep into the implementation details**. Plus what if I needed [`window.location.hash`](https://developer.mozilla.org/en-US/docs/Web/API/Location/hash) (or any of the other properties) in other tests? Many of the properties of the `Location` object get parsed and set from changing the URL. I'll likely need that functionality, so this didn't feel like a robust enough mocking solution.

So I kept researching. I basically wanted to create an object that looked and acted _just_ like the `Location` object, but would allow me to mock `assign`, `reload` or any other method. Attempts to clone the object using [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax#Spread_in_object_literals) or [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) resulted in the [property setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) of properties like `window.location.search` getting removed. It's basically how `Object.assign` works. I'd lose the internal logic of the `Location` object.

Then I stumbled across [`Object.getOwnPropertyDescriptors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptors). It returns all of the descriptors for a given object. So it maintains the getters/setters of the `Location` object as well as its methods. And then there is also [`Object.defineProperties`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) that defines new or **modifies existing properties on an object** (and also returns the object). So the plan was to get all of the property descriptors for `window.location` and create a new object with the mocked method(s) replaced.

This is what it turned into:

```js
// keep a copy of the window object to restore
// it at the end of the tests
const oldWindowLocation = window.location

// delete the existing `Location` object from `jsdom`
delete window.location

// create a new `window.location` object that's *almost*
// like the real thing
window.location = Object.defineProperties(
  // start with an empty object on which to define properties
  {},
  {
    // grab all of the property descriptors for the
    // `jsdom` `Location` object
    ...Object.getOwnPropertyDescriptors(oldWindowLocation),

    // overwrite a mocked method for `window.location.assign`
    assign: {
      configurable: true,
      value: jest.fn(),
    },

    // more mocked methods here as needed
  },
)
```

So this new `window.location` object isn't a true `Location` object. So I'm sure it's missing _some_ functionality. But it's pretty close. After the change, all of my existing tests using `global.jsdom.reconfigure()` still worked, but I was also able to run tests mocking `window.location.assign()`.

A complete test would look like:

```js
const oldWindowLocation = window.location

beforeAll(() => {
  delete window.location

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  )
})
beforeEach(() => {
  window.location.assign.mockReset()
})
afterAll(() => {
  // restore `window.location` to the `jsdom` `Location` object
  window.location = oldWindowLocation
})

test('it calls assign with expected URL', () => {
  window.location.assign('https://www.benmvp.com/minishops/')

  expect(window.location.assign).toHaveBeenCalledTimes(1)
  expect(window.location.assign).toHaveBeenCalledWith(
    'https://www.benmvp.com/minishops/',
  )
})
```

I had a number of test files that needed this mocking of `window.location.assign`. Instead of duplicating the mocking code or creating a helper function, that tests would call, I elected to just have **every test use the mocked `window.location` object**. I couldn't foresee a use case where I'd actually want it to navigate the page in a test (plus it doesn't work anyway). So I took it one step further, and using the [`setupFilesAfterEnv`](https://jestjs.io/docs/en/configuration#setupfilesafterenv-array) configuration in [`jest.config.js`](https://jestjs.io/docs/en/configuration), I added a file that looked like:

```js
// jest-setup.js

const oldWindowLocation = window.location

beforeAll(() => {
  delete window.location

  window.location = Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(oldWindowLocation),
      assign: {
        configurable: true,
        value: jest.fn(),
      },
    },
  )
})
afterAll(() => {
  // restore `window.location` to the original `jsdom`
  // `Location` object
  window.location = oldWindowLocation
})
```

I left out the `beforeEach()` in the setup file. A test file or even a given test case can handle the mock resetting.

Hopefully this helps you out! It certainly would've saved me a couple of days of toiling trying to find an answer. 🙃 Feel free to let me know what you think on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
