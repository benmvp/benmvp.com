(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

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

/***/ }),

/***/ "i6+/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "query", function() { return query; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tRbT");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("hlFM");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ofer");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("wb2y");
/* harmony import */ var gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("4+mf");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("soUV");
/* harmony import */ var _components_PageHeader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("3H7G");
/* harmony import */ var _components_HeroImage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("dhsJ");
/* harmony import */ var _components_MinishopCard__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("/fA+");
/* harmony import */ var _components_PostCard__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("j8Pq");
/* harmony import */ var _components_Seo__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("hizP");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("0lfv");
/* harmony import */ var _utils_useMinishops__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__("Xikp");











const PAGE_TITLE = 'Page Not Found';
const MinishopList = _ref => {
  let {
    minishops
  } = _ref;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, minishops.map(minishop => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    key: minishop.id,
    item: true,
    xs: 12,
    lg: 6
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_MinishopCard__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], {
    slug: minishop.fields.slug,
    title: minishop.frontmatter.title,
    tags: minishop.frontmatter.tags,
    summary: minishop.frontmatter.shortDescription || minishop.excerpt,
    event: minishop.frontmatter.event
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    display: "flex",
    justifyContent: {
      xs: 'center',
      sm: 'flex-end'
    },
    width: "100%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_7__["Link"], {
    href: "/minishops/",
    variant: "h6"
  }, "View all minishops >"))));
};
const PostCardList = _ref2 => {
  let {
    posts
  } = _ref2;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    container: true,
    spacing: 2
  }, posts.edges.map(_ref3 => {
    let {
      node
    } = _ref3;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
      key: node.id,
      item: true,
      xs: 12,
      sm: 6,
      lg: 4
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PostCard__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
      slug: node.fields.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      date: node.frontmatter.date,
      summary: node.frontmatter.shortDescription || node.excerpt,
      hero: node.frontmatter.hero
    }));
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    display: "flex",
    justifyContent: {
      xs: 'center',
      sm: 'flex-end'
    },
    width: "100%"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_7__["Link"], {
    href: "/blog/",
    variant: "h6"
  }, "View all posts >"))));
};
const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])({
  header: {
    marginBottom: theme.spacing(5)
  },
  image: {
    marginBottom: theme.spacing(3)
  },
  divider: {
    marginTop: theme.spacing(3)
  },
  section: {
    marginTop: theme.spacing(3)
  }
}));
const NotFound = _ref4 => {
  var _hero$childImageSharp, _hero$childImageSharp2;
  let {
    data
  } = _ref4;
  const classes = useStyles();
  const {
    recentPosts,
    hero
  } = data;
  const {
    upcoming: upcomingMinishops,
    remaining: remainingMinishops
  } = Object(_utils_useMinishops__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"])();
  const minishops = upcomingMinishops.length ? upcomingMinishops : remainingMinishops;
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (upcomingMinishops.length) {
      var _window$gtag, _window;
      (_window$gtag = (_window = window).gtag) === null || _window$gtag === void 0 ? void 0 : _window$gtag.call(_window, 'event', 'view_item_list', {
        items: upcomingMinishops.map((node, index) => {
          var _node$frontmatter$eve;
          return {
            id: (_node$frontmatter$eve = node.frontmatter.event) === null || _node$frontmatter$eve === void 0 ? void 0 : _node$frontmatter$eve.id,
            name: node.frontmatter.title,
            list_name: '404',
            list_position: index + 1,
            price: 100
          };
        })
      });
    }
  }, [upcomingMinishops]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], {
    maxWidth: "lg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Seo__WEBPACK_IMPORTED_MODULE_13__[/* default */ "a"], {
    title: PAGE_TITLE,
    url: Object(_utils__WEBPACK_IMPORTED_MODULE_14__[/* getUrl */ "i"])('/404/'),
    image: hero === null || hero === void 0 ? void 0 : (_hero$childImageSharp = hero.childImageSharp) === null || _hero$childImageSharp === void 0 ? void 0 : (_hero$childImageSharp2 = _hero$childImageSharp.fluid) === null || _hero$childImageSharp2 === void 0 ? void 0 : _hero$childImageSharp2.src
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageHeader__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    title: PAGE_TITLE
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_HeroImage__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    fluid: hero.childImageSharp.fluid,
    alt: PAGE_TITLE,
    className: classes.image
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "h5",
    component: "p",
    align: "center"
  }, "Sorry, but the page you were trying to view does not exist!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    variant: "middle",
    className: classes.divider
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    component: "section",
    className: classes.section
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "h4",
    component: "h2",
    gutterBottom: true,
    "aria-label": "Read one of Ben's recent blog posts"
  }, "Recent posts"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PostCardList, {
    posts: recentPosts
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], {
    variant: "middle",
    className: classes.divider
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], {
    component: "section",
    className: classes.section
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    variant: "h4",
    component: "h2",
    gutterBottom: true,
    "aria-label": "Join one of Ben's upcoming minishops"
  }, "Upcoming minishops"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(MinishopList, {
    minishops: minishops
  })));
};
/* harmony default export */ __webpack_exports__["default"] = (NotFound);
const query = "4235356758";

