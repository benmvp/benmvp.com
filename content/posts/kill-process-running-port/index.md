---
date: 2020-10-18
title: Easily kill a process running on a port
shortDescription: How to use the kill-port package with npx to kill the process running on a given port
category: divops
tags: [bash, command-line, npx, til]
hero: ./sword-artur-kerkhoff-YQa44-Lst54-unsplash.jpg
heroAlt: Sword and dagger
heroCredit: 'Photo by [ARTUR KERKHOFF](https://unsplash.com/@arkhoff)'
---

Generally when I try to run a web server on an existing port, it will tell me that the port is already in use and ask if I want to use another one:

```shell
Something is already running at port 8080
? Would you like to run the app at another port instead? › (Y/n)
```

But sometimes, usually for older servers, when the port is in use I'll get an error like:

```shell
Fatal error: Port 8080 is already in use by another process.
```

Typically this error simply means that I have to stop a duplicate server. But recently I was having problems with [Gatsby](https://www.gatsbyjs.com/) not completely shutting down when I stopped the server. So even though the web server technically wasn't running, the port was still in use. And I had no idea how to kill the process running on the port.

So naturally I googled for a solution and found a relevant [Stack Overflow question](https://stackoverflow.com/questions/11583562/how-to-kill-a-process-running-on-particular-port-in-linux). It told me to run the [`lsof`](https://linux.die.net/man/8/lsof) command and combine it with the [`kill`](http://linuxcommand.org/lc3_man_pages/kill1.html) command in order to kill the process:

```shell
kill $(lsof -t -i:8080)
```

So I did that the first time. And honestly I wasn't sure if I was opening a backdoor for someone to use my machine to mine Bitcoin. 😂

But the _next_ time I needed to kill a process running on a port, I had to google again to find that same Stack Overflow question. My command line skills are improving day-by-day, but there's no way I'm going to be able to remember that command.

Luckily I stumbled upon an npm package, [`kill-port`](https://www.npmjs.com/package/kill-port), that does exactly what I need with a much friendlier interface. And thanks to [`npx`](https://www.npmjs.com/package/npx), I don't even have to install it. I just run:

```shell
npx kill-port 8080
```

That's it! It's slower than the `kill` + `lsof` because `npx` has to temporarily install the `kill-port` package. But it's 1000x times easier for me to remember. I took a peak at the [source code](https://github.com/tiaanduplessis/kill-port/blob/867012edb415b1ce9a2533e558c6aa0b92b12333/index.js#L34-L36) for `kill-port` and under the hood the package is using `kill` + `lsof` of course! The `kill-port` package is just providing a more approachable abstraction in my opinion.

Keep learning my friends. 🤓
