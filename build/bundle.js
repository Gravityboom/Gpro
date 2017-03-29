/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = window.React;

/***/ }),
/* 1 */
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
function defaultClearTimeout () {
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
} ())
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
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
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
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
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
    while(len) {
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = window.ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = window.ReactRouter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
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

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
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

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
			return classNames;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {
		window.classNames = classNames;
	}
}());


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _fastclick = __webpack_require__(36);

var _fastclick2 = _interopRequireDefault(_fastclick);

var _reactTapEventPlugin = __webpack_require__(83);

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by Ellery1 on 16/7/8.
 */
if (!window.___yoTapEventInjected) {
    // 不要觉得这里没用
    // 因为yo-router也用了tap-event-plugin，如果不加try catch会报引用两次tap-event-plugin的警告
    try {
        (0, _reactTapEventPlugin2.default)();
    } catch (e) {}

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        _fastclick2.default.attach(document.body);
    }

    document.addEventListener('DOMContentLoaded', function () {
        _fastclick2.default.attach(document.body);
    });
    document.body.addEventListener('touchmove', function (evt) {
        evt.preventDefault();
    });
    window.___yoTapEventInjected = true;
}

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "tapEventPluginInit.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.getArrayByLength = getArrayByLength;
exports.shallowEqual = shallowEqual;
exports.getElementOffsetY = getElementOffsetY;
exports.inheritProps = inheritProps;
function getArrayByLength(length) {
    var ret = [];
    for (var i = 0; i < length; i++) {
        ret[i] = null;
    }
    return ret;
}

function is(x, y) {
    var ret = void 0;
    if (x === y) {
        ret = x !== 0 || y !== 0 || 1 / x === 1 / y;
    } else {
        // return x !== x && y !== y;
        ret = isNaN(x) && isNaN(y);
    }

    return ret;
}

function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== 'object' || objA === null || (typeof objB === 'undefined' ? 'undefined' : _typeof(objB)) !== 'object' || objB === null) {
        return false;
    }

    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    for (var i = 0; i < keysA.length; i++) {
        if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
            return false;
        }
    }

    return true;
}

function getElementOffsetY(ele, parent) {
    var y = 0;
    while (ele !== parent && ele !== null) {
        y += ele.offsetTop;
        ele = ele.offsetParent;
    }
    return y;
}

var DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT = exports.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT = 250;

function inheritProps(props, attrs) {
    return attrs.reduce(function (ret, attr) {
        ret[attr] = props[attr];
        return ret;
    }, {});
}

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "util.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */


/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = __webpack_require__(43);

var _utils2 = _interopRequireDefault(_utils);

var _util = __webpack_require__(7);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _lazyimage = __webpack_require__(15);

var _lazyimage2 = _interopRequireDefault(_lazyimage);

var _sticky = __webpack_require__(44);

var _sticky2 = _interopRequireDefault(_sticky);

__webpack_require__(88);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 滚动组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Scroller
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 滚动组件,用来提供滚动容器。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了横向滚动和纵向滚动。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了『下拉刷新』和『加载更多』功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了 `transition` 和 `requestAnimationFrame` 两种实现滚动的方式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 提供了 `transform` 和 `position:absolute` 两种实现位移的方式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 确定高度：Scroller 必须有一个确定的高度才能正常工作，因为它实际上就是将一系列不确定高度的子组件装进一个确定高度的容器。实现确定高度的方式有很多种：flex、指定高度、position: absolute等等。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 内容容器：作为一个滚动组件，Scroller 会创建一个 div 作为滚动容器。如果 Scroller 的子元素只有一个，则会把这个子元素当做内容容器；否则，会创建一个 div 作为内容容器。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/basic.md}{instruUrl: scroller/base.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/refresh.md}{instruUrl: scroller/refresh.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./scroller/scrollevent.md}{instruUrl: scroller/scroll.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// TODO: 干掉各种 magic number！！！


var REFRESHSTATUS = {
    PULL: 'pullrefresh_pull',
    RELEASE: 'pullrefresh_release',
    LOAD: 'pullrefresh_load',
    SUCCESS: 'pullrefresh_success',
    FAIL: 'pullrefresh_fail'
};
var LOADSTATUS = {
    PULL: 'loadmore_pull',
    RELEASE: 'loadmore_release',
    LOAD: 'loadmore_load',
    NOMORE: 'loadmore_nomore'
};

var _utils$getRAF = _utils2.default.getRAF(),
    rAF = _utils$getRAF.rAF,
    cancelrAF = _utils$getRAF.cancelrAF;

var defaultProps = {
    extraClass: '',
    containerExtraClass: '',
    containerExtraStyle: {},
    contentOffset: {
        x: 0,
        y: 0
    },
    disabled: false,
    scrollX: false,
    scrollY: true,
    freeScroll: false,
    directionLockThreshold: 5, // 锁定某一滚动方向的阀值
    momentum: true, // 惯性滚动
    bounce: true, // 弹性滚动
    bounceTime: 600, // 弹性滚动时间
    bounceEasing: _utils2.default.ease.circular, // 弹性滚动easing函数
    preventDefault: true, // 阻止默认事件
    preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ }, // 阻止默认事件的例外
    stopPropagation: false, // 阻止冒泡
    HWCompositing: true, // 是否开启硬件加速
    useTransition: true,
    useTransform: true,
    onScroll: null, // 滚动事件的回调
    usePullRefresh: false,
    pullRefreshHeight: 40,
    renderPullRefresh: null,
    onRefresh: null,
    useLoadMore: false,
    loadMoreHeight: 40,
    renderLoadMore: null,
    onLoad: null,
    autoRefresh: true,
    wrapper: null,
    enableLazyLoad: true,
    scrollWithouTouchStart: false,
    stickyOffset: 0
};

var propTypes = {
    /**
     * 组件额外class
     *
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     * @default ''
     */
    extraClass: _react.PropTypes.string,
    /**
     * 内容容器额外class
     *
     * @property containerExtraClass
     * @type String
     * @description 为组件中的内容容器提供额外的class。
     * @default ''
     */
    containerExtraClass: _react.PropTypes.string,
    /**
     * 内容容器额外style
     *
     * @property containerExtraStyle
     * @type String
     * @description 为组件中的内容容器提供额外的style，主要用于横向滚动时，动态设置容器的宽度。
     * @default {}
     * @version 3.0.6
     */
    containerExtraStyle: _react.PropTypes.object,
    /**
     * 内容位移
     *
     * @property contentOffset
     * @type {x: Number, y: Mumber}
     * @description 组件中内容的初始位移，这个属性变化时，会重置内容的位移。
     * @default {x: 0, y: 0}
     */
    contentOffset: _react.PropTypes.shape({
        x: _react.PropTypes.number,
        y: _react.PropTypes.number
    }),
    /**
     * @property stickyOffset
     * @type Number
     * @description 吸顶容器偏移，如果你希望吸顶容器不位于top:0的位置，可以修改这个属性。
     * @default 0
     * @version 3.0.6
     */
    stickyOffset: _react.PropTypes.number,
    /**
     * 是否禁止滚动
     *
     * @property disabled
     * @type Bool
     * @description 是否禁止滚动，默认允许滚动。
     * @default false
     */
    disabled: _react.PropTypes.bool,
    /**
     * 横向滚动
     *
     * @property scrollX
     * @type Bool
     * @description 是否开启横向滚动，默认关闭。
     * @default false
     */
    scrollX: _react.PropTypes.bool,
    /**
     * 纵向滚动
     *
     * @property scrollY
     * @type Bool
     * @description 是否开启纵向滚动,默认开启。
     * @default true
     */
    scrollY: _react.PropTypes.bool,
    /**
     * 自由滚动
     *
     * @property freeScroll
     * @type Bool
     * @description 是否开启自由滚动。当设置为 `false` 时，只能响应某一个方向的滚动；当设置为 `true` 时，可以同时响应横向和纵向滚动（`scrollX` 和 `scrollY` 必须同时为 `true`）。
     * @default false
     * @skip
     */
    freeScroll: _react.PropTypes.bool,
    /**
     * 方向锁定阈值
     *
     * @property directionLockThreshold
     * @type Number
     * @description 只允许单向滚动的时候，会根据这个阀值来判定响应哪个方向上的位移：某一方向位移减去另一个方向位移超过阀值，就会判定为这个方向的滚动。
     * @default 5
     */
    directionLockThreshold: _react.PropTypes.number,
    /**
     * 惯性滚动
     *
     * @property momentum
     * @type Bool
     * @description 是否允许惯性滚动。当设置为 `true`，手指离开时，如果还有速度会继续滚动一段距离；当设置为 `false` ，手指离开时会立即停止滚动。
     * @default true
     */
    momentum: _react.PropTypes.bool,
    /**
     * 弹性滚动
     *
     * @property bounce
     * @type Bool
     * @description 当滚动超出内容范围时，是否可以继续滚动一截。
     * @default true
     */
    bounce: _react.PropTypes.bool,
    /**
     * 弹性滚动回弹时间
     *
     * @property bounceTime
     * @type Number
     * @description 当弹性滚动一截之后，回到滚动范围内位置的时间，单位为毫秒（ms）。
     * @default 600
     */
    bounceTime: _react.PropTypes.number,
    /**
     * 弹性滚动回弹动画
     *
     * @property bounceEasing
     * @type Object
     * @description 弹性回滚动画。
     *
     * Scroller 提供了五种默认的动画函数：`quadratic`, `circular`, `back`, `bounce`, `elastic`，可以通过 `Scroller.ease.xxx` 来使用。
     *
     * 用户也可以自定义动画对象，比如：
     *
     * ``
     * {
     *     style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
     *     fn: function (k) {
     *         return k * ( 2 - k );
     *     }
     * }
     * ``
     * @default Scroller.ease.circular
     */
    bounceEasing: _react.PropTypes.object,
    /**
     * transition开关
     *
     * @property useTransition
     * @type Bool
     * @description 如果设置为true,会使用transition来实现滚动效果;如果设置为false,会使用requestAnimationFrame来实现。
     * @default true
     */
    useTransition: _react.PropTypes.bool,
    /**
     * transform开关
     *
     * @property useTransform
     * @type Bool
     * @description 如果设置为true,会使用transform来实现位移;如果设置为false,会使用left和top来实现位移（position: absolute）。
     * @default true
     */
    useTransform: _react.PropTypes.bool,
    /**
     * 滚动事件回调
     *
     * @property onScroll
     * @type Function
     * @param {e} event 滚动事件的回调，结构为: {contentOffset: {x: x, y: y}}
     * @description (event) => void
     *
     * 滚动事件的回调。一旦设置了这个回调，为了能够监听滚动事件，会将useTransition属性强制设置为false，会由此带来一定的性能牺牲。
     */
    onScroll: _react.PropTypes.func,
    /**
     * 自动刷新高度
     *
     * @property autoRefresh
     * @type Bool
     * @description 默认为true,在componentDidUpdate的时候会自动刷新高度;如果设置为false,则在内容发生变化时，需要用户主动调用refresh方法来刷新高度。
     * @default true
     * @skip
     */
    autoRefresh: _react.PropTypes.bool,
    /**
     * 硬件加速
     *
     * @property HWCompositing
     * @type Bool
     * @description 是否开启硬件加速
     * @default true
     */
    HWCompositing: _react.PropTypes.bool,
    eventPassthrough: _react.PropTypes.bool,
    preventDefault: _react.PropTypes.bool,
    preventDefaultException: _react.PropTypes.object,
    stopPropagation: _react.PropTypes.bool,
    /**
     * 下拉刷新
     *
     * @property usePullRefresh
     * @type Bool
     * @description 是否开启下拉刷新功能
     * @default false
     * hasPullRefresh
     */
    usePullRefresh: _react.PropTypes.bool,
    /**
     * 下拉刷新事件回调
     *
     * @property onRefresh
     * @type Function
     * @param {e} event 结构为: ({contentOffset: {x: x, y: y}})
     * @description (event) => void
     *
     * 下拉刷新时开始刷新的回调。
     */
    onRefresh: _react.PropTypes.func,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type Number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）
     * @default 40
     * 可以考虑不要
     */
    pullRefreshHeight: _react.PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type Function
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数
     */
    renderPullRefresh: _react.PropTypes.func,
    /**
     * 加载更多
     *
     * @property useLoadMore
     * @type Bool
     * @description 是否开启加载更多功能.『加载更多』与『下拉刷新』略有不同，加载更多的提示区域是追加在内容区域的最后
     * @default false
     * hasLoadMore
     */
    useLoadMore: _react.PropTypes.bool,
    /**
     * 加载更多事件回调
     *
     * @property onLoad
     * @type Function
     * @param {e} event 结构为: ({contentOffset: {x: x, y: y}})
     * @description (event) => void
     *
     * 加载更多时开始加载的回调。
     */
    onLoad: _react.PropTypes.func,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type Number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）
     * @default 40
     */
    loadMoreHeight: _react.PropTypes.number,
    /**
     * 加载更多渲染函数
     *
     * @property renderLoadMore
     * @type Function
     * @returns {JSX} 用来渲染 loadMore 的 JSX
     * @description () => JSX
     *
     * 自定义的加载更多渲染函数
     */
    renderLoadMore: _react.PropTypes.func,
    deceleration: _react.PropTypes.number,
    wrapper: _react.PropTypes.object,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string]),
    style: _react.PropTypes.object,
    /**
     * @skip
     * @property enableLazyLoad
     * @type Bool
     * @description 是否开启图片lazyload,默认为true
     */
    enableLazyLoad: _react.PropTypes.bool,
    /**
     * @property scrollWithoutTouchStart
     * @type Bool
     * @default false
     * @description ** 实验中的属性 **
     * 在默认情况下一次用户触发（非调用scrollTo方法）scroller的滚动需要由touchstart事件来启动，在某些情况下，例如scroller从disable状态切换到enable状态时，
     * 可能不能接收到这一瞬间的touchstart事件，这可能导致用户期待的滚动过程没有发生。
     * 开启这个属性为true以后将允许scroller用touchmove启动滚动过程，这可以解决上述场景的问题。
     * @version 3.0.2
     */
    scrollWithoutTouchStart: _react.PropTypes.bool
};

var Scroller = function (_Component) {
    _inherits(Scroller, _Component);

    function Scroller(props) {
        _classCallCheck(this, Scroller);

        var _this = _possibleConstructorReturn(this, (Scroller.__proto__ || Object.getPrototypeOf(Scroller)).call(this, props));

        _this.x = 0;
        _this.y = 0;
        _this.directionX = 0;
        _this.directionY = 0;
        _this._scrollerStyle = {};

        _this._resetProps(props, true);

        _this.childLazyImages = [];
        _this.stickyHeaders = [];
        _this.stickyIndex = null;
        _this.stickyOffset = null;
        _this.wrapperOffsetTop = null;
        return _this;
    }

    _createClass(Scroller, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { scroller: this, isScroller: this.props.enableLazyLoad };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            this.wrapper = this.noWrapper ? this.wrapper : this.refs.wrapper;
            this.scroller = this.refs.scroller;

            // 重置 position 属性
            if (!this.useTransform) {
                if (!/relative|absolute/i.test(this._scrollerStyle)) {
                    this._scrollerStyle.position = 'relative';
                }
            }

            this.refresh();

            this._setRefreshStatus(REFRESHSTATUS.PULL);
            this._setLoadStatus(LOADSTATUS.PULL);
            this._refreshLoadMore();

            this._resetPosition();
            this.scrollTo(this.props.contentOffset.x, this.props.contentOffset.y);

            this._resize = function () {
                _this2.forceUpdate();
            };

            window.addEventListener('orientationchange', this._resize, false);
            window.addEventListener('resize', this._resize, false);

            this._tryLoadLazyImages();
            this._refreshSticky(true);

            if (this.stickyHeaders.length) {
                this.useTransition = false;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this._resetProps(nextProps);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // 重置 contentOffset
            if (prevProps.contentOffset.x !== this.props.contentOffset.x || prevProps.contentOffset.y !== this.props.contentOffset.y) {
                this.scrollTo(this.props.contentOffset.x, this.props.contentOffset.y);
            }

            // 重置 position 属性
            if (!this.useTransform) {
                if (!/relative|absolute/i.test(this._scrollerStyle)) {
                    this._scrollerStyle.position = 'relative';
                    this._setStyle(this.scroller, this._scrollerStyle);
                }
            }

            // 重新获取容器和内容尺寸
            if (this.props.autoRefresh) {
                this.refresh();
            }

            // 重置 pullRefresh 和 loadMore
            if (prevState.usePullRefresh !== this.state.usePullRefresh) {
                this._setRefreshStatus(REFRESHSTATUS.PULL);
            }
            if (prevState.useLoadMore !== this.state.useLoadMore) {
                this._setLoadStatus(LOADSTATUS.PULL);
                this._refreshLoadMore();
            }

            if (this.stickyHeaders.length) {
                this.useTransition = false;
            }

            this._tryLoadLazyImages();
            this._refreshSticky(true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener('orientationchange', this._resize, false);
            window.removeEventListener('resize', this._resize, false);
        }
    }, {
        key: '_resetProps',
        value: function _resetProps(props, init) {
            this.state = this.state || {};

            // 重置 useTransition 和 useTransform
            this.translateZ = props.HWCompositing && _utils2.default.hasPerspective ? ' translateZ(0)' : '';
            this.useTransition = _utils2.default.hasTransition && props.useTransition;
            this.useTransform = _utils2.default.hasTransform && props.useTransform;

            if (props.onScroll) {
                this.useTransition = false;
            }

            // 重置 scrollX 和 scrollY
            this.eventPassthrough = props.eventPassthrough === true ? 'vertical' : props.eventPassthrough;
            this.preventDefault = !this.eventPassthrough && props.preventDefault;
            this.scrollY = this.eventPassthrough === 'vertical' ? false : props.scrollY;
            this.scrollX = this.eventPassthrough === 'horizontal' ? false : props.scrollX;
            this.verticalBounce = this.scrollY ? props.bounce : false;
            this.horizontalBounce = this.scrollX ? props.bounce : false;

            // 重置 下拉刷新 和 加载更多
            if (init) {
                this.state.usePullRefresh = this.scrollY && !this.scrollX && props.usePullRefresh;
                this.state.useLoadMore = this.scrollY && !this.scrollX && props.useLoadMore;
            } else {
                this.setState({
                    usePullRefresh: this.scrollY && !this.scrollX && props.usePullRefresh,
                    useLoadMore: this.scrollY && !this.scrollX && props.useLoadMore
                });
            }

            // 重置 wrapper（内容容器）
            this.noWrapper = !!props.wrapper && props.children && !props.children.length && !this.state.usePullRefresh && !this.state.useLoadMore;
            if (this.noWrapper) {
                this.wrapper = props.wrapper;
            }

            // 如果disable状态发生了变化，需要重置initiated
            if (this.disabled !== props.disabled) {
                this.initiated = 0;
            }
            // 重置 disabled
            this.disabled = props.disabled;
            this.freeScroll = props.freeScroll && !this.eventPassthrough;
            this.directionLockThreshold = this.eventPassthrough ? 0 : props.directionLockThreshold;
        }
    }, {
        key: '_handleTouchStart',
        value: function _handleTouchStart(e) {
            if (this.disabled || this.initiated && _utils2.default.eventType[e.type] !== this.initiated) {
                return;
            }

            if (this.preventDefault && !_utils2.default.isBadAndroid && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }
            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var point = e.touches ? e.touches[0] : e;

            this.initiated = _utils2.default.eventType[e.type];
            this.moved = false;
            this.distX = 0;
            this.distY = 0;
            this.directionX = 0;
            this.directionY = 0;
            this.directionLocked = 0;

            this.startTime = _utils2.default.getTime();

            this.stopAnimate();

            this.startX = this.x;
            this.startY = this.y;
            this.absStartX = this.x;
            this.absStartY = this.y;
            this.pointX = point.pageX;
            this.pointY = point.pageY;

            // this._execEvent('beforeScrollStart');
        }
    }, {
        key: '_handleTouchMove',
        value: function _handleTouchMove(e) {
            if (this.disabled) {
                return;
            }

            if (_utils2.default.eventType[e.type] !== this.initiated) {
                if (this.props.scrollWithoutTouchStart) {
                    this._handleTouchStart(e);
                } else {
                    return;
                }
            }

            if (this.preventDefault) {
                // increases performance on Android? TODO: check!
                e.preventDefault();
            }

            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var point = e.touches ? e.touches[0] : e;
            var timestamp = _utils2.default.getTime();
            var deltaX = point.pageX - this.pointX;
            var deltaY = point.pageY - this.pointY;
            var newX = void 0;
            var newY = void 0;

            this.pointX = point.pageX;
            this.pointY = point.pageY;

            this.distX += deltaX;
            this.distY += deltaY;

            var absDistX = Math.abs(this.distX);
            var absDistY = Math.abs(this.distY);

            // We need to move at least 10 pixels for the scrolling to initiate
            if (timestamp - this.endTime > 300 && absDistX < 10 && absDistY < 10) {
                return;
            }

            // If you are scrolling in one direction lock the other
            if (!this.directionLocked && !this.freeScroll) {
                if (absDistX > absDistY + this.directionLockThreshold) {
                    this.directionLocked = 'h'; // lock horizontally
                } else if (absDistY >= absDistX + this.directionLockThreshold) {
                    this.directionLocked = 'v'; // lock vertically
                } else {
                    this.directionLocked = 'n'; // no lock
                }
            }

            if (this.directionLocked === 'h') {
                if (this.eventPassthrough === 'vertical') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'horizontal') {
                    this.initiated = false;
                    return;
                }

                deltaY = 0;
            } else if (this.directionLocked === 'v') {
                if (this.eventPassthrough === 'horizontal') {
                    e.preventDefault();
                } else if (this.eventPassthrough === 'vertical') {
                    this.initiated = false;
                    return;
                }

                deltaX = 0;
            }

            newX = this.x + deltaX;
            newY = this.y + deltaY;

            // Slow down if outside of the boundaries
            if (newX > 0) {
                newX = this.horizontalBounce ? this.x + deltaX / 3 : 0;
            } else if (newX < this.maxScrollX) {
                newX = this.horizontalBounce ? this.x + deltaX / 3 : this.maxScrollX;
            }

            if (newY > 0) {
                newY = this.verticalBounce ? this.y + deltaY / 3 : 0;
            } else if (newY < this.maxScrollY) {
                newY = this.verticalBounce ? this.y + deltaY / 3 : this.maxScrollY;
            }

            if (deltaX > 0) {
                this.directionX = -1;
            } else if (deltaX < 0) {
                this.directionX = 1;
            } else {
                this.directionX = 0;
            }

            if (deltaY > 0) {
                this.directionY = -1;
            } else if (deltaY < 0) {
                this.directionY = 1;
            } else {
                this.directionY = 0;
            }

            if (!this.moved) {
                this._execEvent('onScrollStart');
            }

            this.moved = true;

            this._translate(newX, newY);

            if (timestamp - this.startTime > 300) {
                this.startTime = timestamp;
                this.startX = this.x;
                this.startY = this.y;
            }

            this._execEvent('onScroll');
        }
    }, {
        key: '_handleTouchEnd',
        value: function _handleTouchEnd(e) {
            if (this.disabled || _utils2.default.eventType[e.type] !== this.initiated) {
                return;
            }

            if (this.preventDefault && !_utils2.default.preventDefaultException(e.target, this.props.preventDefaultException)) {
                e.preventDefault();
            }

            if (this.props.stopPropagation) {
                e.stopPropagation();
            }

            var momentumX = void 0;
            var momentumY = void 0;
            var duration = _utils2.default.getTime() - this.startTime;
            var newX = Math.round(this.x);
            var newY = Math.round(this.y);
            var time = 0;

            this.isInTransition = 0;
            this.initiated = 0;
            this.endTime = _utils2.default.getTime();

            if (!this.moved) {
                this._execEvent('onScrollCancel');
                return;
            }

            // set pullrefresh
            if (this.state.usePullRefresh && this.y >= this.props.pullRefreshHeight) {
                if (this.refreshState === REFRESHSTATUS.LOAD) {
                    this.scrollTo(this.x, this.props.pullRefreshHeight, 200);
                } else {
                    this._setRefreshStatus(REFRESHSTATUS.LOAD);
                    this.scrollTo(this.x, this.props.pullRefreshHeight, 300);
                    this._execEvent('onRefresh');
                }
                return;
            }

            // set loadmore
            // jiao.shen:此处将y<=max改成了y<max
            // 因为如果scroller正好滚到下边缘停住的时候,这时候如果scroller render,就会立刻触发loadmore,和使用习惯不符
            if (this.state.useLoadMore && this.y < this.maxScrollY) {
                if (this.loadState !== LOADSTATUS.NOMORE && this.loadState !== LOADSTATUS.LOAD) {
                    this._setLoadStatus(LOADSTATUS.LOAD);
                    this._execEvent('onLoad');
                }
            }

            // reset if we are outside of the boundaries
            if (this._resetPosition(this.props.bounceTime)) {
                return;
            }

            this.scrollTo(newX, newY); // ensures that the last position is rounded

            // start momentum animation if needed
            if (this.props.momentum && duration < 300) {
                momentumX = this.hasHorizontalScroll ? _utils2.default.momentum(this.x, this.startX, duration, this.maxScrollX, this.horizontalBounce ? this.wrapperWidth : 0, this.props.deceleration) : {
                    destination: newX,
                    duration: 0
                };
                momentumY = this.hasVerticalScroll ? _utils2.default.momentum(this.y, this.startY, duration, this.maxScrollY, this.verticalBounce ? this.wrapperHeight : 0, this.props.deceleration) : {
                    destination: newY,
                    duration: 0
                };
                newX = momentumX.destination;
                newY = momentumY.destination;
                time = Math.max(momentumX.duration, momentumY.duration);
                this.isInTransition = 1;
            }

            if (newX !== this.x || newY !== this.y) {
                var easing = void 0;

                // change easing function when scroller goes out of the boundaries
                if (newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY) {
                    easing = _utils2.default.ease.quadratic;
                }

                this.scrollTo(newX, newY, time, easing);
                this._execEvent('onMomentumScrollBegin', {
                    targetX: newX,
                    targetY: newY
                });
                return;
            }

            this._execEvent('onScrollEnd');
        }
    }, {
        key: '_handleTransitionEnd',
        value: function _handleTransitionEnd(e) {
            if (e.target !== this.scroller || !this.isInTransition) {
                return;
            }

            this._transitionTime();
            if (!this._resetPosition(this.props.bounceTime)) {
                this.isInTransition = false;
                this._execEvent('onScrollEnd');
            }
        }

        /**
         * 尝试加载处于可视区域内的lazyimage
         * @param y
         */

    }, {
        key: '_tryLoadLazyImages',
        value: function _tryLoadLazyImages() {
            var _this3 = this;

            if (this.childLazyImages.length) {
                var self = this;
                this.childLazyImages.forEach(function (child) {
                    var _top = child.offsetTop - _this3.wrapperOffsetTop + _this3.y;

                    // if (_top >= -child.img.height && _top < self.wrapperHeight) {  // 只有出现在当前可视区域才加载
                    if (_top < self.wrapperHeight) {
                        // 出现在当前可视区域和可视区域上方都加载
                        child.load(function () {
                            var _height = child.props.style && child.props.style.height ? child.props.style.height : child.props.height;
                            if (!_height) {
                                // 如果设置了高度，就不再重新刷新
                                self.refresh();
                            }
                        });
                    }
                });
            }
        }
    }, {
        key: '_getCurrentSticky',
        value: function _getCurrentSticky() {
            var stickyOffset = this.props.stickyOffset;

            var ret = null;
            if (this.y < 0) {
                var absY = Math.abs(this.y - stickyOffset);
                var wrapperTop = this.wrapperOffsetTop;
                var upperHeaders = this.stickyHeaders.filter(function (header) {
                    return header.offsetTop - wrapperTop <= absY;
                });

                if (upperHeaders.length) {
                    var currentHeader = upperHeaders[upperHeaders.length - 1];
                    var nextHeader = this.stickyHeaders[upperHeaders.length];
                    var index = upperHeaders.length - 1;
                    if (nextHeader) {
                        var distToNext = nextHeader.offsetTop - wrapperTop - absY;
                        var adjustOffset = distToNext > currentHeader.height ? 0 : -(currentHeader.height - distToNext);
                        ret = { currentHeader: currentHeader, adjustOffset: adjustOffset, index: index };
                    } else {
                        ret = { currentHeader: currentHeader, adjustOffset: 0, index: index };
                    }
                } else {
                    ret = null;
                }
            } else {
                ret = null;
            }
            return ret;
        }
    }, {
        key: '_refreshSticky',
        value: function _refreshSticky(forceRefresh) {
            if (this.stickyHeaders.length) {
                var currentSticky = this._getCurrentSticky();
                var stickyNode = this.refs.stickyNode;

                if (currentSticky) {
                    var currentHeader = currentSticky.currentHeader,
                        adjustOffset = currentSticky.adjustOffset;


                    if (currentSticky.index !== this.stickyIndex || currentSticky.adjustOffset !== this.stickyOffset || forceRefresh) {
                        var transform = 'translate(0px,' + adjustOffset + 'px) translateZ(0px)';
                        stickyNode.style.transform = transform;
                        stickyNode.style.webkitTransform = transform;
                        stickyNode.style.display = 'block';
                        stickyNode.className = currentHeader.stickyExtraClass;
                        _reactDom2.default.render(_react2.default.cloneElement(currentHeader.onlyChild), stickyNode);

                        this.stickyIndex = currentSticky.index;
                        this.stickyOffset = currentSticky.adjustOffset;
                    }
                } else {
                    this.stickyIndex = null;
                    this.stickyOffset = null;
                    stickyNode.style.display = 'none';
                }
            }
        }

        /**
         * @method stopAnimate
         * @description 停止当前的滚动动画，包括：惯性滚动、回弹、ScrollTo等。
         */

    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            if (this.useTransition && this.isInTransition) {
                this._transitionTime();
                this.isInTransition = false;

                var pos = this._getComputedPosition();

                this._translate(Math.round(pos.x), Math.round(pos.y));
                this._execEvent('onScrollEnd');
            } else if (!this.useTransition && this.isAnimating) {
                this._execEvent('onScrollEnd');
                cancelrAF(this.rAF);

                this.isAnimating = false;
            }
        }

        /**
         * @method _getComputedPosition
         * @returns {Object} 当前内容区域位移，{x: x, y: y}
         * @description 获取当前内容区域的位移
         * @skip
         */

    }, {
        key: '_getComputedPosition',
        value: function _getComputedPosition() {
            var matrix = window.getComputedStyle(this.scroller, null);
            var x = void 0;
            var y = void 0;

            if (this.useTransform) {
                matrix = matrix[_utils2.default.style.transform].split(')')[0].split(', ');
                x = +(matrix[12] || matrix[4]);
                y = +(matrix[13] || matrix[5]);
            } else {
                x = +matrix.left.replace(/[^-\d.]/g, '');
                y = +matrix.top.replace(/[^-\d.]/g, '');
            }

            return { x: x, y: y };
        }

        /**
         * @method _execEvent
         * @param {string} eventType 事件类型
         * @param {Object} param 参数
         * @description 触发事件回调
         * @skip
         */

    }, {
        key: '_execEvent',
        value: function _execEvent(eventType, param) {
            // console.log(eventType)
            if (eventType === 'onScroll' || eventType === 'onScrollEnd') {
                this._tryLoadLazyImages();
                this._refreshSticky();
            }
            if (eventType === 'onScrollStart') {
                this.isScrolling = true;
            }
            if (eventType === 'onScrollEnd') {
                this.isScrolling = false;
            }
            if (this.props[eventType]) {
                this.props[eventType].apply(this, [{
                    contentOffset: {
                        x: this.x,
                        y: this.y
                    },
                    param: param
                }]);
            }
        }

        /**
         * @method refresh
         * @param {Object} [refreshOption] 刷新参数，{wrapperWidth, wrapperHeight, scrollerWidth, scrollerHeight}
         * @description 刷新 Scroller，一般场景**不推荐使用**，因为当内容改变的时候，Scroller 会自动 render。
         *
         * 使用场景1：需要强制设置 Scroller 本身的宽高和内容容器的宽高时，可以通过refreshOption来传入宽高代替dom的宽高。
         *
         * 使用场景2：在某些不是通过 setState 或 Redux 等方式来改变内容导致 Scroller 不会 render 时，可以强制重新获取Scroller宽高和内容容器宽高。
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            var refreshOption = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callFromList = arguments[1];

            if (!callFromList) {
                this.wrapperWidth = typeof refreshOption.wrapperWidth !== 'undefined' ? refreshOption.wrapperWidth : this.wrapper.clientWidth;
                this.wrapperHeight = typeof refreshOption.wrapperHeight !== 'undefined' ? refreshOption.wrapperHeight : this.wrapper.clientHeight;
                this.scrollerWidth = typeof refreshOption.scrollerWidth !== 'undefined' ? refreshOption.scrollerWidth : this.scroller.offsetWidth;

                if (this.refs.wrapper) {
                    this.wrapperOffsetTop = (0, _util.getElementOffsetY)(this.refs.wrapper, null);
                }
            }

            this.scrollerHeight = typeof refreshOption.scrollerHeight !== 'undefined' ? refreshOption.scrollerHeight : this.scroller.offsetHeight;

            // 如果有下拉刷新，设置下拉刷新的位置，重置scrollerHeight
            if (this.state.useLoadMore && this.refs.LoadMore) {
                this.refs.LoadMore.style.visibility = this.scrollerHeight > 0 ? 'visible' : 'hidden';
                this.refs.LoadMore.style.top = this.scrollerHeight + 'px';
                this.scrollerHeight += this.props.loadMoreHeight;
            }

            this.maxScrollX = this.wrapperWidth - this.scrollerWidth;
            this.maxScrollY = this.wrapperHeight - this.scrollerHeight;

            this.hasHorizontalScroll = this.props.scrollX && this.maxScrollX < 0;
            this.hasVerticalScroll = this.props.scrollY && this.maxScrollY < 0;

            if (!this.hasHorizontalScroll) {
                this.maxScrollX = 0;
                this.scrollerWidth = this.wrapperWidth;
            }

            if (!this.hasVerticalScroll) {
                this.maxScrollY = 0;
                this.scrollerHeight = this.wrapperHeight;
            }

            this.endTime = 0;
            this.directionX = 0;
            this.directionY = 0;
        }

        /**
         * @method _resetPosition
         * @param {Number} [time] 滚动到临界点的时间
         * @description 校正当前内容的位置，如果超出了可滚动的范围，则滚动到临界点。主要用于回弹。
         * @skip
         */

    }, {
        key: '_resetPosition',
        value: function _resetPosition(time) {
            var x = this.x;
            var y = this.y;
            var animateTime = time || 0;

            if (this.refreshState === REFRESHSTATUS.LOAD && this.y === this.props.pullRefreshHeight) {
                return false;
            }

            if (!this.hasHorizontalScroll || this.x > 0) {
                x = 0;
            } else if (this.x < this.maxScrollX) {
                x = this.maxScrollX;
            }

            if (!this.hasVerticalScroll || this.y > 0) {
                y = 0;
            } else if (this.y < this.maxScrollY) {
                y = this.maxScrollY;
            }

            if (x === this.x && y === this.y) {
                return false;
            }

            this.scrollTo(x, y, animateTime, this.props.bounceEasing);

            return true;
        }

        /**
         * @method scrollTo
         * @param {Number} x 水平位移，默认值为当前水平位移
         * @param {Number} y 垂直位移，默认值为当前垂直位移
         * @param {Number} time 滚动时间，默认值为0
         * @param {Object} [easing] 滚动动画对象。参照 `bounceEasing` 参数。
         *
         * @description 滚动到某个位置。
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.x;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.y;
            var time = arguments[2];
            var easing = arguments[3];
            // TODO: 给scrollTo加上回调，由于transitionend事件并不能针对某一次的transition，所以暂时不好处理
            var _easing = easing || _utils2.default.ease.circular;
            var transitionType = this.useTransition && _easing.style;

            this.isInTransition = this.useTransition && time > 0;

            if (!time || transitionType) {
                if (transitionType) {
                    this._transitionTimingFunction(_easing.style);
                    this._transitionTime(time);
                }
                this._translate(x, y);
            } else {
                this._animate(x, y, time, _easing.fn);
            }
        }
    }, {
        key: '_transitionTimingFunction',
        value: function _transitionTimingFunction(easing) {
            this._scrollerStyle[_utils2.default.style.transitionTimingFunction] = easing;
        }
    }, {
        key: '_transitionTime',
        value: function _transitionTime(time) {
            var _this4 = this;

            var _time = time || 0;
            var durationProp = _utils2.default.style.transitionDuration;
            if (!this.useTransition) {
                return;
            }

            if (!durationProp) {
                return;
            }
            this._scrollerStyle[durationProp] = _time + 'ms';

            if (!_time && _utils2.default.isBadAndroid) {
                this._scrollerStyle[durationProp] = '0.0001ms';

                // remove 0.0001ms
                rAF(function () {
                    if (_this4._scrollerStyle[durationProp] === '0.0001ms') {
                        _this4._scrollerStyle[durationProp] = '0s';
                    }
                });
            }

            this._setStyle(this.scroller, this._scrollerStyle);
        }
    }, {
        key: '_setStyle',
        value: function _setStyle(dom, style) {
            var _style = Object.assign({}, style);
            var _dom = dom;

            Object.keys(_style).forEach(function (key) {
                _dom.style[key] = _style[key];
            });
        }
    }, {
        key: '_translate',
        value: function _translate(x, y) {
            if (this.useTransform) {
                this._scrollerStyle[_utils2.default.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

                this.x = x;
                this.y = y;

                this._setStyle(this.scroller, this._scrollerStyle);
            } else {
                var _x = Math.round(x);
                var _y = Math.round(y);

                this._scrollerStyle.left = _x + 'px';
                this._scrollerStyle.top = _y + 'px';

                this.x = _x;
                this.y = _y;

                this._setStyle(this.scroller, this._scrollerStyle);
            }

            if (this.state.usePullRefresh) {
                if (y >= this.props.pullRefreshHeight && this.refreshState === REFRESHSTATUS.PULL) {
                    this._setRefreshStatus(REFRESHSTATUS.RELEASE);
                } else if (y < this.props.pullRefreshHeight && this.refreshState === REFRESHSTATUS.RELEASE) {
                    this._setRefreshStatus(REFRESHSTATUS.PULL);
                }
            }

            if (this.state.useLoadMore) {
                if (this.maxScrollY - y > 0 && this.loadState === LOADSTATUS.PULL) {
                    // this._setRefreshStatus(LOADSTATUS.RELEASE);
                    this._setLoadStatus(LOADSTATUS.RELEASE);
                } else if (this.maxScrollY - y <= 0 && this.loadState === LOADSTATUS.RELEASE) {
                    // this._setRefreshStatus(LOADSTATUS.PULL);
                    this._setLoadStatus(LOADSTATUS.PULL);
                }
            }
        }
    }, {
        key: '_animate',
        value: function _animate(destX, destY, duration, easingFn) {
            var _this5 = this;

            var self = this;
            var startX = this.x;
            var startY = this.y;
            var startTime = _utils2.default.getTime();
            var destTime = startTime + duration;

            var step = function step() {
                var now = _utils2.default.getTime();
                var easing = easingFn((now - startTime) / duration);
                var newX = (destX - startX) * easing + startX;
                var newY = (destY - startY) * easing + startY;

                if (now >= destTime) {
                    self.isAnimating = false;
                    self._translate(destX, destY);

                    if (!self._resetPosition(self.props.bounceTime)) {
                        self._execEvent('onScrollEnd');
                    }

                    return;
                }

                self._translate(newX, newY);

                _this5._execEvent('onScroll');

                if (self.isAnimating) {
                    cancelrAF(self.rAF);
                    self.rAF = rAF(step);
                }
            };

            this.isAnimating = true;
            step();
        }
    }, {
        key: '_setRefreshStatus',
        value: function _setRefreshStatus(status) {
            var _this6 = this;

            if (!this.state.usePullRefresh) {
                return;
            }

            var _prevRefreshState = this.refreshState;
            this.refreshState = status;

            Object.keys(REFRESHSTATUS).forEach(function (item) {
                var _ref = REFRESHSTATUS[item];
                if (_this6.refs[_ref]) {
                    _this6.refs[_ref].style.display = status === _ref ? '' : 'none';
                }
            });

            var releaseIcon = this.refs[REFRESHSTATUS.RELEASE].querySelector('i');
            var pullIcon = this.refs[REFRESHSTATUS.PULL].querySelector('i');

            // todo: 为啥用了react之后，这个地方需要setTimeout才能正常动画
            setTimeout(function () {
                if (_prevRefreshState === REFRESHSTATUS.PULL && status === REFRESHSTATUS.RELEASE) {
                    releaseIcon.style[_utils2.default.style.transform] = '';
                    pullIcon.style[_utils2.default.style.transform] = 'rotate(180deg)';
                } else {
                    releaseIcon.style[_utils2.default.style.transform] = 'rotate(-180deg)';
                    pullIcon.style[_utils2.default.style.transform] = '';
                }
            }, 0);
        }
    }, {
        key: '_setLoadStatus',
        value: function _setLoadStatus(status) {
            var _this7 = this;

            if (!this.state.useLoadMore) {
                return;
            }

            var _prevLoadState = this.loadState;
            this.loadState = status;

            Object.keys(LOADSTATUS).forEach(function (item) {
                var _ref = LOADSTATUS[item];
                if (_this7.refs[_ref]) {
                    _this7.refs[_ref].style.display = status === _ref ? '' : 'none';
                }
            });

            var releaseIcon = this.refs[LOADSTATUS.RELEASE].querySelector('i');
            var pullIcon = this.refs[LOADSTATUS.PULL].querySelector('i');

            // todo: 为啥用了react之后，这个地方需要setTimeout才能正常动画
            setTimeout(function () {
                if (_prevLoadState === LOADSTATUS.PULL && status === LOADSTATUS.RELEASE) {
                    releaseIcon.style[_utils2.default.style.transform] = '';
                    pullIcon.style[_utils2.default.style.transform] = 'rotate(180deg)';
                } else {
                    releaseIcon.style[_utils2.default.style.transform] = 'rotate(-180deg)';
                    pullIcon.style[_utils2.default.style.transform] = '';
                }
            }, 0);
        }

        /**
         * @method startRefreshing
         * @param {Number} [time] 滚动到顶部的时间，默认为 300ms
         * @description 强制开始刷新。这个方法一般是用在切换筛选项或者关键字等场景，来达到回到顶部并且开始刷新的效果。如果是用户下拉触发 `onRefresh` 时，就不需要再调用这个方法了。
         */

    }, {
        key: 'startRefreshing',
        value: function startRefreshing() {
            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 300;

            if (this.state.usePullRefresh && this.refreshState !== REFRESHSTATUS.LOAD) {
                this._setRefreshStatus(REFRESHSTATUS.LOAD);
                this.scrollTo(this.x, this.props.pullRefreshHeight, time);

                this._execEvent('onRefresh');
            }
        }

        /**
         * @method stopRefreshing
         * @param {Bool} status 刷新的状态。true表示加载成功，false表示加载失败。
         * @param {Object} [config] 停止刷新的动画配置
         * @param {number} [config.duration] 回到顶部的动画时间，默认是300ms
         * @description 停止刷新，停止之后会自动滚动到顶部。
         */

    }, {
        key: 'stopRefreshing',
        value: function stopRefreshing(status) {
            var _this8 = this;

            var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { duration: 300 };

            if (this.state.usePullRefresh && this.refreshState === REFRESHSTATUS.LOAD) {
                this._setRefreshStatus(status ? REFRESHSTATUS.SUCCESS : REFRESHSTATUS.FAIL);

                // 方案一：放在scrollTo的回调中处理状态，但是scrollTo的回调有时候会有问题；可以通过this.disabled = true 来禁止滚动解决现有的问题
                // this.scrollTo(this.x, 0, 300, null, ()=>{
                //     this._setRefreshStatus(REFRESHSTATUS.PULL);
                // });

                // 方案二：setTimeout的方式，但是不准确，尤其是在比较卡的机器上
                this.scrollTo(this.x, 0, config.duration);
                this.disabled = true;
                setTimeout(function () {
                    _this8._setRefreshStatus(REFRESHSTATUS.PULL);
                    _this8._setLoadStatus(LOADSTATUS.PULL);
                    _this8.disabled = false;
                }, config.duration);
            }
        }

        /**
         * @method stopLoading
         * @param {Bool} status 刷新的状态。true表示加载了更多数据，false表示没有更多数据了。
         * @description 停止加载更多。
         */

    }, {
        key: 'stopLoading',
        value: function stopLoading(status) {
            if (this.state.useLoadMore && this.loadState === LOADSTATUS.LOAD) {
                this._setLoadStatus(status ? LOADSTATUS.PULL : LOADSTATUS.NOMORE);
            }
        }

        /**
         * @method _refreshLoadMore
         * @skip
         * @private
         * @description 更新useLoadMore属性时的逻辑（该逻辑必须放到refresh之后，因为refresh才会计算的到正确的scrollerHeight）
         *
         * 1. 如果是去掉useLoadMore，需要重新设置位置（因为scrollerHeight变少了）
         * 2. 如果是加上useLoadMore，需要设置LoadMore的位置（此时的scrollerHeight是包括loadMoreHeight的，所以需要减去loadMoreHHeight）
         */

    }, {
        key: '_refreshLoadMore',
        value: function _refreshLoadMore() {
            if (!this.state.useLoadMore) {
                this._resetPosition();
            } else {
                if (this.refs.LoadMore) {
                    this.refs.LoadMore.style.top = this.scrollerHeight - this.props.loadMoreHeight + 'px';
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _props = this.props,
                extraClass = _props.extraClass,
                containerExtraClass = _props.containerExtraClass,
                pullRefreshHeight = _props.pullRefreshHeight,
                loadMoreHeight = _props.loadMoreHeight,
                stickyOffset = _props.stickyOffset;

            var pullRefreshContent = void 0;
            var loadMoreContent = void 0;

            if (this.state.usePullRefresh) {
                var pullRefreshTpl = _react2.default.createElement(
                    'div',
                    {
                        ref: 'pullrefresh',
                        className: 'yo-load',
                        style: {
                            height: pullRefreshHeight + 'px',
                            lineHeight: pullRefreshHeight + 'px',
                            top: -pullRefreshHeight + 'px'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_pull' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF07B'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_release' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF079'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u91CA\u653E\u7ACB\u5373\u66F4\u65B0'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_load' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-loading' },
                            '\uF089'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52AA\u529B\u52A0\u8F7D\u4E2D...'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_success' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-succ' },
                            '\uF078'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52A0\u8F7D\u6210\u529F'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'pullrefresh_fail' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-fail' },
                            '\uF077'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u52A0\u8F7D\u5931\u8D25'
                        )
                    )
                );

                pullRefreshContent = this.props.renderPullRefresh ? this.props.renderPullRefresh() : pullRefreshTpl;
            }

            if (this.state.useLoadMore) {
                var loadMoreTpl = _react2.default.createElement(
                    'div',
                    {
                        ref: 'LoadMore',
                        className: 'yo-load',
                        style: {
                            height: loadMoreHeight + 'px',
                            lineHeight: loadMoreHeight + 'px',
                            top: -loadMoreHeight + 'px'
                        }
                    },
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_pull' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF079'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u4E0A\u62C9\u52A0\u8F7D\u66F4\u591A'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_release' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico' },
                            '\uF07B'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u91CA\u653E\u7ACB\u5373\u52A0\u8F7D'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_load' },
                        _react2.default.createElement(
                            'i',
                            { className: 'yo-ico yo-ico-loading' },
                            '\uF089'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u6B63\u5728\u52A0\u8F7D...'
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'yo-loadtip', ref: 'loadmore_nomore' },
                        _react2.default.createElement(
                            'div',
                            { className: 'text' },
                            '\u6CA1\u6709\u66F4\u591A\u4E86...'
                        )
                    )
                );

                loadMoreContent = this.props.renderLoadMore ? this.props.renderLoadMore() : loadMoreTpl;
            }

            var wrapperStyle = Object.assign({ overflow: 'hidden' }, this.props.style);
            var scrollerStyle = Object.assign({}, this.props.containerExtraStyle, this._scrollerStyle);
            var scrollerContent = void 0;
            var _wrapperClassName = (0, _classnames2.default)('yo-scroller', extraClass);
            var _scrollerClassName = (0, _classnames2.default)('scroller', containerExtraClass);

            if (this.noWrapper) {
                // 1. 不需要滚动容器（只适用于特殊的、内容的宽高已知的情况）
                scrollerContent = _react2.default.cloneElement(this.props.children, {
                    ref: 'scroller',
                    onTouchStart: function onTouchStart(evt) {
                        return _this9._handleTouchStart(evt);
                    },
                    onTouchMove: function onTouchMove(evt) {
                        return _this9._handleTouchMove(evt);
                    },
                    onTouchEnd: function onTouchEnd(evt) {
                        return _this9._handleTouchEnd(evt);
                    },
                    onTouchCancel: function onTouchCancel(evt) {
                        return _this9._handleTouchEnd(evt);
                    },
                    onTransitionEnd: function onTransitionEnd(evt) {
                        return _this9._handleTransitionEnd(evt);
                    }
                });
            } else if (this.props.children && !this.props.children.length && typeof this.props.children.type === 'string' && !this.state.usePullRefresh && !this.state.useLoadMore) {
                // 2. 将内容的最外层节点当做滚动容器
                if (this.props.children.props && this.props.children.props.className) {
                    _scrollerClassName = (0, _classnames2.default)('scroller', this.props.children.props.className);
                } else {
                    _scrollerClassName = 'scroller';
                }

                var content = _react2.default.cloneElement(this.props.children, {
                    ref: 'scroller',
                    className: _scrollerClassName,
                    style: scrollerStyle
                });

                scrollerContent = _react2.default.createElement(
                    'div',
                    {
                        ref: 'wrapper',
                        className: _wrapperClassName,
                        onTouchStart: function onTouchStart(evt) {
                            return _this9._handleTouchStart(evt);
                        },
                        onTouchMove: function onTouchMove(evt) {
                            return _this9._handleTouchMove(evt);
                        },
                        onTouchEnd: function onTouchEnd(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTouchCancel: function onTouchCancel(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTransitionEnd: function onTransitionEnd(evt) {
                            return _this9._handleTransitionEnd(evt);
                        },
                        style: wrapperStyle
                    },
                    _react2.default.createElement('div', {
                        ref: 'stickyNode',
                        style: { position: 'absolute', top: stickyOffset, left: 0, right: 0, zIndex: 9999 },
                        className: 'sticky'
                    }),
                    content
                );
            } else {
                // 3. 在内容的外面加一层滚动容器
                scrollerContent = _react2.default.createElement(
                    'div',
                    {
                        ref: 'wrapper',
                        className: _wrapperClassName,
                        onTouchStart: function onTouchStart(evt) {
                            return _this9._handleTouchStart(evt);
                        },
                        onTouchMove: function onTouchMove(evt) {
                            return _this9._handleTouchMove(evt);
                        },
                        onTouchEnd: function onTouchEnd(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTouchCancel: function onTouchCancel(evt) {
                            return _this9._handleTouchEnd(evt);
                        },
                        onTransitionEnd: function onTransitionEnd(evt) {
                            return _this9._handleTransitionEnd(evt);
                        },
                        style: wrapperStyle
                    },
                    _react2.default.createElement('div', {
                        ref: 'stickyNode',
                        style: { position: 'absolute', top: stickyOffset, left: 0, right: 0, zIndex: 9999 },
                        className: 'sticky'
                    }),
                    _react2.default.createElement(
                        'div',
                        { className: _scrollerClassName, ref: 'scroller', style: scrollerStyle },
                        this.props.children,
                        pullRefreshContent,
                        loadMoreContent
                    )
                );
            }

            return scrollerContent;
        }
    }]);

    return Scroller;
}(_react.Component);

