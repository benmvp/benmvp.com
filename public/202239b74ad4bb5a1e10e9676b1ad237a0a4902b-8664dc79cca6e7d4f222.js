(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "044C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  var asterisk = value.indexOf('**', fromIndex);
  var underscore = value.indexOf('__', fromIndex);
  if (underscore === -1) {
    return asterisk;
  }
  if (asterisk === -1) {
    return underscore;
  }
  return underscore < asterisk ? underscore : asterisk;
}

/***/ }),

/***/ "1T8B":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var attributeName = '[a-zA-Z_:][a-zA-Z0-9:._-]*';
var unquoted = '[^"\'=<>`\\u0000-\\u0020]+';
var singleQuoted = '\'[^\']*\'';
var doubleQuoted = '"[^"]*"';
var attributeValue = '(?:' + unquoted + '|' + singleQuoted + '|' + doubleQuoted + ')';
var attribute = '(?:\\s+' + attributeName + '(?:\\s*=\\s*' + attributeValue + ')?)';
var openTag = '<[A-Za-z][A-Za-z0-9\\-]*' + attribute + '*\\s*\\/?>';
var closeTag = '<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>';
var comment = '<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->';
var processing = '<[?].*?[?]>';
var declaration = '<![A-Za-z]+\\s+[^>]*>';
var cdata = '<!\\[CDATA\\[[\\s\\S]*?\\]\\]>';
exports.openCloseTag = new RegExp('^(?:' + openTag + '|' + closeTag + ')');
exports.tag = new RegExp('^(?:' + openTag + '|' + closeTag + '|' + comment + '|' + processing + '|' + declaration + '|' + cdata + ')');

/***/ }),

/***/ "1VtT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Dependencies. */
var extend = __webpack_require__("6dBs");
var bail = __webpack_require__("Gdbo");
var vfile = __webpack_require__("xm6i");
var trough = __webpack_require__("xkQk");
var string = __webpack_require__("IRYA");
var plain = __webpack_require__("NkL+");

/* Expose a frozen processor. */
module.exports = unified().freeze();
var slice = [].slice;
var own = {}.hasOwnProperty;

/* Process pipeline. */
var pipeline = trough().use(pipelineParse).use(pipelineRun).use(pipelineStringify);
function pipelineParse(p, ctx) {
  ctx.tree = p.parse(ctx.file);
}
function pipelineRun(p, ctx, next) {
  p.run(ctx.tree, ctx.file, done);
  function done(err, tree, file) {
    if (err) {
      next(err);
    } else {
      ctx.tree = tree;
      ctx.file = file;
      next();
    }
  }
}
function pipelineStringify(p, ctx) {
  ctx.file.contents = p.stringify(ctx.tree, ctx.file);
}

/* Function to create the first processor. */
function unified() {
  var attachers = [];
  var transformers = trough();
  var namespace = {};
  var frozen = false;
  var freezeIndex = -1;

  /* Data management. */
  processor.data = data;

  /* Lock. */
  processor.freeze = freeze;

  /* Plug-ins. */
  processor.attachers = attachers;
  processor.use = use;

  /* API. */
  processor.parse = parse;
  processor.stringify = stringify;
  processor.run = run;
  processor.runSync = runSync;
  processor.process = process;
  processor.processSync = processSync;

  /* Expose. */
  return processor;

  /* Create a new processor based on the processor
   * in the current scope. */
  function processor() {
    var destination = unified();
    var length = attachers.length;
    var index = -1;
    while (++index < length) {
      destination.use.apply(null, attachers[index]);
    }
    destination.data(extend(true, {}, namespace));
    return destination;
  }

  /* Freeze: used to signal a processor that has finished
   * configuration.
   *
   * For example, take unified itself.  It’s frozen.
   * Plug-ins should not be added to it.  Rather, it should
   * be extended, by invoking it, before modifying it.
   *
   * In essence, always invoke this when exporting a
   * processor. */
  function freeze() {
    var values;
    var plugin;
    var options;
    var transformer;
    if (frozen) {
      return processor;
    }
    while (++freezeIndex < attachers.length) {
      values = attachers[freezeIndex];
      plugin = values[0];
      options = values[1];
      transformer = null;
      if (options === false) {
        continue;
      }
      if (options === true) {
        values[1] = undefined;
      }
      transformer = plugin.apply(processor, values.slice(1));
      if (typeof transformer === 'function') {
        transformers.use(transformer);
      }
    }
    frozen = true;
    freezeIndex = Infinity;
    return processor;
  }

  /* Data management.
   * Getter / setter for processor-specific informtion. */
  function data(key, value) {
    if (string(key)) {
      /* Set `key`. */
      if (arguments.length === 2) {
        assertUnfrozen('data', frozen);
        namespace[key] = value;
        return processor;
      }

      /* Get `key`. */
      return own.call(namespace, key) && namespace[key] || null;
    }

    /* Set space. */
    if (key) {
      assertUnfrozen('data', frozen);
      namespace = key;
      return processor;
    }

    /* Get space. */
    return namespace;
  }

  /* Plug-in management.
   *
   * Pass it:
   * *   an attacher and options,
   * *   a preset,
   * *   a list of presets, attachers, and arguments (list
   *     of attachers and options). */
  function use(value) {
    var settings;
    assertUnfrozen('use', frozen);
    if (value === null || value === undefined) {
      /* Empty */
    } else if (typeof value === 'function') {
      addPlugin.apply(null, arguments);
    } else if (typeof value === 'object') {
      if ('length' in value) {
        addList(value);
      } else {
        addPreset(value);
      }
    } else {
      throw new Error('Expected usable value, not `' + value + '`');
    }
    if (settings) {
      namespace.settings = extend(namespace.settings || {}, settings);
    }
    return processor;
    function addPreset(result) {
      addList(result.plugins);
      if (result.settings) {
        settings = extend(settings || {}, result.settings);
      }
    }
    function add(value) {
      if (typeof value === 'function') {
        addPlugin(value);
      } else if (typeof value === 'object') {
        if ('length' in value) {
          addPlugin.apply(null, value);
        } else {
          addPreset(value);
        }
      } else {
        throw new Error('Expected usable value, not `' + value + '`');
      }
    }
    function addList(plugins) {
      var length;
      var index;
      if (plugins === null || plugins === undefined) {
        /* Empty */
      } else if (typeof plugins === 'object' && 'length' in plugins) {
        length = plugins.length;
        index = -1;
        while (++index < length) {
          add(plugins[index]);
        }
      } else {
        throw new Error('Expected a list of plugins, not `' + plugins + '`');
      }
    }
    function addPlugin(plugin, value) {
      var entry = find(plugin);
      if (entry) {
        if (plain(entry[1]) && plain(value)) {
          value = extend(entry[1], value);
        }
        entry[1] = value;
      } else {
        attachers.push(slice.call(arguments));
      }
    }
  }
  function find(plugin) {
    var length = attachers.length;
    var index = -1;
    var entry;
    while (++index < length) {
      entry = attachers[index];
      if (entry[0] === plugin) {
        return entry;
      }
    }
  }

  /* Parse a file (in string or VFile representation)
   * into a Unist node using the `Parser` on the
   * processor. */
  function parse(doc) {
    var file = vfile(doc);
    var Parser;
    freeze();
    Parser = processor.Parser;
    assertParser('parse', Parser);
    if (newable(Parser)) {
      return new Parser(String(file), file).parse();
    }
    return Parser(String(file), file); // eslint-disable-line new-cap
  }

  /* Run transforms on a Unist node representation of a file
   * (in string or VFile representation), async. */
  function run(node, file, cb) {
    assertNode(node);
    freeze();
    if (!cb && typeof file === 'function') {
      cb = file;
      file = null;
    }
    if (!cb) {
      return new Promise(executor);
    }
    executor(null, cb);
    function executor(resolve, reject) {
      transformers.run(node, vfile(file), done);
      function done(err, tree, file) {
        tree = tree || node;
        if (err) {
          reject(err);
        } else if (resolve) {
          resolve(tree);
        } else {
          cb(null, tree, file);
        }
      }
    }
  }

  /* Run transforms on a Unist node representation of a file
   * (in string or VFile representation), sync. */
  function runSync(node, file) {
    var complete = false;
    var result;
    run(node, file, done);
    assertDone('runSync', 'run', complete);
    return result;
    function done(err, tree) {
      complete = true;
      bail(err);
      result = tree;
    }
  }

  /* Stringify a Unist node representation of a file
   * (in string or VFile representation) into a string
   * using the `Compiler` on the processor. */
  function stringify(node, doc) {
    var file = vfile(doc);
    var Compiler;
    freeze();
    Compiler = processor.Compiler;
    assertCompiler('stringify', Compiler);
    assertNode(node);
    if (newable(Compiler)) {
      return new Compiler(node, file).compile();
    }
    return Compiler(node, file); // eslint-disable-line new-cap
  }

  /* Parse a file (in string or VFile representation)
   * into a Unist node using the `Parser` on the processor,
   * then run transforms on that node, and compile the
   * resulting node using the `Compiler` on the processor,
   * and store that result on the VFile. */
  function process(doc, cb) {
    freeze();
    assertParser('process', processor.Parser);
    assertCompiler('process', processor.Compiler);
    if (!cb) {
      return new Promise(executor);
    }
    executor(null, cb);
    function executor(resolve, reject) {
      var file = vfile(doc);
      pipeline.run(processor, {
        file: file
      }, done);
      function done(err) {
        if (err) {
          reject(err);
        } else if (resolve) {
          resolve(file);
        } else {
          cb(null, file);
        }
      }
    }
  }

  /* Process the given document (in string or VFile
   * representation), sync. */
  function processSync(doc) {
    var complete = false;
    var file;
    freeze();
    assertParser('processSync', processor.Parser);
    assertCompiler('processSync', processor.Compiler);
    file = vfile(doc);
    process(file, done);
    assertDone('processSync', 'process', complete);
    return file;
    function done(err) {
      complete = true;
      bail(err);
    }
  }
}

/* Check if `func` is a constructor. */
function newable(value) {
  return typeof value === 'function' && keys(value.prototype);
}

/* Check if `value` is an object with keys. */
function keys(value) {
  var key;
  for (key in value) {
    return true;
  }
  return false;
}

/* Assert a parser is available. */
function assertParser(name, Parser) {
  if (typeof Parser !== 'function') {
    throw new Error('Cannot `' + name + '` without `Parser`');
  }
}

/* Assert a compiler is available. */
function assertCompiler(name, Compiler) {
  if (typeof Compiler !== 'function') {
    throw new Error('Cannot `' + name + '` without `Compiler`');
  }
}

/* Assert the processor is not frozen. */
function assertUnfrozen(name, frozen) {
  if (frozen) {
    throw new Error(['Cannot invoke `' + name + '` on a frozen processor.\nCreate a new ', 'processor first, by invoking it: use `processor()` instead of ', '`processor`.'].join(''));
  }
}

/* Assert `node` is a Unist node. */
function assertNode(node) {
  if (!node || !string(node.type)) {
    throw new Error('Expected node, got `' + node + '`');
  }
}

/* Assert that `complete` is `true`. */
function assertDone(name, asyncName, complete) {
  if (!complete) {
    throw new Error('`' + name + '` finished async. Use `' + asyncName + '` instead');
  }
}

/***/ }),

/***/ "1db3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__("U6jy");
var entities = __webpack_require__("ZWk2");
module.exports = factory;

/* Factory to create an entity decoder. */
function factory(ctx) {
  decoder.raw = decodeRaw;
  return decoder;

  /* Normalize `position` to add an `indent`. */
  function normalize(position) {
    var offsets = ctx.offset;
    var line = position.line;
    var result = [];
    while (++line) {
      if (!(line in offsets)) {
        break;
      }
      result.push((offsets[line] || 0) + 1);
    }
    return {
      start: position,
      indent: result
    };
  }

  /* Handle a warning.
   * See https://github.com/wooorm/parse-entities
   * for the warnings. */
  function handleWarning(reason, position, code) {
    if (code === 3) {
      return;
    }
    ctx.file.message(reason, position);
  }

  /* Decode `value` (at `position`) into text-nodes. */
  function decoder(value, position, handler) {
    entities(value, {
      position: normalize(position),
      warning: handleWarning,
      text: handler,
      reference: handler,
      textContext: ctx,
      referenceContext: ctx
    });
  }

  /* Decode `value` (at `position`) into a string. */
  function decodeRaw(value, position, options) {
    return entities(value, xtend(options, {
      position: normalize(position),
      warning: handleWarning
    }));
  }
}

/***/ }),

/***/ "1iAE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = alphabetical;

// Check if the given character code, or the character code at the first
// character, is alphabetical.
function alphabetical(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 97 && code <= 122 /* a-z */ || code >= 65 && code <= 90 /* A-Z */;
}

/***/ }),

/***/ "22pC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;
var MERGEABLE_NODES = {
  text: mergeText,
  blockquote: mergeBlockquote
};

/* Check whether a node is mergeable with adjacent nodes. */
function mergeable(node) {
  var start;
  var end;
  if (node.type !== 'text' || !node.position) {
    return true;
  }
  start = node.position.start;
  end = node.position.end;

  /* Only merge nodes which occupy the same size as their
   * `value`. */
  return start.line !== end.line || end.column - start.column === node.value.length;
}

/* Merge two text nodes: `node` into `prev`. */
function mergeText(prev, node) {
  prev.value += node.value;
  return prev;
}

/* Merge two blockquotes: `node` into `prev`, unless in
 * CommonMark mode. */
function mergeBlockquote(prev, node) {
  if (this.options.commonmark) {
    return node;
  }
  prev.children = prev.children.concat(node.children);
  return prev;
}

/* Construct a tokenizer.  This creates both
 * `tokenizeInline` and `tokenizeBlock`. */
function factory(type) {
  return tokenize;

  /* Tokenizer for a bound `type`. */
  function tokenize(value, location) {
    var self = this;
    var offset = self.offset;
    var tokens = [];
    var methods = self[type + 'Methods'];
    var tokenizers = self[type + 'Tokenizers'];
    var line = location.line;
    var column = location.column;
    var index;
    var length;
    var method;
    var name;
    var matched;
    var valueLength;

    /* Trim white space only lines. */
    if (!value) {
      return tokens;
    }

    /* Expose on `eat`. */
    eat.now = now;
    eat.file = self.file;

    /* Sync initial offset. */
    updatePosition('');

    /* Iterate over `value`, and iterate over all
     * tokenizers.  When one eats something, re-iterate
     * with the remaining value.  If no tokenizer eats,
     * something failed (should not happen) and an
     * exception is thrown. */
    while (value) {
      index = -1;
      length = methods.length;
      matched = false;
      while (++index < length) {
        name = methods[index];
        method = tokenizers[name];
        if (method && ( /* istanbul ignore next */!method.onlyAtStart || self.atStart) && (!method.notInList || !self.inList) && (!method.notInBlock || !self.inBlock) && (!method.notInLink || !self.inLink)) {
          valueLength = value.length;
          method.apply(self, [eat, value]);
          matched = valueLength !== value.length;
          if (matched) {
            break;
          }
        }
      }

      /* istanbul ignore if */
      if (!matched) {
        self.file.fail(new Error('Infinite loop'), eat.now());
      }
    }
    self.eof = now();
    return tokens;

    /* Update line, column, and offset based on
     * `value`. */
    function updatePosition(subvalue) {
      var lastIndex = -1;
      var index = subvalue.indexOf('\n');
      while (index !== -1) {
        line++;
        lastIndex = index;
        index = subvalue.indexOf('\n', index + 1);
      }
      if (lastIndex === -1) {
        column += subvalue.length;
      } else {
        column = subvalue.length - lastIndex;
      }
      if (line in offset) {
        if (lastIndex !== -1) {
          column += offset[line];
        } else if (column <= offset[line]) {
          column = offset[line] + 1;
        }
      }
    }

    /* Get offset.  Called before the first character is
     * eaten to retrieve the range's offsets. */
    function getOffset() {
      var indentation = [];
      var pos = line + 1;

      /* Done.  Called when the last character is
       * eaten to retrieve the range’s offsets. */
      return function () {
        var last = line + 1;
        while (pos < last) {
          indentation.push((offset[pos] || 0) + 1);
          pos++;
        }
        return indentation;
      };
    }

    /* Get the current position. */
    function now() {
      var pos = {
        line: line,
        column: column
      };
      pos.offset = self.toOffset(pos);
      return pos;
    }

    /* Store position information for a node. */
    function Position(start) {
      this.start = start;
      this.end = now();
    }

    /* Throw when a value is incorrectly eaten.
     * This shouldn’t happen but will throw on new,
     * incorrect rules. */
    function validateEat(subvalue) {
      /* istanbul ignore if */
      if (value.substring(0, subvalue.length) !== subvalue) {
        /* Capture stack-trace. */
        self.file.fail(new Error('Incorrectly eaten value: please report this ' + 'warning on http://git.io/vg5Ft'), now());
      }
    }

    /* Mark position and patch `node.position`. */
    function position() {
      var before = now();
      return update;

      /* Add the position to a node. */
      function update(node, indent) {
        var prev = node.position;
        var start = prev ? prev.start : before;
        var combined = [];
        var n = prev && prev.end.line;
        var l = before.line;
        node.position = new Position(start);

        /* If there was already a `position`, this
         * node was merged.  Fixing `start` wasn’t
         * hard, but the indent is different.
         * Especially because some information, the
         * indent between `n` and `l` wasn’t
         * tracked.  Luckily, that space is
         * (should be?) empty, so we can safely
         * check for it now. */
        if (prev && indent && prev.indent) {
          combined = prev.indent;
          if (n < l) {
            while (++n < l) {
              combined.push((offset[n] || 0) + 1);
            }
            combined.push(before.column);
          }
          indent = combined.concat(indent);
        }
        node.position.indent = indent || [];
        return node;
      }
    }

    /* Add `node` to `parent`s children or to `tokens`.
     * Performs merges where possible. */
    function add(node, parent) {
      var children = parent ? parent.children : tokens;
      var prev = children[children.length - 1];
      if (prev && node.type === prev.type && node.type in MERGEABLE_NODES && mergeable(prev) && mergeable(node)) {
        node = MERGEABLE_NODES[node.type].call(self, prev, node);
      }
      if (node !== prev) {
        children.push(node);
      }
      if (self.atStart && tokens.length !== 0) {
        self.exitStart();
      }
      return node;
    }

    /* Remove `subvalue` from `value`.
     * `subvalue` must be at the start of `value`. */
    function eat(subvalue) {
      var indent = getOffset();
      var pos = position();
      var current = now();
      validateEat(subvalue);
      apply.reset = reset;
      reset.test = test;
      apply.test = test;
      value = value.substring(subvalue.length);
      updatePosition(subvalue);
      indent = indent();
      return apply;

      /* Add the given arguments, add `position` to
       * the returned node, and return the node. */
      function apply(node, parent) {
        return pos(add(pos(node), parent), indent);
      }

      /* Functions just like apply, but resets the
       * content:  the line and column are reversed,
       * and the eaten value is re-added.
       * This is useful for nodes with a single
       * type of content, such as lists and tables.
       * See `apply` above for what parameters are
       * expected. */
      function reset() {
        var node = apply.apply(null, arguments);
        line = current.line;
        column = current.column;
        value = subvalue + value;
        return node;
      }

      /* Test the position, after eating, and reverse
       * to a not-eaten state. */
      function test() {
        var result = pos({});
        line = current.line;
        column = current.column;
        value = subvalue + value;
        return result.position;
      }
    }
  }
}

/***/ }),

