---
date: 2020-11-01
title: Conditional React props with TypeScript
shortDescription: Using TypeScript to only allow a React prop to be set when another has a specific value
category: react
tags: [react, typescript, props]
hero: ./pair-birds-mcgill-library-osPrIcTwJy4-unsplash.jpg
heroAlt: A pair of brown and white birds perched on a tree
heroCredit: 'Photo by [McGill Library](https://unsplash.com/@mcgilllibrary)'
---

Several months ago I wrote a guide for comparing React prop types to their [equivalent TypeScript definitions](/blog/react-prop-types-with-typescript/) and it has become super popular by those googling for how to migrate their prop types over to TypeScript. Now I want to begin to showcase more advanced prop patterns using TypeScript.

The first pattern I want to talk about is conditional React props with TypeScript. This is when you have **a prop which should only be set when _another_ prop has a specific value**.

Let's pretend we have a `Text` component that allows for the text to be truncated with a `truncate` prop. And when the text is truncated there is also a `showExpanded` prop to include a "show expanded" button that will allow the text to be expanded to the full text. Some example configurations would look like:

```jsx
<Text>not truncated</Text>
<Text truncate>truncated</Text>
<Text truncate showExpand>truncated w/ expand option</Text>
```

The thing is that **the "show expanded" button can never show up when the text is not truncated**. So setting `showExpanded` when `truncate` is `false` or unspecified doesn't make sense. It may very well be an accidental error:

```jsx
<Text truncate={false} showExpand>not truncated w/ expand option?</Text>
<Text showExpand>not truncated w/ expand option?</Text>
```

So the question is: how can we create this dependent relationship between two props using TypeScript? How can we make it so the two configurations above throw TypeScript errors? Well there are several ways to do this, but this is my favorite approach:

```typescript
interface CommonProps {
  children: React.ReactNode,

  // ...other props that always exist
}

type TruncateProps =
  | { truncate?: false, showExpanded: undefined }
  | { truncate: true, showExpanded? boolean }

type Props = CommonProps & TruncateProps

const Text = ({
  children,
  showExpanded,
  truncate
}: Props) => {
  // Both truncate & showExpanded will be of
  // the type `boolean | undefined`
}
```

For those of you already well-versed in TypeScript, that's probably enough information for you and you've gotten what you came here for. ✌🏾👋🏾

But there's a lot going on here in just a little bit of code. So if you're curious what it all means and how it all works, let's break it down in chunks.

```typescript
interface CommonProps {
  children: React.ReactNode

  // ...other props that always exist
}
```

`CommonProps` is your typical props definition in TypeScript. It's for all of the "regular" props that aren't dependent on other props. In addition to `children` there might be `size`, `color`, `font`, etc.

```typescript
type TruncateProps =
  | { truncate?: false, showExpanded: undefined }
  | { truncate: true, showExpanded? boolean }
```

`TruncateProps` is where the magic happens. It's what's called a "[discriminated union](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#discriminating-unions)." I don't yet know what the "discriminated" part refers to, but to me it's just a union of object definitions. Let's break it down further and we'll come back to see how the discriminated union works for us.

```typescript
type TruncateProps =
  // highlight-next-line
  | { truncate?: false, showExpanded: undefined }
  | { truncate: true, showExpanded? boolean }
```

The first part of the discriminated union is when the `truncate` prop is `false` or `undefined` (unspecified). In this case, we want the `showExpanded` prop to be invalid. It shouldn't be able to be set. Therefore we define its type as `undefined`, which means it cannot be set.

```typescript
type TruncateProps =
  | { truncate?: false, showExpanded: undefined }
  // highlight-next-line
  | { truncate: true, showExpanded? boolean }
```

The second part is when the `truncate` prop is `true` (and only `true`). In this case, we want to be able to configure the `showExpanded` prop. Therefore we define its type as an optional `boolean`.

```typescript
type TruncateProps =
  | { truncate?: false, showExpanded: undefined }
  | { truncate: true, showExpanded? boolean }
```

So now back to the entire discriminated union, it's saying that the configuration for the `truncate` and `showExpanded` props can either be the first case or the second case. We defined the combinations individually instead of just saying that both `truncate` and `showExpanded` are optional booleans. There's never an option for `truncate` to be `false` while `showExpanded` is configurable.

```typescript
type Props = CommonProps & TruncateProps
```

Now `Props` becomes the [intersection](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#intersection-types) of `CommonProps` and `TruncateProps`. From high school math the term "intersection" makes me think that `Props` would contain the properties that existed in both `CommonProps` and `TruncateProps`. But it's actually the opposite. `Props` is the combination of the two types. So it'll have all the properties from `CommonProps` as well as this dependent relationship we created with `TruncateProps`.

```typescript
const Text = ({ children, showExpanded, truncate }: Props) => {
  // Both truncate & showExpanded will be of
  // the type `boolean | undefined`
}
```

Now finally in the `Text` component, both the `truncate` and `showExpanded` props will be of the type `boolean | undefined`. So their types come out straightforward as if you hadn't created the dependent relationship.

However, you won't have to do a check of `truncate` before determining if you can display the "show expanded" button when `showExpanded` is `true`. TypeScript won't let the invalid case happen based on our props definition. If a caller _does_ try to specify `showExpanded` when `truncate` is `false`, they'll get the following error:

```text
Type '{ children: Element; truncate: false; showExpanded: true; }' is not assignable to type '(IntrinsicAttributes & CommonProps & { truncate?: false | undefined; showExpanded: undefined; }) | (IntrinsicAttributes & CommonProps & { ...; })'.
  Type '{ children: Element; truncate: false; showExpanded: true; }' is not assignable to type '{ truncate: true; showExpanded?: boolean | undefined; }'.
    Types of property 'truncate' are incompatible.
      Type 'false' is not assignable to type 'true'.
```

By the way, if you're still learning to parse and understand TypeScript errors, I read them bottom up. Usually the bottom line is too specific (`false !== true`). But as I go up each level, I get more information to understand the error without getting inundated with too much information (like the first line).

It took extra work on our part to use advanced TypeScript to create this prop relationship, but it results in a much better developer experience. Instead of relying on docs that say they cannot do this, the tooling itself warns them of their error.

## Attend a minishop!

Are you interested in learning more about how you can leverage TypeScript within React to eliminate bugs and feel more confident about your code? I have a [TypeScript for React Developers](/minishops/typescript-for-react-developers/) minishop that you can register for in order to learn more!

In addition to diving deeper into type-checking props, we'll get hands-on experience type-checking common hooks (`useState`, `useEffect`, etc), forms and custom events, and many other features that will help you write quality code. [Register today](/minishops/typescript-for-react-developers/)!

Keep learning my friends. 🤓