Scroller.ease = _utils2.default.ease;
Scroller.childContextTypes = {
    scroller: _react.PropTypes.object,
    isScroller: _react.PropTypes.bool
};
exports.default = Scroller;


Scroller.defaultProps = defaultProps;
Scroller.propTypes = propTypes;
Scroller.Sticky = _sticky2.default;
Scroller.LazyImage = _lazyimage2.default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var emptyFunction = __webpack_require__(14);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _aniScrollx = __webpack_require__(32);

var _aniScrollx2 = _interopRequireDefault(_aniScrollx);

var _reactAddonsPureRenderMixin = __webpack_require__(69);

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _carouselItem = __webpack_require__(33);

var _carouselItem2 = _interopRequireDefault(_carouselItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Carousel
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 走马灯组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持用户自定义动画对象，支持用户自定义css动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 支持用户自定义子节点
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 默认动画：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 横向滚动动画
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 为当前页加上on的类名，因此可以附加css动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 默认走马灯子节点：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 支持图片懒加载
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * + 图片加载失败的替换图模板
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 查看Demo获得实例：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用自定义动画实现图片查看器
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 内置动画配合css动画效果
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用注意：
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - `Carousel`组件的父节点需要有宽度，`Carousel`组件默认宽度为‘100%’，如果父节点没有宽度会导致默认滚动动画失效。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - `Carousel`组件不能直接嵌套在`Touchable`组件中，请使用`CarouselItem`的`onTap`来给它的Item绑定tap事件回调，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 或者用`Touchable`组件包裹Item。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author eva.li
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./carousel.md}{instruUrl: carousel/index.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Dots = function Dots(props) {
    var liNodes = [];
    for (var i = 0; i < props.num; i++) {
        liNodes.push(_react2.default.createElement('li', { key: i, className: props.page === i + 1 ? 'on' : '' }));
    }
    return _react2.default.createElement(
        'ul',
        { className: 'index' },
        liNodes
    );
};
Dots.propTypes = {
    num: _react.PropTypes.number,
    page: _react.PropTypes.number
};

var DEFAULTANI = (0, _aniScrollx2.default)();

var Carousel = function (_Component) {
    _inherits(Carousel, _Component);

    function Carousel(props) {
        _classCallCheck(this, Carousel);

        var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, props));

        _this.state = {
            page: 1
        };
        _this.shouldComponentUpdate = _reactAddonsPureRenderMixin2.default.shouldComponentUpdate.bind(_this);
        _this.dragDom = null;
        _this.dragEvt = null;
        return _this;
    }

    _createClass(Carousel, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return {
                currentPage: this.state.page,
                pagesNum: this.props.children.length
            };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.ani = Object.assign({}, this.props.aniObj || DEFAULTANI);
            this.aniObj = {
                delay: this.props.delay,
                speed: this.props.speed,
                pageNow: 1,
                pagesNum: this.props.children.length,
                aniSpeed: this.props.aniSpeed,
                loop: this.props.loop,
                operationTimer: 0,
                touchstartLocation: {},
                touchendLocation: {}
            };
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.aniObj.stageDOM = this.widgetDOM.parentNode;
            this.aniObj.width = this.widgetDOM.clientWidth;
            this.aniObj.containerDOM = this.widgetDOM.querySelector('.cont');
            this.arrive(this.props.defaultPage, false);
            this.launchAuto();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.aniObj.delay = props.delay;
            this.aniObj.speed = props.speed;
            this.aniObj.pagesNum = props.children.length;
            this.aniObj.aniSpeed = props.aniSpeed;
            this.aniObj.loop = props.loop;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState) {
            if (nextState.page !== this.state.page) {
                this.props.beforeChange(nextState.page);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            // this.aniObj.stageWidth = this.widgetDOM.clientWidth;
            if (prevState.page !== this.state.page) {
                this.props.afterChange(this.state.page);
            }
            if (prevProps.autoplay !== this.props.autoplay || prevProps.loop !== this.props.loop) {
                this.pause();
                this.play();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.pause();
        }

        /**
         * @description 到达方法
         * @method arrive
         * @param  {number} num 到达的页数
         * @param {isAni} boolean 是否需要动画
         */

    }, {
        key: 'arrive',
        value: function arrive(num) {
            var isAni = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this.aniObj.operationTimer = num - 1;
            this.pause();
            if (num > 0 && num <= _react2.default.Children.count(this.props.children)) {
                var page = this.ani.arrive(this.aniObj, num, isAni);
                this.setState({
                    page: page
                });
                this.aniObj.pageNow = page;
            }
            this.play();
        }
    }, {
        key: 'launchAuto',
        value: function launchAuto() {
            var _this2 = this;

            if (this.autoplay) {
                window.clearInterval(this.autoplay);
            }
            if (this.props.autoplay && (this.props.loop || this.aniObj.pageNow < this.aniObj.pagesNum)) {
                this.autoplay = window.setInterval(function () {
                    _this2.next();
                }, this.props.delay * 1000);
            }
        }
    }, {
        key: 'format',
        value: function format(children) {
            var childrenList = _react2.default.Children.map(children, function (childElement, index) {
                return _react2.default.cloneElement(childElement, {
                    index: index + 1
                });
            });
            return this.ani.handleData(this.aniObj, childrenList);
        }

        // getEndX(distanceX) {
        //     let pageNow = this.aniObj.pageNow;
        //     if (Math.abs(distanceX) < 40) {
        //         return -(pageNow - 1);
        //     }
        //     if (distanceX > 0) {
        //         pageNow = pageNow - 2;
        //         this.aniObj.operationTimer --;
        //     } else {
        //         this.aniObj.operationTimer ++;
        //     }
        //     return -pageNow;
        // }
        /**
         * @method play
         * @description 播放动画
         */

    }, {
        key: 'play',
        value: function play() {
            this.launchAuto();
        }

        /**
         * @method pause
         * @description 暂停动画
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (this.autoplay) {
                window.clearInterval(this.autoplay);
            }
        }

        /**
         * @method prev
         * @description 播放上一页
         */

    }, {
        key: 'prev',
        value: function prev() {
            this.aniObj.operationTimer--;
            var page = this.ani.prev(this.aniObj);
            this.setState({ page: page });
            this.aniObj.pageNow = page;
        }

        /**
         * @method next
         * @description 播放下一页
         */

    }, {
        key: 'next',
        value: function next() {
            this.aniObj.operationTimer++;
            var page = this.ani.next(this.aniObj);
            this.setState({ page: page });
            this.aniObj.pageNow = page;
            if (page >= this.aniObj.pagesNum && !this.props.loop) {
                this.pause();
            }
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.pause();
            this.aniObj.touchstartList = e.touches[0];
            this.aniObj.touchstartLocation = [e.touches[0].clientX, e.touches[0].clientY];
            this.ani.touchstart(this.aniObj);
        }
    }, {
        key: 'handleTouchMove',
        value: function handleTouchMove(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.aniObj.touchmoveList = e.touches[0];
            this.aniObj.touchmoveLocation = [e.touches[0].clientX, e.touches[0].clientY];

            this.ani.touchmove(this.aniObj);
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(e) {
            e.preventDefault();
            // e.stopPropagation();
            this.aniObj.touchendList = e.touches.length > 0 ? e.touches[0] : this.aniObj.touchmoveList;
            if (!this.aniObj.touchendList) {
                return;
            }
            this.aniObj.touchendLocation = [this.aniObj.touchendList.clientX, this.aniObj.touchendList.clientY];
            this.aniObj.pageNow = this.ani.touchend(this.aniObj);
            this.setState({
                page: this.aniObj.pageNow
            });
            this.play();
            this.clearTouchList();
        }
    }, {
        key: 'handleTouchCancle',
        value: function handleTouchCancle(e) {
            e.preventDefault();
            // e.stopPropagation();
            if (this.ani.touchcancel) {
                this.ani.touchcancel(this.aniObj);
                return;
            }
            this.aniObj.touchendList = this.aniObj.touchmoveList;
            this.aniObj.touchendLocation = [this.aniObj.touchendList.clientX, this.aniObj.touchendList.clientY];
            this.aniObj.pageNow = this.ani.touchend(this.aniObj);
            this.setState({
                page: this.aniObj.pageNow
            });
            this.clearTouchList();
        }
    }, {
        key: 'clearTouchList',
        value: function clearTouchList() {
            Object.assign(this.aniObj, {
                touchstartList: [],
                touchmoveList: [],
                touchstartLocation: [],
                touchmoveLocation: [],
                touchendLocation: []
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var classList = ['yo-carousel'];
            if (this.props.extraClass != null) {
                classList.push(this.props.extraClass);
            }
            var children = this.format(this.props.children);
            return _react2.default.createElement(
                'div',
                {
                    className: classList.join(' '),
                    ref: function ref(node) {
                        if (node) {
                            _this3.widgetDOM = node;
                        }
                    },
                    onTouchStart: function onTouchStart(evt) {
                        _this3.handleTouchStart(evt);
                    },
                    onTouchMove: function onTouchMove(evt) {
                        _this3.handleTouchMove(evt);
                    },
                    onTouchEnd: function onTouchEnd(evt) {
                        _this3.handleTouchEnd(evt);
                    },
                    onTouchCancel: function onTouchCancel(evt) {
                        // this.dragEvt.dragCancel(evt)
                        _this3.handleTouchCancle(evt);
                    }
                },
                _react2.default.createElement(
                    'ul',
                    { className: 'cont' },
                    children
                ),
                this.props.dots ? _react2.default.createElement(Dots, { num: this.aniObj.pagesNum, page: this.state.page }) : ''
            );
        }
    }]);

    return Carousel;
}(_react.Component);

Carousel.propTypes = {
    /**
     * @property dots
     * @type Bool
     * @default true
     * @description 是否使用默认坐标展示，详细可以查看demo基础用法展示。
     */
    dots: _react.PropTypes.bool,
    /**
     * @property autoplay
     * @type Bool
     * @default true
     * @description 是否自动换页。
     */
    autoplay: _react.PropTypes.bool,
    /**
     * @property loop
     * @type Bool
     * @default true
     * @description 是否循环 循环防范受动画影响，因此循环的具体方案由动画对象提供。
     */
    loop: _react.PropTypes.bool,
    /**
     * @property beforeChange
     * @type Function
     * @param {num} 变化后页面索引
     * @description 页面切换前提供的回调函数，索引值在carousel.children中设置从1开始。
     */
    beforeChange: _react.PropTypes.func,
    /**
     * @property afterChange
     * @type Function
     * @param {num} 变化后页面索引
     * @description 页面切换后提供的回调函数，索引值在carousel.children中设置从1开始。
     */
    afterChange: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property delay
     * @type Number
     * @description 自动播放时动画间隔，单位为s，因动画的实现方式而不同。
     */
    delay: _react.PropTypes.number,
    /**
     * @property speed
     * @type Number
     * @description 动画播放速度，单位为s,因动画的实现方式而不同。
     */
    speed: _react.PropTypes.number,
    /**
     * @property defaultPage
     * @type Number
     * @description 组件渲染时起始页面。
     */
    defaultPage: _react.PropTypes.number,
    /**
     * @property aniSpeed
     * @type Number
     * @description 如果使用css动画，该值为动画播放时间，用于在滚动循环时计算动画时机。
     */
    aniSpeed: _react.PropTypes.number,
    /**
     * @property aniObj
     * @type Object
     * @description 自定义动画对象，自定义动画需要提供以下方法。
     *
     * - handleData（aniObj, children）用于组件渲染前对于子节点的处理；
     * - touchstart(aniObj) 动画处理的touchstart事件；
     * - touchmove(aniObj) 动画处理的touchmove事件；
     * - touchend(aniObj) 动画处理的touchend事件；
     * - touchcancel(aniObj)动画处理的touchcancel事件；
     * - next(aniObj) 下一帧 需返回动画结束后的当前索引；
     * - arrive（aniObj,num) 跳转；
     * - prev(aniObj) 上一帧 动画结束后的当前索引；
     *
     * carousel组件提供了两种自定义动画，使用者可以按需引用：
     * + aniCss动画使用改变Index层级的方式来展示当前页面。
     * + aniInfinate动画用有限的节点数（3个）渲染无限数量节点，其实现类似于list组件infinte模式，相较于默认动画实现减少了dom节点的数量，增加了dom操作的次数，适用于实现图片查看器等dom节点多的场景。
     *
     * **aniObj格式**
     *
     * ```
     * {
     *    aniSpeed:0,
     *    containerDOM: ul.cont, //节点
     *    delay: 1,
     *    loop: true,
     *    operationTimer: 5, //操作数动画运动的绝对值，交由动画控制
     *    pageNow: 5,
     *    speed: .5,
     *    stageDOM: div,
     *    width: 375 //这里需注意宽度在组件mount后才有
     *    touchstartLocation:e
     *    touchendLocation:e
     *    touchmoveLocation:e
     * }
     * ```
     */
    aniObj: _react.PropTypes.object,
    /**
     * @property children
     * @type Element
     * @description carousel的展示内容。
     */
    children: _react.PropTypes.array.isRequired
};
Carousel.defaultProps = {
    dots: true,
    autoplay: true,
    loop: true,
    effect: 'scrollX',
    delay: 1.5,
    speed: 0.5,
    defaultPage: 1,
    aniSpeed: 0,
    beforeChange: function beforeChange() {},
    afterChange: function afterChange() {}
};
Carousel.childContextTypes = {
    /**
     * @property currentPage
     * @type PropTypes.number
     * @description 子组件通过context获取到currentPage，currentPage表示当前展示的page索引。
     */
    currentPage: _react.PropTypes.number,
    /**
     * @property pagesNum
     * @type PropTypes.number
     * @description 子组件通过context获取到pagesNum，pagesNum表示carousel组件children的数量。
     */
    pagesNum: _react.PropTypes.number
};

Carousel.CarouselItem = _carouselItem2.default;
Carousel.Item = _carouselItem2.default;

exports.default = Carousel;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Mycarousel = function (_React$Component) {
	_inherits(Mycarousel, _React$Component);

	function Mycarousel(props) {
		_classCallCheck(this, Mycarousel);

		var _this = _possibleConstructorReturn(this, (Mycarousel.__proto__ || Object.getPrototypeOf(Mycarousel)).call(this, props));

		_this.state = {
			list: []
		};

		return _this;
	}

	_createClass(Mycarousel, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				_index2.default,
				{ autoplay: this.props.autoplay },
				this.state.list
			);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var _list = [];
			this.props.list.map(function (item) {
				_list.push(_react2.default.createElement(
					"li",
					{ className: "item" },
					_react2.default.createElement("img", { src: item, className: "" })
				));
			});

			this.setState({
				list: _list
			});
		}
	}]);

	return Mycarousel;
}(_react2.default.Component);

exports.default = Mycarousel;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "mycarousel.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(8);

var ReactErrorUtils = __webpack_require__(22);

var invariant = __webpack_require__(4);
var warning = __webpack_require__(10);

/**
 * Injected dependencies:
 */

/**
 * - `ComponentTree`: [required] Module that can convert between React instances
 *   and actual node references.
 */
var ComponentTree;
var TreeTraversal;
var injection = {
  injectComponentTree: function (Injected) {
    ComponentTree = Injected;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.getNodeFromInstance && Injected.getInstanceFromNode, 'EventPluginUtils.injection.injectComponentTree(...): Injected ' + 'module is missing getNodeFromInstance or getInstanceFromNode.') : void 0;
    }
  },
  injectTreeTraversal: function (Injected) {
    TreeTraversal = Injected;
    if (process.env.NODE_ENV !== 'production') {
      process.env.NODE_ENV !== 'production' ? warning(Injected && Injected.isAncestor && Injected.getLowestCommonAncestor, 'EventPluginUtils.injection.injectTreeTraversal(...): Injected ' + 'module is missing isAncestor or getLowestCommonAncestor.') : void 0;
    }
  }
};

function isEndish(topLevelType) {
  return topLevelType === 'topMouseUp' || topLevelType === 'topTouchEnd' || topLevelType === 'topTouchCancel';
}

function isMoveish(topLevelType) {
  return topLevelType === 'topMouseMove' || topLevelType === 'topTouchMove';
}
function isStartish(topLevelType) {
  return topLevelType === 'topMouseDown' || topLevelType === 'topTouchStart';
}

var validateEventDispatches;
if (process.env.NODE_ENV !== 'production') {
  validateEventDispatches = function (event) {
    var dispatchListeners = event._dispatchListeners;
    var dispatchInstances = event._dispatchInstances;

    var listenersIsArr = Array.isArray(dispatchListeners);
    var listenersLen = listenersIsArr ? dispatchListeners.length : dispatchListeners ? 1 : 0;

    var instancesIsArr = Array.isArray(dispatchInstances);
    var instancesLen = instancesIsArr ? dispatchInstances.length : dispatchInstances ? 1 : 0;

    process.env.NODE_ENV !== 'production' ? warning(instancesIsArr === listenersIsArr && instancesLen === listenersLen, 'EventPluginUtils: Invalid `event`.') : void 0;
  };
}

