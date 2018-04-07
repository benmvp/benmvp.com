---
title: for-of loop
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, for-of]
cover: merry-go-round.jpg
---

![Spinning Merry-go-round](merry-go-round.jpg)

It's been a long time... I shouldn't have left you... without a dope post to step to... It's been nearly 2 months since I wrote the last article about [ES6 promises](/learning-es6-promises/) in late September. Since then I've been able to share what I've learned about ES6, speaking at [Nodevember 2015](https://www.youtube.com/watch?v=x1BvUqmn8xA) and [Little Rock Tech Fest 2015](http://usergroup.tv/videos/sugar-spice-and-everything-nice-about-es6).

At the end of the article about native ES6 promises, I mentioned that I would post about generators next. That was a bit premature. There are a couple of building blocks that we need to talk about: the new `for-of` loop, iterators & iterables, and the new collections added in ES6. After that we should have everything we need to deep dive into the asynchronous world of generators. So let's talk about the new `for-of` loop!

## TL;DR

The new `for-of` loop introduced with ES6 allows for iterating over an array (or any _iterable_) in a succinct fashion similar to how we can iterate over the keys of an object using `for-in`.

```js
let list = [8, 3, 11, 9, 6];

for (let value of list) {
  console.log(value);
}
```

For the most part, there's nothing really too earth-shattering here. We just now get the functionality that exists in other programming languages and has been sorely lacking in JavaScript.

But keep on readin' to learn the ins and outs!

## ES3: `for` loop

Over the last two decades of JavaScript, developers have iterated over elements of an array using the simple `for` loop.

```js
var list = [8, 3, 11, 9, 6];

for (var i = 0; i < list.length; i++) {
  console.log(list[i]);
}
```

There's nothing wrong with this approach, but it just _feels_ like a lot of code to write these days. We have to keep track of the loop counter variable (`i` in the above example), tell it to increment by 1 with each iteration (`i++`), and control when the iteration ends (`i < list.length`).

But if we wanted to be totally accurate, we should write the code like this:

```js
var list = [8, 3, 11, 9, 6],
    length = list.length,
    i;

for (i = 0; i < length; i++) {
  console.log(list[i]);
}
```

This is because the JavaScript engine will actually hoist `i` to the top of the function (see the article on [block-level scoping](/learning-es6-block-level-scoping-let-const/) for more on variable hoisting). Also in the previous `for` loop, `list.length` gets accessed with every iteration of the loop even though it doesn't change, so storing it in a `length` variable is a tad bit more efficient. This all seems overkill when all we want to do is iterate over each element of the `list`.

## The `for-in` temptation

If you've used other programming languages such as Python, you may be tempted to use `for-in` with arrays for a more succinct syntax:

```js
var list = [8, 3, 11, 9, 6],
    i;

// DON'T DO THIS!!!!
for (i in list) {
  console.log(list[i]);
}
```

But you **SHOULD NOT DO THIS**! Depending in the JavaScript engine, it could iterate in an arbitrary order. Furthermore, other properties on the array (such as `length`) could also be included in the iteration (older version of Internet Explorer do this). Finally, the iteration variable (`i` in the above example) is a `String`, not a `Number` so if you try to do any math with the variable (such as `i+1`), you'll actually be preforming string concatenation instead of addition.

`for-in` was exclusively intended for iterating over the enumerable keys of an object, and is not for iterating over arrays.

## ES5: `forEach` method

ECMAScript 5 introduced the `forEach` instance method on arrays:

```js
var list = [8, 3, 11, 9, 6];

list.forEach(function(value, i) {
  console.log(value);
});
```

The syntax feels less verbose because we no longer need to maintain the loop control variable and the method automatically runs to completion of the array for us. But using `forEach` has some unfortunate drawbacks.

With a normal `for` loop you can `break` to end the loop early. There isn't a way to end `forEach` early. Including `break` within the `forEach` callback function will be a syntax error. It is only valid within loops.

