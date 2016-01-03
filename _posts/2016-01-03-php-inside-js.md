---
layout: post
title: PHP Inside Javascript
date: 2015-12-22
categories: tips-tricks
author: Andre Christoga
---
First of all, I'm gonna say happy new year 2016.

## Language

### What is PHP 
PHP is a server-side scripting language designed for web development but also used as a general-purpose programming language. Originally created by Rasmus Lerdorf in 1994.

### What is Javascript
JavaScript is a high-level, dynamic, untyped, and interpreted programming language. It has been standardized in the ECMAScript language specification. Alongside HTML and CSS, it is one of the three essential technologies of World Wide Web content production; the majority of websites employ it and it is supported by all modern web browsers without plug-ins. JavaScript is prototype-based with first-class functions, making it a multi-paradigm language, supporting object-oriented, imperative, and functional programming styles. It has an API for working with text, arrays, dates and regular expressions, but does not include any I/O, such as networking, storage or graphics facilities, relying for these upon the host environment in which it is embedded.

## How
To start writing php code inside your javascript file.. type this in your `.htaccess`

### .htaccess file
```
<FilesMatch "^.*?api.*?$">
SetHandler php5-script
</FilesMatch>
```
In that above example, any file that includes the string "api" will be processed as PHP. Feel free to alter that RegEx.

### Javascript file
<?php
	// Sets the proper content type for javascript
	header("Content-type: application/javascript");
?>
That will ensure browsers reading the file will interpret it as JavaScript. Now you can use <php ... ?> tags in the JavaScript file to do whatever PHP stuff you need to do.

## Referency
https://css-tricks.com/snippets/htaccess/use-php-inside-javascript/ <br>
https://en.wikipedia.org/wiki/JavaScript <br>
https://en.wikipedia.org/wiki/PHP