/**
 * Dispatch the event to the listener.
 * @param {SyntheticEvent} event SyntheticEvent to handle
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @param {function} listener Application-level callback
 * @param {*} inst Internal component instance
 */
function executeDispatch(event, simulated, listener, inst) {
  var type = event.type || 'unknown-event';
  event.currentTarget = EventPluginUtils.getNodeFromInstance(inst);
  if (simulated) {
    ReactErrorUtils.invokeGuardedCallbackWithCatch(type, listener, event);
  } else {
    ReactErrorUtils.invokeGuardedCallback(type, listener, event);
  }
  event.currentTarget = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches.
 */
function executeDispatchesInOrder(event, simulated) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      executeDispatch(event, simulated, dispatchListeners[i], dispatchInstances[i]);
    }
  } else if (dispatchListeners) {
    executeDispatch(event, simulated, dispatchListeners, dispatchInstances);
  }
  event._dispatchListeners = null;
  event._dispatchInstances = null;
}

/**
 * Standard/simple iteration through an event's collected dispatches, but stops
 * at the first dispatch execution returning true, and returns that id.
 *
 * @return {?string} id of the first dispatch execution who's listener returns
 * true, or null if no listener returned true.
 */
function executeDispatchesInOrderStopAtTrueImpl(event) {
  var dispatchListeners = event._dispatchListeners;
  var dispatchInstances = event._dispatchInstances;
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  if (Array.isArray(dispatchListeners)) {
    for (var i = 0; i < dispatchListeners.length; i++) {
      if (event.isPropagationStopped()) {
        break;
      }
      // Listeners and Instances are two parallel arrays that are always in sync.
      if (dispatchListeners[i](event, dispatchInstances[i])) {
        return dispatchInstances[i];
      }
    }
  } else if (dispatchListeners) {
    if (dispatchListeners(event, dispatchInstances)) {
      return dispatchInstances;
    }
  }
  return null;
}

/**
 * @see executeDispatchesInOrderStopAtTrueImpl
 */
function executeDispatchesInOrderStopAtTrue(event) {
  var ret = executeDispatchesInOrderStopAtTrueImpl(event);
  event._dispatchInstances = null;
  event._dispatchListeners = null;
  return ret;
}

/**
 * Execution of a "direct" dispatch - there must be at most one dispatch
 * accumulated on the event or it is considered an error. It doesn't really make
 * sense for an event with multiple dispatches (bubbled) to keep track of the
 * return values at each dispatch execution, but it does tend to make sense when
 * dealing with "direct" dispatches.
 *
 * @return {*} The return value of executing the single dispatch.
 */
function executeDirectDispatch(event) {
  if (process.env.NODE_ENV !== 'production') {
    validateEventDispatches(event);
  }
  var dispatchListener = event._dispatchListeners;
  var dispatchInstance = event._dispatchInstances;
  !!Array.isArray(dispatchListener) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'executeDirectDispatch(...): Invalid `event`.') : _prodInvariant('103') : void 0;
  event.currentTarget = dispatchListener ? EventPluginUtils.getNodeFromInstance(dispatchInstance) : null;
  var res = dispatchListener ? dispatchListener(event) : null;
  event.currentTarget = null;
  event._dispatchListeners = null;
  event._dispatchInstances = null;
  return res;
}

/**
 * @param {SyntheticEvent} event
 * @return {boolean} True iff number of dispatches accumulated is greater than 0.
 */
function hasDispatches(event) {
  return !!event._dispatchListeners;
}

/**
 * General utilities that are useful in creating custom Event Plugins.
 */
var EventPluginUtils = {
  isEndish: isEndish,
  isMoveish: isMoveish,
  isStartish: isStartish,

  executeDirectDispatch: executeDirectDispatch,
  executeDispatchesInOrder: executeDispatchesInOrder,
  executeDispatchesInOrderStopAtTrue: executeDispatchesInOrderStopAtTrue,
  hasDispatches: hasDispatches,

  getInstanceFromNode: function (node) {
    return ComponentTree.getInstanceFromNode(node);
  },
  getNodeFromInstance: function (node) {
    return ComponentTree.getNodeFromInstance(node);
  },
  isAncestor: function (a, b) {
    return TreeTraversal.isAncestor(a, b);
  },
  getLowestCommonAncestor: function (a, b) {
    return TreeTraversal.getLowestCommonAncestor(a, b);
  },
  getParentInstance: function (inst) {
    return TreeTraversal.getParentInstance(inst);
  },
  traverseTwoPhase: function (target, fn, arg) {
    return TreeTraversal.traverseTwoPhase(target, fn, arg);
  },
  traverseEnterLeave: function (from, to, fn, argFrom, argTo) {
    return TreeTraversal.traverseEnterLeave(from, to, fn, argFrom, argTo);
  },

  injection: injection
};

module.exports = EventPluginUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component LazyImage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 懒加载图片组件，只能在 `Scroller` 和 `List` 中使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用这个组件代替img标签后，会延迟加载这个图片，直到List组件的滚动使得该图片位于可视区域之内。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./lazyimage.md}{instruUrl: scroller/lazyimage.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version  3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var TO_BE_LOADED = 0;
var LOADING = 1;
var LOADED = 2;

var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class(props) {
        _classCallCheck(this, _class);

        // 0->等待load,1->loading,2->loaded
        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.loading = TO_BE_LOADED;
        _this.state = {
            src: _this.props.defaultImage
        };
        return _this;
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.refresh(this.context);
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.push(this);
            }
        }

        // 父组件render时,需要重置这个组件的loaded状态和context

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps, nextContext) {
            this.refresh(nextContext);

            if (this.state.src !== nextProps.src) {
                this.loading = TO_BE_LOADED;
                this.setState({ src: this.props.defaultImage });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var scroller = this.context.list || this.context.scroller;
            if (scroller) {
                scroller.childLazyImages.splice(scroller.childLazyImages.indexOf(this), 1);
            }
            this.canLoadImage = false;
        }
    }, {
        key: 'refresh',
        value: function refresh(context) {
            this.canLoadImage = true;
            this.offsetY = context.offsetY;
            this.itemRef = context.itemRef;
            this.infinite = context.infinite;
            // 如果不是infinite的列表，那么应该获取offsetTop(这个开销还挺大的，不过没得优化了)，反之，则使用translateY
            if (!this.infinite) {
                this.offsetTop = (0, _util.getElementOffsetY)(this.img);
                this.height = this.img.offsetHeight;
            }
        }
    }, {
        key: 'load',
        value: function load(callback) {
            var _this2 = this;

            if (this.loading === TO_BE_LOADED) {
                var src = this.props.src,
                    tmpImg = new Image();

                this.loading = LOADING;
                tmpImg.onload = function () {
                    // 在lazyimage正在加载时组件unmount(主要是在SPA模式下有可能发生关闭view的情况)会报错
                    // 因此这里需要简单判断一下组件的实例是否还存在
                    if (_this2 && _this2.canLoadImage) {
                        _this2.loading = LOADED;
                        _this2.setState({ src: src, loaded: true });
                        if (callback) {
                            callback();
                        }
                    }
                };
                tmpImg.src = src;
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                height = _props.height,
                style = _props.style,
                customAttr = _props.customAttr;
            // 解决和touchable组件结合使用的问题，必须能够接收这四个属性

            if (this.context.list) {
                if (height == null && style.height == null) {
                    throw Error('yo-lazyimage: 在List组件中使用LazyImage必须指定图片的高度。');
                }
            }

            return _react2.default.createElement('img', _extends({}, (0, _util.inheritProps)(this.props, ['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'width', 'height', 'className', 'title', 'style']), {
                alt: this.props.alt,
                ref: function ref(img) {
                    if (img) _this3.img = img;
                },
                src: this.state.src
            }, customAttr));
        }
    }]);

    return _class;
}(_react.Component);

_class.contextTypes = {
    // 从父组件context接收的属性
    // list/scroller组件实例的引用
    list: _react.PropTypes.object,
    scroller: _react.PropTypes.object,
    // listitem的offsetY(infinite模式下)
    offsetY: _react.PropTypes.number,
    // listitem实例的引用
    itemRef: _react.PropTypes.object,
    // 是否是Scroller下面的Lazyload,而不是List下面的
    isScroller: _react.PropTypes.bool,
    // 是否是infinite列表
    infinite: _react.PropTypes.bool
};
_class.propTypes = {
    /**
     * @property defaultImage
     * @type String
     * @default null
     * @description 默认图片，在原图片还没有完成加载时展示。
     */
    defaultImage: _react.PropTypes.string,
    /**
     * @property src
     * @type String
     * @default null
     * @description 图片src，必需。
     */
    src: _react.PropTypes.string.isRequired,
    /**
     * @property className
     * @type String
     * @default null
     * @description 给img标签加的类名。
     */
    className: _react.PropTypes.string,
    /**
     * @property width
     * @type Number
     * @default null
     * @description 图片宽度。
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @type Number
     * @default null
     * @description 图片高度。
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property customAttr
     * @type Object
     * @default null
     * @description 附加给img dom节点的自定义属性，属性名需要以data-开头。
     */
    customAttr: _react.PropTypes.object,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 附加给img dom节点的style。
     */
    style: _react.PropTypes.object,
    /**
     * @property alt
     * @type String
     * @default null
     * @description 和img标签的alt属性相同。
     */
    alt: _react.PropTypes.string,
    /**
     * @property title
     * @type String
     * @default null
     * @description 和img标签的title属性相同。
     */
    title: _react.PropTypes.string,
    onTouchStart: _react.PropTypes.func,
    onTouchMove: _react.PropTypes.func,
    onTouchEnd: _react.PropTypes.func,
    onTouchCancel: _react.PropTypes.func
};
_class.defaultProps = {
    defaultImage: null,
    src: null,
    className: null,
    width: null,
    height: null,
    customAttr: {},
    style: null
};
exports.default = _class;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _modal = __webpack_require__(41);

var _modal2 = _interopRequireDefault(_modal);

__webpack_require__(26);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 带遮罩层的模态弹层组件,支持多种位置和动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


/**
 * 这个虚拟的组件将会利用renderSubtreeIntoContainer将Modal从原有的位置移动到body中
 */
var _class = function (_Component) {
    _inherits(_class, _Component);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.wrapper = document.createElement('div');
            document.body.appendChild(this.wrapper);
            this.appendWrapperToDocBody();
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.appendWrapperToDocBody();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            document.body.removeChild(this.wrapper);
        }
    }, {
        key: 'appendWrapperToDocBody',
        value: function appendWrapperToDocBody() {
            _reactDom2.default.unstable_renderSubtreeIntoContainer(this, _react2.default.createElement(
                _modal2.default,
                this.props,
                this.props.children
            ), this.wrapper);
        }
    }, {
        key: 'render',
        value: function render() {
            return null;
        }
    }]);

    return _class;
}(_react.Component);

_class.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
};
exports.default = _class;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _gesture = __webpack_require__(45);

var _gesture2 = _interopRequireDefault(_gesture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Touchable
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description `Touchable` 组件是一个"虚拟"组件，它不会真的在文档中创建一个 `dom` 节点作为根节点，而是返回它唯一的子组件的一个克隆，并给它绑定一些手势事件。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 除了能给 `dom` 绑定 `tap` 事件之外，它还解决了一些移动端的手势"顽疾"，例如触摸反馈和滚动/触摸的冲突问题。在需要绑定 `tap` 事件的情况下，应该优先使用 `Touchable`，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 而不是直接把 `tap` 事件回调绑定给 `dom`。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./touchable.md}{instruUrl: touchable.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Touchable = function (_Component) {
    _inherits(Touchable, _Component);

    function Touchable() {
        _classCallCheck(this, Touchable);

        return _possibleConstructorReturn(this, (Touchable.__proto__ || Object.getPrototypeOf(Touchable)).apply(this, arguments));
    }

    _createClass(Touchable, [{
        key: 'render',
        value: function render() {
            if (process.env.NODE_ENV !== 'production') {
                if (this.props.touchClass == null && !this.props.internalUse) {
                    console.error('yo-touchable: Touchable组件没有设置touchClass, 出于用户体验考虑, 应该尽量给触摸区域添加触摸反馈。');
                }
            }

            var onlyChild = _react2.default.Children.only(this.props.children);
            var gestureObj = (0, _gesture2.default)(this, this.context.scroller, this.context.swipeMenuList, this.props.touchClass, this.props.onTap, this.props.onTouchStart);
            var onTouchStart = gestureObj.onTouchStart,
                onTouchMove = gestureObj.onTouchMove,
                onTouchEnd = gestureObj.onTouchEnd,
                onTouchCancel = gestureObj.onTouchCancel;


            return _react2.default.cloneElement(onlyChild, { onTouchStart: onTouchStart, onTouchMove: onTouchMove, onTouchEnd: onTouchEnd, onTouchCancel: onTouchCancel });
        }
    }]);

    return Touchable;
}(_react.Component);

Touchable.propTypes = {
    /**
     * @property touchClass
     * @type String
     * @default null
     * @description 触摸Touchable时附加的className，可以用来实现Native常见的触摸反馈功能(例如给触摸区域添加深色背景或者改变透明度等等)。
     */
    touchClass: _react.PropTypes.string,
    /**
     * @property onTap
     * @type Function
     * @default null
     * @param {DOMElement} target tap事件的target
     * @description 给Touchable绑定的onTap事件。
     */
    onTap: _react.PropTypes.func,
    /**
     * @skip 给List定制的属性
     */
    onTouchStart: _react.PropTypes.func,
    /**
     * @skip 内部使用标志
     */
    internalUse: _react.PropTypes.bool,
    children: _react.PropTypes.object
};
Touchable.defaultProps = {
    onTouchStart: function onTouchStart() {},
    touchClass: null,
    onTap: function onTap() {},
    internalUse: false
};
Touchable.contextTypes = {
    scroller: _react.PropTypes.object,
    swipeMenuList: _react.PropTypes.object
};
exports.default = Touchable;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FullRoom = function (_React$Component) {
  _inherits(FullRoom, _React$Component);

  function FullRoom(props) {
    _classCallCheck(this, FullRoom);

    return _possibleConstructorReturn(this, (FullRoom.__proto__ || Object.getPrototypeOf(FullRoom)).call(this, props));
  }

  _createClass(FullRoom, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'six' },
        '\u8FD9\u91CC\u662F\u5168\u5C4B\u90E8\u5206'
      );
    }
  }]);

  return FullRoom;
}(_react2.default.Component);

exports.default = FullRoom;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "FullRoom.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Room = function (_React$Component) {
  _inherits(Room, _React$Component);

  function Room(props) {
    _classCallCheck(this, Room);

    var _this = _possibleConstructorReturn(this, (Room.__proto__ || Object.getPrototypeOf(Room)).call(this, props));

    _this.state = {
      good_list: []
    };
    return _this;
  }

  _createClass(Room, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _index2.default,
        { style: { height: '100%' } },
        this.state.good_list
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {

      fetch('/api/v2/h5/index/space?is_json=1&page=' + 1 + '&space=&style=').then(function (response) {
        return response.json();
      }).then(function (result) {

        {/* bind 改变this指向 console.log(this)*/}
        var tempArr = [];{/* 定义空数组保存dom元素集合 */}
        var _data = result.data;
        _data.map(function (item, index) {

          tempArr.push(_react2.default.createElement(
            'dl',
            { className: 'good_list' },
            _react2.default.createElement(
              'dt',
              null,
              _react2.default.createElement(
                'a',
                { href: '#' },
                _react2.default.createElement('img', { style: { width: '100%' }, src: item.img })
              )
            ),
            _react2.default.createElement(
              'dd',
              null,
              _react2.default.createElement(
                'ul',
                null,
                _react2.default.createElement(
                  'li',
                  null,
                  item['app_title']
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  '\uFFE5',
                  item['default_money'],
                  '/',
                  item['space_name']
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  'button',
                  null,
                  '\u5546\u54C1\u6E05\u5355'
                )
              )
            ),
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(
                'span',
                null,
                item['space_name']
              ),
              _react2.default.createElement(
                'span',
                null,
                item['style_name']
              )
            )
          ));
        });
        this.setState({
          good_list: tempArr
        });
      }.bind(this)).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return Room;
}(_react2.default.Component);

exports.default = Room;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Room.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Story = function (_React$Component) {
	_inherits(Story, _React$Component);

	function Story(props) {
		_classCallCheck(this, Story);

		return _possibleConstructorReturn(this, (Story.__proto__ || Object.getPrototypeOf(Story)).call(this, props));
	}

	_createClass(Story, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "shop-story" },
				React.createElement(
					"p",
					null,
					"\u5BB6\u5C45\u751F\u6D3B\u6545\u4E8B"
				),
				React.createElement("img", { src: "/shopimg/2017011314270112829.jpg" }),
				React.createElement(
					"p",
					{ className: "art_text" },
					"\u996D\u5C40\u624D\u662F\u4E2D\u56FD\u4EBA\u6700\u6DF1\u7684\u5957\u8DEF"
				),
				React.createElement(
					"p",
					null,
					"\u5403-\u4E5F\u662F\u6709\u8BB2\u7A76\u7684"
				),
				React.createElement("img", { src: "/shopimg/2017011117070199924.jpg" }),
				React.createElement(
					"p",
					{ className: "art_text" },
					"\u8BA9\u4F60\u58C1\u549A\u90FD\u8D70\u795E\u7684\u5168\u80FD\u6302\u753B\u6280\u80FD"
				),
				React.createElement(
					"p",
					null,
					"\u767D\u5899\u8BE5\u5982\u4F55\u6302\u753B"
				)
			);
		}
	}]);

	return Story;
}(React.Component);

exports.default = Story;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "story.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _prodInvariant = __webpack_require__(8);

var EventPluginRegistry = __webpack_require__(72);
var EventPluginUtils = __webpack_require__(13);
var ReactErrorUtils = __webpack_require__(22);

var accumulateInto = __webpack_require__(23);
var forEachAccumulated = __webpack_require__(24);
var invariant = __webpack_require__(4);

/**
 * Internal store for event listeners
 */
var listenerBank = {};

/**
 * Internal queue of events that have accumulated their dispatches and are
 * waiting to have their dispatches executed.
 */
var eventQueue = null;

/**
 * Dispatches an event and releases it back into the pool, unless persistent.
 *
 * @param {?object} event Synthetic event to be dispatched.
 * @param {boolean} simulated If the event is simulated (changes exn behavior)
 * @private
 */
var executeDispatchesAndRelease = function (event, simulated) {
  if (event) {
    EventPluginUtils.executeDispatchesInOrder(event, simulated);

    if (!event.isPersistent()) {
      event.constructor.release(event);
    }
  }
};
var executeDispatchesAndReleaseSimulated = function (e) {
  return executeDispatchesAndRelease(e, true);
};
var executeDispatchesAndReleaseTopLevel = function (e) {
  return executeDispatchesAndRelease(e, false);
};

var getDictionaryKey = function (inst) {
  // Prevents V8 performance issue:
  // https://github.com/facebook/react/pull/7232
  return '.' + inst._rootNodeID;
};

function isInteractive(tag) {
  return tag === 'button' || tag === 'input' || tag === 'select' || tag === 'textarea';
}

function shouldPreventMouseEvent(name, type, props) {
  switch (name) {
    case 'onClick':
    case 'onClickCapture':
    case 'onDoubleClick':
    case 'onDoubleClickCapture':
    case 'onMouseDown':
    case 'onMouseDownCapture':
    case 'onMouseMove':
    case 'onMouseMoveCapture':
    case 'onMouseUp':
    case 'onMouseUpCapture':
      return !!(props.disabled && isInteractive(type));
    default:
      return false;
  }
}

/**
 * This is a unified interface for event plugins to be installed and configured.
 *
 * Event plugins can implement the following properties:
 *
 *   `extractEvents` {function(string, DOMEventTarget, string, object): *}
 *     Required. When a top-level event is fired, this method is expected to
 *     extract synthetic events that will in turn be queued and dispatched.
 *
 *   `eventTypes` {object}
 *     Optional, plugins that fire events must publish a mapping of registration
 *     names that are used to register listeners. Values of this mapping must
 *     be objects that contain `registrationName` or `phasedRegistrationNames`.
 *
 *   `executeDispatch` {function(object, function, string)}
 *     Optional, allows plugins to override how an event gets dispatched. By
 *     default, the listener is simply invoked.
 *
 * Each plugin that is injected into `EventsPluginHub` is immediately operable.
 *
 * @public
 */
var EventPluginHub = {

  /**
   * Methods for injecting dependencies.
   */
  injection: {

    /**
     * @param {array} InjectedEventPluginOrder
     * @public
     */
    injectEventPluginOrder: EventPluginRegistry.injectEventPluginOrder,

    /**
     * @param {object} injectedNamesToPlugins Map from names to plugin modules.
     */
    injectEventPluginsByName: EventPluginRegistry.injectEventPluginsByName

  },

  /**
   * Stores `listener` at `listenerBank[registrationName][key]`. Is idempotent.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @param {function} listener The callback to store.
   */
  putListener: function (inst, registrationName, listener) {
    !(typeof listener === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Expected %s listener to be a function, instead got type %s', registrationName, typeof listener) : _prodInvariant('94', registrationName, typeof listener) : void 0;

    var key = getDictionaryKey(inst);
    var bankForRegistrationName = listenerBank[registrationName] || (listenerBank[registrationName] = {});
    bankForRegistrationName[key] = listener;

    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.didPutListener) {
      PluginModule.didPutListener(inst, registrationName, listener);
    }
  },

  /**
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   * @return {?function} The stored callback.
   */
  getListener: function (inst, registrationName) {
    // TODO: shouldPreventMouseEvent is DOM-specific and definitely should not
    // live here; needs to be moved to a better place soon
    var bankForRegistrationName = listenerBank[registrationName];
    if (shouldPreventMouseEvent(registrationName, inst._currentElement.type, inst._currentElement.props)) {
      return null;
    }
    var key = getDictionaryKey(inst);
    return bankForRegistrationName && bankForRegistrationName[key];
  },

  /**
   * Deletes a listener from the registration bank.
   *
   * @param {object} inst The instance, which is the source of events.
   * @param {string} registrationName Name of listener (e.g. `onClick`).
   */
  deleteListener: function (inst, registrationName) {
    var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
    if (PluginModule && PluginModule.willDeleteListener) {
      PluginModule.willDeleteListener(inst, registrationName);
    }

    var bankForRegistrationName = listenerBank[registrationName];
    // TODO: This should never be null -- when is it?
    if (bankForRegistrationName) {
      var key = getDictionaryKey(inst);
      delete bankForRegistrationName[key];
    }
  },

  /**
   * Deletes all listeners for the DOM element with the supplied ID.
   *
   * @param {object} inst The instance, which is the source of events.
   */
  deleteAllListeners: function (inst) {
    var key = getDictionaryKey(inst);
    for (var registrationName in listenerBank) {
      if (!listenerBank.hasOwnProperty(registrationName)) {
        continue;
      }

      if (!listenerBank[registrationName][key]) {
        continue;
      }

      var PluginModule = EventPluginRegistry.registrationNameModules[registrationName];
      if (PluginModule && PluginModule.willDeleteListener) {
        PluginModule.willDeleteListener(inst, registrationName);
      }

      delete listenerBank[registrationName][key];
    }
  },

  /**
   * Allows registered plugins an opportunity to extract events from top-level
   * native browser events.
   *
   * @return {*} An accumulation of synthetic events.
   * @internal
   */
  extractEvents: function (topLevelType, targetInst, nativeEvent, nativeEventTarget) {
    var events;
    var plugins = EventPluginRegistry.plugins;
    for (var i = 0; i < plugins.length; i++) {
      // Not every plugin in the ordering may be loaded at runtime.
      var possiblePlugin = plugins[i];
      if (possiblePlugin) {
        var extractedEvents = possiblePlugin.extractEvents(topLevelType, targetInst, nativeEvent, nativeEventTarget);
        if (extractedEvents) {
          events = accumulateInto(events, extractedEvents);
        }
      }
    }
    return events;
  },

  /**
   * Enqueues a synthetic event that should be dispatched when
   * `processEventQueue` is invoked.
   *
   * @param {*} events An accumulation of synthetic events.
   * @internal
   */
  enqueueEvents: function (events) {
    if (events) {
      eventQueue = accumulateInto(eventQueue, events);
    }
  },

  /**
   * Dispatches all synthetic events on the event queue.
   *
   * @internal
   */
  processEventQueue: function (simulated) {
    // Set `eventQueue` to null before processing it so that we can tell if more
    // events get enqueued while processing.
    var processingEventQueue = eventQueue;
    eventQueue = null;
    if (simulated) {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseSimulated);
    } else {
      forEachAccumulated(processingEventQueue, executeDispatchesAndReleaseTopLevel);
    }
    !!eventQueue ? process.env.NODE_ENV !== 'production' ? invariant(false, 'processEventQueue(): Additional events were enqueued while processing an event queue. Support for this has not yet been implemented.') : _prodInvariant('95') : void 0;
    // This would be a good time to rethrow if any of the event handlers threw.
    ReactErrorUtils.rethrowCaughtError();
  },

  /**
   * These are needed for tests only. Do not use!
   */
  __purge: function () {
    listenerBank = {};
  },

  __getListenerBank: function () {
    return listenerBank;
  }

};

module.exports = EventPluginHub;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var caughtError = null;

/**
 * Call a function while guarding against errors that happens within it.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} a First argument
 * @param {*} b Second argument
 */
function invokeGuardedCallback(name, func, a) {
  try {
    func(a);
  } catch (x) {
    if (caughtError === null) {
      caughtError = x;
    }
  }
}

var ReactErrorUtils = {
  invokeGuardedCallback: invokeGuardedCallback,

  /**
   * Invoked by ReactTestUtils.Simulate so that any errors thrown by the event
   * handler are sure to be rethrown by rethrowCaughtError.
   */
  invokeGuardedCallbackWithCatch: invokeGuardedCallback,

  /**
   * During execution of guarded functions we will capture the first error which
   * we will rethrow to be handled by the top level error handler.
   */
  rethrowCaughtError: function () {
    if (caughtError) {
      var error = caughtError;
      caughtError = null;
      throw error;
    }
  }
};

if (process.env.NODE_ENV !== 'production') {
  /**
   * To help development we can get better devtools integration by simulating a
   * real browser event.
   */
  if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function' && typeof document !== 'undefined' && typeof document.createEvent === 'function') {
    var fakeNode = document.createElement('react');
    ReactErrorUtils.invokeGuardedCallback = function (name, func, a) {
      var boundFunc = func.bind(null, a);
      var evtType = 'react-' + name;
      fakeNode.addEventListener(evtType, boundFunc, false);
      var evt = document.createEvent('Event');
      // $FlowFixMe https://github.com/facebook/flow/issues/2336
      evt.initEvent(evtType, false, false);
      fakeNode.dispatchEvent(evt);
      fakeNode.removeEventListener(evtType, boundFunc, false);
    };
  }
}

module.exports = ReactErrorUtils;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(8);

var invariant = __webpack_require__(4);

/**
 * Accumulates items that must not be null or undefined into the first one. This
 * is used to conserve memory by avoiding array allocations, and thus sacrifices
 * API cleanness. Since `current` can be null before being passed in and not
 * null after this function, make sure to assign it back to `current`:
 *
 * `a = accumulateInto(a, b);`
 *
 * This API should be sparingly used. Try `accumulate` for something cleaner.
 *
 * @return {*|array<*>} An accumulation of items.
 */

function accumulateInto(current, next) {
  !(next != null) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'accumulateInto(...): Accumulated items must not be null or undefined.') : _prodInvariant('30') : void 0;

  if (current == null) {
    return next;
  }

  // Both are not empty. Warning: Never call x.concat(y) when you are not
  // certain that x is an Array (x could be a string with concat method).
  if (Array.isArray(current)) {
    if (Array.isArray(next)) {
      current.push.apply(current, next);
      return current;
    }
    current.push(next);
    return current;
  }

  if (Array.isArray(next)) {
    // A bit too dangerous to mutate `next`.
    return [current].concat(next);
  }

  return [current, next];
}

module.exports = accumulateInto;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



/**
 * @param {array} arr an "accumulation" of items which is either an Array or
 * a single item. Useful when paired with the `accumulate` module. This is a
 * simple utility that allows us to reason about a collection of items, but
 * handling the case when there is exactly one item (and we do not need to
 * allocate an array).
 */

function forEachAccumulated(arr, cb, scope) {
  if (Array.isArray(arr)) {
    arr.forEach(cb, scope);
  } else if (arr) {
    cb.call(scope, arr);
  }
}

module.exports = forEachAccumulated;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var shallowEqual = __webpack_require__(31);

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 27 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(3);

var _Home = __webpack_require__(47);

var _Home2 = _interopRequireDefault(_Home);

var _Room = __webpack_require__(19);

var _Room2 = _interopRequireDefault(_Room);

var _FullRoom = __webpack_require__(18);

var _FullRoom2 = _interopRequireDefault(_FullRoom);

var _Shop = __webpack_require__(49);

var _Shop2 = _interopRequireDefault(_Shop);

var _User = __webpack_require__(50);

var _User2 = _interopRequireDefault(_User);

var _cartshop = __webpack_require__(59);

var _cartshop2 = _interopRequireDefault(_cartshop);

var _Footer = __webpack_require__(46);

var _Footer2 = _interopRequireDefault(_Footer);

var _Matter = __webpack_require__(56);

var _Matter2 = _interopRequireDefault(_Matter);

var _Standard = __webpack_require__(57);

var _Standard2 = _interopRequireDefault(_Standard);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //引入router

//import Footer from './Footer.js';

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'main_container' },
        _react2.default.createElement(
          'section',
          { id: 'header_and_content' },
          this.props.children
        ),
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.hashHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: 'home/room' }),
    _react2.default.createElement(_reactRouter.Redirect, { from: 'home', to: 'home/room' }),
    _react2.default.createElement(
      _reactRouter.Route,
      { path: 'home', component: _Home2.default },
      _react2.default.createElement(_reactRouter.Route, { path: 'room', component: _Room2.default }),
      _react2.default.createElement(_reactRouter.Route, { path: 'fullroom', component: _FullRoom2.default })
    ),
    _react2.default.createElement(_reactRouter.Route, { path: 'shop', component: _Shop2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'user', component: _User2.default })
  ),
  _react2.default.createElement(
    _reactRouter.Route,
    { path: 'cartshop', component: _cartshop2.default },
    _react2.default.createElement(_reactRouter.Route, { path: 'matter', component: _Matter2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: 'standard', component: _Standard2.default })
  )
), document.getElementById('root'));

// class Index extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       name: []
//     }
//   }
//
//   render() {
//     return (
//       <div>{ this.state.name }</div>
//     )
//   }
//
//   componentDidMount() {
//     fetch('/api/list.php')
//     .then(response=>response.json())
//     // function(response) {
//     //   return response.json()
//     // }
//     .then(res=>{
//       // console.log(res);
//       this.setState({
//         name: <div>{res.xixixi}</div>
//       })
//     })
//   }
// }

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "App.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * Allows extraction of a minified key. Let's the build system minify keys
 * without losing the ability to dynamically use key strings as values
 * themselves. Pass in an object with a single key/val pair and it will return
 * you the string key of that single record. Suppose you want to grab the
 * value for a key 'className' inside of an object. Key/val minification may
 * have aliased that key to be 'xa12'. keyOf({className: null}) will return
 * 'xa12' in that case. Resolve keys you want to use once at startup time, then
 * reuse those resolutions.
 */
var keyOf = function keyOf(oneKeyObj) {
  var key;
  for (key in oneKeyObj) {
    if (!oneKeyObj.hasOwnProperty(key)) {
      continue;
    }
    return key;
  }
  return null;
};

module.exports = keyOf;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */



