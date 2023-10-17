(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "0Pmj":
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

// EXTERNAL MODULE: ./node_modules/date-fns/esm/isFuture/index.js
var isFuture = __webpack_require__("uh5Q");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/makeStyles.js
var makeStyles = __webpack_require__("R/WZ");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/createStyles.js
var createStyles = __webpack_require__("ZBNC");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Box/Box.js + 13 modules
var Box = __webpack_require__("hlFM");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Typography/Typography.js
var Typography = __webpack_require__("ofer");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Grid/Grid.js
var Grid = __webpack_require__("tRbT");

// EXTERNAL MODULE: ./node_modules/gatsby-theme-material-ui/index.js
var gatsby_theme_material_ui = __webpack_require__("4+mf");

// EXTERNAL MODULE: ./src/components/Layout.tsx + 7 modules
var Layout = __webpack_require__("soUV");

// EXTERNAL MODULE: ./src/components/PageHeader.tsx
var PageHeader = __webpack_require__("3H7G");

// EXTERNAL MODULE: ./src/components/Content.tsx
var Content = __webpack_require__("Cqiw");

// EXTERNAL MODULE: ./src/components/Seo.tsx
var Seo = __webpack_require__("hizP");

// EXTERNAL MODULE: ./node_modules/date-fns/esm/format/index.js + 30 modules
var format = __webpack_require__("sWYD");

// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/_lib/tzIntlTimeZoneName/index.js
/**
 * Returns the formatted time zone name of the provided `timeZone` or the current
 * system time zone if omitted, accounting for DST according to the UTC value of
 * the date.
 */
function tzIntlTimeZoneName(length, date, options) {
  var dtf = getDTF(length, options.timeZone, options.locale);
  return dtf.formatToParts ? partsTimeZone(dtf, date) : hackyTimeZone(dtf, date);
}
function partsTimeZone(dtf, date) {
  var formatted = dtf.formatToParts(date);
  return formatted[formatted.length - 1].value;
}
function hackyTimeZone(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, '');
  var tzNameMatch = / [\w-+ ]+$/.exec(formatted);
  return tzNameMatch ? tzNameMatch[0].substr(1) : '';
}

// If a locale has been provided `en-US` is used as a fallback in case it is an
// invalid locale, otherwise the locale is left undefined to use the system locale.
function getDTF(length, timeZone, locale) {
  if (locale && !locale.code) {
    throw new Error("date-fns-tz error: Please set a language code on the locale object imported from date-fns, e.g. `locale.code = 'en-US'`");
  }
  return new Intl.DateTimeFormat(locale ? [locale.code, 'en-US'] : undefined, {
    timeZone: timeZone,
    timeZoneName: length
  });
}
// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/_lib/tzTokenizeDate/index.js
/**
 * Returns the [year, month, day, hour, minute, seconds] tokens of the provided
 * `date` as it will be rendered in the `timeZone`.
 */
function tzTokenizeDate(date, timeZone) {
  var dtf = getDateTimeFormat(timeZone);
  return dtf.formatToParts ? partsOffset(dtf, date) : hackyOffset(dtf, date);
}
var typeToPos = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
};
function partsOffset(dtf, date) {
  var formatted = dtf.formatToParts(date);
  var filled = [];
  for (var i = 0; i < formatted.length; i++) {
    var pos = typeToPos[formatted[i].type];
    if (pos >= 0) {
      filled[pos] = parseInt(formatted[i].value, 10);
    }
  }
  return filled;
}
function hackyOffset(dtf, date) {
  var formatted = dtf.format(date).replace(/\u200E/g, '');
  var parsed = /(\d+)\/(\d+)\/(\d+),? (\d+):(\d+):(\d+)/.exec(formatted);
  // var [, fMonth, fDay, fYear, fHour, fMinute, fSecond] = parsed
  // return [fYear, fMonth, fDay, fHour, fMinute, fSecond]
  return [parsed[3], parsed[1], parsed[2], parsed[4], parsed[5], parsed[6]];
}

