---
date: 2020-08-27
title: Configurability in a Design System
shortDescription: Thoughts on how developers prioritize flexibility when using your JS component library
category: 'Design System'
tags: [react, design-system, javascript, components]
hero: ./mac-option-key-hannah-joshua-46T6nVjRc2w-unsplash.jpg
heroAlt: Photo of a the Option key on a Mac keyboard
heroCredit: 'Photo by [hannah joshua](hhttps://unsplash.com/@hannahjoshua)'
---

A few months ago I wrote a post called [What exactly is a "Design System"?](/blog/what-exactly-is-a-design-system/). And at the very end, I mentioned that I'd share more thoughts on "how to spin up and maintain a React component library." So in this post, I'm beginning that process.

An organization will create a JavaScript component library to be a shared abstraction of components to encapsulate aesthetics and logic. As a result, developers don't have to keep rebuilding these components every time they need them in a different app. The component library is intended to **allow feature/product engineers to focus on the business logic of the app** instead of having to build yet another dialog component.

Once you start building your component library, one of the first questions you will have to decide is how configurable do you want to make your components. A component with very little configuration will be 100% on-brand and will be very easy to use. However, if small tweaks are needed to match the design, that rigid component can cause a lot of friction. Conversely, a component with full flexibility is more likely to adapt to any given design, but not only requires **more effort in building and maintaining the flexibility in the code**, but also more effort into learning _how_ to configure it to match the design.

When thinking about how flexible I should make a component, I try to consider how likely the dev using the component will want to configure a certain area of functionality. Some areas I'm almost certain they'll say "please don't make me think about this." But other areas they'll likely say "I really need to tweak this."

I've come up with 6 areas of functionality, and ordered them from least to most likely to need flexibility. Let's jump in.

---

## 1. Cross-browser compatibility

