---
title: Destructuring
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, destructuring]
cover: pass-baton.jpg
---

![Passing the baton](pass-baton.jpg)

After learning all about [arrow functions](/learning-es6-arrow-functions/) and [block-level scoping](/learning-es6-block-level-scoping-let-const/), let's continue the syntactic sugar train in our [_Learning ES6_ series](/learning-es6-series/) with _destructuring_ in ECMAScript 6.

## TL;DR

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

As you can see, we can store properties of an object or elements of an array using pattern matching. You can find many more examples in the [destructuring code examples](/learning-es6/#destructuring) which are part of the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6).

If you're finding destructuring intriguing (which you should), keep on reading for a more in-depth explanation.

## Some background

JavaScript developers spend quite a bit of time extracting data from arrays and objects. Destructuring allows variable binding via pattern matching with support for both arrays and objects. The patterns closely resemble those of array and object literals. Destructuring is also fail-soft, meaning that values not found return `undefined` instead of an error.

But first, let's take a look at how we deal with objects and arrays currently. There is a verbose way of defining objects and arrays:

```js
var config = new Object(),
	myArray = new Array();

config.delay = 500;
config.title = 'Hi!';
config.info = new Object();

// add to nested object
config.info.name = 'Elijah';

myArray.push(1);
myArray.push(new Array());
myArray.push(true);

// add to nested array
myArray[1].push('hello');
```

This can be significantly shortened into one-liners using literal syntax:

```js
var config = {delay: 500, title: 'Hi!', info: {name: 'Elijah'}},
	myArray = [1, ['hello'], true];
```

Similarly, there's a verbose way of retrieving data from objects and arrays:

```js
var config = {delay: 500, title: 'Hi!', info: {name: 'Elijah'}},
	KEY = 'info',
	delay = config.delay,
	configTitle = config['title'],
	info = config[KEY],
	fullName = config.name,

	myArray = [1, ['hello'], true],
	first = myArray[0],
	second = myArray[1],
	secondNest = second[0],
	third = myArray[2];
```

ES6 provides a new syntax for quickly retrieving property values from objects and elements from arrays. This process is called _destructuring assignment_ and we'll spend the rest of our time looking at examples.

## Object destructuring

Object destructuring assignment uses an object literal pattern on the left hand side of an assignment operation. Let's convert the object portion of the  ES5 example above using ES6 destructuring (and `let`):

```js
let config = {delay: 500, title: 'Hi!', info: {name: 'Elijah'}},
	{delay, info, title} = config;

// output: {name: 'Elijah'}, 500, 'Hi!'
console.log(info, delay, title);
```

We were able to store references to the 3 property values within `config` into variables with names that matched the property keys of `config`. This is actually the shorthand syntax for object destructuring. If instead we wanted to use different variable names, we can use the full syntax:

```js
let config = {
		delay: 500,
		title: 'Hi!',
		info: {name: 'Elijah'}
	},
	{
		info: one,
		title: two,
		empty: three,
		delay: four
	} = config;

// output: {name: 'Elijan'}, 'Hi!', undefined, 500
// missing properties have `undefined` value
console.log(one, two, three, four);
```

We were able to use an alias for the `info` property from `config`, naming it `one`. We did the same for `title` (`two`) and `delay` (`four`). Notice that we also tried to get the `empty` property out of `config` but since it doesn't exist `three` is `undefined`. This works exactly how it would in ES5 with dot- or bracket-notation.

### Nested object destructuring

Destructuring also supports nesting. So if we wanted to get the value of `config.info.name` (`fullName` variable in the early example) we can do the following:

```js
let config = {delay: 500, title: 'Hi!', info: {name: 'Elijah'}},

	// `delay` is using shorthand syntax mixed in w/
	// full syntax
	{
		info: {name: fullName},
		delay,
		title: configTitle
	} = config;

// output: 'Elijah', 'Hi!', 500
console.log(fullName, configTitle, delay);
```

The destructure pattern we specify in order to assign to `fullName` is a nested object. If we were ok with the values of `config.info.name` going into a variable named `name`, we could've simply done: `{info: {name}}`. It's worth pointing out that you can not assign both parent _and_ child properties at the same time. So in the example, you can either get the `info` property _or_ its child properties. Not both.

We learned earlier that destructuring is fail-soft so missing properties result in `undefined` values. This doesn't apply, however, when trying to assign a missing child property whose parent property is also missing:

```js
let options = {},

	// `delay` would be `undefined`, but trying
	// to assign to `name` is an error
	// since `options.info` is already `undefined`
	{delay, info: {name}} = options;
```

### Computed values in object destructuring

Destructure patterns also support using computed values in the full syntax:

```js
const KEY = 'empty';
let options = {delay:500, empty:true, title:'Hi!'},
	{[KEY]: empty, delay, title} = options;

// outputs: 'Hi!', 500, true
console.log(title, delay, empty);
```

### Object destructuring gotchas

You don't have to exclusively use destructuring when declaring a variable via `let` or `const` (or `var` if you're still in to that sort of thing). You can use it for normal assignments to variables that have already been declared.  However, when you do assignment-only object destructuring, you have to wrap the _entire statement_ in parentheses:

```js
let a,
	b = {};

// some code

( {a, b: b.count} = {a: 1, b: 2} );

// output: 1, {count: 2}
console.log(a, b);
```

If you leave off the parenthesis you will get a `SyntaxError`. This is because without the parentheses the statement looks like an invalid code block to the JavaScript engine. You should also notice that in the assignment, we assigned directly to `b.count`. Basically, anything that can accept an assignment can be used in a destructure pattern.

## Array destructuring

Array destructuring works much the same way as object destructuring except you use an array literal destructure pattern for the left hand side assignment operation. As we saw earlier, the ES5 way of storing elements of an array into a variable can be pretty cumbersome. We can rewrite it in ES6 as such:

```js
let myArray = [1, ['hello'], true],
	[first, second, third] = myArray;

// output: 1, ['hello'], true
console.log(first, second, third);
```

There's only one syntax with array destructuring and that's the shorthand syntax because the index that the variable will map to is implied by its order in the array literal destructure pattern.

### Nested array destructuring

If instead we wanted to get the element _within_ the `second` array, we can use a nesting pattern similar to what we did with object destructuring:

```js
let myArray = [1, ['hello'], true],
	[first, [secondNest], third] = myArray;

// output: 1, 'hello', true
console.log(first, secondNest, third);
```

### Skipping indices in array destructuring

Even though the array literal destructure pattern is order-dependent, we can still pick and choose which elements of the array we want stored as variables by skipping indices:

```js
let sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34],
	[first, , third, fourth, , , seventh] = sequence
;

// output: 0, 1, 2, 8
console.log(first, third, fourth, seventh);
```

Pretty cool, huh?


## Mixed object & array destructuring

As you might have already guessed, we can mix object and array literal destructure patterns. This can come in very handy when we're pulling out various pieces of data from a JSON object because we no longer have to navigate the entire structure.

```js
let json = {
		shapes: ['circle', 'square', 'triangle'],
		colors: 5,
		fill: true,
		author: {
			firstName: 'Ben',
			lastName: 'Ilegbodu',
			city: 'Pittsburg'
		}
	},
	{
		fill,
		author: {lastName, firstName, city},
		shapes: [, secondShape],
		colors: numColors
	} = json;

// output: true, square, 5
console.log(fill, secondShape, numColors);
// output: Ilegbodu, Ben, Pittsburg
console.log(lastName, firstName, city);
```

Now that's powerful stuff.

## Destructuring use cases

The mixed object and array destructuring with JSON data is a real-world use case. Here are a few more.

### Swapping values

What happens if we need to swap values in two variables? In the standard answer, we end up needing a third `temp` variable:

```js
var a = 1,
	b = 2,
	temp;

temp = a;
a = b;
b = temp;
```

However, now that we have destructuring, we can use array destructuring to quickly swap two numbers without the need for a `temp` variable:

```js
let a = 1,
	b = 2;

[b, a] = [a, b];
```