var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function () {
    var ALLOWANCEAngle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.57;
    var ALLOWANCEDistance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 30;
    return {
        handleData: function handleData(_ref, children) {
            var loop = _ref.loop,
                pageNow = _ref.pageNow;

            var newChildren = _react2.default.Children.toArray(children);
            if (loop) {
                var len = children.length;
                var lastfakeDomStyle = {
                    key: 0
                };
                var firstFakeDomStyle = {
                    key: -1
                };
                if (children[0].type === 'li') {
                    lastfakeDomStyle.className = children[len - 1].props.className ? children[len - 1].props.className + ' extra-item' : 'extra-item';
                } else {
                    lastfakeDomStyle.index = len;
                    lastfakeDomStyle.extraClass = children[len - 1].props.extraClass ? children[len - 1].props.extraClass + ' extra-item' : 'extra-item';
                    firstFakeDomStyle.index = 1;
                }
                var header = _react2.default.cloneElement(children[len - 1], lastfakeDomStyle);
                var footer = _react2.default.cloneElement(children[0], firstFakeDomStyle);
                newChildren.unshift(header);
                newChildren.push(footer);
            }
            return newChildren;
        },
        touchstart: function touchstart() {},
        touchmove: function touchmove(_ref2) {
            var touchstartLocation = _ref2.touchstartLocation,
                touchmoveLocation = _ref2.touchmoveLocation,
                pageNow = _ref2.pageNow,
                containerDOM = _ref2.containerDOM,
                width = _ref2.width;

            var translateX = (pageNow - 1) * width + touchstartLocation[0] - touchmoveLocation[0];
            this._addCss({
                dom: containerDOM,
                speed: 0,
                translateX: -translateX,
                reset: true,
                width: width
            });
        },
        touchend: function touchend(aniObj) {
            var touchstartLocation = aniObj.touchstartLocation,
                touchendLocation = aniObj.touchendLocation,
                pageNow = aniObj.pageNow;

            var distanceX = touchendLocation[0] - touchstartLocation[0];
            var distanceY = touchendLocation[1] - touchstartLocation[1];
            var tan = Math.abs(distanceX) / Math.abs(distanceY);
            var newpageNow = pageNow;
            if (Math.abs(distanceX) > ALLOWANCEDistance && tan > ALLOWANCEAngle) {
                newpageNow = distanceX > 0 ? pageNow - 1 : pageNow + 1;
            } else {
                newpageNow = pageNow;
            }
            return this.checkAni(aniObj, newpageNow);
        },
        checkAni: function checkAni(aniObj, pageNow) {
            var _this = this;

            var pagesNum = aniObj.pagesNum,
                speed = aniObj.speed,
                containerDOM = aniObj.containerDOM,
                loop = aniObj.loop,
                aniSpeed = aniObj.aniSpeed,
                width = aniObj.width;

            if (this.moving) window.clearInterval(this.moving);
            var translateX = width * (1 - pageNow);
            var newpageNow = pageNow;
            if (pageNow < 1 || pageNow > pagesNum) {
                if (loop) {
                    // console.log(`checkAni 延迟处理${pageNow}`);
                    this.moving = window.setTimeout(function () {
                        var translate = 0;
                        if (pageNow === 0) {
                            translate = width * (1 - pagesNum);
                        }
                        _this._addCss({
                            dom: containerDOM,
                            reset: true,
                            translateX: translate,
                            width: width
                        });
                        _this.moving = null;
                    }, (speed + aniSpeed) * 1000);
                    newpageNow = pageNow === 0 ? pagesNum : 1;
                } else {
                    newpageNow = pageNow < 1 ? 1 : pagesNum;
                    translateX = width * (1 - newpageNow);
                }
            }
            this._addCss({
                dom: containerDOM,
                reset: false,
                speed: speed,
                translateX: translateX,
                width: width
            });
            return newpageNow;
        },
        next: function next(aniObj) {
            var pageNow = aniObj.pageNow;

            var pageNext = pageNow + 1;
            return this.checkAni(aniObj, pageNext);
        },
        prev: function prev(aniObj) {
            var pageNow = aniObj.pageNow,
                containerDOM = aniObj.containerDOM,
                speed = aniObj.speed,
                width = aniObj.width;

            var pageNext = pageNow - 1;
            var translateX = width * (1 - pageNext);
            this._addCss({
                dom: containerDOM,
                speed: speed,
                translateX: translateX
            });
            return this.checkAni(aniObj, pageNext);
        },
        arrive: function arrive(aniObj, num, isAni) {
            if (num >= 1 && num <= aniObj.pagesNum) {
                var translateX = (1 - num) * aniObj.width;
                this._addCss({
                    dom: aniObj.containerDOM,
                    speed: 0.1,
                    translateX: translateX,
                    reset: !isAni,
                    width: aniObj.width
                });
            } else {
                console.log('\u4F20\u5165carousel\u7EC4\u5EFA\u7684arrive\u65B9\u6CD5\u7684\u9875\u9762\u4E3A' + num + ',\u8BE5\u503C\u4E0D\u5408\u6CD5');
            }
            return num;
        },
        _addCss: function _addCss(_ref3) {
            var dom = _ref3.dom,
                _ref3$translateX = _ref3.translateX,
                translateX = _ref3$translateX === undefined ? 0 : _ref3$translateX,
                reset = _ref3.reset,
                ani = _objectWithoutProperties(_ref3, ['dom', 'translateX', 'reset']);

            // 此处为Dom操作
            if (reset) {
                dom.style.webkitTransition = 'none';
                dom.style.transition = 'none';
            } else {
                dom.style.webkitTransition = '';
                dom.style.transition = '';
            }
            dom.style.webkitTransform = 'translate(' + translateX + 'px, 0) translateZ(0)';
            dom.style.transform = 'translate(' + translateX + 'px, 0) translateZ(0)';
        }
    };
};

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "aniScrollx.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(84);

__webpack_require__(6);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsShallowCompare = __webpack_require__(70);

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Carousel.CarouselItem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description Carousel组件内部的Item组件，和普通的dom节点相比增加了懒加载图片功能。也可以使用`onTap`给Item绑定tap事件回调。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 你可以通过Carousel.CarouselItem来使用这个组件，或者引用`yo3/component/carousel/src/carouselItem`的js模块来使用。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ** 注意：`CarouselItem`不能和`Touchable`一起使用，请使用它的`onTap`属性来绑定事件回调。 **
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ALLOWANCE = 1;
var LOADED = 1;
var UNLOAD = 0;
var FAIL = 2;

var CarouselItem = function (_Component) {
    _inherits(CarouselItem, _Component);

    function CarouselItem(props) {
        _classCallCheck(this, CarouselItem);

        var _this = _possibleConstructorReturn(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

        if (props.img) {
            _this.state = {
                img: 0
            };
        }
        _this.handleTap = _this.handleTap.bind(_this);
        _this.hasUnmount = false;
        return _this;
    }

    _createClass(CarouselItem, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.lazyload(this.props);
        }
    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
            var propsChange = (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
            var contextChange = this.context.currentPage !== nextContext.currentPage || this.context.pagesNum !== nextContext.pagesNum;
            return propsChange || contextChange;
        }
    }, {
        key: 'componentWillUpdate',
        value: function componentWillUpdate(nextProps, nextState, nextContext) {
            this.lazyload(nextContext.currentPage);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.hasUnmount = true;
        }
    }, {
        key: 'handleTap',
        value: function handleTap(e) {
            this.props.onTap(e);
        }
    }, {
        key: 'loadImg',
        value: function loadImg() {
            var _this2 = this;

            if (!this.props.img) {
                return;
            }
            this.imgNode = new Image();
            this.imgNode.onload = function () {
                var imgState = void 0;
                imgState = 1;
                if (_this2.props.checkImgFun && !_this2.props.checkImgFun(_this2.imgNode)) {
                    imgState = 2;
                }
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: imgState
                    });
                }
            };
            this.imgNode.onerror = function () {
                if (!_this2.hasUnmount) {
                    _this2.setState({
                        img: 2
                    });
                }
            };
            this.imgNode.src = this.props.img;
        }
    }, {
        key: 'lazyload',
        value: function lazyload(currentPage) {
            if (this.state.img) {
                return;
            }
            if (!this.props.lazyload) {
                this.loadImg();
            } else {
                if (Math.abs(currentPage - this.props.index) <= ALLOWANCE || this.props.index === 1 || this.props.index === this.context.pagesNum) {
                    this.loadImg();
                }
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var img = null;
            var classList = void 0;
            var activeClass = {};
            if (this.props.img) {
                switch (this.state.img) {
                    case LOADED:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.img, className: 'img', draggable: 'false' });
                        break;
                    case FAIL:
                        img = _react2.default.createElement('img', { alt: '', src: this.props.errorImg, className: 'img', draggable: 'false' });
                        break;
                    case UNLOAD:
                    default:
                        img = this.props.loadingEle;
                        break;
                }
            }
            activeClass[this.props.activeClass] = this.context.currentPage === this.props.index;
            if (this.props.extraClass) {
                activeClass[this.props.extraClass] = true;
            }
            classList = (0, _classnames2.default)('item', activeClass);
            return _react2.default.createElement(
                'li',
                { className: classList, style: this.props.style, onTouchTap: this.handleTap },
                img
            );
        }
    }]);

    return CarouselItem;
}(_react.Component);

CarouselItem.propTypes = {
    /**
     * @type String
     * @property img
     * @description 图片地址。
     */
    img: _react.PropTypes.string,
    /**
     * @type String
     * @property errorImg
     * @description 图片加载失败时的替换图片。
     */
    errorImg: _react.PropTypes.string,
    /**
     * @type Function
     * @property checkImgFun
     * @description 目标图片onload时触发进行判断的函数。
     * @param 图片实例
     */
    checkImgFun: _react.PropTypes.func,
    /**
     * @type Function
     * @property onTap
     * @param {e} 事件对象，传入组件数据
     * @description item点击事件处理函数。
     */
    onTap: _react.PropTypes.func,
    /**
     * @property extraClass
     * @type String
     * @description 为组件根节点提供额外的class。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @type Element
     * @property loadingEle
     * @description 图片加载时的loading Element。
     */
    loadingEle: _react.PropTypes.element,
    /**
     * @type Bool
     * @property lazyload
     * @description 是否需要图片懒加载。默认值为true,当前图片的前后两个节点图片被加载。
     */
    lazyload: _react.PropTypes.bool,
    /**
     * item是当前展示item的样式名
     * @type String
     * @property activeClass
     * @description item是当前展示item的样式名，默认值为'on'。
     */
    activeClass: _react.PropTypes.string,
    index: _react.PropTypes.number,
    style: _react.PropTypes.object
};
CarouselItem.defaultProps = {
    errorImg: '//s.qunarzz.com/mobile_search_touch/intention-search-h5/loading.gif',
    loadingEle: null,
    lazyload: true,
    activeClass: 'on',
    onTap: function onTap() {}
};
CarouselItem.contextTypes = {
    currentPage: _react2.default.PropTypes.number.isRequired,
    pagesNum: _react2.default.PropTypes.number.isRequired
};
exports.default = CarouselItem;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "carouselItem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _EventEmitter2 = __webpack_require__(35);

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 大型组件使用的抽象Model类，用于集中管理组件内部的逻辑和状态。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ComponentCore = function (_EventEmitter) {
    _inherits(ComponentCore, _EventEmitter);

    function ComponentCore(namespace) {
        _classCallCheck(this, ComponentCore);

        var _this = _possibleConstructorReturn(this, (ComponentCore.__proto__ || Object.getPrototypeOf(ComponentCore)).call(this));

        _this.instanceId = ++ComponentCore.instanceId;
        _this.namespace = namespace;
        return _this;
    }

    _createClass(ComponentCore, [{
        key: '_getEventName',
        value: function _getEventName(eventName) {
            return 'yo/component/' + this.namespace + '/' + eventName + '/' + this.instanceId;
        }
    }, {
        key: 'emitEvent',
        value: function emitEvent(eventName) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this.emit.apply(this, [this._getEventName(eventName)].concat(args));
            return this;
        }
    }, {
        key: 'registerEventHandler',
        value: function registerEventHandler(eventName, handler) {
            this.on(this._getEventName(eventName), handler.bind(this));
            return this;
        }
    }, {
        key: 'getAttr',
        value: function getAttr(item, attrKey) {
            return typeof item.get === 'function' ? item.get(attrKey) : item[attrKey];
        }
    }, {
        key: 'setAttr',
        value: function setAttr(item, attrKey, value) {
            var ret = null;
            if (typeof item.set === 'function') {
                ret = item.set(attrKey, value);
            } else {
                ret = Object.assign({}, item, _defineProperty({}, attrKey, value));
            }
            return ret;
        }
    }]);

    return ComponentCore;
}(_EventEmitter3.default);

ComponentCore.instanceId = -1;
exports.default = ComponentCore;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ComponentCore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Apply = Function.prototype.apply;
var privateMap = new WeakMap();

// For making private properties.
function internal(obj) {
  if (!privateMap.has(obj)) {
    privateMap.set(obj, {});
  }

  return privateMap.get(obj);
}

/** Class EventEmitter for event-driven architecture. */

var EventEmitter = function () {
  /**
   * Constructor.
   *
   * @constructor
   * @param {number|null} maxListeners.
   * @param {object} localConsole.
   *
   * Set private initial parameters:
   *   _events, _callbacks, _maxListeners, _console.
   *
   * @return {this}
   */
  function EventEmitter() {
    var maxListeners = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var localConsole = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : console;

    _classCallCheck(this, EventEmitter);

    var self = internal(this);

    self._events = new Set();
    self._callbacks = {};
    self._console = localConsole;
    self._maxListeners = maxListeners === null ? null : parseInt(maxListeners, 10);

    return this;
  }

  /**
   * Add callback to the event.
   *
   * @param {string} eventName.
   * @param {function} callback
   * @param {object|null} context - In than context will be called callback.
   * @param {number} weight - Using for sorting callbacks calls.
   *
   * @return {this}
   */


  _createClass(EventEmitter, [{
    key: '_addCallback',
    value: function _addCallback(eventName, callback, context, weight) {
      this._getCallbacks(eventName).push({
        callback: callback,
        context: context,
        weight: weight
      });

      // Sort the array of callbacks in
      // the order of their call by "weight".
      this._getCallbacks(eventName).sort(function (a, b) {
        return a.weight > b.weight;
      });

      return this;
    }

    /**
     * Get all callback for the event.
     *
     * @param {string} eventName
     *
     * @return {object|undefined}
     */

  }, {
    key: '_getCallbacks',
    value: function _getCallbacks(eventName) {
      return internal(this)._callbacks[eventName];
    }

    /**
     * Get callback's index for the event.
     *
     * @param {string} eventName
     * @param {callback} callback
     *
     * @return {number|null}
     */

  }, {
    key: '_getCallbackIndex',
    value: function _getCallbackIndex(eventName, callback) {
      return this._has(eventName) ? this._getCallbacks(eventName).findIndex(function (element) {
        return element.callback === callback;
      }) : null;
    }

    /**
     * Check if we achive maximum of listeners for the event.
     *
     * @param {string} eventName
     *
     * @return {bool}
     */

  }, {
    key: '_achieveMaxListener',
    value: function _achieveMaxListener(eventName) {
      return internal(this)._maxListeners !== null && internal(this)._maxListeners <= this.listenersNumber(eventName);
    }

    /**
     * Check if callback is already exists for the event.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     *
     * @return {bool}
     */

  }, {
    key: '_callbackIsExists',
    value: function _callbackIsExists(eventName, callback, context) {
      var callbackInd = this._getCallbackIndex(eventName, callback);
      var activeCallback = callbackInd !== -1 ? this._getCallbacks(eventName)[callbackInd] : void 0;

      return callbackInd !== -1 && activeCallback && activeCallback.context === context;
    }

    /**
     * Check is the event was already added.
     *
     * @param {string} eventName
     *
     * @return {bool}
     */

  }, {
    key: '_has',
    value: function _has(eventName) {
      return internal(this)._events.has(eventName);
    }

    /**
     * Add the listener.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     * @param {number} weight - Using for sorting callbacks calls.
     *
     * @return {this}
     */

  }, {
    key: 'on',
    value: function on(eventName, callback) {
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      /* eslint no-unused-vars: 0 */
      var self = internal(this);

      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }

      // If event wasn't added before - just add it
      // and define callbacks as an empty object.
      if (!this._has(eventName)) {
        self._events.add(eventName);
        self._callbacks[eventName] = [];
      } else {
        // Check if we reached maximum number of listeners.
        if (this._achieveMaxListener(eventName)) {
          self._console.warn('Max listeners (' + self._maxListeners + ')' + (' for event "' + eventName + '" is reached!'));
        }

        // Check if the same callback has already added.
        if (this._callbackIsExists.apply(this, arguments)) {
          self._console.warn('Event "' + eventName + '"' + (' already has the callback ' + callback + '.'));
        }
      }

      this._addCallback.apply(this, arguments);

      return this;
    }

    /**
     * Add the listener which will be executed only once.
     *
     * @param {string} eventName
     * @param {function} callback
     * @param {object|null} context - In than context will be called callback.
     * @param {number} weight - Using for sorting callbacks calls.
     *
     * @return {this}
     */

  }, {
    key: 'once',
    value: function once(eventName, callback) {
      var _this = this;

      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var weight = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

      var onceCallback = function onceCallback() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this.off(eventName, onceCallback);
        return Apply.call(callback, context, args);
      };

      return this.on(eventName, onceCallback, context, weight);
    }

    /**
     * Remove an event at all or just remove selected callback from the event.
     *
     * @param {string} eventName
     * @param {function} callback
     *
     * @return {this}
     */

  }, {
    key: 'off',
    value: function off(eventName) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var self = internal(this);
      var callbackInd = void 0;

      if (this._has(eventName)) {
        if (callback === null) {
          // Remove the event.
          self._events.delete(eventName);
          // Remove all listeners.
          self._callbacks[eventName] = null;
        } else {
          callbackInd = this._getCallbackIndex(eventName, callback);

          if (callbackInd !== -1) {
            self._callbacks[eventName].splice(callbackInd, 1);
            // Remove all equal callbacks.
            this.off.apply(this, arguments);
          }
        }
      }

      return this;
    }

    /**
     * Trigger the event.
     *
     * @param {string} eventName
     * @param {...args} args - All arguments which should be passed into callbacks.
     *
     * @return {this}
     */

  }, {
    key: 'emit',
    value: function emit(eventName) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this._has(eventName)) {
        // All callbacks will be triggered sorter by "weight" parameter.
        this._getCallbacks(eventName).forEach(function (element) {
          return Apply.call(element.callback, element.context, args);
        });
      }

      return this;
    }

    /**
     * Clear all events and callback links.
     *
     * @return {this}
     */

  }, {
    key: 'clear',
    value: function clear() {
      var self = internal(this);

      self._events.clear();
      self._callbacks = {};

      return this;
    }

    /**
     * Returns number of listeners for the event.
     *
     * @param {string} eventName
     *
     * @return {number|null} - Number of listeners for event
     *                         or null if event isn't exists.
     */

  }, {
    key: 'listenersNumber',
    value: function listenersNumber(eventName) {
      return this._has(eventName) ? this._getCallbacks(eventName).length : null;
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "EventEmitter.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/

    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */

    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;

        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;

        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;

        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;

        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;

        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;

        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;

        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }

        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                        if (!event.propagationStopped) {
                            callback(event);
                        }
                    }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent);

    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && /OS [6-7]_\d/.test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if (deviceIsIOS && target.type === 'file' || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/.test(target.className)
        );
    };

    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/.test(target.className)
                );
        }
    };

    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };

    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };

    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };

    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };

    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if (event.timeStamp - this.lastClickTime < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };

    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0],
            boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };

    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };

    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };

    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement,
            trackingClickStart,
            targetTagName,
            scrollParent,
            touch,
            targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if (this.lastClickTime) {
            if (event.timeStamp - this.lastClickTime < this.tapDelay) {
                this.cancelNextClick = true;
                return true;
            }
        }

        if (this.trackingClickStart) {
            if (event.timeStamp - this.trackingClickStart > this.tapTimeout) {
                return true;
            }
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if (event.timeStamp - trackingClickStart > 100 || deviceIsIOS && window.top !== window && targetTagName === 'input') {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            //if (!deviceIsIOS || targetTagName !== 'select') {
            //    this.targetElement = null;
            //    event.preventDefault();
            //}

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };

    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };

    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };

    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };

    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };

    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        //HACK by zongze.li add 757--759: hack for chrome version 30、37 in vivo x5 pro and HuaWei mate7, which still has 300ms delay with user-scalable=no
                        if (chromeVersion <= 38) {
                            return false;
                        }

                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick

                    //HACK by zongze.li change 31 into 38: hack for chrome version 30、37 in vivo x5 pro and HuaWei mate7, which still has 300ms delay with width=device-width

                    //origin: if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {

                    if (chromeVersion > 38 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };

    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };

    if ("function" === 'function' && _typeof(__webpack_require__(27)) === 'object' && __webpack_require__(27)) {

        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return FastClick;
        }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
})();

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "fastclick.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

__webpack_require__(6);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(17);

var _src2 = _interopRequireDefault(_src);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component InputNumber
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 数字输入框组件，输入特定范围内的数值。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件显示的数值范围，每次改变的步长。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 组件数值超过设置范围，按钮不可击。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 超过边界值，会自动设定为边界值。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可手动输入任意字符，若输入的不是数字，会自动回退到之前的数字。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 支持小数、负数形式。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./inputNumber.md}{instruUrl: inputnumber.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var defaultProps = {
    value: 0,
    step: 1,
    min: -10000,
    max: 10000,
    decimalNum: 0,
    extraClass: '',
    disable: false,
    inputDisable: false,
    onChange: function onChange() {}
};

var propTypes = {
    /**
     * @property value
     * @description 组件默认显示的值
     * @type Number
     * @default 0
     */
    value: _react.PropTypes.number.isRequired,
    /**
     * @property step
     * @description 单次加减的步长
     * @type Number
     * @default 1
     */
    step: _react.PropTypes.number,
    /**
     * @property min
     * @description 组件显示的最小值
     * @type Number
     * @default -10000
     */
    min: _react.PropTypes.number,
    /**
     * @property max
     * @description 组件显示的最大值
     * @type Number
     * @default 10000
     */
    max: _react.PropTypes.number,
    /**
     * @property decimalNum
     * @description 组件显示的小数位数
     * @type Number
     * @default 0
     */
    decimalNum: _react.PropTypes.number,
    /**
     * @property extraClass
     * @description 组件额外的样式类
     * @type String
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property disable
     * @description 组件可不可用
     * @type Bool
     * @default false
     */
    disable: _react.PropTypes.bool,
    /**
     * @property inputDisable
     * @description 组件手动输入框是否不可用
     * @type Bool
     * @default false
     */
    inputDisable: _react.PropTypes.bool,
    /**
     * @property onChange
     * @description 修改数字时触发的回调函数
     * @param {Number} value 组件返回的数字
     * @type Function
     * @default () => {}
     */
    onChange: _react.PropTypes.func.isRequired
};

var Number = function (_Component) {
    _inherits(Number, _Component);

    function Number(props) {
        _classCallCheck(this, Number);

        var _this = _possibleConstructorReturn(this, (Number.__proto__ || Object.getPrototypeOf(Number)).call(this, props));

        var value = props.value,
            step = props.step,
            min = props.min,
            max = props.max,
            decimalNum = props.decimalNum,
            disable = props.disable,
            inputDisable = props.inputDisable;

        _this.state = {
            min: min,
            max: max,
            step: step,
            value: value,
            decimalNum: decimalNum,
            disable: disable,
            inputDisable: inputDisable,
            plusDisable: false,
            minusDisable: false
        };
        _this._node = null;
        if (isNaN(value)) {
            throw new Error('不合法的value');
        }
        _this.cachedInput = value;
        return _this;
    }

    _createClass(Number, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.resetState(this.state);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newState = Object.assign({}, this.state, nextProps, {
                plusDisable: false,
                minusDisable: false
            });
            this.resetState(newState);
        }

        /**
         * 返回一个合法的value
         * 不合法的情况包括:
         * value是NaN，这时候返回上一个合法的value
         * value>max或者value<min，返回max或者min
         * 否则返回原来的value
         * @param val
         * @param min
         * @param max
         * @returns {Number}
         */

    }, {
        key: 'getValidValue',
        value: function getValidValue(val) {
            var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props.min;
            var max = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.props.max;

            var value = parseFloat(val);
            if (isNaN(value)) {
                return parseFloat(this.cachedInput);
            } else if (value < min) {
                return min;
            } else if (value > max) {
                return max;
            }
            return value;
        }

        /**
         * 重新渲染Number组件时更新组件的状态
         * @param obj {Object} this.state对象形式
         */

    }, {
        key: 'resetState',
        value: function resetState(obj) {
            var stateObj = obj;
            stateObj.step = parseFloat(stateObj.step) || 0;
            stateObj.max = parseFloat(stateObj.max) || 0;
            stateObj.min = parseFloat(stateObj.min) || 0;
            var disable = stateObj.disable,
                min = stateObj.min,
                max = stateObj.max,
                decimalNum = stateObj.decimalNum;
            var value = stateObj.value;
            // 格式化更新的数字

            value = this.getValidValue(value, min, max).toFixed(decimalNum);

            // 组件不可用时， 输入框和加减按钮均不可用
            if (disable) {
                this.setState({ value: value, disable: disable, inputDisable: true, plusDisable: true, minusDisable: true });
                return;
            }
            // 这里的比较要用toFixed以后的值
            // 设想这种场景，用户输入0.3，min设为0，步长是0，那么显示在input的是0
            // 但是value仍然是0.3，如果用0.3和min比较，显然0.3大于min，这时候minusDiable是false
            // 结果就是input显示0，但是-按钮并没有被禁用，这是不正确的
            if (parseFloat(value) === max) {
                stateObj.plusDisable = true;
            }
            if (parseFloat(value) === min) {
                stateObj.minusDisable = true;
            }
            stateObj.value = value;
            this.setState(stateObj);
        }

        /**
         * minusValue 减号触发的函数
         * @param val {Number} input输入框的value值
         */

    }, {
        key: 'minusValue',
        value: function minusValue(val) {
            if (this.state.minusDisable) {
                return;
            }
            var value = parseFloat(val) || 0;
            value -= this.state.step;
            this.wrapChange(value);
        }

        /**
         * plusValue 加好触发的函数， 参数为string形式，通过'+'运算符转为Number类型
         * @param val {String}
         */

    }, {
        key: 'plusValue',
        value: function plusValue(val) {
            if (this.state.plusDisable) {
                return;
            }
            var value = parseFloat(val) || 0;
            value += this.state.step;
            this.wrapChange(value);
        }

        /**
         * 在处理onChange的参数时要非常小心，因为允许用户通过键盘输入，可能会输入一个不符合decimalNum的数字
         * 例如domNum=0，step=1，输入0.3的情况
         * 这时候实际上组件会自动纠错，将0.3转化成0，这时候onChange的应该是纠错以后的value
         * 还有可能出现用户输入非法字符例如aaa，这时候会通过getValidValue来恢复上一次的合法输入
         * @param val
         * @returns {Number}
         */

    }, {
        key: 'wrapChange',
        value: function wrapChange(val) {
            var value = parseFloat(this.getValidValue(val).toFixed(this.state.decimalNum));
            this.props.onChange(value);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _state = this.state,
                inputDisable = _state.inputDisable,
                plusDisable = _state.plusDisable,
                minusDisable = _state.minusDisable;

            var minusDisableClass = minusDisable ? 'disabled' : '';
            var plusDisableClass = plusDisable ? 'disabled' : '';
            return _react2.default.createElement(
                'div',
                { className: (0, _classnames2.default)('yo-number', this.props.extraClass) },
                _react2.default.createElement(
                    _src2.default,
                    {
                        touchClass: minusDisable ? '' : 'action-touch',
                        onTap: function onTap() {
                            return _this2.minusValue(_this2._node.value);
                        }
                    },
                    _react2.default.createElement(
                        'span',
                        { className: (0, _classnames2.default)('minus', minusDisableClass) },
                        '-'
                    )
                ),
                _react2.default.createElement('input', {
                    className: 'input', type: 'text', value: this.state.value,
                    disabled: inputDisable ? 'disabled' : '',
                    ref: function ref(target) {
                        _this2._node = target;
                    },
                    onChange: function onChange(evt) {
                        // 允许使用者输入任意字符，在blur的时候再去检测他的输入是否合法
                        _this2.setState({ value: evt.target.value });
                    },
                    onBlur: function onBlur(evt) {
                        _this2.wrapChange(evt.target.value);
                    },
                    onFocus: function onFocus(evt) {
                        // 保存当前的value，这个value一定是合法的
                        // 如果输入的字符不合法，就使用保存的value进行恢复
                        // 同时，需要禁止+-按钮的点击
                        _this2.cachedInput = evt.target.value;
                        _this2.setState({ plusDisable: true, minusDisable: true });
                    }
                }),
                _react2.default.createElement(
                    _src2.default,
                    {
                        touchClass: plusDisable ? '' : 'action-touch',
                        onTap: function onTap() {
                            return _this2.plusValue(_this2._node.value);
                        }
                    },
                    _react2.default.createElement(
                        'span',
                        { className: (0, _classnames2.default)('plus', plusDisableClass) },
                        '+'
                    )
                )
            );
        }
    }]);

    return Number;
}(_react.Component);

exports.default = Number;


Number.defaultProps = defaultProps;
Number.propTypes = propTypes;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ComponentCore2 = __webpack_require__(34);

