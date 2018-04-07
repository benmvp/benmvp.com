---
title: New collections
subTitle: The Learning ES6 Series
categories: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, map, set, weakmap, weakset]
cover: many-coins.jpg
---

![A collection of different coins](many-coins.jpg)

Now that we covered [ES6 classes](/learning-es6-classes/) we should be through all of the syntactic sugar that ECMAScript 6 offers. We can now focus on the new functionality introduced with ES6. The main focus in the next few articles will be all about asynchronous programming. We'll ultimately talk about generators, but there are a few building blocks we need to get through first. The new collections we'll talk about now aren't really building blocks for generators, but I feel that they are important to learn. In addition, they are types of _iterables_ which we'll deep dive into in the next article.

## TL;DR

ES6 introduces four new efficient collection data structures to mitigate our ab-use of object and array literals.

A `Set` contains a unique set of values of any type:

```js
let set = new Set([true, 'Ben', 5]);

set.add(false).add('Ilegbodu').add(25).add(true);

// output: 6
console.log(set.size);

// output: true
console.log(set.has('Ben'));
```

`Map` provides a mapping of keys of any type to values of any type:

```js
let map = new Map();

map.set('foo', 'bar');
map.set(true, 'Ben'); // non-strings can be keys

// output: Ben
console.log(map.get(true));

// output: 2
console.log(map.size);
```

`WeakMap` provides memory leak-free lookup of objects to values of any type:

```js
let $leftButton = $('#leftButton');
let domMetadata = new WeakMap();

domMetadata.set($leftButton, {clickCount:0});
```

`WeakSet` provides memory leak-free collection of unique objects:

```js
let $leftButton = $('#leftButton');
let clickedDomNodes = new WeakSet();

clickedDomNodes.add($leftButton);
```

