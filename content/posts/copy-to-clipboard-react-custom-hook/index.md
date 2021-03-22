---
date: 2021-03-21
title: Copy to clipboard React custom Hook
shortDescription: A React custom Hook wrapping the Clipboard web API to enable a copy to clipboard UX
category: react
tags: [react, hooks, clipboard, web, apis]
hero: ./clipboard-bethany-cirlincione-743f0Dy8bFE-unsplash.jpg
heroAlt: A clipboard next to a pretty flower
heroCredit: 'Photo by [Bethany Cirlincione](https://unsplash.com/@bravelyinspired)'
---

The thing I like about React custom Hooks is that we can create a Hook for nearly anything. On the [blog index](/blog/), each blog post card has a "Copy URL" button that copies the URL of the post to the clipboard. Back in the day, this was only possible on the web [with Flash](https://code.tutsplus.com/tutorials/quick-tip-create-a-copy-to-clipboard-button-in-flash--active-3123) (RIP). But now thanks to the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) we can do this directly in the browser. No Flash needed.

The `Clipboard` interface has a [`writeText()`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText) method for writing text to the system clipboard. On its own it's fairly straightforward. But we can wrap it in a React custom hook to also manage the success/failure states of the copy. Here's the full code:

```javascript
const useCopyToClipboard = (text, notifyTimeout = 2500) => {
  const [copyStatus, setCopyStatus] = useState('inactive')
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [text])

  useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
  }, [copyStatus])

  return [copyStatus, copy]
}

const CopyUrlButton = ({ url }) => {
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url)
  const buttonText = 'Copy URL'

  if (copyUrlStatus === 'copied') {
    buttonText = 'Copied'
  } else if (copyUrlStatus === 'failed') {
    buttonText = 'Copy failed!'
  }

  return <button onClick={copyUrl}>{buttonText}</button>
}
```

You can take this implementation of `useCopyToClipboard` and use it in your React app right away. It assumes one use per text to be copied. Review the [`Clipboard` browser compatibility table](https://caniuse.com/clipboard) to ensure it works in your supported browsers. But if you're interested in learning how all the parts work together, feel free to read on!

```js
const [copyStatus, setCopyStatus] = useState('inactive')
```

We use the [`useState` Hook](https://reactjs.org/docs/hooks-state.html) to maintain the copy status. It's one of `'inactive'` (the default state), `'success'` (after a successful write to the clipboard) and `'failed'` (after a failed write to the clipboard).

```js
const copy = useCallback(() => {
  // highlight-next-line
  navigator.clipboard.writeText(text).then(
    () => setCopyStatus('copied'),
    () => setCopyStatus('failed'),
  )
}, [text])
```

We create a copy function that we'll return (along with the `copyStatus`) from our custom Hook. The UI calls this function when the user wants to copy the text (usually a button click). When the user copies the text, we call `clipboard.writeText()`, and change the `copyStatus` to `'success'` or `'failed'` depending on the outcome.

Our `useCopyToClipboard` Hook is re-executed every time that the component re-renders. We don't want to create a new function reference each time. Functions returned by custom Hooks often are passed as props to child components. If these functions are recreated with each re-render, they could cause unnecessary re-renders of the child components. As a result, **it's typically good practice to ensure that functions returned by custom Hooks have stable references**. And we create stable references by memoizing the functions using the [`useCallback` Hook](https://reactjs.org/docs/hooks-reference.html#usecallback).

```js
useEffect(() => {
  if (copyStatus === 'inactive') {
    return
  }

  // highlight-next-line
  const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

  return () => clearTimeout(timeoutId)
}, [copyStatus])
```

The user may want to copy again, so we need a way to reset the `copyStatus`. The [`useEffect` Hook](https://reactjs.org/docs/hooks-effect.html) here sets a timeout for how long our custom Hook remains in the its `'success'` or `'failed'` state before automatically returning to the default `'inactive'` state.

```js
return [copyStatus, copy]
```

Lastly, our custom Hook returns the `copyStatus` and the memoized `copy` function as a 2-element "tuple" array for the component to use.

```js
const CopyUrlButton = ({ url }) => {
  // highlight-next-line
  const [copyUrlStatus, copyUrl] = useCopyToClipboard(url)
  const buttonText = 'Copy URL'

  if (copyUrlStatus === 'copied') {
    buttonText = 'Copied'
  } else if (copyUrlStatus === 'failed') {
    buttonText = 'Copy failed!'
  }

  // highlight-next-line
  return <button onClick={copyUrl}>{buttonText}</button>
}
```

Within a component, we pass the text we want copied as a parameter to `useCopyToClipboard`. If the app provides UI for copying different pieces of text, we need multiple calls to `useCopyToClipboard`. Each one has its own `copyStatus` and `copy` function.

The component can create whatever UI it likes based on the `copyStatus`. In this example, the `CopyUrlButton` component uses the `copyUrlStatus` to control the button text. After the text is copied, the button text is `'Copied'` or `'Copy failed'`, depending on the success or failure of the clipboard write. But after the timeout, the text returns to `'Copy URL'`. Clicking the button, triggers its `onClick` prop, which is the `copyUrl` function.

That's it!

## TypeScript for fun

For those using TypeScript the additional types needed are minimal.

```typescript
// highlight-start
type CopyStatus = 'inactive' | 'copied' | 'failed'

const useCopyToClipboard = (
  text: string,
  notifyTimeout = 2500,
): [CopyStatus, () => void] => {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('inactive')
  // highlight-end
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text).then(
      () => setCopyStatus('copied'),
      () => setCopyStatus('failed'),
    )
  }, [text])

  useEffect(() => {
    if (copyStatus === 'inactive') {
      return
    }

    const timeoutId = setTimeout(() => setCopyStatus('inactive'), notifyTimeout)

    return () => clearTimeout(timeoutId)
  }, [copyStatus])

  return [copyStatus, copy]
}
```

Keep learning my friends. 🤓
