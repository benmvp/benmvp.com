---
date: 2021-12-05
title: TypeScript user-defined type guards to the rescue
shortDescription: Using type predicates to help TypeScript narrow an ambiguous variable to a specific type
category: TypeScript
tags: [typescript, narrowing]
hero: ./vatican-guard-etienne-girardet-E22myqjmsR0-unsplash.jpeg
heroAlt: Swiss guard at the Vatican City
heroCredit: 'Photo by [Etienne Girardet](https://unsplash.com/@etiennegirardet)'
---

Recently I was writing some TypeScript code where I needed to look at the user's preferred languages (using [`Navigator.languages`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)) and compare it against my site's valid locales in order to determine which locale to display for internationalization (I18N). Here's what some of the implementation looked like:

```typescript
const ALL_LOCALES = [
  'en-US',
  'en-GB',
  'en-CA',
  'fr-CA',
  'fr-FR',
  'es-ES',
  'es-US',
] as const

// derive `Locale` type from `ALL_LOCALES` data
type Locale = typeof ALL_LOCALES[number]
// ⮑ "en-US" | "en-GB" | "en-CA" | "fr-CA" | "fr-FR" | "es-ES" | "es-US"

const DEFAULT_LOCALE: Locale = 'en-US'

// A `Set<string>` to make it easy to see if a language string
// is a valid locale
const VALID_LOCALES_LOOKUP = new Set<string>(ALL_LOCALES)

// user-defined type guard that takes in a language string and returns
// whether it is one of the valid locales
const isValidLocale = (language: string): language is Locale =>
  VALID_LOCALES_LOOKUP.has(language)

// finds the first user language that is a valid locale or the default locale
const getUserLocale = (): Locale =>
  navigator.languages.find(isValidLocale) || DEFAULT_LOCALE
```

To understand how this all works, we need to first understand [narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html) in TypeScript. **TypeScript's type system aims to make it as easy as possible to write typical JavaScript code without having to do too much to get type safety.** So if we have a variable that is a union of multiple types, we can use various different JavaScript constructs to _narrow_ down the type.

