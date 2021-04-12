---
date: 2021-04-11
title: 50 shades of React rendering with Next.js
shortDescription: How Next provides the best of static-site generation (SSG), client-side rendering (CSR) & server-side rendering (SSR) for React apps
category: divops
tags: [react, ssg, csr, ssr, nextjs]
hero: ./assorted-colored-leaves-chris-lawton-5IHz5WhosQE-unsplash.jpg
heroAlt: Various different colored leaves hanging from a line
heroCredit: 'Photo by [Chris Lawton](https://unsplash.com/@chrislawton)'
---

I developed my first [Next.js](https://nextjs.org/) application last November while building [Rep Yo City](https://repyo.city). I enjoyed its developer ergonomics and used it again for my most recent project, [NBA Player Tiers](https://nbaplayertiers.com). After developing and launching these two projects, it's now my go-to framework for building React applications. There are several reasons why I'm now an advocate for Next.js, including its [file-system routing](https://nextjs.org/docs/routing/introduction) and [API routes](https://nextjs.org/docs/api-routes/introduction), but I want to focus on its hybrid rendering approach.

Instead of supporting a single rendering mode for the entire app, **Next allows each page to have its own rendering mode**. This hybrid approach matches closer to the needs of our apps. There are some pages (usually landing pages) that are static and only change when we change the code. There are other pages that have content unique to a logged-in user. And even still, there are pages that are the same for all users, but change frequently.

So let's walk through the types of rendering, and see how Next.js supports it.

## Client-side rendering

With client-side rendering (aka CSR), an HTML page with a couple of `<script>` tags is sent to the browser. All data requests are made in the browser (👋🏾 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [SWR](https://swr.vercel.app/) & [React Query](https://react-query.tanstack.com/)), and we render the entire UI based on that data in the browser. The majority of React applications use client-side rendering via [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

While Client-side rendering is the simplest rendering strategy, it has two drawbacks. First, the screen is initially blank while the browser loads and executes the JavaScript that will render the UI. **Second, the HTML document is also blank, which is generally worse for SEO and makes generating rich site previews (aka [unfurling](https://unfurler.com/)) more difficult or impossible.**

Next.js doesn't support rendering on the client. _Something_ is always going to be included in the page HTML. Where does that page HTML come from? We'll answer that when looking at the next rendering strategy. 😄

## Static-site generation

Static-site generation (aka SSG) is pre-rendering all pages/routes of the app at build time. As a result, **the generated HTML pages can be cached on the server (or CDN) for super-fast delivery to the browser**. And any data that the pages need to render that initial HTML are also retrieved at build time. No initial blank screen, and great for SEO and unfurling.

Next.js renders all pages using SSG by default. In Next, a page looks like a normal React component:

```js
// src/pages/index.js

const HomePage = () => {
  const [recentShipments, setRecentShipments] = useState([])

  useEffect(() => {
    // retrieve recent shipments client-side on mount of page
    // and update the state
    // highlight-next-line
    getRecentShipments().then(setRecentShipments)
  })

  return (
    <div>
      <Header />
      <HeroImage />
      // highlight-next-line
      {recentShipments && <Shipments shipments={recentShipments} />}
      <Footer />
    </div>
  )
}

export default HomePage
```

The nice thing about SSG is that `<script>` tags are still shipped with the pre-rendered HTML. So the page can retrieve even more data on the client-side. It can be user-specific data, or data that changes often. This means that **static-site generation also supports client-side rendering after the render of the initial HTML page**. In the `HomePage` component above the header, footer and hero image are pre-rendered at build-time, while the recent shipments are rendered after the page loads in the browser.

Now if we wanted, with Next we could also retrieve the recent shipments at build time so that they are included in the initial HTML (likely to help with SEO). We export an additional `async` function called [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation):

```js
// src/pages/index.js

// highlight-next-line
export const getStaticProps = async () => {
  // by fetching at build time we're assuming this data
  // won't change often
  // highlight-next-line
  const recentShipments = await getRecentShipments()

  return {
    // `props` are passed to the page component as props
    // highlight-start
    props: {
      recentShipments,
    },
    // highlight-end
  }
}

// `recentShipments` is now passed in as a prop by the
// Next.js framework at build time
// highlight-next-line
const HomePage = ({ recentShipments }) => {
  return (
    <div>
      <Header />
      <HeroImage />
      // highlight-next-line
      <Shipments shipments={recentShipments} />
      <Footer />
    </div>
  )
}

export default HomePage
```

If you've used [Gatsby](https://www.gatsbyjs.com/) before, Next's default SSG results in the same statically rendered pages, except how Gatsby retrieves build-time data for pages using GraphQL.

But there are two drawbacks of basic static-site generation. First off, build times can become really long when there are a lot of pages to pre-render. Think of product pages for an e-commerce site or article pages for a news site. Secondly, **if the data used to pre-render a page changes, the only way to re-render the page is to trigger a rebuild of the entire app**.

Next.js has an answer to both of these, but first let's look at another common rendering strategy.

## Server-side rendering

Server-side rendering (aka SSR) is the original approach for handling data-driven pages. [Ruby on Rails](https://rubyonrails.org/), [Flask](https://flask.palletsprojects.com/en/1.1.x/), and even [Express](https://expressjs.com/) are all web application frameworks that ultimately grab data on the server for each request and return HTML. Next.js began as a React server-side rendering framework. But now **Next encourages static-site generation over server-side rendering for performance reasons**. The time to receive the HTML document ([TTFB](https://web.dev/time-to-first-byte/)) is slower with server-side rendering because the server must compute the resultant HTML upon every request.

Next suggests fetching the data client-side unless the page not only has data that must be fetched with each request time, but also must be pre-rendered with that content. These situations are rare because per-request data needs usually come from logged-in pages that have user-specific data. But then those logged-in pages typically don't have to be pre-rendered because there are no SEO or unfurling needs.

But if server-side rendering really is needed, we can just swap `getStaticProps` for [`getServerSideProps`](https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering):

```js
// src/pages/index.js

// highlight-next-line
export const getServerSideProps = async () => {
  // presumably the shipments are somehow determined
  // based on the user, which is why they are retrieved
  // server-side instead of client-side or at build-time
  // highlight-next-line
  const recentShipments = await getRecentShipments()

  return {
    // `props` are passed to the page component as props
    props: {
      recentShipments,
    },
  }
}

// `recentShipments` is still passed in as a prop by the
// Next.js framework but at *request* time
const HomePage = ({ recentShipments }) => {
  return (
    <div>
      <Header />

      <HeroImage />

      <Shipments shipments={recentShipments} />

      <Footer />
    </div>
  )
}

export default HomePage
```

With server-side rendering, we'll always get the latest and greatest data delivered in the initial HTML. However, the main drawback is the performance. We have to ensure we have the necessary DevOps setup to handle onslaughts of traffic to the server-side rendered page. Otherwise, too many simultaneous accesses of the database or fetches of the API can bring the entire site down. Build-time rendering with cached pages is huge for performance and scale because it mitigates this problem.

## On-demand rendering

We've seen that Next.js allows for pre-rendering different pages at build time (SSG) versus rendered at request time (SSR). That flexibility is very cool but still has the drawbacks we mentioned. Enter "on-demand rendering" (I just made this up). On-demand rendering takes the best parts about static-site generation (cached pages) and combines it with the best parts about server-side rendering (dynamic pages) to create dynamic cached pages. 🤯

### Drawback: Handling too many pages to pre-render

Let's take the first drawback that we had with SSG where builds take too long when we have too many pages to pre-render. Too many pages comes from ["dynamic routes"](https://nextjs.org/docs/routing/dynamic-routes) where an object ID (like a product ID, article ID, blog post ID, etc.) are in the URL. The number of these routes can be potentially unbounded.

**To solve this, Next has this concept of ["fallback pages"](https://nextjs.org/docs/basic-features/data-fetching#fallback-pages)**. Here's how it works:

- The page is rendered at build-time without any of its data props. It's a shell page.
- Next sends that shell page to the browser for the first request of the fallback page. This is so the user gets an immediate response.
- In the background, Next fully renders the requested page just like an SSG page.
- This statically generated page is then updated on the browser.
- It's also cached with the rest of the pre-rendered pages. That way the next time it's requested, it's ready to go.

Fallback pages work with the addition of [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation).

```js
// src/pages/p/[id].js

// called at build time to figure out which product pages
// should be rendered at build time (if any)
// highlight-start
export const getStaticPaths = async () => {
  // get the 50 most popular pages
  const popularProducts = getPopularProducts(50)

  return {
    // any paths listed here will be rendered at build time
    paths: popularProducts.map((product) => ({
      params: {
        id: product.id,
      },
    })),

    // all other paths will be statically generated on-demand
    fallback: true,
  }
}
// highlight-end

// called whenever the product page is being rendered,
// either at build time or for one-time rendering at
// request time
export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.id)

  // if no product was found (bad ID), display
  // 404 page
  // highlight-start
  if (!product) {
    return {
      notFound: true,
    }
  }
  // highlight-end

  // pass product to the `ProductPage` component as props
  return {
    props: {
      product,
    },
  }
}

// `product` will be `undefined` for the initial render
// and will have a value for the full render
const ProductPage = ({ product }) => {
  return (
    <div>
      <Header />
      // highlight-start
      {!product ? (
        <Loading />
      ) : (
        <div>
          <ProductImage product={product} />
          <ProductInfo product={product} />
        </div>
      )}
      // highlight-end
      <Footer />
    </div>
  )
}

export default ProductPage
```

The `getStaticPaths` method is cool because we can decide which pages, if any, will be rendered at build time. So we can decide to pre-render the pages for the 50 most popular products by passing an array of path info objects to `paths`. And then, the thousands of other product pages will be rendered on-demand at request time.

Let's say we don't like the shell page for the on-demand pages (resulting in the need for displaying `<Loading />`). We can, instead, have the server wait to return the page HTML until it has fully rendered it that first time. **So the first request of the page will act like server-side rendering, but subsequent requests will be cached pages like static-site generation.** We do this by setting `fallback` to `'blocking'` instead of `true`.

```js
// src/pages/p/[id].js

export const getStaticPaths = async () => {
  const popularProducts = getPopularProducts(50)

  return {
    // any paths listed here will be rendered at build time
    paths: popularProducts.map((product) => ({
      params: {
        id: product.id,
      },
    })),

    // all other paths will be statically generated on-demand,
    // but the server will wait to return the initial HTML until
    // the page has been fully rendered
    // highlight-next-line
    fallback: 'blocking',
  }
}

// called whenever the product page is being rendered,
// either at build time or for one-time rendering at
// request time
export const getStaticProps = async ({ params }) => {
  const product = await getProduct(params.id)

  // if no product was found (bad ID), display
  // 404 page
  if (!product) {
    return {
      notFound: true,
    }
  }

  // pass product to the `ProductPage` component as props
  return {
    props: {
      product,
    },
  }
}

// `product` will always exist
const ProductPage = ({ product }) => {
  return (
    <div>
      <Header />
      // highlight-start
      <div>
        <ProductImage product={product} />
        <ProductInfo product={product} />
      </div>
      // highlight-end
      <Footer />
    </div>
  )
}

export default ProductPage
```

The blocking fallback mode is handy when the initial page must be fully pre-rendered (for SEO or unfurlling). But keep in mind that the initial render will have a worse time-to-first-byte (TTFB).

### Drawback: Handling frequently updated data

With both the single home page route rendered at build time or the dynamic product page route rendered on-demand, we ultimately cache the rendered page. **But these pages become stale if the data used to render them updates.** Traditionally the way solve this SSG problem is to trigger an app rebuild in order to rebuild the pages. But it's fairly inefficient to rebuild the entire site because a single page has become stale.

Well, Next.js solves this problem with a feature called [Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration). It allows us to update _existing_ pages by re-rendering them in the background as traffic comes in. Let's revisit our `HomePage`.

```js
// src/pages/index.js

const ONE_HOUR = 60 * 60 // in seconds

export const getStaticProps = async () => {
  const recentShipments = await getRecentShipments()

  return {
    props: {
      recentShipments,
    },

    // Re-generate the page on the next request
    // after at least one hour has passed
    // highlight-next-line
    revalidate: ONE_HOUR,
  }
}

const HomePage = ({ recentShipments }) => {
  return (
    <div>
      <Header />

      <HeroImage />

      <Shipments shipments={recentShipments} />

      <Footer />
    </div>
  )
}
```

Now, the home page will be re-rendered (in the background) at most once per hour. If new shipments have happened within the last hour, the newly rendered home page will now display them. **And this is all without having to rebuild and redeploy the app.** While Next is re-rendering the page, active requests receive the currently cached page. Next returns the newly rendered page once re-rendering is complete.

**We get the benefits of frequent updates like sever-side rendering, but still with the caching benefits of static-site generation.** The database and backend load is low because a page is only re-rendered once at any given time. A thousand simultaneous requests for the same page all receive the same cached page instead of needing a thousand concurrent database reads. Huge win.

---

There are also various configurations we can combine to create an even more hybrid rendering strategy. What I really like about Next.js is how it streamlines the effort of moving between the different rendering modes.

Keep learning my friends. 🤓
