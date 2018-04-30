---
title: Using ES6 right now
subTitle: The Learning ES6 Series
author: Ben Ilegbodu
category: learning-es6
tags: [ecmascript-6, es6, javascript, learning-es6, transpilers, babel, traceur]
cover: babel-logo.png
---

So can I use ECMAScript 6 functionality right now? That’s the question everyone is asking these days. Many times when there is new browser functionality (like ES5, HTML5 or CSS3), advocates will spend a lot of time outlining all the new features and how great they are. But then at the end, you find out: "oh, but you can’t really use this functionality yet unless you using the latest Canary build that was just released yesterday." Talk about a letdown.

![Babel logo](babel-logo.png)

So instead of diving right into each of its features, I would like to first take a look at the various tools we can leverage to start using ES6 right now in a production environment. Then, as we go through each of the ES6 features, we can have conversations about which JavaScript engines or transpilers support the functionality and whether or not it’s safe for us to use. Sound like a plan?

If you haven’t already, you should read the previous posts in this [_Learning ES6_ series](/learning-es6-series/) where we’ve learned about the [history of ECMAScript](/learning-es6-history-of-ecmascript/) as well as the [goals and features of ES6](/learning-es6-goals-features-ecmascript-6/).

## TL;DR

Support for ES6 functionality in JS engines is growing every week and kept up to date by [Kangax’s ES6 compatibility matrix](http://kangax.github.io/compat-table/es6/). However:

- ES6 support is still fairly low across browsers & servers (max is less than 70%)
- The features that are supported differ between browsers (with some overlap)
- None of the IE browsers significantly support ES6 (the new Microsoft Edge browser does)

As a result, you cannot yet reliable run ES6 natively client- or server-side. Your best bet is compiling your ES6 code down to ES5 using transpilation tools like [Babel](https://babeljs.io/), [Traceur](https://github.com/google/traceur-compiler), or [TypeScript](http://www.typescriptlang.org/) as part of your build process.

Continue you on if you want the details...

## Upgrading to ES6

Axel Rauschmayer in his book [_Exploring ES6_](http://exploringjs.com/es6/), mentions that getting the Web to upgrade to a new language is very challenging because there are multiple stakeholders who have very little control over each other:

### Implementors of JavaScript engines

The smallest group is the handful of JavaScript engine implementers who are implementing based off of the [ECMAScript Language specification](http://wiki.ecmascript.org/doku.php?id=harmony:specification_drafts). These are the browser vendors like Chrome, Firefox & Internet Explorer / Edge that don’t want the Web to “break” when their users upgrade to the latest version of their browser. Standing in the way of this seamless upgrade is all of the existing code (good, bad & ugly) that developers have written over the last two decades. So their only solution is for ES6 to be a superset of ES5 so all of the existing code can still run as initially written. This limits them from being able to completely remove some of JavaScript’s bad features (like the `with` keyword).

### JavaScript developers

The next group is filled with tens of thousands of web developers generating the code that becomes a pain in the JS engine implementers’ sides down the road. But we have our challenges as well. We have no control over what browsers our users are surfing the Web with. Some are keeping up to date with the latest Chrome or Firefox, while others are still on IE8 (for a host of semi-valid reasons).

Developers don’t want to go back to a world where we have to write different code for multiple platforms or versions. Unfortunately new features of JavaScript don’t degrade gracefully like new features of HTML or CSS where old browsers just ignore what they don’t understand. If a browser doesn’t understand JavaScript, it’s an error. A developer _could_ wait until all the browsers they care about support ES6, but that would take **forever**. Instead our best hope is to compile ES6 down to ES5 via a method called _transpiling_. We will be looking at this process in more detail shortly.

### Web users

The final group comprises the hundreds of millions (billions?) users of the Web. What they want is simple. They want their favorite websites to work in the favorite or default browser. They probably don’t have multiple browsers installed on their computer or device. Upgrading their browser to get the latest JavaScript engine is definitely not their concern. In fact they probably don’t even know what ES6 is let alone if their browser supports it. So hopefully for the developers’ sake, they’re on an evergreen browser that auto-updates and always has the latest and greatest.

## Using ES6 natively

Like I just mentioned, in order to use ES6 natively, the JavaScript engine executing your code has to understand the JavaScript syntax you’re using. An ES5 engine will not “fail gracefully” when asked to execute ES6 code. It will throw lots and lots of errors. ES6 is a superset of ES5, however, so all of your existing ES5 code _will_ work in an ES6-based JavaScript engine, making it easy to get started with ES6. You could start using ES6 simply by using only one of its features, like [arrow functions](/learning-es6-arrow-functions/).

Kangax maintains a living [ES6 compatibility table](http://kangax.github.io/compat-table/es6/) that details the ES6 features each JavaScript engine supports. The table illuminates a couple of problems with supporting ES6 natively:

- While support is growing on a weekly basis, it is nowhere near 100% in any browser. As of writing, the top engine is (surprisingly) Microsoft’s Edge browser with only 68% support.
- There is only a small handful of features that are commonly supported across all of the engines, limiting the features you can “safely” use.
- None of the Internet Explorer browsers (from 11 on down) significantly support any ES6 features (and never plan to either). [IE8 and below don’t even support ES5!](/20-reasons-to-drop-ie8-like-its-hot/)

One would think: “hey, maybe if I limit the scope of my ES6 functionality to just the server that I have full control over I should be good!” In theory that would be a good idea, but as of now the JS-based servers (like [Node.js](https://nodejs.org/) & [io.js](https://iiojs.org/)) have the poorest level of ES6 support.

JavaScript feature detection became a common practice when a lot of APIs were added to browser-based JavaScript engines with HTML5 support. A developer could determine if the browser supported a specific API (such as [geolocation](http://www.w3schools.com/html/html5_geolocation.asp)) and act accordingly. This doesn’t work so well with ES6, unfortunately. The reasons being:

- A lot of what ES6 is introducing comes with new syntax. If your JS file uses that syntax, even if it does feature detection, executing the file will result in syntax errors if the JS engine doesn’t support the syntax.
- ES6 support differs greatly among JS engines, so support for a given feature does not serve as a proxy for support of some set of ES6 features you would like to use.

Kyle Simpson has released [ES Feature Tests](https://github.com/getify/es-feature-tests), but in order to use it you have to ensure that you’re testing for all of the features you plan to use in your ES6 file, which could be a maintenance nightmare. Moreover, you still need an ES5 version of your code to use when the feature detection fails.

## Transpilation tools

So with all of that said, your best bet is to use a transpilation tool, which will compile your ES6 code into ES5 code, making it cross-browser (really cross-engine) compatible. Transpiling is the process of compiling source code into another form of source code. You’ve probably already used transpilers as part of your web development process; you just probably called them preprocessors. [CoffeeScript](http://coffeescript.org/) (JavaScript), [Sass](http://sass-lang.com/) (CSS), and [HAML](http://haml.info/) (HTML) are all examples of transpilers or preprocessors.

For ES6 to ES5 transpilation, popular choices are:

- [Traceur](https://github.com/google/traceur-compiler) - the first ES6 to ES5 transpiler started by Google. As of today it only supports 59% of ES6 features.
- [Babel](https://babeljs.io/) - also an ES6 to ES5 transpiler that’s growing in popularity possibly because it also supports [React](http://facebook.github.io/react/)’s JSX syntax. As of today it supports the most ES6 features at a somewhat respectable 73%.
- [TypeScript](http://www.typescriptlang.org/) - a typed superset of JavaScript that not only compiles ES6 to ES5 (or even ES3) but also supports optional variable typing. TypeScript only supports 53% of ES6 features.

If I had to pick one transpiler to go with, I would probably pick Babel. It’s got the greatest level of support (so you can use the greatest number of features), it supports JSX by React which is super powerful UI framework, and seems to have a more vibrant and growing community of development and support. But really you couldn’t go wrong with any of the options.

### Dynamic Transpilation

If you’re looking for a super quick way to get started with ES6 and you’re not trying to deploy code to production, dynamic transpilation is a great choice. Essentially it does the conversion from ES6 to ES5 at runtime right before your code is executed.

In the browser, to transpile dynamically, you would include the transpiler’s library plus include a specialized `<script>` tag that would contain you ES6 code. Both [Babel](https://babeljs.io/docs/usage/browser/) and [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started) support dynamic transpilation in the browser. In Node on the server, [Babel](http://exploringjs.com/es6/ch_deploying-es6.html#sec_dynamic-transpilation-nodejs-babel) supports this on-the-fly dynamic transpilation as well.

It’s worth reiterating that dynamic transpilation should only be used for experimental or development code. The overhead incurred from on-the-fly transpilation is too high to be viable in a production environment You shouldn’t force your users to compile your code every time when it isn’t even changing. Instead you should statically transpile your code.

### Static Transpilation

If you want to actually use your ES6 code in a production environment, you need to transpile your ES6 code down to ES5 code as part of your server-side build process prior to deployment. What you end up deploying to your production environment will be the transpiled ES5 code. This build step could be invoked explicitly on the command line, on-demand by a file system watcher or as part of a greater build process via build tools like [grunt](http://gruntjs.com/), [gulp](http://gulpjs.com/), [broccoli](http://broccolijs.com/) or others.

Babel, Traceur as well TypeScript all support static transpilation, generating an ES5 file in one of the following module formats:

- [AMD](http://requirejs.org/docs/whyamd.html)
- [CommonJS](http://requirejs.org/docs/commonjs.html)
- [Polyfilled](https://github.com/ModuleLoader/es6-module-loader) ES6 module loader API

### Drawbacks of transpiling

Transpiling is great because it allows us to use ES6 features today even before actual JavaScript engines support those features natively. But there are some drawbacks to transpilation that you should be keenly aware of:

- Transpiled code is often more bloated than the original code because it’s trying to recreate in ES5 what comes native in ES6. And in some cases the transpiled ES5 code is not only bigger than the source ES6 code, but is also bigger than ES5 code you would normally write. This is because when you write the code yourself, you can implement shortcuts and optimizations because you’ve written the entire code. Classes are a good example of this.
- Unlike code minification which just strips unnecessary whitespace and shortens local variables, transpiled code can be dramatically different than the original source code. A few lines of ES6 code can be dozens of lines of ES5 code and still need a polyfill to make it all work. So basically you’re running code in production that you didn’t write, which of course comes with some measure of risk. We’re accustomed to using libraries that we didn’t write, but not our own code. This risk should be mitigated by the fact that these transpilers are very well tested both by unit tests and by the developer community at large.
- Debugging and error handling is harder because exceptions and other errors in your source ES6 code will actually be reported in the transpiled ES5 code. [JavaScript source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) can help with this problem, however, by effectively mapping lines in the transpiled ES5 code to lines in the source ES6 code. Most modern browsers support source maps, but you may need to turn on the feature in your developer tools console. All of the transpilers have options to generate source maps as well.
- Some ES6 functionality simply cannot be transpiled faithfully or without an additional large library. Features like `let`, `const`, and [symbols](http://exploringjs.com/es6/ch_symbols.html) come to mind.
- IE8 does not support ES5. [You shouldn't be supporting IE8](/20-reasons-to-drop-ie8-like-its-hot/), but if you are, your transpiled ES5 code may not work
- Lastly, if everyone is transpiling their code in order to be cross-browser compatible, the browsers themselves are never getting their ES6 features exercised; they are effectively still running ES5 code. Now I’m sure the browser vendors have their own plethora of tests that they run, but there’s huge value in having thousands of developers testing the browser by developing against the features. And until all of the non-ES6 browsers die out (which will be a while), it’s likely that the browsers’ ES6 features won’t get fully exercised for quite some time.


## ES6 REPLs

Most likely before you put in the effort to set up static transpilation as part of your build process you will want to at least play around with ES6 and see how it will transpile your code down to ES5. Furthermore, before you can even use transpilation for your app, you need to decide which transpiler you want to use. Thankfully there are many REPLs (an acronym for Read-Evaluate-Print Loop) that allow you to interactively play around with ES6, including ones for each of the transpilers we mentioned earlier:

- [Babel REPL](https://babeljs.io/repl/) - ES6 playground based on Babel
- [Traceur Transcoding Demo](http://google.github.io/traceur-compiler/demo/repl.html) - ES6 playground based on Traceur
- [TypeScript Playground](http://www.typescriptlang.org/Playground) - TypeScript playground that converts optionally typed ES6 code to ES5/ES3
- [ES6 Fiddle](http://www.es6fiddle.com/) - Allows you to type in ES6 code and have it converted to ES5 (built using Traceur)
- [ES6 Repl](https://chrome.google.com/webstore/detail/es6-repl/alploljligeomonipppgaahpkenfnfkn?utm_source=chrome-ntp-icon) - Chrome extension that allows you to work with ES6 code directly in the Chrome developer tools (also built using Traceur)
- [babel-node module](http://exploringjs.com/es6/ch_deploying-es6.html#sec_babel-node) - Babel brings ES6 transpiling support to the Node.js REPL


## Conclusion

Some things to consider before jumping all in on the ES6 bandwagon:

- **Where will your JavaScript application be deployed?** Client-side? Server-side? Or both via isomorphic JavaScript? If client-side, what browsers do you need to support? If just server-side you can just focus on the V8 Javascript engine inside of Node and what it supports.
- **Are there tools already in place to use ES6 in a production environment?** The answer more than likely is no. You’ll have to set up your transpilation build process, which is easiest with Node.js since the popular transpilers are written in JavaScript. If you don’t use Node as part of your build process, you may be able to find ports of Babel or Traceur to other server technologies like Java or Ruby. Typescript has several ports already.
- **Are you updating an existing app or starting something new?** A new “greenfield” app is a better candidate for using ES6 so you don’t have a mix of ES5 and ES6 code, but if you set up your transpilation build process correctly, incrementally adding new ES6 files to an existing ES5 codebase shouldn’t be a problem either.
- **If you’re part of a team, how familiar is the rest of the team with ES6?** Introducing ES6 features and the transpilation build process to a team unfamiliar with ES6 could lead to confusion and could be a recipe for disaster. Have them go through this [_Learning ES6_ series](/learning-es6-series/) first!

Phew! That was a whirlwind overview! There are so many options when it comes to deploying an ES6 app that it’s hard to go deep on any one technology. But never fear! I’ve brought additional resources here:

- [ES6 Support Matrix](http://kangax.github.io/compat-table/es6) - an up-to-date list of which ES6 features each browser, server and transpiler supports
- [ES6 Tools](https://github.com/addyosmani/es6-tools) - a laundry list of ES6 tools by Addy Osmani that will point you in the right direction to more transpilers, plugins for the popular build tools, plugins for unit test libraries, module loaders, boilerplates, code generators, polyfills, and more!
- [Client-side ES6 via webpack and Babel](http://exploringjs.com/es6/ch_deploying-es6.html#sec_transpilation-webpack-babel) - documentation on an example transpilation setup using browsers, static transpilation, Babel and webpack
- [Dynamically transpiled ES6 on Node.js via Babel](http://exploringjs.com/es6/ch_deploying-es6.html#sec_dynamic-transpilation-nodejs-babel) - documentation on another example transpilation setup using dynamic transpilation, Node.js, and Babel
- [Statically transpiled ES6 on Node.js via Babel and gulp](http://exploringjs.com/es6/ch_deploying-es6.html#sec_static-transpilation-nodejs-babel) - documentation on a third example transpilation setup using Node.js, static transpilation, Babel and gulp

That’s it! Hopefully this plethora of information will leave you feeling confident that you will be able to use ES6 right now via transpilation. And now as we begin deep diving into many of the ES6 features, we can also discuss which transpilers support the feature and what additional steps (if any) you need to perform to leverage the support. Happy (static) transpiling!
