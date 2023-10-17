(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

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

/***/ "8ujH":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies
 */

var debug = __webpack_require__("GTTd")('jsonp');

/**
 * Module exports.
 */

module.exports = jsonp;

/**
 * Callback index.
 */

var count = 0;

/**
 * Noop function.
 */

function noop() {}

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`__jp`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */

function jsonp(url, opts, fn) {
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};
  var prefix = opts.prefix || '__jp';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || prefix + count++;
  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;
  if (timeout) {
    timer = setTimeout(function () {
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }
  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop;
    if (timer) clearTimeout(timer);
  }
  function cancel() {
    if (window[id]) {
      cleanup();
    }
  }
  window[id] = function (data) {
    debug('jsonp got', data);
    cleanup();
    if (fn) fn(null, data);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');
  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);
  return cancel;
}

/***/ }),

/***/ "AB20":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ esm_formatUrl; });

// UNUSED EXPORTS: getCacheDefeatStr, parseQuery, parseUrl, formatQuery, UrlParamValue, UrlParams, NullableUrlParams

// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/getCacheDefeatStr.js
// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
var cacheDefeatStrCallCount = 0;
/**
* Returns a string value (generated using the time and a random number)
* that can be used as a query parameter value to cause a URL to be
* unique in order to defeat caching.
* @returns {string} Cache defeat string
*/

var getCacheDefeatStr = function getCacheDefeatStr() {
  // Three pieces of randomness:
  // current timestamp
  var timestamp = Date.now(); // random number between 1-1000

  var randomNum = Math.round(Math.random() * 1000); // continuously incrementing counter

  var counter = cacheDefeatStrCallCount++;
  return "".concat(timestamp).concat(randomNum).concat(counter);
};
/* harmony default export */ var esm_getCacheDefeatStr = (getCacheDefeatStr);
// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/utils.js
var splitOnQuery = function splitOnQuery() {
  var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var favorQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var urlString = "".concat(url);
  var queryPos = urlString.indexOf('?'); // If the URL doesn't have a "?" we have to decide how we want to handle the string.
  // If favorQuery === true, then we'll assume the entire string is the query string.
  // If !favorQuery then we set the queryPos to the end of the string (meaning the
  // query string is empty)

  if (queryPos < 0 && !favorQuery) {
    queryPos = urlString.length;
  }
  return {
    urlPath: urlString.slice(0, queryPos),
    queryString: urlString.slice(queryPos + 1)
  };
};
var encode = function encode(str) {
  return encodeURIComponent("".concat(str));
};
var decode = function decode(str) {
  return str != null ? decodeURIComponent(str) : '';
};
// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/parseQuery.js
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}