/***/ "2a+b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
module.exports = table;
var C_BACKSLASH = '\\';
var C_TICK = '`';
var C_DASH = '-';
var C_PIPE = '|';
var C_COLON = ':';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var MIN_TABLE_COLUMNS = 1;
var MIN_TABLE_ROWS = 2;
var TABLE_ALIGN_LEFT = 'left';
var TABLE_ALIGN_CENTER = 'center';
var TABLE_ALIGN_RIGHT = 'right';
var TABLE_ALIGN_NONE = null;
function table(eat, value, silent) {
  var self = this;
  var index;
  var alignments;
  var alignment;
  var subvalue;
  var row;
  var length;
  var lines;
  var queue;
  var character;
  var hasDash;
  var align;
  var cell;
  var preamble;
  var count;
  var opening;
  var now;
  var position;
  var lineCount;
  var line;
  var rows;
  var table;
  var lineIndex;
  var pipeIndex;
  var first;

  /* Exit when not in gfm-mode. */
  if (!self.options.gfm) {
    return;
  }

  /* Get the rows.
   * Detecting tables soon is hard, so there are some
   * checks for performance here, such as the minimum
   * number of rows, and allowed characters in the
   * alignment row. */
  index = 0;
  lineCount = 0;
  length = value.length + 1;
  lines = [];
  while (index < length) {
    lineIndex = value.indexOf(C_NEWLINE, index);
    pipeIndex = value.indexOf(C_PIPE, index + 1);
    if (lineIndex === -1) {
      lineIndex = value.length;
    }
    if (pipeIndex === -1 || pipeIndex > lineIndex) {
      if (lineCount < MIN_TABLE_ROWS) {
        return;
      }
      break;
    }
    lines.push(value.slice(index, lineIndex));
    lineCount++;
    index = lineIndex + 1;
  }

  /* Parse the alignment row. */
  subvalue = lines.join(C_NEWLINE);
  alignments = lines.splice(1, 1)[0] || [];
  index = 0;
  length = alignments.length;
  lineCount--;
  alignment = false;
  align = [];
  while (index < length) {
    character = alignments.charAt(index);
    if (character === C_PIPE) {
      hasDash = null;
      if (alignment === false) {
        if (first === false) {
          return;
        }
      } else {
        align.push(alignment);
        alignment = false;
      }
      first = false;
    } else if (character === C_DASH) {
      hasDash = true;
      alignment = alignment || TABLE_ALIGN_NONE;
    } else if (character === C_COLON) {
      if (alignment === TABLE_ALIGN_LEFT) {
        alignment = TABLE_ALIGN_CENTER;
      } else if (hasDash && alignment === TABLE_ALIGN_NONE) {
        alignment = TABLE_ALIGN_RIGHT;
      } else {
        alignment = TABLE_ALIGN_LEFT;
      }
    } else if (!whitespace(character)) {
      return;
    }
    index++;
  }
  if (alignment !== false) {
    align.push(alignment);
  }

  /* Exit when without enough columns. */
  if (align.length < MIN_TABLE_COLUMNS) {
    return;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }

  /* Parse the rows. */
  position = -1;
  rows = [];
  table = eat(subvalue).reset({
    type: 'table',
    align: align,
    children: rows
  });
  while (++position < lineCount) {
    line = lines[position];
    row = {
      type: 'tableRow',
      children: []
    };

    /* Eat a newline character when this is not the
     * first row. */
    if (position) {
      eat(C_NEWLINE);
    }

    /* Eat the row. */
    eat(line).reset(row, table);
    length = line.length + 1;
    index = 0;
    queue = '';
    cell = '';
    preamble = true;
    count = null;
    opening = null;
    while (index < length) {
      character = line.charAt(index);
      if (character === C_TAB || character === C_SPACE) {
        if (cell) {
          queue += character;
        } else {
          eat(character);
        }
        index++;
        continue;
      }
      if (character === '' || character === C_PIPE) {
        if (preamble) {
          eat(character);
        } else {
          if (character && opening) {
            queue += character;
            index++;
            continue;
          }
          if ((cell || character) && !preamble) {
            subvalue = cell;
            if (queue.length > 1) {
              if (character) {
                subvalue += queue.slice(0, queue.length - 1);
                queue = queue.charAt(queue.length - 1);
              } else {
                subvalue += queue;
                queue = '';
              }
            }
            now = eat.now();
            eat(subvalue)({
              type: 'tableCell',
              children: self.tokenizeInline(cell, now)
            }, row);
          }
          eat(queue + character);
          queue = '';
          cell = '';
        }
      } else {
        if (queue) {
          cell += queue;
          queue = '';
        }
        cell += character;
        if (character === C_BACKSLASH && index !== length - 2) {
          cell += line.charAt(index + 1);
          index++;
        }
        if (character === C_TICK) {
          count = 1;
          while (line.charAt(index + 1) === character) {
            cell += character;
            index++;
            count++;
          }
          if (!opening) {
            opening = count;
          } else if (count >= opening) {
            opening = 0;
          }
        }
      }
      preamble = false;
      index++;
    }

    /* Eat the alignment row. */
    if (!position) {
      eat(C_NEWLINE + alignments);
    }
  }
  return table;
}

/***/ }),

/***/ "3+Nb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  position: true,
  gfm: true,
  commonmark: false,
  footnotes: false,
  pedantic: false,
  blocks: __webpack_require__("VHls")
};

/***/ }),

/***/ "33yf":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }
  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function () {
  var resolvedPath = '',
    resolvedAbsolute = false;
  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = i >= 0 ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }
    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
    return !!p;
  }), !resolvedAbsolute).join('/');
  return (resolvedAbsolute ? '/' : '') + resolvedPath || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function (path) {
  var isAbsolute = exports.isAbsolute(path),
    trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function (p) {
    return !!p;
  }), !isAbsolute).join('/');
  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }
  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function (path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function () {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function (p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};

// path.relative(from, to)
// posix version
exports.relative = function (from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);
  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }
    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }
    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }
  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));
  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }
  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }
  outputParts = outputParts.concat(toParts.slice(samePartsLength));
  return outputParts.join('/');
};
exports.sep = '/';
exports.delimiter = ':';
exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
      if (!matchedSlash) {
        end = i;
        break;
      }
    } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }
  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};
function basename(path) {
  if (typeof path !== 'string') path = path + '';
  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;
  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        start = i + 1;
        break;
      }
    } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }
  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};
exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
      // If we reached a path separator that was not part of a set of path
      // separators at the end of the string, stop now
      if (!matchedSlash) {
        startPart = i + 1;
        break;
      }
      continue;
    }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
      // If this is our first dot, mark it as the start of our extension
      if (startDot === -1) startDot = i;else if (preDotState !== 1) preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }
  if (startDot === -1 || end === -1 ||
  // We saw a non-dot character immediately before the dot
  preDotState === 0 ||
  // The (right-most) trimmed path component is exactly '..'
  preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};
function filter(xs, f) {
  if (xs.filter) return xs.filter(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (f(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b' ? function (str, start, len) {
  return str.substr(start, len);
} : function (str, start, len) {
  if (start < 0) start = str.length + start;
  return str.substr(start, len);
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ }),

/***/ "36yr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  return value.indexOf('`', fromIndex);
}

/***/ }),

/***/ "3GlI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = trimTrailingLines;
var line = '\n';

// Remove final newline characters from `value`.
function trimTrailingLines(value) {
  var val = String(value);
  var index = val.length;
  while (val.charAt(--index) === line) {
    // Empty
  }
  return val.slice(0, index + 1);
}

/***/ }),

/***/ "3m36":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable react/prop-types, react/no-multi-comp */


var xtend = __webpack_require__("U6jy");
var React = __webpack_require__("q1tI");
var supportsStringRender = parseInt((React.version || '16').slice(0, 2), 10) >= 16;
var createElement = React.createElement;
module.exports = {
  break: 'br',
  paragraph: 'p',
  emphasis: 'em',
  strong: 'strong',
  thematicBreak: 'hr',
  blockquote: 'blockquote',
  delete: 'del',
  link: 'a',
  image: 'img',
  linkReference: 'a',
  imageReference: 'img',
  table: SimpleRenderer.bind(null, 'table'),
  tableHead: SimpleRenderer.bind(null, 'thead'),
  tableBody: SimpleRenderer.bind(null, 'tbody'),
  tableRow: SimpleRenderer.bind(null, 'tr'),
  tableCell: TableCell,
  root: Root,
  text: TextRenderer,
  list: List,
  listItem: ListItem,
  definition: NullRenderer,
  heading: Heading,
  inlineCode: InlineCode,
  code: CodeBlock,
  html: Html,
  virtualHtml: VirtualHtml,
  parsedHtml: ParsedHtml
};
function TextRenderer(props) {
  return supportsStringRender ? props.children : createElement('span', null, props.children);
}
function Root(props) {
  var useFragment = !props.className;
  var root = useFragment ? React.Fragment || 'div' : 'div';
  return createElement(root, useFragment ? null : props, props.children);
}
function SimpleRenderer(tag, props) {
  return createElement(tag, getCoreProps(props), props.children);
}
function TableCell(props) {
  var style = props.align ? {
    textAlign: props.align
  } : undefined;
  var coreProps = getCoreProps(props);
  return createElement(props.isHeader ? 'th' : 'td', style ? xtend({
    style: style
  }, coreProps) : coreProps, props.children);
}
function Heading(props) {
  return createElement("h".concat(props.level), getCoreProps(props), props.children);
}
function List(props) {
  var attrs = getCoreProps(props);
  if (props.start !== null && props.start !== 1 && props.start !== undefined) {
    attrs.start = props.start.toString();
  }
  return createElement(props.ordered ? 'ol' : 'ul', attrs, props.children);
}
function ListItem(props) {
  var checkbox = null;
  if (props.checked !== null && props.checked !== undefined) {
    var checked = props.checked;
    checkbox = createElement('input', {
      type: 'checkbox',
      checked: checked,
      readOnly: true
    });
  }
  return createElement('li', getCoreProps(props), checkbox, props.children);
}
function CodeBlock(props) {
  var className = props.language && "language-".concat(props.language);
  var code = createElement('code', className ? {
    className: className
  } : null, props.value);
  return createElement('pre', getCoreProps(props), code);
}
function InlineCode(props) {
  return createElement('code', getCoreProps(props), props.children);
}
function Html(props) {
  if (props.skipHtml) {
    return null;
  }
  var tag = props.isBlock ? 'div' : 'span';
  if (props.escapeHtml) {
    var comp = React.Fragment || tag;
    return createElement(comp, null, props.value);
  }
  var nodeProps = {
    dangerouslySetInnerHTML: {
      __html: props.value
    }
  };
  return createElement(tag, nodeProps);
}
function ParsedHtml(props) {
  return props['data-sourcepos'] ? React.cloneElement(props.element, {
    'data-sourcepos': props['data-sourcepos']
  }) : props.element;
}
function VirtualHtml(props) {
  return createElement(props.tag, getCoreProps(props), props.children);
}
function NullRenderer() {
  return null;
}
function getCoreProps(props) {
  return props['data-sourcepos'] ? {
    'data-sourcepos': props['data-sourcepos']
  } : {};
}

/***/ }),

/***/ "48q5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__("33yf");
function replaceExt(npath, ext) {
  if (typeof npath !== 'string') {
    return npath;
  }
  if (npath.length === 0) {
    return npath;
  }
  var nFileName = path.basename(npath, path.extname(npath)) + ext;
  return path.join(path.dirname(npath), nFileName);
}
module.exports = replaceExt;

/***/ }),

/***/ "4MqD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;

// Construct a state `toggler`: a function which inverses `property` in context
// based on its current value.
// The by `toggler` returned function restores that value.
function factory(key, state, ctx) {
  return enter;
  function enter() {
    var context = ctx || this;
    var current = context[key];
    context[key] = !state;
    return exit;
    function exit() {
      context[key] = current;
    }
  }
}

/***/ }),

/***/ "5T4m":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = text;
function text(eat, value, silent) {
  var self = this;
  var methods;
  var tokenizers;
  var index;
  var length;
  var subvalue;
  var position;
  var tokenizer;
  var name;
  var min;
  var now;

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  methods = self.inlineMethods;
  length = methods.length;
  tokenizers = self.inlineTokenizers;
  index = -1;
  min = value.length;
  while (++index < length) {
    name = methods[index];
    if (name === 'text' || !tokenizers[name]) {
      continue;
    }
    tokenizer = tokenizers[name].locator;
    if (!tokenizer) {
      eat.file.fail('Missing locator: `' + name + '`');
    }
    position = tokenizer.call(self, value, 1);
    if (position !== -1 && position < min) {
      min = position;
    }
  }
  subvalue = value.slice(0, min);
  now = eat.now();
  self.decode(subvalue, now, function (content, position, source) {
    eat(source || content)({
      type: 'text',
      value: content
    });
  });
}

/***/ }),

/***/ "5t69":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__("U6jy");
var inherits = __webpack_require__("P7XM");
module.exports = unherit;

// Create a custom constructor which can be modified without affecting the
// original class.
function unherit(Super) {
  var result;
  var key;
  var value;
  inherits(Of, Super);
  inherits(From, Of);

  // Clone values.
  result = Of.prototype;
  for (key in result) {
    value = result[key];
    if (value && typeof value === 'object') {
      result[key] = 'concat' in value ? value.concat() : xtend(value);
    }
  }
  return Of;

  // Constructor accepting a single argument, which itself is an `arguments`
  // object.
  function From(parameters) {
    return Super.apply(this, parameters);
  }

  // Constructor accepting variadic arguments.
  function Of() {
    if (!(this instanceof Of)) {
      return new From(arguments);
    }
    return Super.apply(this, arguments);
  }
}

/***/ }),

/***/ "62+j":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var normalize = __webpack_require__("d+Jj");
module.exports = footnoteDefinition;
footnoteDefinition.notInList = true;
footnoteDefinition.notInBlock = true;
var C_BACKSLASH = '\\';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_CARET = '^';
var C_COLON = ':';
var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm;
function footnoteDefinition(eat, value, silent) {
  var self = this;
  var offsets = self.offset;
  var index;
  var length;
  var subvalue;
  var now;
  var currentLine;
  var content;
  var queue;
  var subqueue;
  var character;
  var identifier;
  var add;
  var exit;
  if (!self.options.footnotes) {
    return;
  }
  index = 0;
  length = value.length;
  subvalue = '';
  now = eat.now();
  currentLine = now.line;
  while (index < length) {
    character = value.charAt(index);
    if (!whitespace(character)) {
      break;
    }
    subvalue += character;
    index++;
  }
  if (value.charAt(index) !== C_BRACKET_OPEN || value.charAt(index + 1) !== C_CARET) {
    return;
  }
  subvalue += C_BRACKET_OPEN + C_CARET;
  index = subvalue.length;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character === C_BRACKET_CLOSE) {
      break;
    } else if (character === C_BACKSLASH) {
      queue += character;
      index++;
      character = value.charAt(index);
    }
    queue += character;
    index++;
  }
  if (!queue || value.charAt(index) !== C_BRACKET_CLOSE || value.charAt(index + 1) !== C_COLON) {
    return;
  }
  if (silent) {
    return true;
  }
  identifier = normalize(queue);
  subvalue += queue + C_BRACKET_CLOSE + C_COLON;
  index = subvalue.length;
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE) {
      break;
    }
    subvalue += character;
    index++;
  }
  now.column += subvalue.length;
  now.offset += subvalue.length;
  queue = '';
  content = '';
  subqueue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character === C_NEWLINE) {
      subqueue = character;
      index++;
      while (index < length) {
        character = value.charAt(index);
        if (character !== C_NEWLINE) {
          break;
        }
        subqueue += character;
        index++;
      }
      queue += subqueue;
      subqueue = '';
      while (index < length) {
        character = value.charAt(index);
        if (character !== C_SPACE) {
          break;
        }
        subqueue += character;
        index++;
      }
      if (subqueue.length === 0) {
        break;
      }
      queue += subqueue;
    }
    if (queue) {
      content += queue;
      queue = '';
    }
    content += character;
    index++;
  }
  subvalue += content;
  content = content.replace(EXPRESSION_INITIAL_TAB, function (line) {
    offsets[currentLine] = (offsets[currentLine] || 0) + line.length;
    currentLine++;
    return '';
  });
  add = eat(subvalue);
  exit = self.enterBlock();
  content = self.tokenizeBlock(content, now);
  exit();
  return add({
    type: 'footnoteDefinition',
    identifier: identifier,
    children: content
  });
}

/***/ }),

/***/ "6dBs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;
var isArray = function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }
  return toStr.call(arr) === '[object Array]';
};
var isPlainObject = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }
  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
  // Not own constructor property must be Object
  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  }

  // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.
  var key;
  for (key in obj) {/**/}
  return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
  if (defineProperty && options.name === '__proto__') {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
  if (name === '__proto__') {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      // In early versions of node, obj['__proto__'] is buggy when obj has
      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
      return gOPD(obj, name).value;
    }
  }
  return obj[name];
};
module.exports = function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false;

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    // skip the boolean and the target
    i = 2;
  }
  if (target == null || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }
  for (; i < length; ++i) {
    options = arguments[i];
    // Only deal with non-null/undefined values
    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name);

        // Prevent never-ending loop
        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            setProperty(target, {
              name: name,
              newValue: extend(deep, clone, copy)
            });

            // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            setProperty(target, {
              name: name,
              newValue: copy
            });
          }
        }
      }
    }
  }

  // Return the modified object
  return target;
};

/***/ }),

/***/ "7MxR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__("U6jy");
var removePosition = __webpack_require__("cBNe");
module.exports = parse;
var C_NEWLINE = '\n';
var EXPRESSION_LINE_BREAKS = /\r\n|\r/g;

/* Parse the bound file. */
function parse() {
  var self = this;
  var value = String(self.file);
  var start = {
    line: 1,
    column: 1,
    offset: 0
  };
  var content = xtend(start);
  var node;

  /* Clean non-unix newlines: `\r\n` and `\r` are all
   * changed to `\n`.  This should not affect positional
   * information. */
  value = value.replace(EXPRESSION_LINE_BREAKS, C_NEWLINE);
  if (value.charCodeAt(0) === 0xFEFF) {
    value = value.slice(1);
    content.column++;
    content.offset++;
  }
  node = {
    type: 'root',
    children: self.tokenizeBlock(value, content),
    position: {
      start: start,
      end: self.eof || xtend(start)
    }
  };
  if (!self.options.position) {
    removePosition(node, true);
  }
  return node;
}

/***/ }),

/***/ "7XrY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  var index = value.indexOf('\n', fromIndex);
  while (index > fromIndex) {
    if (value.charAt(index - 1) !== ' ') {
      break;
    }
    index--;
  }
  return index;
}

/***/ }),

/***/ "7nPM":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;
function factory(file) {
  var contents = indices(String(file));
  return {
    toPosition: offsetToPositionFactory(contents),
    toOffset: positionToOffsetFactory(contents)
  };
}

// Factory to get the line and column-based `position` for `offset` in the bound
// indices.
function offsetToPositionFactory(indices) {
  return offsetToPosition;

  // Get the line and column-based `position` for `offset` in the bound indices.
  function offsetToPosition(offset) {
    var index = -1;
    var length = indices.length;
    if (offset < 0) {
      return {};
    }
    while (++index < length) {
      if (indices[index] > offset) {
        return {
          line: index + 1,
          column: offset - (indices[index - 1] || 0) + 1,
          offset: offset
        };
      }
    }
    return {};
  }
}

// Factory to get the `offset` for a line and column-based `position` in the
// bound indices.
function positionToOffsetFactory(indices) {
  return positionToOffset;

  // Get the `offset` for a line and column-based `position` in the bound
  // indices.
  function positionToOffset(position) {
    var line = position && position.line;
    var column = position && position.column;
    if (!isNaN(line) && !isNaN(column) && line - 1 in indices) {
      return (indices[line - 2] || 0) + column - 1 || 0;
    }
    return -1;
  }
}

// Get indices of line-breaks in `value`.
function indices(value) {
  var result = [];
  var index = value.indexOf('\n');
  while (index !== -1) {
    result.push(index + 1);
    index = value.indexOf('\n', index + 1);
  }
  result.push(value.length + 1);
  return result;
}

/***/ }),

/***/ "9J5K":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__("AZoD");
module.exports = VMessage;

// Inherit from `Error#`.
function VMessagePrototype() {}
VMessagePrototype.prototype = Error.prototype;
VMessage.prototype = new VMessagePrototype();

// Message properties.
var proto = VMessage.prototype;
proto.file = '';
proto.name = '';
proto.reason = '';
proto.message = '';
proto.stack = '';
proto.fatal = null;
proto.column = null;
proto.line = null;

