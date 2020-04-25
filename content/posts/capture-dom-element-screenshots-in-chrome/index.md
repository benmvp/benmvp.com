---
date: 2020-04-24
title: Capture DOM element screenshots in Chrome
description: How to create a screenshot of a DOM element in Chromium-based DevTools
category: devtools
tags: [devtools, chrome, edge, chromium]
hero: polaroid-picture-adrien-olichon-5C9CWNaH5Pk-unsplash.jpeg
heroAlt: Picture of a polaroid of Amsterdam, Netherlands
heroCredit: 'Photo by [Adrien Olichon](https://unsplash.com/@adrienolichon)'
---

Whenever I [submit a PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) for a UI change, I like to include a screenshot or two in order to aid the my teammates in reviewing the code, especially when it's CSS changes. Ideally there would be a [Deploy preview](https://www.netlify.com/blog/2016/07/20/introducing-deploy-previews-in-netlify/), but not everything is running on [Netlify](https://www.netlify.com/) (yet).

Usually I only need a screenshot of the section of the page that actually changed. So I hit `Cmd+Shift+4` (on my Mac) and select the a section containing the UI. Boom screenshot. Well for now on, thanks to a tweet from [Tierney Cyren](https://twitter.com/bitandbang), I can be more precise in my screenshot. In Chrome, Edge or any Chromium-based environment, I can get a screenshot of _just_ the element in the DOM:

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">two quick things that I don&#39;t think enough people know about:<br><br>1. there&#39;s a command palette in DevTools - CMD/CTRL + Shift + P<br>2. you can take screenshots of a single node from the palette <a href="https://t.co/NpoZQpAquT">pic.twitter.com/NpoZQpAquT</a></p>&mdash; pay essential workers like they’re essential (@bitandbang) <a href="https://twitter.com/bitandbang/status/1253737729298436098?ref_src=twsrc%5Etfw">April 24, 2020</a></blockquote>

If you can't watch the video, here are the steps:

1. Inspect the DOM element to highlight it in the Elements panel of the DevTools
1. Press `Cmd/Ctrl+Shift+P` to pull up the DevTools command palette (also something new I just learned about!)
1. Choose "Capture **node** screenshot"
1. Save the file

That's it! Now all of your PRs will get immediate 🚢 thanks to your beautiful screenshots. 😂

Keep learning my friends. 🤓
