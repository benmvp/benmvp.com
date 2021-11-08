---
date: 2021-11-07
title: Wrapping next/link to use with a custom UI Link component
shortDescription: How to create a custom Link component that combines the Next's Link component with one from a UI component library like MUI
category: React
tags: [react, nextjs, link, component, routing, router]
hero: ./link-edge2edge-media-t1OalCBUYRc-unsplash.jpeg
heroAlt: Close-up of steel chain link
heroCredit: 'Photo by [Edge2Edge Media](https://unsplash.com/@edge2edgemedia)'
---

[Next.js](https://nextjs.org/) has a pretty snazzy file-system based [router](https://nextjs.org/docs/routing/introduction) that is built on the concept of [pages](https://nextjs.org/docs/basic-features/pages). The router allows us to do client-side route transitions between pages similar to a single-page application (aka SPA). Next exports a React component called [`Link`](https://nextjs.org/docs/api-reference/next/link) to automatically handle these client-side route transitions.

```js
import Link from 'next/link'

const Home = () => {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home
```

But this renders a vanilla `<a>` tag with no styling, which pretty much no one is going to want. We may throw a `className` on the `<a>` for styling, but more than likely we have a custom `<Link>` component of our own that handles the styling. I use the fantastic [MUI](https://mui.com/) React component library for my personal projects, and it has its own [`Link` component](https://mui.com/components/links/). So with MUI, the example becomes:

```js
import NextLink from 'next/link'
import { Link as MuiLink } from '@mui/material'

const Home = () => {
  return (
    <ul>
      <li>
        // highlight-next-line
        <NextLink href="/" passHref>
          <MuiLink>Home</MuiLink>
        </NextLink>
      </li>
      <li>
        // highlight-next-line
        <NextLink href="/about" passHref>
          <MuiLink>About Us</MuiLink>
        </NextLink>
      </li>
      <li>
        // highlight-next-line
        <NextLink href="/blog/hello-world" passHref>
          <MuiLink>Blog Post</MuiLink>
        </NextLink>
      </li>
    </ul>
  )
}

export default Home
```

Notice that we had to add the [`passHref`](https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag) prop to the `<NextLink>` so that the `href` is passed down to the `<MuiLink>`. Otherwise we'd have to duplicate the `href` prop on both the `<NextLink>` and the `<MuiLink>` components.

> It's important to note that if your component library's `Link` component is a function component (more than likely it is given Hooks), it must wrap the component in [`React.forwardRef`](https://reactjs.org/docs/forwarding-refs.html).

But having to do this double `<Link>` dance every time we want to render a styled link gets annoying, especially if we're passing more props to the `<NextLink>` and `<MuiLink>`. So what I typically do in my Next apps is create a lightweight custom `Link` component that wraps both `next/link` and MUI `Link`.

```js
import NextLink from 'next/link'
import { Link as MuiLink } from '@mui/material'

/**
 * A convenience component that wraps the MUI `Link` component that provides
 * our look & feel with Next's router `Link`
 *
 * @see https://next.js.org/docs/api-reference/next/link
 */
const Link = ({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...muiProps
}) => {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      passHref
    >
      <MuiLink {...muiProps} />
    </NextLink>
  )
}

export default Link
```

The component isn't really complex. It just takes in the props and passes the appropriate ones to the underlying `<NextLink>` versus the `<MuiLink>`.

But since I develop in React with TypeScript, my `Link` component actually looks like this:

```tsx
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'

// `LinkProps` is the combination of the MUI `LinkProps` and the Next `LinkProps`
// We wanna use the `href` prop from `next/link` so we omit it from MUI's.
// highlight-start
export type LinkProps = Omit<MuiLinkProps, 'href'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'>
// highlight-end

/**
 * A convenience component that wraps the MUI `Link` component that provides
 * our look & feel with Next's router `Link`
 *
 * @see https://next.js.org/docs/api-reference/next/link
 */
const Link = ({
  href,
  prefetch,
  replace,
  scroll,
  shallow,
  locale,
  ...muiProps
}: LinkProps) => {
  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
      passHref
    >
      <MuiLink {...muiProps} />
    </NextLink>
  )
}

export default Link
```

The only real difference here is the `LinkProps` type definition.

```typescript
type LinkProps = Omit<MuiLinkProps, 'href'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'>
```

It ensures that we only can pass in valid props for our new `<Link>` component. How it's defined is also important. First we take all the props of our component library's `Link` component (`MuiLinkProps` in this case), but omits the `href` prop. This is because it is also defined in `NextLinkProps` and we want to ensure that we use the type definition for `href` from `next/link` because it supports both a `string` as well as a [`URL` object](https://nodejs.org/api/url.html#url_url_strings_and_url_objects).

Then we intersect (or merge in) all of the props from `NextLinkProps`. I personally also exclude the [`as`](https://nextjs.org/docs/tag/v9.5.2/api-reference/next/link#dynamic-routes) prop because it's basically legacy functionality. We can omit `passHref` and `children` as well because we're explicitly setting them on `<NextLink>` (the `children` of `<NextLink>` is the `<MuiLink>`).

So now back in our home page component, we can use our new `<Link>` component.

```js
import Link from '../components/Link'

const Home = () => {
  return (
    <ul>
      <li>
        // highlight-next-line
        <Link href="/">Home</Link>
      </li>
      <li>
        // highlight-next-line
        <Link href="/about">About Us</Link>
      </li>
      <li>
        // highlight-next-line
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
    </ul>
  )
}

export default Home
```

Now we're back to it _feeling_ like we're just using our component library `<Link>` component, but with all of the bells and whistles of `next/link`. 🎉

One more thing before we finish. The `next/link` only works for local links. It does nothing for external links. In fact, using it for external links results in a bunch of wasted work. So it's better if we just use our component library's `<Link>` component directly.

```js
import { Link as ExternalLink } from '@mui/material'
import Link from '../components/Link'

const Home = () => {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About Us</Link>
      </li>
      <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li>
      <li>
        // highlight-next-line
        <ExternalLink href="https://www.benmvp.com">Ben Ilegbodu</ExternalLink>
      </li>
    </ul>
  )
}

export default Home
```

I explicitly name the component library's link component `ExternalLink` to make it abundantly clear that it's only to be used for external links. Our custom `<Link>` component that wraps `next/link` is the default one to use.

---

I have to create this wrapper `Link` component with every React Next.js project I work on that uses MUI. It makes me wonder if MUI should just add the `next/link` wrapper itself. Next.js is popular enough that I think it'd be worth it. But until then, this code snippet is simple enough to copy and paste. It's what we developers do best anyway. 😂

As always if you've got any questions or comments, feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
