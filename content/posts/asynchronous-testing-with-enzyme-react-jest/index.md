---
date: 2020-07-15
title: Asynchronous testing with Enzyme & React in Jest
shortDescription: How to use Enzyme to test UI updates after asynchronous events in React components
category: testing
tags: [react, async, enzyme, react-testing-library]
hero: ./wait-sign-kai-pilger-1k3vsv7iIIc-unsplash.jpeg
heroAlt: Wait crosswalk sign in New York City
heroCredit: 'Photo by [Kai Pilger](https://unsplash.com/@kaip)'
---

Back in April I wrote a blog post about how I would [choose React Testing Library over Enzyme](/blog/react-testing-library-over-enzyme/). It's probably been my most popular post in the last 3 months! At the end the post, I mentioned that there were many other "nuances about [React Testing Library](https://testing-library.com/react) that help prevent you from testing implementation details." I was planning to just leave it at that statement, but recently I ran into one such nuance while working in a codebase that used [Enzyme](https://enzymejs.github.io/enzyme/). And I just **had** to share it.

## The Problem

It has to do with the **complexity around testing asynchronous events** within components using Enzyme. Let's say for example you had a component that had a form. And `onSubmit` of that form you make an API call to `POST` the form data. And when the successful response returns, you add a new item to a list. It could look something like this:

```js
const Adder = () => {
  const [items, setItems] = useState([])

  const handleSubmit = (data) => {
    submitNewItem(data)
      .then((newItem) => {
        setItems((prevItems) => [...prevItems, newItems])
      })
  }

  return (
    <>
      <AddForm onSubmit={handleSubmit} />
      <ul data-testid="adder-items">
        {items.map((item) => (
          // render UI for each item
        ))}
      </ul>
    </>
  )
}
```

