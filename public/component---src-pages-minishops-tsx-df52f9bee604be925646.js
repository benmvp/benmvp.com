(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

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

/***/ "Hq58":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ofer");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("tRbT");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("wb2y");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("soUV");
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("hizP");
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("3H7G");
/* harmony import */ var _components_HeroImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("dhsJ");
/* harmony import */ var _components_MinishopCard__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("/fA+");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("0lfv");
/* harmony import */ var _utils_useMinishops__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("Xikp");









const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  header: {
    marginBottom: theme.spacing(5)
  },
  image: {
    marginBottom: theme.spacing(3)
  },
  description: {
    marginBottom: theme.spacing(3)
  },
  grid: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(5, 'auto'),
    width: '50%'
  }
}));
const Minishops = _ref => {
  let {
    data
  } = _ref;
  const classes = useStyles();
  const {
    upcoming,
    remaining
  } = Object(_utils_useMinishops__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"])();
  const {
    hero
  } = data;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (upcoming.length) {
      var _window$gtag, _window;
      (_window$gtag = (_window = window).gtag) === null || _window$gtag === void 0 ? void 0 : _window$gtag.call(_window, 'event', 'view_item_list', {
        items: upcoming.map((node, index) => {
          var _node$frontmatter$eve;
          return {
            id: (_node$frontmatter$eve = node.frontmatter.event) === null || _node$frontmatter$eve === void 0 ? void 0 : _node$frontmatter$eve.id,
            name: node.frontmatter.title,
            list_name: 'Minishops',
            list_position: index + 1,
            price: 100
          };
        })
      });
    }
  }, [upcoming]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Seo__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    url: Object(_utils__WEBPACK_IMPORTED_MODULE_11__[/* getMinishopUrl */ "h"])(),
    title: "Remote Minishops, Online Workshops, Virtual Training",
    description: "Minishops by Ben Ilegbodu are 3-hour, fully-remote workshops that focus on frontend technologies like React, TypeScript and testing. They're highly-focused, covering only the concepts you want to learn so that you can level up your skills and get on with the rest of your day.",
    image: hero.childImageSharp.fluid.src
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageHeader__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    className: classes.header,
    title: "Minishops with Ben",
    subTitle: "Let's learn together without having to leave your house! Use remote minishops by Ben Ilegbodu to level up your JavaScript, React and frontend skills."
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_HeroImage__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    fluid: hero.childImageSharp.fluid,
    alt: "Picture of a remote working environment with a monitor with code and a mug that says 'Life begins at the end of your comfort zone'",
    credit: "Photo by [Tudor Baciu](https://unsplash.com/@baciutudor)",
    className: classes.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    variant: "body1",
    className: classes.description
  }, "Minishops by Ben Ilegbodu are 3-hour, fully-remote workshops that focus on frontend technologies like React, TypeScript and testing. They're highly-focused, covering only the concepts you want to learn so that you can level up your skills and get on with the rest of your day."), upcoming.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    component: "h3",
    variant: "h4"
  }, "Upcoming Minishops"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    container: true,
    spacing: 2,
    className: classes.grid
  }, upcoming.map(node => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    key: node.id,
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MinishopCard__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    slug: node.fields.slug,
    title: node.frontmatter.title,
    tags: node.frontmatter.tags,
    summary: node.frontmatter.shortDescription || node.excerpt,
    event: node.frontmatter.event
  }))))), upcoming.length > 0 && remaining.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    className: classes.divider
  }), remaining.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    component: "h3",
    variant: "h4"
  }, upcoming.length > 0 ? 'Remaining' : 'All', " Minishops"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    container: true,
    spacing: 2,
    className: classes.grid
  }, remaining.map(node => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    key: node.id,
    item: true,
    xs: 12,
    sm: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MinishopCard__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    slug: node.fields.slug,
    title: node.frontmatter.title,
    tags: node.frontmatter.tags,
    summary: node.frontmatter.shortDescription || node.excerpt,
    event: node.frontmatter.event
  }))))));
};
/* harmony default export */ __webpack_exports__["default"] = (Minishops);
const query = "906486158";

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
//# sourceMappingURL=component---src-pages-minishops-tsx-df52f9bee604be925646.js.map