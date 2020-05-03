---
date: 2020-04-22
title: Async testing with Enzyme & React
category: react
tags: [react, testing]
hero: ./wait-sign-kai-pilger-1k3vsv7iIIc-unsplash.jpeg
heroAlt: Wait crosswalk sign in New York City
heroCredit: 'Photo by [Kai Pilger](https://unsplash.com/@kaip)'
published: false
---

Yesterday I wrote a blog post about how I would [choose React Testing Library over Enzyme](/blog/react-testing-library-over-enzyme/). At the end, I mentioned that there were many other "nuances about [React Testing Library](https://testing-library.com/react) that help prevent you from testing implementation details." I was planning to just leave it at that, but today I ran into one such nuance while working in a codebase that used [Enzyme](https://enzymejs.github.io/enzyme/). And I just **had** to share it.

It has to do with the complexity around testing async components with Enzyme. Let's say for example you had a component that had a form. And `onSubmit` of that form you make an API call to `POST` the form data. And when the successful response returns, you add a new item to a list. It could look something like this:

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

When the `<AddForm />` submits, it calls `submitNewItem` which is a helper function wrapping [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (or [axios](https://github.com/axios/axios) if you prefer). When we receive the `newItem` we call `setItems()` with a new array that has the `newItem` appended. By the way, since the new value of `items` is computed using its previous value, we need to [pass a function to `setItems`](https://reactjs.org/docs/hooks-reference.html#functional-updates).

So we set up our test like so, but we run into a problem:

```js
import { mount } from 'enzyme'
import Adder from './Adder'
import { submitNewItem } from '../utils'

jest.mock('../utils')

test('new item is added to the UI when the form is successfully submitted', () => {
  submitNewItem.mockImplementationOnce(() =>
    Promise.resolve({ id: 14, title: 'Gucci sneakers' }),
  )

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

We want to test that the `newItem` was successfully added to state by _checking its existence in the UI_, but it's difficult because it happens asynchronously after `submitNewItem` has resolved its promise. If you debug the code, you'll see that the assertion above runs **before** the API call even resolves. Even though we've mocked out `submitNewItem`, we still don't have anywhere to "hook" into to know when the promise has resolved so that we can safely verify the UI.

If you Google around, you'll likely come across [this issue in the Enzyme repo](https://github.com/enzymejs/enzyme/issues/1587) that started nearly 2 years ago. And it's full of crazy workarounds that pretty much all involve testing implementation details by reaching into `component.instance()`. But that's not what we want to do!

Basically we need to _wait_ until the UI is ready, but we don't want to arbitrarily wait some amount of milliseconds. What you can do is **poll** until the UI is ready with this handy dandy helper function:

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

Then in our test, we would use it like:

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

The way this works is that the Jest assertions like `.toHaveLength()` will throw an error when they fail. So `waitFor()` is continuing to poll as long as the `callback()` is throwing an error (i.e. the item has not yet been rendered). Once the assertion stops throwing an error, it was successful, so `waitFor()` resolves the Promise, and test execution can continue on.

By using `await`, we wait on that promise to resolve and we've solved our waiting problem. And if the assertion continues to fail, we'll eventually hit our timeout and the promise will be rejected. And the rejected promise will throw an error, so the test case will fail kinda sorta like normal. It's certainly not the **ideal** solution, but it definitely works out well.

I wish I could say I just came up with this solution on my own, but I didn't. I Googled "React Testing Library async" figuring it must have solved the problem. And it had. I came upon its [Async utilities page](https://testing-library.com/docs/dom-testing-library/api-async), which, you guessed it, has a `waitFor()` utility. Based on the docs, I then wrote a simplified version of `waitFor()` like above.

I later went into the [source code](https://github.com/testing-library/dom-testing-library/blob/aa7ed18486c3ab92141d54819eb7f213ddc6efb4/src/wait-for.js) to see how it was implemented in React Testing Library and its surprisingly different. Outside of the obvious additional functionality it provides, they used a `setInterval` instead of successive `setTimeout` statements. I went my route because I felt it was easier to manage the timeout that way. It proves that there's never a single "right way."

Anyway. this is yet another reason why I suggest you go with React Testing Library over Enzyme. 🙃

Keep learning my friends. 🤓