/**
* Parses query parameters from a string, returning the query parameters as an object.
* @param {string} [strToParse=''] - The string from which to parse query parameters
* @param {boolean} [favorQuery=true] - Whether or not to treat the full string to parse as query parameters when it doesn't have "?" in it
* @returns {UrlParams} Parsed query parameters
*/
var parseQuery_parseQuery = function parseQuery() {
  var strToParse = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var favorQuery = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  // Ensure that all we parse is a query string
  var _splitOnQuery = splitOnQuery(strToParse, favorQuery !== false),
    _splitOnQuery$querySt = _splitOnQuery.queryString,
    queryString = _splitOnQuery$querySt === void 0 ? '' : _splitOnQuery$querySt;
  return queryString.split('&').reduce(function (prevUrlParams, serializedUrlParamPair) {
    var urlParams = prevUrlParams;
    var _serializedUrlParamPa = serializedUrlParamPair.split('='),
      _serializedUrlParamPa2 = _slicedToArray(_serializedUrlParamPa, 2),
      urlParamNameEncoded = _serializedUrlParamPa2[0],
      urlParamValueEncoded = _serializedUrlParamPa2[1];
    if (urlParamNameEncoded) {
      urlParams[decode(urlParamNameEncoded)] = decode(urlParamValueEncoded);
    }
    return urlParams;
  }, {});
};
/* harmony default export */ var esm_parseQuery = (parseQuery_parseQuery);
// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/parseUrl.js
// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.
// eslint-disable-next-line no-useless-escape
var URL_REG_EXP = /^(([^:\\\/]+:)\/\/(([^:\\\/]*)(:(\d+))?)?)?(([^\?#]*[\\\/])?(([^\\\/\?#]*?)(\.([^\.\?#]+))?))(\?([^#]*))?(#(.*))?$/; // See docs for explanation of each segment

var URL_SEGMENTS = ['href', 'fullDomain', 'protocol', 'host', 'hostname', '', 'port', 'pathname', 'folderPath', 'file', 'fileName', 'extension', 'fileType', 'search', 'query', 'hash', 'anchor'];
/**
* Parses the specified URL string into an object containing properties for the various logical segments.
* @param {string | null} [url] URL to parse
* @returns {ParsedUrl} Parsed URL as url segments object
*/

var parseUrl = function parseUrl(url) {
  var urlSegmentsMatch = url && url.match(URL_REG_EXP);
  var getUrlSegment = function getUrlSegment(segmentNo) {
    return urlSegmentsMatch ? urlSegmentsMatch[segmentNo] || '' : '';
  };
  return URL_SEGMENTS.reduce(function (prevParsedUrl, segmentName, segmentNo) {
    var parsedUrl = prevParsedUrl;
    if (segmentName) {
      parsedUrl[segmentName] = getUrlSegment(segmentNo);
    }
    return parsedUrl;
  }, {});
};
/* harmony default export */ var esm_parseUrl = (parseUrl);
// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/formatQuery.js
function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}

// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.

var IMMUTABLE_EMPTY_OBJECT = {};
/**
 * Serializes the properties of a params object to produce a URL query string.
 * @param {NullableUrlParams | NullableUrlParams[]} [urlParams] - An object (or array of objects) representing the query
 * @returns {string} Serialized query string
 */

var formatQuery_formatQuery = function formatQuery(urlParams) {
  var paramsObj = urlParams;
  if (Array.isArray(paramsObj)) {
    paramsObj = paramsObj.length < 2 ? paramsObj[0] : Object.assign.apply(Object, [{}].concat(_toConsumableArray(paramsObj)));
  }
  var normalizedParams = paramsObj || IMMUTABLE_EMPTY_OBJECT;
  return Object.keys(normalizedParams).reduce(function (prevUrlParamPairs, paramName) {
    var urlParamPairs = prevUrlParamPairs;
    var paramValue;
    if (paramName) {
      paramValue = normalizedParams[paramName];
      if (paramValue != null) {
        urlParamPairs.push("".concat(encode(paramName), "=").concat(encode(paramValue)));
      }
    }
    return urlParamPairs;
  }, []).join('&');
};
/* harmony default export */ var esm_formatQuery = (formatQuery_formatQuery);
// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/formatUrl.js
function formatUrl_toConsumableArray(arr) {
  return formatUrl_arrayWithoutHoles(arr) || formatUrl_iterableToArray(arr) || formatUrl_nonIterableSpread();
}
function formatUrl_nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function formatUrl_arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
function _toArray(arr) {
  return formatUrl_arrayWithHoles(arr) || formatUrl_iterableToArray(arr) || formatUrl_nonIterableRest();
}
function formatUrl_nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
function formatUrl_iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function formatUrl_arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

// Adapted from the Uize.Url module, a part of the UIZE JavaScript Framework.



var IMMUTABLE_EMPTY_ARRAY = [];
/**
* Serializes the specified URL path with properties of a params object to produce a URL.
* @param {string} [urlPath] - Base URL path
* @param {NullableUrlParams} [urlParams] - Query params to combine with base URL
* @returns {string} Serialized URL
*/

// eslint-disable-next-line func-style
function formatUrl(urlPath, urlParams) {
  var formattedUrl = urlPath;
  var queryParams = urlParams; // if they passed an array as the first parameter, separate out the first
  // element (url) from the other elements (query params list)

  if (Array.isArray(formattedUrl)) {
    var _formattedUrl = formattedUrl,
      _formattedUrl2 = _toArray(_formattedUrl),
      url = _formattedUrl2[0],
      _urlParamsList = _formattedUrl2.slice(1);
    queryParams = _urlParamsList.concat(queryParams || IMMUTABLE_EMPTY_ARRAY);
    formattedUrl = url;
  } // Pull out any query params from the URL

  var parsedQueryParamsFromUrl = esm_parseQuery(formattedUrl, false); // Convert the query params into an array (if it already isn't)

  var normalizedQueryParams = Array.isArray(queryParams) ? queryParams : [queryParams]; // Serialize the query params to a query string

  var queryString = esm_formatQuery([parsedQueryParamsFromUrl].concat(formatUrl_toConsumableArray(normalizedQueryParams))); // Finally build the URL by stripping out any query string from the URL and
  // appending the query string

  return splitOnQuery(formattedUrl).urlPath + (queryString ? '?' : '') + queryString;
}
/* harmony default export */ var esm_formatUrl = (formatUrl);
// EXTERNAL MODULE: ./node_modules/url-lib/lib/esm/types.js
var types = __webpack_require__("cP6f");

// CONCATENATED MODULE: ./node_modules/url-lib/lib/esm/index.js







/***/ }),

