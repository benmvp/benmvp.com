---
date: 2020-11-22
title: Type-checking React useReducer in TypeScript
shortDescription: How TypeScript discriminating unions provide type safety to the useReducer hook
category: TypeScript
tags: [react, hooks]
hero: ./coffee-bean-funnel-shengjun-shi-kUUacyTdChM-unsplash.jpg
heroAlt: Funnel of coffee beans
heroCredit: 'Photo by [Shengjun Shi](https://unsplash.com/@cacomistle)'
---

The biggest benefit I've found with TypeScript is type-checking functions. TypeScript ensures that I pass the correct types to a helper function and it provides the type of the return value for me to use. Similarly, when writing functions I can be assured that I'm receiving the correct types as arguments and that I return the type that I intend.

In React, this manifests itself in several ways. The main way is [type-checking props](/blog/react-prop-types-with-typescript/). After all, **React components are just special functions with input (props) and output (markup)**. And we can do all kids of sophisticated things leveraging TypeScript's ability to type-check functions, like setting up [conditional React props](/blog/conditional-react-props-typescript/), creating [polymorphic React components](/blog/polymorphic-react-components-typescript/), and defining [generic React components](/blog/generic-react-components-typescript/).

React also has [hooks](https://reactjs.org/docs/hooks-intro.html) which are special types of functions that let us use state and other React features using function components. In general, **there's nothing really special needed to type hooks**. For instance, we can let [type inference](https://www.typescriptlang.org/docs/handbook/type-inference.html) do all the work with [`useState`](https://reactjs.org/docs/hooks-state.html):

```typescript
import React, { useState } from 'react'

const Example = () => {
  // with type inference TypeScript knows that
  // `count` is a number` & `setCount` takes a number
  // based on `0` being passed as an initial value
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount((curCount) => count + 1)}>
        Click me
      </button>
    </div>
  )
}
```

Because of how `useState` is typed (it's a [generic function](https://www.typescriptlang.org/docs/handbook/generics.html)), `count` is inferred to be a `number` and `setCount` is inferred to be a function that is passed a `number`. This is all because of the initial value `0` (a number) that was passed to `useState`.

However, **[`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) _is_ one hook that requires additional type hand-holding**. The docs suggest using `useReducer` over `useState` when we "have complex state logic that involves multiple sub-values." But to try to keep things as simple as possible, let's take the traditional [Redux todos example](https://github.com/reduxjs/redux/tree/176e66adc9a90df2690620075e82dca21cc1cd25/examples/todos) and convert it to `useReducer` + Typescript:

```typescript
type Visibility = 'all' | 'completed' | 'active'
interface State {
  todos: {
    id: number
    text: string
    completed: boolean
  }[]
  visibility: Visibility
}
type Action =
  | { type: 'add_todo'; id: number; text: string }
  | { type: 'toggle_todo'; id: number }
  | { type: 'set_visibility'; visibility: Visibility }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.id, text: action.text, completed: false },
        ],
      }
    case 'toggle_todo':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      }
    case 'set_visibility':
      return {
        ...state,
        visibility: action.visibility,
      }
  }
}

let nextTodoId = 0
const Example = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    visibility: 'all',
  })

  return (
    <main>
      <h1>Todos!</h1>

      <TodoForm
        onSubmit={(text) => {
          dispatch({ type: 'add_todo', text, id: nextTodoId++ })
        }}
      />

      <TodosList
        todos={state.todos}
        filter={state.visibility}
        onToggleCompleted={(id) => {
          dispatch({ type: 'toggle_todo', id })
        }}
      />

      <RadioGroup
        value={state.visibility}
        onChange={(newVisibility) =>
          dispatch({ type: 'set_visibility', visibility: newVisibility })
        }
      >
        <Radio value="all">All</Radio>
        <Radio value="completed">Completed</Radio>
        <Radio value="active">Active</Radio>
      </RadioGroup>
    </main>
  )
}
```

