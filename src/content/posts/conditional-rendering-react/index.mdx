---
date: 2021-05-09
title: Conditional rendering in React
shortDescription: 6 approaches for conditionally rendering JSX markup within a React component
category: React
tags: [react, jsx, conditional, rendering]
hero: ./fork-in-the-road-jens-lelie-u0vgcIOQG08-unsplash.jpg
heroAlt: Fork in the road around two trees
heroCredit: 'Photo by [Jens Lelie](https://unsplash.com/@madebyjens)'
---

Because React uses [JSX](https://reactjs.org/docs/introducing-jsx.html) for rendering component UI, and JSX is ["Just JavaScript"™](https://reactjs.org/docs/introducing-jsx.html#jsx-represents-objects) under the hood, there is no special template syntax for conditionals like we find in other JavaScript frameworks. While this may seem like a drawback (especially to newcomers), it allows us to use the full power of JavaScript to conditionally render UI within a React component.

If you're coming from an HTML templating language like [Handlebars](https://handlebarsjs.com/), [EJS](https://ejs.co/), or others, you may think you could conditionally render content within a React component like so:

```js
// THIS DOESN'T WORK!!! 👎🏾👎🏾👎🏾
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>

      <p>View your results below</p>

      <% if (results.length) { %>
        <Items items={results} />
      <% } %>
    </main>
  )
}
```

We're _trying_ to conditionally render the `<Items />` component if the `results` array has items in it. But JSX doesn't work this way. Conditionally rendering content in a component is a fundamental React skill. It comes up all the time. As such, it's included in my [Zero to React with Hooks Minishop](/minishops/zero-to-react-with-hooks/).

So let's look at all the various ways we can accomplish conditional Rendering in React.

## 1. Element variables

We can store JSX in variables. When we want to conditionally render some content, we can conditionally assign values to variables and then render them.

```js
const Page = ({ results }) => {
  // highlight-start
  let resultsUi

  if (results.length) {
    resultsUi = <Items items={results} />
  }
  // highlight-end

  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {resultsUi}
    </main>
  )
}
```

We initialize `resultsUi` to `undefined`. If there are no items in `results`, then we'll render `undefined` in the UI, and React will render nothing. However, if there are items in `results`, we assign `<Items />` to `resultsUi` and that's what we'll render instead. It's kinda mind boggling that we can assign "markup" to a variable. But because JSX under the hood is a call to [`React.createElement()`](https://reactjs.org/docs/react-without-jsx.html), it totally works.

And what if we also want to render some UI when there are no results?

```js
const Page = ({ results }) => {
  // highlight-start
  let resultsUi = <p>There are no results to view.</p>

  if (results.length) {
    resultsUi = <Items items={results} />
  }
  // highlight-end

  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {resultsUi}
    </main>
  )
}
```

When we need to render something for both the `false` and the `true` case, we can initialize `resultsUi` to the `false` condition and then reassign on the `true`.

We can apply the same approach even if there are multiple conditions. We can use `if`, one or more `if else` statements, and an `else` statement. Or we can use a `switch` instead.

**This used to be my preferred method of conditional rendering earlier on because I liked how it kept the JSX "clean."** There was no logic in the JSX; just rendering. But it can be verbose, especially for something as simple as this example. The rendering logic and the rendering itself are separated. And if there are multiple conditionally rendered pieces of UI, we have to define multiple of these variables up top.

## 2. Inline logical `&&`

It's more common, however, to do the conditional rendering within the context of the JSX. And probably the most common inline approach is using the logical `&&`.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {results.length > 0 && <Items items={results} />}
    </main>
  )
}
```

The curly braces (`{}`) in JSX take any JavaScript expression. Typically we'll only put a variable like we did with the `{resultsUi}` element variable. But we can have any expression that results in valid JSX content.

So here if there are no items in `results`, then the expression returns `false`. React renders nothing for `false`. However, if there are items in `results` (`results.length > 0` is `true`), then it'll render the `<Items />` component.

I held out for several years using this approach for a couple of reasons. First, there's a subtle gotcha. If we wrote the expression excluding the `> 0`:

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {results.length && <Items items={results} />}
    </main>
  )
}
```

Our UI would render a `0` when there are no items in `results`. **React doesn't render `false` but it will render `0`.** So while `0` is a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value just like `false`, the end result is quite different. I've definitely made this mistake a number of times.

The other reason is because ouf formatting. In this example, the conditional is a one-liner, so it's easy. But if the conditional markup we want to render has multiple elements and components with multiple props, the formatting gets messier. And developers would format it in ways that made it hard for me to understand where the conditional started and ended.