/***/ "DODd":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/url-lib/lib/esm/index.js + 6 modules
var esm = __webpack_require__("AB20");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__("R/WZ");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("ZBNC");

// CONCATENATED MODULE: ./node_modules/react-share/es/utils/assert.js
var __extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var AssertionError = /** @class */function (_super) {
  __extends(AssertionError, _super);
  function AssertionError(message) {
    var _this = _super.call(this, message) || this;
    _this.name = 'AssertionError';
    return _this;
  }
  return AssertionError;
}(Error);
function assert(value, message) {
  if (!value) {
    throw new AssertionError(message);
  }
}
// CONCATENATED MODULE: ./node_modules/react-share/es/utils/objectToGetParams.js
function objectToGetParams(object) {
  var params = Object.entries(object).filter(function (_a) {
    var value = _a[1];
    return value !== undefined && value !== null;
  }).map(function (_a) {
    var key = _a[0],
      value = _a[1];
    return encodeURIComponent(key) + "=" + encodeURIComponent(String(value));
  });
  return params.length > 0 ? "?" + params.join('&') : '';
}
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__("TSYQ");
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);

// CONCATENATED MODULE: ./node_modules/react-share/es/ShareButton.js
var ShareButton_extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = undefined && undefined.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = undefined && undefined.__generator || function (thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: []
    },
    f,
    y,
    t,
    g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