// Get a cached Intl.DateTimeFormat instance for the IANA `timeZone`. This can be used
// to get deterministic local date/time output according to the `en-US` locale which
// can be used to extract local time parts as necessary.
var dtfCache = {};
function getDateTimeFormat(timeZone) {
  if (!dtfCache[timeZone]) {
    // New browsers use `hourCycle`, IE and Chrome <73 does not support it and uses `hour12`
    var testDateFormatted = new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: 'America/New_York',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(new Date('2014-06-25T04:00:00.123Z'));
    var hourCycleSupported = testDateFormatted === '06/25/2014, 00:00:00' || testDateFormatted === '‎06‎/‎25‎/‎2014‎ ‎00‎:‎00‎:‎00';
    dtfCache[timeZone] = hourCycleSupported ? new Intl.DateTimeFormat('en-US', {
      hour12: false,
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) : new Intl.DateTimeFormat('en-US', {
      hourCycle: 'h23',
      timeZone: timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }
  return dtfCache[timeZone];
}
// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/_lib/tzParseTimezone/index.js

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var patterns = {
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/,
  timezoneIANA: /(UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/
};

// Parse various time zone offset formats to an offset in milliseconds
function tzParseTimezone(timezoneString, date) {
  var token;
  var absoluteOffset;

  // Z
  token = patterns.timezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }
  var hours;

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString);
  if (token) {
    hours = parseInt(token[2], 10);
    if (!validateTimezone(hours)) {
      return NaN;
    }
    absoluteOffset = hours * MILLISECONDS_IN_HOUR;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString);
  if (token) {
    hours = parseInt(token[2], 10);
    var minutes = parseInt(token[3], 10);
    if (!validateTimezone(hours, minutes)) {
      return NaN;
    }
    absoluteOffset = hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
    return token[1] === '+' ? -absoluteOffset : absoluteOffset;
  }

  // IANA time zone
  token = patterns.timezoneIANA.exec(timezoneString);
  if (token) {
    // var [fYear, fMonth, fDay, fHour, fMinute, fSecond] = tzTokenizeDate(date, timezoneString)
    var tokens = tzTokenizeDate(date, timezoneString);
    var asUTC = Date.UTC(tokens[0], tokens[1] - 1, tokens[2], tokens[3], tokens[4], tokens[5]);
    var timestampWithMsZeroed = date.getTime() - date.getTime() % 1000;
    return -(asUTC - timestampWithMsZeroed);
  }
  return 0;
}
function validateTimezone(hours, minutes) {
  if (minutes != null && (minutes < 0 || minutes > 59)) {
    return false;
  }
  return true;
}
// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/format/formatters/index.js


var formatters_MILLISECONDS_IN_MINUTE = 60 * 1000;
var formatters = {
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function (date, token, localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = options.timeZone ? tzParseTimezone(options.timeZone, originalDate) / formatters_MILLISECONDS_IN_MINUTE : originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return 'Z';
    }
    switch (token) {
      // Hours and optional minutes
      case 'X':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case 'XXXX':
      case 'XX':
        // Hours and minutes without `:` delimeter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case 'XXXXX':
      case 'XXX': // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function (date, token, localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = options.timeZone ? tzParseTimezone(options.timeZone, originalDate) / formatters_MILLISECONDS_IN_MINUTE : originalDate.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case 'x':
        return formatTimezoneWithOptionalMinutes(timezoneOffset);

      // Hours, minutes and optional seconds without `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case 'xxxx':
      case 'xx':
        // Hours and minutes without `:` delimeter
        return formatTimezone(timezoneOffset);

      // Hours, minutes and optional seconds with `:` delimeter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case 'xxxxx':
      case 'xxx': // Hours and minutes with `:` delimeter
      default:
        return formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (GMT)
  O: function (date, token, localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = options.timeZone ? tzParseTimezone(options.timeZone, originalDate) / formatters_MILLISECONDS_IN_MINUTE : originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case 'O':
      case 'OO':
      case 'OOO':
        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
      // Long
      case 'OOOO':
      default:
        return 'GMT' + formatTimezone(timezoneOffset, ':');
    }
  },
  // Timezone (specific non-location)
  z: function (date, token, localize, options) {
    var originalDate = options._originalDate || date;
    switch (token) {
      // Short
      case 'z':
      case 'zz':
      case 'zzz':
        return tzIntlTimeZoneName('short', originalDate, options);
      // Long
      case 'zzzz':
      default:
        return tzIntlTimeZoneName('long', originalDate, options);
    }
  }
};
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? '-' : '';
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return sign + output;
}
function formatTimezone(offset, dirtyDelimeter) {
  var delimeter = dirtyDelimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimeter + minutes;
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimeter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? '-' : '+';
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimeter);
}
function formatTimezoneShort(offset, dirtyDelimeter) {
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimeter = dirtyDelimeter || '';
  return sign + String(hours) + delimeter + addLeadingZeros(minutes, 2);
}
/* harmony default export */ var format_formatters = (formatters);
// EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/toInteger/index.js
var toInteger = __webpack_require__("/h9T");

// EXTERNAL MODULE: ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
var getTimezoneOffsetInMilliseconds = __webpack_require__("JCDJ");

// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/toDate/index.js



var toDate_MILLISECONDS_IN_HOUR = 3600000;
var toDate_MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var toDate_patterns = {
  dateTimeDelimeter: /[T ]/,
  plainTime: /:/,
  timeZoneDelimeter: /[Z ]/i,
  // year tokens
  YY: /^(\d{2})$/,
  YYY: [/^([+-]\d{2})$/,
  // 0 additional digits
  /^([+-]\d{3})$/,
  // 1 additional digit
  /^([+-]\d{4})$/ // 2 additional digits
  ],

  YYYY: /^(\d{4})/,
  YYYYY: [/^([+-]\d{4})/,
  // 0 additional digits
  /^([+-]\d{5})/,
  // 1 additional digit
  /^([+-]\d{6})/ // 2 additional digits
  ],

  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,
  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // timezone tokens (to identify the presence of a tz)
  timezone: /([Z+-].*| UTC|(?:[a-zA-Z]+\/[a-zA-Z_]+(?:\/[a-zA-Z_]+)?))$/
};

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 * If the function cannot parse the string or the values are invalid, it returns Invalid Date.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param {Date|String|Number} argument - the value to convert
 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function toDate(argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present');
  }
  if (argument === null) {
    return new Date(NaN);
  }
  var options = dirtyOptions || {};
  var additionalDigits = options.additionalDigits == null ? DEFAULT_ADDITIONAL_DIGITS : Object(toInteger["a" /* default */])(options.additionalDigits);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2');
  }

  // Clone the date
  if (argument instanceof Date || typeof argument === 'object' && Object.prototype.toString.call(argument) === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || Object.prototype.toString.call(argument) === '[object Number]') {
    return new Date(argument);
  } else if (!(typeof argument === 'string' || Object.prototype.toString.call(argument) === '[object String]')) {
    return new Date(NaN);
  }
  var dateStrings = splitDateString(argument);
  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;
  var date = parseDate(restDateString, year);
  if (isNaN(date)) {
    return new Date(NaN);
  }
  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;
    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
      if (isNaN(time)) {
        return new Date(NaN);
      }
    }
    if (dateStrings.timezone || options.timeZone) {
      offset = tzParseTimezone(dateStrings.timezone || options.timeZone, new Date(timestamp + time));
      if (isNaN(offset)) {
        return new Date(NaN);
      }
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = Object(getTimezoneOffsetInMilliseconds["a" /* default */])(new Date(timestamp + time));
      offset = Object(getTimezoneOffsetInMilliseconds["a" /* default */])(new Date(timestamp + time + offset));
    }
    return new Date(timestamp + time + offset);
  } else {
    return new Date(NaN);
  }
}
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(toDate_patterns.dateTimeDelimeter);
  var timeString;
  if (toDate_patterns.plainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
    dateStrings.timezone = array[2];
    if (toDate_patterns.timeZoneDelimeter.test(dateStrings.date)) {
      dateStrings.date = dateString.split(toDate_patterns.timeZoneDelimeter)[0];
      timeString = dateString.substr(dateStrings.date.length, dateString.length);
    }
  }
  if (timeString) {
    var token = toDate_patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var patternYYY = toDate_patterns.YYY[additionalDigits];
  var patternYYYYY = toDate_patterns.YYYYY[additionalDigits];
  var token;

  // YYYY or ±YYYYY
  token = toDate_patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }

  // YY or ±YYY
  token = toDate_patterns.YY.exec(dateString) || patternYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }

  // Invalid ISO-formatted year
  return {
    year: null
  };
}
function parseDate(dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null;
  }
  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }

  // YYYY-MM
  token = toDate_patterns.MM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    if (!validateDate(year, month)) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month);
    return date;
  }

  // YYYY-DDD or YYYYDDD
  token = toDate_patterns.DDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    if (!validateDayOfYearDate(year, dayOfYear)) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }

  // yyyy-MM-dd or YYYYMMDD
  token = toDate_patterns.MMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    if (!validateDate(year, month, day)) {
      return new Date(NaN);
    }
    date.setUTCFullYear(year, month, day);
    return date;
  }

  // YYYY-Www or YYYYWww
  token = toDate_patterns.Www.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    if (!validateWeekDate(year, week)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week);
  }

  // YYYY-Www-D or YYYYWwwD
  token = toDate_patterns.WwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    if (!validateWeekDate(year, week, dayOfWeek)) {
      return new Date(NaN);
    }
    return dayOfISOWeekYear(year, week, dayOfWeek);
  }

  // Invalid ISO-formatted date
  return null;
}
function parseTime(timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = toDate_patterns.HH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    if (!validateTime(hours)) {
      return NaN;
    }
    return hours % 24 * toDate_MILLISECONDS_IN_HOUR;
  }

  // hh:mm or hhmm
  token = toDate_patterns.HHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    if (!validateTime(hours, minutes)) {
      return NaN;
    }
    return hours % 24 * toDate_MILLISECONDS_IN_HOUR + minutes * toDate_MILLISECONDS_IN_MINUTE;
  }

  // hh:mm:ss or hhmmss
  token = toDate_patterns.HHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    if (!validateTime(hours, minutes, seconds)) {
      return NaN;
    }
    return hours % 24 * toDate_MILLISECONDS_IN_HOUR + minutes * toDate_MILLISECONDS_IN_MINUTE + seconds * 1000;
  }

  // Invalid ISO-formatted time
  return null;
}
function dayOfISOWeekYear(isoWeekYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoWeekYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}

