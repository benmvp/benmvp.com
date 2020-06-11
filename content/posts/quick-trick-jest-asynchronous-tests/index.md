---
date: 2020-12-17
title: A quick trick for Jest asynchronous tests
description: A small configuration you can add to Jest to reduce false positives for async tests
category: testing
tags: [testing, async, react]
# hero: ./blue-anchor-on-wall.jpg
# heroAlt: Blue anchor stenciled on the wall
# heroCredit: 'Photo by [milan degraeve](https://unsplash.com/@milandegraeve)'
published: false
---

- Jest has several ways to write tests for asynchronous code
- Sometimes we mess up and don't write the test correctly
  - Jest by default passes tests even if no assertions happen
  - Tests pass even though the test never runs your assertions
- There is `expect.hasAssertions` you can use to make sure a case ran at least one assertion
- Don't want to have to put that into _every_ test
- In Jest config you can add a `beforeEach` with `expect.hasAssertions()` and it'll run for **all** tests
- Be prepared, if you're adding it after the fact, you may have lots of tests to fix! 😄

Keep learning my friends. 🤓