See what we did there? We constructed an array using the array literal syntax with two elements: `a` and `b`. Then using array destructuring we assigned the first element of the newly created array into `b` and the second element into `a`. The result is that the variables' values have swapped. Now technically we did still create a temporary array, but we never had to store it into a variable.

### Destructuring class objects

Class objects are similar to object literals except they are created using `prototype`. As long as properties of the class object are accessible via dot- or bracket-notation, they will also be available via object destructuring. Here's an example using the `Location` object:

```js
let {
		protocol: scheme,
		host: domain,
		pathname: path,
		search: query,
		hash,
		href: url
	} = location;

// output: true
console.log(
	(scheme + '//' + domain + path + query + hash) == url
);
```

### Destructuring return values

Many methods on JavaScript APIs return arrays (such as `exec` on `RegExp` objects or `split` on `String` objects). You can use array destructuring to get the array values into variables quickly:

```js
let [, areaCode, exchange, lineNumber] =
	/^(\d\d\d)-(\d\d\d)-(\d\d\d\d)$/
		.exec('650-555-1234');

// output: 650, 555, 1234
console.log(areaCode, exchange, lineNumber);
```

As we know, `exec` returns an array of the matching groups with the first element being the entire match. We're not interested in that first piece, so we skip it and get the remaining three parts. You can imagine what this code looks like in ES5.

### Handling multiple return values

Sometimes a function needs to return multiple pieces of data. This typically packaged together in an object literal or as an array tuple. Once again we can use destructuring to easily get out the data we care about.

Let's say we have a `find` method that takes as parameters an array `list` and a string `token`, where it finds the first string in  `list` that contains `token`.

```js
function find(list, token) {
	for (let i = 0; i < list.length; i++) {
		if (list[i].indexOf(token) > -1)
			return {index: i, val: list[i]};
	}

	// match not found
	return {index: -1, val: undefined};
}
```

Now a caller of `find` might care about the index at which `token` was found or it might care about the string itself. That's why `find` returns an object literal containing both the `index` number and the `val` string.

If the caller needs a reference to both pieces of information, they can do:

```js
let fruits = ['apple', 'grape', 'peach', 'pear'],
	{index, val} = find(fruits, 'ape');
```

Or if they just care about the `val`:

```js
let fruits = ['apple', 'grape', 'peach', 'pear'],
	{val} = find(fruits, 'ape');
```

Or if they care just about the `index`:

```js
let fruits = ['apple', 'grape', 'peach', 'pear'],
	{index} = find(fruits, 'ape');
```


## Combining destructuring & ES6 other operators

We can actually combine destructure patterns with other ES6 operators such as the spread and rest operators. We can also use default values with them. We can even use them to destructure function arguments directly in the arguments definition. However, we haven't talked about any of these concepts yet, so we'll save them for our next discussion on parameter handling.

## JavaScript engine support

According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/), the following JavaScript engines support destructuring:

 - Babel
 - Traceur
 - TypeScript
 - Firefox (does support default values in destructure patterns yet)
 - Safari (partial support)

It's surprising to see that Chrome doesn't yet support destructuring. Neither does node.js or io.js. This is also the first feature we've covered that Microsoft's Edge doesn't support either. My guess is that this feature may be low priority for these vendors since it's basically 100% syntactic sugar. At least [arrow functions](/learning-es6-arrow-functions/) providing proper `this` binding and [block-scoping](/learning-es6-block-level-scoping-let-const/) fixed variable hoisting.

## Additional resources

You can check out the [_Learning ES6_ examples page](/learning-es6/#destructuring) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser (for those that support destructuring). There are also examples running through Babel and Traceur transpilation.

Other super helpful resources:

 - [Destructuring](http://exploringjs.com/es6/ch_destructuring.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Destructuring Assignment](https://leanpub.com/understandinges6/read#leanpub-auto-destructuring-assignment) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
 - [Destructuring in Depth](http://ponyfoo.com/articles/es6-destructuring-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)

## Coming up next...

As promised, the [_Learning ES6_ series](/learning-es6-series/) continues with a deep look at all the new ECMAScript 6 features for [parameter handling](/learning-es6-parameter-handling/). Until then...
