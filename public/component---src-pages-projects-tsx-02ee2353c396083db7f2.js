(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "30+C":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _Paper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("kKAo");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("H2TA");






var styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden'
  }
};
var Card = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Card(props, ref) {
  var classes = props.classes,
    className = props.className,
    _props$raised = props.raised,
    raised = _props$raised === void 0 ? false : _props$raised,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["classes", "className", "raised"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](_Paper__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className),
    elevation: raised ? 8 : 1,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(styles, {
  name: 'MuiCard'
})(Card));

/***/ }),

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

/***/ "Ie8z":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("H2TA");






var styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: '100%'
  },
  /* Styles applied to the root element if `component="picture or img"`. */
  img: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover'
  }
};
var MEDIA_COMPONENTS = ['video', 'audio', 'picture', 'iframe', 'img'];
var CardMedia = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function CardMedia(props, ref) {
  var children = props.children,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'div' : _props$component,
    image = props.image,
    src = props.src,
    style = props.style,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["children", "classes", "className", "component", "image", "src", "style"]);
  var isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  var composedStyle = !isMediaComponent && image ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    backgroundImage: "url(\"".concat(image, "\")")
  }, style) : style;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, isMediaComponent && classes.media, "picture img".indexOf(Component) !== -1 && classes.img),
    ref: ref,
    style: composedStyle,
    src: isMediaComponent ? image || src : undefined
  }, other), children);
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiCardMedia'
})(CardMedia));

/***/ }),

/***/ "gZkK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("hlie");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("30+C");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("lFIR");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("Ie8z");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("hlFM");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("oa/T");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("ofer");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("soUV");
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("hizP");
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("3H7G");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("0lfv");
/* harmony import */ var _utils_generate_social_image__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("mXBQ");
/* harmony import */ var _config_site__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("KYHh");
/* harmony import */ var _config_site__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_config_site__WEBPACK_IMPORTED_MODULE_15__);








const PROJECTS = [{
  title: _config_site__WEBPACK_IMPORTED_MODULE_15___default.a.siteTitle,
  url: _config_site__WEBPACK_IMPORTED_MODULE_15___default.a.siteUrl,
  imageUrl: _config_site__WEBPACK_IMPORTED_MODULE_15___default.a.siteImage,
  description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "My personal website where I include blog posts focusing on frontend technologies, my past and upcoming speaking engagements, videos of past talks and 3-hour training workshops called \"minishops\". It's built with", ' ', "Gatsby & Material-UI, running on Netlify.")
}, {
  title: 'NBA Player Tiers',
  url: 'https://nbaplayertiers.com/',
  imageUrl: 'https://nbaplayertiers.com/logo/wordmark-bg.png',
  description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A fun app for NBA fans to rank who they believe are the top 25 players in the NBA. Fans can publish their \"ladders\" and share them. It's built with NextJS, Material-UI & Firebase, running on Vercel.")
}, {
  title: 'Rep Yo City',
  url: 'https://repyo.city',
  imageUrl: 'https://repyo.city/logos/wordmark.png',
  description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "An e-commerce store built on the", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    href: "https://www.zazzle.com",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Zazzle"), ' ', "shopping platform to provide designs representing cities, states & countries from around the world on shirts, mugs, hats, bags and many other types of products. It's built with NextJS & Material-UI, running on Vercel.")
}, {
  title: '@benmvp/cli',
  url: 'https://github.com/benmvp/benmvp-cli/',
  imageUrl: '/projects/npm-logo-red.png',
  description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A highly-opinionated, zero-config CLI for consistent", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    href: "https://www.jonathancreamer.com/announcing-div-ops/",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "\"divops\""), ' ', "for my Typescript-based libraries. It provides commands for testing (TypeScript / ESLint linting / Jest unit testing), running in dev-mode (with Jest in watch-mode), building into several build targets (Babel / TypeScript), and running integration tests.")
}, {
  title: 'Bart Salmon',
  url: 'https://bartsalmon.benmvp.com/',
  imageUrl: '/projects/bart-logo.png',
  description: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, "A mobile web app to help BART riders increase their chances of finding a seat on the train by providing information on \"backwards routes\" so that they can get on the train at an earlier stop. Most useful in Downtown San Francisco.")
}];
const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(_ref => {
  let {
    breakpoints
  } = _ref;
  return Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])({
    layout: {
      display: 'flex',
      flexDirection: 'column',
      [breakpoints.up('sm')]: {
        flexDirection: 'row'
      }
    },
    imageLink: {
      [breakpoints.up('sm')]: {
        maxWidth: 250
      }
    },
    image: {
      objectFit: 'contain',
      [breakpoints.up('sm')]: {
        height: '100%'
      }
    }
  });
});
const ProjectCard = _ref2 => {
  let {
    description,
    imageUrl,
    preLaunch = false,
    title,
    url
  } = _ref2;
  const classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    component: "section",
    className: classes.layout
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    component: "a",
    href: url,
    className: classes.imageLink
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    className: classes.image,
    component: "img",
    image: imageUrl,
    title: title
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    flex: "1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    component: "h1",
    variant: "h4"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    href: url
  }, title), preLaunch && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    component: "span",
    variant: "h6"
  }, ' ', "(pre launch)")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    variant: "body1",
    color: "textSecondary"
  }, description))));
};
const SEO_PAGE_TITLE = 'Dev Projects by Ben';
const SEO_PAGE_DESCRIPTION = "Check out Ben Ilegbodu's active and past web frontend development projects";
const SEO_IMAGE_URL = Object(_utils_generate_social_image__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])({
  title: SEO_PAGE_TITLE,
  tagline: SEO_PAGE_DESCRIPTION
});
const Projects = () => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Seo__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    url: Object(_utils__WEBPACK_IMPORTED_MODULE_13__[/* getUrl */ "i"])('projects'),
    title: "Dev Projects",
    description: SEO_PAGE_DESCRIPTION,
    image: SEO_IMAGE_URL,
    imageAlt: SEO_PAGE_TITLE
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageHeader__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    title: "Dev Projects",
    subTitle: "Ben's active and past development projects"
  }), PROJECTS.map(project => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    my: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ProjectCard, Object.assign({
    key: project.title
  }, project))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Projects);

