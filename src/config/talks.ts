export interface Talk {
  categories: string[]
  description: string
  title: string
  retired?: boolean
}

const TALKS = {
  'async-future': {
    title: 'The async future is present',
    categories: ['javascript'],
    description:
      'Event handlers got you feeling "onKeyDown"? Are you stuck in "callback hell"? Promises leaving you a bit "unfulfilled"? Well, "await" no further. The async future is here. Let\'s deep dive into the new ES2017 async functions: what they are, why we should use them, where they are most useful, and how they will dramatically change our approach to asynchronous JavaScript programming. You\'ll never want to pass a callback or handle a promise again.',
  },
  'backbone-to-react': {
    title: 'Backbone to React: an epic journey',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      'React has exploded in popularity. Its declarative syntax and DOM abstraction for components make it an obvious choice for client-side development. But switching from your current framework over to a React-based stack leaves a lot of open questions:\n\nHow do you convince Management that React is the right strategy? Should you transition our app(s) all at once? How do you train up the team? Does your app need to be “isomorphic”? What are some coding best practices to follow?\n\nFor the past year, Eventbrite has been migrating our frontend stack from one centered around Backbone/Marionette over to React. Learn from both our wins and challenges in switching so that you too can make a successful transition.',
  },
  'demystifying-conference-speaking': {
    title: 'Demystifying Conference Speaking',
    categories: ['career'],
    description:
      '"I don\'t know what I\'d talk about."\n"I\'m not good enough to compete with the ‘pros\'."\n"Well, I don\'t even know how the process works."\n"No one will be interested in what I want to talk about anyway."\n\nThese are just some of the reasons that keep potential speakers from sharing their knowledge by giving a talk. Conference speaking is great for networking, personal growth, as well as conquering fears. But when you\'re an aspiring speaker, the process to become one is unclear. In this session, let\'s debunk myths about conference speaking by learning what it takes to go from wanting to speak at conferences to actually delivering your first conference talk.',
  },
  'demystifying-es6': {
    title: 'Demystifying ES6',
    categories: ['javascript'],
    retired: true,
    description:
      "Features from ECMAScript 6, our latest version of JavaScript, have been in browsers since early 2012, and even more functionality is now available in a vast majority of engines in our modern browsers and servers. We've all seen ES6 syntax used in talks and presentations to make the code more compact, but can it really be used right now for cross-browser compatible production code? And what's all the fuss about it anyway?\n\nExperience with JavaScript will help you get the most out of this session, but you don't have to be a JS ninja to leave confident to begin using ES6 right now. We'll cover a little history behind ECMAScript and uncover a broad range of new features, like arrow functions, modules, and rest parameters, that will have you itching to start developing your favorite app in ES6.",
  },
  'enzyme-to-rtl': {
    title: 'Migrating from Enzyme to React Testing Library',
    categories: ['react', 'javascript', 'testing'],
    retired: true,
    description:
      "Enzyme has been a popular JavaScript library for testing React components since its initial release in 2015. But it relies on React internals in order to provide its easy-to-use API. Unfortunately for Enzyme, the much-anticipated React 18 included a wholesale rewrite of these internals in order to support concurrent functionality and other future features. Because supporting React 18 would require an entire team to rewrite all of Enzyme, it is (un-)officially end-of-life. Enzyme tests for a React application that upgrades to React 18 will no longer work because React 18 support isn't coming.\n\nIn this session geared towards developers with Enzyme tests, let's learn how to migrate these tests over to React Testing Library. We'll walk through common testing patterns we've used in Enzyme and how they translate to React Testing Library. By the end, not only will we have examples of how to transition our React tests over to a more modern alternative, but we'll also have learned RTL best practices to ensure our tests mimic how our users use our application.",
  },
  esnext: {
    title: "ES.next features that'll make ya 💃🕺🏾",
    categories: ['javascript'],
    retired: true,
    description:
      "JavaScript is evolving quickly. The mega ES6 specification was released back in 2015, with ES2016 and ES2017 coming in following years. New versions of ECMAScript are now released on a yearly basis with new features going through a 4-stage proposal process. But with build tooling like Babel, we can leverage functionality slated for future versions right now to write even clearer and more concise JavaScript code.\n\nFamiliarity with modern JavaScript features will help you get the most of this session where we'll discuss class properties, null property accessing, and more. Oh, and don't worry if you don't understand all of those terms — you soon will after this session!",
  },
  'es6-workshop': {
    title: 'ES.next Fundamentals Workshop',
    categories: ['javascript'],
    description:
      "JavaScript is evolving quickly. The mega ES6 specification was released in 2015 and is quickly being implemented by modern JS interpreters. New versions of ECMAScript will now be released on a yearly basis with new features going through a 4-stage proposal process. We can leverage features in ES6, ES2016, and those slated for future versions right now to write even clearer and more concise JavaScript code.\n\nExperience with JavaScript will help you get the most out of this hands-on workshop, but you don't have to have a JavaScript black belt to leave feeling confident in \"ES.next.\" Learn how to write cleaner code using arrow functions, destructuring, rest parameters, and other ES.next features you're likely to use and benefit from on a daily basis. Oh, and don't worry if you didn't understand any of those terms — you soon will after this workshop.",
  },
  'mixins-to-hooks': {
    title: 'From Mixins to Custom Hooks: History of sharing in React',
    categories: ['react', 'javascript'],
    description:
      'React’s component-driven design simplifies reusing UI because chunks of markup can be encapsulated into custom components. Likewise, sharing traditional data utilities is straightforward because React is “Just JavaScript”™. But what about sharing non-visual component logic like state shape and lifecycle methods? React has had several approaches over its lifetime to solve this problem: mixins, higher-order components (HOCs), render props, and now hooks, each with their pros and cons.\n\nIn this session geared towards current React developers, let’s take a history lesson on sharing in React in order to better understand how modern-day custom hooks work and the problems they solve. By the end, not only will we know how hooks function, but we’ll also be equipped to pull out non-visual component logic into easily shareable custom hooks in our apps.',
  },
  'future-javascript': {
    title: "Future JavaScript: What's left?",
    categories: ['javascript'],
    description:
      'JavaScript has evolved quickly and continues to do so. The mega ES6 specification was released back in 2015, with four more editions released in successive years. New versions of ECMAScript are released on a yearly basis with new features going through a 4-stage proposal process. So what proposals are left? What do we have to look forward to in 2021 and beyond to help us write even clearer and more concise JavaScript code?\n\nFamiliarity with modern JavaScript will help you get the most of this session where we’ll discuss new features such as optional chaining, nullish coalescing, and more. Oh, and don’t worry if you don’t understand all of those terms — you soon will after this session!',
  },
  flexbox: {
    title: 'Flexing your Flexbox muscles',
    categories: ['css'],
    retired: true,
    description:
      "Building linear layouts in CSS has been hard. Tables are bad, inline-block has quirks, and floats are insufficient. Thankfully the CSS flexible box layout module, aka Flexbox, enables us to elegantly solve our layout problems. While the specification has been around for over four years, increased browser support has finally pushed Flexbox mainstream. Even Bootstrap and Foundation have included it in the latest versions of their layout systems. Let's deep dive into Flexbox: what it is, why you should use it, how it's configured, and where it's most useful.",
  },
  'react-perf': {
    title: 'Help! My React app is slowwwww! 🐢',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "React's sophisticated reconciler (aka the “Virtual DOM”) makes updates to the UI feel fast because it optimizes interactions with the DOM. As a result, we no longer have to worry about how to transition our UI from one state to the next. However, the reconciler is not a silver bullet; even the new Fiber Reconciler. Our React apps can still get sluggish, especially as they grow in size and data. Let's discuss some causes for slow-downs and tools to diagnose problems so that we can speed up our apps.",
  },
  'react-workshop-hooks': {
    title: 'Intro to Modern React using Hooks Workshop',
    categories: ['react', 'javascript'],
    description:
      "React is a JavaScript UI library that makes creating reusable components easy and efficient. In this workshop, we’ll cover the critical concepts of modern React while iteratively building an app using hooks. In this workshop, we'll learn how to:\n\n- Write readable, reusable and composable components\n- Use JSX syntax\n- Work with the Virtual DOM\n- Handle user interactions and synthetic events\n- Maintain application state\n- Make API calls\n- Apply component styling\n- Handle HTML forms & form elements\n- And more...\n\nPrior experience with React is not necessary, but experience with building JavaScript applications will be helpful to hit the ground running. You’ll leave the workshop with all the fundamentals you need to build your own modern apps with React using hooks.",
  },
  'iso-react': {
    title: 'Isomorphic React sans Node?? 🤔',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "React is JavaScript library for building user interfaces that has taken the web development industry by storm. Its declarative syntax and DOM abstraction for components not only make client-side development simple, but also enables server-side rendering of those same components, which enables improved SEO and initial browser load time. But how do you render JavaScript React components server-side if your backend doesn't run on Node? Learn how Eventbrite successfully integrated React with their Python/Django backend so that you can do the same in yours.",
  },
  'junior-dev': {
    title: 'The Junior Dev Dilemma',
    categories: ['career'],
    description:
      "Software engineers that can hit the ground running when they join an organization are in high demand, but the supply of these professional hires is low, especially of seniors. Historically, junior devs came out of college CS programs, but now developer bootcamps are a new source of quality talent flooding the market.\n\nBut how do you interview these junior developers when they don't have any prior professional experience? And once hired, how do you mentor them in order to set them up for success? What are some ideas for helping them grow in their career. Is it even all worth it?\n\nThrough missteps and wins, Eventbrite has interviewed, hired and grown the careers of many bootcamp grads. Come and learn some processes we used to successfully bring on junior devs. Or as a junior dev yourself, the types of organizations you should look out for.",
  },
  'web-dev': {
    title: "Let's web dev like it's 1999!",
    categories: ['css'],
    description:
      "When we “view source” our modern web applications, the code looks nothing like what we originally wrote. At a minimum, it's gone through linting, transpilation, obfuscation, minification, and bundling. And in order to build our beautifully designed apps with sophisticated interactions, we leverage the latest features in HTML, CSS and JavaScript available in our modern evergreen browsers.\n\nHowever, when web development was in its infancy two decades ago, things were drastically different. Sites had hit counters, used frames for navigation, and were updated manually via FTP. We used the blink tag and scrolling marquees! Let's take a walk down memory lane (or have a history lesson) and have some laughs cringing at how sites looked, how they were built, and the rudimentary tooling we had to develop them.",
  },
  'redux-testing-workshop': {
    title: '"Minimally-painful" React-Redux testing Workshop',
    categories: ['react', 'javascript'],
    description:
      'Let’s be honest, no one\\* enjoys writing unit tests... especially for UI code. However, React’s architecture separates the component hierarchy from the DOM, making it much easier to quickly test the user interactions of our components without needing a browser at all. In this workshop, we’ll learn to:\n\n- Test component rendered UI & event handlers\n- Test Redux reducers & synchronous/asynchronous actions\n- Stub libraries that cannot be run outside of the browser\n- Test the integration of components within entire app\n- And more...\n\nPrior experience with React is important to hit the ground running. You’ll leave the workshop with all the fundamentals you need to properly test your own apps with React. Testing probably still won’t be glamorous... but with these lessons it shouldn’t be painful either!',
  },
  'react-testing': {
    title: '"Minimally-painful" UI testing in React',
    categories: ['react', 'javascript'],
    description:
      "Let's be honest, no one\\* enjoys writing unit tests... especially for UI code. JavaScript frameworks traditionally have been heavily tied to the DOM. The only way we could test our components was to run unit tests within headless browsers, or resort to much slower end-to-end tests. However, React's architecture separates the component hierarchy from the DOM, making it much easier to quickly test the user interactions of our components without needing a browser at all.\n\nWhen Eventbrite's Frontend Platform team introduced React to our stack in 2016, we also developed best practices for testing React applications. In this talk, we'll learn some dos and don'ts Eventbrite uses for writing unit tests for React components, including those gnarly complicated cases. Testing probably still won't be glamorous... but with these lessons it shouldn't be painful either!",
  },
  'native-flexbox': {
    title: 'Native Flexbox',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "React Native is a framework for building truly native mobile apps, allowing web developers to leverage their existing JavaScript and React skills to compose rich iOS and Android user interfaces. React Native also uses CSS for styling, particularly Flexbox for layout. Everything is a flex container!\n\nAlthough CSS Flexbox has been around for over 5 years, Flexbox familiarity is still low because legacy IE browsers have prevented its widespread use. In this session geared towards those already familiar with React Native, let's deep dive into Flexbox so we can finally get a solid understanding of all its features. Leave confident to begin building flexible layouts in your apps across all screen sizes.",
  },
  'nav-react': {
    title: 'Navigating the React Solar System',
    categories: ['react', 'javascript'],
    description:
      "React just exploded in popularity. But it's only a UI library, not a full-fledged framework like Angular, Ember or _\\[insert latest JS framework\\]_. We need to create our own \"framework\" by picking from the plethora of libraries in the React solar system. But which ones should we choose? Or better yet, which ones do we actually need? Do we need a Flux implementation? What about handling ES6+, bundling and routing? How does it all come together?!1?!\n\nLet's walk through the tools and helper libraries that surround React. You'll get the most out of the session with familiarity with React and its concepts, but you don't need to be an expert. By the end of the session, you'll have a solid understanding of the ecosystem, know which libraries you should prioritize learning first, and confidently build your own React-based stack.",
  },
  'react-eco': {
    title: 'Navigating the React Ecosystem',
    categories: ['react', 'javascript'],
    description:
      'React has exploded in popularity. But it’s only a UI library, not a full-fledged framework like Angular, Ember or _\\[insert latest JS framework\\]_. We need to create our own “framework” by picking from the plethora of libraries in the React ecosystem. But which ones should we choose? Or better yet, which ones do we actually need? Do we need still a Flux implementation? What about handling forms, bundling and routing? How does it all come together?!1?!\n\nLet’s walk through the tools and helper libraries that surround React. You’ll get the most out of the session with familiarity with React and its concepts, but you don’t need to be an expert. By the end of the session, you’ll have a solid understanding of the ecosystem, know which libraries you should prioritize learning first, and confidently build your own React-based stack.',
  },
  'react-tdd': {
    title: 'A new style of TDD with React and Redux',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "We all agree that having automated tests is good for our projects, but we tend to skimp out on them. Who has time, on tight deadlines, to spend even more time writing tests when we've already verified the app works as expected in the browser? Now test-driven development (TDD) aimed to solve this issue by getting us to write the tests before the feature code. But in practice, it can be more trouble than it's worth when we build complex UI applications or simply don't yet know how we'll build the app.\n\nSo let's learn about a new style of TDD, \"test during development,\" where we verify user interactions by writing tests rather than manually in the browser. The result? Way more tests! And React's architecture separates the component hierarchy from the DOM, making it possible to quickly test the user interactions of our components without needing a browser at all. We'll learn some dos and don'ts for writing unit tests for React components and Redux state, as well as tips and tricks for those gnarly complicated cases. No longer will the tests \"come later\" (i.e. never).",
  },
  'perfect-lib': {
    title: 'The "perfect" library tooling',
    categories: ['divops'],
    description:
      'So you have a great idea for the perfect JS library... but the implementation is only half the battle. You also need to configure the infrastructure to develop, test, build and deploy your package. How do you set up Typescript and other static checking? Do you target ESM or CJS builds? Is integration testing even possible? There’s so much extra to consider!\n\nLet’s learn what makes up the “perfect” library tooling. Familiarity with developing JavaScript packages will help you get the most out of this session, but you will gain plenty of helpful insights even if you have yet to build one. Oh, and don’t worry if you don’t understand all of those terms — you soon will after this session!',
  },
  'react-esnext': {
    title: 'React + ES.next = ♥',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "JavaScript is evolving quickly. The ES6 specification was released back in 2015 and has been implemented by modern browsers. New versions of ECMAScript will now be released on a yearly basis. We can leverage ES6 and functionality slated for future versions right now to write even clearer and more concise React code.\n\nExperience with React will help you get the most out of this session, but you don't have to have a JavaScript black belt to leave feeling confident in using ES.next with React. Learn how to write cleaner code using the new spread operator, classes, modules, destructuring, and other tasty syntactic sugar features being introduced into ECMAScript. Oh, and don't worry if you don't understand all of those terms — you soon will after this session!",
  },
  'react-web-apis': {
    title: 'React + Web APIs = ❤️',
    categories: ['react', 'javascript'],
    description:
      'React is a JavaScript UI library that makes creating reusable components easy and efficient. And modern Web APIs like Fetch, Local storage, and Geolocation when combined with React enable us to create sophisticated user interfaces. But there are even more, lesser-known Web APIs that help us further blur the lines between browser and native apps!\n\nIn this session geared towards React developers of all skill levels, let’s learn about some Web APIs that you may have never heard of before! We’ll look at device diagnostic, interaction, audio, and video APIs — where they are supported and how you can apply them in your next React project.',
  },
  'react-exposed': {
    title: 'React Exposed! 😮',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      'React\'s seemingly "magical" features make developing sophisticated web UIs easy by doing so much heavy lifting for us. Unfortunately, without knowing how certain parts of the "magic" work, we run into confusing React warnings/errors.\n\nWhy can\'t we have "if blocks" in our JSX code? Why do we need to wrap multiple sibling components in a container component? Why do we need to include a "key" attribute on components that are in an array?\n\nIn this session geared towards those familiar with React, let\'s answer these questions by digging deeper into JSX syntax, virtual DOM diffing and other "magical" features. Not only will we be able to prevent errors with a clearer understanding of the "magic," but we can potentially boost rendering performance as well.',
  },
  'react-fiber': {
    title: 'React Fiber for the rest of us',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "Fiber was introduced in version 16 of React. It is a ground-up rewrite of the React scheduler, typically mis-referred to as the “Virtual DOM.” The Fiber-based scheduler supports “cooperative scheduling” and allows for other output renderers besides the browser DOM. In this session geared towards those familiar with React, let's learn about what React Fiber is and why it exists through the lens of how it will impact your React development and the performance of your apps at runtime.",
  },
  'react-workshop': {
    title: 'React FUNdamentals Workshop',
    categories: ['react', 'javascript'],
    description:
      "React is a JavaScript UI library that makes creating reusable components easy and efficient. In this workshop, we'll cover the critical concepts of React via a series of targeted exercises. We'll learn how to:\n\n- Write readable, reusable and composable components\n- Use JSX syntax\n- Work with the Virtual DOM\n- Handle user interactions and synthetic events\n- Leverage ES6 to maintain application state\n- Make API calls\n- Apply component styling\n- Hook into the component lifecycle\n- And more...\n\nPrior experience with React is not necessary, but experience with building JavaScript applications will be helpful to hit the ground running. You'll leave the workshop with all the fundamentals you need to build your own apps with React.",
  },
  'react-style': {
    title: 'React in style 😎',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "React is a JavaScript UI library that makes creating reusable components easy and efficient. However, there is no single approach for styling these components. “Css-in-js” libraries like glamorous and styled-components are the new hotness, but there are other viable approaches for beautifying our React apps as well. So let's walk through these options for styling components. Familiarity with React will help you get the most out of this session. And by the end, you'll have a solid understanding of the various approaches to make an informed styling decision in your React project.",
  },
  'react-properly': {
    title: 'React Properly',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      'React is a JavaScript library for building user interfaces. Its declarative JSX syntax and virtual DOM abstraction provide wonderful development ergonomics and great performance. But even with all of the "magic" that React provides, it\'s still easy to write suboptimal React code.\n\nEventbrite recently transitioned from a Backbone/Marionette stack over to a React-based one. We developed many React best practices from the very beginning to provide code consistency and prevent immediate technical debt from poorly written code. In this session geared towards developers already familiar with React, let\'s walk through the guidelines and rules Eventbrite adopted so we can apply them to our own teams and projects.',
  },
  es6: {
    title: 'Sugar & Spice and everything nice about ES6',
    categories: ['javascript'],
    retired: true,
    description:
      "ECMAScript 6 is the new version of JavaScript making its way into the engines of our modern browsers and servers. Some of its features appear to be no more than a little syntax sugar — making development we already do in JavaScript a bit easier. Others add brand new functionality long missing in JavaScript, which allow us to spice up our code without having to include yet another library.\n\nExperience with JavaScript will help you get the most out of this session, but you don't have to be a JS ninja to leave confident to begin using ES6 right now. Let's walk through all the sugar and spice of ES6 and what makes it just so nice for code readability. Along the way, you'll learn about arrow functions, destructuring, rest parameters, and other features. We'll also see strategies for how we can circumvent that pesky issue of cross-browser compatibility. Oh, and don't worry if you didn't understand any of those terms — you will after the session.",
  },
  'sweet-es6': {
    title: 'Sweet ES6',
    categories: ['javascript'],
    retired: true,
    description:
      "ECMAScript 6 is the new version of JavaScript and is already available in the engines of our modern browsers and servers. Many of its features are just a little syntactic sugar to help make our JavaScript code clearer and more concise. Experience with JavaScript will help you get the most out of this session, but you don't have to have a JavaScript black belt to leave feeling confident in ES6.\n\nLearn how to write cleaner code using arrow functions, destructuring, rest parameters, and other sweet ES6 features. Oh, and don't worry if you didn't understand any of those terms — you soon will after this session.",
  },
  'typescript-react': {
    title: 'TypeScript + React = ❤️',
    categories: ['react', 'typescript'],
    description:
      'TypeScript is a JavaScript superset that compiles down to vanilla JavaScript and has become increasingly popular. TypeScript proponents proclaim that it eliminates entire classes of bugs that affect our applications. But what exactly are those bugs? Which ones are particular to building React components and applications? Is TypeScript worth the learning curve?\n\nIn this session geared towards devs with prior experience building React applications, let’s answer those questions. We’ll walk through the common bugs that infect our apps and learn how the use of strong types with TypeScript can help prevent them. After the session, you’ll be itching to try it out in your next project!',
  },
  'why-react': {
    title: 'Why choose React?',
    categories: ['react', 'javascript'],
    retired: true,
    description:
      "As the Frontend Platform team at Eventbrite switched from Backbone/Marionette over to React, it had to convince other developers, managers, directors, and non-engineers that React was the right path. And the rationale for moving wasn't just because React is insanely popular. There are many tangible benefits that make the effort of migrating worthwhile.\n\nNew to React and want to learn a little about how it works? Seeking ammunition to convince your team to make the change? Come learn about _why_ we made the decision to transition to React, through an introduction of _how_ to build user interactions with React.",
  },
  'web-apis': {
    title: 'Wait... the Web can do what?1?!',
    categories: ['web'],
    description:
      "ES.next, React, CSS Grid, Service Workers and other new technologies are getting all the attention within the frontend community. They enable us to easily build sophisticated UIs across all devices. But there are even more, lesser-known Web APIs that help us further blur the lines between browser and native apps!\n\nIn this session geared towards frontend engineers of all skill levels, let's learn about some Web APIs that you may have never heard of before! We'll look at audio, video, interaction, and device diagnostic APIs — where they are supported and how you can apply them in your next project.",
  },
  'no-js': {
    title: "You don't need JavaScript for that!",
    categories: ['css'],
    retired: true,
    description:
      "We have been using JavaScript toolkits like jQuery for nearly a decade to make manipulating the DOM easier as we create our highly-interactive web apps. New features in HTML5 & CSS3 should've made old development strategies obsolete, and yet we're still using jQuery to do things better suited for HTML5 & CSS3. Why? Well, old habits die hard.\n\nIn this session, let's look at ways we used to build interactivity in JavaScript and see how we can transform them into more optimal solutions using plain old HTML and CSS. We'll discuss CSS3 transitions & animations, new HTML5 attributes, and other \"tricks\" to offload JavaScript functionality to the browser's rendering engine for more performant web applications. Whether you're a seasoned JavaScripter or just getting started, you'll leave the session with fresh ideas to work with.",
  },
  'nextjs-rendering': {
    title: '50 shades of React rendering with Next.js',
    categories: ['javascript', 'react', 'nextjs', 'web'],
    description:
      "CSR. SSG. SSR. ISR. These acronyms may seem similar, but they represent different rendering methods for React applications. In the past, we had to commit to a single rendering approach for the entire app, but with Next.js, we have the flexibility to choose the optimal rendering type for each page. This hybrid approach aligns closely with the unique needs of our applications. Imagine a landing page with static content that updates only when the code changes, a universally consistent page that undergoes frequent changes, and a personalized logged-in page with content tailored to each user—all rendered differently within a single application.\n\nThis session is designed for React developers of all backgrounds. We'll explore the various types of rendering methods and deep dive into how Next.js empowers us to leverage them effectively. By the end of this talk, you'll not only gain a comprehensive understanding of these different rendering methods but also have the confidence to make informed decisions that maximize the potential of your React applications.",
  },
  divops: {
    title: '"DivOps" Engineering: Unveiling the fusion of Frontend and DevOps',
    categories: ['divops', 'javascript', 'web'],
    description:
      'As web application architecture continues to evolve, the role of frontend engineers has expanded beyond `src/`. The need to enhance the developer experience and ensure project health has given rise to a new era of responsibilities for frontend developers. While these tasks may not involve building UI features directly, they encompass critical areas such as app configurations, build scripts, CI/CD maintenance, and more. But what should we call this disciple? Is it Frontend Platform? Frontend Infra? Frontend... DevOps?\n\nThis session introduces "DivOps," the fusion of Frontend and DevOps. Designed for web app developers of all levels, this talk deep dives into all the responsibilities of DivOps engineering and its major impact on our development environments, testing procedures, CI/CD workflows, and beyond. Through real-world examples and insights, you will gain a deeper understanding of the qualities that make a successful DivOps engineer and realize that you\'re likely one too.',
  },
  'shopping-ai': {
    title: 'GPT-powered AI Shopping: From Search to Delight',
    categories: ['ai', 'openai', 'gemini', 'javascript', 'web'],
    description: `Tired of generic chatbots that stumble through product recommendations? Imagine an AI assistant with an intimate understanding of our product catalog and an uncanny grasp for knowing exactly what our customers crave. OpenAI's recently released Function Calls API unlocks this capability, seamlessly fusing GPT's conversational superpower with our personalized understanding of our data.

This talk will delve into building custom AI assistants that respond dynamically to customer preferences by searching our data based on GPT's natural language processing capabilities. Whether you're a CEO envisioning the future of e-commerce, an engineering leader shaping your tech roadmap, a PM crafting engaging experiences, or an individual contributor building the next big innovation, this talk will equip you with the knowledge and tools to unlock the power of conversational AI for your product.

Join us as we learn effective methods for building secure, searchable shopping chatbots using this cutting-edge API and discover best practices for designing conversational flows that delight our customers and drive conversions. By the end, we'll be ready to embrace the future of AI-driven commerce, where every customer feels like a VIP and every purchase is a curated delight.`,
  },
  'divops-workshop': {
    title: 'Hands-On DivOps: Building a Modern Web Application from Scratch',
    categories: ['divops', 'javascript', 'web', 'workshop'],
    description: `“DivOps” is the fusion of frontend development and DevOps practices. It focuses on the tools, processes, and infrastructure that empower frontend engineers to take ownership of development environments, testing procedures, and continuous integration & delivery (CI/CD) workflows. In this intensive 3.5-hour workshop, you will gain hands-on experience and insights into the world of DivOps by building a modern web application architecture from the ground up.

The workshop will include:

- **Monorepo.** Explore the benefits of a monorepo structure and learn how to organize a project for efficient management of components and applications.
- **Component Library.** Add a component library that will allow you to share common UI elements across the monorepo.
- **Main Site.** Integrate the component library into the primary application of the project.
- **Blog.** Include a static site blog that is developed and deployed separately from the main site.
- **Dev Tools & CI/CD.** Configure essential developer tools, set up testing frameworks, and implement a robust Continuous Integration and Continuous Delivery (CI/CD) workflow to streamline your development process.

This workshop is ideal for web app developers of all levels who want to enhance their frontend skills and build a solid foundation in DivOps practices. A basic understanding of JavaScript, React (or similar frontend framework), and command-line tools will help you get the most out of the workshop. By the end of this workshop, you will have the knowledge and experience to confidently apply DivOps principles in your web development projects. Join us if you are excited to learn how to create a maintainable and scalable web application architecture, this workshop is for you!`,
  },
  'sneaky-ai': {
    title: 'Sneaky Ways to Integrate GenAI for Real-World Impact',
    categories: ['ai', 'openai', 'gemini', 'javascript', 'web'],
    description: `AI is no longer just a buzzword; it's a transformative force poised to reshape how we interact with technology. Everyone is trying to create the latest game-changing AI-driven app, but how can we developers leverage GenAI without becoming full-fledged AI experts or overhauling our existing applications?

This talk will move past the academic exercises and explore the "sneaky" ways GenAI can be seamlessly integrated into existing applications to create subtle yet powerful enhancements that elevate the user experience. Through real-world examples and engaging demos, we'll uncover the hidden potential of GenAI to personalize user experiences and unlock new levels of creativity and efficiency.

Leave this talk empowered to harness the power of GenAI, even if you're new to AI. Discover practical strategies and inspiring ideas to infuse your apps with intelligence, delight your users, and stay ahead of the curve in this rapidly evolving technological landscape.`,
  },
}

export type TalkId = keyof typeof TALKS

export default TALKS as Record<TalkId, Talk>
