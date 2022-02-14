---
date: 2022-02-13
title: Putting test files in the pages folder in a Next.js app
shortDescription: How to include test and other non-page files next to page components and API routes within the pages directory in a Next.js application
category: React
tags: [react, nextjs]
hero: ./owls-zdenek-machacek-FvTn9Dlv39A-unsplash.jpeg
heroAlt: Two brown owls perched on a wooden post
heroCredit: 'Photo by [Zdeněk Macháček](https://unsplash.com/@zmachacek)'
---

When developing Next.js apps I want to be able to include other files within the `src/pages` directory besides the [page React components](https://nextjs.org/docs/basic-features/pages) or [API routes](https://nextjs.org/docs/api-routes/introduction). I'm perfectly fine putting components in `src/components` and helper functions in `src/utils`. But I like to co-locate other files with my pages and API routes.

Instead of creating a parallel `__tests__` folder, I like putting my `*.test.ts` or `*.test.tsx` [Jest unit tests](https://jestjs.io/) next to whatever it is that I'm testing. That works great in `src/components`, `src/utils` or any other location outside of `src/pages`. Similarly, I like putting my [Storybook stories](https://storybook.js.org/) (`*.stories.tsx`) next to my React components, including my page components (made possible by [Storybook Addon Next Router](https://storybook.js.org/addons/storybook-addon-next-router)).

But when I add these files within `src/pages` or `src/pages/api` and run `next build`, I get the following error:

```text
Build error occurred

Error: Build optimization failed: found page without a
React Component as default export in

pages/my/plan.stories

See https://nextjs.org/docs/messages/page-without-valid-component
for more info.
```

It's pretty nice that the error leads me to a place where I can find more info. I love when frameworks do this. But when I visit the [Page Without Valid React Component](https://nextjs.org/docs/messages/page-without-valid-component) page it gives a rather short explanation as to why the error ocurred, and some possible ways to fix it. The problem is that all the possible ways to fix it assume I somehow screwed up! 😢

I mean I guess I did screw up by putting other files in the `src/pages` folder, but it seems like something that should be allowed! Why is Next.js so picky about what files go in there? I guess since Next uses [page-based routing](https://nextjs.org/docs/basic-features/pages) it makes sense that it will have no way of interpreting page component files from test files or Storybook stories.

So for the longest I just accepted my fate and put my stories in a sibling `src/page-stories` directory and just avoided writing unit tests, moving nearly everything into `src/utils`. But it felt a bit clunky.

Then a coworker showed me a workaround! The [`pageExtensions` configuration](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions) allows us to alter the default list of valid page extensions (`.tsx`, `.ts`, `.jsx`, and `.js`). The config option is aimed at tools like [`@next/mdx`](https://github.com/vercel/next.js/tree/canary/packages/next-mdx), which have files that end in `.mdx`. But we can take advantage of it to let us put non-page files in the `src/pages` folder as well. And it's right there in the [docs](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory).

We add special extensions for the page components and API routes to help Next.js distinguish them from all of the other files.

```js
module.exports = {
  pageExtensions: [
    // `.page.tsx` for page components
    'page.tsx',
    // `.api.ts` for API routes
    'api.ts',
  ],
}
```

Because I exclusively develop in TypeScript, I only have TypeScript extensions. So all of my pages end in `.page.tsx`, such as `src/pages/my/plan.page.tsx`. And any of my API routes end in `.api.ts`, such as `src/pages/api/client/auth.api.ts`. I give the API routes their own extension, just for added clarity. And because page components will always have JSX, there's no need for `.page.ts`. Likewise, since API routes should never have JSX, there's no need for `.api.tsx`.

Now I can have `plan.page.tsx`, `plan.test.tsx` and `plan.stories.tsx` all in the same `src/pages/my` folder! And the cool thing is if I want to add a `utils.ts` or `constants.ts` in the `src/pages` folder, it will also work. Who knew something so simple could be so exciting? 😂

Keep in mind, though, that this change also has to apply to any [Custom App](https://nextjs.org/docs/advanced-features/custom-app) (`src/pages/_app.tsx`), [Custom Document](https://nextjs.org/docs/advanced-features/custom-document) (`src/pages/_document.tsx`), and [Custom Error Pages](https://nextjs.org/docs/advanced-features/custom-error-page) (`src/pages/404.tsx` & `src/pages/500.tsx`) that we've defined. They'll all need the `.pages.tsx` extension.

---

While I'd love for everyone to find my blog post to get their answer, the [Page Without Valid React Component](https://nextjs.org/docs/messages/page-without-valid-component) error page is _slightly_ more discoverable. 😅 So I submitted a [pull request](https://github.com/vercel/next.js/pull/34285) to add a link to the [Custom Page Extensions](https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory) page. As of writing, there are [194 open pull requests](https://github.com/vercel/next.js/pulls) on the [Next.js repo](https://github.com/vercel/next.js). So it may take a while to merge, if ever. Until then, I'll rake in the page views! 🤣

If you've got any questions or suggestions, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
