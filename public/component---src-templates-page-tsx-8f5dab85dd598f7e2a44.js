(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "3H7G":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hlFM");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ofer");


const PageHeader = _ref => {
  let {
    className,
    subTitle,
    title
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    component: "header",
    className: className
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "h3",
    component: "h1",
    gutterBottom: true
  }, title), subTitle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    variant: "h5",
    component: "h2",
    gutterBottom: true
  }, subTitle));
};
/* harmony default export */ __webpack_exports__["a"] = (PageHeader);

/***/ }),

/***/ "8oxB":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};

/***/ }),

/***/ "Cqiw":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ofer");


const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  root: {
    '& h2': theme.typography.h5,
    '& h3': theme.typography.h6,
    '& h4': theme.typography.h6,
    '& h5': theme.typography.subtitle1,
    '& h6': theme.typography.subtitle2,
    '& p': {
      ...theme.typography.body1,
      margin: theme.spacing(0, 0, 2, 0)
    },
    '& p > img': {
      display: 'block',
      margin: '0 auto',
      maxWidth: 800,
      width: '100%'
    },
    '& p > .gatsby-resp-image-wrapper + em': {
      ...theme.typography.caption,
      display: 'block',
      textAlign: 'right',
      maxWidth: 800,
      margin: theme.spacing(1, 2)
    },
    '& ul': {
      listStyle: 'circle',
      padding: theme.spacing(0, 0, 0, 3),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(0, 0, 0, 4)
      }
    },
    '& li': {
      margin: theme.spacing(0, 0, 1, 0)
    },
    '& a:not(.anchor)': {
      color: theme.palette.primary.main
    },
    '& blockquote': {
      borderLeft: `5px solid ${theme.palette.secondary.main}`,
      fontStyle: 'italic',
      margin: theme.spacing(2.5, 0, 2.5, 5),
      padding: theme.spacing(1.5),
      '& p': {
        margin: 0
      }
    },
    '& hr': {
      border: 'none',
      height: 1,
      width: '50%',
      backgroundColor: theme.palette.divider,
      margin: theme.spacing(4, 'auto')
    },
    '& .gatsby-highlight': {
      // code blocks
      marginBottom: theme.spacing(3)
    },
    '& .gatsby-resp-iframe-wrapper': {
      // iframes (video embeds)
      margin: theme.spacing(0, 0, 3, 2)
    },
    '& .twitter-tweet': {
      margin: `0 auto ${theme.spacing(2)}px auto`
    }
  }
}));
const Content = _ref => {
  let {
    children
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "body1",
    component: "article",
    dangerouslySetInnerHTML: {
      __html: children
    },
    className: classes.root
  });
};
/* harmony default export */ __webpack_exports__["a"] = (Content);

/***/ }),

/***/ "aVuU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZBNC");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("soUV");
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("3H7G");
/* harmony import */ var _components_HeroImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("dhsJ");
/* harmony import */ var _components_Content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Cqiw");
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("hizP");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("0lfv");








const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  header: {
    marginBottom: theme.spacing(5)
  },
  image: {
    marginBottom: theme.spacing(3)
  }
}));
const Page = _ref => {
  var _hero$childImageSharp, _hero$childImageSharp2;
  let {
    data
  } = _ref;
  const classes = useStyles();
  const {
    page
  } = data;
  const {
    html,
    excerpt,
    frontmatter,
    fields
  } = page;
  const {
    title,
    hero,
    heroAlt,
    heroCredit
  } = frontmatter;
  const {
    slug
  } = fields;
  const url = Object(_utils__WEBPACK_IMPORTED_MODULE_8__[/* getUrl */ "i"])(slug);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Seo__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    title: title,
    url: url,
    description: excerpt,
    image: hero === null || hero === void 0 ? void 0 : (_hero$childImageSharp = hero.childImageSharp) === null || _hero$childImageSharp === void 0 ? void 0 : (_hero$childImageSharp2 = _hero$childImageSharp.fluid) === null || _hero$childImageSharp2 === void 0 ? void 0 : _hero$childImageSharp2.src,
    imageAlt: heroAlt
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageHeader__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    className: classes.header,
    title: title
  }), hero && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_HeroImage__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    fluid: hero.childImageSharp.fluid,
    alt: heroAlt,
    credit: heroCredit,
    className: classes.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Content__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, html));
};
/* harmony default export */ __webpack_exports__["default"] = (Page);
const query = "1159799560";

/***/ }),

/***/ "dhsJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/gatsby-image/index.js
var gatsby_image = __webpack_require__("9eSz");
var gatsby_image_default = /*#__PURE__*/__webpack_require__.n(gatsby_image);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__("R/WZ");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("ZBNC");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js + 13 modules
var Box = __webpack_require__("hlFM");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__("ofer");

// EXTERNAL MODULE: ./node_modules/react-markdown/lib/react-markdown.js
var react_markdown = __webpack_require__("IujW");
var react_markdown_default = /*#__PURE__*/__webpack_require__.n(react_markdown);

// CONCATENATED MODULE: ./src/styles/index.ts
const getFullWidthImageStyles = theme => ({
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  maxWidth: `calc(100% + ${theme.spacing(2 * 2)}px)`,
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(-3),
    marginRight: theme.spacing(-3),
    maxWidth: `calc(100% + ${theme.spacing(3 * 2)}px)`
  }
});
// CONCATENATED MODULE: ./src/components/HeroImage.tsx





const useStyles = Object(makeStyles["a" /* default */])(theme => Object(createStyles["a" /* default */])({
  image: {
    ...getFullWidthImageStyles(theme)
  },
  credit: {
    textAlign: 'right',
    fontStyle: 'italic'
  }
}));
const HeroImage = _ref => {
  let {
    alt,
    credit,
    className,
    fluid
  } = _ref;
  const classes = useStyles();
  return /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    className: className,
    component: "section"
  }, /*#__PURE__*/react_default.a.createElement(gatsby_image_default.a, {
    fluid: fluid,
    alt: alt,
    className: classes.image
  }), credit && /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "caption",
    className: classes.credit,
    component: "footer"
  }, /*#__PURE__*/react_default.a.createElement(react_markdown_default.a, {
    source: credit,
    linkTarget: "_blank"
  })));
};
/* harmony default export */ var components_HeroImage = __webpack_exports__["a"] = (HeroImage);

/***/ })

}]);
//# sourceMappingURL=component---src-templates-page-tsx-8f5dab85dd598f7e2a44.js.map