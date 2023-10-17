(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "/91U":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var url_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("AB20");


const useCopyUrl = url => {
  const trackedUrl = Object(url_lib__WEBPACK_IMPORTED_MODULE_1__[/* formatUrl */ "a"])(url, {
    utm_source: 'copy',
    utm_medium: 'social',
    utm_campaign: 'share'
  });
  const {
    0: copyStatus,
    1: setCopyStatus
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])('inactive');
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    let timeoutId;
    if (copyStatus !== 'inactive') {
      timeoutId = setTimeout(() => {
        setCopyStatus('inactive');
      }, 2500);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [copyStatus]);
  const copy = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(() => {
    navigator.clipboard.writeText(trackedUrl).then(() => {
      setCopyStatus('copied');
    }, () => {
      setCopyStatus('failed');
    });
  }, [trackedUrl]);
  let copyText = 'Copy URL';
  let copyButtonColor = 'primary';
  if (copyStatus === 'copied') {
    copyText = 'Copied';
    copyButtonColor = 'secondary';
  } else if (copyStatus === 'failed') {
    copyText = 'Failed!';
    copyButtonColor = 'default';
  }
  return [{
    copyText,
    copyButtonColor
  }, copy];
};
/* harmony default export */ __webpack_exports__["a"] = (useCopyUrl);

/***/ }),

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

/***/ "o4QW":
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
    display: 'flex',
    alignItems: 'center',
    padding: 8
  },
  /* Styles applied to the root element if `disableSpacing={false}`. */
  spacing: {
    '& > :not(:first-child)': {
      marginLeft: 8
    }
  }
};
var CardActions = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function CardActions(props, ref) {
  var _props$disableSpacing = props.disableSpacing,
    disableSpacing = _props$disableSpacing === void 0 ? false : _props$disableSpacing,
    classes = props.classes,
    className = props.className,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["disableSpacing", "classes", "className"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, !disableSpacing && classes.spacing),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiCardActions'
})(CardActions));

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

/***/ }),

/***/ "tRbT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Ff2n");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("wx14");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("H2TA");


// A grid component using the following libs as inspiration.
//
// For the implementation:
// - https://getbootstrap.com/docs/4.3/layout/grid/
// - https://github.com/kristoferjoseph/flexboxgrid/blob/master/src/css/flexboxgrid.css
// - https://github.com/roylee0704/react-flexbox-grid
// - https://material.angularjs.org/latest/layout/introduction
//
// Follow this flexbox Guide to better understand the underlying model:
// - https://css-tricks.com/snippets/css/a-guide-to-flexbox/




