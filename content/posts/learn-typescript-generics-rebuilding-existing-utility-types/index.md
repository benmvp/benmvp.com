---
date: 2021-10-24
title: Learn TypeScript generics by rebuilding existing utility types
shortDescription: Using TypeScript generic utilities to better understand constraints, conditional types and other generic type features
category: typescript
tags: [typescript, generics, utilities]
hero: ./toolbox-tekton-EcE9dFfXwwE-unsplash.jpeg
heroAlt: Tekton screwdrivers, sockets, and combination wrenches
heroCredit: 'Photo by [Tekton](https://unsplash.com/@tekton_tools)'
---

TypeScript's type system is very powerful because it allows us to express types in terms of other types. One way we do this is with [generics](https://www.typescriptlang.org/docs/handbook/2/generics.html), which are types that take parameters. A lot of times when we get started with generics, we actually use them directly within functions (see my previous post on [Understanding TypeScript generics through lodash functions](https://www.benmvp.com/blog/understanding-typescript-generics-lodash-functions/)). But when we use them to create reusable types, we can create really powerful types much like the built-in [utility types](https://www.typescriptlang.org/docs/handbook/utility-types.html).

So I want to break down some existing TypeScript utilty types in order for us to better understand how TypeScript generics work. I personally learn best by seeing real-world examples. Somehow seeing something new in the context of something familiar helps me make the connection. I hoping it'll do the same for you.

Without further ado, let's dig in.

---

## Basic generics

The [`Partial<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype) utility constructs a type with all of the properties of `Type` set to optional. This type is particularly useful when we have a function that will take a subset of data to update the full object.

For example:

```typescript
interface Team {
  name: string
  city: string
  state: string
  since: Date
  value: number
  championships: number
}

const updateTeam = (team: Team: fieldsToUpdate: Partial<Team>) => {
  return {
    ...team,
    ...fieldsToUpdate
  }
}

const before2021 = {
  name: 'Houston Rockets',
  city: 'Houston',
  state: 'Texas',
  since: new Date(1967, 1, 1),
  value: 2.5e9,
  championships: 2
}
const after2021 = updateTeam(before2021, {
  championships: 3,
  value: 3e9
})
```

In this example, we don't want to have to pass an entirely new `Team` object to `updateTeam` in order to update just a few properties. All the properties of `Team` are required. So the `fieldsToUpdate` parameter uses `Partial<Type>` so that all the properties are now optional, allowing us to only pass in the `championships` and `value` fields.

As a result, the type definition of `Partial<Type>` is:

```typescript
/**
 * Make all properties in T optional
 */
type Partial<Type> = {
  [Key in keyof Type]?: Type[Key]
}
```

The `<Type>` indicates that the generic has a single parameter called `Type`. Using the [`keyof` type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html), `Partial<Type>` first gets all of the properties of the generic `Type`. In the case of `Partial<Team>` that would be `name`, `city`, `state`, `since`, `value`, and `championships`. It then creates a new [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html), mapping each property name to the original `Type`'s type for each property. The difference in this new mapped type is that the property values types also include `undefined` (via the optional property `?`).

This could've also been written as:

```typescript
/**
 * Make all properties in `Type` optional
 */
type Partial<Type> = {
  [Key in keyof Type]: Type[Key] | undefined
}
```

Generic types are kind of like type expressions or better yet implicit return functions. They can take 1 or more parameters (the generic types) and return a new type based on those parameters.

[`Required<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredtype) and [`Readonly<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) work much in the same way. They toggle the required/`readonly` state on/off.

```typescript
/**
 * Make all properties in `Type` required
 */
type Required<Type> = {
  [Key in keyof Type]-?: Type[Key]
}

/**
 * Make all properties in `Type` readonly
 */
type Readonly<Type> = {
  readonly [Key in keyof Type]: Type[Key]
}
```

Prefixing a modifier like `?` or `readonly` with `-` means to **remove** the modifier. So `-?` removes the optional modifier, which removes `undefined`, making the field now required. With this information, we can make a fourth utility that doesn't yet officially exist.

```typescript
/**
 * Make all properties in `Type` *not* readonly (i.e. mutable)
 */
type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key]
}
```

We're starting to build our generic type powers. 💥

---

## Generic constraints

The [`Record<Keys, Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) utility constructs an object type whose propery keys are `Keys` and whose property values are `Type`. So this utility is used to create a map of the properties of a type to another type.