// Construct a new VMessage.
//
// Note: We cannot invoke `Error` on the created context, as that adds readonly
// `line` and `column` attributes on Safari 9, thus throwing and failing the
// data.
function VMessage(reason, position, origin) {
  var parts;
  var range;
  var location;
  if (typeof position === 'string') {
    origin = position;
    position = null;
  }
  parts = parseOrigin(origin);
  range = stringify(position) || '1:1';
  location = {
    start: {
      line: null,
      column: null
    },
    end: {
      line: null,
      column: null
    }
  };

  // Node.
  if (position && position.position) {
    position = position.position;
  }
  if (position) {
    // Position.
    if (position.start) {
      location = position;
      position = position.start;
    } else {
      // Point.
      location.start = position;
    }
  }
  if (reason.stack) {
    this.stack = reason.stack;
    reason = reason.message;
  }
  this.message = reason;
  this.name = range;
  this.reason = reason;
  this.line = position ? position.line : null;
  this.column = position ? position.column : null;
  this.location = location;
  this.source = parts[0];
  this.ruleId = parts[1];
}
function parseOrigin(origin) {
  var result = [null, null];
  var index;
  if (typeof origin === 'string') {
    index = origin.indexOf(':');
    if (index === -1) {
      result[1] = origin;
    } else {
      result[0] = origin.slice(0, index);
      result[1] = origin.slice(index + 1);
    }
  }
  return result;
}

/***/ }),

/***/ "9Z5P":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__("ZkSf");
module.exports = function (node) {
  visit(node, 'table', wrap);
  return node;
};
function wrap(table) {
  var children = table.children;
  table.children = [{
    type: 'tableHead',
    align: table.align,
    children: [children[0]],
    position: children[0].position
  }];
  if (children.length > 1) {
    table.children.push({
      type: 'tableBody',
      align: table.align,
      children: children.slice(1),
      position: {
        start: children[1].position.start,
        end: children[children.length - 1].position.end
      }
    });
  }
}

/***/ }),

/***/ "ACGk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  var link = value.indexOf('[', fromIndex);
  var image = value.indexOf('![', fromIndex);
  if (image === -1) {
    return link;
  }

  /* Link can never be `-1` if an image is found, so we don’t need
   * to check for that :) */
  return link < image ? link : image;
}

/***/ }),

/***/ "AZoD":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var own = {}.hasOwnProperty;
module.exports = stringify;
function stringify(value) {
  /* Nothing. */
  if (!value || typeof value !== 'object') {
    return null;
  }

  /* Node. */
  if (own.call(value, 'position') || own.call(value, 'type')) {
    return position(value.position);
  }

  /* Position. */
  if (own.call(value, 'start') || own.call(value, 'end')) {
    return position(value);
  }

  /* Point. */
  if (own.call(value, 'line') || own.call(value, 'column')) {
    return point(value);
  }

  /* ? */
  return null;
}
function point(point) {
  if (!point || typeof point !== 'object') {
    point = {};
  }
  return index(point.line) + ':' + index(point.column);
}
function position(pos) {
  if (!pos || typeof pos !== 'object') {
    pos = {};
  }
  return point(pos.start) + '-' + point(pos.end);
}
function index(value) {
  return value && typeof value === 'number' ? value : 1;
}

/***/ }),

/***/ "BEtg":
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer);
};
function isBuffer(obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj);
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer(obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0));
}

/***/ }),

/***/ "DCCt":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("RsFJ");
var word = __webpack_require__("obXZ");
var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("W8QB");
module.exports = emphasis;
emphasis.locator = locate;
var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
function emphasis(eat, value, silent) {
  var self = this;
  var index = 0;
  var character = value.charAt(index);
  var now;
  var pedantic;
  var marker;
  var queue;
  var subvalue;
  var length;
  var prev;
  if (character !== C_ASTERISK && character !== C_UNDERSCORE) {
    return;
  }
  pedantic = self.options.pedantic;
  subvalue = character;
  marker = character;
  length = value.length;
  index++;
  queue = '';
  character = '';
  if (pedantic && whitespace(value.charAt(index))) {
    return;
  }
  while (index < length) {
    prev = character;
    character = value.charAt(index);
    if (character === marker && (!pedantic || !whitespace(prev))) {
      character = value.charAt(++index);
      if (character !== marker) {
        if (!trim(queue) || prev === marker) {
          return;
        }
        if (!pedantic && marker === C_UNDERSCORE && word(character)) {
          queue += marker;
          continue;
        }

        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true;
        }
        now = eat.now();
        now.column++;
        now.offset++;
        return eat(subvalue + queue + marker)({
          type: 'emphasis',
          children: self.tokenizeInline(queue, now)
        });
      }
      queue += marker;
    }
    if (!pedantic && character === '\\') {
      queue += character;
      character = value.charAt(++index);
    }
    queue += character;
    index++;
  }
}

/***/ }),

/***/ "DNXe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var decode = __webpack_require__("ZWk2");
var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("DuHW");
module.exports = url;
url.locator = locate;
url.notInLink = true;
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_LT = '<';
var C_AT_SIGN = '@';
var HTTP_PROTOCOL = 'http://';
var HTTPS_PROTOCOL = 'https://';
var MAILTO_PROTOCOL = 'mailto:';
var PROTOCOLS = [HTTP_PROTOCOL, HTTPS_PROTOCOL, MAILTO_PROTOCOL];
var PROTOCOLS_LENGTH = PROTOCOLS.length;
function url(eat, value, silent) {
  var self = this;
  var subvalue;
  var content;
  var character;
  var index;
  var position;
  var protocol;
  var match;
  var length;
  var queue;
  var parenCount;
  var nextCharacter;
  var exit;
  if (!self.options.gfm) {
    return;
  }
  subvalue = '';
  index = -1;
  length = PROTOCOLS_LENGTH;
  while (++index < length) {
    protocol = PROTOCOLS[index];
    match = value.slice(0, protocol.length);
    if (match.toLowerCase() === protocol) {
      subvalue = match;
      break;
    }
  }
  if (!subvalue) {
    return;
  }
  index = subvalue.length;
  length = value.length;
  queue = '';
  parenCount = 0;
  while (index < length) {
    character = value.charAt(index);
    if (whitespace(character) || character === C_LT) {
      break;
    }
    if (character === '.' || character === ',' || character === ':' || character === ';' || character === '"' || character === '\'' || character === ')' || character === ']') {
      nextCharacter = value.charAt(index + 1);
      if (!nextCharacter || whitespace(nextCharacter)) {
        break;
      }
    }
    if (character === C_PAREN_OPEN || character === C_BRACKET_OPEN) {
      parenCount++;
    }
    if (character === C_PAREN_CLOSE || character === C_BRACKET_CLOSE) {
      parenCount--;
      if (parenCount < 0) {
        break;
      }
    }
    queue += character;
    index++;
  }
  if (!queue) {
    return;
  }
  subvalue += queue;
  content = subvalue;
  if (protocol === MAILTO_PROTOCOL) {
    position = queue.indexOf(C_AT_SIGN);
    if (position === -1 || position === length - 1) {
      return;
    }
    content = content.substr(MAILTO_PROTOCOL.length);
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  exit = self.enterLink();
  content = self.tokenizeInline(content, eat.now());
  exit();
  return eat(subvalue)({
    type: 'link',
    title: null,
    url: decode(subvalue, {
      nonTerminated: false
    }),
    children: content
  });
}

/***/ }),

/***/ "DuHW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
var PROTOCOLS = ['https://', 'http://', 'mailto:'];
function locate(value, fromIndex) {
  var length = PROTOCOLS.length;
  var index = -1;
  var min = -1;
  var position;
  if (!this.options.gfm) {
    return -1;
  }
  while (++index < length) {
    position = value.indexOf(PROTOCOLS[index], fromIndex);
    if (position !== -1 && (position < min || min === -1)) {
      min = position;
    }
  }
  return min;
}

/***/ }),

/***/ "EBzq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = [].slice;
module.exports = wrap;

// Wrap `fn`.
// Can be sync or async; return a promise, receive a completion handler, return
// new values and errors.
function wrap(fn, callback) {
  var invoked;
  return wrapped;
  function wrapped() {
    var params = slice.call(arguments, 0);
    var callback = fn.length > params.length;
    var result;
    if (callback) {
      params.push(done);
    }
    try {
      result = fn.apply(null, params);
    } catch (error) {
      // Well, this is quite the pickle.
      // `fn` received a callback and invoked it (thus continuing the pipeline),
      // but later also threw an error.
      // We’re not about to restart the pipeline again, so the only thing left
      // to do is to throw the thing instead.
      if (callback && invoked) {
        throw error;
      }
      return done(error);
    }
    if (!callback) {
      if (result && typeof result.then === 'function') {
        result.then(then, done);
      } else if (result instanceof Error) {
        done(result);
      } else {
        then(result);
      }
    }
  }

  // Invoke `next`, only once.
  function done() {
    if (!invoked) {
      invoked = true;
      callback.apply(null, arguments);
    }
  }

  // Invoke `done` with one value.
  // Tracks if an error is passed, too.
  function then(value) {
    done(null, value);
  }
}

/***/ }),

/***/ "Fhq4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  return value.indexOf('~~', fromIndex);
}

/***/ }),

/***/ "FxOa":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  return value.indexOf('\\', fromIndex);
}

/***/ }),

/***/ "Gdbo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = bail;
function bail(err) {
  if (err) {
    throw err;
  }
}

/***/ }),

/***/ "GyeZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = factory;

/* Factory to de-escape a value, based on a list at `key`
 * in `ctx`. */
function factory(ctx, key) {
  return unescape;

  /* De-escape a string using the expression at `key`
   * in `ctx`. */
  function unescape(value) {
    var prev = 0;
    var index = value.indexOf('\\');
    var escape = ctx[key];
    var queue = [];
    var character;
    while (index !== -1) {
      queue.push(value.slice(prev, index));
      prev = index + 1;
      character = value.charAt(prev);

      /* If the following character is not a valid escape,
       * add the slash. */
      if (!character || escape.indexOf(character) === -1) {
        queue.push('\\');
      }
      index = value.indexOf('\\', prev);
    }
    queue.push(value.slice(prev));
    return queue.join('');
  }
}

/***/ }),

/***/ "IPAr":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = whitespace;
var fromCode = String.fromCharCode;
var re = /\s/;

// Check if the given character code, or the character code at the first
// character, is a whitespace character.
function whitespace(character) {
  return re.test(typeof character === 'number' ? fromCode(character) : character.charAt(0));
}

/***/ }),

/***/ "IRYA":
/***/ (function(module, exports) {

var toString = Object.prototype.toString;
module.exports = isString;
function isString(obj) {
  return toString.call(obj) === "[object String]";
}

/***/ }),

/***/ "IoeE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getDefinitions(node) {
  var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return (node.children || []).reduce(function (definitions, child) {
    if (child.type === 'definition') {
      definitions[child.identifier] = {
        href: child.url,
        title: child.title
      };
    }
    return getDefinitions(child, definitions);
  }, defs);
};

/***/ }),

/***/ "IujW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
var xtend = __webpack_require__("U6jy");
var unified = __webpack_require__("1VtT");
var parse = __webpack_require__("v0oL");
var PropTypes = __webpack_require__("17x9");
var addListMetadata = __webpack_require__("wnOJ");
var naiveHtml = __webpack_require__("cVWj");
var disallowNode = __webpack_require__("u3i/");
var astToReact = __webpack_require__("UV+P");
var wrapTableRows = __webpack_require__("9Z5P");
var getDefinitions = __webpack_require__("IoeE");
var uriTransformer = __webpack_require__("Nw8X");
var defaultRenderers = __webpack_require__("3m36");
var symbols = __webpack_require__("h9ck");
var allTypes = Object.keys(defaultRenderers);
var ReactMarkdown = function ReactMarkdown(props) {
  var src = props.source || props.children || '';
  var parserOptions = props.parserOptions;
  if (props.allowedTypes && props.disallowedTypes) {
    throw new Error('Only one of `allowedTypes` and `disallowedTypes` should be defined');
  }
  var renderers = xtend(defaultRenderers, props.renderers);
  var plugins = [[parse, parserOptions]].concat(props.plugins || []);
  var parser = plugins.reduce(applyParserPlugin, unified());
  var rawAst = parser.parse(src);
  var renderProps = xtend(props, {
    renderers: renderers,
    definitions: getDefinitions(rawAst)
  });
  var astPlugins = determineAstPlugins(props); // eslint-disable-next-line no-sync

  var transformedAst = parser.runSync(rawAst);
  var ast = astPlugins.reduce(function (node, plugin) {
    return plugin(node, renderProps);
  }, transformedAst);
  return astToReact(ast, renderProps);
};
function applyParserPlugin(parser, plugin) {
  return Array.isArray(plugin) ? parser.use.apply(parser, _toConsumableArray(plugin)) : parser.use(plugin);
}
function determineAstPlugins(props) {
  var plugins = [wrapTableRows, addListMetadata()];
  var disallowedTypes = props.disallowedTypes;
  if (props.allowedTypes) {
    disallowedTypes = allTypes.filter(function (type) {
      return type !== 'root' && props.allowedTypes.indexOf(type) === -1;
    });
  }
  var removalMethod = props.unwrapDisallowed ? 'unwrap' : 'remove';
  if (disallowedTypes && disallowedTypes.length > 0) {
    plugins.push(disallowNode.ofType(disallowedTypes, removalMethod));
  }
  if (props.allowNode) {
    plugins.push(disallowNode.ifNotMatch(props.allowNode, removalMethod));
  }
  var renderHtml = !props.escapeHtml && !props.skipHtml;
  var hasHtmlParser = (props.astPlugins || []).some(function (item) {
    var plugin = Array.isArray(item) ? item[0] : item;
    return plugin.identity === symbols.HtmlParser;
  });
  if (renderHtml && !hasHtmlParser) {
    plugins.push(naiveHtml);
  }
  return props.astPlugins ? plugins.concat(props.astPlugins) : plugins;
}
ReactMarkdown.defaultProps = {
  renderers: {},
  escapeHtml: true,
  skipHtml: false,
  sourcePos: false,
  rawSourcePos: false,
  transformLinkUri: uriTransformer,
  astPlugins: [],
  plugins: [],
  parserOptions: {}
};
ReactMarkdown.propTypes = {
  className: PropTypes.string,
  source: PropTypes.string,
  children: PropTypes.string,
  sourcePos: PropTypes.bool,
  rawSourcePos: PropTypes.bool,
  escapeHtml: PropTypes.bool,
  skipHtml: PropTypes.bool,
  allowNode: PropTypes.func,
  allowedTypes: PropTypes.arrayOf(PropTypes.oneOf(allTypes)),
  disallowedTypes: PropTypes.arrayOf(PropTypes.oneOf(allTypes)),
  transformLinkUri: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  linkTarget: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  transformImageUri: PropTypes.func,
  astPlugins: PropTypes.arrayOf(PropTypes.func),
  unwrapDisallowed: PropTypes.bool,
  renderers: PropTypes.object,
  plugins: PropTypes.array,
  parserOptions: PropTypes.object
};
ReactMarkdown.types = allTypes;
ReactMarkdown.renderers = defaultRenderers;
ReactMarkdown.uriTransformer = uriTransformer;
module.exports = ReactMarkdown;

/***/ }),

/***/ "J5yW":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabetical = __webpack_require__("1iAE");
var decimal = __webpack_require__("ZONP");
module.exports = alphanumerical;

// Check if the given character code, or the character code at the first
// character, is alphanumerical.
function alphanumerical(character) {
  return alphabetical(character) || decimal(character);
}

/***/ }),

/***/ "JWB8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__("U6jy");
var toggle = __webpack_require__("4MqD");
var vfileLocation = __webpack_require__("7nPM");
var unescape = __webpack_require__("GyeZ");
var decode = __webpack_require__("1db3");
var tokenizer = __webpack_require__("22pC");
module.exports = Parser;
function Parser(doc, file) {
  this.file = file;
  this.offset = {};
  this.options = xtend(this.options);
  this.setOptions({});
  this.inList = false;
  this.inBlock = false;
  this.inLink = false;
  this.atStart = true;
  this.toOffset = vfileLocation(file).toOffset;
  this.unescape = unescape(this, 'escape');
  this.decode = decode(this);
}
var proto = Parser.prototype;

/* Expose core. */
proto.setOptions = __webpack_require__("qUik");
proto.parse = __webpack_require__("7MxR");

/* Expose `defaults`. */
proto.options = __webpack_require__("3+Nb");

/* Enter and exit helpers. */
proto.exitStart = toggle('atStart', true);
proto.enterList = toggle('inList', false);
proto.enterLink = toggle('inLink', false);
proto.enterBlock = toggle('inBlock', false);

/* Nodes that can interupt a paragraph:
 *
 * ```markdown
 * A paragraph, followed by a thematic break.
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the paragraph. */
proto.interruptParagraph = [['thematicBreak'], ['atxHeading'], ['fencedCode'], ['blockquote'], ['html'], ['setextHeading', {
  commonmark: false
}], ['definition', {
  commonmark: false
}], ['footnote', {
  commonmark: false
}]];

/* Nodes that can interupt a list:
 *
 * ```markdown
 * - One
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the list. */
proto.interruptList = [['atxHeading', {
  pedantic: false
}], ['fencedCode', {
  pedantic: false
}], ['thematicBreak', {
  pedantic: false
}], ['definition', {
  commonmark: false
}], ['footnote', {
  commonmark: false
}]];

/* Nodes that can interupt a blockquote:
 *
 * ```markdown
 * > A paragraph.
 * ___
 * ```
 *
 * In the above example, the thematic break “interupts”
 * the blockquote. */
proto.interruptBlockquote = [['indentedCode', {
  commonmark: true
}], ['fencedCode', {
  commonmark: true
}], ['atxHeading', {
  commonmark: true
}], ['setextHeading', {
  commonmark: true
}], ['thematicBreak', {
  commonmark: true
}], ['html', {
  commonmark: true
}], ['list', {
  commonmark: true
}], ['definition', {
  commonmark: false
}], ['footnote', {
  commonmark: false
}]];

/* Handlers. */
proto.blockTokenizers = {
  newline: __webpack_require__("akNn"),
  indentedCode: __webpack_require__("kmJ7"),
  fencedCode: __webpack_require__("Syd7"),
  blockquote: __webpack_require__("soWj"),
  atxHeading: __webpack_require__("kDuX"),
  thematicBreak: __webpack_require__("rUY8"),
  list: __webpack_require__("Nx7O"),
  setextHeading: __webpack_require__("lebq"),
  html: __webpack_require__("tvOo"),
  footnote: __webpack_require__("62+j"),
  definition: __webpack_require__("uuyv"),
  table: __webpack_require__("2a+b"),
  paragraph: __webpack_require__("NiDC")
};
proto.inlineTokenizers = {
  escape: __webpack_require__("mcUT"),
  autoLink: __webpack_require__("Sce3"),
  url: __webpack_require__("DNXe"),
  html: __webpack_require__("g1k0"),
  link: __webpack_require__("MNGI"),
  reference: __webpack_require__("c6LQ"),
  strong: __webpack_require__("qPMR"),
  emphasis: __webpack_require__("DCCt"),
  deletion: __webpack_require__("egI8"),
  code: __webpack_require__("cFAA"),
  break: __webpack_require__("lgF9"),
  text: __webpack_require__("5T4m")
};

/* Expose precedence. */
proto.blockMethods = keys(proto.blockTokenizers);
proto.inlineMethods = keys(proto.inlineTokenizers);

/* Tokenizers. */
proto.tokenizeBlock = tokenizer('block');
proto.tokenizeInline = tokenizer('inline');
proto.tokenizeFactory = tokenizer;

/* Get all keys in `value`. */
function keys(value) {
  var result = [];
  var key;
  for (key in value) {
    result.push(key);
  }
  return result;
}

/***/ }),

/***/ "JqBK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = collapse;