The simplest construct is [truthiness narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#truthiness-narrowing).

```typescript
const getTeamMessage = (team?: Team) => {
  // `team` has type `Team | undefined`

  if (team) {
    // Because `team` is "truthy" TS knows that
    // it *cannot* be `undefined`, so its type
    // is just `Team`
    return `Welcome ${team.name}!`
  }

  // Because of the `return` above, TS knows that
  // `team` can only be `undefined` here

  return 'Welcome!'
}
```

There's nothing really spectacular about the code. It's normal JavaScript, but TypeScript understands "JavaScript-isms." It's able to infer the type of `team` inside and after the `if` statement based on the [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) condition.

Truthiness narrowing basically can only exclude `null` and `undefined` from a type, but there are other JavaScript constructs that can do more, like [`typeof` type guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#typeof-type-guards) and [`instanceof` narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing).

```typescript
const log = (time: Date | string, message: string) => {
  // if `time` is an instance of the `Date` class, then TS knows
  // we can call `.toUTCString()` because it's a `Date` type. It also
  // knows that in the "else" case of the ternary, `time` is a `string`
  const timestamp = time instanceof Date ? time.toUTCString() : time
  // ⮑ `string`

  console.log(`[${timestamp}] ${message}`)
}

interface Option {
  value: string
  display: string
}

const getDisplay = (option: Option | string): string =>
  // if `option` is a JS object then TS infers that it's an `Option`
  // object. So in the "else" case, `option` must be a `string`
  typeof option === 'object' ? option.display : option
```

In both examples we're using built-in JavaScript operators that return rudimentary type information: [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) and [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof). Depending on the types in the unioned type, using one operator or the other can help TypeScript narrow down the possible types when you can call the method ([`.toUTCString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toUTCString)) or access the property that you care about.

But what happens if you have two objects types, neither of which are class instances? Using `typeof` or `instanceof` won't help. Depending on the properties of the objects, we can make use of [`in` operator narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#the-in-operator-narrowing).

```typescript
interface Team {
  name: string
  city: string
  revenue: number
}

interface Player {
  firstName: string
  lastName: string
  position: 'guard' | 'wing' | 'big'
  team: Team
}

const getName = (item: Team | Player) =>
  // if `item` has a `city` property, then TS infers that it's
  // a `Team` object because `Team` is the only object w/ that property.
  // As a result in the "else" case, `item` must be a `Player`
  'city' in item ? item.name : `${item.firstName} ${item.lastName}`
```

Both `Team` and `Player` are plain JavaScript objects so `instanceof` won't work and `typeof` will return `"object"` for both. However we can use the [`in` operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/in) (also see [Using new-ish & lesser-known JavaScript operators to write concise code](/blog/using-javascript-operators-write-concise-code/) for more) to see if a unique property is on the `item` object. **Because `"city"` only exists on `Team` objects, TypeScript is now able to disambiguate the type and the ternary expression becomes fully type-safe.**

JavaScript isn't a fully-typed language so the built-in constructs can only help TypeScript so much. Sometimes we have to give TypeScript a hand with narrowing and define our own type guard. That's where [type predicates](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates) within user-defined type guards come in.

```typescript
const ALL_LOCALES = [
  'en-US',
  'en-GB',
  'en-CA',
  'fr-CA',
  'fr-FR',
  'es-ES',
  'es-US',
] as const

// derive `Locale` type from `ALL_LOCALES` data 🤓
type Locale = typeof ALL_LOCALES[number]
// ⮑ "en-US" | "en-GB" | "en-CA" | "fr-CA" | "fr-FR" | "es-ES" | "es-US"

const DEFAULT_LOCALE: Locale = 'en-US'

// A `Set<string>` to make it easy to see if a language string
// is a valid locale
const VALID_LOCALES_LOOKUP = new Set<string>(ALL_LOCALES)

// user-defined type guard that takes in a language string and returns
// whether it is one of the valid locales
const isValidLocale = (language: string): language is Locale =>
  VALID_LOCALES_LOOKUP.has(language)
```

> A trick to derive a union type from an array is to first mark the array with a [`const` assertion](/blog/use-cases-typescript-const-assertions/). Then using `typeof` plus `ARRAY_NAME[number]` will generate a union type. The `number` isn't the `number` type but instead a generic value for "all indices."

A `Locale` is one of a handful of specific `string`s (`"en-US"`, `"fr-FR"`, etc.) so there's no way for us to distinguish a `Locale` from a `string` with regular JavaScript. The `language is Locale` return type of `isValidLocale()` is the _type predicate_ that allows us to write actual code to determine if the parameter (`language`) is in fact the desired type (`Locale`). The function is the _user-defined type guard_. **The return value must be a boolean.** When `true`, the type predicate is true and TypeScript infers that the parameter is the desired type.

Like with the other narrowing examples, we could use the user-defined type guard in a simple conditional.

```typescript
const getUserLocale = (): Locale =>
  // if the language is a valid locale, TS now treats
  // `navigator.language` as a `Locale` even though it's
  // been defined as a `string`
  isValidLocale(navigator.language) ? navigator.language : DEFAULT_LOCALE
```

Typically [`Navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language) is a `string`. But with the user-defined type guard returning `true`, `navigator.language` is now narrowed to a `Locale`, a union of those locale strings.

The `navigator.language` property only returns the first of the user's preferred languages. Because its possible that their primary preferred language could be an invalid locale for my site, I needed to check all of their preferred languages using [`Navigator.languages`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages). This made the `getUserLocale()` function a bit more complicated.

```typescript
// finds the *first* user language that is a valid locale,
// or uses the default locale if a valid one can't be found
const getUserLocale = (): Locale =>
  // use the user-defined type guard as the test function for `.find()`. When
  // it returns true, TS infers that the found item is also a `Locale`.
  navigator.languages.find(isValidLocale) || DEFAULT_LOCALE
```

The `navigator.languages` property is a `string[]`. The [`.find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method takes a test function that returns true when an array item passes the test. Because `isValidLocale` does the same thing, we can pass it to `.find()`. But since it's not just a regular function but a type predicate, TypeScript now knows that the found item in the `string[]` is specifically a `Locale`.

A user-defined type guard can also be used with [`.filter()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill) to not only filter down the elements but filter down the types as well.

```typescript
// returns a list of the user languages that are also valid locales
const getUserLocales = (): Locale[] =>
  // by using the user-defined type guard as the test function for
  //  .filter()` TS knows that the returned array can only be
  // `Locale` items
  navigator.languages.filter(isValidLocale)
```

> I wrote a post almost exactly a year ago called [Filtering undefined elements from an array in TypeScript](/blog/filtering-undefined-elements-from-array-typescript/) which makes use of user-defined type guards with `.filter()`.

---

Narrowing is an important component of TypeScript type inference. It's something that we don't really even realize is happening because we're just writing regular JavaScript and TypeScript is figuring it out. But when types are too similar that we can't use JavaScript to disambiguate, we can use user-defined type guards to help. I don't have to use them all that often, but they help me avoid having to use a [type assertion](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions). I'd rather provide TypeScript the necessary hints than to just override to what I believe the correct type is.

I would love to hear about other use cases that you've found for user-defined type guards. Hit me up on Twitter at [@benmvp](https://twitter.com/benmvp). Feel free to reach out if you've got questions too.

Keep learning my friends. 🤓