For example:

```typescript
interface Player {
  firstName: string
  lastName: string
}
type Position = 'guard' | 'wing' | 'big'

const players: Record<Position, Player[]> = {
  guard: [
    { firstName: 'Kevin', lastName: 'Porter Jr.' },
    { firstName: 'Jalen', lastName: 'Green' },
  ],
  wing: [
    { firstname: 'Eric', lastName: 'Gorden' },
    { firstName: 'Danuel', lastName: 'House Jr.' },
    { firstName: "Jae'Sean", lastName: 'Tate' },
  ],
  center: [
    { firstName: 'Christian', lastName: 'Wood' },
    { firstName: 'Alperen', lastName: 'Sengun' },
    { firstName: 'Daniel', lastName: 'Theis' },
  ],
}
```

As a result, the type definition of `Record<Keys, Type>` is:

```typescript
/**
 * Construct a type with a set of properties
 * `Keys` of type `Type`
 */
type Record<Keys extends string | number | symbol, Type> = {
  [Key in Keys]: Type
}
```

`Record<Keys, Type>` is mainly just used a shorthand for an [object index signature](https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures). However, it adds a bit more power by using a [mapped type](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) instead (the `Key in Keys` part). The mapped type allows us to pass `Position` (a unioned [literal type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types)) for the object keys.

However, a JavaScript object can only support `string`, `number` or `symbol` keys, so `Record<Keys, Type>` uses a [generic constraint](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints) (the `extends string | number | symbol` part) in order to restrict what types of keys are allowed. Trying to create a `Record<boolean, Team>` would fail because `boolean` doesn't satisfy the constraint. But `Position` _does_ satisfy the constraint because it is a subset of `string`.

---

## Conditional generics