// `collapse(' \t\nbar \nbaz\t') // ' bar baz '`
function collapse(value) {
  return String(value).replace(/\s+/g, ' ');
}

/***/ }),

/***/ "MNGI":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("ACGk");
module.exports = link;
link.locator = locate;
var own = {}.hasOwnProperty;
var C_BACKSLASH = '\\';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_LT = '<';
var C_GT = '>';
var C_TICK = '`';
var C_DOUBLE_QUOTE = '"';
var C_SINGLE_QUOTE = '\'';

/* Map of characters, which can be used to mark link
 * and image titles. */
var LINK_MARKERS = {};
LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;

/* Map of characters, which can be used to mark link
 * and image titles in commonmark-mode. */
var COMMONMARK_LINK_MARKERS = {};
COMMONMARK_LINK_MARKERS[C_DOUBLE_QUOTE] = C_DOUBLE_QUOTE;
COMMONMARK_LINK_MARKERS[C_SINGLE_QUOTE] = C_SINGLE_QUOTE;
COMMONMARK_LINK_MARKERS[C_PAREN_OPEN] = C_PAREN_CLOSE;
function link(eat, value, silent) {
  var self = this;
  var subvalue = '';
  var index = 0;
  var character = value.charAt(0);
  var pedantic = self.options.pedantic;
  var commonmark = self.options.commonmark;
  var gfm = self.options.gfm;
  var closed;
  var count;
  var opening;
  var beforeURL;
  var beforeTitle;
  var subqueue;
  var hasMarker;
  var markers;
  var isImage;
  var content;
  var marker;
  var length;
  var title;
  var depth;
  var queue;
  var url;
  var now;
  var exit;
  var node;

  /* Detect whether this is an image. */
  if (character === '!') {
    isImage = true;
    subvalue = character;
    character = value.charAt(++index);
  }

  /* Eat the opening. */
  if (character !== C_BRACKET_OPEN) {
    return;
  }

  /* Exit when this is a link and we’re already inside
   * a link. */
  if (!isImage && self.inLink) {
    return;
  }
  subvalue += character;
  queue = '';
  index++;

  /* Eat the content. */
  length = value.length;
  now = eat.now();
  depth = 0;
  now.column += index;
  now.offset += index;
  while (index < length) {
    character = value.charAt(index);
    subqueue = character;
    if (character === C_TICK) {
      /* Inline-code in link content. */
      count = 1;
      while (value.charAt(index + 1) === C_TICK) {
        subqueue += character;
        index++;
        count++;
      }
      if (!opening) {
        opening = count;
      } else if (count >= opening) {
        opening = 0;
      }
    } else if (character === C_BACKSLASH) {
      /* Allow brackets to be escaped. */
      index++;
      subqueue += value.charAt(index);
      /* In GFM mode, brackets in code still count.
       * In all other modes, they don’t.  This empty
       * block prevents the next statements are
       * entered. */
    } else if ((!opening || gfm) && character === C_BRACKET_OPEN) {
      depth++;
    } else if ((!opening || gfm) && character === C_BRACKET_CLOSE) {
      if (depth) {
        depth--;
      } else {
        /* Allow white-space between content and
         * url in GFM mode. */
        if (!pedantic) {
          while (index < length) {
            character = value.charAt(index + 1);
            if (!whitespace(character)) {
              break;
            }
            subqueue += character;
            index++;
          }
        }
        if (value.charAt(index + 1) !== C_PAREN_OPEN) {
          return;
        }
        subqueue += C_PAREN_OPEN;
        closed = true;
        index++;
        break;
      }
    }
    queue += subqueue;
    subqueue = '';
    index++;
  }

  /* Eat the content closing. */
  if (!closed) {
    return;
  }
  content = queue;
  subvalue += queue + subqueue;
  index++;

  /* Eat white-space. */
  while (index < length) {
    character = value.charAt(index);
    if (!whitespace(character)) {
      break;
    }
    subvalue += character;
    index++;
  }

  /* Eat the URL. */
  character = value.charAt(index);
  markers = commonmark ? COMMONMARK_LINK_MARKERS : LINK_MARKERS;
  queue = '';
  beforeURL = subvalue;
  if (character === C_LT) {
    index++;
    beforeURL += C_LT;
    while (index < length) {
      character = value.charAt(index);
      if (character === C_GT) {
        break;
      }
      if (commonmark && character === '\n') {
        return;
      }
      queue += character;
      index++;
    }
    if (value.charAt(index) !== C_GT) {
      return;
    }
    subvalue += C_LT + queue + C_GT;
    url = queue;
    index++;
  } else {
    character = null;
    subqueue = '';
    while (index < length) {
      character = value.charAt(index);
      if (subqueue && own.call(markers, character)) {
        break;
      }
      if (whitespace(character)) {
        if (!pedantic) {
          break;
        }
        subqueue += character;
      } else {
        if (character === C_PAREN_OPEN) {
          depth++;
        } else if (character === C_PAREN_CLOSE) {
          if (depth === 0) {
            break;
          }
          depth--;
        }
        queue += subqueue;
        subqueue = '';
        if (character === C_BACKSLASH) {
          queue += C_BACKSLASH;
          character = value.charAt(++index);
        }
        queue += character;
      }
      index++;
    }
    subvalue += queue;
    url = queue;
    index = subvalue.length;
  }

  /* Eat white-space. */
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (!whitespace(character)) {
      break;
    }
    queue += character;
    index++;
  }
  character = value.charAt(index);
  subvalue += queue;

  /* Eat the title. */
  if (queue && own.call(markers, character)) {
    index++;
    subvalue += character;
    queue = '';
    marker = markers[character];
    beforeTitle = subvalue;

    /* In commonmark-mode, things are pretty easy: the
     * marker cannot occur inside the title.
     *
     * Non-commonmark does, however, support nested
     * delimiters. */
    if (commonmark) {
      while (index < length) {
        character = value.charAt(index);
        if (character === marker) {
          break;
        }
        if (character === C_BACKSLASH) {
          queue += C_BACKSLASH;
          character = value.charAt(++index);
        }
        index++;
        queue += character;
      }
      character = value.charAt(index);
      if (character !== marker) {
        return;
      }
      title = queue;
      subvalue += queue + character;
      index++;
      while (index < length) {
        character = value.charAt(index);
        if (!whitespace(character)) {
          break;
        }
        subvalue += character;
        index++;
      }
    } else {
      subqueue = '';
      while (index < length) {
        character = value.charAt(index);
        if (character === marker) {
          if (hasMarker) {
            queue += marker + subqueue;
            subqueue = '';
          }
          hasMarker = true;
        } else if (!hasMarker) {
          queue += character;
        } else if (character === C_PAREN_CLOSE) {
          subvalue += queue + marker + subqueue;
          title = queue;
          break;
        } else if (whitespace(character)) {
          subqueue += character;
        } else {
          queue += marker + subqueue + character;
          subqueue = '';
          hasMarker = false;
        }
        index++;
      }
    }
  }
  if (value.charAt(index) !== C_PAREN_CLOSE) {
    return;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  subvalue += C_PAREN_CLOSE;
  url = self.decode.raw(self.unescape(url), eat(beforeURL).test().end, {
    nonTerminated: false
  });
  if (title) {
    beforeTitle = eat(beforeTitle).test().end;
    title = self.decode.raw(self.unescape(title), beforeTitle);
  }
  node = {
    type: isImage ? 'image' : 'link',
    title: title || null,
    url: url
  };
  if (isImage) {
    node.alt = self.decode.raw(self.unescape(content), now) || null;
  } else {
    exit = self.enterLink();
    node.children = self.tokenizeInline(content, now);
    exit();
  }
  return eat(subvalue)(node);
}

/***/ }),

/***/ "MQ5/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = escapes;
var defaults = ['\\', '`', '*', '{', '}', '[', ']', '(', ')', '#', '+', '-', '.', '!', '_', '>'];
var gfm = defaults.concat(['~', '|']);
var commonmark = gfm.concat(['\n', '"', '$', '%', '&', "'", ',', '/', ':', ';', '<', '=', '?', '@', '^']);
escapes.default = defaults;
escapes.gfm = gfm;
escapes.commonmark = commonmark;

// Get markdown escapes.
function escapes(options) {
  var settings = options || {};
  if (settings.commonmark) {
    return commonmark;
  }
  return settings.gfm ? gfm : defaults;
}

/***/ }),

/***/ "NBu1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  return value.indexOf('<', fromIndex);
}

/***/ }),

/***/ "NiDC":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("RsFJ");
var decimal = __webpack_require__("ZONP");
var trimTrailingLines = __webpack_require__("3GlI");
var interrupt = __webpack_require__("cmLN");
module.exports = paragraph;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var TAB_SIZE = 4;

/* Tokenise paragraph. */
function paragraph(eat, value, silent) {
  var self = this;
  var settings = self.options;
  var commonmark = settings.commonmark;
  var gfm = settings.gfm;
  var tokenizers = self.blockTokenizers;
  var interruptors = self.interruptParagraph;
  var index = value.indexOf(C_NEWLINE);
  var length = value.length;
  var position;
  var subvalue;
  var character;
  var size;
  var now;
  while (index < length) {
    /* Eat everything if there’s no following newline. */
    if (index === -1) {
      index = length;
      break;
    }

    /* Stop if the next character is NEWLINE. */
    if (value.charAt(index + 1) === C_NEWLINE) {
      break;
    }

    /* In commonmark-mode, following indented lines
     * are part of the paragraph. */
    if (commonmark) {
      size = 0;
      position = index + 1;
      while (position < length) {
        character = value.charAt(position);
        if (character === C_TAB) {
          size = TAB_SIZE;
          break;
        } else if (character === C_SPACE) {
          size++;
        } else {
          break;
        }
        position++;
      }
      if (size >= TAB_SIZE) {
        index = value.indexOf(C_NEWLINE, index + 1);
        continue;
      }
    }
    subvalue = value.slice(index + 1);

    /* Check if the following code contains a possible
     * block. */
    if (interrupt(interruptors, tokenizers, self, [eat, subvalue, true])) {
      break;
    }

    /* Break if the following line starts a list, when
     * already in a list, or when in commonmark, or when
     * in gfm mode and the bullet is *not* numeric. */
    if (tokenizers.list.call(self, eat, subvalue, true) && (self.inList || commonmark || gfm && !decimal(trim.left(subvalue).charAt(0)))) {
      break;
    }
    position = index;
    index = value.indexOf(C_NEWLINE, index + 1);
    if (index !== -1 && trim(value.slice(position, index)) === '') {
      index = position;
      break;
    }
  }
  subvalue = value.slice(0, index);
  if (trim(subvalue) === '') {
    eat(subvalue);
    return null;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  now = eat.now();
  subvalue = trimTrailingLines(subvalue);
  return eat(subvalue)({
    type: 'paragraph',
    children: self.tokenizeInline(subvalue, now)
  });
}

/***/ }),

/***/ "NkL+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toString = Object.prototype.toString;
module.exports = function (x) {
  var prototype;
  return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};

/***/ }),

/***/ "Nw8X":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var protocols = ['http', 'https', 'mailto', 'tel'];
module.exports = function uriTransformer(uri) {
  var url = (uri || '').trim();
  var first = url.charAt(0);
  if (first === '#' || first === '/') {
    return url;
  }
  var colon = url.indexOf(':');
  if (colon === -1) {
    return url;
  }
  var length = protocols.length;
  var index = -1;
  while (++index < length) {
    var protocol = protocols[index];
    if (colon === protocol.length && url.slice(0, protocol.length).toLowerCase() === protocol) {
      return url;
    }
  }
  index = url.indexOf('?');
  if (index !== -1 && colon > index) {
    return url;
  }
  index = url.indexOf('#');
  if (index !== -1 && colon > index) {
    return url;
  } // eslint-disable-next-line no-script-url

  return 'javascript:void(0)';
};

/***/ }),

/***/ "Nx7O":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable max-params */
var trim = __webpack_require__("RsFJ");
var repeat = __webpack_require__("RjOF");
var decimal = __webpack_require__("ZONP");
var getIndent = __webpack_require__("vPdy");
var removeIndent = __webpack_require__("vvrU");
var interrupt = __webpack_require__("cmLN");
module.exports = list;
var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
var C_PLUS = '+';
var C_DASH = '-';
var C_DOT = '.';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_PAREN_CLOSE = ')';
var C_X_LOWER = 'x';
var TAB_SIZE = 4;
var EXPRESSION_LOOSE_LIST_ITEM = /\n\n(?!\s*$)/;
var EXPRESSION_TASK_ITEM = /^\[([ \t]|x|X)][ \t]/;
var EXPRESSION_BULLET = /^([ \t]*)([*+-]|\d+[.)])( {1,4}(?! )| |\t|$|(?=\n))([^\n]*)/;
var EXPRESSION_PEDANTIC_BULLET = /^([ \t]*)([*+-]|\d+[.)])([ \t]+)/;
var EXPRESSION_INITIAL_INDENT = /^( {1,4}|\t)?/gm;

/* Map of characters which can be used to mark
 * list-items. */
var LIST_UNORDERED_MARKERS = {};
LIST_UNORDERED_MARKERS[C_ASTERISK] = true;
LIST_UNORDERED_MARKERS[C_PLUS] = true;
LIST_UNORDERED_MARKERS[C_DASH] = true;

/* Map of characters which can be used to mark
 * list-items after a digit. */
var LIST_ORDERED_MARKERS = {};
LIST_ORDERED_MARKERS[C_DOT] = true;

/* Map of characters which can be used to mark
 * list-items after a digit. */
var LIST_ORDERED_COMMONMARK_MARKERS = {};
LIST_ORDERED_COMMONMARK_MARKERS[C_DOT] = true;
LIST_ORDERED_COMMONMARK_MARKERS[C_PAREN_CLOSE] = true;
function list(eat, value, silent) {
  var self = this;
  var commonmark = self.options.commonmark;
  var pedantic = self.options.pedantic;
  var tokenizers = self.blockTokenizers;
  var interuptors = self.interruptList;
  var markers;
  var index = 0;
  var length = value.length;
  var start = null;
  var size = 0;
  var queue;
  var ordered;
  var character;
  var marker;
  var nextIndex;
  var startIndex;
  var prefixed;
  var currentMarker;
  var content;
  var line;
  var prevEmpty;
  var empty;
  var items;
  var allLines;
  var emptyLines;
  var item;
  var enterTop;
  var exitBlockquote;
  var isLoose;
  var node;
  var now;
  var end;
  var indented;
  while (index < length) {
    character = value.charAt(index);
    if (character === C_TAB) {
      size += TAB_SIZE - size % TAB_SIZE;
    } else if (character === C_SPACE) {
      size++;
    } else {
      break;
    }
    index++;
  }
  if (size >= TAB_SIZE) {
    return;
  }
  character = value.charAt(index);
  markers = commonmark ? LIST_ORDERED_COMMONMARK_MARKERS : LIST_ORDERED_MARKERS;
  if (LIST_UNORDERED_MARKERS[character] === true) {
    marker = character;
    ordered = false;
  } else {
    ordered = true;
    queue = '';
    while (index < length) {
      character = value.charAt(index);
      if (!decimal(character)) {
        break;
      }
      queue += character;
      index++;
    }
    character = value.charAt(index);
    if (!queue || markers[character] !== true) {
      return;
    }
    start = parseInt(queue, 10);
    marker = character;
  }
  character = value.charAt(++index);
  if (character !== C_SPACE && character !== C_TAB) {
    return;
  }
  if (silent) {
    return true;
  }
  index = 0;
  items = [];
  allLines = [];
  emptyLines = [];
  while (index < length) {
    nextIndex = value.indexOf(C_NEWLINE, index);
    startIndex = index;
    prefixed = false;
    indented = false;
    if (nextIndex === -1) {
      nextIndex = length;
    }
    end = index + TAB_SIZE;
    size = 0;
    while (index < length) {
      character = value.charAt(index);
      if (character === C_TAB) {
        size += TAB_SIZE - size % TAB_SIZE;
      } else if (character === C_SPACE) {
        size++;
      } else {
        break;
      }
      index++;
    }
    if (size >= TAB_SIZE) {
      indented = true;
    }
    if (item && size >= item.indent) {
      indented = true;
    }
    character = value.charAt(index);
    currentMarker = null;
    if (!indented) {
      if (LIST_UNORDERED_MARKERS[character] === true) {
        currentMarker = character;
        index++;
        size++;
      } else {
        queue = '';
        while (index < length) {
          character = value.charAt(index);
          if (!decimal(character)) {
            break;
          }
          queue += character;
          index++;
        }
        character = value.charAt(index);
        index++;
        if (queue && markers[character] === true) {
          currentMarker = character;
          size += queue.length + 1;
        }
      }
      if (currentMarker) {
        character = value.charAt(index);
        if (character === C_TAB) {
          size += TAB_SIZE - size % TAB_SIZE;
          index++;
        } else if (character === C_SPACE) {
          end = index + TAB_SIZE;
          while (index < end) {
            if (value.charAt(index) !== C_SPACE) {
              break;
            }
            index++;
            size++;
          }
          if (index === end && value.charAt(index) === C_SPACE) {
            index -= TAB_SIZE - 1;
            size -= TAB_SIZE - 1;
          }
        } else if (character !== C_NEWLINE && character !== '') {
          currentMarker = null;
        }
      }
    }
    if (currentMarker) {
      if (!pedantic && marker !== currentMarker) {
        break;
      }
      prefixed = true;
    } else {
      if (!commonmark && !indented && value.charAt(startIndex) === C_SPACE) {
        indented = true;
      } else if (commonmark && item) {
        indented = size >= item.indent || size > TAB_SIZE;
      }
      prefixed = false;
      index = startIndex;
    }
    line = value.slice(startIndex, nextIndex);
    content = startIndex === index ? line : value.slice(index, nextIndex);
    if (currentMarker === C_ASTERISK || currentMarker === C_UNDERSCORE || currentMarker === C_DASH) {
      if (tokenizers.thematicBreak.call(self, eat, line, true)) {
        break;
      }
    }
    prevEmpty = empty;
    empty = !trim(content).length;
    if (indented && item) {
      item.value = item.value.concat(emptyLines, line);
      allLines = allLines.concat(emptyLines, line);
      emptyLines = [];
    } else if (prefixed) {
      if (emptyLines.length !== 0) {
        item.value.push('');
        item.trail = emptyLines.concat();
      }
      item = {
        value: [line],
        indent: size,
        trail: []
      };
      items.push(item);
      allLines = allLines.concat(emptyLines, line);
      emptyLines = [];
    } else if (empty) {
      if (prevEmpty) {
        break;
      }
      emptyLines.push(line);
    } else {
      if (prevEmpty) {
        break;
      }
      if (interrupt(interuptors, tokenizers, self, [eat, line, true])) {
        break;
      }
      item.value = item.value.concat(emptyLines, line);
      allLines = allLines.concat(emptyLines, line);
      emptyLines = [];
    }
    index = nextIndex + 1;
  }
  node = eat(allLines.join(C_NEWLINE)).reset({
    type: 'list',
    ordered: ordered,
    start: start,
    loose: null,
    children: []
  });
  enterTop = self.enterList();
  exitBlockquote = self.enterBlock();
  isLoose = false;
  index = -1;
  length = items.length;
  while (++index < length) {
    item = items[index].value.join(C_NEWLINE);
    now = eat.now();
    item = eat(item)(listItem(self, item, now), node);
    if (item.loose) {
      isLoose = true;
    }
    item = items[index].trail.join(C_NEWLINE);
    if (index !== length - 1) {
      item += C_NEWLINE;
    }
    eat(item);
  }
  enterTop();
  exitBlockquote();
  node.loose = isLoose;
  return node;
}
function listItem(ctx, value, position) {
  var offsets = ctx.offset;
  var fn = ctx.options.pedantic ? pedanticListItem : normalListItem;
  var checked = null;
  var task;
  var indent;
  value = fn.apply(null, arguments);
  if (ctx.options.gfm) {
    task = value.match(EXPRESSION_TASK_ITEM);
    if (task) {
      indent = task[0].length;
      checked = task[1].toLowerCase() === C_X_LOWER;
      offsets[position.line] += indent;
      value = value.slice(indent);
    }
  }
  return {
    type: 'listItem',
    loose: EXPRESSION_LOOSE_LIST_ITEM.test(value) || value.charAt(value.length - 1) === C_NEWLINE,
    checked: checked,
    children: ctx.tokenizeBlock(value, position)
  };
}