var SPACINGS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var GRID_SIZES = ['auto', true, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
function generateGrid(globalStyles, theme, breakpoint) {
  var styles = {};
  GRID_SIZES.forEach(function (size) {
    var key = "grid-".concat(breakpoint, "-").concat(size);
    if (size === true) {
      // For the auto layouting
      styles[key] = {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: '100%'
      };
      return;
    }
    if (size === 'auto') {
      styles[key] = {
        flexBasis: 'auto',
        flexGrow: 0,
        maxWidth: 'none'
      };
      return;
    } // Keep 7 significant numbers.

    var width = "".concat(Math.round(size / 12 * 10e7) / 10e5, "%"); // Close to the bootstrap implementation:
    // https://github.com/twbs/bootstrap/blob/8fccaa2439e97ec72a4b7dc42ccc1f649790adb0/scss/mixins/_grid.scss#L41

    styles[key] = {
      flexBasis: width,
      flexGrow: 0,
      maxWidth: width
    };
  }); // No need for a media query for the first size.

  if (breakpoint === 'xs') {
    Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(globalStyles, styles);
  } else {
    globalStyles[theme.breakpoints.up(breakpoint)] = styles;
  }
}
function getOffset(val) {
  var div = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var parse = parseFloat(val);
  return "".concat(parse / div).concat(String(val).replace(String(parse), '') || 'px');
}
function generateGutter(theme, breakpoint) {
  var styles = {};
  SPACINGS.forEach(function (spacing) {
    var themeSpacing = theme.spacing(spacing);
    if (themeSpacing === 0) {
      return;
    }
    styles["spacing-".concat(breakpoint, "-").concat(spacing)] = {
      margin: "-".concat(getOffset(themeSpacing, 2)),
      width: "calc(100% + ".concat(getOffset(themeSpacing), ")"),
      '& > $item': {
        padding: getOffset(themeSpacing, 2)
      }
    };
  });
  return styles;
} // Default CSS values
// flex: '0 1 auto',
// flexDirection: 'row',
// alignItems: 'flex-start',
// flexWrap: 'nowrap',
// justifyContent: 'flex-start',

var styles = function styles(theme) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    /* Styles applied to the root element. */
    root: {},
    /* Styles applied to the root element if `container={true}`. */
    container: {
      boxSizing: 'border-box',
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%'
    },
    /* Styles applied to the root element if `item={true}`. */
    item: {
      boxSizing: 'border-box',
      margin: '0' // For instance, it's useful when used with a `figure` element.
    },

    /* Styles applied to the root element if `zeroMinWidth={true}`. */
    zeroMinWidth: {
      minWidth: 0
    },
    /* Styles applied to the root element if `direction="column"`. */
    'direction-xs-column': {
      flexDirection: 'column'
    },
    /* Styles applied to the root element if `direction="column-reverse"`. */
    'direction-xs-column-reverse': {
      flexDirection: 'column-reverse'
    },
    /* Styles applied to the root element if `direction="row-reverse"`. */
    'direction-xs-row-reverse': {
      flexDirection: 'row-reverse'
    },
    /* Styles applied to the root element if `wrap="nowrap"`. */
    'wrap-xs-nowrap': {
      flexWrap: 'nowrap'
    },
    /* Styles applied to the root element if `wrap="reverse"`. */
    'wrap-xs-wrap-reverse': {
      flexWrap: 'wrap-reverse'
    },
    /* Styles applied to the root element if `alignItems="center"`. */
    'align-items-xs-center': {
      alignItems: 'center'
    },
    /* Styles applied to the root element if `alignItems="flex-start"`. */
    'align-items-xs-flex-start': {
      alignItems: 'flex-start'
    },
    /* Styles applied to the root element if `alignItems="flex-end"`. */
    'align-items-xs-flex-end': {
      alignItems: 'flex-end'
    },
    /* Styles applied to the root element if `alignItems="baseline"`. */
    'align-items-xs-baseline': {
      alignItems: 'baseline'
    },
    /* Styles applied to the root element if `alignContent="center"`. */
    'align-content-xs-center': {
      alignContent: 'center'
    },
    /* Styles applied to the root element if `alignContent="flex-start"`. */
    'align-content-xs-flex-start': {
      alignContent: 'flex-start'
    },
    /* Styles applied to the root element if `alignContent="flex-end"`. */
    'align-content-xs-flex-end': {
      alignContent: 'flex-end'
    },
    /* Styles applied to the root element if `alignContent="space-between"`. */
    'align-content-xs-space-between': {
      alignContent: 'space-between'
    },
    /* Styles applied to the root element if `alignContent="space-around"`. */
    'align-content-xs-space-around': {
      alignContent: 'space-around'
    },
    /* Styles applied to the root element if `justify="center"`. */
    'justify-xs-center': {
      justifyContent: 'center'
    },
    /* Styles applied to the root element if `justify="flex-end"`. */
    'justify-xs-flex-end': {
      justifyContent: 'flex-end'
    },
    /* Styles applied to the root element if `justify="space-between"`. */
    'justify-xs-space-between': {
      justifyContent: 'space-between'
    },
    /* Styles applied to the root element if `justify="space-around"`. */
    'justify-xs-space-around': {
      justifyContent: 'space-around'
    },
    /* Styles applied to the root element if `justify="space-evenly"`. */
    'justify-xs-space-evenly': {
      justifyContent: 'space-evenly'
    }
  }, generateGutter(theme, 'xs'), theme.breakpoints.keys.reduce(function (accumulator, key) {
    // Use side effect over immutability for better performance.
    generateGrid(accumulator, theme, key);
    return accumulator;
  }, {}));
};
var Grid = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Grid(props, ref) {
  var _props$alignContent = props.alignContent,
    alignContent = _props$alignContent === void 0 ? 'stretch' : _props$alignContent,
    _props$alignItems = props.alignItems,
    alignItems = _props$alignItems === void 0 ? 'stretch' : _props$alignItems,
    classes = props.classes,
    classNameProp = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'div' : _props$component,
    _props$container = props.container,
    container = _props$container === void 0 ? false : _props$container,
    _props$direction = props.direction,
    direction = _props$direction === void 0 ? 'row' : _props$direction,
    _props$item = props.item,
    item = _props$item === void 0 ? false : _props$item,
    _props$justify = props.justify,
    justify = _props$justify === void 0 ? 'flex-start' : _props$justify,
    _props$lg = props.lg,
    lg = _props$lg === void 0 ? false : _props$lg,
    _props$md = props.md,
    md = _props$md === void 0 ? false : _props$md,
    _props$sm = props.sm,
    sm = _props$sm === void 0 ? false : _props$sm,
    _props$spacing = props.spacing,
    spacing = _props$spacing === void 0 ? 0 : _props$spacing,
    _props$wrap = props.wrap,
    wrap = _props$wrap === void 0 ? 'wrap' : _props$wrap,
    _props$xl = props.xl,
    xl = _props$xl === void 0 ? false : _props$xl,
    _props$xs = props.xs,
    xs = _props$xs === void 0 ? false : _props$xs,
    _props$zeroMinWidth = props.zeroMinWidth,
    zeroMinWidth = _props$zeroMinWidth === void 0 ? false : _props$zeroMinWidth,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(props, ["alignContent", "alignItems", "classes", "className", "component", "container", "direction", "item", "justify", "lg", "md", "sm", "spacing", "wrap", "xl", "xs", "zeroMinWidth"]);
  var className = Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, classNameProp, container && [classes.container, spacing !== 0 && classes["spacing-xs-".concat(String(spacing))]], item && classes.item, zeroMinWidth && classes.zeroMinWidth, direction !== 'row' && classes["direction-xs-".concat(String(direction))], wrap !== 'wrap' && classes["wrap-xs-".concat(String(wrap))], alignItems !== 'stretch' && classes["align-items-xs-".concat(String(alignItems))], alignContent !== 'stretch' && classes["align-content-xs-".concat(String(alignContent))], justify !== 'flex-start' && classes["justify-xs-".concat(String(justify))], xs !== false && classes["grid-xs-".concat(String(xs))], sm !== false && classes["grid-sm-".concat(String(sm))], md !== false && classes["grid-md-".concat(String(md))], lg !== false && classes["grid-lg-".concat(String(lg))], xl !== false && classes["grid-xl-".concat(String(xl))]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
    className: className,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
var StyledGrid = Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiGrid'
})(Grid);
if (false) { var requireProp; }
/* harmony default export */ __webpack_exports__["a"] = (StyledGrid);