// Validation functions

var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
function validateDate(year, month, date) {
  if (month < 0 || month > 11) {
    return false;
  }
  if (date != null) {
    if (date < 1) {
      return false;
    }
    var isLeapYear = isLeapYearIndex(year);
    if (isLeapYear && date > DAYS_IN_MONTH_LEAP_YEAR[month]) {
      return false;
    }
    if (!isLeapYear && date > DAYS_IN_MONTH[month]) {
      return false;
    }
  }
  return true;
}
function validateDayOfYearDate(year, dayOfYear) {
  if (dayOfYear < 1) {
    return false;
  }
  var isLeapYear = isLeapYearIndex(year);
  if (isLeapYear && dayOfYear > 366) {
    return false;
  }
  if (!isLeapYear && dayOfYear > 365) {
    return false;
  }
  return true;
}
function validateWeekDate(year, week, day) {
  if (week < 0 || week > 52) {
    return false;
  }
  if (day != null && (day < 0 || day > 6)) {
    return false;
  }
  return true;
}
function validateTime(hours, minutes, seconds) {
  if (hours != null && (hours < 0 || hours >= 25)) {
    return false;
  }
  if (minutes != null && (minutes < 0 || minutes >= 60)) {
    return false;
  }
  if (seconds != null && (seconds < 0 || seconds >= 60)) {
    return false;
  }
  return true;
}
// CONCATENATED MODULE: ./node_modules/date-fns-tz/esm/format/index.js



