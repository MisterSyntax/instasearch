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
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    /**
     * @desc: Sets up eventlisteners for search box
     */
    function searchBoxEnable() {
        var search = document.getElementById('search-term');
        var suggestionBox = document.getElementById('search-suggestions');
        var lastWorker = void 0;
        search.addEventListener('input', function (e) {
            console.log('inputting');
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
                        enableInfo(div);
                    });
                };
            }, 500);
        });
    };
    /**
     * @desc: Sets up info on hover or click for each suggestion
     */
    function enableInfo(node) {
        window.curr = node;
        var imdbID = node.querySelector('.title-container').id;
        node.addEventListener('mouseenter', function () {
            //if we have already created the title info container show it, otherwise create it
            var titleInfoContainer = node.querySelector('.title-info-container');
            if (titleInfoContainer) {
                titleInfoContainer.setAttribute('class', 'title-info-container open');
            } else {
                var worker = new Worker('./webWorkers/requestInfo.js');
                worker.postMessage(imdbID);
                worker.onmessage = function (event) {
                    var div = document.createElement('div');
                    div.setAttribute('class', 'title-info-container open');
                    div.setAttribute('id', 'info-' + imdbID);
                    console.log(event.data);
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
    }

    searchBoxEnable();
})();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);