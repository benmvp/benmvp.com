---
date: 2020-11-29
title: Filtering undefined elements from an array in TypeScript
shortDescription: How TypeScript user-defined type guards can remove undefined or null types with Array.filter
category: typescript
tags: [arrays]
hero: ./sifting-tuan-anh-tran-tHfJ3mevHi0-unsplash.jpg
heroAlt: Person sifting with a basket
heroCredit: 'Photo by [TUAN ANH TRAN](https://unsplash.com/@rafaeltran)'
---

One feature I really appreciate about TypeScript is [nullable type guards](https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types).

```typescript
const getProduct = (id: number): Product | undefined => {
  // return a `Product` if found
  // otherwise `undefined`
}

const product = getProduct(123)
// the type of `product` is `Product | undefined`

// highlight-next-line
if (product) {
  // in here the type of `product` is now only `Product` 👍🏾
  console.log(product.price)
}
```

Here `getProduct()` returns a `Product` object, but it can also return `undefined` if a product matching the `id` wasn't found. So the type of the `product` variable is `Product | undefined`. **When we use an `if` statement (or equivalent) to check its existence, `product` no longer has the `undefined` type.** It's only a `Product` type within the `if` statement. And we don't even have to specifically check for `undefined`. TypeScript is smart enough to know that by doing the simple existence check that it no longer `undefined`.

Because of this intelligence, I figured it would apply when using [`Array.prototype.filter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter).

```typescript
const productIds = [123, 456, 789]
const products = productIds
  .map(getProduct) // 👉🏾 (Product | undefined)[]
  .filter((item) => item) // ideally Product[]

// 😭 The type of `products` is still `(Product | undefined)[]`
```

Here we're mapping over an array of product IDs to convert them into an array of products. This gives us a type of `(Product | undefined)[]` (an array of `Product | undefined` objects).

We then use `.filter()` to remove any `undefined` values by doing an existence check like we did in the beginning. However, it doesn't work as expected. The runtime code _will_ filter out the `undefined` values, so our code is correct. However, **TypeScript still treats the type as `(Product | undefined)[]`**, so any following code operating on individual elements within `products` will have to still do existence checks.

In this case, TypeScript wasn't smart enough to figure out what we were doing. The `.filter()` method can be used to remove elements of the same type, remove all of a certain type, and everything in between. And TypeScript by default cannot figure out what's going on.

**So we need to give TypeScript more info on exactly what we're doing.** A quick and dirty solution is to assert the type at the end.

```typescript
const productIds = [123, 456, 789]
const products = productIds
  .map(getProduct)
  // highlight-next-line
  .filter((item) => item) as Product[] // 😢
```

By adding the [type assertion](https://www.typescriptlang.org/docs/handbook/basic-types.html#type-assertions) at the end, we're telling TypeScript "despite what you might think, `products` is actually a `Product[]` type." This totally works, and is actually what I did at first when I ran into this problem. **But I try my best to avoid using type assertions wherever possible because it means that I did something that TypeScript couldn't figure out.** And _that_ could mean I have a bug lurking around the corner.

Now don't get me wrong. I totally use type assertions. But I try to see if there's a different way I can write the code or use some other syntax to let TypeScript know what I'm trying to do. In this case, **we can use a [user-defined type guard](https://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards)**.

```typescript
// highlight-range{1-3,6}
const isProduct = (item: Product | undefined): item is Product => {
  return !!item
}

const productIds = [123, 456, 789]
const products = productIds.map(getProduct).filter(isProduct)

// `products` is now `Product[]` 🎉
```

The key bit is the `item is Product` return type of the `isProduct` function. That's the user-defined type guard. **It says that if the function returns `true`, it means that `item` is a `Product` type.** So when that is combined with `.filter()`, TypeScript now knows that the things we're keeping in the array are `Product` types (or that the things we're excluding are non-`Product` types). As a result, `products` is now `Product[]` like we want. 👏🏾

FYI, if we prefer the inline `.filter()`, we can use the type guard inline.

```typescript
const productIds = [123, 456, 789]
const products = productIds
  .map(getProduct)
  // highlight-next-line
  .filter((item): item is Product => !!item)

// `products` is still `Product[]` 🙌🏾
```

Before when we had the inline `.filter()` we did the shorthand existence check `(item) => item`. But now we have to continue to do `!!item` like the `isProduct` function because **the `item is Product` return type requires that we return a boolean value**. However, thanks to [contextual typing](https://www.typescriptlang.org/docs/handbook/type-inference.html#contextual-typing) we do not need to specify the type of `item` within `.filter()`. TypeScript is able to figure out that it is `Product | undefined`.

Keep learning my friends. 🤓
