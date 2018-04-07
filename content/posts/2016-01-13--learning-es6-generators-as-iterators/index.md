---
title: Generators as iterators
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, generators, iterables, iterators, javascript, learning-es6]
cover: electric-generator.jpg
---

![electric generator](electric-generator.jpg)

I feel like all the articles in the [_Learning ES6_ series](/learning-es6-series/) have been leading up to generators. They really are the feature most JavaScript developers are excited about in ECMAScript 6. They very well may be the future of asynchronous programming in JavaScript. That's definitely something to get excited about!

Generators can be used both as data producers and data consumers. In this article, we're going to look at how generator functions are a much more convenient way to produce data and and create iterators. It's the simpler way to use generators. In the last article we covered [iterators & iterables](/learning-es6-iterators-iterables/), so you may need to familiarize yourself with that before looking at generators as iterators.

## TL;DR

A generator function is a special type of function that when invoked automatically generates a special iterator, called a _generator_ object. Generator functions are indicated by `function*` and make use of the `yield` operator to indicate the value to return for each successive call to `.next()` on the generator.

```js
function* range(start, count) {
    for (let delta = 0; delta < count; delta++) {
        yield start + delta;
    }
}

for (let teenageYear of range(13, 7)) {
    console.log(`Teenage angst @ ${teenageYear}!`);
}
```

Feel free to clone the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) and take a look at the [generators code examples](/learning-es6/#generators) page showing them off in greater detail.

With out further ado, let's keep reading.

## Quick overview

Generator functions are a new type of function in ES6 that are indicated by `function*` and return a generator object (which is a specific type of iterator). The heart of a generator function is the `yield` operator that pauses execution within the generator function:

```js
function* generatorFunc() {
    console.log('before yield');
    yield;
    console.log('after yield');
}

let generator = generatorFunc();

// nothing has happened yet, just have a generator

// output:
// before yield
// {value: undefined, done: false}
console.log(generator.next());

// this will be executed before 'after yield'
// is written to the log
console.log('after first next');

// Output:
// after yield
// {value: undefined, done: true}
console.log(generator.next());

// additional calls to .next() do nothing

// Output:
// {value: undefined, done: false}
console.log(generator.next());
```

As you can see, calling `generatorFunc()` doesn't execute the function. It just returns a generator object which we assign to `generator`. It's `generator` that will allow us to control `generatorFunc`'s execution. Before calling `generator.next()`, `generatorFunc` is kind of in a holding pattern at the beginning of its function body. It's not until `.next()` is called that execution begins and continues until the first `yield`. Everything prior to that first `yield` is executed (so `'before yield'` is logged to console).

An object with a value is returned, but that `value` is `undefined` because we haven't provided an operand for `yield`. We'll talk more about `yield`ing values in a bit so it's ok if that doesn't make too much sense just yet.

`generatorFunction()` is now paused at the `yield` line, right in the middle of the function. Execution now returns back to the main program where `'after first next'` is logged to the console.

The subsequent call to `generator.next()` continues execution in the generator function. `'after yield'` is now logged to the console and the function finishes. The call to `.next()` returns another object, this time with `done` set to `true`. Any additional calls to `generator.next()` have no effect.

This is the barebones of how generator functions work. A generator object can be created in four ways...

From a generator function declaration (same as example above):

```js
function* generatorFunc() {
    yield;
}
let generator = generatorFunc();
```

From a generator function expression:

```js
const generatorFunc = function*() {
    yield;
}
let generator = generatorFunc();
```

From a generator method definition in an object literal:

```js
let someObj = {
    *generatorFunc() {
        yield;
    }
};
let generator = someObj.generatorFunc();
```

From a generator method definition in a class definition (declaration or expression):

```js
class SomeClass {
    *generatorFunc() {
        yield;
    }
}
let someObj = new SomeClass();
let generator = someObj.generatorFunc();
```

The most basic form of a generator object acts as a data producer, aka an iterator. It returns a value for each iteration. If you haven't had a chance to read up on [iterators & iterables](/learning-es6-iterators-iterables/), you probably should do that first. Everything we'll cover in this section builds upon that knowledge.

As the article on iterators mentioned, we most likely won't be implementing iterators directly because of generators. Generator functions make it dead simple to create iterators (although understanding them isn't quite so simple). All we have to do is write the looping behavior because all generators have built-in implementations for `.next()` and `[Symbol.iterator]()`. This makes generators both iterators as well as iterables. As a refresher, here's the iterable interface written using [TypeScript](http://typescriptlang.org/):

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