/* Create a list-item using overly simple mechanics. */
function pedanticListItem(ctx, value, position) {
  var offsets = ctx.offset;
  var line = position.line;

  /* Remove the list-item’s bullet. */
  value = value.replace(EXPRESSION_PEDANTIC_BULLET, replacer);

  /* The initial line was also matched by the below, so
   * we reset the `line`. */
  line = position.line;
  return value.replace(EXPRESSION_INITIAL_INDENT, replacer);

  /* A simple replacer which removed all matches,
   * and adds their length to `offset`. */
  function replacer($0) {
    offsets[line] = (offsets[line] || 0) + $0.length;
    line++;
    return '';
  }
}

/* Create a list-item using sane mechanics. */
function normalListItem(ctx, value, position) {
  var offsets = ctx.offset;
  var line = position.line;
  var max;
  var bullet;
  var rest;
  var lines;
  var trimmedLines;
  var index;
  var length;

  /* Remove the list-item’s bullet. */
  value = value.replace(EXPRESSION_BULLET, replacer);
  lines = value.split(C_NEWLINE);
  trimmedLines = removeIndent(value, getIndent(max).indent).split(C_NEWLINE);

  /* We replaced the initial bullet with something
   * else above, which was used to trick
   * `removeIndentation` into removing some more
   * characters when possible.  However, that could
   * result in the initial line to be stripped more
   * than it should be. */
  trimmedLines[0] = rest;
  offsets[line] = (offsets[line] || 0) + bullet.length;
  line++;
  index = 0;
  length = lines.length;
  while (++index < length) {
    offsets[line] = (offsets[line] || 0) + lines[index].length - trimmedLines[index].length;
    line++;
  }
  return trimmedLines.join(C_NEWLINE);
  function replacer($0, $1, $2, $3, $4) {
    bullet = $1 + $2 + $3;
    rest = $4;

    /* Make sure that the first nine numbered list items
     * can indent with an extra space.  That is, when
     * the bullet did not receive an extra final space. */
    if (Number($2) < 10 && bullet.length % 2 === 1) {
      $2 = C_SPACE + $2;
    }
    max = $1 + repeat(C_SPACE, $2.length) + $3;
    return max + rest;
  }
}

/***/ }),

/***/ "P7XM":
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor;
      var TempCtor = function () {};
      TempCtor.prototype = superCtor.prototype;
      ctor.prototype = new TempCtor();
      ctor.prototype.constructor = ctor;
    }
  };
}

/***/ }),

/***/ "RjOF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */
var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;
  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }
  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }
    num >>= 1;
    str += str;
  }
  res += str;
  res = res.substr(0, max);
  return res;
}

/***/ }),

/***/ "RsFJ":
/***/ (function(module, exports) {

exports = module.exports = trim;
function trim(str) {
  return str.replace(/^\s*|\s*$/g, '');
}
exports.left = function (str) {
  return str.replace(/^\s*/, '');
};
exports.right = function (str) {
  return str.replace(/\s*$/, '');
};

/***/ }),

/***/ "Sce3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var decode = __webpack_require__("ZWk2");
var locate = __webpack_require__("NBu1");
module.exports = autoLink;
autoLink.locator = locate;
autoLink.notInLink = true;
var C_LT = '<';
var C_GT = '>';
var C_AT_SIGN = '@';
var C_SLASH = '/';
var MAILTO = 'mailto:';
var MAILTO_LENGTH = MAILTO.length;

/* Tokenise a link. */
function autoLink(eat, value, silent) {
  var self;
  var subvalue;
  var length;
  var index;
  var queue;
  var character;
  var hasAtCharacter;
  var link;
  var now;
  var content;
  var tokenizers;
  var exit;
  if (value.charAt(0) !== C_LT) {
    return;
  }
  self = this;
  subvalue = '';
  length = value.length;
  index = 0;
  queue = '';
  hasAtCharacter = false;
  link = '';
  index++;
  subvalue = C_LT;
  while (index < length) {
    character = value.charAt(index);
    if (whitespace(character) || character === C_GT || character === C_AT_SIGN || character === ':' && value.charAt(index + 1) === C_SLASH) {
      break;
    }
    queue += character;
    index++;
  }
  if (!queue) {
    return;
  }
  link += queue;
  queue = '';
  character = value.charAt(index);
  link += character;
  index++;
  if (character === C_AT_SIGN) {
    hasAtCharacter = true;
  } else {
    if (character !== ':' || value.charAt(index + 1) !== C_SLASH) {
      return;
    }
    link += C_SLASH;
    index++;
  }
  while (index < length) {
    character = value.charAt(index);
    if (whitespace(character) || character === C_GT) {
      break;
    }
    queue += character;
    index++;
  }
  character = value.charAt(index);
  if (!queue || character !== C_GT) {
    return;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  link += queue;
  content = link;
  subvalue += link + character;
  now = eat.now();
  now.column++;
  now.offset++;
  if (hasAtCharacter) {
    if (link.slice(0, MAILTO_LENGTH).toLowerCase() === MAILTO) {
      content = content.substr(MAILTO_LENGTH);
      now.column += MAILTO_LENGTH;
      now.offset += MAILTO_LENGTH;
    } else {
      link = MAILTO + link;
    }
  }

  /* Temporarily remove all tokenizers except text in autolinks. */
  tokenizers = self.inlineTokenizers;
  self.inlineTokenizers = {
    text: tokenizers.text
  };
  exit = self.enterLink();
  content = self.tokenizeInline(content, now);
  self.inlineTokenizers = tokenizers;
  exit();
  return eat(subvalue)({
    type: 'link',
    title: null,
    url: decode(link, {
      nonTerminated: false
    }),
    children: content
  });
}

/***/ }),

/***/ "Syd7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("3GlI");
module.exports = fencedCode;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_TILDE = '~';
var C_TICK = '`';
var MIN_FENCE_COUNT = 3;
var CODE_INDENT_COUNT = 4;
function fencedCode(eat, value, silent) {
  var self = this;
  var settings = self.options;
  var length = value.length + 1;
  var index = 0;
  var subvalue = '';
  var fenceCount;
  var marker;
  var character;
  var flag;
  var queue;
  var content;
  var exdentedContent;
  var closing;
  var exdentedClosing;
  var indent;
  var now;
  if (!settings.gfm) {
    return;
  }

  /* Eat initial spacing. */
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      break;
    }
    subvalue += character;
    index++;
  }
  indent = index;

  /* Eat the fence. */
  character = value.charAt(index);
  if (character !== C_TILDE && character !== C_TICK) {
    return;
  }
  index++;
  marker = character;
  fenceCount = 1;
  subvalue += character;
  while (index < length) {
    character = value.charAt(index);
    if (character !== marker) {
      break;
    }
    subvalue += character;
    fenceCount++;
    index++;
  }
  if (fenceCount < MIN_FENCE_COUNT) {
    return;
  }

  /* Eat spacing before flag. */
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      break;
    }
    subvalue += character;
    index++;
  }

  /* Eat flag. */
  flag = '';
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character === C_NEWLINE || character === C_TILDE || character === C_TICK) {
      break;
    }
    if (character === C_SPACE || character === C_TAB) {
      queue += character;
    } else {
      flag += queue + character;
      queue = '';
    }
    index++;
  }
  character = value.charAt(index);
  if (character && character !== C_NEWLINE) {
    return;
  }
  if (silent) {
    return true;
  }
  now = eat.now();
  now.column += subvalue.length;
  now.offset += subvalue.length;
  subvalue += flag;
  flag = self.decode.raw(self.unescape(flag), now);
  if (queue) {
    subvalue += queue;
  }
  queue = '';
  closing = '';
  exdentedClosing = '';
  content = '';
  exdentedContent = '';

  /* Eat content. */
  while (index < length) {
    character = value.charAt(index);
    content += closing;
    exdentedContent += exdentedClosing;
    closing = '';
    exdentedClosing = '';
    if (character !== C_NEWLINE) {
      content += character;
      exdentedClosing += character;
      index++;
      continue;
    }

    /* Add the newline to `subvalue` if its the first
     * character.  Otherwise, add it to the `closing`
     * queue. */
    if (content) {
      closing += character;
      exdentedClosing += character;
    } else {
      subvalue += character;
    }
    queue = '';
    index++;
    while (index < length) {
      character = value.charAt(index);
      if (character !== C_SPACE) {
        break;
      }
      queue += character;
      index++;
    }
    closing += queue;
    exdentedClosing += queue.slice(indent);
    if (queue.length >= CODE_INDENT_COUNT) {
      continue;
    }
    queue = '';
    while (index < length) {
      character = value.charAt(index);
      if (character !== marker) {
        break;
      }
      queue += character;
      index++;
    }
    closing += queue;
    exdentedClosing += queue;
    if (queue.length < fenceCount) {
      continue;
    }
    queue = '';
    while (index < length) {
      character = value.charAt(index);
      if (character !== C_SPACE && character !== C_TAB) {
        break;
      }
      closing += character;
      exdentedClosing += character;
      index++;
    }
    if (!character || character === C_NEWLINE) {
      break;
    }
  }
  subvalue += content + closing;
  return eat(subvalue)({
    type: 'code',
    lang: flag || null,
    value: trim(exdentedContent)
  });
}

/***/ }),

/***/ "U6jy":
/***/ (function(module, exports) {

module.exports = extend;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function extend() {
  var target = {};
  for (var i = 0; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
}

/***/ }),

/***/ "UV+P":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var React = __webpack_require__("q1tI");
var xtend = __webpack_require__("U6jy");
var ReactIs = __webpack_require__("TOwV");
var defaultNodePosition = {
  start: {
    line: 1,
    column: 1,
    offset: 0
  },
  end: {
    line: 1,
    column: 1,
    offset: 0
  }
};
function astToReact(node, options) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var renderer = options.renderers[node.type]; // nodes generated by plugins may not have position data
  // much of the code after this point will attempt to access properties of the node.position
  // this will set the node position to the parent node's position to prevent errors

  if (node.position === undefined) {
    node.position = parent.node && parent.node.position || defaultNodePosition;
  }
  var pos = node.position.start;
  var key = [node.type, pos.line, pos.column, index].join('-');
  if (!ReactIs.isValidElementType(renderer)) {
    throw new Error("Renderer for type `".concat(node.type, "` not defined or is not renderable"));
  }
  var nodeProps = getNodeProps(node, key, options, renderer, parent, index);
  return React.createElement(renderer, nodeProps, nodeProps.children || resolveChildren() || undefined);
  function resolveChildren() {
    return node.children && node.children.map(function (childNode, i) {
      return astToReact(childNode, options, {
        node: node,
        props: nodeProps
      }, i);
    });
  }
} // eslint-disable-next-line max-params, complexity

function getNodeProps(node, key, opts, renderer, parent, index) {
  var props = {
    key: key
  };
  var isTagRenderer = typeof renderer === 'string'; // `sourcePos` is true if the user wants source information (line/column info from markdown source)

  if (opts.sourcePos && node.position) {
    props['data-sourcepos'] = flattenPosition(node.position);
  }
  if (opts.rawSourcePos && !isTagRenderer) {
    props.sourcePosition = node.position;
  } // If `includeNodeIndex` is true, pass node index info to all non-tag renderers

  if (opts.includeNodeIndex && parent.node && parent.node.children && !isTagRenderer) {
    props.index = parent.node.children.indexOf(node);
    props.parentChildCount = parent.node.children.length;
  }
  var ref = node.identifier !== null && node.identifier !== undefined ? opts.definitions[node.identifier] || {} : null;
  switch (node.type) {
    case 'root':
      assignDefined(props, {
        className: opts.className
      });
      break;
    case 'text':
      props.nodeKey = key;
      props.children = node.value;
      break;
    case 'heading':
      props.level = node.depth;
      break;
    case 'list':
      props.start = node.start;
      props.ordered = node.ordered;
      props.tight = !node.loose;
      props.depth = node.depth;
      break;
    case 'listItem':
      props.checked = node.checked;
      props.tight = !node.loose;
      props.ordered = node.ordered;
      props.index = node.index;
      props.children = getListItemChildren(node, parent).map(function (childNode, i) {
        return astToReact(childNode, opts, {
          node: node,
          props: props
        }, i);
      });
      break;
    case 'definition':
      assignDefined(props, {
        identifier: node.identifier,
        title: node.title,
        url: node.url
      });
      break;
    case 'code':
      assignDefined(props, {
        language: node.lang && node.lang.split(/\s/, 1)[0]
      });
      break;
    case 'inlineCode':
      props.children = node.value;
      props.inline = true;
      break;
    case 'link':
      assignDefined(props, {
        title: node.title || undefined,
        target: typeof opts.linkTarget === 'function' ? opts.linkTarget(node.url, node.children, node.title) : opts.linkTarget,
        href: opts.transformLinkUri ? opts.transformLinkUri(node.url, node.children, node.title) : node.url
      });
      break;
    case 'image':
      assignDefined(props, {
        alt: node.alt || undefined,
        title: node.title || undefined,
        src: opts.transformImageUri ? opts.transformImageUri(node.url, node.children, node.title, node.alt) : node.url
      });
      break;
    case 'linkReference':
      assignDefined(props, xtend(ref, {
        href: opts.transformLinkUri ? opts.transformLinkUri(ref.href) : ref.href
      }));
      break;
    case 'imageReference':
      assignDefined(props, {
        src: opts.transformImageUri && ref.href ? opts.transformImageUri(ref.href, node.children, ref.title, node.alt) : ref.href,
        title: ref.title || undefined,
        alt: node.alt || undefined
      });
      break;
    case 'table':
    case 'tableHead':
    case 'tableBody':
      props.columnAlignment = node.align;
      break;
    case 'tableRow':
      props.isHeader = parent.node.type === 'tableHead';
      props.columnAlignment = parent.props.columnAlignment;
      break;
    case 'tableCell':
      assignDefined(props, {
        isHeader: parent.props.isHeader,
        align: parent.props.columnAlignment[index]
      });
      break;
    case 'virtualHtml':
      props.tag = node.tag;
      break;
    case 'html':
      // @todo find a better way than this
      props.isBlock = node.position.start.line !== node.position.end.line;
      props.escapeHtml = opts.escapeHtml;
      props.skipHtml = opts.skipHtml;
      break;
    case 'parsedHtml':
      {
        var parsedChildren;
        if (node.children) {
          parsedChildren = node.children.map(function (child, i) {
            return astToReact(child, opts, {
              node: node,
              props: props
            }, i);
          });
        }
        props.escapeHtml = opts.escapeHtml;
        props.skipHtml = opts.skipHtml;
        props.element = mergeNodeChildren(node, parsedChildren);
        break;
      }
    default:
      assignDefined(props, xtend(node, {
        type: undefined,
        position: undefined,
        children: undefined
      }));
  }
  if (!isTagRenderer && node.value) {
    props.value = node.value;
  }
  return props;
}
function assignDefined(target, attrs) {
  for (var key in attrs) {
    if (typeof attrs[key] !== 'undefined') {
      target[key] = attrs[key];
    }
  }
}
function mergeNodeChildren(node, parsedChildren) {
  var el = node.element;
  if (Array.isArray(el)) {
    var Fragment = React.Fragment || 'div';
    return React.createElement(Fragment, null, el);
  }
  if (el.props.children || parsedChildren) {
    var children = React.Children.toArray(el.props.children).concat(parsedChildren);
    return React.cloneElement(el, null, children);
  }
  return React.cloneElement(el, null);
}
function flattenPosition(pos) {
  return [pos.start.line, ':', pos.start.column, '-', pos.end.line, ':', pos.end.column].map(String).join('');
}
function getListItemChildren(node, parent) {
  if (node.loose) {
    return node.children;
  }
  if (parent.node && node.index > 0 && parent.node.children[node.index - 1].loose) {
    return node.children;
  }
  return unwrapParagraphs(node);
}
function unwrapParagraphs(node) {
  return node.children.reduce(function (array, child) {
    return array.concat(child.type === 'paragraph' ? child.children || [] : [child]);
  }, []);
}
module.exports = astToReact;

/***/ }),

/***/ "UfUV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Expose. */
module.exports = visitParents;

/* Visit. */
function visitParents(tree, type, visitor) {
  var stack = [];
  if (typeof type === 'function') {
    visitor = type;
    type = null;
  }
  one(tree);

  /* Visit a single node. */
  function one(node) {
    var result;
    if (!type || node.type === type) {
      result = visitor(node, stack.concat());
    }
    if (node.children && result !== false) {
      return all(node.children, node);
    }
    return result;
  }

  /* Visit children in `parent`. */
  function all(children, parent) {
    var length = children.length;
    var index = -1;
    var child;
    stack.push(parent);
    while (++index < length) {
      child = children[index];
      if (child && one(child) === false) {
        return false;
      }
    }
    stack.pop();
    return true;
  }
}

/***/ }),

/***/ "VHls":
/***/ (function(module) {

module.exports = JSON.parse("[\"address\",\"article\",\"aside\",\"base\",\"basefont\",\"blockquote\",\"body\",\"caption\",\"center\",\"col\",\"colgroup\",\"dd\",\"details\",\"dialog\",\"dir\",\"div\",\"dl\",\"dt\",\"fieldset\",\"figcaption\",\"figure\",\"footer\",\"form\",\"frame\",\"frameset\",\"h1\",\"h2\",\"h3\",\"h4\",\"h5\",\"h6\",\"head\",\"header\",\"hgroup\",\"hr\",\"html\",\"iframe\",\"legend\",\"li\",\"link\",\"main\",\"menu\",\"menuitem\",\"meta\",\"nav\",\"noframes\",\"ol\",\"optgroup\",\"option\",\"p\",\"param\",\"pre\",\"section\",\"source\",\"title\",\"summary\",\"table\",\"tbody\",\"td\",\"tfoot\",\"th\",\"thead\",\"title\",\"tr\",\"track\",\"ul\"]");

/***/ }),

/***/ "W8QB":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = locate;
function locate(value, fromIndex) {
  var asterisk = value.indexOf('*', fromIndex);
  var underscore = value.indexOf('_', fromIndex);
  if (underscore === -1) {
    return asterisk;
  }
  if (asterisk === -1) {
    return underscore;
  }
  return underscore < asterisk ? underscore : asterisk;
}

/***/ }),

/***/ "WtKE":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-env browser */
var el;
var semicolon = 59; //  ';'

module.exports = decodeEntity;
function decodeEntity(characters) {
  var entity = '&' + characters + ';';
  var char;
  el = el || document.createElement('i');
  el.innerHTML = entity;
  char = el.textContent;

  // Some entities do not require the closing semicolon (`&not` - for instance),
  // which leads to situations where parsing the assumed entity of &notit; will
  // result in the string `¬it;`.  When we encounter a trailing semicolon after
  // parsing and the entity to decode was not a semicolon (`&semi;`), we can
  // assume that the matching was incomplete
  if (char.charCodeAt(char.length - 1) === semicolon && characters !== 'semi') {
    return false;
  }

  // If the decoded string is equal to the input, the entity was not valid
  return char === entity ? false : char;
}

/***/ }),

/***/ "Z87L":
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":\"�\",\"128\":\"€\",\"130\":\"‚\",\"131\":\"ƒ\",\"132\":\"„\",\"133\":\"…\",\"134\":\"†\",\"135\":\"‡\",\"136\":\"ˆ\",\"137\":\"‰\",\"138\":\"Š\",\"139\":\"‹\",\"140\":\"Œ\",\"142\":\"Ž\",\"145\":\"‘\",\"146\":\"’\",\"147\":\"“\",\"148\":\"”\",\"149\":\"•\",\"150\":\"–\",\"151\":\"—\",\"152\":\"˜\",\"153\":\"™\",\"154\":\"š\",\"155\":\"›\",\"156\":\"œ\",\"158\":\"ž\",\"159\":\"Ÿ\"}");

