---
title: Iterators & iterables
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, iterables, iterators, javascript, learning-es6]
cover: iterators-gonna-iterate.png
---

![iterators](iterators-gonna-iterate.png)

We've talked about the new [`for-of` operator](/learning-es6-for-of-loop/) and [new collection APIs](/learning-es6-new-collections/), so now we're finally going to talk about iterators & iterables. We've been bringing them up in passing in the last couple of articles, so it's about time we talk about them deeply.

## TL;DR

Iterators provide a simple way to return a (potentially unbounded) sequence of values. The `@@iterator` symbol is used to define default iterators for objects, making them an _iterable_.

```js
class MyIterator {
    constructor() {
        this.step = 0;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        this.step++;

        if (this.step === 1)
            return {value: 'Ben'};
        else if (this.step == 2)
            return {value: 'Ilegbodu'};

        return {done: true};
    }
}

let iter = new MyIterator();

// output: {value: 'Ben'}
console.log(iter.next());

// output: {value: 'Ilegbodu'}
console.log(iter.next());

// output: {done: true}
console.log(iter.next());

// output: {done: true}
console.log(iter.next());
```

The iteration & iterable protocol are based on the following duck-typed interfaces (explained in [TypeScript](http://typescriptlang.org/) for clarity):

```
interface Iterable {
    [System.iterator]() : Iterator;
}
interface Iterator {
    next() : IteratorResult;
    return?(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

All the collection types (`Array`, `Map`, `Set`, etc.) have default iterators designed for easy access to their contents. Strings also have a default iterator so it’s easy to iterate over the code point characters of the string (rather than the code unit characters).

```js
let str = '😍😎🙏';

for (let char of str) {
    console.log(char);
}

// output:
// 😍
// 😎
// 🙏
```

Iterables are important to know because a lot of the APIs moving forward will accept iterables instead of just arrays for greater flexibility. Iterators are helpful to know because they serve as the basis for generators, which open new doors to asynchronous programming. Be sure to clone the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) and take a look at the [iterators & iterables code examples](/learning-es6/#iterators-iterables) page showing off the features in greater detail.

Let's get this party started.

## Iterables

The reason the [`for-of` loop](/learning-es6-for-of-loop/) can work on `Array`, `Map`, `Set`, `String`, `arguments`, etc. is because they are all _iterables_. An iterable is an object that intends to make its sequential elements publicly accessible through iteration interfaces. This object does so by implementing the default `@@iterator` method using the _well-known_ `Symbol.iterator` symbol. We'll talk about about ES6 symbols more in a future article.

The default `@@iterator` returns an object that implements the iterator "interface" (explained further below), which is the actual object that `for-of` and other iteration features use to iterate. This means that you can create your own objects that implement the _iterable_ "interface" via [duck-typing](https://en.wikipedia.org/wiki/Duck_typing).

Here's the iterable interface explained using [TypeScript](http://typescriptlang.org/):

```
interface Iterable {
    // default iterator
    [System.iterator]() : Iterator;
}
```

You may already be familiar with iterables if you used C# [`IEnumerable`](https://msdn.microsoft.com/en-us/library/9eekhta0\(v=vs.110\).aspx) or Java [`Iterable`](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html). We'll explore the `Iterator` interface in the section on [iterators](#iterators) below.

### Why `Symbol.iterator`?

You can think of the default `Symbol.iterator()` method just like the default `toString()` method. `toString()` provides a custom way to serialize any object to a string. `Symbol.iterator()` provides a custom way to iterate over an object.

The TC-39 committee chose `Symbol.iterator()` for backwards compatibility. They could've chosen a friendlier name like `iterator()` or `iter()` to be more like `toString()`, but there was a good chance that there would be existing JavaScript code out in the wild using those method names. That code of course would be doing something different, so when it ran on an ES6 JavaScript engine, it would break. As we'll learn in a future article, Symbols are new to ES6 as well and are guaranteed to be unique. Therefore there was no possibility of existing code having a naming conflict. The `toString()` method has existed in the language from the very beginning.

### Using the default iterator

Ok, ok. Enough exposition. Let's look at some real code to hopefully help make this more clear.

By now we should be quite familiar with how the `for-of` operator works:

```js
let values = ['alpha', 'beta', 'charlie'];

for (let value of values) {
    console.log(value);
}
```

It iterates over the `values` array assigning each value to the `value` variable. Well, what `for-of` is doing is accessing the default `Symbol.iterator()` and iterating until the iterator says it is done (example adapted from [Nicholas C. Zakas](https://twitter.com/slicknet) in [Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-accessing-the-default-iterator)):

```js
let values = ['alpha', 'beta', 'charlie'];
let defaultIterator = values[Symbol.iterator]();

// output: {value: 'alpha', done: false}
console.log(defaultIterator.next());

// output: {value: 'beta', done: false}
console.log(defaultIterator.next());

// output: {value: 'charlie', done: false}
console.log(defaultIterator.next());

// output: {value: undefined, done: true}
console.log(defaultIterator.next());
```

We'll go into this in more depth in the section on [iterators](#iterators), but the `.next()` method on an iterator object returns an object containing the `value` of that iteration and whether or not the iteration is `done`. When `for-of` receives `{done: true}` it stops iterating.

One cool application of the default `Symbol.iterator()` is to make the array-like `jQuery` object an iterable (thanks to [Jason Orendorff](https://twitter.com/jorendorff) in [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/)):

```js
jQuery.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
```

The `jQuery` object is already array-like so we give it the same default iterator that `Array` has. Now it can be used with `for-of` instead only relying on its `.each()` method.

Lastly, because all iterables implement the default `Symbol.iterator()` method, it makes it super easy to detect if an object is an iterable:

```js
function isIterable(obj) {
    return obj && typeof obj[Symbol.iterator] === 'function';
}

// output: true
console.log(isIterable(['alpha', 'beta', 'charlie']));

// output: true
console.log(isIterable('Ben'));

// output: true
console.log(isIterable(new Set()));
```

At this point, if you wanted, you could stop reading. A solid understanding of iterables is all you really need. But if you want to get a slightly deeper understanding of iterators to prepare yourself for generators, please keep on reading!

## Iterators

An iterator is a pointer for traversing the elements of a data structure. This type of object exists in most programming languages including C# ([`IEnumerator`](https://msdn.microsoft.com/en-us/library/system.collections.ienumerator(v=vs.110).aspx)), Java ([`Iterator`](https://docs.oracle.com/javase/8/docs/api/java/util/Iterator.html)) or Python ([`iterator`](https://docs.python.org/2/library/stdtypes.html#iterator-types)). Instead of having a full list, an iterator walks one by one through a sequence. And that sequence could be unbounded such that it never terminates.

Let's look at a simple example (adapted from [Axel Rauschmayer](https://twitter.com/rauschma) in [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html#sec_implementing-iterables)):

```js
class MyIterator {
    constructor() {
        this.step = 0;
    }
    next() {
        this.step++;

        if (this.step === 1)
            return {value: 'Ben'};
        else if (this.step == 2)
            return {value: 'Ilegbodu'};

        return {done: true};
    }
}

let myIter = new MyIterator();

// output: {value: 'Ben'}
console.log(myIter.next());

// output: {value: 'Ilegbodu'}
console.log(myIter.next());

// output: {done: true}
console.log(myIter.next());

// output: {done: true}
console.log(myIter.next());
```

On the surface, this doesn't look too special. The `MyIterator` instance is doing exactly what the class is defining. When we call `.next()` the first time we get an object with `value` of `'Ben'`. The next time the object contains `value` of `'Ilegbodu'`. Every time after that we just get `{done: true}`.

But that's all an iterator is. It's an object that when `.next()` is called it returns a value or indicates that it is done. Now technically, the object returned by `.next()` should include both `value` and `done`. But `done` can be omitted when it is `false` and `value` can be omitted when it is `undefined`. Also, the iterator doesn't have to be a class object as we've done with `MyIterator`. It can just be a plain JavaScript object that has a `.next()` method.

This iterator interface in ES6 is also a bit different than other languages that support iterators. In C#, `IEnumerator` has a `MoveNext()` to go to the next item in the sequence. It returns `false` when the sequence is over. There's a separate `Current` property that contains the value. The Java `Iterator` has a `next()` method that returns the next value in the sequence and a `hasNext()` method that needs to be called to see if there are remaining items in the sequence. Python's `iterator` has a `next()` method that also returns the next value in the sequence, but throws a `StopIteration` exception when there are no values remaining in the sequence.

### Iterators + iterables

The "magic" of iterators comes to life when we want to use it in a construct that consumes iterables, such as the `for-of` loop. First we need an iterable object by creating an object with a default `@@iterator`:

```js
let myIterableSequence = {
    [Symbol.iterator]() {
        return new MyIterator();
    }
};
```

In the example, the iterable (`myIterableSequence`) is just a plain JavaScript object instead of a class instance. It uses [computed property keys](/learning-es6-enhanced-object-literals/#computed-property-keys) added in ES6 to quickly define the default `@@iterator`. All it does is return a `MyIterator` instance.

Now check out what happens when we use `myIterableSequence` in a `for-of` loop:

```js
// output:
// Ben
// Ilegbodu
for (let item of myIterableSequence) {
    console.log(item);
}
```

The `for-of` loop starts by calling the default `@@iterator` method on `myIterableSequence`. It then calls `.next()` to get each value which is subsequently assigned to the `item` variable. It will continue to call `.next()` on `myIterableSequence` until the iterator says its finished by returning `{done: true}` when `.next()` is called. The `for-of` loop is basically just a series of method calls on an iterator underneath. This is exactly what it gets transpiled down to in ES5 (with optimizations for handling arrays).

You know, instead of creating the wrapper object (`myIterableSequence`) to create an iterable, we could instead make the iterator itself iterable by implementing the default `@@iterator` and returning itself:

```js
class MyIterator {
    constructor() {
        this.step = 0;
    }
    [Symbol.iterator]() {
        return this;
    }
    next() {
        this.step++;

        if (this.step === 1)
            return {value: 'Ben'};
        else if (this.step == 2)
            return {value: 'Ilegbodu'};

        return {done: true};
    }
}

let myIter = new MyIterator();

// output:
// Ben
// Ilegbodu
for (let item of myIter) {
    console.log(item);
}
```

Now our object iterator object can be used directly in constructs like `for-of` that only work with iterables. We'll see more examples of this as we move forward.

### Formal iteration protocol

The full iteration protocol is as follows (once again using [TypeScript](http://typescriptlang.org/) for clarity only):

```
interface Iterable {
    // default iterator
    [System.iterator]() : Iterator;
}
interface Iterator {
    // next method to continue iteration
    next() : IteratorResult;

    // optional return method
    return?(value? : any) : IteratorResult;
}
interface IteratorResult {
    value : any;
    done : boolean;
}
```

Technically the `Interator` interface also includes a `throws()` method, but it's only used with generators (and `yield*`) and even then it's optional. Chances are, you'll never implement it yourself.

But an iterator can implement the optional `return()` method. It's optional because it's not always called. But when it is, it makes the iterator _closable_. A `for-of` loop will call `return()` if the loop exits because of a `return`, `break` or an exception. This is really a hook for the iterator to do any cleanups before it's no longer used. It typically will return `{done: true, value: x}` where `x` is the last value returned by `next()`. If `return()` doesn't return an object an error is thrown.

### Lazy iterators

Because the only way to get values out of an iterator is one-by-one using `next()`, iterators can be lazy. They don't have to generate their values until the next value is needed. This can open up a number of cool possibilities.

The first possibility is that we can now have sequences of values that can be a result of computationally expensive operations. Up until now, the only way to easily have a sequence was to have an array of all the values. This wouldn't be feasible from a performance standpoint. Let's take the jQuery object we alluded to earlier. When you get a jQuery object as a result of a selection (such as `$('p')`), it maintains an array of the matching DOM nodes. However, when you call `.each()` on the object, each item is a regular DOM node, presumably because it would be too expensive to wrap each matching node in its own jQuery object.

In our example before we assigned the jQuery object's default `@@iterator` to be the default `@@iterator` for `Array` so that it can be used in a `for-of` loop. But this would still result in regular DOM nodes on each iteration. However, if the jQuery object implemented a custom default `@@iterator`, it could wrap each matching node in a jQuery object, but _only_ when the next value is requested via `.next()`. It would create the jQuery objects on-demand. If you never loop over the matches, then the wrapped objects never need to be created.

```js
// loop over all <ul> tags
for (let uList of $('ul')) {
    // `uList` is already a jQuery object.
    // No need to do `$(this)`
    // for each uList (now a jQuery object) loop through <li>
    for (let listItem of uList.find('li')) {
        // `listItem` is also a jQuery object
        console.log(listItem);
    }
}
```

Wouldn't this be so nice? Because we use `for-of` instead of `.each()` we no longer have to deal with a callback function either. And because the DOM nodes are wrapped jQuery objects we no longer have to do that initial `$(this)` step. Kudos to [Nicolas Bevacqua](https://twitter.com/nzgb) in [ES6 Iterators in Depth](https://ponyfoo.com/articles/es6-iterators-in-depth) for the idea.

Another possibility with lazy iterators is infinite sequences. This is an iterator that will never return `{done: true}` to signal that the sequence is over. Each call to `.next()` will always return a value. A perfect example of an infinite sequence is the Fibonacci sequence (borrowed from [Luke Hoban](https://github.com/lukehoban/es6features#iterators--forof)):

```js
let fibonacci = {
    [Symbol.iterator]() {
        let previous = 0, current = 1;
        return {
            next() {
                [previous, current] = [current, previous + current];
                return {value: current};
            }
        }
    }
}

for (var number of fibonacci) {
    // stop after the number is greater than 1000
	if (number > 1000)
        break;

    console.log(number);
}
```

You see? The iterator never returns `{done: true}`, making it infinite. If we tried to create an array from this infinite sequence, it would crash our app. Therefore, if we have an infinite sequence in a `for-of`, we must `return` or `break`, otherwise the loop will never end.

### Built-in iterators

As mentioned, `for-of` works with a lot of native objects because they have default `@@iterator` methods defined. Collections have additional iterator methods: `.entries()`, `.values()` and `.keys()`. Check out the article on the [new collections](/learning-es6-new-collections/) added in ES6 for more details.

## Other consumers of iterators

The `for-of` operator isn't the only construct that makes use of iterators.

### `Array.from`

ES6 added the `Array.from()` static method that converts any iterable or array-like object into an actual array:

```js
let array = Array.from(iterable);
```

Because `Array.from()` creates an array from the iterable, the iterable cannot be infinite; you cannot have an infinite array.

### Spread operator

As we learned in the [parameter handling](/learning-es6-parameter-handling/#spread-operator) article, the spread operator can be used to insert values of an iterable into an array:

```js
let array = ['a', ...iterable, 'z'];
```

You can also use the spread operator to mimic `Array.from()`:

```js
let array = [...iterable];
```

Lastly, you can turn an iterable into individual arguments of a function call:

```js
foo(...iterable);
```

So if `iterable` was an iterator, it would just call `.next()` until it received `{done: true}`. Each one of the values would end up being parameters in the function call! But once again, infinite iterables will not work with the spread operator because it reads until it receives `{done: true}` which will never be returned with an infinite iterator.

### Array destructuring

[Destructuring](/learning-es6-destructuring/) actually allows us to pull out values from any iterable. When we initially learned about destructuring, we only focused on arrays. Imagine we had our `fibonacci` iterable example from earlier. It's neither an array nor finite, yet it can be a part of destructuring:

```js
let [, secondFib, , fourthFib] = fibonacci;

// output: 2, 5
console.log(secondFib, fourthFib);
```

The code is simply extracting the 2nd and 4th Fibonacci numbers from the `fibonacci` iterable.  But what's happening is that destructuring is calling `.next()` on the iterable only four times. That's how destructuring can work with infinite iterables. The first call to `.next()` returns the first Fibonacci number, but we aren't actually consuming it into a variable. It's the second number we want, so it calls `.next()` again, retrieves the value and assigns it to `secondFib`. The third number returned by the third call to `.next()` isn't consumed, and then finally the fourth call to `.next()` assigns the value to `fourthFib`.

Destructuring and lazy iterators work very well together.

### `Map` & `Set` constructor

The [`Map` constructor](/learning-es6-new-collections/#constructor) converts an iterable of `[key, value]` pairs into a `Map` object:

```js
let map = new Map(iterable);
```

The [`Set` constructor](/learning-es6-new-collections/#constructor-1) converts an iterable of values into a `Set` object:

```js
let set = new Set(iterable);
```

And as we learned, because the `Map` & `Set` objects are themselves iterables, we can use their constructors to clone them. No infinite iterators allowed here either.

### `Promise.all` & `Promise.race`

`Promise.all()` and `Promise.race()` both accept iterables of [`Promise`](/learning-es6-promises/) objects (technically _thenables_), and not just arrays. So if you had a `Set` of _thenables_ you could pass it directly to either of those static methods without having to do any array conversions. You could in theory use an infinite iterable with `Promise.race()` since it stops once one of the promises are fulfilled, but since it's inherently asynchronous it may try to read the whole iterable prior to getting back the first asynchronous result.

### `yield*`

We haven't talked about `yield*` yet because they are used with _generators_. We'll deep dive into those in the next article.

## Combinators

_Combinators_ are functions that manipulate iterables to create new ones. If you're familiar with [LINQ](https://msdn.microsoft.com/en-us/library/bb397926.aspx) or [RxJs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.md), you've dealt with combinators before. Let's create our own combinator to see how they work. Let's define a `take(iterable, count)` combinator function that returns a new iterable over the first `count` items of `iterable` (adapted from an example by [Axel Rauschmayer](https://twitter.com/rauschma) in [Iterables and iterators](http://exploringjs.com/es6/ch_iteration.html#sec_take)):

```js
function take(iterable, count) {
    // get default `@@iterator` from original iterable
    let iterator = iterable[Symbol.iterator]();

    // return new (anonymous) iterable
    return {
        next() {
            // implementing `next()` makes it an iterator

            if (count > 0) {
                // if there are items remaining, return the next
                // one from the iterable
                count--;

				// return the value from original iterable's iterator.
				// if there are less values in it than `count`, this
				// will just return `{done: true}` early!
                return iterator.next();
            }
            else {
                // otherwise just say we're done
                return {done: true};
            }
        },
        [Symbol.iterator]() {
            // implementing default `@@iterator` makes it an iterable
            return this;
        }
    };
}

// output: [1, 2, 3, 5, 8, 13]
console.log(Array.from(take(fibonacci, 6)));
```

We were able to create an array of the first 6 Fibonacci numbers by using the `take()` combinator function. We take the infinite iterable `fibonacci` and pass it to `take()` which really just returns a new iterable. Nothing else has happened yet. We basically have a new iterable that has "instructions" to get the first 6 items from the `fibonacci` iterable, but it hasn't done it yet because it's lazy and hasn't been instructed to do so.

`Array.from()` consumes this new iterable and runs it to completion. Unlike `fibonacci`, this new iterable is finite and just returns 6 values; the first 6 items from `fibonacci`. After which it says it's done, and `Array.from()` returns an array with six elements.

ES6 doesn't have a native iterable object that's like C# [`IEnumerable`](https://msdn.microsoft.com/en-us/library/9eekhta0\(v=vs.110\).aspx) or Java [Iterable](https://docs.oracle.com/javase/8/docs/api/java/lang/Iterable.html). This type of object would be a special type of iterable that would have combinators as methods that would return new iterables. These may come in future version of ECMAScript. The goal with ECMAScript 6 was to standardize the iteration protocol, and then survey the landscape for what sort of libraries pop up based on the protocol. The most useful stuff could then get folded in for native support.

JavaScript seems to be moving more towards functional programming over object-oriented programming. So it's possible that instead of having a native iterable object with combinators methods like C# & Java have, there may be a native set of modules with a bunch of combinator functions (like `take()` above) that can be used with iterables.

## Generators

We've only really just scratched the surface of iterators. Like I mentioned earlier, we haven't even talked about implementing the `return()` or `throw()` methods with iterators. The main reason is that it's unlikely that we will be implementing iterators manually in practice. Writing iterators so that they adhere to the correct behavior is a bit difficult, which is why ES6 also provides generators. Instead of implementing an iterator object from scratch, we'll most likely use generator functions that create a generator object that is a special type of iterator object that unlocks a host of additional functionality.

## JavaScript engine support

According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/), all modern browsers support iterators and iterables. That shouldn't really come as a surprise since we've already learned that they all support the [`for-of` loop](/learning-es6-for-of-loop/) and the [new collections](/learning-es6-new-collections/).

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#iterators-iterables) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser. You can also get some practice with ES6 classes using [ES6 Katas](http://es6katas.org/).

This article only covered the parts of iterators I considered the most useful to know. In my opinion, iterables were the key learning from this article, but you have to know something about iterators for iterables to make sense. However, if you _really_ want to know all of the ins and outs of the iteration protocol, there are some additional resources you can read:

- [Iterables and Iterators](http://exploringjs.com/es6/ch_iteration.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-iterators-and-generators) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [ES6 Iterators in Depth](http://ponyfoo.com/articles/es6-iterators-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)
- [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)

## Coming up next...

All this learning about [promises](/learning-es6-promises/), the [`for-of` loop](/learning-es6-for-of-loop/), and today's article on iterators & iterables are all setting the stage for discussion on generators, the next generation of asynchronous programming. The `yield` keyword helps create generators and was something I saw in C# years ago and always want to learn about. Now it's in JavaScript! Until then...