Similarly, with a `for` loop when we `return`, we are exiting out of the entire function that the `for` loop is in. However, putting a `return` within the `forEach` callback function just exits out of the callback function itself early. It's actually more or less equivalent to doing `continue` in a `for` loop, but far less intuitive. Including `continue` in the `forEach` call back function would be the same sort of syntax error we got with `break`.

Lastly, only `Array` objects have the `forEach` method. Other array-like objects (such as `arguments` or DOM `NodeList`) unfortunately do not, leaving us to do "clever" tricks with `Array.prototype.apply`.

## ES6: `for-of` loop

With the new `for-of` loop, ES6 aims to bring the best parts from all three of the previous approaches.

```js
let list = [8, 3, 11, 9, 6];

for (let value of list) {
  console.log(value);
}
```

We get the succinct syntax of `for-in`, the run-to-completion of `forEach`, and the ability to `break`, `continue`, and `return` of the simple `for` loop. Now JavaScript has a loop control structure that is just as succinct as what you will find in Python, C# or Java.

**Remember:** `for-of` is for iterating over arrays and `for-in` is for iterating over the keys of objects.

## Why a new operator?

So why the new `for-of` operator? Why not just make `for-in` work correctly with arrays? They look almost identical, right? Great questions!

One of the primary objectives for the TC39 committee when coming up with new ECMAScript features is maintaining backwards compatibility. There are trillions and trillions of lines of JavaScript code out there in the Wild Wild Web, and new versions of JavaScript _cannot_ break that code. There are probably thousands (if not millions) of lines of JavaScript code that are intentionally or unintentionally relying on the brokeness of how `for-in` works with arrays. Fixing `for-in` to work how `for-of` now works would have a side effect of breaking all of that code. So unfortunately we need a new operator.

## `for-of` and iterables

But `for-of` doesn't just work for arrays. If it did, it probably wouldn't have been meaty enough to add to the ES6 specification. Other existing collections like the DOM `NodeList` object, the `arguments` object, and strings also work with `for-of`. Just like with arrays, this makes it a little bit easier to iterate over these non-array objects.

When you use `for-of` with a string, you iterate over each character in the string:

```js
for (var char of 'Hello') {
    console.log(char);
}

// output:
// H
// e
// l
// l
// o
```

ES6 also introduces some new collections (`Map`, `Set`, `WeakMap`, and `WeakSet`), which we'll discuss in detail in the next article. These work with `for-of` as well. Essentially `for-of` can iterate over any object that is _iterable_. That's where the power & worth of `for-of` really come through. An object is _iterable_ if it implements a default iterator. This probably won't make too much sense at the moment, but we'll learn all about iterators and iterables right after we cover the new collections.

## JavaScript engine support

According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/) all major & modern JavaScript engines (transpilers, browsers and servers) support the `for-of` operator.

## Additional resources

Normally there would be a separate code examples page where you would find all the code used in an article, but there was hardly any substantial code used in this article. `for-of` is pretty straightforward. That's probably also why there aren't any `for-of`-specific [ES6 Katas](http://es6katas.org/) either.

The `for-of` operator, iterators & iterables are heavily tied together, so there aren't any blogs or books that talk about `for-of` separately like I've done here. `for-of` _can_ be used without custom iterators and most developers will just use it with arrays as described above, so I felt that it was useful as a topic on its own. It is pretty straightforward, but if you'd like to read some more:

- [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html) in [*Exploring ES6*](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-iterators-and-generators) in [*Understanding ECMAScript 6*](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [ES6 Iterators in Depth](http://ponyfoo.com/articles/es6-iterators-in-depth) in [*ES6 in Depth*](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)
- [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/) in [*ES6 in Depth*](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)

## Coming up next...

I promise not to have another 2-month delay between articles. Up next will either be a deep dive into the 4 new collections added in ES6 (`Map`, `Set`, `WeakMap` & `WeakSet`) or a comprehensive look at iterators and iterables. There essentially is a circular dependency between the two topics (either one requires some understanding of the other), but I'm leaning towards talking about the collections first. You _could_ get away without knowing anything about iterators and still use the new collections. Until then...