## Creating a generator

So how much easier is it to create a generator versus a plain iterator? Well let's adapt an example from [Jason Orendorff](https://twitter.com/jorendorff)'s [ES6 In Depth: Generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/) blog post. Let's say we want a `range()` function that will return an iterator that will iterate from the specified `start` for a specified `count` number of times:

```js
class RangeIterator {
    constructor(start, count) {
        this.start = start;
        this.count = count;
        this.delta = -1;
    }

    [Symbol.iterator]() { return this; }

    next() {
        this.delta++;

        let value = this.start + this.delta;

        if (value < this.start + this.count) {
            return {value}; // using object literal shorthand
        }
        else {
            return {done: true};
        }
    }
}

// Return a new iterator that will iterate from `start` for
// `count` number of times
function range(start, count) {
    return new RangeIterator(start, count);
}

for (let teenageYear of range(13, 7)) {
    console.log(`Teenage angst @ ${teenageYear}!`);
}
```

This isn't overly complicated, but there sure is a whole lot of boilerplate to implement the `RangeIteartor`. Generators to the rescue!

```js
// Return a new generator that will iterate from `start` for
// `count` number of times
function* range(start, count) {
    for (let delta = 0; delta < count; delta++) {
        yield start + delta;
    }
}

for (let teenageYear of range(13, 7)) {
    console.log(`Teenage angst @ ${teenageYear}!`);
}
```

Wow! We just spent many articles going through the syntactic sugar features of ES6 learning how it made our code more succinct. But we just used the new generator functionality to replace 25+ lines of code with only 4! We no longer have to define the `RangeIterator` class because generator functions automatically create the class for us. And the best part of the generator function implementation is that we get to avoid the weirdness of `RangeIterator` where it describes the functionality of a loop without using any loop syntax. It has to use state variables (`this.start`, `this.count` & `this.index`) to manage the looping behavior across multiple calls to `.next()`. Generators are _much_ better.

## Consuming a generator

