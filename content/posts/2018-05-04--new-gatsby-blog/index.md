---
title: New Gatsby Blog!
category: general
cover: gatsby-logo-square.png
---

![Gatsby logo](gatsby-logo-wide.png)

Nearly [3 years ago](/new-blog/), I reinvented [benmvp.com](benmvp.com) to be my professional-focused blog. For a while, I was writing a lot, mostly working on the [_Learning ES6_](/learning-es6-series/) series. I learned so much writing posts for each of the ES6 features. But then towards the end of 2015 and early 2016, I started getting accepted to speak at conferences like [Nodevember](/nodevember-2015/), [NationJS](/nationjs-nodeday-2016/), [NDC Oslo](/ndc-oslo-2016/), [Front Porch Austin](/front-porch-austin-2016/) and [NodeSummit](/nodesummit-2016/). I no longer really had time to blog because my time was spent prepping for [conference talks](/speak/). I didn't even blog in 2017!

Well, while speaking at various conferences, this new library called [Gatsby](https://www.gatsbyjs.org/) kept coming up. It's a highly-performant React-based static site generator. I was used to static site generators because my previous blog was [Jekyll](https://jekyllrb.com/)-based (Ruby). All of my blog posts were simple Markdown files, so I didn't deal with Jekyll too much, but I still wanted to switch over to Gatsby.

For one, previewing my posts locally before I published live was surprising difficult with Jekyll. I also kind of like the idea of having my blog written in JavaScript & React. Plus, I'm pretty sure that learning Gatsby will help me at Eventbrite because our design system documentation app is a React app that really should be statically generated. Finally, I really just wanted to update the look and feel of my blog.

Here's how it looked before:

![Screenshot of old benmvp.com](previous-blog.png)

It wasn't _terrible_. It was based on a [Material design theme for Jekyll](https://github.com/christoga/jekyll-material). There are tons of Gatsby starter kits, including those for blogs. I chose the one you see now: [gatsby-starter-personal-blog](https://github.com/greglobinski/gatsby-starter-personal-blog). It has a lot of slick UX coupled with pretty nice visual design.

The challenge I found with using Gatsby with the starter kit, though, was that I didn't know where Gatsby ended and where the starter kit started. The kit did **a lot** for me which was great, but when I was running into issues, I could never be sure if it was just bugs in the starter kit (which there were some). In the end, I was able to get it all working to my liking and migrate over posts. I intend to do more cleanup of the code. Hopefully I'll contribute some of the fixes back to the starter.

Last thing. For now I will continue to use [Github Pages](https://pages.github.com/) because I'm pretty invested in it for all my other repos, but I am making use of [Netlify](https://www.netlify.com/) for CI/CD. I've set up [deploy previews](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/) so that when I create a pull request for the blog repo, I'll be able to see what it looks like in a "production" environment before actually pushing to benmvp.com. Pretty snazzy stuff!