var tzFormattingTokensRegExp = /([xXOz]+)|''|'(''|[^'])+('|$)/g;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format. The result may vary by locale.
 *
 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
 * > See: https://git.io/fxCyr
 *
 * The characters wrapped between two single quotes characters (') are escaped.
 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
 * (see the last example)
 *
 * Format of the string is based on Unicode Technical Standard #35:
 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
 * with a few additions (see note 7 below the table).
 *
 * Accepted patterns:
 * | Unit                            | Pattern | Result examples                   | Notes |
 * |---------------------------------|---------|-----------------------------------|-------|
 * | Era                             | G..GGG  | AD, BC                            |       |
 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
 * |                                 | GGGGG   | A, B                              |       |
 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
 * |                                 | yyyyy   | ...                               | 3,5   |
 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
 * |                                 | YYYYY   | ...                               | 3,5   |
 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
 * |                                 | RRRRR   | ...                               | 3,5,7 |
 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
 * |                                 | uuuuu   | ...                               | 3,5   |
 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | QQ      | 01, 02, 03, 04                    |       |
 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
 * |                                 | qq      | 01, 02, 03, 04                    |       |
 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | MM      | 01, 02, ..., 12                   |       |
 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
 * |                                 | MMMM    | January, February, ..., December  | 2     |
 * |                                 | MMMMM   | J, F, ..., D                      |       |
 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
 * |                                 | LL      | 01, 02, ..., 12                   |       |
 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
 * |                                 | LLLL    | January, February, ..., December  | 2     |
 * |                                 | LLLLL   | J, F, ..., D                      |       |
 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | ww      | 01, 02, ..., 53                   |       |
 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
 * |                                 | II      | 01, 02, ..., 53                   | 7     |
 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
 * |                                 | dd      | 01, 02, ..., 31                   |       |
 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 8     |
 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
 * |                                 | DD      | 01, 02, ..., 365, 366             | 8     |
 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
 * |                                 | DDDD    | ...                               | 3     |
 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
 * |                                 | iii     | Mon, Tue, Wed, ..., Su            | 7     |
 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | ee      | 02, 03, ..., 01                   |       |
 * |                                 | eee     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
 * |                                 | cc      | 02, 03, ..., 01                   |       |
 * |                                 | ccc     | Mon, Tue, Wed, ..., Su            |       |
 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
 * | AM, PM                          | a..aaa  | AM, PM                            |       |
 * |                                 | aaaa    | a.m., p.m.                        | 2     |
 * |                                 | aaaaa   | a, p                              |       |
 * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |
 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
 * |                                 | bbbbb   | a, p, n, mi                       |       |
 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
 * |                                 | BBBBB   | at night, in the morning, ...     |       |
 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
 * |                                 | KK      | 1, 2, ..., 11, 0                  |       |
 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
 * | Minute                          | m       | 0, 1, ..., 59                     |       |
 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | mm      | 00, 01, ..., 59                   |       |
 * | Second                          | s       | 0, 1, ..., 59                     |       |
 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
 * |                                 | ss      | 00, 01, ..., 59                   |       |
 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
 * |                                 | SS      | 00, 01, ..., 99                   |       |
 * |                                 | SSS     | 000, 0001, ..., 999               |       |
 * |                                 | SSSS    | ...                               | 3     |
 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
 * |                                 | XX      | -0800, +0530, Z                   |       |
 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
 * |                                 | xx      | -0800, +0530, +0000               |       |
 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
 * | Timezone (specific non-locat.)  | z...zzz | PDT, EST, CEST                    | 6     |
 * |                                 | zzzz    | Pacific Daylight Time             | 2,6   |
 * | Seconds timestamp               | t       | 512969520                         | 7     |
 * |                                 | tt      | ...                               | 3,7   |
 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
 * |                                 | TT      | ...                               | 3,7   |
 * | Long localized date             | P       | 05/29/1453                        | 7     |
 * |                                 | PP      | May 29, 1453                      | 7     |
 * |                                 | PPP     | May 29th, 1453                    | 7     |
 * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |
 * | Long localized time             | p       | 12:00 AM                          | 7     |
 * |                                 | pp      | 12:00:00 AM                       | 7     |
 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
 * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |
 * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |
 * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |
 * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |
 * Notes:
 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
 *    are the same as "stand-alone" units, but are different in some languages.
 *    "Formatting" units are declined according to the rules of the language
 *    in the context of a date. "Stand-alone" units are always nominative singular:
 *
 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
 *
 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
 *
 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
 *    the single quote characters (see below).
 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
 *    the output will be the same as default pattern for this unit, usually
 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
 *    are marked with "2" in the last column of the table.
 *
 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
 *
 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
 *
 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
 *    The output will be padded with zeros to match the length of the pattern.
 *
 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
 *
 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
 *    These tokens represent the shortest form of the quarter.
 *
 * 5. The main difference between `y` and `u` patterns are B.C. years:
 *
 *    | Year | `y` | `u` |
 *    |------|-----|-----|
 *    | AC 1 |   1 |   1 |
 *    | BC 1 |   1 |   0 |
 *    | BC 2 |   2 |  -1 |
 *
 *    Also `yy` always returns the last two digits of a year,
 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
 *
 *    | Year | `yy` | `uu` |
 *    |------|------|------|
 *    | 1    |   01 |   01 |
 *    | 14   |   14 |   14 |
 *    | 376  |   76 |  376 |
 *    | 1453 |   53 | 1453 |
 *
 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
 *    except local week-numbering years are dependent on `options.weekStartsOn`
 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
 *
 * 6. Specific non-location timezones are created using the Intl browser API. The output is determined by the
 *    preferred standard of the current locale (en-US by default) which may not always give the expected result.
 *    For this reason it is recommended to supply a `locale` in the format options when formatting a time zone name.
 *
 * 7. These patterns are not in the Unicode Technical Standard #35:
 *    - `i`: ISO day of week
 *    - `I`: ISO week of year
 *    - `R`: ISO week-numbering year
 *    - `t`: seconds timestamp
 *    - `T`: milliseconds timestamp
 *    - `o`: ordinal number modifier
 *    - `P`: long localized date
 *    - `p`: long localized time
 *
 * 8. These tokens are often confused with others. See: https://git.io/fxCyr
 *
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole
 *   library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * - The second argument is now required for the sake of explicitness.
 *
 *   ```javascript
 *   // Before v2.0.0
 *   format(new Date(2016, 0, 1))
 *
 *   // v2.0.0 onward
 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
 *   ```
 *
 * - New format string API for `format` function
 *   which is based on [Unicode Technical Standard
 *   #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table). See [this
 *   post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
 *
 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {OptionsWithTZ} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link
 *   https://date-fns.org/docs/toDate}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See
 *   [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {Boolean} [options.awareOfUnicodeTokens=false] - if true, allows usage of Unicode tokens causes confusion:
 *   - Some of the day of year tokens (`D`, `DD`) that are confused with the day of month tokens (`d`, `dd`).
 *   - Some of the local week-numbering year tokens (`YY`, `YYYY`) that are confused with the calendar year tokens
 *   (`yy`, `yyyy`). See: https://git.io/fxCyr
 * @param {String} [options.timeZone=''] - used to specify the IANA time zone offset of a date String.
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
 * @throws {RangeError} `options.awareOfUnicodeTokens` must be set to `true` to use `XX` token; see:
 *   https://git.io/fxCyr
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/esm/locale/eo'
 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
 *   locale: eoLocale
 * })
 * //=> '2-a de julio 2014'
 *
 * @example
 * // Escape string by single quote characters:
 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
 * //=> "3 o'clock"
 */
function format_format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};
  var matches = formatStr.match(tzFormattingTokensRegExp);
  if (matches) {
    var date = toDate(dirtyDate, options);
    formatStr = matches.reduce(function (result, token) {
      return token[0] === "'" ? result : result.replace(token, "'" + format_formatters[token[0]](date, token, null, options) + "'");
    }, formatStr);
  }
  return Object(format["a" /* default */])(dirtyDate, formatStr, options);
}
// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Paper/Paper.js
var Paper = __webpack_require__("kKAo");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Button/Button.js
var Button = __webpack_require__("Z3vd");

// CONCATENATED MODULE: ./src/components/MinishopRegister.tsx



