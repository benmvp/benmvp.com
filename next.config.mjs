/**
 * @type {import('next').Redirect[]}
 */
const SLIDE_SHORT_URLS = [
  {
    source: '/jsfwd-sneaky-ai',
    destination:
      'https://docs.google.com/presentation/d/e/2PACX-1vR-tOqiOULqGQRVo-PiWcGF7vVQkRI1sm11oyFJuGkq4P7DxS1938x8XyROmA9j-BZgCsr0xfc0Oard/pub?start=false&loop=false&delayms=60000',
  },
  {
    source: '/ato-sneaky-ai',
    destination:
      'https://docs.google.com/presentation/d/e/2PACX-1vQgKgkoVnec4xWCLwZskQk7416Ucu-pGTbt9K7Gmzg6ypqhE5DGbPmtBXMK-axlc6ixc6TXRnNkfBpv/pub?start=false&loop=false&delayms=60000',
  },
  {
    source: '/cf-sneaky-ai',
    destination:
      'https://docs.google.com/presentation/d/e/2PACX-1vSn0z1cNgbFN9SKKxGYg2xOjMf2n09ecYQ0HLX9o8aVpryDGDVuSluxq1Nr_kcVGVcRm2hJrpIXzhkq/pub?start=false&loop=false&delayms=60000',
  },
  {
    source: '/cf-ai-shop',
    destination:
      'https://docs.google.com/presentation/d/e/2PACX-1vQwJqE6a0JqOHulGbVfOJ3K3rI9z4iUnUeX__JhIAGpNTz5125dul0HJHQR7dKDWO7MjufN-2EMGmdG/pub?start=false&loop=false&delayms=60000',
  },
  {
    source: '/ct-nextjs',
    destination: 'https://slides.benmvp.com/2024/connecttech/nextjs.html',
  },
  {
    source: '/bit-nextjs',
    destination: 'https://slides.benmvp.com/2024/bit/nextjs.html',
  },
  {
    source: '/rm-nextjs',
    destination: 'https://slides.benmvp.com/2024/reactmiami/nextjs.html',
  },
  {
    source: '/ct-divops',
    destination: 'https://slides.benmvp.com/2023/connecttech/divops.html',
  },
  {
    source: '/hs-phx-ai',
    destination:
      'https://docs.google.com/presentation/d/e/2PACX-1vTrdHIM9kyJsF0-gO1oItpA64gZG2QYUA0GZKkm5T-yCHMm3g0VNe1ytQ3PFCqvch-2v_OXsQSy7dZR/pub?start=false&loop=false&delayms=60000',
  },
  {
    source: '/bit-webdev',
    destination: 'https://slides.benmvp.com/2023/bit/webdev.html',
  },
  {
    source: '/seattlejs-nextjs',
    destination: 'https://slides.benmvp.com/2023/seattlejs/nextjs.html',
  },
  {
    source: '/hsclt-webdev',
    destination: 'https://slides.benmvp.com/2023/halfstackclt/webdev.html',
  },
  {
    source: '/ct-ts-react',
    destination: 'https://slides.benmvp.com/2022/connecttech/ts-react.html',
  },
  {
    source: '/ct-webdev',
    destination: 'https://slides.benmvp.com/2022/connecttech/webdev.html',
  },
  {
    source: '/hb-hooks',
    destination: 'https://slides.benmvp.com/2022/hackbuddy/mixins-hooks.html',
  },
  {
    source: '/hrd-hooks',
    destination:
      'https://slides.benmvp.com/2022/houreactdevs/mixins-hooks.html',
  },
]

/**
 * @type {import('next').Redirect[]}
 */
