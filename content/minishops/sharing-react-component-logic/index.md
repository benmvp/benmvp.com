---
title: Sharing React Component Logic
shortDescription: Learn how to write reusable React components using patterns for sharing stateful logic and behavior
category: react
level: advanced
tags: [react, react hooks, render props, hoc, compound component]
hero: ./laptop-with-code-safar-safarov-MSN8TFhJ0is-unsplash.jpg
heroAlt: A laptop with code next to some plants
heroCredit: 'Photo by [Safar Safarov](https://unsplash.com/@codestorm)'
event:
  id: '119762937169'
  start: 2020-12-03T09:00:00-08:00
  end: 2020-12-03T12:30:00-08:00
---

React's component-driven design simplifies reusing UI because blocks of markup can be encapsulated into custom components. Likewise, sharing traditional data utilities is straightforward because React is “Just JavaScript”™. But what about when we want to **share stateful logic and behavior** between components while letting them control some or all of the UI?

React has had several approaches over its lifetime to solve this problem:

- Mixins (legacy)
- `as` props
- Higher-order components (HOCs)
- Compound components
- Render props
- Custom hooks

Each pattern has its pros and cons. And even with hooks, there are still **ideal use cases for all of the patterns**.

Hi, I’m Ben Ilegbodu 👋🏾. In this minishop, not only will we learn how to write these patterns for sharing stateful logic, but we will also learn the best situations to apply these patterns in your codebase. You will be able to **replace your unnecessarily complex components** filled with dozens of configuration props and code branches with **powerful components with flexible APIs**.

## Get ready to...

- Support **`as` props** for minimal UI flexibility
- Add **render props** to invert UI rendering control
- Create **compound components** to provide layout control
- Leverage **custom hooks** when no shared UI is needed
- ...and many more techniques for creating reusable components

## You’ll need to have...

- Experience building React applications with `useState` & `useEffect` hooks
- Experience creating custom hooks
- Experience with advanced hooks like `useContext` & `useCallback` will also be helpful

## This minishop may not be for you if you...

- Are still new to React (try the [Zero to React with Hooks](/minishops/zero-to-react-with-hooks/) minishop instead)
- Have React experience, but don’t yet have experience using hooks (consider the [Migrating to React Hooks](/minishops/migrating-to-react-hooks/) minishop instead)

## Code of Conduct

By participating in this minishop, you are agreeing to the [Minishop Code of Conduct](/minishops/conduct/).

## What are “minishops”?

Minishops by Ben Ilegbodu are fully-remote workshops that last about 3 hours. They're highly-focused, covering only the concepts you want to learn so that you can level up your skills and get on with the rest of your day. By keeping it short, you’re able to absorb and retain the information before fatigue sets in and other distractions get in your way.

To learn more about minishops, read the [Introducing Minishops](/blog/introducing-minishops/) blog post.

## Questions

If you have questions about the minishop, feel free to email us at [team@benmvp.com](mailto:team@benmvp.com).