const useStyles = Object(makeStyles["a" /* default */])(theme => Object(createStyles["a" /* default */])({
  root: {
    margin: theme.spacing(5, 0, 1),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));
const MinishopRegister = _ref => {
  let {
    id,
    title,
    event,
    isTop = false
  } = _ref;
  const classes = useStyles();
  const startDate = Date.parse(event.start);
  const formattedDate = format_format(startDate, 'EEEE, MMMM d, yyyy');
  const formattedTime = format_format(startDate, 'h:mm b z');
  const eventId = event.id;
  const buttonId = `eventbrite-checkout-${eventId}-${isTop ? 'top' : 'bottom'}`;
  Object(react["useEffect"])(() => {
    var _widgetsScript;
    const createWidget = () => {
      var _window$EBWidgets;
      (_window$EBWidgets = window.EBWidgets) === null || _window$EBWidgets === void 0 ? void 0 : _window$EBWidgets.createWidget({
        widgetType: 'checkout',
        eventId: eventId,
        modal: true,
        modalTriggerElementId: buttonId,
        onOrderComplete: () => {
          var _window$gtag, _window;
          (_window$gtag = (_window = window).gtag) === null || _window$gtag === void 0 ? void 0 : _window$gtag.call(_window, 'event', 'purchase', {
            value: 100,
            currency: 'USD',
            items: [{
              id: eventId,
              name: title,
              price: 100
            }]
          });
        }
      });
    };
    let widgetsScript = document.getElementById('eb_widgets');
    let added = false;

    // create the widgets script if it doesn't already exists
    if (!widgetsScript) {
      widgetsScript = document.createElement('script');
      widgetsScript.id = 'eb_widgets';
      widgetsScript.async = true;
      widgetsScript.src = 'https://www.eventbrite.com/static/widgets/eb_widgets.js';
      widgetsScript.type = 'text/javascript';
      document.body.appendChild(widgetsScript);
      added = true;
    }

    // notify when it's finally loaded
    (_widgetsScript = widgetsScript) === null || _widgetsScript === void 0 ? void 0 : _widgetsScript.addEventListener('load', createWidget);
    return () => {
      var _widgetsScript2;
      (_widgetsScript2 = widgetsScript) === null || _widgetsScript2 === void 0 ? void 0 : _widgetsScript2.removeEventListener('load', createWidget);
      if (widgetsScript && added) {
        document.body.removeChild(widgetsScript);
      }
    };
  }, [eventId, buttonId, title]);
  return /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(Paper["a" /* default */], {
    component: "section",
    elevation: 3,
    className: classes.root
  }, /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: {
      xs: 'column',
      sm: 'row'
    }
  }, /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    mr: {
      xs: 0,
      sm: 2
    },
    mb: {
      xs: 2,
      sm: 0
    },
    flex: 1,
    textAlign: {
      xs: 'center',
      sm: 'left'
    }
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h6",
    component: "h3"
  }, "Next Online Minishop*"), /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h5",
    component: "p"
  }, formattedDate, " @ ", formattedTime)), /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(Button["a" /* default */], {
    variant: "contained",
    color: "primary",
    size: "large",
    id: buttonId,
    onClick: () => {
      var _window$gtag2, _window2;
      (_window$gtag2 = (_window2 = window).gtag) === null || _window$gtag2 === void 0 ? void 0 : _window$gtag2.call(_window2, 'event', 'add_to_cart', {
        value: 100,
        currency: 'USD',
        items: [{
          id: eventId,
          name: title,
          list_position: isTop ? 1 : 2,
          price: 100
        }]
      });
    }
  }, "Register now")))), /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    textAlign: {
      xs: 'center',
      sm: 'left'
    },
    mb: 5
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "caption",
    component: "p"
  }, "* You will receive a link to the Zoom meeting a few days before")));
};
/* harmony default export */ var components_MinishopRegister = (MinishopRegister);
// EXTERNAL MODULE: ./src/components/Share.tsx + 17 modules
var Share = __webpack_require__("DODd");

// EXTERNAL MODULE: ./src/components/MinishopCard.tsx
var MinishopCard = __webpack_require__("/fA+");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/List/List.js
var List = __webpack_require__("eD//");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItem/ListItem.js
var ListItem = __webpack_require__("tVbE");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemAvatar/ListItemAvatar.js
var ListItemAvatar = __webpack_require__("SLcR");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Avatar/Avatar.js + 1 modules
var Avatar = __webpack_require__("469l");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/ListItemText/ListItemText.js
var ListItemText = __webpack_require__("IsqK");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/Divider/Divider.js
var Divider = __webpack_require__("wb2y");

// EXTERNAL MODULE: ./src/utils/index.ts + 1 modules
var utils = __webpack_require__("0lfv");

// EXTERNAL MODULE: ./content/minishops/testimonials/data.json
var testimonials_data = __webpack_require__("Mgyd");

// CONCATENATED MODULE: ./src/components/MinishopTestimonials.tsx




const MinishopTestimonials_useStyles = Object(makeStyles["a" /* default */])(theme => {
  return Object(createStyles["a" /* default */])({
    title: {
      textAlign: 'center',
      padding: theme.spacing(2)
    }
  });
});
const MinishopTestimonials = _ref => {
  let {
    slug,
    title
  } = _ref;
  const classes = MinishopTestimonials_useStyles();
  const {
    [slug]: testimonials = []
  } = testimonials_data;
  if (!testimonials.length) {
    return null;
  }
  return /*#__PURE__*/react_default.a.createElement(Paper["a" /* default */], {
    component: "section",
    elevation: 1
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    variant: "h5",
    component: "h1",
    className: classes.title
  }, "Past learners", ' ', /*#__PURE__*/react_default.a.createElement("span", {
    role: "img",
    "aria-label": "love"
  }, "\u2764\uFE0F"), ' ', /*#__PURE__*/react_default.a.createElement("strong", null, title), "!"), /*#__PURE__*/react_default.a.createElement(List["a" /* default */], null, testimonials.map((testimonial, index) => {
    var _testimonial$name;
    const displayName = testimonial.name || 'Anonymous';
    return /*#__PURE__*/react_default.a.createElement(react["Fragment"], {
      key: testimonial.message
    }, /*#__PURE__*/react_default.a.createElement(ListItem["a" /* default */], {
      alignItems: "flex-start"
    }, /*#__PURE__*/react_default.a.createElement(ListItemAvatar["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(Avatar["a" /* default */], {
      alt: displayName,
      src: testimonial.image
    }, testimonial === null || testimonial === void 0 ? void 0 : (_testimonial$name = testimonial.name) === null || _testimonial$name === void 0 ? void 0 : _testimonial$name[0])), /*#__PURE__*/react_default.a.createElement(ListItemText["a" /* default */], {
      primary: displayName,
      secondary: /*#__PURE__*/react_default.a.createElement(react_default.a.Fragment, null, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
        component: "span",
        variant: "body2",
        color: "textPrimary"
      }, Object(utils["a" /* formatDate */])(testimonial.date)), ' - ', " ", testimonial.message)
    })), index + 1 < testimonials.length && /*#__PURE__*/react_default.a.createElement(Divider["a" /* default */], {
      variant: "inset",
      component: "li"
    }));
  })));
};
/* harmony default export */ var components_MinishopTestimonials = (MinishopTestimonials);
// EXTERNAL MODULE: ./src/utils/generate-social-image.ts
var generate_social_image = __webpack_require__("mXBQ");

// EXTERNAL MODULE: ./src/utils/useMinishops.tsx
var useMinishops = __webpack_require__("Xikp");

// CONCATENATED MODULE: ./src/templates/Minishop.tsx
