/***/ }),

/***/ "ZONP":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = decimal;

// Check if the given character code, or the character code at the first
// character, is decimal.
function decimal(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 48 && code <= 57; /* 0-9 */
}

/***/ }),

/***/ "ZWk2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var legacy = __webpack_require__("m2n9");
var invalid = __webpack_require__("Z87L");
var decimal = __webpack_require__("ZONP");
var hexadecimal = __webpack_require__("fjrl");
var alphanumerical = __webpack_require__("J5yW");
var decodeEntity = __webpack_require__("WtKE");
module.exports = parseEntities;
var own = {}.hasOwnProperty;
var fromCharCode = String.fromCharCode;
var noop = Function.prototype;

// Default settings.
var defaults = {
  warning: null,
  reference: null,
  text: null,
  warningContext: null,
  referenceContext: null,
  textContext: null,
  position: {},
  additional: null,
  attribute: false,
  nonTerminated: true
};

// Characters.
var tab = 9; // '\t'
var lineFeed = 10; // '\n'
var formFeed = 12; //  '\f'
var space = 32; // ' '
var ampersand = 38; //  '&'
var semicolon = 59; //  ';'
var lessThan = 60; //  '<'
var equalsTo = 61; //  '='
var numberSign = 35; //  '#'
var uppercaseX = 88; //  'X'
var lowercaseX = 120; //  'x'
var replacementCharacter = 65533; // '�'

// Reference types.
var name = 'named';
var hexa = 'hexadecimal';
var deci = 'decimal';

// Map of bases.
var bases = {};
bases[hexa] = 16;
bases[deci] = 10;

// Map of types to tests.
// Each type of character reference accepts different characters.
// This test is used to detect whether a reference has ended (as the semicolon
// is not strictly needed).
var tests = {};
tests[name] = alphanumerical;
tests[deci] = decimal;
tests[hexa] = hexadecimal;

// Warning types.
var namedNotTerminated = 1;
var numericNotTerminated = 2;
var namedEmpty = 3;
var numericEmpty = 4;
var namedUnknown = 5;
var numericDisallowed = 6;
var numericProhibited = 7;

// Warning messages.
var messages = {};
messages[namedNotTerminated] = 'Named character references must be terminated by a semicolon';
messages[numericNotTerminated] = 'Numeric character references must be terminated by a semicolon';
messages[namedEmpty] = 'Named character references cannot be empty';
messages[numericEmpty] = 'Numeric character references cannot be empty';
messages[namedUnknown] = 'Named character references must be known';
messages[numericDisallowed] = 'Numeric character references cannot be disallowed';
messages[numericProhibited] = 'Numeric character references cannot be outside the permissible Unicode range';

// Wrap to ensure clean parameters are given to `parse`.
function parseEntities(value, options) {
  var settings = {};
  var option;
  var key;
  if (!options) {
    options = {};
  }
  for (key in defaults) {
    option = options[key];
    settings[key] = option === null || option === undefined ? defaults[key] : option;
  }
  if (settings.position.indent || settings.position.start) {
    settings.indent = settings.position.indent || [];
    settings.position = settings.position.start;
  }
  return parse(value, settings);
}

// Parse entities.
// eslint-disable-next-line complexity
function parse(value, settings) {
  var additional = settings.additional;
  var nonTerminated = settings.nonTerminated;
  var handleText = settings.text;
  var handleReference = settings.reference;
  var handleWarning = settings.warning;
  var textContext = settings.textContext;
  var referenceContext = settings.referenceContext;
  var warningContext = settings.warningContext;
  var pos = settings.position;
  var indent = settings.indent || [];
  var length = value.length;
  var index = 0;
  var lines = -1;
  var column = pos.column || 1;
  var line = pos.line || 1;
  var queue = '';
  var result = [];
  var entityCharacters;
  var namedEntity;
  var terminated;
  var characters;
  var character;
  var reference;
  var following;
  var warning;
  var reason;
  var output;
  var entity;
  var begin;
  var start;
  var type;
  var test;
  var prev;
  var next;
  var diff;
  var end;
  if (typeof additional === 'string') {
    additional = additional.charCodeAt(0);
  }

  // Cache the current point.
  prev = now();

  // Wrap `handleWarning`.
  warning = handleWarning ? parseError : noop;

  // Ensure the algorithm walks over the first character and the end (inclusive).
  index--;
  length++;
  while (++index < length) {
    // If the previous character was a newline.
    if (character === lineFeed) {
      column = indent[lines] || 1;
    }
    character = value.charCodeAt(index);
    if (character === ampersand) {
      following = value.charCodeAt(index + 1);

      // The behaviour depends on the identity of the next character.
      if (following === tab || following === lineFeed || following === formFeed || following === space || following === ampersand || following === lessThan || following !== following || additional && following === additional) {
        // Not a character reference.
        // No characters are consumed, and nothing is returned.
        // This is not an error, either.
        queue += fromCharCode(character);
        column++;
        continue;
      }
      start = index + 1;
      begin = start;
      end = start;
      if (following === numberSign) {
        // Numerical entity.
        end = ++begin;

        // The behaviour further depends on the next character.
        following = value.charCodeAt(end);
        if (following === uppercaseX || following === lowercaseX) {
          // ASCII hex digits.
          type = hexa;
          end = ++begin;
        } else {
          // ASCII digits.
          type = deci;
        }
      } else {
        // Named entity.
        type = name;
      }
      entityCharacters = '';
      entity = '';
      characters = '';
      test = tests[type];
      end--;
      while (++end < length) {
        following = value.charCodeAt(end);
        if (!test(following)) {
          break;
        }
        characters += fromCharCode(following);

        // Check if we can match a legacy named reference.
        // If so, we cache that as the last viable named reference.
        // This ensures we do not need to walk backwards later.
        if (type === name && own.call(legacy, characters)) {
          entityCharacters = characters;
          entity = legacy[characters];
        }
      }
      terminated = value.charCodeAt(end) === semicolon;
      if (terminated) {
        end++;
        namedEntity = type === name ? decodeEntity(characters) : false;
        if (namedEntity) {
          entityCharacters = characters;
          entity = namedEntity;
        }
      }
      diff = 1 + end - start;
      if (!terminated && !nonTerminated) {
        // Empty.
      } else if (!characters) {
        // An empty (possible) entity is valid, unless it’s numeric (thus an
        // ampersand followed by an octothorp).
        if (type !== name) {
          warning(numericEmpty, diff);
        }
      } else if (type === name) {
        // An ampersand followed by anything unknown, and not terminated, is
        // invalid.
        if (terminated && !entity) {
          warning(namedUnknown, 1);
        } else {
          // If theres something after an entity name which is not known, cap
          // the reference.
          if (entityCharacters !== characters) {
            end = begin + entityCharacters.length;
            diff = 1 + end - begin;
            terminated = false;
          }

          // If the reference is not terminated, warn.
          if (!terminated) {
            reason = entityCharacters ? namedNotTerminated : namedEmpty;
            if (settings.attribute) {
              following = value.charCodeAt(end);
              if (following === equalsTo) {
                warning(reason, diff);
                entity = null;
              } else if (alphanumerical(following)) {
                entity = null;
              } else {
                warning(reason, diff);
              }
            } else {
              warning(reason, diff);
            }
          }
        }
        reference = entity;
      } else {
        if (!terminated) {
          // All non-terminated numeric entities are not rendered, and trigger a
          // warning.
          warning(numericNotTerminated, diff);
        }

        // When terminated and number, parse as either hexadecimal or decimal.
        reference = parseInt(characters, bases[type]);

        // Trigger a warning when the parsed number is prohibited, and replace
        // with replacement character.
        if (prohibited(reference)) {
          warning(numericProhibited, diff);
          reference = fromCharCode(replacementCharacter);
        } else if (reference in invalid) {
          // Trigger a warning when the parsed number is disallowed, and replace
          // by an alternative.
          warning(numericDisallowed, diff);
          reference = invalid[reference];
        } else {
          // Parse the number.
          output = '';

          // Trigger a warning when the parsed number should not be used.
          if (disallowed(reference)) {
            warning(numericDisallowed, diff);
          }

          // Stringify the number.
          if (reference > 0xffff) {
            reference -= 0x10000;
            output += fromCharCode(reference >>> (10 & 0x3ff) | 0xd800);
            reference = 0xdc00 | reference & 0x3ff;
          }
          reference = output + fromCharCode(reference);
        }
      }

      // Found it!
      // First eat the queued characters as normal text, then eat an entity.
      if (reference) {
        flush();
        prev = now();
        index = end - 1;
        column += end - start + 1;
        result.push(reference);
        next = now();
        next.offset++;
        if (handleReference) {
          handleReference.call(referenceContext, reference, {
            start: prev,
            end: next
          }, value.slice(start - 1, end));
        }
        prev = next;
      } else {
        // If we could not find a reference, queue the checked characters (as
        // normal characters), and move the pointer to their end.
        // This is possible because we can be certain neither newlines nor
        // ampersands are included.
        characters = value.slice(start - 1, end);
        queue += characters;
        column += characters.length;
        index = end - 1;
      }
    } else {
      // Handle anything other than an ampersand, including newlines and EOF.
      if (character === 10 // Line feed
      ) {
        line++;
        lines++;
        column = 0;
      }
      if (character === character) {
        queue += fromCharCode(character);
        column++;
      } else {
        flush();
      }
    }
  }

  // Return the reduced nodes, and any possible warnings.
  return result.join('');

  // Get current position.
  function now() {
    return {
      line: line,
      column: column,
      offset: index + (pos.offset || 0)
    };
  }

  // “Throw” a parse-error: a warning.
  function parseError(code, offset) {
    var position = now();
    position.column += offset;
    position.offset += offset;
    handleWarning.call(warningContext, messages[code], position, code);
  }

  // Flush `queue` (normal text).
  // Macro invoked before each entity and at the end of `value`.
  // Does nothing when `queue` is empty.
  function flush() {
    if (queue) {
      result.push(queue);
      if (handleText) {
        handleText.call(textContext, queue, {
          start: prev,
          end: now()
        });
      }
      queue = '';
    }
  }
}

// Check if `character` is outside the permissible unicode range.
function prohibited(code) {
  return code >= 0xd800 && code <= 0xdfff || code > 0x10ffff;
}

// Check if `character` is disallowed.
function disallowed(code) {
  return code >= 0x0001 && code <= 0x0008 || code === 0x000b || code >= 0x000d && code <= 0x001f || code >= 0x007f && code <= 0x009f || code >= 0xfdd0 && code <= 0xfdef || (code & 0xffff) === 0xffff || (code & 0xffff) === 0xfffe;
}

/***/ }),

/***/ "ZkSf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visit;
var visitParents = __webpack_require__("uzq8");
var CONTINUE = visitParents.CONTINUE;
var SKIP = visitParents.SKIP;
var EXIT = visitParents.EXIT;
visit.CONTINUE = CONTINUE;
visit.SKIP = SKIP;
visit.EXIT = EXIT;
function visit(tree, test, visitor, reverse) {
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  visitParents(tree, test, overload, reverse);
  function overload(node, parents) {
    var parent = parents[parents.length - 1];
    var index = parent ? parent.children.indexOf(node) : null;
    return visitor(node, index, parent);
  }
}

/***/ }),

/***/ "akNn":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
module.exports = newline;

/* Tokenise newline. */
function newline(eat, value, silent) {
  var character = value.charAt(0);
  var length;
  var subvalue;
  var queue;
  var index;
  if (character !== '\n') {
    return;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  index = 1;
  length = value.length;
  subvalue = character;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (!whitespace(character)) {
      break;
    }
    queue += character;
    if (character === '\n') {
      subvalue += queue;
      queue = '';
    }
    index++;
  }
  eat(subvalue);
}

/***/ }),

/***/ "c6LQ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("ACGk");
var normalize = __webpack_require__("d+Jj");
module.exports = reference;
reference.locator = locate;
var T_LINK = 'link';
var T_IMAGE = 'image';
var T_FOOTNOTE = 'footnote';
var REFERENCE_TYPE_SHORTCUT = 'shortcut';
var REFERENCE_TYPE_COLLAPSED = 'collapsed';
var REFERENCE_TYPE_FULL = 'full';
var C_CARET = '^';
var C_BACKSLASH = '\\';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
function reference(eat, value, silent) {
  var self = this;
  var character = value.charAt(0);
  var index = 0;
  var length = value.length;
  var subvalue = '';
  var intro = '';
  var type = T_LINK;
  var referenceType = REFERENCE_TYPE_SHORTCUT;
  var content;
  var identifier;
  var now;
  var node;
  var exit;
  var queue;
  var bracketed;
  var depth;

  /* Check whether we’re eating an image. */
  if (character === '!') {
    type = T_IMAGE;
    intro = character;
    character = value.charAt(++index);
  }
  if (character !== C_BRACKET_OPEN) {
    return;
  }
  index++;
  intro += character;
  queue = '';

  /* Check whether we’re eating a footnote. */
  if (self.options.footnotes && value.charAt(index) === C_CARET) {
    /* Exit if `![^` is found, so the `!` will be seen as text after this,
     * and we’ll enter this function again when `[^` is found. */
    if (type === T_IMAGE) {
      return;
    }
    intro += C_CARET;
    index++;
    type = T_FOOTNOTE;
  }

  /* Eat the text. */
  depth = 0;
  while (index < length) {
    character = value.charAt(index);
    if (character === C_BRACKET_OPEN) {
      bracketed = true;
      depth++;
    } else if (character === C_BRACKET_CLOSE) {
      if (!depth) {
        break;
      }
      depth--;
    }
    if (character === C_BACKSLASH) {
      queue += C_BACKSLASH;
      character = value.charAt(++index);
    }
    queue += character;
    index++;
  }
  subvalue = queue;
  content = queue;
  character = value.charAt(index);
  if (character !== C_BRACKET_CLOSE) {
    return;
  }
  index++;
  subvalue += character;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (!whitespace(character)) {
      break;
    }
    queue += character;
    index++;
  }
  character = value.charAt(index);

  /* Inline footnotes cannot have an identifier. */
  if (type !== T_FOOTNOTE && character === C_BRACKET_OPEN) {
    identifier = '';
    queue += character;
    index++;
    while (index < length) {
      character = value.charAt(index);
      if (character === C_BRACKET_OPEN || character === C_BRACKET_CLOSE) {
        break;
      }
      if (character === C_BACKSLASH) {
        identifier += C_BACKSLASH;
        character = value.charAt(++index);
      }
      identifier += character;
      index++;
    }
    character = value.charAt(index);
    if (character === C_BRACKET_CLOSE) {
      referenceType = identifier ? REFERENCE_TYPE_FULL : REFERENCE_TYPE_COLLAPSED;
      queue += identifier + character;
      index++;
    } else {
      identifier = '';
    }
    subvalue += queue;
    queue = '';
  } else {
    if (!content) {
      return;
    }
    identifier = content;
  }

  /* Brackets cannot be inside the identifier. */
  if (referenceType !== REFERENCE_TYPE_FULL && bracketed) {
    return;
  }
  subvalue = intro + subvalue;
  if (type === T_LINK && self.inLink) {
    return null;
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  if (type === T_FOOTNOTE && content.indexOf(' ') !== -1) {
    return eat(subvalue)({
      type: 'footnote',
      children: this.tokenizeInline(content, eat.now())
    });
  }
  now = eat.now();
  now.column += intro.length;
  now.offset += intro.length;
  identifier = referenceType === REFERENCE_TYPE_FULL ? identifier : content;
  node = {
    type: type + 'Reference',
    identifier: normalize(identifier)
  };
  if (type === T_LINK || type === T_IMAGE) {
    node.referenceType = referenceType;
  }
  if (type === T_LINK) {
    exit = self.enterLink();
    node.children = self.tokenizeInline(content, now);
    exit();
  } else if (type === T_IMAGE) {
    node.alt = self.decode.raw(self.unescape(content), now) || null;
  }
  return eat(subvalue)(node);
}

/***/ }),

/***/ "cBNe":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__("ZkSf");
module.exports = removePosition;
function removePosition(node, force) {
  visit(node, force ? hard : soft);
  return node;
}
function hard(node) {
  delete node.position;
}
function soft(node) {
  node.position = undefined;
}

/***/ }),

/***/ "cFAA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("36yr");
module.exports = inlineCode;
inlineCode.locator = locate;
var C_TICK = '`';

/* Tokenise inline code. */
function inlineCode(eat, value, silent) {
  var length = value.length;
  var index = 0;
  var queue = '';
  var tickQueue = '';
  var contentQueue;
  var subqueue;
  var count;
  var openingCount;
  var subvalue;
  var character;
  var found;
  var next;
  while (index < length) {
    if (value.charAt(index) !== C_TICK) {
      break;
    }
    queue += C_TICK;
    index++;
  }
  if (!queue) {
    return;
  }
  subvalue = queue;
  openingCount = index;
  queue = '';
  next = value.charAt(index);
  count = 0;
  while (index < length) {
    character = next;
    next = value.charAt(index + 1);
    if (character === C_TICK) {
      count++;
      tickQueue += character;
    } else {
      count = 0;
      queue += character;
    }
    if (count && next !== C_TICK) {
      if (count === openingCount) {
        subvalue += queue + tickQueue;
        found = true;
        break;
      }
      queue += tickQueue;
      tickQueue = '';
    }
    index++;
  }
  if (!found) {
    if (openingCount % 2 !== 0) {
      return;
    }
    queue = '';
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true;
  }
  contentQueue = '';
  subqueue = '';
  length = queue.length;
  index = -1;
  while (++index < length) {
    character = queue.charAt(index);
    if (whitespace(character)) {
      subqueue += character;
      continue;
    }
    if (subqueue) {
      if (contentQueue) {
        contentQueue += subqueue;
      }
      subqueue = '';
    }
    contentQueue += character;
  }
  return eat(subvalue)({
    type: 'inlineCode',
    value: contentQueue
  });
}

/***/ }),

/***/ "cVWj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Naive, simple plugin to match inline nodes without attributes
 * This allows say <strong>foo</strong>, but not <strong class="very">foo</strong>
 * For proper HTML support, you'll want a different plugin
 **/
var visit = __webpack_require__("ZkSf");
var type = 'virtualHtml';
var selfClosingRe = /^<(area|base|br|col|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)\s*\/?>$/i;
var simpleTagRe = /^<(\/?)([a-z]+)\s*>$/;
module.exports = function (tree) {
  var open;
  var currentParent;
  visit(tree, 'html', function (node, index, parent) {
    if (currentParent !== parent) {
      open = [];
      currentParent = parent;
    }
    var selfClosing = getSelfClosing(node);
    if (selfClosing) {
      parent.children.splice(index, 1, {
        type: type,
        tag: selfClosing,
        position: node.position
      });
      return true;
    }
    var current = getSimpleTag(node, parent);
    if (!current) {
      return true;
    }
    var matching = findAndPull(open, current.tag);
    if (matching) {
      parent.children.splice(index, 0, virtual(current, matching, parent));
    } else if (!current.opening) {
      open.push(current);
    }
    return true;
  }, true // Iterate in reverse
  );

  return tree;
};
function findAndPull(open, matchingTag) {
  var i = open.length;
  while (i--) {
    if (open[i].tag === matchingTag) {
      return open.splice(i, 1)[0];
    }
  }
  return false;
}
function getSimpleTag(node, parent) {
  var match = node.value.match(simpleTagRe);
  return match ? {
    tag: match[2],
    opening: !match[1],
    node: node
  } : false;
}
function getSelfClosing(node) {
  var match = node.value.match(selfClosingRe);
  return match ? match[1] : false;
}
function virtual(fromNode, toNode, parent) {
  var fromIndex = parent.children.indexOf(fromNode.node);
  var toIndex = parent.children.indexOf(toNode.node);
  var extracted = parent.children.splice(fromIndex, toIndex - fromIndex + 1);
  var children = extracted.slice(1, -1);
  return {
    type: type,
    children: children,
    tag: fromNode.tag,
    position: {
      start: fromNode.node.position.start,
      end: toNode.node.position.end,
      indent: []
    }
  };
}