/***/ }),

/***/ "j8Pq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("R/WZ");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("ZBNC");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("30+C");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("lFIR");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("Ie8z");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("oa/T");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("ofer");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__("o4QW");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__("hlFM");
/* harmony import */ var _material_ui_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__("Z3vd");
/* harmony import */ var gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__("4+mf");
/* harmony import */ var _Share__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__("DODd");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__("0lfv");
/* harmony import */ var _utils_useCopyUrl__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__("/91U");






const useStyles = Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(theme => Object(_material_ui_core__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])({
  media: {
    height: 266.66667
  },
  buttons: {
    flex: 1,
    marginRight: theme.spacing(2)
  }
}));
const PostCard = _ref => {
  let {
    date,
    hero,
    mode = 'full',
    slug,
    summary,
    tags,
    title
  } = _ref;
  const classes = useStyles();
  const url = Object(_utils__WEBPACK_IMPORTED_MODULE_13__[/* getBlogUrl */ "f"])(slug);
  const [{
    copyText,
    copyButtonColor
  }, copy] = Object(_utils_useCopyUrl__WEBPACK_IMPORTED_MODULE_14__[/* default */ "a"])(url);
  const showDate = mode !== 'min';
  const showShare = mode !== 'min';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
    id: Object(_utils__WEBPACK_IMPORTED_MODULE_13__[/* genPostSlug */ "d"])(title)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], {
    component: gatsby_theme_material_ui__WEBPACK_IMPORTED_MODULE_11__["Link"],
    to: `/blog${slug}`,
    underline: "none"
  }, hero && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
    component: "img",
    image: hero.childImageSharp.fluid.src,
    title: title,
    className: classes.media
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"], null, showDate && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    gutterBottom: true,
    variant: "subtitle2",
    color: "textSecondary",
    component: "h4"
  }, date), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    gutterBottom: true,
    variant: "h5",
    color: "textPrimary",
    component: "h3",
    title: title
  }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"], {
    variant: "body2",
    color: "textSecondary",
    component: "p"
  }, summary))), showShare && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_9__[/* default */ "a"], {
    className: classes.buttons
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], {
    size: "small",
    color: copyButtonColor,
    onClick: copy
  }, copyText)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Share__WEBPACK_IMPORTED_MODULE_12__[/* default */ "a"], {
    iconSize: 32,
    summary: summary,
    tags: tags,
    title: title,
    url: url,
    options: new Set(['twitter', 'facebook', 'pocket']),
    type: "post"
  })));
};
/* harmony default export */ __webpack_exports__["a"] = (PostCard);

/***/ })

}]);
//# sourceMappingURL=component---src-pages-404-tsx-becfe473c82be5d1c6a7.js.map