---
title: Arrow functions
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, arrow-functions, fat-arrow]
cover: sign-arrow-right.jpg
---

![right arrow sign](sign-arrow-right.jpg)

After looking at the [history of ECMAScript](/learning-es6-history-of-ecmascript/), the [goals of ECMAScript 6](/learning-es6-goals-features-ecmascript-6/) and [using ES6 right now](/learning-es6-using-es6-right-now/), the first actual feature we'll look at in our [_Learning ES6_](/learning-es6-series/) series is going to be arrow functions, which are also known as "fat arrow" functions.

## TL;DR

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

As you can see a lot of the verbosity of old-style function expressions is removed and what's left is the fat arrow (`=>`) joining the two main ingredients of the function: the arguments and function body.

You'll find the greatest utility in arrow functions in places where functions take a callback function, like event handlers (such as `onClick`, `$.ajax`, etc.) and array processors (such as `map`, `sort`, etc.)

Interested in learning about arrow functions in more detail? Well keep on reading then!

## Arrow Function Syntax

Arrow functions can have several combinations of syntaxes depending on the needs of the function.

When the arrow function has multiple arguments or no arguments at all, the syntax looks like:

```js
// two or more arguments
var sum = [9, 8, 7].reduce((memo, value) => memo + value, 0);

// no arguments
var getRandom = () => Math.random() * 100;
```

Notice the parentheses surrounding the arguments. However, when the arrow function has a single argument, the parenthesis can be removed:

```js
var valuesShallowCopy = ['foo', 'bar'].map(x => x);
```

The full form of an arrow function body supports multiple statements within a block:

```js
$("#deleteButton").click(event => {
	if (confirm("Are you sure?")) {
		clearAll();
	}
});
```

Notice the curly braces surrounding the statement body block. However, when the arrow function only has one statement, the curly braces defining the block can be omitted:

```js
var activeCompanies = companies.filter(company => company.active);
```

Omitting the curly braces also denotes a single expression which is implicitly returned. You do not need to include the `return` keyword. However, if you want to return an object, you must wrap that object in parenthesis otherwise it is interpreted as a code block:

```js
// BUG! BUG! BUG!
// will return an array of undefined values since the code block
// is empty and returns nothing
var myObjects = myArray.map(value => {});
console.log(myObjects);

// Correct!
// will return an array of empty objects
var myObjects = myArray.map(puppy => ( {} ) );
console.log(myObjects);

// BUG! BUG! BUG!
// will return an array of undefined values since the code block
// looks like it has a label of "foo" and an expression of "x" that is
// NOT returned.
console.log([4, 5, 1].map(x => {foo: x} ));

// Correct!
// will return an array of objects with "foo" as key and number
// as value
console.log([4, 5, 1].map(x => ( {foo: x} ) ));
```

You'll find that arrow functions come in most handy when used as a callback function. The various higher-order functional programming array methods that were introduced with ECMAScript 5 (like `map`, `forEach`, `reduce`, etc.) work well with arrow functions. Arrow functions can also be used as callback functions for event handlers, but typically in an OOP world those end up being (private) methods on your class so that they can be properly unit tested. Arrow functions are not meant for prototype- or class-based methods. We'll get into why in a bit.

## Immediately-invoked arrow functions (IIAFs)

If you recall immediately-invoked function expressions (IIFEs), they allow you to define a function expression and call it immediately in order shield the code from the rest of the program by scoping it within the function. Here's a simplified example:

```js
(function(message) {
	// print out each character of message
	for (var charNo = 0; charNo < message.length; charNo++) {
		console.log(message.charAt(charNo));
	}
}) ('hello');
```

The same can be done with arrow functions:

```js
( message => {
	// print out each character of message
	for (var charNo = 0; charNo < message.length; charNo++) {
		console.log(message.charAt(charNo));
	}
} ) ('hello');
```

The only thing to be cognizant of is the location of the parenthesis. They have to wrap the arrow function expression before the parenthesis that cause the invocation (before the `('hello')` part). With IIFEs, the parenthesis could also go around the whole IIFE including the function invocation.

## Lexical `this`

The best thing about arrow functions, aside from the terse syntax, is that `this` uses lexical scoping; its value is always "inherited" from the enclosing scope.

Let's look at a JavaScript coding problem with `this` that should help explain things:

```js
var car = {
	speed: 0,
	accelerate: function() {
		this.accelerator = setInterval(
			function() {
				// BUG! _this_ is not what we expect.
				// In non-strict mode, _this_ is the
				// global object. In strict mode _this_
				// is undefined. In neither case is _this_
				// the car object we want.
				this.speed++;
				console.log(this.speed);
			},
			100
		);
	},
	cruise: function() {
		clearInterval(this.accelerator);
		console.log('cruising at ' + this.speed + ' mph');
	}
};

car.accelerate();

setTimeout(function() { car.cruise(); }, 5000);
```

Every newbie JavaScript developer has run into this problem because they didn't know any better. Every experienced developer has accidentally run into this problem even though they knew better. In ES3 the approach to fix this problem was to store a reference to `this` in a variable called `self`, `that` or` m` so that it was available in the scope of the anonymous function:

```js
var car = {
	speed: 0,
	accelerate: function() {
		// store a reference to `this` in a variable that will be
		// be available for use within the anonymous function
		// callback
		var self = this;
		this.accelerator = setInterval(
			function() {
				self.speed++;
				console.log(self.speed);
			},
			100
		);
	},
	cruise: function() {
		clearInterval(this.accelerator);
		console.log('cruising at ' + this.speed + ' mph');
	}
};

car.accelerate();

setTimeout(function() { car.cruise(); }, 5000);
```

