---
title: Template literals & tagged templates
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, template-literals, tagged-templates]
cover: backtick.png
---

![Backtick - powerful commands, just one tick away](backtick.png)

Template literals and tagged templates comprise topic #6 in the [_Learning ES6_ series](/learning-es6-series/). If you're new to the series, we most recently covered [enhanced object literals](/learning-es6-enhanced-object-literals/) and [parameter handling](/learning-es6-parameter-handling/).

Template literals, as well as tagged templates, are still primarily syntactic sugar, so you can totally do them in ES5. In fact, we have been doing them in ES5 up to this point. But the amount of code needed to mimic these ES6 features in ES5, especially tagged templates, can be pretty substantial.

## TL;DR

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

## Simple template literal

In it’s simplest form, a template literal is just like a regular string literal except it’s enclosed with backticks (`` ` ``) instead of single or double quotes.

```js
console.log(`This is a template literal!`);
```

The benefit is now you can have a string literal with both single and double quotes without having to escape either of them.

```js
console.log(`He said, "It's your fault!"`);
```

If for some strange reason you actually *wanted* a backtick in your template literal, you can simply escape it with a backslash (`\`).

```js
console.log(`Who uses \` symbols in normal text??`);
```

Why backticks? Glad you asked! You see, JavaScript has had some deficiencies when it came to dealing with string literals. I'll detail the issues in a bit. So the TC39 committee decided to fix the problems by introducing a new type of string instead of trying to shoehorn this new functionality into existing string literal constructs. The backtick was one of the few ASCII characters still left unused in ECMAScript and it certainly looks similar to a quotation mark.

Developers are also becoming more familiar with the backtick because of code blocks in [Markdown](https://en.wikipedia.org/wiki/Markdown) as well. You may have noticed that the syntax highlighting is a little off in some of the examples. I write these articles using [Github-flavored Markdown](https://help.github.com/articles/github-flavored-markdown/) and even though I specify JavaScript as the language it isn't (yet) aware of this newfangled ES6 template literal. The backtick does make writing inline code blocks (also backtick delimited) a bit more challenging.

Even though template literals are an entirely new type of string literal, they are still identified as strings and have the same properties.

```js
let templateLiteral = `This is a literal`;

// output: string
console.log(typeof templateLiteral);

// output: 17
console.log(templateLiteral.length);

// output: is a literal
console.log(templateLiteral.substr(5));

// output: a
console.log(templateLiteral.charAt(8));
```

## Template literal interpolation

If all template literals offered was freedom from having to escape single and double quotes, the feature would've never made it past the proposal floor. One feature severely lacking with JavaScript was simple string interpolation (token substitution). It exists in string literals for other languages like Python and Perl.

The ES6 template literal now brings string interpolation to JavaScript:

```js
let firstName = 'Ben',
	lastName = `Ilegbodu`;

// the values within `firstName` and `lastName`
// are substituted into where the tokens are
// output: Name: Ilegbodu, Ben
console.log(`Name: ${lastName}, ${firstName}`);
```

In ES5, we would do string concatenation (which is what the transpilers do):

```js
var firstName = 'Ben',
    lastName = 'Ilegbodu';

console.log('Name: ' + lastName + ', ' + firstName);
```

When you use a variable name, the JavaScript engine substitutes the value of that variable into its location in the string, provided that the variable is in scope. If the variable is not in scope, it is a `ReferenceError`.

The `${}` syntax isn't _just_ variable interpolation. It's _expression_ interpolation. This means that any expression can go inside. It can be a string literal, number, mathematical expression, ternary operator, function, call, etc. And since it's being concatenated together to string literal pieces, that expression will be coerced to a string.

```js
let timeOfDay = (new Date).getHours(),
	mealCost = 7.99,
	tax = 0.09;

// any sort of expression can go inside the
// substitution token
// output: Morning/Evening meal: $8.71
console.log(`${timeOfDay < 12 ? 'Morning' : 'Evening'} meal: $${(mealCost * (1 + tax)).toFixed(2)}`);
```

Now granted, you would probably factor out the expressions into variables for readability purposes, but this code illustrates the point that any sort of expression can go inside the substitution token. Did you happen to notice the `$$`? No, that's not some special syntax. That is a `$` string preceding the `${}` substitution token. The result is that it looks like a price.

Many JavaScript libraries that support string interpolation with regular string literals support being able to pass an object literal as a bucket of substitution values. The keys are the token names. You can still do that with template literals, but you will have to [destructure](/learning-es6-destructuring/) the object literal first.

```js
let replacements = {
		firstName: 'Ben',
		lastName: 'Ilegbodu'
	},
	{firstName, lastName} = replacements;

// you have to destructure an object first in order
// to use its key-values as substitution values
console.log(`Name: ${lastName}, ${firstName}`);
```

If for some odd reason you don't want the substitution, you can escape it with a backslash (`\`):

```js
// output: Name: ${lastName}, Ben
console.log(`Name: \${lastName}, ${firstName}`);
```

So why the `${}`? Unix. Other languages use it as well.

## Multi-line template literal

But wait, there's more! Another issue with JavaScript strings is it's lack of support for multi-line strings. There are a couple of ways JavaScript developers attempt multi-line strings in ES5:

```js
// option #1 just does string concatenations
// with new line characters
var option1 = 'This is intended\n'
	+ 'to be a multi-line\n'
	+ 'string';

// option #2 uses an array literal of string literals
// and then joins by a new line character
var	option2 = [
		'This is intended',
		'to be a multi-line',
		'string'
	].join('\n');
```

ES6 makes this dead simple with template literals. You just put the line breaks where you want them:

```js
let optionES6 = `This is intended
to be a multi-line
string`;
```

You should be aware, however, that _all_ whitespace is included. Therefore, if indentation and alignment is important, you may want to start your template literal on its own line:

```js
let html = (
`<html>
	<head></head>
	<body></body>
</html>`);
```

Speaking of HTML, when you add string interpolation to multi-line template literals, we can legitimately do HTML in JavaScript strings:

```js
let eventCardInfo = {
		title: 'Nodevember 2015',
		url: 'http://nodevember.org/',
		tagline: 'Two days of Node and JavaScript'
	},
	{title, url, tagline} = eventCardInfo,
	html = `<section>
				<h3><a href="${url}">${title}</a></h3>
				<p>${tagline}</p>
			</section>`;
```

The resultant HTML won't come out formatted pretty, and 99% of the time that's perfectly fine. Long gone are the days where people had to look at source code text to look at your markup. With DOM inspectors, having pretty HTML is no longer important.

We can even get more advanced and use interpolation expressions which iterate over arrays that return template literals nested inside a template literal:

```js
let eventCardInfo = {
		title: 'Nodevember 2015',
		url: 'http://nodevember.org/',
		tagline: 'Two days of Node and JavaScript',
		tags: ['JavaScript', 'Node']
	},
	{title, url, tagline, tags} = eventCardInfo,
	html = `<section>
				<h3><a href="${url}">${title}</a></h3>
				<p>${tagline}</p>
				<ul>
					${
						tags.map(
							tag => `<li>${tag}</li>`
						).join('\n')
					}
				</ul>
			</section>`;
```

The `map` on the `tags` array uses an [arrow function](/learning-es6-arrow-functions/) as well as a template literal to substitute each `tag` into an `<li>`. The new array is then joined by new lines and the resultant string of `<li>` tags is then substituted into the `<ul>`.

Pretty cool huh? But all in all, still pretty much a whole bunch of syntax sugar right? We could pretty easily have done everything so far in ES5. The code wouldn't have been as succinct or as pretty, but it wouldn't have been all that complicated. Things get _real_ when template literals join forces with template handlers to create tagged templates.

## Tagged template

Ah, the tagged template. Easily the most confusing ES6 feature we've discussed so far. Its implementation and how to use it is complex, but ultimately makes sense. What's confusing isn't the _how_ of tagged templates, it's the _why_. I've read a handful of books, articles and blogs on tagged templates and I have yet to have the "aha!" moment as to why JavaScript developers would want to use the feature. I've seen a few examples, which I will show as we dig into the feature, but none of them are all that motivating to be perfectly honest.

And now that I've successfully lowered your interest in tagged templates, let's learn about them! :)

The simplest use of tagged templates is to get a raw string where character escape sequences (like `\n`, `\t`, etc.) have not yet been transformed into their "cooked" character equivalents (new line, tab, etc.):

```js
let rawString = String.raw`\t\tThis is not a\n multi-line string!`;

// instead of tabs and new lines being in the string,
// the actual escape characters are in the string
// (effectively the backslash is escaped)
// output: \t\tThis is not a\n multi-line string!
console.log(rawString);
```

The biggest use case for raw strings in JavaScript is for creating complex regular expressions where you can't use a regular expression literal, presumably because you need to interpolate a variable. Here's an ES5 example:

```js
var name = 'Ben',

	// We want a regular expression that will match
	// on '(Ben)'. We have to double escape parenthesis
	// because they indicate groups in regular
	// expressions
	nameRegExp = new RegExp('\\(' + name + '\\)')
;

// output: true
console.log(nameRegExp.test('(Ben) Ilegbodu'));
```

With `String.raw` and tagged templates in ES6 this is more straightforward in my opinion:

```js
let name = 'Ben',

	// no more double escaping and we can use
	// interpolation!
	nameRegExp = new RegExp(String.raw`\(${name}\)`);

console.log(nameRegExp.test('(Ben) Ilegbodu'));
```

Wondering what `String.raw` is? Well it's called a template handler or tag function and what transforms a simple template literal into a tagged template. Template handlers are functions that determine how the template literal should be processed. Their names go right before the template literal. `String.raw` just happens to be a special type of template handler provided by updates to the `String` API (more on those updates in a future article).

In order to explain how `String.raw` works and what template handlers do in general, let's create a template handler called `interpolate` which effectively reimplements string interpolation in template literals. Here's how we'd use it.

```js
let firstName = 'Ben',
	lastName = `Ilegbodu`;

// instead of using the default interpolation
// that ES6 offers, we're reimplementing it using
// `interpolate` function
// output: Name: Ilegbodu, Ben
console.log(interpolate`Name: ${lastName}, ${firstName}`);
```

Now, it's time to implement `interpolate`. Here's it's function signature:

```js
function interpolate(literals, lastName, firstName) {
	// literals = ['Name: ', ', ', '']

	// implementation here
}
```

The `interpolate` function is passed an array of string literals, the value of the first substitution (`lastName`) and the value of the second substitution (`firstName`). Now we want `interpolate` to be generic and not assume what the substitution tokens are. [Rest parameters](/learning-es6-parameter-handling/#rest-parameters) to the rescue!

```js
function interpolate(literals, ...substitutions) {
	// literals = ['Name: ', ', ', '']
	// substitutions = ['Ilegbodu', 'Ben']
	// substitutions.length == literals.length - 1

	// implementation here
}
```

`literals` contains all of the string literals surrounding the substitutions. If a template literal begins with a substitution, then the first element in `literals` will be an empty string (`''`). Similarly if the template literal ends with a substitution, the last element in `literals` will be an empty string. As a result, `literals` will always have at least one element in it (which could be `''`) and will always have one more element than `substitutions`. A template literal with zero substitutions (such as `` `Ben Ilegbodu` ``), will have `literals = ['Ben Ilegbodu']`.

Now that we've gotten that out of the way let's come up with an implementation:

```js
function interpolate(literals, ...substitutions) {
    let interpolation = '';

    // loop through based on length of substitutions
    // since its shorter by 1
    for (let i = 0; i < substitutions.length; i++) {
        interpolation += literals[i] + substitutions[i];
    }

    // add the extra literal to the end
    interpolation += literals[literals.length - 1];

    return interpolation;
}

let firstName = 'Ben',
	lastName = `Ilegbodu`;

// output: Name: Ilegbodu, Ben
console.log(interpolate`Name: ${lastName}, ${firstName}`);
```

That's it! There are probably fancier ways to implement the function, but I wanted to keep it simple so that it's clear what's going on. Essentially all `interpolate` does is stitch the string together using the various pieces.

So what about `String.raw`? How does it work? It turns out that the `literals` array isn't a 100% pure array. The `literals` array has a `raw` property, which is an array of  the raw string literals. With that knowledge in hand, let's now reimplement `String.raw`:

```js
String.raw = function(literals, ...substitutions) {
	// literals.raw is an array of raw strings
    let rawLiterals = literals.raw,
    	interpolation = '';

    // loop through based on length of substitutions
    // since its shorter by 1
    for (let i = 0; i < substitutions.length; i++) {
        interpolation += rawLiterals[i] + substitutions[i];
    }

    // add the extra raw literal to the end
    interpolation += rawLiterals[rawLiterals.length - 1];

    return interpolation;
}

// output: \t\tThis 1 is not a\n multi-line string!
console.log(String.raw`\t\tThis ${1} is not a\n multi-line string!`);
```

And there you have it!  Like I mentioned earlier, despite my extensive research on the topic, I have yet to find compelling examples of creating custom template handlers. It's my suspicion that the TC39 committee wanted to provide a way for template literals to support raw strings and came up with `String.raw`. Then the figured they might as well open this up for everyone to use to see if developers can find interesting use cases. I don't believe that tagged templates were created to solve an existing need, but instead created to support potentially new functionality.

The best use case I've come across for tagged templates is creating a localization (L10N) template handler. With localization, you not only translate strings into the native language, but also use the proper currency symbol, date format, number format, etc.

```js
let cost = 10.45,
	date = new Date('12/1/2016');

// translate and localize
// English: Your ticket for 12.1.2016 is $10.45.
// Spanish: Su billete para el 2016.12.1 es €10,45.
console.log(l10n`Your ticket for ${date} is {$cost}:c.`);
```

Notice that in addition to the language translation, the dates and currencies are formatted differently. The `l10n` template handler could look at the data types of the `substitutions` and do automatic formatting. Decimal places in European countries would be separated by a comma instead of a period. A date would be formatted differently depending on the local as well. Right now, with most client-side translation systems, all that happens is translations and token replacement. The substitutions passed in need to already be properly formatted.

You may have noticed the `:c` portion after the `${cost}` token. That isn't any special syntax. That would be a convention that `l10n` would leverage to know how to format the value within the `cost` variable. `':c'` would actually be at the beginning of the last string literal in `literals` so `l10n` would have to look ahead to the next string literal after a substitution to see if it contains any formatting information (i.e. starts with `:`).

If you're interested in more examples, Axel Rauschmayer has a number of them in his [*Exploring ES6*](http://exploringjs.com/es6/ch_template-literals.html#leanpub-auto-examples-of-using-tagged-templates) book.

## JavaScript engine support

According to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/), all the major JavaScript engines (browsers, servers & transpilers) support template literals and tagged templates! Hooray!

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#template-literals) for the [_sLearning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser.

You can also practice everything you've learned about template literals and tagged templates on [ES6 Katas](http://es6katas.org/). It uses a TDD (test-driven development) approach for you to implement ES6 features such that all of the tests pass. It's really cool!

Lastly, here are a few books and articles that talk about template literals and tagged templates in even more detail:

 - [Template literals and tagged templates](http://exploringjs.com/es6/ch_template-literals.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Template Strings](https://leanpub.com/understandinges6/read#leanpub-auto-template-strings) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
 - [ES6 Template Strings in Depth](http://ponyfoo.com/articles/es6-template-strings-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)

## Coming up next...

I'm liking template literals. The jury's still out on tagged templates. Up next we've got [promises](/learning-es6-promises/) in ECMAScript 6. I _promise_ it will be fun! 😀 Until then...
