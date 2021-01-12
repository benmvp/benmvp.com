---
date: 2020-11-08
title: Polymorphic React Components in TypeScript
shortDescription: How to define strongly-typed React components that can inherit props from arbitrary HTML elements
category: typescript
tags: [react, components, design-system]
hero: ./green-white-chameleon-david-clode-eZ6jB5dOlcw-unsplash.jpg
heroAlt: Green and white chameleon on a tree branch
heroCredit: 'Photo by [David Clode](https://unsplash.com/@davidclode)'
---

Last week I wrote a post about [conditional React prop types with TypeScript](/blog/conditional-react-props-typescript/) that generated a lot of [discussion on Twitter](https://twitter.com/benmvp/status/1323415760220299264). So I wanna continue the theme of how TypeScript levels up React, this time talking about creating _polymorphic components_ with TypeScript.

It's quite possible that you've never heard of a polymorphic component before. It's a pattern for code reuse that's not nearly as popular as [higher-order components](https://ui.dev/react-higher-order-components/), [render props](https://ui.dev/react-render-props/), or, of course, [custom hooks](https://reactjs.org/docs/hooks-custom.html). But it's probably the simplest one.

---

Let me quickly explain how a polymorphic component works. Let's say we have a shareable `<Text>` component that allows the caller to configure the `font`, `size` and `color` from a handful of options. Some sample calls would be:

```jsx
<Text font="thin" size="10" color="gray-50">
  Main Heading
</Text>

<Text font="heavy" size="5" color="gray-70">
  Name
</Text>

<Text font="regular" size="4" color="gray-90">
  Body text
</Text>
```

So we're reusing the same `<Text>` component to display drastically different typographies. And if you care at all about semantic HTML, your first question might be, "well what HTML element are we using to render the text?" And this is exactly the value of polymorphic components. In the first example we'd likely want to render an `<h1>`. The second should be a `<label>`. And the third, a `<p>`.

We can make `<Text>` "polymorphic" by adding an `as` prop to it that allows the caller to define the HTML tag to use:

```jsx
<Text as="h1" font="thin" size="10" color="gray-50">
  Main Heading
</Text>

<Text as="label" font="heavy" size="5" color="gray-70">
  Name
</Text>

<Text as="p" font="regular" size="4" color="gray-90">
  Body text
</Text>
```

And a basic implementation could look like:

```javascript
const Text = ({
  as,
  children,
  font = 'regular',
  size = '4',
  color = 'gray-40',
  ...other,
}) => {
  // imagine a helper that will generate a CSS class
  // string based on the selected visual props
  const classes = getClasses({font, size, color })
  // highlight-next-line
  const Component = as || 'span'

  return (
// highlight-next-line
    <Component {...other} className={classes}>
      {children}
    </Component>
  )
}
```

In the first highlighted line, we default the `as` prop to `'span'` (for a `<span>` tag), and assign it to the variable `Component`. **The variable must be capitalized when we're rendering it**, otherwise React will think it is the name of an HTML tag (`<as>`). This is [how JSX works](https://reactjs.org/docs/jsx-in-depth.html#user-defined-components-must-be-capitalized).

The `...other` is also important because we spread it into `<Component>` as well. This allows us to pass along additional attributes/props that we don't know about to the underlying element. An example is the `htmlFor` prop needed for the `<label>`:

```jsx
<Text as="label" htmlFor="name-field" font="heavy" size="5" color="gray-70">
  Name
</Text>
```

The problem is that the `Text` implementation doesn't prevent me from passing in unsupported props like an `href` for an `<h1>`:

```jsx
<Text
  as="h1"
  href="https://www.benmvp.com"
  font="thin"
  size="10"
  color="gray-50"
>
  Main Heading
</Text>
```

At runtime when React renders the code, it will complain in the console that `href` doesn't exist on `<h1>`. But I have to be paying attention to the console (and care enough to fix it). **There's nothing preventing the caller from passing bad props**.

Cue TypeScript.

---

TypeScript provides lots of benefit in React apps. But I've found its biggest benefit to be ensuring that our React component props are strongly typed. They can be statically checked instead of errors only discovered when the code has executed in the browser.

So in order for this to work, we need the `as` prop to be typed to accept any valid HTML element, and then in addition to `font`, `size`, `color` and `children`, **determine which props are valid based on that HTML element**.

There are likely several ways to solve this, but this is how I do it:

```typescript
import React from 'react'

interface Props<C extends React.ElementType> {
  /**
   * An override of the default HTML tag.
   * Can also be another React component. 😉
   */
  as?: C

  children: React.ReactNode
  color?: Color
  font?: 'thin' | 'regular' | 'heavy'
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
}

type TextProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>

const Text = <C extends React.ElementType = 'span'>({
  as,
  children,
  font = 'regular',
  size = '4',
  color = 'gray-40',
  ...other
}: TextProps<C>) => {
  const classes = getClasses({ font, size, color })
  const Component = as || 'span'

  return (
    <Component {...other} className={classes}>
      {children}
    </Component>
  )
}
```

This all works because of [TypeScript generics](https://www.typescriptlang.org/docs/handbook/generics.html), which is a whole huge post in and of itself that I really don't want to write (right now at least). But luckily [Shu Uesugi](https://twitter.com/chibicode) has already written a fabulous post called [_TypeScript Generics for People Who Gave Up on Understanding Generics_](https://ts.chibicode.com/generics) that explains TypeScript generics very well if you're still wanting to learn.

So the actual source code for `Text` is basically the same. It's the typing of the props that makes it so that I can add `htmlFor` when `as="label"`, but it's an error if I set `href="https://www.benmvp.com"` when `as="h1"`. So let's break down how this all works chunk by chunk.

```typescript
// highlight-start
interface Props<C extends React.ElementType> {
  as?: C
  // highlight-end

  children: React.ReactNode
  color?: Color
  font?: 'thin' | 'regular' | 'heavy'
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10'
}
```

In addition to the `children`, `color`, `font`, and `size` props which are "normal" we have the optional `as` prop which is of a generic type. I like to think of generics as "parameterized types." So the type of `as` is the parameter `C`, which is determined by the value the caller passes for `as`. This makes our `Props` generic or parameterized.

Now `C` can't be any ol' type, or even any `string`. We've restricted the type of `C` to types that "extend" [`React.ElementType`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2dfb801ec978b29ab81690a9b24ecb1f06c4eaf2/types/react/index.d.ts#L73-L77). The definition for `React.ElementType` is basically **"any valid HTML element or another React component."** So `'label'` can be a valid value for `as` because it is extends `React.ElementType`. But `'ben'` (sadly) is not a valid value.

```typescript
type TextProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>
```

Here's where you get excited. Or you brain explodes. Or maybe both. It's basically what determines the additional HTML attributes/props that are valid based upon `C`. Let's break it down further.

```typescript
React.ComponentPropsWithRef<C>
```

First we grab all of the props defined for `C` using [`React.ComponentPropsWithRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2dfb801ec978b29ab81690a9b24ecb1f06c4eaf2/types/react/index.d.ts#L836-L839). So if we pass `as="label"`, this will include `style`, `className`, all of the [ARIA tags](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), dozens of other props, as well as `htmlFor`. It will also include the `ref` prop for passing through [refs](https://reactjs.org/docs/refs-and-the-dom.html). If you don't want to support `ref`, you can use [`React.ComponentPropsWithoutRef`](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/2dfb801ec978b29ab81690a9b24ecb1f06c4eaf2/types/react/index.d.ts#L840-L841).

```typescript
Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>
```

Next, using [`keyof`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types) and the [`Omit<>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) generic utility, we take those `C` props and remove from them any props that are defined in `Props`. So if `Props` defined a `style` prop or any other prop that already exists on `C`, it will get removed. This is important because of:

```typescript
Props<C> & Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>
```

Basically we want to merge the properties of `Props` and the properties of `C` together. But if there are prop name collisions, TypeScript gets unhappy. Therefore we prevent the chance of a name collision by removing the duplicate props first.

```typescript
type TextProps<C extends React.ElementType> = Props<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof Props<C>>
```

Now `TextProps` has all of the valid props we want for the `Text` component and it'll be based on the value we pass to the `as` prop.

```typescript
// highlight-next-line
const Text = <C extends React.ElementType = 'span'>({
  as,
  children,
  font = 'regular',
  size = '4',
  color = 'gray-40',
  // highlight-start
  ...other
}: TextProps<C>) => {
  // highlight-end
  const classes = getClasses({ font, size, color })
  const Component = as || 'span'

  return (
    <Component {...other} className={classes}>
      {children}
    </Component>
  )
}
```

Here is where we connect it altogether. In order for our `Props` definition to be generic our component _also_ needs to be generic. It's the same generic definition of `C` except it also defaults the generic value to `'span'`. This is not required; I could leave off the default. But this way if the `as` prop is left unspecified when `<Text>` is rendered, we'll get the props valid for a `<span>` instead of the props that are valid across all elements. This distinction would likely be more meaningful for more specific elements like `<button>` or `<a>`.

And the reason for all of this effort was so that `...other` would be strongly typed. It's no longer just a kitchen sink object, but has a specific type:

```typescript
Pick<
  TextProps<C>,
  Exclude<
    Exclude<
      keyof React.ComponentPropsWithRef<C>,
      "as" | "children" | "color" | "font" | "size"
    >,
    "as" | "children" | "color" | "font" | "size"
  >
>
```

It's a bit convoluted because `TextProps` is already a complex type, but it's basically **"every prop in `TextProps` except `as`, `children`, `color`, `font` and `size`"**.

So these calls are fine:

```jsx
<Text>hello</Text>

<Text style={{ position: 'relative' }}>layout</Text>

<Text as="label" htmlFor="name-field" font="heavy" size="5" color="gray-70">
  Name
</Text>
```

But these generate errors:

```jsx
<Text as="ben">Ben!</Text>

<Text
  as="h1"
  href="https://www.benmvp.com"
  font="thin"
  size="10"
  color="gray-50"
>
  Main Heading
</Text>
```

So we had to do some serious heavy lifting on the implementation side in TypeScript in order to provide a nice developer experience for callers of the component. I find that consistently to be the case with shareable React components written in TypeScript.

Curious what an error might look like? Well let's take the case where we specified `href` for `as="h1"`:

```text
Type '{ children: string; as: "p"; href: string; }' is not assignable to type 'IntrinsicAttributes & Props<"p"> & Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "slot" | ... 253 more ... | "is"> & { ...; }, "slot" | ... 252 more ... | "is">'.
  Property 'href' does not exist on type 'IntrinsicAttributes & Props<"p"> & Pick<Pick<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, "slot" | ... 253 more ... | "is"> & { ...; }, "slot" | ... 252 more ... | "is">'.
```

It's pretty gnarly to read because there are just so many props available on the type (`... 253 more ...` 😭), but I just pay attention to the `Property 'href' does not exist` part and hope that's enough for me to figure out what's going on.

---

So I've been working on our component library at Stitch Fix basically for the entire year I've been here. And this was one of the first things I tried to get setup. I got the idea from the [Material UI](https://material-ui.com/) library (they use `component` instead of `as`).

It took me a really long time to get it working just right. It was the `Omit<>` part that I was missing. Also, because we have many polymorphic components, I needed to **abstract this polymorphic setup into easy-to-use helpers**. After many iterations, here's what I came up with after borrowing bits and pieces from other open-source libraries.

```typescript
// Source: https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
// A more precise version of just React.ComponentPropsWithRef on its own
export type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>

type AsProp<C extends React.ElementType> = {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C
}

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<
  ExtendedProps = {},
  OverrideProps = {}
> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<
  C extends React.ElementType,
  Props = {}
> = ExtendableProps<PropsOf<C>, Props>

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = {}
> = InheritableElementProps<C, Props & AsProp<C>>
```

Hopefully this can short-circuit your implementation. 😄

Keep learning my friends. 🤓