In the article on [iterators & iterators](/learning-es6-iterators-iterables/#other-consumers-of-iterators), we looked at consumers of iterators. Those same consumers work with generators as well since they are in fact iterators. Let's look at the different ways we can consume the generator created by the following function:

```js
function* awesomeGeneratorFunc() {
    console.log('start');

    console.log('first yield');
    yield 'Generators';

    console.log('second yield');
    yield 'are';

    console.log('third yield');
    yield 'awesome!';

    console.log('all done!');

    return 1000;
}
```

### Consuming a generator manually

As we saw earlier in the [quick overview](#quick-overview), we can manually consume a generator by calling `.next()` on it:

```js
let generatorObj = awesomeGeneratorFunc();

// output:
// start
// first yield
// {value: 'Generators', done: false}
console.log(generatorObj.next());

// output:
// second yield
// {value: 'are', done: false}
console.log(generatorObj.next());

// output:
// third yield
// {value: 'awesome!', done: false}
console.log(generatorObj.next());

// output:
// all done!
// {value: 1000, done: true}
console.log(generatorObj.next());

// output:
// {value: undefined, done: true}
console.log(generatorObj.next());

// output:
// {value: undefined, done: true}
console.log(generatorObj.next());
```

Manually consuming a generator shows the pausing nature of generator functions. We're just successively calling `.next()` to keep the example simple, but we could do a whole host of things in between calls to `.next()` and the generator function would stay "suspended" until a subsequent call to `.next()`.

The only thing really new in this example is that `awesomeGeneratorFunc()` actually returns a value. But `1000` is not what is assigned to `generatorObj`; it is still a generator object. `1000` gets set as the `value` when the generator is done for the first time (`{value: 1000, done: true}`). Subsequent calls to `.next()` return an `undefined` `value` when `done` is `true`. We'll look at the use case for this return value later on when we look at `yield*`.

### Consuming a generator with a `for-of` loop

Even though our generator doesn't actually do any looping (like the [`range()`](#creating-a-generator) function from before) it can still be consumed by a `for-of` loop:

```js
let generatorObj = awesomeGeneratorFunc();

// output:
// start
// first yield
// value: "Generators"
// second yield
// value: "are"
// third yield
// value: "awesome!"
// all done!
for (let word of generatorObj) {
    console.log(`value: "${word}"`);
}
```

The `for-of` operator calls `.next()` on the `generatorObj` automatically and assigns the `value` property to `word`. We see here that `for-of` consumes the generator until the generator is completed (`{done: true}`) and then it stops looping.  However it doesn't utilize the `1000` return value at all. It's also worth pointing out that if we had a `break` in the loop, the generator never would've completed.

### Consuming a generator with destructuring

By now you should be familiar with destructuring. If you aren't, take a look at the [destructuring](/learning-es6-destructuring/) article to ramp up. We can use destructuring to consume part of the generator values:

```js
let generatorObj = awesomeGeneratorFunc();

// output:
// start
// first yield
// second yield
let [firstValue, secondValue] = generatorObj;

// output: 'Generators'
console.log(firstValue);

// output: 'are'
console.log(secondValue);
```

With destructuring we don't have to consume the entire generator. We can just pull out the values that we care about. In this case we're only pulling out the first two values so the generator only calls `.next()` twice. We never see `'third yield'` written to the log, proving that the generator is indeed lazy just like iterators.

### Consuming a generator with the spread operator

We've already learned that we can use the [spread operator](/learning-es6-parameter-handling/#spread-operator) as a shorthand for converting any iterable into an `Array` object. A generator object is an iterable too!

```js
let generatorObj = awesomeGeneratorFunc();
let generatedArray = [...generatorObj];

// output:
// start
// first yield
// second yield
// third yield
// all done!
// ['Generators', 'are', 'awesome!']
console.log(generatedArray);
```

As we can see, the spread operator consumes until completion in order to create the array. Using the new `Array.from()` static method would also have the same effect and results. We can then utilize all of the methods on an `Array` object (like `.forEach`, `.map`, etc.).

## Generator recursion with `yield*`

Head hurting yet? If not, it definitely will as we start talking about `yield*`!

There will be times when we want to combine the values of one or more generators into a single one. Or, we want to factor out generator logic into a separate function so that it can be used multiple times. With "regular" programming we would just create the factored out function and call it as needed.

However, it's not as simple in generator land. We don't want to call the helper generator function to get back its return value. If we did that, we'd just get a new generator for that helper generator function. We actually want it to continue to `yield` into our _current_ generator. What we want to do is delegate the generator's population to another generator function.

And we can do this using `yield*`:

```js
function* delegatedGeneratorFunc(start) {
    // yield the first item in the generator
    yield 'before';

    // delegate yielding to `awesomeGeneratorFunc()` which will add
    // 3 more items
    yield* awesomeGeneratorFunc();

    // yield 5th item
    yield 'between';

    // delegate yielding to `range()` which will add 5 items
    // we can pass parameters/variables just like regular functions
    // without `yield*` we'd just get back a new range generator
    // with only `yield`, the generator would be added as 10th item
    yield* range(start, 5);

    // yield 11th and final item
    yield 'after';
}

// quickly see contents of generator by converting to an array
// output:
// ['before', 'Generators', 'area', 'awesome', 'between', 1, 2, 3, 4, 5, 'after']
console.log([...delegatedGeneratorFunc(1)]);
```

As you can see, when we call `delegatedGeneratorFunc()` we end up with a generator that will iterate over 11 items even though only 3 were actually added directly within the function. The other 8 were delegated via `yield*`: three from `awesomeGeneratorFunc()` and five from `range()`. `yield*` iterates over the generator object returned by the delegated generator functions and then adds them as items to the main generator object.

If you picture a normal generator function building up an array instead of a generator, you can think of `yield` as calling `.push()` on an array. If we continue this analogy further, calling `yield*` is like calling `.splice()` to add multiple items to the array.

As it turns out, `yield*` isn't just a generator function delegator. The operand of `yield*` (i.e. the value to the right) doesn't have to be a generator object. It can be any iterable.

```js
function* iterableGeneratorFunc() {
    yield 'adios';
    yield* 'hello';  // a string is an iterable!
    yield 'au revoir';
}

// quickly see contents of generator by converting to an array
// output: ['adios', 'h', 'e', 'l', 'l', 'o', 'au revoir']
console.log([...iterableGeneratorFunc()]);
```

Basically `yield*` is iterating over the values of an iterable for us and then `yield`ing those values individually. We can more or less mimic `yield*` using `for-of`:

```js
function* iterableGeneratorFunc() {
    yield 'adios';

    for (let value of 'hello') {
        yield char;
    }

    yield 'au revoir';
}
```

One other cool thing about `yield*` is that it's one of the few built-in language constructs that uses the value that's included when an iterator is done. As we saw earlier with `awesomeGeneratorFunc()` the value returned when a generator is done is specified via `return` in the generator function. In the case of `awesomeGeneratorFunc()` it returns the value `1000`. Let's create a generator function that will use the `1000` return value from `awesomeGeneratorFunc` to help initialize the `range()` generator.

```js
function* delegatedGeneratorFuncV2() {
    // we're still including the 3 items yielded by awesomeGeneratorFunc(),
    // but we're also saving the return value in a variable
    let start = yield* awesomeGeneratorFunc();

    // we can now use that variable to initialize range()
    yield* range(start, 3);
}

// output: ['Generators', 'are', 'awesome', 1000, 1001, 1002]
console.log([...delegatedGeneratorFuncV2()]);
```

Let's wrap up our learnings on `yield*` with a more concrete example to show the power of generators. It's a binary tree example taking from the [Generators chapter](http://exploringjs.com/es6/ch_generators.html#leanpub-auto-iterating-over-trees) of [Axel Rauschmayer](https://twitter.com/rauschma)'s _Exploring ES6_ book.

```js
class BinaryTree {
    constructor(value, left, right) {
        this.value = value;
        this.left = left;
        this.right = right;
    }

    // default `@@iterator` is a generator function so
    // it needs the `*`
    *[Symbol.iterator]() {
        if (this.left) {
            yield* this.left;
        }

        // Let's do infix/in-order iteration
        yield this.value;

        if (this.right) {
            yield* this.right;
        }
    }
}

let tree = new BinaryTree(4,
    new BinaryTree(2,
        new BinaryTree(1),
        new BinaryTree(3)),
    new BinaryTree(5));

// output: [1, 2, 3, 4, 5]
console.log([...tree]);
```

Now, I don't have time to explain binary tree traversal with recursion. Chances are you've had to write it on a whiteboard during an interview. 😭 You can Google it if you're unfamiliar. But doing this sort of recursion in a manually-created iterator would be pretty complicated. Using generators and `yield*` makes it just as simple as the normal recursive solution would be.

In this example we made a `BinaryTree` object an iterable by giving it a `[Symbol.iterator]()` method. We need to prefix the method with `*` because our implementation is using `yield` and `yield*` to return a generator object. Also, because `BinaryTree` is iterable, we can use `yield*` to recursively get all of the items in a subtree (`this.left` or `this.right`) and add them to the main generator object. And this is all done lazily so the depth-first recursion only goes as deep as the generator is iterated. In this example we're converting the iterable tree into an array, so we end up traversing the entire tree.

## Putting it all together

Ok, we've spent a lot of time learning about how generators can be used as iterators. We've looked at a lot of simple, dummy examples to help us grasp the underlying concepts without too much logic around it. But in the real-world, our code is primarily logic because we're trying to accomplish a real task. So let's try to put what we've learned together into something we're more likely to do on a regular basis.

Let's mimic [underscorejs](http://underscorejs.org/) or [lodash](https://lodash.com/). They both have functions that operate on arrays to map, filter, take, etc. They both have a `_.chain()` method which allows for chaining these functions without creating throwaway intermediary objects. We want to build something similar. However, we're going to leverage the power of generators so that we don't have to have realized arrays. Instead, using generators, we can preform these operations on infinite sequences in a lazy manner.

```js
// Enumerable class that wraps an iterator exposing methods
// to lazily transform the items
class Enumerable {
    constructor(iterator) {
        // assuming iterator is some sort of iterable
        this._iterator = iterator;
    }

    *[Symbol.iterator]() {
        yield* this._iterator;
    }

    // Static (and private) helper generator functions
    static *_filter(iterator, predicate) {
        for (let value of iterator) {
            if (predicate(value)) {
                yield value;
            }
        }
    }
    static *_map(iterator, mapperFunc) {
        for (let value of iterator) {
            yield mapperFunc(value);
        }
    }
    static *_take(iterator, count) {
        let index = -1;
        for (let value of iterator) {
            if (++index >= count) {
                break;
            }

            yield value;
        }
    }

    // Instance methods wrapping functional helpers which allow for chaining
    // The existing iterator is transformed by the helper generator function.
    // The operations haven't actually happened yet, just the "instructions"
    filter(predicate) {
        this._iterator = Enumerable._filter(this._iterator, predicate);
        return this;
    }
    map(mapper) {
        this._iterator = Enumerable._map(this._iterator, mapper);
        return this;
    }
    take(count) {
        this._iterator = Enumerable._take(this._iterator, count);
        return this;
    }
}

function generateStocks() {
    // Returns an infinite generator that keeps on returning new stocks
    function* _generate() {
        for (let stockNo = 1; ; stockNo++) {
            let stockInfo = {
                name: `Stock #${stockNo}`,
                price: +(Math.random() * 100).toFixed(2)
            };

            console.log('Generated stock info', stockInfo);

            yield stockInfo;
        }
    }

    return new Enumerable(_generate());
}

