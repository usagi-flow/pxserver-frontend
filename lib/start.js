(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["start"] = factory();
	else
		root["start"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/start.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./server/model.ts":
/*!*************************!*\
  !*** ./server/model.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var fs = __webpack_require__(/*! fs */ "fs");
var Model = (function () {
    function Model() {
        this.loadConfiguration();
    }
    Model.prototype.loadConfiguration = function () {
        this.configuration = JSON.parse(fs.readFileSync("configuration.json", "utf8"));
        if (!this.configuration.fileDescription) {
        }
        console.log("- Description: " + this.configuration.fileDescription);
    };
    return Model;
}());
exports.default = Model;
var AppConfiguration = (function () {
    function AppConfiguration() {
    }
    return AppConfiguration;
}());


/***/ }),

/***/ "./server/routes/abstract-route.ts":
/*!*****************************************!*\
  !*** ./server/routes/abstract-route.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(/*! express */ "express");
var IndexRoute = (function () {
    function IndexRoute(model) {
        this.router = express.Router();
        this.model = model;
        this.configureHandlers(model);
    }
    IndexRoute.prototype.registerHandler = function (endpoint, handler) {
        var _this = this;
        this.router.get(endpoint, function (request, response, next) {
            return handler(_this.model, request, response, next);
        });
    };
    IndexRoute.prototype.getRouter = function () {
        return this.router;
    };
    return IndexRoute;
}());
exports.default = IndexRoute;


/***/ }),

/***/ "./server/routes/index-route.ts":
/*!**************************************!*\
  !*** ./server/routes/index-route.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var abstract_route_1 = __webpack_require__(/*! ./abstract-route */ "./server/routes/abstract-route.ts");
var IndexRoute = (function (_super) {
    tslib_1.__extends(IndexRoute, _super);
    function IndexRoute() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexRoute.prototype.configureHandlers = function (model) {
        this.registerHandler("/test-message", this.testMessage);
        this.registerHandler("/", this.handler);
    };
    IndexRoute.prototype.handler = function (model, request, response, next) {
        console.log("Handling Index route request");
        response.render("index", { title: "Express+" });
    };
    IndexRoute.prototype.testMessage = function (model, request, response, next) {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("content-type", "text/plain");
        response.setHeader("Cache-Control", "no-store");
        response.send("Hello world!");
    };
    return IndexRoute;
}(abstract_route_1.default));
exports.default = IndexRoute;


/***/ }),

/***/ "./server/server.ts":
/*!**************************!*\
  !*** ./server/server.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = __webpack_require__(/*! tslib */ "tslib");
var express = __webpack_require__(/*! express */ "express");
var path = __webpack_require__(/*! path */ "path");
var fs = __webpack_require__(/*! fs */ "fs");
var model_1 = __webpack_require__(/*! ./model */ "./server/model.ts");
var index_route_1 = __webpack_require__(/*! ./routes/index-route */ "./server/routes/index-route.ts");
var Server = (function () {
    function Server() {
        console.log("Initializing server");
        this.express = express();
        this.model = new model_1.default();
        this.configure();
    }
    Server.prototype.configure = function () {
        if (Server.SERVER_SIDE_VIEWS) {
            console.log("Setting up view engine for directory: " + path.join(__dirname, "views"));
            this.express.set("views", path.join(__dirname, "views"));
            this.express.set("view engine", "hbs");
            console.log("Setting up routes");
            this.express.use("/", new index_route_1.default(this.model).getRouter());
            this.express.use(express.static(path.join(__dirname, "public")));
        }
        else {
            console.log("Setting up routes");
            this.express.use(express.static(path.join(__dirname, "public")));
        }
        console.log("Listing server directory: " + __dirname);
        fs.readdirSync(__dirname).forEach(function (file) { return console.log(file); });
        console.log("Listing done");
    };
    Server.prototype.fallbackHandler = function (request, response, next) {
        response.statusCode = 404;
        response.send("<!DOCTYPE html><html><body>404 - Not found</body></html>");
    };
    Server.create = function () {
        return new Server();
    };
    Server.SERVER_SIDE_VIEWS = false;
    return Server;
}());
exports.default = Server;
var HTTPError = (function (_super) {
    tslib_1.__extends(HTTPError, _super);
    function HTTPError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HTTPError;
}(Error));


