/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	__webpack_require__.p = "assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _searchBoxListeners = __webpack_require__(2);

var _searchBoxListeners2 = _interopRequireDefault(_searchBoxListeners);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    (0, _searchBoxListeners2.default)();
})();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _enableInfo = __webpack_require__(3);

var _enableInfo2 = _interopRequireDefault(_enableInfo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @desc: Sets up eventlisteners for search box
 */
var searchBoxEnable = function searchBoxEnable() {
    var search = document.getElementById('search-term');
    var suggestionBox = document.getElementById('search-suggestions');
    var lastWorker = void 0;
    search.addEventListener('input', function (e) {
        if (lastWorker) {
            lastWorker.terminate();
        }
        //delay launching web worker to minimize requests until user is done typing
        setTimeout(function () {
            //launch a web worker to get the appropriate titles and 
            var worker = new Worker('./webWorkers/requestTitles.js');
            lastWorker = worker;
            worker.postMessage(e.target.value);
            worker.onmessage = function (event) {
                suggestionBox.innerHTML = '';
                event.data.forEach(function (result) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'result-container');
                    div.innerHTML = result;
                    suggestionBox.appendChild(div);
                    (0, _enableInfo2.default)(div);
                });
            };
        }, 500);
    });
};

exports.default = searchBoxEnable;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @desc: Sets up info on hover or click for each suggestion
 * - Either makes a request to get the info using a web worker
 * - or shows the existing info
 * - determines the current position of the parent container and places the overlay to right unless it would go off screen
 */
var enableInfo = function enableInfo(node) {

    var imdbID = node.querySelector('.title-container').id;
    node.addEventListener('mouseenter', function () {
        window.curr = node;
        //close any open info containers
        document.querySelectorAll('.open').forEach(function (node) {
            node.setAttribute("class", "title-info-container closed");
        });

        //if we have already created the title info container show it, otherwise create it
        var titleInfoContainer = node.querySelector('.title-info-container');

        //TODO: determine placement of info container
        if (titleInfoContainer) {
            //check to see if there is at least 600px left to the right
            if (window.innerWidth - node.offsetLeft > 600) {
                titleInfoContainer.setAttribute('class', 'title-info-container open right');
            } else {
                titleInfoContainer.setAttribute('class', 'title-info-container open left');
            }
        } else {
            var worker = new Worker('./webWorkers/requestInfo.js');
            worker.postMessage(imdbID);
            worker.onmessage = function (event) {
                var div = document.createElement('div');
                console.log(window.innerWidth - node.offsetLeft);
                if (window.innerWidth - node.offsetLeft > 600) {
                    div.setAttribute('class', 'title-info-container open right');
                } else {
                    div.setAttribute('class', 'title-info-container open left');
                }

                div.setAttribute('id', 'info-' + imdbID);
                div.innerHTML = event.data;
                node.appendChild(div);
            };
        }
    });
    node.addEventListener('mouseleave', function () {
        var titleInfoContainer = node.querySelector('.title-info-container');
        if (titleInfoContainer) {
            titleInfoContainer.setAttribute('class', 'title-info-container closed');
        }
    });
};

exports.default = enableInfo;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);