Alternatively, with ES5, we could create a new function using the `bind` method that would pass the desired `this` to the anonymous function:

```js
var car = {
	speed: 0,
	accelerate: function() {
		this.accelerator = setInterval(
			// bind returns a new "cloned" function
			// such that _this_ within the function
			// matches _this_ outside of it by passing it
			// as the argument.
			(function() {
				this.speed++;
				console.log(this.speed);
			}).bind(this),
			100
		);
	},
	cruise: function() {
		clearInterval(this.accelerator);
		console.log('cruising at ' + this.speed + ' mph');
	}
};

car.accelerate();

setTimeout(function() { car.cruise(); }, 5000);
```

With ES6, all of this nonsense is cleaned up nicely because arrow functions have implicit `this` binding:

```js
var car = {
	speed: 0,
	accelerate: function() {
		this.accelerator = setInterval(
			() => {
				// _this_ is the same as it is outside
				// of the arrow function!
				this.speed++;
				console.log(this.speed);
			},
			100
		);
	},
	cruise: function() {
		clearInterval(this.accelerator);
		console.log('cruising at ' + this.speed + ' mph');
	}
};

car.accelerate();

setTimeout(() => car.cruise(), 5000);
```

Now everyone's happy. It's worth noting that transpilers use the ES3 solution for transpiling the lexical `this`. The only difference is they use an auto-generated variable name (like `$__1`) instead of `self`, `that` or `m`. They do not use the ES5 bind method, making the transpiled code ES3 compatible. This means that the transpiled code will work in non-ES5 browsers such as IE8.

## Identifying arrow functions

Although arrow functions look dramatically different in their syntax and use lexical scoping for `this` (as well as other constructs), they are still identified as functions. For example, `typeof` and `instanceof` both say arrow functions are functions:

```js
console.log(typeof function() { });  // 'function'
console.log(typeof (() => {}));  // 'function'
console.log(function() { } instanceof Function);  // true
console.log((() => {}) instanceof Function);  // true
```

## Lexical arguments

Just like arrow functions do not define their own dynamic `this`, arrow functions also do not define their own dynamic `arguments` object either. For instance, you cannot have an arrow function that takes no parameters and then access the `arguments` object to gain access to those parameters like you can with formal functions.

Instead, the `arguments` object is "inherited" from the lexical scope of the containing function just like `this`. That arguments object is then available no matter where the arrow function is executed later on. Let's take a look at a contrived example:

```js
function genArrowReturningLexArgs() {
	// returns an arrow function expression
	// which itself returns the arguments used
	// when generating the arrow function
    return () => arguments;
}

var arrowFunction = genArrowReturningLexArgs(5, 'foo', [5,4,3]);

// log arguments object with
// 5, 'foo', and [5,4,3]
console.log(arrowFunction());
```

In order to gain access to the arguments of an arrow function, you either have to name all of the parameters you want access to or use other new ES6 function features like rest parameters. We'll discuss those in a future article.

## JavaScript is playing catch-up

JavaScript didn't invent function expressions or lambda functions. They were actually first introduced by [Lisp](https://en.wikipedia.org/wiki/Lisp_(programming_language)) way back in 1958. However, the explosion of highly-interactive, client-side programming in JavaScript with asynchronous event-handling function callbacks brought about a sort of lambda function renaissance. JavaScript and lambda functions became so popular that other long-standing programming languages started adopting lambda functions:

- **C#** - `a => a > 0`
- **Python** - `lambda a: a > 0`
- **Java** - `a -> a > 0`
- **JavaScript** - `function(a) { return a > 0; }`

As you can see, JavaScript ended up becoming the most verbose. ES6 arrow functions are now trimming the syntax fat.

## Summary of arrow function differences

While we learned that arrow functions are in fact identified as a functions, there are important differences between them and traditional functions. Let's summarize:

**Lexical `this` binding.** As we've covered, the value of `this` within an arrow function is determined by where the arrow function is defined and **not** by where it is used. This is lexical scoping.

**Can't touch `this`.** The value of `this` inside of the function cannot be changed; it remains the same value throughout the entire lifecycle of the function. Arrow functions throw an error when you try to change `this`.

**No arguments object.** You cannot access arguments through the arguments object, you must use regular named parameters or other ES6 features such as rest parameters.

**Not newable.** Arrow functions do not have an internal `[[Construct]]` method and therefore cannot be used as prototype constructors. Arrow functions throw an error when used with `new`.

## JavaScript engine support

According to the [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/), the following JavaScript engines support arrow functions:

- Babel
- Traceur
- TypeScript
- Chrome (with [experimental flag enabled](chrome://flags/#enable-javascript-harmony))
- Firefox
- Edge

The notable missing engines are Safari and Node.js. We of course know IE 11 and lower wouldn't support any of the ES6 features.

Additional Resources

You can check out the [_Learning ES6_ examples page](/learning-es6/#arrow-functions) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser (for those that support arrow functions). There are also examples running through Babel and Traceur transpilation.

Other super helpful resources:

- [Arrow Functions](http://exploringjs.com/es6/ch_arrow-functions.html#ch_arrow-functions) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Arrow Functions](https://leanpub.com/understandinges6/read#leanpub-auto-arrow-functions) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [Arrow functions](https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)


## Coming up next…

We will be continuing the [_Learning ES6_](/learning-es6-series/) series by looking at [block-level scoping](/learning-es6-block-level-scoping-let-const/) using the new `let` and `const` keywords. Until then...