/***/ }),

/***/ "uG8V":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "query", function() { return /* binding */ query; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__("KQm4");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js
var Grid = __webpack_require__("tRbT");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__("ofer");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__("R/WZ");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("ZBNC");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Divider/Divider.js
var Divider = __webpack_require__("wb2y");

// EXTERNAL MODULE: ./src/components/Layout.tsx + 7 modules
var Layout = __webpack_require__("soUV");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js + 13 modules
var Box = __webpack_require__("hlFM");

// CONCATENATED MODULE: ./src/components/PostHeader.tsx


const PostHeader = _ref => {
  let {
    className,
    date,
    subTitle,
    timeToRead,
    title
  } = _ref;
  return /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    component: "header",
    className: className
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h4",
    component: "h1",
    gutterBottom: true
  }, title), subTitle && /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h6",
    component: "h2",
    gutterBottom: true
  }, subTitle), /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "subtitle2",
    component: "p",
    gutterBottom: true
  }, date, " \xB7 ", timeToRead, " min read"));
};
/* harmony default export */ var components_PostHeader = (PostHeader);
// EXTERNAL MODULE: ./src/components/Content.tsx
var Content = __webpack_require__("Cqiw");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Link/Link.js
var Link = __webpack_require__("hlie");

// EXTERNAL MODULE: ./src/components/Share.tsx + 17 modules
var Share = __webpack_require__("DODd");

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./node_modules/gatsby-image/index.js
var gatsby_image = __webpack_require__("9eSz");
var gatsby_image_default = /*#__PURE__*/__webpack_require__.n(gatsby_image);

// CONCATENATED MODULE: ./src/components/PostBio.tsx




const useStyles = Object(makeStyles["a" /* default */])({
  avatarShell: {
    textAlign: 'center'
  },
  avatar: {
    borderRadius: '50%',
    width: 80,
    height: 80,
    margin: '0 auto'
  }
});
const PostBio = () => {
  const classes = useStyles();
  const {
    site,
    logo
  } = Object(gatsby_browser_entry["useStaticQuery"])("307212292");
  return /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    component: "section",
    container: true,
    spacing: 2,
    alignItems: "center"
  }, /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    item: true,
    xs: 12,
    sm: 2,
    component: "aside",
    className: classes.avatarShell
  }, /*#__PURE__*/react_default.a.createElement("a", {
    href: "https://twitter.com/benmvp",
    rel: "noopener noreferrer",
    target: "_blank"
  }, /*#__PURE__*/react_default.a.createElement(gatsby_image_default.a, {
    fixed: logo.childImageSharp.fixed,
    alt: site.siteMetadata.author.name,
    className: classes.avatar
  }))), /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    item: true,
    xs: 12,
    sm: 10,
    component: "article",
    dangerouslySetInnerHTML: {
      __html: site.siteMetadata.author.bio
    }
  }));
};
/* harmony default export */ var components_PostBio = (PostBio);
// EXTERNAL MODULE: ./src/components/SubscribeForm.tsx + 6 modules
var SubscribeForm = __webpack_require__("73Vy");