var _ComponentCore3 = _interopRequireDefault(_ComponentCore2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * List核心逻辑,负责管理List组件的内部状态
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var ListCore = function (_ComponentCore) {
    _inherits(ListCore, _ComponentCore);

    /**
     * @param dataSource 数据源
     * @param offsetY 列表的初始Y偏移
     * @param infinite 是否是无穷列表
     * @param itemHeight 列表项高度
     * @param visibleSize 保留在列表容器中列表项的数组
     * @description 构造函数,会通过调用refresh方法进行初始化
     */
    function ListCore(_ref) {
        var dataSource = _ref.dataSource,
            _ref$offsetY = _ref.offsetY,
            offsetY = _ref$offsetY === undefined ? 0 : _ref$offsetY,
            _ref$infinite = _ref.infinite,
            infinite = _ref$infinite === undefined ? true : _ref$infinite,
            itemHeight = _ref.itemHeight,
            _ref$infiniteSize = _ref.infiniteSize,
            infiniteSize = _ref$infiniteSize === undefined ? 12 : _ref$infiniteSize,
            _ref$staticSectionHei = _ref.staticSectionHeight,
            staticSectionHeight = _ref$staticSectionHei === undefined ? 0 : _ref$staticSectionHei;

        _classCallCheck(this, ListCore);

        // 静态属性
        // 这些属性不会随着父组件render改变
        var _this = _possibleConstructorReturn(this, (ListCore.__proto__ || Object.getPrototypeOf(ListCore)).call(this, 'list'));

        _this.itemHeight = itemHeight;
        // 保存列表项定位信息的表,List组件不定高模式的核心数据结构
        _this.positionMap = {};
        // 在refresh中设置的属性可以通过父组件的render改变
        _this.refresh({
            dataSource: dataSource,
            refreshAll: false,
            infiniteSize: infiniteSize,
            staticSectionHeight: staticSectionHeight,
            offsetY: offsetY,
            infinite: infinite
        });
        return _this;
    }

    /**
     * @param ds
     * @param refreshAll
     * @param visibleSize
     * @param offsetY
     * @param infinite
     * @param startIndex
     * @returns {ListCore}
     * @description 设置实例属性, 在构造函数中被调用,也会在组件的componentWillReceiveProps回调中调用
     * 可以根据props初始化/重置组件的状态
     */


    _createClass(ListCore, [{
        key: 'refresh',
        value: function refresh(_ref2) {
            var _ref2$dataSource = _ref2.dataSource,
                dataSource = _ref2$dataSource === undefined ? this.dataSource : _ref2$dataSource,
                _ref2$refreshAll = _ref2.refreshAll,
                refreshAll = _ref2$refreshAll === undefined ? false : _ref2$refreshAll,
                _ref2$infiniteSize = _ref2.infiniteSize,
                infiniteSize = _ref2$infiniteSize === undefined ? this.visibleSize : _ref2$infiniteSize,
                _ref2$staticSectionHe = _ref2.staticSectionHeight,
                staticSectionHeight = _ref2$staticSectionHe === undefined ? this.staticSectionHeight : _ref2$staticSectionHe,
                _ref2$offsetY = _ref2.offsetY,
                offsetY = _ref2$offsetY === undefined ? this.offsetY : _ref2$offsetY,
                _ref2$infinite = _ref2.infinite,
                infinite = _ref2$infinite === undefined ? this.infinite : _ref2$infinite;

            if (!Array.isArray(dataSource)) {
                if (typeof dataSource.toArray === 'function') {
                    dataSource = dataSource.toArray();
                } else {
                    throw new Error('yo-list: dataSource必须为数组或者Immutable List!');
                }
            }

            if (!dataSource.length) {
                throw new Error('yo-list: dataSource不能为空数组!');
            }

            this.WINDOW_HEIGHT = window.screen.height;
            this.infinite = infinite;
            this.VISIBLE_SIZE = infiniteSize;
            this.dataSource = this.renderDataSource(dataSource, refreshAll);
            this.isHeightFixed = this.ifHeightFixed();
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            this.startIndex = this.refreshStartIndexByOffsetY(offsetY);
            this.visibleList = this.getVisibleList(offsetY);
            this.staticSectionHeight = staticSectionHeight;
            this.totalHeight = this.getTotalHeight();

            this.emitChange();

            return this;
        }

        /**
         * @param dataSource
         * @returns {boolean}
         * 判断数据源中的元素是否都被计算出(设置了)高度
         */

    }, {
        key: 'ifHeightFixed',
        value: function ifHeightFixed() {
            var _this2 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.every(function (item) {
                return !!_this2.getAttr(item.srcData, 'height');
            }) || !!this.itemHeight || !this.infinite;
        }

        /**
         * @returns {number}
         * 返回一个guid
         */

    }, {
        key: 'getGuid',
        value: function getGuid() {
            return ++ListCore.guid;
        }

        /**
         * @param offsetY
         * @returns {string}
         * 根据传入的offsetY计算出组件滚动的方向
         */

    }, {
        key: 'getDirection',
        value: function getDirection(offsetY) {
            return offsetY - this.offsetY >= 0 ? 'down' : 'up';
        }

        /**
         * @param offsetY
         * @returns {number}
         * 根据传入的offsetY计算startIndex,startIndex被用来计算visibleList(无穷模式中保留在容器中的列表项的数组)
         */

    }, {
        key: 'refreshStartIndexByOffsetY',
        value: function refreshStartIndexByOffsetY(y) {
            var offsetY = y - window.screen.height / 5;

            if (this.infinite && this.isHeightFixed) {
                for (var i = 0; i < this.dataSource.length; i++) {
                    var item = this.dataSource[i];
                    var itemPosData = this.getItemPositionData(item);
                    if (i === 0 && itemPosData.height > offsetY) {
                        return i;
                    } else if (i > 0) {
                        var prev = this.dataSource[i - 1];
                        var prevPosData = this.getItemPositionData(prev);
                        if (prevPosData._translateY < offsetY && prevPosData._translateY >= offsetY) {
                            return i;
                        }
                    }
                }
            } else if (this.infinite) {
                return this.startIndex ? this.startIndex : 0;
            }

            return 0;
        }

        /**
         * @param offsetY
         * @returns {ListCore}
         * 在列表滚动时,根据offsetY更新visibleList
         */

    }, {
        key: 'onScrollTo',
        value: function onScrollTo(offsetY, manually) {
            this.direction = this.getDirection(offsetY);
            this.offsetY = offsetY;
            if (manually) {
                this.startIndex = 0;
            }
            var cachedIndex = this.startIndex;
            if (this.infinite) {
                this.visibleList = this.getVisibleList(offsetY);
                // 只有当visibleList里面的内容真正发生变化的时候才触发onchange
                // 这样可以确保setState调用次数最少
                if (this.startIndex !== cachedIndex || this.startIndex === 0 && this.offsetY === 0 || manually) {
                    this.emitChange();
                }
            }

            return this;
        }
    }, {
        key: 'getItemPositionData',
        value: function getItemPositionData(item) {
            var key = this.getAttr(item, 'key');
            return item._type === 'groupTitle' ? item : this.positionMap[key];
        }
    }, {
        key: 'setItemPositionData',
        value: function setItemPositionData(item, attr) {
            // grouptitle做特殊处理,因为grouptitle是grouplist组件内部的数据对象,所以不会修改到源数据
            // 与此同时，grouplist需要获取到_translateY这些信息，因此也只能在原来的数据对象上修改
            if (item._type === 'groupTitle') {
                Object.assign(item, attr);
            } else if (this.positionMap[item.key]) {
                Object.assign(this.positionMap[item.key], attr);
            }
        }

        /**
         * @param ds
         * @param refreshAll
         * @returns {Array}
         * 处理数据源
         * 为每个元素的在pos表中的项添加_order(无穷模式下该列表项对应的槽的index),_resolved(是否已经计算出位置),_index(在数据源中的位置)
         * _translateY(无穷列表中元素的translateY)和_bottom(列表项的bottom)
         */

    }, {
        key: 'renderDataSource',
        value: function renderDataSource(ds) {
            var _this3 = this;

            var refreshAll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            return ds.map(function (ditem, i) {
                var key = _this3.getAttr(ditem, 'key');
                var renderedItem = {};

                if (key == null) {
                    if (_this3.infinite) {
                        throw new Error('infinite模式的列表数据源的每一项必须有key属性。');
                    } else {
                        key = _this3.getGuid();
                        if (process.env.NODE_ENV === 'dev') {
                            console.warn('Yo-List:列表项没有key属性,将自动添加自增的key。这会使得列表在更新时出现大量的不必要的dom操作，请为每一个列表项指定一个唯一的key。');
                        }
                    }
                }

                // 区分groupTitle和item，因为groupTitle是组件添加的，不会影响到源数据，所以可以直接在上面增加属性
                renderedItem = ditem._type !== 'groupTitle' ? {
                    // srcData指向源数据
                    srcData: ditem,
                    key: key,
                    _index: i,
                    _type: 'item'
                } : Object.assign(ditem, { srcData: ditem, _index: i }); // 这里给title增加了一个指向自己的指针srcData，这是为了兼容其他普通item的数据格式，而不是在使用它的地方做各种判断

                if (refreshAll) {
                    _this3.setItemPositionData(renderedItem, { _bottom: null, _translateY: null, _order: null });
                }

                var itemPosData = _this3.getItemPositionData(renderedItem);
                if (!itemPosData) {
                    itemPosData = _this3.positionMap[renderedItem.key] = {};
                }

                var itemHeight = _this3.getAttr(ditem, 'height');
                var noHeightIdentified = _this3.itemHeight == null && itemHeight == null && itemPosData.height == null;
                if (_this3.infinite) {
                    // 设置height,_order,_resolved和_index
                    // 如果这个item具有高度,则直接设为resolved
                    _this3.setItemPositionData(renderedItem, {
                        height: itemHeight || itemPosData.height || _this3.itemHeight,
                        _order: i % _this3.VISIBLE_SIZE,
                        _resolved: _this3.infinite && !noHeightIdentified,
                        _index: i
                    });
                    // 即使这个元素高度确定,之前一个高度为null,也无法算出translateY和bottom
                    // 此处再次验证之前一个元素是否为resolve
                    if (i > 0) {
                        var prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                        if (!prevItemPosData._resolved) {
                            _this3.setItemPositionData(renderedItem, { _resolved: false });
                        }
                    }
                    // 第一个item,直接设置_translateY为0
                    if (i === 0) {
                        _this3.setItemPositionData(renderedItem, { _translateY: 0 });
                    }
                    // 之后的所有item,如果有height,设置它们的_translateY为前一个元素的bottom
                    // 设置它们的bottom为_translateY+height
                    if (itemPosData._resolved && !itemPosData._bottom) {
                        var _translateY = i === 0 ? 0 : _this3.getItemPositionData(ds[i - 1])._bottom;
                        var _bottom = _translateY + itemPosData.height;
                        _this3.setItemPositionData(renderedItem, {
                            _translateY: _translateY,
                            _bottom: _bottom
                        });
                    } else if (!itemPosData._resolved) {
                        // 不定高的情况
                        if (i > 0) {
                            var _prevItemPosData = _this3.getItemPositionData(ds[i - 1]);
                            if (_prevItemPosData._bottom) {
                                _this3.setItemPositionData(renderedItem, { _translateY: _prevItemPosData._bottom });
                            }
                        }
                    }
                }

                return renderedItem;
            });
        }

        /**
         * @param i
         * @param borderY
         * @param dataSource
         * @returns {boolean}
         * 根据offsetY计算出刚好跨过offsetY的元素(top在y之上,bottom在y之下),或者是一个没有完成定位的元素
         */

    }, {
        key: 'isBorderItem',
        value: function isBorderItem(i, borderY) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var itemPosData = this.getItemPositionData(dataSource[i]);
            return itemPosData._resolved && itemPosData._bottom >= borderY && itemPosData._translateY <= borderY || !itemPosData._resolved;
        }

        /**
         * @param startY
         * @param startIndex
         * @param direction
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据当前滚动的方向和y计算出startIndex
         * 缓存了当前的startIndex,这样可以将查找的开销从O(n)降低到O(1),在处理大列表的时候可以提升性能
         */

    }, {
        key: 'getStartItemIndex',
        value: function getStartItemIndex(startY) {
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.startIndex;
            var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.direction;
            var dataSource = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : this.VISIBLE_SIZE;

            var len = dataSource.length;
            var startIndex = sIndex;
            // 从保存的startIndex开始循环,根据当前滚动的方向的不同,i相应增加/减少
            // 这样可以将查找的时间复杂度从线性降低到常量
            if (direction === 'down' || startIndex === 0) {
                for (var i = startIndex; i < len; i++) {
                    if (this.isBorderItem(i, startY)) {
                        startIndex = i;
                        break;
                    }
                }
            } else {
                for (var _i = startIndex; _i >= 0; _i--) {
                    if (this.isBorderItem(_i, startY)) {
                        startIndex = _i;
                        break;
                    }
                }
            }

            if (startIndex > dataSource.length - VISIBLE_SIZE) {
                startIndex = dataSource.length - VISIBLE_SIZE > 0 ? dataSource.length - VISIBLE_SIZE : 0;
            }

            return startIndex;
        }

        /**
         * @param startIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Number}
         * 根据startIndex算出endIndex
         */

    }, {
        key: 'getEndItemIndex',
        value: function getEndItemIndex(startIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;
            var VISIBLE_SIZE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.VISIBLE_SIZE;

            return startIndex + VISIBLE_SIZE > dataSource.length ? dataSource.length : startIndex + VISIBLE_SIZE;
        }

        /**
         * @param offsetY
         * @param sIndex
         * @param dataSource
         * @param VISIBLE_SIZE
         * @returns {Array}
         * 根据offsetY算出visibleList
         */

    }, {
        key: 'getVisibleList',
        value: function getVisibleList() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.offsetY;
            var sIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            offsetY = offsetY - this.staticSectionHeight;
            var ret = null;

            if (this.infinite) {
                var startY = offsetY - this.WINDOW_HEIGHT / 5;
                startY = startY > 0 ? startY : 0;
                var startIndex = sIndex === null ? this.getStartItemIndex(startY) : sIndex,
                    endIndex = this.getEndItemIndex(startIndex);

                ret = [];
                for (var i = startIndex; i < endIndex; i++) {
                    var item = this.dataSource[i];
                    ret.push(_extends({}, item, this.getItemPositionData(item)));
                }
                this.startIndex = startIndex;
            } else {
                ret = dataSource.slice();
            }

            return ret;
        }

        /**
         * @param dataSource
         * @returns {Object}
         * 获取数据源中第一个还没有resolve的元素
         */

    }, {
        key: 'getFirstNotResolvedItemIndex',
        value: function getFirstNotResolvedItemIndex() {
            var _this4 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.findIndex(function (ditem, i) {
                if (i > 0) {
                    var itemPosData = _this4.getItemPositionData(ditem);
                    var prevItemPosData = _this4.getItemPositionData(dataSource[i - 1]);
                    return !itemPosData._resolved && prevItemPosData._resolved;
                }
                return false;
            });
        }

        /**
         * @param key
         * @param dataSource
         * @returns {Number}
         * 根据key返回一个数据源中的元素
         */

    }, {
        key: 'getItemIndexByKey',
        value: function getItemIndexByKey(key) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            return dataSource.findIndex(function (item) {
                return item.key === key;
            });
        }

        /**
         * @param notResolvedItemIndex
         * @param dataSource
         * 更新一个未定位元素的_translateY,它是前一个元素的_bottom
         */

    }, {
        key: 'updateTranslateY',
        value: function updateTranslateY(notResolvedItemIndex) {
            var dataSource = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataSource;

            var notResolvedItem = dataSource[notResolvedItemIndex];

            if (notResolvedItem) {
                var prevItemIndex = notResolvedItemIndex - 1;
                var prevItem = dataSource[prevItemIndex];
                var prevItemPosData = this.getItemPositionData(prevItem);

                if (prevItemPosData && prevItemPosData._resolved) {
                    this.setItemPositionData(notResolvedItem, { _translateY: prevItemPosData._bottom });
                    // 同时也需要更新visibleList里面对应item的定位信息
                    var visibleListItemToBeUpdated = this.visibleList.find(function (item) {
                        return item.key === notResolvedItem.key;
                    });
                    if (visibleListItemToBeUpdated) {
                        Object.assign(visibleListItemToBeUpdated, this.getItemPositionData(notResolvedItem));
                    }
                }
            }
        }

        /**
         * @param key
         * @param height
         * @param dataSource
         * @returns {ListCore}
         * 不定高模式的核心逻辑,定位一个尚未定位的列表项
         * 在列表项的componentDidUpdate和Mount中被调用,传入已经渲染好的列表项的dom高度,然后更新数据源中对应元素的高度并计算它的定位
         * 在该元素完成定位后,渲染下一个未被定位的列表项,并重复以上逻辑,直到visibleList中所有的项都完成定位
         */

    }, {
        key: 'resolveItem',
        value: function resolveItem(key, height) {
            var dataSource = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.dataSource;

            var targetIndex = this.getItemIndexByKey(key);
            var targetItem = this.dataSource[targetIndex];
            var _translateY = void 0;

            if (targetIndex > 0) {
                var prevItemPosData = this.getItemPositionData(dataSource[targetIndex - 1]);
                _translateY = prevItemPosData._bottom;
            } else {
                _translateY = 0;
            }

            if (_translateY != null) {
                var _bottom = _translateY + height;
                var _resolved = true;
                this.setItemPositionData(targetItem, { _translateY: _translateY, _bottom: _bottom, _resolved: _resolved, height: height });
                this.visibleList = this.getVisibleList();
                this.totalHeight += height;
                this.updateTranslateY(this.getFirstNotResolvedItemIndex());
                this.emitChange();
            }

            return this;
        }

        /**
         * @param dataSource
         * @returns {Array}
         * 计算列表中所有项的高度,用来refresh Scroller
         */

    }, {
        key: 'getTotalHeight',
        value: function getTotalHeight() {
            var _this5 = this;

            var dataSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataSource;

            return dataSource.reduce(function (acc, item) {
                var ret = acc;
                var itemPosData = _this5.getItemPositionData(item);
                ret += itemPosData._resolved ? itemPosData.height : 0;
                return ret;
            }, 0) + this.staticSectionHeight;
        }

        /**
         * @returns {ListCore}
         * 触发组件change事件,组件收到change事件后会执行setState
         */

    }, {
        key: 'emitChange',
        value: function emitChange() {
            this.emitEvent('change', this.visibleList, this.totalHeight);
            return this;
        }
    }]);

    return ListCore;
}(_ComponentCore3.default);

ListCore.guid = -1;
exports.default = ListCore;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ListCore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _util = __webpack_require__(7);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _src = __webpack_require__(17);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 列表项组件
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var _class = function (_Component) {
    _inherits(_class, _Component);

    /**
     * key和translateY在shouldComponentUpdate中会被使用
     * 将会根据nextProps.item中对应的值,来决定是否render
     * @param props
     */
    function _class(props) {
        _classCallCheck(this, _class);

        var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

        _this.key = props.item.key;
        _this.translateY = props.item._translateY;
        return _this;
    }

    _createClass(_class, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { offsetY: this.props.item._translateY, itemRef: this };
        }

        /**
         * 不定高的核心逻辑,在dom rendered以后更新对应列表项的定位信息,并渲染出下一个未经定位的列表项,直到填满visibleList的size
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var isHeightFixed = this.props.listModel.isHeightFixed;
            // 不定高无穷列表的容器是flex-box的话, 浏览器会先渲染dom然后调整高度, 这时候取到的高度不准
            // setTimeout是无奈之举，确实没有想到更好的办法，因为这个调整高度的时机用js根本无法准确获取

            if (isHeightFixed) {
                this.updateItemHeightWhenDomRendered();
            } else {
                this.domNode.style.visibility = 'hidden';
                setTimeout(function () {
                    _this2.updateItemHeightWhenDomRendered();
                    _this2.domNode.style.visibility = 'visible';
                }, _util.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
            }
        }

        /**
         * 根据之前的key和_translateY和接收到的props.item中的对应值,决定是否render
         * 使用者定义的shouldItemUpdate可以接收到shouldComponentUpdate的结果,并返回一个新的结果
         * @param nextProps
         * @returns {Bool}
         */

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            var listModel = nextProps.listModel,
                shouldItemUpdate = nextProps.shouldItemUpdate;

            var ret = true;
            // 当容器内部item的key和translateY发生变化时重新render
            if (listModel.infinite && this.key === nextProps.item.key && this.translateY === nextProps.item._translateY) {
                ret = false;
            }

            this.key = nextProps.item.key;
            this.translateY = nextProps.item._translateY;

            if (shouldItemUpdate && !ret) {
                return shouldItemUpdate(nextProps.item.srcData, this.props.item.srcData);
            }
            return ret;
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.updateItemHeightWhenDomRendered();
        }

        /**
         * 不定高模式的无穷列表需要在列表项渲染后更新它的位置信息
         */

    }, {
        key: 'updateItemHeightWhenDomRendered',
        value: function updateItemHeightWhenDomRendered() {
            var _props = this.props,
                item = _props.item,
                listModel = _props.listModel,
                onListItemUpdate = _props.onListItemUpdate;


            if (!item._resolved && item._translateY !== undefined && listModel.infinite && !listModel.isHeightFixed) {
                listModel.resolveItem(item.key, this.domNode.offsetHeight);
            }

            onListItemUpdate(item.srcData, this.domNode);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props2 = this.props,
                renderItem = _props2.renderItem,
                item = _props2.item,
                onItemTap = _props2.onItemTap,
                listModel = _props2.listModel,
                itemTouchClass = _props2.itemTouchClass,
                itemExtraClass = _props2.itemExtraClass,
                onItemTouchStart = _props2.onItemTouchStart;

            var transform = 'translate(0,' + item._translateY + 'px) translateZ(0px)';
            var infiniteStyle = {
                WebkitTransform: transform,
                transform: transform,
                height: item.height,
                position: 'absolute',
                top: 0
            };
            var basicProps = {
                ref: function ref(dom) {
                    _this3.domNode = dom;
                },
                style: listModel.infinite ? infiniteStyle : null
            };
            var additionalProps = {
                className: (0, _classnames2.default)(itemExtraClass(item.srcData, item._index), item._type !== 'groupTitle' ? 'item' : 'group-title label')
            };

            return _react2.default.createElement(
                _src2.default,
                {
                    internalUse: true,
                    onTap: onItemTap,
                    touchClass: itemTouchClass(item.srcData, item._index),
                    onTouchStart: function onTouchStart(evt) {
                        onItemTouchStart(item.srcData, item._index, evt);
                    }
                },
                _react2.default.createElement(
                    'li',
                    Object.assign({}, basicProps, additionalProps),
                    renderItem(item.srcData, item._index)
                )
            );
        }
    }]);

    return _class;
}(_react.Component);

_class.propTypes = {
    item: _react.PropTypes.object,
    listModel: _react.PropTypes.object,
    itemTouchClass: _react.PropTypes.func,
    itemExtraClass: _react.PropTypes.func,
    scroller: _react.PropTypes.object,
    onItemTouchStart: _react.PropTypes.func,
    renderItem: _react.PropTypes.func,
    onItemTap: _react.PropTypes.func,
    onListItemUpdate: _react.PropTypes.func
};
_class.childContextTypes = {
    offsetY: _react.PropTypes.number,
    itemRef: _react.PropTypes.object
};
_class.defaultProps = {
    onListItemUpdate: function onListItemUpdate() {}
};
exports.default = _class;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "ListItem.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ListCore = __webpack_require__(38);

var _ListCore2 = _interopRequireDefault(_ListCore);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _src = __webpack_require__(9);

var _src2 = _interopRequireDefault(_src);

var _ListItem = __webpack_require__(39);

var _ListItem2 = _interopRequireDefault(_ListItem);

var _lazyimage = __webpack_require__(15);

var _lazyimage2 = _interopRequireDefault(_lazyimage);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

var _util = __webpack_require__(7);

__webpack_require__(6);

__webpack_require__(86);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component List
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 列表组件，继承了Scroller的特性，有下拉刷新和加载更多功能。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 除此之外，List优化了长列表的性能，在数据源较大时能够提升滚动的性能并避免内存溢出。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 使用列表组件实现的组件：GroupList、Calendar、SwipeMenuList。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 特别感谢大明哥(leeds.li)和她的不定高无穷列表的实现思路。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/list.md}{instruUrl: list/infinite_mode_with_height.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/example.md}{instruUrl: list/base.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/modify_height.md}{instruUrl: list/modify_height.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./list/static_section.md}{instruUrl: list/static_section.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    infinite: false,
    offsetY: 0,
    infiniteSize: 12,
    itemTouchClass: 'item-touch',
    onScroll: function onScroll() {},
    onInfiniteAppend: function onInfiniteAppend() {},
    renderItem: function renderItem(item) {
        return typeof item.get === 'function' ? item.get('text') : item.text;
    },

    extraClass: '',
    containerExtraClass: '',
    groupTitleExtraClass: '',
    usePullRefresh: false,
    onRefresh: function onRefresh() {},

    useLoadMore: false,
    onLoad: function onLoad() {},
    onItemTap: function onItemTap() {},

    shouldItemUpdate: null,
    itemExtraClass: function itemExtraClass() {
        return '';
    },
    onItemTouchStart: function onItemTouchStart() {},

    disabled: false,
    directionLockThreshold: 50,
    style: null,
    scrollWithoutTouchStart: true,
    staticSection: null,
    staticSectionHeight: null,
    deceleration: 0.0015,
    stickyOffset: 0
};

var propTypes = {
    /**
     * @property dataSource
     * @type Array/Immutable List
     * @default none
     * @description 组件的数据源，数组或者Immutable List类型，内部元素必须是对象或者Immutable Map。
     * 如果需要给无穷列表的项定高度，可以给元素添加height属性(数字类型)，
     * 也可以通过itemHeight属性统一设置列表项的高度(见itemHeight属性的描述)，
     * 如果列表元素有text属性且没有传入renderItem，会直接以text的值作为listitem的内容渲染。
     */
    dataSource: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.shape({
        height: _react.PropTypes.number,
        text: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        key: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string])
    })), _react.PropTypes.object]).isRequired,
    /**
     * @property renderItem
     * @type Function
     * @default (item)=>item.text
     * @description 定制如何根据列表项数据对象渲染列表项的函数，接收参数item(数据对象)和index(在数据源中的index)，返回一个JSX。
     * 如果传入字符串，则会应用于所有列表项。
     *
     * 例子:`` renderItem={(item)=><p>{item.someAttr}</p>} ``
     */
    renderItem: _react.PropTypes.func,
    /**
     * @property onItemTap
     * @type Function
     * @default null
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * @param {DOMElement} target 当前tap事件的target
     * @description 点击列表项时的事件回调，接收三个参数item(列表项对应的数据对象)，index(列表项在数据源中的index)以及target(当前事件的event.target)，
     *
     * List实现了独特的手势系统以达到iOS列表的手势效果，任何情况下都应该使用这个属性为ListItem绑定事件，而不是给ListItem中的节点绑定onTouchTap事件。
     */
    onItemTap: _react.PropTypes.func,
    /**
     * @property infinite
     * @type Bool
     * @default false
     * @description 是否使用无穷列表模式。
     *
     * 开启无穷列表模式后，列表中只会保留infiniteSize个节点，并随着滚动复用这些节点，以此来优化大列表的性能，但是滚动过程中会有性能损耗。
     * 如果你的列表项数量不大(比如只有几十个)，请不要开启无穷模式。
     */
    infinite: _react.PropTypes.bool,
    /**
     * @property infiniteSize
     * @type Number
     * @default 12
     * @description 无穷列表模式下，保留在列表容器中列表项的个数(参见无穷列表模式的说明).
     *
     * 注意:这个值应该随着列表容器的高度和列表项高度选取一个合适的值，否则可能出现列表容器底部出现空白的情况。
     * 如果这个值设置的过大，会降低列表的滚动性能，因此请根据实际情况(List容器的高度和列表项的高度)灵活配置。
     */
    infiniteSize: _react.PropTypes.number,
    /**
     * @property itemHeight
     * @type Number
     * @default null
     * @description 无穷列表中列表项的高度。
     *
     * 如果数据源中的对象没有height属性，也没有设置itemHeight，则会使用不定高的无穷列表模式。
     * 在不定高模式下，每个项的高度会在渲染进容器以后确定，因此比定高模式多一次offsetHeight的查询，性能会差一些。
     */
    itemHeight: _react.PropTypes.number,
    /**
     * @property offsetY
     * @type Number
     * @default 0
     * @description 组件的初始位置的Y坐标。
     */
    offsetY: _react.PropTypes.number,
    /**
     * @property itemExtraClass
     * @type String/Function
     * @default "item item-wrap"
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * 可以接受字符串形式。例如"custom-list-item"（会自动应用在所有列表项容器上）
     * 或者一个函数，这个函数接受参数item（列表项对应的dataSource中的数据对象），index（数据源index）
     *
     * 例:(item)=>{return item.customClassName}/'custom-item-classname'。
     * @description 给列表项容器元素添加的class
     */
    itemExtraClass: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    /**
     * @skip
     * 给grouptitle定制的属性,不会向外暴露。
     */
    groupTitleExtraClass: _react.PropTypes.string,
    /**
     * @property itemTouchClass
     * @type String/Function
     * @default item-touch
     * @param {Object} item 列表项对应的数据对象
     * @param {Number} index 列表项在数据源中的index
     * @description 列表项被点击时的className，可以接收字符串或者函数，使用方式与itemExtraClass一致。
     */
    itemTouchClass: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func]),
    /**
     * @property onScroll
     * @type Function
     * @default null
     * @param {Number} y 当前列表的y轴偏移
     * @param {Enum {'up','down'}} direction 列表滚动的方向,向上('up')或者向下('down')
     * @description 绑定给list内部scroller的onScroll回调,在列表滚动时触发。
     */
    onScroll: _react.PropTypes.func,
    /**
     * @property style
     * @type Object
     * @default null
     * @description 给List容器节点绑定的额外样式。
     * @version 3.0.2
     */
    style: _react.PropTypes.object,
    /**
     * @property onInfiniteAppend
     * @type Function
     * @default null
     * @param {Array} visibleList 当前渲染在列表容器中的数据项数组
     * @description 无穷列表中列表项update时触发的事件回调，接收参数visibleList(数组)，为目前渲染在列表容器中的数据项。
     */
    onInfiniteAppend: _react.PropTypes.func,
    /**
     * @property staticSection
     * @type Element
     * @default null
     * @version 3.0.3
     * @description 在所有列表项之上渲染的一块静态区域，在开启Infinite模式时，这块区域不会参与列表项的回收复用。
     */
    staticSection: _react.PropTypes.element,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 组件容器元素的额外className。
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property containerExtraClass
     * @type String
     * @default null
     * @description 列表容器元素额外的className(对应ul.yo-list节点)。
     */
    containerExtraClass: _react.PropTypes.string,
    /**
     * @property usePullRefresh
     * @type Bool
     * @default false
     * @description 是否使用下拉刷新，见Scroller同名属性。
     */
    usePullRefresh: _react.PropTypes.bool,
    /**
     * 下拉刷新高度
     *
     * @property pullRefreshHeight
     * @type Number
     * @description 触发下拉刷新状态的高度（一般即为下拉刷新提示区域的高度）。
     * @default 40
     */
    pullRefreshHeight: _react.PropTypes.number,
    /**
     * 下拉刷新渲染函数
     *
     * @property renderPullRefresh
     * @type Function
     * @returns {JSX} 用来渲染 pullRefresh 的 JSX
     * @description () => JSX
     *
     * 自定义的下拉刷新渲染函数。
     */
    renderPullRefresh: _react.PropTypes.func,
    /**
     * @property onRefresh
     * @type Function
     * @param {Array} dataSource 当前的数据源
     * @default null
     * @description 下拉刷新触发的事件回调。
     */
    onRefresh: _react.PropTypes.func,
    /**
     * @property useLoadMore
     * @type Bool
     * @default false
     * @description 是否开启加载更多，见Scroller同名属性。
     */
    useLoadMore: _react.PropTypes.bool,
    /**
     * 加载更多高度
     *
     * @property loadMoreHeight
     * @type Number
     * @description 触发加载更多状态的高度（一般即为加载更多提示区域的高度）。
     * @default 40
     */
    loadMoreHeight: _react.PropTypes.number,
    /**
     * 加载更多渲染函数
     *
     * @property renderLoadMore
     * @type Function
     * @returns {JSX} 用来渲染 loadMore 的 JSX
     * @description () => JSX
     *
     * 自定义的加载更多渲染函数。
     */
    renderLoadMore: _react.PropTypes.func,
    /**
     * @property onLoad
     * @type Function
     * @param {Array} dataSource 当前数据源
     * @default null
     * @description 加载更多时触发的事件回调。
     */
    onLoad: _react.PropTypes.func,
    /**
     * @property shouldItemUpdate
     * @type Function
     * @default null
     * @param {Object} next 即将传给列表项组件的item对象
     * @param {Object} now 当前列表项组件对应的item对象
     * @description 绑定给列表项组件的shouldComponentUpdate，可以避免额外的render，用于提升列表的滚动性能。
     *
     * 实验表明，组件的render开销对于某些老式手机(例如三星Note2)是不能忽视的，因此list默认为所有的列表项组件配置了shouldComponentUpdate，会根据
     * item的_guid属性(List组件自己做的，不需要使用者传入)做比较决定是否需要render，这样可以最小化render的次数。有些情况下，这种比较方式会阻止使用者期待触发的render，导致组件更新行为违反了使用者的意愿，这时候需要通过设置shouldItemUpdate属性改变默认的shouldComponentUpdate的返回值
     *
     * shouldItemUpdate能够接受两个参数，next(ListItem组件的下一个props中的item属性)，
     * now(ListItem当前的props的item属性)。它必须返回一个布尔值，false则会跳过render，true会继续执行render(与shouldComponentUpdate返回值的含义相同)。
     */
    shouldItemUpdate: _react.PropTypes.func,
    /**
     * @property disabled
     * @type Bool
     * @default false
     * @description 是否禁止滚动，参见Scroller的同名属性。
     */
    disabled: _react.PropTypes.bool,
    /**
     * @property stickyOffset
     * @type Number
     * @default 0
     * @description 给staticSection内部吸顶容器设置的y轴偏移。
     * @version 3.0.6
     */
    stickyOffset: _react.PropTypes.number,
    /**
     * @skip
     * @property onItemTouchStart
     * 专门给SwipeMenuList使用的属性，不向外暴露
     */
    onItemTouchStart: _react.PropTypes.func,
    onListItemUpdate: _react.PropTypes.func,
    /**
     * 方向锁定阈值
     *
     * @property directionLockThreshold
     * @type Number
     * @description 只允许单向滚动的时候，会根据这个阈值来判定响应哪个方向上的位移：某一方向位移减去另一个方向位移超过阈值，就会判定为这个方向的滚动。
     * @default 5
     * @version 3.0.2
     */
    directionLockThreshold: _react.PropTypes.number,
    /**
     * @property deceleration
     * @type Number
     * @description 滚动视图开始惯性滚动时减速的加速度，默认为0.001。
     * @version 3.0.6
     */
    deceleration: _react.PropTypes.number,
    /**
     * @property scrollWithoutTouchStart
     * @type Bool
     * @default false
     * @description ** 实验中的属性 **
     * 在默认情况下一次用户触发（非调用scrollTo方法）scroller的滚动需要由touchstart事件来启动，在某些情况下，例如scroller从disable状态切换到enable状态时，
     * 可能不能接收到这一瞬间的touchstart事件，这可能导致用户期待的滚动过程没有发生。
     * 开启这个属性为true以后将允许scroller用touchmove启动滚动过程，这可以解决上述场景的问题。
     * @version 3.0.2
     */
    scrollWithoutTouchStart: _react.PropTypes.bool
};

