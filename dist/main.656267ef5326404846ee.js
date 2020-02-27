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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _wschat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wschat */ \"./src/wschat.js\");\n/* harmony import */ var _wschat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wschat__WEBPACK_IMPORTED_MODULE_0__);\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/wschat.js":
/*!***********************!*\
  !*** ./src/wschat.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//lesson 1:\r\nlet text     = $(\"#text\"),\r\n    chat     = $(\"#chat\"),\r\n    chat_body= $(\"#chat_body\"),\r\n    name     = $(\"#name\"),\r\n    chatname = $(\"#chatname\"), //lesson 3\r\n    message  = $(\".message\"),\r\n    ws;\r\n    \r\n//lesson 3 - begin \r\nchatname.change(function (event) {\r\n    if (ws) {\r\n        ws.close();\r\n        ws = null;\r\n        // message.remove();\r\n    }\r\n    //ws = new WebSocket(\"ws://192.168.1.44:591\"); \r\n    ws = new WebSocket(chatname.val()),\r\n//lesson 3 - end\r\n\r\n    ws.onmessage = function (message_ws) {\r\n        let message_in = JSON.parse(message_ws.data);\r\n        let message_field = `<div class=\"message alert alert-light ${message_in.name == name.val() ? \"message-right\" : \"message-left\"}\">\r\n                                <div class=\"username\">${message_in.name}</div>\r\n                                <div class=\"usertext\">${message_in.text}</div>\r\n                            </div>`;\r\n        chat.append(message_field);\r\n        chat_body.scrollTop(chat.height());\r\n\r\n    };\r\n\r\n    ws.onopen = function () {\r\n        text.keyup(function (event) {\r\n            if (event.which === 13 && name.val() && text.val()) {\r\n                let message_out = {\r\n                    name: name.val(),\r\n                    text: text.val(),\r\n                }\r\n                ws.send(JSON.stringify(message_out));\r\n                text.val(\"\");\r\n            }\r\n        });\r\n    };\r\n//lesson 3 begin\r\n})\r\n    //lesson 4 begin:\r\n// chatname.find(\"option\").toArray().forEach(element => {\r\n//     let el = $(element),\r\n//         loc_obj_synh = {isClose: false};\r\n//         ws1 = new WebSocket(el.val());\r\n//     ws1.onopen = function() {\r\n//         ws1.send(\"TestConnect\");\r\n//         ws1.close();\r\n//         console.log(\"onopen\");\r\n//         loc_obj_synh.isClose = true;\r\n//     };\r\n//     el.prop(\"style\",\"color: green\");\r\n//     ws1.onerror = function(){\r\n//         el.prop(\"style\",\"color: red\");\r\n//         ws1.close();\r\n\r\n//         console.log(\"onerror\");\r\n//         loc_obj_synh.isClose = true;\r\n//     }\r\n//     ws1.onclose = function() {\r\n//         loc_obj_synh.isClose = true;\r\n//         console.log(\"onclose\");\r\n//     }\r\n//     while (!loc_obj_synh.isClose) {\r\n//     }\r\n// });\r\n    //lesson 4 end:\r\nchatname.trigger(\"change\");\r\n//lesson 3 end\n\n//# sourceURL=webpack:///./src/wschat.js?");

/***/ })

/******/ });