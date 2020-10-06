---
date: 2020-05-29
title: ECMAScript pattern matching proposal
shortDescription: Analyzing a potential future feature of JavaScript that could make testing object contents much easier
category: javascript
tags: [javascript, ecmascript, proposals, til]
hero: ./pattern-quilt-rug-raul-cacho-oses-z4x9ITBe040-unsplash.jpg
heroAlt: A photo of a patchwork rug
heroCredit: 'Photo by [Raul Cacho Oses](https://unsplash.com/@raulcachophoto)'
---

Over 4 years ago, I wrapped up the [Learning ES6 series](/learning-es6-series/) where I explained the majority of the features in ES2015 in great detail. It was a lot of fun and reignited my passion for JavaScript.

Instead of continuing with big huge releases as they did with ES2015, the TC39 committee decided to switch to a [proposal process](https://tc39.es/process-document/). A feature that has **reached Stage 4 will be in the next year’s release** of ECMAScript. Some proposals advance quickly, others move slowly, and some even stall and get abandoned.

I gave a talk at Node Summit 2018 entitled [ES.next features that'll make ya 💃🕺🏾](https://www.youtube.com/watch?v=9yK4t2CuIHQ) where I explained the proposal process while showcasing some features in various stages of the process. The majority of those proposals are now official features in ECMAScript, but there are always more proposals getting added. The one I just learned about from a coworker is the [pattern matching proposal](https://github.com/tc39/proposal-pattern-matching).

The proposal is currently sitting at Stage 1, meaning that the proposal has been formally introduced to the committee, it has a champion, and the committee will devote discussion time to it in future committee meetings. Here it is at a glance implementing a [redux reducer](https://redux.js.org/basics/reducers):

```js
const todos = (state = initialState, action) => {
  return case (action) {
    when {type: 'set-visibility-filter', filter: visFilter} ->
      ({...state, visFilter}),
    when {type: 'add-todo', text} ->
      ({...state, todos: [...state.todos, {text}]}),
    when {type: 'toggle-todo', index} -> (
      {
        ...state,
        todos: state.todos.map((todo, idx) => idx === index
          ? {...todo, done: !todo.done}
          : todo
        )
      }
    )
    when _ -> state
  }
}
```

There are several things to digest here.

First, the syntax (as it stands today) replaces `switch` with `case`:

```js
return case (action) {
```

In addition, there’s also the `return` keyword before the `case`. This means that the entire `case` statement is an expression. It’s basically **a multi-case, better-organized [ternary statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)**.

The most interesting part and the crux of the whole proposal is the `when` clause:

```js
when {type: 'set-visibility-filter', filter: visFilter} ->
  ({...state, visFilter}),
```

The `when` clause is much like [`_.isMatch`](https://lodash.com/docs/4.17.15#isMatch) from `lodash` which returns `true` if the object partially matches the specified match object. This is super powerful because it allows us to use a **`switch`-like syntax for cases that require more complex matching**. In this case (pun intended), we’re matching if the `action` has a `type` property that equals `'set-visibility-filter'` and a `filter` property that equals `visFilter`.

What’s also different in this code fragment is the `->` operator. It’s an arrow (`->`) instead of the fat arrow (`=>`) we use for arrow functions. Likely a different operator is needed in order for the parser to understand what exactly is happening. This isn’t a function. None of the examples in the proposal show it, but I’m assuming we’ll be able to wrap multiple statements in curly braces (`{}`) so that we can have multiple lines of logic before a `return` statement.

The last bit of unique syntax is here:

```js
when _ -> state
```

This is basically the `default` case in a `switch` statement. It still uses the same `when` keyword, but uses an underscore (`_`) as the unknown or catch-all matcher. I'd be surprised if that sticks. 😄

This proposal draws heavily from corresponding features in [Rust](https://doc.rust-lang.org/1.6.0/book/patterns.html), [F#](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/pattern-matching), [Scala](http://www.scala-lang.org/files/archive/spec/2.11/08-pattern-matching.html), and [Elixir/Erlang](https://elixir-lang.org/getting-started/pattern-matching.html). Given that the proposal is only in Stage 1, it’s **highly likely that the syntax will change** as it moves through the proposal process. It’s also been sitting in Stage 1 since it was formally introduced in the May 2018 TC39 meeting. That’s over 2 years! Still, I’m holding out hope for it (or some version of it) to be approved and make it into the spec!

If you’re interested in knowing what other features are coming down the pike, peruse the TC39’s [Active Proposals](https://github.com/tc39/proposals) list.

Keep learning my friends. 🤓