Ok, I know that may look like a lot. But it's actually only the top portion that is the TypeScript addition. The majority of the code is the implementation which leverages type inference to ensure type safety.

Let's break thing down bit by bit.

```typescript
type Visibility = 'all' | 'completed' | 'active'
interface State {
  todos: {
    id: number
    text: string
    completed: boolean
  }[]
  visibility: Visibility
}
```

First we define the shape of our state. Just like with props, **we can't get away with hand-waving the state shape or defining it implicitly in code**. It has to be explicitly defined. In this case, our state has two required properties: `todos` (an array of todo objects with their own required properties) and `visibility` (an "enum" of visibility states).

```typescript
type Action =
  | { type: 'add_todo'; id: number; text: string }
  | { type: 'toggle_todo'; id: number }
  | { type: 'set_visibility'; visibility: Visibility }
```

Next, using a [discriminated union](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions), we define the valid actions. **This discriminated union is what becomes the linchpin and provides the strong typing for `useReducer`**.

It means that an action can _only_ have one of these 3 shapes. The fact that we cannot have a `type` other than the 3 listed catches any typos and prevents the need for having shared constants. An `'add_todo'` action _must_ have both `id` & `text` properties, whereas a `'toggle_todo'` cannot have a `text` property. The `visibility` property for `'set_visibility'` must be one of the 3 `Visibility` options (which also matches the `visibility` state property).

```typescript
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'add_todo':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: action.id, text: action.text, completed: false },
        ],
      }
    case 'toggle_todo':
    // ...
    case 'set_visibility':
    // ...
  }
}
```

The `reducer` function is specifically typed to take `State` and `Action` arguments, and return a `State` object. **This function definition provides enough type information that the rest of the reducer can be strongly typed just using type inference**.

When we use the `switch` on `action.type`, we can _only_ have `case` statements for `'add_todo'`, `'toggle_todo'` and `'set_visibility'`. Any other `case` values will be an error. Furthermore, if we leave off one of the actions from the `switch`, TypeScript will know that there's a chance that the function can return `undefined`. And because we say the reducer must return `State`, TypeScript will complain thanks to [union exhaustiveness checking](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking).

Within a given `case` statement, TypeScript now knows which action we are in. Therefore trying to access `action.visibility` within `'add_todo'`, `action.text` within `'toggle_todo'` or `action.id` within `'set_visibility'` will all be errors. Once again this is all thanks to the `Action` being a discriminated union.

Last, but not least, the return values must be valid `State` objects. So if I forget to `...state`, I will be missing properties of `State` and TypeScript will complain.

All pretty sweet, huh? 🤯

```typescript
// highlight-range{3-6,13}
let nextTodoId = 0
const Example = () => {
  const [state, dispatch] = useReducer(reducer, {
    todos: [],
    visibility: 'all',
  })

  return (
    <main>
      <h1>Todos!</h1>
      <TodoForm
        onSubmit={(text) => {
          dispatch({ type: 'add_todo', text, id: nextTodoId++ })
        }}
      />
      ...
    </main>
  )
}
```

Now, down in the component itself, `useReducer` (also a generic function by the way) is able to infer types based on the type of the `reducer` function. So it knows `state` is `State` and that `dispatch` is a function that can only dispatch `Action` objects. In addition, TypeScript ensures that the initial state (the second parameter of `useReducer`) is a full `State` object.

Finally, when we call `dispatch`, it must be a valid `Action` object. There's no need to use a constant for the `'add_todo'` type because it must match one of the valid `Action` types. If we were to change the name of the type to just `'add'`, we would get TypeScript errors.

---

So that's it! Properly typing `useReducer` has a couple of extra moving parts in TypeScript. You have to define your state and your actions. But we're already implicitly defining it in our code, so I find that it's nice to have it be explicit. If `useReducer` is intended to be used when your state is complex, it's probably best that everything is defined up front.

And then of course we gain tons of type safety that will help us sleep better at night. 😄

Keep learning my friends. 🤓