/***/ }),

/***/ "cmLN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = interrupt;
function interrupt(interruptors, tokenizers, ctx, params) {
  var bools = ['pedantic', 'commonmark'];
  var count = bools.length;
  var length = interruptors.length;
  var index = -1;
  var interruptor;
  var config;
  var fn;
  var offset;
  var bool;
  var ignore;
  while (++index < length) {
    interruptor = interruptors[index];
    config = interruptor[1] || {};
    fn = interruptor[0];
    offset = -1;
    ignore = false;
    while (++offset < count) {
      bool = bools[offset];
      if (config[bool] !== undefined && config[bool] !== ctx.options[bool]) {
        ignore = true;
        break;
      }
    }
    if (ignore) {
      continue;
    }
    if (tokenizers[fn].apply(ctx, params)) {
      return true;
    }
  }
  return false;
}

/***/ }),

/***/ "d+Jj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var collapseWhiteSpace = __webpack_require__("JqBK");
module.exports = normalize;

/* Normalize an identifier.  Collapses multiple white space
 * characters into a single space, and removes casing. */
function normalize(value) {
  return collapseWhiteSpace(value).toLowerCase();
}

/***/ }),

/***/ "egI8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("Fhq4");
module.exports = strikethrough;
strikethrough.locator = locate;
var C_TILDE = '~';
var DOUBLE = '~~';
function strikethrough(eat, value, silent) {
  var self = this;
  var character = '';
  var previous = '';
  var preceding = '';
  var subvalue = '';
  var index;
  var length;
  var now;
  if (!self.options.gfm || value.charAt(0) !== C_TILDE || value.charAt(1) !== C_TILDE || whitespace(value.charAt(2))) {
    return;
  }
  index = 1;
  length = value.length;
  now = eat.now();
  now.column += 2;
  now.offset += 2;
  while (++index < length) {
    character = value.charAt(index);
    if (character === C_TILDE && previous === C_TILDE && (!preceding || !whitespace(preceding))) {
      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }
      return eat(DOUBLE + subvalue + DOUBLE)({
        type: 'delete',
        children: self.tokenizeInline(subvalue, now)
      });
    }
    subvalue += previous;
    preceding = previous;
    previous = character;
  }
}

/***/ }),

/***/ "fjrl":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = hexadecimal;

// Check if the given character code, or the character code at the first
// character, is hexadecimal.
function hexadecimal(character) {
  var code = typeof character === 'string' ? character.charCodeAt(0) : character;
  return code >= 97 /* a */ && code <= 102 /* z */ || code >= 65 /* A */ && code <= 70 /* Z */ || code >= 48 /* A */ && code <= 57 /* Z */;
}

/***/ }),

/***/ "g1k0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var alphabetical = __webpack_require__("1iAE");
var locate = __webpack_require__("NBu1");
var tag = __webpack_require__("1T8B").tag;
module.exports = inlineHTML;
inlineHTML.locator = locate;
var EXPRESSION_HTML_LINK_OPEN = /^<a /i;
var EXPRESSION_HTML_LINK_CLOSE = /^<\/a>/i;
function inlineHTML(eat, value, silent) {
  var self = this;
  var length = value.length;
  var character;
  var subvalue;
  if (value.charAt(0) !== '<' || length < 3) {
    return;
  }
  character = value.charAt(1);
  if (!alphabetical(character) && character !== '?' && character !== '!' && character !== '/') {
    return;
  }
  subvalue = value.match(tag);
  if (!subvalue) {
    return;
  }

  /* istanbul ignore if - not used yet. */
  if (silent) {
    return true;
  }
  subvalue = subvalue[0];
  if (!self.inLink && EXPRESSION_HTML_LINK_OPEN.test(subvalue)) {
    self.inLink = true;
  } else if (self.inLink && EXPRESSION_HTML_LINK_CLOSE.test(subvalue)) {
    self.inLink = false;
  }
  return eat(subvalue)({
    type: 'html',
    value: subvalue
  });
}

/***/ }),

/***/ "h9ck":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var HtmlParser = '__RMD_HTML_PARSER__';
exports.HtmlParser = typeof Symbol === 'undefined' ? HtmlParser : Symbol(HtmlParser);

/***/ }),

/***/ "kDuX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = atxHeading;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_HASH = '#';
var MAX_ATX_COUNT = 6;
function atxHeading(eat, value, silent) {
  var self = this;
  var settings = self.options;
  var length = value.length + 1;
  var index = -1;
  var now = eat.now();
  var subvalue = '';
  var content = '';
  var character;
  var queue;
  var depth;

  /* Eat initial spacing. */
  while (++index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      index--;
      break;
    }
    subvalue += character;
  }

  /* Eat hashes. */
  depth = 0;
  while (++index <= length) {
    character = value.charAt(index);
    if (character !== C_HASH) {
      index--;
      break;
    }
    subvalue += character;
    depth++;
  }
  if (depth > MAX_ATX_COUNT) {
    return;
  }
  if (!depth || !settings.pedantic && value.charAt(index + 1) === C_HASH) {
    return;
  }
  length = value.length + 1;

  /* Eat intermediate white-space. */
  queue = '';
  while (++index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      index--;
      break;
    }
    queue += character;
  }

  /* Exit when not in pedantic mode without spacing. */
  if (!settings.pedantic && queue.length === 0 && character && character !== C_NEWLINE) {
    return;
  }
  if (silent) {
    return true;
  }

  /* Eat content. */
  subvalue += queue;
  queue = '';
  content = '';
  while (++index < length) {
    character = value.charAt(index);
    if (!character || character === C_NEWLINE) {
      break;
    }
    if (character !== C_SPACE && character !== C_TAB && character !== C_HASH) {
      content += queue + character;
      queue = '';
      continue;
    }
    while (character === C_SPACE || character === C_TAB) {
      queue += character;
      character = value.charAt(++index);
    }
    while (character === C_HASH) {
      queue += character;
      character = value.charAt(++index);
    }
    while (character === C_SPACE || character === C_TAB) {
      queue += character;
      character = value.charAt(++index);
    }
    index--;
  }
  now.column += subvalue.length;
  now.offset += subvalue.length;
  subvalue += content + queue;
  return eat(subvalue)({
    type: 'heading',
    depth: depth,
    children: self.tokenizeInline(content, now)
  });
}

/***/ }),

/***/ "kmJ7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var repeat = __webpack_require__("RjOF");
var trim = __webpack_require__("3GlI");
module.exports = indentedCode;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var CODE_INDENT_COUNT = 4;
var CODE_INDENT = repeat(C_SPACE, CODE_INDENT_COUNT);

/* Tokenise indented code. */
function indentedCode(eat, value, silent) {
  var index = -1;
  var length = value.length;
  var subvalue = '';
  var content = '';
  var subvalueQueue = '';
  var contentQueue = '';
  var character;
  var blankQueue;
  var indent;
  while (++index < length) {
    character = value.charAt(index);
    if (indent) {
      indent = false;
      subvalue += subvalueQueue;
      content += contentQueue;
      subvalueQueue = '';
      contentQueue = '';
      if (character === C_NEWLINE) {
        subvalueQueue = character;
        contentQueue = character;
      } else {
        subvalue += character;
        content += character;
        while (++index < length) {
          character = value.charAt(index);
          if (!character || character === C_NEWLINE) {
            contentQueue = character;
            subvalueQueue = character;
            break;
          }
          subvalue += character;
          content += character;
        }
      }
    } else if (character === C_SPACE && value.charAt(index + 1) === character && value.charAt(index + 2) === character && value.charAt(index + 3) === character) {
      subvalueQueue += CODE_INDENT;
      index += 3;
      indent = true;
    } else if (character === C_TAB) {
      subvalueQueue += character;
      indent = true;
    } else {
      blankQueue = '';
      while (character === C_TAB || character === C_SPACE) {
        blankQueue += character;
        character = value.charAt(++index);
      }
      if (character !== C_NEWLINE) {
        break;
      }
      subvalueQueue += blankQueue + character;
      contentQueue += character;
    }
  }
  if (content) {
    if (silent) {
      return true;
    }
    return eat(subvalue)({
      type: 'code',
      lang: null,
      value: trim(content)
    });
  }
}

/***/ }),

/***/ "lebq":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = setextHeading;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_EQUALS = '=';
var C_DASH = '-';
var MAX_HEADING_INDENT = 3;

/* Map of characters which can be used to mark setext
 * headers, mapping to their corresponding depth. */
var SETEXT_MARKERS = {};
SETEXT_MARKERS[C_EQUALS] = 1;
SETEXT_MARKERS[C_DASH] = 2;
function setextHeading(eat, value, silent) {
  var self = this;
  var now = eat.now();
  var length = value.length;
  var index = -1;
  var subvalue = '';
  var content;
  var queue;
  var character;
  var marker;
  var depth;

  /* Eat initial indentation. */
  while (++index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE || index >= MAX_HEADING_INDENT) {
      index--;
      break;
    }
    subvalue += character;
  }

  /* Eat content. */
  content = '';
  queue = '';
  while (++index < length) {
    character = value.charAt(index);
    if (character === C_NEWLINE) {
      index--;
      break;
    }
    if (character === C_SPACE || character === C_TAB) {
      queue += character;
    } else {
      content += queue + character;
      queue = '';
    }
  }
  now.column += subvalue.length;
  now.offset += subvalue.length;
  subvalue += content + queue;

  /* Ensure the content is followed by a newline and a
   * valid marker. */
  character = value.charAt(++index);
  marker = value.charAt(++index);
  if (character !== C_NEWLINE || !SETEXT_MARKERS[marker]) {
    return;
  }
  subvalue += character;

  /* Eat Setext-line. */
  queue = marker;
  depth = SETEXT_MARKERS[marker];
  while (++index < length) {
    character = value.charAt(index);
    if (character !== marker) {
      if (character !== C_NEWLINE) {
        return;
      }
      index--;
      break;
    }
    queue += character;
  }
  if (silent) {
    return true;
  }
  return eat(subvalue + queue)({
    type: 'heading',
    depth: depth,
    children: self.tokenizeInline(content, now)
  });
}

/***/ }),

/***/ "lgF9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var locate = __webpack_require__("7XrY");
module.exports = hardBreak;
hardBreak.locator = locate;
var MIN_BREAK_LENGTH = 2;
function hardBreak(eat, value, silent) {
  var length = value.length;
  var index = -1;
  var queue = '';
  var character;
  while (++index < length) {
    character = value.charAt(index);
    if (character === '\n') {
      if (index < MIN_BREAK_LENGTH) {
        return;
      }

      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }
      queue += character;
      return eat(queue)({
        type: 'break'
      });
    }
    if (character !== ' ') {
      return;
    }
    queue += character;
  }
}

/***/ }),

/***/ "m2n9":
/***/ (function(module) {

module.exports = JSON.parse("{\"AElig\":\"Æ\",\"AMP\":\"&\",\"Aacute\":\"Á\",\"Acirc\":\"Â\",\"Agrave\":\"À\",\"Aring\":\"Å\",\"Atilde\":\"Ã\",\"Auml\":\"Ä\",\"COPY\":\"©\",\"Ccedil\":\"Ç\",\"ETH\":\"Ð\",\"Eacute\":\"É\",\"Ecirc\":\"Ê\",\"Egrave\":\"È\",\"Euml\":\"Ë\",\"GT\":\">\",\"Iacute\":\"Í\",\"Icirc\":\"Î\",\"Igrave\":\"Ì\",\"Iuml\":\"Ï\",\"LT\":\"<\",\"Ntilde\":\"Ñ\",\"Oacute\":\"Ó\",\"Ocirc\":\"Ô\",\"Ograve\":\"Ò\",\"Oslash\":\"Ø\",\"Otilde\":\"Õ\",\"Ouml\":\"Ö\",\"QUOT\":\"\\\"\",\"REG\":\"®\",\"THORN\":\"Þ\",\"Uacute\":\"Ú\",\"Ucirc\":\"Û\",\"Ugrave\":\"Ù\",\"Uuml\":\"Ü\",\"Yacute\":\"Ý\",\"aacute\":\"á\",\"acirc\":\"â\",\"acute\":\"´\",\"aelig\":\"æ\",\"agrave\":\"à\",\"amp\":\"&\",\"aring\":\"å\",\"atilde\":\"ã\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"eacute\":\"é\",\"ecirc\":\"ê\",\"egrave\":\"è\",\"eth\":\"ð\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"iacute\":\"í\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"ntilde\":\"ñ\",\"oacute\":\"ó\",\"ocirc\":\"ô\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"oslash\":\"ø\",\"otilde\":\"õ\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"thorn\":\"þ\",\"times\":\"×\",\"uacute\":\"ú\",\"ucirc\":\"û\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"uuml\":\"ü\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),

/***/ "mFtL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = convert;
function convert(test) {
  if (typeof test === 'string') {
    return typeFactory(test);
  }
  if (test === null || test === undefined) {
    return ok;
  }
  if (typeof test === 'object') {
    return ('length' in test ? anyFactory : matchesFactory)(test);
  }
  if (typeof test === 'function') {
    return test;
  }
  throw new Error('Expected function, string, or object as test');
}
function convertAll(tests) {
  var results = [];
  var length = tests.length;
  var index = -1;
  while (++index < length) {
    results[index] = convert(tests[index]);
  }
  return results;
}

// Utility assert each property in `test` is represented in `node`, and each
// values are strictly equal.
function matchesFactory(test) {
  return matches;
  function matches(node) {
    var key;
    for (key in test) {
      if (node[key] !== test[key]) {
        return false;
      }
    }
    return true;
  }
}
function anyFactory(tests) {
  var checks = convertAll(tests);
  var length = checks.length;
  return matches;
  function matches() {
    var index = -1;
    while (++index < length) {
      if (checks[index].apply(this, arguments)) {
        return true;
      }
    }
    return false;
  }
}

// Utility to convert a string into a function which checks a given node’s type
// for said string.
function typeFactory(test) {
  return type;
  function type(node) {
    return Boolean(node && node.type === test);
  }
}

// Utility to return true.
function ok() {
  return true;
}

/***/ }),

/***/ "mcUT":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var locate = __webpack_require__("FxOa");
module.exports = escape;
escape.locator = locate;
function escape(eat, value, silent) {
  var self = this;
  var character;
  var node;
  if (value.charAt(0) === '\\') {
    character = value.charAt(1);
    if (self.escape.indexOf(character) !== -1) {
      /* istanbul ignore if - never used (yet) */
      if (silent) {
        return true;
      }
      if (character === '\n') {
        node = {
          type: 'break'
        };
      } else {
        node = {
          type: 'text',
          value: character
        };
      }
      return eat('\\' + character)(node);
    }
  }
}

/***/ }),

/***/ "obXZ":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = wordCharacter;
var fromCode = String.fromCharCode;
var re = /\w/;

// Check if the given character code, or the character code at the first
// character, is a word character.
function wordCharacter(character) {
  return re.test(typeof character === 'number' ? fromCode(character) : character.charAt(0));
}

/***/ }),

/***/ "qPMR":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("RsFJ");
var whitespace = __webpack_require__("IPAr");
var locate = __webpack_require__("044C");
module.exports = strong;
strong.locator = locate;
var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
function strong(eat, value, silent) {
  var self = this;
  var index = 0;
  var character = value.charAt(index);
  var now;
  var pedantic;
  var marker;
  var queue;
  var subvalue;
  var length;
  var prev;
  if (character !== C_ASTERISK && character !== C_UNDERSCORE || value.charAt(++index) !== character) {
    return;
  }
  pedantic = self.options.pedantic;
  marker = character;
  subvalue = marker + marker;
  length = value.length;
  index++;
  queue = '';
  character = '';
  if (pedantic && whitespace(value.charAt(index))) {
    return;
  }
  while (index < length) {
    prev = character;
    character = value.charAt(index);
    if (character === marker && value.charAt(index + 1) === marker && (!pedantic || !whitespace(prev))) {
      character = value.charAt(index + 2);
      if (character !== marker) {
        if (!trim(queue)) {
          return;
        }

        /* istanbul ignore if - never used (yet) */
        if (silent) {
          return true;
        }
        now = eat.now();
        now.column += 2;
        now.offset += 2;
        return eat(subvalue + queue + subvalue)({
          type: 'strong',
          children: self.tokenizeInline(queue, now)
        });
      }
    }
    if (!pedantic && character === '\\') {
      queue += character;
      character = value.charAt(++index);
    }
    queue += character;
    index++;
  }
}

/***/ }),

/***/ "qUik":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__("U6jy");
var escapes = __webpack_require__("MQ5/");
var defaults = __webpack_require__("3+Nb");
module.exports = setOptions;
function setOptions(options) {
  var self = this;
  var current = self.options;
  var key;
  var value;
  if (options == null) {
    options = {};
  } else if (typeof options === 'object') {
    options = xtend(options);
  } else {
    throw new Error('Invalid value `' + options + '` ' + 'for setting `options`');
  }
  for (key in defaults) {
    value = options[key];
    if (value == null) {
      value = current[key];
    }
    if (key !== 'blocks' && typeof value !== 'boolean' || key === 'blocks' && typeof value !== 'object') {
      throw new Error('Invalid value `' + value + '` for setting `options.' + key + '`');
    }
    options[key] = value;
  }
  self.options = options;
  self.escape = escapes(options);
  return self;
}

/***/ }),

/***/ "rUY8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = thematicBreak;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_ASTERISK = '*';
var C_UNDERSCORE = '_';
var C_DASH = '-';
var THEMATIC_BREAK_MARKER_COUNT = 3;
function thematicBreak(eat, value, silent) {
  var index = -1;
  var length = value.length + 1;
  var subvalue = '';
  var character;
  var marker;
  var markerCount;
  var queue;
  while (++index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE) {
      break;
    }
    subvalue += character;
  }
  if (character !== C_ASTERISK && character !== C_DASH && character !== C_UNDERSCORE) {
    return;
  }
  marker = character;
  subvalue += character;
  markerCount = 1;
  queue = '';
  while (++index < length) {
    character = value.charAt(index);
    if (character === marker) {
      markerCount++;
      subvalue += queue + marker;
      queue = '';
    } else if (character === C_SPACE) {
      queue += character;
    } else if (markerCount >= THEMATIC_BREAK_MARKER_COUNT && (!character || character === C_NEWLINE)) {
      subvalue += queue;
      if (silent) {
        return true;
      }
      return eat(subvalue)({
        type: 'thematicBreak'
      });
    } else {
      return;
    }
  }
}

/***/ }),

/***/ "soWj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("RsFJ");
var interrupt = __webpack_require__("cmLN");
module.exports = blockquote;
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_GT = '>';

/* Tokenise a blockquote. */
function blockquote(eat, value, silent) {
  var self = this;
  var offsets = self.offset;
  var tokenizers = self.blockTokenizers;
  var interruptors = self.interruptBlockquote;
  var now = eat.now();
  var currentLine = now.line;
  var length = value.length;
  var values = [];
  var contents = [];
  var indents = [];
  var add;
  var index = 0;
  var character;
  var rest;
  var nextIndex;
  var content;
  var line;
  var startIndex;
  var prefixed;
  var exit;
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      break;
    }
    index++;
  }
  if (value.charAt(index) !== C_GT) {
    return;
  }
  if (silent) {
    return true;
  }
  index = 0;
  while (index < length) {
    nextIndex = value.indexOf(C_NEWLINE, index);
    startIndex = index;
    prefixed = false;
    if (nextIndex === -1) {
      nextIndex = length;
    }
    while (index < length) {
      character = value.charAt(index);
      if (character !== C_SPACE && character !== C_TAB) {
        break;
      }
      index++;
    }
    if (value.charAt(index) === C_GT) {
      index++;
      prefixed = true;
      if (value.charAt(index) === C_SPACE) {
        index++;
      }
    } else {
      index = startIndex;
    }
    content = value.slice(index, nextIndex);
    if (!prefixed && !trim(content)) {
      index = startIndex;
      break;
    }
    if (!prefixed) {
      rest = value.slice(index);

      /* Check if the following code contains a possible
       * block. */
      if (interrupt(interruptors, tokenizers, self, [eat, rest, true])) {
        break;
      }
    }
    line = startIndex === index ? content : value.slice(startIndex, nextIndex);
    indents.push(index - startIndex);
    values.push(line);
    contents.push(content);
    index = nextIndex + 1;
  }
  index = -1;
  length = indents.length;
  add = eat(values.join(C_NEWLINE));
  while (++index < length) {
    offsets[currentLine] = (offsets[currentLine] || 0) + indents[index];
    currentLine++;
  }
  exit = self.enterBlock();
  contents = self.tokenizeBlock(contents.join(C_NEWLINE), now);
  exit();
  return add({
    type: 'blockquote',
    children: contents
  });
}

