---
title: Block-level scoping with let and const
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, block-scoping, const, let]
cover: block-scope.png
---

![block scoping](block-scope.png)

Coming off the heels of discussing [arrow functions](/learning-es6-arrow-functions/), let’s continue the [_Learning ES6_](/learning-es6-series/) series talking about block-level scoping in ECMAScript 6.

## TL;DR

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

Variables declared via `let` are not available outside of the block in which they are declared. Variables declared via `const` also cannot be updated. You can find more examples in the [block-level scoping code examples](/learning-es6/#block-scoping) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6).

You just _know_ you’re interested, so keep on reading!

## A quick look at `var`

Before we jump into `let` and `const`, let’s remind ourselves about how `var` works. In the [History of ECMAScript](/learning-es6-history-of-ecmascript/), we learned that Brandon Eich supposedly created JavaScript in 10 days. I still find that hard to believe, but the way `var` declarations work in JavaScript may very well be the proof that it really was developed that quickly.

[Nicholas C. Zakas](https://twitter.com/slicknet) explains it best in his book [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/):

> Traditionally, one of the tricky parts of JavaScript has been the way that `var` declarations work. In most C-based languages [such as C++, Java or C#], variables are created at the spot where the declaration occurs. In JavaScript, however, this is not the case. Variables declared using `var` are hoisted to the top of the function (or global scope) regardless of where the actual declaration occurs.

Most of the time we don’t run into any problems with `var`, but when we accidentally do, the resulting bugs can be hair-pulling:

```javascript
function varExample() {
	var myVar = 7;

	console.log('myVar after declaration', myVar);

	// even though laterVar is defined later on in the function
	// it is "hoisted" to the beginning of the function &
	// initialized to undefined. In most C-style languages this would
	// be an error.
	console.log('laterVar before declaration', laterVar);

	laterVar = 10;

	// image some legitimate conditional
	if (myVar < 20) {
		// accidental redefintion of myVar results
		// in outer defined myVar being reassigned
		// to 'foo'
		var myVar = 'foo';
		var innerVar = true;

		console.log('myVar inside block', myVar);
	}

	// since this declaration was "hoisted", it's as if it's no
	// longer here but at the top of the function
	var laterVar;

	// looking at the code laterVar _should_ be undefined,
	// but it has the value 10 from earlier
	console.log('laterVar after declaration', laterVar);

	// we would expect myVar to still be 7
	// but it was redefined and overwritten
	// w/in the conditional
	console.log('myVar outside block', myVar === 7);

	// we would expect innerVar to no longer be accessible
	// since it was defined w/in the if-block, but it was
	// "hoisted" as well
	console.log('innerVar outside block', innerVar);
}
varExample();
```

You can imagine if your function was more complicated how you could accidentally re-declare your variables and be confused by why the function was misbehaving. This is why there are [JSHint](http://jshint.com/) and [ESLint](http://eslint.org/) rules that all `var` declarations **must** be at the top of the function.

## `let` is the new `var`

`let` works similarly to `var`, but the variable it declares is block-scoped; it _only_ exists within the current block.

```javascript
function letExample(value) {
	if (value) {
		let letValue = value;

		console.log('inside block', letValue);

		// redeclaration of letValue would be a SyntaxError
		let letValue = 'foo';
	}

	try {
		// Accessing letValue is a ReferenceError because it
		// was defined w/in if-block
		console.log(letValue);

		// if we get here, it means that the JS engine didn't
		// throw an exception, which means that the engine
		// (or transpiled code) did not faithfully reproduce
		// how let should work
		console.log('let not faithfully handled');
	}
	catch (e) {
		// e is a ReferenceError
		console.log('letValue not accessible', e);
	}
}
letExample(2);
```

As you can see it’s a `ReferenceError` if you try to access a variable outside of the block in which it was declared. With `var` we would’ve received `undefined`. Also redeclaring a let variable is a `TypeError`. With a `var` declaration you would get no such warning. In a nutshell, `let` works how you probably thought `var` worked.

### Transpiled `let` code

When `let` declarations are transpiled down to ES5, they are basically converted to `var` declarations. If you tried to transpile the code above but with `let letValue = 'foo';` uncommented, both Babel and TypeScript throw compilation errors. They won’t even transpile the code because of the redeclaration.

However, accessing `letValue` out of block scope is a different story. The [transpiled Babel code](https://github.com/benmvp/learning-es6/blob/master/examples/transpiled-es5/block-scoping-babel.js) changes all of the appropriate uses of `letValue` to `_letValue`. The result is that there is still a `ReferenceError` when accessing `letValue` within the `try-catch` block even with the transpiled code using `var` declarations. [Traceur](https://github.com/benmvp/learning-es6/blob/master/examples/transpiled-es5/block-scoping-traceur.js) unfortunately is not as robust resulting in the `console.log('let not faithfully handled');` line actually being executed. I’m wondering if the `try-catch` is somehow throwing Traceur off. Something to keep in mind when choosing a transpiler.

### Shadowing variables with `let`

We saw in the `varExample` earlier that when you redeclare a variable with `var` in a nested scope (such as an `if`-block), the variable isn’t actually redeclared. Since the variables had the same name, the second declaration just resulted in the variable’s value being reassigned. This isn’t the case with `let`:

```javascript
function letShadowExample() {
	let x = 15;

	if (true) {
		// this x "shadows" the x defined in the outer scope.
		// this new x just exists within the scope of the
		// if-block
		let x = 21;

		// x should be 21
		console.log('x inner block', x);
	}

	// x should be 15
	console.log('x outer block', x);
}
letShadowExample();
```

Within the nested scope of the `if`-block, the `let` declaration of `x` is different than that of the outer scope. Now hopefully you wouldn’t write code like this because it’s very confusing, but at least it now works like how other major programming languages work. Both Babel and Traceur rename the nested `x` variable to something different so that when the code is transpiled to ES5 and using `var` declarations, the variables are treated differently.

## Keeping things `const`

A `const` declaration works much like `let` except you _must_ initialize the variable immediately with a value. And that value cannot be changed afterwards. You will get a `SyntaxError` if you either fail to initialize the variable at declaration or if you try to reassign its value. Let’s take a look at a quick example:

```javascript
function constExample() {
	const NAME_KEY = 'name';
	const UNFROZEN_OBJ_CONST = { key: 'adam', val: 'eve' };
	const FROZEN_OBJ_CONST = Object.freeze({ key: 'jesus', val: 'paul' });

	// All const declarations must be initialized.
	// It's a SyntaxError otherwise
	const VALUE_KEY;

	// Const variables are read-only, so trying to
	// reassign is a SyntaxError too
	NAME_KEY = 'key';

	// GOTCHA: even though the object is const, you can still
	// change properties of it. It's the variable
	// that cannot be reassigned
	UNFROZEN_OBJ_CONST.key = 'moses';

	// by freezing the object, using ES5 Object.freeze
	// its properties cannot be changed.
	// in strict mode this a TypeError. In non-strict
	// mode the value silently doesn't change
	FROZEN_OBJ_CONST.val = 'peter';

	console.log('const value', NAME_KEY);
	console.log('unfrozen object', UNFROZEN_OBJ_CONST);
	console.log('frozen object', FROZEN_OBJ_CONST);
}
constExample();
```

As shown in the code, a variable declared via `const` means that it cannot be a reassigned, but it does not mean that its contents cannot be changed when it is an object. We can somewhat fix this problem (if it is one), by using the [`Object.freeze`](http://speakingjs.com/es5/ch17.html#freezing_objects) method we got from ES5.

## Entering the Temporal Dead Zone

The _temporal dead zone_ (TDZ) is just a fancy term used for the time period where code execution is in the scope of a variable declared by `let` or `const`, but _before_ it is actually declared. The variable is in scope, but not yet initialized. Accessing an uninitialized variable is a `ReferenceError`. Let’s take a look at some example code:

```javascript
{
	// Uninitialized “binding” for `disciple` variable is created
	// upon entering scope. TDZ for `disciple` variable begins

	// accessing a variable in TDZ either to get or set
	// is a ReferenceError
	disciple = ‘matthew’;
	console.log(disciple);

	// TDZ ends at declaration and `disciple` is initialized
	// w/ `undefined` value
	let disciple;

	console.log(disciple); // undefined

	disciple = ‘thomas’;
	console.log(disciple); // ‘thomas’
}
```

So why is it called the _temporal_ dead zone? It’s because the dead zone is based on the period of code execution _time_ versus where the code actually resides:

```javascript
function temporalDeadZoneExample() {
	// TDZ for `value` begins

	const func = function() {
		// Even though this function is defined _before_
		// `value` in the code, it's not called until after
		// `value` is declared, so accessing it is OK.
		console.log('value is: ', value);
	}

	// TDZ for `value` continues. Accessing `value`
	// here would be a ReferenceError. Calling `func`
	// here would cause a ReferenceError.

	// TDZ ends with declaration of `value`
	let value = 'foo';

	// no longer in TDZ when calling function so now
	// any access of `value` is ok
	func();
}
temporalDeadZoneExample();
```

Variables declared by `var` don’t have a TDZ because the variables are “hoisted” to the beginning of functions. Therefore they are always declared as well as initialized with a value of `undefined`.

## `let` and loops

Unbeknownst to most JavaScript developers, the iteration variable declared with `var` within the head of `for`-loops (such as `for (var i = 0; i < 5; i++)`) is available outside of the `for`-loop. Because of block-level scoping, with `let` this is no longer the case.

```javascript
function simpleLoopExample () {
	for (var i = 0; i < 5; i++) {
		console.log('i=', i);
	}
	for (let j = 0; j < 5; j++) {
		console.log('j=', j);
	}

	// i is accessible outside of the for loop
	// and has the value 5
	console.log('after i=', i);

	// j is not accessible outside of the for loop
	// and is a ReferenceError
	console.log('after j=', j);
}
simpleLoopExample();
```

In practice, this typically is not a problem because we would rarely try to access a loop iteration variable outside of a `for`-loop. However, this issue can crop up when newbie JavaScript developers create callback functions within loops.

```javascript
function callbackLoopVarExample() {
	var $body = $('body');

	for (var i = 0; i < 5; i++) {
		// create 5 buttons with the index in the name
		var $button = $('<button>var ' + i + '</button>');

		// wire click handler w/ callback using arrow function!
		$button.click(
			// BUG! When button is clicked, the value of `i` is 5!
			() => console.log('var button ' + i + ' clicked!')
		);

		// add button to the body
		$body.append($button);
	}
}
callbackLoopVarExample();
```

For those not too familiar with JavaScript development, it may not be immediately apparent why the `console.log` message always has `'var button 5 clicked!'`. Because the `i` variable is “hoisted” to the top of the function it still has a value after the for loop has ended. That value is `5`, which is what caused the termination of the loop. And since `i` is scoped to the whole function, all of the callback functions are bound to the same `i`, resulting in them all displaying `'var button 5 clicked!'`.

The ES3/ES5 way of solving this problem was to use a separate named function or an IIFE that would create a new scope for the iteration variable such that each callback function would be bound to its own version. Here’s an example:

```javascript
function callbackLoopNamedFunctionExample() {
	var $body = $('body');

	// Create a named function passing in the loop iteration variable
	// which creates a unique scope for each iteration so
	// that the callback function binds to its own variable.
	var loop = function(index) {
		// create 5 buttons with the index in the name
		var $button = $('<button>function ' + index + '</button>');

		// wire click handler w/ callback using arrow function!
		$button.click(
			// Fixed! `index` is unique per iteration
			() => console.log('function button ' + index + ' clicked!')
		);

		// add button to the body
		$body.append($button);
	}

	for (var i = 0; i < 5; i++) {
		loop(i);
	}
}
callbackLoopNamedFunctionExample();
```

Now when we click each button, the appropriate message is displayed. This problem could have also been solved by having an IIFE defined within the `for`-loop in much the way our `loop` function variable was defined. The need for this sort of workaround goes away when declaring the iteration variable via `let`:

```javascript
function callbackLoopLetExample() {
	let $body = $('body');

	for (let i = 0; i < 5; i++) {
		// create 5 buttons with the index in the name
		let $button = $('<button>let ' + i + '</button>');

		// wire click handler w/ callback using arrow function!
		$button.click(
			// Fixed! `i` is a different variable declaration for
			// each iteration of the loop as one would expect!
			() => console.log('let button ' + i + ' clicked!')
		);

		// add button to the body
		$body.append($button);
	}
}
callbackLoopLetExample();
```

The key here is using `let` for the iteration variable. The `i` variable is now a new declaration for each iteration of the loop, resulting in the callback function having its own `i` variable. Once again, things work with `let` as we would’ve expected them with `var`.

One thing to note is that both Babel & Traceur, when they notice this issue, use the named function approach when transpiling the ES6 code down to ES5. This means that if you have a bug in your code, the structure of the transpiled code will look dramatically different than that of your ES6 code. As long as you have a source map in your transpiled code **and** your ES6 code is also accessible, any line numbers provided by the engine should point you back to the write place in your ES6 code.

Final note on loops. Variables declared by `let` work the same way with `for-in` loops as well. ECMAScript 6 added a new type of loop, the `for-of` loop that works with iterators (also added w/ ES6), but we’ll talk about those in a later article.

## Working with parameters

Declaring a variable with `let` with the same name as a function parameter is a `TypeError`:

```javascript
function sellFruits(fruits) {
	let fruits = [];
}
```

However, if that `let` declaration happens within a nested scope (such as an `if`-block), then the variable will be [shadowed](#shadowing-variables-with-let):

```javascript
function sellFruits(fruits) {
	// create a simple code block
	{
		// this let declaration of `fruits` shadows the
		// `fruits` parameter
		let fruits = [];

		console.log(values); // []
	}

	// `fruits` here is the parameter value
	console.log(fruits);
}
```

And like all of the examples prior, `var` does not act this way. When a parameter is redeclared using `var` with the same, whether at the top-level function scope or within a nested block, nothing happens. Due to `var` declarations being functioned scoped, it's as if those declarations weren't even there because the parameter has already declared the variable in the scope.

```javascript
function sellFruits(fruits) {
	// this declaration does nothing
	var fruits;

	// create simple code block
	{
		// the declaration does nothing, but the assignment
		// does assign the parameter value to []
		var fruits = [];

		console.log(fruits); // []
	}

	// `fruits` here is still [] from the assignment
	// in the block
	console.log(fruits);
}
```

## `var` vs `let` vs `const`

Now that we know how `let` and `const` work, when should we use them in place of `var`? Here are some suggestions:

* Use `const` for variables you want to be immutable. This works best for primitive values (like `Number`, `String`, `Boolean`, etc). You can use `const` for objects, but you should probably use `Object.freeze` in concert to make the object truly immutable. You could use `const` for a mutable object, but that defeats the "spirit" of `const`.
* Use `let` for the mutable variables (i.e. everything else)
* The only time you may need to still use `var` is for objects in the global scope, particularly ES3- and ES5-style namespaces or modules. Ideally you would convert those to ES6-style modules, but for backwards compatibility you may still need to use `var`.
* Do **not** mix and match `let` and `var` in a file. Be consistent, otherwise it'll lead to even more confusion.
* Do **not** do a global search and replace of `var` for `let`. You may have code that is unintentionally relying on the quirkiness of `var`. You should do the conversion manually one file at a time.

## JavaScript engine support

According to the [ECMAScript 6 compatibility table](http://kangax.github.io/compat-table/es6/), the following JavaScript engines support `let` and `const`:

* Babel
* Traceur
* TypeScript
* Edge
* Chrome (with [experimental flag enabled](chrome://flags/#enable-javascript-harmony) and in strict mode)
* Firefox (code blocks must be wrapped in `<script type="application/javascript;version=1.7">` tag)
* Opera (in strict mode)
* Node 5 (in strict mode)

The most notable missing engine is Safari. Of course IE 11 and lower do not support any ES6 features. In order to have the engine faithfully support `let` and `const`, particularly the temporal dead zone, you should ensure your scripts are running in strict mode.

## Additional resources

You can check out the [_Learning ES6_ examples page](/learning-es6/#block-scoping) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser (for those that support `let` and `const`). There are also examples running through Babel and Traceur transpilation.

Other super helpful resources:

- [Variables and scoping](http://exploringjs.com/es6/ch_variables.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Block bindings](https://leanpub.com/understandinges6/read#leanpub-auto-block-bindings) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [let and const](https://hacks.mozilla.org/2015/07/es6-in-depth-let-and-const/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by [Jason Orendorff](https://twitter.com/jorendorff)
- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) on [MDN](https://developer.mozilla.org/en-US/)

## Coming up next...

We will be continuing the [_Learning ES6_ series](/learning-es6-series/) by looking at the fun new [_destructuring_](/learning-es6-destructuring/) techniques introduced with ES6. Until then...
