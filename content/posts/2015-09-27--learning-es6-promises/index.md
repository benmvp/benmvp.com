---
title: Promises
subTitle: The Learning ES6 Series
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, promises, deferreds]
cover: pinky-promise.jpg
---

![Pinky promise fingers](pinky-promise.jpg)

Like clockwork the [_Learning ES6_ series](/learning-es6-series/) continues on, looking at _promises_. It will be the first feature we've looked at in this series that is more than syntactic sugar. But promises aren't new to JavaScript. They've existed for quite some time in helper libraries. ECMAScript 6 now brings native promise support to JavaScript via the `Promise` API. Let's jump right in!

## TL;DR

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

## Asynchronous programming background

Because JavaScript originated as a programming language for the web, asynchronous programming has existed in it since its inception. Program execution couldn't wait for user interactions (such as clicks and key presses) before continuing like you would see in console applications. Asynchronous programming in JavaScript provides mechanisms for an application to be notified when events it cares about have just happened.

### Event handlers

Event handlers are what I call the first generation of asynchronous programming in JavaScript. You simply assigned a function to an event property and it was called whenever that event happened. Here's the event handler way of making an XHR request.

```js
var url = '/json/data.json',
	request = new XMLHttpRequest();

request.open('GET', url);

request.onload = function() {
	if (request.status === 200) {
		try {
			var responseJson = JSON.parse(request.responseText);

			// do something with daa
		}
		catch (e) {
			console.error(e);
		}
	}
	else {
		console.error('request failed!');
	}
};

request.onerror = function(e) {
	console.error(e);
}

try { request.send(); }
catch (e) { console.error(e); }		
```

This style is so old that it may actually be unfamiliar for some JavaScript developers. Most developers nowadays are used to callbacks.

### Callbacks

JavaScript libraries, like jQuery, aimed to ease development pains by hiding event handlers behind functions that called a specified _callback_ function when the event was trigged. This programming style of using callbacks is also called _continuation-passing style_ (CPS) because the next step (the continuation) is explicitly passed in as a parameter:

```js
function fetch(url, callback) {
	var request = new XMLHttpRequest();

	request.open('GET', url);

	request.onload = function() {
		var data, error;

		if (reques.status === 200) {
			data = request.responseText;
		}
		else { error = new Error('request failed!'); }

		callback({data:data, error:error});
	};

	request.onerror = function(e) {
		callback({error: e});
	}

	try { request.send(); }
	catch (e) { callback({error: e}); }		
}

fetch('/json/data.json', function(responseObj) {
	if (!responseObj.error) {
		try {
			console.log('data!', JSON.parse(responseObj.data));
		}
		catch (e) { console.error(e); }
	}
	else { console.error(responseObj.error);}
});
```

The callback pattern, while more convenient to use than event handlers, still had several drawbacks. The first is apparent in the example. The callback function has two ways of handling errors: `if-else` on the returned data and `try-catch` around any operations within the function.

Secondly, callback functions proved to be untenable when developers had callbacks within callback within callbacks. This affectionately became known as _callback hell_. Let's say for example after you retrieved `/json/data.json` you needed to make another `fetch` request _based_ on the returned data from the first request:

```js
fetch('/json/data.json', function(responseObj) {
	if (!responseObj.error) {
		try {
			var data = JSON.parse(responseObj.data);

			console.log('main data', data);

			// now call `fetch` again to retrieve new data
			// based on the response data
			fetch(data.url, function(responseObjInner) {
				if (!responseObjInner.error) {
					console.log('inner data', responseObjInner.data);
				}
				else { console.error(responseObjInner.error);}
			});
		}
		catch (e) { console.error(e); }
	}
	else { console.error(responseObj.error);}
});
```

It's already a mess and we're only two levels deep without any real implementation!

Attempting to manage multiple active callbacks is also pretty complicated. Imagine you wanted to fire off multiple `fetch` requests simultaneously and then you wanted to process the results when they are _all_ done? Or what if you wanted to time out a `fetch` request after it had run for more than 10 seconds? It's doable, but challenging with callbacks.

Enter promises.

### Promises