let enumerable = generateStocks()
    .filter((stockInfo) => stockInfo.price > 30)
    .map((stockInfo) => `${stockInfo.name} ($${stockInfo.price})`)
    .take(5);

// Even though `_generate()` is an infinite generator, it's also lazy so
// we only look at enough stocks that are > 30 until we get 5 of them
console.log([...enumerable]);
```

We've basically implemented a (small) portion of [lazy.js](http://danieltao.com/lazy.js) or [RxJs](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/libraries/main/rx.md) using generators. Congratulations! We're taking an infinite list of stocks, filtering by the ones that cost over $30, mapping each of those stocks to a display name, and then taking the first 5. Finally we convert that resultant iterator/generator into an array, which we log to the console.

The cool thing about it is that it's lazy. It obviously doesn't create the infinite list of stocks, otherwise it would crash. Instead it only creates enough stocks to get 5 that are over $30. If you run the code, you'll see that you get less than a dozen `'Generated stock info'` log messages.

The best way to understand how this all works is to work backwards.

Let's start with `.take()` (and `*_take()`). As long as we haven't gotten to `count` it `yield`s the value from the iterator. Each iteration in the `for-of` loop retrieves the next value from its iterator. But that iterator is actually a generator from `.map()` (and `*_map()`). So the first `value` in the `for-of` loop within `*_take()` is actually the first value `yield`ed by `*_map()`, the second `value` is the second value `yield`ed by `*_map()`, and so on.

Similarly within `*_map()`, each iteration in the `for-of` loop retrieves the next value from its iterator. That value is `yield`ed after transforming it by `mapperFunc`. And its iterator is actually the generator returned by `.filter()` and `*_filter()`. So the first `value` in the `for-of` loop within `*_map()` is actually the first value `yield`ed by `*_filter()`, and so on.

`*_filter()` uses a `for-of` loop to iterate over the values of its iterator and only `yield`s a value if the `predicate` function returns `true`. Well that iterator is the generator object returned by `generateStocks()`. Each iteration of the `for-of` loop is pulling out values from the generator, which `generateStocks()` is `yield`ing with a random price.

The reason why the program doesn't crash even though `generateStocks()` will continue to `yield` random stocks as long as they are requested, is because `*_take()` quits `yield`ing values after it has reached `count` number of values. Because no more `yield`s happen, the chain reactions end and `generateStocks()` stops `yield`ing random stocks.

Sweeet!

## JavaScript engine support

According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/), only Safari 9 doesn't support generator functions. All other modern browsers and engines support them.

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#generators) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser. You can also get some practice with ES6 classes using [ES6 Katas](http://es6katas.org/).

For more on using generators as iterators feel free to read:

- [Generators](http://exploringjs.com/es6/ch_generators.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Iterators and Generators](https://leanpub.com/understandinges6/read#leanpub-auto-iterators-and-generators) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [ES6 Generators in Depth](http://ponyfoo.com/articles/es6-generators-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)
- [ES6 In Depth: Generators](https://hacks.mozilla.org/2015/05/es6-in-depth-generators/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)
- [ES6 In Depth: Generators, continued](https://hacks.mozilla.org/2015/07/es6-in-depth-generators-continued/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)

## Coming up next...

So we just looked at how we can use generator functions to easily create generator objects that are iterators. But that's only half the story! Generator objects not only can act as data producers (aka iterators), but they can also act as data consumers (aka observers). Up next, we'll continue our deep dive into generators, looking at how we can use them to _consume_ data. This is where the asynchronous magic really happens. I had initially planned to just do one big article on generators that covered both sides, but it's clearly too big for just one article. Even this article post could've been split into two.

Until then...