The [`NonNullable<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#nonnullabletype) constructs a new type by excluding `null` and `undefined` from `Type`.

For example:

```typescript
type NoUndef = NonNullable<Team | Player | undefined>
// NoUndef = Team | Player

type Cleansed = NonNullable<Player[] | undefined | null>
// Cleansed = Player[]

type Nothing = NonNullable<undefined | null>
// Nothing = never
```

As a result, the type definition of `NonNullable<Type>` is:

```typescript
/**
 * Exclude `null` and `undefined` from `Type`
 */
type NonNullable<Type> = Type extends null | undefined ? never : Type
```

`NonNullable<Type>` uses a [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) (the ternary operator) to do it's magic. It goes through each sub-type in the union and sees if it extends `null | undefined`. If the sub-type is one of those 2, it replaces it with [`never`](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-never-type). Otherwise, it returns the sub-type. The remaining sub-types are unioned together to construct the new type.

The `never` type is automatically omitted from any union type that has other sub-types (for instance `Team | Player | never` is just `Team | Player`). But if the type only has `never` (as in the case with `Nothing` in our example above), then the resultant type is also `never`.

The [`Exclude<Type, ExcludedUnion>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#excludetype-excludedunion) type is actually a more generic version of `NonNullable<Type>`. It constructs a type by excluding from `Type` all union sub-types that are a part of `ExcludedUnion`.

For example:

```typescript
type PlayersOnly = Exclude<Team | Player, Team>
// PlayersOnly = Player

type NoUndef = Exclude<Team | Player | undefined, null | undefined>
// NoUndef = Team | Player

type Cleansed = Exclude<Player[] | undefined | null, null | undefined>
// Cleansed = Player[]

type Nothing = Exclude<undefined | null, null | undefined>
// Nothing = never
```

Without even knowing how the type definition for `Exclude` is implemented, we should be able to rewrite `NonNullable<Type>` using `Exclude<Type, ExcludedUnion>`.

```typescript
/**
 * Exclude `null` and `undefined` from `Type`
 */
type NonNullable<Type> = Exclude<Type, null | undefined>
```

That's pretty cool if you ask me! It's like generic composition.

The [`Extract<Type, Union>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union) type is essentially the inverse of `Exclude<Type, ExcludedUnion>`. It constructs a new type by extracting from `Type` all the union sub-types that are a part of `Union`.

For example:

```typescript
type SimpleOnly = Extract<Team | Player | boolean, number | boolean | string>
// SimpleOnly = boolean
```

As a result, the type definitions for `Exclude<Type, ExcludedUnion>` and `Extract<Type, Union>` are:

```typescript
/**
 * Exclude from `Type` those types that are assignable to `ExcludedUnion`
 */
type Exclude<Type, ExcludedUnion> = Type extends ExcludedUnion ? never : Type

/**
 * Extract from `Type` those types that are assignable to `Union`
 */
type Extract<Type, Union> = Type extends Union ? Type : never
```

So `Exclude<Type, ExcludedUnion>` goes through each sub-type of `Type` and if the sub-type is a member of `ExcludedUnion`, `never` replaces that sub-type. All of the remaining sub-types are unioned together to return the new type.

And `Extract<Type, Union>` goes through each sub-type of its `Type` generic and if the sub-type is a member of `Union`, it'll be included in the returned union.

---

## Generic references

The [`Pick<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) utility works exactly like the [`_.pick()`](https://lodash.com/docs/4.17.15#pick) lodash function except it returns a new type instead of a new object. It constructs a type by picking out the set of properties `Keys` from the specified `Type`. `Keys` can be a single string literal or a union of string literals.

For example:

```typescript
interface Player {
  firstName: string
  lastName: string
}
type Position = 'guard' | 'wing' | 'big'
interface Team {
  name: string
  city: string
  state: string
  since: Date
  value: number
  championships: number
  players: Record<Position, Player[]>
}

type TeamMetadata = Pick<Team, 'name' | 'city' | 'state' | 'since'>
// TeamMetadata = {
//   name: string
//   city: string
//   state: string
//   since: Date
// }
```

As a result, the type definition for `Pick<Type, Keys>` is:

```typescript
/**
 * From Type, pick a set of properties whose keys are in the union Keys
 */
type Pick<Type, Keys extends keyof Type> = {
  [Key in Keys]: Type[Key]
}
```

Things are starting to get interesting! Instead of the `Keys` generic being constrained on a known set of types (as was the case with `Record<Keys, Type>`), the `Keys` generic has a constraint based on the `Type` generic. The string literal or string literal union _must_ extend from the keys of `Type`. Translation: `Pick<Type, Keys>` enforces that the strings we list are valid properties of the generic `Type`!

`Pick<Type, Keys>` then constructs a new subset object type with just the keys listed in `Keys`.

The [`Omit<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys) type constructs a new type by removing the specified `Keys` (either a string literal or string literal union) from `Type`.

For example:

```typescript
interface Player {
  firstName: string
  lastName: string
}
type Position = 'guard' | 'wing' | 'big'
interface Team {
  name: string
  city: string
  state: string
  since: Date
  value: number
  championships: number
  players: Record<Position, Player[]>
}

type TeamMetadata = Omit<Team, 'value' | 'championships' | 'players'>
// TeamMetadata = {
//   name: string
//   city: string
//   state: string
//   since: Date
// }
```

The new `TeamMetadata` type is the same resultant type as with `Pick<Type, Keys>` but was constructed by omitting `value`, `championships` and `players`. So really an "omit" can be re-thought of as picking all of the properties of `Type` that are **not** the ones listed in `Keys`. Pick the ones excluded by `Keys`.

So it turns out we can actually build `Omit<Type, Keys>` from both `Pick<Type, Keys>` and `Exclude<Type, ExcludedUnion>`.

```typescript
/**
 * Construct a type with the properties of `Type` except for those in type `Keys`.
 */
type Omit<Type, Keys extends keyof Type> = Pick<Type, Exclude<keyof Type, Keys>>
```

So first `Omit<Type, Keys>` uses `Exclude<Type, ExcludedUnion>` to create a union that has all the `Keys` removed from the properties of `Type`. So `value`, `championships` and `players` is removed from the properties of `Team`, leaving `name`, `city`, `state`, and `since`. The union of those remaining keys is then used to construct a new object with just those properties using `Pick<Type, Keys>`.

So again we were able to use generic composition to create more specific generics.

---

We're really just scratching the surface with how TypeScript generics work by rebuilding the TypeScript's utility types. Even I learned some new nuances about generics while writing this post!

And now that we better understand how generics work with constraints, conditions, and references, we'll now be able to create our own generic types using the utilities as a base. We'll deep dive into that in a future post.

But until then, did you find this helpful? Did it help demistify TypeScript generics a bit more? I hope so! Let me know by shooting me a tweet at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