// CONCATENATED MODULE: ./src/components/PostFooter.tsx





const PostFooter_useStyles = Object(makeStyles["a" /* default */])(theme => {
  return Object(createStyles["a" /* default */])({
    divider: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  });
});
const PostFooter = _ref => {
  let {
    className,
    summary,
    slug,
    tags,
    title,
    url
  } = _ref;
  const classes = PostFooter_useStyles();
  return /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    component: "footer",
    className: className
  }, /*#__PURE__*/react_default.a.createElement(Share["a" /* default */], {
    url: url,
    title: title,
    summary: summary,
    tags: tags,
    type: "post"
  }), /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    mx: "auto",
    mt: 2,
    mb: 4,
    maxWidth: "500px"
  }, /*#__PURE__*/react_default.a.createElement(SubscribeForm["a" /* default */], null)), /*#__PURE__*/react_default.a.createElement(Divider["a" /* default */], {
    className: classes.divider,
    variant: "middle"
  }), /*#__PURE__*/react_default.a.createElement(components_PostBio, null), /*#__PURE__*/react_default.a.createElement(Divider["a" /* default */], {
    className: classes.divider,
    variant: "middle"
  }), /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    align: "center",
    variant: "h6",
    component: "p"
  }, /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], {
    href: `https://twitter.com/search?q=${url}`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Discuss on Twitter"), ' // ', /*#__PURE__*/react_default.a.createElement(Link["a" /* default */], {
    href: `https://github.com/benmvp/benmvp.com/edit/main/content/posts${slug}index.md`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Edit on GitHub")));
};
/* harmony default export */ var components_PostFooter = (PostFooter);
// EXTERNAL MODULE: ./src/components/PostCard.tsx
var PostCard = __webpack_require__("j8Pq");

// EXTERNAL MODULE: ./src/components/Seo.tsx
var Seo = __webpack_require__("hizP");

// EXTERNAL MODULE: ./src/utils/index.ts + 1 modules
var utils = __webpack_require__("0lfv");

// EXTERNAL MODULE: ./src/utils/generate-social-image.ts
var generate_social_image = __webpack_require__("mXBQ");

// CONCATENATED MODULE: ./src/templates/Post.tsx











