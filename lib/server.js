(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["server"] = factory();
	else
		root["server"] = factory();
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
var path = __webpack_require__(/*! path */ "path");
var Model = (function () {
    function Model() {
        this.loadConfiguration();
    }
    Model.prototype.loadConfiguration = function () {
        try {
            this.configuration = JSON.parse(fs.readFileSync(path.join(__dirname, "configuration.json"), "utf8"));
        }
        catch (e) {
            this.configuration = null;
        }
        if (!this.configuration) {
        }
        if (!this.configuration)
            return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJ2ZXIvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3NlcnZlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zZXJ2ZXIvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc2VydmVyL3JvdXRlcy9hYnN0cmFjdC1yb3V0ZS50cyIsIndlYnBhY2s6Ly9zZXJ2ZXIvLi9zZXJ2ZXIvcm91dGVzL2luZGV4LXJvdXRlLnRzIiwid2VicGFjazovL3NlcnZlci8uL3NlcnZlci9zZXJ2ZXIudHMiLCJ3ZWJwYWNrOi8vc2VydmVyLy4vc2VydmVyL3N0YXJ0LnRzIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJmc1wiIiwid2VicGFjazovL3NlcnZlci9leHRlcm5hbCBcImh0dHBcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vc2VydmVyL2V4dGVybmFsIFwicmVkaXNcIiIsIndlYnBhY2s6Ly9zZXJ2ZXIvZXh0ZXJuYWwgXCJ0c2xpYlwiIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtR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YSxFQUFFLENBQUM7UUFFbEQsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWhCLE9BQU8sT0FBTyxDQUFDO0lBQ2hCLENBQUM7SUE3RWdCLG9CQUFNLEdBQVksT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksd0JBQXdCLENBQUM7SUE4RW5GLG9CQUFDO0NBQUE7QUFoRlksc0NBQWE7QUFrRjFCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0FDekZ0QixvQzs7Ozs7Ozs7Ozs7QUNBQSwrQjs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxpQzs7Ozs7Ozs7Ozs7QUNBQSxrQzs7Ozs7Ozs7Ozs7QUNBQSxrQyIsImZpbGUiOiJzZXJ2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzZXJ2ZXJcIl0gPSBmYWN0b3J5KCk7XG5cdGVsc2Vcblx0XHRyb290W1wic2VydmVyXCJdID0gZmFjdG9yeSgpO1xufSkoZ2xvYmFsLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NlcnZlci9zdGFydC50c1wiKTtcbiIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb2RlbFxyXG57XHJcblx0cHJpdmF0ZSBjb25maWd1cmF0aW9uIDogQXBwQ29uZmlndXJhdGlvbjtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKClcclxuXHR7XHJcblx0XHR0aGlzLmxvYWRDb25maWd1cmF0aW9uKCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgbG9hZENvbmZpZ3VyYXRpb24oKVxyXG5cdHtcclxuXHRcdHRyeVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNvbmZpZ3VyYXRpb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcImNvbmZpZ3VyYXRpb24uanNvblwiKSwgXCJ1dGY4XCIpKTtcclxuXHRcdH1cclxuXHRcdGNhdGNoIChlKVxyXG5cdFx0e1xyXG5cdFx0XHR0aGlzLmNvbmZpZ3VyYXRpb24gPSBudWxsO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmICghdGhpcy5jb25maWd1cmF0aW9uKVxyXG5cdFx0e1xyXG5cdFx0XHQvLyBQZXJmb3JtIGZhbGxiYWNrIGhhbmRsaW5nIGhlcmVcclxuXHRcdH1cclxuXHJcblx0XHRpZiAoIXRoaXMuY29uZmlndXJhdGlvbilcclxuXHRcdFx0cmV0dXJuO1xyXG5cclxuXHRcdGNvbnNvbGUubG9nKFwiLSBEZXNjcmlwdGlvbjogXCIgKyB0aGlzLmNvbmZpZ3VyYXRpb24uZmlsZURlc2NyaXB0aW9uKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIEFwcENvbmZpZ3VyYXRpb25cclxue1xyXG5cdHB1YmxpYyBmaWxlRGVzY3JpcHRpb24gOiBzdHJpbmc7XHJcbn0iLCJpbXBvcnQgKiBhcyBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBNb2RlbCBmcm9tIFwiLi4vbW9kZWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEluZGV4Um91dGVcclxue1xyXG5cdHByaXZhdGUgcm91dGVyIDogZXhwcmVzcy5Sb3V0ZXI7XHJcblx0cHJpdmF0ZSBtb2RlbCA6IE1vZGVsO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IobW9kZWwgOiBNb2RlbClcclxuXHR7XHJcblx0XHR0aGlzLnJvdXRlciA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblx0XHR0aGlzLm1vZGVsID0gbW9kZWw7XHJcblxyXG5cdFx0dGhpcy5jb25maWd1cmVIYW5kbGVycyhtb2RlbCk7XHJcblx0fVxyXG5cclxuXHRwcm90ZWN0ZWQgYWJzdHJhY3QgY29uZmlndXJlSGFuZGxlcnMobW9kZWwgOiBNb2RlbCkgOiB2b2lkO1xyXG5cclxuXHRwcm90ZWN0ZWQgcmVnaXN0ZXJIYW5kbGVyKGVuZHBvaW50IDogc3RyaW5nLFxyXG5cdFx0aGFuZGxlciA6IChtb2RlbCA6IE1vZGVsLCByZXF1ZXN0IDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZSA6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQgOiBleHByZXNzLk5leHRGdW5jdGlvbikgPT4gdm9pZCkgOiB2b2lkXHJcblx0e1xyXG5cdFx0dGhpcy5yb3V0ZXIuZ2V0KGVuZHBvaW50LFxyXG5cdFx0XHQocmVxdWVzdCA6IGV4cHJlc3MuUmVxdWVzdCwgcmVzcG9uc2UgOiBleHByZXNzLlJlc3BvbnNlLCBuZXh0IDogZXhwcmVzcy5OZXh0RnVuY3Rpb24pID0+XHJcblx0XHRcdFx0aGFuZGxlcih0aGlzLm1vZGVsLCByZXF1ZXN0LCByZXNwb25zZSwgbmV4dCkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFJvdXRlcigpIDogZXhwcmVzcy5Sb3V0ZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gdGhpcy5yb3V0ZXI7XHJcblx0fVxyXG59IiwiaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgTW9kZWwgZnJvbSBcIi4uL21vZGVsXCI7XHJcbmltcG9ydCBBYnN0cmFjdFJvdXRlIGZyb20gXCIuL2Fic3RyYWN0LXJvdXRlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleFJvdXRlIGV4dGVuZHMgQWJzdHJhY3RSb3V0ZVxyXG57XHJcblx0cHJvdGVjdGVkIGNvbmZpZ3VyZUhhbmRsZXJzKG1vZGVsIDogTW9kZWwpIDogdm9pZFxyXG5cdHtcclxuXHRcdHRoaXMucmVnaXN0ZXJIYW5kbGVyKFwiL3Rlc3QtbWVzc2FnZVwiLCB0aGlzLnRlc3RNZXNzYWdlKTtcclxuXHRcdHRoaXMucmVnaXN0ZXJIYW5kbGVyKFwiL1wiLCB0aGlzLmhhbmRsZXIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBoYW5kbGVyKG1vZGVsIDogTW9kZWwsIHJlcXVlc3QgOiBleHByZXNzLlJlcXVlc3QsIHJlc3BvbnNlIDogZXhwcmVzcy5SZXNwb25zZSwgbmV4dCA6IGV4cHJlc3MuTmV4dEZ1bmN0aW9uKSA6IHZvaWRcclxuXHR7XHJcblx0XHRjb25zb2xlLmxvZyhcIkhhbmRsaW5nIEluZGV4IHJvdXRlIHJlcXVlc3RcIik7XHJcblx0XHRyZXNwb25zZS5yZW5kZXIoXCJpbmRleFwiLCB7dGl0bGU6IFwiRXhwcmVzcytcIn0pO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSB0ZXN0TWVzc2FnZShtb2RlbCA6IE1vZGVsLCByZXF1ZXN0IDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZSA6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQgOiBleHByZXNzLk5leHRGdW5jdGlvbikgOiB2b2lkXHJcblx0e1xyXG5cdFx0cmVzcG9uc2Uuc2V0SGVhZGVyKFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCIsIFwiKlwiKTtcclxuXHRcdHJlc3BvbnNlLnNldEhlYWRlcihcImNvbnRlbnQtdHlwZVwiLCBcInRleHQvcGxhaW5cIik7XHJcblx0XHRyZXNwb25zZS5zZXRIZWFkZXIoXCJDYWNoZS1Db250cm9sXCIsIFwibm8tc3RvcmVcIik7XHJcblx0XHRyZXNwb25zZS5zZW5kKFwiSGVsbG8gd29ybGQhXCIpO1xyXG5cdH1cclxufSIsIlwidXNlIHN0cmljdFwiO1xyXG5cclxuaW1wb3J0ICogYXMgZXhwcmVzcyBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5cclxuaW1wb3J0IE1vZGVsIGZyb20gXCIuL21vZGVsXCI7XHJcbmltcG9ydCBJbmRleFJvdXRlIGZyb20gXCIuL3JvdXRlcy9pbmRleC1yb3V0ZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VydmVyXHJcbntcclxuXHRwcm90ZWN0ZWQgc3RhdGljIFNFUlZFUl9TSURFX1ZJRVdTIDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuXHRwdWJsaWMgZXhwcmVzcyA6IGV4cHJlc3MuQXBwbGljYXRpb247XHJcblx0cHVibGljIG1vZGVsIDogTW9kZWw7XHJcblxyXG5cdHByaXZhdGUgY29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKFwiSW5pdGlhbGl6aW5nIHNlcnZlclwiKTtcclxuXHRcdHRoaXMuZXhwcmVzcyA9IGV4cHJlc3MoKTtcclxuXHRcdHRoaXMubW9kZWwgPSBuZXcgTW9kZWwoKTtcclxuXHRcdHRoaXMuY29uZmlndXJlKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNvbmZpZ3VyZSgpIDogdm9pZFxyXG5cdHtcclxuXHRcdGlmIChTZXJ2ZXIuU0VSVkVSX1NJREVfVklFV1MpXHJcblx0XHR7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCB2aWV3IGVuZ2luZSBmb3IgZGlyZWN0b3J5OiBcIiArIHBhdGguam9pbihfX2Rpcm5hbWUsIFwidmlld3NcIikpO1xyXG5cdFx0XHR0aGlzLmV4cHJlc3Muc2V0KFwidmlld3NcIiwgcGF0aC5qb2luKF9fZGlybmFtZSwgXCJ2aWV3c1wiKSk7XHJcblx0XHRcdHRoaXMuZXhwcmVzcy5zZXQoXCJ2aWV3IGVuZ2luZVwiLCBcImhic1wiKTtcclxuXHRcdFx0XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiU2V0dGluZyB1cCByb3V0ZXNcIik7XHJcblx0XHRcdHRoaXMuZXhwcmVzcy51c2UoXCIvXCIsIG5ldyBJbmRleFJvdXRlKHRoaXMubW9kZWwpLmdldFJvdXRlcigpKTtcclxuXHRcdFx0dGhpcy5leHByZXNzLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcInB1YmxpY1wiKSkpO1xyXG5cdFx0XHQvLy10aGlzLmV4cHJlc3MudXNlKHRoaXMuZmFsbGJhY2tIYW5kbGVyKTtcclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0Y29uc29sZS5sb2coXCJTZXR0aW5nIHVwIHJvdXRlc1wiKTtcclxuXHRcdFx0dGhpcy5leHByZXNzLnVzZShleHByZXNzLnN0YXRpYyhwYXRoLmpvaW4oX19kaXJuYW1lLCBcInB1YmxpY1wiKSkpO1xyXG5cdFx0XHQvLy10aGlzLmV4cHJlc3MudXNlKHRoaXMuZmFsbGJhY2tIYW5kbGVyKTtcclxuXHRcdH1cclxuXHJcblx0XHRjb25zb2xlLmxvZyhcIkxpc3Rpbmcgc2VydmVyIGRpcmVjdG9yeTogXCIgKyBfX2Rpcm5hbWUpO1xyXG5cdFx0ZnMucmVhZGRpclN5bmMoX19kaXJuYW1lKS5mb3JFYWNoKGZpbGUgPT4gY29uc29sZS5sb2coZmlsZSkpO1xyXG5cdFx0Y29uc29sZS5sb2coXCJMaXN0aW5nIGRvbmVcIik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGZhbGxiYWNrSGFuZGxlcihyZXF1ZXN0IDogZXhwcmVzcy5SZXF1ZXN0LCByZXNwb25zZSA6IGV4cHJlc3MuUmVzcG9uc2UsIG5leHQgOiBleHByZXNzLk5leHRGdW5jdGlvbikgOiB2b2lkXHJcblx0e1xyXG5cdFx0cmVzcG9uc2Uuc3RhdHVzQ29kZSA9IDQwNDtcclxuXHRcdHJlc3BvbnNlLnNlbmQoXCI8IURPQ1RZUEUgaHRtbD48aHRtbD48Ym9keT40MDQgLSBOb3QgZm91bmQ8L2JvZHk+PC9odG1sPlwiKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgY3JlYXRlKCkgOiBTZXJ2ZXJcclxuXHR7XHJcblx0XHRyZXR1cm4gbmV3IFNlcnZlcigpO1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgSFRUUEVycm9yIGV4dGVuZHMgRXJyb3Jcclxue1xyXG5cdHB1YmxpYyBzdGF0dXMgOiBudW1iZXI7XHJcbn0iLCJpbXBvcnQgKiBhcyBodHRwIGZyb20gXCJodHRwXCI7XHJcbmltcG9ydCAqIGFzIHJlZGlzIGZyb20gXCJyZWRpc1wiO1xyXG5cclxuaW1wb3J0IFNlcnZlciBmcm9tIFwiLi9zZXJ2ZXJcIjtcclxuXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNlcnZlclN0YXJ0ZXJcclxue1xyXG5cdHByb3RlY3RlZCBzdGF0aWMgU09DS0VUIDogc3RyaW5nID0gcHJvY2Vzcy5lbnYuU09DS0VUIHx8IFwiL29wdC9jb21tb24vaXBjLnNvY2tldFwiO1xyXG5cclxuXHRwcml2YXRlIHNlcnZlciA6IFNlcnZlcjtcclxuXHRwcml2YXRlIGh0dHBTZXJ2ZXIgOiBodHRwLlNlcnZlcjtcclxuXHRwcml2YXRlIHBvcnQgOiBzdHJpbmc7XHJcblxyXG5cdHByaXZhdGUgcmVkaXNJbiA6IHJlZGlzLlJlZGlzQ2xpZW50O1xyXG5cdHByaXZhdGUgcmVkaXNJblJlYWR5IDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cdHByaXZhdGUgcmVkaXNPdXQgOiByZWRpcy5SZWRpc0NsaWVudDtcclxuXHRwcml2YXRlIHJlZGlzT3V0UmVhZHkgOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG5cdHByaXZhdGUgY29uc3RydWN0b3IoKVxyXG5cdHtcclxuXHRcdHRoaXMuc2VydmVyID0gU2VydmVyLmNyZWF0ZSgpO1xyXG5cdFx0dGhpcy5wb3J0ID0gcHJvY2Vzcy5lbnYuUE9SVCB8fCBcIjMwMDBcIjtcclxuXHJcblx0XHR0aGlzLnNlcnZlci5leHByZXNzLnNldChcInBvcnRcIiwgdGhpcy5wb3J0KTtcclxuXHJcblx0XHR0aGlzLmh0dHBTZXJ2ZXIgPSBodHRwLmNyZWF0ZVNlcnZlcih0aGlzLnNlcnZlci5leHByZXNzKTtcclxuXHRcdHRoaXMuaHR0cFNlcnZlci5vbihcImxpc3RlbmluZ1wiLCAoKSA9PiB0aGlzLm9uTGlzdGVuaW5nKHRoaXMpKTtcclxuXHRcdHRoaXMuaHR0cFNlcnZlci5vbihcImVycm9yXCIsIChlcnJvcikgPT4gdGhpcy5vbkVycm9yKHRoaXMsIGVycm9yKSk7XHJcblxyXG5cdFx0Ly90aGlzLmNvbm5lY3RUb0JhY2tlbmQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRTZXJ2ZXIoKSA6IFNlcnZlclxyXG5cdHtcclxuXHRcdHJldHVybiB0aGlzLnNlcnZlcjtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY29ubmVjdFRvQmFja2VuZCgpXHJcblx0e1xyXG5cdFx0Y29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHRoZSBiYWNrZW5kXCIpO1xyXG5cclxuXHRcdHRoaXMucmVkaXNJbiA9IHJlZGlzLmNyZWF0ZUNsaWVudChTZXJ2ZXJTdGFydGVyLlNPQ0tFVCk7XHJcblxyXG5cdFx0dGhpcy5yZWRpc0luLm9uKFwicmVhZHlcIiwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZGlzSW5SZWFkeSA9IHRydWU7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiU3Vic2NyaWJpbmdcIik7XHJcblx0XHRcdHRoaXMucmVkaXNJbi5zdWJzY3JpYmUoXCJiYWNrZW5kLXRvLWZyb250ZW5kOnB4c2VydmVyXCIpO1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLnJlZGlzSW4ub24oXCJtZXNzYWdlXCIsIChjaGFubmVsIDogc3RyaW5nLCBtZXNzYWdlIDogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnNvbGUubG9nKFwiQ2hhbm5lbCA8XCIgKyBjaGFubmVsICsgXCI+OiBcIiArIG1lc3NhZ2UpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0dGhpcy5yZWRpc091dCA9IHJlZGlzLmNyZWF0ZUNsaWVudChTZXJ2ZXJTdGFydGVyLlNPQ0tFVCk7XHJcblx0XHR0aGlzLnJlZGlzT3V0Lm9uKFwicmVhZHlcIiwgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLnJlZGlzT3V0UmVhZHkgPSB0cnVlO1xyXG5cdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhcIlNlbmRpbmcgYSBtZXNzYWdlXCIpO1xyXG5cdFx0XHRcdHRoaXMucmVkaXNPdXQucHVibGlzaChcImZyb250ZW5kLXRvLWJhY2tlbmQ6cHhzZXJ2ZXJcIiwgXCJIZWxsbyBmcm9tIEZyb250ZW5kIVwiKTtcclxuXHRcdFx0fSwgMzAwMClcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGFydCgpIDogdm9pZFxyXG5cdHtcclxuXHRcdHRoaXMuaHR0cFNlcnZlci5saXN0ZW4odGhpcy5wb3J0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgb25MaXN0ZW5pbmcoc3RhcnRlciA6IFNlcnZlclN0YXJ0ZXIpIDogdm9pZFxyXG5cdHtcclxuXHRcdGNvbnNvbGUubG9nKFwiTGlzdGVuaW5nIG9uIGh0dHA6Ly9sb2NhbGhvc3Q6XCIgKyBzdGFydGVyLnBvcnQpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBvbkVycm9yKHN0YXJ0ZXIgOiBTZXJ2ZXJTdGFydGVyLCBlcnJvciA6IEVycm9yKSA6IHZvaWRcclxuXHR7XHJcblx0XHR0aHJvdyBlcnJvcjtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc3RhcnQoKSA6IFNlcnZlclN0YXJ0ZXJcclxuXHR7XHJcblx0XHR2YXIgc3RhcnRlciA6IFNlcnZlclN0YXJ0ZXIgPSBuZXcgU2VydmVyU3RhcnRlcigpO1xyXG5cclxuXHRcdHN0YXJ0ZXIuc3RhcnQoKTtcclxuXHJcblx0XHRyZXR1cm4gc3RhcnRlcjtcclxuXHR9XHJcbn1cclxuXHJcblNlcnZlclN0YXJ0ZXIuc3RhcnQoKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImh0dHBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWRpc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0c2xpYlwiKTsiXSwic291cmNlUm9vdCI6IiJ9