Promises ushered in the 3rd generation of asynchronous programming. A promise represents the eventual result of an asynchronous operation. Instead of registering a callback in the call to an async function (such as `fetch`), the function returns a promise. The caller then registers callbacks with the _promise_ (not the function) to receive either the promise's eventual value from the async operation or the reason why the promise could not be fulfilled.

ECMAScript 6 brings native promise support to JavaScript following the [Promise/A+](https://github.com/promises-aplus/promises-spec) standard. Promises have actually existed for quite some time in JavaScript as external libraries. The following libraries also follow the Promise/A+ standard:

 - [RSVP.js](https://github.com/tildeio/rsvp.js/) by [Stefan Penner](https://twitter.com/stefanpenner)
 - [ES6 Promise Polyfill](https://github.com/jakearchibald/es6-promise) by [Jake Archibald](https://twitter.com/jaffathecake)
 - [Native Promise Only](https://github.com/getify/native-promise-only) by [Kyle Simpson](https://twitter.com/getify)
 - [Q.Promise](https://github.com/kriskowal/q#using-qpromise) by [Kris Kowal](https://twitter.com/kriskowal)
 - [Lie](https://github.com/calvinmetcalf/lie) by [Calvin Metcalf](https://twitter.com/CWMma)
 - [ES6 Shim](https://github.com/paulmillr/es6-shim) by [Paul Miller](https://twitter.com/paulmillr)
 - [when](https://github.com/cujojs/when) by [cujoJS](http://cujojs.com/)

The new [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) provides a `fetch` method that is an updated and promise-backed version of `XMLHttpRequest`. In fact, moving forward, all asynchronous APIs will be promise-backed. If we wanted to turn our callback-style `fetch` function from before to be promised-backed, we could create a poor man's version of the new Fetch API:

```js
function fetch(url) {
	// return a Promise object
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();

		request.open('GET', url);

		request.onload = function() {
			if (request.status === 200) {
				// fulfill the promise
				resolve(request.responseText);
			}
			else {
				// reject the promise
				reject(new Error('request failed!'));
			}
		};

		request.send();
	});
}

fetch('/json/data.json')
    .then(response => {
    	let data = JSON.parse(response.text);

    	console.log('main data', data);

    	// now call `fetch` again to retrieve new data
    	// based on the response data
    	return fetch(data.url);
    })
    .then(response => {
    	console.log('inner data', response);
    })
    .catch(e => {
    	// catching all failures!
    	console.error(e);
    });
```

Much nicer to use, eh? Don't worry if you don't understand everything going on. We're going to spend the rest of our time breaking apart this example. You'll notice that callbacks still exist, but they are attached to the promise and not the function itself. A different promise callback is called depending on the outcome.

The error callback (`catch()`) is particularly convenient for two reasons:

 1. It's a single style of handling errors. Remember the the `if-else` and all the `try-catch` blocks in the callback-style approach? `try-catch` isn't needed in creating a `Promise` nor in handling one.
 1. You can handle the errors from executing the async request (XHR in this case) or errors introduced by handling the async request (in `then()` callbacks) from a single location (`catch()` callback).

Point #2 is one of the big reasons why jQuery's [`Deferred` object](http://api.jquery.com/category/deferred-object/) is not Promise/A+. Instead, errors in handling the async request that are uncaught are bubbled up to `window.error`. However, jQuery 3's `Deferred` object will be Promise/A+.

By the way, if you're interested in a polyfill for Fetch API, check out Github's [`whatwg-fetch`](https://github.com/github/fetch) library.

### Reactive programming

Reactive programming (built on top of functional programming) is positioning itself as the next generation of asynchronous programming. [Reactive extensions](https://github.com/Reactive-Extensions/RxJS) implements reactive programming in JavaScript. From the `README`:

> One question you may ask yourself, is why RxJS? What about Promises? Promises are good for solving asynchronous operations such as querying a service with an XMLHttpRequest, where the expected behavior is one value and then completion. The Reactive Extensions for JavaScript unifies both the world of Promises, callbacks as well as evented data such as DOM Input, Web Workers, Web Sockets. Once we have unified these concepts, this enables rich composition.

But let's not get ahead of ourselves here. Let's stick to learning about promises.

## Making a promise

A promise can be in one of the following three states:

 - **Unsettled/pending** - the promise's async operation has yet to compute its result
 - **Settled: fulfilled** - the promise's async operation has completed successfully and computed a result to return
 - **Settled: rejected** - the promise's async operation did not complete successfully, most likely due to an error

A promise is settled (the async operation has completed) if it is either fulfilled or rejected. A promise can only transition from unsettled to settled **one** time and it remains settled. Attempting to settle an already settled promise does nothing. Here's a visualization of the (short) lifecycle of a promise from [Axel Rauschmayer](http://exploringjs.com/es6/ch_promises.html):

![lifecyle of a promise](http://exploringjs.com/es6/images/promises----promise_states_simple.jpg)

Let's take a look again at the `Promise` constructor in our promised-back `fetch` function:

```js
function fetch(url) {
	// return a Promise object
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();

		request.open('GET', url);

		request.onload = function() {
			if (request.status === 200) {
				// fulfill the promise
				resolve(request.responseText);
			}
			else {
				// reject the promise
				reject(new Error('request failed!'));
			}
		};

		request.send();
	});
}
```

The function passed to the `Promise` constructor is called the _executor_. If the async function's computation went well, the executor sends the result via `resolve()`. This typically will fulfill the promise. However, if you resolve the promise with another `Promise` (more on this later), the promise may not be fulfilled.

If an error happened or the async operation failed, the executor informs the user of the promise via `reject()`. This always rejects the promise. Like `throw` in plain old JavaScript, it's suggested that you call `reject()` with an `Error` object. On of the benefits of passing along an `Error` object is that it will capture a stack trace, which makes debugging much easier.

If an error is thrown _within_ the executor, the promise's `reject()` handler is automatically called.

```js
new Promise((resolve, reject) => {
	throw new Error('Error!');
});
```

So we're intentionally throwing an error within the executor, but lets pretend that this error happened while performing the async operation (like making an XHR request). There is an implicit `try-catch` inside of every executor. This means that any errors are caught and passed along to the `reject()` handler. Basically, the example would be equivalent to:

```js
new Promise((resolve, reject) => {
	try {
		throw new Error('Error!');
	}
	catch (e) { reject(e); }
});
```

## Claiming a promise

Consumers of promises are notified of either fulfillment or rejection by what are called _reactions_. These are callbacks registered with the `then()` method on a `Promise`. From our promised-backed `fetch` earlier:

```js
fetch('/json/data.json')
    .then(response => {
    	// handle response data
    }, error => {
    	// handle errors
    });
```

The `then()` method accepts two arguments:

 1. The first argument is the function to call when the promise is fulfilled. Any additional data related to the async operation (such as the response from the XHR request) is passed into this fulfillment reaction
 1. The second argument is the function to call when the promise is rejected. The rejection reaction can also be passed additional data. As mentioned, this usually is an `Error` object.

If you are only interested in a fulfillment, you can omit the second parameter to `then()`:

```js
fetch('/json/data.json')
    .then(response => {
    	// handle response data
    });
```

If you're only interested in a rejection, you can skip the first parameter to `then()` by passing `null`:

```js
fetch('/json/data.json')
    .then(null, e => {
    	// handle errors
    });
```

Alternatively, you can use the `catch()` method which is more succinct:

```js
fetch('/json/data.json')
    .catch(e => {
    	// handle errors
    });
```

The convention is to use `then()` exclusively for fulfillments and `catch()` exclusively for errors. This nicely labels the reactions. The advantage of using `then()` and `catch()` over the old-generation event handlers and callbacks is that it's completely clear whether the code is handling success or failure. Many times with callbacks there is a single callback and within it you have to do an `if` check against any errors.

By the way, if you fail to attach a rejection reaction to a promise and an error does occur, the promise will fail gracefully. The failure will happen silently. The convention is to always attach a rejection reaction to a promise even if all it ends up doing is logging the failure.

One super convenient feature of promises is that there are never any race conditions. It doesn't matter when you call the `then()` method of a promise. If you're passed a `Promise` that is already settled and then call `then()`, you will receive the cached settled value immediately. Pretty nice! Speaking of settled promises...

## Creating settled promises

Normally you would create an unsettled promise via the `Promise` constructor. The promise would get settled once the async operation has been successful (fulfilled) or unsuccessful (rejected). These are the examples we've just covered. However, you can create "immediately" settled promises in either the fulfilled or rejected state.

Let's say we wanted to create an "immediately" fulfilled promise:

```js
// Promise.resolve() creates a promise
// that is "immediately" settled & fulfilled.
// You can optionally pass a value
Promise.resolve('Ben')
    .then(name => {
    	// output: Ben
    	console.log(name);
    });
```

The `Promise.resolve()` factory method returns an "immediately" fulfilled promise on which we call its `then()` method to get the passed value. If a rejection reaction were added to this promise, it would never get called because the promise will never be in a rejected state.

One interesting feature with promises is that they are required to _always_ be asynchronous. That's why I've been saying "immediately" fulfilled. Even though there's no async operation when using `Promise.resolve` the fulfillment reaction is still handled asynchronously because it is added to the execution queue. Any code after the promise will be executed before the `console.log` output. For instance:

```js
// Promise.resolve() creates a promise
// that is "immediately" settled & fulfilled.
// You can optionally pass a value.
Promise.resolve('sin')
    .then(problem => {
    	// output: sin
    	console.log(problem);
    });

// Even though the promise is "immediately"
// fulfilled, all promises are required to
// be asynchronous. Therefore the fulfillment
// reaction is added to the execution queue
// and the following line executes first.
console.log('this executes before the fulfillment');
```

You can also "immediately" reject promises using the `Promise.reject()` factory method. This works exactly like `Promise.resolve()` except that the promise is created in the rejected state.


```js
// Promise.reject() creates a promise that
// is "immediately" settled & rejected. You
// should pass an `Error` object.
Promise.reject(new Error('Pride!'))
    .catch(e => {
    	console.error(e);
    });

// Similarly, because promises *must* be
// asynchronous, this line will execute first
console.log('this executes before the rejection');
```

And just like with `Promise.resolve()`, if a fulfillment reaction (`then()`)  were added to this "immediately" rejected promise, that handler would never be called.

What happens when you pass a `Promise` to `Promise.resolve()` or `Promise.reject()`? Nothing. The promise is just returned:

```js
let fetchPromise = fetch('/json/data.json');

// Fulfilling or rejecting an already existing
// promise does nothing. It's just returned
// output: true
console.log(Promise.resolve(fetchPromise) == fetchPromise);
console.log(Promise.reject(fetchPromise) == fetchPromise);
```

Why in the world would you pass a `Promise` object to `Promise.resolve()` or `Promise.reject()`? Well it'll make sense after your learn about _thenables_.

### Thenables

A `thenable` as defined by the Promise API spec is any object that has a `Promise`-style `then()` method. This means that the method accepts two arguments that are functions (`resolve()` and `reject()`). Therefore, a `Promise` is also a `thenable`.

If this were C# or Java, there would be an `IThenable` interface that defined one method called `then` which accepted two lambda functions. The `Promise` class would implement the `IThenable` interface. But because `IThenable` is an interface, any class could implement it. Although JavaScript doesn't have interfaces, the concept is still the same:

```js
// Resolving a `thenable` returns a `Promise`
// on which you can add `then()` or `catch()`
// reactions
Promise.resolve({
	// A `thenable` is an object that
	// has a Promise-style `then` method.
	// Using method definition shorthand!
	then(resolve, reject) {
		resolve('Ben');
	}
})
    .then(name => {
    	// using property value shorthand!
    	// output: {name: 'Ben'}
    	console.log({name});
    });
```

The `thenable` object in this example is just a simple object literal (using [object method shorthand](/learning-es6-enhanced-object-literals/#method-definition-shorthand)). It's not at all like a full-fledged `Promise` object except for the fact that it has a `then()` method. It implements the "`IThenable`" interface.

And thenables are not limited to object literals. _Any_ object that has a Promise-style `then()` method is a `thenable`, including the jQuery [Deferred object](http://api.jquery.com/deferred.then/):

```js
var $fetch = function(url) {
	return Promise.resolve($.get(url));
};

$fetch('/json/data.json').then(response => {
	console.log('response', response);
});
```

The return value from `$.get(url)` is a `thenable` (a jQuery-style promise). The example calls `Promise.resolve()` on that return value to create an ES6-style `Promise`. That's some pretty nice interoperability.

As you might've guessed, any `thenable` can also be converted into a rejected `Promise` using `Promise.reject()`. When in doubt about whether or not the object you have is an ES6-style `Promise`, just go ahead and call `Promise.resolve()` or `Promise.reject()` on the object. If the object is already a `Promise`, nothing will happen to it. Otherwise, you'll be able to convert a `thenable` into a `Promise`.

This allows for chaining of promises to accomplish more complex asynchronous behavior that you could never easily accomplish with callbacks.

## Chaining promises

The `Promise` API functionality we've leveraged so far has been great. I would definitely use it over callbacks or event handlers, even if it is only a minor improvement. But promises demonstrate their real power when you leverage their ability to be chained together.

You see, each call to `then()` or `catch()` under the hood actually creates and returns another promise. Remember our example from above?

```js
fetch('/json/data.json')
    .then(response => {
    	var data = JSON.parse(response);

    	console.log('main data', data);

    	// now call `fetch` again to retrieve new data
    	// based on the response data, which returns
    	// a promise
    	return fetch(data.url);
    })
    .then(response => {
    	console.log('inner data', response);

    	// an empty fulfilled promise is returned
    });
```

Without chaining, the code would look something like this:

```js
let fetchPromise = fetch('/json/data.json');

let innerFetchPromise = fetchPromise.then(response => {
	var data = JSON.parse(response);

	console.log('main data', data);

	// now call `fetch` again to retrieve new data
	// based on the response data, which returns
	// a promise
	return fetch(data.url);
});

innerFetchPromise.then(response => {
	console.log('inner data', response);

	// an empty fulfilled promise is returned
});
```

And of course that last call to `innerFetchPromise.then()` would also return a promise. We just didn't need to consume it.

### Returning values

Another key aspect of promise chaining is the ability pass data from one promise onto the next. When an unsettled promise is created and the async operation is successful, typically a value (such as the XHR response) is passed to `resolve()` by the executor to fulfill the promise. Well, value passing doesn't stop there. Promise reactions can continue to pass along values by returning them.

```js
// Create immediately fulfilled promise
// that returns 'Ben'
Promise.resolve('Ben')
    .then(firstName => {
    	// output: Ben
    	console.log(firstName);

    	return `${firstName} A.`;
    })
    .then(firstAndMiddle => {
    	// output: Ben A.
    	console.log(firstAndMiddle);

    	return `${firstAndMiddle} Ilegbodu`;
    })
    .then(fullName => {
    	// output: Ben A. Ilegbodu
    	console.log(fullName);
    });
```

Notice the use of [ES6 string interpolation](/learning-es6-template-literals-tagged-templates/#template-literal-interpolation)! Of course this is a very contrived example, but passing values can be useful if you need to take the result of a settled promise, process that result and create a new promise from it. If the processing can potentially throw errors, you'll be able to easily catch those errors along with any other errors happening in the promise chain. You can jump ahead to [Error handling](#error-handling) if you're interested.

You're more likely to want to return a `Promise` (or `thenable`) than actual values. More than likely you could do all of your value processing in a single `then()` reaction. But if you wanted to make sequential async operations (like XHR requests that depend on the response of a previous request), after getting the response of the first operation, you would kick off the next operation based on data from the first and return the second operation's `Promise`. We saw an example of this earlier:

```js
fetch('/json/data.json')
    .then(response => {
    	var data = JSON.parse(response);

    	console.log('main data', data);

    	// now call `fetch` again to retrieve new data
    	// based on the response data, which returns
    	// a new promise
    	return fetch(data.url);
    })
    .then(response => {
    	console.log('inner data', response);
    });
```

Like we discussed in the section on [Callbacks](#callbacks), the callback version of this code is the makings of _callback hell_ because the call to the second `fetch` would be in the callback handler of the first. Promises nicely flatten this out with chaining. They also provide a unified location to handle errors.

### Error handling

The `catch()` reaction is the way you handle errors with promises. We learned all about `catch()` when we learned about [claiming promises](#claiming-a-promise). Promise chaining now allows you to catch any errors that may occur in a previous `then()` or `catch()` reaction.

```js
// Create immediately fulfilled, but
// empty promise
Promise.resolve()
    .then(() => {
    	// throw an `Error` which should be
    	// caught by `catch()`
    	throw new Error('oh no!');
    })
    .catch(e => {
    	// output: 'oh no!' error with call
    	// stack info
    	console.error(e);
    });
```

This sort of thing just wasn't feasible with callbacks unless you explicitly added a `try-catch` inside the callback. But what if your rejection reaction itself throws an error? Well you can `catch()` that too!

```js
// Create immediately fulfilled, but
// empty promise
Promise.resolve()
    .then(() => {
    	// throw an `Error` which should be
    	// caught by `catch()`
    	throw new Error('oh no!');
    })
    .catch(e => {
    	// output: 'oh no!' error with call
    	// stack info
    	console.error(e);

    	// throw another `Error` within this
    	// error handler, which can be caught
    	// by a follow-up error handler
    	throw new Error('again?!?!');
    })
    .catch(e => {
    	// output: 'again?!?!' error
    	console.error(e);
    });
```

Interestingly enough, if you decide to return a value in your rejection reaction instead of throwing an `Error`, it becomes a fulfillment value for the next promise. This allows you to specify default values to use in case of failure without having to break chaining.

```js
fetch('/json/bad-data.json')
    .catch(() => {
    	// There was an error retrieving data
    	// so just return default data
    	return JSON.stringify({name: 'Ben Ilegbodu'});
    })
    .then(response => {
    	// at this point we should always have
    	// valid data regardless of if the `fetch`
    	// was successful
    	// output: {name: 'Ben Ilegbodu'}
    	console.log(response);
    });
```

Pretty helpful, huh? But wait, there's more! The `catch()` does not need to immediately follow the promise that caused the error. Errors are passed down the promise chain until a `catch()` reaction is found. If no reject reaction is found, the error fails silently.

```js
// Create immediately rejected and empty
// promise
Promise.reject(new Error('FAIL!'))
    .then(() => {
    	// because the promise is rejected,
    	// this fulfillment reaction is never called
    })
    .then(() => {
    	// neither is this one
    })
    .catch(e => {
    	// instead this reject reaction is called
    	// to handle the rejection that happened further
    	// up the chain
    	// output: 'FAIL!' error
    	console.error(e);
    });
```

Even more helpful! If you stick a `catch()` at the end of your promise chain it'll always get called no matter where an error occurs. Even if all the `catch()` does is log the error and rethrow, it's a good practice to perform.

## Promise composition

Up until this point, we have composed promises using sequential chaining. The next promise doesn't get handled until the previous promise is settled (either fulfilled or rejected). However, there are times when you will want to track multiple async operations at the same time in order to determine what to do next.

ECMAScript 6 provides additional ways of composing promises via the `Promise.all` and `Promise.race` helpers.

### `Promise.all`

Let's say you have multiple async requests you want to fire off in _parallel_ and then once they are done you want to use their results to do some additional processing. In the callback world you would have to maintain a variable that keeps track of which requests have returned and which haven't. You will also need a data structure that would contain the results (and potentially in the order in which the requests were called). While this is doable with callbacks, it's unnecessarily complex and error-prone, especially when you also need to do error handling.

The `Promise.all` method makes this significantly easier. It takes an array of promises as a parameter and returns a `Promise` that will be fulfilled with an array of response values only when _all_ of the promises are fulfilled.

```js
// Return a promise that is only fulfilled once
// all of the url fetch requests are fulfilled
// via Promise.all
function fetchAll(...urls) {
	// Use rest parameter to aggregate URLs
	// into an array

	return Promise.all(
		// map the array of urls into an array
		// of `fetch` promises
		urls.map(fetch)
	);
}

// Make an XHR request for each URL and
// process the results once they've *all*
// completed
fetchAll(
	'/json/data.json',
	'/json/data2.json',
	'/json/data3.json',
	'/json/data4.json',
	'/json/data5.json'
)
    .then(responses => {
    	// `responses` is the array of response
    	// data

    	// output: 5
    	console.log(responses.length);

    	// more processing of results
    });
```

Much easier, huh? Much more readable too. The example also leverages [rest parameters](/learning-es6-parameter-handling/#rest-parameters). I like to think of it as somewhat analogous to [`Array.prototype.every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every), which returns `true` (success) if all of the elements of the array pass the test implemented in the callback.

If any of the promises are rejected (i.e. fail), then the aggregator `Promise` from `Promise.all` also is rejected. You can use the `catch()` reaction to catch these failures.

```js
// Make an XHR request for each URL and
// process the results once they've *all*
// completed
fetchAll(
	'/json/data.json',
	'/json/data2.json',
	'/json/data3.json',
	'/json/data4.json',
	'/json/data5.json'
)
    .then(responses => {
    	// `responses` is the array of response
    	// data

    	// output: 5
    	console.log(responses.length);

    	// more processing of results
    })
    .catch(e => {
    	// one or more of the requests failed
    	// or there was an error in `then()`
    	console.error(e);
    });
```

Imagine trying to replicate this level of error handling with callbacks! It's worth mentioning that all of the promises ultimately settle even if one of them settles in a rejected state while some are still pending. They won't get cancelled. You should also know that `Promise.all` also accepts non-`Promise` objects. Any `thenable` or non-`Promise` objects are auto-resolved using `Promise.resolve`.


### `Promise.race`

I find `Promise.race` to be a little less useful than `Promise.all`. It operates on an array of `Promise` objects and returns a promise as well. The difference is that the resultant promise settles based on the first settlement of the array of promises. It's a race! If the first promise to settle in the array of promises is fulfilled (aka a success), then the resultant promise will be fulfilled. However, if the first settled promise is rejected (aka a failure), then the resultant promise will be rejected as well.

How it works is a bit weird, and best explained with a use-case. The best one I could find for `Promise.race` is timing out an async operation. Let's say you want to make a promise-based `fetch`, but that request could take a long time and you want to time out after 5 seconds if the request has yet to return a response. Using `Promise.race` we can combine our promise-based `fetch` with our promise-based [`wait`](#tldr) from earlier. If the `wait` _wins_ the "race," then a timeout has occurred and we can handle the error appropriately.

```js
// Extend the promise-based `wait` by throwing
// an Error if the delay is successful
function timeout(delay=3000) {
	return wait(delay).then(() => {
		throw new Error('Timed out!');
	});
}

// Return a promise that will be fulfilled if
// the fetch is fulfilled before the timeout
// is rejected.
function fetchWithTimeout(url, delay=3000) {
	// construct an array to pass to `Promise.race`
	return Promise.race([
		fetch(url),
		timeout(delay)
	]);
}

// Make an XHR request for the URL that has to
// return a response *before* the 5 ms timeout
// happens
fetchWithTimeout('/json/data.json', 5)
    .then(response => {
    	// successful response before the 5 ms timeout
    	console.log('successful response', response)
    })
    .catch(e => {
    	// Either the timeout occurred or some other error.
    	// Would need to check the method or use a custom
    	// `Error` subclass in `timeout`
    	console.error('request error', e);
    });
```

At first, it may seem weird to throw an `Error` in `timeout` when the `delay` is successful, but it makes sense. We _want_ it to be an error if the timeout actually happens. That way we can distinguish success from failure in the "race". When `timeout` settles, it will be a rejection. When `fetch` settles, it will be a fulfillment. Therefore, whichever one settles first, will win the "race" and we can react appropriately. The `then` reaction will retrieve the success response and the `catch` reaction will handle the timeout.

As mentioned in the comment, if you really wanted `timeout` to be useful it would return a custom `Error` object so that callers could just type check the `Error` object they receive instead of having to compare error messages. This is because if the `fetch` fails for some reason, it will also go to the `catch` reaction.

`Promise.race` can work with an array of any size, but I can't really think of a realistic use case where you'd want to fire off multiple async operations, only caring about the first one that returns. But I'm sure there is one.


## Inheriting from `Promise`

Just like with other built-in types, the `Promise` class can be subclassed to create your own more specific promise objects. Let's say you don't like the names `then()` and `catch()` and want to use `done()` and `fail()` instead (to be more like jQuery). You could subclass `Promise` to add in these methods.

```js
class JPromise extends Promise {
	// use the default constructor. no need to
	// override it

	// callback registered via `done` will only
	// be called when the `Promise` is fulfilled
	done(resolve) {
		// intentionally omitting the `reject` callback
		// that's also passed to `then`
		return this.then(resolve);
	}

	// `fail` is just a name wrapper around `catch`
	fail(reject) {
		return this.catch(reject);
	}
}

JPromise.resolve('Ben Ilegbodu')
    .done(name => {
    	console.log('using done instead of then!', name);

    	throw new Error('FAIL for fun!')
    })
    .fail(e => {
    	console.error('sad face', e);
    });
```

This example shows ES6 classes which we haven't discussed yet, but if you've used classes in any other programming language, it should make sense to you. We'll be covering them in greater detail soon.

You may have also noticed the use of `JPromise.resolve` instead of just `Promise.resolve` to create the promise. `resolve` and `reject` are also inherited so when we call them on `JPromise`, we get back a `JPromise` object instead of a generic `Promise` object.


## Wrapping things up

We're entering the home stretch now!

While the `Promise` API based on the Promises/A+ standard is crazy powerful, it's still lacking some useful functionality that exist in some of our existing promise libraries.

The first omission is the ability to cancel a `Promise`. This could come in handy when using `Promise.all` or `Promise.race`. If one promise's completion causes the result of others to no longer matter, it'd be nice to be able to cancel them. The [cancellation spec](https://github.com/promises-aplus/cancellation-spec) is already under development for Promises/A+.

The second omission is the ability to query the progress of a `Promise`. Imagine making a `fetch` call of a 100MB file. Being a able to display a progress indicator would be pretty helpful. Thankfully, the [progress spec](https://github.com/promises-aplus/progress-spec) too is under development for Promises/A+.

Promises are good for async operations that happen one time and then they're done. You shouldn't use promises for recurring events (such as clicks, key presses, etc.). If you want an alternative to normal event handling for recurring events, try out [reactive programming in JavaScript](http://reactive-extensions.github.io/RxJS/).


## JavaScript engine support

As of September 27, 2015, according to the [ECMAScript 6 Compatibility table](http://kangax.github.io/compat-table/es6/) all major JavaScript engines (transpilers, browsers and servers) support the `Promise` API. Some don't support 100% of the functionality, but the missing pieces most likely won't be features you'll be leveraging. The most notable is that Traceur is missing support for generic iterables with `Promise.all` and `Promise.race`.

If you need support for `Promise` in an older browser, however, check out the [`es6-promise`](https://github.com/stefanpenner/es6-promise) polyfill or just use [`core-js`](https://github.com/zloirock/core-js) to get all of the ES6+ polyfills.


## Additional resources

As always, you can check out the [_Learning ES6_ examples page](/learning-es6/#promises) for the [_Learning ES6_ Github repo](https://github.com/benmvp/learning-es6) where you will find all of the code used in this article running natively in the browser.

I've got two great web tools for you to play around with ES6 Promises. First there are the [ES6 Katas](http://es6katas.org/) that you've come to know and love. But there's also [Promisees: A Visualization Playground for Promises](http://bevacqua.github.io/promisees/) by [Nicolas Bevacqua](https://twitter.com/nzgb). It's pretty cool!

Since promises aren't new to JavaScript (just the native `Promise` API included with ES6), there are a lot of books and articles covering it. Here's a smattering:

 - [Promises for asynchronous programming](http://exploringjs.com/es6/ch_promises.html) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Promises](https://leanpub.com/understandinges6/read#leanpub-auto-promises) in [_Understanding ECMAScript 6_](https://leanpub.com/understandinges6/) by [Nicholas C. Zakas](https://twitter.com/slicknet)
 - [JavaScript Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) by [Jake Archibald](https://twitter.com/jaffathecake)
 - [Coming from jQuery](https://github.com/kriskowal/q/wiki/Coming-from-jQuery) in [q](https://github.com/kriskowal/q) by [Kris Kowal](https://twitter.com/kriskowal)
 - [Asynchronous Programming](http://exploringjs.com/es6/ch_async.html#ch_async) in [_Exploring ES6_](http://exploringjs.com/es6/) by [Axel Rauschmayer](https://twitter.com/rauschma)
 - [Promise Anti-patterns](http://taoofcode.net/promise-anti-patterns/) by [Tao of Code](http://taoofcode.net/index.html)
 - [Promises/A+ specification](https://github.com/promises-aplus/promises-spec)

## Coming up next...

Wow! That was a meaty one wasn’t it? Up next we’ll take a look at generators in ES6. I’m super excited about generators. They’re something I wanted to learn a while back when they were introduced in C#. Until then...