[Prettier](https://prettier.io/) got rid of this problem completely because it provides consistent formatting as well as visually "correct" formatting.

## 3. Inline ternary

The logical `&&` approach works when we only need to render something when the inline conditional is `true`. We can use a [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) when we want to use inline conditional rendering to render something for both the `false` and `true` conditions.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-start
      {results.length ? (
        <Items items={results} />
      ) : (
        <p>There are no results to view.</p>
      )}
      // highlight-end
    </main>
  )
}
```

It's like using the `if`-`else` example above with the element variable except it's inline as a single expression. This is the common way developers write conditional rendering when they have to render something for both cases.

I used to avoid this approach as well for many of the same reasons as the logical `&&`. Many times the condition itself will be a compound condition (with have a logical `&&` or logical `||`) so it felt like a lot of logic going on within the JSX. And the formatting here would be even worse. But, again, Prettier makes that a non-issue. And folks over time have gotten use to using ternary expressions in general.

## 4. Component early return

Let's go back to the logical `&&` solution where we only needed to render for the `true` case:

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      {results.length > 0 && <Items items={results} />}
    </main>
  )
}
```

Another alternative is to push the conditional down into the rendered component.

```js
const Items = ({ items }) => {
  // if there are no items, prevent itself from rendering
  // by returning `null` early
  // highlight-start
  if (!items.length) {
    return null
  }
  // highlight-end

  // render out the items
}

const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      <Items items={results} />
    </main>
  )
}
```

So now, we always render the `<Items />` component. It becomes responsible for not rendering itself when there are no items. **It accomplishes this by return `null` early instead of returning normal JSX.** This approach comes in handy if many components render `<Items />` components. Instead of having all of those components conditionally render `<Items />` based on the data they pass to it, they can all render it normally and `Items` will prevent itself from rendering.

## 5. Helper function

If there are a lot of calculations needed to construct a condition, it would be nice to have them grouped together as well as located close to the render. I've used helper functions for this.

```js
const Page = ({ results }) => {
  // highlight-start
  const renderResults = () => {
    if (!results.length) {
      return <p>There are no results to view.</p>
    }

    return <Items items={results} />
  }
  // highlight-end

  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {renderResults()}
    </main>
  )
}
```

So we were able to write this condition using a ternary, so of course there is really no advantage in wrapping _this_ code in a function. But this simple example explains the code structure.

**In my opinion, a helper function can be better than having multiple variables to calculate a condition at the top of the component.** This is especially when there are multiple calculations needed for multiple conditionally rendered UI.

This approach puts the calculations, condition and UI rendering together. It's kind of a hybrid of the element variables approach because it keeps the JSX "clean" yet still allows the UI and conditions to be collocated.

However, it does separate the final component rendering. There is an inline option for using helper functions.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-start
      {(() => {
        if (!results.length) {
          return <p>There are no results to view.</p>
        }

        return <Items items={results} />
      })()}
      // highlight-end
    </main>
  )
}
```

The inline helper function is an [Immediately-Invoked Function Expression (IIFE)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) for rendering JSX. I've never in my 6+ years of writing React code ever done this. Or even thought to do it really. But I recently saw it and had to include it just for funsies. 😂

## 6. JSX control statements

Honestly, one of the 5 options above should suffice. But I did want to share an option that used to be more popular in the beginning when JSX was still new and folks hadn't quite gotten the hang of just using JavaScript.

The [`jsx-control-statements`](https://github.com/AlexGilleran/jsx-control-statements) Babel plugin allows us to use component syntax to write conditions.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-start
      <If condition={results.length}>
        <Items items={results} />
      </If>
      // highlight-end
    </main>
  )
}
```

It's a [Babel plugin](https://babeljs.io/docs/en/plugins/) so it transforms our code. It doesn't execute at runtime. In fact, it transforms our code to a ternary!

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-next-line
      {results.length ? <Items items={results} /> : null}
    </main>
  )
}
```

If we have multiple conditions, there are the `<Choose>`, `<When>`, and `<Otherwise>` components.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-start
      <Choose>
        <When condition={results.length}>
          <Items items={results} />
        </When>
        <Otherwise>
          <p>There are no results to view.</p>
        </Otherwise>
      </Choose>
      // highlight-end
    </main>
  )
}
```

This code will be transformed into a ternary as well.

```js
const Page = ({ results }) => {
  return (
    <main>
      <h1>Your results</h1>
      <p>View your results below</p>
      // highlight-start
      {results.length ? (
        <Items items={results} />
      ) : (
        <p>There are no results to view.</p>
      )}
      // highlight-end
    </main>
  )
}
```

If I had known about this plugin 5 years ago, I may have considered using it just because it keeps the render "clean." Even logic is expressed as components! But at this point, we've all got a hang of logic using the logical `&&` and ternaries. Plus I'm not quite sure how nicely this would play with TypeScript, so it would be a non-starter for me!

---

So that's all 6! You may be asking, "so which approach should I use?" And as with everything in software development it depends. It depends on how many conditions you have and how complex they are. It depends on how much UI you are rendering with each condition. It depends on how readable the resulting code looks.

But _in general_:

- When there's only one condition, I recommend the inline logical `&&` approach
- When there are two conditions (`true`/`false`), I recommend an inline ternary
- When there are multiple conditions, I recommend element variables

What are your recommendations? Which approaches do you use? Let me know! Let's chat on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