/***/ }),

/***/ "./server/start.ts":
/*!*************************!*\
  !*** ./server/start.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var http = __webpack_require__(/*! http */ "http");
var redis = __webpack_require__(/*! redis */ "redis");
var server_1 = __webpack_require__(/*! ./server */ "./server/server.ts");
var model_1 = __webpack_require__(/*! ./model */ "./server/model.ts");
exports.Model = model_1.default;
var ServerStarter = (function () {
    function ServerStarter() {
        var _this = this;
        this.redisInReady = false;
        this.redisOutReady = false;
        this.server = server_1.default.create();
        this.port = process.env.PORT || "3000";
        this.server.express.set("port", this.port);
        this.httpServer = http.createServer(this.server.express);
        this.httpServer.on("listening", function () { return _this.onListening(_this); });
        this.httpServer.on("error", function (error) { return _this.onError(_this, error); });
    }
    ServerStarter.prototype.getServer = function () {
        return this.server;
    };
    ServerStarter.prototype.connectToBackend = function () {
        var _this = this;
        console.log("Connecting to the backend");
        this.redisIn = redis.createClient(ServerStarter.SOCKET);
        this.redisIn.on("ready", function () {
            _this.redisInReady = true;
            console.log("Subscribing");
            _this.redisIn.subscribe("backend-to-frontend:pxserver");
        });
        this.redisIn.on("message", function (channel, message) {
            console.log("Channel <" + channel + ">: " + message);
        });
        this.redisOut = redis.createClient(ServerStarter.SOCKET);
        this.redisOut.on("ready", function () {
            _this.redisOutReady = true;
            setTimeout(function () {
                console.log("Sending a message");
                _this.redisOut.publish("frontend-to-backend:pxserver", "Hello from Frontend!");
            }, 3000);
        });
    };
    ServerStarter.prototype.start = function () {
        this.httpServer.listen(this.port);
    };
    ServerStarter.prototype.onListening = function (starter) {
        console.log("Listening on http://localhost:" + starter.port);
    };
    ServerStarter.prototype.onError = function (starter, error) {
        throw error;
    };
    ServerStarter.start = function () {
        var starter = new ServerStarter();
        starter.start();
        return starter;
    };
    ServerStarter.SOCKET = process.env.SOCKET || "/opt/common/ipc.socket";
    return ServerStarter;
}());
exports.ServerStarter = ServerStarter;
ServerStarter.start();


/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "redis":
/*!************************!*\
  !*** external "redis" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redis");

/***/ }),

