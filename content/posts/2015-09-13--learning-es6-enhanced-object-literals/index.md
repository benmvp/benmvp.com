---
title: Enhanced object literals
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, object-literals]
cover: object-literal.png
---

![object literals](object-literal.png)

Wow, we're making some good progress covering ECMAScript 6 features in this [_Learning ES6_](/learning-es6-series/) series. We just covered [parameter handling](/learning-es6-parameter-handling/), and have learned about [destructuring](/learning-es6-destructuring/), [`let` & `const`](/learning-es6-block-level-scoping-let-const/), as well as [arrow functions](/learning-es6-arrow-functions/). Now we zero in on the enhancements to object literals, another piece of ES6 syntactic sugar.

## TL;DR

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
//     makeKia: true,
//     depreciate: function()
// }
console.log(car);

car.depreciate();

// output: 37500
console.log(car.value);
```

The [enhanced object literals code examples](/learning-es6/#enhanced-object-literals) page has many more examples showing off each feature in more detail. There are also some [ES6 katas](http://es6katas.org/) for testing your ES6 enhanced object literal knowledge.

Continue on for more details!

## Introduction

The object literal may very well be one of the best and most popular features in JavaScript. It's a superset of [JSON](http://json.org/), which has now become the de facto standard for data transport on the web, quickly replacing XML. The great thing about object literals is that they make it crazy easy to assemble an arbitrarily nested and dynamic set of data object with a definition syntax that is human-readable because its so succinct.

We actually touched on object literals a little bit, while looking at [object destructuring](/learning-es6-destructuring/#object-destructuring), but now we'll be delving into their enhanced features. ES6 introduces features to make the syntax even more succinct and increasingly more capable of constructing a complex data object in its initialization.

## Property value shorthand

The new property value shorthand lets us abbreviate the initialization of a property within an object literal, provided that the property key matches an existing variable name. This was the first part of the ES6 code above:

```js
function getCar(make, model, value) {
	return {
		// with property value shorthand
		// syntax, you can omit the property
		// value if key matches variable
		// name
		make,
		model,
		value
	};
}
```

The ES3/ES5 equivalent would be:

```js
function getCar(make, model, value) {
	return {
		make: make,
		model: model,
		value: value
	};
}
```

As you can see, the ES6 syntax is a bit more succinct by being less repetitive with the removal of the colon (:) and the matching variable. Declaring an object literal with keys that match variables is actual quite common, so you should find this feature quite useful. You may also notice that this property value shorthand looks remarkably like the object literal destructure pattern shorthand when we discussed [object destructuring](/learning-es6-destructuring/#object-destructuring).

With this shorthand syntax, the JS engine looks in the containing scope for a variable with the same name. If it is found, that variable's value is assigned to the property. If it is not found, a `ReferenceError` is thrown. It's worth noting that the transpilers will not throw an error at compile time if the variable is not found, but instead will declare an object with the name of the not-found variable. However, when the code runs you will still get the `ReferenceError` since the variable does not exist.

## Computed property keys

A little backstory really quick.

As we all know, there are two ways of specifying a key when accessing a property. You can use a fixed alphanumeric name, which allows us to use the dot notation (`myCar.make`). You can also use an expression, but then you have to use the square bracket notation. The expression could contain variables (`myCar['make' + make]`) or be a string literal that contains non-alphanumeric characters that would cause a `SyntaxError` if used as an identifier (`myCar['make/model']`).

With object literals in ES5, we can either have a string literal or a fixed alphanumeric name. ES6 now allows property keys of object literals to be use expressions, making them computed property keys.

From our ES6 code above:

```js
function getCar(make, model, value) {
	return {
		// computed values now work with
		// object literals
		['make' + make]: true
	};
}
```

The equivalent ES3/ES5 code would look something like:

```js
function getCar(make, model, value) {
	var car = {};

	// in ES3/ES5 the only way to use a
	// computed property key was in a
	// separate assignment statement
	car['make' + make] = true;

	return car;
}
```

What was three statements in ES3/ES5 became one statement in ES6 with the support of computed property keys in object literal definitions. The square brackets indicate to the JavaScript engine that the property key is computed so the expression is evaluated to a string. This means that anything that you would've put in the ES5 square bracket notation will work in the new ES6 computed property key syntax.

Unfortunately, however, the property value shorthand cannot be combined with the computed property key syntax. If you tried to do the following, you would get a `SyntaxError`:

```js
let key = 'value',
	value = 'Ben',

	// might expect `obj` to have a property
	// key named 'value', with the value of 'Ben'
	// but this is a SyntaxError.
	// You would need to do `{ [key] : value}`
	obj = { [key] };