var List = function (_Component) {
    _inherits(List, _Component);

    function List(props) {
        _classCallCheck(this, List);

        var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

        var dataSource = props.dataSource,
            offsetY = props.offsetY,
            itemHeight = props.itemHeight,
            infinite = props.infinite,
            infiniteSize = props.infiniteSize;


        _this.childLazyImages = [];
        _this.staticSectionContaienr = null;
        _this.listModel = new _ListCore2.default({
            dataSource: dataSource,
            offsetY: offsetY,
            infinite: infinite,
            itemHeight: itemHeight,
            infiniteSize: infiniteSize
        });
        _this.state = {
            visibleList: _this.listModel.visibleList,
            totalHeight: _this.listModel.totalHeight
        };
        return _this;
    }

    _createClass(List, [{
        key: 'getChildContext',
        value: function getChildContext() {
            return { list: this, infinite: this.listModel.infinite };
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _this2 = this;

            this.listModel.registerEventHandler('change', function (visibleList, totalHeight) {
                _this2.setState({ visibleList: visibleList, totalHeight: totalHeight });
                _this2.props.onInfiniteAppend(visibleList, totalHeight);
            }).registerEventHandler('scrollTo', function (offsetY, time, easing) {
                if (_this2.scroller) {
                    _this2.scroller.scrollTo(0, offsetY, time, easing);
                }
            });
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this3 = this;

            // 在不定高模式下,需要等待所有列表项完成定位才能刷新scroller, didmount的时候虽然dom已经渲染完成
            // 但是所有列表项做定位尚未完成
            setTimeout(function () {
                // 一定要优先刷新staticSectionHeight，否则下面的一系列操作都可能出现不准确的情况
                _this3.refreshStaticSectionHeight();
                if (_this3.scroller) {
                    // 用来标记列表是否在滚动,和手势有关,在gesture.js中可以查到这个属性是如何被使用的
                    _this3.scroller.isScrolling = false;
                }
                // 刷新scroller,因为infinite不定高模式的totalHeight要等到item渲染完毕才能计算出来
                if (_this3.listModel.infinite && _this3.scroller) {
                    _this3.scroller.refresh({ scrollerHeight: _this3.listModel.totalHeight }, true);
                }
                // 如果设置了offsetY,滚动到offsetY
                var offsetY = _this3.props.offsetY;

                if (offsetY !== 0) {
                    _this3.scrollTo(offsetY, 0);
                }
                // 刷新lazyload图片,不然头几个item的懒加载图片都不会加载
                // 加setTimeout是为了处理不定高的场景,因为不定高的列表会先把列表项渲染进容器然后再去做定位
                // 所以didmount时间触发的时候,列表项还没有完成定位
                _this3.tryLoadLazyImages(offsetY);
            }, this.listModel.isHeightFixed ? 0 : _util.DELAY_TIME_FOR_INFINITE_WITHOUT_HEIGHT);
        }

        /**
         * @param nextProps
         * dataSource,infiniteSize是根据初始值计算出来的状态,在这里需要进行reset
         * 其他属性不需要reset
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this4 = this;

            var dataSource = nextProps.dataSource,
                infiniteSize = nextProps.infiniteSize,
                offsetY = nextProps.offsetY;

            this.listModel.refresh({
                dataSource: dataSource,
                refreshAll: true,
                infiniteSize: infiniteSize
            });

            // 等待dom更新结束后再做以下操作
            setTimeout(function () {
                if (_this4.props.offsetY !== offsetY) {
                    _this4.scrollTo(offsetY, 0);
                }
                _this4.refreshStaticSectionHeight();
                _this4.tryLoadLazyImages(_this4.listModel.offsetY);
                // 当offsetY位于可滚动范围之外时自动调整
                if (_this4.scroller && -_this4.scroller.maxScrollY < _this4.listModel.offsetY) {
                    _this4.scrollTo(_this4.scroller.maxScrollY, 300);
                }
            }, 0);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // infinite模式的lazyload不需要再didupdate时刷新
            // 因为infinite的节点是复用的,而随着滚动会不定的render,因此会触发大量的didupdate,浪费性能
            // 所以可以在receiveprops时做刷新,因为节点复用的缘故,不需要等待dom render
            if (!this.listModel.infinite) {
                this.tryLoadLazyImages(this.listModel.offsetY);
            }
            // infinite模式下，刷新列表的总高度
            if (this.scroller && this.listModel.infinite) {
                this.scroller.refresh({ scrollerHeight: this.state.totalHeight }, true);
            }
        }

        /**
         * 绑定给Scoller的ScrollEnd事件回调
         */

    }, {
        key: 'onScrollEnd',
        value: function onScrollEnd() {
            // 滚动停止后重置isScrolling标志
            this.scroller.isScrolling = false;
        }

        /**
         * @param offsetY
         * @param manually
         * 随着Scroller的滚动更新visibleList
         */

    }, {
        key: 'onScroll',
        value: function onScroll(offsetY, manually) {
            if (this.scroller && offsetY !== this.listModel.offsetY) {
                if (!manually) {
                    this.scroller.isScrolling = true;
                }
                this.listModel.onScrollTo(offsetY, manually);
                this.props.onScroll(-offsetY, this.listModel.direction);
                this.tryLoadLazyImages(offsetY);
            }
        }

        /**
         * @skip
         * @method refreshStaticSectionHeight
         * @description 获取staticSectionHeight，然后更新列表的总高度
         */

    }, {
        key: 'refreshStaticSectionHeight',
        value: function refreshStaticSectionHeight() {
            if (this.staticSectionContaienr != null) {
                this.listModel.staticSectionHeight = this.staticSectionContaienr.offsetHeight;
                this.listModel.totalHeight = this.listModel.getTotalHeight();
                // 获取到最新的totalHeight之后需要刷新一下
                if (this.scroller && this.listModel.infinite) {
                    this.scroller.refresh({ scrollerHeight: this.listModel.totalHeight }, true);
                }
            }
        }

        /**
         * @method refresh
         * @description 刷新列表,应该在列表容器高度发生改变时调用
         */

    }, {
        key: 'refresh',
        value: function refresh() {
            this.scroller.refresh({ scrollerHeight: this.state.totalHeight });
        }

        /**
         * @method stopRefreshing
         * @param {Bool} [successed]  下拉刷新是否成功,默认为false
         * @description 中止下拉刷新过程。在列表发生下拉刷新之后你应该调用这个方法去中止它(比如服务器响应已经返回的时候),否则刷新不会自动终止。
         */

    }, {
        key: 'stopRefreshing',
        value: function stopRefreshing(successed) {
            if (this.scroller) {
                this.scroller.stopRefreshing(successed);
            }
        }

        /**
         * @method stopLoading
         * @param {Bool} [successed]  加载更多是否成功,默认为false
         * @description 中止加载更多过程,使用方式和场景与stopRefreshing一致。
         */

    }, {
        key: 'stopLoading',
        value: function stopLoading(successed) {
            if (this.scroller) {
                this.scroller.stopLoading(successed);
            }
        }

        /**
         * @method startRefreshing
         * @description 模拟下拉刷新,调用这个方法后,会立刻停止当前的滚动并回到列表顶部,然后开始下拉刷新过程。
         *
         * 注意:你仍然需要手动调用stopRefreshing方法
         */

    }, {
        key: 'startRefreshing',
        value: function startRefreshing() {
            if (this.scroller.isScrolling) {
                this.scroller.stopAnimate();
                this.scroller.isScrolling = false;
            }

            if (this.listModel.infinite) {
                this.scroller.startRefreshing(0);
                this.onScroll(0, true);
            } else {
                this.scroller.startRefreshing();
            }
        }

        /**
         * 尝试加载处于可视区域内的lazyimage
         * @param y
         */

    }, {
        key: 'tryLoadLazyImages',
        value: function tryLoadLazyImages(y) {
            var _this5 = this;

            y = y - this.listModel.staticSectionHeight;
            if (this.childLazyImages.length && this.scroller) {
                this.childLazyImages.forEach(function (child) {
                    var containerBottomY = y + _this5.scroller.wrapperHeight;
                    if (_this5.listModel.infinite) {
                        if (containerBottomY > child.itemRef.translateY) {
                            child.load();
                        }
                    } else if (child.loading !== 2) {
                        var listItemDom = child.itemRef.domNode;
                        var offsetTop = listItemDom.offsetTop;
                        if (listItemDom && containerBottomY > offsetTop) {
                            child.load();
                        }
                    }
                });
            }
        }

        /**
         * @method scrollTo
         * @param {Number} y 要滚动到的目标y坐标
         * @param {Number} [time] 动画时间,默认为0。
         * (在开启了无穷模式的情况下,为了提高滚动的性能,不管time传入什么值都会被重设为0.因为快速滚过很长的距离在无穷模式下会带来巨大的性能损耗)
         * @description 让List滚动到某个位置
         */

    }, {
        key: 'scrollTo',
        value: function scrollTo() {
            var offsetY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            if (this.scroller) {
                // 考虑到infinite的渲染机制,滚动一个过长的距离会触发大量的dom更新,性能会很差
                // 因此当当前offetY大于一定数值时就将time设为0,2000是个magic number,凭感觉设的
                var aniDuration = this.listModel.infinite ? 0 : time;
                this.scroller.scrollTo(0, offsetY, aniDuration);
                this.onScroll(-offsetY, true);
            }
        }

        /**
         * @method stopAnimate
         * @description 立刻停止滚动。
         */

    }, {
        key: 'stopAnimate',
        value: function stopAnimate() {
            if (this.scroller) {
                this.scroller.stopAnimate();
            }
        }

        /**
         * @param item
         * @param i
         * @returns {JSX}
         * 渲染列表项容器
         */

    }, {
        key: 'renderItemWrap',
        value: function renderItemWrap(item, i) {
            var _props = this.props,
                _onItemTap = _props.onItemTap,
                renderItem = _props.renderItem,
                onListItemUpdate = _props.onListItemUpdate,
                groupTitleExtraClass = _props.groupTitleExtraClass,
                shouldItemUpdate = _props.shouldItemUpdate,
                onItemTouchStart = _props.onItemTouchStart;
            var _props2 = this.props,
                itemTouchClass = _props2.itemTouchClass,
                itemExtraClass = _props2.itemExtraClass;

            var realActiveClass = itemTouchClass,
                realExtraClass = itemExtraClass;
            // 由于itemExtraClass可以传入string或者函数,这里统一为函数
            // 做法是将string转换成一个返回该string的id函数
            if (typeof itemExtraClass === 'string' || itemExtraClass === null) {
                realExtraClass = function realExtraClass() {
                    return itemExtraClass;
                };
            }
            // the same
            if (typeof itemTouchClass === 'string' || itemTouchClass === null) {
                realActiveClass = function realActiveClass() {
                    return itemTouchClass;
                };
            }

            return _react2.default.createElement(_ListItem2.default, {
                parent: this,
                itemTouchClass: realActiveClass,
                key: this.listModel.infinite ? i : item.key,
                renderItem: renderItem,
                onItemTap: function onItemTap(target) {
                    _onItemTap(item.srcData, item._index, target);
                },
                shouldItemUpdate: shouldItemUpdate,
                onItemTouchStart: onItemTouchStart,
                item: item,
                itemExtraClass: realExtraClass,
                groupTitleExtraClass: groupTitleExtraClass,
                listModel: this.listModel,
                onListItemUpdate: onListItemUpdate
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this6 = this;

            var _props3 = this.props,
                containerExtraClass = _props3.containerExtraClass,
                infiniteSize = _props3.infiniteSize,
                _onRefresh = _props3.onRefresh,
                _onLoad = _props3.onLoad;
            var infinite = this.listModel.infinite;

            var containerClass = (0, _classnames2.default)('yo-list', containerExtraClass, infinite ? 'yo-list-infinite' : '');
            var visibleList = this.state.visibleList;


            return _react2.default.createElement(
                _src2.default,
                _extends({}, (0, _util.inheritProps)(this.props, ['scrollWithoutTouchStart', 'style', 'directionLockThreshold', 'disabled', 'extraClass', 'pullRefreshHeight', 'renderPullRefresh', 'loadMoreHeight', 'renderLoadMore', 'useLoadMore', 'usePullRefresh', 'deceleration', 'stickyOffset']), {
                    tap: true,
                    autoRefresh: !infinite,
                    ref: function ref(scroller) {
                        if (scroller) {
                            _this6.scroller = scroller;
                        }
                    },
                    onScroll: function onScroll(evt) {
                        return _this6.onScroll(-evt.contentOffset.y);
                    },
                    onScrollEnd: function onScrollEnd() {
                        return _this6.onScrollEnd();
                    },
                    onRefresh: function onRefresh() {
                        _onRefresh(_this6.listModel.dataSource);
                    },
                    onLoad: function onLoad() {
                        _onLoad(_this6.listModel.dataSource);
                    },
                    enableLazyLoad: false
                }),
                this.props.staticSection != null ? _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(dom) {
                            if (dom) {
                                _this6.staticSectionContaienr = dom;
                            }
                        },
                        className: 'yo-list-static-section'
                    },
                    this.props.staticSection
                ) : null,
                _react2.default.createElement(
                    'ul',
                    {
                        className: containerClass,
                        ref: function ref(dom) {
                            _this6.listContainer = dom;
                        }
                    },
                    infinite ?
                    // 无穷列表模式,在列表容器内设置固定数目的槽,随着滚动不停更新这些槽内部的内容和translateY
                    (0, _util.getArrayByLength)(infiniteSize).fill(1).map(function (__, i) {
                        var item = visibleList.find(function (it) {
                            return it._order === i;
                        });
                        return item ? _this6.renderItemWrap(item, i) : null;
                    }) :
                    // 静态列表,渲染出所有的item
                    visibleList.map(function (item, i) {
                        return _this6.renderItemWrap(item, i);
                    })
                )
            );
        }
    }]);

    return List;
}(_react.Component);

List.INFINITE_SCROLLTO_WITH_ANIMATION_DISTANCE = 2000;
List.childContextTypes = {
    list: _react.PropTypes.object,
    infinite: _react.PropTypes.bool
};
exports.default = List;


List.defaultProps = defaultProps;
List.propTypes = propTypes;
List.LazyImage = _lazyimage2.default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _classnames = __webpack_require__(5);

var _classnames2 = _interopRequireDefault(_classnames);

__webpack_require__(26);

__webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Modal
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 带遮罩层的模态弹层组件。支持多种位置和动画效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./modal.md}{instruUrl: modal.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var defaultProps = {
    show: false,
    extraClass: '',
    contentExtraClass: '',
    align: 'center',
    onMaskTap: function onMaskTap() {},
    contentOffset: [0, 0],
    maskOffset: [0, 0],
    maskExtraClass: '',
    animation: '',
    onShow: function onShow() {},
    onHide: function onHide() {},
    width: null,
    height: null,
    delayBeforeAnimationStart: 100
};

var propTypes = {
    /**
     * @property show
     * @type Bool
     * @default false
     * @description 是否显示模态框
     */
    show: _react.PropTypes.bool.isRequired,
    /**
     * @property extraClass
     * @type String
     * @default null
     * @description 附加给模态框容器(包含了内容区和蒙层)的额外class
     */
    extraClass: _react.PropTypes.string,
    /**
     * @property contentExtraClass
     * @type String
     * @default null
     * @description 附加给模态框内容区的额外class
     */
    contentExtraClass: _react.PropTypes.string,
    /**
     * @property align
     * @type String
     * @default center
     * @description 模态框的位置,默认为center。可选值为cetner/top/bottom
     */
    align: _react.PropTypes.oneOf(['center', 'top', 'bottom', 'left', 'right']),
    /**
     * @property onMaskTap
     * @type Function
     * @default ()=>{}
     * @description 点击蒙层时的回调
     */
    onMaskTap: _react.PropTypes.func,
    /**
     * @property contentOffset
     * @type Array
     * @default [0,0]
     * @description 内容区在水平/垂直方向上的偏移,例如[0,-100]可以使模态框内容区向上偏移100个像素
     */
    contentOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property maskOffset
     * @type Array
     * @default [0,0]
     * @description 蒙层遮盖的范围。如果不需要蒙层遮盖住整个屏幕,可以设置这个属性。
     *
     * 数组的第一个元素代表蒙层上边缘距离屏幕顶部的距离,第二个元素代表下边缘距离底部的距离。
     */
    maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
    /**
     * @property onShow
     * @type Function
     * @default ()=>{}
     * @description 打开模态框时，动画触发之前的事件回调
     */
    onShow: _react.PropTypes.func,
    /**
     * @property onHide
     * @type Function
     * @default ()=>{}
     * @description 关闭模态框时，动画触发之前的事件回调
     */
    onHide: _react.PropTypes.func,
    /**
     * @property width
     * @type Number/String
     * @default 'auto'
     * @description 内容区宽度,默认为auto,可以传入数字或者百分比
     */
    width: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property height
     * @type Number/String
     * @default 'auto'
     * @description 内容区高度,默认为auto,可以传入数字或者百分比
     */
    height: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * @property animation
     * @type String/Object
     * @default "none"
     * @description 打开/关闭动画
     *
     * 有已经实现好的动画fade,fade-in-down,fade-in-up,zoom,也可以自己传入classNames,实现定制的动画效果,例如
     * {animation:['actionsheet-up', 'actionsheet-down'],duration:200}
     * 数组中的第一个元素是打开模态框时附加到内容区的className,第二个是关闭时附加到内容区的className,duration是动画的持续时间,
     * action-sheet-up的css规则如下:
     *
     * ```css
     * @keyframes actionsheet-up {
     *     0% {
     *         transform: translate3d(0, 100%, 0);
     *     }
     *     100% {
     *         transform: translate3d(0, 0, 0);
     *     }
     * }
     * ```
     *
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
        animation: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired,
        duration: _react.PropTypes.number
    })]),
    delayBeforeAnimationStart: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string, _react.PropTypes.number])
};

// 默认提供的动画效果
var ANIMATION_MAP = {
    fade: { animation: ['fade-in', 'fade-out'], duration: 200 },
    zoom: { animation: ['zoom-in', 'zoom-out'], duration: 300 },
    'fade-in-up': { animation: ['fade-in-up', 'fade-out-down'], duration: 200 },
    'fade-in-down': { animation: ['fade-in-down', 'fade-out-up'], duration: 200 }
};

var RealModal = function (_Component) {
    _inherits(RealModal, _Component);

    function RealModal(props) {
        _classCallCheck(this, RealModal);

        var _this = _possibleConstructorReturn(this, (RealModal.__proto__ || Object.getPrototypeOf(RealModal)).call(this, props));

        _this.state = {
            show: props.show,
            animation: _this.getAnimationClass(props.animation, props.show)
        };
        return _this;
    }

    _createClass(RealModal, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.show) {
                this.props.onShow();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.toggleShowStatus(nextProps);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            clearTimeout(this.hideTimeout);
            clearTimeout(this.showTimeout);
        }

        /**
         * 根据动画名字和打开/关闭状态获取对应的animation属性配置
         * @param name
         * @param isShow
         * @returns {{name: string, duration: number}}
         */

    }, {
        key: 'getAnimationClass',
        value: function getAnimationClass(name, isShow) {
            var contentAnimation = '',
                duration = 0;
            if (name) {
                var targetMap = _typeof(this.props.animation) === 'object' ? this.props.animation : ANIMATION_MAP[name];
                if (targetMap) {
                    contentAnimation = [targetMap.animation[isShow ? 0 : 1], 'ani'].join(' ');
                    duration = targetMap.duration;
                }
            }
            return { name: contentAnimation, duration: duration };
        }

        /**
         * 根据nextProps中的show属性更新内部state
         * @param nextProps
         */

    }, {
        key: 'toggleShowStatus',
        value: function toggleShowStatus(nextProps) {
            var _this2 = this;

            var current = this.state.show;
            var next = nextProps.show;
            var _props = this.props,
                onShow = _props.onShow,
                onHide = _props.onHide;
            // 如果新属性的show是true并且模态框处于打开状态

            if (!next && current) {
                // 提取需要指定的动画
                var animationData = this.getAnimationClass(nextProps.animation, next);
                clearTimeout(this.showTimeout);
                // show动画开始前执行onHide回调
                onHide();
                // 先走关闭动画
                this.setState({ animation: animationData });
                // 等到动画结束后处理整个modal的show状态,并且保存timeout引用
                this.hideTimeout = setTimeout(function () {
                    _this2.setState({ show: false });
                }, animationData.duration);
            } else if (next && !current) {
                // 清理关闭timeout
                // 写这一行的目的是用户可能在关闭的同时打开modal
                clearTimeout(this.hideTimeout);
                this.setState({ show: next });
                this.contentDom.style.visibility = 'hidden';

                // 如果直接运行动画会出现闪烁,这里先将contentDom隐藏然后再运行动画
                this.showTimeout = setTimeout(function () {
                    // hide动画开始前执行onShow回调
                    onShow();
                    _this2.setState({ animation: _this2.getAnimationClass(nextProps.animation, next) });
                    _this2.contentDom.style.visibility = 'visible';
                }, this.props.delayBeforeAnimationStart);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                show = _state.show,
                animation = _state.animation;
            var duration = animation.duration,
                name = animation.name;
            var _props2 = this.props,
                extraClass = _props2.extraClass,
                onMaskTap = _props2.onMaskTap,
                maskOffset = _props2.maskOffset,
                contentOffset = _props2.contentOffset,
                align = _props2.align,
                contentExtraClass = _props2.contentExtraClass,
                width = _props2.width,
                height = _props2.height;

            var containerClass = (0, _classnames2.default)('yo-modal', extraClass, 'yo-modal-' + align);
            var contentClass = (0, _classnames2.default)('cont', contentExtraClass, name);

            return _react2.default.createElement(
                'div',
                {
                    ref: 'container',
                    className: containerClass,
                    onTouchTap: function onTouchTap(evt) {
                        if (evt.target === _this3.refs.container) {
                            onMaskTap(evt);
                        }
                    },
                    style: Object.assign({
                        top: parseInt(maskOffset[0], 10),
                        bottom: parseInt(maskOffset[1], 10),
                        transform: 'translate3d(0,0,0)',
                        WebkitTransform: 'translate3d(0,0,0)'
                    }, show ? null : { display: 'none' })
                },
                _react2.default.createElement(
                    'div',
                    {
                        className: contentClass,
                        ref: function ref(component) {
                            _this3.contentDom = component;
                        },
                        style: {
                            position: 'relative',
                            top: parseInt(contentOffset[1], 10) || 0,
                            left: parseInt(contentOffset[0], 10) || 0,
                            WebkitAnimationDuration: duration + 'ms',
                            animationDuration: duration + 'ms',
                            width: width,
                            height: height
                        }
                    },
                    this.props.children
                )
            );
        }
    }]);

    return RealModal;
}(_react.Component);

exports.default = RealModal;


RealModal.defaultProps = defaultProps;
RealModal.propTypes = propTypes;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "modal.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _src = __webpack_require__(16);

var _src2 = _interopRequireDefault(_src);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(87);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Popup
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version 3.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description 弹出组件，支持上、下两个方向的弹出组件，基于Modal组件实现。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件内容弹出的方向，高度和效果执行时间。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * - 可设置组件背景遮罩层的上、下偏移量。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./popup.md}{instruUrl: popup.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author qingguo.xu
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var noop = function noop() {};

var propTypes = {
  /**
   * @property show
   * @type Bool
   * @description 组件是否显示
   * @default false
   */
  show: _react.PropTypes.bool,
  /**
   * @property duration
   * @type Number
   * @description 组件内容显隐时，动画执行时间，单位：ms
   * @default 200ms
   */
  duration: _react.PropTypes.number,
  /**
   * @property height
   * @type String/Number
   * @description 组件显示的内容高度
   * @default 'auto'
   */
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  /**
   * @property direction
   * @type Enum {'up', 'down'}
   * @description 组件动画打开方向
   * @default 'up'
   */
  direction: _react.PropTypes.oneOf(['up', 'down']),
  /**
   * @method onMaskTap
   * @type Function
   * @description 组件背景遮罩层的点击回调
   * @default () => {}
   */
  onMaskTap: _react.PropTypes.func,
  /**
   * @method onShow
   * @type Function
   * @description 组件打开时，动画触发之前的事件回调
   * @default () => {}
   */
  onShow: _react.PropTypes.func,
  /**
   * @method onHide
   * @type Function
   * @description 组件关闭时，动画触发之前的事件回调
   * @default () => {}
   */
  onHide: _react.PropTypes.func,
  /**
   * @property maskOffset
   * @type Array<Number>
   * @description 组件背景遮罩层的上、下偏移量
   * @default [0, 0]
   */
  maskOffset: _react.PropTypes.arrayOf(_react.PropTypes.number),
  /**
   * @property extraClass
   * @type String
   * @description 组件额外样式类
   */
  extraClass: _react.PropTypes.string,
  delayBeforeAnimationStart: _react.PropTypes.number,
  children: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.array])
};

var defaultPros = {
  duration: 200,
  height: 'auto',
  direction: 'up',
  onMaskTap: noop,
  onShow: noop,
  onHide: noop
};

var Popup = function (_Component) {
  _inherits(Popup, _Component);

  function Popup() {
    _classCallCheck(this, Popup);

    return _possibleConstructorReturn(this, (Popup.__proto__ || Object.getPrototypeOf(Popup)).apply(this, arguments));
  }

  _createClass(Popup, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          show = _props.show,
          duration = _props.duration,
          height = _props.height,
          direction = _props.direction,
          onMaskTap = _props.onMaskTap,
          onShow = _props.onShow,
          onHide = _props.onHide,
          maskOffset = _props.maskOffset,
          extraClass = _props.extraClass,
          children = _props.children,
          delayBeforeAnimationStart = _props.delayBeforeAnimationStart;

      var animation = direction === 'up' ? ['fade-in-up', 'fade-out-down'] : ['fade-in-down', 'fade-out-up'];
      var align = direction === 'up' ? 'bottom' : 'top';
      return _react2.default.createElement(
        _src2.default,
        {
          show: show,
          height: height,
          width: '100%',
          direction: direction,
          onMaskTap: onMaskTap,
          onShow: onShow,
          onHide: onHide,
          align: align,
          animation: { animation: animation, duration: duration },
          maskOffset: maskOffset,
          contentExtraClass: extraClass,
          delayBeforeAnimationStart: delayBeforeAnimationStart
        },
        children
      );
    }
  }]);

  return Popup;
}(_react.Component);

exports.default = Popup;


Popup.propTypes = propTypes;
Popup.defaultProps = defaultPros;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var utils = function () {
    var me = {};
    var _elementStyle = document.createElement('div').style;

    var _vendor = function () {
        var vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT'];
        var transform = void 0;

        for (var i = 0, l = vendors.length; i < l; i++) {
            transform = vendors[i] + 'ransform';
            if (transform in _elementStyle) {
                return vendors[i].substr(0, vendors[i].length - 1);
            }
        }

        return false;
    }();

    var _prefixStyle = function _prefixStyle(style) {
        if (_vendor === false) {
            return false;
        }
        if (_vendor === '') {
            return style;
        }
        return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
    };

    me.getTime = Date.now || function getTime() {
        return new Date().getTime();
    };

    me.getRAF = function () {
        function basicRAF(callback) {
            return window.setTimeout(callback, 1000 / 60);
        }

        var rAF = window.cancelAnimationFrame && window.requestAnimationFrame || window.webkitCancelAnimationFrame && window.webkitRequestAnimationFrame || window.mozCancelAnimationFrame && window.mozRequestAnimationFrame || window.oCancelAnimationFrame && window.oRequestAnimationFrame || window.msCancelAnimationFrame && window.msRequestAnimationFrame || basicRAF;

        var cancelrAF = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;

        if (me.isBadAndroid) {
            rAF = basicRAF;
            cancelrAF = window.clearTimeout;
        }

        return { rAF: rAF, cancelrAF: cancelrAF };
    };

    me.extend = function (target, obj) {
        Object.keys(obj).forEach(function (i) {
            target[i] = obj[i];
        });
    };

    me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
        var distance = current - start,
            destination = void 0,
            duration = void 0;
        var speed = Math.abs(distance) / time;

        deceleration = deceleration === undefined ? 0.0006 : deceleration;

        destination = current + speed * speed / (2 * deceleration) * (distance < 0 ? -1 : 1);
        duration = speed / deceleration;

        if (destination < lowerMargin) {
            destination = wrapperSize ? lowerMargin - wrapperSize / 2.5 * (speed / 8) : lowerMargin;
            distance = Math.abs(destination - current);
            duration = distance / speed;
        } else if (destination > 0) {
            destination = wrapperSize ? wrapperSize / 2.5 * (speed / 8) : 0;
            distance = Math.abs(current) + destination;
            duration = distance / speed;
        }

        return {
            destination: Math.round(destination),
            duration: duration
        };
    };

    var _transform = _prefixStyle('transform');

    me.extend(me, {
        hasTransform: _transform !== false,
        hasPerspective: _prefixStyle('perspective') in _elementStyle,
        hasTouch: 'ontouchstart' in window,
        hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
        hasTransition: _prefixStyle('transition') in _elementStyle
    });

    /*
     This should find all Android browsers lower than build 535.19 (both stock browser and webview)
     - galaxy S2 is ok
     - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
     - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
     - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
     */
    me.isBadAndroid = function () {
        var appVersion = window.navigator.appVersion;
        var _isBadAndroid = false;
        // Android browser is not a chrome browser.
        if (/Android/.test(appVersion) && !/Chrome\/\d/.test(appVersion)) {
            var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
            if (safariVersion && (typeof safariVersion === 'undefined' ? 'undefined' : _typeof(safariVersion)) === 'object' && safariVersion.length >= 2) {
                _isBadAndroid = parseFloat(safariVersion[1]) < 535.19;
            } else {
                _isBadAndroid = true;
            }
        } else {
            _isBadAndroid = false;
        }

        return _isBadAndroid;
    }();

    me.extend(me.style = {}, {
        transform: _transform,
        transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
        transitionDuration: _prefixStyle('transitionDuration'),
        transitionDelay: _prefixStyle('transitionDelay'),
        transformOrigin: _prefixStyle('transformOrigin')
    });

    me.offset = function (el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;

        // jshint -W084
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        // jshint +W084

        return { left: left, top: top };
    };

    me.preventDefaultException = function (el, exceptions) {
        for (var i in exceptions) {
            if (exceptions[i].test(el[i])) {
                return true;
            }
        }

        return false;
    };

    me.extend(me.eventType = {}, {
        touchstart: 1,
        touchmove: 1,
        touchend: 1

        // mousedown: 2,
        // mousemove: 2,
        // mouseup: 2,
        //
        // pointerdown: 3,
        // pointermove: 3,
        // pointerup: 3,
        //
        // MSPointerDown: 3,
        // MSPointerMove: 3,
        // MSPointerUp: 3
    });

    me.extend(me.ease = {}, {
        quadratic: {
            style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fn: function fn(k) {
                return k * (2 - k);
            }
        },
        circular: {
            style: 'cubic-bezier(0.1, 0.57, 0.1, 1)', // Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
            fn: function fn(k) {
                var _k = k - 1;
                return Math.sqrt(1 - _k * _k);
            }
        },
        back: {
            style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            fn: function fn(k) {
                var b = 4;
                var _k = k - 1;
                return _k * _k * ((b + 1) * _k + b) + 1;
            }
        },
        bounce: {
            style: '',
            fn: function fn(k) {
                var y = void 0,
                    _k = k;

                if (_k / 1 < 1 / 2.75) {
                    _k = _k / 1;
                    y = 7.5625 * _k * _k;
                } else if (k < 2 / 2.75) {
                    _k -= 1.5 / 2.75;
                    y = 7.5625 * _k * _k + 0.75;
                } else if (k < 2.5 / 2.75) {
                    _k -= 2.25 / 2.75;
                    y = 7.5625 * _k * _k + 0.9375;
                } else {
                    _k -= 2.625 / 2.75;
                    y = 7.5625 * _k * _k + 0.984375;
                }

                return y;
            }
        },
        elastic: {
            style: '',
            fn: function fn(k) {
                var f = 0.22,
                    e = 0.4;

                if (k === 0) {
                    return 0;
                }
                if (k === 1) {
                    return 1;
                }

                return e * Math.pow(2, -10 * k) * Math.sin((k - f / 4) * (2 * Math.PI) / f) + 1;
            }
        }
    });

    return me;
}();

exports.default = utils;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "utils.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _util = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @component Sticky
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description `Sticky` 组件，只能在 `Scroller` 内部或者列表系列组件的 `staticSection` 中使用，
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 它内部的子元素在 `Scroller` 滚动时将会获得吸顶效果。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * `Sticky` 是一个虚拟组件，它只会给它的唯一子元素添加额外的逻辑，而不会改变原有的 `dom` 结构。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @instructions {instruInfo: ./sticky.md}{instruUrl: scroller/sticky.html?hideIcon}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author jiao.shen
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @version  3.0.2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Sticky = function (_Component) {
    _inherits(Sticky, _Component);

    function Sticky() {
        _classCallCheck(this, Sticky);

        var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this));

        _this.domNode = null;
        _this.height = null;
        _this.offsetTop = null;
        _this.className = null;
        return _this;
    }

    _createClass(Sticky, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.scroller = this.context.scroller;

            if (this.scroller) {
                this.initialize();
                this.scroller.stickyHeaders.push(this);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            this.initialize();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            var _this2 = this;

            if (this.scroller) {
                this.scroller.stickyHeaders = this.scroller.stickyHeaders.filter(function (header) {
                    return header !== _this2;
                });
            }
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            var height = this.props.height;

            this.domNode = _reactDom2.default.findDOMNode(this);
            if (height == null) {
                this.height = this.domNode.offsetHeight;
            } else {
                this.height = this.props.height;
            }
            this.offsetTop = (0, _util.getElementOffsetY)(this.domNode, null);
            this.className = this.domNode.className;
            this.onlyChild = _react2.default.Children.only(this.props.children);
            this.stickyExtraClass = this.props.stickyExtraClass;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return Sticky;
}(_react.Component);

Sticky.propTypes = {
    /**
     * @property stickyExtraClass
     * @type String
     * @default null
     * @description 在Sticky的子元素处在吸顶状态时，为Scroller的sticky容器添加的额外样式类。
     */
    stickyExtraClass: _react.PropTypes.string,
    /**
     * @property height
     * @type number
     * @default null
     * @version 3.0.6
     * @description 吸顶元素的高度，在infinite的列表组件的staticSection中使用时，设置这个属性可以提高列表的滚动性能。
     */
    height: _react.PropTypes.number,
    children: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object, _react.PropTypes.string])
};
Sticky.defaultProps = {
    stickyExtraClass: ''
};
Sticky.contextTypes = {
    scroller: _react.PropTypes.object
};
exports.default = Sticky;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exports.TAP_DELAY = undefined;

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TAP_SLOP = 5; /**
                   * touchable手势处理,解决Scroller内部的手势冲突
                   * 在滚动时不会触发active
                   * 在active之后发生滚动会取消active状态
                   */
var TAP_DELAY = exports.TAP_DELAY = 50;
/**
 * @param endPoint
 * @param startPoint
 * @returns {number}
 * 根据个点的坐标计算出位移
 */
function getDistance(endPoint, startPoint) {
    return Math.sqrt(Math.pow(endPoint.pageX - startPoint.pageX, 2) + Math.pow(endPoint.pageY - startPoint.pageY, 2));
}

/**
 * @param endPoint
 * @param startPoint
 * @returns {boolean}
 * 根据两个点的位移判断是否应该取消Tap事件的触发
 */
function onTouchMoveShouldCancelTap(endPoint, startPoint) {
    return getDistance(endPoint, startPoint) > TAP_SLOP;
}

/**
 * @param evt
 * @returns {touch/null}
 * 获取触点
 */
function getTouchPoint(evt) {
    return evt.touches.length ? { pageX: evt.touches[0].pageX, pageY: evt.touches[0].pageY } : null;
}

/**
 * @param domNode
 * @param activeClass
 * 移除item的activeClass
 */
function removeActiveClass(domNode, activeClass) {
    if (domNode && activeClass) {
        domNode.className = domNode.className.replace(' ' + activeClass, '');
    }
}

/**
 * @param scroller
 * @returns {boolean}
 * 判断组件是否在滚动
 */
function isScrolling(scroller) {
    return scroller ? scroller.isScrolling : false;
}

function isAnySwipeMenuOpen(swipeMenuList) {
    return swipeMenuList ? swipeMenuList.openIndex !== -1 : false;
}

// touchStart的位置,是否需要放弃Tap触发,Tap周期(start,move,end)是否已经结束
var startPoint = void 0,
    shouldAbortTap = void 0;
var captured = null;

function _default(component, scroller, swipeMenuList, activeClass, onTap, _onTouchStart) {
    var gestureObj = {
        onTouchStart: function onTouchStart(evt) {
            var domNode = _reactDom2.default.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
            // 如果组件正在滚动,直接放弃Tap触发
            shouldAbortTap = isScrolling(scroller) || isAnySwipeMenuOpen(swipeMenuList);
            startPoint = getTouchPoint(evt);
            _onTouchStart(evt);
            if (!captured) {
                captured = domNode;
            }
            // TAP_DELAY之后再次判断是否要触发Tap,如果这段时间内出现了大的位移,if后面的逻辑就不会执行
            setTimeout(function () {
                var className = activeClass;
                if (!shouldAbortTap && className && captured === domNode) {
                    domNode.className += ' ' + className;
                }
            }, TAP_DELAY);
        },
        onTouchMove: function onTouchMove(evt) {
            var domNode = _reactDom2.default.findDOMNode(component);
            var currentPoint = getTouchPoint(evt);
            // 根据touchmove的距离判断是否要放弃tap
            if (onTouchMoveShouldCancelTap(currentPoint, startPoint)) {
                shouldAbortTap = true;
                captured = null;
                removeActiveClass(domNode, activeClass);
            }
        },
        onTouchEnd: function onTouchEnd(evt) {
            var target = evt.target;
            var domNode = _reactDom2.default.findDOMNode(component);
            // 如果需要触发tap,在TAP_DELAY之后触发onTap回调
            if (!shouldAbortTap && captured === domNode) {
                setTimeout(function () {
                    onTap(target);
                    removeActiveClass(domNode, activeClass);
                    captured = null;
                }, TAP_DELAY + 10);
            } else if (shouldAbortTap) {
                captured = null;
            }
        },
        onTouchCancel: function onTouchCancel() {
            var domNode = _reactDom2.default.findDOMNode(component);
            removeActiveClass(domNode, activeClass);
        }
    };

    return gestureObj;
}
exports.default = _default;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "gesture.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer() {
    _classCallCheck(this, Footer);

    return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
  }

  _createClass(Footer, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'footer',
        { id: 'footer' },
        _react2.default.createElement(
          'ul',
          null,
          _react2.default.createElement(
            _reactRouter.Link,
            { to: 'home', activeClassName: 'nav_active' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'i',
                { className: 'yo-ico' },
                '\uE611'
              ),
              _react2.default.createElement(
                'b',
                null,
                '\u573A\u666F'
              )
            )
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: 'shop', activeClassName: 'nav_active' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'i',
                { className: 'yo-ico' },
                '\uE604'
              ),
              _react2.default.createElement(
                'b',
                null,
                '\u5546\u57CE'
              )
            )
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: 'user', activeClassName: 'nav_active' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'i',
                { className: 'yo-ico' },
                '\uE8AA'
              ),
              _react2.default.createElement(
                'b',
                null,
                '\u6211\u7684'
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(_react2.default.Component);

exports.default = Footer;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Footer.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

var _Room = __webpack_require__(19);

var _Room2 = _interopRequireDefault(_Room);

var _FullRoom = __webpack_require__(18);

var _FullRoom2 = _interopRequireDefault(_FullRoom);

var _LocationList = __webpack_require__(48);

var _LocationList2 = _interopRequireDefault(_LocationList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, props));
  }

  _createClass(Home, [{
    key: 'locationFn',
    value: function locationFn() {
      console.log(1);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'Home_container' },
        _react2.default.createElement(
          'div',
          { className: 'yo-header yo-header-homeheader' },
          _react2.default.createElement(
            'h2',
            { className: 'title' },
            _react2.default.createElement('section', null)
          ),
          _react2.default.createElement(
            'span',
            { onClick: this.locationFn, className: 'regret' },
            _react2.default.createElement(
              'i',
              { className: 'yo-ico' },
              '\uE61C'
            ),
            '\u5317\u4EAC'
          ),
          _react2.default.createElement(
            'span',
            { className: 'affirm' },
            _react2.default.createElement(
              'span',
              null,
              '\u7B5B\u9009'
            ),
            _react2.default.createElement(
              'i',
              { className: 'yo-ico' },
              '\uE62D'
            )
          )
        ),
        _react2.default.createElement(
          'ul',
          { className: 'yo-tab' },
          _react2.default.createElement(
            'li',
            { className: 'item item-on' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: 'home/room', activeClassName: 'onsele', activeStyle: { color: '#007846' } },
              '\u623F\u95F4'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'item' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: 'home/fullroom', activeClassName: 'onsele', activeStyle: { color: '#007846' } },
              '\u5168\u5C4B'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'scroller_container' },
          this.props.children
        ),
        _react2.default.createElement(_LocationList2.default, null)
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Home.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LocationList = function (_React$Component) {
  _inherits(LocationList, _React$Component);

  function LocationList(props) {
    _classCallCheck(this, LocationList);

    var _this = _possibleConstructorReturn(this, (LocationList.__proto__ || Object.getPrototypeOf(LocationList)).call(this, props));

    _this.state = {
      location_province: [1, 2, 3],
      location_city: ['a', 'b', 'c']
    };
    return _this;
  }

  _createClass(LocationList, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { display: "none" }, className: 'localtion_container' },
        _react2.default.createElement(
          'ul',
          { className: 'location_in' },
          _react2.default.createElement(
            'li',
            { className: 'location_top' },
            '\u5317\u4EAC',
            _react2.default.createElement(
              'span',
              { className: 'okay' },
              '\u221A'
            )
          ),
          _react2.default.createElement(
            'li',
            { className: 'location_main' },
            _react2.default.createElement('section', { className: 'location_one' }),
            _react2.default.createElement('section', { className: 'location_two' })
          )
        )
      );
    }
  }]);

  return LocationList;
}(_react2.default.Component);

