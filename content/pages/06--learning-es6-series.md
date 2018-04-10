---
title: The Learning ES6 Series
menuTitle: Learning ES6
---

ECMAScript 6 is the new version of JavaScript making its way into the interpreters of our modern browsers and servers. I am in the process of learning all that I can about ES6 and then sharing what I've learned with a wider audience. I'm calling it the _Learning ES6_ series. This article is here to serve as a continually updated aggregator of what I have already written about as well as a teaser of what is yet to come. Enjoy!

## Code examples

Each article will come with of set of [ES6 code examples](/learning-es6/) that can be run in the browser. The code examples will use both Babel & Traceur transpilation as well as native execution. All of the source code for the code examples can be found in the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6).

## Existing Articles


----------


### [History of ECMAScript](/learning-es6-history-of-ecmascript/)

JavaScript was created in May 1995 by [Brendan Eich](https://twitter.com/brendaneich) while at Netscape, reportedly in only *10 days*. It was originally named *Mocha*, a name chosen by Netscape founder [Marc Andreessen](https://twitter.com/pmarca), but was renamed four months later to *LiveScript*. At that time, Sun Microsystems owned the trademark for *JavaScript*. Netscape acquired a trademark license and renamed LiveScript to *JavaScript* in December 1995. It was somewhat of a marketing maneuver since Java was really popular at the time. The languages are not related at all.

Some time between 1996 and 1997, Netscape took JavaScript to the [Ecma standards organization](http://www.ecma-international.org/) to carve out and maintain a specification for the language to enable other browser vendors to implement based on the work they had done. The [Ecma Technical Committee 39](http://www.ecma-international.org/memento/TC39.htm) (better known as TC39) was created to continue to evolve the language, eventually releasing *ECMA-262 Ed.1* in June 1997. *ECMAScript* is name of the official standard with *JavaScript* being the most well-known implementation of the standard. *ActionScript* (Macromedia) and *JScript* (Microsoft) are examples of other implementations.

[Read the full article...](/learning-es6-history-of-ecmascript/)


----------


### [Goals & Features of ECMAScript 6](/learning-es6-goals-features-ecmascript-6/)

The main goal for the [ES6 / Harmony project](http://wiki.ecmascript.org/doku.php?id=harmony:harmony) was to fix some of JavaScript’s gotchas and add a whole bunch of functionality that we find in other popular programming languages that have been long missing in JavaScript. At the same time, the TC39 wanted keep the language relatively lightweight and maintain backwards compatibility in order to not break all of the existing code on the web.

They also wanted to make JavaScript a better language for writing code. They realized that applications written in JavaScript have become quite large over the years and wanted JavaScript to be better for writing these complex apps. So they added native modules to ES6. Modules also helped the committee make the shared JavaScript libraries used by all those complex applications easier to write as well.

[Read the full article...](/learning-es6-goals-features-ecmascript-6/)

----------

### [Using ES6 right now](/learning-es6-using-es6-right-now/)

Support for ES6 functionality in JS engines is growing every week and kept up to date by [Kangax’s ES6 compatibility matrix](http://kangax.github.io/compat-table/es6/). However:

- ES6 support is still fairly low across browsers & servers (max is less than 70%)
- The features that are supported differ between browsers (with some overlap)
- None of the IE browsers significantly support ES6 (the new Microsoft Edge browser does)

As a result, you cannot yet reliable run ES6 natively client- or server-side. Your best bet is compiling your ES6 code down to ES5 using transpilation tools like [Babel](https://babeljs.io/), [Traceur](https://github.com/google/traceur-compiler) or [TypeScript](http://www.typescriptlang.org/) as part of your build process.

[Read the full article...](/learning-es6-using-es6-right-now/)

----------

### [Arrow functions](/learning-es6-arrow-functions/)

Arrow functions are more or less a shorthand form of anonymous function expressions that already exist in JavaScript. In ES6 this looks like:

```js
var squares = [1, 2, 3].map(x => x * x);
```

Is equivalent to this in ES5:

```js
var squares = [1, 2, 3].map(function (x) {
	return x * x;
});
```

As you can see a lot of the verbosity of old-style function expressions is removed and what’s left is the fat arrow (`=>`) joining the two main ingredients of the function: the arguments and function body.

You’ll find the greatest utility in arrow functions in places where functions take a callback function, like event handlers (such as `onClick`, `$.ajax`, etc.) and array processors (such as `map`, `sort`, etc.)

[Read the full article...](/learning-es6-arrow-functions/)

----------

### [Block-level scoping with `let` and `const`](/learning-es6-block-level-scoping-let-const/)

`let` is the new `var`. ES6 provides two new ways for declaring variables: `let` and `const`. These pretty much replace the ES3 or ES5 way of declaring variables using `var`. By using block-level scoping, these two keywords help developers avoid common mistakes they make not because they write bad code, but because they don’t fully understand the idiosyncrasies of how JavaScript handles variables.

Let’s take a look at an example:

```js
function simpleExample(value) {
	const constValue = value;

	if (value) {
		var varValue = value;
		let letValue = value;

		console.log('inside block', varValue, letValue);
	}

	console.log('outside block');

	// varValue is available even though it was defined
	// in if-block because it was "hoisted" to function scope
	console.log(varValue);

	try {
		// letValue is a ReferenceError because it
		// was defined w/in if-block
		console.log(letValue);
	}
	catch (e) {
		// e is a ReferenceError
		console.log('letValue not accessible', e);
	}

	// SyntaxError to try and update a variable
	// declared via const
	//constValue += 1;
}

simpleExample(2);
```

Variables declared via `let` are not available outside of the block in which they are declared. Variables declared via `const` also cannot be updated. You can find more examples in the [block-level scoping code examples](/learning-es6/#block-scoping) for the [*Learning ES6* Github repo](https://github.com/benmvp/learning-es6).

[Read the full article...](/learning-es6-block-level-scoping-let-const/)


----------


### [Destructuring](/learning-es6-destructuring/)

Destructuring makes it easier to work with objects and arrays in JavaScript. Using a pattern syntax similar to object and array literals, we can poke into data structures and pick out the information we want into variables. This is best explained with examples:

```js
// object pattern matching
let {lName, fName} = {fName: 'John', age: 15, lName: 'Doe'};

// array pattern matching
let [first, second, third] = [8, 4, 100, -5, 20];

// output: Doe, John
console.log(lName + ', '+ fName);

// output: 100, 4, 8
console.log(third, second, first);
```

As you can see, we can store properties of an object or elements of an array using pattern matching. You can find many more examples in the [destructuring code examples](/learning-es6/#destructuring) which are part of the [*Learning ES6* Github repo](https://github.com/benmvp/learning-es6).


[Read the full article...](/learning-es6-destructuring/)


----------


### [Parameter handling](/learning-es6-parameter-handling/)

ES6  allows for function headers to define default values for parameters, marking them as optional:

```js
function getData(data, useCache=true) {
	if (useCache) {
		console.log('using cache for', data);
	}
	else {
		console.log('not using cache', data);
	}
}

// `useCache` is missing and is `undefined`.
// therefore `useCache `defaults to `true`
getData({q:'churches+in+Pittsburg'});
```

Rest parameters should complete replace the need for the problematic `arguments` special variable:

```js
function join(separator, ...values) {
	return values.join(separator);
}

// all of the parameters after the first
// are gathered together into `values`
// which is a true `Array`
// output: "one//two//three"
console.log(join('//', 'one', 'two', 'three'));
```

We should no longer need the `apply` function with the new spread operator:

```js
function video(width, length, height) {
	return width * length * height;
};

// the array values are separated into
// separate parameters
// output: 80 (2 * 8 * 5)
console.log(volume(...[2, 8, 5]));
```

Lastly, object destructuring with function parameters allows us to simulate named parameters:

```js
let ajax = function(url, {method, delay, callback}) {
	console.log(url, method, delay);
	setTimeout(
		() => callback('DONE!'),
		delay
	);
};

// the second parameter to the function
// is an object whose properties are
// destructured to individual variables
// simulating named parameters
ajax(
	'http://api.eventbrite.com/get',
	{
		delay: 2000,
		method: 'POST',
		callback: function(message) {
			console.log(message);
		}
	}
);
```

These quick examples are just a tip of the iceberg.  Be sure to check out the full suite of [parameter handling code examples](/learning-es6/#parameter-handling) (a part of the [*Learning ES6* Github repo](https://github.com/benmvp/learning-es6)) and keep reading.

[Read the full article...](/learning-es6-parameter-handling/)

----------


### [Enhanced object literals](/learning-es6-enhanced-object-literals/)

ECMAScript 6 makes declaring object literals even more succinct by providing shorthand syntax for initializing properties from variables and defining function methods. It also enables the ability to have computed property keys in an object literal definition.

```js
function getCar(make, model, value) {
	return {
		// with property value shorthand
		// syntax, you can omit the property
		// value if key matches variable
		// name
		make,  // same as make: make
		model, // same as model: model
		value, // same as value: value

		// computed values now work with
		// object literals
		['make' + make]: true,

		// Method definition shorthand syntax
		// omits `function` keyword & colon
		depreciate() {
			this.value -= 2500;
		}
	};
}

let car = getCar('Kia', 'Sorento', 40000);

// output: {
//     make: 'Kia',
//     model:'Sorento',
//     value: 40000,
//     depreciate: function()
// }
console.log(car);

car.depreciate();

// output: 37500
console.log(car.value);
```

The [enhanced object literals code examples](/learning-es6/#enhanced-object-literals) page has many more examples showing off each feature in more details. There are also some [ES6 katas](http://es6katas.org/) for testing your ES6 enhanced object literal knowledge.

Continue on for more details!

[Read the full article...](/learning-es6-enhanced-object-literals/)

----------

### [Template literals & tagged templates](/learning-es6-template-literals-tagged-templates/)

ES6 template literals are a brand new type of string literal, delimited by backticks (`` ` ``), that natively support string interpolation (token substitution) and multi-line strings. And because they use backticks as a delimiter, they can include single and double quotes without needing to escape them.

```js
let firstName = 'Ben',
	lastName = `Ilegbodu`;

// Basic template literal is surrounding by
// backticks so single/double quotes do need
// to be escaped
// output: He said, "It's your fault!"
console.log(`He said, "It's your fault!"`);

// Template literals support interpolation.
// The values within `firstName` and `lastName`
// are substituted into where the tokens are
// output: Name: Ilegbodu, Ben
console.log(`Name: ${lastName}, ${firstName}`);

// Template literals support multi-line strings
// output: This is
// 		multi-line text, so that
//		newline characters are
//
//
//		not needed. All whitespace
//			is respected, including tabs.
//
//
console.log(`This is
	multi-line text, so that
	newline characters are


	not needed. All whitespace
		is respected, including tabs.

`);
```

ES6 also supports tagged templates, which are created by prefixing a template literal with the name of a function (called the tag function). That functions receives an array of tokenized string literals plus the substitution values, enabling custom string interpolation or processing.

```js
function l10n(literals, ...substitutions) {
	// return interpolated string with
	// literals translated to native language
	// and localized to locale
}

let cost = 10.45,
	date = new Date('12/1/2016');

// translate and localize
// The function name (l10n) prefixes the
// template literal
// English: Your ticket for 12.1.2016 is $10.45.
// Spanish: Su billete para el 2016.12.1 es €10,45.
console.log(l10n`Your ticket for ${date} is {$cost}:c.`);
```

Intrigued by template literals? Confused about tagged templates? Feel free to check out the [template literal code examples](/learning-es6/#template-literals) page, which shows off the features in great detail. You can also try your hand at [ES6 katas](http://es6katas.org/) to practice your template literal skills.

But don't stop now. Keep on reading!

[Read the full article...](/learning-es6-template-literals-tagged-templates/)

----------

### [Promises](/learning-es6-promises/)

A promise represents the eventual result of an asynchronous operation. Instead of registering a callback in the call to an async function, the function returns a promise. The caller registers callbacks with the promise to receive either a promise's eventual value from the async operation or the reason why the promise cannot be fulfilled.

```js
// Creating a promise wrapper for setTimeout
function wait(delay = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, delay);
    });
}

// Using a promise
wait(3000)
    .then(() => {
        console.log('3 seconds have passed!');
        return wait(2000);
    })
    .then(() => {
    	console.log('5 seconds have passed!');
    	x++; // ReferenceError triggers `catch`
    })
    .catch(error => {
    	// output: ReferenceError
    	console.log(error);
    })
    .then(() => {
    	// simulate `finally` clause
    	console.log('clean up');
    });
```

Did you notice the use of [default parameters](/learning-es6-parameter-handling/) and [arrow functions](/learning-es6-arrow-functions/) too? If you're unfamiliar with those ES6 features, you should check out the articles detailing how they work. Interested in learning more about ES6 promises? Clone the [*Learning ES6* Github repo](https://github.com/benmvp/learning-es6) and take a look at the [promises code examples](/learning-es6/#promises) page showing off the features in greater detail.

Well you've come this far. You might as well keep going!

[Read the full article...](/learning-es6-promises/)

----------

### [`for-of` loop](/learning-es6-for-of-loop/)

The new `for-of` loop introduced with ES6 allows for iterating over an array (or any _iterable_) in a succinct fashion similar to how we can iterate over the keys of an object using `for-in`.

```js
let list = [8, 3, 11, 9, 6];

for (let value of list) {
  console.log(value);
}
```

For the most part, there's nothing really too earth-shattering here. We just now get the functionality that exists in other programming languages and has been sorely lacking in JavaScript.

But keep on readin' to learn the ins and outs!

[Read the full article...](/learning-es6-for-of-loop/)

----------

### [Classes](/learning-es6-classes/)

ECMAScript 6 provides syntactic sugar over the prototype-based, object-oriented pattern in JavaScript. ES6 classes provide support for constructors, instance and static methods, (prototype-based) inheritance, and super calls. Instance and static properties are not (yet) supported.

```js
// Define base Note class
class Note {
	constructor(id, content, owner) {
		if (new.target === Note) {
			throw new Error('Note cannot be directly constructed.')
		}

		this._id = id;
		this._content = content;
		this._owner = owner;
	}

	static add(...properties) {
		// `this` will be the class on which `add()` was called
		// increment counter
		++this._idCounter;

		let id = `note${this._idCounter}`;

		// construct a new instance of the note passing in the
		// arguments after the ID. This is so subclasses can
		// get all of the arguments needed
		let note = new this(id, ...properties);

		// add note to the lookup by ID
		this._noteLookup[id] = note;

		return note;
	}

	static get(id) {
		return this._noteLookup[id];
	}

	// read-only
	get id() { return this._id; }

	get content() { return this._content; }
	set content(value) { this._content = value; }

	get owner() { return this._owner; }
	set owner(value) { this._owner = value; }

	toString() {
		return `ID: ${this._id}
			Content: ${this._content}
			Owner: ${this._owner}`;
	}
}

// Static "private" properties (not yet supported in class syntax)
Note._idCounter = -1;
Note._noteLookup = {};

class ColorNote extends Note {
	constructor(id, content, owner, color='#ff0000') {
		// super constructor must be called first!
		super(id, content, owner);
		this._color = color;
	}

	get color() { return this._color; }
	set color(value) { this._color = value; }

	toString() {  // computed method names are supported
		// Override `toString()`, but call parent/super version
		// first
		return `${super.toString()}
			Color: ${this._color}`;
	}
}

// `add` factory method is defined on `Note`, but accessible
// on ColorNote subclass
var colorNote = ColorNote.add('My note', 'benmvp', '#0000ff');

// output: ID: note0
// Content: My Note
// Owner: benmvp
// Color: #0000ff
console.log(`${colorNote}`);

// output: true
console.log(Note.get('note0') === colorNote);
```

This is just a quick example of how ES6 classes work. Be sure to clone the [*Learning ES6* Github repo](https://github.com/benmvp/learning-es6) and take a look at the [classes code examples](/learning-es6/#classes) page showing off the features in greater detail.

The example also uses default parameters, rest parameters, and the spread operator so may want to revisit the [parameter handling](/learning-es6-parameter-handling/) article if you're not familiar. It also makes use of [template strings](/learning-es6-template-literals-tagged-templates/) for string interpolation, so you should read up on that as well.

[Read the full article...](/learning-es6-classes/)

----------

### [New Collections](/learning-es6-new-collections/)

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

[Read the full article...](/learning-es6-new-collections/)

----------

### [Iterators & Iterables](/learning-es6-iterators-iterables/)

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

[Read the full article...](/learning-es6-iterators-iterables/)


----------


### [Generators as iterators](/learning-es6-generators-as-iterators/)

A generator function is a special type of function that when invoked automatically generates a special iterator, called a _generator_. Generator functions are indicated by `function*` and make use of the `yield` operator to indicate the value to return for each successive call to `.next()` on the generator.

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

[Read the full article...](/learning-es6-generators-as-iterators/)

## Upcoming Articles

- **Modules** - provide a modular of organizing and loading JavaScript code
- **New APIs** - new APIs for existing native JavaScript classes `Math`, `Object`, `RegExp`, etc.
