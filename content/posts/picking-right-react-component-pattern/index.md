---
date: 2021-05-31
title: Picking the right React component pattern
shortDescription: Explanations & advice on how to choose between advanced React UI patterns like polymorphic components, render props, compound components and others
category: react
tags:
  [
    react,
    placeholder,
    props,
    polymorphic,
    components,
    controlled,
    uncontrolled,
    render,
    compound,
  ]
hero: ./patterns-teo-duldulao-4op9_2Bt2Eg-unsplash.jpeg
heroAlt: Brown triangular pattern
heroCredit: 'Photo by [Teo Duldulao](https://unsplash.com/@teowithacamera)'
---

A few months ago I wrote about [React custom Hooks vs. Mixins](/blog/react-custom-hooks-mixins/) discussing how they were surprisingly similar patterns for sharing stateful, non-visual logic. It got me thinking about the other React component patterns. These patterns exist to create reusable and extendable components so that we don't have to rewrite **display/layout, visual look-and-feel, and/or UI logic**.

But before we look at these patterns, let's quickly review the standard React component with normal props. It's the easiest to develop and also the easiest to use.

```js
import classNames from 'classnames'

const Button = ({ children, onClick, size = 'large', variant = 'primary' }) => {
  return (
    <button onClick={onClick} className={classNames(variant, size)}>
      {children}
    </button>
  )
}
```

The `Button` component has 5 props that allow its parent component to configure it. The `children` prop configures the display, the `size` and `variant` props configure the visual look-and-feel, and the `onClick` prop configures the UI logic.

The combination of just those 4 props allow for various different button user experiences.

```js
import { useState } from 'react'

const Pagination = ({ initialPage = 1 }) => {
  const [page, setPage] = useState(initialPage)

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setPage((curPage) => curPage - 1)}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setPage((curPage) => curPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}
```

Normal props are great because it gives the shared component total control. The only way to change the component is through those exposed props. However, when we need a shared component to be flexible (either in its UI logic, visual look-and-feel, or display/layout) normal props begin to break down. We start having to expose more and more props to allow parent components the flexibility in customization that they desire.

So there are other React component patterns to offload responsibility to the parent component of a shared component in order to make it more flexible. **This process is typically called inversion of control.** I want to break down the most popular React patterns, describing their primary use case(s).

Let's jump right in!

---

## 1. Placeholder props

Placeholder props work much like regular props except they are React nodes (`PropTypes.node` or `ReactNode` in TypeScript).

```js
import classNames from 'classnames'

const Button = ({
  children,
  // highlight-next-line
  endIcon,
  onClick,
  size = 'large',
  // highlight-next-line
  startIcon,
  variant = 'primary',
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames(variant, size, {
        'has-start-icon': !!startIcon,
        'has-end-icon': !!endIcon,
      })}
    >
      // highlight-next-line
      {startIcon}
      {children}
      // highlight-next-line
      {endIcon}
    </button>
  )
}
```

**The placeholder props pattern allows the shared component to control its layout and any logic, but give some control to the parent for the display.** So for our `Button` component, the `startIcon` & `endIcon` props can be `<svg>` elements, `<img>` tags, or even other React components. `Button` doesn't know and it doesn't care. But it does still control the layout of the icons relative to the button contents.

```js
import { useState } from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

const Pagination = ({ initialPage = 1 }) => {
  const [page, setPage] = useState(initialPage)

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setPage((curPage) => curPage - 1)}
          // highlight-next-line
          startIcon={<ChevronLeftIcon />}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setPage((curPage) => curPage + 1)}
        // highlight-next-line
        endIcon={<ChevronRightIcon />}
      >
        Next
      </Button>
    </div>
  )
}
```

In fact, the `children` prop is a placeholder prop too. The `variant` and `size` props likely control the color and size of the button text. But if we wanted the text to be bold, we can wrap it in a `<strong>` element without having to add a `isBold` boolean prop.

---

## 2. Polymorphic components