/***/ }),

/***/ "tvOo":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var openCloseTag = __webpack_require__("1T8B").openCloseTag;
module.exports = blockHTML;
var C_TAB = '\t';
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_LT = '<';
function blockHTML(eat, value, silent) {
  var self = this;
  var blocks = self.options.blocks;
  var length = value.length;
  var index = 0;
  var next;
  var line;
  var offset;
  var character;
  var count;
  var sequence;
  var subvalue;
  var sequences = [[/^<(script|pre|style)(?=(\s|>|$))/i, /<\/(script|pre|style)>/i, true], [/^<!--/, /-->/, true], [/^<\?/, /\?>/, true], [/^<![A-Za-z]/, />/, true], [/^<!\[CDATA\[/, /\]\]>/, true], [new RegExp('^</?(' + blocks.join('|') + ')(?=(\\s|/?>|$))', 'i'), /^$/, true], [new RegExp(openCloseTag.source + '\\s*$'), /^$/, false]];

  /* Eat initial spacing. */
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE) {
      break;
    }
    index++;
  }
  if (value.charAt(index) !== C_LT) {
    return;
  }
  next = value.indexOf(C_NEWLINE, index + 1);
  next = next === -1 ? length : next;
  line = value.slice(index, next);
  offset = -1;
  count = sequences.length;
  while (++offset < count) {
    if (sequences[offset][0].test(line)) {
      sequence = sequences[offset];
      break;
    }
  }
  if (!sequence) {
    return;
  }
  if (silent) {
    return sequence[2];
  }
  index = next;
  if (!sequence[1].test(line)) {
    while (index < length) {
      next = value.indexOf(C_NEWLINE, index + 1);
      next = next === -1 ? length : next;
      line = value.slice(index + 1, next);
      if (sequence[1].test(line)) {
        if (line) {
          index = next;
        }
        break;
      }
      index = next;
    }
  }
  subvalue = value.slice(0, index);
  return eat(subvalue)({
    type: 'html',
    value: subvalue
  });
}

/***/ }),

/***/ "u3i/":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var visit = __webpack_require__("ZkSf");
exports.ofType = function (types, mode) {
  return function (node) {
    types.forEach(function (type) {
      return visit(node, type, disallow, true);
    });
    return node;
  };
  function disallow(node, index, parent) {
    if (parent) {
      untangle(node, index, parent, mode);
    }
  }
};
exports.ifNotMatch = function (allowNode, mode) {
  return function (node) {
    visit(node, disallow, true);
    return node;
  };
  function disallow(node, index, parent) {
    if (parent && !allowNode(node, index, parent)) {
      untangle(node, index, parent, mode);
    }
  }
};
function untangle(node, index, parent, mode) {
  if (mode === 'remove') {
    parent.children.splice(index, 1);
  } else if (mode === 'unwrap') {
    var args = [index, 1];
    if (node.children) {
      args = args.concat(node.children);
    }
    Array.prototype.splice.apply(parent.children, args);
  }
}

/***/ }),

/***/ "uuyv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var whitespace = __webpack_require__("IPAr");
var normalize = __webpack_require__("d+Jj");
module.exports = definition;
definition.notInList = true;
definition.notInBlock = true;
var C_DOUBLE_QUOTE = '"';
var C_SINGLE_QUOTE = '\'';
var C_BACKSLASH = '\\';
var C_NEWLINE = '\n';
var C_TAB = '\t';
var C_SPACE = ' ';
var C_BRACKET_OPEN = '[';
var C_BRACKET_CLOSE = ']';
var C_PAREN_OPEN = '(';
var C_PAREN_CLOSE = ')';
var C_COLON = ':';
var C_LT = '<';
var C_GT = '>';
function definition(eat, value, silent) {
  var self = this;
  var commonmark = self.options.commonmark;
  var index = 0;
  var length = value.length;
  var subvalue = '';
  var beforeURL;
  var beforeTitle;
  var queue;
  var character;
  var test;
  var identifier;
  var url;
  var title;
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_SPACE && character !== C_TAB) {
      break;
    }
    subvalue += character;
    index++;
  }
  character = value.charAt(index);
  if (character !== C_BRACKET_OPEN) {
    return;
  }
  index++;
  subvalue += character;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character === C_BRACKET_CLOSE) {
      break;
    } else if (character === C_BACKSLASH) {
      queue += character;
      index++;
      character = value.charAt(index);
    }
    queue += character;
    index++;
  }
  if (!queue || value.charAt(index) !== C_BRACKET_CLOSE || value.charAt(index + 1) !== C_COLON) {
    return;
  }
  identifier = queue;
  subvalue += queue + C_BRACKET_CLOSE + C_COLON;
  index = subvalue.length;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE && character !== C_NEWLINE) {
      break;
    }
    subvalue += character;
    index++;
  }
  character = value.charAt(index);
  queue = '';
  beforeURL = subvalue;
  if (character === C_LT) {
    index++;
    while (index < length) {
      character = value.charAt(index);
      if (!isEnclosedURLCharacter(character)) {
        break;
      }
      queue += character;
      index++;
    }
    character = value.charAt(index);
    if (character === isEnclosedURLCharacter.delimiter) {
      subvalue += C_LT + queue + character;
      index++;
    } else {
      if (commonmark) {
        return;
      }
      index -= queue.length + 1;
      queue = '';
    }
  }
  if (!queue) {
    while (index < length) {
      character = value.charAt(index);
      if (!isUnclosedURLCharacter(character)) {
        break;
      }
      queue += character;
      index++;
    }
    subvalue += queue;
  }
  if (!queue) {
    return;
  }
  url = queue;
  queue = '';
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE && character !== C_NEWLINE) {
      break;
    }
    queue += character;
    index++;
  }
  character = value.charAt(index);
  test = null;
  if (character === C_DOUBLE_QUOTE) {
    test = C_DOUBLE_QUOTE;
  } else if (character === C_SINGLE_QUOTE) {
    test = C_SINGLE_QUOTE;
  } else if (character === C_PAREN_OPEN) {
    test = C_PAREN_CLOSE;
  }
  if (!test) {
    queue = '';
    index = subvalue.length;
  } else if (queue) {
    subvalue += queue + character;
    index = subvalue.length;
    queue = '';
    while (index < length) {
      character = value.charAt(index);
      if (character === test) {
        break;
      }
      if (character === C_NEWLINE) {
        index++;
        character = value.charAt(index);
        if (character === C_NEWLINE || character === test) {
          return;
        }
        queue += C_NEWLINE;
      }
      queue += character;
      index++;
    }
    character = value.charAt(index);
    if (character !== test) {
      return;
    }
    beforeTitle = subvalue;
    subvalue += queue + character;
    index++;
    title = queue;
    queue = '';
  } else {
    return;
  }
  while (index < length) {
    character = value.charAt(index);
    if (character !== C_TAB && character !== C_SPACE) {
      break;
    }
    subvalue += character;
    index++;
  }
  character = value.charAt(index);
  if (!character || character === C_NEWLINE) {
    if (silent) {
      return true;
    }
    beforeURL = eat(beforeURL).test().end;
    url = self.decode.raw(self.unescape(url), beforeURL, {
      nonTerminated: false
    });
    if (title) {
      beforeTitle = eat(beforeTitle).test().end;
      title = self.decode.raw(self.unescape(title), beforeTitle);
    }
    return eat(subvalue)({
      type: 'definition',
      identifier: normalize(identifier),
      title: title || null,
      url: url
    });
  }
}

/* Check if `character` can be inside an enclosed URI. */
function isEnclosedURLCharacter(character) {
  return character !== C_GT && character !== C_BRACKET_OPEN && character !== C_BRACKET_CLOSE;
}
isEnclosedURLCharacter.delimiter = C_GT;

/* Check if `character` can be inside an unclosed URI. */
function isUnclosedURLCharacter(character) {
  return character !== C_BRACKET_OPEN && character !== C_BRACKET_CLOSE && !whitespace(character);
}

/***/ }),

/***/ "uzq8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = visitParents;
var convert = __webpack_require__("mFtL");
var CONTINUE = true;
var SKIP = 'skip';
var EXIT = false;
visitParents.CONTINUE = CONTINUE;
visitParents.SKIP = SKIP;
visitParents.EXIT = EXIT;
function visitParents(tree, test, visitor, reverse) {
  var is;
  if (typeof test === 'function' && typeof visitor !== 'function') {
    reverse = visitor;
    visitor = test;
    test = null;
  }
  is = convert(test);
  one(tree, null, []);

  // Visit a single node.
  function one(node, index, parents) {
    var result = [];
    var subresult;
    if (!test || is(node, index, parents[parents.length - 1] || null)) {
      result = toResult(visitor(node, parents));
      if (result[0] === EXIT) {
        return result;
      }
    }
    if (node.children && result[0] !== SKIP) {
      subresult = toResult(all(node.children, parents.concat(node)));
      return subresult[0] === EXIT ? subresult : result;
    }
    return result;
  }

  // Visit children in `parent`.
  function all(children, parents) {
    var min = -1;
    var step = reverse ? -1 : 1;
    var index = (reverse ? children.length : min) + step;
    var result;
    while (index > min && index < children.length) {
      result = one(children[index], index, parents);
      if (result[0] === EXIT) {
        return result;
      }
      index = typeof result[1] === 'number' ? result[1] : index + step;
    }
  }
}
function toResult(value) {
  if (value !== null && typeof value === 'object' && 'length' in value) {
    return value;
  }
  if (typeof value === 'number') {
    return [CONTINUE, value];
  }
  return [value];
}

/***/ }),

/***/ "v0oL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var unherit = __webpack_require__("5t69");
var xtend = __webpack_require__("U6jy");
var Parser = __webpack_require__("JWB8");
module.exports = parse;
parse.Parser = Parser;
function parse(options) {
  var Local = unherit(Parser);
  Local.prototype.options = xtend(Local.prototype.options, this.data('settings'), options);
  this.Parser = Local;
}

/***/ }),

/***/ "vPdy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = indentation;

/* Map of characters, and their column length,
 * which can be used as indentation. */
var characters = {
  ' ': 1,
  '\t': 4
};

/* Gets indentation information for a line. */
function indentation(value) {
  var index = 0;
  var indent = 0;
  var character = value.charAt(index);
  var stops = {};
  var size;
  while (character in characters) {
    size = characters[character];
    indent += size;
    if (size > 1) {
      indent = Math.floor(indent / size) * size;
    }
    stops[indent] = index;
    character = value.charAt(++index);
  }
  return {
    indent: indent,
    stops: stops
  };
}

/***/ }),

/***/ "vvrU":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trim = __webpack_require__("RsFJ");
var repeat = __webpack_require__("RjOF");
var getIndent = __webpack_require__("vPdy");
module.exports = indentation;
var C_SPACE = ' ';
var C_NEWLINE = '\n';
var C_TAB = '\t';

/* Remove the minimum indent from every line in `value`.
 * Supports both tab, spaced, and mixed indentation (as
 * well as possible). */
function indentation(value, maximum) {
  var values = value.split(C_NEWLINE);
  var position = values.length + 1;
  var minIndent = Infinity;
  var matrix = [];
  var index;
  var indentation;
  var stops;
  var padding;
  values.unshift(repeat(C_SPACE, maximum) + '!');
  while (position--) {
    indentation = getIndent(values[position]);
    matrix[position] = indentation.stops;
    if (trim(values[position]).length === 0) {
      continue;
    }
    if (indentation.indent) {
      if (indentation.indent > 0 && indentation.indent < minIndent) {
        minIndent = indentation.indent;
      }
    } else {
      minIndent = Infinity;
      break;
    }
  }
  if (minIndent !== Infinity) {
    position = values.length;
    while (position--) {
      stops = matrix[position];
      index = minIndent;
      while (index && !(index in stops)) {
        index--;
      }
      if (trim(values[position]).length !== 0 && minIndent && index !== minIndent) {
        padding = C_TAB;
      } else {
        padding = '';
      }
      values[position] = padding + values[position].slice(index in stops ? stops[index] + 1 : 0);
    }
  }
  values.shift();
  return values.join(C_NEWLINE);
}

/***/ }),

/***/ "wnOJ":
/***/ (function(module, exports, __webpack_require__) {

var visitWithParents = __webpack_require__("UfUV");
function addListMetadata() {
  return function (ast) {
    visitWithParents(ast, 'list', function (listNode, parents) {
      var depth = 0,
        i,
        n;
      for (i = 0, n = parents.length; i < n; i++) {
        if (parents[i].type === 'list') depth += 1;
      }
      for (i = 0, n = listNode.children.length; i < n; i++) {
        var child = listNode.children[i];
        child.index = i;
        child.ordered = listNode.ordered;
      }
      listNode.depth = depth;
    });
    return ast;
  };
}
module.exports = addListMetadata;

/***/ }),

/***/ "xkQk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var wrap = __webpack_require__("EBzq");
module.exports = trough;
trough.wrap = wrap;
var slice = [].slice;

// Create new middleware.
function trough() {
  var fns = [];
  var middleware = {};
  middleware.run = run;
  middleware.use = use;
  return middleware;

  // Run `fns`.  Last argument must be a completion handler.
  function run() {
    var index = -1;
    var input = slice.call(arguments, 0, -1);
    var done = arguments[arguments.length - 1];
    if (typeof done !== 'function') {
      throw new Error('Expected function as last argument, not ' + done);
    }
    next.apply(null, [null].concat(input));

    // Run the next `fn`, if any.
    function next(err) {
      var fn = fns[++index];
      var params = slice.call(arguments, 0);
      var values = params.slice(1);
      var length = input.length;
      var pos = -1;
      if (err) {
        done(err);
        return;
      }

      // Copy non-nully input into values.
      while (++pos < length) {
        if (values[pos] === null || values[pos] === undefined) {
          values[pos] = input[pos];
        }
      }
      input = values;

      // Next or done.
      if (fn) {
        wrap(fn, next).apply(null, input);
      } else {
        done.apply(null, [null].concat(input));
      }
    }
  }

  // Add `fn` to the list.
  function use(fn) {
    if (typeof fn !== 'function') {
      throw new Error('Expected `fn` to be a function, not ' + fn);
    }
    fns.push(fn);
    return middleware;
  }
}

/***/ }),

/***/ "xm6i":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var VMessage = __webpack_require__("9J5K");
var VFile = __webpack_require__("ys5Y");
module.exports = VFile;
var proto = VFile.prototype;
proto.message = message;
proto.info = info;
proto.fail = fail;

/* Slight backwards compatibility.  Remove in the future. */
proto.warn = message;

/* Create a message with `reason` at `position`.
 * When an error is passed in as `reason`, copies the stack. */
function message(reason, position, origin) {
  var filePath = this.path;
  var message = new VMessage(reason, position, origin);
  if (filePath) {
    message.name = filePath + ':' + message.name;
    message.file = filePath;
  }
  message.fatal = false;
  this.messages.push(message);
  return message;
}

/* Fail. Creates a vmessage, associates it with the file,
 * and throws it. */
function fail() {
  var message = this.message.apply(this, arguments);
  message.fatal = true;
  throw message;
}

/* Info. Creates a vmessage, associates it with the file,
 * and marks the fatality as null. */
function info() {
  var message = this.message.apply(this, arguments);
  message.fatal = null;
  return message;
}

/***/ }),

/***/ "ys5Y":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var path = __webpack_require__("33yf");
var replace = __webpack_require__("48q5");
var buffer = __webpack_require__("BEtg");
module.exports = VFile;
var own = {}.hasOwnProperty;
var proto = VFile.prototype;
proto.toString = toString;

/* Order of setting (least specific to most), we need this because
 * otherwise `{stem: 'a', path: '~/b.js'}` would throw, as a path
 * is needed before a stem can be set. */
var order = ['history', 'path', 'basename', 'stem', 'extname', 'dirname'];

/* Construct a new file. */
function VFile(options) {
  var prop;
  var index;
  var length;
  if (!options) {
    options = {};
  } else if (typeof options === 'string' || buffer(options)) {
    options = {
      contents: options
    };
  } else if ('message' in options && 'messages' in options) {
    return options;
  }
  if (!(this instanceof VFile)) {
    return new VFile(options);
  }
  this.data = {};
  this.messages = [];
  this.history = [];
  this.cwd = process.cwd();

  /* Set path related properties in the correct order. */
  index = -1;
  length = order.length;
  while (++index < length) {
    prop = order[index];
    if (own.call(options, prop)) {
      this[prop] = options[prop];
    }
  }

  /* Set non-path related properties. */
  for (prop in options) {
    if (order.indexOf(prop) === -1) {
      this[prop] = options[prop];
    }
  }
}

/* Access full path (`~/index.min.js`). */
Object.defineProperty(proto, 'path', {
  get: function () {
    return this.history[this.history.length - 1];
  },
  set: function (path) {
    assertNonEmpty(path, 'path');
    if (path !== this.path) {
      this.history.push(path);
    }
  }
});

/* Access parent path (`~`). */
Object.defineProperty(proto, 'dirname', {
  get: function () {
    return typeof this.path === 'string' ? path.dirname(this.path) : undefined;
  },
  set: function (dirname) {
    assertPath(this.path, 'dirname');
    this.path = path.join(dirname || '', this.basename);
  }
});

/* Access basename (`index.min.js`). */
Object.defineProperty(proto, 'basename', {
  get: function () {
    return typeof this.path === 'string' ? path.basename(this.path) : undefined;
  },
  set: function (basename) {
    assertNonEmpty(basename, 'basename');
    assertPart(basename, 'basename');
    this.path = path.join(this.dirname || '', basename);
  }
});

/* Access extname (`.js`). */
Object.defineProperty(proto, 'extname', {
  get: function () {
    return typeof this.path === 'string' ? path.extname(this.path) : undefined;
  },
  set: function (extname) {
    var ext = extname || '';
    assertPart(ext, 'extname');
    assertPath(this.path, 'extname');
    if (ext) {
      if (ext.charAt(0) !== '.') {
        throw new Error('`extname` must start with `.`');
      }
      if (ext.indexOf('.', 1) !== -1) {
        throw new Error('`extname` cannot contain multiple dots');
      }
    }
    this.path = replace(this.path, ext);
  }
});

/* Access stem (`index.min`). */
Object.defineProperty(proto, 'stem', {
  get: function () {
    return typeof this.path === 'string' ? path.basename(this.path, this.extname) : undefined;
  },
  set: function (stem) {
    assertNonEmpty(stem, 'stem');
    assertPart(stem, 'stem');
    this.path = path.join(this.dirname || '', stem + (this.extname || ''));
  }
});

/* Get the value of the file. */
function toString(encoding) {
  var value = this.contents || '';
  return buffer(value) ? value.toString(encoding) : String(value);
}

/* Assert that `part` is not a path (i.e., does
 * not contain `path.sep`). */
function assertPart(part, name) {
  if (part.indexOf(path.sep) !== -1) {
    throw new Error('`' + name + '` cannot be a path: did not expect `' + path.sep + '`');
  }
}

/* Assert that `part` is not empty. */
function assertNonEmpty(part, name) {
  if (!part) {
    throw new Error('`' + name + '` cannot be empty');
  }
}

/* Assert `path` exists. */
function assertPath(path, name) {
  if (!path) {
    throw new Error('Setting `' + name + '` requires `path` to be set too');
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("8oxB")))

/***/ })

}]);
//# sourceMappingURL=202239b74ad4bb5a1e10e9676b1ad237a0a4902b-8664dc79cca6e7d4f222.js.map