var __rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var isPromise = function (obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
var getBoxPositionOnWindowCenter = function (width, height) {
  return {
    left: window.outerWidth / 2 + (window.screenX || window.screenLeft || 0) - width / 2,
    top: window.outerHeight / 2 + (window.screenY || window.screenTop || 0) - height / 2
  };
};
var getBoxPositionOnScreenCenter = function (width, height) {
  return {
    top: (window.screen.height - height) / 2,
    left: (window.screen.width - width) / 2
  };
};
function windowOpen(url, _a, onClose) {
  var height = _a.height,
    width = _a.width,
    configRest = __rest(_a, ["height", "width"]);
  var config = __assign({
    height: height,
    width: width,
    location: 'no',
    toolbar: 'no',
    status: 'no',
    directories: 'no',
    menubar: 'no',
    scrollbars: 'yes',
    resizable: 'no',
    centerscreen: 'yes',
    chrome: 'yes'
  }, configRest);
  var shareDialog = window.open(url, '', Object.keys(config).map(function (key) {
    return key + "=" + config[key];
  }).join(', '));
  if (onClose) {
    var interval_1 = window.setInterval(function () {
      try {
        if (shareDialog === null || shareDialog.closed) {
          window.clearInterval(interval_1);
          onClose(shareDialog);
        }
      } catch (e) {
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      }
    }, 1000);
  }
  return shareDialog;
}
var ShareButton_ShareButton = /** @class */function (_super) {
  ShareButton_extends(ShareButton, _super);
  function ShareButton() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.openShareDialog = function (link) {
      var _a = _this.props,
        onShareWindowClose = _a.onShareWindowClose,
        _b = _a.windowHeight,
        windowHeight = _b === void 0 ? 400 : _b,
        _c = _a.windowPosition,
        windowPosition = _c === void 0 ? 'windowCenter' : _c,
        _d = _a.windowWidth,
        windowWidth = _d === void 0 ? 550 : _d;
      var windowConfig = __assign({
        height: windowHeight,
        width: windowWidth
      }, windowPosition === 'windowCenter' ? getBoxPositionOnWindowCenter(windowWidth, windowHeight) : getBoxPositionOnScreenCenter(windowWidth, windowHeight));
      windowOpen(link, windowConfig, onShareWindowClose);
    };
    _this.handleClick = function (event) {
      return __awaiter(_this, void 0, void 0, function () {
        var _a, beforeOnClick, disabled, networkLink, onClick, url, openShareDialogOnClick, opts, link, returnVal;
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              _a = this.props, beforeOnClick = _a.beforeOnClick, disabled = _a.disabled, networkLink = _a.networkLink, onClick = _a.onClick, url = _a.url, openShareDialogOnClick = _a.openShareDialogOnClick, opts = _a.opts;
              link = networkLink(url, opts);
              if (disabled) {
                return [2 /*return*/];
              }

              event.preventDefault();
              if (!beforeOnClick) return [3 /*break*/, 2];
              returnVal = beforeOnClick();
              if (!isPromise(returnVal)) return [3 /*break*/, 2];
              return [4 /*yield*/, returnVal];
            case 1:
              _b.sent();
              _b.label = 2;
            case 2:
              if (openShareDialogOnClick) {
                this.openShareDialog(link);
              }
              if (onClick) {
                onClick(event, link);
              }
              return [2 /*return*/];
          }
        });
      });
    };

    return _this;
  }
  ShareButton.prototype.render = function () {
    var _a = this.props,
      beforeOnClick = _a.beforeOnClick,
      children = _a.children,
      className = _a.className,
      disabled = _a.disabled,
      disabledStyle = _a.disabledStyle,
      forwardedRef = _a.forwardedRef,
      networkLink = _a.networkLink,
      networkName = _a.networkName,
      onShareWindowClose = _a.onShareWindowClose,
      openShareDialogOnClick = _a.openShareDialogOnClick,
      opts = _a.opts,
      resetButtonStyle = _a.resetButtonStyle,
      style = _a.style,
      url = _a.url,
      windowHeight = _a.windowHeight,
      windowPosition = _a.windowPosition,
      windowWidth = _a.windowWidth,
      rest = __rest(_a, ["beforeOnClick", "children", "className", "disabled", "disabledStyle", "forwardedRef", "networkLink", "networkName", "onShareWindowClose", "openShareDialogOnClick", "opts", "resetButtonStyle", "style", "url", "windowHeight", "windowPosition", "windowWidth"]);
    var newClassName = classnames_default()('react-share__ShareButton', {
      'react-share__ShareButton--disabled': !!disabled,
      disabled: !!disabled
    }, className);
    var newStyle = resetButtonStyle ? __assign(__assign({
      backgroundColor: 'transparent',
      border: 'none',
      padding: 0,
      font: 'inherit',
      color: 'inherit',
      cursor: 'pointer'
    }, style), disabled && disabledStyle) : __assign(__assign({}, style), disabled && disabledStyle);
    return react_default.a.createElement("button", __assign({}, rest, {
      "aria-label": rest['aria-label'] || networkName,
      className: newClassName,
      onClick: this.handleClick,
      ref: forwardedRef,
      style: newStyle
    }), children);
  };
  ShareButton.defaultProps = {
    disabledStyle: {
      opacity: 0.6
    },
    openShareDialogOnClick: true,
    resetButtonStyle: true
  };
  return ShareButton;
}(react["Component"]);
/* harmony default export */ var es_ShareButton = (ShareButton_ShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/hocs/createShareButton.js
var createShareButton_assign = undefined && undefined.__assign || function () {
  createShareButton_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return createShareButton_assign.apply(this, arguments);
};


function createShareButton(networkName, link, optsMap, defaultProps) {
  function CreatedButton(props, ref) {
    var opts = optsMap(props);
    var passedProps = createShareButton_assign({}, props);
    // remove keys from passed props that are passed as opts
    var optsKeys = Object.keys(opts);
    optsKeys.forEach(function (key) {
      delete passedProps[key];
    });
    return react_default.a.createElement(es_ShareButton, createShareButton_assign({}, defaultProps, passedProps, {
      forwardedRef: ref,
      networkName: networkName,
      networkLink: link,
      opts: optsMap(props)
    }));
  }
  CreatedButton.displayName = "ShareButton-" + networkName;
  return Object(react["forwardRef"])(CreatedButton);
}
/* harmony default export */ var hocs_createShareButton = (createShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/TwitterShareButton.js



function twitterLink(url, _a) {
  var title = _a.title,
    via = _a.via,
    _b = _a.hashtags,
    hashtags = _b === void 0 ? [] : _b,
    _c = _a.related,
    related = _c === void 0 ? [] : _c;
  assert(url, 'twitter.url');
  assert(Array.isArray(hashtags), 'twitter.hashtags is not an array');
  assert(Array.isArray(related), 'twitter.related is not an array');
  return 'https://twitter.com/share' + objectToGetParams({
    url: url,
    text: title,
    via: via,
    hashtags: hashtags.length > 0 ? hashtags.join(',') : undefined,
    related: related.length > 0 ? related.join(',') : undefined
  });
}
var TwitterShareButton = hocs_createShareButton('twitter', twitterLink, function (props) {
  return {
    hashtags: props.hashtags,
    title: props.title,
    via: props.via,
    related: props.related
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
/* harmony default export */ var es_TwitterShareButton = (TwitterShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/hocs/createIcon.js
var createIcon_assign = undefined && undefined.__assign || function () {
  createIcon_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return createIcon_assign.apply(this, arguments);
};
var createIcon_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

function createIcon(iconConfig) {
  var Icon = function (_a) {
    var bgStyle = _a.bgStyle,
      borderRadius = _a.borderRadius,
      iconFillColor = _a.iconFillColor,
      round = _a.round,
      size = _a.size,
      rest = createIcon_rest(_a, ["bgStyle", "borderRadius", "iconFillColor", "round", "size"]);
    return react_default.a.createElement("svg", createIcon_assign({
      viewBox: "0 0 64 64",
      width: size,
      height: size
    }, rest), round ? react_default.a.createElement("circle", {
      cx: "32",
      cy: "32",
      r: "31",
      fill: iconConfig.color,
      style: bgStyle
    }) : react_default.a.createElement("rect", {
      width: "64",
      height: "64",
      rx: borderRadius,
      ry: borderRadius,
      fill: iconConfig.color,
      style: bgStyle
    }), react_default.a.createElement("path", {
      d: iconConfig.path,
      fill: iconFillColor
    }));
  };
  Icon.defaultProps = {
    bgStyle: {},
    borderRadius: 0,
    iconFillColor: 'white',
    size: 64
  };
  return Icon;
}
// CONCATENATED MODULE: ./node_modules/react-share/es/TwitterIcon.js

var TwitterIcon = createIcon({
  color: '#00aced',
  networkName: 'twitter',
  path: 'M48,22.1c-1.2,0.5-2.4,0.9-3.8,1c1.4-0.8,2.4-2.1,2.9-3.6c-1.3,0.8-2.7,1.3-4.2,1.6 C41.7,19.8,40,19,38.2,19c-3.6,0-6.6,2.9-6.6,6.6c0,0.5,0.1,1,0.2,1.5c-5.5-0.3-10.3-2.9-13.5-6.9c-0.6,1-0.9,2.1-0.9,3.3 c0,2.3,1.2,4.3,2.9,5.5c-1.1,0-2.1-0.3-3-0.8c0,0,0,0.1,0,0.1c0,3.2,2.3,5.8,5.3,6.4c-0.6,0.1-1.1,0.2-1.7,0.2c-0.4,0-0.8,0-1.2-0.1 c0.8,2.6,3.3,4.5,6.1,4.6c-2.2,1.8-5.1,2.8-8.2,2.8c-0.5,0-1.1,0-1.6-0.1c2.9,1.9,6.4,2.9,10.1,2.9c12.1,0,18.7-10,18.7-18.7 c0-0.3,0-0.6,0-0.8C46,24.5,47.1,23.4,48,22.1z'
});
/* harmony default export */ var es_TwitterIcon = (TwitterIcon);
// CONCATENATED MODULE: ./node_modules/react-share/es/FacebookShareButton.js



function facebookLink(url, _a) {
  var quote = _a.quote,
    hashtag = _a.hashtag;
  assert(url, 'facebook.url');
  return 'https://www.facebook.com/sharer/sharer.php' + objectToGetParams({
    u: url,
    quote: quote,
    hashtag: hashtag
  });
}
var FacebookShareButton = hocs_createShareButton('facebook', facebookLink, function (props) {
  return {
    quote: props.quote,
    hashtag: props.hashtag
  };
}, {
  windowWidth: 550,
  windowHeight: 400
});
/* harmony default export */ var es_FacebookShareButton = (FacebookShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/FacebookIcon.js

var FacebookIcon = createIcon({
  color: '#3b5998',
  networkName: 'facebook',
  path: 'M34.1,47V33.3h4.6l0.7-5.3h-5.3v-3.4c0-1.5,0.4-2.6,2.6-2.6l2.8,0v-4.8c-0.5-0.1-2.2-0.2-4.1-0.2 c-4.1,0-6.9,2.5-6.9,7V28H24v5.3h4.6V47H34.1z'
});
/* harmony default export */ var es_FacebookIcon = (FacebookIcon);
// EXTERNAL MODULE: ./node_modules/jsonp/index.js
var jsonp = __webpack_require__("8ujH");
var jsonp_default = /*#__PURE__*/__webpack_require__.n(jsonp);

// CONCATENATED MODULE: ./node_modules/react-share/es/hocs/createShareCount.js
var createShareCount_extends = undefined && undefined.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var createShareCount_assign = undefined && undefined.__assign || function () {
  createShareCount_assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return createShareCount_assign.apply(this, arguments);
};
var createShareCount_rest = undefined && undefined.__rest || function (s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};


var defaultChildren = function (shareCount) {
  return shareCount;
};
var createShareCount_SocialMediaShareCount = /** @class */function (_super) {
  createShareCount_extends(SocialMediaShareCount, _super);
  function SocialMediaShareCount(props) {
    var _this = _super.call(this, props) || this;
    _this._isMounted = false;
    _this.state = {
      count: 0,
      isLoading: false
    };
    return _this;
  }
  SocialMediaShareCount.prototype.componentDidMount = function () {
    this._isMounted = true;
    this.updateCount(this.props.url);
  };
  SocialMediaShareCount.prototype.componentDidUpdate = function (prevProps) {
    if (this.props.url !== prevProps.url) {
      this.updateCount(this.props.url);
    }
  };
  SocialMediaShareCount.prototype.componentWillUnmount = function () {
    this._isMounted = false;
  };
  SocialMediaShareCount.prototype.updateCount = function (url) {
    var _this = this;
    this.setState({
      isLoading: true
    });
    this.props.getCount(url, function (count) {
      if (_this._isMounted) {
        _this.setState({
          count: count,
          isLoading: false
        });
      }
    });
  };
  SocialMediaShareCount.prototype.render = function () {
    var _a = this.state,
      count = _a.count,
      isLoading = _a.isLoading;
    var _b = this.props,
      _c = _b.children,
      children = _c === void 0 ? defaultChildren : _c,
      className = _b.className,
      _ = _b.getCount,
      rest = createShareCount_rest(_b, ["children", "className", "getCount"]);
    return react_default.a.createElement("span", createShareCount_assign({
      className: classnames_default()('react-share__ShareCount', className)
    }, rest), !isLoading && count !== undefined && children(count));
  };
  return SocialMediaShareCount;
}(react["Component"]);
function createShareCount(getCount) {
  var ShareCount = function (props) {
    return react_default.a.createElement(createShareCount_SocialMediaShareCount, createShareCount_assign({
      getCount: getCount
    }, props));
  };
  ShareCount.displayName = "ShareCount(" + getCount.name + ")";
  return ShareCount;
}
// CONCATENATED MODULE: ./node_modules/react-share/es/FacebookShareCount.js


function getFacebookShareCount(shareUrl, callback) {
  var endpoint = "https://graph.facebook.com/?id=" + shareUrl + "&fields=og_object{engagement}";
  jsonp_default()(endpoint, function (err, data) {
    callback(!err && data && data.og_object && data.og_object.engagement ? data.og_object.engagement.count : undefined);
  });
}
/* harmony default export */ var FacebookShareCount = (createShareCount(getFacebookShareCount));
// CONCATENATED MODULE: ./node_modules/react-share/es/PocketShareButton.js



function pocketLink(url, _a) {
  var title = _a.title;
  assert(url, 'pocket.url');
  return 'https://getpocket.com/save' + objectToGetParams({
    url: url,
    title: title
  });
}
var PocketShareButton = hocs_createShareButton('pocket', pocketLink, function (props) {
  return {
    title: props.title
  };
}, {
  windowWidth: 500,
  windowHeight: 500
});
/* harmony default export */ var es_PocketShareButton = (PocketShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/PocketIcon.js

var PocketIcon = createIcon({
  color: '#EF3F56',
  networkName: 'pocket',
  path: 'M41.084 29.065l-7.528 7.882a2.104 2.104 0 0 1-1.521.666 2.106 2.106 0 0 1-1.522-.666l-7.528-7.882c-.876-.914-.902-2.43-.065-3.384.84-.955 2.228-.987 3.1-.072l6.015 6.286 6.022-6.286c.88-.918 2.263-.883 3.102.071.841.938.82 2.465-.06 3.383l-.015.002zm6.777-10.976C47.463 16.84 46.361 16 45.14 16H18.905c-1.2 0-2.289.82-2.716 2.044-.125.363-.189.743-.189 1.125v10.539l.112 2.096c.464 4.766 2.73 8.933 6.243 11.838.06.053.125.102.19.153l.04.033c1.882 1.499 3.986 2.514 6.259 3.014a14.662 14.662 0 0 0 6.13.052c.118-.042.235-.065.353-.087.03 0 .065-.022.098-.042a15.395 15.395 0 0 0 6.011-2.945l.039-.045.18-.153c3.502-2.902 5.765-7.072 6.248-11.852L48 29.674v-10.52c0-.366-.041-.728-.161-1.08l.022.015z'
});
/* harmony default export */ var es_PocketIcon = (PocketIcon);
// CONCATENATED MODULE: ./node_modules/react-share/es/LinkedinShareButton.js



function linkedinLink(url, _a) {
  var title = _a.title,
    summary = _a.summary,
    source = _a.source;
  assert(url, 'linkedin.url');
  return 'https://linkedin.com/shareArticle' + objectToGetParams({
    url: url,
    mini: 'true',
    title: title,
    summary: summary,
    source: source
  });
}
var LinkedinShareButton = hocs_createShareButton('linkedin', linkedinLink, function (_a) {
  var title = _a.title,
    summary = _a.summary,
    source = _a.source;
  return {
    title: title,
    summary: summary,
    source: source
  };
}, {
  windowWidth: 750,
  windowHeight: 600
});
/* harmony default export */ var es_LinkedinShareButton = (LinkedinShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/LinkedinIcon.js

var LinkedinIcon = createIcon({
  color: '#007fb1',
  networkName: 'linkedin',
  path: 'M20.4,44h5.4V26.6h-5.4V44z M23.1,18c-1.7,0-3.1,1.4-3.1,3.1c0,1.7,1.4,3.1,3.1,3.1 c1.7,0,3.1-1.4,3.1-3.1C26.2,19.4,24.8,18,23.1,18z M39.5,26.2c-2.6,0-4.4,1.4-5.1,2.8h-0.1v-2.4h-5.2V44h5.4v-8.6 c0-2.3,0.4-4.5,3.2-4.5c2.8,0,2.8,2.6,2.8,4.6V44H46v-9.5C46,29.8,45,26.2,39.5,26.2z'
});
/* harmony default export */ var es_LinkedinIcon = (LinkedinIcon);
// CONCATENATED MODULE: ./node_modules/react-share/es/EmailShareButton.js


function emailLink(url, _a) {
  var subject = _a.subject,
    body = _a.body,
    separator = _a.separator;
  return 'mailto:' + objectToGetParams({
    subject: subject,
    body: body ? body + separator + url : url
  });
}
var EmailShareButton = hocs_createShareButton('email', emailLink, function (props) {
  return {
    subject: props.subject,
    body: props.body,
    separator: props.separator || ' '
  };
}, {
  openShareDialogOnClick: false,
  onClick: function (_, link) {
    window.location.href = link;
  }
});
/* harmony default export */ var es_EmailShareButton = (EmailShareButton);
// CONCATENATED MODULE: ./node_modules/react-share/es/EmailIcon.js

var EmailIcon = createIcon({
  color: '#7f7f7f',
  networkName: 'email',
  path: 'M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z'
});
/* harmony default export */ var es_EmailIcon = (EmailIcon);
// EXTERNAL MODULE: ./config/site.js
var site = __webpack_require__("KYHh");
var site_default = /*#__PURE__*/__webpack_require__.n(site);

// CONCATENATED MODULE: ./src/components/Share.tsx





const DEFAULT_ICON_SIZE = 48;
const DEFAULT_SHARE_OPTIONS = new Set(['twitter', 'facebook', 'pocket', 'linkedin', 'email']);
const useStyles = Object(makeStyles["a" /* default */])(theme => Object(createStyles["a" /* default */])({
  links: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  shareButton: {
    '&:not(:first-child)': {
      marginLeft: theme.spacing(1)
    }
  }
}));
const Share = _ref => {
  let {
    iconSize = DEFAULT_ICON_SIZE,
    options = DEFAULT_SHARE_OPTIONS,
    url,
    tags,
    title,
    type,
    summary
  } = _ref;
  const classes = useStyles();
  const socialUrl = Object(esm["a" /* formatUrl */])(url, {
    utm_medium: 'social',
    utm_campaign: 'share'
  });
  const handleShare = method => {
    var _window$gtag, _window;
    (_window$gtag = (_window = window).gtag) === null || _window$gtag === void 0 ? void 0 : _window$gtag.call(_window, 'event', 'share', {
      content_type: type,
      item_id: url,
      method
    });
  };
  return /*#__PURE__*/react_default.a.createElement("div", null, /*#__PURE__*/react_default.a.createElement("div", {
    className: classes.links
  }, options.has('twitter') && /*#__PURE__*/react_default.a.createElement(es_TwitterShareButton, {
    url: Object(esm["a" /* formatUrl */])(socialUrl, {
      utm_source: 'twitter'
    }),
    title: `${title} - ${summary}`,
    via: site_default.a.twitterHandle,
    hashtags: tags || [],
    "aria-label": "Share on Twitter",
    className: classes.shareButton,
    onShareWindowClose: () => handleShare('Twitter')
  }, /*#__PURE__*/react_default.a.createElement(es_TwitterIcon, {
    round: true,
    size: iconSize
  })), options.has('facebook') && /*#__PURE__*/react_default.a.createElement(es_FacebookShareButton, {
    url: Object(esm["a" /* formatUrl */])(socialUrl, {
      utm_source: 'facebook'
    }),
    quote: `${title} - ${summary}`,
    "aria-label": "Share on Facebook",
    className: classes.shareButton,
    onShareWindowClose: () => handleShare('Facebook')
  }, /*#__PURE__*/react_default.a.createElement(es_FacebookIcon, {
    round: true,
    size: iconSize
  }), /*#__PURE__*/react_default.a.createElement(FacebookShareCount, {
    url: url
  }, count => count && /*#__PURE__*/react_default.a.createElement("div", {
    className: "share-count"
  }, count))), options.has('pocket') && /*#__PURE__*/react_default.a.createElement(es_PocketShareButton, {
    url: Object(esm["a" /* formatUrl */])(socialUrl, {
      utm_source: 'pocket'
    }),
    title: title,
    "aria-label": "Save to Pocket",
    className: classes.shareButton,
    onShareWindowClose: () => handleShare('Pocket')
  }, /*#__PURE__*/react_default.a.createElement(es_PocketIcon, {
    round: true,
    size: iconSize
  })), options.has('linkedin') && /*#__PURE__*/react_default.a.createElement(es_LinkedinShareButton, {
    url: Object(esm["a" /* formatUrl */])(socialUrl, {
      utm_source: 'linkedin'
    }),
    title: title,
    summary: summary,
    source: site_default.a.siteTitle,
    "aria-label": "Share on LinkedIn",
    className: classes.shareButton,
    onShareWindowClose: () => handleShare('LinkedIn')
  }, /*#__PURE__*/react_default.a.createElement(es_LinkedinIcon, {
    round: true,
    size: iconSize
  })), options.has('email') && /*#__PURE__*/react_default.a.createElement(es_EmailShareButton, {
    url: Object(esm["a" /* formatUrl */])(socialUrl, {
      utm_source: 'email'
    }),
    subject: `Check out "${title}"`,
    body: `Here's an summary:\n\n${summary}`,
    "aria-label": "Share by email",
    className: classes.shareButton,
    onShareWindowClose: () => handleShare('Email')
  }, /*#__PURE__*/react_default.a.createElement(es_EmailIcon, {
    round: true,
    size: iconSize
  }))));
};
/* harmony default export */ var components_Share = __webpack_exports__["a"] = (Share);

/***/ }),

/***/ "GTTd":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__("bRoh");
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

/**
 * Colors.
 */

exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
  // is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
  // is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
  // double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;
  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
  if (!useColors) return;
  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit');

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch (e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch (e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = ({}).DEBUG;
  }
  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "QXP7":
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

/***/ }),

/***/ "TSYQ":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
  'use strict';

  var hasOwn = {}.hasOwnProperty;
  function classNames() {
    var classes = [];
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (!arg) continue;
      var argType = typeof arg;
      if (argType === 'string' || argType === 'number') {
        classes.push(arg);
      } else if (Array.isArray(arg) && arg.length) {
        var inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      } else if (argType === 'object') {
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(' ');
  }
  if ( true && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (true) {
    // register as 'classnames', consistent with npm package name
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return classNames;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();

/***/ }),

/***/ "bRoh":
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__("QXP7");

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0,
    i;
  for (i in namespace) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {
  function debug() {
    // disabled?
    if (!debug.enabled) return;
    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    args[0] = exports.coerce(args[0]);
    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);
    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }
  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);
  exports.names = [];
  exports.skips = [];
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;
  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

/***/ }),

/***/ "cP6f":
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=67b0b73ca5ef5a715ae49b4d20728b3d9c676d49-806d5139e281bb720cc6.js.map