const OLD_BLOG_REDIRECTS = [
  {
    source: '/talks/',
    destination: '/speak/',
  },
  {
    source: '/learning-es6',
    destination: 'https://learning-es6.benmvp.com/',
  },

  {
    source: '/you-dont-need-js-for-that',
    destination: 'https://you-dont-need-js-for-that.benmvp.com/',
  },
  {
    source: '/react-exposed',
    destination: 'https://react-exposed.benmvp.com/',
  },

  {
    source: '/new-blog/',
    destination: '/blog/new-blog/',
  },
  {
    source: '/learning-es6-history-of-ecmascript/',
    destination: '/blog/learning-es6-history-of-ecmascript/',
  },
  {
    source: '/learning-es6-goals-features-ecmascript-6/',
    destination: '/blog/learning-es6-goals-features-ecmascript-6/',
  },
  {
    source: '/learning-es6-using-es6-right-now/',
    destination: '/blog/learning-es6-using-es6-right-now/',
  },
  {
    source: '/20-reasons-to-drop-ie8-like-its-hot/',
    destination: '/blog/20-reasons-to-drop-ie8-like-its-hot/',
  },
  {
    source: '/learning-es6-arrow-functions/',
    destination: '/blog/learning-es6-arrow-functions/',
  },
  {
    source: '/learning-es6-block-level-scoping-let-const/',
    destination: '/blog/learning-es6-block-level-scoping-let-const/',
  },
  {
    source: '/learning-es6-destructuring/',
    destination: '/blog/learning-es6-destructuring/',
  },
  {
    source: '/speaking-at-little-rock-tech-fest-2015/',
    destination: '/blog/speaking-at-little-rock-tech-fest-2015/',
  },
  {
    source: '/learning-es6-parameter-handling/',
    destination: '/blog/learning-es6-parameter-handling/',
  },
  {
    source: '/learning-es6-enhanced-object-literals/',
    destination: '/blog/learning-es6-enhanced-object-literals/',
  },
  {
    source: '/learning-es6-template-literals-tagged-templates/',
    destination: '/blog/learning-es6-template-literals-tagged-templates/',
  },
  {
    source: '/learning-es6-promises/',
    destination: '/blog/learning-es6-promises/',
  },
  {
    source: '/little-rock-tech-fest-2015/',
    destination: '/blog/little-rock-tech-fest-2015/',
  },
  {
    source: '/nodevember-2015/',
    destination: '/blog/nodevember-2015/',
  },
  {
    source: '/learning-es6-for-of-loop/',
    destination: '/blog/learning-es6-for-of-loop/',
  },
  {
    source: '/learning-es6-classes/',
    destination: '/blog/learning-es6-classes/',
  },
  {
    source: '/learning-es6-new-collections/',
    destination: '/blog/learning-es6-new-collections/',
  },
  {
    source: '/learning-es6-iterators-iterables/',
    destination: '/blog/learning-es6-iterators-iterables/',
  },
  {
    source: '/learning-es6-generators-as-iterators/',
    destination: '/blog/learning-es6-generators-as-iterators/',
  },
  {
    source: '/nationjs-nodeday-2016/',
    destination: '/blog/nationjs-nodeday-2016/',
  },
  {
    source: '/ndc-oslo-2016/',
    destination: '/blog/ndc-oslo-2016/',
  },
  {
    source: '/front-porch-austin-2016/',
    destination: '/blog/front-porch-austin-2016/',
  },
  {
    source: '/nodesummit-2016/',
    destination: '/blog/nodesummit-2016/',
  },
  {
    source: '/learning-es6-12-tricks-for-es6-fun/',
    destination: '/blog/learning-es6-12-tricks-for-es6-fun/',
  },
  {
    source: '/new-gatsby-blog/',
    destination: '/blog/new-gatsby-blog/',
  },
  {
    source: '/microsoft-mvp/',
    destination: '/blog/microsoft-mvp/',
  },
]

/**
 * @type {import('next').Redirect[]}
 */
