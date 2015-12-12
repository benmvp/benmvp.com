---
layout: post
title: How to use HTTPS Protocol
description: "A trick to use https protocol"
modified: 2015-11-30
category: tips-trick
comments: true
share: true
---
Sometimes people more often to use https then http, Why?
**HTTP** is an abbreviation of **Hyper Text Transfer Protocol** and **HTTPS** is an abbreviation of **Hyper Text Transfer Protocol Secured**

With **HTTPS** your site will be protected from hacker, virus,bot and others...
## How to get HTTPS protocol?
To get https protocol you need to have a file named `.htaccess`, 
Put this code in your .htaccess
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
`.htaccess` is a configuration file that supported by several web servers
