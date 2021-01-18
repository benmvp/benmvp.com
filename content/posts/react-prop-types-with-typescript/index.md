---
date: 2020-06-11
title: React Prop Types with TypeScript
shortDescription: A guide comparing React Prop Types to their equivalent TypeScript definitions
category: react
tags: [react, typescript, props]
hero: ./mixing-console-abigail-keenan-QdEn9s5Q_4w-unsplash.jpg
heroAlt: Sound mixing console
heroCredit: 'Photo by [Abigail Keenan](https://unsplash.com/@akeenster)'
---

If you're wanting to use [TypeScript](https://www.typescriptlang.org/) with React, the first thing you need to figure out is how to define the prop types in TypeScript. In vanilla React, defining the prop types (via the [`prop-types`](https://www.npmjs.com/package/prop-types)) package is optional. But with TypeScript, **everything must be typed**, either implicitly or explicitly.

Below are mappings from `PropTypes` to TypeScript types that you can use as a resource.

## Primitive types

Prop types:

```js
Example.propTypes = {
  message: PropTypes.string,
  count: PropTypes.number,
  disabled: PropTypes.bool,
  level: PropTypes.symbol,
}
```

TypeScript:

```ts
interface Props {
  message: string
  count: number
  disabled: boolean
  level: Symbol
}
```

## Special types

Prop types:

```js
Example.propTypes = {
  error: PropTypes.instanceOf(Error),
  children: PropTypes.node,
  status: PropTypes.oneOf(['inactive', 'inProgress', 'success', 'failed']),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Error),
  ]),
}
```

TypeScript:

```ts
interface Props {
  error: Error
  children: React.ReactNode
  status: 'inactive' | 'inProgress' | 'success' | 'failed'
  value: string | number | Error
}
```

## Array & object types

Prop types:

```js
Example.propTypes = {
  style: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  person: PropTypes.exact({
    name: PropTypes.string,
    age: PropTypes.number,
    employed: PropTypes.bool,
    status: PropTypes.oneOf([
      'single',
      'dating',
      'engaged',
      'married',
      'divorced',
      'widowed',
      'other',
    ]),
  }),
  names: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      active: PropTypes.boolean,
    }),
  ),
}
```

TypeScript:

```ts
interface Props {
  style: {
    color: string
    fontSize: number
  }
  person: {
    name: string
    age: number
    employed: boolean
    status:
      | 'single'
      | 'dating'
      | 'engaged'
      | 'married'
      | 'divorced'
      | 'widowed'
      | 'other'
  }
  names: string[]
  items: {
    id: number
    title: string
    active: boolean
  }[]
}
```

> NOTE: `PropTypes.shape()` allows for additional properties outside of those to be included in the object, so technically the equivalent TypeScript type is an [index type](https://www.typescriptlang.org/docs/handbook/advanced-types.html#index-types-and-index-signatures). But generally, when folks use `PropTypes.shape()` they really mean `PropTypes.exact()`.

## Function types

Prop types:

```js
Example.propTypes = {
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onSelect: PropTypes.func,
}
```

TypeScript:

```ts
interface Props {
  onClick: () => void
  onChange: (val: string) => void
  onSelect: (id: string, val: number) => void
}
```

> NOTE: As you can see, function prop types do not define their interface, while TypeScript functions have an explicit definition of their params and return value.

## Required vs. Optional

Don't forget! With `PropTypes`, the props are all optional by default and you have to use `.isRequired`. With TypeScript, all props are **required by default**, so you need to mark them as optional using `?`:

Prop Types:

```js
Example.propTypes = {
  description: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
}
```

TypeScript:

```ts
interface Props {
  description: string
  isActive?: boolean
}
```

## Attend a minishop!

Are you interested in learning more about how you can leverage TypeScript within React to eliminate bugs and feel more confident about your code? I have a [TypeScript for React Developers](/minishops/typescript-for-react-developers/) minishop that you can register for in order to learn more!

In addition to diving deeper into type-checking props, we'll get hands-on experience type-checking common hooks (`useState`, `useEffect`, etc), forms and custom events, and many other features that will help you write quality code. [Register today](/minishops/typescript-for-react-developers/)!

Keep learning my friends. 🤓