What happens when we want a link (`<a>`) that looks like our `<Button>`? That can be confusing UX, so we should push back on our designer. But when they say that's _really_ what they want, what do we do? 😅

Do we add an `isLink` prop as well as an `href` prop that only applies when `isLink` is `true`? What about other `<a>` props like `target` or `rel`? What about other `<button>` props like `name` or `value`?

This is where the polymorphic component pattern comes in. It has a special prop (typically called `as` or `component`) that controls the root element of the shared component.

```js
import classNames from 'classnames'

const Button = ({
  // highlight-next-line
  as: Component = 'button',
  children,
  onClick,
  size = 'large',
  variant = 'primary',
  // highlight-next-line
  ...otherProps
}) => {
  return (
    // highlight-next-line
    <Component
      onClick={onClick}
      className={classNames(variant, size)}
      // highlight-next-line
      {...otherProps}
    >
      {children}
      // highlight-next-line
    </Component>
  )
}
```

The `as` prop defaults to `'button'` so that it renders a `<button>` by default, but it can be overridden by a parent component. We also configure `Button` to pass through additional props to the root element.

> We rename the `as` prop to `Component` because **all React custom components must start with a capital letter.** If left the `as` variable name, React would assume its an HTML element and render `<as>` into the DOM.

```js
const LinkPagination = ({ page = 1 }) => {
  return (
    <div>
      {page > 1 && (
        <Button
          // highlight-start
          as="a"
          href={`/items/${page - 1}`}
          // highlight-end
          size="small"
          variant="secondary"
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        // highlight-start
        as="a"
        href={`/items/${page + 1}`}
        // highlight-end
        size="small"
        variant="secondary"
      >
        Next
      </Button>
    </div>
  )
}
```

So now instead of rendering `<button>` elements with the `Button` component, we are rendering `<a>` elements. And because the `Button` component will spread any additional props to the `<a>`, the `href` gets properly included with the `<a>`.