/***/ "tslib":
/*!************************!*\
  !*** external "tslib" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("tslib");

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdGFydC93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vc3RhcnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3RhcnQvLi9zZXJ2ZXIvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vc3RhcnQvLi9zZXJ2ZXIvcm91dGVzL2Fic3RyYWN0LXJvdXRlLnRzIiwid2VicGFjazovL3N0YXJ0Ly4vc2VydmVyL3JvdXRlcy9pbmRleC1yb3V0ZS50cyIsIndlYnBhY2s6Ly9zdGFydC8uL3NlcnZlci9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vc3RhcnQvLi9zZXJ2ZXIvc3RhcnQudHMiLCJ3ZWJwYWNrOi8vc3RhcnQvZXh0ZXJuYWwgXCJleHByZXNzXCIiLCJ3ZWJwYWNrOi8vc3RhcnQvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL3N0YXJ0L2V4dGVybmFsIFwiaHR0cFwiIiwid2VicGFjazovL3N0YXJ0L2V4dGVybmFsIFwicGF0aFwiIiwid2VicGFjazovL3N0YXJ0L2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly9zdGFydC9leHRlcm5hbCBcInRzbGliXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87UUNWQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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RjFCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0FDekZ0QixvQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxrQyIsImZpbGUiOiJzdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YXJ0XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInN0YXJ0XCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zdGFydC50c1wiKTtcbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTW9kZWxcclxue1xyXG5cdHByaXZhdGUgY29uZmlndXJhdGlvbiA6IEFwcENvbmZpZ3VyYXRpb247XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5sb2FkQ29uZmlndXJhdGlvbigpO1xyXG5cdH1cclxuXHJcblx0cHJvdGVjdGVkIGxvYWRDb25maWd1cmF0aW9uKClcclxuXHR7XHJcblx0XHR0aGlzLmNvbmZpZ3VyYXRpb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcImNvbmZpZ3VyYXRpb24uanNvblwiLCBcInV0ZjhcIikpO1xyXG5cclxuXHRcdGlmICghdGhpcy5jb25maWd1cmF0aW9uLmZpbGVEZXNjcmlwdGlvbilcclxuXHRcdHtcclxuXHRcdFx0Ly8gUGVyZm9ybSBmYWxsYmFjayBoYW5kbGluZyBoZXJlXHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCItIERlc2NyaXB0aW9uOiBcIiArIHRoaXMuY29uZmlndXJhdGlvbi5maWxlRGVzY3JpcHRpb24pO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQXBwQ29uZmlndXJhdGlvblxyXG57XHJcblx0cHVibGljIGZpbGVEZXNjcmlwdGlvbiA6IHN0cmluZztcclxufSIsImltcG9ydCAqIGFzIGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IE1vZGVsIGZyb20gXCIuLi9tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgSW5kZXhSb3V0ZVxyXG57XHJcblx0cHJpdmF0ZSByb3V0ZXIgOiBleHByZXNzLlJvdXRlcjtcclxuXHRwcml2YXRlIG1vZGVsIDogTW9kZWw7XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3Rvcihtb2RlbCA6IE1vZGVsKVxyXG5cdHtcclxuXHRcdHRoaXMucm91dGVyID0gZXhwcmVzcy5Sb3V0ZXIoKTtcclxuXHRcdHRoaXMubW9kZWwgPSBtb2RlbDtcclxuXHJcblx0XHR0aGlzLmNvbmZpZ3VyZUhhbmRsZXJzKG1vZGVsKTtcclxuXHR9XHJcblxyXG5cdHByb3RlY3RlZCBhYnN0cmFjdCBjb25maWd1cmVIYW5kbGVycyhtb2RlbCA6IE1vZGVsKSA6IHZvaWQ7XHJcblxyXG5cdHByb3RlY3RlZCByZWdpc3RlckhhbmRsZXIoZW5kcG9pbnQgOiBzdHJpbmcsXHJcblx0XHRoYW5kbGVyIDogKG1vZGVsIDogTW9kZWwsIHJlcXVlc3QgOiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlIDogZXhwcmVzcy5SZXNwb25zZSwgbmV4dCA6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA9PiB2b2lkKSA6IHZvaWRcclxuXHR7XHJcblx0XHR0aGlzLnJvdXRlci5nZXQoZW5kcG9pbnQsXHJcblx0XHRcdChyZXF1ZXN0IDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZSA6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQgOiBleHByZXNzLk5leHRGdW5jdGlvbikgPT5cclxuXHRcdFx0XHRoYW5kbGVyKHRoaXMubW9kZWwsIHJlcXVlc3QsIHJlc3BvbnNlLCBuZXh0KSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0Um91dGVyKCkgOiBleHByZXNzLlJvdXRlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnJvdXRlcjtcclxuXHR9XHJcbn0iLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi4vbW9kZWxcIjtcclxuaW1wb3J0IEFic3RyYWN0Um91dGUgZnJvbSBcIi4vYWJzdHJhY3Qtcm91dGVcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4Um91dGUgZXh0ZW5kcyBBYnN0cmFjdFJvdXRlXHJcbntcclxuXHRwcm90ZWN0ZWQgY29uZmlndXJlSGFuZGxlcnMobW9kZWwgOiBNb2RlbCkgOiB2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5yZWdpc3RlckhhbmRsZXIoXCIvdGVzdC1tZXNzYWdlXCIsIHRoaXMudGVzdE1lc3NhZ2UpO1xyXG5cdFx0dGhpcy5yZWdpc3RlckhhbmRsZXIoXCIvXCIsIHRoaXMuaGFuZGxlcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGhhbmRsZXIobW9kZWwgOiBNb2RlbCwgcmVxdWVzdCA6IGV4cHJlc3MuUmVxdWVzdCwgcmVzcG9uc2UgOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0IDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pIDogdm9pZFxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSGFuZGxpbmcgSW5kZXggcm91dGUgcmVxdWVzdFwiKTtcclxuXHRcdHJlc3BvbnNlLnJlbmRlcihcImluZGV4XCIsIHt0aXRsZTogXCJFeHByZXNzK1wifSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHRlc3RNZXNzYWdlKG1vZGVsIDogTW9kZWwsIHJlcXVlc3QgOiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlIDogZXhwcmVzcy5SZXNwb25zZSwgbmV4dCA6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA6IHZvaWRcclxuXHR7XHJcblx0XHRyZXNwb25zZS5zZXRIZWFkZXIoXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiwgXCIqXCIpO1xyXG5cdFx0cmVzcG9uc2Uuc2V0SGVhZGVyKFwiY29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpblwiKTtcclxuXHRcdHJlc3BvbnNlLnNldEhlYWRlcihcIkNhY2hlLUNvbnRyb2xcIiwgXCJuby1zdG9yZVwiKTtcclxuXHRcdHJlc3BvbnNlLnNlbmQoXCJIZWxsbyB3b3JsZCFcIik7XHJcblx0fVxyXG59IiwiXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5pbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XHJcblxyXG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4vbW9kZWxcIjtcclxuaW1wb3J0IEluZGV4Um91dGUgZnJvbSBcIi4vcm91dGVzL2luZGV4LXJvdXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXJ2ZXJcclxue1xyXG5cdHByb3RlY3RlZCBzdGF0aWMgU0VSVkVSX1NJREVfVklFV1MgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHB1YmxpYyBleHByZXNzIDogZXhwcmVzcy5BcHBsaWNhdGlvbjtcclxuXHRwdWJsaWMgbW9kZWwgOiBNb2RlbDtcclxuXHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5sb2coXCJJbml0aWFsaXppbmcgc2VydmVyXCIpO1xyXG5cdFx0dGhpcy5leHByZXNzID0gZXhwcmVzcygpO1xyXG5cdFx0dGhpcy5tb2RlbCA9IG5ldyBNb2RlbCgpO1xyXG5cdFx0dGhpcy5jb25maWd1cmUoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY29uZmlndXJlKCkgOiB2b2lkXHJcblx0e1xyXG5cdFx0aWYgKFNlcnZlci5TRVJWRVJfU0lERV9WSUVXUylcclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTZXR0aW5nIHVwIHZpZXcgZW5naW5lIGZvciBkaXJlY3Rvcnk6IFwiICsgcGF0aC5qb2luKF9fZGlybmFtZSwgXCJ2aWV3c1wiKSk7XHJcblx0XHRcdHRoaXMuZXhwcmVzcy5zZXQoXCJ2aWV3c1wiLCBwYXRoLmpvaW4oX19kaXJuYW1lLCBcInZpZXdzXCIpKTtcclxuXHRcdFx0dGhpcy5leHByZXNzLnNldChcInZpZXcgZW5naW5lXCIsIFwiaGJzXCIpO1xyXG5cdFx0XHRcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTZXR0aW5nIHVwIHJvdXRlc1wiKTtcclxuXHRcdFx0dGhpcy5leHByZXNzLnVzZShcIi9cIiwgbmV3IEluZGV4Um91dGUodGhpcy5tb2RlbCkuZ2V0Um91dGVyKCkpO1xyXG5cdFx0XHR0aGlzLmV4cHJlc3MudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwicHVibGljXCIpKSk7XHJcblx0XHRcdC8vLXRoaXMuZXhwcmVzcy51c2UodGhpcy5mYWxsYmFja0hhbmRsZXIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHRjb25zb2xlLmxvZyhcIlNldHRpbmcgdXAgcm91dGVzXCIpO1xyXG5cdFx0XHR0aGlzLmV4cHJlc3MudXNlKGV4cHJlc3Muc3RhdGljKHBhdGguam9pbihfX2Rpcm5hbWUsIFwicHVibGljXCIpKSk7XHJcblx0XHRcdC8vLXRoaXMuZXhwcmVzcy51c2UodGhpcy5mYWxsYmFja0hhbmRsZXIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiTGlzdGluZyBzZXJ2ZXIgZGlyZWN0b3J5OiBcIiArIF9fZGlybmFtZSk7XHJcblx0XHRmcy5yZWFkZGlyU3luYyhfX2Rpcm5hbWUpLmZvckVhY2goZmlsZSA9PiBjb25zb2xlLmxvZyhmaWxlKSk7XHJcblx0XHRjb25zb2xlLmxvZyhcIkxpc3RpbmcgZG9uZVwiKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZmFsbGJhY2tIYW5kbGVyKHJlcXVlc3QgOiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlIDogZXhwcmVzcy5SZXNwb25zZSwgbmV4dCA6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA6IHZvaWRcclxuXHR7XHJcblx0XHRyZXNwb25zZS5zdGF0dXNDb2RlID0gNDA0O1xyXG5cdFx0cmVzcG9uc2Uuc2VuZChcIjwhRE9DVFlQRSBodG1sPjxodG1sPjxib2R5PjQwNCAtIE5vdCBmb3VuZDwvYm9keT48L2h0bWw+XCIpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBjcmVhdGUoKSA6IFNlcnZlclxyXG5cdHtcclxuXHRcdHJldHVybiBuZXcgU2VydmVyKCk7XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBIVFRQRXJyb3IgZXh0ZW5kcyBFcnJvclxyXG57XHJcblx0cHVibGljIHN0YXR1cyA6IG51bWJlcjtcclxufSIsImltcG9ydCAqIGFzIGh0dHAgZnJvbSBcImh0dHBcIjtcclxuaW1wb3J0ICogYXMgcmVkaXMgZnJvbSBcInJlZGlzXCI7XHJcblxyXG5pbXBvcnQgU2VydmVyIGZyb20gXCIuL3NlcnZlclwiO1xyXG5cclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBNb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2VydmVyU3RhcnRlclxyXG57XHJcblx0cHJvdGVjdGVkIHN0YXRpYyBTT0NLRVQgOiBzdHJpbmcgPSBwcm9jZXNzLmVudi5TT0NLRVQgfHwgXCIvb3B0L2NvbW1vbi9pcGMuc29ja2V0XCI7XHJcblxyXG5cdHByaXZhdGUgc2VydmVyIDogU2VydmVyO1xyXG5cdHByaXZhdGUgaHR0cFNlcnZlciA6IGh0dHAuU2VydmVyO1xyXG5cdHByaXZhdGUgcG9ydCA6IHN0cmluZztcclxuXHJcblx0cHJpdmF0ZSByZWRpc0luIDogcmVkaXMuUmVkaXNDbGllbnQ7XHJcblx0cHJpdmF0ZSByZWRpc0luUmVhZHkgOiBib29sZWFuID0gZmFsc2U7XHJcblx0cHJpdmF0ZSByZWRpc091dCA6IHJlZGlzLlJlZGlzQ2xpZW50O1xyXG5cdHByaXZhdGUgcmVkaXNPdXRSZWFkeSA6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcblx0cHJpdmF0ZSBjb25zdHJ1Y3RvcigpXHJcblx0e1xyXG5cdFx0dGhpcy5zZXJ2ZXIgPSBTZXJ2ZXIuY3JlYXRlKCk7XHJcblx0XHR0aGlzLnBvcnQgPSBwcm9jZXNzLmVudi5QT1JUIHx8IFwiMzAwMFwiO1xyXG5cclxuXHRcdHRoaXMuc2VydmVyLmV4cHJlc3Muc2V0KFwicG9ydFwiLCB0aGlzLnBvcnQpO1xyXG5cclxuXHRcdHRoaXMuaHR0cFNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKHRoaXMuc2VydmVyLmV4cHJlc3MpO1xyXG5cdFx0dGhpcy5odHRwU2VydmVyLm9uKFwibGlzdGVuaW5nXCIsICgpID0+IHRoaXMub25MaXN0ZW5pbmcodGhpcykpO1xyXG5cdFx0dGhpcy5odHRwU2VydmVyLm9uKFwiZXJyb3JcIiwgKGVycm9yKSA9PiB0aGlzLm9uRXJyb3IodGhpcywgZXJyb3IpKTtcclxuXHJcblx0XHQvL3RoaXMuY29ubmVjdFRvQmFja2VuZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFNlcnZlcigpIDogU2VydmVyXHJcblx0e1xyXG5cdFx0cmV0dXJuIHRoaXMuc2VydmVyO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjb25uZWN0VG9CYWNrZW5kKClcclxuXHR7XHJcblx0XHRjb25zb2xlLmxvZyhcIkNvbm5lY3RpbmcgdG8gdGhlIGJhY2tlbmRcIik7XHJcblxyXG5cdFx0dGhpcy5yZWRpc0luID0gcmVkaXMuY3JlYXRlQ2xpZW50KFNlcnZlclN0YXJ0ZXIuU09DS0VUKTtcclxuXHJcblx0XHR0aGlzLnJlZGlzSW4ub24oXCJyZWFkeVwiLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVkaXNJblJlYWR5ID0gdHJ1ZTtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTdWJzY3JpYmluZ1wiKTtcclxuXHRcdFx0dGhpcy5yZWRpc0luLnN1YnNjcmliZShcImJhY2tlbmQtdG8tZnJvbnRlbmQ6cHhzZXJ2ZXJcIik7XHJcblx0XHR9KTtcclxuXHRcdHRoaXMucmVkaXNJbi5vbihcIm1lc3NhZ2VcIiwgKGNoYW5uZWwgOiBzdHJpbmcsIG1lc3NhZ2UgOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJDaGFubmVsIDxcIiArIGNoYW5uZWwgKyBcIj46IFwiICsgbWVzc2FnZSk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlZGlzT3V0ID0gcmVkaXMuY3JlYXRlQ2xpZW50KFNlcnZlclN0YXJ0ZXIuU09DS0VUKTtcclxuXHRcdHRoaXMucmVkaXNPdXQub24oXCJyZWFkeVwiLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMucmVkaXNPdXRSZWFkeSA9IHRydWU7XHJcblx0XHRcdHNldFRpbWVvdXQoKCkgPT4ge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiU2VuZGluZyBhIG1lc3NhZ2VcIik7XHJcblx0XHRcdFx0dGhpcy5yZWRpc091dC5wdWJsaXNoKFwiZnJvbnRlbmQtdG8tYmFja2VuZDpweHNlcnZlclwiLCBcIkhlbGxvIGZyb20gRnJvbnRlbmQhXCIpO1xyXG5cdFx0XHR9LCAzMDAwKVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN0YXJ0KCkgOiB2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5odHRwU2VydmVyLmxpc3Rlbih0aGlzLnBvcnQpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkxpc3RlbmluZyhzdGFydGVyIDogU2VydmVyU3RhcnRlcikgOiB2b2lkXHJcblx0e1xyXG5cdFx0Y29uc29sZS5sb2coXCJMaXN0ZW5pbmcgb24gaHR0cDovL2xvY2FsaG9zdDpcIiArIHN0YXJ0ZXIucG9ydCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIG9uRXJyb3Ioc3RhcnRlciA6IFNlcnZlclN0YXJ0ZXIsIGVycm9yIDogRXJyb3IpIDogdm9pZFxyXG5cdHtcclxuXHRcdHRocm93IGVycm9yO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBzdGFydCgpIDogU2VydmVyU3RhcnRlclxyXG5cdHtcclxuXHRcdHZhciBzdGFydGVyIDogU2VydmVyU3RhcnRlciA9IG5ldyBTZXJ2ZXJTdGFydGVyKCk7XHJcblxyXG5cdFx0c3RhcnRlci5zdGFydCgpO1xyXG5cclxuXHRcdHJldHVybiBzdGFydGVyO1xyXG5cdH1cclxufVxyXG5cclxuU2VydmVyU3RhcnRlci5zdGFydCgpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImV4cHJlc3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaHR0cFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZGlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInRzbGliXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=