```

## Method definition shorthand

Let's wrap up our discussion, by looking at the shorthand for method definitions in ES6 that's pretty similar to the property value shorthand. Our ES6 code looks like:

```js
function getCar(make, model, value) {
	return {
		// Method definition shorthand syntax
		// omits `function` keyword & colon
		depreciate() {
			this.value -= 2500;
		}
	};
}
```

And the ES3/ES5 equivalent:

```js
function getCar(make, model, value) {
	return {
		depreciate: function() {
			this.value -= 2500;
		}
	};
}
```

As you can see, the colon (:) and the `function` keyword can now be omitted making the syntax even more succinct.

If you recall, property accessors (getters and setters) were introduced in ES5, enabling us to execute some code prior to or after getting and setting a property value. In ES6, property accessors continue to work as they did in ES5.

Let's say we instead wanted to ensure that users of car objects couldn't set invalid values for their cars. We could instead make `value` an accessor:

```js
function getCar(make, model, value) {
	return {
		make,
		model,

		_value: value,

		get value() {
			return this._value;
		},
		set value(value) {
			if (value < 0)
				throw new Error('invalid value');

			this._value = value;
		}
	};
}

let car = getCar('Kia', 'Sorento', 40000);

// output: 40000
console.log(car.value);

car.value = 30000;

// error thrown
car.value = -1;
```

Notice the similarities between the property accessor syntax and the new ES6 method definition shorthand syntax. It's nice that TC39 kept things the same.

It's also worth noting that computed property keys _do_ work with method definition shorthand and property accessors:

```js
function getCar(make, model, value) {
	let valueKey = 'value',
		appreciateKey = 'appreciate';

	return {
		// computed property keys also work
		// withe method definition shorthand
		[appreciateKey]() {
			this.value += 1000;
		},

		// computed property keys also work
		// with property accessors
		set [valueKey](value) {
			if (value < 0)
				throw new Error('invalid value');

			this._value = value;
		}
	};
}
```

In practice, you may find that you use this method definition shorthand rather sparingly. The reason being is that if you wanted to create an object like the one above, you would probably use a class instead so you can have all the benefits that prototypal inheritance brings. The main reason for adding functions to an object literal is to create a module that exports some functions or classes:

```js
// export the following functions
module.exports = {
	cube(value) {
		return Math.pow(value, 3);
	},
	cubeRoot(value) {
		return Math.pow(value, 1/3);
	}
};
```

However, the standard design practice is to separate out the functions from the export command in order to help the API stand out:

```js
function cube(value) {
	return Math.pow(value, 3);
}
function cubeRoot(value) {
	return Math.pow(value, 1/3);
}

// export the following functions
module.exports = {
	cube: cube,
	cubeRoot: cubeRoot
};
```

With the new ES6 property value syntax, we can shorten this up a bit:

```js
function cube(value) {
	return Math.pow(value, 3);
}
function cubeRoot(value) {
	return Math.pow(value, 1/3);
}

// export the following functions
module.exports = { cube, cubeRoot };
```

We'll be talking about the new ES6 module syntax in a future article.

You may find that the only time you end up adding a function to an object literal is when you're passing a bucket of options in an object to some function and that object can contain a callback function. We actually saw an example of this when we discussed destructured parameters in the [parameter handling](/learning-es6-parameter-handling/#destructured-parameters) article.

## JavaScript engine support

I'm happy to report that according to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/) all of the major JavaScript engines support enhanced object literals! The only minor blip is that Safari 9 currently does not support computed property keys for accessor properties.

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#enhanced-object-literals) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser.

You can also practice everything you've learned on [ES6 Katas](http://es6katas.org/). It uses a TDD (test-driven development) approach for you to implement ES6 features such that all of the tests pass. I highly recommend it!

Lastly, here are a few books and articles that talk about enhanced object literals in even more detail:

 - [New OOP features besides classes](http://exploringjs.com/es6/ch_oop-besides-classes.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Object Literal Extensions](https://leanpub.com/understandinges6/read#leanpub-auto-object-literal-extensions) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
 - [ES6 Object Literal Features in Depth](http://ponyfoo.com/articles/es6-object-literal-features-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)

## Coming up next...

Well that was relatively short and sweet. Up next we'll take a look at [template literals](/learning-es6-template-literals-tagged-templates/) which provide a much cleaner way to build up string values. Until then...
