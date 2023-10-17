(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

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

/***/ "DBZF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ofer");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hlFM");
/* harmony import */ var gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4+mf");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("soUV");
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("hizP");
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3H7G");
/* harmony import */ var _components_SubscribeForm__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("73Vy");
/* harmony import */ var _components_Share__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("DODd");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("0lfv");
/* harmony import */ var _utils_generate_social_image__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("mXBQ");










const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  header: {
    marginBottom: theme.spacing(5)
  },
  promise: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    textAlign: 'center'
  }
}));
const PAGE_TITLE = 'Subscribe to the BenMVP Newsletter';
const PAGE_DESCRIPTION = 'Get notified about new web frontend development blog posts, upcoming minishops & other goodies by Ben Ilegbodu';
const PAGE_URL = Object(_utils__WEBPACK_IMPORTED_MODULE_11__[/* getUrl */ "i"])('subscribe');
const SEO_IMAGE_URL = Object(_utils_generate_social_image__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])({
  title: PAGE_TITLE,
  tagline: PAGE_DESCRIPTION
});
const Subscribe = () => {
  const classes = useStyles();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    includeSubscribe: false
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Seo__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    url: PAGE_URL,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    image: SEO_IMAGE_URL,
    imageAlt: PAGE_TITLE
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageHeader__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: classes.header,
    title: PAGE_TITLE
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "body1"
  }, "The ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "BenMVP Newsletter"), " is a weekly", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", null, "-ish"), " frontend web development newsletter by", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    href: "/about/"
  }, "Ben Ilegbodu"), ". \uD83D\uDE04"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    component: "ul",
    my: 4,
    pl: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    component: "li"
  }, "I blog a lot about JavaScript, React, TypeScript,", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    href: "/blog/what-divops-engineer/"
  }, "\"DivOps\""), ' ', "and other related web frontend technologies based on what I'm learning or questions that I'm asked.", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Get notified of my new blog posts"), " when they are published."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    component: "li"
  }, "I host short 3.5-hour workshops (called", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    href: "/minishops/"
  }, "minishops"), ") on React and TypeScript. ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Find out about upcoming minishops"), " when they are released to ensure you get the best price possible."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    component: "li"
  }, "I ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_5__["Link"], {
    href: "/speak/"
  }, "speak"), " at conferences & meetups, join in on podcasts, and will do the occasional livestream.", ' ', /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "Stay up to date with future events and videos"), ".")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    maxWidth: "500px",
    mx: "auto",
    mt: 4
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SubscribeForm__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "body2",
    className: classes.promise
  }, "I will ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, "not"), " sell your email address to spammers (or anyone), I promise."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Share__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    url: PAGE_URL,
    title: PAGE_TITLE,
    summary: PAGE_DESCRIPTION
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (Subscribe);

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

/***/ })

}]);
//# sourceMappingURL=component---src-pages-subscribe-tsx-4f25b1aff3f33083bdb7.js.map