**The polymorphic component pattern comes in handy when we need flexibility on the rendered element.** For semantic HTML or accessibility reasons, we may need to change the root element. In fact, we could pass another React component as the `as` prop (such as the [`<Link>`](https://reactrouter.com/web/api/Link) from [`react-router`](https://reactrouter.com/web)).

```js
import { Link } from 'react-router-dom'

const RouterLinkPagination = ({ page = 1 }) => {
  return (
    <div>
      {page > 1 && (
        <Button
          // highlight-start
          as={Link}
          to={`/items/${page - 1}`}
          // highlight-end
          size="small"
          variant="secondary"
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        // highlight-start
        as={Link}
        to={`/items/${page + 1}`}
        // highlight-end
        size="small"
        variant="secondary"
      >
        Next
      </Button>
    </div>
  )
}
```

> Defining polymorphic components in TypeScript is pretty complex in order for TypeScript to properly type the `otherProps` that are passed in with the `as` prop. I wrote a post called [Polymorphic React Components in TypeScript](/blog/polymorphic-react-components-typescript/) last November that should help!

---

## 3. Controlled components

The controlled components pattern is a subtle yet important pattern. We first learn about [controlled components](https://fb.me/react-controlled-components) when dealing with HTML form elements (like `<input>`, `<select>`, and `<textarea>`) in React. But it can also apply to any interactive component that we create.

Let's take our original `Pagination` component.

```js
import { useState } from 'react'

const Pagination = ({ initialPage = 1 }) => {
  const [page, setPage] = useState(initialPage)

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setPage((curPage) => curPage - 1)}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setPage((curPage) => curPage + 1)}
      >
        Next
      </Button>
    </div>
  )
}
```

When we render it in a parent component, we can specify the `initialPage` to indicate on what page we would like pagination to begin.

```jsx
<Pagination initialPage={3} />
```

But after that, as the user clicks around, the `Pagination` component maintains the up-to-date page state. This approach is probably the default way we would implement the interactivity of the `Pagination` component. **We have made `Pagination` an "uncontrolled component."** However, what happens when the parent component needs to know about the current page in order to update its UI?

React teaches us that we need to [lift up the state](https://reactjs.org/docs/lifting-state-up.html) to the parent component so that the parent will now be responsible for maintaining the page state.

```js
import { useState } from 'react'

const Results = () => {
  // highlight-next-line
  const [page, setPage] = useState(1)

  return (
    <div>
      {/* render search, sort & other UI components */}
      {/* render items */}
      // highlight-next-line
      <Pagination page={page} onPageChange={setPage} />
    </div>
  )
}
```

Because the parent `Results` component is now in charge of the `page` state, the `initialPage` prop on `<Pagination>` becomes simply `page`. We also need to add an `onPageChange` prop in order for the `Pagination` component to notify its parent of the newly selected page. **We have now made `Pagination` a "controlled component".** It's no longer responsible for its state. Instead the parent passes in its state and `Pagination` communicates changes back to the parent using a callback prop.

We implement the controlled components pattern when we enable `Pagination` to be either an uncontrolled or controlled component depending on what props the parent passes.

```js
import { useState } from 'react'

const Pagination = ({
  initialPage = 1,
  // highlight-start
  page: controlledPage,
  onPageChange,
  // highlight-end
}) => {
  // highlight-start
  const isControlled = controlledPage !== undefined
  const [pageState, setPage] = useState(initialPage)

  // when `page` prop is specified, the component is controlled by parent
  // otherwise it's uncontrolled so use internal `pageState`
  const page = isControlled ? controlledPage : pageState

  const setNewPage = (nextPage) => {
    // only set internal state if `Pagination` is uncontrolled
    if (!isControlled) {
      setPage(nextPage)
    }

    // call `onPageChange` if it exists using optional chaining
    onPageChange?.(nextPage)
  }
  // highlight-end

  return (
    <div>
      {page > 1 && (
        <Button
          size="small"
          variant="secondary"
          onClick={() => setNewPage(page - 1)}
        >
          Previous
        </Button>
      )}
      <span>Current page: {page}</span>
      <Button
        size="small"
        variant="secondary"
        onClick={() => setNewPage(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}
```

The `Pagination` component now maintains the internal state when it is uncontrolled, but doesn't use it when it is controlled (i.e. the `page` prop is specified).

As we can see, the implementation is a bit complex, so it's best to only use the pattern when absolutely necessary. **The controlled components pattern gives the parent flexible control over the shared component's UI logic.** But typically we only need one or the other. When we need a shared interactive component to be controlled, we can make it controlled for all use cases. If parent components don't need to know the internal state of the shared component, make it always uncontrolled.

> The [Material-UI](https://material-ui.com/) React component library has a [`useControlled`](https://github.com/mui-org/material-ui/blob/2a4a13d4f2ece77f29c4752fa830f69e4b609c79/packages/material-ui-utils/src/useControlled.js) custom Hook that abstracts the complexity around maintaining both the controlled and uncontrolled state. I think I'll do a future blog post on how it works. 😉

---

## 4. Render props

Let's expand on our shared `Results` component from above. In addition to maintaining page state and rendering a `<Pagination>` component, we now want it to also display a list of items. This `Results` component is going to maintain the logic for sorting, filtering, and paginating the list of items, as well as provide the UI elements that control these actions. It could even provide a toggle for "grid" versus "list" view.

The `Results` component needs the raw data array as a prop so that it can do all the data processing, but it doesn't actually care what it ultimately renders. It wants to control the UI logic and the layout, but give the parent component control over the visual look-and-feel and display of the items.

This situation is a prime candidate for a [render prop](https://ui.dev/react-render-props/).

```js
import { useState, useMemo } from 'react'

const Results = ({
  initialFilter = '',
  initialPage = 1,
  initialPageSize = 20,
  initialSort = 'ascending',
  initialView = 'list',
  items,
  renderItem,
}) => {
  // maintain the filter state
  const [filter, setFilter] = useState(initialFilter)
  const [page, setPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [sort, setSort] = useState(initialSort)
  const [view, setView] = useState(initialView)

  // filter the data, memoizing so we don't recalculate
  // the same filtered list
  const filteredItems = useMemo(() => {
    return items
      .filter((item) => item.title.includes(filter))
      .sort((itemA, itemB) =>
        sort === 'ascending'
          ? itemA.title.localeCompare(itemB.title)
          : itemB.title.localeCompare(itemA.title),
      )
      .slice(pageSize * (page - 1), pageSize)
  }, [items, filter, page, pageSize, sort])

  // render internal UI elements & loop through the
  // `filteredItems` to allow parent to render each item
  // based on the selected `view`
  return (
    <div>
      <Search query={filter} onChange={setFilter} />
      <Sort value={sort} onChange={setSort} />
      <ViewToggle value={view} onChange={setView} />

      <div>
        // highlight-start
        {filteredItems.map((item) => renderItem({ item, view }))}
        // highlight-end
      </div>

      <Pagination
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
```

There's a lot of code, but really the highlighted part is all that matters. The `Results` component calculates which items to show based on the filter state it maintains (caching the results with [`useMemo`](https://reactjs.org/docs/hooks-reference.html#usememo)). The `<Search>`, `<Sort>`, `<ViewToggle>` and `<Pagination>` are components it renders in a specific layout to change that filter state. The only part it doesn't render is the actual items.

> By using the `inital*` props that initialize the state, `Results` is an uncontrolled component.

The `renderItem` prop is a function prop but it's not like our traditional callback function props like `onClick` or `onChange`. The `renderItem` prop returns UI to render. We call `renderItem` passing it an object with the `item` and the current `view`.

```js
import { useState, useEffect } from 'react'
import { loadProducts } from '../utils/products'
import ProductGridItem from '../components/ProductGridItem'
import ProductListItem from '../components/ProductListItem'

const Page = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    loadProducts().then(setProducts)
  }, [])

  return (
    // highlight-start
    <Results
      items={products}
      renderItem={({ item, view }) => {
        return view === 'grid' ? (
          <ProductGridItem product={item} />
        ) : (
          <ProductListItem product={item} />
        )
      }}
    />
    // highlight-end
  )
}
```

The `<Results />` component does most of the work for us because we pass it the `products` as the `items` prop. But when it comes to render the actual visual element, we control it by rendering either a `<ProductGridItem>` or `<ProductListItem>` depending on the specified view passed to the `renderItem` prop. And if we passed a list of NBA `players` instead of `products`, within the `renderItem` prop we would render a `<PlayerGridItem>` or `<PlayerListItem>` instead.

**So the render prop pattern comes in handy when a shared component needs to control stateful logic (list filtering in our case) and layout of any common UI (filtering/pagination UI in our case), but the visual look-and-feel is left to the parent component.**

The render prop itself can be named anything. Here we named it `renderItem` to provide clarity for what should be rendered. More narrow-focused components will use the `children` prop where we pass a render function as the contents of the component instead of other JSX. Naming the prop `render` is also common.

> If you've heard of the [higher-order component (HOC) pattern](https://ui.dev/react-higher-order-components/) before it solves the same use cases as render props. Render props have less gotchas and a simpler API so HOCs really are no longer needed.

---

## 5. Compound components

The compound components pattern typically comes in handy with larger components that have related child components that we also want to configure. Instead of having props defined on the main component that exist just to pass down to its internal children, we render the children directly.

Let's look at our `Results` component from before that was using a render prop.

```js
const Results = ({
  // `initial*` props...
  items,
  renderItem,
}) => {
  // define state...
  // calculate filteredItems...

  return (
    <div>
      <Search query={filter} onChange={setFilter} />
      <Sort value={sort} onChange={setSort} />
      <ViewToggle value={view} onChange={setView} />

      <div>{filteredItems.map((item) => renderItem({ item, view }))}</div>

      <Pagination
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  )
}
```

The `Results` component has `100%` control of how the `<Search>` component looks, where it's placed in the UI layout, and even if it exists. If we wanted to give visual and layout control to its parent component, we'd have to expose more props.

```js
const Results = ({
  // other props...
  // highlight-start
  searchLocation = 'top', // 'none' means hide
  searchProps,
  // highlight-end
}) => {
  // define state...
  // calculate filteredItems...

  return (
    <div>
      // highlight-start
      {searchLocation === 'top' && (
        <Search query={filter} onChange={setFilter} {...searchProps} />
      )}
      // highlight-end
      {/* other UI... */}
      //highlight-start
      {searchLocation === 'bottom' && (
        <Search query={filter} onChange={setFilter} {...searchProps} />
      )}
      //highlight-end
    </div>
  )
}
```

We added `searchLocation` (`'top'`, `'bottom'` or `'none'`) to control the location of `<Search>`, as well as `searchProps` to pass more configuration options (search icon, `placeholder`, etc). Now imagine also doing this for `<Sort>`, `<ViewToggle>`, and `<Pagination>`. What if we want to have a `<Pagination>` above the list of items? What if we want `<Search>` above and below? What if we want `<ViewToggle>` to come _before_ `<Sort>`? If `Results` really needed this level of configuration, **we would have a props explosion**.

So instead of rendering our `<Results>` component with a lot of props...

```jsx
<Results
  initialSort="ascending"
  initialPage={3}
  items={products}
  renderItem={({ item, view }) => {
    return view === 'grid' ? (
      <ProductGridItem product={item} />
    ) : (
      <ProductListItem product={item} />
    )
  }}
  // highlight-start
  searchLocation="bottom"
  searchProps={{
    startIcon: <SearchIcon />,
    placeholder: 'Search millions of products',
  }}
  sortLocation="top"
  sortProps={{
    width: 'full',
  }}
  paginationLocation="both"
  // highlight-end
/>
```

...the compound components pattern allows us to render the sub-components directly so that we can configure and order them ourselves.

```jsx
<Results initialSort="ascending" initialPage={3} items={products}>
  <ResultsSort width="full" />
  <ResultsViewToggle />
  <ResultsPagination size="large" />

  <ResultsItems>
    {({ item, view }) => {
      return view === 'grid' ? (
        <ProductGridItem product={item} />
      ) : (
        <ProductListItem product={item} />
      )
    }}
  </ResultsItems>

  <ResultsSearch
    startIcon={<SearchIcon />}
    placeholder="Search millions of products"
  />
  <ResultsPagination size="small" />
</Results>
```

Notice how `ResultsSort` and all of the others no longer specify their `value` & `onChange` props. All we need to do is pass in the UI configurations and `Results` is able to do the rest. Internally `Results`, `ResultsItems`, `ResultsSort`, and all of the other components communicate UI changes using [React context](https://reactjs.org/docs/hooks-reference.html#usecontext). How to build a compound component is a post unto itself, so I won't be able to get into the implementation details here. Instead read [React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks) for more info on how that all works.

**When we require full customization of multiple interconnected components, the compound components pattern is very helpful.** However, it's much more complex to implement. Also we always have to render the sub-components (`<ResultsViewToggle>`, `<ResultsPagination>`, etc.) even if we're fine with the defaults. So while it makes the complex use case easier, it makes the simple use case more complex.

---

So those are the 5 popular UI patterns that I see to provide different levels of flexibility to shared React components. However, more flexibility typically also brings more complexity with it. So only use the pattern you need. Most of the time, the regular React component with vanilla props does the job.

I intentionally left off [React custom Hooks](https://reactjs.org/docs/hooks-intro.html) from the list because I wanted to focus on advanced _UI patterns_. React Hooks themselves do not (typically) render any UI. Instead they abstract stateful, non-visual logic.

What other patterns are you using in your shareable components in order to reuse UI logic, visual look-and-feel, and display/layout? Let's keep the conversation going on Twitter. Reach out at [@benmvp](https://twitter.com/benmvp).

Keep learning my friends. 🤓
