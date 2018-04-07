---
title: Classes
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, classes]
cover: oop-scrabble-tiles.jpg
---

![O-O-P Scrabble tiles](oop-scrabble-tiles.jpg)

At the end of our discussion of the [new `for-of` operator](/learning-es6-for-of-loop/) I mentioned that I would next talk about either the new collections or iterators & iterables. Well, it turns out today, we'll be talking about neither! Instead I want to deep dive into ES6 classes. Let's go!

## TL;DR

ECMAScript 6 provides syntactic sugar over the prototype-based, object-oriented pattern in JavaScript. ES6 classes provide support for constructors, instance and static methods, (prototype-based) inheritance, and super calls. Instance and static properties are not (yet) supported.

```js
// Define base Note class
class Note {
	constructor(id, content, owner) {
		this._id = id;
		this._content = content;
		this._owner = owner;
	}

	static add(...properties) {
		// `this` will be the class on which
		// `add()` was called increment counter
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
let colorNote = ColorNote.add('My note', 'benmvp', '#0000ff');

// output: ID: note0
// Content: My Note
// Owner: benmvp
// Color: #0000ff
console.log(`${colorNote}`);

// output: true
console.log(Note.get('note0') === colorNote);
```

This is just a quick example of how ES6 classes work. Be sure to clone the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) and take a look at the [classes code examples](/learning-es6/#classes) page showing off the features in greater detail.

The example also uses default parameters, rest parameters, and the spread operator so you may want to revisit the [parameter handling](/learning-es6-parameter-handling/) article if you're not familiar. It also makes use of [template strings](/learning-es6-template-literals-tagged-templates/) for string interpolation, so you should read up on that as well.

## What’s all the fuss?

Before we jump into the nitty gritty details of the ES6 class features, let's take a moment to talk about why the features even exist. Prototype inheritance already exists in JavaScript so why create a new syntax that makes it seem like JavaScript has classes (when it technically doesn't)?

Well JavaScript has always confused new developers by it's lack of classes. Every other object-oriented language has them so their absence in JavaScript is pretty glaring. There are some folks out there who find the inclusion of ES6 classes pointless and misleading since, in the end, it's just syntax sugar over the underlying prototypal inheritance system; a system that is based on first-class functions and the ability to add methods onto their `prototype` property and call `new` on them.

However, the proliferation of JavaScript libraries and frameworks to try to make it easier to create classes is a pretty clear indication that there was need for a standard. Most developers don't know or care to know the details of prototypal inheritance, which is why they are using a library in the first place. Having a standard, native, convenient syntax for declaring classes makes them much easier to use and encourages interoperability across libraries and frameworks.

## Class declarations

Let's first talk about class declarations...

### Base class

Most developers have probably never had to do this because they create classes using their favorite library or framework, but the vanilla JavaScript way of creating a "class" looks something like:

```js
// constructor function
function Note(id, content, owner) {
    this.id = id;
    this.content = content;
    this.owner = owner;
}
```

The `Note` "class" is actually a function. We just call `new` on it to turn it into a class. The arguments for the "constructor" are defined as the arguments of the function. Just looking at the code, you wouldn't even know that `Note` is intended to be a class. Your only indication is that we're assigning the arguments to `this`. This is generally a good indication that the function will be used as a class.  But this is not at all intuitive, especially if you're new to JavaScript.

The equivalent ES6 code introduces the `class` keyword and looks like:

```js
class Note {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}
}
```

Anybody familiar with other programming languages can understand what's going on here. We're defining a class called `Note` and its constructor takes 3 parameters. Those parameters are then assigned to instance properties.

If a class doesn't need any special constructor handling, it can be omitted:

```js
class Note {

}
```

The class declaration is just syntactic sugar on top of the ES5 constructor function. The `Note` class will actually create a function that behaves like `constructor`:

```js
const Note = function(id, content, owner) {
    this.id = id;
    this.content = content;
    this.owner = owner;
};
```

The `const` is actually important in this recreation because classes declared using the ES6 class syntax are `const`. Their values cannot be reassigned after they are defined. This recreation also shows that ES6 classes are still functions even though syntactically they no longer look like functions. Here's the proof:

```js
// output: true
console.log(typeof Note === 'function');
```

### Inherited class

The biggest win in my opinion for this new ES6 class syntax is creating derived or inherited classes. The ES5 code to create a derived `ColorNote` class is even less clear:

```js
function ColorNote(id, content, owner, color) {
    Note.call(this, id, content, owner);
    this.color = color || '#ff0000';
}

ColorNote.prototype = new Note();
```