const PostCardList = _ref => {
  let {
    posts,
    category
  } = _ref;
  return /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    container: true,
    spacing: 2
  }, /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h5",
    component: "h3"
  }, "More from Ben Ilegbodu on ", /*#__PURE__*/react_default.a.createElement("strong", null, category), "...")), posts.map(_ref2 => {
    let {
      node
    } = _ref2;
    return /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
      key: node.id,
      item: true,
      xs: 12,
      sm: 6
    }, /*#__PURE__*/react_default.a.createElement(PostCard["a" /* default */], {
      mode: "min",
      slug: node.fields.slug,
      title: node.frontmatter.title,
      tags: node.frontmatter.tags,
      date: node.frontmatter.date,
      summary: node.frontmatter.shortDescription || node.excerpt,
      hero: node.frontmatter.hero
    }));
  }));
};
const Post_useStyles = Object(makeStyles["a" /* default */])(theme => Object(createStyles["a" /* default */])({
  header: {
    marginBottom: theme.spacing(3)
  },
  footer: {
    marginTop: theme.spacing(3)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));
const Post = _ref3 => {
  let {
    data
  } = _ref3;
  const classes = Post_useStyles();
  const {
    post,
    categoryPosts,
    site
  } = data;
  const {
    html,
    fields,
    frontmatter,
    excerpt,
    timeToRead,
    wordCount
  } = post;
  const {
    title,
    date,
    dateIso,
    shortDescription,
    tags,
    category
  } = frontmatter;
  const {
    slug
  } = fields;
  const summary = shortDescription || excerpt;
  const url = Object(utils["f" /* getBlogUrl */])(slug);
  const seoImageUrl = Object(generate_social_image["a" /* default */])({
    title,
    tagline: shortDescription,
    date
  });
  const relatedPosts = (categoryPosts === null || categoryPosts === void 0 ? void 0 : categoryPosts.edges) ? Object(toConsumableArray["a" /* default */])(categoryPosts === null || categoryPosts === void 0 ? void 0 : categoryPosts.edges) : [];
  const totalRelatedPosts = relatedPosts.length;
  const maxRelatedPosts = 4;
  if (relatedPosts.length > maxRelatedPosts) {
    // We need to randomly remove (N - X) items from the array so that we'll
    // have X remaining.
    for (let i = 0; i < totalRelatedPosts - maxRelatedPosts; i++) {
      const randomIndex = Math.floor(Math.random() * relatedPosts.length);
      relatedPosts.splice(randomIndex, 1);
    }
  }
  return /*#__PURE__*/react_default.a.createElement(Layout["a" /* default */], {
    showAds: true,
    includeSubscribe: false
  }, /*#__PURE__*/react_default.a.createElement(Seo["a" /* default */], {
    title: title,
    description: summary,
    url: url,
    image: seoImageUrl,
    imageAlt: title,
    type: "article",
    meta: [{
      property: 'og:article:published_time',
      content: dateIso
    }, {
      property: 'og:article:author',
      content: site.siteMetadata.author.name
    }, {
      property: 'og:article:section',
      content: 'Technology'
    }].concat(Object(toConsumableArray["a" /* default */])((tags || []).map(tag => ({
      property: 'og:article:tag',
      content: tag
    })))),
    schemaOrg: {
      '@type': 'BlogPosting',
      headline: shortDescription,
      articleBody: html,
      author: {
        '@type': 'Person',
        name: site.siteMetadata.author.name
      },
      datePublished: dateIso,
      publisher: {
        '@type': 'Person',
        name: site.siteMetadata.author.name
      },
      teaches: category,
      timeRequired: `PT${timeToRead}M`,
      wordCount: wordCount.words
    }
  }), /*#__PURE__*/react_default.a.createElement(components_PostHeader, {
    className: classes.header,
    title: title,
    subTitle: shortDescription,
    timeToRead: timeToRead,
    date: date
  }), /*#__PURE__*/react_default.a.createElement(Content["a" /* default */], null, html), /*#__PURE__*/react_default.a.createElement(components_PostFooter, {
    className: classes.footer,
    url: url,
    slug: slug,
    title: title,
    summary: summary,
    tags: tags
  }), relatedPosts.length > 0 && /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(Divider["a" /* default */], {
    className: classes.divider,
    variant: "middle"
  }), /*#__PURE__*/react_default.a.createElement(PostCardList, {
    posts: relatedPosts,
    category: category
  })));
};
/* harmony default export */ var templates_Post = __webpack_exports__["default"] = (Post);
const query = "2818361808";

/***/ }),

/***/ "wb2y":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("H2TA");
/* harmony import */ var _styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("ye/S");






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      height: 1,
      margin: 0,
      // Reset browser default style.
      border: 'none',
      flexShrink: 0,
      backgroundColor: theme.palette.divider
    },
    /* Styles applied to the root element if `absolute={true}`. */
    absolute: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%'
    },
    /* Styles applied to the root element if `variant="inset"`. */
    inset: {
      marginLeft: 72
    },
    /* Styles applied to the root element if `light={true}`. */
    light: {
      backgroundColor: Object(_styles_colorManipulator__WEBPACK_IMPORTED_MODULE_5__[/* fade */ "c"])(theme.palette.divider, 0.08)
    },
    /* Styles applied to the root element if `variant="middle"`. */
    middle: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    /* Styles applied to the root element if `orientation="vertical"`. */
    vertical: {
      height: '100%',
      width: 1
    },
    /* Styles applied to the root element if `flexItem={true}`. */
    flexItem: {
      alignSelf: 'stretch',
      height: 'auto'
    }
  };
};
var Divider = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function Divider(props, ref) {
  var _props$absolute = props.absolute,
    absolute = _props$absolute === void 0 ? false : _props$absolute,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'hr' : _props$component,
    _props$flexItem = props.flexItem,
    flexItem = _props$flexItem === void 0 ? false : _props$flexItem,
    _props$light = props.light,
    light = _props$light === void 0 ? false : _props$light,
    _props$orientation = props.orientation,
    orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
    _props$role = props.role,
    role = _props$role === void 0 ? Component !== 'hr' ? 'separator' : undefined : _props$role,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'fullWidth' : _props$variant,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"](Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, variant !== 'fullWidth' && classes[variant], absolute && classes.absolute, flexItem && classes.flexItem, light && classes.light, orientation === 'vertical' && classes.vertical),
    role: role,
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiDivider'
})(Divider));

/***/ })

}]);
//# sourceMappingURL=component---src-templates-post-tsx-0d9430f06be996e24ca9.js.map