(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[6],{

/***/ "+Hmc":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ createUnarySpacing; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 1 modules
var slicedToArray = __webpack_require__("ODXe");

// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/breakpoints.js
var breakpoints = __webpack_require__("LybE");

// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/merge.js
var merge = __webpack_require__("bv9d");

// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/memoize.js
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) {
      cache[arg] = fn(arg);
    }
    return cache[arg];
  };
}
// CONCATENATED MODULE: ./node_modules/@material-ui/system/esm/spacing.js





var properties = {
  m: 'margin',
  p: 'padding'
};
var directions = {
  t: 'Top',
  r: 'Right',
  b: 'Bottom',
  l: 'Left',
  x: ['Left', 'Right'],
  y: ['Top', 'Bottom']
};
var aliases = {
  marginX: 'mx',
  marginY: 'my',
  paddingX: 'px',
  paddingY: 'py'
}; // memoize() impact:
// From 300,000 ops/sec
// To 350,000 ops/sec

var getCssProperties = memoize(function (prop) {
  // It's not a shorthand notation.
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  var _prop$split = prop.split(''),
    _prop$split2 = Object(slicedToArray["a" /* default */])(_prop$split, 2),
    a = _prop$split2[0],
    b = _prop$split2[1];
  var property = properties[a];
  var direction = directions[b] || '';
  return Array.isArray(direction) ? direction.map(function (dir) {
    return property + dir;
  }) : [property + direction];
});
var spacingKeys = ['m', 'mt', 'mr', 'mb', 'ml', 'mx', 'my', 'p', 'pt', 'pr', 'pb', 'pl', 'px', 'py', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'marginX', 'marginY', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'paddingX', 'paddingY'];
function createUnarySpacing(theme) {
  var themeSpacing = theme.spacing || 8;
  if (typeof themeSpacing === 'number') {
    return function (abs) {
      if (false) {}
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return function (abs) {
      if (false) {}
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === 'function') {
    return themeSpacing;
  }
  if (false) {}
  return function () {
    return undefined;
  };
}
function getValue(transformer, propValue) {
  if (typeof propValue === 'string') {
    return propValue;
  }
  var abs = Math.abs(propValue);
  var transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === 'number') {
    return -transformed;
  }
  return "-".concat(transformed);
}
function getStyleFromPropValue(cssProperties, transformer) {
  return function (propValue) {
    return cssProperties.reduce(function (acc, cssProperty) {
      acc[cssProperty] = getValue(transformer, propValue);
      return acc;
    }, {});
  };
}
function spacing(props) {
  var theme = props.theme;
  var transformer = createUnarySpacing(theme);
  return Object.keys(props).map(function (prop) {
    // Using a hash computation over an array iteration could be faster, but with only 28 items,
    // it's doesn't worth the bundle size.
    if (spacingKeys.indexOf(prop) === -1) {
      return null;
    }
    var cssProperties = getCssProperties(prop);
    var styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
    var propValue = props[prop];
    return Object(breakpoints["a" /* handleBreakpoints */])(props, propValue, styleFromPropValue);
  }).reduce(merge["a" /* default */], {});
}
spacing.propTypes =  false ? undefined : {};
spacing.filterProps = spacingKeys;
/* harmony default export */ var esm_spacing = __webpack_exports__["b"] = (spacing);

/***/ }),

/***/ "+ZDr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.withPrefix = withPrefix;
exports.withAssetPrefix = withAssetPrefix;
exports.navigateTo = exports.replace = exports.push = exports.navigate = exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(__webpack_require__("8OQS"));

var _extends2 = _interopRequireDefault(__webpack_require__("pVnL"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("PJYZ"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__("VbXa"));

var _propTypes = _interopRequireDefault(__webpack_require__("17x9"));

var _react = _interopRequireDefault(__webpack_require__("q1tI"));

var _router = __webpack_require__("YwZP");

var _utils = __webpack_require__("LYrO");

var _parsePath = __webpack_require__("cu4x");

exports.parsePath = _parsePath.parsePath;

var isAbsolutePath = function isAbsolutePath(path) {
  return path === null || path === void 0 ? void 0 : path.startsWith("/");
};

function withPrefix(path, prefix) {
  var _ref, _prefix;

  if (prefix === void 0) {
    prefix = getGlobalBasePrefix();
  }

  if (!isLocalLink(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  var base = (_ref = (_prefix = prefix) !== null && _prefix !== void 0 ? _prefix : getGlobalPathPrefix()) !== null && _ref !== void 0 ? _ref : "/";
  return "" + ((base === null || base === void 0 ? void 0 : base.endsWith("/")) ? base.slice(0, -1) : base) + (path.startsWith("/") ? path : "/" + path);
} // These global values are wrapped in typeof clauses to ensure the values exist.
// This is especially problematic in unit testing of this component.


var getGlobalPathPrefix = function getGlobalPathPrefix() {
  return  false ? undefined : "";
};

var getGlobalBasePrefix = function getGlobalBasePrefix() {
  return  false ? undefined : "";
};

var isLocalLink = function isLocalLink(path) {
  return path && !path.startsWith("http://") && !path.startsWith("https://") && !path.startsWith("//");
};

function withAssetPrefix(path) {
  return withPrefix(path, getGlobalPathPrefix());
}

function absolutify(path, current) {
  // If it's already absolute, return as-is
  if (isAbsolutePath(path)) {
    return path;
  }

  return (0, _utils.resolve)(path, current);
}

var rewriteLinkPath = function rewriteLinkPath(path, relativeTo) {
  if (typeof path === "number") {
    return path;
  }

  if (!isLocalLink(path)) {
    return path;
  }

  return isAbsolutePath(path) ? withPrefix(path) : absolutify(path, relativeTo);
};

var NavLinkPropTypes = {
  activeClassName: _propTypes.default.string,
  activeStyle: _propTypes.default.object,
  partiallyActive: _propTypes.default.bool
}; // Set up IntersectionObserver

var createIntersectionObserver = function createIntersectionObserver(el, cb) {
  var io = new window.IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (el === entry.target) {
        // Check if element is within viewport, remove listener, destroy observer, and run link callback.
        // MSEdge doesn't currently support isIntersecting, so also test for  an intersectionRatio > 0
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          io.unobserve(el);
          io.disconnect();
          cb();
        }
      }
    });
  }); // Add element to the observer

  io.observe(el);
  return {
    instance: io,
    el: el
  };
};

var GatsbyLink = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(GatsbyLink, _React$Component);

  function GatsbyLink(props) {
    var _this;

    _this = _React$Component.call(this, props) || this; // Default to no support for IntersectionObserver

    _this.defaultGetProps = function (_ref2) {
      var isPartiallyCurrent = _ref2.isPartiallyCurrent,
          isCurrent = _ref2.isCurrent;

      if (_this.props.partiallyActive ? isPartiallyCurrent : isCurrent) {
        return {
          className: [_this.props.className, _this.props.activeClassName].filter(Boolean).join(" "),
          style: (0, _extends2.default)({}, _this.props.style, _this.props.activeStyle)
        };
      }

      return null;
    };

    var IOSupported = false;

    if (typeof window !== "undefined" && window.IntersectionObserver) {
      IOSupported = true;
    }

    _this.state = {
      IOSupported: IOSupported
    };
    _this.handleRef = _this.handleRef.bind((0, _assertThisInitialized2.default)(_this));
    return _this;
  }

  var _proto = GatsbyLink.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    // Preserve non IO functionality if no support
    if (this.props.to !== prevProps.to && !this.state.IOSupported) {
      ___loader.enqueue((0, _parsePath.parsePath)(rewriteLinkPath(this.props.to, window.location.pathname)).pathname);
    }
  };

  _proto.componentDidMount = function componentDidMount() {
    // Preserve non IO functionality if no support
    if (!this.state.IOSupported) {
      ___loader.enqueue((0, _parsePath.parsePath)(rewriteLinkPath(this.props.to, window.location.pathname)).pathname);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (!this.io) {
      return;
    }

    var _this$io = this.io,
        instance = _this$io.instance,
        el = _this$io.el;
    instance.unobserve(el);
    instance.disconnect();
  };

  _proto.handleRef = function handleRef(ref) {
    var _this2 = this;

    if (this.props.innerRef && this.props.innerRef.hasOwnProperty("current")) {
      this.props.innerRef.current = ref;
    } else if (this.props.innerRef) {
      this.props.innerRef(ref);
    }

    if (this.state.IOSupported && ref) {
      // If IO supported and element reference found, setup Observer functionality
      this.io = createIntersectionObserver(ref, function () {
        ___loader.enqueue((0, _parsePath.parsePath)(rewriteLinkPath(_this2.props.to, window.location.pathname)).pathname);
      });
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    var _this$props = this.props,
        to = _this$props.to,
        _this$props$getProps = _this$props.getProps,
        getProps = _this$props$getProps === void 0 ? this.defaultGetProps : _this$props$getProps,
        _onClick = _this$props.onClick,
        _onMouseEnter = _this$props.onMouseEnter,
        $activeClassName = _this$props.activeClassName,
        $activeStyle = _this$props.activeStyle,
        $innerRef = _this$props.innerRef,
        partiallyActive = _this$props.partiallyActive,
        state = _this$props.state,
        replace = _this$props.replace,
        rest = (0, _objectWithoutPropertiesLoose2.default)(_this$props, ["to", "getProps", "onClick", "onMouseEnter", "activeClassName", "activeStyle", "innerRef", "partiallyActive", "state", "replace"]);

    if (false) {}

    return /*#__PURE__*/_react.default.createElement(_router.Location, null, function (_ref3) {
      var location = _ref3.location;
      var prefixedTo = rewriteLinkPath(to, location.pathname);
      return isLocalLink(prefixedTo) ? /*#__PURE__*/_react.default.createElement(_router.Link, (0, _extends2.default)({
        to: prefixedTo,
        state: state,
        getProps: getProps,
        innerRef: _this3.handleRef,
        onMouseEnter: function onMouseEnter(e) {
          if (_onMouseEnter) {
            _onMouseEnter(e);
          }

          ___loader.hovering((0, _parsePath.parsePath)(prefixedTo).pathname);
        },
        onClick: function onClick(e) {
          if (_onClick) {
            _onClick(e);
          }

          if (e.button === 0 && // ignore right clicks
          !_this3.props.target && // let browser handle "target=_blank"
          !e.defaultPrevented && // onClick prevented default
          !e.metaKey && // ignore clicks with modifier keys...
          !e.altKey && !e.ctrlKey && !e.shiftKey) {
            e.preventDefault();
            var shouldReplace = replace;
            var isCurrent = encodeURI(prefixedTo) === window.location.pathname;

            if (typeof replace !== "boolean" && isCurrent) {
              shouldReplace = true;
            } // Make sure the necessary scripts and data are
            // loaded before continuing.


            window.___navigate(prefixedTo, {
              state: state,
              replace: shouldReplace
            });
          }

          return true;
        }
      }, rest)) : /*#__PURE__*/_react.default.createElement("a", (0, _extends2.default)({
        href: prefixedTo
      }, rest));
    });
  };

  return GatsbyLink;
}(_react.default.Component);

GatsbyLink.propTypes = (0, _extends2.default)({}, NavLinkPropTypes, {
  onClick: _propTypes.default.func,
  to: _propTypes.default.string.isRequired,
  replace: _propTypes.default.bool,
  state: _propTypes.default.object
});

var showDeprecationWarning = function showDeprecationWarning(functionName, altFunctionName, version) {
  return console.warn("The \"" + functionName + "\" method is now deprecated and will be removed in Gatsby v" + version + ". Please use \"" + altFunctionName + "\" instead.");
};

var _default = /*#__PURE__*/_react.default.forwardRef(function (props, ref) {
  return /*#__PURE__*/_react.default.createElement(GatsbyLink, (0, _extends2.default)({
    innerRef: ref
  }, props));
});

exports.default = _default;

var navigate = function navigate(to, options) {
  window.___navigate(rewriteLinkPath(to, window.location.pathname), options);
};

exports.navigate = navigate;

var push = function push(to) {
  showDeprecationWarning("push", "navigate", 3);

  window.___push(rewriteLinkPath(to, window.location.pathname));
};

exports.push = push;

var replace = function replace(to) {
  showDeprecationWarning("replace", "navigate", 3);

  window.___replace(rewriteLinkPath(to, window.location.pathname));
}; // TODO: Remove navigateTo for Gatsby v3


exports.replace = replace;

var navigateTo = function navigateTo(to) {
  showDeprecationWarning("navigateTo", "navigate", 3);
  return push(to);
};

exports.navigateTo = navigateTo;

/***/ }),

/***/ "/P46":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return styled; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2mql");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _makeStyles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("RD7I");







function omit(input, fields) {
  var output = {};
  Object.keys(input).forEach(function (prop) {
    if (fields.indexOf(prop) === -1) {
      output[prop] = input[prop];
    }
  });
  return output;
} // styled-components's API removes the mapping between components and styles.
// Using components as a low-level styling construct can be simpler.

function styled(Component) {
  var componentCreator = function componentCreator(style) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var name = options.name,
      stylesOptions = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(options, ["name"]);
    if (false) {}
    var classNamePrefix = name;
    if (false) { var displayName; }
    var stylesOrCreator = typeof style === 'function' ? function (theme) {
      return {
        root: function root(props) {
          return style(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
            theme: theme
          }, props));
        }
      };
    } : {
      root: style
    };
    var useStyles = Object(_makeStyles__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(stylesOrCreator, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      Component: Component,
      name: name || Component.displayName,
      classNamePrefix: classNamePrefix
    }, stylesOptions));
    var filterProps;
    var propTypes = {};
    if (style.filterProps) {
      filterProps = style.filterProps;
      delete style.filterProps;
    }
    /* eslint-disable react/forbid-foreign-prop-types */

    if (style.propTypes) {
      propTypes = style.propTypes;
      delete style.propTypes;
    }
    /* eslint-enable react/forbid-foreign-prop-types */

    var StyledComponent = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function StyledComponent(props, ref) {
      var children = props.children,
        classNameProp = props.className,
        clone = props.clone,
        ComponentProp = props.component,
        other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["children", "className", "clone", "component"]);
      var classes = useStyles(props);
      var className = Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, classNameProp);
      var spread = other;
      if (filterProps) {
        spread = omit(spread, filterProps);
      }
      if (clone) {
        return react__WEBPACK_IMPORTED_MODULE_2___default.a.cloneElement(children, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
          className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(children.props.className, className)
        }, spread));
      }
      if (typeof children === 'function') {
        return children(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
          className: className
        }, spread));
      }
      var FinalComponent = ComponentProp || Component;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(FinalComponent, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
        ref: ref,
        className: className
      }, spread), children);
    });
     false ? undefined : void 0;
    if (false) {}
    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_4___default()(StyledComponent, Component);
    return StyledComponent;
  };
  return componentCreator;
}

/***/ }),

/***/ "/ceM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RuleList; });
/* unused harmony export SheetsManager */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SheetsRegistry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return create; });
/* unused harmony export createGenerateId */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return createRule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return getDynamicStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return hasCSSTOMSupport; });
/* unused harmony export sheets */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return toCssValue; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var is_in_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("zteo");
/* harmony import */ var tiny_warning__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("LUQC");
/* harmony import */ var _babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("vuIU");
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("dI71");
/* harmony import */ var _babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("JX7q");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("zLVn");







var plainObjectConstrurctor = {}.constructor;
function cloneStyle(style) {
  if (style == null || typeof style !== 'object') return style;
  if (Array.isArray(style)) return style.map(cloneStyle);
  if (style.constructor !== plainObjectConstrurctor) return style;
  var newStyle = {};
  for (var name in style) {
    newStyle[name] = cloneStyle(style[name]);
  }
  return newStyle;
}

/**
 * Create a rule instance.
 */

function createRule(name, decl, options) {
  if (name === void 0) {
    name = 'unnamed';
  }
  var jss = options.jss;
  var declCopy = cloneStyle(decl);
  var rule = jss.plugins.onCreateRule(name, declCopy, options);
  if (rule) return rule; // It is an at-rule and it has no instance.

  if (name[0] === '@') {
     false ? undefined : void 0;
  }
  return null;
}
var join = function join(value, by) {
  var result = '';
  for (var i = 0; i < value.length; i++) {
    // Remove !important from the value, it will be readded later.
    if (value[i] === '!important') break;
    if (result) result += by;
    result += value[i];
  }
  return result;
};
/**
 * Converts array values to string.
 *
 * `margin: [['5px', '10px']]` > `margin: 5px 10px;`
 * `border: ['1px', '2px']` > `border: 1px, 2px;`
 * `margin: [['5px', '10px'], '!important']` > `margin: 5px 10px !important;`
 * `color: ['red', !important]` > `color: red !important;`
 */

function toCssValue(value, ignoreImportant) {
  if (ignoreImportant === void 0) {
    ignoreImportant = false;
  }
  if (!Array.isArray(value)) return value;
  var cssValue = ''; // Support space separated values via `[['5px', '10px']]`.

  if (Array.isArray(value[0])) {
    for (var i = 0; i < value.length; i++) {
      if (value[i] === '!important') break;
      if (cssValue) cssValue += ', ';
      cssValue += join(value[i], ' ');
    }
  } else cssValue = join(value, ', '); // Add !important, because it was ignored.

  if (!ignoreImportant && value[value.length - 1] === '!important') {
    cssValue += ' !important';
  }
  return cssValue;
}

/**
 * Indent a string.
 * http://jsperf.com/array-join-vs-for
 */
function indentStr(str, indent) {
  var result = '';
  for (var index = 0; index < indent; index++) {
    result += '  ';
  }
  return result + str;
}
/**
 * Converts a Rule to CSS string.
 */

function toCss(selector, style, options) {
  if (options === void 0) {
    options = {};
  }
  var result = '';
  if (!style) return result;
  var _options = options,
    _options$indent = _options.indent,
    indent = _options$indent === void 0 ? 0 : _options$indent;
  var fallbacks = style.fallbacks;
  if (selector) indent++; // Apply fallbacks first.

  if (fallbacks) {
    // Array syntax {fallbacks: [{prop: value}]}
    if (Array.isArray(fallbacks)) {
      for (var index = 0; index < fallbacks.length; index++) {
        var fallback = fallbacks[index];
        for (var prop in fallback) {
          var value = fallback[prop];
          if (value != null) {
            if (result) result += '\n';
            result += "" + indentStr(prop + ": " + toCssValue(value) + ";", indent);
          }
        }
      }
    } else {
      // Object syntax {fallbacks: {prop: value}}
      for (var _prop in fallbacks) {
        var _value = fallbacks[_prop];
        if (_value != null) {
          if (result) result += '\n';
          result += "" + indentStr(_prop + ": " + toCssValue(_value) + ";", indent);
        }
      }
    }
  }
  for (var _prop2 in style) {
    var _value2 = style[_prop2];
    if (_value2 != null && _prop2 !== 'fallbacks') {
      if (result) result += '\n';
      result += "" + indentStr(_prop2 + ": " + toCssValue(_value2) + ";", indent);
    }
  } // Allow empty style in this case, because properties will be added dynamically.

  if (!result && !options.allowEmpty) return result; // When rule is being stringified before selector was defined.

  if (!selector) return result;
  indent--;
  if (result) result = "\n" + result + "\n";
  return indentStr(selector + " {" + result, indent) + indentStr('}', indent);
}
var escapeRegex = /([[\].#*$><+~=|^:(),"'`\s])/g;
var nativeEscape = typeof CSS !== 'undefined' && CSS.escape;
var escape = function (str) {
  return nativeEscape ? nativeEscape(str) : str.replace(escapeRegex, '\\$1');
};
var BaseStyleRule = /*#__PURE__*/
function () {
  function BaseStyleRule(key, style, options) {
    this.type = 'style';
    this.key = void 0;
    this.isProcessed = false;
    this.style = void 0;
    this.renderer = void 0;
    this.renderable = void 0;
    this.options = void 0;
    var sheet = options.sheet,
      Renderer = options.Renderer;
    this.key = key;
    this.options = options;
    this.style = style;
    if (sheet) this.renderer = sheet.renderer;else if (Renderer) this.renderer = new Renderer();
  }
  /**
   * Get or set a style property.
   */

  var _proto = BaseStyleRule.prototype;
  _proto.prop = function prop(name, value, options) {
    // It's a getter.
    if (value === undefined) return this.style[name]; // Don't do anything if the value has not changed.

    var force = options ? options.force : false;
    if (!force && this.style[name] === value) return this;
    var newValue = value;
    if (!options || options.process !== false) {
      newValue = this.options.jss.plugins.onChangeValue(value, name, this);
    }
    var isEmpty = newValue == null || newValue === false;
    var isDefined = (name in this.style); // Value is empty and wasn't defined before.

    if (isEmpty && !isDefined && !force) return this; // We are going to remove this value.

    var remove = isEmpty && isDefined;
    if (remove) delete this.style[name];else this.style[name] = newValue; // Renderable is defined if StyleSheet option `link` is true.

    if (this.renderable && this.renderer) {
      if (remove) this.renderer.removeProperty(this.renderable, name);else this.renderer.setProperty(this.renderable, name, newValue);
      return this;
    }
    var sheet = this.options.sheet;
    if (sheet && sheet.attached) {
       false ? undefined : void 0;
    }
    return this;
  };
  return BaseStyleRule;
}();
var StyleRule = /*#__PURE__*/
function (_BaseStyleRule) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(StyleRule, _BaseStyleRule);
  function StyleRule(key, style, options) {
    var _this;
    _this = _BaseStyleRule.call(this, key, style, options) || this;
    _this.selectorText = void 0;
    _this.id = void 0;
    _this.renderable = void 0;
    var selector = options.selector,
      scoped = options.scoped,
      sheet = options.sheet,
      generateId = options.generateId;
    if (selector) {
      _this.selectorText = selector;
    } else if (scoped !== false) {
      _this.id = generateId(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_assertThisInitialized__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this)), sheet);
      _this.selectorText = "." + escape(_this.id);
    }
    return _this;
  }
  /**
   * Set selector string.
   * Attention: use this with caution. Most browsers didn't implement
   * selectorText setter, so this may result in rerendering of entire Style Sheet.
   */

  var _proto2 = StyleRule.prototype;

  /**
   * Apply rule to an element inline.
   */
  _proto2.applyTo = function applyTo(renderable) {
    var renderer = this.renderer;
    if (renderer) {
      var json = this.toJSON();
      for (var prop in json) {
        renderer.setProperty(renderable, prop, json[prop]);
      }
    }
    return this;
  }
  /**
   * Returns JSON representation of the rule.
   * Fallbacks are not supported.
   * Useful for inline styles.
   */;

  _proto2.toJSON = function toJSON() {
    var json = {};
    for (var prop in this.style) {
      var value = this.style[prop];
      if (typeof value !== 'object') json[prop] = value;else if (Array.isArray(value)) json[prop] = toCssValue(value);
    }
    return json;
  }
  /**
   * Generates a CSS string.
   */;

  _proto2.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.selectorText, this.style, opts);
  };
  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(StyleRule, [{
    key: "selector",
    set: function set(selector) {
      if (selector === this.selectorText) return;
      this.selectorText = selector;
      var renderer = this.renderer,
        renderable = this.renderable;
      if (!renderable || !renderer) return;
      var hasChanged = renderer.setSelector(renderable, selector); // If selector setter is not implemented, rerender the rule.

      if (!hasChanged) {
        renderer.replaceRule(renderable, this);
      }
    }
    /**
     * Get selector string.
     */,

    get: function get() {
      return this.selectorText;
    }
  }]);
  return StyleRule;
}(BaseStyleRule);
var pluginStyleRule = {
  onCreateRule: function onCreateRule(name, style, options) {
    if (name[0] === '@' || options.parent && options.parent.type === 'keyframes') {
      return null;
    }
    return new StyleRule(name, style, options);
  }
};
var defaultToStringOptions = {
  indent: 1,
  children: true
};
var atRegExp = /@([\w-]+)/;
/**
 * Conditional rule for @media, @supports
 */

var ConditionalRule = /*#__PURE__*/
function () {
  function ConditionalRule(key, styles, options) {
    this.type = 'conditional';
    this.at = void 0;
    this.key = void 0;
    this.query = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key; // Key might contain a unique suffix in case the `name` passed by user was duplicate.

    this.query = options.name;
    var atMatch = key.match(atRegExp);
    this.at = atMatch ? atMatch[1] : 'unknown';
    this.options = options;
    this.rules = new RuleList(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      parent: this
    }));
    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }
    this.rules.process();
  }
  /**
   * Get a rule.
   */

  var _proto = ConditionalRule.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Get index of a rule.
   */;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Create and register rule, run plugins.
   */;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Generates a CSS string.
   */;

  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions;
    }
    if (options.indent == null) options.indent = defaultToStringOptions.indent;
    if (options.children == null) options.children = defaultToStringOptions.children;
    if (options.children === false) {
      return this.query + " {}";
    }
    var children = this.rules.toString(options);
    return children ? this.query + " {\n" + children + "\n}" : '';
  };
  return ConditionalRule;
}();
var keyRegExp = /@media|@supports\s+/;
var pluginConditionalRule = {
  onCreateRule: function onCreateRule(key, styles, options) {
    return keyRegExp.test(key) ? new ConditionalRule(key, styles, options) : null;
  }
};
var defaultToStringOptions$1 = {
  indent: 1,
  children: true
};
var nameRegExp = /@keyframes\s+([\w-]+)/;
/**
 * Rule for @keyframes
 */

var KeyframesRule = /*#__PURE__*/
function () {
  function KeyframesRule(key, frames, options) {
    this.type = 'keyframes';
    this.at = '@keyframes';
    this.key = void 0;
    this.name = void 0;
    this.id = void 0;
    this.rules = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    var nameMatch = key.match(nameRegExp);
    if (nameMatch && nameMatch[1]) {
      this.name = nameMatch[1];
    } else {
      this.name = 'noname';
       false ? undefined : void 0;
    }
    this.key = this.type + "-" + this.name;
    this.options = options;
    var scoped = options.scoped,
      sheet = options.sheet,
      generateId = options.generateId;
    this.id = scoped === false ? this.name : escape(generateId(this, sheet));
    this.rules = new RuleList(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      parent: this
    }));
    for (var name in frames) {
      this.rules.add(name, frames[name], Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
        parent: this
      }));
    }
    this.rules.process();
  }
  /**
   * Generates a CSS string.
   */

  var _proto = KeyframesRule.prototype;
  _proto.toString = function toString(options) {
    if (options === void 0) {
      options = defaultToStringOptions$1;
    }
    if (options.indent == null) options.indent = defaultToStringOptions$1.indent;
    if (options.children == null) options.children = defaultToStringOptions$1.children;
    if (options.children === false) {
      return this.at + " " + this.id + " {}";
    }
    var children = this.rules.toString(options);
    if (children) children = "\n" + children + "\n";
    return this.at + " " + this.id + " {" + children + "}";
  };
  return KeyframesRule;
}();
var keyRegExp$1 = /@keyframes\s+/;
var refRegExp = /\$([\w-]+)/g;
var findReferencedKeyframe = function findReferencedKeyframe(val, keyframes) {
  if (typeof val === 'string') {
    return val.replace(refRegExp, function (match, name) {
      if (name in keyframes) {
        return keyframes[name];
      }
       false ? undefined : void 0;
      return match;
    });
  }
  return val;
};
/**
 * Replace the reference for a animation name.
 */

var replaceRef = function replaceRef(style, prop, keyframes) {
  var value = style[prop];
  var refKeyframe = findReferencedKeyframe(value, keyframes);
  if (refKeyframe !== value) {
    style[prop] = refKeyframe;
  }
};
var plugin = {
  onCreateRule: function onCreateRule(key, frames, options) {
    return typeof key === 'string' && keyRegExp$1.test(key) ? new KeyframesRule(key, frames, options) : null;
  },
  // Animation name ref replacer.
  onProcessStyle: function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style' || !sheet) return style;
    if ('animation-name' in style) replaceRef(style, 'animation-name', sheet.keyframes);
    if ('animation' in style) replaceRef(style, 'animation', sheet.keyframes);
    return style;
  },
  onChangeValue: function onChangeValue(val, prop, rule) {
    var sheet = rule.options.sheet;
    if (!sheet) {
      return val;
    }
    switch (prop) {
      case 'animation':
        return findReferencedKeyframe(val, sheet.keyframes);
      case 'animation-name':
        return findReferencedKeyframe(val, sheet.keyframes);
      default:
        return val;
    }
  }
};
var KeyframeRule = /*#__PURE__*/
function (_BaseStyleRule) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(KeyframeRule, _BaseStyleRule);
  function KeyframeRule() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _BaseStyleRule.call.apply(_BaseStyleRule, [this].concat(args)) || this;
    _this.renderable = void 0;
    return _this;
  }
  var _proto = KeyframeRule.prototype;

  /**
   * Generates a CSS string.
   */
  _proto.toString = function toString(options) {
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    var opts = link ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      allowEmpty: true
    }) : options;
    return toCss(this.key, this.style, opts);
  };
  return KeyframeRule;
}(BaseStyleRule);
var pluginKeyframeRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    if (options.parent && options.parent.type === 'keyframes') {
      return new KeyframeRule(key, style, options);
    }
    return null;
  }
};
var FontFaceRule = /*#__PURE__*/
function () {
  function FontFaceRule(key, style, options) {
    this.type = 'font-face';
    this.at = '@font-face';
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */

  var _proto = FontFaceRule.prototype;
  _proto.toString = function toString(options) {
    if (Array.isArray(this.style)) {
      var str = '';
      for (var index = 0; index < this.style.length; index++) {
        str += toCss(this.at, this.style[index]);
        if (this.style[index + 1]) str += '\n';
      }
      return str;
    }
    return toCss(this.at, this.style, options);
  };
  return FontFaceRule;
}();
var keyRegExp$2 = /@font-face/;
var pluginFontFaceRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return keyRegExp$2.test(key) ? new FontFaceRule(key, style, options) : null;
  }
};
var ViewportRule = /*#__PURE__*/
function () {
  function ViewportRule(key, style, options) {
    this.type = 'viewport';
    this.at = '@viewport';
    this.key = void 0;
    this.style = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.style = style;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */

  var _proto = ViewportRule.prototype;
  _proto.toString = function toString(options) {
    return toCss(this.key, this.style, options);
  };
  return ViewportRule;
}();
var pluginViewportRule = {
  onCreateRule: function onCreateRule(key, style, options) {
    return key === '@viewport' || key === '@-ms-viewport' ? new ViewportRule(key, style, options) : null;
  }
};
var SimpleRule = /*#__PURE__*/
function () {
  function SimpleRule(key, value, options) {
    this.type = 'simple';
    this.key = void 0;
    this.value = void 0;
    this.options = void 0;
    this.isProcessed = false;
    this.renderable = void 0;
    this.key = key;
    this.value = value;
    this.options = options;
  }
  /**
   * Generates a CSS string.
   */
  // eslint-disable-next-line no-unused-vars

  var _proto = SimpleRule.prototype;
  _proto.toString = function toString(options) {
    if (Array.isArray(this.value)) {
      var str = '';
      for (var index = 0; index < this.value.length; index++) {
        str += this.key + " " + this.value[index] + ";";
        if (this.value[index + 1]) str += '\n';
      }
      return str;
    }
    return this.key + " " + this.value + ";";
  };
  return SimpleRule;
}();
var keysMap = {
  '@charset': true,
  '@import': true,
  '@namespace': true
};
var pluginSimpleRule = {
  onCreateRule: function onCreateRule(key, value, options) {
    return key in keysMap ? new SimpleRule(key, value, options) : null;
  }
};
var plugins = [pluginStyleRule, pluginConditionalRule, plugin, pluginKeyframeRule, pluginFontFaceRule, pluginViewportRule, pluginSimpleRule];
var defaultUpdateOptions = {
  process: true
};
var forceUpdateOptions = {
  force: true,
  process: true
  /**
   * Contains rules objects and allows adding/removing etc.
   * Is used for e.g. by `StyleSheet` or `ConditionalRule`.
   */
};

var RuleList = /*#__PURE__*/
function () {
  // Rules registry for access by .get() method.
  // It contains the same rule registered by name and by selector.
  // Original styles object.
  // Used to ensure correct rules order.
  function RuleList(options) {
    this.map = {};
    this.raw = {};
    this.index = [];
    this.counter = 0;
    this.options = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.options = options;
    this.classes = options.classes;
    this.keyframes = options.keyframes;
  }
  /**
   * Create and register rule.
   *
   * Will not render after Style Sheet was rendered the first time.
   */

  var _proto = RuleList.prototype;
  _proto.add = function add(name, decl, ruleOptions) {
    var _this$options = this.options,
      parent = _this$options.parent,
      sheet = _this$options.sheet,
      jss = _this$options.jss,
      Renderer = _this$options.Renderer,
      generateId = _this$options.generateId,
      scoped = _this$options.scoped;
    var options = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      classes: this.classes,
      parent: parent,
      sheet: sheet,
      jss: jss,
      Renderer: Renderer,
      generateId: generateId,
      scoped: scoped,
      name: name,
      keyframes: this.keyframes,
      selector: undefined
    }, ruleOptions); // When user uses .createStyleSheet(), duplicate names are not possible, but
    // `sheet.addRule()` opens the door for any duplicate rule name. When this happens
    // we need to make the key unique within this RuleList instance scope.

    var key = name;
    if (name in this.raw) {
      key = name + "-d" + this.counter++;
    } // We need to save the original decl before creating the rule
    // because cache plugin needs to use it as a key to return a cached rule.

    this.raw[key] = decl;
    if (key in this.classes) {
      // E.g. rules inside of @media container
      options.selector = "." + escape(this.classes[key]);
    }
    var rule = createRule(key, decl, options);
    if (!rule) return null;
    this.register(rule);
    var index = options.index === undefined ? this.index.length : options.index;
    this.index.splice(index, 0, rule);
    return rule;
  }
  /**
   * Get a rule.
   */;

  _proto.get = function get(name) {
    return this.map[name];
  }
  /**
   * Delete a rule.
   */;

  _proto.remove = function remove(rule) {
    this.unregister(rule);
    delete this.raw[rule.key];
    this.index.splice(this.index.indexOf(rule), 1);
  }
  /**
   * Get index of a rule.
   */;

  _proto.indexOf = function indexOf(rule) {
    return this.index.indexOf(rule);
  }
  /**
   * Run `onProcessRule()` plugins on every rule.
   */;

  _proto.process = function process() {
    var plugins = this.options.jss.plugins; // We need to clone array because if we modify the index somewhere else during a loop
    // we end up with very hard-to-track-down side effects.

    this.index.slice(0).forEach(plugins.onProcessRule, plugins);
  }
  /**
   * Register a rule in `.map`, `.classes` and `.keyframes` maps.
   */;

  _proto.register = function register(rule) {
    this.map[rule.key] = rule;
    if (rule instanceof StyleRule) {
      this.map[rule.selector] = rule;
      if (rule.id) this.classes[rule.key] = rule.id;
    } else if (rule instanceof KeyframesRule && this.keyframes) {
      this.keyframes[rule.name] = rule.id;
    }
  }
  /**
   * Unregister a rule.
   */;

  _proto.unregister = function unregister(rule) {
    delete this.map[rule.key];
    if (rule instanceof StyleRule) {
      delete this.map[rule.selector];
      delete this.classes[rule.key];
    } else if (rule instanceof KeyframesRule) {
      delete this.keyframes[rule.name];
    }
  }
  /**
   * Update the function values with a new data.
   */;

  _proto.update = function update() {
    var name;
    var data;
    var options;
    if (typeof (arguments.length <= 0 ? undefined : arguments[0]) === 'string') {
      name = arguments.length <= 0 ? undefined : arguments[0]; // $FlowFixMe

      data = arguments.length <= 1 ? undefined : arguments[1]; // $FlowFixMe

      options = arguments.length <= 2 ? undefined : arguments[2];
    } else {
      data = arguments.length <= 0 ? undefined : arguments[0]; // $FlowFixMe

      options = arguments.length <= 1 ? undefined : arguments[1];
      name = null;
    }
    if (name) {
      this.updateOne(this.map[name], data, options);
    } else {
      for (var index = 0; index < this.index.length; index++) {
        this.updateOne(this.index[index], data, options);
      }
    }
  }
  /**
   * Execute plugins, update rule props.
   */;

  _proto.updateOne = function updateOne(rule, data, options) {
    if (options === void 0) {
      options = defaultUpdateOptions;
    }
    var _this$options2 = this.options,
      plugins = _this$options2.jss.plugins,
      sheet = _this$options2.sheet; // It is a rules container like for e.g. ConditionalRule.

    if (rule.rules instanceof RuleList) {
      rule.rules.update(data, options);
      return;
    }
    var styleRule = rule;
    var style = styleRule.style;
    plugins.onUpdate(data, rule, sheet, options); // We rely on a new `style` ref in case it was mutated during onUpdate hook.

    if (options.process && style && style !== styleRule.style) {
      // We need to run the plugins in case new `style` relies on syntax plugins.
      plugins.onProcessStyle(styleRule.style, styleRule, sheet); // Update and add props.

      for (var prop in styleRule.style) {
        var nextValue = styleRule.style[prop];
        var prevValue = style[prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (nextValue !== prevValue) {
          styleRule.prop(prop, nextValue, forceUpdateOptions);
        }
      } // Remove props.

      for (var _prop in style) {
        var _nextValue = styleRule.style[_prop];
        var _prevValue = style[_prop]; // We need to use `force: true` because `rule.style` has been updated during onUpdate hook, so `rule.prop()` will not update the CSSOM rule.
        // We do this comparison to avoid unneeded `rule.prop()` calls, since we have the old `style` object here.

        if (_nextValue == null && _nextValue !== _prevValue) {
          styleRule.prop(_prop, null, forceUpdateOptions);
        }
      }
    }
  }
  /**
   * Convert rules to a CSS string.
   */;

  _proto.toString = function toString(options) {
    var str = '';
    var sheet = this.options.sheet;
    var link = sheet ? sheet.options.link : false;
    for (var index = 0; index < this.index.length; index++) {
      var rule = this.index[index];
      var css = rule.toString(options); // No need to render an empty rule.

      if (!css && !link) continue;
      if (str) str += '\n';
      str += css;
    }
    return str;
  };
  return RuleList;
}();
var StyleSheet = /*#__PURE__*/
function () {
  function StyleSheet(styles, options) {
    this.options = void 0;
    this.deployed = void 0;
    this.attached = void 0;
    this.rules = void 0;
    this.renderer = void 0;
    this.classes = void 0;
    this.keyframes = void 0;
    this.queue = void 0;
    this.attached = false;
    this.deployed = false;
    this.classes = {};
    this.keyframes = {};
    this.options = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      sheet: this,
      parent: this,
      classes: this.classes,
      keyframes: this.keyframes
    });
    if (options.Renderer) {
      this.renderer = new options.Renderer(this);
    }
    this.rules = new RuleList(this.options);
    for (var name in styles) {
      this.rules.add(name, styles[name]);
    }
    this.rules.process();
  }
  /**
   * Attach renderable to the render tree.
   */

  var _proto = StyleSheet.prototype;
  _proto.attach = function attach() {
    if (this.attached) return this;
    if (this.renderer) this.renderer.attach();
    this.attached = true; // Order is important, because we can't use insertRule API if style element is not attached.

    if (!this.deployed) this.deploy();
    return this;
  }
  /**
   * Remove renderable from render tree.
   */;

  _proto.detach = function detach() {
    if (!this.attached) return this;
    if (this.renderer) this.renderer.detach();
    this.attached = false;
    return this;
  }
  /**
   * Add a rule to the current stylesheet.
   * Will insert a rule also after the stylesheet has been rendered first time.
   */;

  _proto.addRule = function addRule(name, decl, options) {
    var queue = this.queue; // Plugins can create rules.
    // In order to preserve the right order, we need to queue all `.addRule` calls,
    // which happen after the first `rules.add()` call.

    if (this.attached && !queue) this.queue = [];
    var rule = this.rules.add(name, decl, options);
    if (!rule) return null;
    this.options.jss.plugins.onProcessRule(rule);
    if (this.attached) {
      if (!this.deployed) return rule; // Don't insert rule directly if there is no stringified version yet.
      // It will be inserted all together when .attach is called.

      if (queue) queue.push(rule);else {
        this.insertRule(rule);
        if (this.queue) {
          this.queue.forEach(this.insertRule, this);
          this.queue = undefined;
        }
      }
      return rule;
    } // We can't add rules to a detached style node.
    // We will redeploy the sheet once user will attach it.

    this.deployed = false;
    return rule;
  }
  /**
   * Insert rule into the StyleSheet
   */;

  _proto.insertRule = function insertRule(rule) {
    if (this.renderer) {
      this.renderer.insertRule(rule);
    }
  }
  /**
   * Create and add rules.
   * Will render also after Style Sheet was rendered the first time.
   */;

  _proto.addRules = function addRules(styles, options) {
    var added = [];
    for (var name in styles) {
      var rule = this.addRule(name, styles[name], options);
      if (rule) added.push(rule);
    }
    return added;
  }
  /**
   * Get a rule by name.
   */;

  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Delete a rule by name.
   * Returns `true`: if rule has been deleted from the DOM.
   */;

  _proto.deleteRule = function deleteRule(name) {
    var rule = typeof name === 'object' ? name : this.rules.get(name);
    if (!rule) return false;
    this.rules.remove(rule);
    if (this.attached && rule.renderable && this.renderer) {
      return this.renderer.deleteRule(rule.renderable);
    }
    return true;
  }
  /**
   * Get index of a rule.
   */;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Deploy pure CSS string to a renderable.
   */;

  _proto.deploy = function deploy() {
    if (this.renderer) this.renderer.deploy();
    this.deployed = true;
    return this;
  }
  /**
   * Update the function values with a new data.
   */;

  _proto.update = function update() {
    var _this$rules;
    (_this$rules = this.rules).update.apply(_this$rules, arguments);
    return this;
  }
  /**
   * Updates a single rule.
   */;

  _proto.updateOne = function updateOne(rule, data, options) {
    this.rules.updateOne(rule, data, options);
    return this;
  }
  /**
   * Convert rules to a CSS string.
   */;

  _proto.toString = function toString(options) {
    return this.rules.toString(options);
  };
  return StyleSheet;
}();
var PluginsRegistry = /*#__PURE__*/
function () {
  function PluginsRegistry() {
    this.plugins = {
      internal: [],
      external: []
    };
    this.registry = void 0;
  }
  var _proto = PluginsRegistry.prototype;

  /**
   * Call `onCreateRule` hooks and return an object if returned by a hook.
   */
  _proto.onCreateRule = function onCreateRule(name, decl, options) {
    for (var i = 0; i < this.registry.onCreateRule.length; i++) {
      var rule = this.registry.onCreateRule[i](name, decl, options);
      if (rule) return rule;
    }
    return null;
  }
  /**
   * Call `onProcessRule` hooks.
   */;

  _proto.onProcessRule = function onProcessRule(rule) {
    if (rule.isProcessed) return;
    var sheet = rule.options.sheet;
    for (var i = 0; i < this.registry.onProcessRule.length; i++) {
      this.registry.onProcessRule[i](rule, sheet);
    }
    if (rule.style) this.onProcessStyle(rule.style, rule, sheet);
    rule.isProcessed = true;
  }
  /**
   * Call `onProcessStyle` hooks.
   */;

  _proto.onProcessStyle = function onProcessStyle(style, rule, sheet) {
    for (var i = 0; i < this.registry.onProcessStyle.length; i++) {
      // $FlowFixMe
      rule.style = this.registry.onProcessStyle[i](rule.style, rule, sheet);
    }
  }
  /**
   * Call `onProcessSheet` hooks.
   */;

  _proto.onProcessSheet = function onProcessSheet(sheet) {
    for (var i = 0; i < this.registry.onProcessSheet.length; i++) {
      this.registry.onProcessSheet[i](sheet);
    }
  }
  /**
   * Call `onUpdate` hooks.
   */;

  _proto.onUpdate = function onUpdate(data, rule, sheet, options) {
    for (var i = 0; i < this.registry.onUpdate.length; i++) {
      this.registry.onUpdate[i](data, rule, sheet, options);
    }
  }
  /**
   * Call `onChangeValue` hooks.
   */;

  _proto.onChangeValue = function onChangeValue(value, prop, rule) {
    var processedValue = value;
    for (var i = 0; i < this.registry.onChangeValue.length; i++) {
      processedValue = this.registry.onChangeValue[i](processedValue, prop, rule);
    }
    return processedValue;
  }
  /**
   * Register a plugin.
   */;

  _proto.use = function use(newPlugin, options) {
    if (options === void 0) {
      options = {
        queue: 'external'
      };
    }
    var plugins = this.plugins[options.queue]; // Avoids applying same plugin twice, at least based on ref.

    if (plugins.indexOf(newPlugin) !== -1) {
      return;
    }
    plugins.push(newPlugin);
    this.registry = [].concat(this.plugins.external, this.plugins.internal).reduce(function (registry, plugin) {
      for (var name in plugin) {
        if (name in registry) {
          registry[name].push(plugin[name]);
        } else {
           false ? undefined : void 0;
        }
      }
      return registry;
    }, {
      onCreateRule: [],
      onProcessRule: [],
      onProcessStyle: [],
      onProcessSheet: [],
      onChangeValue: [],
      onUpdate: []
    });
  };
  return PluginsRegistry;
}();

/**
 * Sheets registry to access them all at one place.
 */
var SheetsRegistry = /*#__PURE__*/
function () {
  function SheetsRegistry() {
    this.registry = [];
  }
  var _proto = SheetsRegistry.prototype;

  /**
   * Register a Style Sheet.
   */
  _proto.add = function add(sheet) {
    var registry = this.registry;
    var index = sheet.options.index;
    if (registry.indexOf(sheet) !== -1) return;
    if (registry.length === 0 || index >= this.index) {
      registry.push(sheet);
      return;
    } // Find a position.

    for (var i = 0; i < registry.length; i++) {
      if (registry[i].options.index > index) {
        registry.splice(i, 0, sheet);
        return;
      }
    }
  }
  /**
   * Reset the registry.
   */;

  _proto.reset = function reset() {
    this.registry = [];
  }
  /**
   * Remove a Style Sheet.
   */;

  _proto.remove = function remove(sheet) {
    var index = this.registry.indexOf(sheet);
    this.registry.splice(index, 1);
  }
  /**
   * Convert all attached sheets to a CSS string.
   */;

  _proto.toString = function toString(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
      attached = _ref.attached,
      options = Object(_babel_runtime_helpers_esm_objectWithoutPropertiesLoose__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])(_ref, ["attached"]);
    var css = '';
    for (var i = 0; i < this.registry.length; i++) {
      var sheet = this.registry[i];
      if (attached != null && sheet.attached !== attached) {
        continue;
      }
      if (css) css += '\n';
      css += sheet.toString(options);
    }
    return css;
  };
  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SheetsRegistry, [{
    key: "index",
    /**
     * Current highest index number.
     */
    get: function get() {
      return this.registry.length === 0 ? 0 : this.registry[this.registry.length - 1].options.index;
    }
  }]);
  return SheetsRegistry;
}();

/**
 * This is a global sheets registry. Only DomRenderer will add sheets to it.
 * On the server one should use an own SheetsRegistry instance and add the
 * sheets to it, because you need to make sure to create a new registry for
 * each request in order to not leak sheets across requests.
 */

var sheets = new SheetsRegistry();

/* eslint-disable */
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var globalThis = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
var ns = '2f1acc6c3a606b082e5eef5e54414ffb';
if (globalThis[ns] == null) globalThis[ns] = 0; // Bundle may contain multiple JSS versions at the same time. In order to identify
// the current version with just one short number and use it for classes generation
// we use a counter. Also it is more accurate, because user can manually reevaluate
// the module.

var moduleId = globalThis[ns]++;
var maxRules = 1e10;

/**
 * Returns a function which generates unique class names based on counters.
 * When new generator function is created, rule counter is reseted.
 * We need to reset the rule counter for SSR for each request.
 */
var createGenerateId = function createGenerateId(options) {
  if (options === void 0) {
    options = {};
  }
  var ruleCounter = 0;
  return function (rule, sheet) {
    ruleCounter += 1;
    if (ruleCounter > maxRules) {
       false ? undefined : void 0;
    }
    var jssId = '';
    var prefix = '';
    if (sheet) {
      if (sheet.options.classNamePrefix) {
        prefix = sheet.options.classNamePrefix;
      }
      if (sheet.options.jss.id != null) {
        jssId = String(sheet.options.jss.id);
      }
    }
    if (options.minify) {
      // Using "c" because a number can't be the first char in a class name.
      return "" + (prefix || 'c') + moduleId + jssId + ruleCounter;
    }
    return prefix + rule.key + "-" + moduleId + (jssId ? "-" + jssId : '') + "-" + ruleCounter;
  };
};

/**
 * Cache the value from the first time a function is called.
 */
var memoize = function memoize(fn) {
  var value;
  return function () {
    if (!value) value = fn();
    return value;
  };
};
/**
 * Get a style property value.
 */

function getPropertyValue(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      return cssRule.attributeStyleMap.get(prop);
    }
    return cssRule.style.getPropertyValue(prop);
  } catch (err) {
    // IE may throw if property is unknown.
    return '';
  }
}
/**
 * Set a style property.
 */

function setProperty(cssRule, prop, value) {
  try {
    var cssValue = value;
    if (Array.isArray(value)) {
      cssValue = toCssValue(value, true);
      if (value[value.length - 1] === '!important') {
        cssRule.style.setProperty(prop, cssValue, 'important');
        return true;
      }
    } // Support CSSTOM.

    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.set(prop, cssValue);
    } else {
      cssRule.style.setProperty(prop, cssValue);
    }
  } catch (err) {
    // IE may throw if property is unknown.
    return false;
  }
  return true;
}
/**
 * Remove a style property.
 */

function removeProperty(cssRule, prop) {
  try {
    // Support CSSTOM.
    if (cssRule.attributeStyleMap) {
      cssRule.attributeStyleMap.delete(prop);
    } else {
      cssRule.style.removeProperty(prop);
    }
  } catch (err) {
     false ? undefined : void 0;
  }
}
/**
 * Set the selector.
 */

function setSelector(cssRule, selectorText) {
  cssRule.selectorText = selectorText; // Return false if setter was not successful.
  // Currently works in chrome only.

  return cssRule.selectorText === selectorText;
}
/**
 * Gets the `head` element upon the first call and caches it.
 * We assume it can't be null.
 */

var getHead = memoize(function () {
  return document.querySelector('head');
});
/**
 * Find attached sheet with an index higher than the passed one.
 */

function findHigherSheet(registry, options) {
  for (var i = 0; i < registry.length; i++) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.index > options.index && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
/**
 * Find attached sheet with the highest index.
 */

function findHighestSheet(registry, options) {
  for (var i = registry.length - 1; i >= 0; i--) {
    var sheet = registry[i];
    if (sheet.attached && sheet.options.insertionPoint === options.insertionPoint) {
      return sheet;
    }
  }
  return null;
}
/**
 * Find a comment with "jss" inside.
 */

function findCommentNode(text) {
  var head = getHead();
  for (var i = 0; i < head.childNodes.length; i++) {
    var node = head.childNodes[i];
    if (node.nodeType === 8 && node.nodeValue.trim() === text) {
      return node;
    }
  }
  return null;
}

/**
 * Find a node before which we can insert the sheet.
 */
function findPrevNode(options) {
  var registry = sheets.registry;
  if (registry.length > 0) {
    // Try to insert before the next higher sheet.
    var sheet = findHigherSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element
      };
    } // Otherwise insert after the last attached.

    sheet = findHighestSheet(registry, options);
    if (sheet && sheet.renderer) {
      return {
        parent: sheet.renderer.element.parentNode,
        node: sheet.renderer.element.nextSibling
      };
    }
  } // Try to find a comment placeholder if registry is empty.

  var insertionPoint = options.insertionPoint;
  if (insertionPoint && typeof insertionPoint === 'string') {
    var comment = findCommentNode(insertionPoint);
    if (comment) {
      return {
        parent: comment.parentNode,
        node: comment.nextSibling
      };
    } // If user specifies an insertion point and it can't be found in the document -
    // bad specificity issues may appear.

     false ? undefined : void 0;
  }
  return false;
}
/**
 * Insert style element into the DOM.
 */

function insertStyle(style, options) {
  var insertionPoint = options.insertionPoint;
  var nextNode = findPrevNode(options);
  if (nextNode !== false && nextNode.parent) {
    nextNode.parent.insertBefore(style, nextNode.node);
    return;
  } // Works with iframes and any node types.

  if (insertionPoint && typeof insertionPoint.nodeType === 'number') {
    // https://stackoverflow.com/questions/41328728/force-casting-in-flow
    var insertionPointElement = insertionPoint;
    var parentNode = insertionPointElement.parentNode;
    if (parentNode) parentNode.insertBefore(style, insertionPointElement.nextSibling);else  false ? undefined : void 0;
    return;
  }
  getHead().appendChild(style);
}
/**
 * Read jss nonce setting from the page if the user has set it.
 */

var getNonce = memoize(function () {
  var node = document.querySelector('meta[property="csp-nonce"]');
  return node ? node.getAttribute('content') : null;
});
var _insertRule = function insertRule(container, rule, index) {
  var maxIndex = container.cssRules.length; // In case previous insertion fails, passed index might be wrong

  if (index === undefined || index > maxIndex) {
    // eslint-disable-next-line no-param-reassign
    index = maxIndex;
  }
  try {
    if ('insertRule' in container) {
      var c = container;
      c.insertRule(rule, index);
    } // Keyframes rule.
    else if ('appendRule' in container) {
      var _c = container;
      _c.appendRule(rule);
    }
  } catch (err) {
     false ? undefined : void 0;
    return false;
  }
  return container.cssRules[index];
};
var createStyle = function createStyle() {
  var el = document.createElement('style'); // Without it, IE will have a broken source order specificity if we
  // insert rules after we insert the style tag.
  // It seems to kick-off the source order specificity algorithm.

  el.textContent = '\n';
  return el;
};
var DomRenderer = /*#__PURE__*/
function () {
  // HTMLStyleElement needs fixing https://github.com/facebook/flow/issues/2696
  function DomRenderer(sheet) {
    this.getPropertyValue = getPropertyValue;
    this.setProperty = setProperty;
    this.removeProperty = removeProperty;
    this.setSelector = setSelector;
    this.element = void 0;
    this.sheet = void 0;
    this.hasInsertedRules = false;
    // There is no sheet when the renderer is used from a standalone StyleRule.
    if (sheet) sheets.add(sheet);
    this.sheet = sheet;
    var _ref = this.sheet ? this.sheet.options : {},
      media = _ref.media,
      meta = _ref.meta,
      element = _ref.element;
    this.element = element || createStyle();
    this.element.setAttribute('data-jss', '');
    if (media) this.element.setAttribute('media', media);
    if (meta) this.element.setAttribute('data-meta', meta);
    var nonce = getNonce();
    if (nonce) this.element.setAttribute('nonce', nonce);
  }
  /**
   * Insert style element into render tree.
   */

  var _proto = DomRenderer.prototype;
  _proto.attach = function attach() {
    // In the case the element node is external and it is already in the DOM.
    if (this.element.parentNode || !this.sheet) return;
    insertStyle(this.element, this.sheet.options); // When rules are inserted using `insertRule` API, after `sheet.detach().attach()`
    // most browsers create a new CSSStyleSheet, except of all IEs.

    var deployed = Boolean(this.sheet && this.sheet.deployed);
    if (this.hasInsertedRules && deployed) {
      this.hasInsertedRules = false;
      this.deploy();
    }
  }
  /**
   * Remove style element from render tree.
   */;

  _proto.detach = function detach() {
    var parentNode = this.element.parentNode;
    if (parentNode) parentNode.removeChild(this.element);
  }
  /**
   * Inject CSS string into element.
   */;

  _proto.deploy = function deploy() {
    var sheet = this.sheet;
    if (!sheet) return;
    if (sheet.options.link) {
      this.insertRules(sheet.rules);
      return;
    }
    this.element.textContent = "\n" + sheet.toString() + "\n";
  }
  /**
   * Insert RuleList into an element.
   */;

  _proto.insertRules = function insertRules(rules, nativeParent) {
    for (var i = 0; i < rules.index.length; i++) {
      this.insertRule(rules.index[i], i, nativeParent);
    }
  }
  /**
   * Insert a rule into element.
   */;

  _proto.insertRule = function insertRule(rule, index, nativeParent) {
    if (nativeParent === void 0) {
      nativeParent = this.element.sheet;
    }
    if (rule.rules) {
      var parent = rule;
      var latestNativeParent = nativeParent;
      if (rule.type === 'conditional' || rule.type === 'keyframes') {
        // We need to render the container without children first.
        latestNativeParent = _insertRule(nativeParent, parent.toString({
          children: false
        }), index);
        if (latestNativeParent === false) {
          return false;
        }
      }
      this.insertRules(parent.rules, latestNativeParent);
      return latestNativeParent;
    } // IE keeps the CSSStyleSheet after style node has been reattached,
    // so we need to check if the `renderable` reference the right style sheet and not
    // rerender those rules.

    if (rule.renderable && rule.renderable.parentStyleSheet === this.element.sheet) {
      return rule.renderable;
    }
    var ruleStr = rule.toString();
    if (!ruleStr) return false;
    var nativeRule = _insertRule(nativeParent, ruleStr, index);
    if (nativeRule === false) {
      return false;
    }
    this.hasInsertedRules = true;
    rule.renderable = nativeRule;
    return nativeRule;
  }
  /**
   * Delete a rule.
   */;

  _proto.deleteRule = function deleteRule(cssRule) {
    var sheet = this.element.sheet;
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    sheet.deleteRule(index);
    return true;
  }
  /**
   * Get index of a CSS Rule.
   */;

  _proto.indexOf = function indexOf(cssRule) {
    var cssRules = this.element.sheet.cssRules;
    for (var index = 0; index < cssRules.length; index++) {
      if (cssRule === cssRules[index]) return index;
    }
    return -1;
  }
  /**
   * Generate a new CSS rule and replace the existing one.
   *
   * Only used for some old browsers because they can't set a selector.
   */;

  _proto.replaceRule = function replaceRule(cssRule, rule) {
    var index = this.indexOf(cssRule);
    if (index === -1) return false;
    this.element.sheet.deleteRule(index);
    return this.insertRule(rule, index);
  }
  /**
   * Get all rules elements.
   */;

  _proto.getRules = function getRules() {
    return this.element.sheet.cssRules;
  };
  return DomRenderer;
}();
var instanceCounter = 0;
var Jss = /*#__PURE__*/
function () {
  function Jss(options) {
    this.id = instanceCounter++;
    this.version = "10.4.0";
    this.plugins = new PluginsRegistry();
    this.options = {
      id: {
        minify: false
      },
      createGenerateId: createGenerateId,
      Renderer: is_in_browser__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"] ? DomRenderer : null,
      plugins: []
    };
    this.generateId = createGenerateId({
      minify: false
    });
    for (var i = 0; i < plugins.length; i++) {
      this.plugins.use(plugins[i], {
        queue: 'internal'
      });
    }
    this.setup(options);
  }
  /**
   * Prepares various options, applies plugins.
   * Should not be used twice on the same instance, because there is no plugins
   * deduplication logic.
   */

  var _proto = Jss.prototype;
  _proto.setup = function setup(options) {
    if (options === void 0) {
      options = {};
    }
    if (options.createGenerateId) {
      this.options.createGenerateId = options.createGenerateId;
    }
    if (options.id) {
      this.options.id = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, this.options.id, options.id);
    }
    if (options.createGenerateId || options.id) {
      this.generateId = this.options.createGenerateId(this.options.id);
    }
    if (options.insertionPoint != null) this.options.insertionPoint = options.insertionPoint;
    if ('Renderer' in options) {
      this.options.Renderer = options.Renderer;
    } // eslint-disable-next-line prefer-spread

    if (options.plugins) this.use.apply(this, options.plugins);
    return this;
  }
  /**
   * Create a Style Sheet.
   */;

  _proto.createStyleSheet = function createStyleSheet(styles, options) {
    if (options === void 0) {
      options = {};
    }
    var _options = options,
      index = _options.index;
    if (typeof index !== 'number') {
      index = sheets.index === 0 ? 0 : sheets.index + 1;
    }
    var sheet = new StyleSheet(styles, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      jss: this,
      generateId: options.generateId || this.generateId,
      insertionPoint: this.options.insertionPoint,
      Renderer: this.options.Renderer,
      index: index
    }));
    this.plugins.onProcessSheet(sheet);
    return sheet;
  }
  /**
   * Detach the Style Sheet and remove it from the registry.
   */;

  _proto.removeStyleSheet = function removeStyleSheet(sheet) {
    sheet.detach();
    sheets.remove(sheet);
    return this;
  }
  /**
   * Create a rule without a Style Sheet.
   * [Deprecated] will be removed in the next major version.
   */;

  _proto.createRule = function createRule$1(name, style, options) {
    if (style === void 0) {
      style = {};
    }
    if (options === void 0) {
      options = {};
    }

    // Enable rule without name for inline styles.
    if (typeof name === 'object') {
      // $FlowIgnore
      return this.createRule(undefined, name, style);
    } // $FlowIgnore

    var ruleOptions = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, options, {
      name: name,
      jss: this,
      Renderer: this.options.Renderer
    });
    if (!ruleOptions.generateId) ruleOptions.generateId = this.generateId;
    if (!ruleOptions.classes) ruleOptions.classes = {};
    if (!ruleOptions.keyframes) ruleOptions.keyframes = {};
    var rule = createRule(name, style, ruleOptions);
    if (rule) this.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Register plugin. Passed function will be invoked with a rule instance.
   */;

  _proto.use = function use() {
    var _this = this;
    for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }
    plugins.forEach(function (plugin) {
      _this.plugins.use(plugin);
    });
    return this;
  };
  return Jss;
}();

/**
 * Extracts a styles object with only props that contain function values.
 */
function getDynamicStyles(styles) {
  var to = null;
  for (var key in styles) {
    var value = styles[key];
    var type = typeof value;
    if (type === 'function') {
      if (!to) to = {};
      to[key] = value;
    } else if (type === 'object' && value !== null && !Array.isArray(value)) {
      var extracted = getDynamicStyles(value);
      if (extracted) {
        if (!to) to = {};
        to[key] = extracted;
      }
    }
  }
  return to;
}

/**
 * SheetsManager is like a WeakMap which is designed to count StyleSheet
 * instances and attach/detach automatically.
 */
var SheetsManager = /*#__PURE__*/
function () {
  function SheetsManager() {
    this.length = 0;
    this.sheets = new WeakMap();
  }
  var _proto = SheetsManager.prototype;
  _proto.get = function get(key) {
    var entry = this.sheets.get(key);
    return entry && entry.sheet;
  };
  _proto.add = function add(key, sheet) {
    if (this.sheets.has(key)) return;
    this.length++;
    this.sheets.set(key, {
      sheet: sheet,
      refs: 0
    });
  };
  _proto.manage = function manage(key) {
    var entry = this.sheets.get(key);
    if (entry) {
      if (entry.refs === 0) {
        entry.sheet.attach();
      }
      entry.refs++;
      return entry.sheet;
    }
    Object(tiny_warning__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(false, "[JSS] SheetsManager: can't find sheet to manage");
    return undefined;
  };
  _proto.unmanage = function unmanage(key) {
    var entry = this.sheets.get(key);
    if (entry) {
      if (entry.refs > 0) {
        entry.refs--;
        if (entry.refs === 0) entry.sheet.detach();
      }
    } else {
      Object(tiny_warning__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(false, "SheetsManager: can't find sheet to unmanage");
    }
  };
  Object(_babel_runtime_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(SheetsManager, [{
    key: "size",
    get: function get() {
      return this.length;
    }
  }]);
  return SheetsManager;
}();

/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Isonen (Slobodskoi) / Isonen 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */

/**
 * Export a constant indicating if this browser has CSSTOM support.
 * https://developers.google.com/web/updates/2018/03/cssom
 */
var hasCSSTOMSupport = typeof CSS !== 'undefined' && CSS && 'number' in CSS;
/**
 * Creates a new instance of Jss.
 */

var create = function create(options) {
  return new Jss(options);
};
/**
 * A global Jss instance.
 */

var index = create();
/* unused harmony default export */ var _unused_webpack_default_export = (index);


/***/ }),

/***/ "/hTd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.SessionStorage = void 0;
var STATE_KEY_PREFIX = "@@scroll|";
var GATSBY_ROUTER_SCROLL_STATE = "___GATSBY_REACT_ROUTER_SCROLL";

var SessionStorage = /*#__PURE__*/function () {
  function SessionStorage() {}

  var _proto = SessionStorage.prototype;

  _proto.read = function read(location, key) {
    var stateKey = this.getStateKey(location, key);

    try {
      var value = window.sessionStorage.getItem(stateKey);
      return value ? JSON.parse(value) : 0;
    } catch (e) {
      if (false) {}

      if (window && window[GATSBY_ROUTER_SCROLL_STATE] && window[GATSBY_ROUTER_SCROLL_STATE][stateKey]) {
        return window[GATSBY_ROUTER_SCROLL_STATE][stateKey];
      }

      return 0;
    }
  };

  _proto.save = function save(location, key, value) {
    var stateKey = this.getStateKey(location, key);
    var storedValue = JSON.stringify(value);

    try {
      window.sessionStorage.setItem(stateKey, storedValue);
    } catch (e) {
      if (window && window[GATSBY_ROUTER_SCROLL_STATE]) {
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      } else {
        window[GATSBY_ROUTER_SCROLL_STATE] = {};
        window[GATSBY_ROUTER_SCROLL_STATE][stateKey] = JSON.parse(storedValue);
      }

      if (false) {}
    }
  };

  _proto.getStateKey = function getStateKey(location, key) {
    var stateKeyBase = "" + STATE_KEY_PREFIX + location.pathname;
    return key === null || typeof key === "undefined" ? stateKeyBase : stateKeyBase + "|" + key;
  };

  return SessionStorage;
}();

exports.SessionStorage = SessionStorage;

/***/ }),

/***/ "04ZO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "createGenerateClassName", function() { return /* reexport */ createGenerateClassName["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "createStyles", function() { return /* reexport */ createStyles["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "getThemeProps", function() { return /* reexport */ getThemeProps["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "jssPreset", function() { return /* reexport */ jssPreset["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "makeStyles", function() { return /* reexport */ makeStyles["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "mergeClasses", function() { return /* reexport */ mergeClasses["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "ServerStyleSheets", function() { return /* reexport */ ServerStyleSheets_ServerStyleSheets; });
__webpack_require__.d(__webpack_exports__, "styled", function() { return /* reexport */ styled["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "StylesProvider", function() { return /* reexport */ StylesProvider["b" /* default */]; });
__webpack_require__.d(__webpack_exports__, "sheetsManager", function() { return /* reexport */ esm_StylesProvider["b" /* sheetsManager */]; });
__webpack_require__.d(__webpack_exports__, "StylesContext", function() { return /* reexport */ esm_StylesProvider["a" /* StylesContext */]; });
__webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return /* reexport */ ThemeProvider["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "useTheme", function() { return /* reexport */ useTheme["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "withStyles", function() { return /* reexport */ withStyles["a" /* default */]; });
__webpack_require__.d(__webpack_exports__, "withTheme", function() { return /* reexport */ esm_withTheme_withTheme; });
__webpack_require__.d(__webpack_exports__, "withThemeCreator", function() { return /* reexport */ withThemeCreator; });

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/createGenerateClassName/createGenerateClassName.js
var createGenerateClassName = __webpack_require__("PRV4");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/createStyles/createStyles.js
var createStyles = __webpack_require__("ED4I");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/getThemeProps/getThemeProps.js
var getThemeProps = __webpack_require__("A+CX");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js + 9 modules
var jssPreset = __webpack_require__("w0j3");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js + 4 modules
var makeStyles = __webpack_require__("RD7I");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/mergeClasses/mergeClasses.js
var mergeClasses = __webpack_require__("XNZ3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("wx14");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("1OyB");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("vuIU");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/jss/dist/jss.esm.js
var jss_esm = __webpack_require__("/ceM");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js
var StylesProvider = __webpack_require__("o8Rm");

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/ServerStyleSheets/ServerStyleSheets.js







var ServerStyleSheets_ServerStyleSheets = /*#__PURE__*/function () {
  function ServerStyleSheets() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    Object(classCallCheck["a" /* default */])(this, ServerStyleSheets);
    this.options = options;
  }
  Object(createClass["a" /* default */])(ServerStyleSheets, [{
    key: "collect",
    value: function collect(children) {
      // This is needed in order to deduplicate the injection of CSS in the page.
      var sheetsManager = new Map(); // This is needed in order to inject the critical CSS.

      this.sheetsRegistry = new jss_esm["b" /* SheetsRegistry */](); // A new class name generator

      var generateClassName = Object(createGenerateClassName["a" /* default */])();
      return /*#__PURE__*/react_default.a.createElement(StylesProvider["b" /* default */], Object(esm_extends["a" /* default */])({
        sheetsManager: sheetsManager,
        serverGenerateClassName: generateClassName,
        sheetsRegistry: this.sheetsRegistry
      }, this.options), children);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.sheetsRegistry ? this.sheetsRegistry.toString() : '';
    }
  }, {
    key: "getStyleElement",
    value: function getStyleElement(props) {
      return react_default.a.createElement('style', Object(esm_extends["a" /* default */])({
        id: 'jss-server-side',
        key: 'jss-server-side',
        dangerouslySetInnerHTML: {
          __html: this.toString()
        }
      }, props));
    }
  }]);
  return ServerStyleSheets;
}();

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/styled/styled.js
var styled = __webpack_require__("/P46");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/StylesProvider/index.js
var esm_StylesProvider = __webpack_require__("e3iB");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js
var ThemeProvider = __webpack_require__("bWLx");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/useTheme/useTheme.js
var useTheme = __webpack_require__("aXM8");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/withStyles/withStyles.js
var withStyles = __webpack_require__("ucgz");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("Ff2n");

// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__("2mql");
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/withTheme/withTheme.js






function withThemeCreator() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultTheme = options.defaultTheme;
  var withTheme = function withTheme(Component) {
    if (false) {}
    var WithTheme = react_default.a.forwardRef(function WithTheme(props, ref) {
      var innerRef = props.innerRef,
        other = Object(objectWithoutProperties["a" /* default */])(props, ["innerRef"]);
      var theme = Object(useTheme["a" /* default */])() || defaultTheme;
      return /*#__PURE__*/react_default.a.createElement(Component, Object(esm_extends["a" /* default */])({
        theme: theme,
        ref: innerRef || ref
      }, other));
    });
     false ? undefined : void 0;
    if (false) {}
    hoist_non_react_statics_cjs_default()(WithTheme, Component);
    if (false) {}
    return WithTheme;
  };
  return withTheme;
} // Provide the theme object as a prop to the input component.
// It's an alternative API to useTheme().
// We encourage the usage of useTheme() where possible.

var withTheme_withTheme = withThemeCreator();
/* harmony default export */ var esm_withTheme_withTheme = (withTheme_withTheme);
// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/withTheme/index.js


// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/index.js
/** @license Material-UI v4.10.0
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/* eslint-disable import/export */

/* Warning if there are several instances of @material-ui/styles */

if (false) {}



























/***/ }),

/***/ "1OyB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "2+6g":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isPlainObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepmerge; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("U8pU");


function isPlainObject(item) {
  return item && Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(item) === 'object' && item.constructor === Object;
}
function deepmerge(target, source) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    clone: true
  };
  var output = options.clone ? Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach(function (key) {
      // Avoid prototype pollution
      if (key === '__proto__') {
        return;
      }
      if (isPlainObject(source[key]) && key in target) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}

/***/ }),

/***/ "25BE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _iterableToArray; });
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

/***/ }),

/***/ "284h":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5")["default"];
function _getRequireWildcardCache(e) {
  if ("function" != typeof WeakMap) return null;
  var r = new WeakMap(),
    t = new WeakMap();
  return (_getRequireWildcardCache = function _getRequireWildcardCache(e) {
    return e ? t : r;
  })(e);
}
function _interopRequireWildcard(e, r) {
  if (!r && e && e.__esModule) return e;
  if (null === e || "object" != _typeof(e) && "function" != typeof e) return {
    "default": e
  };
  var t = _getRequireWildcardCache(r);
  if (t && t.has(e)) return t.get(e);
  var n = {
      __proto__: null
    },
    a = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) {
    var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
    i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
  }
  return n["default"] = e, t && t.set(e, n), n;
}
module.exports = _interopRequireWildcard, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "29q8":
/***/ (function(module, exports, __webpack_require__) {

(function (f) {
  if (true) {
    module.exports = f();
  } else { var g; }
})(function () {
  var define, module, exports;
  var _$src_1 = {};
  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  _$src_1 = /*#__PURE__*/
  function () {
    function BugsnagPluginReact() {
      // Fetch React from the window object, if it exists
      var globalReact = typeof window !== 'undefined' && window.React;
      this.name = 'react';
      this.lazy = arguments.length === 0 && !globalReact;
      if (!this.lazy) {
        this.React = (arguments.length <= 0 ? undefined : arguments[0]) || globalReact;
        if (!this.React) throw new Error('@bugsnag/plugin-react reference to `React` was undefined');
      }
    }
    var _proto = BugsnagPluginReact.prototype;
    _proto.load = function load(client) {
      if (!this.lazy) {
        var ErrorBoundary = createClass(this.React, client);
        ErrorBoundary.createErrorBoundary = function () {
          return ErrorBoundary;
        };
        return ErrorBoundary;
      }
      var BugsnagPluginReactLazyInitializer = function () {
        throw new Error("@bugsnag/plugin-react was used incorrectly. Valid usage is as follows:\nPass React to the plugin constructor\n\n  `Bugsnag.start({ plugins: [new BugsnagPluginReact(React)] })`\nand then call `const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary()`\n\nOr if React is not available until after Bugsnag has started,\nconstruct the plugin with no arguments\n  `Bugsnag.start({ plugins: [new BugsnagPluginReact()] })`,\nthen pass in React when available to construct your error boundary\n  `const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)`");
      };
      BugsnagPluginReactLazyInitializer.createErrorBoundary = function (React) {
        if (!React) throw new Error('@bugsnag/plugin-react reference to `React` was undefined');
        return createClass(React, client);
      };
      return BugsnagPluginReactLazyInitializer;
    };
    return BugsnagPluginReact;
  }();
  var formatComponentStack = function (str) {
    var lines = str.split(/\s*\n\s*/g);
    var ret = '';
    for (var line = 0, len = lines.length; line < len; line++) {
      if (lines[line].length) ret += "" + (ret.length ? '\n' : '') + lines[line];
    }
    return ret;
  };
  var createClass = function (React, client) {
    return /*#__PURE__*/(
      function (_React$Component) {
        _inheritsLoose(ErrorBoundary, _React$Component);
        function ErrorBoundary(props) {
          var _this;
          _this = _React$Component.call(this, props) || this;
          _this.state = {
            error: null,
            info: null
          };
          _this.handleClearError = _this.handleClearError.bind(_assertThisInitialized(_this));
          return _this;
        }
        var _proto2 = ErrorBoundary.prototype;
        _proto2.handleClearError = function handleClearError() {
          this.setState({
            error: null,
            info: null
          });
        };
        _proto2.componentDidCatch = function componentDidCatch(error, info) {
          var onError = this.props.onError;
          var handledState = {
            severity: 'error',
            unhandled: true,
            severityReason: {
              type: 'unhandledException'
            }
          };
          var event = client.Event.create(error, true, handledState, 1);
          if (info && info.componentStack) info.componentStack = formatComponentStack(info.componentStack);
          event.addMetadata('react', info);
          client._notify(event, onError);
          this.setState({
            error: error,
            info: info
          });
        };
        _proto2.render = function render() {
          var error = this.state.error;
          if (error) {
            var FallbackComponent = this.props.FallbackComponent;
            if (FallbackComponent) return React.createElement(FallbackComponent, _extends({}, this.state, {
              clearError: this.handleClearError
            }));
            return null;
          }
          return this.props.children;
        };
        return ErrorBoundary;
      }(React.Component)
    );
  };
  _$src_1.formatComponentStack = formatComponentStack;
  _$src_1["default"] = _$src_1;
  return _$src_1;
});

/***/ }),

/***/ "2mql":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var reactIs = __webpack_require__("TOwV");

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above

  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }
  return targetComponent;
}
module.exports = hoistNonReactStatics;

/***/ }),

/***/ "30RF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ setMatchPaths; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ findMatchPath; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ grabMatchParams; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ findPath; });

// UNUSED EXPORTS: cleanPath

// EXTERNAL MODULE: ./node_modules/@reach/router/es/lib/utils.js
var utils = __webpack_require__("LYrO");

// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__("cSJ8");

// CONCATENATED MODULE: ./.cache/normalize-page-path.js
/* harmony default export */ var normalize_page_path = (path=>{if(path===undefined){return path;}if(path===`/`){return`/`;}if(path.charAt(path.length-1)===`/`){return path.slice(0,-1);}return path;});
// CONCATENATED MODULE: ./.cache/find-path.js
const pathCache=new Map();let matchPaths=[];const trimPathname=rawPathname=>{const pathname=decodeURIComponent(rawPathname);// Remove the pathPrefix from the pathname.
const trimmedPathname=Object(strip_prefix["a" /* default */])(pathname,"")// Remove any hashfragment
.split(`#`)[0]// Remove search query
.split(`?`)[0];return trimmedPathname;};function absolutify(path){// If it's already absolute, return as-is
if(path.startsWith(`/`)||path.startsWith(`https://`)||path.startsWith(`http://`)){return path;}// Calculate path relative to current location, adding a trailing slash to
// match behavior of @reach/router
return new URL(path,window.location.href+(window.location.href.endsWith(`/`)?``:`/`)).pathname;}/**
 * Set list of matchPaths
 *
 * @param {Array<{path: string, matchPath: string}>} value collection of matchPaths
 */const setMatchPaths=value=>{matchPaths=value;};/**
 * Return a matchpath url
 * if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
 * `/foo?bar=far` => `/page1`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string|null}
 */const findMatchPath=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(_ref=>{let{path,matchPath}=_ref;return{path:matchPath,originalPath:path};});const path=Object(utils["pick"])(pickPaths,trimmedPathname);if(path){return normalize_page_path(path.route.originalPath);}return null;};/**
 * Return a matchpath params from reach/router rules
 * if `match-paths.json` contains `{ ":bar/*foo" }`, and the path is /baz/zaz/zoo
 * then it returns
 *  { bar: baz, foo: zaz/zoo }
 *
 * @param {string} rawPathname A raw pathname
 * @return {object}
 */const grabMatchParams=rawPathname=>{const trimmedPathname=cleanPath(rawPathname);const pickPaths=matchPaths.map(_ref2=>{let{path,matchPath}=_ref2;return{path:matchPath,originalPath:path};});const path=Object(utils["pick"])(pickPaths,trimmedPathname);if(path){return path.params;}return{};};// Given a raw URL path, returns the cleaned version of it (trim off
// `#` and query params), or if it matches an entry in
// `match-paths.json`, its matched path is returned
//
// E.g. `/foo?bar=far` => `/foo`
//
// Or if `match-paths.json` contains `{ "/foo*": "/page1", ...}`, then
// `/foo?bar=far` => `/page1`
const findPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));if(pathCache.has(trimmedPathname)){return pathCache.get(trimmedPathname);}let foundPath=findMatchPath(trimmedPathname);if(!foundPath){foundPath=cleanPath(rawPathname);}pathCache.set(trimmedPathname,foundPath);return foundPath;};/**
 * Clean a url and converts /index.html => /
 * E.g. `/foo?bar=far` => `/foo`
 *
 * @param {string} rawPathname A raw pathname
 * @return {string}
 */const cleanPath=rawPathname=>{const trimmedPathname=trimPathname(absolutify(rawPathname));let foundPath=trimmedPathname;if(foundPath===`/index.html`){foundPath=`/`;}foundPath=normalize_page_path(foundPath);return foundPath;};

/***/ }),

/***/ "3uz+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = useScrollRestoration;

var _scrollHandler = __webpack_require__("Enzk");

var _react = __webpack_require__("q1tI");

var _router = __webpack_require__("YwZP");

function useScrollRestoration(identifier) {
  var location = (0, _router.useLocation)();
  var state = (0, _react.useContext)(_scrollHandler.ScrollContext);
  var ref = (0, _react.useRef)();
  (0, _react.useLayoutEffect)(function () {
    if (ref.current) {
      var position = state.read(location, identifier);
      ref.current.scrollTo(0, position || 0);
    }
  }, []);
  return {
    ref: ref,
    onScroll: function onScroll() {
      if (ref.current) {
        state.save(location, identifier, ref.current.scrollTop);
      }
    }
  };
}

/***/ }),

/***/ "5CWz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export html */
/* unused harmony export body */
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("H2TA");




var html = {
  WebkitFontSmoothing: 'antialiased',
  // Antialiasing.
  MozOsxFontSmoothing: 'grayscale',
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: 'border-box'
};
var body = function body(theme) {
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    color: theme.palette.text.primary
  }, theme.typography.body2, {
    backgroundColor: theme.palette.background.default,
    '@media print': {
      // Save printer ink.
      backgroundColor: theme.palette.common.white
    }
  });
};
var styles = function styles(theme) {
  return {
    '@global': {
      html: html,
      '*, *::before, *::after': {
        boxSizing: 'inherit'
      },
      'strong, b': {
        fontWeight: theme.typography.fontWeightBold
      },
      body: Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
        margin: 0
      }, body(theme), {
        // Add support for document.body.requestFullScreen().
        // Other elements, if background transparent, are not supported.
        '&::backdrop': {
          backgroundColor: theme.palette.background.default
        }
      })
    }
  };
};
/**
 * Kickstart an elegant, consistent, and simple baseline to build upon.
 */

function CssBaseline(props) {
  /* eslint-disable no-unused-vars */
  var _props$children = props.children,
    children = _props$children === void 0 ? null : _props$children,
    classes = props.classes;
  /* eslint-enable no-unused-vars */

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__["createElement"](react__WEBPACK_IMPORTED_MODULE_1__["Fragment"], null, children);
}
 false ? undefined : void 0;
if (false) {}
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(styles, {
  name: 'MuiCssBaseline'
})(CssBaseline));

/***/ }),

/***/ "5yr3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/mitt/dist/mitt.es.js
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ var mitt_es = (mitt);
//# sourceMappingURL=mitt.es.js.map

// CONCATENATED MODULE: ./.cache/emitter.js
const emitter=mitt_es();/* harmony default export */ var _cache_emitter = __webpack_exports__["a"] = (emitter);

/***/ }),

/***/ "6MXi":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("TqRt");exports.__esModule=true;exports.onRouteUpdate=exports.onRouteUpdateDelayed=exports.onClientEntry=void 0;var _extends2=_interopRequireDefault(__webpack_require__("pVnL"));var _nprogress=_interopRequireDefault(__webpack_require__("Mj6V"));var defaultOptions={color:"#29d"};var onClientEntry=function onClientEntry(a,pluginOptions){if(pluginOptions===void 0){pluginOptions={};}// Merge default options with user defined options in `gatsby-config.js`
var options=(0,_extends2.default)({},defaultOptions,pluginOptions);// Inject styles.
var styles="\n    #nprogress {\n     pointer-events: none;\n    }\n    #nprogress .bar {\n      background: "+options.color+";\n      position: fixed;\n      z-index: 1031;\n      top: 0;\n      left: 0;\n      width: 100%;\n      height: 2px;\n    }\n    #nprogress .peg {\n      display: block;\n      position: absolute;\n      right: 0px;\n      width: 100px;\n      height: 100%;\n      box-shadow: 0 0 10px "+options.color+", 0 0 5px "+options.color+";\n      opacity: 1.0;\n      -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n      transform: rotate(3deg) translate(0px, -4px);\n    }\n    #nprogress .spinner {\n      display: block;\n      position: fixed;\n      z-index: 1031;\n      top: 15px;\n      right: 15px;\n    }\n    #nprogress .spinner-icon {\n      width: 18px;\n      height: 18px;\n      box-sizing: border-box;\n      border: solid 2px transparent;\n      border-top-color: "+options.color+";\n      border-left-color: "+options.color+";\n      border-radius: 50%;\n      -webkit-animation: nprogress-spinner 400ms linear infinite;\n      animation: nprogress-spinner 400ms linear infinite;\n    }\n    .nprogress-custom-parent {\n      overflow: hidden;\n      position: relative;\n    }\n    .nprogress-custom-parent #nprogress .spinner,\n    .nprogress-custom-parent #nprogress .bar {\n      position: absolute;\n    }\n    @-webkit-keyframes nprogress-spinner {\n      0% {\n        -webkit-transform: rotate(0deg);\n      }\n      100% {\n        -webkit-transform: rotate(360deg);\n      }\n    }\n    @keyframes nprogress-spinner {\n      0% {\n        transform: rotate(0deg);\n      }\n      100% {\n        transform: rotate(360deg);\n      }\n    }\n  ";var node=document.createElement("style");node.id="nprogress-styles";node.innerHTML=styles;document.head.appendChild(node);_nprogress.default.configure(options);};exports.onClientEntry=onClientEntry;var onRouteUpdateDelayed=function onRouteUpdateDelayed(){_nprogress.default.start();};exports.onRouteUpdateDelayed=onRouteUpdateDelayed;var onRouteUpdate=function onRouteUpdate(){_nprogress.default.done();};exports.onRouteUpdate=onRouteUpdate;

/***/ }),

/***/ "6qGY":
/***/ (function(module, exports) {

module.exports=Object.assign;

/***/ }),

/***/ "6yBS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var green = {
  50: '#e8f5e9',
  100: '#c8e6c9',
  200: '#a5d6a7',
  300: '#81c784',
  400: '#66bb6a',
  500: '#4caf50',
  600: '#43a047',
  700: '#388e3c',
  800: '#2e7d32',
  900: '#1b5e20',
  A100: '#b9f6ca',
  A200: '#69f0ae',
  A400: '#00e676',
  A700: '#00c853'
};
/* harmony default export */ __webpack_exports__["a"] = (green);

/***/ }),

/***/ "7444":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7hJ6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.useScrollRestoration = exports.ScrollContainer = exports.ScrollContext = void 0;

var _scrollHandler = __webpack_require__("Enzk");

exports.ScrollContext = _scrollHandler.ScrollHandler;

var _scrollContainer = __webpack_require__("hd9s");

exports.ScrollContainer = _scrollContainer.ScrollContainer;

var _useScrollRestoration = __webpack_require__("3uz+");

exports.useScrollRestoration = _useScrollRestoration.useScrollRestoration;

/***/ }),

/***/ "8+s/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}
var React = __webpack_require__("q1tI");
var React__default = _interopDefault(React);
var shallowEqual = _interopDefault(__webpack_require__("Gytx"));
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }
    var mountedInstances = [];
    var state;
    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));
      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }
    var SideEffect = /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(SideEffect, _Component);
      function SideEffect() {
        return _Component.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      // Expose canUseDOM so tests can monkeypatch it
      SideEffect.peek = function peek() {
        return state;
      };
      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }
        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };
      var _proto = SideEffect.prototype;
      _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        return !shallowEqual(nextProps, this.props);
      };
      _proto.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };
      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };
      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };
      _proto.render = function render() {
        return React__default.createElement(WrappedComponent, this.props);
      };
      return SideEffect;
    }(React.Component);
    _defineProperty(SideEffect, "displayName", "SideEffect(" + getDisplayName(WrappedComponent) + ")");
    _defineProperty(SideEffect, "canUseDOM", canUseDOM);
    return SideEffect;
  };
}
module.exports = withSideEffect;

/***/ }),

/***/ "8OQS":
/***/ (function(module, exports) {

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "94VI":
/***/ (function(module, exports) {

exports.polyfill=Component=>Component;

/***/ }),

/***/ "9Xx/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return globalHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return navigate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createHistory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return createMemorySource; });
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getLocation = function getLocation(source) {
  var _source$location = source.location,
      search = _source$location.search,
      hash = _source$location.hash,
      href = _source$location.href,
      origin = _source$location.origin,
      protocol = _source$location.protocol,
      host = _source$location.host,
      hostname = _source$location.hostname,
      port = _source$location.port;
  var pathname = source.location.pathname;


  if (!pathname && href && canUseDOM) {
    var url = new URL(href);
    pathname = url.pathname;
  }

  return {
    pathname: encodeURI(decodeURI(pathname)),
    search: search,
    hash: hash,
    href: href,
    origin: origin,
    protocol: protocol,
    host: host,
    hostname: hostname,
    port: port,
    state: source.history.state,
    key: source.history.state && source.history.state.key || "initial"
  };
};

var createHistory = function createHistory(source, options) {
  var listeners = [];
  var location = getLocation(source);
  var transitioning = false;
  var resolveTransition = function resolveTransition() {};

  return {
    get location() {
      return location;
    },

    get transitioning() {
      return transitioning;
    },

    _onTransitionComplete: function _onTransitionComplete() {
      transitioning = false;
      resolveTransition();
    },
    listen: function listen(listener) {
      listeners.push(listener);

      var popstateListener = function popstateListener() {
        location = getLocation(source);
        listener({ location: location, action: "POP" });
      };

      source.addEventListener("popstate", popstateListener);

      return function () {
        source.removeEventListener("popstate", popstateListener);
        listeners = listeners.filter(function (fn) {
          return fn !== listener;
        });
      };
    },
    navigate: function navigate(to) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          state = _ref.state,
          _ref$replace = _ref.replace,
          replace = _ref$replace === undefined ? false : _ref$replace;

      if (typeof to === "number") {
        source.history.go(to);
      } else {
        state = _extends({}, state, { key: Date.now() + "" });
        // try...catch iOS Safari limits to 100 pushState calls
        try {
          if (transitioning || replace) {
            source.history.replaceState(state, null, to);
          } else {
            source.history.pushState(state, null, to);
          }
        } catch (e) {
          source.location[replace ? "replace" : "assign"](to);
        }
      }

      location = getLocation(source);
      transitioning = true;
      var transition = new Promise(function (res) {
        return resolveTransition = res;
      });
      listeners.forEach(function (listener) {
        return listener({ location: location, action: "PUSH" });
      });
      return transition;
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// Stores history entries in memory for testing or other platforms like Native
var createMemorySource = function createMemorySource() {
  var initialPath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "/";

  var searchIndex = initialPath.indexOf("?");
  var initialLocation = {
    pathname: searchIndex > -1 ? initialPath.substr(0, searchIndex) : initialPath,
    search: searchIndex > -1 ? initialPath.substr(searchIndex) : ""
  };
  var index = 0;
  var stack = [initialLocation];
  var states = [null];

  return {
    get location() {
      return stack[index];
    },
    addEventListener: function addEventListener(name, fn) {},
    removeEventListener: function removeEventListener(name, fn) {},

    history: {
      get entries() {
        return stack;
      },
      get index() {
        return index;
      },
      get state() {
        return states[index];
      },
      pushState: function pushState(state, _, uri) {
        var _uri$split = uri.split("?"),
            pathname = _uri$split[0],
            _uri$split$ = _uri$split[1],
            search = _uri$split$ === undefined ? "" : _uri$split$;

        index++;
        stack.push({ pathname: pathname, search: search.length ? "?" + search : search });
        states.push(state);
      },
      replaceState: function replaceState(state, _, uri) {
        var _uri$split2 = uri.split("?"),
            pathname = _uri$split2[0],
            _uri$split2$ = _uri$split2[1],
            search = _uri$split2$ === undefined ? "" : _uri$split2$;

        stack[index] = { pathname: pathname, search: search };
        states[index] = state;
      },
      go: function go(to) {
        var newIndex = index + to;

        if (newIndex < 0 || newIndex > states.length - 1) {
          return;
        }

        index = newIndex;
      }
    }
  };
};

////////////////////////////////////////////////////////////////////////////////
// global history - uses window.history as the source if available, otherwise a
// memory history
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var getSource = function getSource() {
  return canUseDOM ? window : createMemorySource();
};

var globalHistory = createHistory(getSource());
var navigate = globalHistory.navigate;

////////////////////////////////////////////////////////////////////////////////



/***/ }),

/***/ "9hXx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.default=void 0;/**
 * Get a manifest filename depending on localized pathname
 *
 * @param {string} pathname
 * @param {Array<{start_url: string, lang: string}>} localizedManifests
 * @return string
 */var _default=function _default(pathname,localizedManifests){var defaultFilename="manifest.webmanifest";if(!Array.isArray(localizedManifests)){return defaultFilename;}var localizedManifest=localizedManifests.find(function(app){return pathname.startsWith(app.start_url);});if(!localizedManifest){return defaultFilename;}return"manifest_"+localizedManifest.lang+".webmanifest";};exports.default=_default;

/***/ }),

/***/ "A+CX":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getThemeProps; });
/* eslint-disable no-restricted-syntax */
function getThemeProps(params) {
  var theme = params.theme,
    name = params.name,
    props = params.props;
  if (!theme || !theme.props || !theme.props[name]) {
    return props;
  } // Resolve default props, code borrow from React source.
  // https://github.com/facebook/react/blob/15a8f031838a553e41c0b66eb1bcf1da8448104d/packages/react/src/ReactElement.js#L221

  var defaultProps = theme.props[name];
  var propName;
  for (propName in defaultProps) {
    if (props[propName] === undefined) {
      props[propName] = defaultProps[propName];
    }
  }
  return props;
}

/***/ }),

/***/ "ASyH":
/***/ (function(module, exports, __webpack_require__) {

(function (f) {
  if (true) {
    module.exports = f();
  } else { var g; }
})(function () {
  var define, module, exports;
  var _$breadcrumbTypes_8 = ['navigation', 'request', 'process', 'log', 'user', 'state', 'error', 'manual'];

  // Array#reduce
  var _$reduce_17 = function (arr, fn, accum) {
    var val = accum;
    for (var i = 0, len = arr.length; i < len; i++) {
      val = fn(val, arr[i], i, arr);
    }
    return val;
  };

  /* removed: var _$reduce_17 = require('./reduce'); */
  ; // Array#filter

  var _$filter_12 = function (arr, fn) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return !fn(item, i, arr) ? accum : accum.concat(item);
    }, []);
  };

  /* removed: var _$reduce_17 = require('./reduce'); */
  ; // Array#includes

  var _$includes_13 = function (arr, x) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return accum === true || item === x;
    }, false);
  };

  // Array#isArray
  var _$isArray_14 = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /* eslint-disable-next-line no-prototype-builtins */
  var _hasDontEnumBug = !{
    toString: null
  }.propertyIsEnumerable('toString');
  var _dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor']; // Object#keys

  var _$keys_15 = function (obj) {
    // stripped down version of
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/Keys
    var result = [];
    var prop;
    for (prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) result.push(prop);
    }
    if (!_hasDontEnumBug) return result;
    for (var i = 0, len = _dontEnums.length; i < len; i++) {
      if (Object.prototype.hasOwnProperty.call(obj, _dontEnums[i])) result.push(_dontEnums[i]);
    }
    return result;
  };
  var _$intRange_24 = function (min, max) {
    if (min === void 0) {
      min = 1;
    }
    if (max === void 0) {
      max = Infinity;
    }
    return function (value) {
      return typeof value === 'number' && parseInt('' + value, 10) === value && value >= min && value <= max;
    };
  };

  /* removed: var _$filter_12 = require('../es-utils/filter'); */
  ;

  /* removed: var _$isArray_14 = require('../es-utils/is-array'); */
  ;
  var _$listOfFunctions_25 = function (value) {
    return typeof value === 'function' || _$isArray_14(value) && _$filter_12(value, function (f) {
      return typeof f === 'function';
    }).length === value.length;
  };
  var _$stringWithLength_26 = function (value) {
    return typeof value === 'string' && !!value.length;
  };
  var _$config_5 = {};
  /* removed: var _$filter_12 = require('./lib/es-utils/filter'); */
  ;

  /* removed: var _$reduce_17 = require('./lib/es-utils/reduce'); */
  ;

  /* removed: var _$keys_15 = require('./lib/es-utils/keys'); */
  ;

  /* removed: var _$isArray_14 = require('./lib/es-utils/is-array'); */
  ;

  /* removed: var _$includes_13 = require('./lib/es-utils/includes'); */
  ;

  /* removed: var _$intRange_24 = require('./lib/validators/int-range'); */
  ;

  /* removed: var _$stringWithLength_26 = require('./lib/validators/string-with-length'); */
  ;

  /* removed: var _$listOfFunctions_25 = require('./lib/validators/list-of-functions'); */
  ;

  /* removed: var _$breadcrumbTypes_8 = require('./lib/breadcrumb-types'); */
  ;
  var defaultErrorTypes = function () {
    return {
      unhandledExceptions: true,
      unhandledRejections: true
    };
  };
  _$config_5.schema = {
    apiKey: {
      defaultValue: function () {
        return null;
      },
      message: 'is required',
      validate: _$stringWithLength_26
    },
    appVersion: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || _$stringWithLength_26(value);
      }
    },
    appType: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || _$stringWithLength_26(value);
      }
    },
    autoDetectErrors: {
      defaultValue: function () {
        return true;
      },
      message: 'should be true|false',
      validate: function (value) {
        return value === true || value === false;
      }
    },
    enabledErrorTypes: {
      defaultValue: function () {
        return defaultErrorTypes();
      },
      message: 'should be an object containing the flags { unhandledExceptions:true|false, unhandledRejections:true|false }',
      allowPartialObject: true,
      validate: function (value) {
        // ensure we have an object
        if (typeof value !== 'object' || !value) return false;
        var providedKeys = _$keys_15(value);
        var defaultKeys = _$keys_15(defaultErrorTypes()); // ensure it only has a subset of the allowed keys

        if (_$filter_12(providedKeys, function (k) {
          return _$includes_13(defaultKeys, k);
        }).length < providedKeys.length) return false; // ensure all of the values are boolean

        if (_$filter_12(_$keys_15(value), function (k) {
          return typeof value[k] !== 'boolean';
        }).length > 0) return false;
        return true;
      }
    },
    onError: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_25
    },
    onSession: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_25
    },
    onBreadcrumb: {
      defaultValue: function () {
        return [];
      },
      message: 'should be a function or array of functions',
      validate: _$listOfFunctions_25
    },
    endpoints: {
      defaultValue: function () {
        return {
          notify: 'https://notify.bugsnag.com',
          sessions: 'https://sessions.bugsnag.com'
        };
      },
      message: 'should be an object containing endpoint URLs { notify, sessions }',
      validate: function (val) {
        return (
          // first, ensure it's an object
          val && typeof val === 'object' &&
          // notify and sessions must always be set
          _$stringWithLength_26(val.notify) && _$stringWithLength_26(val.sessions) &&
          // ensure no keys other than notify/session are set on endpoints object
          _$filter_12(_$keys_15(val), function (k) {
            return !_$includes_13(['notify', 'sessions'], k);
          }).length === 0
        );
      }
    },
    autoTrackSessions: {
      defaultValue: function (val) {
        return true;
      },
      message: 'should be true|false',
      validate: function (val) {
        return val === true || val === false;
      }
    },
    enabledReleaseStages: {
      defaultValue: function () {
        return null;
      },
      message: 'should be an array of strings',
      validate: function (value) {
        return value === null || _$isArray_14(value) && _$filter_12(value, function (f) {
          return typeof f === 'string';
        }).length === value.length;
      }
    },
    releaseStage: {
      defaultValue: function () {
        return 'production';
      },
      message: 'should be a string',
      validate: function (value) {
        return typeof value === 'string' && value.length;
      }
    },
    maxBreadcrumbs: {
      defaultValue: function () {
        return 25;
      },
      message: 'should be a number ≤100',
      validate: function (value) {
        return _$intRange_24(0, 100)(value);
      }
    },
    enabledBreadcrumbTypes: {
      defaultValue: function () {
        return _$breadcrumbTypes_8;
      },
      message: "should be null or a list of available breadcrumb types (" + _$breadcrumbTypes_8.join(',') + ")",
      validate: function (value) {
        return value === null || _$isArray_14(value) && _$reduce_17(value, function (accum, maybeType) {
          if (accum === false) return accum;
          return _$includes_13(_$breadcrumbTypes_8, maybeType);
        }, true);
      }
    },
    context: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be a string',
      validate: function (value) {
        return value === undefined || typeof value === 'string';
      }
    },
    user: {
      defaultValue: function () {
        return {};
      },
      message: 'should be an object with { id, email, name } properties',
      validate: function (value) {
        return value === null || value && _$reduce_17(_$keys_15(value), function (accum, key) {
          return accum && _$includes_13(['id', 'email', 'name'], key);
        }, true);
      }
    },
    metadata: {
      defaultValue: function () {
        return {};
      },
      message: 'should be an object',
      validate: function (value) {
        return typeof value === 'object' && value !== null;
      }
    },
    logger: {
      defaultValue: function () {
        return undefined;
      },
      message: 'should be null or an object with methods { debug, info, warn, error }',
      validate: function (value) {
        return !value || value && _$reduce_17(['debug', 'info', 'warn', 'error'], function (accum, method) {
          return accum && typeof value[method] === 'function';
        }, true);
      }
    },
    redactedKeys: {
      defaultValue: function () {
        return ['password'];
      },
      message: 'should be an array of strings|regexes',
      validate: function (value) {
        return _$isArray_14(value) && value.length === _$filter_12(value, function (s) {
          return typeof s === 'string' || s && typeof s.test === 'function';
        }).length;
      }
    },
    plugins: {
      defaultValue: function () {
        return [];
      },
      message: 'should be an array of plugin objects',
      validate: function (value) {
        return _$isArray_14(value) && value.length === _$filter_12(value, function (p) {
          return p && typeof p === 'object' && typeof p.load === 'function';
        }).length;
      }
    }
  };

  // extends helper from babel
  // https://github.com/babel/babel/blob/916429b516e6466fd06588ee820e40e025d7f3a3/packages/babel-helpers/src/helpers.js#L377-L393
  var _$assign_11 = function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

  /* removed: var _$reduce_17 = require('./reduce'); */
  ; // Array#map

  var _$map_16 = function (arr, fn) {
    return _$reduce_17(arr, function (accum, item, i, arr) {
      return accum.concat(fn(item, i, arr));
    }, []);
  };
  var schema = _$config_5.schema;

  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$assign_11 = require('@bugsnag/core/lib/es-utils/assign'); */
  ;
  var _$config_1 = {
    releaseStage: _$assign_11({}, schema.releaseStage, {
      defaultValue: function () {
        if (/^localhost(:\d+)?$/.test(window.location.host)) return 'development';
        return 'production';
      }
    }),
    logger: _$assign_11({}, schema.logger, {
      defaultValue: function () {
        return (
          // set logger based on browser capability
          typeof console !== 'undefined' && typeof console.debug === 'function' ? getPrefixedConsole() : undefined
        );
      }
    })
  };
  var getPrefixedConsole = function () {
    var logger = {};
    var consoleLog = console.log;
    _$map_16(['debug', 'info', 'warn', 'error'], function (method) {
      var consoleMethod = console[method];
      logger[method] = typeof consoleMethod === 'function' ? consoleMethod.bind(console, '[bugsnag]') : consoleLog.bind(console, '[bugsnag]');
    });
    return logger;
  };
  var Breadcrumb = /*#__PURE__*/
  function () {
    function Breadcrumb(message, metadata, type, timestamp) {
      if (timestamp === void 0) {
        timestamp = new Date();
      }
      this.type = type;
      this.message = message;
      this.metadata = metadata;
      this.timestamp = timestamp;
    }
    var _proto = Breadcrumb.prototype;
    _proto.toJSON = function toJSON() {
      return {
        type: this.type,
        name: this.message,
        timestamp: this.timestamp,
        metaData: this.metadata
      };
    };
    return Breadcrumb;
  }();
  var _$Breadcrumb_3 = Breadcrumb;
  var _$stackframe_34 = {};
  (function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
      define('stackframe', [], factory);
    } else if (typeof _$stackframe_34 === 'object') {
      _$stackframe_34 = factory();
    } else {
      root.StackFrame = factory();
    }
  })(this, function () {
    'use strict';

    function _isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    function _capitalize(str) {
      return str.charAt(0).toUpperCase() + str.substring(1);
    }
    function _getter(p) {
      return function () {
        return this[p];
      };
    }
    var booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
    var numericProps = ['columnNumber', 'lineNumber'];
    var stringProps = ['fileName', 'functionName', 'source'];
    var arrayProps = ['args'];
    var props = booleanProps.concat(numericProps, stringProps, arrayProps);
    function StackFrame(obj) {
      if (obj instanceof Object) {
        for (var i = 0; i < props.length; i++) {
          if (obj.hasOwnProperty(props[i]) && obj[props[i]] !== undefined) {
            this['set' + _capitalize(props[i])](obj[props[i]]);
          }
        }
      }
    }
    StackFrame.prototype = {
      getArgs: function () {
        return this.args;
      },
      setArgs: function (v) {
        if (Object.prototype.toString.call(v) !== '[object Array]') {
          throw new TypeError('Args must be an Array');
        }
        this.args = v;
      },
      getEvalOrigin: function () {
        return this.evalOrigin;
      },
      setEvalOrigin: function (v) {
        if (v instanceof StackFrame) {
          this.evalOrigin = v;
        } else if (v instanceof Object) {
          this.evalOrigin = new StackFrame(v);
        } else {
          throw new TypeError('Eval Origin must be an Object or StackFrame');
        }
      },
      toString: function () {
        var functionName = this.getFunctionName() || '{anonymous}';
        var args = '(' + (this.getArgs() || []).join(',') + ')';
        var fileName = this.getFileName() ? '@' + this.getFileName() : '';
        var lineNumber = _isNumber(this.getLineNumber()) ? ':' + this.getLineNumber() : '';
        var columnNumber = _isNumber(this.getColumnNumber()) ? ':' + this.getColumnNumber() : '';
        return functionName + args + fileName + lineNumber + columnNumber;
      }
    };
    for (var i = 0; i < booleanProps.length; i++) {
      StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
      StackFrame.prototype['set' + _capitalize(booleanProps[i])] = function (p) {
        return function (v) {
          this[p] = Boolean(v);
        };
      }(booleanProps[i]);
    }
    for (var j = 0; j < numericProps.length; j++) {
      StackFrame.prototype['get' + _capitalize(numericProps[j])] = _getter(numericProps[j]);
      StackFrame.prototype['set' + _capitalize(numericProps[j])] = function (p) {
        return function (v) {
          if (!_isNumber(v)) {
            throw new TypeError(p + ' must be a Number');
          }
          this[p] = Number(v);
        };
      }(numericProps[j]);
    }
    for (var k = 0; k < stringProps.length; k++) {
      StackFrame.prototype['get' + _capitalize(stringProps[k])] = _getter(stringProps[k]);
      StackFrame.prototype['set' + _capitalize(stringProps[k])] = function (p) {
        return function (v) {
          this[p] = String(v);
        };
      }(stringProps[k]);
    }
    return StackFrame;
  });
  var _$errorStackParser_31 = {};
  (function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
      define('error-stack-parser', ['stackframe'], factory);
    } else if (typeof _$errorStackParser_31 === 'object') {
      _$errorStackParser_31 = factory(_$stackframe_34);
    } else {
      root.ErrorStackParser = factory(root.StackFrame);
    }
  })(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;
    return {
      /**
       * Given an Error object, extract the most information from it.
       *
       * @param {Error} error object
       * @return {Array} of StackFrames
       */
      parse: function ErrorStackParser$$parse(error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
          return this.parseOpera(error);
        } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
          return this.parseV8OrIE(error);
        } else if (error.stack) {
          return this.parseFFOrSafari(error);
        } else {
          throw new Error('Cannot parse given Error object');
        }
      },
      // Separate line and column numbers from a string of the form: (URI:Line:Column)
      extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
        // Fail-fast but return locations like "(native)"
        if (urlLike.indexOf(':') === -1) {
          return [urlLike];
        }
        var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
        var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
        return [parts[1], parts[2] || undefined, parts[3] || undefined];
      },
      parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(CHROME_IE_STACK_REGEXP);
        }, this);
        return filtered.map(function (line) {
          if (line.indexOf('(eval ') > -1) {
            // Throw away eval information until we implement stacktrace.js/stackframe#8
            line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
          }
          var sanitizedLine = line.replace(/^\s+/, '').replace(/\(eval code/g, '('); // capture and preseve the parenthesized location "(/foo/my bar.js:12:87)" in
          // case it has spaces in it, as the string is split on \s+ later on

          var location = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/); // remove the parenthesized location from the line, if it was matched

          sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;
          var tokens = sanitizedLine.split(/\s+/).slice(1); // if a location was matched, pass it to extractLocation() otherwise pop the last token

          var locationParts = this.extractLocation(location ? location[1] : tokens.pop());
          var functionName = tokens.join(' ') || undefined;
          var fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];
          return new StackFrame({
            functionName: functionName,
            fileName: fileName,
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      },
      parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !line.match(SAFARI_NATIVE_CODE_REGEXP);
        }, this);
        return filtered.map(function (line) {
          // Throw away eval information until we implement stacktrace.js/stackframe#8
          if (line.indexOf(' > eval') > -1) {
            line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
          }
          if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
            // Safari eval frames only have function names and nothing else
            return new StackFrame({
              functionName: line
            });
          } else {
            var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
            var matches = line.match(functionNameRegex);
            var functionName = matches && matches[1] ? matches[1] : undefined;
            var locationParts = this.extractLocation(line.replace(functionNameRegex, ''));
            return new StackFrame({
              functionName: functionName,
              fileName: locationParts[0],
              lineNumber: locationParts[1],
              columnNumber: locationParts[2],
              source: line
            });
          }
        }, this);
      },
      parseOpera: function ErrorStackParser$$parseOpera(e) {
        if (!e.stacktrace || e.message.indexOf('\n') > -1 && e.message.split('\n').length > e.stacktrace.split('\n').length) {
          return this.parseOpera9(e);
        } else if (!e.stack) {
          return this.parseOpera10(e);
        } else {
          return this.parseOpera11(e);
        }
      },
      parseOpera9: function ErrorStackParser$$parseOpera9(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        var lines = e.message.split('\n');
        var result = [];
        for (var i = 2, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);
          if (match) {
            result.push(new StackFrame({
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }
        return result;
      },
      parseOpera10: function ErrorStackParser$$parseOpera10(e) {
        var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        var lines = e.stacktrace.split('\n');
        var result = [];
        for (var i = 0, len = lines.length; i < len; i += 2) {
          var match = lineRE.exec(lines[i]);
          if (match) {
            result.push(new StackFrame({
              functionName: match[3] || undefined,
              fileName: match[2],
              lineNumber: match[1],
              source: lines[i]
            }));
          }
        }
        return result;
      },
      // Opera 10.65+ Error.stack very similar to FF/Safari
      parseOpera11: function ErrorStackParser$$parseOpera11(error) {
        var filtered = error.stack.split('\n').filter(function (line) {
          return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
        }, this);
        return filtered.map(function (line) {
          var tokens = line.split('@');
          var locationParts = this.extractLocation(tokens.pop());
          var functionCall = tokens.shift() || '';
          var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^\)]*\)/g, '') || undefined;
          var argsRaw;
          if (functionCall.match(/\(([^\)]*)\)/)) {
            argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
          }
          var args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');
          return new StackFrame({
            functionName: functionName,
            args: args,
            fileName: locationParts[0],
            lineNumber: locationParts[1],
            columnNumber: locationParts[2],
            source: line
          });
        }, this);
      }
    };
  });
  var _$errorStackParser_10 = _$errorStackParser_31;

  // Given `err` which may be an error, does it have a stack property which is a string?
  var _$hasStack_18 = function (err) {
    return !!err && (!!err.stack || !!err.stacktrace || !!err['opera#sourceloc']) && typeof (err.stack || err.stacktrace || err['opera#sourceloc']) === 'string' && err.stack !== err.name + ": " + err.message;
  };

  /**
   * Expose `isError`.
   */
  var _$isError_32 = isError;
  /**
   * Test whether `value` is error object.
   *
   * @param {*} value
   * @returns {boolean}
   */

  function isError(value) {
    switch (Object.prototype.toString.call(value)) {
      case '[object Error]':
        return true;
      case '[object Exception]':
        return true;
      case '[object DOMException]':
        return true;
      default:
        return value instanceof Error;
    }
  }
  var _$iserror_19 = _$isError_32;
  var _$jsRuntime_20 = "yes" ? 'browserjs' : undefined;

  /* removed: var _$assign_11 = require('./es-utils/assign'); */
  ;
  var add = function (state, section, keyOrObj, maybeVal) {
    var _updates;
    if (!section) return;
    var updates; // addMetadata("section", null) -> clears section

    if (keyOrObj === null) return clear(state, section); // normalise the two supported input types into object form

    if (typeof keyOrObj === 'object') updates = keyOrObj;
    if (typeof keyOrObj === 'string') updates = (_updates = {}, _updates[keyOrObj] = maybeVal, _updates); // exit if we don't have an updates object at this point

    if (!updates) return; // ensure a section with this name exists

    if (!state[section]) state[section] = {}; // merge the updates with the existing section

    state[section] = _$assign_11({}, state[section], updates);
  };
  var get = function (state, section, key) {
    if (typeof section !== 'string') return undefined;
    if (!key) {
      return state[section];
    }
    if (state[section]) {
      return state[section][key];
    }
    return undefined;
  };
  var clear = function (state, section, key) {
    if (typeof section !== 'string') return; // clear an entire section

    if (!key) {
      delete state[section];
      return;
    } // clear a single value from a section

    if (state[section]) {
      delete state[section][key];
    }
  };
  var _$metadataDelegate_22 = {
    add: add,
    get: get,
    clear: clear
  };
  var _$stackGenerator_33 = {};
  (function (root, factory) {
    'use strict';

    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
      define('stack-generator', ['stackframe'], factory);
    } else if (typeof _$stackGenerator_33 === 'object') {
      _$stackGenerator_33 = factory(_$stackframe_34);
    } else {
      root.StackGenerator = factory(root.StackFrame);
    }
  })(this, function (StackFrame) {
    return {
      backtrace: function StackGenerator$$backtrace(opts) {
        var stack = [];
        var maxStackSize = 10;
        if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
          maxStackSize = opts.maxStackSize;
        }
        var curr = arguments.callee;
        while (curr && stack.length < maxStackSize && curr['arguments']) {
          // Allow V8 optimizations
          var args = new Array(curr['arguments'].length);
          for (var i = 0; i < args.length; ++i) {
            args[i] = curr['arguments'][i];
          }
          if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
            stack.push(new StackFrame({
              functionName: RegExp.$1 || undefined,
              args: args
            }));
          } else {
            stack.push(new StackFrame({
              args: args
            }));
          }
          try {
            curr = curr.caller;
          } catch (e) {
            break;
          }
        }
        return stack;
      }
    };
  });

  /* removed: var _$errorStackParser_10 = require('./lib/error-stack-parser'); */
  ;

  /* removed: var _$stackGenerator_33 = require('stack-generator'); */
  ;

  /* removed: var _$hasStack_18 = require('./lib/has-stack'); */
  ;

  /* removed: var _$map_16 = require('./lib/es-utils/map'); */
  ;

  /* removed: var _$reduce_17 = require('./lib/es-utils/reduce'); */
  ;

  /* removed: var _$filter_12 = require('./lib/es-utils/filter'); */
  ;

  /* removed: var _$assign_11 = require('./lib/es-utils/assign'); */
  ;

  /* removed: var _$jsRuntime_20 = require('./lib/js-runtime'); */
  ;

  /* removed: var _$metadataDelegate_22 = require('./lib/metadata-delegate'); */
  ;

  /* removed: var _$iserror_19 = require('./lib/iserror'); */
  ;
  var Event = /*#__PURE__*/
  function () {
    function Event(errorClass, errorMessage, stacktrace, handledState, originalError) {
      if (stacktrace === void 0) {
        stacktrace = [];
      }
      if (handledState === void 0) {
        handledState = defaultHandledState();
      }
      this.apiKey = undefined;
      this.context = undefined;
      this.groupingHash = undefined;
      this.originalError = originalError;
      this._handledState = handledState;
      this.severity = this._handledState.severity;
      this.unhandled = this._handledState.unhandled;
      this.app = {};
      this.device = {};
      this.request = {};
      this.breadcrumbs = [];
      this.threads = [];
      this._metadata = {};
      this._user = {};
      this._session = undefined;
      this.errors = [{
        errorClass: ensureString(errorClass),
        errorMessage: ensureString(errorMessage),
        type: _$jsRuntime_20,
        stacktrace: _$reduce_17(stacktrace, function (accum, frame) {
          var f = formatStackframe(frame); // don't include a stackframe if none of its properties are defined

          try {
            if (JSON.stringify(f) === '{}') return accum;
            return accum.concat(f);
          } catch (e) {
            return accum;
          }
        }, [])
      }]; // Flags.
      // Note these are not initialised unless they are used
      // to save unnecessary bytes in the browser bundle

      /* this.attemptImmediateDelivery, default: true */
    }

    var _proto = Event.prototype;
    _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
      return _$metadataDelegate_22.add(this._metadata, section, keyOrObj, maybeVal);
    };
    _proto.getMetadata = function getMetadata(section, key) {
      return _$metadataDelegate_22.get(this._metadata, section, key);
    };
    _proto.clearMetadata = function clearMetadata(section, key) {
      return _$metadataDelegate_22.clear(this._metadata, section, key);
    };
    _proto.getUser = function getUser() {
      return this._user;
    };
    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };
    _proto.toJSON = function toJSON() {
      return {
        payloadVersion: '4',
        exceptions: _$map_16(this.errors, function (er) {
          return _$assign_11({}, er, {
            message: er.errorMessage
          });
        }),
        severity: this.severity,
        unhandled: this._handledState.unhandled,
        severityReason: this._handledState.severityReason,
        app: this.app,
        device: this.device,
        request: this.request,
        breadcrumbs: this.breadcrumbs,
        context: this.context,
        groupingHash: this.groupingHash,
        metaData: this._metadata,
        user: this._user,
        session: this._session
      };
    };
    return Event;
  }(); // takes a stacktrace.js style stackframe (https://github.com/stacktracejs/stackframe)
  // and returns a Bugsnag compatible stackframe (https://docs.bugsnag.com/api/error-reporting/#json-payload)

  var formatStackframe = function (frame) {
    var f = {
      file: frame.fileName,
      method: normaliseFunctionName(frame.functionName),
      lineNumber: frame.lineNumber,
      columnNumber: frame.columnNumber,
      code: undefined,
      inProject: undefined
    }; // Some instances result in no file:
    // - calling notify() from chrome's terminal results in no file/method.
    // - non-error exception thrown from global code in FF
    // This adds one.

    if (f.lineNumber > -1 && !f.file && !f.method) {
      f.file = 'global code';
    }
    return f;
  };
  var normaliseFunctionName = function (name) {
    return /^global code$/i.test(name) ? 'global code' : name;
  };
  var defaultHandledState = function () {
    return {
      unhandled: false,
      severity: 'warning',
      severityReason: {
        type: 'handledException'
      }
    };
  };
  var ensureString = function (str) {
    return typeof str === 'string' ? str : '';
  }; // Helpers

  Event.getStacktrace = function (error, errorFramesToSkip, backtraceFramesToSkip) {
    if (_$hasStack_18(error)) return _$errorStackParser_10.parse(error).slice(errorFramesToSkip); // error wasn't provided or didn't have a stacktrace so try to walk the callstack

    try {
      return _$filter_12(_$stackGenerator_33.backtrace(), function (frame) {
        return (frame.functionName || '').indexOf('StackGenerator$$') === -1;
      }).slice(1 + backtraceFramesToSkip);
    } catch (e) {
      return [];
    }
  };
  Event.create = function (maybeError, tolerateNonErrors, handledState, component, errorFramesToSkip, logger) {
    if (errorFramesToSkip === void 0) {
      errorFramesToSkip = 0;
    }
    var _normaliseError = normaliseError(maybeError, tolerateNonErrors, component, logger),
      error = _normaliseError[0],
      internalFrames = _normaliseError[1];
    var event;
    try {
      var stacktrace = Event.getStacktrace(error,
      // if an error was created/throw in the normaliseError() function, we need to
      // tell the getStacktrace() function to skip the number of frames we know will
      // be from our own functions. This is added to the number of frames deep we
      // were told about
      internalFrames > 0 ? 1 + internalFrames + errorFramesToSkip : 0,
      // if there's no stacktrace, the callstack may be walked to generated one.
      // this is how many frames should be removed because they come from our library
      1 + errorFramesToSkip);
      event = new Event(error.name, error.message, stacktrace, handledState, maybeError);
    } catch (e) {
      event = new Event(error.name, error.message, [], handledState, maybeError);
    }
    if (error.name === 'InvalidError') {
      event.addMetadata("" + component, 'non-error parameter', makeSerialisable(maybeError));
    }
    return event;
  };
  var makeSerialisable = function (err) {
    if (err === null) return 'null';
    if (err === undefined) return 'undefined';
    return err;
  };
  var normaliseError = function (maybeError, tolerateNonErrors, component, logger) {
    var error;
    var internalFrames = 0;
    var createAndLogInputError = function (reason) {
      if (logger) logger.warn(component + " received a non-error: \"" + reason + "\"");
      var err = new Error(component + " received a non-error. See \"" + component + "\" tab for more detail.");
      err.name = 'InvalidError';
      return err;
    }; // In some cases:
    //
    //  - the promise rejection handler (both in the browser and node)
    //  - the node uncaughtException handler
    //
    // We are really limited in what we can do to get a stacktrace. So we use the
    // tolerateNonErrors option to ensure that the resulting error communicates as
    // such.

    if (!tolerateNonErrors) {
      if (_$iserror_19(maybeError)) {
        error = maybeError;
      } else {
        error = createAndLogInputError(typeof maybeError);
        internalFrames += 2;
      }
    } else {
      switch (typeof maybeError) {
        case 'string':
        case 'number':
        case 'boolean':
          error = new Error(String(maybeError));
          internalFrames += 1;
          break;
        case 'function':
          error = createAndLogInputError('function');
          internalFrames += 2;
          break;
        case 'object':
          if (maybeError !== null && _$iserror_19(maybeError)) {
            error = maybeError;
          } else if (maybeError !== null && hasNecessaryFields(maybeError)) {
            error = new Error(maybeError.message || maybeError.errorMessage);
            error.name = maybeError.name || maybeError.errorClass;
            internalFrames += 1;
          } else {
            error = createAndLogInputError(maybeError === null ? 'null' : 'unsupported object');
            internalFrames += 2;
          }
          break;
        default:
          error = createAndLogInputError('nothing');
          internalFrames += 2;
      }
    }
    if (!_$hasStack_18(error)) {
      // in IE10/11 a new Error() doesn't have a stacktrace until you throw it, so try that here
      try {
        throw error;
      } catch (e) {
        if (_$hasStack_18(e)) {
          error = e; // if the error only got a stacktrace after we threw it here, we know it
          // will only have one extra internal frame from this function, regardless
          // of whether it went through createAndLogInputError() or not

          internalFrames = 1;
        }
      }
    }
    return [error, internalFrames];
  };
  var hasNecessaryFields = function (error) {
    return (typeof error.name === 'string' || typeof error.errorClass === 'string') && (typeof error.message === 'string' || typeof error.errorMessage === 'string');
  };
  var _$Event_6 = Event;

  // This is a heavily modified/simplified version of
  //   https://github.com/othiym23/async-some
  // with the logic flipped so that it is akin to the
  // synchronous "every" method instead of "some".
  // run the asynchronous test function (fn) over each item in the array (arr)
  // in series until:
  //   - fn(item, cb) => calls cb(null, false)
  //   - or the end of the array is reached
  // the callback (cb) will be passed (null, false) if any of the items in arr
  // caused fn to call back with false, otherwise it will be passed (null, true)
  var _$asyncEvery_7 = function (arr, fn, cb) {
    var index = 0;
    var next = function () {
      if (index >= arr.length) return cb(null, true);
      fn(arr[index], function (err, result) {
        if (err) return cb(err);
        if (result === false) return cb(null, false);
        index++;
        next();
      });
    };
    next();
  };

  /* removed: var _$asyncEvery_7 = require('./async-every'); */
  ;
  var _$callbackRunner_9 = function (callbacks, event, onCallbackError, cb) {
    // This function is how we support different kinds of callback:
    //  - synchronous - return value
    //  - node-style async with callback - cb(err, value)
    //  - promise/thenable - resolve(value)
    // It normalises each of these into the lowest common denominator – a node-style callback
    var runMaybeAsyncCallback = function (fn, cb) {
      if (typeof fn !== 'function') return cb(null);
      try {
        // if function appears sync…
        if (fn.length !== 2) {
          var ret = fn(event); // check if it returned a "thenable" (promise)

          if (ret && typeof ret.then === 'function') {
            return ret.then(
            // resolve
            function (val) {
              return setTimeout(function () {
                return cb(null, val);
              });
            },
            // reject
            function (err) {
              setTimeout(function () {
                onCallbackError(err);
                return cb(null, true);
              });
            });
          }
          return cb(null, ret);
        } // if function is async…

        fn(event, function (err, result) {
          if (err) {
            onCallbackError(err);
            return cb(null);
          }
          cb(null, result);
        });
      } catch (e) {
        onCallbackError(e);
        cb(null);
      }
    };
    _$asyncEvery_7(callbacks, runMaybeAsyncCallback, cb);
  };
  var _$syncCallbackRunner_23 = function (callbacks, callbackArg, callbackType, logger) {
    var ignore = false;
    var cbs = callbacks.slice();
    while (!ignore) {
      if (!cbs.length) break;
      try {
        ignore = cbs.pop()(callbackArg) === false;
      } catch (e) {
        logger.error("Error occurred in " + callbackType + " callback, continuing anyway\u2026");
        logger.error(e);
      }
    }
    return ignore;
  };
  var _$pad_29 = function pad(num, size) {
    var s = '000000000' + num;
    return s.substr(s.length - size);
  };

  /* removed: var _$pad_29 = require('./pad.js'); */
  ;
  var env = typeof window === 'object' ? window : self;
  var globalCount = 0;
  for (var prop in env) {
    if (Object.hasOwnProperty.call(env, prop)) globalCount++;
  }
  var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
  var clientId = _$pad_29((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
  var _$fingerprint_28 = function fingerprint() {
    return clientId;
  };

  /**
   * cuid.js
   * Collision-resistant UID generator for browsers and node.
   * Sequential for fast db lookups and recency sorting.
   * Safe for element IDs and server-side lookups.
   *
   * Extracted from CLCTR
   *
   * Copyright (c) Eric Elliott 2012
   * MIT License
   */
  /* removed: var _$fingerprint_28 = require('./lib/fingerprint.js'); */
  ;

  /* removed: var _$pad_29 = require('./lib/pad.js'); */
  ;
  var c = 0,
    blockSize = 4,
    base = 36,
    discreteValues = Math.pow(base, blockSize);
  function randomBlock() {
    return _$pad_29((Math.random() * discreteValues << 0).toString(base), blockSize);
  }
  function safeCounter() {
    c = c < discreteValues ? c : 0;
    c++; // this is not subliminal

    return c - 1;
  }
  function cuid() {
    // Starting with a lowercase letter makes
    // it HTML element ID friendly.
    var letter = 'c',
      // hard-coded allows for sequential access
      // timestamp
      // warning: this exposes the exact date and time
      // that the uid was created.
      timestamp = new Date().getTime().toString(base),
      // Prevent same-machine collisions.
      counter = _$pad_29(safeCounter().toString(base), blockSize),
      // A few chars to generate distinct ids for different
      // clients (so different computers are far less
      // likely to generate the same id)
      print = _$fingerprint_28(),
      // Grab some more chars from Math.random()
      random = randomBlock() + randomBlock();
    return letter + timestamp + counter + print + random;
  }
  cuid.fingerprint = _$fingerprint_28;
  var _$cuid_27 = cuid;

  /* removed: var _$cuid_27 = require('@bugsnag/cuid'); */
  ;
  var Session = /*#__PURE__*/
  function () {
    function Session() {
      this.id = _$cuid_27();
      this.startedAt = new Date();
      this._handled = 0;
      this._unhandled = 0;
      this._user = {};
      this.app = {};
      this.device = {};
    }
    var _proto = Session.prototype;
    _proto.getUser = function getUser() {
      return this._user;
    };
    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };
    _proto.toJSON = function toJSON() {
      return {
        id: this.id,
        startedAt: this.startedAt,
        events: {
          handled: this._handled,
          unhandled: this._unhandled
        }
      };
    };
    _proto._track = function _track(event) {
      this[event._handledState.unhandled ? '_unhandled' : '_handled'] += 1;
    };
    return Session;
  }();
  var _$Session_35 = Session;

  /* removed: var _$config_5 = require('./config'); */
  ;

  /* removed: var _$Event_6 = require('./event'); */
  ;

  /* removed: var _$Breadcrumb_3 = require('./breadcrumb'); */
  ;

  /* removed: var _$Session_35 = require('./session'); */
  ;

  /* removed: var _$map_16 = require('./lib/es-utils/map'); */
  ;

  /* removed: var _$includes_13 = require('./lib/es-utils/includes'); */
  ;

  /* removed: var _$filter_12 = require('./lib/es-utils/filter'); */
  ;

  /* removed: var _$reduce_17 = require('./lib/es-utils/reduce'); */
  ;

  /* removed: var _$keys_15 = require('./lib/es-utils/keys'); */
  ;

  /* removed: var _$assign_11 = require('./lib/es-utils/assign'); */
  ;

  /* removed: var _$callbackRunner_9 = require('./lib/callback-runner'); */
  ;

  /* removed: var _$metadataDelegate_22 = require('./lib/metadata-delegate'); */
  ;

  /* removed: var _$syncCallbackRunner_23 = require('./lib/sync-callback-runner'); */
  ;

  /* removed: var _$breadcrumbTypes_8 = require('./lib/breadcrumb-types'); */
  ;
  var noop = function () {};
  var Client = /*#__PURE__*/
  function () {
    function Client(configuration, schema, internalPlugins, notifier) {
      var _this = this;
      if (schema === void 0) {
        schema = _$config_5.schema;
      }
      if (internalPlugins === void 0) {
        internalPlugins = [];
      }

      // notifier id
      this._notifier = notifier; // intialise opts and config

      this._config = {};
      this._schema = schema; // i/o

      this._delivery = {
        sendSession: noop,
        sendEvent: noop
      };
      this._logger = {
        debug: noop,
        info: noop,
        warn: noop,
        error: noop
      }; // plugins

      this._plugins = {}; // state

      this._breadcrumbs = [];
      this._session = null;
      this._metadata = {};
      this._context = undefined;
      this._user = {}; // callbacks:
      //  e: onError
      //  s: onSession
      //  sp: onSessionPayload
      //  b: onBreadcrumb
      // (note these names are minified by hand because object
      // properties are not safe to minify automatically)

      this._cbs = {
        e: [],
        s: [],
        sp: [],
        b: []
      }; // expose internal constructors

      this.Client = Client;
      this.Event = _$Event_6;
      this.Breadcrumb = _$Breadcrumb_3;
      this.Session = _$Session_35;
      this._config = this._configure(configuration, internalPlugins);
      _$map_16(internalPlugins.concat(this._config.plugins), function (pl) {
        if (pl) _this._loadPlugin(pl);
      }); // when notify() is called we need to know how many frames are from our own source
      // this inital value is 1 not 0 because we wrap notify() to ensure it is always
      // bound to have the client as its `this` value – see below.

      this._depth = 1;
      var self = this;
      var notify = this.notify;
      this.notify = function () {
        return notify.apply(self, arguments);
      };
    }
    var _proto = Client.prototype;
    _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
      return _$metadataDelegate_22.add(this._metadata, section, keyOrObj, maybeVal);
    };
    _proto.getMetadata = function getMetadata(section, key) {
      return _$metadataDelegate_22.get(this._metadata, section, key);
    };
    _proto.clearMetadata = function clearMetadata(section, key) {
      return _$metadataDelegate_22.clear(this._metadata, section, key);
    };
    _proto.getContext = function getContext() {
      return this._context;
    };
    _proto.setContext = function setContext(c) {
      this._context = c;
    };
    _proto._configure = function _configure(opts, internalPlugins) {
      var schema = _$reduce_17(internalPlugins, function (schema, plugin) {
        if (plugin && plugin.configSchema) return _$assign_11({}, schema, plugin.configSchema);
        return schema;
      }, this._schema); // accumulate configuration and error messages

      var _reduce = _$reduce_17(_$keys_15(schema), function (accum, key) {
          var defaultValue = schema[key].defaultValue(opts[key]);
          if (opts[key] !== undefined) {
            var valid = schema[key].validate(opts[key]);
            if (!valid) {
              accum.errors[key] = schema[key].message;
              accum.config[key] = defaultValue;
            } else {
              if (schema[key].allowPartialObject) {
                accum.config[key] = _$assign_11(defaultValue, opts[key]);
              } else {
                accum.config[key] = opts[key];
              }
            }
          } else {
            accum.config[key] = defaultValue;
          }
          return accum;
        }, {
          errors: {},
          config: {}
        }),
        errors = _reduce.errors,
        config = _reduce.config;
      if (schema.apiKey) {
        // missing api key is the only fatal error
        if (!config.apiKey) throw new Error('No Bugsnag API Key set'); // warn about an apikey that is not of the expected format

        if (!/^[0-9a-f]{32}$/i.test(config.apiKey)) errors.apiKey = 'should be a string of 32 hexadecimal characters';
      } // update and elevate some options

      this._metadata = _$assign_11({}, config.metadata);
      this._user = _$assign_11({}, config.user);
      this._context = config.context;
      if (config.logger) this._logger = config.logger; // add callbacks

      if (config.onError) this._cbs.e = this._cbs.e.concat(config.onError);
      if (config.onBreadcrumb) this._cbs.b = this._cbs.b.concat(config.onBreadcrumb);
      if (config.onSession) this._cbs.s = this._cbs.s.concat(config.onSession); // finally warn about any invalid config where we fell back to the default

      if (_$keys_15(errors).length) {
        this._logger.warn(generateConfigErrorMessage(errors, opts));
      }
      return config;
    };
    _proto.getUser = function getUser() {
      return this._user;
    };
    _proto.setUser = function setUser(id, email, name) {
      this._user = {
        id: id,
        email: email,
        name: name
      };
    };
    _proto._loadPlugin = function _loadPlugin(plugin) {
      var result = plugin.load(this); // JS objects are not the safest way to store arbitrarily keyed values,
      // so bookend the key with some characters that prevent tampering with
      // stuff like __proto__ etc. (only store the result if the plugin had a
      // name)

      if (plugin.name) this._plugins["~" + plugin.name + "~"] = result;
      return this;
    };
    _proto.getPlugin = function getPlugin(name) {
      return this._plugins["~" + name + "~"];
    };
    _proto._setDelivery = function _setDelivery(d) {
      this._delivery = d(this);
    };
    _proto.startSession = function startSession() {
      var session = new _$Session_35();
      session.app.releaseStage = this._config.releaseStage;
      session.app.version = this._config.appVersion;
      session.app.type = this._config.appType;
      session._user = _$assign_11({}, this._user); // run onSession callbacks

      var ignore = _$syncCallbackRunner_23(this._cbs.s, session, 'onSession', this._logger);
      if (ignore) {
        this._logger.debug('Session not started due to onSession callback');
        return this;
      }
      return this._sessionDelegate.startSession(this, session);
    };
    _proto.addOnError = function addOnError(fn, front) {
      if (front === void 0) {
        front = false;
      }
      this._cbs.e[front ? 'unshift' : 'push'](fn);
    };
    _proto.removeOnError = function removeOnError(fn) {
      this._cbs.e = _$filter_12(this._cbs.e, function (f) {
        return f !== fn;
      });
    };
    _proto._addOnSessionPayload = function _addOnSessionPayload(fn) {
      this._cbs.sp.push(fn);
    };
    _proto.addOnSession = function addOnSession(fn) {
      this._cbs.s.push(fn);
    };
    _proto.removeOnSession = function removeOnSession(fn) {
      this._cbs.s = _$filter_12(this._cbs.s, function (f) {
        return f !== fn;
      });
    };
    _proto.addOnBreadcrumb = function addOnBreadcrumb(fn, front) {
      if (front === void 0) {
        front = false;
      }
      this._cbs.b[front ? 'unshift' : 'push'](fn);
    };
    _proto.removeOnBreadcrumb = function removeOnBreadcrumb(fn) {
      this._cbs.b = _$filter_12(this._cbs.b, function (f) {
        return f !== fn;
      });
    };
    _proto.pauseSession = function pauseSession() {
      return this._sessionDelegate.pauseSession(this);
    };
    _proto.resumeSession = function resumeSession() {
      return this._sessionDelegate.resumeSession(this);
    };
    _proto.leaveBreadcrumb = function leaveBreadcrumb(message, metadata, type) {
      // coerce bad values so that the defaults get set
      message = typeof message === 'string' ? message : '';
      type = typeof type === 'string' && _$includes_13(_$breadcrumbTypes_8, type) ? type : 'manual';
      metadata = typeof metadata === 'object' && metadata !== null ? metadata : {}; // if no message, discard

      if (!message) return;
      var crumb = new _$Breadcrumb_3(message, metadata, type); // run onBreadcrumb callbacks

      var ignore = _$syncCallbackRunner_23(this._cbs.b, crumb, 'onBreadcrumb', this._logger);
      if (ignore) {
        this._logger.debug('Breadcrumb not attached due to onBreadcrumb callback');
        return;
      } // push the valid crumb onto the queue and maintain the length

      this._breadcrumbs.push(crumb);
      if (this._breadcrumbs.length > this._config.maxBreadcrumbs) {
        this._breadcrumbs = this._breadcrumbs.slice(this._breadcrumbs.length - this._config.maxBreadcrumbs);
      }
    };
    _proto.notify = function notify(maybeError, onError, cb) {
      if (cb === void 0) {
        cb = noop;
      }
      var event = _$Event_6.create(maybeError, true, undefined, 'notify()', this._depth + 1, this._logger);
      this._notify(event, onError, cb);
    };
    _proto._notify = function _notify(event, onError, cb) {
      var _this2 = this;
      if (cb === void 0) {
        cb = noop;
      }
      event.app = _$assign_11({}, event.app, {
        releaseStage: this._config.releaseStage,
        version: this._config.appVersion,
        type: this._config.appType
      });
      event.context = event.context || this._context;
      event._metadata = _$assign_11({}, event._metadata, this._metadata);
      event._user = _$assign_11({}, event._user, this._user);
      event.breadcrumbs = this._breadcrumbs.slice();
      if (this._session) {
        this._session._track(event);
        event._session = this._session;
      } // exit early if events should not be sent on the current releaseStage

      if (this._config.enabledReleaseStages !== null && !_$includes_13(this._config.enabledReleaseStages, this._config.releaseStage)) {
        this._logger.warn('Event not sent due to releaseStage/enabledReleaseStages configuration');
        return cb(null, event);
      }
      var originalSeverity = event.severity;
      var onCallbackError = function (err) {
        // errors in callbacks are tolerated but we want to log them out
        _this2._logger.error('Error occurred in onError callback, continuing anyway…');
        _this2._logger.error(err);
      };
      var callbacks = [].concat(this._cbs.e).concat(onError);
      _$callbackRunner_9(callbacks, event, onCallbackError, function (err, shouldSend) {
        if (err) onCallbackError(err);
        if (!shouldSend) {
          _this2._logger.debug('Event not sent due to onError callback');
          return cb(null, event);
        }
        if (_$includes_13(_this2._config.enabledBreadcrumbTypes, 'error')) {
          // only leave a crumb for the error if actually got sent
          Client.prototype.leaveBreadcrumb.call(_this2, event.errors[0].errorClass, {
            errorClass: event.errors[0].errorClass,
            errorMessage: event.errors[0].errorMessage,
            severity: event.severity
          }, 'error');
        }
        if (originalSeverity !== event.severity) {
          event._handledState.severityReason = {
            type: 'userCallbackSetSeverity'
          };
        }
        _this2._delivery.sendEvent({
          apiKey: event.apiKey || _this2._config.apiKey,
          notifier: _this2._notifier,
          events: [event]
        }, function (err) {
          return cb(err, event);
        });
      });
    };
    return Client;
  }();
  var generateConfigErrorMessage = function (errors, rawInput) {
    var er = new Error("Invalid configuration\n" + _$map_16(_$keys_15(errors), function (key) {
      return "  - " + key + " " + errors[key] + ", got " + stringify(rawInput[key]);
    }).join('\n\n'));
    return er;
  };
  var stringify = function (val) {
    switch (typeof val) {
      case 'string':
      case 'number':
      case 'object':
        return JSON.stringify(val);
      default:
        return String(val);
    }
  };
  var _$Client_4 = Client;
  var _$safeJsonStringify_30 = function (data, replacer, space, opts) {
    var redactedKeys = opts && opts.redactedKeys ? opts.redactedKeys : [];
    var redactedPaths = opts && opts.redactedPaths ? opts.redactedPaths : [];
    return JSON.stringify(prepareObjForSerialization(data, redactedKeys, redactedPaths), replacer, space);
  };
  var MAX_DEPTH = 20;
  var MAX_EDGES = 25000;
  var MIN_PRESERVED_DEPTH = 8;
  var REPLACEMENT_NODE = '...';
  function __isError_30(o) {
    return o instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(o));
  }
  function throwsMessage(err) {
    return '[Throws: ' + (err ? err.message : '?') + ']';
  }
  function find(haystack, needle) {
    for (var i = 0, len = haystack.length; i < len; i++) {
      if (haystack[i] === needle) return true;
    }
    return false;
  } // returns true if the string `path` starts with any of the provided `paths`

  function isDescendent(paths, path) {
    for (var i = 0, len = paths.length; i < len; i++) {
      if (path.indexOf(paths[i]) === 0) return true;
    }
    return false;
  }
  function shouldRedact(patterns, key) {
    for (var i = 0, len = patterns.length; i < len; i++) {
      if (typeof patterns[i] === 'string' && patterns[i].toLowerCase() === key.toLowerCase()) return true;
      if (patterns[i] && typeof patterns[i].test === 'function' && patterns[i].test(key)) return true;
    }
    return false;
  }
  function __isArray_30(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }
  function safelyGetProp(obj, prop) {
    try {
      return obj[prop];
    } catch (err) {
      return throwsMessage(err);
    }
  }
  function prepareObjForSerialization(obj, redactedKeys, redactedPaths) {
    var seen = []; // store references to objects we have seen before

    var edges = 0;
    function visit(obj, path) {
      function edgesExceeded() {
        return path.length > MIN_PRESERVED_DEPTH && edges > MAX_EDGES;
      }
      edges++;
      if (path.length > MAX_DEPTH) return REPLACEMENT_NODE;
      if (edgesExceeded()) return REPLACEMENT_NODE;
      if (obj === null || typeof obj !== 'object') return obj;
      if (find(seen, obj)) return '[Circular]';
      seen.push(obj);
      if (typeof obj.toJSON === 'function') {
        try {
          // we're not going to count this as an edge because it
          // replaces the value of the currently visited object
          edges--;
          var fResult = visit(obj.toJSON(), path);
          seen.pop();
          return fResult;
        } catch (err) {
          return throwsMessage(err);
        }
      }
      var er = __isError_30(obj);
      if (er) {
        edges--;
        var eResult = visit({
          name: obj.name,
          message: obj.message
        }, path);
        seen.pop();
        return eResult;
      }
      if (__isArray_30(obj)) {
        var aResult = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          if (edgesExceeded()) {
            aResult.push(REPLACEMENT_NODE);
            break;
          }
          aResult.push(visit(obj[i], path.concat('[]')));
        }
        seen.pop();
        return aResult;
      }
      var result = {};
      try {
        for (var prop in obj) {
          if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;
          if (isDescendent(redactedPaths, path.join('.')) && shouldRedact(redactedKeys, prop)) {
            result[prop] = '[REDACTED]';
            continue;
          }
          if (edgesExceeded()) {
            result[prop] = REPLACEMENT_NODE;
            break;
          }
          result[prop] = visit(safelyGetProp(obj, prop), path.concat(prop));
        }
      } catch (e) {}
      seen.pop();
      return result;
    }
    return visit(obj, []);
  }
  var _$jsonPayload_21 = {};
  /* removed: var _$safeJsonStringify_30 = require('@bugsnag/safe-json-stringify'); */
  ;
  var EVENT_REDACTION_PATHS = ['events.[].metaData', 'events.[].breadcrumbs.[].metaData', 'events.[].request'];
  _$jsonPayload_21.event = function (event, redactedKeys) {
    var payload = _$safeJsonStringify_30(event, null, null, {
      redactedPaths: EVENT_REDACTION_PATHS,
      redactedKeys: redactedKeys
    });
    if (payload.length > 10e5) {
      event.events[0]._metadata = {
        notifier: "WARNING!\nSerialized payload was " + payload.length / 10e5 + "MB (limit = 1MB)\nmetadata was removed"
      };
      payload = _$safeJsonStringify_30(event, null, null, {
        redactedPaths: EVENT_REDACTION_PATHS,
        redactedKeys: redactedKeys
      });
      if (payload.length > 10e5) throw new Error('payload exceeded 1MB limit');
    }
    return payload;
  };
  _$jsonPayload_21.session = function (event, redactedKeys) {
    var payload = _$safeJsonStringify_30(event, null, null);
    if (payload.length > 10e5) throw new Error('payload exceeded 1MB limit');
    return payload;
  };
  var _$delivery_36 = {};
  /* removed: var _$jsonPayload_21 = require('@bugsnag/core/lib/json-payload'); */
  ;
  _$delivery_36 = function (client, win) {
    if (win === void 0) {
      win = window;
    }
    return {
      sendEvent: function (event, cb) {
        if (cb === void 0) {
          cb = function () {};
        }
        var url = getApiUrl(client._config, 'notify', '4', win);
        var req = new win.XDomainRequest();
        req.onload = function () {
          cb(null);
        };
        req.open('POST', url);
        setTimeout(function () {
          try {
            req.send(_$jsonPayload_21.event(event, client._config.redactedKeys));
          } catch (e) {
            client._logger.error(e);
            cb(e);
          }
        }, 0);
      },
      sendSession: function (session, cb) {
        if (cb === void 0) {
          cb = function () {};
        }
        var url = getApiUrl(client._config, 'sessions', '1', win);
        var req = new win.XDomainRequest();
        req.onload = function () {
          cb(null);
        };
        req.open('POST', url);
        setTimeout(function () {
          try {
            req.send(_$jsonPayload_21.session(session, client._config.redactedKeys));
          } catch (e) {
            client._logger.error(e);
            cb(e);
          }
        }, 0);
      }
    };
  };
  var getApiUrl = function (config, endpoint, version, win) {
    // IE8 doesn't support Date.prototype.toISOstring(), but it does convert a date
    // to an ISO string when you use JSON stringify. Simply parsing the result of
    // JSON.stringify is smaller than using a toISOstring() polyfill.
    var isoDate = JSON.parse(JSON.stringify(new Date()));
    var url = matchPageProtocol(config.endpoints[endpoint], win.location.protocol);
    return url + "?apiKey=" + encodeURIComponent(config.apiKey) + "&payloadVersion=" + version + "&sentAt=" + encodeURIComponent(isoDate);
  };
  var matchPageProtocol = _$delivery_36._matchPageProtocol = function (endpoint, pageProtocol) {
    return pageProtocol === 'http:' ? endpoint.replace(/^https:/, 'http:') : endpoint;
  };

  /* removed: var _$jsonPayload_21 = require('@bugsnag/core/lib/json-payload'); */
  ;
  var _$delivery_37 = function (client, win) {
    if (win === void 0) {
      win = window;
    }
    return {
      sendEvent: function (event, cb) {
        if (cb === void 0) {
          cb = function () {};
        }
        try {
          var url = client._config.endpoints.notify;
          var req = new win.XMLHttpRequest();
          req.onreadystatechange = function () {
            if (req.readyState === win.XMLHttpRequest.DONE) cb(null);
          };
          req.open('POST', url);
          req.setRequestHeader('Content-Type', 'application/json');
          req.setRequestHeader('Bugsnag-Api-Key', event.apiKey || client._config.apiKey);
          req.setRequestHeader('Bugsnag-Payload-Version', '4');
          req.setRequestHeader('Bugsnag-Sent-At', new Date().toISOString());
          req.send(_$jsonPayload_21.event(event, client._config.redactedKeys));
        } catch (e) {
          client._logger.error(e);
        }
      },
      sendSession: function (session, cb) {
        if (cb === void 0) {
          cb = function () {};
        }
        try {
          var url = client._config.endpoints.sessions;
          var req = new win.XMLHttpRequest();
          req.onreadystatechange = function () {
            if (req.readyState === win.XMLHttpRequest.DONE) cb(null);
          };
          req.open('POST', url);
          req.setRequestHeader('Content-Type', 'application/json');
          req.setRequestHeader('Bugsnag-Api-Key', client._config.apiKey);
          req.setRequestHeader('Bugsnag-Payload-Version', '1');
          req.setRequestHeader('Bugsnag-Sent-At', new Date().toISOString());
          req.send(_$jsonPayload_21.session(session, client._config.redactedKeys));
        } catch (e) {
          client._logger.error(e);
        }
      }
    };
  };
  var appStart = new Date();
  var _$app_38 = {
    load: function (client) {
      client.addOnError(function (event) {
        var now = new Date();
        event.app.duration = now - appStart;
      }, true);
    }
  };

  /*
   * Sets the default context to be the current URL
   */
  var _$context_39 = function (win) {
    if (win === void 0) {
      win = window;
    }
    return {
      load: function (client) {
        client.addOnError(function (event) {
          if (event.context !== undefined) return;
          event.context = win.location.pathname;
        }, true);
      }
    };
  };

  /* removed: var _$assign_11 = require('@bugsnag/core/lib/es-utils/assign'); */
  ;
  /*
   * Automatically detects browser device details
   */

  var _$device_40 = function (nav, screen) {
    if (nav === void 0) {
      nav = navigator;
    }
    if (screen === void 0) {
      screen = window.screen;
    }
    return {
      load: function (client) {
        var device = {
          locale: nav.browserLanguage || nav.systemLanguage || nav.userLanguage || nav.language,
          userAgent: nav.userAgent
        };
        if (screen && screen.orientation && screen.orientation.type) {
          device.orientation = screen.orientation.type;
        } else {
          device.orientation = document.documentElement.clientWidth > document.documentElement.clientHeight ? 'landscape' : 'portrait';
        }
        client.addOnSession(function (session) {
          session.device = _$assign_11({}, session.device, device);
        }); // add time just as the event is sent

        client.addOnError(function (event) {
          event.device = _$assign_11({}, event.device, device, {
            time: new Date()
          });
        }, true);
      }
    };
  };

  /* removed: var _$assign_11 = require('@bugsnag/core/lib/es-utils/assign'); */
  ;
  /*
   * Sets the event request: { url } to be the current href
   */

  var _$request_41 = function (win) {
    if (win === void 0) {
      win = window;
    }
    return {
      load: function (client) {
        client.addOnError(function (event) {
          if (event.request && event.request.url) return;
          event.request = _$assign_11({}, event.request, {
            url: win.location.href
          });
        }, true);
      }
    };
  };

  /* removed: var _$includes_13 = require('@bugsnag/core/lib/es-utils/includes'); */
  ;
  var _$session_42 = {
    load: function (client) {
      client._sessionDelegate = sessionDelegate;
    }
  };
  var sessionDelegate = {
    startSession: function (client, session) {
      var sessionClient = client;
      sessionClient._session = session;
      sessionClient._pausedSession = null; // exit early if the current releaseStage is not enabled

      if (sessionClient._config.enabledReleaseStages !== null && !_$includes_13(sessionClient._config.enabledReleaseStages, sessionClient._config.releaseStage)) {
        sessionClient._logger.warn('Session not sent due to releaseStage/enabledReleaseStages configuration');
        return sessionClient;
      }
      sessionClient._delivery.sendSession({
        notifier: sessionClient._notifier,
        device: session.device,
        app: session.app,
        sessions: [{
          id: session.id,
          startedAt: session.startedAt,
          user: session._user
        }]
      });
      return sessionClient;
    },
    resumeSession: function (client) {
      if (client._pausedSession) {
        client._session = client._pausedSession;
        client._pausedSession = null;
        return client;
      } else {
        return client.startSession();
      }
    },
    pauseSession: function (client) {
      client._pausedSession = client._session;
      client._session = null;
    }
  };

  /* removed: var _$assign_11 = require('@bugsnag/core/lib/es-utils/assign'); */
  ;
  /*
   * Prevent collection of user IPs
   */

  var _$clientIp_43 = {
    load: function (client) {
      if (client._config.collectUserIp) return;
      client.addOnError(function (event) {
        // If user.id is explicitly undefined, it will be missing from the payload. It needs
        // removing so that the following line replaces it
        if (event._user && typeof event._user.id === 'undefined') delete event._user.id;
        event._user = _$assign_11({
          id: '[REDACTED]'
        }, event._user);
        event.request = _$assign_11({
          clientIp: '[REDACTED]'
        }, event.request);
      });
    },
    configSchema: {
      collectUserIp: {
        defaultValue: function () {
          return true;
        },
        message: 'should be true|false',
        validate: function (value) {
          return value === true || value === false;
        }
      }
    }
  };
  var _$consoleBreadcrumbs_44 = {};
  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$reduce_17 = require('@bugsnag/core/lib/es-utils/reduce'); */
  ;

  /* removed: var _$filter_12 = require('@bugsnag/core/lib/es-utils/filter'); */
  ;

  /* removed: var _$includes_13 = require('@bugsnag/core/lib/es-utils/includes'); */
  ;
  /*
   * Leaves breadcrumbs when console log methods are called
   */

  _$consoleBreadcrumbs_44.load = function (client) {
    var isDev = /^dev(elopment)?$/.test(client._config.releaseStage);
    if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'log') || isDev) return;
    _$map_16(CONSOLE_LOG_METHODS, function (method) {
      var original = console[method];
      console[method] = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        client.leaveBreadcrumb('Console output', _$reduce_17(args, function (accum, arg, i) {
          // do the best/simplest stringification of each argument
          var stringified = '[Unknown value]'; // this may fail if the input is:
          // - an object whose [[Prototype]] is null (no toString)
          // - an object with a broken toString or @@toPrimitive implementation

          try {
            stringified = String(arg);
          } catch (e) {} // if it stringifies to [object Object] attempt to JSON stringify

          if (stringified === '[object Object]') {
            // catch stringify errors and fallback to [object Object]
            try {
              stringified = JSON.stringify(arg);
            } catch (e) {}
          }
          accum["[" + i + "]"] = stringified;
          return accum;
        }, {
          severity: method.indexOf('group') === 0 ? 'log' : method
        }), 'log');
        original.apply(console, args);
      };
      console[method]._restore = function () {
        console[method] = original;
      };
    });
  };
  if (false) {}
  var CONSOLE_LOG_METHODS = _$filter_12(['log', 'debug', 'info', 'warn', 'error'], function (method) {
    return typeof console !== 'undefined' && typeof console[method] === 'function';
  });

  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$reduce_17 = require('@bugsnag/core/lib/es-utils/reduce'); */
  ;

  /* removed: var _$filter_12 = require('@bugsnag/core/lib/es-utils/filter'); */
  ;
  var MAX_LINE_LENGTH = 200;
  var MAX_SCRIPT_LENGTH = 500000;
  var _$inlineScriptContent_45 = function (doc, win) {
    if (doc === void 0) {
      doc = document;
    }
    if (win === void 0) {
      win = window;
    }
    return {
      load: function (client) {
        if (!client._config.trackInlineScripts) return;
        var originalLocation = win.location.href;
        var html = '';
        var DOMContentLoaded = false;
        var getHtml = function () {
          return doc.documentElement.outerHTML;
        }; // get whatever HTML exists at this point in time

        html = getHtml();
        var prev = doc.onreadystatechange; // then update it when the DOM content has loaded

        doc.onreadystatechange = function () {
          // IE8 compatible alternative to document#DOMContentLoaded
          if (doc.readyState === 'interactive') {
            html = getHtml();
            DOMContentLoaded = true;
          }
          try {
            prev.apply(this, arguments);
          } catch (e) {}
        };
        var _lastScript = null;
        var updateLastScript = function (script) {
          _lastScript = script;
        };
        var getCurrentScript = function () {
          var script = doc.currentScript || _lastScript;
          if (!script && !DOMContentLoaded) {
            var scripts = doc.scripts || doc.getElementsByTagName('script');
            script = scripts[scripts.length - 1];
          }
          return script;
        };
        var addSurroundingCode = function (lineNumber) {
          // get whatever html has rendered at this point
          if (!DOMContentLoaded || !html) html = getHtml(); // simulate the raw html

          var htmlLines = ['<!-- DOC START -->'].concat(html.split('\n'));
          var zeroBasedLine = lineNumber - 1;
          var start = Math.max(zeroBasedLine - 3, 0);
          var end = Math.min(zeroBasedLine + 3, htmlLines.length);
          return _$reduce_17(htmlLines.slice(start, end), function (accum, line, i) {
            accum[start + 1 + i] = line.length <= MAX_LINE_LENGTH ? line : line.substr(0, MAX_LINE_LENGTH);
            return accum;
          }, {});
        };
        client.addOnError(function (event) {
          // remove any of our own frames that may be part the stack this
          // happens before the inline script check as it happens for all errors
          event.errors[0].stacktrace = _$filter_12(event.errors[0].stacktrace, function (f) {
            return !/__trace__$/.test(f.method);
          });
          var frame = event.errors[0].stacktrace[0]; // if frame.file exists and is not the original location of the page, this can't be an inline script

          if (frame && frame.file && frame.file.replace(/#.*$/, '') !== originalLocation.replace(/#.*$/, '')) return; // grab the last script known to have run

          var currentScript = getCurrentScript();
          if (currentScript) {
            var content = currentScript.innerHTML;
            event.addMetadata('script', 'content', content.length <= MAX_SCRIPT_LENGTH ? content : content.substr(0, MAX_SCRIPT_LENGTH));
          } // only attempt to grab some surrounding code if we have a line number

          if (!frame || !frame.lineNumber) return;
          frame.code = addSurroundingCode(frame.lineNumber);
        }, true); // Proxy all the timer functions whose callback is their 0th argument.
        // Keep a reference to the original setTimeout because we need it later

        var _map = _$map_16(['setTimeout', 'setInterval', 'setImmediate', 'requestAnimationFrame'], function (fn) {
            return __proxy(win, fn, function (original) {
              return __traceOriginalScript(original, function (args) {
                return {
                  get: function () {
                    return args[0];
                  },
                  replace: function (fn) {
                    args[0] = fn;
                  }
                };
              });
            });
          }),
          _setTimeout = _map[0]; // Proxy all the host objects whose prototypes have an addEventListener function

        _$map_16(['EventTarget', 'Window', 'Node', 'ApplicationCache', 'AudioTrackList', 'ChannelMergerNode', 'CryptoOperation', 'EventSource', 'FileReader', 'HTMLUnknownElement', 'IDBDatabase', 'IDBRequest', 'IDBTransaction', 'KeyOperation', 'MediaController', 'MessagePort', 'ModalWindow', 'Notification', 'SVGElementInstance', 'Screen', 'TextTrack', 'TextTrackCue', 'TextTrackList', 'WebSocket', 'WebSocketWorker', 'Worker', 'XMLHttpRequest', 'XMLHttpRequestEventTarget', 'XMLHttpRequestUpload'], function (o) {
          if (!win[o] || !win[o].prototype || !Object.prototype.hasOwnProperty.call(win[o].prototype, 'addEventListener')) return;
          __proxy(win[o].prototype, 'addEventListener', function (original) {
            return __traceOriginalScript(original, eventTargetCallbackAccessor);
          });
          __proxy(win[o].prototype, 'removeEventListener', function (original) {
            return __traceOriginalScript(original, eventTargetCallbackAccessor, true);
          });
        });
        function __traceOriginalScript(fn, callbackAccessor, alsoCallOriginal) {
          if (alsoCallOriginal === void 0) {
            alsoCallOriginal = false;
          }
          return function () {
            // this is required for removeEventListener to remove anything added with
            // addEventListener before the functions started being wrapped by Bugsnag
            var args = [].slice.call(arguments);
            try {
              var cba = callbackAccessor(args);
              var cb = cba.get();
              if (alsoCallOriginal) fn.apply(this, args);
              if (typeof cb !== 'function') return fn.apply(this, args);
              if (cb.__trace__) {
                cba.replace(cb.__trace__);
              } else {
                var script = getCurrentScript(); // this function mustn't be annonymous due to a bug in the stack
                // generation logic, meaning it gets tripped up
                // see: https://github.com/stacktracejs/stack-generator/issues/6

                cb.__trace__ = function __trace__() {
                  // set the script that called this function
                  updateLastScript(script); // immediately unset the currentScript synchronously below, however
                  // if this cb throws an error the line after will not get run so schedule
                  // an almost-immediate aysnc update too

                  _setTimeout(function () {
                    updateLastScript(null);
                  }, 0);
                  var ret = cb.apply(this, arguments);
                  updateLastScript(null);
                  return ret;
                };
                cb.__trace__.__trace__ = cb.__trace__;
                cba.replace(cb.__trace__);
              }
            } catch (e) {} // swallow these errors on Selenium:
            // Permission denied to access property '__trace__'
            // WebDriverException: Message: Permission denied to access property "handleEvent"
            // IE8 doesn't let you call .apply() on setTimeout/setInterval

            if (fn.apply) return fn.apply(this, args);
            switch (args.length) {
              case 1:
                return fn(args[0]);
              case 2:
                return fn(args[0], args[1]);
              default:
                return fn();
            }
          };
        }
      },
      configSchema: {
        trackInlineScripts: {
          validate: function (value) {
            return value === true || value === false;
          },
          defaultValue: function () {
            return true;
          },
          message: 'should be true|false'
        }
      }
    };
  };
  function __proxy(host, name, replacer) {
    var original = host[name];
    if (!original) return original;
    var replacement = replacer(original);
    host[name] = replacement;
    return original;
  }
  function eventTargetCallbackAccessor(args) {
    var isEventHandlerObj = !!args[1] && typeof args[1].handleEvent === 'function';
    return {
      get: function () {
        return isEventHandlerObj ? args[1].handleEvent : args[1];
      },
      replace: function (fn) {
        if (isEventHandlerObj) {
          args[1].handleEvent = fn;
        } else {
          args[1] = fn;
        }
      }
    };
  }

  /* removed: var _$includes_13 = require('@bugsnag/core/lib/es-utils/includes'); */
  ;
  /*
   * Leaves breadcrumbs when the user interacts with the DOM
   */

  var _$interactionBreadcrumbs_46 = function (win) {
    if (win === void 0) {
      win = window;
    }
    return {
      load: function (client) {
        if (!('addEventListener' in win)) return;
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'user')) return;
        win.addEventListener('click', function (event) {
          var targetText, targetSelector;
          try {
            targetText = getNodeText(event.target);
            targetSelector = getNodeSelector(event.target, win);
          } catch (e) {
            targetText = '[hidden]';
            targetSelector = '[hidden]';
            client._logger.error('Cross domain error when tracking click event. See docs: https://tinyurl.com/yy3rn63z');
          }
          client.leaveBreadcrumb('UI click', {
            targetText: targetText,
            targetSelector: targetSelector
          }, 'user');
        }, true);
      }
    };
  }; // extract text content from a element

  var getNodeText = function (el) {
    var text = el.textContent || el.innerText || '';
    if (!text && (el.type === 'submit' || el.type === 'button')) text = el.value;
    text = text.replace(/^\s+|\s+$/g, ''); // trim whitespace

    return truncate(text, 140);
  }; // Create a label from tagname, id and css class of the element

  function getNodeSelector(el, win) {
    var parts = [el.tagName];
    if (el.id) parts.push('#' + el.id);
    if (el.className && el.className.length) parts.push("." + el.className.split(' ').join('.')); // Can't get much more advanced with the current browser

    if (!win.document.querySelectorAll || !Array.prototype.indexOf) return parts.join('');
    try {
      if (win.document.querySelectorAll(parts.join('')).length === 1) return parts.join('');
    } catch (e) {
      // Sometimes the query selector can be invalid just return it as-is
      return parts.join('');
    } // try to get a more specific selector if this one matches more than one element

    if (el.parentNode.childNodes.length > 1) {
      var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el) + 1;
      parts.push(":nth-child(" + index + ")");
    }
    if (win.document.querySelectorAll(parts.join('')).length === 1) return parts.join(''); // try prepending the parent node selector

    if (el.parentNode) return getNodeSelector(el.parentNode, win) + " > " + parts.join('');
    return parts.join('');
  }
  function truncate(value, length) {
    var ommision = '(...)';
    if (value && value.length <= length) return value;
    return value.slice(0, length - ommision.length) + ommision;
  }
  var _$navigationBreadcrumbs_47 = {};
  /* removed: var _$includes_13 = require('@bugsnag/core/lib/es-utils/includes'); */
  ;
  /*
  * Leaves breadcrumbs when navigation methods are called or events are emitted
  */

  _$navigationBreadcrumbs_47 = function (win) {
    if (win === void 0) {
      win = window;
    }
    var plugin = {
      load: function (client) {
        if (!('addEventListener' in win)) return;
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'navigation')) return; // returns a function that will drop a breadcrumb with a given name

        var drop = function (name) {
          return function () {
            return client.leaveBreadcrumb(name, {}, 'navigation');
          };
        }; // simple drops – just names, no meta

        win.addEventListener('pagehide', drop('Page hidden'), true);
        win.addEventListener('pageshow', drop('Page shown'), true);
        win.addEventListener('load', drop('Page loaded'), true);
        win.document.addEventListener('DOMContentLoaded', drop('DOMContentLoaded'), true); // some browsers like to emit popstate when the page loads, so only add the popstate listener after that

        win.addEventListener('load', function () {
          return win.addEventListener('popstate', drop('Navigated back'), true);
        }); // hashchange has some metadata that we care about

        win.addEventListener('hashchange', function (event) {
          var metadata = event.oldURL ? {
            from: relativeLocation(event.oldURL, win),
            to: relativeLocation(event.newURL, win),
            state: getCurrentState(win)
          } : {
            to: relativeLocation(win.location.href, win)
          };
          client.leaveBreadcrumb('Hash changed', metadata, 'navigation');
        }, true); // the only way to know about replaceState/pushState is to wrap them… >_<

        if (win.history.replaceState) wrapHistoryFn(client, win.history, 'replaceState', win);
        if (win.history.pushState) wrapHistoryFn(client, win.history, 'pushState', win);
        client.leaveBreadcrumb('Bugsnag loaded', {}, 'navigation');
      }
    };
    if (false) {}
    return plugin;
  };
  if (false) {} // takes a full url like http://foo.com:1234/pages/01.html?yes=no#section-2 and returns
  // just the path and hash parts, e.g. /pages/01.html?yes=no#section-2

  var relativeLocation = function (url, win) {
    var a = win.document.createElement('A');
    a.href = url;
    return "" + a.pathname + a.search + a.hash;
  };
  var stateChangeToMetadata = function (win, state, title, url) {
    var currentPath = relativeLocation(win.location.href, win);
    return {
      title: title,
      state: state,
      prevState: getCurrentState(win),
      to: url || currentPath,
      from: currentPath
    };
  };
  var wrapHistoryFn = function (client, target, fn, win) {
    var orig = target[fn];
    target[fn] = function (state, title, url) {
      client.leaveBreadcrumb("History " + fn, stateChangeToMetadata(win, state, title, url), 'navigation'); // if throttle plugin is in use, reset the event sent count

      if (typeof client.resetEventCount === 'function') client.resetEventCount(); // if the client is operating in auto session-mode, a new route should trigger a new session

      if (client._config.autoTrackSessions) client.startSession(); // Internet Explorer will convert `undefined` to a string when passed, causing an unintended redirect
      // to '/undefined'. therefore we only pass the url if it's not undefined.

      orig.apply(target, [state, title].concat(url !== undefined ? url : []));
    };
    if (false) {}
  };
  var getCurrentState = function (win) {
    try {
      return win.history.state;
    } catch (e) {}
  };
  var BREADCRUMB_TYPE = 'request'; // keys to safely store metadata on the request object

  var REQUEST_SETUP_KEY = 'BS~~S';
  var REQUEST_URL_KEY = 'BS~~U';
  var REQUEST_METHOD_KEY = 'BS~~M';

  /* removed: var _$includes_13 = require('@bugsnag/core/lib/es-utils/includes'); */
  ;
  /*
   * Leaves breadcrumbs when network requests occur
   */

  var _$networkBreadcrumbs_48 = function (_ignoredUrls, win) {
    if (_ignoredUrls === void 0) {
      _ignoredUrls = [];
    }
    if (win === void 0) {
      win = window;
    }
    var restoreFunctions = [];
    var plugin = {
      load: function (client) {
        if (!client._config.enabledBreadcrumbTypes || !_$includes_13(client._config.enabledBreadcrumbTypes, 'request')) return;
        var ignoredUrls = [client._config.endpoints.notify, client._config.endpoints.sessions].concat(_ignoredUrls);
        monkeyPatchXMLHttpRequest();
        monkeyPatchFetch(); // XMLHttpRequest monkey patch

        function monkeyPatchXMLHttpRequest() {
          if (!('addEventListener' in win.XMLHttpRequest.prototype)) return;
          var nativeOpen = win.XMLHttpRequest.prototype.open; // override native open()

          win.XMLHttpRequest.prototype.open = function open(method, url) {
            // store url and HTTP method for later
            this[REQUEST_URL_KEY] = url;
            this[REQUEST_METHOD_KEY] = method; // if we have already setup listeners, it means open() was called twice, we need to remove
            // the listeners and recreate them

            if (this[REQUEST_SETUP_KEY]) {
              this.removeEventListener('load', handleXHRLoad);
              this.removeEventListener('error', handleXHRError);
            } // attach load event listener

            this.addEventListener('load', handleXHRLoad); // attach error event listener

            this.addEventListener('error', handleXHRError);
            this[REQUEST_SETUP_KEY] = true;
            nativeOpen.apply(this, arguments);
          };
          if (false) {}
        }
        function handleXHRLoad() {
          if (_$includes_13(ignoredUrls, this[REQUEST_URL_KEY])) {
            // don't leave a network breadcrumb from bugsnag notify calls
            return;
          }
          var metadata = {
            status: this.status,
            request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
          };
          if (this.status >= 400) {
            // contacted server but got an error response
            client.leaveBreadcrumb('XMLHttpRequest failed', metadata, BREADCRUMB_TYPE);
          } else {
            client.leaveBreadcrumb('XMLHttpRequest succeeded', metadata, BREADCRUMB_TYPE);
          }
        }
        function handleXHRError() {
          if (_$includes_13(ignoredUrls, this[REQUEST_URL_KEY])) {
            // don't leave a network breadcrumb from bugsnag notify calls
            return;
          } // failed to contact server

          client.leaveBreadcrumb('XMLHttpRequest error', {
            request: this[REQUEST_METHOD_KEY] + " " + this[REQUEST_URL_KEY]
          }, BREADCRUMB_TYPE);
        } // window.fetch monkey patch

        function monkeyPatchFetch() {
          // only patch it if it exists and if it is not a polyfill (patching a polyfilled
          // fetch() results in duplicate breadcrumbs for the same request because the
          // implementation uses XMLHttpRequest which is also patched)
          if (!('fetch' in win) || win.fetch.polyfill) return;
          var oldFetch = win.fetch;
          win.fetch = function fetch() {
            var _arguments = arguments;
            var urlOrRequest = arguments[0];
            var options = arguments[1];
            var method;
            var url = null;
            if (urlOrRequest && typeof urlOrRequest === 'object') {
              url = urlOrRequest.url;
              if (options && 'method' in options) {
                method = options.method;
              } else if (urlOrRequest && 'method' in urlOrRequest) {
                method = urlOrRequest.method;
              }
            } else {
              url = urlOrRequest;
              if (options && 'method' in options) {
                method = options.method;
              }
            }
            if (method === undefined) {
              method = 'GET';
            }
            return new Promise(function (resolve, reject) {
              // pass through to native fetch
              oldFetch.apply(void 0, _arguments).then(function (response) {
                handleFetchSuccess(response, method, url);
                resolve(response);
              })["catch"](function (error) {
                handleFetchError(method, url);
                reject(error);
              });
            });
          };
          if (false) {}
        }
        var handleFetchSuccess = function (response, method, url) {
          var metadata = {
            status: response.status,
            request: method + " " + url
          };
          if (response.status >= 400) {
            // when the request comes back with a 4xx or 5xx status it does not reject the fetch promise,
            client.leaveBreadcrumb('fetch() failed', metadata, BREADCRUMB_TYPE);
          } else {
            client.leaveBreadcrumb('fetch() succeeded', metadata, BREADCRUMB_TYPE);
          }
        };
        var handleFetchError = function (method, url) {
          client.leaveBreadcrumb('fetch() error', {
            request: method + " " + url
          }, BREADCRUMB_TYPE);
        };
      }
    };
    if (false) {}
    return plugin;
  };

  /* removed: var _$intRange_24 = require('@bugsnag/core/lib/validators/int-range'); */
  ;
  /*
   * Throttles and dedupes events
   */

  var _$throttle_49 = {
    load: function (client) {
      // track sent events for each init of the plugin
      var n = 0; // add onError hook

      client.addOnError(function (event) {
        // have max events been sent already?
        if (n >= client._config.maxEvents) return false;
        n++;
      });
      client.resetEventCount = function () {
        n = 0;
      };
    },
    configSchema: {
      maxEvents: {
        defaultValue: function () {
          return 10;
        },
        message: 'should be a positive integer ≤100',
        validate: function (val) {
          return _$intRange_24(1, 100)(val);
        }
      }
    }
  };
  var _$stripQueryString_50 = {};
  /*
   * Remove query strings (and fragments) from stacktraces
   */
  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$reduce_17 = require('@bugsnag/core/lib/es-utils/reduce'); */
  ;
  _$stripQueryString_50 = {
    load: function (client) {
      client.addOnError(function (event) {
        var allFrames = _$reduce_17(event.errors, function (accum, er) {
          return accum.concat(er.stacktrace);
        }, []);
        _$map_16(allFrames, function (frame) {
          frame.file = strip(frame.file);
        });
      });
    }
  };
  var strip = _$stripQueryString_50._strip = function (str) {
    return typeof str === 'string' ? str.replace(/\?.*$/, '').replace(/#.*$/, '') : str;
  };

  /*
   * Automatically notifies Bugsnag when window.onerror is called
   */
  var _$onerror_51 = function (win) {
    if (win === void 0) {
      win = window;
    }
    return {
      load: function (client) {
        if (!client._config.autoDetectErrors) return;
        if (!client._config.enabledErrorTypes.unhandledExceptions) return;
        function onerror(messageOrEvent, url, lineNo, charNo, error) {
          // Ignore errors with no info due to CORS settings
          if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
            client._logger.warn('Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/yy3rn63z');
          } else {
            // any error sent to window.onerror is unhandled and has severity=error
            var handledState = {
              severity: 'error',
              unhandled: true,
              severityReason: {
                type: 'unhandledException'
              }
            };
            var event; // window.onerror can be called in a number of ways. This big if-else is how we
            // figure out which arguments were supplied, and what kind of values it received.

            if (error) {
              // if the last parameter (error) was supplied, this is a modern browser's
              // way of saying "this value was thrown and not caught"
              event = client.Event.create(error, true, handledState, 'window onerror', 1);
              decorateStack(event.errors[0].stacktrace, url, lineNo, charNo);
            } else if (
            // This complex case detects "error" events that are typically synthesised
            // by jquery's trigger method (although can be created in other ways). In
            // order to detect this:
            // - the first argument (message) must exist and be an object (most likely it's a jQuery event)
            // - the second argument (url) must either not exist or be something other than a string (if it
            //    exists and is not a string, it'll be the extraParameters argument from jQuery's trigger()
            //    function)
            // - the third, fourth and fifth arguments must not exist (lineNo, charNo and error)
            typeof messageOrEvent === 'object' && messageOrEvent !== null && (!url || typeof url !== 'string') && !lineNo && !charNo && !error) {
              // The jQuery event may have a "type" property, if so use it as part of the error message
              var name = messageOrEvent.type ? "Event: " + messageOrEvent.type : 'Error'; // attempt to find a message from one of the conventional properties, but
              // default to empty string (the event will fill it with a placeholder)

              var message = messageOrEvent.message || messageOrEvent.detail || '';
              event = client.Event.create({
                name: name,
                message: message
              }, true, handledState, 'window onerror', 1); // provide the original thing onerror received – not our error-like object we passed to _notify

              event.originalError = messageOrEvent; // include the raw input as metadata – it might contain more info than we extracted

              event.addMetadata('window onerror', {
                event: messageOrEvent,
                extraParameters: url
              });
            } else {
              // Lastly, if there was no "error" parameter this event was probably from an old
              // browser that doesn't support that. Instead we need to generate a stacktrace.
              event = client.Event.create(messageOrEvent, true, handledState, 'window onerror', 1);
              decorateStack(event.errors[0].stacktrace, url, lineNo, charNo);
            }
            client._notify(event);
          }
          if (typeof prevOnError === 'function') prevOnError.apply(this, arguments);
        }
        var prevOnError = win.onerror;
        win.onerror = onerror;
      }
    };
  }; // Sometimes the stacktrace has less information than was passed to window.onerror.
  // This function will augment the first stackframe with any useful info that was
  // received as arguments to the onerror callback.

  var decorateStack = function (stack, url, lineNo, charNo) {
    if (!stack[0]) stack.push({});
    var culprit = stack[0];
    if (!culprit.file && typeof url === 'string') culprit.file = url;
    if (!culprit.lineNumber && isActualNumber(lineNo)) culprit.lineNumber = lineNo;
    if (!culprit.columnNumber) {
      if (isActualNumber(charNo)) {
        culprit.columnNumber = charNo;
      } else if (window.event && isActualNumber(window.event.errorCharacter)) {
        culprit.columnNumber = window.event.errorCharacter;
      }
    }
  };
  var isActualNumber = function (n) {
    return typeof n === 'number' && String.call(n) !== 'NaN';
  };

  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$iserror_19 = require('@bugsnag/core/lib/iserror'); */
  ;
  var _listener;
  /*
   * Automatically notifies Bugsnag when window.onunhandledrejection is called
   */

  var _$unhandledRejection_52 = function (win) {
    if (win === void 0) {
      win = window;
    }
    var plugin = {
      load: function (client) {
        if (!client._config.autoDetectErrors || !client._config.enabledErrorTypes.unhandledRejections) return;
        var listener = function (evt) {
          var error = evt.reason;
          var isBluebird = false; // accessing properties on evt.detail can throw errors (see #394)

          try {
            if (evt.detail && evt.detail.reason) {
              error = evt.detail.reason;
              isBluebird = true;
            }
          } catch (e) {}
          var event = client.Event.create(error, false, {
            severity: 'error',
            unhandled: true,
            severityReason: {
              type: 'unhandledPromiseRejection'
            }
          }, 'unhandledrejection handler', 1, client._logger);
          if (isBluebird) {
            _$map_16(event.errors[0].stacktrace, fixBluebirdStacktrace(error));
          }
          client._notify(event, function (event) {
            if (_$iserror_19(event.originalError) && !event.originalError.stack) {
              var _event$addMetadata;
              event.addMetadata('unhandledRejection handler', (_event$addMetadata = {}, _event$addMetadata[Object.prototype.toString.call(event.originalError)] = {
                name: event.originalError.name,
                message: event.originalError.message,
                code: event.originalError.code
              }, _event$addMetadata));
            }
          });
        };
        if ('addEventListener' in win) {
          win.addEventListener('unhandledrejection', listener);
        } else {
          win.onunhandledrejection = function (reason, promise) {
            listener({
              detail: {
                reason: reason,
                promise: promise
              }
            });
          };
        }
        _listener = listener;
      }
    };
    if (false) {}
    return plugin;
  }; // The stack parser on bluebird stacks in FF get a suprious first frame:
  //
  // Error: derp
  //   b@http://localhost:5000/bluebird.html:22:24
  //   a@http://localhost:5000/bluebird.html:18:9
  //   @http://localhost:5000/bluebird.html:14:9
  //
  // results in
  //   […]
  //     0: Object { file: "Error: derp", method: undefined, lineNumber: undefined, … }
  //     1: Object { file: "http://localhost:5000/bluebird.html", method: "b", lineNumber: 22, … }
  //     2: Object { file: "http://localhost:5000/bluebird.html", method: "a", lineNumber: 18, … }
  //     3: Object { file: "http://localhost:5000/bluebird.html", lineNumber: 14, columnNumber: 9, … }
  //
  // so the following reduce/accumulator function removes such frames
  //
  // Bluebird pads method names with spaces so trim that too…
  // https://github.com/petkaantonov/bluebird/blob/b7f21399816d02f979fe434585334ce901dcaf44/src/debuggability.js#L568-L571

  var fixBluebirdStacktrace = function (error) {
    return function (frame) {
      if (frame.file === error.toString()) return;
      if (frame.method) {
        frame.method = frame.method.replace(/^\s+/, '');
      }
    };
  };
  var _$notifier_2 = {};
  var name = 'Bugsnag JavaScript';
  var version = '7.3.3';
  var url = 'https://github.com/bugsnag/bugsnag-js';

  /* removed: var _$Client_4 = require('@bugsnag/core/client'); */
  ;

  /* removed: var _$Event_6 = require('@bugsnag/core/event'); */
  ;

  /* removed: var _$Session_35 = require('@bugsnag/core/session'); */
  ;

  /* removed: var _$Breadcrumb_3 = require('@bugsnag/core/breadcrumb'); */
  ;

  /* removed: var _$map_16 = require('@bugsnag/core/lib/es-utils/map'); */
  ;

  /* removed: var _$keys_15 = require('@bugsnag/core/lib/es-utils/keys'); */
  ;

  /* removed: var _$assign_11 = require('@bugsnag/core/lib/es-utils/assign'); */
  ; // extend the base config schema with some browser-specific options

  var __schema_2 = _$assign_11({}, _$config_5.schema, _$config_1);

  /* removed: var _$onerror_51 = require('@bugsnag/plugin-window-onerror'); */
  ;

  /* removed: var _$unhandledRejection_52 = require('@bugsnag/plugin-window-unhandled-rejection'); */
  ;

  /* removed: var _$app_38 = require('@bugsnag/plugin-app-duration'); */
  ;

  /* removed: var _$device_40 = require('@bugsnag/plugin-browser-device'); */
  ;

  /* removed: var _$context_39 = require('@bugsnag/plugin-browser-context'); */
  ;

  /* removed: var _$request_41 = require('@bugsnag/plugin-browser-request'); */
  ;

  /* removed: var _$throttle_49 = require('@bugsnag/plugin-simple-throttle'); */
  ;

  /* removed: var _$consoleBreadcrumbs_44 = require('@bugsnag/plugin-console-breadcrumbs'); */
  ;

  /* removed: var _$networkBreadcrumbs_48 = require('@bugsnag/plugin-network-breadcrumbs'); */
  ;

  /* removed: var _$navigationBreadcrumbs_47 = require('@bugsnag/plugin-navigation-breadcrumbs'); */
  ;

  /* removed: var _$interactionBreadcrumbs_46 = require('@bugsnag/plugin-interaction-breadcrumbs'); */
  ;

  /* removed: var _$inlineScriptContent_45 = require('@bugsnag/plugin-inline-script-content'); */
  ;

  /* removed: var _$session_42 = require('@bugsnag/plugin-browser-session'); */
  ;

  /* removed: var _$clientIp_43 = require('@bugsnag/plugin-client-ip'); */
  ;

  /* removed: var _$stripQueryString_50 = require('@bugsnag/plugin-strip-query-string'); */
  ; // delivery mechanisms

  /* removed: var _$delivery_36 = require('@bugsnag/delivery-x-domain-request'); */
  ;

  /* removed: var _$delivery_37 = require('@bugsnag/delivery-xml-http-request'); */
  ;
  var Bugsnag = {
    _client: null,
    createClient: function (opts) {
      // handle very simple use case where user supplies just the api key as a string
      if (typeof opts === 'string') opts = {
        apiKey: opts
      };
      if (!opts) opts = {};
      var internalPlugins = [
      // add browser-specific plugins
      _$app_38, _$device_40(), _$context_39(), _$request_41(), _$throttle_49, _$session_42, _$clientIp_43, _$stripQueryString_50, _$onerror_51(), _$unhandledRejection_52(), _$navigationBreadcrumbs_47(), _$interactionBreadcrumbs_46(), _$networkBreadcrumbs_48(), _$consoleBreadcrumbs_44,
      // this one added last to avoid wrapping functionality before bugsnag uses it
      _$inlineScriptContent_45()]; // configure a client with user supplied options

      var bugsnag = new _$Client_4(opts, __schema_2, internalPlugins, {
        name: name,
        version: version,
        url: url
      }); // set delivery based on browser capability (IE 8+9 have an XDomainRequest object)

      bugsnag._setDelivery(window.XDomainRequest ? _$delivery_36 : _$delivery_37);
      bugsnag._logger.debug('Loaded!');
      return bugsnag._config.autoTrackSessions ? bugsnag.startSession() : bugsnag;
    },
    start: function (opts) {
      if (Bugsnag._client) {
        Bugsnag._client._logger.warn('Bugsnag.start() was called more than once. Ignoring.');
        return Bugsnag._client;
      }
      Bugsnag._client = Bugsnag.createClient(opts);
      return Bugsnag._client;
    }
  };
  _$map_16(['resetEventCount'].concat(_$keys_15(_$Client_4.prototype)), function (m) {
    if (/^_/.test(m)) return;
    Bugsnag[m] = function () {
      if (!Bugsnag._client) return console.log("Bugsnag." + m + "() was called before Bugsnag.start()");
      Bugsnag._client._depth += 1;
      var ret = Bugsnag._client[m].apply(Bugsnag._client, arguments);
      Bugsnag._client._depth -= 1;
      return ret;
    };
  });
  _$notifier_2 = Bugsnag;
  _$notifier_2.Client = _$Client_4;
  _$notifier_2.Event = _$Event_6;
  _$notifier_2.Session = _$Session_35;
  _$notifier_2.Breadcrumb = _$Breadcrumb_3; // Export a "default" property for compatibility with ESM imports

  _$notifier_2["default"] = Bugsnag;
  return _$notifier_2;
});

/***/ }),

/***/ "BOnt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("TqRt");var _gatsby=__webpack_require__("Wbzz");var _catchLinks=_interopRequireDefault(__webpack_require__("hqbx"));exports.onClientEntry=function(_,pluginOptions){if(pluginOptions===void 0){pluginOptions={};}(0,_catchLinks.default)(window,pluginOptions,function(href){(0,_gatsby.navigate)(href);});};

/***/ }),

/***/ "BsWD":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _unsupportedIterableToArray; });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a3WO");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return Object(_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Object(_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(o, minLen);
}

/***/ }),

/***/ "DSFK":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayWithHoles; });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "DdF7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.__esModule=true;exports.hasEntries=hasEntries;function hasEntries(object){if(!object)return false;return Object.entries(object).length>0;}

/***/ }),

/***/ "E8R+":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ED4I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createStyles; });
function createStyles(styles) {
  return styles;
}

/***/ }),

/***/ "Enzk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.ScrollHandler = exports.ScrollContext = void 0;

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__("PJYZ"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__("VbXa"));

var React = _interopRequireWildcard(__webpack_require__("q1tI"));

var _propTypes = _interopRequireDefault(__webpack_require__("17x9"));

var _sessionStorage = __webpack_require__("/hTd");

var ScrollContext = React.createContext(new _sessionStorage.SessionStorage());
exports.ScrollContext = ScrollContext;
ScrollContext.displayName = "GatsbyScrollContext";

var ScrollHandler = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollHandler, _React$Component);

  function ScrollHandler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this._stateStorage = new _sessionStorage.SessionStorage();

    _this.scrollListener = function () {
      var key = _this.props.location.key;

      if (key) {
        _this._stateStorage.save(_this.props.location, key, window.scrollY);
      }
    };

    _this.windowScroll = function (position, prevProps) {
      if (_this.shouldUpdateScroll(prevProps, _this.props)) {
        window.scrollTo(0, position);
      }
    };

    _this.scrollToHash = function (hash, prevProps) {
      var node = document.getElementById(hash.substring(1));

      if (node && _this.shouldUpdateScroll(prevProps, _this.props)) {
        node.scrollIntoView();
      }
    };

    _this.shouldUpdateScroll = function (prevRouterProps, routerProps) {
      var shouldUpdateScroll = _this.props.shouldUpdateScroll;

      if (!shouldUpdateScroll) {
        return true;
      } // Hack to allow accessing this._stateStorage.


      return shouldUpdateScroll.call((0, _assertThisInitialized2.default)(_this), prevRouterProps, routerProps);
    };

    return _this;
  }

  var _proto = ScrollHandler.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
    var scrollPosition;
    var _this$props$location = this.props.location,
        key = _this$props$location.key,
        hash = _this$props$location.hash;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (scrollPosition) {
      this.windowScroll(scrollPosition, undefined);
    } else if (hash) {
      this.scrollToHash(decodeURI(hash), undefined);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var _this$props$location2 = this.props.location,
        hash = _this$props$location2.hash,
        key = _this$props$location2.key;
    var scrollPosition;

    if (key) {
      scrollPosition = this._stateStorage.read(this.props.location, key);
    }

    if (hash && scrollPosition === 0) {
      this.scrollToHash(decodeURI(hash), prevProps);
    } else {
      this.windowScroll(scrollPosition, prevProps);
    }
  };

  _proto.render = function render() {
    return /*#__PURE__*/React.createElement(ScrollContext.Provider, {
      value: this._stateStorage
    }, this.props.children);
  };

  return ScrollHandler;
}(React.Component);

exports.ScrollHandler = ScrollHandler;
ScrollHandler.propTypes = {
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired,
  location: _propTypes.default.object.isRequired
};

/***/ }),

/***/ "Ff2n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutProperties; });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("zLVn");

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = Object(_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}

/***/ }),

/***/ "GddB":
/***/ (function(module, exports, __webpack_require__) {

const React=__webpack_require__("q1tI");const Bugsnag=__webpack_require__("NTr2").default;const BugsnagPluginReact=__webpack_require__("29q8").default;__webpack_require__("E8R+");__webpack_require__("TpNv");__webpack_require__("hIzj");Bugsnag.start({apiKey:"212d7c53efdaaafb13e907323d49d3f1",plugins:[new BugsnagPluginReact()],releaseStage:({}).CONTEXT||"production",appVersion:({}).DEPLOY_ID});const ErrorBoundary=Bugsnag.getPlugin('react').createErrorBoundary(React);exports.wrapRootElement=_ref=>{let{element}=_ref;return/*#__PURE__*/React.createElement(ErrorBoundary,null,element);};

/***/ }),

/***/ "Gytx":
/***/ (function(module, exports) {

//

module.exports = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
  if (ret !== void 0) {
    return !!ret;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== "object" || !objA || typeof objB !== "object" || !objB) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    var valueA = objA[key];
    var valueB = objB[key];
    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
    if (ret === false || ret === void 0 && valueA !== valueB) {
      return false;
    }
  }
  return true;
};

/***/ }),

/***/ "H2TA":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ucgz");
/* harmony import */ var _defaultTheme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cNwE");



function withStyles(stylesOrCreator, options) {
  return Object(_material_ui_styles__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(stylesOrCreator, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    defaultTheme: _defaultTheme__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"]
  }, options));
}
/* harmony default export */ __webpack_exports__["a"] = (withStyles);

/***/ }),

/***/ "HwzS":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// We need to centralize the zIndex definitions as they work
// like global values in the browser.
var zIndex = {
  mobileStepper: 1000,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
/* harmony default export */ __webpack_exports__["a"] = (zIndex);

/***/ }),

/***/ "IOVJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("emEt");
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("xtsi");
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_api_runner_browser__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _find_path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("30RF");
// Renders page
class PageRenderer extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component{render(){const props={...this.props,params:{...Object(_find_path__WEBPACK_IMPORTED_MODULE_3__[/* grabMatchParams */ "c"])(this.props.location.pathname),...this.props.pageResources.json.pageContext.__params},pathContext:this.props.pageContext};const[replacementElement]=Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_2__["apiRunner"])(`replaceComponentRenderer`,{props:this.props,loader:_loader__WEBPACK_IMPORTED_MODULE_1__["publicLoader"]});const pageElement=replacementElement||/*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.props.pageResources.component,{...props,key:this.props.path||this.props.pageResources.page.path});const wrappedPage=Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_2__["apiRunner"])(`wrapPageElement`,{element:pageElement,props},pageElement,_ref=>{let{result}=_ref;return{element:result,props};}).pop();return wrappedPage;}}/* harmony default export */ __webpack_exports__["a"] = (PageRenderer);

/***/ }),

/***/ "JX7q":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "JeVI":
/***/ (function(module) {

module.exports = JSON.parse("[]");

/***/ }),

/***/ "KQm4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _toConsumableArray; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__("a3WO");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return Object(arrayLikeToArray["a" /* default */])(arr);
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
var iterableToArray = __webpack_require__("25BE");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("BsWD");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || Object(iterableToArray["a" /* default */])(arr) || Object(unsupportedIterableToArray["a" /* default */])(arr) || _nonIterableSpread();
}

/***/ }),

/***/ "KzjJ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "wrapRootElement", function() { return /* binding */ wrapRootElement; });

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/CssBaseline/CssBaseline.js
var CssBaseline = __webpack_require__("5CWz");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/ThemeProvider/ThemeProvider.js
var ThemeProvider = __webpack_require__("bWLx");

// EXTERNAL MODULE: ./node_modules/react-helmet/lib/Helmet.js
var Helmet = __webpack_require__("TJpk");

// CONCATENATED MODULE: ./node_modules/gatsby-theme-material-ui-top-layout/src/components/viewport.js
function Viewport(_ref){let{children}=_ref;return/*#__PURE__*/react_default.a.createElement(Helmet["Helmet"],null,/*#__PURE__*/react_default.a.createElement("meta",{name:"viewport",content:"minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"}),children);}
// CONCATENATED MODULE: ./node_modules/gatsby-theme-material-ui-top-layout/src/components/top-layout.js
function TopLayout(_ref){let{children,theme}=_ref;return/*#__PURE__*/react_default.a.createElement(react_default.a.Fragment,null,/*#__PURE__*/react_default.a.createElement(Viewport,null),/*#__PURE__*/react_default.a.createElement(ThemeProvider["a" /* default */],{theme:theme},/*#__PURE__*/react_default.a.createElement(CssBaseline["a" /* default */],null),children));}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createMuiTheme.js + 7 modules
var createMuiTheme = __webpack_require__("viY9");

// CONCATENATED MODULE: ./node_modules/gatsby-theme-material-ui-top-layout/src/theme.js
const theme_theme=Object(createMuiTheme["a" /* default */])();/* harmony default export */ var src_theme = (theme_theme);
// CONCATENATED MODULE: ./node_modules/gatsby-theme-material-ui-top-layout/src/wrap-with-provider.js
function wrapWithProvider(_ref){let{element}=_ref;return/*#__PURE__*/react_default.a.createElement(TopLayout,{theme:src_theme},element);}
// CONCATENATED MODULE: ./node_modules/gatsby-theme-material-ui-top-layout/gatsby-browser.js
const wrapRootElement=wrapWithProvider;

/***/ }),

/***/ "LUQC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var isProduction = "production" === 'production';
function warning(condition, message) {
  if (!isProduction) {
    if (condition) {
      return;
    }
    var text = "Warning: " + message;
    if (typeof console !== 'undefined') {
      console.warn(text);
    }
    try {
      throw Error(text);
    } catch (x) {}
  }
}
/* harmony default export */ __webpack_exports__["a"] = (warning);

/***/ }),

/***/ "LXXt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var grey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#9e9e9e',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161'
};
/* harmony default export */ __webpack_exports__["a"] = (grey);

/***/ }),

/***/ "LYrO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startsWith", function() { return startsWith; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "match", function() { return match; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolve", function() { return resolve; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertParams", function() { return insertParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateRedirect", function() { return validateRedirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shallowCompare", function() { return shallowCompare; });
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QLaP");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_0__);


////////////////////////////////////////////////////////////////////////////////
// startsWith(string, search) - Check if `string` starts with `search`
var startsWith = function startsWith(string, search) {
  return string.substr(0, search.length) === search;
};

////////////////////////////////////////////////////////////////////////////////
// pick(routes, uri)
//
// Ranks and picks the best route to match. Each segment gets the highest
// amount of points, then the type of segment gets an additional amount of
// points where
//
//     static > dynamic > splat > root
//
// This way we don't have to worry about the order of our routes, let the
// computers do it.
//
// A route looks like this
//
//     { path, default, value }
//
// And a returned match looks like:
//
//     { route, params, uri }
//
// I know, I should use TypeScript not comments for these types.
var pick = function pick(routes, uri) {
  var match = void 0;
  var default_ = void 0;

  var _uri$split = uri.split("?"),
      uriPathname = _uri$split[0];

  var uriSegments = segmentize(uriPathname);
  var isRootUri = uriSegments[0] === "";
  var ranked = rankRoutes(routes);

  for (var i = 0, l = ranked.length; i < l; i++) {
    var missed = false;
    var route = ranked[i].route;

    if (route.default) {
      default_ = {
        route: route,
        params: {},
        uri: uri
      };
      continue;
    }

    var routeSegments = segmentize(route.path);
    var params = {};
    var max = Math.max(uriSegments.length, routeSegments.length);
    var index = 0;

    for (; index < max; index++) {
      var routeSegment = routeSegments[index];
      var uriSegment = uriSegments[index];

      if (isSplat(routeSegment)) {
        // Hit a splat, just grab the rest, and return a match
        // uri:   /files/documents/work
        // route: /files/*
        var param = routeSegment.slice(1) || "*";
        params[param] = uriSegments.slice(index).map(decodeURIComponent).join("/");
        break;
      }

      if (uriSegment === undefined) {
        // URI is shorter than the route, no match
        // uri:   /users
        // route: /users/:userId
        missed = true;
        break;
      }

      var dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        var matchIsNotReserved = reservedNames.indexOf(dynamicMatch[1]) === -1;
        !matchIsNotReserved ?  false ? undefined : invariant__WEBPACK_IMPORTED_MODULE_0___default()(false) : void 0;
        var value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        // Current segments don't match, not dynamic, not splat, so no match
        // uri:   /users/123/settings
        // route: /users/:id/profile
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        route: route,
        params: params,
        uri: "/" + uriSegments.slice(0, index).join("/")
      };
      break;
    }
  }

  return match || default_ || null;
};

////////////////////////////////////////////////////////////////////////////////
// match(path, uri) - Matches just one path to a uri, also lol
var match = function match(path, uri) {
  return pick([{ path: path }], uri);
};

////////////////////////////////////////////////////////////////////////////////
// resolve(to, basepath)
//
// Resolves URIs as though every path is a directory, no files.  Relative URIs
// in the browser can feel awkward because not only can you be "in a directory"
// you can be "at a file", too. For example
//
//     browserSpecResolve('foo', '/bar/') => /bar/foo
//     browserSpecResolve('foo', '/bar') => /foo
//
// But on the command line of a file system, it's not as complicated, you can't
// `cd` from a file, only directories.  This way, links have to know less about
// their current path. To go deeper you can do this:
//
//     <Link to="deeper"/>
//     // instead of
//     <Link to=`{${props.uri}/deeper}`/>
//
// Just like `cd`, if you want to go deeper from the command line, you do this:
//
//     cd deeper
//     # not
//     cd $(pwd)/deeper
//
// By treating every path as a directory, linking to relative paths should
// require less contextual information and (fingers crossed) be more intuitive.
var resolve = function resolve(to, base) {
  // /foo/bar, /baz/qux => /foo/bar
  if (startsWith(to, "/")) {
    return to;
  }

  var _to$split = to.split("?"),
      toPathname = _to$split[0],
      toQuery = _to$split[1];

  var _base$split = base.split("?"),
      basePathname = _base$split[0];

  var toSegments = segmentize(toPathname);
  var baseSegments = segmentize(basePathname);

  // ?a=b, /users?b=c => /users?a=b
  if (toSegments[0] === "") {
    return addQuery(basePathname, toQuery);
  }

  // profile, /users/789 => /users/789/profile
  if (!startsWith(toSegments[0], ".")) {
    var pathname = baseSegments.concat(toSegments).join("/");
    return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
  }

  // ./         /users/123  =>  /users/123
  // ../        /users/123  =>  /users
  // ../..      /users/123  =>  /
  // ../../one  /a/b/c/d    =>  /a/b/one
  // .././one   /a/b/c/d    =>  /a/b/c/one
  var allSegments = baseSegments.concat(toSegments);
  var segments = [];
  for (var i = 0, l = allSegments.length; i < l; i++) {
    var segment = allSegments[i];
    if (segment === "..") segments.pop();else if (segment !== ".") segments.push(segment);
  }

  return addQuery("/" + segments.join("/"), toQuery);
};

////////////////////////////////////////////////////////////////////////////////
// insertParams(path, params)

var insertParams = function insertParams(path, params) {
  var _path$split = path.split("?"),
      pathBase = _path$split[0],
      _path$split$ = _path$split[1],
      query = _path$split$ === undefined ? "" : _path$split$;

  var segments = segmentize(pathBase);
  var constructedPath = "/" + segments.map(function (segment) {
    var match = paramRe.exec(segment);
    return match ? params[match[1]] : segment;
  }).join("/");
  var _params$location = params.location;
  _params$location = _params$location === undefined ? {} : _params$location;
  var _params$location$sear = _params$location.search,
      search = _params$location$sear === undefined ? "" : _params$location$sear;

  var searchSplit = search.split("?")[1] || "";
  constructedPath = addQuery(constructedPath, query, searchSplit);
  return constructedPath;
};

var validateRedirect = function validateRedirect(from, to) {
  var filter = function filter(segment) {
    return isDynamic(segment);
  };
  var fromString = segmentize(from).filter(filter).sort().join("/");
  var toString = segmentize(to).filter(filter).sort().join("/");
  return fromString === toString;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var paramRe = /^:(.+)/;

var SEGMENT_POINTS = 4;
var STATIC_POINTS = 3;
var DYNAMIC_POINTS = 2;
var SPLAT_PENALTY = 1;
var ROOT_POINTS = 1;

var isRootSegment = function isRootSegment(segment) {
  return segment === "";
};
var isDynamic = function isDynamic(segment) {
  return paramRe.test(segment);
};
var isSplat = function isSplat(segment) {
  return segment && segment[0] === "*";
};

var rankRoute = function rankRoute(route, index) {
  var score = route.default ? 0 : segmentize(route.path).reduce(function (score, segment) {
    score += SEGMENT_POINTS;
    if (isRootSegment(segment)) score += ROOT_POINTS;else if (isDynamic(segment)) score += DYNAMIC_POINTS;else if (isSplat(segment)) score -= SEGMENT_POINTS + SPLAT_PENALTY;else score += STATIC_POINTS;
    return score;
  }, 0);
  return { route: route, score: score, index: index };
};

var rankRoutes = function rankRoutes(routes) {
  return routes.map(rankRoute).sort(function (a, b) {
    return a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index;
  });
};

var segmentize = function segmentize(uri) {
  return uri
  // strip starting/ending slashes
  .replace(/(^\/+|\/+$)/g, "").split("/");
};

var addQuery = function addQuery(pathname) {
  for (var _len = arguments.length, query = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    query[_key - 1] = arguments[_key];
  }

  query = query.filter(function (q) {
    return q && q.length > 0;
  });
  return pathname + (query && query.length > 0 ? "?" + query.join("&") : "");
};

var reservedNames = ["uri", "path"];

/**
 * Shallow compares two objects.
 * @param {Object} obj1 The first object to compare.
 * @param {Object} obj2 The second object to compare.
 */
var shallowCompare = function shallowCompare(obj1, obj2) {
  var obj1Keys = Object.keys(obj1);
  return obj1Keys.length === Object.keys(obj2).length && obj1Keys.every(function (key) {
    return obj2.hasOwnProperty(key) && obj1[key] === obj2[key];
  });
};

////////////////////////////////////////////////////////////////////////////////


/***/ }),

/***/ "LeKB":
/***/ (function(module, exports, __webpack_require__) {

module.exports=[{plugin:__webpack_require__("BOnt"),options:{"plugins":[]}},{plugin:__webpack_require__("PJz+"),options:{"plugins":[]}},{plugin:__webpack_require__("npZl"),options:{"plugins":[],"name":"Ben Ilegbodu","short_name":"benmvp","description":"Ben Ilegbodu uses his many years of frontend development experience to provide quality content to help you become a better frontend engineer.","start_url":"/","background_color":"#fafafa","theme_color":"#3f51b5","display":"standalone","icon":"static/icons/benmvp-logo.png","cache_busting_mode":"query","include_favicon":true,"legacy":true,"theme_color_in_head":true,"cacheDigest":"2b60dd7e58e084c6192b8f4d7c81d91d"}},{plugin:__webpack_require__("KzjJ"),options:{"plugins":[]}},{plugin:__webpack_require__("dIx5"),options:{"plugins":[],"stylesProvider":{"injectFirst":true}}},{plugin:__webpack_require__("b9Nj"),options:{"plugins":[],"trackingId":"UA-65375615-1"}},{plugin:__webpack_require__("6MXi"),options:{"plugins":[],"color":"#3f51b5","showSpinner":false}},{plugin:__webpack_require__("q9nr"),options:{"plugins":[],"maxWidth":800,"backgroundColor":"transparent"}},{plugin:__webpack_require__("wJYx"),options:{"plugins":[],"buttonText":"","tooltipText":"Copy"}},{plugin:__webpack_require__("hUyl"),options:{"plugins":[]}},{plugin:__webpack_require__("GddB"),options:{"plugins":[]}}];

/***/ }),

/***/ "LybE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return handleBreakpoints; });
/* harmony import */ var _babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("KQm4");
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("U8pU");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _merge__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("bv9d");




 // The breakpoint **start** at this value.
// For instance with the first breakpoint xs: [xs, sm[.

var values = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
};
var defaultBreakpoints = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ['xs', 'sm', 'md', 'lg', 'xl'],
  up: function up(key) {
    return "@media (min-width:".concat(values[key], "px)");
  }
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  if (false) {}
  if (Array.isArray(propValue)) {
    var themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return propValue.reduce(function (acc, item, index) {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (Object(_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(propValue) === 'object') {
    var _themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce(function (acc, breakpoint) {
      acc[_themeBreakpoints.up(breakpoint)] = styleFromPropValue(propValue[breakpoint]);
      return acc;
    }, {});
  }
  var output = styleFromPropValue(propValue);
  return output;
}
function breakpoints(styleFunction) {
  var newStyleFunction = function newStyleFunction(props) {
    var base = styleFunction(props);
    var themeBreakpoints = props.theme.breakpoints || defaultBreakpoints;
    var extended = themeBreakpoints.keys.reduce(function (acc, key) {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])({
          theme: props.theme
        }, props[key]));
      }
      return acc;
    }, null);
    return Object(_merge__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(base, extended);
  };
  newStyleFunction.propTypes =  false ? undefined : {};
  newStyleFunction.filterProps = ['xs', 'sm', 'md', 'lg', 'xl'].concat(Object(_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(styleFunction.filterProps));
  return newStyleFunction;
}
/* unused harmony default export */ var _unused_webpack_default_export = (breakpoints);

/***/ }),

/***/ "MMVs":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * domready (c) Dustin Diaz 2014 - License MIT
 * ie10 fix - Mikael Kristiansson 2019
 */
!(function(name, definition) {
  if (true) module.exports = definition();
  else {}
})("domready", function() {
  var ie10 = false;
  if (navigator.appVersion.indexOf("MSIE 10") !== -1) {
    ie10 = true;
  }

  var fns = [],
    listener,
    doc = typeof document === "object" && document,
    hack = ie10
      ? doc.documentElement.doScroll("left")
      : doc.documentElement.doScroll,
    domContentLoaded = "DOMContentLoaded",
    loaded =
      doc && (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState);

  if (!loaded && doc)
    doc.addEventListener(
      domContentLoaded,
      (listener = function() {
        doc.removeEventListener(domContentLoaded, listener);
        loaded = 1;
        while ((listener = fns.shift())) listener();
      })
    );

  return function(fn) {
    loaded ? setTimeout(fn, 0) : fns.push(fn);
  };
});


/***/ }),

/***/ "Mj6V":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this, function () {
  var NProgress = {};
  NProgress.version = '0.2.0';
  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function (options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }
    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function (n) {
    var started = NProgress.isStarted();
    n = clamp(n, Settings.minimum, 1);
    NProgress.status = n === 1 ? null : n;
    var progress = NProgress.render(!started),
      bar = progress.querySelector(Settings.barSelector),
      speed = Settings.speed,
      ease = Settings.easing;
    progress.offsetWidth; /* Repaint */

    queue(function (next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));
      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function () {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0
          });
          setTimeout(function () {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });
    return this;
  };
  NProgress.isStarted = function () {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function () {
    if (!NProgress.status) NProgress.set(0);
    var work = function () {
      setTimeout(function () {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };
    if (Settings.trickle) work();
    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function (force) {
    if (!force && !NProgress.status) return this;
    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function (amount) {
    var n = NProgress.status;
    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }
      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };
  NProgress.trickle = function () {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function () {
    var initial = 0,
      current = 0;
    NProgress.promise = function ($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }
      if (current === 0) {
        NProgress.start();
      }
      initial++;
      current++;
      $promise.always(function () {
        current--;
        if (current === 0) {
          initial = 0;
          NProgress.done();
        } else {
          NProgress.set((initial - current) / initial);
        }
      });
      return this;
    };
  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function (fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');
    addClass(document.documentElement, 'nprogress-busy');
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;
    var bar = progress.querySelector(Settings.barSelector),
      perc = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
      parent = document.querySelector(Settings.parent),
      spinner;
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });
    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }
    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }
    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function () {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function () {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function () {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = 'WebkitTransform' in bodyStyle ? 'Webkit' : 'MozTransform' in bodyStyle ? 'Moz' : 'msTransform' in bodyStyle ? 'ms' : 'OTransform' in bodyStyle ? 'O' : '';
    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;
    if (Settings.positionUsing === 'translate3d') {
      barCSS = {
        transform: 'translate3d(' + toBarPerc(n) + '%,0,0)'
      };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = {
        transform: 'translate(' + toBarPerc(n) + '%,0)'
      };
    } else {
      barCSS = {
        'margin-left': toBarPerc(n) + '%'
      };
    }
    barCSS.transition = 'all ' + speed + 'ms ' + ease;
    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = function () {
    var pending = [];
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }
    return function (fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  }();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = function () {
    var cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'],
      cssProps = {};
    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function (match, letter) {
        return letter.toUpperCase();
      });
    }
    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;
      var i = cssPrefixes.length,
        capName = name.charAt(0).toUpperCase() + name.slice(1),
        vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }
      return name;
    }
    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }
    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }
    return function (element, properties) {
      var args = arguments,
        prop,
        value;
      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    };
  }();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
      newList = oldList + name;
    if (hasClass(oldList, name)) return;

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
      newList;
    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }
  return NProgress;
});

/***/ }),

/***/ "NSX3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("xtsi");
/* harmony import */ var _api_runner_browser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__);
if(window.location.protocol!==`https:`&&window.location.hostname!==`localhost`){console.error(`Service workers can only be used over HTTPS, or on localhost for development`);}else if(`serviceWorker`in navigator){navigator.serviceWorker.register(`${""}/sw.js`).then(function(reg){reg.addEventListener(`updatefound`,()=>{Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__["apiRunner"])(`onServiceWorkerUpdateFound`,{serviceWorker:reg});// The updatefound event implies that reg.installing is set; see
// https://w3c.github.io/ServiceWorker/#service-worker-registration-updatefound-event
const installingWorker=reg.installing;console.log(`installingWorker`,installingWorker);installingWorker.addEventListener(`statechange`,()=>{switch(installingWorker.state){case`installed`:if(navigator.serviceWorker.controller){// At this point, the old content will have been purged and the fresh content will
// have been added to the cache.
// We set a flag so Gatsby Link knows to refresh the page on next navigation attempt
window.___swUpdated=true;// We call the onServiceWorkerUpdateReady API so users can show update prompts.
Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__["apiRunner"])(`onServiceWorkerUpdateReady`,{serviceWorker:reg});// If resources failed for the current page, reload.
if(window.___failedResources){console.log(`resources failed, SW updated - reloading`);window.location.reload();}}else{// At this point, everything has been precached.
// It's the perfect time to display a "Content is cached for offline use." message.
console.log(`Content is now available offline!`);// Post to service worker that install is complete.
// Delay to allow time for the event listener to be added --
// otherwise fetch is called too soon and resources aren't cached.
Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__["apiRunner"])(`onServiceWorkerInstalled`,{serviceWorker:reg});}break;case`redundant`:console.error(`The installing service worker became redundant.`);Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__["apiRunner"])(`onServiceWorkerRedundant`,{serviceWorker:reg});break;case`activated`:Object(_api_runner_browser__WEBPACK_IMPORTED_MODULE_0__["apiRunner"])(`onServiceWorkerActive`,{serviceWorker:reg});break;}});});}).catch(function(e){console.error(`Error during service worker registration:`,e);});}

/***/ }),

/***/ "NTr2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("ASyH");

/***/ }),

/***/ "NsGk":
/***/ (function(module, exports, __webpack_require__) {

// prefer default export if available
const preferDefault=m=>m&&m.default||m;exports.components={"component---src-pages-404-tsx":()=>Promise.all(/* import() | component---src-pages-404-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, "i6+/")),"component---src-pages-blog-tsx":()=>Promise.all(/* import() | component---src-pages-blog-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, "1GPU")),"component---src-pages-index-tsx":()=>Promise.all(/* import() | component---src-pages-index-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(4), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, "QeBL")),"component---src-pages-minishops-tsx":()=>Promise.all(/* import() | component---src-pages-minishops-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(2), __webpack_require__.e(3), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, "Hq58")),"component---src-pages-projects-tsx":()=>Promise.all(/* import() | component---src-pages-projects-tsx */[__webpack_require__.e(0), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, "gZkK")),"component---src-pages-speak-tsx":()=>Promise.all(/* import() | component---src-pages-speak-tsx */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(4), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, "sxaH")),"component---src-pages-subscribe-tsx":()=>Promise.all(/* import() | component---src-pages-subscribe-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(13)]).then(__webpack_require__.bind(null, "DBZF")),"component---src-pages-videos-tsx":()=>Promise.all(/* import() | component---src-pages-videos-tsx */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(4), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, "AhIg")),"component---src-templates-minishop-tsx":()=>Promise.all(/* import() | component---src-templates-minishop-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(3), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, "0Pmj")),"component---src-templates-page-tsx":()=>Promise.all(/* import() | component---src-templates-page-tsx */[__webpack_require__.e(0), __webpack_require__.e(2), __webpack_require__.e(16)]).then(__webpack_require__.bind(null, "aVuU")),"component---src-templates-post-tsx":()=>Promise.all(/* import() | component---src-templates-post-tsx */[__webpack_require__.e(0), __webpack_require__.e(1), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, "uG8V"))};

/***/ }),

/***/ "ODXe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
var arrayWithHoles = __webpack_require__("DSFK");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__("BsWD");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
var nonIterableRest = __webpack_require__("PYwp");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return Object(arrayWithHoles["a" /* default */])(arr) || _iterableToArrayLimit(arr, i) || Object(unsupportedIterableToArray["a" /* default */])(arr, i) || Object(nonIterableRest["a" /* default */])();
}

/***/ }),

/***/ "OKji":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ThemeContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(null);
if (false) {}
/* harmony default export */ __webpack_exports__["a"] = (ThemeContext);

/***/ }),

/***/ "PJYZ":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "PJz+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var injectTwitterScript=function injectTwitterScript(){function addJS(jsCode){var s=document.createElement("script");s.type="text/javascript";s.innerText=jsCode;document.getElementsByTagName("head")[0].appendChild(s);}addJS("\n    window.twttr = (function(d, s, id) {\n      var js,\n        fjs = d.getElementsByTagName(s)[0],\n        t = window.twttr || {};\n      if (d.getElementById(id)) return t;\n      js = d.createElement(s);\n      js.id = id;\n      js.src = \"https://platform.twitter.com/widgets.js\";\n      fjs.parentNode.insertBefore(js, fjs);\n      t._e = [];\n      t.ready = function(f) {\n        t._e.push(f);\n      };\n      return t;\n    })(document, \"script\", \"twitter-wjs\");\n  ");};var injectedTwitterScript=false;var embedClasses=[".twitter-tweet",".twitter-timeline",".twitter-follow-button",".twitter-share-button"].join(",");exports.onRouteUpdate=function(){// If there's an embedded element, lazy-load the twitter script (if it hasn't
// already been loaded), and then run the twitter load function.
if(document.querySelector(embedClasses)!==null){if(!injectedTwitterScript){injectTwitterScript();injectedTwitterScript=true;}if(typeof twttr!=="undefined"&&window.twttr.widgets&&typeof window.twttr.widgets.load==="function"){window.twttr.widgets.load();}}};

/***/ }),

/***/ "PRV4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return createGenerateClassName; });
/* harmony import */ var _ThemeProvider_nested__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hfi/");

/**
 * This is the list of the style rule name we use as drop in replacement for the built-in
 * pseudo classes (:checked, :disabled, :focused, etc.).
 *
 * Why do they exist in the first place?
 * These classes are used at a specificity of 2.
 * It allows them to override previously definied styles as well as
 * being untouched by simple user overrides.
 */

var pseudoClasses = ['checked', 'disabled', 'error', 'focused', 'focusVisible', 'required', 'expanded', 'selected']; // Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// It's inspired by
// https://github.com/cssinjs/jss/blob/4e6a05dd3f7b6572fdd3ab216861d9e446c20331/src/utils/createGenerateClassName.js

function createGenerateClassName() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$disableGloba = options.disableGlobal,
    disableGlobal = _options$disableGloba === void 0 ? false : _options$disableGloba,
    _options$productionPr = options.productionPrefix,
    productionPrefix = _options$productionPr === void 0 ? 'jss' : _options$productionPr,
    _options$seed = options.seed,
    seed = _options$seed === void 0 ? '' : _options$seed;
  var seedPrefix = seed === '' ? '' : "".concat(seed, "-");
  var ruleCounter = 0;
  var getNextCounterId = function getNextCounterId() {
    ruleCounter += 1;
    if (false) {}
    return ruleCounter;
  };
  return function (rule, styleSheet) {
    var name = styleSheet.options.name; // Is a global static MUI style?

    if (name && name.indexOf('Mui') === 0 && !styleSheet.options.link && !disableGlobal) {
      // We can use a shorthand class name, we never use the keys to style the components.
      if (pseudoClasses.indexOf(rule.key) !== -1) {
        return "Mui-".concat(rule.key);
      }
      var prefix = "".concat(seedPrefix).concat(name, "-").concat(rule.key);
      if (!styleSheet.options.theme[_ThemeProvider_nested__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"]] || seed !== '') {
        return prefix;
      }
      return "".concat(prefix, "-").concat(getNextCounterId());
    }
    if (true) {
      return "".concat(seedPrefix).concat(productionPrefix).concat(getNextCounterId());
    }
    var suffix = "".concat(rule.key, "-").concat(getNextCounterId()); // Help with debuggability.

    if (styleSheet.options.classNamePrefix) {
      return "".concat(seedPrefix).concat(styleSheet.options.classNamePrefix, "-").concat(suffix);
    }
    return "".concat(seedPrefix).concat(suffix);
  };
}

/***/ }),

/***/ "PYwp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _nonIterableRest; });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "QLaP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),

/***/ "RD7I":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ makeStyles; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("Ff2n");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("wx14");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/jss/dist/jss.esm.js
var jss_esm = __webpack_require__("/ceM");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/mergeClasses/mergeClasses.js
var mergeClasses = __webpack_require__("XNZ3");

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/multiKeyStore.js
// Used https://github.com/thinkloop/multi-key-cache as inspiration
var multiKeyStore = {
  set: function set(cache, key1, key2, value) {
    var subCache = cache.get(key1);
    if (!subCache) {
      subCache = new Map();
      cache.set(key1, subCache);
    }
    subCache.set(key2, value);
  },
  get: function get(cache, key1, key2) {
    var subCache = cache.get(key1);
    return subCache ? subCache.get(key2) : undefined;
  },
  delete: function _delete(cache, key1, key2) {
    var subCache = cache.get(key1);
    subCache.delete(key2);
  }
};
/* harmony default export */ var makeStyles_multiKeyStore = (multiKeyStore);
// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/useTheme/useTheme.js
var useTheme = __webpack_require__("aXM8");

// EXTERNAL MODULE: ./node_modules/@material-ui/styles/esm/StylesProvider/StylesProvider.js
var StylesProvider = __webpack_require__("o8Rm");

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/indexCounter.js
/* eslint-disable import/prefer-default-export */
// Global index counter to preserve source order.
// We create the style sheet during the creation of the component,
// children are handled after the parents, so the order of style elements would be parent->child.
// It is a problem though when a parent passes a className
// which needs to override any child's styles.
// StyleSheet of the child has a higher specificity, because of the source order.
// So our solution is to render sheets them in the reverse order child->sheet, so
// that parent has a higher specificity.
var indexCounter = -1e9;
function increment() {
  indexCounter += 1;
  if (false) {}
  return indexCounter;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("U8pU");

// EXTERNAL MODULE: ./node_modules/@material-ui/utils/esm/deepmerge.js
var deepmerge = __webpack_require__("2+6g");

// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/getStylesCreator/getStylesCreator.js




function getStylesCreator(stylesOrCreator) {
  var themingEnabled = typeof stylesOrCreator === 'function';
  if (false) {}
  return {
    create: function create(theme, name) {
      var styles;
      try {
        styles = themingEnabled ? stylesOrCreator(theme) : stylesOrCreator;
      } catch (err) {
        if (false) {}
        throw err;
      }
      if (!name || !theme.overrides || !theme.overrides[name]) {
        return styles;
      }
      var overrides = theme.overrides[name];
      var stylesWithOverrides = Object(esm_extends["a" /* default */])({}, styles);
      Object.keys(overrides).forEach(function (key) {
        if (false) {}
        stylesWithOverrides[key] = Object(deepmerge["a" /* default */])(stylesWithOverrides[key], overrides[key]);
      });
      return stylesWithOverrides;
    },
    options: {}
  };
}
// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/getStylesCreator/noopTheme.js
// We use the same empty object to ref count the styles that don't need a theme object.
var noopTheme = {};
/* harmony default export */ var getStylesCreator_noopTheme = (noopTheme);
// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/makeStyles/makeStyles.js











function getClasses(_ref, classes, Component) {
  var state = _ref.state,
    stylesOptions = _ref.stylesOptions;
  if (stylesOptions.disableGeneration) {
    return classes || {};
  }
  if (!state.cacheClasses) {
    state.cacheClasses = {
      // Cache for the finalized classes value.
      value: null,
      // Cache for the last used classes prop pointer.
      lastProp: null,
      // Cache for the last used rendered classes pointer.
      lastJSS: {}
    };
  } // Tracks if either the rendered classes or classes prop has changed,
  // requiring the generation of a new finalized classes object.

  var generate = false;
  if (state.classes !== state.cacheClasses.lastJSS) {
    state.cacheClasses.lastJSS = state.classes;
    generate = true;
  }
  if (classes !== state.cacheClasses.lastProp) {
    state.cacheClasses.lastProp = classes;
    generate = true;
  }
  if (generate) {
    state.cacheClasses.value = Object(mergeClasses["a" /* default */])({
      baseClasses: state.cacheClasses.lastJSS,
      newClasses: classes,
      Component: Component
    });
  }
  return state.cacheClasses.value;
}
function attach(_ref2, props) {
  var state = _ref2.state,
    theme = _ref2.theme,
    stylesOptions = _ref2.stylesOptions,
    stylesCreator = _ref2.stylesCreator,
    name = _ref2.name;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = makeStyles_multiKeyStore.get(stylesOptions.sheetsManager, stylesCreator, theme);
  if (!sheetManager) {
    sheetManager = {
      refs: 0,
      staticSheet: null,
      dynamicStyles: null
    };
    makeStyles_multiKeyStore.set(stylesOptions.sheetsManager, stylesCreator, theme, sheetManager);
  }
  var options = Object(esm_extends["a" /* default */])(Object(esm_extends["a" /* default */])(Object(esm_extends["a" /* default */])({}, stylesCreator.options), stylesOptions), {}, {
    theme: theme,
    flip: typeof stylesOptions.flip === 'boolean' ? stylesOptions.flip : theme.direction === 'rtl'
  });
  options.generateId = options.serverGenerateClassName || options.generateClassName;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    var staticSheet;
    if (stylesOptions.sheetsCache) {
      staticSheet = makeStyles_multiKeyStore.get(stylesOptions.sheetsCache, stylesCreator, theme);
    }
    var styles = stylesCreator.create(theme, name);
    if (!staticSheet) {
      staticSheet = stylesOptions.jss.createStyleSheet(styles, Object(esm_extends["a" /* default */])({
        link: false
      }, options));
      staticSheet.attach();
      if (stylesOptions.sheetsCache) {
        makeStyles_multiKeyStore.set(stylesOptions.sheetsCache, stylesCreator, theme, staticSheet);
      }
    }
    if (sheetsRegistry) {
      sheetsRegistry.add(staticSheet);
    }
    sheetManager.staticSheet = staticSheet;
    sheetManager.dynamicStyles = Object(jss_esm["e" /* getDynamicStyles */])(styles);
  }
  if (sheetManager.dynamicStyles) {
    var dynamicSheet = stylesOptions.jss.createStyleSheet(sheetManager.dynamicStyles, Object(esm_extends["a" /* default */])({
      link: true
    }, options));
    dynamicSheet.update(props);
    dynamicSheet.attach();
    state.dynamicSheet = dynamicSheet;
    state.classes = Object(mergeClasses["a" /* default */])({
      baseClasses: sheetManager.staticSheet.classes,
      newClasses: dynamicSheet.classes
    });
    if (sheetsRegistry) {
      sheetsRegistry.add(dynamicSheet);
    }
  } else {
    state.classes = sheetManager.staticSheet.classes;
  }
  sheetManager.refs += 1;
}
function update(_ref3, props) {
  var state = _ref3.state;
  if (state.dynamicSheet) {
    state.dynamicSheet.update(props);
  }
}
function detach(_ref4) {
  var state = _ref4.state,
    theme = _ref4.theme,
    stylesOptions = _ref4.stylesOptions,
    stylesCreator = _ref4.stylesCreator;
  if (stylesOptions.disableGeneration) {
    return;
  }
  var sheetManager = makeStyles_multiKeyStore.get(stylesOptions.sheetsManager, stylesCreator, theme);
  sheetManager.refs -= 1;
  var sheetsRegistry = stylesOptions.sheetsRegistry;
  if (sheetManager.refs === 0) {
    makeStyles_multiKeyStore.delete(stylesOptions.sheetsManager, stylesCreator, theme);
    stylesOptions.jss.removeStyleSheet(sheetManager.staticSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(sheetManager.staticSheet);
    }
  }
  if (state.dynamicSheet) {
    stylesOptions.jss.removeStyleSheet(state.dynamicSheet);
    if (sheetsRegistry) {
      sheetsRegistry.remove(state.dynamicSheet);
    }
  }
}
function useSynchronousEffect(func, values) {
  var key = react_default.a.useRef([]);
  var output; // Store "generation" key. Just returns a new object every time

  var currentKey = react_default.a.useMemo(function () {
    return {};
  }, values); // eslint-disable-line react-hooks/exhaustive-deps
  // "the first render", or "memo dropped the value"

  if (key.current !== currentKey) {
    key.current = currentKey;
    output = func();
  }
  react_default.a.useEffect(function () {
    return function () {
      if (output) {
        output();
      }
    };
  }, [currentKey] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

function makeStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var name = options.name,
    classNamePrefixOption = options.classNamePrefix,
    Component = options.Component,
    _options$defaultTheme = options.defaultTheme,
    defaultTheme = _options$defaultTheme === void 0 ? getStylesCreator_noopTheme : _options$defaultTheme,
    stylesOptions2 = Object(objectWithoutProperties["a" /* default */])(options, ["name", "classNamePrefix", "Component", "defaultTheme"]);
  var stylesCreator = getStylesCreator(stylesOrCreator);
  var classNamePrefix = name || classNamePrefixOption || 'makeStyles';
  stylesCreator.options = {
    index: increment(),
    name: name,
    meta: classNamePrefix,
    classNamePrefix: classNamePrefix
  };
  var useStyles = function useStyles() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var theme = Object(useTheme["a" /* default */])() || defaultTheme;
    var stylesOptions = Object(esm_extends["a" /* default */])(Object(esm_extends["a" /* default */])({}, react_default.a.useContext(StylesProvider["a" /* StylesContext */])), stylesOptions2);
    var instance = react_default.a.useRef();
    var shouldUpdate = react_default.a.useRef();
    useSynchronousEffect(function () {
      var current = {
        name: name,
        state: {},
        stylesCreator: stylesCreator,
        stylesOptions: stylesOptions,
        theme: theme
      };
      attach(current, props);
      shouldUpdate.current = false;
      instance.current = current;
      return function () {
        detach(current);
      };
    }, [theme, stylesCreator]);
    react_default.a.useEffect(function () {
      if (shouldUpdate.current) {
        update(instance.current, props);
      }
      shouldUpdate.current = true;
    });
    var classes = getClasses(instance.current, props.classes, Component);
    if (false) {}
    return classes;
  };
  return useStyles;
}

/***/ }),

/***/ "SksO":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "TJpk":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;
exports.Helmet = undefined;
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = __webpack_require__("q1tI");
var _react2 = _interopRequireDefault(_react);
var _propTypes = __webpack_require__("17x9");
var _propTypes2 = _interopRequireDefault(_propTypes);
var _reactSideEffect = __webpack_require__("8+s/");
var _reactSideEffect2 = _interopRequireDefault(_reactSideEffect);
var _reactFastCompare = __webpack_require__("bmMU");
var _reactFastCompare2 = _interopRequireDefault(_reactFastCompare);
var _HelmetUtils = __webpack_require__("v1p5");
var _HelmetConstants = __webpack_require__("hFT/");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var Helmet = function Helmet(Component) {
  var _class, _temp;
  return _temp = _class = function (_React$Component) {
    _inherits(HelmetWrapper, _React$Component);
    function HelmetWrapper() {
      _classCallCheck(this, HelmetWrapper);
      return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }
    HelmetWrapper.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
      return !(0, _reactFastCompare2.default)(this.props, nextProps);
    };
    HelmetWrapper.prototype.mapNestedChildrenToProps = function mapNestedChildrenToProps(child, nestedChildren) {
      if (!nestedChildren) {
        return null;
      }
      switch (child.type) {
        case _HelmetConstants.TAG_NAMES.SCRIPT:
        case _HelmetConstants.TAG_NAMES.NOSCRIPT:
          return {
            innerHTML: nestedChildren
          };
        case _HelmetConstants.TAG_NAMES.STYLE:
          return {
            cssText: nestedChildren
          };
      }
      throw new Error("<" + child.type + " /> elements are self-closing and can not contain children. Refer to our API for more information.");
    };
    HelmetWrapper.prototype.flattenArrayTypeChildren = function flattenArrayTypeChildren(_ref) {
      var _extends2;
      var child = _ref.child,
        arrayTypeChildren = _ref.arrayTypeChildren,
        newChildProps = _ref.newChildProps,
        nestedChildren = _ref.nestedChildren;
      return _extends({}, arrayTypeChildren, (_extends2 = {}, _extends2[child.type] = [].concat(arrayTypeChildren[child.type] || [], [_extends({}, newChildProps, this.mapNestedChildrenToProps(child, nestedChildren))]), _extends2));
    };
    HelmetWrapper.prototype.mapObjectTypeChildren = function mapObjectTypeChildren(_ref2) {
      var _extends3, _extends4;
      var child = _ref2.child,
        newProps = _ref2.newProps,
        newChildProps = _ref2.newChildProps,
        nestedChildren = _ref2.nestedChildren;
      switch (child.type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
          return _extends({}, newProps, (_extends3 = {}, _extends3[child.type] = nestedChildren, _extends3.titleAttributes = _extends({}, newChildProps), _extends3));
        case _HelmetConstants.TAG_NAMES.BODY:
          return _extends({}, newProps, {
            bodyAttributes: _extends({}, newChildProps)
          });
        case _HelmetConstants.TAG_NAMES.HTML:
          return _extends({}, newProps, {
            htmlAttributes: _extends({}, newChildProps)
          });
      }
      return _extends({}, newProps, (_extends4 = {}, _extends4[child.type] = _extends({}, newChildProps), _extends4));
    };
    HelmetWrapper.prototype.mapArrayTypeChildrenToProps = function mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
      var newFlattenedProps = _extends({}, newProps);
      Object.keys(arrayTypeChildren).forEach(function (arrayChildName) {
        var _extends5;
        newFlattenedProps = _extends({}, newFlattenedProps, (_extends5 = {}, _extends5[arrayChildName] = arrayTypeChildren[arrayChildName], _extends5));
      });
      return newFlattenedProps;
    };
    HelmetWrapper.prototype.warnOnInvalidChildren = function warnOnInvalidChildren(child, nestedChildren) {
      if (false) {}
      return true;
    };
    HelmetWrapper.prototype.mapChildrenToProps = function mapChildrenToProps(children, newProps) {
      var _this2 = this;
      var arrayTypeChildren = {};
      _react2.default.Children.forEach(children, function (child) {
        if (!child || !child.props) {
          return;
        }
        var _child$props = child.props,
          nestedChildren = _child$props.children,
          childProps = _objectWithoutProperties(_child$props, ["children"]);
        var newChildProps = (0, _HelmetUtils.convertReactPropstoHtmlAttributes)(childProps);
        _this2.warnOnInvalidChildren(child, nestedChildren);
        switch (child.type) {
          case _HelmetConstants.TAG_NAMES.LINK:
          case _HelmetConstants.TAG_NAMES.META:
          case _HelmetConstants.TAG_NAMES.NOSCRIPT:
          case _HelmetConstants.TAG_NAMES.SCRIPT:
          case _HelmetConstants.TAG_NAMES.STYLE:
            arrayTypeChildren = _this2.flattenArrayTypeChildren({
              child: child,
              arrayTypeChildren: arrayTypeChildren,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;
          default:
            newProps = _this2.mapObjectTypeChildren({
              child: child,
              newProps: newProps,
              newChildProps: newChildProps,
              nestedChildren: nestedChildren
            });
            break;
        }
      });
      newProps = this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
      return newProps;
    };
    HelmetWrapper.prototype.render = function render() {
      var _props = this.props,
        children = _props.children,
        props = _objectWithoutProperties(_props, ["children"]);
      var newProps = _extends({}, props);
      if (children) {
        newProps = this.mapChildrenToProps(children, newProps);
      }
      return _react2.default.createElement(Component, newProps);
    };
    _createClass(HelmetWrapper, null, [{
      key: "canUseDOM",
      // Component.peek comes from react-side-effect:
      // For testing, you may use a static peek() method available on the returned component.
      // It lets you get the current state without resetting the mounted instance stack.
      // Don’t use it for anything other than testing.

      /**
       * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
       * @param {Object} bodyAttributes: {"className": "root"}
       * @param {String} defaultTitle: "Default Title"
       * @param {Boolean} defer: true
       * @param {Boolean} encodeSpecialCharacters: true
       * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
       * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
       * @param {Array} meta: [{"name": "description", "content": "Test description"}]
       * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
       * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
       * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
       * @param {Array} style: [{"type": "text/css", "cssText": "div { display: block; color: blue; }"}]
       * @param {String} title: "Title"
       * @param {Object} titleAttributes: {"itemprop": "name"}
       * @param {String} titleTemplate: "MySite.com - %s"
       */
      set: function set(canUseDOM) {
        Component.canUseDOM = canUseDOM;
      }
    }]);
    return HelmetWrapper;
  }(_react2.default.Component), _class.propTypes = {
    base: _propTypes2.default.object,
    bodyAttributes: _propTypes2.default.object,
    children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.node), _propTypes2.default.node]),
    defaultTitle: _propTypes2.default.string,
    defer: _propTypes2.default.bool,
    encodeSpecialCharacters: _propTypes2.default.bool,
    htmlAttributes: _propTypes2.default.object,
    link: _propTypes2.default.arrayOf(_propTypes2.default.object),
    meta: _propTypes2.default.arrayOf(_propTypes2.default.object),
    noscript: _propTypes2.default.arrayOf(_propTypes2.default.object),
    onChangeClientState: _propTypes2.default.func,
    script: _propTypes2.default.arrayOf(_propTypes2.default.object),
    style: _propTypes2.default.arrayOf(_propTypes2.default.object),
    title: _propTypes2.default.string,
    titleAttributes: _propTypes2.default.object,
    titleTemplate: _propTypes2.default.string
  }, _class.defaultProps = {
    defer: true,
    encodeSpecialCharacters: true
  }, _class.peek = Component.peek, _class.rewind = function () {
    var mappedState = Component.rewind();
    if (!mappedState) {
      // provide fallback if mappedState is undefined
      mappedState = (0, _HelmetUtils.mapStateOnServer)({
        baseTag: [],
        bodyAttributes: {},
        encodeSpecialCharacters: true,
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
    return mappedState;
  }, _temp;
};
var NullComponent = function NullComponent() {
  return null;
};
var HelmetSideEffects = (0, _reactSideEffect2.default)(_HelmetUtils.reducePropsToState, _HelmetUtils.handleClientStateChange, _HelmetUtils.mapStateOnServer)(NullComponent);
var HelmetExport = Helmet(HelmetSideEffects);
HelmetExport.renderStatic = HelmetExport.rewind;
exports.Helmet = HelmetExport;
exports.default = HelmetExport;

/***/ }),

/***/ "TOwV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__("qT12");
} else {}

/***/ }),

/***/ "TpNv":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "TrhM":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return formatMuiErrorMessage; });
/**
 * WARNING: Don't import this directly.
 * Use `MuiError` from `@material-ui/utils/macros/MuiError.macro` instead.
 * @param {number} code
 */
function formatMuiErrorMessage(code) {
  // Apply babel-plugin-transform-template-literals in loose mode
  // loose mode is safe iff we're concatenating primitives
  // see https://babeljs.io/docs/en/babel-plugin-transform-template-literals#loose

  /* eslint-disable prefer-template */
  var url = 'https://mui.com/production-error/?code=' + code;
  for (var i = 1; i < arguments.length; i += 1) {
    // rest params over-transpile for this case
    // eslint-disable-next-line prefer-rest-params
    url += '&args[]=' + encodeURIComponent(arguments[i]);
  }
  return 'Minified Material-UI error #' + code + '; visit ' + url + ' for the full message.';
  /* eslint-enable prefer-template */
}

/***/ }),

/***/ "U8pU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/***/ }),

/***/ "UxWs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./.cache/api-runner-browser.js
var api_runner_browser = __webpack_require__("xtsi");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__("i8i4");
var react_dom_default = /*#__PURE__*/__webpack_require__.n(react_dom);

// EXTERNAL MODULE: ./node_modules/@reach/router/es/index.js
var es = __webpack_require__("YwZP");

// EXTERNAL MODULE: ./node_modules/gatsby-react-router-scroll/index.js
var gatsby_react_router_scroll = __webpack_require__("7hJ6");

// EXTERNAL MODULE: ./node_modules/@mikaelkristiansson/domready/ready.js
var ready = __webpack_require__("MMVs");
var ready_default = /*#__PURE__*/__webpack_require__.n(ready);

// EXTERNAL MODULE: ./.cache/gatsby-browser-entry.js
var gatsby_browser_entry = __webpack_require__("Wbzz");

// EXTERNAL MODULE: ./.cache/loader.js + 1 modules
var loader = __webpack_require__("emEt");

// EXTERNAL MODULE: ./.cache/redirects.json
var redirects = __webpack_require__("YLt+");

// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__("5yr3");

// CONCATENATED MODULE: ./.cache/route-announcer-props.js
// This is extracted to separate module because it's shared
// between browser and SSR code
const RouteAnnouncerProps={id:`gatsby-announcer`,style:{position:`absolute`,top:0,width:1,height:1,padding:0,overflow:`hidden`,clip:`rect(0, 0, 0, 0)`,whiteSpace:`nowrap`,border:0},"aria-live":`assertive`,"aria-atomic":`true`};
// EXTERNAL MODULE: ./node_modules/@reach/router/es/lib/history.js
var lib_history = __webpack_require__("9Xx/");

// EXTERNAL MODULE: ./node_modules/gatsby-link/index.js
var gatsby_link = __webpack_require__("+ZDr");

// CONCATENATED MODULE: ./.cache/navigation.js
// Convert to a map for faster lookup in maybeRedirect()
const redirectMap=redirects.reduce((map,redirect)=>{map[redirect.fromPath]=redirect;return map;},{});function maybeRedirect(pathname){const redirect=redirectMap[pathname];if(redirect!=null){if(false){}window.___replace(redirect.toPath);return true;}else{return false;}}const onPreRouteUpdate=(location,prevLocation)=>{if(!maybeRedirect(location.pathname)){Object(api_runner_browser["apiRunner"])(`onPreRouteUpdate`,{location,prevLocation});}};const onRouteUpdate=(location,prevLocation)=>{if(!maybeRedirect(location.pathname)){Object(api_runner_browser["apiRunner"])(`onRouteUpdate`,{location,prevLocation});}};const navigation_navigate=function(to,options){if(options===void 0){options={};}// Support forward/backward navigation with numbers
// navigate(-2) (jumps back 2 history steps)
// navigate(2)  (jumps forward 2 history steps)
if(typeof to===`number`){lib_history["c" /* globalHistory */].navigate(to);return;}let{pathname}=Object(gatsby_link["parsePath"])(to);const redirect=redirectMap[pathname];// If we're redirecting, just replace the passed in pathname
// to the one we want to redirect to.
if(redirect){to=redirect.toPath;pathname=Object(gatsby_link["parsePath"])(to).pathname;}// If we had a service worker update, no matter the path, reload window and
// reset the pathname whitelist
if(window.___swUpdated){window.location=pathname;return;}// Start a timer to wait for a second before transitioning and showing a
// loader in case resources aren't around yet.
const timeoutId=setTimeout(()=>{emitter["a" /* default */].emit(`onDelayedLoadPageResources`,{pathname});Object(api_runner_browser["apiRunner"])(`onRouteUpdateDelayed`,{location:window.location});},1000);loader["default"].loadPage(pathname).then(pageResources=>{// If no page resources, then refresh the page
// Do this, rather than simply `window.location.reload()`, so that
// pressing the back/forward buttons work - otherwise when pressing
// back, the browser will just change the URL and expect JS to handle
// the change, which won't always work since it might not be a Gatsby
// page.
if(!pageResources||pageResources.status===loader["PageResourceStatus"].Error){window.history.replaceState({},``,location.href);window.location=pathname;clearTimeout(timeoutId);return;}// If the loaded page has a different compilation hash to the
// window, then a rebuild has occurred on the server. Reload.
if( true&&pageResources){if(pageResources.page.webpackCompilationHash!==window.___webpackCompilationHash){// Purge plugin-offline cache
if(`serviceWorker`in navigator&&navigator.serviceWorker.controller!==null&&navigator.serviceWorker.controller.state===`activated`){navigator.serviceWorker.controller.postMessage({gatsbyApi:`clearPathResources`});}console.log(`Site has changed on server. Reloading browser`);window.location=pathname;}}Object(es["navigate"])(to,options);clearTimeout(timeoutId);});};function shouldUpdateScroll(prevRouterProps,_ref){let{location}=_ref;const{pathname,hash}=location;const results=Object(api_runner_browser["apiRunner"])(`shouldUpdateScroll`,{prevRouterProps,// `pathname` for backwards compatibility
pathname,routerProps:{location},getSavedScrollPosition:args=>this._stateStorage.read(args)});if(results.length>0){// Use the latest registered shouldUpdateScroll result, this allows users to override plugin's configuration
// @see https://github.com/gatsbyjs/gatsby/issues/12038
return results[results.length-1];}if(prevRouterProps){const{location:{pathname:oldPathname}}=prevRouterProps;if(oldPathname===pathname){// Scroll to element if it exists, if it doesn't, or no hash is provided,
// scroll to top.
return hash?decodeURI(hash.slice(1)):[0,0];}}return true;}function init(){// The "scroll-behavior" package expects the "action" to be on the location
// object so let's copy it over.
lib_history["c" /* globalHistory */].listen(args=>{args.location.action=args.action;});window.___push=to=>navigation_navigate(to,{replace:false});window.___replace=to=>navigation_navigate(to,{replace:true});window.___navigate=(to,options)=>navigation_navigate(to,options);// Check for initial page-load redirect
maybeRedirect(window.location.pathname);}class navigation_RouteAnnouncer extends react_default.a.Component{constructor(props){super(props);this.announcementRef=/*#__PURE__*/react_default.a.createRef();}componentDidUpdate(prevProps,nextProps){requestAnimationFrame(()=>{let pageName=`new page at ${this.props.location.pathname}`;if(document.title){pageName=document.title;}const pageHeadings=document.querySelectorAll(`#gatsby-focus-wrapper h1`);if(pageHeadings&&pageHeadings.length){pageName=pageHeadings[0].textContent;}const newAnnouncement=`Navigated to ${pageName}`;if(this.announcementRef.current){const oldAnnouncement=this.announcementRef.current.innerText;if(oldAnnouncement!==newAnnouncement){this.announcementRef.current.innerText=newAnnouncement;}}});}render(){return/*#__PURE__*/react_default.a.createElement("div",Object.assign({},RouteAnnouncerProps,{ref:this.announcementRef}));}}// Fire on(Pre)RouteUpdate APIs
class navigation_RouteUpdates extends react_default.a.Component{constructor(props){super(props);onPreRouteUpdate(props.location,null);}componentDidMount(){onRouteUpdate(this.props.location,null);}componentDidUpdate(prevProps,prevState,shouldFireRouteUpdate){if(shouldFireRouteUpdate){onRouteUpdate(this.props.location,prevProps.location);}}getSnapshotBeforeUpdate(prevProps){if(this.props.location.pathname!==prevProps.location.pathname){onPreRouteUpdate(this.props.location,prevProps.location);return true;}return false;}render(){return/*#__PURE__*/react_default.a.createElement(react_default.a.Fragment,null,this.props.children,/*#__PURE__*/react_default.a.createElement(navigation_RouteAnnouncer,{location:location}));}}
// EXTERNAL MODULE: ./.cache/page-renderer.js
var page_renderer = __webpack_require__("IOVJ");

// EXTERNAL MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/async-requires.js
var async_requires = __webpack_require__("NsGk");
var async_requires_default = /*#__PURE__*/__webpack_require__.n(async_requires);

// CONCATENATED MODULE: ./node_modules/shallow-compare/es/index.js
// Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
function shallowDiffers(a, b) {
  for (var i in a) {
    if (!(i in b)) return true;
  }for (var _i in b) {
    if (a[_i] !== b[_i]) return true;
  }return false;
}

/* harmony default export */ var shallow_compare_es = (function (instance, nextProps, nextState) {
  return shallowDiffers(instance.props, nextProps) || shallowDiffers(instance.state, nextState);
});
// CONCATENATED MODULE: ./.cache/ensure-resources.js
class ensure_resources_EnsureResources extends react_default.a.Component{constructor(props){super();const{location,pageResources}=props;this.state={location:{...location},pageResources:pageResources||loader["default"].loadPageSync(location.pathname)};}static getDerivedStateFromProps(_ref,prevState){let{location}=_ref;if(prevState.location.href!==location.href){const pageResources=loader["default"].loadPageSync(location.pathname);return{pageResources,location:{...location}};}return{location:{...location}};}loadResources(rawPath){loader["default"].loadPage(rawPath).then(pageResources=>{if(pageResources&&pageResources.status!==loader["PageResourceStatus"].Error){this.setState({location:{...window.location},pageResources});}else{window.history.replaceState({},``,location.href);window.location=rawPath;}});}shouldComponentUpdate(nextProps,nextState){// Always return false if we're missing resources.
if(!nextState.pageResources){this.loadResources(nextProps.location.pathname);return false;}// Check if the component or json have changed.
if(this.state.pageResources!==nextState.pageResources){return true;}if(this.state.pageResources.component!==nextState.pageResources.component){return true;}if(this.state.pageResources.json!==nextState.pageResources.json){return true;}// Check if location has changed on a page using internal routing
// via matchPath configuration.
if(this.state.location.key!==nextState.location.key&&nextState.pageResources.page&&(nextState.pageResources.page.matchPath||nextState.pageResources.page.path)){return true;}return shallow_compare_es(this,nextProps,nextState);}render(){if(false){}return this.props.children(this.state);}}/* harmony default export */ var ensure_resources = (ensure_resources_EnsureResources);
// EXTERNAL MODULE: ./.cache/strip-prefix.js
var strip_prefix = __webpack_require__("cSJ8");

// EXTERNAL MODULE: ./.cache/_this_is_virtual_fs_path_/$virtual/match-paths.json
var match_paths = __webpack_require__("JeVI");

// CONCATENATED MODULE: ./.cache/production-app.js
// Generated during bootstrap
const production_app_loader=new loader["ProdLoader"](async_requires_default.a,match_paths);Object(loader["setLoader"])(production_app_loader);production_app_loader.setApiRunner(api_runner_browser["apiRunner"]);window.asyncRequires=async_requires_default.a;window.___emitter=emitter["a" /* default */];window.___loader=loader["publicLoader"];init();Object(api_runner_browser["apiRunnerAsync"])(`onClientEntry`).then(()=>{// Let plugins register a service worker. The plugin just needs
// to return true.
if(Object(api_runner_browser["apiRunner"])(`registerServiceWorker`).length>0){__webpack_require__("NSX3");}// In gatsby v2 if Router is used in page using matchPaths
// paths need to contain full path.
// For example:
//   - page have `/app/*` matchPath
//   - inside template user needs to use `/app/xyz` as path
// Resetting `basepath`/`baseuri` keeps current behaviour
// to not introduce breaking change.
// Remove this in v3
const RouteHandler=props=>/*#__PURE__*/react_default.a.createElement(es["BaseContext"].Provider,{value:{baseuri:`/`,basepath:`/`}},/*#__PURE__*/react_default.a.createElement(page_renderer["a" /* default */],props));const DataContext=/*#__PURE__*/react_default.a.createContext({});class GatsbyRoot extends react_default.a.Component{render(){const{children}=this.props;return/*#__PURE__*/react_default.a.createElement(es["Location"],null,_ref=>{let{location}=_ref;return/*#__PURE__*/react_default.a.createElement(ensure_resources,{location:location},_ref2=>{let{pageResources,location}=_ref2;const staticQueryResults=Object(loader["getStaticQueryResults"])();return/*#__PURE__*/react_default.a.createElement(gatsby_browser_entry["StaticQueryContext"].Provider,{value:staticQueryResults},/*#__PURE__*/react_default.a.createElement(DataContext.Provider,{value:{pageResources,location}},children));});});}}class LocationHandler extends react_default.a.Component{render(){return/*#__PURE__*/react_default.a.createElement(DataContext.Consumer,null,_ref3=>{let{pageResources,location}=_ref3;return/*#__PURE__*/react_default.a.createElement(navigation_RouteUpdates,{location:location},/*#__PURE__*/react_default.a.createElement(gatsby_react_router_scroll["ScrollContext"],{location:location,shouldUpdateScroll:shouldUpdateScroll},/*#__PURE__*/react_default.a.createElement(es["Router"],{basepath:"",location:location,id:"gatsby-focus-wrapper"},/*#__PURE__*/react_default.a.createElement(RouteHandler,Object.assign({path:pageResources.page.path===`/404.html`?Object(strip_prefix["a" /* default */])(location.pathname,""):encodeURI(pageResources.page.matchPath||pageResources.page.path)},this.props,{location:location,pageResources:pageResources},pageResources.json)))));});}}const{pagePath,location:browserLoc}=window;// Explicitly call navigate if the canonical path (window.pagePath)
// is different to the browser path (window.location.pathname). But
// only if NONE of the following conditions hold:
//
// - The url matches a client side route (page.matchPath)
// - it's a 404 page
// - it's the offline plugin shell (/offline-plugin-app-shell-fallback/)
if(pagePath&&""+pagePath!==browserLoc.pathname&&!(production_app_loader.findMatchPath(Object(strip_prefix["a" /* default */])(browserLoc.pathname,""))||pagePath===`/404.html`||pagePath.match(/^\/404\/?$/)||pagePath.match(/^\/offline-plugin-app-shell-fallback\/?$/))){Object(es["navigate"])(""+pagePath+browserLoc.search+browserLoc.hash,{replace:true});}loader["publicLoader"].loadPage(browserLoc.pathname).then(page=>{if(!page||page.status===loader["PageResourceStatus"].Error){throw new Error(`page resources for ${browserLoc.pathname} not found. Not rendering React`);}window.___webpackCompilationHash=page.page.webpackCompilationHash;const SiteRoot=Object(api_runner_browser["apiRunner"])(`wrapRootElement`,{element:/*#__PURE__*/react_default.a.createElement(LocationHandler,null)},/*#__PURE__*/react_default.a.createElement(LocationHandler,null),_ref4=>{let{result}=_ref4;return{element:result};}).pop();const App=()=>/*#__PURE__*/react_default.a.createElement(GatsbyRoot,null,SiteRoot);const renderer=Object(api_runner_browser["apiRunner"])(`replaceHydrateFunction`,undefined,react_dom_default.a.hydrate)[0];ready_default()(()=>{renderer(/*#__PURE__*/react_default.a.createElement(App,null),typeof window!==`undefined`?document.getElementById(`___gatsby`):void 0,()=>{Object(api_runner_browser["apiRunner"])(`onInitialClientRender`);});});});});

/***/ }),

/***/ "VbXa":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("SksO");
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf(subClass, superClass);
}
module.exports = _inheritsLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "Wbzz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "graphql", function() { return graphql; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticQueryContext", function() { return StaticQueryContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StaticQuery", function() { return StaticQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useStaticQuery", function() { return useStaticQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prefetchPathname", function() { return prefetchPathname; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_collectionGraphql", function() { return unstable_collectionGraphql; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("+ZDr");
/* harmony import */ var gatsby_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(gatsby_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1___default.a; });
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withAssetPrefix", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["withAssetPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withPrefix", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["withPrefix"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parsePath", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["parsePath"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["navigate"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "push", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["push"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "replace", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["replace"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigateTo", function() { return gatsby_link__WEBPACK_IMPORTED_MODULE_1__["navigateTo"]; });

/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("7hJ6");
/* harmony import */ var gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "useScrollRestoration", function() { return gatsby_react_router_scroll__WEBPACK_IMPORTED_MODULE_2__["useScrollRestoration"]; });

/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("lw3w");
/* harmony import */ var _public_page_renderer__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_public_page_renderer__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (default from non-harmony) */ __webpack_require__.d(__webpack_exports__, "PageRenderer", function() { return _public_page_renderer__WEBPACK_IMPORTED_MODULE_3___default.a; });
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("emEt");
const prefetchPathname=_loader__WEBPACK_IMPORTED_MODULE_4__["default"].enqueue;const StaticQueryContext=/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext({});function StaticQueryDataRenderer(_ref){let{staticQueryData,data,query,render}=_ref;const finalData=data?data.data:staticQueryData[query]&&staticQueryData[query].data;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,null,finalData&&render(finalData),!finalData&&/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div",null,"Loading (StaticQuery)"));}const StaticQuery=props=>{const{data,query,render,children}=props;return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StaticQueryContext.Consumer,null,staticQueryData=>/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(StaticQueryDataRenderer,{data:data,query:query,render:render||children,staticQueryData:staticQueryData}));};const useStaticQuery=query=>{var _context$query;if(typeof react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext!==`function`&&"production"===`development`){throw new Error(`You're likely using a version of React that doesn't support Hooks\n`+`Please update React and ReactDOM to 16.8.0 or later to use the useStaticQuery hook.`);}const context=react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(StaticQueryContext);// query is a stringified number like `3303882` when wrapped with graphql, If a user forgets
// to wrap the query in a grqphql, then casting it to a Number results in `NaN` allowing us to
// catch the misuse of the API and give proper direction
if(isNaN(Number(query))){throw new Error(`useStaticQuery was called with a string but expects to be called using \`graphql\`. Try this:

import { useStaticQuery, graphql } from 'gatsby';

useStaticQuery(graphql\`${query}\`);
`);}if(context===null||context===void 0?void 0:(_context$query=context[query])===null||_context$query===void 0?void 0:_context$query.data){return context[query].data;}else{throw new Error(`The result of this StaticQuery could not be fetched.\n\n`+`This is likely a bug in Gatsby and if refreshing the page does not fix it, `+`please open an issue in https://github.com/gatsbyjs/gatsby/issues`);}};function graphql(){throw new Error(`It appears like Gatsby is misconfigured. Gatsby related \`graphql\` calls `+`are supposed to only be evaluated at compile time, and then compiled away. `+`Unfortunately, something went wrong and the query was left in the compiled code.\n\n`+`Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.`);}function unstable_collectionGraphql(){// TODO: Strip this out of the component and throw error if it gets called
return null;}

/***/ }),

/***/ "XNZ3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return mergeClasses; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");


function mergeClasses() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var baseClasses = options.baseClasses,
    newClasses = options.newClasses,
    Component = options.Component;
  if (!newClasses) {
    return baseClasses;
  }
  var nextClasses = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, baseClasses);
  if (false) {}
  Object.keys(newClasses).forEach(function (key) {
    if (false) {}
    if (newClasses[key]) {
      nextClasses[key] = "".concat(baseClasses[key], " ").concat(newClasses[key]);
    }
  });
  return nextClasses;
}

/***/ }),

/***/ "XVSz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var common = {
  black: '#000',
  white: '#fff'
};
/* harmony default export */ __webpack_exports__["a"] = (common);

/***/ }),

/***/ "YLt+":
/***/ (function(module) {

module.exports = JSON.parse("[]");

/***/ }),

/***/ "Yb7a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var orange = {
  50: '#fff3e0',
  100: '#ffe0b2',
  200: '#ffcc80',
  300: '#ffb74d',
  400: '#ffa726',
  500: '#ff9800',
  600: '#fb8c00',
  700: '#f57c00',
  800: '#ef6c00',
  900: '#e65100',
  A100: '#ffd180',
  A200: '#ffab40',
  A400: '#ff9100',
  A700: '#ff6d00'
};
/* harmony default export */ __webpack_exports__["a"] = (orange);

/***/ }),

/***/ "YwZP":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Location", function() { return Location; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationProvider", function() { return LocationProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Match", function() { return Match; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Redirect", function() { return Redirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerLocation", function() { return ServerLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRedirect", function() { return isRedirect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectTo", function() { return redirectTo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLocation", function() { return useLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useNavigate", function() { return useNavigate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useParams", function() { return useParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useMatch", function() { return useMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseContext", function() { return BaseContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("17x9");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("QLaP");
/* harmony import */ var invariant__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(invariant__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("nqlD");
/* harmony import */ var create_react_context__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(create_react_context__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("94VI");
/* harmony import */ var react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("LYrO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "matchPath", function() { return _lib_utils__WEBPACK_IMPORTED_MODULE_5__["match"]; });

/* harmony import */ var _lib_history__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("9Xx/");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createHistory", function() { return _lib_history__WEBPACK_IMPORTED_MODULE_6__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createMemorySource", function() { return _lib_history__WEBPACK_IMPORTED_MODULE_6__["b"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "navigate", function() { return _lib_history__WEBPACK_IMPORTED_MODULE_6__["d"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "globalHistory", function() { return _lib_history__WEBPACK_IMPORTED_MODULE_6__["c"]; });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable jsx-a11y/anchor-has-content */








////////////////////////////////////////////////////////////////////////////////

var createNamedContext = function createNamedContext(name, defaultValue) {
  var Ctx = create_react_context__WEBPACK_IMPORTED_MODULE_3___default()(defaultValue);
  Ctx.displayName = name;
  return Ctx;
};

////////////////////////////////////////////////////////////////////////////////
// Location Context/Provider
var LocationContext = createNamedContext("Location");

// sets up a listener if there isn't one already so apps don't need to be
// wrapped in some top level provider
var Location = function Location(_ref) {
  var children = _ref.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    LocationContext.Consumer,
    null,
    function (context) {
      return context ? children(context) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        LocationProvider,
        null,
        children
      );
    }
  );
};

var LocationProvider = function (_React$Component) {
  _inherits(LocationProvider, _React$Component);

  function LocationProvider() {
    var _temp, _this, _ret;

    _classCallCheck(this, LocationProvider);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      context: _this.getContext(),
      refs: { unlisten: null }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  LocationProvider.prototype.getContext = function getContext() {
    var _props$history = this.props.history,
        navigate = _props$history.navigate,
        location = _props$history.location;

    return { navigate: navigate, location: location };
  };

  LocationProvider.prototype.componentDidCatch = function componentDidCatch(error, info) {
    if (isRedirect(error)) {
      var _navigate = this.props.history.navigate;

      _navigate(error.uri, { replace: true });
    } else {
      throw error;
    }
  };

  LocationProvider.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevState.context.location !== this.state.context.location) {
      this.props.history._onTransitionComplete();
    }
  };

  LocationProvider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var refs = this.state.refs,
        history = this.props.history;

    history._onTransitionComplete();
    refs.unlisten = history.listen(function () {
      Promise.resolve().then(function () {
        // TODO: replace rAF with react deferred update API when it's ready https://github.com/facebook/react/issues/13306
        requestAnimationFrame(function () {
          if (!_this2.unmounted) {
            _this2.setState(function () {
              return { context: _this2.getContext() };
            });
          }
        });
      });
    });
  };

  LocationProvider.prototype.componentWillUnmount = function componentWillUnmount() {
    var refs = this.state.refs;

    this.unmounted = true;
    refs.unlisten();
  };

  LocationProvider.prototype.render = function render() {
    var context = this.state.context,
        children = this.props.children;

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      LocationContext.Provider,
      { value: context },
      typeof children === "function" ? children(context) : children || null
    );
  };

  return LocationProvider;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

////////////////////////////////////////////////////////////////////////////////


LocationProvider.defaultProps = {
  history: _lib_history__WEBPACK_IMPORTED_MODULE_6__[/* globalHistory */ "c"]
};
 false ? undefined : void 0;
var ServerLocation = function ServerLocation(_ref2) {
  var url = _ref2.url,
      children = _ref2.children;

  var searchIndex = url.indexOf("?");
  var searchExists = searchIndex > -1;
  var pathname = void 0;
  var search = "";
  var hash = "";

  if (searchExists) {
    pathname = url.substring(0, searchIndex);
    search = url.substring(searchIndex);
  } else {
    pathname = url;
  }

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    LocationContext.Provider,
    {
      value: {
        location: {
          pathname: pathname,
          search: search,
          hash: hash
        },
        navigate: function navigate() {
          throw new Error("You can't call navigate on the server.");
        }
      }
    },
    children
  );
};
////////////////////////////////////////////////////////////////////////////////
// Sets baseuri and basepath for nested routers and links
var BaseContext = createNamedContext("Base", { baseuri: "/", basepath: "/" });

////////////////////////////////////////////////////////////////////////////////
// The main event, welcome to the show everybody.
var Router = function Router(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    BaseContext.Consumer,
    null,
    function (baseContext) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        Location,
        null,
        function (locationContext) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RouterImpl, _extends({}, baseContext, locationContext, props));
        }
      );
    }
  );
};

var RouterImpl = function (_React$PureComponent) {
  _inherits(RouterImpl, _React$PureComponent);

  function RouterImpl() {
    _classCallCheck(this, RouterImpl);

    return _possibleConstructorReturn(this, _React$PureComponent.apply(this, arguments));
  }

  RouterImpl.prototype.render = function render() {
    var _props = this.props,
        location = _props.location,
        _navigate2 = _props.navigate,
        basepath = _props.basepath,
        primary = _props.primary,
        children = _props.children,
        baseuri = _props.baseuri,
        _props$component = _props.component,
        component = _props$component === undefined ? "div" : _props$component,
        domProps = _objectWithoutProperties(_props, ["location", "navigate", "basepath", "primary", "children", "baseuri", "component"]);

    var routes = react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.toArray(children).reduce(function (array, child) {
      var routes = createRoute(basepath)(child);
      return array.concat(routes);
    }, []);
    var pathname = location.pathname;


    var match = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["pick"])(routes, pathname);

    if (match) {
      var params = match.params,
          uri = match.uri,
          route = match.route,
          element = match.route.value;

      // remove the /* from the end for child routes relative paths

      basepath = route.default ? basepath : route.path.replace(/\*$/, "");

      var props = _extends({}, params, {
        uri: uri,
        location: location,
        navigate: function navigate(to, options) {
          return _navigate2(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(to, uri), options);
        }
      });

      var clone = react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(element, props, element.props.children ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        Router,
        { location: location, primary: primary },
        element.props.children
      ) : undefined);

      // using 'div' for < 16.3 support
      var FocusWrapper = primary ? FocusHandler : component;
      // don't pass any props to 'div'
      var wrapperProps = primary ? _extends({ uri: uri, location: location, component: component }, domProps) : domProps;

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        BaseContext.Provider,
        { value: { baseuri: uri, basepath: basepath } },
        react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
          FocusWrapper,
          wrapperProps,
          clone
        )
      );
    } else {
      // Not sure if we want this, would require index routes at every level
      // warning(
      //   false,
      //   `<Router basepath="${basepath}">\n\nNothing matched:\n\t${
      //     location.pathname
      //   }\n\nPaths checked: \n\t${routes
      //     .map(route => route.path)
      //     .join(
      //       "\n\t"
      //     )}\n\nTo get rid of this warning, add a default NotFound component as child of Router:
      //   \n\tlet NotFound = () => <div>Not Found!</div>
      //   \n\t<Router>\n\t  <NotFound default/>\n\t  {/* ... */}\n\t</Router>`
      // );
      return null;
    }
  };

  return RouterImpl;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent);

RouterImpl.defaultProps = {
  primary: true
};


var FocusContext = createNamedContext("Focus");

var FocusHandler = function FocusHandler(_ref3) {
  var uri = _ref3.uri,
      location = _ref3.location,
      component = _ref3.component,
      domProps = _objectWithoutProperties(_ref3, ["uri", "location", "component"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    FocusContext.Consumer,
    null,
    function (requestFocus) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FocusHandlerImpl, _extends({}, domProps, {
        component: component,
        requestFocus: requestFocus,
        uri: uri,
        location: location
      }));
    }
  );
};

// don't focus on initial render
var initialRender = true;
var focusHandlerCount = 0;

var FocusHandlerImpl = function (_React$Component2) {
  _inherits(FocusHandlerImpl, _React$Component2);

  function FocusHandlerImpl() {
    var _temp2, _this4, _ret2;

    _classCallCheck(this, FocusHandlerImpl);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this4 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this4), _this4.state = {}, _this4.requestFocus = function (node) {
      if (!_this4.state.shouldFocus && node) {
        node.focus();
      }
    }, _temp2), _possibleConstructorReturn(_this4, _ret2);
  }

  FocusHandlerImpl.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var initial = prevState.uri == null;
    if (initial) {
      return _extends({
        shouldFocus: true
      }, nextProps);
    } else {
      var myURIChanged = nextProps.uri !== prevState.uri;
      var navigatedUpToMe = prevState.location.pathname !== nextProps.location.pathname && nextProps.location.pathname === nextProps.uri;
      return _extends({
        shouldFocus: myURIChanged || navigatedUpToMe
      }, nextProps);
    }
  };

  FocusHandlerImpl.prototype.componentDidMount = function componentDidMount() {
    focusHandlerCount++;
    this.focus();
  };

  FocusHandlerImpl.prototype.componentWillUnmount = function componentWillUnmount() {
    focusHandlerCount--;
    if (focusHandlerCount === 0) {
      initialRender = true;
    }
  };

  FocusHandlerImpl.prototype.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location && this.state.shouldFocus) {
      this.focus();
    }
  };

  FocusHandlerImpl.prototype.focus = function focus() {
    if (false) {}

    var requestFocus = this.props.requestFocus;


    if (requestFocus) {
      requestFocus(this.node);
    } else {
      if (initialRender) {
        initialRender = false;
      } else if (this.node) {
        // React polyfills [autofocus] and it fires earlier than cDM,
        // so we were stealing focus away, this line prevents that.
        if (!this.node.contains(document.activeElement)) {
          this.node.focus();
        }
      }
    }
  };

  FocusHandlerImpl.prototype.render = function render() {
    var _this5 = this;

    var _props2 = this.props,
        children = _props2.children,
        style = _props2.style,
        requestFocus = _props2.requestFocus,
        _props2$component = _props2.component,
        Comp = _props2$component === undefined ? "div" : _props2$component,
        uri = _props2.uri,
        location = _props2.location,
        domProps = _objectWithoutProperties(_props2, ["children", "style", "requestFocus", "component", "uri", "location"]);

    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
      Comp,
      _extends({
        style: _extends({ outline: "none" }, style),
        tabIndex: "-1",
        ref: function ref(n) {
          return _this5.node = n;
        }
      }, domProps),
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        FocusContext.Provider,
        { value: this.requestFocus },
        this.props.children
      )
    );
  };

  return FocusHandlerImpl;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

Object(react_lifecycles_compat__WEBPACK_IMPORTED_MODULE_4__["polyfill"])(FocusHandlerImpl);

var k = function k() {};

////////////////////////////////////////////////////////////////////////////////
var forwardRef = react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef;

if (typeof forwardRef === "undefined") {
  forwardRef = function forwardRef(C) {
    return C;
  };
}

var Link = forwardRef(function (_ref4, ref) {
  var innerRef = _ref4.innerRef,
      props = _objectWithoutProperties(_ref4, ["innerRef"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    BaseContext.Consumer,
    null,
    function (_ref5) {
      var basepath = _ref5.basepath,
          baseuri = _ref5.baseuri;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        Location,
        null,
        function (_ref6) {
          var location = _ref6.location,
              navigate = _ref6.navigate;

          var to = props.to,
              state = props.state,
              replace = props.replace,
              _props$getProps = props.getProps,
              getProps = _props$getProps === undefined ? k : _props$getProps,
              anchorProps = _objectWithoutProperties(props, ["to", "state", "replace", "getProps"]);

          var href = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(to, baseuri);
          var encodedHref = encodeURI(href);
          var isCurrent = location.pathname === encodedHref;
          var isPartiallyCurrent = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["startsWith"])(location.pathname, encodedHref);

          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", _extends({
            ref: ref || innerRef,
            "aria-current": isCurrent ? "page" : undefined
          }, anchorProps, getProps({ isCurrent: isCurrent, isPartiallyCurrent: isPartiallyCurrent, href: href, location: location }), {
            href: href,
            onClick: function onClick(event) {
              if (anchorProps.onClick) anchorProps.onClick(event);
              if (shouldNavigate(event)) {
                event.preventDefault();
                var shouldReplace = replace;
                if (typeof replace !== "boolean" && isCurrent) {
                  var _location$state = _extends({}, location.state),
                      key = _location$state.key,
                      restState = _objectWithoutProperties(_location$state, ["key"]);

                  shouldReplace = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["shallowCompare"])(_extends({}, state), restState);
                }
                navigate(href, {
                  state: state,
                  replace: shouldReplace
                });
              }
            }
          }));
        }
      );
    }
  );
});

Link.displayName = "Link";

 false ? undefined : void 0;

////////////////////////////////////////////////////////////////////////////////
function RedirectRequest(uri) {
  this.uri = uri;
}

var isRedirect = function isRedirect(o) {
  return o instanceof RedirectRequest;
};

var redirectTo = function redirectTo(to) {
  throw new RedirectRequest(to);
};

var RedirectImpl = function (_React$Component3) {
  _inherits(RedirectImpl, _React$Component3);

  function RedirectImpl() {
    _classCallCheck(this, RedirectImpl);

    return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
  }

  // Support React < 16 with this hook
  RedirectImpl.prototype.componentDidMount = function componentDidMount() {
    var _props3 = this.props,
        navigate = _props3.navigate,
        to = _props3.to,
        from = _props3.from,
        _props3$replace = _props3.replace,
        replace = _props3$replace === undefined ? true : _props3$replace,
        state = _props3.state,
        noThrow = _props3.noThrow,
        baseuri = _props3.baseuri,
        props = _objectWithoutProperties(_props3, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    Promise.resolve().then(function () {
      var resolvedTo = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(to, baseuri);
      navigate(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["insertParams"])(resolvedTo, props), { replace: replace, state: state });
    });
  };

  RedirectImpl.prototype.render = function render() {
    var _props4 = this.props,
        navigate = _props4.navigate,
        to = _props4.to,
        from = _props4.from,
        replace = _props4.replace,
        state = _props4.state,
        noThrow = _props4.noThrow,
        baseuri = _props4.baseuri,
        props = _objectWithoutProperties(_props4, ["navigate", "to", "from", "replace", "state", "noThrow", "baseuri"]);

    var resolvedTo = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(to, baseuri);
    if (!noThrow) redirectTo(Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["insertParams"])(resolvedTo, props));
    return null;
  };

  return RedirectImpl;
}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);

var Redirect = function Redirect(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    BaseContext.Consumer,
    null,
    function (_ref7) {
      var baseuri = _ref7.baseuri;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        Location,
        null,
        function (locationContext) {
          return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(RedirectImpl, _extends({}, locationContext, { baseuri: baseuri }, props));
        }
      );
    }
  );
};

 false ? undefined : void 0;

////////////////////////////////////////////////////////////////////////////////
var Match = function Match(_ref8) {
  var path = _ref8.path,
      children = _ref8.children;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
    BaseContext.Consumer,
    null,
    function (_ref9) {
      var baseuri = _ref9.baseuri;
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
        Location,
        null,
        function (_ref10) {
          var navigate = _ref10.navigate,
              location = _ref10.location;

          var resolvedPath = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(path, baseuri);
          var result = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["match"])(resolvedPath, location.pathname);
          return children({
            navigate: navigate,
            location: location,
            match: result ? _extends({}, result.params, {
              uri: result.uri,
              path: path
            }) : null
          });
        }
      );
    }
  );
};

////////////////////////////////////////////////////////////////////////////////
// Hooks

var useLocation = function useLocation() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(LocationContext);

  if (!context) {
    throw new Error("useLocation hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.location;
};

var useNavigate = function useNavigate() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(LocationContext);

  if (!context) {
    throw new Error("useNavigate hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  return context.navigate;
};

var useParams = function useParams() {
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(BaseContext);

  if (!context) {
    throw new Error("useParams hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var results = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["match"])(context.basepath, location.pathname);

  return results ? results.params : null;
};

var useMatch = function useMatch(path) {
  if (!path) {
    throw new Error("useMatch(path: string) requires an argument of a string to match against");
  }
  var context = Object(react__WEBPACK_IMPORTED_MODULE_0__["useContext"])(BaseContext);

  if (!context) {
    throw new Error("useMatch hook was used but a LocationContext.Provider was not found in the parent tree. Make sure this is used in a component that is a child of Router");
  }

  var location = useLocation();

  var resolvedPath = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["resolve"])(path, context.baseuri);
  var result = Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["match"])(resolvedPath, location.pathname);
  return result ? _extends({}, result.params, {
    uri: result.uri,
    path: path
  }) : null;
};

////////////////////////////////////////////////////////////////////////////////
// Junk
var stripSlashes = function stripSlashes(str) {
  return str.replace(/(^\/+|\/+$)/g, "");
};

var createRoute = function createRoute(basepath) {
  return function (element) {
    if (!element) {
      return null;
    }

    if (element.type === react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment && element.props.children) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(element.props.children, createRoute(basepath));
    }
    !(element.props.path || element.props.default || element.type === Redirect) ?  false ? undefined : invariant__WEBPACK_IMPORTED_MODULE_2___default()(false) : void 0;

    !!(element.type === Redirect && (!element.props.from || !element.props.to)) ?  false ? undefined : invariant__WEBPACK_IMPORTED_MODULE_2___default()(false) : void 0;

    !!(element.type === Redirect && !Object(_lib_utils__WEBPACK_IMPORTED_MODULE_5__["validateRedirect"])(element.props.from, element.props.to)) ?  false ? undefined : invariant__WEBPACK_IMPORTED_MODULE_2___default()(false) : void 0;

    if (element.props.default) {
      return { value: element, default: true };
    }

    var elementPath = element.type === Redirect ? element.props.from : element.props.path;

    var path = elementPath === "/" ? basepath : stripSlashes(basepath) + "/" + stripSlashes(elementPath);

    return {
      value: element,
      default: element.props.default,
      path: element.props.children ? stripSlashes(path) + "/*" : path
    };
  };
};

var shouldNavigate = function shouldNavigate(event) {
  return !event.defaultPrevented && event.button === 0 && !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
};

////////////////////////////////////////////////////////////////////////


/***/ }),

/***/ "a3WO":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _arrayLikeToArray; });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "aXM8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return useTheme; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ThemeContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("OKji");


function useTheme() {
  var theme = react__WEBPACK_IMPORTED_MODULE_0___default.a.useContext(_ThemeContext__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"]);
  if (false) {}
  return theme;
}

/***/ }),

/***/ "b9Nj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.onRouteUpdate=function(_ref){var location=_ref.location;var trackingId=window.GATSBY_GTAG_PLUGIN_GA_TRACKING_ID;var anonymize=window.GATSBY_GTAG_PLUGIN_ANONYMIZE||false;if(!trackingId||typeof window.gtag!=='function'){return;}var locationStr='';if(location){locationStr=''+location.pathname+location.search+location.hash;}var anonymizeObj={};if(anonymize){anonymizeObj={anonymize_ip:true};}window.gtag('config',trackingId,_extends({page_path:locationStr},anonymizeObj));};

/***/ }),

/***/ "bWLx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _useTheme_ThemeContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("OKji");
/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("aXM8");
/* harmony import */ var _nested__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("hfi/");





 // To support composition of theme.

function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === 'function') {
    var mergedTheme = localTheme(outerTheme);
    if (false) {}
    return mergedTheme;
  }
  return Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, outerTheme), localTheme);
}
/**
 * This component takes a `theme` prop.
 * It makes the `theme` available down the React tree thanks to React context.
 * This component should preferably be used at **the root of your component tree**.
 */

function ThemeProvider(props) {
  var children = props.children,
    localTheme = props.theme;
  var outerTheme = Object(_useTheme__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])();
  if (false) {}
  var theme = react__WEBPACK_IMPORTED_MODULE_1___default.a.useMemo(function () {
    var output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[_nested__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"]] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_useTheme_ThemeContext__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"].Provider, {
    value: theme
  }, children);
}
 false ? undefined : void 0;
if (false) {}
/* harmony default export */ __webpack_exports__["a"] = (ThemeProvider);

/***/ }),

/***/ "bmMU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = Array.isArray;
var keyList = Object.keys;
var hasProp = Object.prototype.hasOwnProperty;
var hasElementType = typeof Element !== 'undefined';
function equal(a, b) {
  // fast-deep-equal index.js 2.0.1
  if (a === b) return true;
  if (a && b && typeof a == 'object' && typeof b == 'object') {
    var arrA = isArray(a),
      arrB = isArray(b),
      i,
      length,
      key;
    if (arrA && arrB) {
      length = a.length;
      if (length != b.length) return false;
      for (i = length; i-- !== 0;) if (!equal(a[i], b[i])) return false;
      return true;
    }
    if (arrA != arrB) return false;
    var dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA != dateB) return false;
    if (dateA && dateB) return a.getTime() == b.getTime();
    var regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA != regexpB) return false;
    if (regexpA && regexpB) return a.toString() == b.toString();
    var keys = keyList(a);
    length = keys.length;
    if (length !== keyList(b).length) return false;
    for (i = length; i-- !== 0;) if (!hasProp.call(b, keys[i])) return false;
    // end fast-deep-equal

    // start react-fast-compare
    // custom handling for DOM elements
    if (hasElementType && a instanceof Element && b instanceof Element) return a === b;

    // custom handling for React
    for (i = length; i-- !== 0;) {
      key = keys[i];
      if (key === '_owner' && a.$$typeof) {
        // React-specific: avoid traversing React elements' _owner.
        //  _owner contains circular references
        // and is not needed when comparing the actual elements (and not their owners)
        // .$$typeof and ._store on just reasonable markers of a react element
        continue;
      } else {
        // all other properties should be traversed as usual
        if (!equal(a[key], b[key])) return false;
      }
    }
    // end react-fast-compare

    // fast-deep-equal index.js 2.0.1
    return true;
  }
  return a !== a && b !== b;
}
// end fast-deep-equal

module.exports = function exportedEqual(a, b) {
  try {
    return equal(a, b);
  } catch (error) {
    if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
      // warn on circular references, don't crash
      // browsers give this different errors name and messages:
      // chrome/safari: "RangeError", "Maximum call stack size exceeded"
      // firefox: "InternalError", too much recursion"
      // edge: "Error", "Out of stack space"
      console.warn('Warning: react-fast-compare does not handle circular references.', error.name, error.message);
      return false;
    }
    // some other error. we should definitely know about these
    throw error;
  }
};

/***/ }),

/***/ "bv9d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _material_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2+6g");

function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return Object(_material_ui_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(acc, item, {
    clone: false // No need to clone deep, it's way faster.
  });
}

/* harmony default export */ __webpack_exports__["a"] = (merge);

/***/ }),

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "cNwE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _createMuiTheme__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("viY9");

var defaultTheme = Object(_createMuiTheme__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])();
/* harmony default export */ __webpack_exports__["a"] = (defaultTheme);

/***/ }),

/***/ "cSJ8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stripPrefix; });
/**
 * Remove a prefix from a string. Return the input string if the given prefix
 * isn't found.
 */function stripPrefix(str,prefix){if(prefix===void 0){prefix=``;}if(!prefix){return str;}if(str===prefix){return`/`;}if(str.startsWith(`${prefix}/`)){return str.slice(prefix.length);}return str;}

/***/ }),

/***/ "cu4x":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.parsePath = parsePath;

function parsePath(path) {
  var pathname = path || "/";
  var search = "";
  var hash = "";
  var hashIndex = pathname.indexOf("#");

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf("?");

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === "?" ? "" : search,
    hash: hash === "#" ? "" : hash
  };
}

/***/ }),

/***/ "dI71":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("s4An");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  Object(_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(subClass, superClass);
}

/***/ }),

/***/ "dIx5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("TqRt");exports.__esModule=true;exports.wrapRootElement=exports.onInitialClientRender=void 0;var _react=_interopRequireDefault(__webpack_require__("q1tI"));var _styles=__webpack_require__("04ZO");var _materialUiPluginCacheEndpoint=_interopRequireDefault(__webpack_require__("ykrT"));var _utils=__webpack_require__("DdF7");var onInitialClientRender=function onInitialClientRender(){if(false){}// Remove the server-side injected CSS.
var jssStyles=document.querySelector("#jss-server-side");if(jssStyles){jssStyles.parentNode.removeChild(jssStyles);}};exports.onInitialClientRender=onInitialClientRender;var wrapRootElement=function wrapRootElement(_ref,pluginOptions){var element=_ref.element;if((0,_utils.hasEntries)(_materialUiPluginCacheEndpoint.default)&&pluginOptions.stylesProvider){throw new Error("You specified both pathToStylesProvider and stylesProvider in gatsby-config.js. Remove one of them.");}var stylesProvider=(0,_utils.hasEntries)(_materialUiPluginCacheEndpoint.default)?_materialUiPluginCacheEndpoint.default:pluginOptions.stylesProvider;if(!stylesProvider){return element;}return/*#__PURE__*/_react.default.createElement(_styles.StylesProvider,stylesProvider,element);};exports.wrapRootElement=wrapRootElement;

/***/ }),

/***/ "dl/7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var red = {
  50: '#ffebee',
  100: '#ffcdd2',
  200: '#ef9a9a',
  300: '#e57373',
  400: '#ef5350',
  500: '#f44336',
  600: '#e53935',
  700: '#d32f2f',
  800: '#c62828',
  900: '#b71c1c',
  A100: '#ff8a80',
  A200: '#ff5252',
  A400: '#ff1744',
  A700: '#d50000'
};
/* harmony default export */ __webpack_exports__["a"] = (red);

/***/ }),

/***/ "e3iB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _StylesProvider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o8Rm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _StylesProvider__WEBPACK_IMPORTED_MODULE_0__["a"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _StylesProvider__WEBPACK_IMPORTED_MODULE_0__["c"]; });




/***/ }),

/***/ "edxh":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff'
};
/* harmony default export */ __webpack_exports__["a"] = (blue);

/***/ }),

/***/ "emEt":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "PageResourceStatus", function() { return /* binding */ PageResourceStatus; });
__webpack_require__.d(__webpack_exports__, "BaseLoader", function() { return /* binding */ loader_BaseLoader; });
__webpack_require__.d(__webpack_exports__, "ProdLoader", function() { return /* binding */ loader_ProdLoader; });
__webpack_require__.d(__webpack_exports__, "setLoader", function() { return /* binding */ setLoader; });
__webpack_require__.d(__webpack_exports__, "publicLoader", function() { return /* binding */ publicLoader; });
__webpack_require__.d(__webpack_exports__, "getStaticQueryResults", function() { return /* binding */ getStaticQueryResults; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__("KQm4");

// CONCATENATED MODULE: ./.cache/prefetch.js
const support=function(feature){if(typeof document===`undefined`){return false;}const fakeLink=document.createElement(`link`);try{if(fakeLink.relList&&typeof fakeLink.relList.supports===`function`){return fakeLink.relList.supports(feature);}}catch(err){return false;}return false;};const linkPrefetchStrategy=function(url,options){return new Promise((resolve,reject)=>{if(typeof document===`undefined`){reject();return;}const link=document.createElement(`link`);link.setAttribute(`rel`,`prefetch`);link.setAttribute(`href`,url);Object.keys(options).forEach(key=>{link.setAttribute(key,options[key]);});link.onload=resolve;link.onerror=reject;const parentElement=document.getElementsByTagName(`head`)[0]||document.getElementsByName(`script`)[0].parentNode;parentElement.appendChild(link);});};const xhrPrefetchStrategy=function(url){return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(`GET`,url,true);req.onload=()=>{if(req.status===200){resolve();}else{reject();}};req.send(null);});};const supportedPrefetchStrategy=support(`prefetch`)?linkPrefetchStrategy:xhrPrefetchStrategy;const preFetched={};const prefetch=function(url,options){return new Promise(resolve=>{if(preFetched[url]){resolve();return;}supportedPrefetchStrategy(url,options).then(()=>{resolve();preFetched[url]=true;}).catch(()=>{});// 404s are logged to the console anyway
});};/* harmony default export */ var _cache_prefetch = (prefetch);
// EXTERNAL MODULE: ./.cache/emitter.js + 1 modules
var emitter = __webpack_require__("5yr3");

// EXTERNAL MODULE: ./.cache/find-path.js + 1 modules
var find_path = __webpack_require__("30RF");

// CONCATENATED MODULE: ./.cache/loader.js
/**
 * Available resource loading statuses
 */const PageResourceStatus={/**
   * At least one of critical resources failed to load
   */Error:`error`,/**
   * Resources loaded successfully
   */Success:`success`};const preferDefault=m=>m&&m.default||m;const stripSurroundingSlashes=s=>{s=s[0]===`/`?s.slice(1):s;s=s.endsWith(`/`)?s.slice(0,-1):s;return s;};const createPageDataUrl=path=>{const fixedPath=path===`/`?`index`:stripSurroundingSlashes(path);return`${""}/page-data/${fixedPath}/page-data.json`;};function doFetch(url,method){if(method===void 0){method=`GET`;}return new Promise((resolve,reject)=>{const req=new XMLHttpRequest();req.open(method,url,true);req.onreadystatechange=()=>{if(req.readyState==4){resolve(req);}};req.send(null);});}const doesConnectionSupportPrefetch=()=>{if(`connection`in navigator&&typeof navigator.connection!==`undefined`){if((navigator.connection.effectiveType||``).includes(`2g`)){return false;}if(navigator.connection.saveData){return false;}}return true;};const toPageResources=function(pageData,component){if(component===void 0){component=null;}const page={componentChunkName:pageData.componentChunkName,path:pageData.path,webpackCompilationHash:pageData.webpackCompilationHash,matchPath:pageData.matchPath,staticQueryHashes:pageData.staticQueryHashes};return{component,json:pageData.result,page};};class loader_BaseLoader{constructor(loadComponent,matchPaths){this.inFlightNetworkRequests=new Map();// Map of pagePath -> Page. Where Page is an object with: {
//   status: PageResourceStatus.Success || PageResourceStatus.Error,
//   payload: PageResources, // undefined if PageResourceStatus.Error
// }
// PageResources is {
//   component,
//   json: pageData.result,
//   page: {
//     componentChunkName,
//     path,
//     webpackCompilationHash,
//     staticQueryHashes
//   },
//   staticQueryResults
// }
this.pageDb=new Map();this.inFlightDb=new Map();this.staticQueryDb={};this.pageDataDb=new Map();this.prefetchTriggered=new Set();this.prefetchCompleted=new Set();this.loadComponent=loadComponent;Object(find_path["d" /* setMatchPaths */])(matchPaths);}memoizedGet(url){let inFlightPromise=this.inFlightNetworkRequests.get(url);if(!inFlightPromise){inFlightPromise=doFetch(url,`GET`);this.inFlightNetworkRequests.set(url,inFlightPromise);}// Prefer duplication with then + catch over .finally to prevent problems in ie11 + firefox
return inFlightPromise.then(response=>{this.inFlightNetworkRequests.delete(url);return response;}).catch(err=>{this.inFlightNetworkRequests.delete(url);throw err;});}setApiRunner(apiRunner){this.apiRunner=apiRunner;this.prefetchDisabled=apiRunner(`disableCorePrefetching`).some(a=>a);}fetchPageDataJson(loadObj){const{pagePath,retries=0}=loadObj;const url=createPageDataUrl(pagePath);return this.memoizedGet(url).then(req=>{const{status,responseText}=req;// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.path===undefined){throw new Error(`not a valid pageData response`);}return Object.assign(loadObj,{status:PageResourceStatus.Success,payload:jsonPayload});}catch(err){// continue regardless of error
}}// Handle 404
if(status===404||status===200){// If the request was for a 404 page and it doesn't exist, we're done
if(pagePath===`/404.html`){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Need some code here to cache the 404 request. In case
// multiple loadPageDataJsons result in 404s
return this.fetchPageDataJson(Object.assign(loadObj,{pagePath:`/404.html`,notFound:true}));}// handle 500 response (Unrecoverable)
if(status===500){return Object.assign(loadObj,{status:PageResourceStatus.Error});}// Handle everything else, including status === 0, and 503s. Should retry
if(retries<3){return this.fetchPageDataJson(Object.assign(loadObj,{retries:retries+1}));}// Retried 3 times already, result is an error.
return Object.assign(loadObj,{status:PageResourceStatus.Error});});}loadPageDataJson(rawPath){const pagePath=Object(find_path["b" /* findPath */])(rawPath);if(this.pageDataDb.has(pagePath)){return Promise.resolve(this.pageDataDb.get(pagePath));}return this.fetchPageDataJson({pagePath}).then(pageData=>{this.pageDataDb.set(pagePath,pageData);return pageData;});}findMatchPath(rawPath){return Object(find_path["a" /* findMatchPath */])(rawPath);}// TODO check all uses of this and whether they use undefined for page resources not exist
loadPage(rawPath){const pagePath=Object(find_path["b" /* findPath */])(rawPath);if(this.pageDb.has(pagePath)){const page=this.pageDb.get(pagePath);return Promise.resolve(page.payload);}if(this.inFlightDb.has(pagePath)){return this.inFlightDb.get(pagePath);}const inFlightPromise=Promise.all([this.loadAppData(),this.loadPageDataJson(pagePath)]).then(allData=>{const result=allData[1];if(result.status===PageResourceStatus.Error){return{status:PageResourceStatus.Error};}let pageData=result.payload;const{componentChunkName,staticQueryHashes=[]}=pageData;const finalResult={};const componentChunkPromise=this.loadComponent(componentChunkName).then(component=>{finalResult.createdAt=new Date();let pageResources;if(!component){finalResult.status=PageResourceStatus.Error;}else{finalResult.status=PageResourceStatus.Success;if(result.notFound===true){finalResult.notFound=true;}pageData=Object.assign(pageData,{webpackCompilationHash:allData[0]?allData[0].webpackCompilationHash:``});pageResources=toPageResources(pageData,component);}// undefined if final result is an error
return pageResources;});const staticQueryBatchPromise=Promise.all(staticQueryHashes.map(staticQueryHash=>{// Check for cache in case this static query result has already been loaded
if(this.staticQueryDb[staticQueryHash]){const jsonPayload=this.staticQueryDb[staticQueryHash];return{staticQueryHash,jsonPayload};}return this.memoizedGet(`${""}/page-data/sq/d/${staticQueryHash}.json`).then(req=>{const jsonPayload=JSON.parse(req.responseText);return{staticQueryHash,jsonPayload};});})).then(staticQueryResults=>{const staticQueryResultsMap={};staticQueryResults.forEach(_ref=>{let{staticQueryHash,jsonPayload}=_ref;staticQueryResultsMap[staticQueryHash]=jsonPayload;this.staticQueryDb[staticQueryHash]=jsonPayload;});return staticQueryResultsMap;});return Promise.all([componentChunkPromise,staticQueryBatchPromise]).then(_ref2=>{let[pageResources,staticQueryResults]=_ref2;let payload;if(pageResources){payload={...pageResources,staticQueryResults};finalResult.payload=payload;emitter["a" /* default */].emit(`onPostLoadPageResources`,{page:payload,pageResources:payload});}this.pageDb.set(pagePath,finalResult);return payload;});});inFlightPromise.then(response=>{this.inFlightDb.delete(pagePath);}).catch(error=>{this.inFlightDb.delete(pagePath);throw error;});this.inFlightDb.set(pagePath,inFlightPromise);return inFlightPromise;}// returns undefined if loading page ran into errors
loadPageSync(rawPath){const pagePath=Object(find_path["b" /* findPath */])(rawPath);if(this.pageDb.has(pagePath)){const pageData=this.pageDb.get(pagePath).payload;return pageData;}return undefined;}shouldPrefetch(pagePath){// Skip prefetching if we know user is on slow or constrained connection
if(!doesConnectionSupportPrefetch()){return false;}// Check if the page exists.
if(this.pageDb.has(pagePath)){return false;}return true;}prefetch(pagePath){if(!this.shouldPrefetch(pagePath)){return false;}// Tell plugins with custom prefetching logic that they should start
// prefetching this path.
if(!this.prefetchTriggered.has(pagePath)){this.apiRunner(`onPrefetchPathname`,{pathname:pagePath});this.prefetchTriggered.add(pagePath);}// If a plugin has disabled core prefetching, stop now.
if(this.prefetchDisabled){return false;}const realPath=Object(find_path["b" /* findPath */])(pagePath);// Todo make doPrefetch logic cacheable
// eslint-disable-next-line consistent-return
this.doPrefetch(realPath).then(()=>{if(!this.prefetchCompleted.has(pagePath)){this.apiRunner(`onPostPrefetchPathname`,{pathname:pagePath});this.prefetchCompleted.add(pagePath);}});return true;}doPrefetch(pagePath){throw new Error(`doPrefetch not implemented`);}hovering(rawPath){this.loadPage(rawPath);}getResourceURLsForPathname(rawPath){const pagePath=Object(find_path["b" /* findPath */])(rawPath);const page=this.pageDataDb.get(pagePath);if(page){const pageResources=toPageResources(page.payload);return[].concat(Object(toConsumableArray["a" /* default */])(createComponentUrls(pageResources.page.componentChunkName)),[createPageDataUrl(pagePath)]);}else{return null;}}isPageNotFound(rawPath){const pagePath=Object(find_path["b" /* findPath */])(rawPath);const page=this.pageDb.get(pagePath);return page&&page.notFound===true;}loadAppData(retries){if(retries===void 0){retries=0;}return this.memoizedGet(`${""}/page-data/app-data.json`).then(req=>{const{status,responseText}=req;let appData;if(status!==200&&retries<3){// Retry 3 times incase of non-200 responses
return this.loadAppData(retries+1);}// Handle 200
if(status===200){try{const jsonPayload=JSON.parse(responseText);if(jsonPayload.webpackCompilationHash===undefined){throw new Error(`not a valid app-data response`);}appData=jsonPayload;}catch(err){// continue regardless of error
}}return appData;});}}const createComponentUrls=componentChunkName=>(window.___chunkMapping[componentChunkName]||[]).map(chunk=>""+chunk);class loader_ProdLoader extends loader_BaseLoader{constructor(asyncRequires,matchPaths){const loadComponent=chunkName=>asyncRequires.components[chunkName]?asyncRequires.components[chunkName]().then(preferDefault)// loader will handle the case when component is null
.catch(()=>null):Promise.resolve();super(loadComponent,matchPaths);}doPrefetch(pagePath){const pageDataUrl=createPageDataUrl(pagePath);return _cache_prefetch(pageDataUrl,{crossOrigin:`anonymous`,as:`fetch`}).then(()=>// This was just prefetched, so will return a response from
// the cache instead of making another request to the server
this.loadPageDataJson(pagePath)).then(result=>{if(result.status!==PageResourceStatus.Success){return Promise.resolve();}const pageData=result.payload;const chunkName=pageData.componentChunkName;const componentUrls=createComponentUrls(chunkName);return Promise.all(componentUrls.map(_cache_prefetch)).then(()=>pageData);});}loadPageDataJson(rawPath){return super.loadPageDataJson(rawPath).then(data=>{if(data.notFound){// check if html file exist using HEAD request:
// if it does we should navigate to it instead of showing 404
return doFetch(rawPath,`HEAD`).then(req=>{if(req.status===200){// page (.html file) actually exist (or we asked for 404 )
// returning page resources status as errored to trigger
// regular browser navigation to given page
return{status:PageResourceStatus.Error};}// if HEAD request wasn't 200, return notFound result
// and show 404 page
return data;});}return data;});}}let instance;const setLoader=_loader=>{instance=_loader;};const publicLoader={// Deprecated methods. As far as we're aware, these are only used by
// core gatsby and the offline plugin, however there's a very small
// chance they're called by others.
getResourcesForPathname:rawPath=>{console.warn(`Warning: getResourcesForPathname is deprecated. Use loadPage instead`);return instance.i.loadPage(rawPath);},getResourcesForPathnameSync:rawPath=>{console.warn(`Warning: getResourcesForPathnameSync is deprecated. Use loadPageSync instead`);return instance.i.loadPageSync(rawPath);},enqueue:rawPath=>instance.prefetch(rawPath),// Real methods
getResourceURLsForPathname:rawPath=>instance.getResourceURLsForPathname(rawPath),loadPage:rawPath=>instance.loadPage(rawPath),loadPageSync:rawPath=>instance.loadPageSync(rawPath),prefetch:rawPath=>instance.prefetch(rawPath),isPageNotFound:rawPath=>instance.isPageNotFound(rawPath),hovering:rawPath=>instance.hovering(rawPath),loadAppData:()=>instance.loadAppData()};/* harmony default export */ var loader = __webpack_exports__["default"] = (publicLoader);function getStaticQueryResults(){return instance.staticQueryDb;}

/***/ }),

/***/ "hFT/":
/***/ (function(module, exports) {

exports.__esModule = true;
var ATTRIBUTE_NAMES = exports.ATTRIBUTE_NAMES = {
  BODY: "bodyAttributes",
  HTML: "htmlAttributes",
  TITLE: "titleAttributes"
};
var TAG_NAMES = exports.TAG_NAMES = {
  BASE: "base",
  BODY: "body",
  HEAD: "head",
  HTML: "html",
  LINK: "link",
  META: "meta",
  NOSCRIPT: "noscript",
  SCRIPT: "script",
  STYLE: "style",
  TITLE: "title"
};
var VALID_TAG_NAMES = exports.VALID_TAG_NAMES = Object.keys(TAG_NAMES).map(function (name) {
  return TAG_NAMES[name];
});
var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
  CHARSET: "charset",
  CSS_TEXT: "cssText",
  HREF: "href",
  HTTPEQUIV: "http-equiv",
  INNER_HTML: "innerHTML",
  ITEM_PROP: "itemprop",
  NAME: "name",
  PROPERTY: "property",
  REL: "rel",
  SRC: "src"
};
var REACT_TAG_MAP = exports.REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HELMET_PROPS = exports.HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate"
};
var HTML_TAG_MAP = exports.HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce(function (obj, key) {
  obj[REACT_TAG_MAP[key]] = key;
  return obj;
}, {});
var SELF_CLOSING_TAGS = exports.SELF_CLOSING_TAGS = [TAG_NAMES.NOSCRIPT, TAG_NAMES.SCRIPT, TAG_NAMES.STYLE];
var HELMET_ATTRIBUTE = exports.HELMET_ATTRIBUTE = "data-react-helmet";

/***/ }),

/***/ "hIzj":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "hUyl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var offsetY=0;var getTargetOffset=function getTargetOffset(hash){var id=window.decodeURI(hash.replace("#",""));if(id!==""){var element=document.getElementById(id);if(element){var scrollTop=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop;var clientTop=document.documentElement.clientTop||document.body.clientTop||0;var computedStyles=window.getComputedStyle(element);var scrollMarginTop=computedStyles.getPropertyValue("scroll-margin-top")||computedStyles.getPropertyValue("scroll-snap-margin-top")||"0px";return element.getBoundingClientRect().top+scrollTop-parseInt(scrollMarginTop,10)-clientTop-offsetY;}}return null;};exports.onInitialClientRender=function(_,pluginOptions){if(pluginOptions.offsetY){offsetY=pluginOptions.offsetY;}requestAnimationFrame(function(){var offset=getTargetOffset(window.location.hash);if(offset!==null){window.scrollTo(0,offset);}});};exports.shouldUpdateScroll=function(_ref){var location=_ref.routerProps.location;var offset=getTargetOffset(location.hash);return offset!==null?[0,offset]:true;};

/***/ }),

/***/ "hd9s":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

exports.__esModule = true;
exports.ScrollContainer = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__("pVnL"));

var _inheritsLoose2 = _interopRequireDefault(__webpack_require__("VbXa"));

var React = _interopRequireWildcard(__webpack_require__("q1tI"));

var _reactDom = _interopRequireDefault(__webpack_require__("i8i4"));

var _propTypes = _interopRequireDefault(__webpack_require__("17x9"));

var _scrollHandler = __webpack_require__("Enzk");

var _router = __webpack_require__("YwZP");

// TODO: In Gatsby v3, this file should be removed.
// We are deprecating this in V2 in favor of useScrollRestoration
var propTypes = {
  scrollKey: _propTypes.default.string.isRequired,
  shouldUpdateScroll: _propTypes.default.func,
  children: _propTypes.default.element.isRequired
};
var hasNotWarnedDeprecation = true;

var ScrollContainerImplementation = /*#__PURE__*/function (_React$Component) {
  (0, _inheritsLoose2.default)(ScrollContainerImplementation, _React$Component);

  function ScrollContainerImplementation(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;

    if (false) {}

    return _this;
  }

  var _proto = ScrollContainerImplementation.prototype;

  _proto.componentDidMount = function componentDidMount() {
    var _this2 = this;

    // eslint-disable-next-line react/no-find-dom-node
    var node = _reactDom.default.findDOMNode(this);

    var _this$props = this.props,
        location = _this$props.location,
        scrollKey = _this$props.scrollKey;
    if (!node) return;
    node.addEventListener("scroll", function () {
      _this2.props.context.save(location, scrollKey, node.scrollTop);
    });
    var position = this.props.context.read(location, scrollKey);
    node.scrollTo(0, position || 0);
  };

  _proto.render = function render() {
    return this.props.children;
  };

  return ScrollContainerImplementation;
}(React.Component);

var ScrollContainer = function ScrollContainer(props) {
  return /*#__PURE__*/React.createElement(_router.Location, null, function (_ref) {
    var location = _ref.location;
    return /*#__PURE__*/React.createElement(_scrollHandler.ScrollContext.Consumer, null, function (context) {
      return /*#__PURE__*/React.createElement(ScrollContainerImplementation, (0, _extends2.default)({}, props, {
        context: context,
        location: location
      }));
    });
  });
};

exports.ScrollContainer = ScrollContainer;
ScrollContainer.propTypes = propTypes;

/***/ }),

/***/ "hfi/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
/* harmony default export */ __webpack_exports__["a"] = (hasSymbol ? Symbol.for('mui.nested') : '__THEME_NESTED__');

/***/ }),

/***/ "hqbx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("TqRt");exports.__esModule=true;exports.default=_default;exports.routeThroughBrowserOrApp=exports.hashShouldBeFollowed=exports.pathIsNotHandledByApp=exports.urlsAreOnSameOrigin=exports.authorIsForcingNavigation=exports.anchorsTargetIsEquivalentToSelf=exports.findClosestAnchor=exports.navigationWasHandledElsewhere=exports.slashedPathname=exports.userIsForcingNavigation=void 0;var _escapeStringRegexp=_interopRequireDefault(__webpack_require__("oxjq"));var _gatsby=__webpack_require__("Wbzz");var userIsForcingNavigation=function userIsForcingNavigation(event){return event.button!==0||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey;};// IE does not include leading slash in anchor.pathname
exports.userIsForcingNavigation=userIsForcingNavigation;var slashedPathname=function slashedPathname(pathname){return pathname[0]==="/"?pathname:"/"+pathname;};exports.slashedPathname=slashedPathname;var navigationWasHandledElsewhere=function navigationWasHandledElsewhere(event){return event.defaultPrevented;};exports.navigationWasHandledElsewhere=navigationWasHandledElsewhere;var findClosestAnchor=function findClosestAnchor(node){for(;node.parentNode;node=node.parentNode){if(node.nodeName.toLowerCase()==="a"){return node;}}return null;};exports.findClosestAnchor=findClosestAnchor;var anchorsTargetIsEquivalentToSelf=function anchorsTargetIsEquivalentToSelf(anchor){return(/* If target attribute is not present it's treated as _self */anchor.hasAttribute("target")===false||/**
     * The browser defaults to _self, but, not all browsers set
     * a.target to the string value `_self` by default
     */ /**
     * Assumption: some browsers use null/undefined for default
     * attribute values
     */anchor.target==null||/**
     * Some browsers use the empty string to mean _self, check
     * for actual `_self`
     */["_self",""].includes(anchor.target)||/**
     * As per https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
     */anchor.target==="_parent"&&(!anchor.ownerDocument.defaultView.parent||// Assumption: This can be falsey
anchor.ownerDocument.defaultView.parent===anchor.ownerDocument.defaultView)||anchor.target==="_top"&&(!anchor.ownerDocument.defaultView.top||// Assumption: This can be falsey
anchor.ownerDocument.defaultView.top===anchor.ownerDocument.defaultView));};exports.anchorsTargetIsEquivalentToSelf=anchorsTargetIsEquivalentToSelf;var authorIsForcingNavigation=function authorIsForcingNavigation(anchor){return(/**
     * HTML5 attribute that informs the browser to handle the
     * href as a downloadable file; let the browser handle it
     */anchor.hasAttribute("download")===true||/**
     * Let the browser handle anything that doesn't look like a
     * target="_self" anchor
     */anchorsTargetIsEquivalentToSelf(anchor)===false);};// https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy
exports.authorIsForcingNavigation=authorIsForcingNavigation;var urlsAreOnSameOrigin=function urlsAreOnSameOrigin(origin,destination){return origin.protocol===destination.protocol&&/* a.host includes both hostname and port in the expected format host:port */origin.host===destination.host;};exports.urlsAreOnSameOrigin=urlsAreOnSameOrigin;var pathIsNotHandledByApp=function pathIsNotHandledByApp(destination,pathStartRegEx){var pathFileExtensionRegEx=/^.*\.((?!htm)[a-z0-9]{1,5})$/i;return(/**
     * For when pathPrefix is used in an app and there happens to be a link
     * pointing to the same domain but outside of the app's pathPrefix. For
     * example, a Gatsby app lives at https://example.com/myapp/, with the
     * pathPrefix set to `/myapp`. When adding an absolute link to the same
     * domain but outside of the /myapp path, for example, `<a
     * href="https://example.com/not-my-app">` the plugin won't catch it and
     * will navigate to an external link instead of doing a pushState resulting
     * in `https://example.com/myapp/https://example.com/not-my-app`
     */pathStartRegEx.test(slashedPathname(destination.pathname))===false||/**
     * Don't catch links pointed at what look like file extensions (other than
     * .htm/html extensions).
     */destination.pathname.search(pathFileExtensionRegEx)!==-1);};exports.pathIsNotHandledByApp=pathIsNotHandledByApp;var hashShouldBeFollowed=function hashShouldBeFollowed(origin,destination){return destination.hash!==""&&(/**
   * Dynamically created anchor links (href="#my-anchor") do not always
   * have pathname on IE
   */destination.pathname===""||/* Don't catch links pointed to the same page but with a hash. */destination.pathname===origin.pathname);};exports.hashShouldBeFollowed=hashShouldBeFollowed;var routeThroughBrowserOrApp=function routeThroughBrowserOrApp(hrefHandler,pluginOptions){return function(event){if(window.___failedResources)return true;if(userIsForcingNavigation(event))return true;if(navigationWasHandledElsewhere(event))return true;var clickedAnchor=findClosestAnchor(event.target);if(clickedAnchor==null)return true;if(authorIsForcingNavigation(clickedAnchor))return true;// IE clears the host value if the anchor href changed after creation, e.g.
// in React. Creating a new anchor element to ensure host value is present
var destination=document.createElement("a");// https://html.spec.whatwg.org/multipage/links.html#concept-hyperlink-url-set
// If clickedAnchor has no href attribute like `<a>example</a>`, the href getter returns empty string.
if(clickedAnchor.href!==""){destination.href=clickedAnchor.href;}if(clickedAnchor.href instanceof SVGAnimatedString){destination.href=clickedAnchor.href.animVal;}// In IE, the default port is included in the anchor host but excluded from
// the location host.  This affects the ability to directly compare
// location host to anchor host.  For example: http://example.com would
// have a location.host of 'example.com' and an destination.host of
// 'example.com:80' Creating anchor from the location.href to normalize the
// host value.
var origin=document.createElement("a");origin.href=window.location.href;if(urlsAreOnSameOrigin(origin,destination)===false)return true;// Regex to test pathname against pathPrefix
var pathStartRegEx=new RegExp("^"+(0,_escapeStringRegexp.default)((0,_gatsby.withPrefix)("/")));if(pathIsNotHandledByApp(destination,pathStartRegEx))return true;if(hashShouldBeFollowed(origin,destination))return true;if(pluginOptions.excludePattern){var excludeRegex=new RegExp(pluginOptions.excludePattern);if(excludeRegex.test(destination.pathname)){return true;}}event.preventDefault();// See issue #8907: destination.pathname already includes pathPrefix added
// by gatsby-transformer-remark but gatsby-link.navigate needs href without
var destinationPathname=slashedPathname(destination.pathname).replace(pathStartRegEx,"/");hrefHandler(""+destinationPathname+destination.search+destination.hash);return false;};};exports.routeThroughBrowserOrApp=routeThroughBrowserOrApp;function _default(root,pluginOptions,cb){var clickHandler=routeThroughBrowserOrApp(cb,pluginOptions);root.addEventListener("click",clickHandler);return function(){return root.removeEventListener("click",clickHandler);};}

/***/ }),

/***/ "iuhU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function toVal(mix) {
  var k,
    y,
    str = '';
  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += ' ');
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += ' ');
          str += k;
        }
      }
    }
  }
  return str;
}
/* harmony default export */ __webpack_exports__["a"] = (function () {
  var i = 0,
    tmp,
    x,
    str = '';
  while (i < arguments.length) {
    if (tmp = arguments[i++]) {
      if (x = toVal(tmp)) {
        str && (str += ' ');
        str += x;
      }
    }
  }
  return str;
});

/***/ }),

/***/ "lw3w":
/***/ (function(module, exports, __webpack_require__) {

const preferDefault=m=>m&&m.default||m;if(false){}else if(true){module.exports=preferDefault(__webpack_require__("rzlk"));}else{}

/***/ }),

/***/ "nXt3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var pink = {
  50: '#fce4ec',
  100: '#f8bbd0',
  200: '#f48fb1',
  300: '#f06292',
  400: '#ec407a',
  500: '#e91e63',
  600: '#d81b60',
  700: '#c2185b',
  800: '#ad1457',
  900: '#880e4f',
  A100: '#ff80ab',
  A200: '#ff4081',
  A400: '#f50057',
  A700: '#c51162'
};
/* harmony default export */ __webpack_exports__["a"] = (pink);

/***/ }),

/***/ "npZl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _interopRequireDefault=__webpack_require__("TqRt");var _gatsby=__webpack_require__("Wbzz");var _getManifestPathname=_interopRequireDefault(__webpack_require__("9hXx"));/* global __MANIFEST_PLUGIN_HAS_LOCALISATION__ */ // when we don't have localisation in our manifest, we tree shake everything away
if(undefined){var withPrefix=_gatsby.withAssetPrefix||_gatsby.withPrefix;exports.onRouteUpdate=function(_ref,pluginOptions){var location=_ref.location;var localize=pluginOptions.localize;var manifestFilename=(0,_getManifestPathname.default)(location.pathname,localize);var manifestEl=document.head.querySelector("link[rel=\"manifest\"]");if(manifestEl){manifestEl.setAttribute("href",withPrefix(manifestFilename));}};}

/***/ }),

/***/ "nqlD":
/***/ (function(module, exports, __webpack_require__) {

/*
  Why commonjs and not ES imports/exports?

  This module is used to alias `create-react-context` package, but drop the the actual implementation part
  because Gatsby requires version of react that has implementatoin baked in.
  
  Package source is using ES modules:
    - https://github.com/jamiebuilds/create-react-context/blob/v0.3.0/src/index.js
  
  But to build this package `babel-plugin-add-module-exports` is used ( https://www.npmjs.com/package/babel-plugin-add-module-exports).
  Which result in both `module.exports` and `exports.default` being set to same thing.

  We don't use that babel plugin so we only have `exports.default`.

  This cause problems in various 3rd party react components that rely on `module.exports` being set.
  See https://github.com/gatsbyjs/gatsby/issues/23645 for example of it.
  
  Instead of adding same babel plugin we mimic output here. Adding babel plugin just for this would:
   a) unnecesairly slow down compilation for all other files (if we just apply it everywhere)
   b) or complicate babel-loader configuration with overwrite specifically for this file
*/const{createContext}=__webpack_require__("q1tI");module.exports=createContext;module.exports.default=createContext;

/***/ }),

/***/ "nwwn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.DEFAULT_OPTIONS={maxWidth:650,wrapperStyle:"",backgroundColor:"white",linkImagesToOriginal:true,showCaptions:false,markdownCaptions:false,withWebp:false,tracedSVG:false,loading:"lazy",disableBgImageOnAlpha:false,disableBgImage:false};exports.imageClass="gatsby-resp-image-image";exports.imageWrapperClass="gatsby-resp-image-wrapper";exports.imageBackgroundClass="gatsby-resp-image-background-image";

/***/ }),

/***/ "o46R":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _toPropertyKey; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("U8pU");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function _toPrimitive(input, hint) {
  if (Object(esm_typeof["a" /* default */])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (Object(esm_typeof["a" /* default */])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return Object(esm_typeof["a" /* default */])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "o8Rm":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return sheetsManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StylesContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return StylesProvider; });
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _createGenerateClassName__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("PRV4");
/* harmony import */ var jss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("/ceM");
/* harmony import */ var _jssPreset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("w0j3");






 // Default JSS instance.

var jss = Object(jss__WEBPACK_IMPORTED_MODULE_4__[/* create */ "c"])(Object(_jssPreset__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])()); // Use a singleton or the provided one by the context.
//
// The counter-based approach doesn't tolerate any mistake.
// It's much safer to use the same counter everywhere.

var generateClassName = Object(_createGenerateClassName__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(); // Exported for test purposes

var sheetsManager = new Map();
var defaultOptions = {
  disableGeneration: false,
  generateClassName: generateClassName,
  jss: jss,
  sheetsCache: null,
  sheetsManager: sheetsManager,
  sheetsRegistry: null
};
var StylesContext = react__WEBPACK_IMPORTED_MODULE_2___default.a.createContext(defaultOptions);
if (false) {}
var injectFirstNode;
function StylesProvider(props) {
  var children = props.children,
    _props$injectFirst = props.injectFirst,
    injectFirst = _props$injectFirst === void 0 ? false : _props$injectFirst,
    _props$disableGenerat = props.disableGeneration,
    disableGeneration = _props$disableGenerat === void 0 ? false : _props$disableGenerat,
    localOptions = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["children", "injectFirst", "disableGeneration"]);
  var outerOptions = react__WEBPACK_IMPORTED_MODULE_2___default.a.useContext(StylesContext);
  var context = Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, outerOptions), {}, {
    disableGeneration: disableGeneration
  }, localOptions);
  if (false) {}
  if (false) {}
  if (false) {}
  if (!context.jss.options.insertionPoint && injectFirst && typeof window !== 'undefined') {
    if (!injectFirstNode) {
      var head = document.head;
      injectFirstNode = document.createComment('mui-inject-first');
      head.insertBefore(injectFirstNode, head.firstChild);
    }
    context.jss = Object(jss__WEBPACK_IMPORTED_MODULE_4__[/* create */ "c"])({
      plugins: Object(_jssPreset__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])().plugins,
      insertionPoint: injectFirstNode
    });
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(StylesContext.Provider, {
    value: context
  }, children);
}
 false ? undefined : void 0;
if (false) {}

/***/ }),

/***/ "oxjq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
module.exports = function (str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

/***/ }),

/***/ "pVnL":
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _extends.apply(this, arguments);
}
module.exports = _extends, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ "q9nr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _require=__webpack_require__("nwwn"),DEFAULT_OPTIONS=_require.DEFAULT_OPTIONS,imageClass=_require.imageClass,imageBackgroundClass=_require.imageBackgroundClass,imageWrapperClass=_require.imageWrapperClass;exports.onRouteUpdate=function(apiCallbackContext,pluginOptions){var options=Object.assign({},DEFAULT_OPTIONS,pluginOptions);var imageWrappers=document.querySelectorAll("."+imageWrapperClass);// https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
// for cross-browser looping through NodeList without polyfills
var _loop=function _loop(i){var imageWrapper=imageWrappers[i];var backgroundElement=imageWrapper.querySelector("."+imageBackgroundClass);var imageElement=imageWrapper.querySelector("."+imageClass);var onImageLoad=function onImageLoad(){backgroundElement.style.transition="opacity 0.5s 0.5s";imageElement.style.transition="opacity 0.5s";onImageComplete();};var onImageComplete=function onImageComplete(){backgroundElement.style.opacity=0;imageElement.style.opacity=1;imageElement.style.color="inherit";imageElement.style.boxShadow="inset 0px 0px 0px 400px "+options.backgroundColor;imageElement.removeEventListener("load",onImageLoad);imageElement.removeEventListener("error",onImageComplete);};imageElement.style.opacity=0;imageElement.addEventListener("load",onImageLoad);imageElement.addEventListener("error",onImageComplete);if(imageElement.complete){onImageComplete();}};for(var i=0;i<imageWrappers.length;i++){_loop(i);}};

/***/ }),

/***/ "qT12":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var b = "function" === typeof Symbol && Symbol.for,
  c = b ? Symbol.for("react.element") : 60103,
  d = b ? Symbol.for("react.portal") : 60106,
  e = b ? Symbol.for("react.fragment") : 60107,
  f = b ? Symbol.for("react.strict_mode") : 60108,
  g = b ? Symbol.for("react.profiler") : 60114,
  h = b ? Symbol.for("react.provider") : 60109,
  k = b ? Symbol.for("react.context") : 60110,
  l = b ? Symbol.for("react.async_mode") : 60111,
  m = b ? Symbol.for("react.concurrent_mode") : 60111,
  n = b ? Symbol.for("react.forward_ref") : 60112,
  p = b ? Symbol.for("react.suspense") : 60113,
  q = b ? Symbol.for("react.suspense_list") : 60120,
  r = b ? Symbol.for("react.memo") : 60115,
  t = b ? Symbol.for("react.lazy") : 60116,
  v = b ? Symbol.for("react.block") : 60121,
  w = b ? Symbol.for("react.fundamental") : 60117,
  x = b ? Symbol.for("react.responder") : 60118,
  y = b ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (a = a.type, a) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a) {
  return z(a) === m;
}
exports.AsyncMode = l;
exports.ConcurrentMode = m;
exports.ContextConsumer = k;
exports.ContextProvider = h;
exports.Element = c;
exports.ForwardRef = n;
exports.Fragment = e;
exports.Lazy = t;
exports.Memo = r;
exports.Portal = d;
exports.Profiler = g;
exports.StrictMode = f;
exports.Suspense = p;
exports.isAsyncMode = function (a) {
  return A(a) || z(a) === l;
};
exports.isConcurrentMode = A;
exports.isContextConsumer = function (a) {
  return z(a) === k;
};
exports.isContextProvider = function (a) {
  return z(a) === h;
};
exports.isElement = function (a) {
  return "object" === typeof a && null !== a && a.$$typeof === c;
};
exports.isForwardRef = function (a) {
  return z(a) === n;
};
exports.isFragment = function (a) {
  return z(a) === e;
};
exports.isLazy = function (a) {
  return z(a) === t;
};
exports.isMemo = function (a) {
  return z(a) === r;
};
exports.isPortal = function (a) {
  return z(a) === d;
};
exports.isProfiler = function (a) {
  return z(a) === g;
};
exports.isStrictMode = function (a) {
  return z(a) === f;
};
exports.isSuspense = function (a) {
  return z(a) === p;
};
exports.isValidElementType = function (a) {
  return "string" === typeof a || "function" === typeof a || a === e || a === m || a === g || a === f || a === p || a === q || "object" === typeof a && null !== a && (a.$$typeof === t || a.$$typeof === r || a.$$typeof === h || a.$$typeof === k || a.$$typeof === n || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v);
};
exports.typeOf = z;

/***/ }),

/***/ "rePB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o46R");

function _defineProperty(obj, key, value) {
  key = Object(_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "rwtN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var indigo = {
  50: '#e8eaf6',
  100: '#c5cae9',
  200: '#9fa8da',
  300: '#7986cb',
  400: '#5c6bc0',
  500: '#3f51b5',
  600: '#3949ab',
  700: '#303f9f',
  800: '#283593',
  900: '#1a237e',
  A100: '#8c9eff',
  A200: '#536dfe',
  A400: '#3d5afe',
  A700: '#304ffe'
};
/* harmony default export */ __webpack_exports__["a"] = (indigo);

/***/ }),

/***/ "rzlk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("emEt");
/* harmony import */ var _page_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("IOVJ");
const ProdPageRenderer=_ref=>{let{location}=_ref;const pageResources=_loader__WEBPACK_IMPORTED_MODULE_1__["default"].loadPageSync(location.pathname);if(!pageResources){return null;}return/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_page_renderer__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"],{location,pageResources,...pageResources.json});};/* harmony default export */ __webpack_exports__["default"] = (ProdPageRenderer);

/***/ }),

/***/ "s4An":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "ucgz":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("2mql");
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _makeStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("RD7I");
/* harmony import */ var _getThemeProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("A+CX");
/* harmony import */ var _useTheme__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("aXM8");







 // Link a style sheet with a component.
// It does not modify the component passed to it;
// instead, it returns a new component, with a `classes` property.

var withStyles = function withStyles(stylesOrCreator) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function (Component) {
    var defaultTheme = options.defaultTheme,
      _options$withTheme = options.withTheme,
      withTheme = _options$withTheme === void 0 ? false : _options$withTheme,
      name = options.name,
      stylesOptions = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(options, ["defaultTheme", "withTheme", "name"]);
    if (false) {}
    var classNamePrefix = name;
    if (false) { var displayName; }
    var useStyles = Object(_makeStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(stylesOrCreator, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
      defaultTheme: defaultTheme,
      Component: Component,
      name: name || Component.displayName,
      classNamePrefix: classNamePrefix
    }, stylesOptions));
    var WithStyles = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function WithStyles(props, ref) {
      var classesProp = props.classes,
        innerRef = props.innerRef,
        other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["classes", "innerRef"]); // The wrapper receives only user supplied props, which could be a subset of
      // the actual props Component might receive due to merging with defaultProps.
      // So copying it here would give us the same result in the wrapper as well.

      var classes = useStyles(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({}, Component.defaultProps), props));
      var theme;
      var more = other;
      if (typeof name === 'string' || withTheme) {
        // name and withTheme are invariant in the outer scope
        // eslint-disable-next-line react-hooks/rules-of-hooks
        theme = Object(_useTheme__WEBPACK_IMPORTED_MODULE_6__[/* default */ "a"])() || defaultTheme;
        if (name) {
          more = Object(_getThemeProps__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])({
            theme: theme,
            name: name,
            props: other
          });
        } // Provide the theme to the wrapped component.
        // So we don't have to use the `withTheme()` Higher-order Component.

        if (withTheme && !more.theme) {
          more.theme = theme;
        }
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component, Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
        ref: innerRef || ref,
        classes: classes
      }, more));
    });
     false ? undefined : void 0;
    if (false) {}
    hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_3___default()(WithStyles, Component);
    if (false) {}
    return WithStyles;
  };
};
/* harmony default export */ __webpack_exports__["a"] = (withStyles);

/***/ }),

/***/ "v1p5":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {exports.__esModule = true;
exports.warn = exports.requestAnimationFrame = exports.reducePropsToState = exports.mapStateOnServer = exports.handleClientStateChange = exports.convertReactPropstoHtmlAttributes = undefined;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _react = __webpack_require__("q1tI");
var _react2 = _interopRequireDefault(_react);
var _objectAssign = __webpack_require__("6qGY");
var _objectAssign2 = _interopRequireDefault(_objectAssign);
var _HelmetConstants = __webpack_require__("hFT/");
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
  var encode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
  var innermostTitle = getInnermostProperty(propsList, _HelmetConstants.TAG_NAMES.TITLE);
  var innermostTemplate = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.TITLE_TEMPLATE);
  if (innermostTemplate && innermostTitle) {
    // use function arg to avoid need to escape $ characters
    return innermostTemplate.replace(/%s/g, function () {
      return innermostTitle;
    });
  }
  var innermostDefaultTitle = getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || undefined;
};
var getOnChangeClientState = function getOnChangeClientState(propsList) {
  return getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || function () {};
};
var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
  return propsList.filter(function (props) {
    return typeof props[tagType] !== "undefined";
  }).map(function (props) {
    return props[tagType];
  }).reduce(function (tagAttrs, current) {
    return _extends({}, tagAttrs, current);
  }, {});
};
var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
  return propsList.filter(function (props) {
    return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
  }).map(function (props) {
    return props[_HelmetConstants.TAG_NAMES.BASE];
  }).reverse().reduce(function (innermostBaseTag, tag) {
    if (!innermostBaseTag.length) {
      var keys = Object.keys(tag);
      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
          return innermostBaseTag.concat(tag);
        }
      }
    }
    return innermostBaseTag;
  }, []);
};
var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
  // Calculate list of tags, giving priority innermost component (end of the propslist)
  var approvedSeenTags = {};
  return propsList.filter(function (props) {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn("Helmet: " + tagName + " should be of type \"Array\". Instead found type \"" + _typeof(props[tagName]) + "\"");
    }
    return false;
  }).map(function (props) {
    return props[tagName];
  }).reverse().reduce(function (approvedTags, instanceTags) {
    var instanceSeenTags = {};
    instanceTags.filter(function (tag) {
      var primaryAttributeKey = void 0;
      var keys = Object.keys(tag);
      for (var i = 0; i < keys.length; i++) {
        var attributeKey = keys[i];
        var lowerCaseAttributeKey = attributeKey.toLowerCase();

        // Special rule with link tags, since rel and href are both primary tags, rel takes priority
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        // Special case for innerHTML which doesn't work lowercased
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      var value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach(function (tag) {
      return approvedTags.push(tag);
    });

    // Update seen tags with tags from this instance
    var keys = Object.keys(instanceSeenTags);
    for (var i = 0; i < keys.length; i++) {
      var attributeKey = keys[i];
      var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getInnermostProperty = function getInnermostProperty(propsList, property) {
  for (var i = propsList.length - 1; i >= 0; i--) {
    var props = propsList[i];
    if (props.hasOwnProperty(property)) {
      return props[property];
    }
  }
  return null;
};
var reducePropsToState = function reducePropsToState(propsList) {
  return {
    baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
    bodyAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.BODY, propsList),
    defer: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.DEFER),
    encode: getInnermostProperty(propsList, _HelmetConstants.HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
    htmlAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.HTML, propsList),
    linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
    metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
    noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
    styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
    title: getTitleFromPropsList(propsList),
    titleAttributes: getAttributesFromPropsList(_HelmetConstants.ATTRIBUTE_NAMES.TITLE, propsList)
  };
};
var rafPolyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();
    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        rafPolyfill(callback);
      }, 0);
    }
  };
}();
var cafPolyfill = function cafPolyfill(id) {
  return clearTimeout(id);
};
var requestAnimationFrame = typeof window !== "undefined" ? window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || rafPolyfill : global.requestAnimationFrame || rafPolyfill;
var cancelAnimationFrame = typeof window !== "undefined" ? window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || cafPolyfill : global.cancelAnimationFrame || cafPolyfill;
var warn = function warn(msg) {
  return console && typeof console.warn === "function" && console.warn(msg);
};
var _helmetCallback = null;
var handleClientStateChange = function handleClientStateChange(newState) {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(function () {
      commitTagChanges(newState, function () {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var commitTagChanges = function commitTagChanges(newState, cb) {
  var baseTag = newState.baseTag,
    bodyAttributes = newState.bodyAttributes,
    htmlAttributes = newState.htmlAttributes,
    linkTags = newState.linkTags,
    metaTags = newState.metaTags,
    noscriptTags = newState.noscriptTags,
    onChangeClientState = newState.onChangeClientState,
    scriptTags = newState.scriptTags,
    styleTags = newState.styleTags,
    title = newState.title,
    titleAttributes = newState.titleAttributes;
  updateAttributes(_HelmetConstants.TAG_NAMES.BODY, bodyAttributes);
  updateAttributes(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes);
  updateTitle(title, titleAttributes);
  var tagUpdates = {
    baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
    linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
    metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
    noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
    scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
    styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
  };
  var addedTags = {};
  var removedTags = {};
  Object.keys(tagUpdates).forEach(function (tagType) {
    var _tagUpdates$tagType = tagUpdates[tagType],
      newTags = _tagUpdates$tagType.newTags,
      oldTags = _tagUpdates$tagType.oldTags;
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  cb && cb();
  onChangeClientState(newState, addedTags, removedTags);
};
var flattenArray = function flattenArray(possibleArray) {
  return Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
};
var updateTitle = function updateTitle(title, attributes) {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};
var updateAttributes = function updateAttributes(tagName, attributes) {
  var elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  var helmetAttributeString = elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
  var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  var attributesToRemove = [].concat(helmetAttributes);
  var attributeKeys = Object.keys(attributes);
  for (var i = 0; i < attributeKeys.length; i++) {
    var attribute = attributeKeys[i];
    var value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    var indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
    elementTag.removeAttribute(attributesToRemove[_i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(_HelmetConstants.HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(_HelmetConstants.HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTags = function updateTags(type, tags) {
  var headElement = document.head || document.querySelector(_HelmetConstants.TAG_NAMES.HEAD);
  var tagNodes = headElement.querySelectorAll(type + "[" + _HelmetConstants.HELMET_ATTRIBUTE + "]");
  var oldTags = Array.prototype.slice.call(tagNodes);
  var newTags = [];
  var indexToDelete = void 0;
  if (tags && tags.length) {
    tags.forEach(function (tag) {
      var newElement = document.createElement(type);
      for (var attribute in tag) {
        if (tag.hasOwnProperty(attribute)) {
          if (attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML) {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(_HelmetConstants.HELMET_ATTRIBUTE, "true");

      // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
      if (oldTags.some(function (existingTag, index) {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach(function (tag) {
    return tag.parentNode.removeChild(tag);
  });
  newTags.forEach(function (tag) {
    return headElement.appendChild(tag);
  });
  return {
    oldTags: oldTags,
    newTags: newTags
  };
};
var generateElementAttributesAsString = function generateElementAttributesAsString(attributes) {
  return Object.keys(attributes).reduce(function (str, key) {
    var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
    return str ? str + " " + attr : attr;
  }, "");
};
var generateTitleAsString = function generateTitleAsString(type, title, attributes, encode) {
  var attributeString = generateElementAttributesAsString(attributes);
  var flattenedTitle = flattenArray(title);
  return attributeString ? "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeString + ">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">" : "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\">" + encodeSpecialCharacters(flattenedTitle, encode) + "</" + type + ">";
};
var generateTagsAsString = function generateTagsAsString(type, tags, encode) {
  return tags.reduce(function (str, tag) {
    var attributeHtml = Object.keys(tag).filter(function (attribute) {
      return !(attribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT);
    }).reduce(function (string, attribute) {
      var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute], encode) + "\"";
      return string ? string + " " + attr : attr;
    }, "");
    var tagContent = tag.innerHTML || tag.cssText || "";
    var isSelfClosing = _HelmetConstants.SELF_CLOSING_TAGS.indexOf(type) === -1;
    return str + "<" + type + " " + _HelmetConstants.HELMET_ATTRIBUTE + "=\"true\" " + attributeHtml + (isSelfClosing ? "/>" : ">" + tagContent + "</" + type + ">");
  }, "");
};
var convertElementAttributestoReactProps = function convertElementAttributestoReactProps(attributes) {
  var initProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(attributes).reduce(function (obj, key) {
    obj[_HelmetConstants.REACT_TAG_MAP[key] || key] = attributes[key];
    return obj;
  }, initProps);
};
var convertReactPropstoHtmlAttributes = function convertReactPropstoHtmlAttributes(props) {
  var initAttributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.keys(props).reduce(function (obj, key) {
    obj[_HelmetConstants.HTML_TAG_MAP[key] || key] = props[key];
    return obj;
  }, initAttributes);
};
var generateTitleAsReactComponent = function generateTitleAsReactComponent(type, title, attributes) {
  var _initProps;

  // assigning into an array to define toString function on it
  var initProps = (_initProps = {
    key: title
  }, _initProps[_HelmetConstants.HELMET_ATTRIBUTE] = true, _initProps);
  var props = convertElementAttributestoReactProps(attributes, initProps);
  return [_react2.default.createElement(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};
var generateTagsAsReactComponent = function generateTagsAsReactComponent(type, tags) {
  return tags.map(function (tag, i) {
    var _mappedTag;
    var mappedTag = (_mappedTag = {
      key: i
    }, _mappedTag[_HelmetConstants.HELMET_ATTRIBUTE] = true, _mappedTag);
    Object.keys(tag).forEach(function (attribute) {
      var mappedAttribute = _HelmetConstants.REACT_TAG_MAP[attribute] || attribute;
      if (mappedAttribute === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || mappedAttribute === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT) {
        var content = tag.innerHTML || tag.cssText;
        mappedTag.dangerouslySetInnerHTML = {
          __html: content
        };
      } else {
        mappedTag[mappedAttribute] = tag[attribute];
      }
    });
    return _react2.default.createElement(type, mappedTag);
  });
};
var getMethodsForTag = function getMethodsForTag(type, tags, encode) {
  switch (type) {
    case _HelmetConstants.TAG_NAMES.TITLE:
      return {
        toComponent: function toComponent() {
          return generateTitleAsReactComponent(type, tags.title, tags.titleAttributes, encode);
        },
        toString: function toString() {
          return generateTitleAsString(type, tags.title, tags.titleAttributes, encode);
        }
      };
    case _HelmetConstants.ATTRIBUTE_NAMES.BODY:
    case _HelmetConstants.ATTRIBUTE_NAMES.HTML:
      return {
        toComponent: function toComponent() {
          return convertElementAttributestoReactProps(tags);
        },
        toString: function toString() {
          return generateElementAttributesAsString(tags);
        }
      };
    default:
      return {
        toComponent: function toComponent() {
          return generateTagsAsReactComponent(type, tags);
        },
        toString: function toString() {
          return generateTagsAsString(type, tags, encode);
        }
      };
  }
};
var mapStateOnServer = function mapStateOnServer(_ref) {
  var baseTag = _ref.baseTag,
    bodyAttributes = _ref.bodyAttributes,
    encode = _ref.encode,
    htmlAttributes = _ref.htmlAttributes,
    linkTags = _ref.linkTags,
    metaTags = _ref.metaTags,
    noscriptTags = _ref.noscriptTags,
    scriptTags = _ref.scriptTags,
    styleTags = _ref.styleTags,
    _ref$title = _ref.title,
    title = _ref$title === undefined ? "" : _ref$title,
    titleAttributes = _ref.titleAttributes;
  return {
    base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag, encode),
    bodyAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.BODY, bodyAttributes, encode),
    htmlAttributes: getMethodsForTag(_HelmetConstants.ATTRIBUTE_NAMES.HTML, htmlAttributes, encode),
    link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags, encode),
    meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags, encode),
    noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags, encode),
    script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags, encode),
    title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, {
      title: title,
      titleAttributes: titleAttributes
    }, encode)
  };
};
exports.convertReactPropstoHtmlAttributes = convertReactPropstoHtmlAttributes;
exports.handleClientStateChange = handleClientStateChange;
exports.mapStateOnServer = mapStateOnServer;
exports.reducePropsToState = reducePropsToState;
exports.requestAnimationFrame = requestAnimationFrame;
exports.warn = warn;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "viY9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("rePB");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("Ff2n");

// EXTERNAL MODULE: ./node_modules/@material-ui/utils/esm/deepmerge.js
var deepmerge = __webpack_require__("2+6g");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("wx14");

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createBreakpoints.js


// Sorted ASC by size. That's important.
// It can't be configured as it's used statically for propTypes.
var keys = ['xs', 'sm', 'md', 'lg', 'xl']; // Keep in mind that @media is inclusive by the CSS specification.

function createBreakpoints(breakpoints) {
  var _breakpoints$values = breakpoints.values,
    values = _breakpoints$values === void 0 ? {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    } : _breakpoints$values,
    _breakpoints$unit = breakpoints.unit,
    unit = _breakpoints$unit === void 0 ? 'px' : _breakpoints$unit,
    _breakpoints$step = breakpoints.step,
    step = _breakpoints$step === void 0 ? 5 : _breakpoints$step,
    other = Object(objectWithoutProperties["a" /* default */])(breakpoints, ["values", "unit", "step"]);
  function up(key) {
    var value = typeof values[key] === 'number' ? values[key] : key;
    return "@media (min-width:".concat(value).concat(unit, ")");
  }
  function down(key) {
    var endIndex = keys.indexOf(key) + 1;
    var upperbound = values[keys[endIndex]];
    if (endIndex === keys.length) {
      // xl down applies to all sizes
      return up('xs');
    }
    var value = typeof upperbound === 'number' && endIndex > 0 ? upperbound : key;
    return "@media (max-width:".concat(value - step / 100).concat(unit, ")");
  }
  function between(start, end) {
    var endIndex = keys.indexOf(end);
    if (endIndex === keys.length - 1) {
      return up(start);
    }
    return "@media (min-width:".concat(typeof values[start] === 'number' ? values[start] : start).concat(unit, ") and ") + "(max-width:".concat((endIndex !== -1 && typeof values[keys[endIndex + 1]] === 'number' ? values[keys[endIndex + 1]] : end) - step / 100).concat(unit, ")");
  }
  function only(key) {
    return between(key, key);
  }
  function width(key) {
    return values[key];
  }
  return Object(esm_extends["a" /* default */])({
    keys: keys,
    values: values,
    up: up,
    down: down,
    between: between,
    only: only,
    width: width
  }, other);
}
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createMixins.js


function createMixins(breakpoints, spacing, mixins) {
  var _toolbar;
  return Object(esm_extends["a" /* default */])({
    gutters: function gutters() {
      var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      // To deprecate in v4.1
      //       warning(
      //         false,
      //         [
      //           'Material-UI: Theme.mixins.gutters() is deprecated.',
      //           'You can use the source of the mixin directly:',
      //           `
      // paddingLeft: theme.spacing(2),
      // paddingRight: theme.spacing(2),
      // [theme.breakpoints.up('sm')]: {
      //   paddingLeft: theme.spacing(3),
      //   paddingRight: theme.spacing(3),
      // },
      // `,
      //         ].join('\n'),
      //       );
      return Object(esm_extends["a" /* default */])({
        paddingLeft: spacing(2),
        paddingRight: spacing(2)
      }, styles, Object(defineProperty["a" /* default */])({}, breakpoints.up('sm'), Object(esm_extends["a" /* default */])({
        paddingLeft: spacing(3),
        paddingRight: spacing(3)
      }, styles[breakpoints.up('sm')])));
    },
    toolbar: (_toolbar = {
      minHeight: 56
    }, Object(defineProperty["a" /* default */])(_toolbar, "".concat(breakpoints.up('xs'), " and (orientation: landscape)"), {
      minHeight: 48
    }), Object(defineProperty["a" /* default */])(_toolbar, breakpoints.up('sm'), {
      minHeight: 64
    }), _toolbar)
  }, mixins);
}
// EXTERNAL MODULE: ./node_modules/@material-ui/utils/esm/formatMuiErrorMessage.js
var formatMuiErrorMessage = __webpack_require__("TrhM");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/common.js
var common = __webpack_require__("XVSz");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/grey.js
var grey = __webpack_require__("LXXt");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/indigo.js
var indigo = __webpack_require__("rwtN");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/pink.js
var pink = __webpack_require__("nXt3");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/red.js
var red = __webpack_require__("dl/7");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/orange.js
var orange = __webpack_require__("Yb7a");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/blue.js
var blue = __webpack_require__("edxh");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/colors/green.js
var green = __webpack_require__("6yBS");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/colorManipulator.js
var colorManipulator = __webpack_require__("ye/S");

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createPalette.js













var light = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: 'rgba(0, 0, 0, 0.87)',
    // Secondary text.
    secondary: 'rgba(0, 0, 0, 0.54)',
    // Disabled text have even lower visual prominence.
    disabled: 'rgba(0, 0, 0, 0.38)',
    // Text hints.
    hint: 'rgba(0, 0, 0, 0.38)'
  },
  // The color used to divide different elements.
  divider: 'rgba(0, 0, 0, 0.12)',
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: common["a" /* default */].white,
    default: grey["a" /* default */][50]
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: 'rgba(0, 0, 0, 0.54)',
    // The color of an hovered action.
    hover: 'rgba(0, 0, 0, 0.04)',
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: 'rgba(0, 0, 0, 0.08)',
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: 'rgba(0, 0, 0, 0.26)',
    // The background color of a disabled action.
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(0, 0, 0, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common["a" /* default */].white,
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
    hint: 'rgba(255, 255, 255, 0.5)',
    icon: 'rgba(255, 255, 255, 0.5)'
  },
  divider: 'rgba(255, 255, 255, 0.12)',
  background: {
    paper: grey["a" /* default */][800],
    default: '#303030'
  },
  action: {
    active: common["a" /* default */].white,
    hover: 'rgba(255, 255, 255, 0.08)',
    hoverOpacity: 0.08,
    selected: 'rgba(255, 255, 255, 0.16)',
    selectedOpacity: 0.16,
    disabled: 'rgba(255, 255, 255, 0.3)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    disabledOpacity: 0.38,
    focus: 'rgba(255, 255, 255, 0.12)',
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  var tonalOffsetLight = tonalOffset.light || tonalOffset;
  var tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = Object(colorManipulator["e" /* lighten */])(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = Object(colorManipulator["a" /* darken */])(intent.main, tonalOffsetDark);
    }
  }
}
function createPalette(palette) {
  var _palette$primary = palette.primary,
    primary = _palette$primary === void 0 ? {
      light: indigo["a" /* default */][300],
      main: indigo["a" /* default */][500],
      dark: indigo["a" /* default */][700]
    } : _palette$primary,
    _palette$secondary = palette.secondary,
    secondary = _palette$secondary === void 0 ? {
      light: pink["a" /* default */].A200,
      main: pink["a" /* default */].A400,
      dark: pink["a" /* default */].A700
    } : _palette$secondary,
    _palette$error = palette.error,
    error = _palette$error === void 0 ? {
      light: red["a" /* default */][300],
      main: red["a" /* default */][500],
      dark: red["a" /* default */][700]
    } : _palette$error,
    _palette$warning = palette.warning,
    warning = _palette$warning === void 0 ? {
      light: orange["a" /* default */][300],
      main: orange["a" /* default */][500],
      dark: orange["a" /* default */][700]
    } : _palette$warning,
    _palette$info = palette.info,
    info = _palette$info === void 0 ? {
      light: blue["a" /* default */][300],
      main: blue["a" /* default */][500],
      dark: blue["a" /* default */][700]
    } : _palette$info,
    _palette$success = palette.success,
    success = _palette$success === void 0 ? {
      light: green["a" /* default */][300],
      main: green["a" /* default */][500],
      dark: green["a" /* default */][700]
    } : _palette$success,
    _palette$type = palette.type,
    type = _palette$type === void 0 ? 'light' : _palette$type,
    _palette$contrastThre = palette.contrastThreshold,
    contrastThreshold = _palette$contrastThre === void 0 ? 3 : _palette$contrastThre,
    _palette$tonalOffset = palette.tonalOffset,
    tonalOffset = _palette$tonalOffset === void 0 ? 0.2 : _palette$tonalOffset,
    other = Object(objectWithoutProperties["a" /* default */])(palette, ["primary", "secondary", "error", "warning", "info", "success", "type", "contrastThreshold", "tonalOffset"]); // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54

  function getContrastText(background) {
    var contrastText = Object(colorManipulator["d" /* getContrastRatio */])(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    if (false) { var contrast; }
    return contrastText;
  }
  var augmentColor = function augmentColor(color) {
    var mainShade = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
    var lightShade = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 300;
    var darkShade = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 700;
    color = Object(esm_extends["a" /* default */])({}, color);
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }
    if (!color.main) {
      throw new Error( false ? undefined : Object(formatMuiErrorMessage["a" /* default */])(4, mainShade));
    }
    if (typeof color.main !== 'string') {
      throw new Error( false ? undefined : Object(formatMuiErrorMessage["a" /* default */])(5, JSON.stringify(color.main)));
    }
    addLightOrDark(color, 'light', lightShade, tonalOffset);
    addLightOrDark(color, 'dark', darkShade, tonalOffset);
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }
    return color;
  };
  var types = {
    dark: dark,
    light: light
  };
  if (false) {}
  var paletteOutput = Object(deepmerge["a" /* default */])(Object(esm_extends["a" /* default */])({
    // A collection of common colors.
    common: common["a" /* default */],
    // The palette type, can be light or dark.
    type: type,
    // The colors used to represent primary interface elements for a user.
    primary: augmentColor(primary),
    // The colors used to represent secondary interface elements for a user.
    secondary: augmentColor(secondary, 'A400', 'A200', 'A700'),
    // The colors used to represent interface elements that the user should be made aware of.
    error: augmentColor(error),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: augmentColor(warning),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: augmentColor(info),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: augmentColor(success),
    // The grey colors.
    grey: grey["a" /* default */],
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: contrastThreshold,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: getContrastText,
    // Generate a rich color object.
    augmentColor: augmentColor,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: tonalOffset
  }, types[type]), other);
  return paletteOutput;
}
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createTypography.js



function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = {
  textTransform: 'uppercase'
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
/**
 * @see @link{https://material.io/design/typography/the-type-system.html}
 * @see @link{https://material.io/design/typography/understanding-typography.html}
 */

function createTypography(palette, typography) {
  var _ref = typeof typography === 'function' ? typography(palette) : typography,
    _ref$fontFamily = _ref.fontFamily,
    fontFamily = _ref$fontFamily === void 0 ? defaultFontFamily : _ref$fontFamily,
    _ref$fontSize = _ref.fontSize,
    fontSize = _ref$fontSize === void 0 ? 14 : _ref$fontSize,
    _ref$fontWeightLight = _ref.fontWeightLight,
    fontWeightLight = _ref$fontWeightLight === void 0 ? 300 : _ref$fontWeightLight,
    _ref$fontWeightRegula = _ref.fontWeightRegular,
    fontWeightRegular = _ref$fontWeightRegula === void 0 ? 400 : _ref$fontWeightRegula,
    _ref$fontWeightMedium = _ref.fontWeightMedium,
    fontWeightMedium = _ref$fontWeightMedium === void 0 ? 500 : _ref$fontWeightMedium,
    _ref$fontWeightBold = _ref.fontWeightBold,
    fontWeightBold = _ref$fontWeightBold === void 0 ? 700 : _ref$fontWeightBold,
    _ref$htmlFontSize = _ref.htmlFontSize,
    htmlFontSize = _ref$htmlFontSize === void 0 ? 16 : _ref$htmlFontSize,
    allVariants = _ref.allVariants,
    pxToRem2 = _ref.pxToRem,
    other = Object(objectWithoutProperties["a" /* default */])(_ref, ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"]);
  if (false) {}
  var coef = fontSize / 14;
  var pxToRem = pxToRem2 || function (size) {
    return "".concat(size / htmlFontSize * coef, "rem");
  };
  var buildVariant = function buildVariant(fontWeight, size, lineHeight, letterSpacing, casing) {
    return Object(esm_extends["a" /* default */])({
      fontFamily: fontFamily,
      fontWeight: fontWeight,
      fontSize: pxToRem(size),
      // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
      lineHeight: lineHeight
    }, fontFamily === defaultFontFamily ? {
      letterSpacing: "".concat(round(letterSpacing / size), "em")
    } : {}, casing, allVariants);
  };
  var variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return Object(deepmerge["a" /* default */])(Object(esm_extends["a" /* default */])({
    htmlFontSize: htmlFontSize,
    pxToRem: pxToRem,
    round: round,
    // TODO v5: remove
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeightLight: fontWeightLight,
    fontWeightRegular: fontWeightRegular,
    fontWeightMedium: fontWeightMedium,
    fontWeightBold: fontWeightBold
  }, variants), other, {
    clone: false // No need to clone deep
  });
}
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/shadows.js
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow() {
  return ["".concat(arguments.length <= 0 ? undefined : arguments[0], "px ").concat(arguments.length <= 1 ? undefined : arguments[1], "px ").concat(arguments.length <= 2 ? undefined : arguments[2], "px ").concat(arguments.length <= 3 ? undefined : arguments[3], "px rgba(0,0,0,").concat(shadowKeyUmbraOpacity, ")"), "".concat(arguments.length <= 4 ? undefined : arguments[4], "px ").concat(arguments.length <= 5 ? undefined : arguments[5], "px ").concat(arguments.length <= 6 ? undefined : arguments[6], "px ").concat(arguments.length <= 7 ? undefined : arguments[7], "px rgba(0,0,0,").concat(shadowKeyPenumbraOpacity, ")"), "".concat(arguments.length <= 8 ? undefined : arguments[8], "px ").concat(arguments.length <= 9 ? undefined : arguments[9], "px ").concat(arguments.length <= 10 ? undefined : arguments[10], "px ").concat(arguments.length <= 11 ? undefined : arguments[11], "px rgba(0,0,0,").concat(shadowAmbientShadowOpacity, ")")].join(',');
} // Values from https://github.com/material-components/material-components-web/blob/be8747f94574669cb5e7add1a7c54fa41a89cec7/packages/mdc-elevation/_variables.scss

var shadows = ['none', createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
/* harmony default export */ var styles_shadows = (shadows);
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/shape.js
var shape = {
  borderRadius: 4
};
/* harmony default export */ var styles_shape = (shape);
// EXTERNAL MODULE: ./node_modules/@material-ui/system/esm/spacing.js + 1 modules
var esm_spacing = __webpack_require__("+Hmc");

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createSpacing.js

var warnOnce;
function createSpacing() {
  var spacingInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 8;

  // Already transformed.
  if (spacingInput.mui) {
    return spacingInput;
  } // Material Design layouts are visually balanced. Most measurements align to an 8dp grid applied, which aligns both spacing and the overall layout.
  // Smaller components, such as icons and type, can align to a 4dp grid.
  // https://material.io/design/layout/understanding-layout.html#usage

  var transform = Object(esm_spacing["a" /* createUnarySpacing */])({
    spacing: spacingInput
  });
  var spacing = function spacing() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (false) {}
    if (args.length === 0) {
      return transform(1);
    }
    if (args.length === 1) {
      return transform(args[0]);
    }
    return args.map(function (argument) {
      if (typeof argument === 'string') {
        return argument;
      }
      var output = transform(argument);
      return typeof output === 'number' ? "".concat(output, "px") : output;
    }).join(' ');
  }; // Backward compatibility, to remove in v5.

  Object.defineProperty(spacing, 'unit', {
    get: function get() {
      if (false) {}
      return spacingInput;
    }
  });
  spacing.mui = true;
  return spacing;
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/transitions.js
var transitions = __webpack_require__("wpWl");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/zIndex.js
var zIndex = __webpack_require__("HwzS");

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/styles/createMuiTheme.js












function createMuiTheme() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$breakpoints = options.breakpoints,
    breakpointsInput = _options$breakpoints === void 0 ? {} : _options$breakpoints,
    _options$mixins = options.mixins,
    mixinsInput = _options$mixins === void 0 ? {} : _options$mixins,
    _options$palette = options.palette,
    paletteInput = _options$palette === void 0 ? {} : _options$palette,
    spacingInput = options.spacing,
    _options$typography = options.typography,
    typographyInput = _options$typography === void 0 ? {} : _options$typography,
    other = Object(objectWithoutProperties["a" /* default */])(options, ["breakpoints", "mixins", "palette", "spacing", "typography"]);
  var palette = createPalette(paletteInput);
  var breakpoints = createBreakpoints(breakpointsInput);
  var spacing = createSpacing(spacingInput);
  var muiTheme = Object(deepmerge["a" /* default */])({
    breakpoints: breakpoints,
    direction: 'ltr',
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    overrides: {},
    // Inject custom styles
    palette: palette,
    props: {},
    // Provide default props
    shadows: styles_shadows,
    typography: createTypography(palette, typographyInput),
    spacing: spacing,
    shape: styles_shape,
    transitions: transitions["a" /* default */],
    zIndex: zIndex["a" /* default */]
  }, other);
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  muiTheme = args.reduce(function (acc, argument) {
    return Object(deepmerge["a" /* default */])(acc, argument);
  }, muiTheme);
  if (false) { var traverse, pseudoClasses; }
  return muiTheme;
}
/* harmony default export */ var styles_createMuiTheme = __webpack_exports__["a"] = (createMuiTheme);

/***/ }),

/***/ "vuIU":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _createClass; });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("o46R");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, Object(_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "w0j3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ jssPreset; });

// EXTERNAL MODULE: ./node_modules/jss/dist/jss.esm.js
var jss_esm = __webpack_require__("/ceM");

// CONCATENATED MODULE: ./node_modules/jss-plugin-rule-value-function/dist/jss-plugin-rule-value-function.esm.js


var now = Date.now();
var fnValuesNs = "fnValues" + now;
var fnRuleNs = "fnStyle" + ++now;
function functionPlugin() {
  return {
    onCreateRule: function onCreateRule(name, decl, options) {
      if (typeof decl !== 'function') return null;
      var rule = Object(jss_esm["d" /* createRule */])(name, {}, options);
      rule[fnRuleNs] = decl;
      return rule;
    },
    onProcessStyle: function onProcessStyle(style, rule) {
      // We need to extract function values from the declaration, so that we can keep core unaware of them.
      // We need to do that only once.
      // We don't need to extract functions on each style update, since this can happen only once.
      // We don't support function values inside of function rules.
      if (fnValuesNs in rule || fnRuleNs in rule) return style;
      var fnValues = {};
      for (var prop in style) {
        var value = style[prop];
        if (typeof value !== 'function') continue;
        delete style[prop];
        fnValues[prop] = value;
      } // $FlowFixMe

      rule[fnValuesNs] = fnValues;
      return style;
    },
    onUpdate: function onUpdate(data, rule, sheet, options) {
      var styleRule = rule;
      var fnRule = styleRule[fnRuleNs]; // If we have a style function, the entire rule is dynamic and style object
      // will be returned from that function.

      if (fnRule) {
        // Empty object will remove all currently defined props
        // in case function rule returns a falsy value.
        styleRule.style = fnRule(data) || {};
        if (false) { var prop; }
      }
      var fnValues = styleRule[fnValuesNs]; // If we have a fn values map, it is a rule with function values.

      if (fnValues) {
        for (var _prop in fnValues) {
          styleRule.prop(_prop, fnValues[_prop](data), options);
        }
      }
    }
  };
}
/* harmony default export */ var jss_plugin_rule_value_function_esm = (functionPlugin);
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("wx14");

// CONCATENATED MODULE: ./node_modules/jss-plugin-global/dist/jss-plugin-global.esm.js


var at = '@global';
var atPrefix = '@global ';
var jss_plugin_global_esm_GlobalContainerRule = /*#__PURE__*/
function () {
  function GlobalContainerRule(key, styles, options) {
    this.type = 'global';
    this.at = at;
    this.rules = void 0;
    this.options = void 0;
    this.key = void 0;
    this.isProcessed = false;
    this.key = key;
    this.options = options;
    this.rules = new jss_esm["a" /* RuleList */](Object(esm_extends["a" /* default */])({}, options, {
      parent: this
    }));
    for (var selector in styles) {
      this.rules.add(selector, styles[selector]);
    }
    this.rules.process();
  }
  /**
   * Get a rule.
   */

  var _proto = GlobalContainerRule.prototype;
  _proto.getRule = function getRule(name) {
    return this.rules.get(name);
  }
  /**
   * Create and register rule, run plugins.
   */;

  _proto.addRule = function addRule(name, style, options) {
    var rule = this.rules.add(name, style, options);
    this.options.jss.plugins.onProcessRule(rule);
    return rule;
  }
  /**
   * Get index of a rule.
   */;

  _proto.indexOf = function indexOf(rule) {
    return this.rules.indexOf(rule);
  }
  /**
   * Generates a CSS string.
   */;

  _proto.toString = function toString() {
    return this.rules.toString();
  };
  return GlobalContainerRule;
}();
var jss_plugin_global_esm_GlobalPrefixedRule = /*#__PURE__*/
function () {
  function GlobalPrefixedRule(key, style, options) {
    this.type = 'global';
    this.at = at;
    this.options = void 0;
    this.rule = void 0;
    this.isProcessed = false;
    this.key = void 0;
    this.key = key;
    this.options = options;
    var selector = key.substr(atPrefix.length);
    this.rule = options.jss.createRule(selector, style, Object(esm_extends["a" /* default */])({}, options, {
      parent: this
    }));
  }
  var _proto2 = GlobalPrefixedRule.prototype;
  _proto2.toString = function toString(options) {
    return this.rule ? this.rule.toString(options) : '';
  };
  return GlobalPrefixedRule;
}();
var separatorRegExp = /\s*,\s*/g;
function addScope(selector, scope) {
  var parts = selector.split(separatorRegExp);
  var scoped = '';
  for (var i = 0; i < parts.length; i++) {
    scoped += scope + " " + parts[i].trim();
    if (parts[i + 1]) scoped += ', ';
  }
  return scoped;
}
function handleNestedGlobalContainerRule(rule) {
  var options = rule.options,
    style = rule.style;
  var rules = style ? style[at] : null;
  if (!rules) return;
  for (var name in rules) {
    options.sheet.addRule(name, rules[name], Object(esm_extends["a" /* default */])({}, options, {
      selector: addScope(name, rule.selector)
    }));
  }
  delete style[at];
}
function handlePrefixedGlobalRule(rule) {
  var options = rule.options,
    style = rule.style;
  for (var prop in style) {
    if (prop[0] !== '@' || prop.substr(0, at.length) !== at) continue;
    var selector = addScope(prop.substr(at.length), rule.selector);
    options.sheet.addRule(selector, style[prop], Object(esm_extends["a" /* default */])({}, options, {
      selector: selector
    }));
    delete style[prop];
  }
}
/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */

function jssGlobal() {
  function onCreateRule(name, styles, options) {
    if (!name) return null;
    if (name === at) {
      return new jss_plugin_global_esm_GlobalContainerRule(name, styles, options);
    }
    if (name[0] === '@' && name.substr(0, atPrefix.length) === atPrefix) {
      return new jss_plugin_global_esm_GlobalPrefixedRule(name, styles, options);
    }
    var parent = options.parent;
    if (parent) {
      if (parent.type === 'global' || parent.options.parent && parent.options.parent.type === 'global') {
        options.scoped = false;
      }
    }
    if (options.scoped === false) {
      options.selector = name;
    }
    return null;
  }
  function onProcessRule(rule) {
    if (rule.type !== 'style') return;
    handleNestedGlobalContainerRule(rule);
    handlePrefixedGlobalRule(rule);
  }
  return {
    onCreateRule: onCreateRule,
    onProcessRule: onProcessRule
  };
}
/* harmony default export */ var jss_plugin_global_esm = (jssGlobal);
// CONCATENATED MODULE: ./node_modules/jss-plugin-nested/dist/jss-plugin-nested.esm.js


var jss_plugin_nested_esm_separatorRegExp = /\s*,\s*/g;
var parentRegExp = /&/g;
var refRegExp = /\$([\w-]+)/g;
/**
 * Convert nested rules to separate, remove them from original styles.
 *
 * @param {Rule} rule
 * @api public
 */

function jssNested() {
  // Get a function to be used for $ref replacement.
  function getReplaceRef(container, sheet) {
    return function (match, key) {
      var rule = container.getRule(key) || sheet && sheet.getRule(key);
      if (rule) {
        rule = rule;
        return rule.selector;
      }
       false ? undefined : void 0;
      return key;
    };
  }
  function replaceParentRefs(nestedProp, parentProp) {
    var parentSelectors = parentProp.split(jss_plugin_nested_esm_separatorRegExp);
    var nestedSelectors = nestedProp.split(jss_plugin_nested_esm_separatorRegExp);
    var result = '';
    for (var i = 0; i < parentSelectors.length; i++) {
      var parent = parentSelectors[i];
      for (var j = 0; j < nestedSelectors.length; j++) {
        var nested = nestedSelectors[j];
        if (result) result += ', '; // Replace all & by the parent or prefix & with the parent.

        result += nested.indexOf('&') !== -1 ? nested.replace(parentRegExp, parent) : parent + " " + nested;
      }
    }
    return result;
  }
  function getOptions(rule, container, prevOptions) {
    // Options has been already created, now we only increase index.
    if (prevOptions) return Object(esm_extends["a" /* default */])({}, prevOptions, {
      index: prevOptions.index + 1
    });
    var nestingLevel = rule.options.nestingLevel;
    nestingLevel = nestingLevel === undefined ? 1 : nestingLevel + 1;
    var options = Object(esm_extends["a" /* default */])({}, rule.options, {
      nestingLevel: nestingLevel,
      index: container.indexOf(rule) + 1 // We don't need the parent name to be set options for chlid.
    });

    delete options.name;
    return options;
  }
  function onProcessStyle(style, rule, sheet) {
    if (rule.type !== 'style') return style;
    var styleRule = rule;
    var container = styleRule.options.parent;
    var options;
    var replaceRef;
    for (var prop in style) {
      var isNested = prop.indexOf('&') !== -1;
      var isNestedConditional = prop[0] === '@';
      if (!isNested && !isNestedConditional) continue;
      options = getOptions(styleRule, container, options);
      if (isNested) {
        var selector = replaceParentRefs(prop, styleRule.selector); // Lazily create the ref replacer function just once for
        // all nested rules within the sheet.

        if (!replaceRef) replaceRef = getReplaceRef(container, sheet); // Replace all $refs.

        selector = selector.replace(refRegExp, replaceRef);
        container.addRule(selector, style[prop], Object(esm_extends["a" /* default */])({}, options, {
          selector: selector
        }));
      } else if (isNestedConditional) {
        // Place conditional right after the parent rule to ensure right ordering.
        container.addRule(prop, {}, options) // Flow expects more options but they aren't required
        // And flow doesn't know this will always be a StyleRule which has the addRule method
        // $FlowFixMe
        .addRule(styleRule.key, style[prop], {
          selector: styleRule.selector
        });
      }
      delete style[prop];
    }
    return style;
  }
  return {
    onProcessStyle: onProcessStyle
  };
}
/* harmony default export */ var jss_plugin_nested_esm = (jssNested);
// CONCATENATED MODULE: ./node_modules/hyphenate-style-name/index.js
/* eslint-disable no-var, prefer-template */
var uppercasePattern = /[A-Z]/g;
var msPattern = /^ms-/;
var cache = {};
function toHyphenLower(match) {
  return '-' + match.toLowerCase();
}
function hyphenateStyleName(name) {
  if (cache.hasOwnProperty(name)) {
    return cache[name];
  }
  var hName = name.replace(uppercasePattern, toHyphenLower);
  return cache[name] = msPattern.test(hName) ? '-' + hName : hName;
}
/* harmony default export */ var hyphenate_style_name = (hyphenateStyleName);
// CONCATENATED MODULE: ./node_modules/jss-plugin-camel-case/dist/jss-plugin-camel-case.esm.js


/**
 * Convert camel cased property names to dash separated.
 *
 * @param {Object} style
 * @return {Object}
 */

function convertCase(style) {
  var converted = {};
  for (var prop in style) {
    var key = prop.indexOf('--') === 0 ? prop : hyphenate_style_name(prop);
    converted[key] = style[prop];
  }
  if (style.fallbacks) {
    if (Array.isArray(style.fallbacks)) converted.fallbacks = style.fallbacks.map(convertCase);else converted.fallbacks = convertCase(style.fallbacks);
  }
  return converted;
}
/**
 * Allow camel cased property names by converting them back to dasherized.
 *
 * @param {Rule} rule
 */

function camelCase() {
  function onProcessStyle(style) {
    if (Array.isArray(style)) {
      // Handle rules like @font-face, which can have multiple styles in an array
      for (var index = 0; index < style.length; index++) {
        style[index] = convertCase(style[index]);
      }
      return style;
    }
    return convertCase(style);
  }
  function onChangeValue(value, prop, rule) {
    if (prop.indexOf('--') === 0) {
      return value;
    }
    var hyphenatedProp = hyphenate_style_name(prop); // There was no camel case in place

    if (prop === hyphenatedProp) return value;
    rule.prop(hyphenatedProp, value); // Core will ignore that property value we set the proper one above.

    return null;
  }
  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}
/* harmony default export */ var jss_plugin_camel_case_esm = (camelCase);
// CONCATENATED MODULE: ./node_modules/jss-plugin-default-unit/dist/jss-plugin-default-unit.esm.js

var px = jss_esm["f" /* hasCSSTOMSupport */] && CSS ? CSS.px : 'px';
var ms = jss_esm["f" /* hasCSSTOMSupport */] && CSS ? CSS.ms : 'ms';
var percent = jss_esm["f" /* hasCSSTOMSupport */] && CSS ? CSS.percent : '%';
/**
 * Generated jss-plugin-default-unit CSS property units
 *
 * @type object
 */

var defaultUnits = {
  // Animation properties
  'animation-delay': ms,
  'animation-duration': ms,
  // Background properties
  'background-position': px,
  'background-position-x': px,
  'background-position-y': px,
  'background-size': px,
  // Border Properties
  border: px,
  'border-bottom': px,
  'border-bottom-left-radius': px,
  'border-bottom-right-radius': px,
  'border-bottom-width': px,
  'border-left': px,
  'border-left-width': px,
  'border-radius': px,
  'border-right': px,
  'border-right-width': px,
  'border-top': px,
  'border-top-left-radius': px,
  'border-top-right-radius': px,
  'border-top-width': px,
  'border-width': px,
  // Margin properties
  margin: px,
  'margin-bottom': px,
  'margin-left': px,
  'margin-right': px,
  'margin-top': px,
  // Padding properties
  padding: px,
  'padding-bottom': px,
  'padding-left': px,
  'padding-right': px,
  'padding-top': px,
  // Mask properties
  'mask-position-x': px,
  'mask-position-y': px,
  'mask-size': px,
  // Width and height properties
  height: px,
  width: px,
  'min-height': px,
  'max-height': px,
  'min-width': px,
  'max-width': px,
  // Position properties
  bottom: px,
  left: px,
  top: px,
  right: px,
  // Shadow properties
  'box-shadow': px,
  'text-shadow': px,
  // Column properties
  'column-gap': px,
  'column-rule': px,
  'column-rule-width': px,
  'column-width': px,
  // Font and text properties
  'font-size': px,
  'font-size-delta': px,
  'letter-spacing': px,
  'text-indent': px,
  'text-stroke': px,
  'text-stroke-width': px,
  'word-spacing': px,
  // Motion properties
  motion: px,
  'motion-offset': px,
  // Outline properties
  outline: px,
  'outline-offset': px,
  'outline-width': px,
  // Perspective properties
  perspective: px,
  'perspective-origin-x': percent,
  'perspective-origin-y': percent,
  // Transform properties
  'transform-origin': percent,
  'transform-origin-x': percent,
  'transform-origin-y': percent,
  'transform-origin-z': percent,
  // Transition properties
  'transition-delay': ms,
  'transition-duration': ms,
  // Alignment properties
  'vertical-align': px,
  'flex-basis': px,
  // Some random properties
  'shape-margin': px,
  size: px,
  // Grid properties
  grid: px,
  'grid-gap': px,
  'grid-row-gap': px,
  'grid-column-gap': px,
  'grid-template-rows': px,
  'grid-template-columns': px,
  'grid-auto-rows': px,
  'grid-auto-columns': px,
  // Not existing properties.
  // Used to avoid issues with jss-plugin-expand integration.
  'box-shadow-x': px,
  'box-shadow-y': px,
  'box-shadow-blur': px,
  'box-shadow-spread': px,
  'font-line-height': px,
  'text-shadow-x': px,
  'text-shadow-y': px,
  'text-shadow-blur': px
};

/**
 * Clones the object and adds a camel cased property version.
 */
function addCamelCasedVersion(obj) {
  var regExp = /(-[a-z])/g;
  var replace = function replace(str) {
    return str[1].toUpperCase();
  };
  var newObj = {};
  for (var _key in obj) {
    newObj[_key] = obj[_key];
    newObj[_key.replace(regExp, replace)] = obj[_key];
  }
  return newObj;
}
var units = addCamelCasedVersion(defaultUnits);
/**
 * Recursive deep style passing function
 */

function iterate(prop, value, options) {
  if (!value) return value;
  if (Array.isArray(value)) {
    for (var i = 0; i < value.length; i++) {
      value[i] = iterate(prop, value[i], options);
    }
  } else if (typeof value === 'object') {
    if (prop === 'fallbacks') {
      for (var innerProp in value) {
        value[innerProp] = iterate(innerProp, value[innerProp], options);
      }
    } else {
      for (var _innerProp in value) {
        value[_innerProp] = iterate(prop + "-" + _innerProp, value[_innerProp], options);
      }
    }
  } else if (typeof value === 'number') {
    var unit = options[prop] || units[prop];
    if (unit) {
      return typeof unit === 'function' ? unit(value).toString() : "" + value + unit;
    }
    return value.toString();
  }
  return value;
}
/**
 * Add unit to numeric values.
 */

function defaultUnit(options) {
  if (options === void 0) {
    options = {};
  }
  var camelCasedOptions = addCamelCasedVersion(options);
  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;
    for (var prop in style) {
      style[prop] = iterate(prop, style[prop], camelCasedOptions);
    }
    return style;
  }
  function onChangeValue(value, prop) {
    return iterate(prop, value, camelCasedOptions);
  }
  return {
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}
/* harmony default export */ var jss_plugin_default_unit_esm = (defaultUnit);
// EXTERNAL MODULE: ./node_modules/is-in-browser/dist/module.js
var dist_module = __webpack_require__("zteo");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 2 modules
var toConsumableArray = __webpack_require__("KQm4");

// CONCATENATED MODULE: ./node_modules/css-vendor/dist/css-vendor.esm.js



// Export javascript style and css style vendor prefixes.
var js = '';
var css = '';
var vendor = '';
var browser = '';
var isTouch = dist_module["a" /* default */] && 'ontouchstart' in document.documentElement; // We should not do anything if required serverside.

if (dist_module["a" /* default */]) {
  // Order matters. We need to check Webkit the last one because
  // other vendors use to add Webkit prefixes to some properties
  var jsCssMap = {
    Moz: '-moz-',
    ms: '-ms-',
    O: '-o-',
    Webkit: '-webkit-'
  };
  var _document$createEleme = document.createElement('p'),
    css_vendor_esm_style = _document$createEleme.style;
  var testProp = 'Transform';
  for (var css_vendor_esm_key in jsCssMap) {
    if (css_vendor_esm_key + testProp in css_vendor_esm_style) {
      js = css_vendor_esm_key;
      css = jsCssMap[css_vendor_esm_key];
      break;
    }
  } // Correctly detect the Edge browser.

  if (js === 'Webkit' && 'msHyphens' in css_vendor_esm_style) {
    js = 'ms';
    css = jsCssMap.ms;
    browser = 'edge';
  } // Correctly detect the Safari browser.

  if (js === 'Webkit' && '-apple-trailing-word' in css_vendor_esm_style) {
    vendor = 'apple';
  }
}
/**
 * Vendor prefix string for the current browser.
 *
 * @type {{js: String, css: String, vendor: String, browser: String}}
 * @api public
 */

var prefix = {
  js: js,
  css: css,
  vendor: vendor,
  browser: browser,
  isTouch: isTouch
};

/**
 * Test if a keyframe at-rule should be prefixed or not
 *
 * @param {String} vendor prefix string for the current browser.
 * @return {String}
 * @api public
 */

function supportedKeyframes(key) {
  // Keyframes is already prefixed. e.g. key = '@-webkit-keyframes a'
  if (key[1] === '-') return key; // No need to prefix IE/Edge. Older browsers will ignore unsupported rules.
  // https://caniuse.com/#search=keyframes

  if (prefix.js === 'ms') return key;
  return "@" + prefix.css + "keyframes" + key.substr(10);
}

// https://caniuse.com/#search=appearance

var appearence = {
  noPrefill: ['appearance'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'appearance') return false;
    if (prefix.js === 'ms') return "-webkit-" + prop;
    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=color-adjust

var colorAdjust = {
  noPrefill: ['color-adjust'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'color-adjust') return false;
    if (prefix.js === 'Webkit') return prefix.css + "print-" + prop;
    return prop;
  }
};
var regExp = /[-\s]+(.)?/g;
/**
 * Replaces the letter with the capital letter
 *
 * @param {String} match
 * @param {String} c
 * @return {String}
 * @api private
 */

function toUpper(match, c) {
  return c ? c.toUpperCase() : '';
}
/**
 * Convert dash separated strings to camel-cased.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function camelize(str) {
  return str.replace(regExp, toUpper);
}

/**
 * Convert dash separated strings to pascal cased.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function pascalize(str) {
  return camelize("-" + str);
}

// but we can use a longhand property instead.
// https://caniuse.com/#search=mask

var mask = {
  noPrefill: ['mask'],
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^mask/.test(prop)) return false;
    if (prefix.js === 'Webkit') {
      var longhand = 'mask-image';
      if (camelize(longhand) in style) {
        return prop;
      }
      if (prefix.js + pascalize(longhand) in style) {
        return prefix.css + prop;
      }
    }
    return prop;
  }
};

// https://caniuse.com/#search=text-orientation

var textOrientation = {
  noPrefill: ['text-orientation'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'text-orientation') return false;
    if (prefix.vendor === 'apple' && !prefix.isTouch) {
      return prefix.css + prop;
    }
    return prop;
  }
};

// https://caniuse.com/#search=transform

var transform = {
  noPrefill: ['transform'],
  supportedProperty: function supportedProperty(prop, style, options) {
    if (prop !== 'transform') return false;
    if (options.transform) {
      return prop;
    }
    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=transition

var transition = {
  noPrefill: ['transition'],
  supportedProperty: function supportedProperty(prop, style, options) {
    if (prop !== 'transition') return false;
    if (options.transition) {
      return prop;
    }
    return prefix.css + prop;
  }
};

// https://caniuse.com/#search=writing-mode

var writingMode = {
  noPrefill: ['writing-mode'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'writing-mode') return false;
    if (prefix.js === 'Webkit' || prefix.js === 'ms' && prefix.browser !== 'edge') {
      return prefix.css + prop;
    }
    return prop;
  }
};

// https://caniuse.com/#search=user-select

var userSelect = {
  noPrefill: ['user-select'],
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'user-select') return false;
    if (prefix.js === 'Moz' || prefix.js === 'ms' || prefix.vendor === 'apple') {
      return prefix.css + prop;
    }
    return prop;
  }
};

// https://caniuse.com/#search=multicolumn
// https://github.com/postcss/autoprefixer/issues/491
// https://github.com/postcss/autoprefixer/issues/177

var breakPropsOld = {
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^break-/.test(prop)) return false;
    if (prefix.js === 'Webkit') {
      var jsProp = "WebkitColumn" + pascalize(prop);
      return jsProp in style ? prefix.css + "column-" + prop : false;
    }
    if (prefix.js === 'Moz') {
      var _jsProp = "page" + pascalize(prop);
      return _jsProp in style ? "page-" + prop : false;
    }
    return false;
  }
};

// See https://github.com/postcss/autoprefixer/issues/324.

var inlineLogicalOld = {
  supportedProperty: function supportedProperty(prop, style) {
    if (!/^(border|margin|padding)-inline/.test(prop)) return false;
    if (prefix.js === 'Moz') return prop;
    var newProp = prop.replace('-inline', '');
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
  }
};

// Camelization is required because we can't test using.
// CSS syntax for e.g. in FF.

var unprefixed = {
  supportedProperty: function supportedProperty(prop, style) {
    return camelize(prop) in style ? prop : false;
  }
};
var prefixed = {
  supportedProperty: function supportedProperty(prop, style) {
    var pascalized = pascalize(prop); // Return custom CSS variable without prefixing.

    if (prop[0] === '-') return prop; // Return already prefixed value without prefixing.

    if (prop[0] === '-' && prop[1] === '-') return prop;
    if (prefix.js + pascalized in style) return prefix.css + prop; // Try webkit fallback.

    if (prefix.js !== 'Webkit' && "Webkit" + pascalized in style) return "-webkit-" + prop;
    return false;
  }
};

// https://caniuse.com/#search=scroll-snap

var scrollSnap = {
  supportedProperty: function supportedProperty(prop) {
    if (prop.substring(0, 11) !== 'scroll-snap') return false;
    if (prefix.js === 'ms') {
      return "" + prefix.css + prop;
    }
    return prop;
  }
};

// https://caniuse.com/#search=overscroll-behavior

var overscrollBehavior = {
  supportedProperty: function supportedProperty(prop) {
    if (prop !== 'overscroll-behavior') return false;
    if (prefix.js === 'ms') {
      return prefix.css + "scroll-chaining";
    }
    return prop;
  }
};
var propMap = {
  'flex-grow': 'flex-positive',
  'flex-shrink': 'flex-negative',
  'flex-basis': 'flex-preferred-size',
  'justify-content': 'flex-pack',
  order: 'flex-order',
  'align-items': 'flex-align',
  'align-content': 'flex-line-pack' // 'align-self' is handled by 'align-self' plugin.
}; // Support old flex spec from 2012.

var flex2012 = {
  supportedProperty: function supportedProperty(prop, style) {
    var newProp = propMap[prop];
    if (!newProp) return false;
    return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
  }
};
var propMap$1 = {
  flex: 'box-flex',
  'flex-grow': 'box-flex',
  'flex-direction': ['box-orient', 'box-direction'],
  order: 'box-ordinal-group',
  'align-items': 'box-align',
  'flex-flow': ['box-orient', 'box-direction'],
  'justify-content': 'box-pack'
};
var propKeys = Object.keys(propMap$1);
var prefixCss = function prefixCss(p) {
  return prefix.css + p;
}; // Support old flex spec from 2009.

var flex2009 = {
  supportedProperty: function supportedProperty(prop, style, _ref) {
    var multiple = _ref.multiple;
    if (propKeys.indexOf(prop) > -1) {
      var newProp = propMap$1[prop];
      if (!Array.isArray(newProp)) {
        return prefix.js + pascalize(newProp) in style ? prefix.css + newProp : false;
      }
      if (!multiple) return false;
      for (var i = 0; i < newProp.length; i++) {
        if (!(prefix.js + pascalize(newProp[0]) in style)) {
          return false;
        }
      }
      return newProp.map(prefixCss);
    }
    return false;
  }
};

// plugins = [
//   ...plugins,
//    breakPropsOld,
//    inlineLogicalOld,
//    unprefixed,
//    prefixed,
//    scrollSnap,
//    flex2012,
//    flex2009
// ]
// Plugins without 'noPrefill' value, going last.
// 'flex-*' plugins should be at the bottom.
// 'flex2009' going after 'flex2012'.
// 'prefixed' going after 'unprefixed'

var plugins = [appearence, colorAdjust, mask, textOrientation, transform, transition, writingMode, userSelect, breakPropsOld, inlineLogicalOld, unprefixed, prefixed, scrollSnap, overscrollBehavior, flex2012, flex2009];
var propertyDetectors = plugins.filter(function (p) {
  return p.supportedProperty;
}).map(function (p) {
  return p.supportedProperty;
});
var noPrefill = plugins.filter(function (p) {
  return p.noPrefill;
}).reduce(function (a, p) {
  a.push.apply(a, Object(toConsumableArray["a" /* default */])(p.noPrefill));
  return a;
}, []);
var el;
var css_vendor_esm_cache = {};
if (dist_module["a" /* default */]) {
  el = document.createElement('p'); // We test every property on vendor prefix requirement.
  // Once tested, result is cached. It gives us up to 70% perf boost.
  // http://jsperf.com/element-style-object-access-vs-plain-object
  //
  // Prefill cache with known css properties to reduce amount of
  // properties we need to feature test at runtime.
  // http://davidwalsh.name/vendor-prefix

  var computed = window.getComputedStyle(document.documentElement, '');
  for (var key$1 in computed) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(key$1)) css_vendor_esm_cache[computed[key$1]] = computed[key$1];
  } // Properties that cannot be correctly detected using the
  // cache prefill method.

  noPrefill.forEach(function (x) {
    return delete css_vendor_esm_cache[x];
  });
}
/**
 * Test if a property is supported, returns supported property with vendor
 * prefix if required. Returns `false` if not supported.
 *
 * @param {String} prop dash separated
 * @param {Object} [options]
 * @return {String|Boolean}
 * @api public
 */

function supportedProperty(prop, options) {
  if (options === void 0) {
    options = {};
  }

  // For server-side rendering.
  if (!el) return prop; // Remove cache for benchmark tests or return property from the cache.

  if ( true && css_vendor_esm_cache[prop] != null) {
    return css_vendor_esm_cache[prop];
  } // Check if 'transition' or 'transform' natively supported in browser.

  if (prop === 'transition' || prop === 'transform') {
    options[prop] = prop in el.style;
  } // Find a plugin for current prefix property.

  for (var i = 0; i < propertyDetectors.length; i++) {
    css_vendor_esm_cache[prop] = propertyDetectors[i](prop, el.style, options); // Break loop, if value found.

    if (css_vendor_esm_cache[prop]) break;
  } // Reset styles for current property.
  // Firefox can even throw an error for invalid properties, e.g., "0".

  try {
    el.style[prop] = '';
  } catch (err) {
    return false;
  }
  return css_vendor_esm_cache[prop];
}
var cache$1 = {};
var transitionProperties = {
  transition: 1,
  'transition-property': 1,
  '-webkit-transition': 1,
  '-webkit-transition-property': 1
};
var transPropsRegExp = /(^\s*[\w-]+)|, (\s*[\w-]+)(?![^()]*\))/g;
var el$1;
/**
 * Returns prefixed value transition/transform if needed.
 *
 * @param {String} match
 * @param {String} p1
 * @param {String} p2
 * @return {String}
 * @api private
 */

function prefixTransitionCallback(match, p1, p2) {
  if (p1 === 'var') return 'var';
  if (p1 === 'all') return 'all';
  if (p2 === 'all') return ', all';
  var prefixedValue = p1 ? supportedProperty(p1) : ", " + supportedProperty(p2);
  if (!prefixedValue) return p1 || p2;
  return prefixedValue;
}
if (dist_module["a" /* default */]) el$1 = document.createElement('p');
/**
 * Returns prefixed value if needed. Returns `false` if value is not supported.
 *
 * @param {String} property
 * @param {String} value
 * @return {String|Boolean}
 * @api public
 */

function supportedValue(property, value) {
  // For server-side rendering.
  var prefixedValue = value;
  if (!el$1 || property === 'content') return value; // It is a string or a number as a string like '1'.
  // We want only prefixable values here.
  // eslint-disable-next-line no-restricted-globals

  if (typeof prefixedValue !== 'string' || !isNaN(parseInt(prefixedValue, 10))) {
    return prefixedValue;
  } // Create cache key for current value.

  var cacheKey = property + prefixedValue; // Remove cache for benchmark tests or return value from cache.

  if ( true && cache$1[cacheKey] != null) {
    return cache$1[cacheKey];
  } // IE can even throw an error in some cases, for e.g. style.content = 'bar'.

  try {
    // Test value as it is.
    el$1.style[property] = prefixedValue;
  } catch (err) {
    // Return false if value not supported.
    cache$1[cacheKey] = false;
    return false;
  } // If 'transition' or 'transition-property' property.

  if (transitionProperties[property]) {
    prefixedValue = prefixedValue.replace(transPropsRegExp, prefixTransitionCallback);
  } else if (el$1.style[property] === '') {
    // Value with a vendor prefix.
    prefixedValue = prefix.css + prefixedValue; // Hardcode test to convert "flex" to "-ms-flexbox" for IE10.

    if (prefixedValue === '-ms-flex') el$1.style[property] = '-ms-flexbox'; // Test prefixed value.

    el$1.style[property] = prefixedValue; // Return false if value not supported.

    if (el$1.style[property] === '') {
      cache$1[cacheKey] = false;
      return false;
    }
  } // Reset styles for current property.

  el$1.style[property] = ''; // Write current value to cache.

  cache$1[cacheKey] = prefixedValue;
  return cache$1[cacheKey];
}

// CONCATENATED MODULE: ./node_modules/jss-plugin-vendor-prefixer/dist/jss-plugin-vendor-prefixer.esm.js



/**
 * Add vendor prefix to a property name when needed.
 *
 * @api public
 */

function jssVendorPrefixer() {
  function onProcessRule(rule) {
    if (rule.type === 'keyframes') {
      var atRule = rule;
      atRule.at = supportedKeyframes(atRule.at);
    }
  }
  function prefixStyle(style) {
    for (var prop in style) {
      var value = style[prop];
      if (prop === 'fallbacks' && Array.isArray(value)) {
        style[prop] = value.map(prefixStyle);
        continue;
      }
      var changeProp = false;
      var supportedProp = supportedProperty(prop);
      if (supportedProp && supportedProp !== prop) changeProp = true;
      var changeValue = false;
      var supportedValue$1 = supportedValue(supportedProp, Object(jss_esm["g" /* toCssValue */])(value));
      if (supportedValue$1 && supportedValue$1 !== value) changeValue = true;
      if (changeProp || changeValue) {
        if (changeProp) delete style[prop];
        style[supportedProp || prop] = supportedValue$1 || value;
      }
    }
    return style;
  }
  function onProcessStyle(style, rule) {
    if (rule.type !== 'style') return style;
    return prefixStyle(style);
  }
  function onChangeValue(value, prop) {
    return supportedValue(prop, Object(jss_esm["g" /* toCssValue */])(value)) || value;
  }
  return {
    onProcessRule: onProcessRule,
    onProcessStyle: onProcessStyle,
    onChangeValue: onChangeValue
  };
}
/* harmony default export */ var jss_plugin_vendor_prefixer_esm = (jssVendorPrefixer);
// CONCATENATED MODULE: ./node_modules/jss-plugin-props-sort/dist/jss-plugin-props-sort.esm.js
/**
 * Sort props by length.
 */
function jssPropsSort() {
  var sort = function sort(prop0, prop1) {
    if (prop0.length === prop1.length) {
      return prop0 > prop1 ? 1 : -1;
    }
    return prop0.length - prop1.length;
  };
  return {
    onProcessStyle: function onProcessStyle(style, rule) {
      if (rule.type !== 'style') return style;
      var newStyle = {};
      var props = Object.keys(style).sort(sort);
      for (var i = 0; i < props.length; i++) {
        newStyle[props[i]] = style[props[i]];
      }
      return newStyle;
    }
  };
}
/* harmony default export */ var jss_plugin_props_sort_esm = (jssPropsSort);
// CONCATENATED MODULE: ./node_modules/@material-ui/styles/esm/jssPreset/jssPreset.js






 // Subset of jss-preset-default with only the plugins the Material-UI components are using.

function jssPreset() {
  return {
    plugins: [jss_plugin_rule_value_function_esm(), jss_plugin_global_esm(), jss_plugin_nested_esm(), jss_plugin_camel_case_esm(), jss_plugin_default_unit_esm(),
    // Disable the vendor prefixer server-side, it does nothing.
    // This way, we can get a performance boost.
    // In the documentation, we are using `autoprefixer` to solve this problem.
    typeof window === 'undefined' ? null : jss_plugin_vendor_prefixer_esm(), jss_plugin_props_sort_esm()]
  };
}

/***/ }),

/***/ "wJYx":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
__webpack_require__("7444");exports.onClientEntry=function(){window.copyToClipboard=function(str,toasterId){var el=document.createElement('textarea');el.className='gatsby-code-button-buffer';el.innerHTML=str;document.body.appendChild(el);var range=document.createRange();range.selectNode(el);window.getSelection().removeAllRanges();window.getSelection().addRange(range);document.execCommand("copy");document.activeElement.blur();setTimeout(function(){document.getSelection().removeAllRanges();document.body.removeChild(el);},100);if(toasterId){window.showClipboardToaster(toasterId);}};window.showClipboardToaster=function(toasterId){var textElem=document.querySelector("[data-toaster-id=\"".concat(toasterId,"\"]"));if(!textElem){return;}var el=document.createElement('div');el.className=textElem.dataset.toasterClass;el.innerHTML="\n      <div class=\"".concat(textElem.dataset.toasterTextClass,"\">\n        ").concat(textElem.dataset.toasterText,"\n      </div>\n    ").trim();document.body.appendChild(el);setTimeout(function(){document.body.removeChild(el);},textElem.dataset.toasterDuration);};};

/***/ }),

/***/ "wpWl":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export easing */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return duration; });
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("Ff2n");

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
var easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
}; // Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing

var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return "".concat(Math.round(milliseconds), "ms");
}
/**
 * @param {string|Array} props
 * @param {object} param
 * @param {string} param.prop
 * @param {number} param.duration
 * @param {string} param.easing
 * @param {number} param.delay
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  easing: easing,
  duration: duration,
  create: function create() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['all'];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$duration = options.duration,
      durationOption = _options$duration === void 0 ? duration.standard : _options$duration,
      _options$easing = options.easing,
      easingOption = _options$easing === void 0 ? easing.easeInOut : _options$easing,
      _options$delay = options.delay,
      delay = _options$delay === void 0 ? 0 : _options$delay,
      other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(options, ["duration", "easing", "delay"]);
    if (false) { var isNumber, isString; }
    return (Array.isArray(props) ? props : [props]).map(function (animatedProp) {
      return "".concat(animatedProp, " ").concat(typeof durationOption === 'string' ? durationOption : formatMs(durationOption), " ").concat(easingOption, " ").concat(typeof delay === 'string' ? delay : formatMs(delay));
    }).join(',');
  },
  getAutoHeightDuration: function getAutoHeightDuration(height) {
    if (!height) {
      return 0;
    }
    var constant = height / 36; // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10

    return Math.round((4 + 15 * Math.pow(constant, 0.25) + constant / 5) * 10);
  }
});

/***/ }),

/***/ "wx14":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _extends; });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "xtsi":
/***/ (function(module, exports, __webpack_require__) {

const plugins=__webpack_require__("LeKB");const{getResourcesForPathname,getResourcesForPathnameSync,getResourceURLsForPathname,loadPage,loadPageSync}=__webpack_require__("emEt").publicLoader;exports.apiRunner=function(api,args,defaultReturn,argTransform){if(args===void 0){args={};}// Hooks for gatsby-cypress's API handler
if(undefined){if(window.___apiHandler){window.___apiHandler(api);}else if(window.___resolvedAPIs){window.___resolvedAPIs.push(api);}else{window.___resolvedAPIs=[api];}}let results=plugins.map(plugin=>{if(!plugin.plugin[api]){return undefined;}// Deprecated April 2019. Use `loadPageSync` instead
args.getResourcesForPathnameSync=getResourcesForPathnameSync;// Deprecated April 2019. Use `loadPage` instead
args.getResourcesForPathname=getResourcesForPathname;args.getResourceURLsForPathname=getResourceURLsForPathname;args.loadPage=loadPage;args.loadPageSync=loadPageSync;const result=plugin.plugin[api](args,plugin.options);if(result&&argTransform){args=argTransform({args,result,plugin});}return result;});// Filter out undefined results.
results=results.filter(result=>typeof result!==`undefined`);if(results.length>0){return results;}else if(defaultReturn){return[defaultReturn];}else{return[];}};exports.apiRunnerAsync=(api,args,defaultReturn)=>plugins.reduce((previous,next)=>next.plugin[api]?previous.then(()=>next.plugin[api](args,next.options)):previous,Promise.resolve());

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ye/S":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export hexToRgb */
/* unused harmony export rgbToHex */
/* unused harmony export hslToRgb */
/* unused harmony export decomposeColor */
/* unused harmony export recomposeColor */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return getContrastRatio; });
/* unused harmony export getLuminance */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return emphasize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return fade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return darken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return lighten; });
/* harmony import */ var _material_ui_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("TrhM");


/* eslint-disable no-use-before-define */

/**
 * Returns a number whose value is limited to the given range.
 *
 * @param {number} value The value to be clamped
 * @param {number} min The lower boundary of the output range
 * @param {number} max The upper boundary of the output range
 * @returns {number} A number in the range [min, max]
 */
function clamp(value) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (false) {}
  return Math.min(Math.max(min, value), max);
}
/**
 * Converts a color from CSS hex format to CSS rgb format.
 *
 * @param {string} color - Hex color, i.e. #nnn or #nnnnnn
 * @returns {string} A CSS rgb color string
 */

function hexToRgb(color) {
  color = color.substr(1);
  var re = new RegExp(".{1,".concat(color.length >= 6 ? 2 : 1, "}"), 'g');
  var colors = color.match(re);
  if (colors && colors[0].length === 1) {
    colors = colors.map(function (n) {
      return n + n;
    });
  }
  return colors ? "rgb".concat(colors.length === 4 ? 'a' : '', "(").concat(colors.map(function (n, index) {
    return index < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1000) / 1000;
  }).join(', '), ")") : '';
}
function intToHex(int) {
  var hex = int.toString(16);
  return hex.length === 1 ? "0".concat(hex) : hex;
}
/**
 * Converts a color from CSS rgb format to CSS hex format.
 *
 * @param {string} color - RGB color, i.e. rgb(n, n, n)
 * @returns {string} A CSS rgb color string, i.e. #nnnnnn
 */

function rgbToHex(color) {
  // Idempotent
  if (color.indexOf('#') === 0) {
    return color;
  }
  var _decomposeColor = decomposeColor(color),
    values = _decomposeColor.values;
  return "#".concat(values.map(function (n) {
    return intToHex(n);
  }).join(''));
}
/**
 * Converts a color from hsl format to rgb format.
 *
 * @param {string} color - HSL color values
 * @returns {string} rgb color values
 */

function hslToRgb(color) {
  color = decomposeColor(color);
  var _color = color,
    values = _color.values;
  var h = values[0];
  var s = values[1] / 100;
  var l = values[2] / 100;
  var a = s * Math.min(l, 1 - l);
  var f = function f(n) {
    var k = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  var type = 'rgb';
  var rgb = [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
  if (color.type === 'hsla') {
    type += 'a';
    rgb.push(values[3]);
  }
  return recomposeColor({
    type: type,
    values: rgb
  });
}
/**
 * Returns an object with the type and values of a color.
 *
 * Note: Does not support rgb % values.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {object} - A MUI color object: {type: string, values: number[]}
 */

function decomposeColor(color) {
  // Idempotent
  if (color.type) {
    return color;
  }
  if (color.charAt(0) === '#') {
    return decomposeColor(hexToRgb(color));
  }
  var marker = color.indexOf('(');
  var type = color.substring(0, marker);
  if (['rgb', 'rgba', 'hsl', 'hsla'].indexOf(type) === -1) {
    throw new Error( false ? undefined : Object(_material_ui_utils__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(3, color));
  }
  var values = color.substring(marker + 1, color.length - 1).split(',');
  values = values.map(function (value) {
    return parseFloat(value);
  });
  return {
    type: type,
    values: values
  };
}
/**
 * Converts a color object with type and values to a string.
 *
 * @param {object} color - Decomposed color
 * @param {string} color.type - One of: 'rgb', 'rgba', 'hsl', 'hsla'
 * @param {array} color.values - [n,n,n] or [n,n,n,n]
 * @returns {string} A CSS color string
 */

function recomposeColor(color) {
  var type = color.type;
  var values = color.values;
  if (type.indexOf('rgb') !== -1) {
    // Only convert the first 3 values to int (i.e. not alpha)
    values = values.map(function (n, i) {
      return i < 3 ? parseInt(n, 10) : n;
    });
  } else if (type.indexOf('hsl') !== -1) {
    values[1] = "".concat(values[1], "%");
    values[2] = "".concat(values[2], "%");
  }
  return "".concat(type, "(").concat(values.join(', '), ")");
}
/**
 * Calculates the contrast ratio between two colors.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} foreground - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {string} background - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} A contrast ratio value in the range 0 - 21.
 */

function getContrastRatio(foreground, background) {
  var lumA = getLuminance(foreground);
  var lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
/**
 * The relative brightness of any point in a color space,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * Formula: https://www.w3.org/TR/WCAG20-TECHS/G17.html#G17-tests
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @returns {number} The relative brightness of the color in the range 0 - 1
 */

function getLuminance(color) {
  color = decomposeColor(color);
  var rgb = color.type === 'hsl' ? decomposeColor(hslToRgb(color)).values : color.values;
  rgb = rgb.map(function (val) {
    val /= 255; // normalized

    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  }); // Truncate at 3 digits

  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
/**
 * Darken or lighten a color, depending on its luminance.
 * Light colors are darkened, dark colors are lightened.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient=0.15 - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function emphasize(color) {
  var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.15;
  return getLuminance(color) > 0.5 ? darken(color, coefficient) : lighten(color, coefficient);
}
/**
 * Set the absolute transparency of a color.
 * Any existing alpha values are overwritten.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} value - value to set the alpha channel to in the range 0 -1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function fade(color, value) {
  color = decomposeColor(color);
  value = clamp(value);
  if (color.type === 'rgb' || color.type === 'hsl') {
    color.type += 'a';
  }
  color.values[3] = value;
  return recomposeColor(color);
}
/**
 * Darkens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function darken(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] *= 1 - coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] *= 1 - coefficient;
    }
  }
  return recomposeColor(color);
}
/**
 * Lightens a color.
 *
 * @param {string} color - CSS color, i.e. one of: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla()
 * @param {number} coefficient - multiplier in the range 0 - 1
 * @returns {string} A CSS color string. Hex input values are returned as rgb
 */

function lighten(color, coefficient) {
  color = decomposeColor(color);
  coefficient = clamp(coefficient);
  if (color.type.indexOf('hsl') !== -1) {
    color.values[2] += (100 - color.values[2]) * coefficient;
  } else if (color.type.indexOf('rgb') !== -1) {
    for (var i = 0; i < 3; i += 1) {
      color.values[i] += (255 - color.values[i]) * coefficient;
    }
  }
  return recomposeColor(color);
}

/***/ }),

/***/ "ykrT":
/***/ (function(module, exports) {

module.exports=null;

/***/ }),

/***/ "zLVn":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _objectWithoutPropertiesLoose; });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

/***/ }),

/***/ "zteo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isBrowser */
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
var isBrowser = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object' && document.nodeType === 9;
/* harmony default export */ __webpack_exports__["a"] = (isBrowser);

/***/ })

},[["UxWs",5,20,18]]]);
//# sourceMappingURL=app-e24077c4e63092cb7e7a.js.map