`ColorNote` inherits from `Note`, and in order to do so it must overwrite `Color.prototype` with a new object created from `Note` to inherit the methods. It also has to call `Note.call()` in the constructor as an equivalent of calling `super` constructor.

This code is as simple as it gets too. To be fully compliant we should use `Object.create`, check to ensure that `Note` is in fact a constructor function, etc. You'll find that there are lots of variations on "how to inherit a class in JavaScript." But once again, most developers have never had to worry about this because of libraries and frameworks. I imagine that most JavaScript developers (including this one) don't even know how to create an inherited class from scratch off the top of their head.

In ES6, derived classes use the `extends` keyword to specify the class from which the new class should inherit:

```js
class ColorNote extends Note {
	constructor(id, content, owner, color='#ff0000') {
		// super constructor must be called first!
		super(id, content, owner);
		this.color = color;
	}
}
```

The `extends` keyword is just ES6 syntactic sugar over the ES5 implementation. The prototypes are automatically adjusted and you can access the base class constructor using `super()`. The nice thing about the ES6 class syntax is that unlike the ES5 syntax, the `Note` identifier is only used in the class declaration (`extends Note`) and not in the implementation of the constructor.

If you specify a constructor in the inherited class (as in the above example), you must call `super()` before accessing `this`. The call to `super()` is what properly initializes `this`. If you don't call `super()`, you'll get an `Error` when you try to access `this`. You can of course omit the constructor as well.

```js
class ColorNote extends Note {

}
```

### Abstract base class

An abstract base class is a type of class that is exclusively intended to be inherited. It cannot be directly constructed. The main use case is for the inherited classes to have a common interface. Unfortunately, ES6 classes don't yet leverage the `abstract` keyword to make abstract base classes, but you _can_ use `new.target` (also introduced in ES6) to simulate it.

Within a constructor, `new.target` is a reference to the class that is to be constructed:

```js
class Note {
	constructor() {
		console.log(new.target === Note);
	}
}
let note = new Note();

// output: true
```

However, when an inherited class is constructed, `new.target` points to the inherited class:

```js
class Note {
	constructor() {
		console.log(new.target === Note);
	}
}
class ColorNote extends Note {

}
let colorNote = new ColorNote();

// output: false
```

So, to simulate an abstract base class, just throw an exception if `new.target` is the base class, which would mean that the base class was was attempted to be constructed:

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

## Instance methods