exports.default = LocationList;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "LocationList.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _kind = __webpack_require__(63);

var _kind2 = _interopRequireDefault(_kind);

var _mycarousel = __webpack_require__(12);

var _mycarousel2 = _interopRequireDefault(_mycarousel);

var _recommend = __webpack_require__(66);

var _recommend2 = _interopRequireDefault(_recommend);

var _match = __webpack_require__(64);

var _match2 = _interopRequireDefault(_match);

var _scroller = __webpack_require__(67);

var _scroller2 = _interopRequireDefault(_scroller);

var _design = __webpack_require__(60);

var _design2 = _interopRequireDefault(_design);

var _hotSale = __webpack_require__(62);

var _hotSale2 = _interopRequireDefault(_hotSale);

var _story = __webpack_require__(20);

var _story2 = _interopRequireDefault(_story);

var _newproduct = __webpack_require__(65);

var _newproduct2 = _interopRequireDefault(_newproduct);

var _allgoose = __webpack_require__(58);

var _allgoose2 = _interopRequireDefault(_allgoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shop = function (_React$Component) {
  _inherits(Shop, _React$Component);

  function Shop(props) {
    _classCallCheck(this, Shop);

    var _this = _possibleConstructorReturn(this, (Shop.__proto__ || Object.getPrototypeOf(Shop)).call(this, props));

    _this.state = {
      list: ["/shopimg/2017011216550161634.jpg"],
      playflag: true,
      hts: []
    };
    return _this;
  }

  _createClass(Shop, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'shop_container' },
        _react2.default.createElement(
          'div',
          { id: 'shop-top' },
          _react2.default.createElement(
            'div',
            { className: 'yo-header yo-header-top' },
            _react2.default.createElement(
              'h2',
              { className: 'title' },
              _react2.default.createElement('img', { src: '/shopimg/logo.png' })
            ),
            _react2.default.createElement(
              'span',
              { className: 'regret' },
              _react2.default.createElement('img', { src: '/shopimg/search.png' })
            ),
            _react2.default.createElement(
              'span',
              { className: 'affirm' },
              _react2.default.createElement('img', { src: '/shopimg/cart.png' })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'shop-content' },
          _react2.default.createElement(_mycarousel2.default, { list: this.state.list, autoplay: this.state.playflag }),
          _react2.default.createElement(_kind2.default, null),
          _react2.default.createElement(_recommend2.default, null),
          _react2.default.createElement(_match2.default, null),
          _react2.default.createElement(_scroller2.default, null),
          _react2.default.createElement(_design2.default, null),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'div',
              { className: 'yo-header yo-header-hotsale' },
              _react2.default.createElement(
                'h2',
                { className: 'title' },
                '\u597D\u5728'
              ),
              _react2.default.createElement(
                'span',
                { className: 'regret' },
                '\u53D6\u6D88'
              ),
              _react2.default.createElement(
                'span',
                { className: 'affirm' },
                '\u786E\u5B9A'
              )
            ),
            this.state.hts,
            _react2.default.createElement(
              'div',
              { className: 'more' },
              '\u67E5\u770B\u66F4\u591A'
            )
          ),
          _react2.default.createElement(_story2.default, null),
          _react2.default.createElement(_newproduct2.default, null),
          _react2.default.createElement(_allgoose2.default, null)
        )
      );
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _content1 = [];
      var _content2 = [];
      var _content3 = [];
      var _content4 = [];
      var _content5 = [];
      var _hts = [];
      var that = this;
      fetch("http://wwbtygm.duapp.com/readhaozai", { method: "POST" }).then(function (res) {
        return res.json();
      }).then(function (res) {
        var step = null;
        for (var i = 0; i < res.length; i++) {
          for (var j = i + 1; j < res.length - 1; j++) {
            if (Number(res[i].username) > Number(res[j].username)) {
              step = res[i];
              res[i] = res[j];
              res[j] = step;
            }
          }
        }
        for (var f = 17; f <= 44; f++) {
          _content1.push(res[f]);
        }
        for (var g = 46; g <= 84; g++) {
          _content2.push(res[g]);
        }
        for (var g = 85; g <= 131; g++) {
          _content3.push(res[g]);
        }
        for (var g = 132; g <= 186; g++) {
          _content4.push(res[g]);
        }
        for (var g = 187; g <= 203; g++) {
          _content5.push(res[g]);
        }

        _hts.push(_react2.default.createElement(_hotSale2.default, { list: _content1, subtitle: '\u8FD9\u4E2A\u6625\u5929\u8BA9\u3010\u6E05\u65B0\u6587\u827A\u98CE\u3011\u5439\u8FDB\u5367\u5BA4\u5427~', content: 'shop-content1' }));
        _hts.push(_react2.default.createElement(_hotSale2.default, { list: _content2, subtitle: '\u676F\u676F\u65B0\u6C14\u8C61 \u9910\u9910\u597D\u5FC3\u60C5', content: 'shop-content2' }));
        _hts.push(_react2.default.createElement(_hotSale2.default, { list: _content3, subtitle: '\u827A\u672F\u753B-\u5927\u6709\u4E0D\u540C', content: 'shop-content3' }));
        _hts.push(_react2.default.createElement(_hotSale2.default, { list: _content4, subtitle: '\u7B80\u7EA6\u8F7B\u5FEB-\u5BB6\u5C45\u56DB\u4EF6\u5957', content: 'shop-content4' }));
        _hts.push(_react2.default.createElement(_hotSale2.default, { list: _content5, subtitle: '\u8303\u5E97-\u966A\u4F60\u8FC7\u4ECA\u51AC', content: 'shop-content5' }));

        that.setState({
          hts: _hts
        });
      });
    }
  }]);

  return Shop;
}(_react2.default.Component);

exports.default = Shop;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Shop.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(3);

var _User_head = __webpack_require__(52);

var _User_head2 = _interopRequireDefault(_User_head);

var _User_order = __webpack_require__(54);

var _User_order2 = _interopRequireDefault(_User_order);

var _User_list = __webpack_require__(53);

var _User_list2 = _interopRequireDefault(_User_list);

var _User_bar = __webpack_require__(51);

var _User_bar2 = _interopRequireDefault(_User_bar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User = function (_React$Component) {
  _inherits(User, _React$Component);

  function User() {
    _classCallCheck(this, User);

    return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
  }

  _createClass(User, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'user' },
        _react2.default.createElement(_User_head2.default, null),
        _react2.default.createElement(_User_order2.default, null),
        _react2.default.createElement(_User_list2.default, null),
        _react2.default.createElement(_User_bar2.default, null)
      );
    }
  }]);

  return User;
}(_react2.default.Component);

exports.default = User;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "User.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User_bar = function (_React$Component) {
	_inherits(User_bar, _React$Component);

	function User_bar() {
		_classCallCheck(this, User_bar);

		return _possibleConstructorReturn(this, (User_bar.__proto__ || Object.getPrototypeOf(User_bar)).apply(this, arguments));
	}

	_createClass(User_bar, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'my_bar' },
				_react2.default.createElement('div', { className: 'fr' }),
				_react2.default.createElement(
					'div',
					{ className: 'my_coupon' },
					_react2.default.createElement('span', { className: 'my_icon' }),
					'\u6211\u7684\u4F18\u60E0\u5238',
					_react2.default.createElement('span', { className: 'right_go' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'my_car' },
					_react2.default.createElement('span', { className: 'my_icon' }),
					'\u8D2D\u7269\u8F66',
					_react2.default.createElement('span', { className: 'right_go' })
				),
				_react2.default.createElement(
					'div',
					{ className: 'my_adress' },
					_react2.default.createElement('span', { className: 'my_icon' }),
					'\u6536\u8D27\u5730\u5740',
					_react2.default.createElement('span', { className: 'right_go' })
				)
			);
		}
	}]);

	return User_bar;
}(_react2.default.Component);

exports.default = User_bar;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "User_bar.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
		value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User_head = function (_React$Component) {
		_inherits(User_head, _React$Component);

		function User_head() {
				_classCallCheck(this, User_head);

				return _possibleConstructorReturn(this, (User_head.__proto__ || Object.getPrototypeOf(User_head)).apply(this, arguments));
		}

		_createClass(User_head, [{
				key: 'render',
				value: function render() {
						return _react2.default.createElement(
								'div',
								{ className: 'user-head' },
								_react2.default.createElement(
										'div',
										{ className: 'user-header' },
										_react2.default.createElement(
												'div',
												{ className: 'img' },
												_react2.default.createElement('img', { src: 'http://static.haozaishop.com/mobile2/v1/img/u_h.png' })
										),
										_react2.default.createElement(
												'div',
												{ className: 'login_a' },
												_react2.default.createElement(
														'div',
														null,
														'\u6CE8\u518C / \u767B\u5F55'
												)
										)
								),
								_react2.default.createElement('div', { className: 'fr' })
						);
				}
		}]);

		return User_head;
}(_react2.default.Component);

exports.default = User_head;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "User_head.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User_list = function (_React$Component) {
	_inherits(User_list, _React$Component);

	function User_list() {
		_classCallCheck(this, User_list);

		return _possibleConstructorReturn(this, (User_list.__proto__ || Object.getPrototypeOf(User_list)).apply(this, arguments));
	}

	_createClass(User_list, [{
		key: 'render',
		value: function render() {
			return _react2.default.createElement(
				'div',
				{ className: 'order_list' },
				_react2.default.createElement(
					'div',
					{ className: 'order_list_box' },
					_react2.default.createElement(
						'div',
						{ className: 'order_list_one no_pay' },
						_react2.default.createElement('span', null)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'order_list_box' },
					_react2.default.createElement(
						'div',
						{ className: 'order_list_one no_consignment' },
						_react2.default.createElement('span', null)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'order_list_box' },
					_react2.default.createElement(
						'div',
						{ className: 'order_list_one no_receipt' },
						_react2.default.createElement('span', null)
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'order_list_box' },
					_react2.default.createElement(
						'div',
						{ className: 'order_list_one finish' },
						_react2.default.createElement('span', null)
					)
				)
			);
		}
	}]);

	return User_list;
}(_react2.default.Component);

exports.default = User_list;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "User_list.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var User_order = function (_React$Component) {
  _inherits(User_order, _React$Component);

  function User_order() {
    _classCallCheck(this, User_order);

    return _possibleConstructorReturn(this, (User_order.__proto__ || Object.getPrototypeOf(User_order)).apply(this, arguments));
  }

  _createClass(User_order, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'my_order' },
        _react2.default.createElement(
          'p',
          null,
          '\u6211\u7684\u8BA2\u5355'
        ),
        _react2.default.createElement(
          'span',
          { className: 'look_all_order' },
          '\u67E5\u770B\u5168\u90E8\u8BA2\u5355'
        ),
        _react2.default.createElement('span', { className: 'right_go' })
      );
    }
  }]);

  return User_order;
}(_react2.default.Component);

exports.default = User_order;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "User_order.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ajaxRequest;
/**
 * 创建XMLHttpRequest对象
 * @param _method 请求方式: post||get
 * @param _url 远程服务器地址
 * @param _async 是否异步
 * @param _parameter 向服务器发送数据
 * @param _callBack 回调函数
 */
function parameterDeal(_parameter) {
    var _sender = "";
    if (_parameter instanceof Object) {
        for (var k in _parameter) {
            _sender += k + "=" + _parameter[k] + "&";
        }
        return _sender.replace(/\&$/g, "");
    } else {
        return _parameter;
    }
}
function createXMLHttpRequest() {
    try {
        return new window.XMLHttpRequest();
    } catch (e) {
        try {
            return new ActiveXObject("MSXML2.XMLHTTP.6.0");
        } catch (e) {
            try {
                return new ActiveXObject("MSXML2.XMLHTTP.3.0");
            } catch (e) {
                try {
                    return new ActiveXObject("MSXML2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                        throw new Error("该浏览器版本太低,已经被大部分市场淘汰,请升级!!!");
                        return;
                    }
                }
            }
        }
    }
}
function ajaxRequest(_method, _url, _async, _parameter, _callBack) {
    var _ajax = createXMLHttpRequest();
    if (_ajax) {
        _ajax.onreadystatechange = function () {
            if (_ajax.readyState == 4 && _ajax.status == 200) {
                _callBack(_ajax.responseText);
            }
        };
        _ajax.open(_method, _url, _async);
        _ajax.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8");
        _ajax.send(parameterDeal(_parameter));
    }
}

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Ajax.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Matter = function (_React$Component) {
  _inherits(Matter, _React$Component);

  function Matter() {
    _classCallCheck(this, Matter);

    return _possibleConstructorReturn(this, (Matter.__proto__ || Object.getPrototypeOf(Matter)).apply(this, arguments));
  }

  _createClass(Matter, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'detailImg' },
        _react2.default.createElement('img', { src: 'http://img4.haozaishop.com/images/201607/goods_img/1900_P_1469000798860.jpg' })
      );
    }
  }]);

  return Matter;
}(_react2.default.Component);

exports.default = Matter;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Matter.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Standard = function (_React$Component) {
  _inherits(Standard, _React$Component);

  function Standard() {
    _classCallCheck(this, Standard);

    return _possibleConstructorReturn(this, (Standard.__proto__ || Object.getPrototypeOf(Standard)).apply(this, arguments));
  }

  _createClass(Standard, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'standard' },
        _react2.default.createElement(
          'div',
          { className: 'contentStandard' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              '\u586B\u5145\u7269:PP\u68C9'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u5916\u5957\u6750\u8D28:\u4E9A\u9EBB'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u7C7B\u578B:\u62B1\u6795/\u9760\u57AB'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u8BF4\u660E:\u6B63\u65B9\u5F62\u62B1\u6795\u89C4\u683C:43*43cm'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u98CE\u683C:\u73B0\u4EE3\u4E2D\u5F0F'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'transform' },
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u8FD0\u8D39\u60C5\u51B5\u3011'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u53D1\u8D27\u65F6\u95F4 \u3011'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u7C7B\u578B\u3011\u62B1\u6795/\u9760\u57AB'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u8BF4\u660E\u3011\u6B63\u65B9\u5F62\u62B1\u6795\u89C4\u683C:43*43cm'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u98CE\u683C\u3011\u73B0\u4EE3\u4E2D\u5F0F'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u8BF4\u660E\u3011\u6B63\u65B9\u5F62\u62B1\u6795\u89C4\u683C:43*43cm'
            ),
            _react2.default.createElement(
              'li',
              null,
              '\u3010\u98CE\u683C\u3011\u73B0\u4EE3\u4E2D\u5F0F'
            )
          )
        )
      );
    }
  }]);

  return Standard;
}(_react2.default.Component);

exports.default = Standard;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "Standard.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(40);

var _index2 = _interopRequireDefault(_index);

var _story = __webpack_require__(20);

var _story2 = _interopRequireDefault(_story);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var guid = -1;

var Allgoose = function (_React$Component) {
	_inherits(Allgoose, _React$Component);

	function Allgoose(props) {
		_classCallCheck(this, Allgoose);

		var _this = _possibleConstructorReturn(this, (Allgoose.__proto__ || Object.getPrototypeOf(Allgoose)).call(this, props));

		_this.refetch = _this.refetch.bind(_this);
		_this.state = {
			listitem: [{}]
		};
		return _this;
	}

	_createClass(Allgoose, [{
		key: 'refetch',
		value: function refetch() {
			var that = this;
			var num = 1;
			var _list = [];
			fetch('/api/v2/api/shop/listGoods?').then(function (res) {
				return res.json();
			}).then(function (res) {
				var _len = res.data.data.length;
				var res = res.data.data;
				console.log(res);
				for (var i = 0; i < _len; i++) {
					_list.push({ content: React.createElement(
							'li',
							{ className: 'listitem' },
							React.createElement('img', { src: res[i].goods_img }),
							React.createElement(
								'p',
								{ className: 'goodsname' },
								res[i].goods_name
							),
							React.createElement(
								'p',
								{ className: 'goodsprice' },
								'\uFFE5',
								res[i].shop_price
							)
						), key: ++guid });
				}

				that.setState({
					listitem: that.state.listitem.concat(_list)
				});
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			console.log(this.state.listitem);
			return React.createElement(
				'div',
				{ className: 'allgoose' },
				React.createElement(
					'p',
					null,
					'\u6240\u6709\u5546\u54C1'
				),
				React.createElement(_index2.default, {
					ref: 'list',
					extraClass: 'goosebox',
					dataSource: this.state.listitem,
					useLoadMore: true,
					onLoad: function onLoad() {
						setTimeout(function () {
							_this2.refetch();
							_this2.refs.list.stopLoading(true);
						}, 500);
					},
					renderItem: function renderItem(item, i) {
						return React.createElement(
							'div',
							null,
							item.content
						);
					}
				})
			);
		}
	}, {
		key: 'componentWillMount',
		value: function componentWillMount() {
			var that = this;
			var num = 1;
			var _list = [];
			fetch('/api/v2/api/shop/listGoods?').then(function (res) {
				return res.json();
			}).then(function (res) {
				var _len = res.data.data.length;
				var res = res.data.data;
				console.log(res);
				for (var i = 0; i < _len; i++) {
					_list.push({ content: React.createElement(
							'li',
							{ className: 'listitem' },
							React.createElement('img', { src: res[i].goods_img }),
							React.createElement(
								'p',
								{ className: 'goodsname' },
								res[i].goods_name
							),
							React.createElement(
								'p',
								{ className: 'goodsprice' },
								'\uFFE5',
								res[i].shop_price
							)
						), key: ++guid });
				}

				that.setState({
					listitem: _list
				});
			});
		}
	}]);

	return Allgoose;
}(React.Component);

exports.default = Allgoose;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "allgoose.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(2);

var _reactRouter = __webpack_require__(3);

var _src = __webpack_require__(11);

var _src2 = _interopRequireDefault(_src);

var _index = __webpack_require__(37);

var _index2 = _interopRequireDefault(_index);

var _index3 = __webpack_require__(16);

var _index4 = _interopRequireDefault(_index3);

var _index5 = __webpack_require__(42);

var _index6 = _interopRequireDefault(_index5);

var _fetch = __webpack_require__(61);

var _fetch2 = _interopRequireDefault(_fetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Cartshop = function (_React$Component) {
	_inherits(Cartshop, _React$Component);

	function Cartshop(props) {
		_classCallCheck(this, Cartshop);

		var _this = _possibleConstructorReturn(this, (Cartshop.__proto__ || Object.getPrototypeOf(Cartshop)).call(this, props));

		_this.Click = _this.Click.bind(_this);
		_this.extend = _this.extend.bind(_this);
		_this.routeChange = _this.routeChange.bind(_this);
		_this.state = {
			bannerList: [_react2.default.createElement('div', null)],
			routechange: false,
			i: 0,
			icon: '&#xe65e;',
			a: false
		};
		return _this;
	}

	_createClass(Cartshop, [{
		key: 'render',
		value: function render() {
			var _React$createElement,
			    _this2 = this;

			return _react2.default.createElement(
				'div',
				{ className: 'cartshop' },
				_react2.default.createElement(
					'section',
					null,
					_react2.default.createElement(
						_src2.default,
						{ className: 'swiper', autoplay: false },
						this.state.bannerList
					),
					_react2.default.createElement(
						'div',
						{ className: 'goodsName' },
						_react2.default.createElement(
							'span',
							null,
							'\u4E5D\u9F99\u4E03\u5F69\u7409\u7483\u676F'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'price' },
						_react2.default.createElement(
							'span',
							null,
							'$400'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'changeNorms' },
						_react2.default.createElement(
							'div',
							{ className: 'contentNorms', onClick: this.Click },
							_react2.default.createElement(
								'span',
								null,
								'\u9009\u62E9\u89C4\u683C:1'
							),
							_react2.default.createElement('span', null)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'activity' },
						_react2.default.createElement(
							'div',
							{ className: 'contentActivity', onClick: this.extend, ref: 'extend' },
							_react2.default.createElement(
								'div',
								{ className: 'left' },
								_react2.default.createElement(
									'span',
									null,
									'\u6D3B\u52A8:'
								),
								_react2.default.createElement(
									'span',
									{ className: 'noMoney' },
									'\u5305\u90AE'
								)
							),
							_react2.default.createElement(
								'div',
								(_React$createElement = { className: 'right' }, _defineProperty(_React$createElement, 'className', 'yo-ico'), _defineProperty(_React$createElement, 'ref', 'icon'), _React$createElement),
								'\uE6CB'
							),
							_react2.default.createElement(
								'div',
								{ className: 'hide', ref: 'hide' },
								'\u5305\u90AE:\u672C\u5546\u54C1\u5305\u90AE '
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'service' },
						_react2.default.createElement(
							'div',
							{ className: 'contentService' },
							_react2.default.createElement(
								'p',
								null,
								'\u5BA2\u670D:4008-2311-31231,\u5DE5\u4F5C\u65F6\u95F4:9:00-18:00'
							),
							_react2.default.createElement(
								'p',
								null,
								'\u7531\u963F\u83AB\u5BB6\u5177\u53D1\u8D27,\u5E76\u63D0\u4F9B\u552E\u540E\u670D\u52A1'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'advantage' },
						_react2.default.createElement(
							'div',
							{ className: 'contentAdvantage' },
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'i',
									{ className: 'yo-ico' },
									'\uE621'
								),
								_react2.default.createElement(
									'em',
									null,
									'\u6B63\u54C1\u4FDD\u969C'
								)
							),
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'i',
									{ className: 'yo-ico' },
									'\uE621'
								),
								_react2.default.createElement(
									'em',
									null,
									'7\u5929\u9000\u6362\u8D27'
								)
							),
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'i',
									{ className: 'yo-ico' },
									'\uE621'
								),
								_react2.default.createElement(
									'em',
									null,
									'\u5148\u884C\u8D54\u4ED8'
								)
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'logo' },
						_react2.default.createElement(
							'div',
							{ className: 'contentLogo' },
							_react2.default.createElement(
								'span',
								null,
								'\u6469\u897F\u5BB6\u56ED'
							),
							_react2.default.createElement(
								'i',
								{ className: 'yo-ico' },
								'\uE6CB'
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'detail', id: 'detail' },
						_react2.default.createElement(
							'div',
							{ className: 'contentDetail' },
							_react2.default.createElement(
								'div',
								{ className: 'detailTop' },
								_react2.default.createElement(
									'span',
									null,
									_react2.default.createElement(
										'i',
										{ onClick: this.routeChange },
										_react2.default.createElement(
											_reactRouter.Link,
											{ to: '/cartshop/matter', activeClassName: 'active' },
											'\u8BE6\u60C5'
										)
									)
								),
								_react2.default.createElement(
									'span',
									null,
									_react2.default.createElement(
										'i',
										{ 'data-id': '', onClick: this.routeChange },
										_react2.default.createElement(
											_reactRouter.Link,
											{ to: '/cartshop/standard', activeClassName: 'active' },
											'\u89C4\u683C'
										)
									)
								)
							),
							_react2.default.createElement(
								'div',
								{ id: 'matter' },
								this.props.children
							)
						)
					),
					_react2.default.createElement(
						'div',
						{ className: 'modal' },
						_react2.default.createElement('div', { classname: 'box' }),
						_react2.default.createElement('div', { className: 'msg' })
					)
				),
				_react2.default.createElement(
					'div',
					{ className: 'popup' },
					_react2.default.createElement(
						_index6.default,
						{ show: this.state.a, direction: 'up', style: { height: 'auto' } },
						_react2.default.createElement('img', { src: '' }),
						_react2.default.createElement(
							'div',
							{ className: 'imgb' },
							_react2.default.createElement(
								'div',
								{ className: 'dmsgn' },
								'\u7409\u7483\u676F'
							),
							_react2.default.createElement(
								'div',
								{ className: 'dmsgp' },
								'$199'
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'v' },
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'p',
									null,
									'\u6570\u91CF'
								),
								_react2.default.createElement(
									'i',
									null,
									_react2.default.createElement('em', null)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'color' },
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'p',
									null,
									'\u6570\u91CF'
								),
								_react2.default.createElement(
									'i',
									null,
									_react2.default.createElement('em', null)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'num' },
							_react2.default.createElement(
								'span',
								null,
								_react2.default.createElement(
									'p',
									null,
									'\u6570\u91CF'
								),
								_react2.default.createElement(
									'i',
									null,
									_react2.default.createElement(
										_index2.default,
										{
											value: this.state.value,
											onChange: function onChange(value) {
												return _this2.setState({ value: value });
											},
											min: 0
										},
										_react2.default.createElement('input', { type: 'number' })
									)
								)
							)
						),
						_react2.default.createElement(
							'div',
							{ className: 'foot' },
							'\u8D2D\u7269\u8F66'
						)
					)
				),
				_react2.default.createElement(
					'footer',
					null,
					_react2.default.createElement(
						'ul',
						null,
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'yo-ico icon' },
								'\uE603'
							)
						),
						_react2.default.createElement(
							'li',
							null,
							_react2.default.createElement(
								_reactRouter.Link,
								{ className: 'yo-ico icon' },
								'\uE602'
							)
						),
						_react2.default.createElement(
							'li',
							{ onClick: this.Click },
							_react2.default.createElement(
								_reactRouter.Link,
								null,
								'\u52A0\u5165\u8D2D\u7269\u8F66'
							)
						),
						_react2.default.createElement(
							'li',
							{ onClick: this.Click },
							_react2.default.createElement(
								_reactRouter.Link,
								null,
								'\u7ACB\u5373\u8D2D\u4E70'
							)
						)
					)
				)
			);
		}
	}, {
		key: 'Click',
		value: function Click() {
			console.log(this.state.a);
			if (!this.state.a) {
				this.setState({
					a: !this.state.a
				});
			}
		}
	}, {
		key: 'extend',
		value: function extend() {
			if (this.state.i !== 1 && this.state.i % 2 == 0) {
				this.refs.hide.style.display = "block";
				this.refs.icon.innerHTML = "&#xe65e;";
			} else {
				this.refs.hide.style.display = "none";
				this.refs.icon.innerHTML = "&#xe6cb;";
			}
			this.state.i++;
		}
	}, {
		key: 'routeChange',
		value: function routeChange() {
			if (!this.state.routechange) {
				this.setState({
					routechang: !this.state.routechange
				});
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var url = 'http://localhost:3000/list.php?count=3';
			(0, _fetch2.default)(url, function (res) {
				var Lis = res.data.map(function (val) {
					return _react2.default.createElement(
						'li',
						{ className: 'item' },
						_react2.default.createElement('img', { className: 'img', src: val.img })
					);
				});
				this.setState({
					bannerList: Lis
				});
			}.bind(this));
		}
	}]);

	return Cartshop;
}(_react2.default.Component);

exports.default = Cartshop;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "cartshop.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(11);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Design = function (_React$Component) {
	_inherits(Design, _React$Component);

	function Design(props) {
		_classCallCheck(this, Design);

		var _this = _possibleConstructorReturn(this, (Design.__proto__ || Object.getPrototypeOf(Design)).call(this, props));

		_this.state = {
			list: [{ urlimg: "/shopimg/2017011110460169349.png", title: "中粮项目小高层 客厅 现代风格" }],
			playflag: false,
			datalist: []
		};
		return _this;
	}

	_createClass(Design, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "shop-design" },
				React.createElement(
					"div",
					{ className: "yo-header yo-header-design" },
					React.createElement(
						"h2",
						{ className: "title" },
						"\u642D\u914D\u8BBE\u8BA1\u65B9\u6848"
					)
				),
				React.createElement(
					_index2.default,
					{ autoplay: false },
					this.state.datalist
				)
			);
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			var _list = [];
			this.state.list.map(function (item) {
				_list.push(React.createElement(
					"li",
					{ className: "item" },
					React.createElement("img", { src: item.urlimg, className: "" }),
					React.createElement(
						"p",
						{ className: "subtitle" },
						item.title
					)
				));
			});

			this.setState({
				datalist: _list
			});
		}
	}]);

	return Design;
}(React.Component);

exports.default = Design;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "design.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});


var fetchData = function fetchData(url, callback) {
	fetch(url).then(function (response) {
		return response.json();
	}).then(function (res) {
		callback(res);
	});
};

exports.default = fetchData;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "fetch.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRouter = __webpack_require__(3);

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Hotsale = function (_React$Component) {
	_inherits(Hotsale, _React$Component);

	function Hotsale(props) {
		_classCallCheck(this, Hotsale);

		var _this = _possibleConstructorReturn(this, (Hotsale.__proto__ || Object.getPrototypeOf(Hotsale)).call(this, props));

		_this.state = {
			list: []
		};
		return _this;
	}

	_createClass(Hotsale, [{
		key: "render",
		value: function render() {

			return React.createElement(
				"div",
				{ className: "hot-sale" },
				React.createElement(
					"p",
					{ className: "hot-title" },
					this.props.subtitle
				),
				React.createElement(
					_index2.default,
					{ scrollX: true, scrollY: false },
					React.createElement(
						"ul",
						{ className: this.props.content },
						this.state.list
					)
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _list = [];
			this.props.list.map(function (item) {
				_list.push(React.createElement(
					"li",
					{ className: "item", "data-id": item.id },
					React.createElement(
						_reactRouter.Link,
						{ to: "cartshop" },
						React.createElement("img", { src: item.urlimg }),
						React.createElement(
							"p",
							{ className: "match_name" },
							item.name
						),
						React.createElement(
							"p",
							{ className: "match_price" },
							item.price
						)
					)
				));
			});
			this.setState({
				list: _list
			});
		}
	}]);

	return Hotsale;
}(React.Component);

exports.default = Hotsale;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "hot-sale.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Kind = function (_React$Component) {
	_inherits(Kind, _React$Component);

	function Kind() {
		_classCallCheck(this, Kind);

		return _possibleConstructorReturn(this, (Kind.__proto__ || Object.getPrototypeOf(Kind)).apply(this, arguments));
	}

	_createClass(Kind, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "shop-kind" },
				_react2.default.createElement(
					"p",
					{ className: "title" },
					"\u5206\u7C7B"
				),
				_react2.default.createElement(
					"div",
					{ className: "kind" },
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "jingpin", className: "item" },
						_react2.default.createElement(
							"i",
							null,
							"1"
						),
						_react2.default.createElement(
							"span",
							null,
							"\u7CBE\u54C1\u5BB6\u5177"
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "jiaju", className: "item" },
						_react2.default.createElement(
							"i",
							null,
							"1"
						),
						_react2.default.createElement(
							"span",
							null,
							"\u5BB6\u5177\u5E03\u827A"
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "peishi", className: "item" },
						_react2.default.createElement(
							"i",
							null,
							"1"
						),
						_react2.default.createElement(
							"span",
							null,
							"\u914D\u9970\u65E5\u7528"
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "chufang", className: "item" },
						_react2.default.createElement(
							"i",
							null,
							"1"
						),
						_react2.default.createElement(
							"span",
							null,
							"\u53A8\u623F\u9910\u996E"
						)
					),
					_react2.default.createElement(
						_reactRouter.Link,
						{ to: "dengshi", className: "item" },
						_react2.default.createElement(
							"i",
							null,
							"1"
						),
						_react2.default.createElement(
							"span",
							null,
							"\u706F\u9970\u7167\u660E"
						)
					)
				)
			);
		}
	}]);

	return Kind;
}(_react2.default.Component);

exports.default = Kind;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "kind.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mycarousel = __webpack_require__(12);

var _mycarousel2 = _interopRequireDefault(_mycarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Match = function (_React$Component) {
	_inherits(Match, _React$Component);

	function Match(props) {
		_classCallCheck(this, Match);

		var _this = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, props));

		_this.state = {
			list: ["/shopimg/2017011109460138311.jpg"],
			playflag: false
		};
		return _this;
	}

	_createClass(Match, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "shop-match" },
				_react2.default.createElement(
					"div",
					{ className: "yo-header yo-header-match" },
					_react2.default.createElement(
						"h2",
						{ className: "title" },
						"\u5FAE\u642D\u914D"
					)
				),
				_react2.default.createElement(_mycarousel2.default, { list: this.state.list, autoplay: this.state.playflag })
			);
		}
	}]);

	return Match;
}(_react2.default.Component);

exports.default = Match;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "match.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Story = function (_React$Component) {
	_inherits(Story, _React$Component);

	function Story(props) {
		_classCallCheck(this, Story);

		var _this = _possibleConstructorReturn(this, (Story.__proto__ || Object.getPrototypeOf(Story)).call(this, props));

		_this.state = {
			list: []
		};

		return _this;
	}

	_createClass(Story, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "shop-news" },
				React.createElement(
					"p",
					{ className: "subtitle" },
					"\u65B0\u54C1\u4E0A\u65B0"
				),
				React.createElement(
					"ul",
					null,
					this.state.list
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var that = this;
			var _list = [],
			    _arr = [];
			fetch("http://wwbtygm.duapp.com/readhaozai", { method: "POST" }).then(function (res) {
				return res.json();
			}).then(function (res) {
				for (var i = 120; i < 152; i += 4) {
					_arr.push(res[i]);
				}
				_arr.map(function (item) {
					_list.push(React.createElement(
						"li",
						{ className: "item" },
						React.createElement("img", { src: item.urlimg }),
						React.createElement(
							"p",
							{ className: "goodsname" },
							item.name
						),
						React.createElement(
							"p",
							null,
							item.price
						)
					));
				});
				that.setState({
					list: _list

				});
			});
		}
	}]);

	return Story;
}(React.Component);

