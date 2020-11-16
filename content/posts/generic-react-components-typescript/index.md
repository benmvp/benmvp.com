---
date: 2020-11-15
title: Generic React Components in TypeScript
shortDescription: How to use TypeScript generics to create data-agnostic React components
category: typescript
tags: [react, generics]
hero: ./assorted-concrete-houses-sam-ellis-8Ud6edt2DJ0-unsplash.jpg
heroAlt: Assorted concrete houses
heroCredit: 'Photo by [Sam Ellis](https://unsplash.com/@swellis)'
---

Two weeks ago I wrote about [Conditional React prop types with TypeScript](/blog/conditional-react-props-typescript/). Last week we learned about [Polymorphic React components in TypeScript](http://localhost:8000/blog/polymorphic-react-components-typescript/). And today we're continuing the React + TypeScript theme, this time focusing on creating generic React components using TypeScript.

To better explain what we're trying to do, let's use a somewhat real-world example. Let's say we have a `<List />` component that we pass an array of items and it exposes a [render prop](https://ui.dev/react-render-props/) to allow the caller to decide how to render a given item. We could use it to render the full list of active players in the NBA:

```js
const NBAPlayers = () => {
  // 👋🏾 hand-wavy custom hook that returns an array of players
  const players = usePlayers('nba')

  return (
    <List items={players} dir="horizontal" dividers windowing>
      {(player) => (
        <section>
          <img src={player.thumbUrl} alt={player.name} />
          <h1>{player.name}</h1>
          <p>{player.shortBio}</p>
        </section>
      )}
    </List>
  )
}
```

Now `<List />` **takes care of all the UI things other than rendering a given item**. Things like handling the layout of the items (direction, spacing, etc.), including dividers in between the items, alternating background colors, and more. It could even support advanced functionality like _windowing_ for large lists in order to optimize the creation of DOM nodes by only rendering those that are visible in the viewport (a la [`react-window`](https://github.com/bvaughn/react-window)).

What makes `<List />` _generic_ is that it doesn't just supporting rendering NBA players. It can render lists of _any_ data. So instead of using it render NBA players, we can use it to render JavaScript frameworks:

```js
const JSFrameworks = () => {
  // 👋🏾 hand-wavy custom hook that returns an array of JS frameworks
  const frameworks = useFrameworks('js')

  return (
    <List items={frameworks} dir="vertical">
      {(framework) => (
        <dl>
          <dt>Name</dt>
          <dd>{framework.name}</dd>

          <dt>Created</dt>
          <dd>{framework.since}</dd>

          <dt>Author</dt>
          <dd>{framework.author}</dd>
        </dl>
      )}
    </List>
  )
}
```

Which list do you think is longer: the list of NBA players or the list of JavaScript frameworks? 😂

So `<List />` works much like [`Array.prototype.map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). It accepts an array of items, calls a function for each item (i.e. the render prop), and then passes the item to that function. **The type of the items themselves does not matter.** The `<List />` component is flexible. The first call to `<List />` had an array of players and the second, an array of JavaScript frameworks.

A streamlined JavaScript implementation may look something like:

```js
const List = ({ children, dir, dividers, items, windowing }) => {
  const className = genClassName({ dir, dividers })
  const visibleItems = useWindowing(items)

  return (
    <div className={className}>
      {visibleItems.map((item) => (
        <div key={item.id} className="item">
          {children(item)}
        </div>
      ))}
    </div>
  )
}
```

Trust me. This is _very streamlined_. If only it were this simple. 😅 But there are two things I want to point out.

First, the type of the argument passed to the `children` render prop matches the type of the elements in the array. It's a sort of indirect association between the `items` and `children` props. When we use TypeScript, we will want the types to match so that the caller of the `<List />` will receive the correct type when defining the render prop. **We don't want the caller to have to perform a [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions).**

Second, we are requiring the `item` to be an object with an `id` property so we can use it as the `key` prop (because using the [array index as the key is an anti-pattern](https://reactjs.org/docs/lists-and-keys.html#keys)). When we use TypeScript, we will **need to enforce that the array contains objects that have an `id` property.**

Now let's look at how we can re-implement the `List` component in TypeScript to satisfy both of these needs. The final result looks like:

```typescript
interface Props<T> {
  children: (item: T) => React.ReactNode
  dir: 'horizontal' | 'vertical'
  dividers?: boolean
  items: T[]
  windowing?: boolean
}

interface IdObj {
  id: string | number
}

const List = <T extends IdObj>({
  children,
  dir,
  dividers,
  items,
  windowing,
}: Props<T>) => {
  const className = genClassName({ dir, dividers })
  const visibleItems = useWindowing(items, windowing)

  return (
    <div className={className}>
      {visibleItems.map((item) => (
        <div key={item.id} className="item">
          {children(item)}
        </div>
      ))}
    </div>
  )
}
```

The solution makes use of [TypeScript generics](https://www.typescriptlang.org/docs/handbook/generics.html) and [generic constraints](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints). So if you're looking to strengthen your TypeScript generics muscles, I suggest checking out [_TypeScript Generics for People Who Gave Up on Understanding Generics_](https://ts.chibicode.com/generics) by [Shu Uesugi](https://twitter.com/chibicode). Now let's break down the solution.

```typescript
// highlight-range{1,2,5}
interface Props<T> {
  children: (item: T) => React.ReactNode
  dir: 'horizontal' | 'vertical'
  dividers?: boolean
  items: T[]
  windowing?: boolean
}
```

Here we have our typical `interface` definition for the types of our props, except it's genericized using `Props<T>`. The `T` can be any identifier, but sadly **the common convention is a single character, usually `T`**.

With our generic type in hand, we now declare that the type of `items` is an array of `T` types (`T[]`). We don't know what `T` will be, but it has to be an array of them. And then we make the association with the `children` render prop by defining its type as `(item: T) => React.ReactNode`. So it will be passed a single `T` item and then of course return markup. We've now met our first need of connecting the types of `items` & `children` together. 👍🏾

```typescript
interface IdObj {
  id: string | number
}
```

This `IdObj` interface is the base of solving the second need: that the `items` are an object with at least an `id` property. The type of the (required) `id` property is `string | number` because that is the type of the `key` prop on React elements and components. But `IdObj` is just part of the puzzle.

```typescript
// highlight-range{1,7}
const List = <T extends IdObj>({
  children,
  dir,
  dividers,
  items,
  windowing,
}: Props<T>) => {
  // ...
}
```

The `<T extends IdObj>` is called [generic constraining](https://www.typescriptlang.org/docs/handbook/generics.html#generic-constraints). So `T` can't just be _anything_. And because `IdObj` defines an object with a required `id` property, by declaring that `T` must extend `IdObj`, we are **constraining `T` to also be an object with a required `id` property**. It can have more properties than `id` of course, but that's the absolute minimum. Second need completed. 👍🏾👍🏾

```typescript
return (
  <div className={className}>
    {visibleItems.map((item) => (
      // highlight-next-line
      <div key={item.id} className="item">
        {children(item)}
      </div>
    ))}
  </div>
)
```

And really, `List` doesn't care about anything else other than that minimum because that's all it requires for its code (in order to set the `key` prop). Everything else is offloaded to the caller via the `children` render prop that we described earlier.

Setting up these generic props isn't terribly complex or complicated, but it does take a solid understanding of TypeScript generics which is definitely advanced TypeScript. But the result is a much better developer experience.

```typescript
const JSFrameworks = () => {
  // 👋🏾 hand-wavy custom hook that returns an array of JS frameworks
  const frameworks = useFrameworks('js')

  return (
    <List items={frameworks} dir="vertical">
      {(framework) => (
        <dl>
          <dt>Name</dt>
          <dd>{framework.name}</dd>

          <dt>Created</dt>
          <dd>{framework.since}</dd>

          <dt>Author</dt>
          <dd>{framework.author}</dd>
        </dl>
      )}
    </List>
  )
}
```

As we mentioned earlier, the caller doesn't have to use a type assertion in the render prop to coerce the `framework` argument to the correct type. It's automatically kept in sync with the type of the `frameworks` array passed to the `items` prop. In fact, the TypeScript implementation of the `JSFrameworks` component looks identical to the previous JavaScript version, because **we never have to explicitly define the type of `items` or `children`.** The types are all inferred.

Also, if the type of the array passed to `items` _doesn't_ have the required `id` property, the caller will get the following error:

```text
Type 'Framework[]' is not assignable to type 'IdObj[]'.
  Property 'id' is missing in type 'Framework' but required in type 'IdObj'.
```

We are taking the agreement we made with `List` in JavaScript and enforcing it with TypeScript. 💪🏾

---

I also use this technique for components like `<Select />`, `<RadioGroup />`, `<CheckboxGroup />`, etc. Usually I don't just have `string` types as values but some sort of enumeration like:

```typescript
type Food = 'pizza' | 'spaghetti' | 'chicken'
```

So when I pass the array of options to these types of components, the option objects have `Food` type values instead of `string` type values. Therefore not only does the selected value have to also be a `Food` type, but the new value I receive from the `onChange` handler also has to be a `Food` type as well. Once again, the caller doesn't have to do any type assertions.

I've got a few more things I can probably cover in the realm of TypeScript + React. So I guess I'll keep the party going next week. 🎉

Keep learning my friends. 🤓