The syntax for defining methods in ES6 classes has been streamlined and resembles [object literal method shorthand](/learning-es6-enhanced-object-literals/#method-definition-shorthand) (but without the comma separators):

```js
class Note {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}

	toString() {
		return `ID: ${this.id}
			Content: ${this.content}
			Owner: ${this.owner}`;
	}
}
```

Methods (like `toString()` in the above example) get auto-added to the prototype instead of having to manually do it in ES5:

```js
function Note(id, content, owner) {
    this.id = id;
    this.content = content;
    this.owner = owner;
}

Note.prototype.toString = function() {
    return 'ID: ' + this.id +
        '\nContent: ' + this.content +
        '\nOwner:' + this.owner;
};
```

Just like with enhanced object literals, method names in classes can also be computed:

```js
class ColorNote extends Note {
	constructor(id, content, owner, color='#ff0000') {
		// super constructor must be called first!
		super(id, content, owner);
		this.color = color;
	}

	['to' + 'String']() { // computed method names are supported
		// Override `toString()`, but call
		// parent/super version first
		return `${super.toString()}
			Color: ${this.color}`;
	}
}
```

In the above example, the `ColorNote` inherited class redefines the `toString()` method from the `Note` base class. If an inherited class has a method with the same name as the base class, it _overrides_ the base class implementation. However, the inherited class can call `super.[methodName]` to call the base version, which is what is happening in the above example. We call `super.toString()` and concatenate additional information specific to `ColorNote` to it.

## Static methods

Static methods are indicated with the `static` keyword. They are methods on a class that do not depend on an instance of a class in their implementation. In short, they don't need `this` to be a reference to an instance. In fact, in a static method `this` is a reference to the class itself.

```js
class Note {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}

	static add(...properties) {
		// `this` will be the class on
		// which `add()` was called increment counter
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
}

Note._idCounter = -1;
Note._noteLookup = {};
```

I will explain `Note._idCounter` and `Note._noteLookup` in the [Properties section](#properties). This ES6 syntactic sugar simplifies creating a static method in comparison to the ES5 equivalent:

```js
function Note(id, content, owner) {
    this.id = id;
    this.content = content;
    this.owner = owner;
}

Note._idCounter = -1;
Note._noteLookup = {};

Note.add = function(content, owner) {
    var id, note;

    // `this` will be the class on which `add()` was called
    // increment counter
    ++this._idCounter;

    id = 'note' + this._idCounter;

    // construct a new instance of the note passing in the
    // arguments after the ID. This is so subclasses can
    // get all of the arguments needed
    note = new Note(id, content, owner);

    // add note to the lookup by ID
    this._noteLookup[id] = note;

    return note;
};

Note.get = function(id) {
    return this._noteLookup[id];
};
```

One thing to note with ES6 classes. If a base class has static methods (such as `Note.add()`), then those static methods are also available on the derived class (such as `ColorNote.add()`). This didn’t happen by default with ES5 classes unless the methods were explicitly copied over.

## Accessor properties

[Accessor properties](http://ejohn.org/blog/javascript-getters-and-setters/) were introduced in ES5 as a simplified way of providing getters and setters for JavaScript prototype functions. The same syntax works with ES6:

```js
class Note {
	constructor(id, content, owner) {
		if (new.target === Note) {
			throw new Error('Note cannot be directly constructed.')
		}

		this._id = id;
		this._content = content;
		this._owner = owner;
	}

	// read-only
	get id() { return this._id; }

	get content() { return this._content; }
	set content(value) { this._content = value; }

	get owner() { return this._owner; }
	set owner(value) { this._owner = value; }
}
```

This accessor property is created as non-enumerable, just like any other method would be, and is created on the `Note.prototype`. Accessor properties are just like methods in how they are defined except they have the `get`/`set` keyword in front of them.  And since they are just like methods, they can also be marked `static` as well.

Since accessor properties were introduced with ES5, they of course do not work in ES3 JavaScript engines such as Internet Explorer 8 and below. In addition, transpilers cannot transpile accessor properties down to ES3. Only use accessor properties if you only need to support higher than IE8.

## Properties

You may have noticed that our ES6 code defined some static properties like so:

```js
Note._idCounter = -1;
Note._noteLookup = {};
```

This is exactly how it's done in ES5. It's after the class is defined that we then add additional (static) properties to it. This is because ES6 class syntax does not support static properties. It also doesn't support instance properties either. We got around the lack of instance properties by defining our `id`, `content` & `owner` accessor properties within the class syntax, but those accessor properties were just wrappers of `_id`, `_content` & `_owner`, which were instance properties assigned in the constructor. There is no such work-around for static properties besides just adding properties after the class definition as we've done.

Although ES6 class syntax doesn't support static or instance properties, there is an [ES Class Fields & Static Properties](https://github.com/jeffmo/es-class-fields-and-static-properties) specification under development. It appears to still be in Stage 1 so it's unlikely to be included in ES7/ES2016. Babel already supports transpiling static & instance properties, and React makes heavy use of it already. A specification that is still under development is not guaranteed to ultimately make it to approved status (see [`Object.observe`](https://esdiscuss.org/topic/an-update-on-object-observe) as a huge example), so I tend to avoid using features prematurely.

The [rationale for instance properties](https://github.com/jeffmo/es-class-fields-and-static-properties#why):

> The current idiomatic means of initializing a property on a class instance does not provide an expressively distinct way to "declare" them as part of the structure of a class. One must assign to an expando property on `this` in the constructor -- or anywhere, really. This poses an inconvenience to tooling (and also often humans) when trying to deduce the _intended_ set of members for a class simply because there is no clear distinction between initialization logic and the intended shape of the class.

> Additionally, because instance-generated properties often need to be setup during class construction for object initialization, derived classes that wish to declare/initialize their own properties must implement some boilerplate to execute base class initialization first.

And the [rationale for static properties](https://github.com/jeffmo/es-class-fields-and-static-properties#why-1):

> Currently it's possible to express static methods on a class definition, but it is not possible to declaratively express static properties. As a result people generally have to assign static properties on a class after the class declaration -- which makes it very easy to miss the assignment as it does not appear as part of the definition.

Hopefully they (officially) come soon!

## Class expressions

As we saw earlier, ES6 classes are just syntactic sugar over prototype constructor functions. And as we know, there are two ways to define a function: a function declaration and a function expression. Similarly an ES6 class can be defined either via a class declaration (what we've seen thus far) or a class expression. Let's talk about the latter.

A class expression can be assigned to a variable:

```js
const Note = class {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}
};
```

A class expression can be passed into functions as arguments:

```js
const NoteWithFancy = mixin(
	class {
		constructor(id, content, owner) {
			this.id = id;
			this.content = content;
			this.owner = owner;
		}
	},
	{
		fancy: function() {
			// method to be added to prototype of class expression
		}
	}
)
```

Just like functions, class expressions can be immediately invoked to create immediately-invoked class expressions (IICE), essentially creating a one-off singleton:

```js
let noteSingleton = new (class {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}
}) (0, 'some content', benmvp);
```

Perhaps the most powerful aspect of derived classes in ECMAScript 6 is the ability to inherit from a class expression. We can use `extends` with _any_ expression. If that expression resolves to a function with `[[Construct]]` and a `prototype`, that expression can be used as a base class.

```js
class ColorNote extends (class {
	constructor(id, content, owner) {
		this.id = id;
		this.content = content;
		this.owner = owner;
	}
}) {
	constructor(id, content, owner, color='#ff0000') {
		// super constructor must be called first!
		super(id, content, owner);
		this.color = color;
	}
}
```

This means that an ES6 class can derive from an ES5 prototype constructor function!

```js
function Note(id, content, owner) {
    this.id = id;
    this.content = content;
    this.owner = owner;
}

class ColorNote extends Note {
	constructor(id, content, owner, color='#ff0000') {
		// super constructor must be called first!
		super(id, content, owner);
		this.color = color;
	}
}
```

Will talk more about mixing ES6 and ES5 classes in the upcoming [interoperability](#interoperability) section.

## Inheritable built-ins

Let's take a short break from syntactic sugar and talk about some new functionality introduced with ES6. Before in JavaScript, it wasn't (easily) possible to inherit from one of the built-in classes like `Array`, `RegEx`, `String`, etc. The most common class to inherit was `Array` in order to create stacks, queues, and other list-like data structures. Or you may want to create your own fancy array that inherits from `Array` in order to add helper methods like `first`, `last`, `take`, etc. that you find in libraries like [underscore.js](http://underscorejs.org/) and [lodash](https://lodash.com/). Imagine if the `jQuery` object actually inherited from `Array` instead of just being array-like. It'd be even more powerful.

We can also inherit from the new ES6 APIs like [`Promise`](/learning-es6-promises/) which we've already discussed and the new collections (`Map`, `Set`, `WeakMap` & `WeakSet`) that we'll be talking about soon.

One super useful class to inherit from is the `Error` class that is thrown with exceptions. Now when you need to throw an exception, you're no longer limited to the handful of native `Error` classes. You can create your own custom `Error` subclass. Remember our example from earlier to create an abstract base class? Instead of just throwing a generic `Error`, we can throw a custom-created `Error` subclass:

```js
class InheritanceError extends Error { }

class Note {
	constructor() {
		if (new.target === Note) {
			throw new InheritanceError('Note cannot be directly constructed.')
		}
	}
}
```

The class doesn't even have to do anything. But by create a custom `Error` class, if the error is ever thrown we can now check its type to know what type of error it was instead of having to rely solely on the message:

```js
try {
	new Note(72, 'Vanilla note', 'benmvp');
}
catch (e) {
	// output: true
	console.log(e instanceof InheritanceError);
}
```

The only gotcha with inheritable built-ins is that they cannot be transpiled nor shimmed. The JavaScript engine has to natively support it. This means that it will probably be a while until we can leverage this great functionality. All Internet Explorer browsers have to die first.

## ES6 classes vs ES5 prototype Functions

I've mentioned a few times how ES6 classes are just syntactic sugar over ES5 prototype constructor functions, but there actually are some differences between them that are worth talking about.

First, class declarations, unlike function declarations, are not hoisted to the top of their enclosing scope. Class declarations act like block-scoped variables so they exist in the [temporal dead zone](/learning-es6-block-level-scoping-let-const/#entering-the-temporal-dead-zone) until execution reaches the declaration. You cannot reference a class before it's declared.

Second, all code inside of class declarations runs in strict mode automatically. There’s no way to opt-out of strict mode inside of classes.

Third, all methods are non-enumerable, meaning `Object.keys` or `for-in` won’t iterate over them. This is a significant change from ES5 prototype constructor functions, where you need to use `Object.defineProperty()` to make a method non-enumerable.

Lastly, attempting to create an instance without using `new` or attempting to overwrite the class reference within a class method throws an `Error`. Some developers are annoyed by the fact that `new` **must** be used to create a class object, but I like it because it makes code more readable. It's clear that a class instance is being created.

So in sum, ES6 classes still are just syntactic sugar, but it's sugar with additional layers of protection.

## Interoperability

Before we wrap up, let's talk about how ES6 classes can coexist with existing ES5 prototype constructor functions. In theory, you should be able to have an ES6-style class extend from an ES5-style class. _In theory._ We already saw an example of a class we declared using ES6 syntax extending an ES5 prototype constructor function, but in practice this won't always work unfortunately.

As we also saw earlier, the way to create a class in ES5 is pretty onerous. As a result, many libraries and frameworks have their own "`extends`" method that allows developers to create their own classes. Something like:

```js
var Note = Backbone.Model.extend({
	id: 0,
	content: null,
	owner: null,

	toString: function() {
	    return 'ID: ' + this.id +
	        '\nContent: ' + this.content +
	        '\nOwner:' + this.owner;
	}
});
```

As you can see, our ES5 `Note` class doesn't directly inherit from `Object` but instead inherits from the library's base class ([`Backbone.Model`](http://backbonejs.org/#Model) in the above example) that was created to abstract the complexity of creating classes in ES5. The interoperability problem stems from the fact that `Backbone.Model.extend()` can pretty much do whatever it wants before and after it ultimately creates a prototype constructor function and attaches methods to its `prototype`.

It could manipulate that object literal we're passing into `Backbone.Model.extend()` in ways that a plain ES6 class will not be able to do. Let's look at another example to illustrate the point further. Let's say you're creating a custom [`Marionette.View`](http://marionettejs.com/docs/v2.4.4/marionette.view.html):

```js
var RegistrationView = Marionette.View.extend({
	ui: {
		registerButton: '.btn-register'
	},

	events: {
		'click @ui.registerButton': 'handleRegisterClick'
	},

	handleRegisterClick: function() {
		console.log('REGISTERED!');
	}
});
```

On the surface, `RegistrationView` looks like a class with one method (`handleRegisterClick()`) and two instance properties (`ui` and `events`). Now we already learned that ES6 classes don't support instance properties, but let's say we decide to leverage Babel's speculative implementation of the [properties specification](https://github.com/jeffmo/es-class-fields-and-static-properties). The ES6 equivalent would look something like:

```js
class RegistrationView extends Marionette.View {
	ui = {
		registerButton: '.btn-register'
	}
	events = {
		'click @ui.registerButton': 'handleRegisterClick'
	}

	handleRegisterClick() {
		console.log('REGISTERED!');
	}
}
```

The problem is that this doesn't work. `Marionette.View.extend()` does more than just enable a custom view to inherit from it. To give a simple summary, it does some processing of `ui`, `events` & a few other properties before they get added to the `prototype`. In the end when you have an instance of the view, `this.ui.registerButton` is no longer a selector `String`, but a reference to a `jQuery` object.

`Marionette.View.extend()` is a factory method similar to our `Note.add()` method. There's no way to declare a class using ES6 syntax to simulate what `Marionette.View.extend()` is doing behind the scenes (without some less-than-clean workarounds). Marionette would have to change it's class structure, much the way React did, in order to allow Marionette developers to write ES6 class declarations.

## JavaScript engine support

Naturally, not all of the transpilers support ES6 class syntax. Node and all the modern browsers except Firefox support a majority of the ES6 class syntax. Firefox still does not support the new syntax. Chrome, Opera & Node incorrectly require strict mode in order for the `class` keyword to be valid syntax.

I already mentioned that the transpilers cannot support inheritable built-ins. Unfortunately Safari & iOS don't yet support it either. They also don't support `new.target`, the trick we used to simulate an abstract base class. The transpilers also don't support `new.target`. They treat it as invalid syntax.

## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#classes) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser. You can also get some practice with ES6 classes using [ES6 Katas](http://es6katas.org/).

There is also lots of great reading to deep dive into ES6 classes:

- [Why Backbone.js and ES6 Classes Don't Mix](http://benmccormick.org/2015/04/07/es6-classes-and-backbone-js/) by [Ben McCormick](https://twitter.com/ben336)
- [Classes](http://exploringjs.com/es6/ch_classes.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
- [Classes](https://leanpub.com/understandinges6/read#leanpub-auto-classes) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
- [ES6 Classes in Depth](http://ponyfoo.com/articles/es6-classes-in-depth) in [_ES6 in Depth_](http://ponyfoo.com/articles/tagged/es6-in-depth) by [Nicolas Bevacqua](https://twitter.com/nzgb)
- [ES6 in Depth: Classes](https://hacks.mozilla.org/2015/07/es6-in-depth-classes/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by Eric Faust
- [ES6 in Depth: Subclassing](https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/) in [_ES6 in Depth_](https://hacks.mozilla.org/category/es6-in-depth/) by Eric Faust

## Coming up next...

Boy, talk about a lengthy diversion. I think I'll get back on track and take a look at the new collection APIs. I've mentioned them in a couple of articles now, so it'd be nice to actually talk about them deeply. They are all also _iterables_ so it'll set us up nicely for the iterators article which will follow them. Until then...