const OLD_SLIDES_REDIRECTS = [
  {
    source: '/slides/confoo2016-es6.html',
    destination: 'https://slides.benmvp.com/2016/confoo/es6.html',
  },
  {
    source: '/slides/confoo2016-no-js.html',
    destination: 'https://slides.benmvp.com/2016/confoo/no-js.html',
  },
  {
    source: '/slides/devweek2016-es6.html',
    destination: 'https://slides.benmvp.com/2016/devweek/es6.html',
  },
  {
    source: '/slides/evbeng-js-coding-style-results.html',
    destination: 'https://slides.benmvp.com/2016/evbeng/eslint.html',
  },
  {
    source: '/slides/evbeng-js-coding-style.html',
    destination: 'https://slides.benmvp.com/2015/evbeng/eslint.html',
  },
  {
    source: '/slides/fossetcon2015-no-js.html',
    destination: 'https://slides.benmvp.com/2015/fossetcon/no-js.html',
  },
  {
    source: '/slides/nationjs2016-es6.html',
    destination: 'https://slides.benmvp.com/2016/nationjs/es6.html',
  },
  {
    source: '/slides/nodevember2015-es6.html',
    destination: 'https://slides.benmvp.com/2015/nodevember/es6.html',
  },
  {
    source: '/slides/prairiedevcon2016-es6.html',
    destination: 'https://slides.benmvp.com/2016/prdc/es6.html',
  },
  {
    source: '/slides/prairiedevcon2016-no-js.html',
    destination: 'https://slides.benmvp.com/2016/prdc/no-js.html',
  },
  {
    source: '/slides/sacjs2015-no-js.html',
    destination: 'https://slides.benmvp.com/2015/sacjs/no-js.html',
  },
  {
    source: '/slides/2015/nodevember/es6.html',
    destination: 'https://slides.benmvp.com/2015/nodevember/es6.html',
  },
  {
    source: '/slides/2015/evbeng/eslint.html',
    destination: 'https://slides.benmvp.com/2015/evbeng/eslint.html',
  },
  {
    source: '/slides/2015/sacjs/no-js.html',
    destination: 'https://slides.benmvp.com/2015/sacjs/no-js.html',
  },
  {
    source: '/slides/2015/fossetcon/no-js.html',
    destination: 'https://slides.benmvp.com/2015/fossetcon/no-js.html',
  },
  {
    source: '/slides/2017/mwdcon/react-esnext.html',
    destination: 'https://slides.benmvp.com/2017/mwdcon/react-esnext.html',
  },
  {
    source: '/slides/2017/reactconf/react-esnext.html',
    destination: 'https://slides.benmvp.com/2017/reactconf/react-esnext.html',
  },
  {
    source: '/slides/2017/nodevember/why-react.html',
    destination: 'https://slides.benmvp.com/2017/nodevember/why-react.html',
  },
  {
    source: '/slides/2017/jazzcon/react-exposed.html',
    destination: 'https://slides.benmvp.com/2017/jazzcon/react-exposed.html',
  },
  {
    source: '/slides/2017/jazzcon/nav-react.html',
    destination: 'https://slides.benmvp.com/2017/jazzcon/nav-react.html',
  },
  {
    source: '/slides/2017/jazzcon/react-esnext.html',
    destination: 'https://slides.benmvp.com/2017/jazzcon/react-esnext.html',
  },
  {
    source: '/slides/2017/devweek/nav-react.html',
    destination: 'https://slides.benmvp.com/2017/devweek/nav-react.html',
  },
  {
    source: '/slides/2017/evbeng/fiber.html',
    destination: 'https://slides.benmvp.com/2017/evbeng/fiber.html',
  },
  {
    source: '/slides/2017/devoxxus/nav-react.html',
    destination: 'https://slides.benmvp.com/2017/devoxxus/nav-react.html',
  },
  {
    source: '/slides/2017/buzzjs/react-esnext.html',
    destination: 'https://slides.benmvp.com/2017/buzzjs/react-esnext.html',
  },
  {
    source: '/slides/2017/fluent/flexbox.html',
    destination: 'https://slides.benmvp.com/2017/fluent/flexbox.html',
  },
  {
    source: '/slides/2017/reactboston/fiber.html',
    destination: 'https://slides.benmvp.com/2017/reactboston/fiber.html',
  },
  {
    source: '/slides/2017/hackbright/sweet-es6.html',
    destination: 'https://slides.benmvp.com/2017/hackbright/sweet-es6.html',
  },
  {
    source: '/slides/2017/hackbright/es6.html',
    destination: 'https://slides.benmvp.com/2017/hackbright/es6.html',
  },
  {
    source: '/slides/2017/strangeloop/react-workshop.html',
    destination:
      'https://slides.benmvp.com/2017/strangeloop/react-workshop.html',
  },
  {
    source: '/slides/2017/render/iso-react.html',
    destination: 'https://slides.benmvp.com/2017/render/iso-react.html',
  },
  {
    source: '/slides/2017/oscon/react-properly.html',
    destination: 'https://slides.benmvp.com/2017/oscon/react-properly.html',
  },
  {
    source: '/slides/2017/telegraph/why-react.html',
    destination: 'https://slides.benmvp.com/2017/telegraph/why-react.html',
  },
  {
    source: '/slides/2017/revconf/esnext.html',
    destination: 'https://slides.benmvp.com/2017/revconf/esnext.html',
  },
  {
    source: '/slides/2017/revconf/nav-react.html',
    destination: 'https://slides.benmvp.com/2017/revconf/nav-react.html',
  },
  {
    source: '/slides/2017/fogcityruby/es6.html',
    destination: 'https://slides.benmvp.com/2017/fogcityruby/es6.html',
  },
  {
    source: '/slides/2017/forwardjs/react-exposed.html',
    destination: 'https://slides.benmvp.com/2017/forwardjs/react-exposed.html',
  },
  {
    source: '/slides/2017/chainreact/react-native-esnext.html',
    destination:
      'https://slides.benmvp.com/2017/chainreact/react-native-esnext.html',
  },
  {
    source: '/slides/2017/rwreact/fiber.html',
    destination: 'https://slides.benmvp.com/2017/rwreact/fiber.html',
  },
  {
    source: '/slides/2017/reactsf/react-exposed.html',
    destination: 'https://slides.benmvp.com/2017/reactsf/react-exposed.html',
  },
  {
    source: '/slides/2017/sabio/esnext.html',
    destination: 'https://slides.benmvp.com/2017/sabio/esnext.html',
  },
  {
    source: '/slides/2017/reactathon/esnext.html',
    destination: 'https://slides.benmvp.com/2017/reactathon/esnext.html',
  },
  {
    source: '/slides/2017/nodesummit/iso-react.html',
    destination: 'https://slides.benmvp.com/2017/nodesummit/iso-react.html',
  },
  {
    source: '/slides/2017/fstoco/iso-react.html',
    destination: 'https://slides.benmvp.com/2017/fstoco/iso-react.html',
  },
  {
    source: '/slides/2017/reactrally/fiber.html',
    destination: 'https://slides.benmvp.com/2017/reactrally/fiber.html',
  },
  {
    source: '/slides/2017/modernweb/nav-react.html',
    destination: 'https://slides.benmvp.com/2017/modernweb/nav-react.html',
  },
  {
    source: '/slides/2019/svcc/react-eco.html',
    destination: 'https://slides.benmvp.com/2019/svcc/react-eco.html',
  },
  {
    source: '/slides/2019/cssconfeu/webdev.html',
    destination: 'https://slides.benmvp.com/2019/cssconfeu/webdev.html',
  },
  {
    source: '/slides/2019/nationjs/react-eco.html',
    destination: 'https://slides.benmvp.com/2019/nationjs/react-eco.html',
  },
  {
    source: '/slides/2019/reactathon/react-eco.html',
    destination: 'https://slides.benmvp.com/2019/reactathon/react-eco.html',
  },
  {
    source: '/slides/2019/ato/react-eco.html',
    destination: 'https://slides.benmvp.com/2019/ato/react-eco.html',
  },
  {
    source: '/slides/2019/webu/webdev.html',
    destination: 'https://slides.benmvp.com/2019/webu/webdev.html',
  },
  {
    source: '/slides/2020/flashback/webdev.html',
    destination: 'https://slides.benmvp.com/2020/flashback/webdev.html',
  },
  {
    source: '/slides/2020/jsconfhi/perfect-lib.html',
    destination: 'https://slides.benmvp.com/2020/jsconfhi/perfect-lib.html',
  },
  {
    source: '/slides/2018/sabiola/react-workshop.html',
    destination: 'https://slides.benmvp.com/2018/sabiola/react-workshop.html',
  },
  {
    source: '/slides/2018/reactalicante/react-workshop.html',
    destination:
      'https://slides.benmvp.com/2018/reactalicante/react-workshop.html',
  },
  {
    source: '/slides/2018/reactalicante/react-perf.html',
    destination: 'https://slides.benmvp.com/2018/reactalicante/react-perf.html',
  },
  {
    source: '/slides/2018/nejs/webdev.html',
    destination: 'https://slides.benmvp.com/2018/nejs/webdev.html',
  },
  {
    source: '/slides/2018/evbeng/why-react.html',
    destination: 'https://slides.benmvp.com/2018/evbeng/why-react.html',
  },
  {
    source: '/slides/2018/frameworksummit/nav-react.html',
    destination:
      'https://slides.benmvp.com/2018/frameworksummit/nav-react.html',
  },
  {
    source: '/slides/2018/mctech/react-workshop.html',
    destination: 'https://slides.benmvp.com/2018/mctech/react-workshop.html',
  },
  {
    source: '/slides/2018/ndcsydney/nav-react.html',
    destination: 'https://slides.benmvp.com/2018/ndcsydney/nav-react.html',
  },
  {
    source: '/slides/2018/reactathon/react-workshop.html',
    destination:
      'https://slides.benmvp.com/2018/reactathon/react-workshop.html',
  },
  {
    source: '/slides/2018/reactathon/why-react.html',
    destination: 'https://slides.benmvp.com/2018/reactathon/why-react.html',
  },
  {
    source: '/slides/2018/nodesummit/esnext.html',
    destination: 'https://slides.benmvp.com/2018/nodesummit/esnext.html',
  },
  {
    source: '/slides/2018/reactnext/react-eco.html',
    destination: 'https://slides.benmvp.com/2018/reactnext/react-eco.html',
  },
  {
    source: '/slides/2016/devweek/es6.html',
    destination: 'https://slides.benmvp.com/2016/devweek/es6.html',
  },
  {
    source: '/slides/2016/evbeng/react-workshop.html',
    destination: 'https://slides.benmvp.com/2016/evbeng/react-workshop.html',
  },
  {
    source: '/slides/2016/evbeng/eslint.html',
    destination: 'https://slides.benmvp.com/2016/evbeng/eslint.html',
  },
  {
    source: '/slides/2016/thunderplains/react-esnext.html',
    destination:
      'https://slides.benmvp.com/2016/thunderplains/react-esnext.html',
  },
  {
    source: '/slides/2016/ndcoslo/no-js.html',
    destination: 'https://slides.benmvp.com/2016/ndcoslo/no-js.html',
  },
  {
    source: '/slides/2016/rwreact/iso-react.html',
    destination: 'https://slides.benmvp.com/2016/rwreact/iso-react.html',
  },
  {
    source: '/slides/2016/reactsf/react-esnext.html',
    destination: 'https://slides.benmvp.com/2016/reactsf/react-esnext.html',
  },
  {
    source: '/slides/2016/nationjs/es6.html',
    destination: 'https://slides.benmvp.com/2016/nationjs/es6.html',
  },
  {
    source: '/slides/2016/syntaxcon/no-js.html',
    destination: 'https://slides.benmvp.com/2016/syntaxcon/no-js.html',
  },
  {
    source: '/slides/2016/syntaxcon/es6.html',
    destination: 'https://slides.benmvp.com/2016/syntaxcon/es6.html',
  },
  {
    source: '/slides/2016/confoo/no-js.html',
    destination: 'https://slides.benmvp.com/2016/confoo/no-js.html',
  },
  {
    source: '/slides/2016/confoo/sweet-es6.html',
    destination: 'https://slides.benmvp.com/2016/confoo/sweet-es6.html',
  },
  {
    source: '/slides/2016/confoo/es6.html',
    destination: 'https://slides.benmvp.com/2016/confoo/es6.html',
  },
  {
    source: '/slides/2016/confoo/flexbox.html',
    destination: 'https://slides.benmvp.com/2016/confoo/flexbox.html',
  },
  {
    source: '/slides/2016/connect/iso-react.html',
    destination: 'https://slides.benmvp.com/2016/connect/iso-react.html',
  },
  {
    source: '/slides/2016/connect/nav-react.html',
    destination: 'https://slides.benmvp.com/2016/connect/nav-react.html',
  },
  {
    source: '/slides/2016/frontporch/react-esnext.html',
    destination: 'https://slides.benmvp.com/2016/frontporch/react-esnext.html',
  },
  {
    source: '/slides/2016/prdc/no-js.html',
    destination: 'https://slides.benmvp.com/2016/prdc/no-js.html',
  },
  {
    source: '/slides/2016/prdc/es6.html',
    destination: 'https://slides.benmvp.com/2016/prdc/es6.html',
  },
]

const HEADERS = [
  {
    source: '/(.*)',
    headers: [
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
    ],
  },
  {
    source: '/blog/rss.xml',
    headers: [
      {
        key: 'Content-Type',
        value: 'application/rss+xml',
      },
      {
        key: 'Access-Control-Allow-Origin',
        value: '*',
      },
    ],
  },
]

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  headers: async () => {
    return HEADERS
  },

  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],

  reactStrictMode: true,
  redirects: async () => {
    return [
      ...OLD_BLOG_REDIRECTS,
      ...OLD_SLIDES_REDIRECTS,
      ...SLIDE_SHORT_URLS,
    ].map((redirect) => ({ ...redirect, permanent: true }))
  },
  trailingSlash: true,
}

export default nextConfig
