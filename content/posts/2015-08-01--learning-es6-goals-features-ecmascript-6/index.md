---
title: Goals & Features of ECMAScript 6
subTitle: The Learning ES6 Series
author: Ben Ilegbodu
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6]
cover: es6-logo.png
---

In this blog post, we’ll take a look at the goals and features of ECMAScript 6. If you haven’t read it already, be sure to check out the first blog post in this [_Learning ES6_ series](/learning-es6-series/) about the [History of ES6](/learning-es6-history-of-ecmascript/) where I walked through the 20-year history of JavaScript and ECMAScript. It really sets the stage of how we’ve gotten to the point we’re at now.

![ES6 logo](es6-logo.png)

## Goals of ES6

The main goal for the [ES6 / Harmony project](http://wiki.ecmascript.org/doku.php?id=harmony:harmony) was to fix some of JavaScript’s gotchas and add a whole bunch of functionality that we find in other popular programming languages that have been long missing in JavaScript. At the same time, the TC39 wanted keep the language relatively lightweight and maintain backwards compatibility in order to not break all of the existing code on the web.

They also wanted to make JavaScript a better language for writing code. They realized that applications written in JavaScript have become quite large over the years and wanted JavaScript to be better for writing these complex apps. So they added [native modules](http://exploringjs.com/es6/ch_modules.html) to ES6. Modules also helped the committee make the shared JavaScript libraries used by all those complex applications easier to write as well.

Lastly, TC39 wanted to improve the interoperability of JavaScript by adopting existing standards developed by the community. For instance, ES6 adds [native class support](http://exploringjs.com/es6/ch_classes.html) and the syntax is based on how constructor functions are currently used. [Arrow functions](/learning-es6-arrow-functions/) work similarly to their [CoffeeScript](http://coffeescript.org/) equivalents. Modules bear similarity to the [CommonJS](http://www.commonjs.org/) module format.

## Features of ES6

The list of features added to ECMAScript 6 is a veritable laundry list of JavaScript goodies: functionality you’ve been wanting in JavaScript forever (and couldn’t believe never existed in the first place), as well as features you’ll probably never ever use unless you’re in the small minority of us who like to write JavaScript libraries.

Here’s the long list of 31 features (in alphabetical order):

- `__proto__`
- [Array APIs](http://exploringjs.com/es6/ch_arrays.html)
- [Arrow functions](/learning-es6-arrow-functions/)
- [Block scoping](/learning-es6-block-level-scoping-let-const/)
- [Classes](http://exploringjs.com/es6/ch_classes.html)
- [Default parameters](/learning-es6-parameter-handling/)
- [Destructuring](/learning-es6-destructuring/)
- [Enhanced object literals](/learning-es6-enhanced-object-literals/)
- [Generators](http://exploringjs.com/es6/ch_generators.html)
- [Iterators](http://exploringjs.com/es6/ch_iteration.html)
- [Maps](http://exploringjs.com/es6/ch_maps-sets.html#leanpub-auto-map)
- [Math APIs](http://exploringjs.com/es6/ch_numbers.html)
- [Modules](http://exploringjs.com/es6/ch_modules.html)
- [Module loaders](http://exploringjs.com/es6/ch_modules.html#sec_module-loader-api)
- [Object APIs](http://exploringjs.com/es6/ch_oop-besides-classes.html#leanpub-auto-new-methods-of-object)
- [Promises](/learning-es6-promises/)
- [Proxies](http://exploringjs.com/es6/ch_proxies.html)
- [Reflect API](http://exploringjs.com/es6/ch_proxies.html#leanpub-auto-reflect)
- [RegEx APIs](http://exploringjs.com/es6/ch_regexp.html)
- [Rest parameters](/learning-es6-parameter-handling/)
- [Sets](http://exploringjs.com/es6/ch_maps-sets.html#leanpub-auto-set)
- [Spread operator](/learning-es6-parameter-handling/)
- [String APIs](http://exploringjs.com/es6/ch_strings.html)
- [Subclassable built-ins](http://exploringjs.com/es6/ch_classes.html#leanpub-auto-the-details-of-subclassing)
- [Symbols](http://exploringjs.com/es6/ch_symbols.html)
- [Tail calls](http://exploringjs.com/es6/ch_tail-calls.html)
- [Template literals](/learning-es6-template-literals-tagged-templates/)
- [Typed arrays](http://exploringjs.com/es6/ch_typed-arrays.html)
- [Unicode](http://exploringjs.com/es6/ch_unicode.html)
- [Weak maps](http://exploringjs.com/es6/ch_maps-sets.html#sec_weakmap)
- [Weak sets](http://exploringjs.com/es6/ch_maps-sets.html#leanpub-auto-weakset)


I’ve seen folks group these features in many different ways, but I like the way [Christian Heilmann](https://twitter.com/codepo8) organized them in his talk about [_Stapling and patching the web of now_](http://www.slideshare.net/cheilmann/stapling-and-patching-the-web-of-now-forwardjs3-san-francisco) at the [ForwardJS 3 conference](http://forwardjs.com/forward3/).

### Syntactic sugar features

These are the features which you can pretty much already do in ES5, but the new ES6 syntax makes doing them a lot more straightforward by supporting them natively. If you’re just getting started with ES6, these are the ones you’re more likely to use right off the bat. And best of all, they have the greatest level of support. They are:

- Array APIs
- Arrow functions
- Default parameters
- Destructuring
- Math APIs
- Object APIs
- Object literal features
- RegEx APIs
- Rest parameters
- Template literals
- Spread operator
- String APIs

### Features for building scalable applications

The next group of features narrows the scope of its audience to those JavaScript developers building large, scalable applications. The features are less about making it easier to _write_ code, but more about making it easier to _organize_ code so that it doesn’t become a monolithic behemoth:

- Block scoping
- Classes
- Generators
- Iterators
- Modules
- Promises
- Tail calls
- Typed arrays
- Unicode

### Features for library builders

This last group of features are for the few that build shareable Javascript libraries, like [jQuery](https://jquery.com/), [React](http://facebook.github.io/react/), or [d3.js](http://d3.js/).

- `__proto__`
- Maps
- Module loaders
- Proxies
- Reflect API
- Sets
- Subclassable built-ins
- Symbols
- Weak map
- Weak sets


Axel Rauschmayer [asked his followers on Twitter](https://twitter.com/rauschma/status/623111275359379456) which of the ES6 features were their favorites, which resulted in a [top ten list of ES6 features](http://www.2ality.com/2015/07/favorite-es6-features.html?m=1):

- [**Arrow functions**](/learning-es6-arrow-functions/) (sugar) - a short-hand form of an anonymous function
- **Modules** (library) - provide a modular of organizing and loading JavaScript code
- [**Destructuring**](/learning-es6-destructuring/) (sugar) - A concise yet flexible way of mapping values from objects or arrays into variables
- **Generators** (apps) - specialized functions that create iterators using `yield` keyword
- [**Promises**](/learning-es6-promises/) (apps) - an alternative to callback functions for handling asynchronous operations
- [**Template literals**](/learning-es6-template-literals-tagged-templates/) (sugar) - much cleaner way to build up string values
- [**Spread operator **](/learning-es6-parameter-handling/) (sugar) - turns elements of an array into arguments of a function call
- [**Enhanced object literals**](/learning-es6-enhanced-object-literals/) (sugar) - various shorthand syntaxes for building up object literals
- [**Block scoping**](/learning-es6-block-level-scoping-let-const/) (apps) - scoping variables to blocks via `let` keyword
- [**Rest parameters**](/learning-es6-parameter-handling/) (sugar) - allows you to get an array representing the "rest of the parameters," eliminating the need to use `arguments`


As you can see, the top 10 features span across all 3 groups. I will definitely be diving deep into each of these 10 features. They will be our main focus. I was surprised to not see default parameters on the list and they’re one of my favorite features, so I’ll dive deep on them when I discuss rest parameters and the spread operator. I’ll try to go deep on classes as well. I would like to take a quick look at the various APIs, maps & sets, and possibly iterators. Everything else, you will have to read up on your own.

But before we dive head first into all of the features, I want to first discuss how we can use this functionality in real environments and not just in ES6 playgrounds. Then when we start looking at the features, we can have a conversation about whether they’re supported enough to use or not yet.