The differences between the 4 collection types are subtle but important. Be sure to clone the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) and take a look at the [new collections code examples](/learning-es6/#new-collections) page showing off the features in greater detail.

To learn _how_ to use these collections you could just read documentation because they are just new APIs. However, to know _why_ you would want to use each one, I suggest you keep reading.

## `Map`

You may be thinking. Why do I need to use `Map` when I can just use a POJO (plain ol' JavaScript object)? At first glance it certainly does look just like an object literal. But up until now we have been abusing JavaScript objects as maps. They were intended for holding loosely, abtitrarily-nested structured data much like XML. But when there's only one level indexed by string keys, they basically look like maps.

ES6 now introduces a true map data structure appropriately called `Map`.

### Constructor

The `Map` constructor takes an optional array of `[key, value]` pairs that are added when the `Map` is created. If you omit the array, an empty `Map` object is created.

```js
let allStarVotesEmpty = new Map();

let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');

let allStarVotesInitialized = new Map([
    [steph, 50],
    [kobe, 0],
    [lebron, 22]
]);
```

Right now, there doesn't seem to be much difference between an object literal and a `Map`. In fact the `Map` seems like _more_ syntax. But that's about the change...

### Handling values

One limitation of using object literals as maps that you may have run into is that object literals only support using strings as keys. Any key you set on an object literal that is **not** a string will get coerced into one.

```js
let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');

// Build up votes lookup table using
// ES6 computed property keys
let allStarVotes = {
    [steph]: 50,
    [kobe]: 0,
    [lebron]: 22
};

// output: true
// the player objects are coerced to the
// strings "[Object object]"
console.log('[Object object]' in allStarVotes);
```

Another issue is the looseness in determining if a key is a part of a JavaScript object. Doing a truthy check doesn't work if its value can be falsy:

```js
let allStarVotes = {
    'Stephen Curry': 50,
    'Kobe Bryant': 0,
    'LeBron James': 22
};

// truthy check doesn't work because 0 is a
// valid value and is falsy
if (allStarVotes['Kobe Bryant']) {
    console.log('Kobe Bryant is a candidate');
}
```

Getting the size of the object is also not very straightforward nor efficient. The quickest way is to get the length from the array of keys.

```js
let allStarVotes = {
    'Stephen Curry': 50,
    'Kobe Bryant': 0,
    'LeBron James': 22
};
let numCandidates = Object.keys(allStarVotes).length;
```

Using vanilla JavaScript objects is also susceptible to a security issue because you could unintentionally overwrite properties inherited from `Object.prototype` (such as `toString`):

```js
let allStarVotes = {
    'Stephen Curry': 50,
    'Kobe Bryant': 0,
    'LeBron James': 22
};
allStarVotes.toString = 'overwritten';

// Error!
// toString is not a function
console.log(allStarVotes.toString());
```

`Map` clears up all of these issues.

- `Map.prototype.get(key)` retrieves the value mapped to `key`. This replaces indexing into a vanilla JavaScript object using dot- or bracket-notation. It returns `undefined` if the `key` is not present. There's no way of providing a default unfortunately.
- `Map.prototype.set(key, value)` maps the specified `key` to the specified `value`. This will overwrite any existing value for the `key` or create a new one. This replaces assigning to a vanilla JavaScript object using dot- or bracket-notation. It returns a reference to the instance, so `Map.prototype.set` is chainable.
- `Map.prototype.has(key)` checks for the existence of the specified `key` in the map, solving the existence issues described above with vanilla JavaScript objects
- `Map.prototype.delete(key)` removes the value mapped to the specified `key`, returning `true` if the value was removed and `false` otherwise. This replaces using the `delete` keyword with either dot- or bracket-notation.
- `Map.prototype.clear()` removes all entries from the map. With vanilla JavaScript objects we would do `map = {}`, but that just set `map` to a new empty object as opposed to clearing it out.
- `Map.prototoype.size` efficiently returns the number of entries in the map.

```js
let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');
let allStarVotes = new Map();

allStarVotes.set(steph, 50)
    .set(kobe, 0)
    .set(lebron, 22);

// output: 50
console.log(allStarVotes.get(steph));

// output: false
console.log(allStarVotes.has('Kevin Durant'));

allStarVotes.delete(kobe);

// output: 2
console.log(allStarVotes.size);

allStarVotes.clear();

// output: 2
console.log(allStarVotes.size);
```

### Iterating

`Map` provides three methods that return iterators over its data (in insertion order):

- `Map.prototype.keys()` returns an iterator over just the keys of the map
- `Map.prototype.values()` returns an iterator over just the values of the map
- `Map.prototype.entries()` returns an iterator over `[key, value]` pairs of the map

We haven't actually talked about iterators and how they work yet (that's coming up in the next article), but the following code should be pretty self-explanatory:

```js
// log each player name since player
// is a key in the map
allStarVotes.keys().forEach((player) => {
    console.log(player.name);
});

// log each all star vote count since
// count is a value in the map
allStarVotes.values().forEach((count) => {
    console.log(count);
});

// log each player name and his votes count
// together. Ex: 'Stephen Curry (50)
// Uses array destructuring to assign [key, value]
// pair into separate variables
allStarVotes.entries().forEach(([player, count]) => {
    console.log(`${player.name} (${count})`);
});
```

We learned earlier that the `Map` [constructor](#constructor) accepts an array of `[key, value]` pairs. That's only a part of the story. It actually accepts any _iterable_ of `[key, value]` pairs. This means that we can quickly clone a `Map` object by passing its `Map.prototype.entries()` iterator to the constructor of a new `Map` (because we just showed it returns an array of `[key, value]`):

```js
let allStarVotesCopy = new Map(allstarVotes.entries());
```

But actually, it gets even better. `Map` objects have what's called a _default iterator_. And that default iterator is  `Map.prototype.entries()`. This means we can clone a `Map` object by simply passing it into the constructor:

```js
let allStarVotesCopy = new Map(allstarVotes);
```

The `for-of` operator also works with a _default iterator_ so we don't need to call `.entries()` when we loop:

```js
// log each player name and his votes count
// together. Ex: 'Stephen Curry (50)
// Uses array destructuring to assign [key, value]
// pair into separate variables
for (let [player, count] of allStarVotes) {
    console.log(`${player.name} (${count})`);
}
```

And since the constructor takes any iterable, we can also easily merge raw data with `Map` objects to create a new object by using the [spread operator](/learning-es6-parameter-handling/#spread-operator):

```js
let durant = new Player('Kevin Durant');
let cp3 = new Player('Chris Paul');
let theBrow = new Player('Anthony Davis');

let russell = new Player('Russell Westbrook');
let carmelo = new Player('Carmelo Anthony');

let moreAllStarVotes = new Map([
    [durant, 20],
    [cp3, 5],
    [theBrow, 10]
]);
let rawData = [
    [russell, 12],
    [carmelo, 15]
];

let mergedMap = new Map([...allStarVotes, ...moreAllStarVotes, ...rawData]);
```

The spread operator works with any _iterable_ not just arrays, so we can use it to create a concatenated array literal, which we then pass into the `Map` constructor. The amount of code or helper libraries it would take to do this in ES5 with vanilla JavaScript objects would be immense.

And don't worry if you don't fully understand all of this iterator business. We'll cover iterators and iterables in great detail in the next article. Hopefully having this background on collections will make that discussion make even more sense.

`Map` also exposes `Map.prototype.forEach(loopFunc)` which is similar to `Array.prototype.forEach(loopFnc)` (introduced in ES5) and a functional approach to using `Map.prototype.entries()`:

```js
allStarVotes.forEach((count, player, map) => {
    console.log(`${player.name} (${count})`);
});
```

The third parameter passed to the function by `Map.prototype.forEach()` (`map` in the above example) is a reference back to the map object. In the case of the [arrow function](/learning-es6-arrow-functions/) we used above, it wouldn't be necessary because `allStartVotes` is still in scope. But if we were instead passing a named function, having that third map reference parameter could come in handy.

Although `Map` does have `forEach`, it doesn't have `filter` or `map`. You will first have to convert the `Map` object to an array of `[key, value]` pairs (using the spread operator like `[...allStarVotes]`), do the `filter`/`map` operation, and then construct a new `Map` object from the result. Hopefully this functionality will be added in the future.

### `Map` vs `Object`

So now that we've learned about all that `Map` can do, should we replace **all** uses of vanilla JavaScript objects with `Map`? Well, not exactly. If you're wanting to map anything other than strings to data values, you have no choice; you need to use `Map`.

However, if you're mapping string keys to data values, you have options. A good rough guideline deals with the types of keys in your map. If you're keys are fixed/static then just use a vanilla JavaScript object. It's really simple to do `map.keyName`. If your keys are dynamic (you're indexing into the map using variables), then use a `Map`: `map.get(varString)`.

## `WeakMap`

You've probably heard of a map before, but what's a _weak_ map? A `WeakMap` is a subset of a `Map`. You can call it a "`Map` with restrictions." It's not _iterable_, so it doesn't have a `.size` property nor `.clear()`, `.entries()`, `.keys()`, `.values()` or `.forEach()` methods. All keys _must_ be objects; no strings, numbers, booleans or symbols (more on these later) allowed.

```js
let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');
let allStarVotesWeak = new WeakMap();

allStarVotesWeak.set(steph, 50)
    .set(kobe, 0)
    .set(lebron, 22);

// output: 50
console.log(allStarVotesWeak.get(steph));

// output: false
console.log(allStarVotesWeak.has('Kevin Durant'));

allStarVotesWeak.delete(kobe);
```

It's probably not immediately apparent why you would use a `WeakMap` over a normal `Map` when it's so restrictive. And what's up with it only supporting objects as keys? Well [Nicolas Bevacqua](https://twitter.com/nzgb) explains it well in [ES6 WeakMaps, Sets, and WeakSets in Depth](https://ponyfoo.com/articles/es6-weakmaps-sets-and-weaksets-in-depth):

> The difference that may make `WeakMap` worth it, is in its name. `WeakMap` holds references to its keys _weakly_, meaning that if there are no other references to one of its keys, the object is subject to **garbage collection**.

When you use an object as a key in a `Map` object. Those object keys will never get garbage collected as long as the `Map` object is around because the `Map` object still has references to them. This can cause memory leaks if nothing else has references to these object keys. However, if the object keys in a `WeakMap` have no other references to them, those objects will be removed from the `WeakMap` object and available for garbage collection. This prevents the chance of a memory leak.

One use case of a `WeakMap` is if you want to attach some metadata to DOM objects. Lets say you want to keep track of how many times `<p>` nodes on the page have been clicked:

```js
// set up metadata click map
let clickMap = new WeakMap();

// on each click, add the p to the map
// (with initial click) or increment its
// click count
$('p').click(function() {
    let pNode = this;
    let clicks = clickMap.get(pNode);

    if (!clicks) {
        clicks = 0;
    }

    clicks.set(pNode, ++clicks);
});
```

The reason using a `WeakMap` is advantageous in this example is that if a given `<p>` node gets removed from the DOM, we don't have to know when that happens in order to delete it from our map so that the node can be garbage collected. If the node is removed from the DOM and nothing else has a reference to it, then it will automagically be removed from our `WeakMap` because it held a reference to the node _weakly_.

## `Set`

A set can also be thought of as a subset of a map as well. You could think of it as a map where the keys don't matter, but the values still need to remain distinct/unique. In fact, because ES5 didn't have an explicit set data structure, the best workaround has been to use a vanilla JavaScript object making the elements of our "set" the keys of the object. The values in the object would be some truthy value (like `1`) to make existence testing easier, but the values themselves didn't really matter.

```js
let nbaPlayers = {
    'Stephen Curry': true,
    'Kobe Bryant': true,
    'LeBron James': true
};

if (nbaPlayers['Stephen Curry']) { // true
    console.log('Stephen Curry is an NBA player');
}
if (nbaPlayers['Ben Ilegbodu']) { // false :'(
    console.log('Ben Ilegbodu is an NBA player');
}
```

This works pretty well, but it has the same drawback as vanilla JavaScript objects as maps. The keys have to be strings. ES6 includes the `Set` data structure that will work with any values (not just strings).

### Constructor

The constructor takes an optional _iterable_ of values that can be added initially to the `Set` object. If you choose to omit the iterable, then an empty `Set` object is created.

```js
let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');

let initializedSet = new Set([steph, kobe, lebron]);
let emptySet = new Set();
```

### Handling values

`Set` shares many of the same properties/methods as `Map` too:

- `Set.prototype.size`
- `Set.prototype.has(value)`, which is a lot faster than using `Array.prototype.indexOf()`
- `Set.prototype.delete(value)`
- `Set.prototype.clear()`

There is no `Set.prototype.get()` because there are no keys. And `Map.prototype.set()` is replaced by `Set.prototype.add(value)` for adding elements to the set. But just like `Map.prototype.set()`, `Set.prototype.add()` returns a reference to the instance so it's chainable.

```js
let steph = new Player('Stephen Curry');
let kobe = new Player('Kobe Bryant');
let lebron = new Player('LeBron James');

let allStars = new Set();

allStars.add(steph)
    .add(kobe)
    .add(steph) // duplicates are removed
    .add(lebron);

// output: false
console.log(allStars.has('Kevin Durant'));

// output: true
console.log(allStars.has(kobe));

allStars.delete(kobe);

// output: 2
console.log(allStars.size);

allStars.clear();

// output: 2
console.log(allStars.size);
```

A couple of methods I wish `Set` came with:

- `Set.prototype.addAll(iterable)` to add a list of items to the set in one call instead of having to iterate over a list and call `Set.prototype.add()` on each iteration
- `Set.prototype.hasAll(iterable)` to check to see if every item in the list is in the set
- `Set.prototype.deleteAll(iterable)` to delete every item in the list from the set

Maybe they will get added in future specifications.

### Iterating

`Set` has the same 3 methods that return iterators that `Map` has:

- `Set.prototype.values()` returns an iterator over just the values of the set
- `Set.prototype.keys()` returns the same iterator as `Set.prototype.values()` since `Set` only has values. It exists for parity with `Map`
- `Set.prototype.entries()` returns an iterator over `[key, value]` pairs of the set where `key` and `value` are the same values. It too exists for parity with `Map`

The _default iterator_ for `Set` is `Set.prototype.values()` so you can easily iterate over a `Set` object with `for-of` or `Set.prototype.forEach()`:

```js
for (let allStar in allStars) {
    console.log(allStar.name);
}

allStars.forEach((value, key, setRef) => {
    console.log(value.name);

    // In a set the value & key are the same
    console.log(value === key);

    // The third parameter is a reference to the
    // instance
    console.log(setRef === allStars);
});
```

It also means that you can easily clone a `Set` object since the constructor accepts an iterable:

```js
let allStarsClone = new Set(allStars);
```

Lastly, you can combine `Set`'s de-duping nature with the spread operator to create a de-dupe array helper:

```js
function dedupe(array) {
    return [...new Set(array)];
}

let noDupesArray = dedupe([1, 2, 1, 4, 7, 3, 1]);

// output: [1, 2, 4, 7, 3]
console.log(noDupesArray);
```

### Set operations

Common non-mutating operations performed on sets are `union`, `intersection`, and `difference`. They're _non-mutating_ because they don't change the underlying set but return a new object containing the items. Unfortunately, the `Set` object in ECMAScript 6 does not have any of those methods. However, with some other ES6 functionality we can implement them ourselves.

#### Union implementation

Union (`a ∪ b` in set notation) is a new `Set` object that contains both the elements of set `a` and set `b`. This is pretty straightforward to implement in ES6. Using the spread operator, we can create an array which is the concatenation of both sets and then create a new `Set` object from that (which will also de-dupe):

```js
function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

let setUnion = union(
    new Set(['a', 'b', 'c', 'd']),
    new Set(['d', 'e', 'f', 'g'])
);

// output: 8
console.log(setUnion.size);
```

#### Intersection implementation

Intersection (`a ∩ b` in set notation) is a new `Set` object that contains the elements that exist in both set `a` and set `b`. The implementation is a bit more involved, but not too bad. Essentially, we need to include the elements of `a` in the new set if they exist in `b`:

```js
function intersection(setA, setB) {
    return new Set([...setA].filter(item => setB.has(item)));
}

let setIntersection = intersection(
    new Set(['a', 'b', 'c', 'd']),
    new Set(['d', 'e', 'f', 'g'])
);

// output: 1
console.log(setIntersection.size);
```

So what we do is first convert `setA` into an array (using the spread operator) so we can leverage `Array.prototype.filter()`. Then once we've filtered out all the items in `setB` that aren't in `setA` we have have an array of the intersection, which we convert into a `Set` object.

#### Difference implementation

Difference (`a \ b`) is a new `Set` object that contains the elements in `a` that are not in `b`. Its implementation is similar to `intersection` except we want the ones in `a` that are **not** in `b`:

```js
function difference(setA, setB) {
    return new Set([...setA].filter(item => !setB.has(item)));
}

let setDifference = difference(
    new Set(['a', 'b', 'c', 'd']),
    new Set(['d', 'e', 'f', 'g'])
);

// output: 3
console.log(setDifference.size);
```

## `WeakSet`

A `WeakSet` is basically the combination of a `Set` and a `WeakMap`. Just like a `Set` it only contains unique values. And just like a `WeakMap` its not iterable, the values **must** be objects, and those values are available for garbage collection.

The use case for a `WeakSet` is similar to that of a `WeakMap`, except the data you wanted to store in the object is a simple boolean. Essentially the presence of the object in the set is all the information you need.

Let's take our `WeakMap` example from before, but instead of keeping track of how many times a `<p>` tag had been clicked, we just want to know that it had been clicked:

```js
// set up set of clicked nodes
let clickedNodes = new WeakSet();

// on each click, add the p to the set
$('p').click(function() {
    let pNode = this;

    clickedNodes.add(pNode);
});
```

And because the `WeakSet` holds onto its references _weakly_, if a DOM node is removed from the DOM or otherwise has no other references to it, it'll also be removed from the `WeakSet` object.

## Inheriting from collections

So let's wrap up our discussion and talk about creating derived classes from these new collection objects. We learned in the article on [classes](/learning-es6-classes/#inheritable-built-ins) that native classes can now be derived in ES6.

We may want to derive from `Map` to add the following functionality:

- `Map.prototype.get(key, defaultValue)` to retrieve a default value if the value for the specified key didn't exist (or was `undefined`)
- `Map.prototype.filter(testFunc)` so that we don't have to convert into an intermediary array to create a new filtered `Map`
- `Map.prototype.map(mapFunc)` so that we don't have to convert into an intermediary array to create a new `Map` with mapped values
- `Map.prototype.clone(iterable)` as an alternative to passing a `Map` object to the `Map` constructor
- `Map.convert(vanillaObj)` to go from an ES5-style map to an ES6 `Map`

We may want to derive from `Set` to add the following functionality:

- `Set.prototype.addAll(iterable)` to add a list of items to the set in one call instead of having to iterate over a list and call `Set.prototype.add()` on each iteration
- `Set.prototype.hasAll(iterable)` to check to see if every item in the list is in the set
- `Set.prototype.deleteAll(iterable)` to delete every item in the list from the set
- `Set.prototype.some(testFunc)` to return `true` if `testFunc` returns `true` for one of the items in the set
- `Set.prototype.every(testFunc)` to return `true` if `testFunc` returns `true` for all of the items in the set
- `Set.prototype.union(otherSet)` to union the set with another set
- `Set.prototype.intersection(otherSet)` to intersect the set with another set
- `Set.prototype.difference(otherSet)` to get the difference between the set and another set

## JavaScript engine support

Because these 4 new collections aren't new syntax, but new APIs, polyfills are needed to provide functionality for `Map`, `Set`, `WeakMap` & `WeakSet`. Babel & TypeScript partner with the [`core-js`](https://github.com/zloirock/core-js) library to provide the polyfills for the 4 collections. Traceur itself has polyfills for `Map` & `Set` but not for `WeakMap` or `WeakSet`.

All of the modern browsers and servers support all 4 collections, so this is the rare case where there is _more_ functionality in the browsers than in the transpiler.

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#new-collections) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser. You can also get some practice with ES6 collections using [ES6 Katas](http://es6katas.org/).

There is also lots of great reading to deep dive into these ES6 collections:

- [Maps and Sets](http://exploringjs.com/es6/ch_maps-sets.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [ES6 Maps in Depth](http://ponyfoo.com/articles/es6-maps-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)
- [ES6 WeakMaps, Sets, and WeakSets in Depth](http://ponyfoo.com/articles/es6-weakmaps-sets-and-weaksets-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)

## Coming up next....

After much build up, we're finally going to talk about iterators and iterables. By now you should have a pretty high-level understanding of how they work, but we'll deep dive into them so we can have a full understanding. They'll also provide a nice groundwork for generators to follow afterwards. Until then...
