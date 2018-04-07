---
title: Parameter handling
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, default-parameters, rest-parameters, rest-operator, spread-operator]
cover: spread-butter.jpg
---

![Spreading button on a piece of toast](spread-butter.jpg)

This article is all about the new features added to JavaScript via ECMAScript 6 to improve the handling of function parameters. More specifically we'll be talking about default parameters, rest parameters using the rest operator, the spread operator, and finally destructured parameter values. We'll also be using features previously covered in our discussion about [arrow functions](/learning-es6-arrow-functions/), [block-level scoping](/learning-es6-block-level-scoping-let-const/) and [destructuring](/learning-es6-destructuring/), so if you're unfamiliar with those topics you may want to read up on them first.

## TL;DR

ES6 allows for function headers to define default values for parameters, marking them as optional:

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
function volume(width, length, height) {
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

These quick examples are just a tip of the iceberg.  Be sure to check out the full suite of [parameter handling code examples](/learning-es6/#parameter-handling) (a part of the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6)) and keep reading.

## Default parameters

JavaScript allows for functions to be called with less parameters than the function declares. In ES5, this ability was leveraged to implicitly support optional parameters. Here's an ES5 version of the ES6 example used above:

```js

function getData(data, useCache) {
	if (useCache === undefined)
		useCache = true;

	if (useCache) {
		console.log('using cache for', data);
	}
	else {
		console.log('not using cache', data);
	}
}

getData({q:'churches+in+Pittsburg'});
```

As you can see, `useCache` is declared as a parameter of the `getData` function, but the caller didn't pass a value for it. As a result the JavaScript engine passes `undefined`, which the `getData` checks for in order to default the value to `true`.

Once again the ES6 equivalent looks like:

```js
function getData(data, useCache=true) {
	if (useCache) {
		console.log('using cache for', data);
	}
	else {
		console.log('not using cache', data);
	}
};

// `useCache` is missing and is `undefined`.
// therefore `useCache `defaults to `true`
getData({q:'churches+in+Pittsburg'});
```

With ES6, the function body doesn't have to deal with the defaulting logic. It's in the function header, which is where it should be. Also it's clear to any readers of the code that `useCache`will have its value defaulted to `true` when left unspecified.

Parameters with a default value are considered optional. Therefore if you have a parameter that is optional, but doesn't have a default value, you may want to consider giving it an explicit default of `undefined` to visually mark it as optional.

### Required parameters

In the example, the `data` parameter is considered required since it does not have a default value. However, the JS engine will not throw an error if you leave a required parameter unspecified because of backwards compatibility support. In ES5 to enforce required parameters, you would look at the length of `arguments` or check if the parameter was `undefined` and throw an `Error`.

There are a few ways you can implement required parameters in ES6 yourself, but all of them add visual clutter. The best (and most clever) approach comes from [Axel Rauschmayer](http://www.2ality.com/2014/04/required-parameters-es6.html) (via [Allen Wirfs-Brock](https://twitter.com/awbjs)):

```js
/**
 * Gets called if a parameter is missing and the expression
 * specifying the default value is evaluated.
 */
function throwIfMissing() {
    throw new Error('Missing parameter');
}
function func(requiredParam = throwIfMissing()) {
    // some implementation
}
```

If `requiredParam` is unspecified or `undefined`, an `Error` will be thrown, which is exactly what we want. It's just a little weird to have a function as your default value which doesn't return a value, but only throws an `Error`. Speaking of function calls as default values...

### Non-primitive default values

Unlike other programming languages that support default values (like C#), a default value in ES6 does not have to be a primitive value like `String`, `Number` or `Boolean`. A default value can be an `Object`, `Array` or `Function`. The default value can even be the result of an expression or function call.

```js
function getWidth() {
	console.log('getWidth called');
	return 7;
}
function drawRect(
	width=getWidth(),
	height=width * 2,
	options={color:'red'}
) {
	console.log(width, height, options);
}

// `getWidth` is called to retrieve default
// value for `width` since it was unspecified.
// output:
//   getWidth called
//   7, 14, {color:'red'}
drawRect();

// `getWidth` is not called because `width` is
// specified. `height` is still defaulted to
// 2x `width`.
// output:
//    17, 34, {color:'red'}
drawRect(17);

// `height` is no longer defaulted to 2x `width`
// but options are still defaulted.
// ouput:
//    4, 11, {color:'red'}
drawRect(4, 11);

// nothing is defaulted
// output:
//    7,5, 11, {color:'blue'}
drawRect(7.5, 11, {color:'blue'});
```

Pretty cool, huh? And did you notice how the default value for `height` is an expression that uses the value of `width`? You're free to use other variables declared in the function header as long as they come _before_ the variable in question. It's also worth noting that expressions or functions are not executed if the variable does not need to be defaulted.

### Default parameter ordering

Also unlike other programming languages, in ES6 the default values can be anywhere in the function header, even before parameters that do not have default values.

Let's take a look at an example:

```js
function drawCube(x, y=7, z) {
	console.log('cube', x, y, z);
};

// `y` is defaulted, but `x` & `z` are not
// so they are `undefined`.
// output: cube, undefined, y, undefined
drawCube();

// `y` is still defaulted, but `z` isn't.
// output: cube, 2.5, 7, undefined
drawCube(2.5);

// output: cube, 9, 15, undefined
drawCube(9, 15);

// output: cube, 4, 1.7, 18
drawCube(4, 1.7, 18);

// `y` is once again defaulted
// output: cube, 11, 7, 8.8
drawCube(11, undefined, 8.8);

// `null` does not trigger `y` to default
// output: cube, 14, null, 72
drawCube(14, null, 72);
```

As you can see, the default for `y`  isn't triggered unless `y` and `z` are unspecified or `y` is explicitly set to be `undefined`. In a nutshell, `undefined` triggers default values.

It may not be immediately clear why TC39 chose to have `undefined` trigger default values. The reasoning can best be explained with a couple of examples.

First take a look at this example from Rick Waldron’s [TC39 meeting notes](https://github.com/rwaldron/tc39-notes/blob/master/es6/2012-07/july-24.md#413-destructuring-issues) (July 24, 2012):

```js
function setLevel(newLevel = 0) {
    light.intensity = newLevel;
}
function setOptions(options) {
    // Missing properties in `options` will
    // result in `undefined` being passed to
    // `setLevel` which will trigger default value
    setLevel(options.dimmerLevel);

    // more code here...
}
setOptions({speed:5});
```

We don't have to generate a default value for `options.dimmerLevel` within `setOptions`. Instead because `undefined` triggers default values and missing properties on objects are `undefined`, we can _delegate_ the value defaulting to `setLevel`.

Another example taken from [Axel Rauschmayer](https://twitter.com/rauschma)'s book [_Exploring ES6_](http://exploringjs.com/es6/ch_parameter-handling.html):

```js
function multiply(x=1, y=1) {
    return x * y;
}
function square(x) {
    return multiply(x, x);
}

// `x` will be `undefined` and defaulted
// for `x` and `y` in `multiply`
square();
```

The `square` function doesn't have to worry about defaulting `x` and can delegate that task to `multiply`. Because `x` is left unspecified in the call to `square`, its value is `undefined`. And since `undefined` is passed to `multiply` for `x` and `y`, their values are defaulted.

### Default parameters and arrow functions

Last thing on default parameters. They also can also be used with arrow functions!

```js
// 2nd parameter is `undefined`, triggers
// default of 100.
// output: 2, 200, 10
console.log(
	[1, undefined, 5].map(
		(x=100) => x * 2
	)
);
```

If you recall in the article on [arrow functions](/learning-es6-arrow-functions/), we learned that when arrow function just has one parameter that's an identifier we can omit the parentheses around it. However, that rule only applies when that parameter is _only_ an identifier. If it has a default value, as in our example above, parenthesis are needed.

## Rest parameters

We just learned that [default parameters](#default-parameters) handle the case where a caller passes _less_ parameters than what a function declares. JavaScript also allows for functions to be called with _more_ parameters than the function declares. That's where rest parameters come in.

A common use-case where a function will have less parameters declared is when the function can take an arbitrary number of parameters. Let's say we wanted to write a `join` function similar to the `join` method for `Array` except we want to specify individual parameters instead of an array.

With ES5 we would implement like so:

```js
function join(separator) {
	var values = [];

	for (var argNo = 1; argNo < arguments.length; argNo++) {
		values.push(arguments[argNo]);
	}

	return values.join(separator);
};

// output: "one++two++three"
console.log(join('++', 'one', 'two', 'three'));
```

The `arguments` special variable is problematic for many reasons; one being that it's not an actual `Array` object, so methods like `slice` are unavailable to use. Also because we have the `separator` parameter, we have to start at index `1` of `arguments`, which is pretty annoying.  Lastly, just looking at our `join` function, it's not immediately discoverable that it actually takes more than one parameter, let alone that it supports an infinite number of them.

ES6 introduces the rest operator, three dots (...) that precede a named parameter. That parameter is now a _rest parameter_ that is an `Array` containing the rest of the parameters (hence the name!).

Here's `join` rewritten using ES6 rest parameters:

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

In the example, `values` is an `Array` of all of the parameters passed after `'//'` making it much easier to use. Also, it's much clearer looking at the `join` function that it does take an additional unlimited set of parameters.

### One rest parameter per function

One caveat with rest parameters is that unlike default parameters there can only be one per function and it must be the last parameter declared in the function header. Attempting to have multiple rest parameters or putting one before other parameters will throw a `SyntaxError`:

```js
function afterRest(first, ...second, third) {
	// SyntaxError: parameter after rest parameter
}
function multipleRest(first, ...second, ...third) {
	// SyntaxError: parameter after rest parameter
}
```

If you're using a transpiler, you will get an error when trying to transpile your ES6 code down to ES5.

### Enforcing maximum arity

ES6 unfortunately doesn't provide a mechanism for enforcing a maximum arity (number of passed parameters) of a function. However, you can leverage rest parameters to hack around the lack of support.

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

This may be the one (and only) case where using `arguments` may be preferable over a rest parameter. In pretty much every other case, rest parameters should replace uses of `arguments`.

## Spread operator

While [rest parameters](#rest-parameters) use the rest operator to combine zero or more parameters into a single array parameter, the spread operator does just the opposite. It separates an array into zero or more parameters.

But before we get into how the spread operator works, lets first take a look at the ES5 code it is intending to replace.

```js
function merge() {
	var masterObj = {};

	// iterate over `arguments` merging each
	// into `masterObj` to generate flattened
	// object
	for (var i = 0; i < arguments.length; i++) {
		var obj = arguments[i];;
		for (var key in obj)
			masterObj[key] = obj[key];
	}

	return masterObj;
}

let merged = merge(
	{
		count: 5,
		delay: 2000,
		early: true,
		message: 'Hello'
	},
	{
		early: false
	}
);

// output:
// {count:5, delay:2000, early:false, message:'Hello'}
console.log(merged);
```

The `merge` function is designed to take an arbitrary number of objects and flatten them into one object. Calling `merge` is easy when you have individual objects, but what happens when you want to flatten array of objects? You have to use `apply`:

```js
var objectsList = [
	{
		count: 5,
		delay: 2000,
		early: true,
		message: 'Hello'
	},
	{
		early: false
	}
];
var merged = merge.apply(undefined, objectsList);

// output:
// {count:5, delay:2000, early:false, message:'Hello'}
console.log(merged);
```

This works okay. For those of us JavaScript ninjas this sort of thing is old hat. But the code is a bit weird, especially the fact that we have to pass `undefined` as the first (context) parameter. And then there's always the confusion between `apply` and `call`. The former takes an array, while the latter takes an unbounded list of parameters.

Now instead of `apply`, we can use the spread operator (along with a rest parameter!):

```js
function merge(...objects) {
	let masterObj = {};

	// iterate over `objects` merging each
	// into `masterObj` to generate flattened
	// object
	for (let i = 0; i < objects.length; i++) {
		let obj = objects[i];;
		for (let key in obj)
			masterObj[key] = obj[key];
	}

	return masterObj;
}

let merged = merge(...objectsList);

// output:
// {count:5, delay:2000, early:false, message:'Hello'}
console.log(merged);
```

The spread operator looks exactly like the rest operator. It as the same three dots (...). The only difference is that it is used in function calls and array literals instead of function parameter declarations. The spread operator should be able to replace the majority, if not all, uses of `apply`.

At first, using the spread operator may not seem like much of an improvement over `apply`, besides no longer having to specify `undefined`. However, the spread operator can be used anywhere in a function call and may be used more than once as well. Take a look at this example:

```js
let merged = merge(
	{count: 10},
	...objectsList,
	{delay: 1500}
);

// output:
// {count:5, delay:1500, early:false, message:'Hello'}
console.log(merged);
```

Now we're specifying individual objects as well as the array. If we were going to still try to use `apply` we would first have to build a new array including the individual objects. Spread operator to the rescue!

### Spread operator and arrays

The spread operator doesn't only work with function calls. It can also be used to simplify array manipulation.

For example we can turn this in ES5:

```js
// ES5
var list = [9, 8, 7, 6, 5],
	first = list[0],
	second = list[1],
	rest = list.slice(2);

// output: [7, 6, 5], 8, 9
console.log(rest, second, first);
```

To this in ES6 using the spread operator with array destructuring:

```js
// ES6
let list = [9, 8, 7, 6, 5],
	[first, second, ...rest] = list;

// output: [7, 6, 5], 8, 9
console.log(rest, second, first);
```

We can replace the `slice` call as well as the individual array indexing into a simple destructure pattern.

But wait, there's more!

```js
// ES5
[11, 10].concat(list);

// ES6
[11, 10, ...list];

// [11, 10, 9, 8, 7, 6, 5]
```

The spread operator replaces the need to call `concat`. The spread operator splits each of the values in `list` into individual parameters in the array literal constructor. As a result, `list` is added onto `[11, 10]`.

## Destructured parameters

We've already learned all about [destructuring](/learning-es6-destructuring/), but in that article we didn't talk about destructuring function parameters because it uses some of the parameter handling features we've just learned.

Let's pretend we needed to implement an `ajax` method that takes the URL endpoint as well as a bucket of configuration options. In ES5, this would look something like:

```js
// ES5
function ajax(url, options) {
	var method = options.method,
		delay = options.delay,
		callback = options.callback;

	console.log(url, method, delay);
	setTimeout(
		function() { callback('DONE!'); },
		delay
	);
}

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

As you can see, we are trying to get values out of the `options` object to use in our `ajax` method. In just looking at the method, it's not immediately clear what properties can be in `options`. Documentation would be needed. The reason the `options` object is used instead of individual parameters is to not explode the arity of the function and because some of the properties of `options` could be optional. It's also how named parameters are accomplished in ES5.

In ES6, there is still no official approach to named parameters, but we can get a bit closer using object destructuring of function parameters:

```js
// ES6
function ajax(url, {method, delay, callback}) {
	// `method`, `delay` & `callback` are
	// destructured variables

	console.log(url, method, delay);
	setTimeout(
		() => callback('DONE!'),
		delay
	);
}

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

No more need to declare and assign the individual `method`, `delay` and `callback` variables.

What if we want to support `options` being optional? Well in ES5 the implementation would have to start with:

```js
// ES5
function ajax(url, options) {
	// default `options` to empty object
	// so var declarations don't throw error
	// if `options` is `undefined`
	options = options || {};

	// var declarations and
	// rest of the function...
}
```

Well guess what? We can use [default parameters](#default-parameters) to simply default `options` to the empty object in ES6:

```js
// ES6
function ajax(url, {method, delay, callback}={}) {
	// default {} is used to allow
	// object to be unspecified w/o
	// causing an error

	// rest of the function
}
```

See what we did there? We combined default values with parameter destructuring. If `options` is left unspecified or `undefined`, it'll trigger the default value of `{}` which then gets destructured into `method`, `delay` and `callback`. If we didn't provide a default value and didn't specify `options` in the call to `ajax`, we would get an error because we're trying to destructure `undefined`. It's good practice to specify a default value for object destructured parameters.

Ok, what if we wanted to have default values for `method` and `delay`? They are within `options`. In ES5, we'd do something like:

```js
// ES5
function ajax(url, options) {
	options = options || {};

	// default the values of `method` and
	// `delay`
	var method = options.method || 'GET',
		delay = options.delay || 1000,
		callback = options.callback;

	// rest of the function...
}
```

In ES6, we can use default values _within_ our object destructure pattern to accomplish the property defaulting:

```js
// ES6
function ajax(url, {method='GET', delay=1000, callback} = {}) {
	// default values w/in destructure pattern

	// rest of the function
}
```

Nested default values! Cool, huh? That's the power of ES6.

## JavaScript engine support

Good news! According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/), all the major JavaScript engines (browsers, servers & transpilers) support some or all of the parameter handling features.

 - Traceur (basically all)
 - Babel (basically all)
 - Edge (rest parameters & spread operator only)
 - Firefox (all except default handling w/ destructured parameters)
 - Chrome/Opera (rest parameters & spread operator only)
 - Safari (spread operator & destructured parameters only)
 - Node 4 (rest parameters & spread operator only)

If it wasn't apparent from the previous articles that [transpilation](/learning-es6-using-es6-right-now/) is the only viable solution for production-ready code, it should be obvious now. There is just too much variance in native support among the JS engines, so we can only rely on the transpilers.

## Additional Resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#parameter-handling) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser for those that support all of the parameter handling features. Unfortunately, there isn't a browser that supports all of the features, so you will need to use the examples running through Babel and Traceur transpilation.

You can also practice everything you've learned on [ES6 Katas](http://es6katas.org/). It uses a TDD (test-driven development) approach for you to implement ES6 features such that all of the tests pass. I highly recommend it!

Finally, if this information wasn't enough, there is even more you can read concerning parameter handling in ES6:

 - [Parameter Handling](http://exploringjs.com/es6/ch_parameter-handling.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Functions](https://leanpub.com/understandinges6/read#leanpub-auto-functions) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
 - [ES6 Spread and Butter in Depth](http://ponyfoo.com/articles/es6-spread-and-butter-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)

## Coming up next...

Phew! The parameter handling features are pretty simple, but there's just so much you can do with them, that it takes some time to explain. Up next we'll take a look at [enhancements to object literals](/learning-es6-enhanced-object-literals/) as the [_Learning ES6_ series](/learning-es6-series/) rolls on. Until then...
