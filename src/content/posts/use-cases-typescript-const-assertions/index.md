---
date: 2021-01-17
title: Use cases for TypeScript const assertions
shortDescription: Cases where TypeScript const assertions help avoid type errors with union literals in objects and more
category: TypeScript
tags: [typescript, constAssertions, react, hooks]
hero: ./wrenches-matt-artz-4mAcustUNPs-unsplash.jpg
heroAlt: Two adjustable wrenches
heroCredit: 'Photo by [Matt Artz](https://unsplash.com/@mattartz)'
---

Have you ever run into a problem where TypeScript incorrectly infers the types of properties of an object? And then when you try to pass a piece (or all) of it to a function it's a type error? Usually this happens to me because of ["literal type widening"](https://mariusschulz.com/blog/literal-type-widening-in-typescript) of [union string literal types](https://www.typescriptlang.org/docs/handbook/literal-types.html#string-literal-types) within object literal declarations.

Phew, that was a lot of technical terms. 😅 Let's ground ourselves with an example:

```typescript
const notify = (
  data: unknown,
  {
    sport,
    level,
  }: {
    sport: string
    // 👇🏾 union string literal
    // highlight-next-line
    level: 'player' | 'team' | 'sport' | 'all'
  },
) => {
  // notify data
}

const DEFAULT_NBA_OPTIONS = {
  sport: 'nba',
  // 👇🏾 trying to use one of the literals in the union
  // highlight-next-line
  level: 'team',
}

notify('James Harden traded to the Nets 😢', DEFAULT_NBA_OPTIONS)
// ❌ TS Error!
// Argument of type '{ sport: string; level: string; }'
// is not assignable to parameter of type
// '{ sport: string; level: "all" | "player" | "team" | "sport"; }'.
//  Types of property 'level' are incompatible.
//    Type 'string' is not assignable to type
//    '"all" | "player" | "team" | "sport"'.
```

> Curious about the use of `unknown`? Read [When to use TypeScript `unknown` vs `any`](/blog/when-use-typescript-unknown-versus-any/).

The problem is that even though we defined `DEFAULT_NBA_OPTIONS` with a `level` of `'team'`, when the object gets passed to `notify()` the type of `level` is `string` which can't be assigned to the string union type `'player' | 'team' | 'sport' | 'all'`. Interestingly enough, if we pass the object inline, it works:

```typescript
notify('James Harden traded to the Nets 😢', {
  sport: 'nba',
  // highlight-next-line
  level: 'team',
})
// 👍🏾 No error
```

This works because the type of `level` is now the string literal `'team'` which _is_ assignable to our string union type.

Now there are several ways we could fix this type error, including creating a `NotifyOptions` type which we would define as the type of the second parameter of `notify()`, as well as the type of `DEFAULT_NBA_OPTIONS`. But let's say we don't want to (or can't) do that. One way we can solve it is by using a [const assertion](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions):

```typescript
const DEFAULT_NBA_OPTIONS = {
  sport: 'nba',
  level: 'team',
  // highlight-next-line
} as const

notify('James Harden traded to the Nets 😢', DEFAULT_NBA_OPTIONS)
```

The const assertion takes the type of `DEFAULT_NBA_OPTIONS` from being:

```typescript
{
  sport: string
  level: string
}
```

to:

```typescript
{
  readonly sport: "nba"
  readonly level: "team"
}
```

The type of `DEFAULT_NBA_OPTIONS.level` is now the literal `'team'` just like when we passed it inline. And because `'team'` is assignable to our string union type, everything works swimmingly. And the const assertion also makes the properties of `DEFAULT_NBA_OPTIONS` read-only so that they cannot be changed.

So why is the const assertion necessary? Why weren't the types of `sport` and `level` the specific literals, `'nba'` and `'team'`, instead of the more general `string` type? Well, **by default TypeScript performs what's called ["literal type widening"](https://mariusschulz.com/blog/literal-type-widening-in-typescript) for objects**. That way when we define an object, we can change a property like we would expect:

```typescript
const player = {
  name: 'James Harden',
  team: 'Houston Rockets',
}

// not a type error
// (as a Rockets fan, I wish it was)
player.team = 'Brooklyn Nets' // 😢
```

**So with the const assertion we're telling TypeScript not to widen any literal types, but have the types match their literal values.**

Another cool use of [const assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) is with [React custom Hooks](https://reactjs.org/docs/hooks-custom.html). Typically when a custom Hook returns 2 values, we return it using an array tuple (just like the [`useState` Hook](https://reactjs.org/docs/hooks-state.html)):

```typescript
const useUserSearch = () => {
  const [username, setUsername] = useState('')
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (username) {
      getUserApi(username).then(setUser)
    } else {
      setUser(null)
    }
  }, [username])

  // use const assertion for the correct return type
  // User first, function second
  // highlight-next-line
  return [user, setUsername] as const
}
```

Without the const assertion, the inferred return type of `useUserSearch` would be:

```typescript
(User | ((username: string) => void))[]
```

Translation: an array of `string` or `(username: string) => void` types in any order. It could be an array of 0 or 100 items. The first item can be the function or all items could be. But that's not what we want. We specifically want a "tuple" where the first item is a `User` and the second item is the function. With the const assertion, the type is now:

```typescript
readonly [User, (username: string) => void]
```

The order is correct, the length is fixed, and the array is read-only. 🎉

---

Usually the need for const assertions can be avoided by being very specific with the types of our objects, arrays or return values. But declaring specific types can sometimes be onerous or even infeasible. It's nice to be able to rely on TypeScript's type inference. Const assertions provide an additional "hint" to TypeScript so that it can infer correctly.

I mentioned earlier that there are several ways to solve the original type error I showed. What approaches have you used to solve it? I'm very curious to find out. 😄 Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