When the `<AddForm />` submits, it calls `submitNewItem` which is a helper function wrapping [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [axios](https://github.com/axios/axios) if you prefer). When we receive the `newItem`, we call `setItems()` with a new array that has the `newItem` appended. By the way, since the new value of `items` is computed using its previous value, we need to [pass a function to `setItems`](https://reactjs.org/docs/hooks-reference.html#functional-updates).

So we set up our test like so, but we run into a problem:

```js
import { mount } from 'enzyme'
import Adder from './Adder'
import { submitNewItem } from '../utils'

jest.mock('../utils')

test('new item is added to the UI when the form is successfully submitted', () => {
  // Instead of making a real API call, mock the helper to return a
  // resolved promise with the data that would come back from the API
  submitNewItem.mockResolvedValueOnce({ id: 14, title: 'Gucci sneakers' })

  const component = mount(<Adder />)
  const preventDefault = jest.fn()

  component
    .find('[data-testid="addform-form"]')
    .simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)

  component.update()

  // highlight-start
  // THIS DOESN'T WORK!!
  expect(component.find('[data-testid="adder-items"]')).toHaveLength(1)
  // highlight-end
})
```

We want to test that the `newItem` was successfully added to state by _checking its existence in the UI_, **not** by inspecting the value in the component's state. But this proves difficult because looking at the implementation, it happens asynchronously after `submitNewItem` has resolved its promise. If you debug the test code, you'll see that the assertion above runs **before the API call even resolves**. Even though we've mocked out `submitNewItem` to immediately return a resolved promise, we still don't have anywhere to "attach" to know when the promise has resolved so that we can safely verify the UI.

If you Google around, you'll likely come across [this issue in the Enzyme repo](https://github.com/enzymejs/enzyme/issues/1587) that started nearly 2 years ago. And it's full of crazy workarounds that pretty much all involve testing deep implementation details by reaching into [`component.instance()`](https://enzymejs.github.io/enzyme/docs/api/ReactWrapper/instance.html). But that's not what we want to do!

## The Enzyme Solution

Normally in Jest, we would follow [the guide on testing asynchronous code](https://jestjs.io/docs/en/asynchronous), but in this case it doesn't work because we don't have a `Promise` we can "attach" to in order to call `.then()` on.

But if we think about it, what we really want to do is **wait until all of the promises have cleared**: the `fetch` promise, the following `.json()` promise, and then our promise to call `setItems` with the new data. Once those have all resolved, _then_ we can verify the UI. We need the equivalent of [`jest.runAllTimers()`](https://jestjs.io/docs/en/jest-object#jestrunalltimers), but for promises instead of `setTimeout`, `setInterval`, etc.

Well it turns out that calling [`setImmediate`](https://nodejs.org/api/timers.html#timers_setimmediate_callback_args) will do just that; exhaust all of the promises. But since `setImmediate` uses a callback, we have to use the [callback form](https://jestjs.io/docs/en/asynchronous#callbacks) of Jest async testing:

```js
// highlight-start
test('new item is added to the UI when the form is successfully submitted', (done) => {
  // highlight-end
  // Instead of making a real API call, mock the helper to return a
  // resolved promise with the data that would come back from the API
  submitNewItem.mockResolvedValueOnce({ id: 14, title: 'Gucci sneakers' })

  const component = mount(<Adder />)
  const preventDefault = jest.fn()

  component
    .find('[data-testid="addform-form"]')
    .simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)

  // highlight-start
  setImmediate(() => {
    // within `setImmediate` all of the promises have been exhausted

    component.update()
    expect(component.find('[data-testid="adder-items"]')).toHaveLength(1)

    // have to call done here to let Jest know the test is done
    done()
  })
  // highlight-end
})
```

So this is great! We were able to successfully test our code! But I personally don't like using the callback form of Jest async testing. I prefer using the [`async`/`await` form](https://jestjs.io/docs/en/asynchronous#asyncawait). Well, it turns out that we can turn this `setImmediate` pattern into a Promise-based helper called `runAllPromises` that will then allow us to use `async`/`await`:

```js
// highlight-start
const runAllPromises = () => new Promise(setImmediate)
// highlight-end

// highlight-start
test('new item is added to the UI when the form is successfully submitted', async () => {
  // highlight-end
  // Instead of making a real API call, mock the helper to return a
  // resolved promise with the data that would come back from the API
  submitNewItem.mockResolvedValueOnce({ id: 14, title: 'Gucci sneakers' })

  const component = mount(<Adder />)
  const preventDefault = jest.fn()

  component
    .find('[data-testid="addform-form"]')
    .simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)

  // highlight-start
  await runAllPromises()

  // after waiting for all the promises to be exhausted
  // we can do our UI check
  component.update()
  expect(component.find('[data-testid="adder-items"]')).toHaveLength(1)
  // highlight-end
})
```

Wow! 🎉

There's a lot of shorthand going on with `runAllPromises`. The fully written out version would be something like:

```js
const runAllPromises = () => {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve()
    })
  })
}
```

We return a `Promise` that is resolved, when the `setImmediate` callback is called.

## The React Testing Library solution

As I mentioned in my previous article, React Testing Library is all about testing the UI from the user's experience. Our users aren't submitting the form and then waiting for promises to resolve. No, **they are waiting for the UI to update**! Even though we avoided using `component.instance()` with the Enzyme-based test, we're still kind of testing implementation details knowing that we have to `runAllPromises.`

To promote user-centric testing, React Testing Library has [async utilities](https://testing-library.com/docs/dom-testing-library/api-async) that mimic the user behavior of waiting. Specifically, there is a `waitFor()` method that allows you to _wait_ until the UI is ready. Using `waitFor`, our Enzyme test would look something like this:

```js
import { mount } from 'enzyme'
import Adder from './Adder'
import { submitNewItem } from '../utils'
import { waitFor } from '../testUtils'

jest.mock('../utils')

// highlight-start
// test is now `async`
test('new item is added to the UI when the form is successfully submitted', async () => {
  // highlight-end
  submitNewItem.mockImplementationOnce(() =>
    Promise.resolve({ id: 14, title: 'Gucci sneakers' }),
  )

  const component = mount(<Adder />)
  const preventDefault = jest.fn()

  component
    .find('[data-testid="addform-form"]')
    .simulate('submit', { preventDefault })

  expect(preventDefault).toHaveBeenCalledTimes(1)

  // highlight-start
  // we wait for the assertion to pass
  await waitFor(() => {
    component.update()
    expect(component.find('[data-testid="adder-items"]')).toHaveLength(1)
  })
  // highlight-end

  // more tests here
})
```

The `waitFor()` helper uses polling to wait until the callback function you pass to it is successful.

Before I stumbled across `runAllPromises`, I actually wrote an equivalent `waitFor()` that I could use with Enzyme:

```js
export const waitFor = (callback, { interval = 50, timeout = 1000 } = {}) =>
  act(
    () =>
      new Promise((resolve, reject) => {
        const startTime = Date.now()

        const nextInterval = () => {
          setTimeout(() => {
            try {
              callback()
              resolve()
            } catch (err) {
              if (Date.now() - startTime > timeout) {
                reject(new Error('Timed out.'))
              } else {
                nextInterval()
              }
            }
          }, interval)
        }

        nextInterval()
      }),
  )
```

The way this works is that the Jest assertions, like `.toHaveLength()`, will throw an `Error` when they fail. So `waitFor()` is continuing to poll as long as the `callback()` is throwing an error (i.e. the item has not yet been rendered). Once the assertion stops throwing an error, it was successful, so `waitFor()` resolves the promise, and test execution can continue on.

By using `await`, we wait on that promise to resolve and we've waited just like our users would wait. And if the assertion continues to fail, we'll eventually hit our timeout and the promise will be rejected. And the rejected promise will throw an `Error`, so the test case will fail just like other failed assertions.

After writing `waitFor`, I went into the [source code](https://github.com/testing-library/dom-testing-library/blob/aa7ed18486c3ab92141d54819eb7f213ddc6efb4/src/wait-for.js) to see how it was implemented in React Testing Library and its surprisingly different. Outside of the additional functionality it provides, they used a `setInterval` instead of successive `setTimeout` statements like I did. I went with the `setTimeout` route because I felt it was easier to manage the final timeout that way, but I wonder if there's an override in making lots of `setTimeout` calls? It proves that **there's never a single "right way."**

One final note, in React Testing Library the [`findBy*`](https://testing-library.com/docs/dom-testing-library/api-queries#findby) queries return a promise which resolves when an element is found that matches the given query. **The `findBy` query is basically a convenience wrapper around [`waitFor`](https://testing-library.com/docs/api-async#waitfor)**. In Enzyme we could similarly create a wrapper over our `waitFor` implementation, but I still feel that `runAllPromises` solution is probably simpler, and obviously less code.

---

As I've mentioned many times before, I really prefer React Testing Library's approach to "user-based" testing. But at least now when I have to work in Enzyme environments have a couple of tools that I can use to solve this async testing problem. But even still, this is yet another reason why I suggest you go with React Testing Library over Enzyme. 🙃

Keep learning my friends. 🤓