const Minishop_useStyles = Object(makeStyles["a" /* default */])(theme => Object(createStyles["a" /* default */])({
  header: {
    marginBottom: theme.spacing(5)
  },
  footer: {
    marginTop: theme.spacing(5)
  },
  minishops: {
    marginTop: theme.spacing(5)
  },
  minishopsGrid: {
    marginTop: theme.spacing(2)
  }
}));
const Minishop = _ref => {
  let {
    data
  } = _ref;
  const classes = Minishop_useStyles();
  const {
    minishop,
    site
  } = data;
  const {
    id,
    html,
    excerpt,
    frontmatter,
    fields
  } = minishop;
  const {
    title,
    shortDescription,
    category,
    level,
    tags,
    event
  } = frontmatter;
  const {
    slug
  } = fields;
  const {
    upcoming: upcomingMinishops,
    remaining: remainingMinishops
  } = Object(useMinishops["a" /* default */])(id);
  const otherMinishops = upcomingMinishops.length ? upcomingMinishops : remainingMinishops;
  const url = Object(utils["h" /* getMinishopUrl */])(slug);
  const fullTitle = `${title} Minishop`;
  const summary = shortDescription || excerpt;
  const seoImageUrl = Object(generate_social_image["a" /* default */])({
    title: fullTitle,
    tagline: shortDescription
  });
  const eventId = event === null || event === void 0 ? void 0 : event.id;
  const isUpcomingEvent = (event === null || event === void 0 ? void 0 : event.start) ? Object(isFuture["a" /* default */])(Date.parse(event.start)) : false;
  Object(react["useEffect"])(() => {
    if (isUpcomingEvent) {
      var _window$gtag, _window;
      (_window$gtag = (_window = window).gtag) === null || _window$gtag === void 0 ? void 0 : _window$gtag.call(_window, 'event', 'view_item', {
        items: [{
          id: eventId,
          name: title,
          price: 100
        }]
      });
    }
  }, [eventId, isUpcomingEvent, title]);
  Object(react["useEffect"])(() => {
    if (upcomingMinishops.length) {
      var _window$gtag2, _window2;
      (_window$gtag2 = (_window2 = window).gtag) === null || _window$gtag2 === void 0 ? void 0 : _window$gtag2.call(_window2, 'event', 'view_item_list', {
        items: upcomingMinishops.map((node, index) => {
          var _node$frontmatter$eve;
          return {
            id: (_node$frontmatter$eve = node.frontmatter.event) === null || _node$frontmatter$eve === void 0 ? void 0 : _node$frontmatter$eve.id,
            name: node.frontmatter.title,
            list_name: 'Other Minishops',
            list_position: index + 1,
            price: 100
          };
        })
      });
    }
  }, [upcomingMinishops]);
  return /*#__PURE__*/react_default.a.createElement(Layout["a" /* default */], null, /*#__PURE__*/react_default.a.createElement(Seo["a" /* default */], {
    title: `${fullTitle}/Workshop`,
    url: url,
    description: summary,
    image: seoImageUrl,
    imageAlt: fullTitle,
    type: "events.event",
    meta: Object(toConsumableArray["a" /* default */])(event ? [{
      property: 'event:start_time',
      content: event.start
    }, {
      property: 'event:end_time',
      content: event.end
    }] : []),
    schemaOrg: {
      '@type': 'EducationEvent',
      name: fullTitle,
      eventAttendanceMode: 'OnlineEventAttendanceMode',
      educationLevel: level,
      location: {
        '@type': 'VirtualLocation',
        url
      },
      organizer: {
        '@type': 'Person',
        name: site.siteMetadata.author.name,
        url: Object(utils["i" /* getUrl */])()
      },
      teaches: category,
      ...(event ? {
        startDate: event.start,
        endDate: event.end,
        eventStatus: 'EventScheduled'
      } : {})
    }
  }), /*#__PURE__*/react_default.a.createElement(PageHeader["a" /* default */], {
    className: classes.header,
    title: fullTitle,
    subTitle: shortDescription
  }), isUpcomingEvent && /*#__PURE__*/react_default.a.createElement(components_MinishopRegister, {
    event: event,
    id: id,
    title: title,
    isTop: true
  }), /*#__PURE__*/react_default.a.createElement(Content["a" /* default */], null, html), /*#__PURE__*/react_default.a.createElement(components_MinishopTestimonials, {
    slug: slug,
    title: title
  }), isUpcomingEvent && /*#__PURE__*/react_default.a.createElement(components_MinishopRegister, {
    event: event,
    id: id,
    title: title
  }), /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    component: "footer",
    className: classes.footer
  }, /*#__PURE__*/react_default.a.createElement(Share["a" /* default */], {
    url: url,
    title: `${fullTitle} by Ben Ilegbodu`,
    summary: summary,
    tags: tags,
    type: "minishop"
  }), !!otherMinishops.length && /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    component: "section",
    className: classes.minishops
  }, /*#__PURE__*/react_default.a.createElement(Typography["a" /* default */], {
    component: "h3",
    variant: "h5"
  }, "Other upcoming minishops"), /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    container: true,
    spacing: 2,
    className: classes.minishopsGrid
  }, otherMinishops.map(node => /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    key: node.id,
    item: true,
    xs: 12
  }, /*#__PURE__*/react_default.a.createElement(MinishopCard["a" /* default */], {
    mode: "min",
    slug: node.fields.slug,
    title: node.frontmatter.title,
    tags: node.frontmatter.tags,
    summary: node.frontmatter.shortDescription || node.excerpt,
    event: node.frontmatter.event
  }))), /*#__PURE__*/react_default.a.createElement(Grid["a" /* default */], {
    item: true,
    xs: 12
  }, /*#__PURE__*/react_default.a.createElement(Box["a" /* default */], {
    display: "flex",
    justifyContent: {
      xs: 'center',
      sm: 'flex-end'
    },
    width: "100%"
  }, /*#__PURE__*/react_default.a.createElement(gatsby_theme_material_ui["Link"], {
    href: "/minishops/",
    variant: "h6"
  }, "View all minishops >")))))));
};
/* harmony default export */ var templates_Minishop = __webpack_exports__["default"] = (Minishop);
const query = "325496331";

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

/***/ "469l":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// UNUSED EXPORTS: styles

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__("wx14");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js
var objectWithoutProperties = __webpack_require__("Ff2n");

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__("q1tI");

// EXTERNAL MODULE: ./node_modules/clsx/dist/clsx.m.js
var clsx_m = __webpack_require__("iuhU");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/styles/withStyles.js
var withStyles = __webpack_require__("H2TA");

// EXTERNAL MODULE: ./node_modules/@material-ui/core/esm/utils/createSvgIcon.js
var createSvgIcon = __webpack_require__("5AJ6");

// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/internal/svg-icons/Person.js


/**
 * @ignore - internal component.
 */

/* harmony default export */ var Person = (Object(createSvgIcon["a" /* default */])( /*#__PURE__*/react["createElement"]("path", {
  d: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
}), 'Person'));
// CONCATENATED MODULE: ./node_modules/@material-ui/core/esm/Avatar/Avatar.js






var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: 40,
      height: 40,
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(20),
      lineHeight: 1,
      borderRadius: '50%',
      overflow: 'hidden',
      userSelect: 'none'
    },
    /* Styles applied to the root element if not `src` or `srcSet`. */
    colorDefault: {
      color: theme.palette.background.default,
      backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
    },
    /* Styles applied to the root element if `variant="circle"`. */
    circle: {},
    /* Styles applied to the root element if `variant="rounded"`. */
    rounded: {
      borderRadius: theme.shape.borderRadius
    },
    /* Styles applied to the root element if `variant="square"`. */
    square: {
      borderRadius: 0
    },
    /* Styles applied to the img element if either `src` or `srcSet` is defined. */
    img: {
      width: '100%',
      height: '100%',
      textAlign: 'center',
      // Handle non-square image. The property isn't supported by IE 11.
      objectFit: 'cover',
      // Hide alt text.
      color: 'transparent',
      // Hide the image broken icon, only works on Chrome.
      textIndent: 10000
    },
    /* Styles applied to the fallback icon */
    fallback: {
      width: '75%',
      height: '75%'
    }
  };
};
function useLoaded(_ref) {
  var src = _ref.src,
    srcSet = _ref.srcSet;
  var _React$useState = react["useState"](false),
    loaded = _React$useState[0],
    setLoaded = _React$useState[1];
  react["useEffect"](function () {
    if (!src && !srcSet) {
      return undefined;
    }
    setLoaded(false);
    var active = true;
    var image = new Image();
    image.src = src;
    image.srcSet = srcSet;
    image.onload = function () {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = function () {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    return function () {
      active = false;
    };
  }, [src, srcSet]);
  return loaded;
}
var Avatar_Avatar = /*#__PURE__*/react["forwardRef"](function Avatar(props, ref) {
  var alt = props.alt,
    childrenProp = props.children,
    classes = props.classes,
    className = props.className,
    _props$component = props.component,
    Component = _props$component === void 0 ? 'div' : _props$component,
    imgProps = props.imgProps,
    sizes = props.sizes,
    src = props.src,
    srcSet = props.srcSet,
    _props$variant = props.variant,
    variant = _props$variant === void 0 ? 'circle' : _props$variant,
    other = Object(objectWithoutProperties["a" /* default */])(props, ["alt", "children", "classes", "className", "component", "imgProps", "sizes", "src", "srcSet", "variant"]);
  var children = null; // Use a hook instead of onError on the img element to support server-side rendering.

  var loaded = useLoaded({
    src: src,
    srcSet: srcSet
  });
  var hasImg = src || srcSet;
  var hasImgNotFailing = hasImg && loaded !== 'error';
  if (hasImgNotFailing) {
    children = /*#__PURE__*/react["createElement"]("img", Object(esm_extends["a" /* default */])({
      alt: alt,
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      className: classes.img
    }, imgProps));
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/react["createElement"](Person, {
      className: classes.fallback
    });
  }
  return /*#__PURE__*/react["createElement"](Component, Object(esm_extends["a" /* default */])({
    className: Object(clsx_m["a" /* default */])(classes.root, classes.system, classes[variant], className, !hasImgNotFailing && classes.colorDefault),
    ref: ref
  }, other), children);
});
 false ? undefined : void 0;
/* harmony default export */ var esm_Avatar_Avatar = __webpack_exports__["a"] = (Object(withStyles["a" /* default */])(styles, {
  name: 'MuiAvatar'
})(Avatar_Avatar));

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

/***/ "Mgyd":
/***/ (function(module) {

module.exports = JSON.parse("{\"/migrating-to-react-hooks/\":[{\"date\":\"07/21/2020\",\"message\":\"Everything was great! I've seen hooks in our code a little but wanted something to really help my understanding of when to use them and how they work. The pace was great and a great mix of teaching and exercises to keep everyone engaged. I'll definitely be finishing up the bonus exercises and the final quiz over the next few weeks!\",\"name\":\"Melissa\",\"image\":\"https://media-exp1.licdn.com/dms/image/C5603AQFEvOmzL76Wpw/profile-displayphoto-shrink_800_800/0?e=1601510400&v=beta&t=kKK0YkJUJF-Leqq6u0yslObyO8alx0jkig8WUX5g7Ck\"},{\"date\":\"07/21/2020\",\"message\":\"There was a *lot* covered in this workshop! The one thing I was really glad to see is the format of the workshop. First we listened to you teach, heard the 'whys' of all the principles, then could practice, and if we didn't finish in time (or needed more visual cues), there were written solutions in addition to the written lessons in the repo. I also really enjoyed some of the smaller nuances in each lessons, like hearing the term 'lazy initialization', for useState optimization. The mention of localStorage and its use cases. The use 'dependency array' and 'memoization' when talking about useEffect. The term 'subscription' when talking about events (most documentation doesn't dig into what 'subscription' means). It's these small touches, and subtle explanations that help any developer that has been working in environments that don't prioritize mentorship make some really impactful breakthroughs in their learning path.\",\"name\":\"Kathleen\"},{\"date\":\"07/21/2020\",\"message\":\"I really liked your open style, and that we could ask questions at any time. It's really a refreshing change to consuming already made videos for learning a new concept. The projects were just right to implement what you had explained, as you had comments to lead us as well.\",\"name\":\"Emily\",\"image\":\"https://avatars1.githubusercontent.com/u/36141143?s=400&u=5904067bc72f5fc39cb1f390f9d2f0ecdd9cb5a6&v=4\"}],\"/typescript-for-react-developers/\":[{\"date\":\"06/25/2020\",\"message\":\"Great workshop! I felt like the examples were just the right size and perfectly spaced throughout the workshop. One specific thing I really liked was that each exercise was a different app. Forcing myself to think about TypeScript in each different context helped it sink it more.\",\"name\":\"Lisa\",\"image\":\"https://avatars3.githubusercontent.com/u/8118611?s=400&u=24d416d620d564e3e5dbc018d5c071210aeb43a1&v=4\"},{\"date\":\"06/25/2020\",\"message\":\"This helped a lot! I had no real exposure to TypeScript before this and I feel like I will be able to effectively implement these things now.\",\"name\":\"Jessie\"},{\"date\":\"06/25/2020\",\"message\":\"Overall, this course was really useful! I definitely benefited from having a decent amount of experience with React Hooks, so thank you for making that knowledge a prerequisite and providing some resources to look at before the course. The repo is incredible, it's really awesome to have some preexisting code to work with. I 10/10 love the emojis and the goals within each of the parts. The hints are very clear and make the exercises flow really well. The breakout rooms were also a nice touch. The change from main room to breakout room helped shift me into exercise mode which made me more productive. The comment to the breakout room saying that the rooms would close in  few minutes was also very helpful.\",\"name\":\"Sarah\",\"image\":\"https://avatars2.githubusercontent.com/u/29936437?s=400&u=69e1d5c107f040a6a7363e08f47873b32bed20b6&v=4\"},{\"date\":\"06/25/2020\",\"message\":\"Excellent workshop.  Ben is a great teacher, well prepared and very knowledgeable. I used TypeScript before, but Ben fill up some gaps.  I am more comfortable with interfaces and the use of events and  hooks and typescript.  I would love to see a second class for advanced typescript with specific use of Generics in depth.  Thank you very much\",\"name\":\"Oscar\",\"image\":\"https://avatars1.githubusercontent.com/u/146650?s=400&v=4\"},{\"date\":\"06/23/2020\",\"message\":\"I liked how you structured each lesson so we could see before/after in the repo. That's really helpful for the exercise portion, especially when we get stuck, and for self-directed learning later. Tying it to README instructions which we could also follow on GitHub was awesome as well. I also appreciated when you weren't sure about something or when you mentioned you learned something new; it's helpful for students sometimes to see when the teacher may not have all the answers. It may have been helpful to have more time for the group exercises, but understand the tradeoff with wanting to cover a lot of material in the session. Nice work and thank you!\",\"name\":\"Ross\",\"image\":\"https://avatars3.githubusercontent.com/u/11673?s=400&u=ef80073b0bb2ee07a241e85af0bb51e892955811&v=4\"},{\"date\":\"06/23/2020\",\"message\":\"Everything was REALLY amazing.  Definitely one of the most organized, easy to follow, and useful workshops I've ever taken! Your notes are very helpful and encouraging, and the layout of everything makes it easier to go back to in a week or two and really dive in again solo.  Thank you for putting so much time into this and sharing with us!! :-) Your teaching style and delivery are really calm and informative, and very approachable.  Thanks!!\",\"name\":\"Heather\",\"image\":\"https://avatars0.githubusercontent.com/u/20034374?s=400&u=c094cf92ac81827b3b72c8c73a81309d6cff8d12&v=4\"},{\"date\":\"06/23/2020\",\"message\":\"I have learned so much from this, and you've given us hope that we could actually port some of our components over to TypeScript.\",\"name\":\"Erin\",\"image\":\"https://avatars0.githubusercontent.com/u/16794?s=400&u=d3a702c8edc730acce4f5d8d63cfef2a1b3d32e0&v=4\"}],\"/zero-to-react-with-hooks/\":[{\"date\":\"03/30/2020\",\"message\":\"Pace was perfect, wasn't too fast or too slow.\",\"name\":\"Jacob\"},{\"date\":\"03/30/2020\",\"message\":\"I think the course was excellently structured and Ben has done a great job explaining the details as well as interacting with the people.\",\"name\":\"Alexandru\",\"image\":\"https://avatars0.githubusercontent.com/u/47090365?s=400&u=9664f6b1c22fa9bcf57253811673443cc5eb2fda&v=4\"},{\"date\":\"03/30/2020\",\"message\":\"Great workshop! Thank you!\"},{\"date\":\"03/30/2020\",\"message\":\"The material was presented clearly and in a great detailed fashion. The examples and exercises were very good and engaging ways to apply what we'd just learned... You've created a great resource with which to learn modern React concepts, and I intend to continue referencing and practicing the lessons in the repository in the forthcoming while.\",\"name\":\"Dennis\",\"image\":\"https://media-exp1.licdn.com/dms/image/C4E03AQHRObtCvrgUiQ/profile-displayphoto-shrink_800_800/0?e=1601510400&v=beta&t=D9WDR9bskwWD536R06hWEbvihXtBSk8qd6QrhXxkg-0\"},{\"date\":\"08/20/2020\",\"message\":\"Everything was great! Very engaging – I've had trouble following some other tutorials and videos, but your content is very well structured, well explained, and the code was a great size for reading on screen. I also liked the stretch-goals, keeps things interesting when devs are \\\"in the flow\\\" and get through the initial task quickly.\",\"name\":\"Phillip\"},{\"date\":\"08/20/2020\",\"message\":\"Excellent job. I felt like the 3hr class was the right pace for me didn't zone out at all. I have been totally lost in other React Training's. Definitely the right pace for someone new to React\",\"name\":\"Timothy\"}]}");

/***/ }),

/***/ "SLcR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export styles */
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("wx14");
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Ff2n");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("q1tI");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var clsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("iuhU");
/* harmony import */ var _styles_withStyles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("H2TA");
/* harmony import */ var _List_ListContext__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("MquD");






var styles = {
  /* Styles applied to the root element. */
  root: {
    minWidth: 56,
    flexShrink: 0
  },
  /* Styles applied to the root element when the parent `ListItem` uses `alignItems="flex-start"`. */
  alignItemsFlexStart: {
    marginTop: 8
  }
};
/**
 * A simple wrapper to apply `List` styles to an `Avatar`.
 */

var ListItemAvatar = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["forwardRef"](function ListItemAvatar(props, ref) {
  var classes = props.classes,
    className = props.className,
    other = Object(_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(props, ["classes", "className"]);
  var context = react__WEBPACK_IMPORTED_MODULE_2__["useContext"](_List_ListContext__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__["createElement"]("div", Object(_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])({
    className: Object(clsx__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])(classes.root, className, context.alignItems === 'flex-start' && classes.alignItemsFlexStart),
    ref: ref
  }, other));
});
 false ? undefined : void 0;
/* harmony default export */ __webpack_exports__["a"] = (Object(_styles_withStyles__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"])(styles, {
  name: 'MuiListItemAvatar'
})(ListItemAvatar));

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
//# sourceMappingURL=component---src-templates-minishop-tsx-463c3a03e5b835a50b90.js.map