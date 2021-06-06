---
date: 2021-06-05
title: Extracting TypeScript types from functions, objects & arrays
shortDescription: Tips & tricks for reverse-engineering function, object & array TypeScript types from 3rd-party libraries that fail to export them
category: typescript
tags: [typescript, tips, types, hacks]
hero: ./dentist-tools-neonbrand-y8fWicGsv4g-unsplash.jpeg
heroAlt: Dentist tools on a blue tray
heroCredit: 'Photo by [NeONBRAND](https://unsplash.com/@neonbrand)'
---

A 3rd-party library written in TypeScript likely makes use of lots of internal types to support its API. Libraries typically export additional helper types that we may need in order to use the API. But sometimes the library forgets types or there are types that they did not expect we would need. So I want to share some TypeScript tips for extracting types trapped in functions, objects, and arrays.

Let's say that we're using the following function from a library:

```typescript
// index.ts (in @third-party-lib/api)

interface Player {
  name: string
  dob: Date
  number: number
  position: string
  height: number
  weight: number
}

interface Location {
  city: string
  state: string
}

interface TeamInfo {
  name: string
  location: Location
  players: Player[]
}

interface Team extends TeamInfo {
  id: string
  dateCreated: Date
}

// highlight-start
export const createTeam = (info: TeamInfo): Promise<Team> => {
  // do stuff asynchronously...
}
// highlight-end
```

The `createTeam` function takes a single parameter that's an object with three properties: `name`, `location`, and `players`. It returns a `Team` object wrapped in a `Promise` because the function is async.

Let's say the common use case for calling `createTeam()` is to pass a big object literal:

```typescript
import { createTeam } from '@third-party-lib/api'

const run = async () => {
  const team = await createTeam({
    name: 'Houston Rockets',
    location: { city: 'Houston', state: 'TX' },
    players: [
      {
        name: 'Christian Wood',
        dob: new Date('9/27/1995'),
        number: 35,
        position: 'C',
        height: 82,
        weight: 214,
      },
      {
        name: 'Kevin Porter Jr.',
        dob: new Date('5/4/2000'),
        number: 3,
        position: 'SG',
        height: 76,
        weight: 203,
      },
      // ...
    ],
  })
}

run()
```

Even though we never declared the `Player` or `Location` types directly, TypeScript is able to associate them with the object literals. This is because the types of the properties of the object literals match the properties defined in the TypeScript interfaces.

But what if we need to use the `Player` or `Location` type in our application outside of calling `createTeam`?

```typescript
// highlight-next-line
const validatePlayer = (player: Player): boolean => {
  // code that validates a `Player` object
}
```

**And what if this library failed to export the `Player`, `Location`, and other types?** How would we go about getting them? Well, we _could_ create our own mirror types from inspecting the [declaration files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html). But then they could get out of sync. Instead, let's extract the types directly from the `createTeam()` function.

Let's first start with extracting the parameters of `createTeam()` using the [`Parameters<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype) generic utility type.

```typescript
type CreateTeamParams = Parameters<typeof createTeam>
// CreateTeamParams = [info: TeamInfo]
```

The `CreateTeamParams` is an array type of a single element, the `TeamInfo` type. Again, `TeamInfo` wasn't exported, so we need a way to get the TypeScript type out of the array type. We can use [indexed access types](https://www.typescriptlang.org/docs/handbook/2/indexed-access-types.html) to extract the `TeamInfo` type.

```typescript
type ExtractedTeamInfo = CreateTeamParams[0]
// ExtractedTeamInfo = TeamInfo
```

Nice! **We can index into the array type much like we can index into a normal JavaScript array object.** So we now have `TeamInfo` which we've named `ExtractedTeamInfo`. I would normally just name it `TeamInfo`, but to be clear that it's a type alias of the actual `TeamInfo` interface, I've named it `ExtractedTeamInfo`.

So now that we have `ExtractedTeamInfo` we need to get both the `Player` and `Location` types. Let's try getting `Location` first.

```typescript
type ExtractedLocation = ExtractedTeamInfo['location']
// ExtractedLocation = Location
```

Simple enough right? Just like we can index into an array type, **we can also get the types of properties of interfaces / object types using indexed access types**. We combine both types of indexed access types to retrieve `Player`.

```typescript
type ExtractedPlayers = ExtractedTeamInfo['players']
// ExtractedPlayers = Player[]
type ExtractedPlayer = ExtractedPlayers[number]
// ExtractedPlayer = Player
```

Noticed that we used `[number]` to get the `ExtractedPlayer`. `ExtractedPlayers` is an array of `Player` types, so we're not looking for one at a specific index. Using `[number]` gets us the type of the array's elements, i.e. `Player`.

Now we have `ExtractedLocation` & `ExtractedPlayer` as types to use as we need.

```typescript
// highlight-next-line
const validatePlayer = (player: ExtractedPlayer): boolean => {
  // code that validates a `Player` object
}
```

Oh, but what about `Team`? It's wrapped up in the `Promise` _returned_ by `createTeam()`. So first let's get that return type of `createTeam()`.

```typescript
type CreateTeamPromise = ReturnType<typeof createTeam>
// CreateTeamPromise = Promise<Team>
```

We use the [`ReturnType<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) generic utility type to get the type `Promise<Team>`.

And finally we need to unwrap the promise type so we can get just `Team`. Unfortunately, there's no simple index type that we can use to remove the `Promise<T>`. But we can create our own [conditional type](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#conditional-type-constraints) to do the unwrapping.

```typescript
// checks to see if the `Type` is a promise wrapping an underlying type.
// if so it returns the underlying type. if not, it returns back the type.
// highlight-start
type Unwrapped<Type> = Type extends Promise<infer WrappedType>
  ? WrappedType
  : Type
// highlight-end

type ExtractedTeam = Unwrapped<CreateTeamPromise>
// ExtractedTeam = Team
```

So this is definitely some advanced TypeScripting going on here. Let me try to break it down. Not only is `Unwrapped<Type>` a generic conditional type, but it's using [type inference](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#inferring-within-conditional-types) within a generic conditional type. **The `infer` keyword allows us to "peek into" the generic type to see what it might be.** If it matches `Promise<WrappedType>` then the conditional returns `WrappedType` (the type the promise was wrapping). Otherwise, it'll just return the entire type. This "unwrapping" pattern can be used for any custom generic types you define as well. Just replace `Promise` with your type.

---

I sometimes have to use this process to extract types of props from 3rd-party React components. Because React components are just functions, the process is the same.

```typescript
import { SomeComponent } from '@third-party/components'

// get the parameters of the function component
// then grab the first parameter which is the props
type ComponentProps = Parameters<typeof SomeComponent>[0]

// grab the "players" prop type which is a Player[]
// grab the single type from the array
type PlayerProp = ComponentProps['players'][number]
```

All of this hoop jumping encourages me to be liberal in exporting types from my own shared libraries. However, I don't really worry about missing types too much, because at least folks have _a way_ to get out the types they need.

The funny thing is that all of this information is in the TypeScript docs. But they can be quite dense and it's sometimes hard to apply the technical topics to our specific use cases. Hopefully this post helps you out the next time you need to extract missing types. Let me know if it does by hitting me up on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