/***/ }),

/***/ "mXBQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const escape = text => encodeURIComponent(encodeURIComponent(text));
const generateSocialImage = _ref => {
  let {
    title,
    tagline,
    date,
    imagePublicID = 'benmvp/blog-post-template_gkpzgc',
    version = 'v1619329795',
    titleFont = 'roboto',
    taglineFont = 'roboto',
    imageWidth = 1280,
    imageHeight = 669,
    textAreaWidth = 666,
    textLeftOffset = 550,
    titleTopOffset = 64,
    taglineBottomOffset = 64,
    textColor = 'ffffff',
    titleFontSize = 70,
    taglineFontSize = 40
  } = _ref;
  // configure social media image dimensions, quality, and format
  const imageConfig = [`w_${imageWidth}`, `h_${imageHeight}`, 'c_fill', 'q_auto', 'f_auto'].join(',');

  // configure the title text
  // starts at the top and grows downward
  const titleConfig = [`w_${textAreaWidth}`, 'c_fit', `co_rgb:${textColor}`, 'g_north_west', `x_${textLeftOffset}`, `y_${titleTopOffset}`, `l_text:${escape(titleFont)}_${titleFontSize}_bold:${escape(title)}`].join(',');

  // configure the tagline text
  // starts at the bottom and grows upward
  const taglineConfig = tagline ? [`w_${textAreaWidth}`, 'c_fit', `co_rgb:${textColor}`, 'g_south_west', `x_${textLeftOffset}`, `y_${taglineBottomOffset}`, `l_text:${escape(taglineFont)}_${taglineFontSize}_light:${escape(tagline)}`].join(',') : '';

  // configure the date text
  // beneath the logo
  const dateConfig = date ? [`w_350`, 'c_fit', `co_rgb:${textColor}`, 'g_south_west', `x_64`, `y_64`, `l_text:${escape(taglineFont)}_${taglineFontSize}:${escape(date)}`].join(',') : '';

  // combine all the pieces required to generate a Cloudinary URL
  const urlParts = [imageConfig, titleConfig, taglineConfig, dateConfig, version, imagePublicID];

  // remove any falsy sections of the URL (e.g. an undefined version)
  const validParts = urlParts.filter(Boolean);

  // join all the parts into a valid URL to the generated image
  return `https://res.cloudinary.com/benmvp/image/upload/${validParts.join('/')}`;
};
/* harmony default export */ __webpack_exports__["a"] = (generateSocialImage);

/***/ }),

/***/ "oa/T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("H2TA");





var styles = {
  /* Styles applied to the root element. */
  root: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 24
    }
  }
};
var CardContent = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function CardContent(props, ref) {
  var classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'div' : _props$component,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["classes", "className", "component"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiCardContent'
})(CardContent));

/***/ })

}]);
//# sourceMappingURL=component---src-pages-projects-tsx-02ee2353c396083db7f2.js.map