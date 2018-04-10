---
title: 12 tricks for ES6 fun
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, tricks]
cover: tips-and-tricks.jpg
---

![ES6 tricks](tips-and-tricks.jpg)

I wrapped up the [_Learning ES6_ series](/learning-es6-series/) covering [Generators as Iterators](/learning-es6-generators-as-iterators/) at the beginning of the year. I had considered talking about generators as observers, symbols, and other more advanced uses of ES6, but ended up spending my time preparing for the [speaking engagements](/speak/) I had over the year. Sorry if you were waiting!

There's been a lot of chatter about how ES6 reduces our need for libraries like [underscore.js](http://underscorejs.org/) and [lodash](https://lodash.com/). I want to take a slightly different approach and showcase how ES6 features can be used in "unintended" ways to accomplish certain common-ish tasks. You can call these "ES6 tricks." I've actually already covered all of these "tricks" in their respective article topics, but I wanted to pull them out as a quick reference.

Without further ado...

#### 1. Quickly logging to the console

We can use [object literal shorthand](/learning-es6-enhanced-object-literals/#property-value-shorthand) to quickly log a variable with a label to the console:

```js

let myVar = 'foo';
let otherVar = 2;

// output:
// {myVar: "foo", otherVar: 2}
console.log({myVar, otherVar});
```

By using object literal shorthand, we create an object literal that is immediately written to the log. And since the keys match the variable name, the values have "labels". This comes in handy particularly when the variables are the same time (all strings, all numbers, etc) and we need to differentiate between them.

#### 2. Coercing to a string

We can quickly coerce a value to a string by wrapping it in a [template literal](/learning-es6-template-literals-tagged-templates/#simple-template-literal):

```js

let num = 2;
let numString = `${num}`;

// output:
// {num: 2, numString: "2"}
console.log({num, numString});
```

This replaces my previous favorite way of string coercion (concatenating an empty string):

```js

let num = 2;
let numString = num + '';

// output:
// {num: 2, numString: "2"}
console.log({num, numString});
```

#### 3. Swapping variables

We can quickly swap two variables without a temporary one using [array destructuring](/learning-es6-destructuring/):

```js

let a = 1;
let b = 2;

[b, a] = [a, b];
```

First we constructed an array using the array literal syntax with two elements: `a` and `b`. Then using array destructuring we assigned the first element of the newly created array into `b` and the second element into `a`. The result is that the variables' values have swapped.

#### 4. Simulating named parameters

We can simulate named parameters with [object destructuring](/learning-es6-destructuring/#object-destructuring) and [default values](/learning-es6-parameter-handling/#default-parameters) in a function header:

```js

const notify = (msg, {type='info', timeout, close=true} = {}) => {
  // display notification
}

notify('Hi!');
notify('Hi!', {type: 'error'});
notify('Hi!', {type: 'warn', close: false});
```

The entire object (the second parameter) is defaulted to `{}` when `undefined`/unspecified, and then the `type` and `close` properties are defaulted as well when `undefined`/unspecified. This provides a lot of flexibility in how the function can be called.

#### 5. Copying an array

We can quickly copy an array using the [spread operator](/learning-es6-parameter-handling/#spread-operator):

```js

const manipulateList = (list) => {
    // defensively copy list
    let copiedList = [...list];

    // do something with copiedList
};
```

#### 6. Concatenating arrays

We can quickly concatenate multiple arrays together using the [spread operator](/learning-es6-parameter-handling/#spread-operator):

```js

let start = ['do', 're', 'mi'];
let end = ['la', 'ti'];
let scaleFromLiteral = [...start, 'fa', 'so', ...end];

// output: ['do', 're', 'mi', 'fa', 'so', 'la', 'ti']
console.log(scaleFromLiteral);
```

#### 7. De-duping an array

We can combine [`Set`](/learning-es6-new-collections/#set)'s de-duping nature with the [spread operator](/learning-es6-parameter-handling/#spread-operator) to create a de-dupe array helper:

```js

function dedupe(array) {
    return [...new Set(array)];
}

let noDupesArray = dedupe([1, 2, 1, 4, 7, 3, 1]);

// output: [1, 2, 4, 7, 3]
console.log(noDupesArray);
```

Creating the `Set` from the `array` will result in duplicates removed, and the spread operator converts the `Set` back to an `Array`.

#### 8. Enforcing required parameters

We can use the fact that a [default value](/learning-es6-parameter-handling/#required-parameters) can be the result of a function call to enforce required parameters:

```js

// Gets called if a parameter is missing and the expression
// specifying the default value is evaluated.
const throwIfMissing = () => {
    throw new Error('Missing parameter');
}
const func = (requiredParam = throwIfMissing()) => {
    // some implementation
}
```

If `requiredParam` is unspecified or `undefined`, an `Error` will be thrown, which is exactly what we want.

#### 9. Enforcing maximum arity

ES6 unfortunately doesn't provide a mechanism for enforcing a maximum arity (number of passed parameters) of a function. However, you can leverage [rest parameters](/learning-es6-parameter-handling/#rest-parameters) to hack around the lack of support.

```js

function max(...values) {
	// only want as many a 3 parameters
	// so throw error if over
	if (values.length > 3)
		throw Error('max 3 parameters allowed!');

	// use destructuring to get values
	// into variables
	let [a, b, c] = values;

	return Math.max(a, b, c);
}

// not an error
// returns 3
max(1, 2, 3);

// error!
max(1, 2, 3, 4);
```

The problem with this approach is that the function actually wants to define `a`, `b` and `c` as its parameters, but because it needs to do arity validation, those variables are instead assigned in the function body using [destructuring](/learning-es6-destructuring/).

We could clean things up a little bit:

```js

function max(a, b, c, ...shouldBeEmpty) {
	if (shouldBeEmpty.length > 0)
		throw Error('max 3 parameters allowed!');

	return Math.max(a, b, c);
};

// not an error
// output 6
max(4, 5, 6);

// error!
max(4, 5, 6, 7);
```

This is a little better, but introduces a 4th parameter, `shouldBeEmpty`, that's not intended to be a part of the actual code, which could be confusing.

#### 10. Timing out fetch

We can easily provide timeout support to the new [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) by including it in a call to [`Promise.race`](/learning-es6-promises/#promise-race) with a promise-based timeout function:

```js

// Wrap `setTimeout` in a promise such that if
// the timeout completes, the promise is rejected
const timeout = (delay = 30000) => {
    return new Promise((resolve, reject) => {
        let rejectWithError = () => {
            reject(new Error('Timed out!'));
        };

        setTimeout(rejectWithError, delay);
    });
}

// Return a promise that will be fulfilled if
// the fetch is fulfilled before the timeout
// is rejected.
const fetchWithTimeout = (url, delay = 3000) => {
	// construct an array to pass to `Promise.race`
	return Promise.race([
		fetch(url),
		timeout(delay)
	]);
}

// Make an XHR request for the URL that has to
// return a response *before* the 1 s timeout
// happens
fetchWithTimeout('/json/data.json', 1000)
    .then(response => {
    	// successful response before the 1 s timeout
    	console.log('successful response', response)
    })
    .catch((e) => {
    	// Either the timeout occurred or some other error.
    	// Would need to check the method or use a custom
    	// `Error` subclass in `timeout`
    	console.error('request error', e);
    });
```

#### 11. Defining an abstract base class

An abstract base class is a type of class that is exclusively intended to be inherited. It cannot be directly constructed. The main use case is for the inherited classes to have a common interface. Unfortunately, [classes](/learning-es6-classes/) don't yet leverage the `abstract` keyword to make abstract base classes, but you _can_ use `new.target` introduced with classes to simulate it.

```js

class Note {
	constructor() {
		if (new.target === Note) {
			throw new Error('Note cannot be directly constructed.')
		}
	}
}
class ColorNote extends Note {

}
let note = new Note();			   // error!
let colorNote = new ColorNote();   // ok
```

#### 12. Defining lazy range function

We can use [generators](/learning-es6-generators-as-iterators/) to create a lazy range function:

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

## Wrapping up

That's it! There are many more clever ways in which we can leverage this newfound functionality with ES6. These were the dozen that jumped out to me most. If you have any additional "tricks" that you use, tweet me at [@benmvp](https://twitter.com/benmvp)! Thanks for reading!