exports.default = Story;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "newproduct.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _mycarousel = __webpack_require__(12);

var _mycarousel2 = _interopRequireDefault(_mycarousel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Recommend = function (_React$Component) {
	_inherits(Recommend, _React$Component);

	function Recommend(props) {
		_classCallCheck(this, Recommend);

		var _this = _possibleConstructorReturn(this, (Recommend.__proto__ || Object.getPrototypeOf(Recommend)).call(this, props));

		_this.state = {
			list: ["/shopimg/2017012110040140909.jpg"],
			playflag: false
		};
		return _this;
	}

	_createClass(Recommend, [{
		key: "render",
		value: function render() {
			return _react2.default.createElement(
				"div",
				{ className: "shop-recommend" },
				_react2.default.createElement(
					"div",
					{ className: "yo-header yo-header-recommend" },
					_react2.default.createElement(
						"h2",
						{ className: "title" },
						"\u8FBE\u4EBA\u7CBE\u54C1\u63A8\u8350"
					),
					_react2.default.createElement(
						"span",
						{ className: "affirm" },
						"\u66F4\u591A"
					)
				),
				_react2.default.createElement(_mycarousel2.default, { list: this.state.list, autoplay: this.state.playflag })
			);
		}
	}]);

	return Recommend;
}(_react2.default.Component);

exports.default = Recommend;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "recommend.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = __webpack_require__(9);

var _index2 = _interopRequireDefault(_index);

var _Ajax = __webpack_require__(55);

var _Ajax2 = _interopRequireDefault(_Ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Myscroller = function (_React$Component) {
	_inherits(Myscroller, _React$Component);

	function Myscroller(props) {
		_classCallCheck(this, Myscroller);

		var _this = _possibleConstructorReturn(this, (Myscroller.__proto__ || Object.getPrototypeOf(Myscroller)).call(this, props));

		_this.state = {
			list: [{ id: 'goods_id=2989',
				urlimg: 'http://img5.haozaishop.com/images/201607/thumb_img/2989_thumb_P_1468218870564.jpg',
				name: '环保玻璃 复古瓶5711_1',
				price: ' ￥104.13' }, { id: 'goods_id=2986',
				urlimg: 'http://img5.haozaishop.com/images/201607/thumb_img/2986_thumb_P_1468217448866.jpg',
				name: '手工玻璃圆形果盘7006',
				price: ' ￥92.43' }, { id: 'goods_id=2966',
				urlimg: 'http://img2.haozaishop.com/images/201607/thumb_img/2966_thumb_P_1467964237082.jpg',
				name: '红蓝线大盘',
				price: ' ￥57.33' }, { id: 'goods_id=2965',
				urlimg: 'http://img1.haozaishop.com/images/201607/thumb_img/2965_thumb_P_1467964018161.jpg',
				name: 'TCM茶壶',
				price: ' ￥117.00' }]
		};
		return _this;
	}

	_createClass(Myscroller, [{
		key: "render",
		value: function render() {
			var _list = [];
			this.state.list.map(function (item) {
				_list.push(React.createElement(
					"li",
					{ className: "item", "data-id": item.id },
					React.createElement("img", { src: item.urlimg }),
					React.createElement(
						"p",
						{ className: "match_name" },
						item.name
					),
					React.createElement(
						"p",
						{ className: "match_price" },
						item.price
					)
				));
			});
			return React.createElement(
				"div",
				{ className: "shop-scroller" },
				React.createElement(
					_index2.default,
					{ scrollX: true, scrollY: false },
					React.createElement(
						"ul",
						{ className: "scroller-box" },
						_list
					)
				)
			);
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {}
	}]);

	return Myscroller;
}(React.Component);

exports.default = Myscroller;

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "scroller.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("E:\\Gpro\\node_modules\\.0.4.7@react-hot-api\\modules\\index.js"), RootInstanceProvider = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react-dom/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

'use strict';

__webpack_require__(29);

__webpack_require__(28);

/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("E:\\Gpro\\node_modules\\.1.3.1@react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot apply hot update to " + "entry.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(79);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25);

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Types of raw signals from the browser caught at the top level.
 */
var topLevelTypes = {
  topAbort: null,
  topAnimationEnd: null,
  topAnimationIteration: null,
  topAnimationStart: null,
  topBlur: null,
  topCanPlay: null,
  topCanPlayThrough: null,
  topChange: null,
  topClick: null,
  topCompositionEnd: null,
  topCompositionStart: null,
  topCompositionUpdate: null,
  topContextMenu: null,
  topCopy: null,
  topCut: null,
  topDoubleClick: null,
  topDrag: null,
  topDragEnd: null,
  topDragEnter: null,
  topDragExit: null,
  topDragLeave: null,
  topDragOver: null,
  topDragStart: null,
  topDrop: null,
  topDurationChange: null,
  topEmptied: null,
  topEncrypted: null,
  topEnded: null,
  topError: null,
  topFocus: null,
  topInput: null,
  topInvalid: null,
  topKeyDown: null,
  topKeyPress: null,
  topKeyUp: null,
  topLoad: null,
  topLoadedData: null,
  topLoadedMetadata: null,
  topLoadStart: null,
  topMouseDown: null,
  topMouseMove: null,
  topMouseOut: null,
  topMouseOver: null,
  topMouseUp: null,
  topPaste: null,
  topPause: null,
  topPlay: null,
  topPlaying: null,
  topProgress: null,
  topRateChange: null,
  topReset: null,
  topScroll: null,
  topSeeked: null,
  topSeeking: null,
  topSelectionChange: null,
  topStalled: null,
  topSubmit: null,
  topSuspend: null,
  topTextInput: null,
  topTimeUpdate: null,
  topTouchCancel: null,
  topTouchEnd: null,
  topTouchMove: null,
  topTouchStart: null,
  topTransitionEnd: null,
  topVolumeChange: null,
  topWaiting: null,
  topWheel: null
};

var EventConstants = {
  topLevelTypes: topLevelTypes
};

module.exports = EventConstants;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(8);

var invariant = __webpack_require__(4);

/**
 * Injectable ordering of event plugins.
 */
var eventPluginOrder = null;

/**
 * Injectable mapping from names to event plugin modules.
 */
var namesToPlugins = {};

/**
 * Recomputes the plugin list using the injected plugins and plugin ordering.
 *
 * @private
 */
function recomputePluginOrdering() {
  if (!eventPluginOrder) {
    // Wait until an `eventPluginOrder` is injected.
    return;
  }
  for (var pluginName in namesToPlugins) {
    var pluginModule = namesToPlugins[pluginName];
    var pluginIndex = eventPluginOrder.indexOf(pluginName);
    !(pluginIndex > -1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugins that do not exist in the plugin ordering, `%s`.', pluginName) : _prodInvariant('96', pluginName) : void 0;
    if (EventPluginRegistry.plugins[pluginIndex]) {
      continue;
    }
    !pluginModule.extractEvents ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Event plugins must implement an `extractEvents` method, but `%s` does not.', pluginName) : _prodInvariant('97', pluginName) : void 0;
    EventPluginRegistry.plugins[pluginIndex] = pluginModule;
    var publishedEvents = pluginModule.eventTypes;
    for (var eventName in publishedEvents) {
      !publishEventForPlugin(publishedEvents[eventName], pluginModule, eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Failed to publish event `%s` for plugin `%s`.', eventName, pluginName) : _prodInvariant('98', eventName, pluginName) : void 0;
    }
  }
}

/**
 * Publishes an event so that it can be dispatched by the supplied plugin.
 *
 * @param {object} dispatchConfig Dispatch configuration for the event.
 * @param {object} PluginModule Plugin publishing the event.
 * @return {boolean} True if the event was successfully published.
 * @private
 */
function publishEventForPlugin(dispatchConfig, pluginModule, eventName) {
  !!EventPluginRegistry.eventNameDispatchConfigs.hasOwnProperty(eventName) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same event name, `%s`.', eventName) : _prodInvariant('99', eventName) : void 0;
  EventPluginRegistry.eventNameDispatchConfigs[eventName] = dispatchConfig;

  var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
  if (phasedRegistrationNames) {
    for (var phaseName in phasedRegistrationNames) {
      if (phasedRegistrationNames.hasOwnProperty(phaseName)) {
        var phasedRegistrationName = phasedRegistrationNames[phaseName];
        publishRegistrationName(phasedRegistrationName, pluginModule, eventName);
      }
    }
    return true;
  } else if (dispatchConfig.registrationName) {
    publishRegistrationName(dispatchConfig.registrationName, pluginModule, eventName);
    return true;
  }
  return false;
}

/**
 * Publishes a registration name that is used to identify dispatched events and
 * can be used with `EventPluginHub.putListener` to register listeners.
 *
 * @param {string} registrationName Registration name to add.
 * @param {object} PluginModule Plugin publishing the event.
 * @private
 */
function publishRegistrationName(registrationName, pluginModule, eventName) {
  !!EventPluginRegistry.registrationNameModules[registrationName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginHub: More than one plugin attempted to publish the same registration name, `%s`.', registrationName) : _prodInvariant('100', registrationName) : void 0;
  EventPluginRegistry.registrationNameModules[registrationName] = pluginModule;
  EventPluginRegistry.registrationNameDependencies[registrationName] = pluginModule.eventTypes[eventName].dependencies;

  if (process.env.NODE_ENV !== 'production') {
    var lowerCasedName = registrationName.toLowerCase();
    EventPluginRegistry.possibleRegistrationNames[lowerCasedName] = registrationName;

    if (registrationName === 'onDoubleClick') {
      EventPluginRegistry.possibleRegistrationNames.ondblclick = registrationName;
    }
  }
}

/**
 * Registers plugins so that they can extract and dispatch events.
 *
 * @see {EventPluginHub}
 */
var EventPluginRegistry = {

  /**
   * Ordered list of injected plugins.
   */
  plugins: [],

  /**
   * Mapping from event name to dispatch config
   */
  eventNameDispatchConfigs: {},

  /**
   * Mapping from registration name to plugin module
   */
  registrationNameModules: {},

  /**
   * Mapping from registration name to event name
   */
  registrationNameDependencies: {},

  /**
   * Mapping from lowercase registration names to the properly cased version,
   * used to warn in the case of missing event handlers. Available
   * only in __DEV__.
   * @type {Object}
   */
  possibleRegistrationNames: process.env.NODE_ENV !== 'production' ? {} : null,
  // Trust the developer to only use possibleRegistrationNames in __DEV__

  /**
   * Injects an ordering of plugins (by plugin name). This allows the ordering
   * to be decoupled from injection of the actual plugins so that ordering is
   * always deterministic regardless of packaging, on-the-fly injection, etc.
   *
   * @param {array} InjectedEventPluginOrder
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginOrder}
   */
  injectEventPluginOrder: function (injectedEventPluginOrder) {
    !!eventPluginOrder ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject event plugin ordering more than once. You are likely trying to load more than one copy of React.') : _prodInvariant('101') : void 0;
    // Clone the ordering so it cannot be dynamically mutated.
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },

  /**
   * Injects plugins to be used by `EventPluginHub`. The plugin names must be
   * in the ordering injected by `injectEventPluginOrder`.
   *
   * Plugins can be injected as part of page initialization or on-the-fly.
   *
   * @param {object} injectedNamesToPlugins Map from names to plugin modules.
   * @internal
   * @see {EventPluginHub.injection.injectEventPluginsByName}
   */
  injectEventPluginsByName: function (injectedNamesToPlugins) {
    var isOrderingDirty = false;
    for (var pluginName in injectedNamesToPlugins) {
      if (!injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        continue;
      }
      var pluginModule = injectedNamesToPlugins[pluginName];
      if (!namesToPlugins.hasOwnProperty(pluginName) || namesToPlugins[pluginName] !== pluginModule) {
        !!namesToPlugins[pluginName] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'EventPluginRegistry: Cannot inject two different event plugins using the same name, `%s`.', pluginName) : _prodInvariant('102', pluginName) : void 0;
        namesToPlugins[pluginName] = pluginModule;
        isOrderingDirty = true;
      }
    }
    if (isOrderingDirty) {
      recomputePluginOrdering();
    }
  },

  /**
   * Looks up the plugin for the supplied event.
   *
   * @param {object} event A synthetic event.
   * @return {?object} The plugin that created the supplied event.
   * @internal
   */
  getPluginModuleForEvent: function (event) {
    var dispatchConfig = event.dispatchConfig;
    if (dispatchConfig.registrationName) {
      return EventPluginRegistry.registrationNameModules[dispatchConfig.registrationName] || null;
    }
    if (dispatchConfig.phasedRegistrationNames !== undefined) {
      // pulling phasedRegistrationNames out of dispatchConfig helps Flow see
      // that it is not undefined.
      var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;

      for (var phase in phasedRegistrationNames) {
        if (!phasedRegistrationNames.hasOwnProperty(phase)) {
          continue;
        }
        var pluginModule = EventPluginRegistry.registrationNameModules[phasedRegistrationNames[phase]];
        if (pluginModule) {
          return pluginModule;
        }
      }
    }
    return null;
  },

  /**
   * Exposed for unit testing.
   * @private
   */
  _resetEventPlugins: function () {
    eventPluginOrder = null;
    for (var pluginName in namesToPlugins) {
      if (namesToPlugins.hasOwnProperty(pluginName)) {
        delete namesToPlugins[pluginName];
      }
    }
    EventPluginRegistry.plugins.length = 0;

    var eventNameDispatchConfigs = EventPluginRegistry.eventNameDispatchConfigs;
    for (var eventName in eventNameDispatchConfigs) {
      if (eventNameDispatchConfigs.hasOwnProperty(eventName)) {
        delete eventNameDispatchConfigs[eventName];
      }
    }

    var registrationNameModules = EventPluginRegistry.registrationNameModules;
    for (var registrationName in registrationNameModules) {
      if (registrationNameModules.hasOwnProperty(registrationName)) {
        delete registrationNameModules[registrationName];
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      var possibleRegistrationNames = EventPluginRegistry.possibleRegistrationNames;
      for (var lowerCasedName in possibleRegistrationNames) {
        if (possibleRegistrationNames.hasOwnProperty(lowerCasedName)) {
          delete possibleRegistrationNames[lowerCasedName];
        }
      }
    }
  }

};

module.exports = EventPluginRegistry;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var EventPluginHub = __webpack_require__(21);
var EventPluginUtils = __webpack_require__(13);

var accumulateInto = __webpack_require__(23);
var forEachAccumulated = __webpack_require__(24);
var warning = __webpack_require__(10);

var getListener = EventPluginHub.getListener;

/**
 * Some event types have a notion of different registration names for different
 * "phases" of propagation. This finds listeners by a given phase.
 */
function listenerAtPhase(inst, event, propagationPhase) {
  var registrationName = event.dispatchConfig.phasedRegistrationNames[propagationPhase];
  return getListener(inst, registrationName);
}

/**
 * Tags a `SyntheticEvent` with dispatched listeners. Creating this function
 * here, allows us to not have to bind or create functions for each event.
 * Mutating the event's members allows us to not have to create a wrapping
 * "dispatch" object that pairs the event with the listener.
 */
function accumulateDirectionalDispatches(inst, phase, event) {
  if (process.env.NODE_ENV !== 'production') {
    process.env.NODE_ENV !== 'production' ? warning(inst, 'Dispatching inst must not be null') : void 0;
  }
  var listener = listenerAtPhase(inst, event, phase);
  if (listener) {
    event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
    event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
  }
}

/**
 * Collect dispatches (must be entirely collected before dispatching - see unit
 * tests). Lazily allocate the array to conserve memory.  We must loop through
 * each event and perform the traversal for each one. We cannot perform a
 * single traversal for the entire collection of events because each event may
 * have a different target.
 */
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    EventPluginUtils.traverseTwoPhase(event._targetInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Same as `accumulateTwoPhaseDispatchesSingle`, but skips over the targetID.
 */
function accumulateTwoPhaseDispatchesSingleSkipTarget(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    var targetInst = event._targetInst;
    var parentInst = targetInst ? EventPluginUtils.getParentInstance(targetInst) : null;
    EventPluginUtils.traverseTwoPhase(parentInst, accumulateDirectionalDispatches, event);
  }
}

/**
 * Accumulates without regard to direction, does not look for phased
 * registration names. Same as `accumulateDirectDispatchesSingle` but without
 * requiring that the `dispatchMarker` be the same as the dispatched ID.
 */
function accumulateDispatches(inst, ignoredDirection, event) {
  if (event && event.dispatchConfig.registrationName) {
    var registrationName = event.dispatchConfig.registrationName;
    var listener = getListener(inst, registrationName);
    if (listener) {
      event._dispatchListeners = accumulateInto(event._dispatchListeners, listener);
      event._dispatchInstances = accumulateInto(event._dispatchInstances, inst);
    }
  }
}

/**
 * Accumulates dispatches on an `SyntheticEvent`, but only for the
 * `dispatchMarker`.
 * @param {SyntheticEvent} event
 */
function accumulateDirectDispatchesSingle(event) {
  if (event && event.dispatchConfig.registrationName) {
    accumulateDispatches(event._targetInst, null, event);
  }
}

function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}

function accumulateTwoPhaseDispatchesSkipTarget(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingleSkipTarget);
}

function accumulateEnterLeaveDispatches(leave, enter, from, to) {
  EventPluginUtils.traverseEnterLeave(from, to, accumulateDispatches, leave, enter);
}

function accumulateDirectDispatches(events) {
  forEachAccumulated(events, accumulateDirectDispatchesSingle);
}

/**
 * A small set of propagation patterns, each of which will accept a small amount
 * of information, and generate a set of "dispatch ready event objects" - which
 * are sets of events that have already been annotated with a set of dispatched
 * listener functions/ids. The API is designed this way to discourage these
 * propagation strategies from actually executing the dispatches, since we
 * always want to collect the entire set of dispatches before executing event a
 * single one.
 *
 * @constructor EventPropagators
 */
var EventPropagators = {
  accumulateTwoPhaseDispatches: accumulateTwoPhaseDispatches,
  accumulateTwoPhaseDispatchesSkipTarget: accumulateTwoPhaseDispatchesSkipTarget,
  accumulateDirectDispatches: accumulateDirectDispatches,
  accumulateEnterLeaveDispatches: accumulateEnterLeaveDispatches
};

module.exports = EventPropagators;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */



var _prodInvariant = __webpack_require__(8);

var invariant = __webpack_require__(4);

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var _assign = __webpack_require__(89);

var PooledClass = __webpack_require__(74);

var emptyFunction = __webpack_require__(14);
var warning = __webpack_require__(10);

var didWarnForAddedNewProperty = false;
var isProxySupported = typeof Proxy === 'function';

var shouldBeReleasedProperties = ['dispatchConfig', '_targetInst', 'nativeEvent', 'isDefaultPrevented', 'isPropagationStopped', '_dispatchListeners', '_dispatchInstances'];

/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: emptyFunction.thatReturnsNull,
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function (event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};

/**
 * Synthetic events are dispatched by event plugins, typically in response to a
 * top-level event delegation handler.
 *
 * These systems should generally use pooling to reduce the frequency of garbage
 * collection. The system should check `isPersistent` to determine whether the
 * event should be released into the pool after being dispatched. Users that
 * need a persisted event should invoke `persist`.
 *
 * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
 * normalizing browser quirks. Subclasses do not necessarily have to implement a
 * DOM interface; custom application-specific events can also subclass this.
 *
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {*} targetInst Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @param {DOMEventTarget} nativeEventTarget Target node.
 */
function SyntheticEvent(dispatchConfig, targetInst, nativeEvent, nativeEventTarget) {
  if (process.env.NODE_ENV !== 'production') {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;

  var Interface = this.constructor.Interface;
  for (var propName in Interface) {
    if (!Interface.hasOwnProperty(propName)) {
      continue;
    }
    if (process.env.NODE_ENV !== 'production') {
      delete this[propName]; // this has a getter/setter for warnings
    }
    var normalize = Interface[propName];
    if (normalize) {
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') {
        this.target = nativeEventTarget;
      } else {
        this[propName] = nativeEvent[propName];
      }
    }
  }

  var defaultPrevented = nativeEvent.defaultPrevented != null ? nativeEvent.defaultPrevented : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  } else {
    this.isDefaultPrevented = emptyFunction.thatReturnsFalse;
  }
  this.isPropagationStopped = emptyFunction.thatReturnsFalse;
  return this;
}

_assign(SyntheticEvent.prototype, {

  preventDefault: function () {
    this.defaultPrevented = true;
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      // eslint-disable-line valid-typeof
      event.returnValue = false;
    }
    this.isDefaultPrevented = emptyFunction.thatReturnsTrue;
  },

  stopPropagation: function () {
    var event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // eslint-disable-line valid-typeof
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = emptyFunction.thatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function () {
    this.isPersistent = emptyFunction.thatReturnsTrue;
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: emptyFunction.thatReturnsFalse,

  /**
   * `PooledClass` looks for `destructor` on each instance it releases.
   */
  destructor: function () {
    var Interface = this.constructor.Interface;
    for (var propName in Interface) {
      if (process.env.NODE_ENV !== 'production') {
        Object.defineProperty(this, propName, getPooledWarningPropertyDefinition(propName, Interface[propName]));
      } else {
        this[propName] = null;
      }
    }
    for (var i = 0; i < shouldBeReleasedProperties.length; i++) {
      this[shouldBeReleasedProperties[i]] = null;
    }
    if (process.env.NODE_ENV !== 'production') {
      Object.defineProperty(this, 'nativeEvent', getPooledWarningPropertyDefinition('nativeEvent', null));
      Object.defineProperty(this, 'preventDefault', getPooledWarningPropertyDefinition('preventDefault', emptyFunction));
      Object.defineProperty(this, 'stopPropagation', getPooledWarningPropertyDefinition('stopPropagation', emptyFunction));
    }
  }

});

SyntheticEvent.Interface = EventInterface;

if (process.env.NODE_ENV !== 'production') {
  if (isProxySupported) {
    /*eslint-disable no-func-assign */
    SyntheticEvent = new Proxy(SyntheticEvent, {
      construct: function (target, args) {
        return this.apply(target, Object.create(target.prototype), args);
      },
      apply: function (constructor, that, args) {
        return new Proxy(constructor.apply(that, args), {
          set: function (target, prop, value) {
            if (prop !== 'isPersistent' && !target.constructor.Interface.hasOwnProperty(prop) && shouldBeReleasedProperties.indexOf(prop) === -1) {
              process.env.NODE_ENV !== 'production' ? warning(didWarnForAddedNewProperty || target.isPersistent(), 'This synthetic event is reused for performance reasons. If you\'re ' + 'seeing this, you\'re adding a new property in the synthetic event object. ' + 'The property is never released. See ' + 'https://fb.me/react-event-pooling for more information.') : void 0;
              didWarnForAddedNewProperty = true;
            }
            target[prop] = value;
            return true;
          }
        });
      }
    });
    /*eslint-enable no-func-assign */
  }
}
/**
 * Helper to reduce boilerplate when creating subclasses.
 *
 * @param {function} Class
 * @param {?object} Interface
 */
SyntheticEvent.augmentClass = function (Class, Interface) {
  var Super = this;

  var E = function () {};
  E.prototype = Super.prototype;
  var prototype = new E();

  _assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  Class.Interface = _assign({}, Super.Interface, Interface);
  Class.augmentClass = Super.augmentClass;

  PooledClass.addPoolingTo(Class, PooledClass.fourArgumentPooler);
};

PooledClass.addPoolingTo(SyntheticEvent, PooledClass.fourArgumentPooler);

module.exports = SyntheticEvent;

/**
  * Helper to nullify syntheticEvent instance properties when destructing
  *
  * @param {object} SyntheticEvent
  * @param {String} propName
  * @return {object} defineProperty object
  */
function getPooledWarningPropertyDefinition(propName, getVal) {
  var isFunction = typeof getVal === 'function';
  return {
    configurable: true,
    set: set,
    get: get
  };

  function set(val) {
    var action = isFunction ? 'setting the method' : 'setting the property';
    warn(action, 'This is effectively a no-op');
    return val;
  }

  function get() {
    var action = isFunction ? 'accessing the method' : 'accessing the property';
    var result = isFunction ? 'This is a no-op function' : 'This is set to null';
    warn(action, result);
    return getVal;
  }

  function warn(action, result) {
    var warningCondition = false;
    process.env.NODE_ENV !== 'production' ? warning(warningCondition, 'This synthetic event is reused for performance reasons. If you\'re seeing this, ' + 'you\'re %s `%s` on a released/nullified synthetic event. %s. ' + 'If you must keep the original synthetic event around, use event.persist(). ' + 'See https://fb.me/react-event-pooling for more information.', action, propName, result) : void 0;
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var SyntheticEvent = __webpack_require__(75);

var getEventTarget = __webpack_require__(78);

/**
 * @interface UIEvent
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */
var UIEventInterface = {
  view: function (event) {
    if (event.view) {
      return event.view;
    }

    var target = getEventTarget(event);
    if (target.window === target) {
      // target is a window object
      return target;
    }

    var doc = target.ownerDocument;
    // TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
    if (doc) {
      return doc.defaultView || doc.parentWindow;
    } else {
      return window;
    }
  },
  detail: function (event) {
    return event.detail || 0;
  }
};

/**
 * @param {object} dispatchConfig Configuration used to dispatch this event.
 * @param {string} dispatchMarker Marker identifying the event target.
 * @param {object} nativeEvent Native browser event.
 * @extends {SyntheticEvent}
 */
function SyntheticUIEvent(dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget) {
  return SyntheticEvent.call(this, dispatchConfig, dispatchMarker, nativeEvent, nativeEventTarget);
}

SyntheticEvent.augmentClass(SyntheticUIEvent, UIEventInterface);

module.exports = SyntheticUIEvent;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var ViewportMetrics = {

  currentScrollLeft: 0,

  currentScrollTop: 0,

  refreshScrollValues: function (scrollPosition) {
    ViewportMetrics.currentScrollLeft = scrollPosition.x;
    ViewportMetrics.currentScrollTop = scrollPosition.y;
  }

};

module.exports = ViewportMetrics;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */

function getEventTarget(nativeEvent) {
  var target = nativeEvent.target || nativeEvent.srcElement || window;

  // Normalize SVG <use> element events #4963
  if (target.correspondingUseElement) {
    target = target.correspondingUseElement;
  }

  // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
  // @see http://www.quirksmode.org/js/events_properties.html
  return target.nodeType === 3 ? target.parentNode : target;
}

module.exports = getEventTarget;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */



var shallowCompare = __webpack_require__(25);

/**
 * If your React component's render function is "pure", e.g. it will render the
 * same result given the same props and state, provide this mixin for a
 * considerable performance boost.
 *
 * Most React components have pure render functions.
 *
 * Example:
 *
 *   var ReactComponentWithPureRenderMixin =
 *     require('ReactComponentWithPureRenderMixin');
 *   React.createClass({
 *     mixins: [ReactComponentWithPureRenderMixin],
 *
 *     render: function() {
 *       return <div className={this.props.className}>foo</div>;
 *     }
 *   });
 *
 * Note: This only checks shallow equality for props and state. If these contain
 * complex data structures this mixin may have false-negatives for deeper
 * differences. Only mixin to components which have simple props and state, or
 * use `forceUpdate()` when you know deep data structures have changed.
 *
 * See https://facebook.github.io/react/docs/pure-render-mixin.html
 */
var ReactComponentWithPureRenderMixin = {
  shouldComponentUpdate: function (nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
};

module.exports = ReactComponentWithPureRenderMixin;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TapEventPlugin
 * @typechecks static-only
 */



var EventConstants = __webpack_require__(71);
var EventPluginUtils = __webpack_require__(13);
var EventPropagators = __webpack_require__(73);
var SyntheticUIEvent = __webpack_require__(76);
var TouchEventUtils = __webpack_require__(81);
var ViewportMetrics = __webpack_require__(77);

var keyOf = __webpack_require__(30);
var topLevelTypes = EventConstants.topLevelTypes;

var isStartish = EventPluginUtils.isStartish;
var isEndish = EventPluginUtils.isEndish;

var isTouch = function(topLevelType) {
  var touchTypes = [
    'topTouchCancel',
    'topTouchEnd',
    'topTouchStart',
    'topTouchMove'
  ];
  return touchTypes.indexOf(topLevelType) >= 0;
}

/**
 * Number of pixels that are tolerated in between a `touchStart` and `touchEnd`
 * in order to still be considered a 'tap' event.
 */
var tapMoveThreshold = 10;
var ignoreMouseThreshold = 750;
var startCoords = {x: null, y: null};
var lastTouchEvent = null;

var Axis = {
  x: {page: 'pageX', client: 'clientX', envScroll: 'currentPageScrollLeft'},
  y: {page: 'pageY', client: 'clientY', envScroll: 'currentPageScrollTop'}
};

function getAxisCoordOfEvent(axis, nativeEvent) {
  var singleTouch = TouchEventUtils.extractSingleTouch(nativeEvent);
  if (singleTouch) {
    return singleTouch[axis.page];
  }
  return axis.page in nativeEvent ?
    nativeEvent[axis.page] :
    nativeEvent[axis.client] + ViewportMetrics[axis.envScroll];
}

function getDistance(coords, nativeEvent) {
  var pageX = getAxisCoordOfEvent(Axis.x, nativeEvent);
  var pageY = getAxisCoordOfEvent(Axis.y, nativeEvent);
  return Math.pow(
    Math.pow(pageX - coords.x, 2) + Math.pow(pageY - coords.y, 2),
    0.5
  );
}

var touchEvents = [
  'topTouchStart',
  'topTouchCancel',
  'topTouchEnd',
  'topTouchMove',
];

var dependencies = [
  'topMouseDown',
  'topMouseMove',
  'topMouseUp',
].concat(touchEvents);

var eventTypes = {
  touchTap: {
    phasedRegistrationNames: {
      bubbled: keyOf({onTouchTap: null}),
      captured: keyOf({onTouchTapCapture: null})
    },
    dependencies: dependencies
  }
};

var now = (function() {
  if (Date.now) {
    return Date.now;
  } else {
    // IE8 support: http://stackoverflow.com/questions/9430357/please-explain-why-and-how-new-date-works-as-workaround-for-date-now-in
    return function () {
      return +new Date;
    }
  }
})();

function createTapEventPlugin(shouldRejectClick) {
  return {

    tapMoveThreshold: tapMoveThreshold,

    ignoreMouseThreshold: ignoreMouseThreshold,

    eventTypes: eventTypes,

    /**
     * @param {string} topLevelType Record from `EventConstants`.
     * @param {DOMEventTarget} targetInst The listening component root node.
     * @param {object} nativeEvent Native browser event.
     * @return {*} An accumulation of synthetic events.
     * @see {EventPluginHub.extractEvents}
     */
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {

      if (!isStartish(topLevelType) && !isEndish(topLevelType)) {
        return null;
      }

      if (isTouch(topLevelType)) {
        lastTouchEvent = now();
      } else {
        if (shouldRejectClick(lastTouchEvent, now())) {
          return null;
        }
      }

      var event = null;
      var distance = getDistance(startCoords, nativeEvent);
      if (isEndish(topLevelType) && distance < tapMoveThreshold) {
        event = SyntheticUIEvent.getPooled(
          eventTypes.touchTap,
          targetInst,
          nativeEvent,
          nativeEventTarget
        );
      }
      if (isStartish(topLevelType)) {
        startCoords.x = getAxisCoordOfEvent(Axis.x, nativeEvent);
        startCoords.y = getAxisCoordOfEvent(Axis.y, nativeEvent);
      } else if (isEndish(topLevelType)) {
        startCoords.x = 0;
        startCoords.y = 0;
      }
      EventPropagators.accumulateTwoPhaseDispatches(event);
      return event;
    }

  };
}

module.exports = createTapEventPlugin;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * Copyright 2013-2014 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @providesModule TouchEventUtils
 */

var TouchEventUtils = {
  /**
   * Utility function for common case of extracting out the primary touch from a
   * touch event.
   * - `touchEnd` events usually do not have the `touches` property.
   *   http://stackoverflow.com/questions/3666929/
   *   mobile-sarai-touchend-event-not-firing-when-last-touch-is-removed
   *
   * @param {Event} nativeEvent Native event that may or may not be a touch.
   * @return {TouchesObject?} an object with pageX and pageY or null.
   */
  extractSingleTouch: function(nativeEvent) {
    var touches = nativeEvent.touches;
    var changedTouches = nativeEvent.changedTouches;
    var hasTouches = touches && touches.length > 0;
    var hasChangedTouches = changedTouches && changedTouches.length > 0;

    return !hasTouches && hasChangedTouches ? changedTouches[0] :
           hasTouches ? touches[0] :
           nativeEvent;
  }
};

module.exports = TouchEventUtils;


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function(lastTouchEvent, clickTimestamp) {
  if (lastTouchEvent && (clickTimestamp - lastTouchEvent) < 750) {
    return true;
  }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var invariant = __webpack_require__(4);
var defaultClickRejectionStrategy = __webpack_require__(82);

var alreadyInjected = false;

module.exports = function injectTapEventPlugin (strategyOverrides) {
  strategyOverrides = strategyOverrides || {}
  var shouldRejectClick = strategyOverrides.shouldRejectClick || defaultClickRejectionStrategy;

  if (process.env.NODE_ENV !== 'production') {
    invariant(
      !alreadyInjected,
      'injectTapEventPlugin(): Can only be called once per application lifecycle.\n\n\
It is recommended to call injectTapEventPlugin() just before you call \
ReactDOM.render(). If you are using an external library which calls injectTapEventPlugin() \
itself, please contact the maintainer as it shouldn\'t be called in library code and \
should be injected by the application.'
    )
  }

  alreadyInjected = true;

  __webpack_require__(21).injection.injectEventPluginsByName({
    'TapEventPlugin':       __webpack_require__(80)(shouldRejectClick)
  });
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 84 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 85 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ })
/******/ ]);