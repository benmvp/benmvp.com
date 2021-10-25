---
date: 2021-12-17
title: Creating custom generic utility types
# shortDescription: Some reasons why I choose React Testing Library over Enzyme for testing React components
category: typescript
# tags: [react, hooks]
# hero: ./blue-anchor-on-wall.jpeg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

I was recently working on my latest project, which uses [Firestore](https://firebase.google.com/) as its NoSQL database. The way the data is stored in Firestore is _almost_ how I represent the data in app. The only different is that Firestore has its own object for modeling dates that is different than the JavaScript [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object. So in order to avoid having to write types for both the internal and Firestore representations of object, I created a generic helper TypeScript type that would recursively replace all `Date` objects to [`Timestamp`](https://github.com/firebase/firebase-js-sdk/blob/2e7586dd7320d48d4b58aa13b525ec4a599f87e2/packages/firestore/src/lite-api/timestamp.ts) objects in a type based on the old type.

```typescript
// a generic type that returns a new type by returning a
// `Timestamp` if the generic is a `Date`. Otherwise it
// returns a "firestore" object representation of the generic
type ToFirestoreTimestamp<MaybeDate> = MaybeDate extends Date
  ? Timestamp
  : ToFirestore<MaybeDate>

// a generic type that if given an array type, returns
// the same type except replacing the array items that are
// `Date` types with `Timestamp` types
// (via `ToFirestoreTimestamp`). Does the same for object
// values. Otherwise, just return the type back.
type ToFirestore<T> = T extends Array<infer Item>
  ? Array<ToFirestoreTimestamp<Item>>
  : T extends Record<string, any>
  ? Omit<
      {
        [P in keyof T]: ToFirestoreTimestamp<T[P]>
      },
      'id'
    >
  : T
```

> See the code in action on the [TS Playground](https://www.typescriptlang.org/play?#code/PTAEFkHsGMGtQE4FMAOyDOSB2AXAhjgJaRaiQBmoeoAYoRjpMqAAYAqhAtkuvpyi1A4AniiQAoQriQJyeaElAduvPP1ABvcaB2IkeACYkANsNCZoJA+gBcoLAFdOAIxkAabbuSGTZrHixICytbeydXBHEAX3FxECpQAHNsGUJoIVFFHAALAj0cBwQsdASsJAB3DLFQZzNkAqKpRKo4sHYuHj4BUEJKHMVksoQ0npLqFgARAiQWADpQAHl+hHLCTB6cVvzC4oSAInJ6TqYkPbJnACskaBw9NB5sfCISMj7sgZTh6HERarZIOgME7KTpqFAAHnAeGErimOCQAD5QABeCDQ2HTUBIAAe8Kw1lAcIkOgA-EoOqp+J47P9AcdkJD0UgiQjYvFqINUulfllcrdeklCAA3bBUUh4BAIaFVJBubZFdBbfrmNRZTJY7EKFC3ZAoYzyJpCd5USXSwjwzglHJ5CUSeKTaaCHklVY5VggyndZ1bAAUQsI41pR14wIpXRYAEp5hNIDwjYp0KrQOQmOcrjctkK8MYHDx5kt3is1rLQBcHLx5aRlTyavJYLMfuqg0CGWwkai2Bq8QSAIKm4TgqTkGSgACSFtZpNAfalA+b9KQHq64PHSE4CMnoBpXewBIAStcmAZwbxhlhEnKAsJN2SFpxzeDPLpNE-n6AANoABR6pFgSGEFBKAAujSALBowyBLmC4JsF+QGbs+UQeG+oAAOSEAYqGvpuNKxFI8KyPIiifvqpBaDoljGPqzhMAQTChKeTTvkBnjQN48IGHYRKeAYSDGEgHEklx0yeBhdiMeenjcNmoTkc+BjTMJ8Kvsg5DiTgZ6JK+PJ2KhzjeLAci8KhoAAD5ofpDhYNA2QmeZqE5tZtlmWhBhSEMdloeg-hwFhOhRMxniqAUoSoZ5qFoFwErCOFEo2cKSCYVJkBuYciVKcS9iqupmmeJA5RDDlTSeP66CEM4hDGOawi6ZFWbwuFVVYLAAC0vjhSgDjOFV0BYTEWwABKQCKCBkCNrB0iGyAkQETqQOYSCKOaJS8YcWDmsQpCutkWztCo4YyiUUigHqRGvKwRJOpkio1pNEFIDNpAdmBLZIOCj0IkAA).

The two generic types make heavy use of [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) and some utility types as well.

Keep learning my friends. 🤓
