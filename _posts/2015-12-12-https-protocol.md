---
layout: post
title: How to get HTTPS Protocol using .htaccess
date: 2015-12-12
categories: tips-tricks
author: Andre Christoga
header_image: img/htaccess.png
---
Sometimes people more often to use https then http, Why?
**HTTP** is an abbreviation of **Hyper Text Transfer Protocol** and **HTTPS** is an abbreviation of **Hyper Text Transfer Protocol Secured**

With **HTTPS** your site will be protected from hacker, virus,bot and others...

## How to get HTTPS protocol?

To get https protocol you need to have a file named `.htaccess`, 
Put this code in your `.htaccess`:

```
RewriteEngine on
RewriteCond %{HTTPS} !on
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
```

The code if you have a proxy in front of your server performing TLS termination :
```
RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteRule (.*) https://%{HTTP_HOST}%{REQUEST_URI}
``` 

## About `.htaccess`

A `.htaccess` (hypertext access) file is a directory-level configuration file supported by several web servers, that allows for decentralized management of web server configuration. They are placed inside the web tree, and are able to override a subset of the server's global configuration for the directory that they are in, and all sub-directories.[1]

The original purpose of .htaccess—reflected in its name—was to allow per-directory access control by, for example, requiring a password to access the content. More commonly, however, the .htaccess files override many other configuration settings such as content type, character set, CGI handlers, etc.