In a world where [Chrome](https://www.google.com/chrome/), [Firefox](https://www.mozilla.org/en-US/firefox/new/), [Edge](https://www.microsoft.com/en-us/edge), and [Safari](https://www.apple.com/safari/) are all evergreen browsers continuously updating with new features, cross-browser issues aren't what they used to be. But [Internet Explorer](https://www.microsoft.com/en-us/download/internet-explorer.aspx) is still a browser that many organizations have to support and Mobile Safari has basically become the new IE with all of its idiosyncrasies.

Developers using a component from the library definitely **do not want to have to worry or deal with cross-browser compatibility**. Their expectation is that the component will work in all of their supported browsers. In public component libraries (such as [Material UI](https://material-ui.com/)), you may find configurations that will turn off snazzy features if you need to support older or finicky browsers. But given that your component library is built by the organization for the organization, the supported browsers should already be known. As a result, there really is no reason to have flexibility that is tied to cross-browser support.

**My suggestion:** Keep it "inflexible" by having all of the components in the library support all of the necessary browsers.

## 2. Accessibility

I don't know about you, but it felt like 2019 was _finally_ when companies started taking web accessibility seriously. We've always had frontend engineers who have been passionate about accessibility, but it's **always been hard to get accessibility improvements prioritized** by the organization. It took [Domino's getting sued for their inaccessible website](https://www.cnbc.com/2019/10/07/dominos-supreme-court.html) for the wake-up call to happen.

We can get a lot of accessibility "out of the box" by using [semantic HTML](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML) (hello there `<label>` 👋🏾. But with more complex UI components, a deeper understanding of accessibility standards is required. And even though I would love everyone working on the web to be accessibility experts, in reality **it's not reasonable to expect everyone to have a deep understanding of accessibility**. We all can't know everything.

But that's where the component library comes in! Just like with cross-browser compatibility, accessibility is another feature that devs generally do not want to have to worry about. Building a date picker or a modal requires [ARIA attributes](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA), [trapping focus](https://css-tricks.com/a-css-approach-to-trap-focus-inside-of-an-element/), and other "fun" additions to ensure that the component is fully accessible. Teams using a fully-accessible library ensures their app is accessible (for the most part).

**My suggestion:** Avoid exposing accessibility attributes directly. For example, if you need to set an [`aria-labelledby`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-labelledby_attribute) attribute of an element, your component can accept a required `id`. The fact that these configurations ultimately affect accessibility is abstracted and you can use these configurations for multiple different purposes. In general, you shouldn't need to provide flexibility around accessibility because your components should always be accessible. 👍🏾

## 3. Color

Presumably, your design system has a color palette with shades of blues, reds, greens, and other colors. All of these colors are "on-brand." The color palette should have a wide enough range of shades and hues so that designers and developers alike don't have to come up with their own colors for their use cases.

> By the way, your design team needs to ensure that the colors used for interactive elements, such as links, have the proper [color contrast](https://webaim.org/articles/contrast/) for accessibility

In general, you're going to want body text to always be the same shade of dark gray, links to be the same shade of blue, and errors to be the same shade of red. It's not something you would want configurable on a per-component basis, nor would developers want to have to configure them when using components from the library. These colors should be rigidly baked into the components.

However, what happens when your app needs to support dark mode? Or what if you want the Admin portal of your app to have a different color palette from the customer-facing side? Your component now can have multiple different color schemes. And now, you're **effectively supporting theming** in your components. You're still not allowing a component to have an arbitrary color palette, but it can indirectly support different colors via a specified or inherited theme.

So instead of the text of a component being explicitly dark gray, it'll instead be an abstracted `text-body-color`. In the default theme, the text will be dark gray, but for the "dark mode" theme it'll likely be white.

**My suggestion:** Approach theming with caution. A theming engine is not only complex to build, but also complex to design & develop components with proper color abstractions. Only build it if your apps really need it. If you find apps having to hack CSS in order to customize colors, then you can consider adding a theming engine.

## 4. User interaction

The UI logic is basically how the component works, so **the majority of it shouldn't be configurable.** Otherwise, you're giving the developer too much control and too much configuration responsibility. However, developers will want some flexibility to change how the component functions in different use cases.

For instance, if you have a text input component that supports validation, you'll likely want to configure whether it does synchronous or asynchronous validation, displays validation errors immediately or on form submit, etc. You'll want to enable the component to be able to be used in its common scenarios. The trick and the difficulty is not to enable all of these "what-if" situations (i.e. [YAGNI](https://martinfowler.com/bliki/Yagni.html)), but instead, **build for known or highly likely scenarios.**

Similarly, for an image carousel, a dev may need to send tracking data every time the user paginates. As a result, the component needs to accept a function that it'll call when the user clicks the next/previous buttons (i.e. `onNext`/`onPrevious`). This gives control back to the dev in order for them to make the track request.

**My suggestion:** Provide the minimal set of configurations needed to make the component work in its known use cases. The more options, the more complex the component will be to configure for developers and for you to maintain. Also provide **inversion of control through callback functions** that can be triggered at key user interaction moments, enabling devs to handle their special code that should not be baked into the component.

## 5. Visual design

This is all about one-offs. Special, snowflake cases where a developer wants to use your component and all of its accessibility, cross-browser support and UI logic, but **needs it to look different from the design system**. For simplicity, let's use your button component as an example. It comes in a few standard colors and sizes, but now a developer needs a "Buy with PayPal" button on the shop page. It's a different color/size, has the PayPal logo, has a different focus state, etc.

You likely already have a `variant` configuration of your button component that accepts `primary`/`secondary`/`tertiary` and internally maps those to their appropriate colors and sizes. This gives the dev the least amount of control, but **gives the app the greatest amount of visual consistency**. However, now the dev has no way to create their PayPal button (with all the UI logic, accessibility & cross-browser support of the official button component) without a bunch of unsupported CSS hackery.

Instead of a `variant` option, you _could_ make the button component more flexible, providing several options to control the button color, variable sizing, focus state, and anything else needed to build a one-off PayPal button. However, this will likely have an adverse side-effect of a lack of visual consistency across apps because more permutations of buttons can now be created.

**My suggestion:** Follow the principle of "make the common case easy, and the special case _possible_." Provide an optional **inversion of control where the developer can render the UI themselves**, while your component handles all the UI logic, accessibility, etc.

We want the standard/common case, using the `variant` configuration, to be easy. And instead of providing micro flexibility by adding many extra configurations, we provide (optional) full flexibility by offloading all of the rendering to the dev. It will require more work for them, but at least **any visual design will be possible.**

In React, I would use a [render prop](https://reactjs.org/docs/render-props.html) to give control back to the developer. The render prop would receive all of the necessary UI logic handlers and any accessibility attributes, but the dev would be responsible for rendering the actual `<button>`.

```jsx
<Button type="submit">
  {({ ...buttonAttrs }) => (
    <button {...buttonAttrs} className="fancy-styling">
      <svg id="paypal-logo"> ... </svg>
    </button>
  )}
</Button>
```

I live in the React world, so I think in React components, but I'm sure similar patterns exist for [Vue](https://vuejs.org/), [Angular](https://angular.io/), [Svelte](https://svelte.dev/), etc.

## 6. Layout & spacing

Layout & spacing is where I find the most friction in my component libraries, but is usually the highest priority of configuration for users of the library. For small, atomic components like buttons, inputs, etc. wanting to change the internal layout or spacing is typically not a problem. However, the larger the component, the more helpful it is as an abstraction, but the more layout and spacing are baked into the component. And **devs always get designs that need the layout and spacing tweaked.** Always.

Let's take a checkbox list as an example. Typically it will accept an array of options and render corresponding checkbox components. Thanks to UI configurations not only can it internally maintain which checkboxes are checked, but can also ensure at least a minimum or no more than a maximum are checked. There are lots of cool features we can add.

But how should the checkboxes be laid out? You can have an option for `horizontal` or `vertical`. How much spacing should be between them? You can add another option accepting a set of valid gutter values. And what about the individual checkboxes? Where should the boxes be placed relative to the text? **The combinations of options can start to explode and sometimes even be mutually exclusive.**

Similar to the Visual Design case, the developer doesn't want to re-implement the UI logic, accessibility or color palette. They don't even need to change the visual design of the inner checkbox components. They simply want to control the layout. In the past, I would've added options like `orientation`, `spacing`, `checkboxOrientation`, etc. to try to support flexible layouts.

**My suggestion:** Provide another type of **inversion of control where the developer composes components together**, allowing them to define their own layout and spacing. Specifically in React, you can use [compound components](https://kentcdodds.com/blog/compound-components-with-react-hooks).

Before, the `<CheckboxList />` accepted an `options` array prop and rendered the child `<Checkbox />` components on behalf of the developer.

```jsx
<CheckboxList options={[{name: 'no', display: 'No'}, {name: 'yes', display: 'Yes']} />
```

With compound components, the developer is now also responsible for rendering the `<Checkbox />` in whatever layout they choose:

```jsx
<CheckboxList>
  <div className="fancy-layout">
    <Checkbox name="no">No</Checkbox>

    <div> ... other ui ...</div>

    <Checkbox name="yes">Yes</Checkbox>
  </div>
</CheckboxList>
```

The `<CheckboxList />` through the power of [React context](https://reactjs.org/docs/context.html), can still maintain which option is checked, have limits/minimums, and whatever functionality we need. The original approach is certainly simpler to use for the common case. It'll also have some "standard" layout and spacing. But the compound components approach enables full layout and spacing flexibility with a single configuration. And you can provide layout components to make it easier to create "standard" layout and spacing.

---

So that's it! My hope is that as you continue to work on your component library, you will consider these 6 areas of configurability: cross-browser, accessibility, color, UI, visual design, and layout & spacing. You don't want to over-engineer your components, but when these areas of desired flexibility arise, now you have a plan of attack to provide the flexibility in a maintainable way. Wanna chat more? Feel free to reach out to me on Twitter at [@benmvp](https://twitter.com/benmvp).

If you're a React developer and you found these areas of configuration intriguing (particularly Visual Design and Layout & Spacing), I have a 3-hr minishop called [Sharing React Component Logic](/minishops/sharing-react-component-logic/). In it we learn how to write reusable React components using patterns for sharing stateful logic and behavior. We learn about render props, compound components, and other patterns. Join us for the next one!

Keep learning my friends. 🤓
