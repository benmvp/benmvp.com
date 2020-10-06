---
date: 2020-05-08
title: What exactly is a "Design System"?
shortDescription: My opinion on the key pieces that make up a design system and high-level overview of how to go about building one
category: design-system
tags: [design-system, react, material-ui, figma, css, typography, brand]
hero: ./design-system-lee-campbell-DtDlVpy-vvQ-unsplash.jpg
heroAlt: A dark room with two monitors read to do design work
heroCredit: 'Photo by [Lee Campbell](https://unsplash.com/@leecampbell)'
---

Design systems are all the rage these days. Every tech company has one or has "plans to create one this year." And the term "design system" has basically turned into a buzzword creating a lot of confusion as what it really means. Is it a [Figma](https://www.figma.com/) design library? A CSS library? A JavaScript component library? [Mark](https://twitter.com/markdalgleish) best summed up the confusion with this hilarious tweet:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">The trouble with the term “design system” is that it means completely different things to different people. For example, to developers it means “component library” but to designers it means “I&#39;d like a promotion.”</p>&mdash; Mark Dalgleish (@markdalgleish) <a href="https://twitter.com/markdalgleish/status/1257609880594051072?ref_src=twsrc%5Etfw">May 5, 2020</a></blockquote>

In my opinion a design system isn't an implementation. Instead the design system is a set of guidelines, principles, best practices, etc. that the implementations use in order to be "on brand." The [Material Design system](https://material.io/) is a perfect example of this. Initially when the project came out, it was just some documentation. But since then, they've added iconography, components, and more to help **build** applications that adhere to the Material Design "look and feel."

Usually a design system is started within the Brand team (and likely with a brand agency 😔). And out comes foundational elements: typography, color, tone of voice and motion. Typically these are showcased in marketing materials like print ads, emails or marketing landing pages.

## Design

The Design team then takes those brand guidelines and massages them into UI elements. From past experiences, the colors that the Brand teams choose usually aren't accessible for [contrast ratio](https://webaim.org/blog/wcag-2-0-and-link-colors/) and the Design team has to make some tweaks. Then the output from them is an implementation of the design system as a pattern library in Figma, [Sketch](https://www.sketch.com/), [InVision](https://www.invisionapp.com/), or other similar design tools.

In my opinion, it's **super duper** important that the Design team creates this first implementation. If an organization is creating their own design system (and not using an [existing one](https://adele.uxpin.com/)), presumably they're big enough to have designers. They need those designers producing designs according to the design system. If the organization has a component library, but the designers aren't designing consistent with that library or bought into the design system, the engineers will find themselves in more pain trying to use the library than if they had just built things from scratch.

I'll probably have a post in the future to dive deeper into this. It's a sore spot for me and a point I believe many design systems go wrong.

## Web

After the design pattern library implementation of the design system has been created, the remaining implementations depend on the stack.

Some teams will jump straight to a JavaScript component library built in [React](https://github.com/jbranchaud/awesome-react-design-systems), [Angular](https://blog.bitsrc.io/11-angular-component-libraries-you-should-know-in-2018-e9f9c9d544ff), [Vue](https://vueds.com/), etc.. Depending on the organization, they may need to create multiple component libraries for multiple JavaScript libraries.

But if part of your stack doesn't use a JavaScript library, like a Rails or Django backend, a React component library likely won't be useful. So teams may need to build out a "style system" aka a CSS-only solution like [Bootstrap](https://getbootstrap.com/) or [Foundation](https://get.foundation/sites/docs/). The style system can realistically only be a subset of the overall design system, however. It typically contains just the display-only components like typography, dividers, buttons, and hopefully text inputs. The bigger or more interactive the component, the harder it is to make use of just CSS because the component relies on lots of elements going in and out of various states.

The JavaScript component libraries ideally would use the style system to style their components to ensure that there is design consistency. And to make sure that the style system isn't forgotten about and out-of-date. But if the component libraries come first and are written in a css-in-js solution, this can be tricky or even infeasible.

## 3rd-party

The most difficult parts of the site to keep in sync with the design system are those driven by 3rd-party integrations. These are the Wordpress blog, help center and other key sections of the site that still need to look on-brand but aren't part of the codebase. If the style system exists, the team can bundle up all the CSS into a single file with human-readable class names. Put that file on a CDN and that can be included on the 3rd-party site. The 3rd-party site can operate much like the JavaScript-less portions of the site that are part of the codebase.

## Native

With all this talk about the Web, we shouldn't forget the native apps. They too should adhere to the design system. And ideally they are on-brand with more than just typography and colors. The same buttons, text inputs, notifications, etc. should appear in the native apps. The only differences should be in page-level conventions like navigation.

## Stitch Fix

At Stitch Fix we've built our own design system (of course). It's called [Mode](https://medium.com/@yorthehunter/introducing-the-mode-design-system-b3a64cb916da). It started with Brand. It was massaged with our Design Platform team. We've built out a Style System that exports Sass mixins. And now I'm wrapping up a beta release of the React component library.

I'm really excited to see how this React component library turns out. It's now my third JavaScript component library. I built one while at [Zazzle](https://www.zazzle.com/) and another at [Eventbrite](https://www.eventbrite.com/). By now I really should know what I'm doing and have hopefully learned from my past mistakes. 😅

More thoughts to come on how to spin up and maintain a React component library. I learned a lot during this process.

Keep learning my friends. 🤓
